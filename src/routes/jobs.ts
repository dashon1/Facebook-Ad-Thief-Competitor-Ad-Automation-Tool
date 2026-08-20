import { Hono } from 'hono'
import type { Env, CreateJobRequest, CreateJobResponse, ImportExistingAdsRequest, JobStatusResponse } from '../types'
import { getSupabaseAdminClient } from '../lib/supabase'
import { uploadProductImage } from '../lib/storage'
import { processImportedAds, processJob } from '../lib/processor'

const jobs = new Hono<{ Bindings: Env }>()

/**
 * POST /api/jobs
 * Create a new job
 */
jobs.post('/', async (c) => {
  try {
    const body = await c.req.json<CreateJobRequest>()

    // Validate input
    if (!body.sourceUrl || !body.productImage) {
      return c.json({ error: 'Missing required fields: sourceUrl and productImage' }, 400)
    }

    // Validate Facebook URL (accept both Page URLs and Ad Library URLs)
    if (!body.sourceUrl.includes('facebook.com')) {
      return c.json({ error: 'Invalid Facebook URL' }, 400)
    }

    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        source_url: body.sourceUrl,
        product_image_url: 'pending', // Will be updated after upload
        brand_name: body.brandName || 'Your Brand',
        max_ads: body.maxAds || parseInt(env.MAX_ADS_PER_JOB || '20'),
        batch_size: body.batchSize || parseInt(env.DEFAULT_BATCH_SIZE || '5'),
        status: 'queued'
      })
      .select()
      .single()

    if (jobError || !job) {
      console.error('Failed to create job:', jobError)
      return c.json({ error: 'Failed to create job' }, 500)
    }

    // Upload product image
    let productImageUrl = ''
    try {
      // Remove base64 prefix if present
      let base64Data = body.productImage
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1]
      }

      const { url } = await uploadProductImage(env, job.id, base64Data)
      productImageUrl = url

      // Update job with product image URL
      await supabase
        .from('jobs')
        .update({ product_image_url: productImageUrl })
        .eq('id', job.id)
    } catch (uploadError: any) {
      console.error('Failed to upload product image:', uploadError)
      // Delete job if upload fails
      await supabase.from('jobs').delete().eq('id', job.id)
      return c.json({ error: 'Failed to upload product image: ' + uploadError.message }, 500)
    }

    // Start processing asynchronously
    // Using c.executionCtx.waitUntil for Cloudflare Workers
    c.executionCtx.waitUntil(
      processJob(env, job.id).catch(error => {
        console.error('Job processing error:', error)
      })
    )

    const response: CreateJobResponse = {
      jobId: job.id,
      message: 'Job created successfully and processing started'
    }

    return c.json(response, 201)
  } catch (error: any) {
    console.error('Error creating job:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

/**
 * POST /api/jobs/:id/import-existing
 * Reuse completed Apify records and start generation without launching a new scrape.
 */
jobs.post('/:id/import-existing', async (c) => {
  try {
    const jobId = c.req.param('id')
    const body = await c.req.json<ImportExistingAdsRequest>()

    if (!Array.isArray(body.referenceAds) || body.referenceAds.length === 0) {
      return c.json({ error: 'referenceAds must contain at least one existing Apify record' }, 400)
    }

    const env = c.env
    const supabase = getSupabaseAdminClient(env)
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return c.json({ error: 'Job not found' }, 404)
    }

    const isStaleZeroOutputGeneration =
      job.status === 'generating' &&
      job.successful_ads === 0 &&
      job.failed_ads > 0

    if (job.status !== 'failed' && job.status !== 'queued' && !isStaleZeroOutputGeneration) {
      return c.json({ error: 'Job must be queued, failed, or a stalled zero-output generation before importing existing reference ads' }, 400)
    }

    await supabase
      .from('scraped_ads')
      .delete()
      .eq('job_id', jobId)

    await supabase
      .from('assets')
      .delete()
      .eq('job_id', jobId)

    const { error: resetError } = await supabase
      .from('jobs')
      .update({
        status: 'queued',
        total_ads: 0,
        processed_ads: 0,
        successful_ads: 0,
        failed_ads: 0,
        error: null,
        completed_at: null
      })
      .eq('id', jobId)

    if (resetError) {
      return c.json({ error: `Failed to prepare job import: ${resetError.message}` }, 500)
    }

    c.executionCtx.waitUntil(
      processImportedAds(env, jobId, body.referenceAds).catch(error => {
        console.error('Imported-reference job processing error:', error)
      })
    )

    return c.json({
      jobId,
      message: `Imported ${body.referenceAds.length} existing reference ads; generation started without a new Apify run`
    })
  } catch (error: any) {
    console.error('Error importing existing reference ads:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

/**
 * GET /api/jobs/:id
 * Get job status and details
 */
jobs.get('/:id', async (c) => {
  try {
    const jobId = c.req.param('id')
    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return c.json({ error: 'Job not found' }, 404)
    }

    // Get scraped ads
    const { data: scrapedAds } = await supabase
      .from('scraped_ads')
      .select('*')
      .eq('job_id', jobId)
      .order('position', { ascending: true })

    // Get assets
    const { data: assets } = await supabase
      .from('assets')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: true })

    // Get recent events
    const { data: recentEvents } = await supabase
      .from('events')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })
      .limit(10)

    const response: JobStatusResponse = {
      ...job,
      scraped_ads: scrapedAds || [],
      assets: assets || [],
      recent_events: recentEvents || []
    }

    return c.json(response)
  } catch (error: any) {
    console.error('Error fetching job:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

/**
 * GET /api/jobs/:id/assets
 * Get all assets for a job
 */
jobs.get('/:id/assets', async (c) => {
  try {
    const jobId = c.req.param('id')
    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: true })

    if (error) {
      return c.json({ error: 'Failed to fetch assets' }, 500)
    }

    return c.json({ assets: assets || [] })
  } catch (error: any) {
    console.error('Error fetching assets:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

/**
 * POST /api/jobs/:id/retry
 * Retry failed job
 */
jobs.post('/:id/retry', async (c) => {
  try {
    const jobId = c.req.param('id')
    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    // Check if job exists and is failed
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return c.json({ error: 'Job not found' }, 404)
    }

    if (job.status !== 'failed') {
      return c.json({ error: 'Job is not in failed state' }, 400)
    }

    // Reset job status
    await supabase
      .from('jobs')
      .update({ 
        status: 'queued',
        error: null
      })
      .eq('id', jobId)

    // Restart processing
    c.executionCtx.waitUntil(
      processJob(env, job.id).catch(error => {
        console.error('Job retry error:', error)
      })
    )

    return c.json({ message: 'Job retry started' })
  } catch (error: any) {
    console.error('Error retrying job:', error)
    return c.json({ error: 'Internal server error: ' + error.message }, 500)
  }
})

export default jobs
