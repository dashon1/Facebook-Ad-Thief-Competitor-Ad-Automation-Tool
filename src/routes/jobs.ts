import { Hono } from 'hono'
import type { Env, CreateJobRequest, CreateJobResponse, JobStatusResponse } from '../types'
import { getSupabaseAdminClient } from '../lib/supabase'
import { uploadProductImage } from '../lib/storage'
import { processJob } from '../lib/processor'

const jobs = new Hono<{ Bindings: Env }>()

/**
 * POST /api/jobs - Create a new job
 */
jobs.post('/', async (c) => {
  try {
    const body = await c.req.json<CreateJobRequest>()

    // Validate request
    if (!body.sourceUrl || !body.productImage) {
      return c.json({ error: 'Missing required fields: sourceUrl, productImage' }, 400)
    }

    // Validate Facebook Ad Library URL
    const fbAdLibraryPattern = /facebook\.com\/ads\/library/i
    if (!fbAdLibraryPattern.test(body.sourceUrl)) {
      return c.json({ error: 'Invalid Facebook Ad Library URL. Must contain "facebook.com/ads/library"' }, 400)
    }

    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    // Generate job ID
    const jobId = crypto.randomUUID()

    // Upload product image first (we need the URL before creating the job)
    let productImageUrl = ''
    
    try {
      // If productImage is a base64 string, upload it
      if (body.productImage.startsWith('data:image')) {
        // Extract base64 data from data URL
        const base64Data = body.productImage.split(',')[1]
        const { url } = await uploadProductImage(env, jobId, base64Data)
        productImageUrl = url
      } else if (body.productImage.startsWith('http')) {
        // If it's already a URL, use it directly
        productImageUrl = body.productImage
      } else {
        // Assume it's raw base64
        const { url } = await uploadProductImage(env, jobId, body.productImage)
        productImageUrl = url
      }
    } catch (uploadError: any) {
      console.error('Product image upload failed:', uploadError)
      return c.json({ error: `Failed to upload product image: ${uploadError.message}` }, 500)
    }

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        id: jobId,
        source_url: body.sourceUrl,
        product_image_url: productImageUrl,
        brand_name: body.brandName || 'Your Brand',
        max_ads: body.maxAds || parseInt(env.MAX_ADS_PER_JOB || '20'),
        batch_size: body.batchSize || parseInt(env.DEFAULT_BATCH_SIZE || '5'),
        status: 'queued'
      })
      .select()
      .single()

    if (jobError) {
      console.error('Job creation error:', jobError)
      return c.json({ error: `Failed to create job: ${jobError.message}` }, 500)
    }

    // Start processing asynchronously
    // In production, this would be sent to Cloudflare Queue
    // For now, we'll use a simple async call with error handling
    c.executionCtx.waitUntil(
      processJob(env, jobId).catch((error) => {
        console.error(`Job ${jobId} processing error:`, error)
      })
    )

    const response: CreateJobResponse = {
      jobId: job.id,
      message: 'Job created successfully and processing started'
    }

    return c.json(response, 201)

  } catch (error: any) {
    console.error('Job creation endpoint error:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
})

/**
 * GET /api/jobs/:id - Get job status and details
 */
jobs.get('/:id', async (c) => {
  try {
    const jobId = c.req.param('id')
    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    // Get job with related data
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select(`
        *,
        scraped_ads:scraped_ads(*),
        assets:assets(*),
        events:events(*)
      `)
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return c.json({ error: 'Job not found' }, 404)
    }

    // Sort events by created_at desc (most recent first)
    if (job.events) {
      job.events.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      // Return only recent 20 events
      job.events = job.events.slice(0, 20)
    }

    return c.json(job as JobStatusResponse)

  } catch (error: any) {
    console.error('Get job endpoint error:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
})

/**
 * GET /api/jobs/:id/assets - Get all assets for a job
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
      return c.json({ error: error.message }, 500)
    }

    return c.json({ items: assets || [] })

  } catch (error: any) {
    console.error('Get assets endpoint error:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
})

/**
 * PATCH /api/jobs/:id/assets/:assetId - Update asset (e.g., favorite)
 */
jobs.patch('/:id/assets/:assetId', async (c) => {
  try {
    const jobId = c.req.param('id')
    const assetId = c.req.param('assetId')
    const body = await c.req.json<{ favorited?: boolean }>()

    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    const { data: asset, error } = await supabase
      .from('assets')
      .update({ favorited: body.favorited })
      .eq('id', assetId)
      .eq('job_id', jobId)
      .select()
      .single()

    if (error) {
      return c.json({ error: error.message }, 500)
    }

    return c.json(asset)

  } catch (error: any) {
    console.error('Update asset endpoint error:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
})

/**
 * GET /api/jobs - List all jobs (optional, for future)
 */
jobs.get('/', async (c) => {
  try {
    const env = c.env
    const supabase = getSupabaseAdminClient(env)

    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('id, source_url, brand_name, status, total_ads, successful_ads, failed_ads, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      return c.json({ error: error.message }, 500)
    }

    return c.json({ items: jobs || [] })

  } catch (error: any) {
    console.error('List jobs endpoint error:', error)
    return c.json({ error: error.message || 'Internal server error' }, 500)
  }
})

export default jobs
