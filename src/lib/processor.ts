import type { Env, Job, ScrapedAd } from '../types'
import { getSupabaseAdminClient } from './supabase'
import { scrapeFacebookAdLibrary } from './apify'
import { generateMetaPrompt, generateImageWithNanoBanana, downloadImageAsBase64 } from './gemini'
import { uploadGeneratedAd, uploadSourceAd } from './storage'
import { logInfo, logWarn, logError } from './logger'

/**
 * Process a complete job from start to finish
 * This is called asynchronously via queue or direct invocation
 */
export async function processJob(env: Env, jobId: string): Promise<void> {
  const supabase = getSupabaseAdminClient(env)

  try {
    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      throw new Error(`Job not found: ${jobId}`)
    }

    await logInfo(env, jobId, 'Starting job processing')

    // Step 1: Scrape Facebook Ad Library
    await updateJobStatus(env, jobId, 'scraping')
    await logInfo(env, jobId, `Scraping Facebook Ad Library: ${job.source_url}`)

    const scrapedAds = await scrapeFacebookAdLibrary(env, job.source_url, job.max_ads)

    if (scrapedAds.length === 0) {
      throw new Error('No ads found in Facebook Ad Library')
    }

    await logInfo(env, jobId, `Found ${scrapedAds.length} ads to process`)

    // Update total ads count
    await supabase
      .from('jobs')
      .update({ total_ads: scrapedAds.length })
      .eq('id', jobId)

    // Step 2: Save scraped ads to database
    const scrapedAdRecords = scrapedAds.map((ad, index) => {
      // Extract image URL from official scraper format or fallback
      let imageUrl = ad.original_image_url || ad.resized_image_url || ''
      
      // Try snapshot format first (official apify/facebook-ads-scraper)
      if (ad.snapshot?.images?.length > 0) {
        const firstImage = ad.snapshot.images[0]
        imageUrl = firstImage.originalImageUrl || firstImage.resizedImageUrl || firstImage.imageUrl || imageUrl
      }
      
      return {
        job_id: jobId,
        source_image_url: imageUrl,
        position: index,
        meta: {
          ad_creative_bodies: ad.ad_creative_bodies || [],
          ad_creative_link_titles: ad.ad_creative_link_titles || [],
          body_text: ad.snapshot?.body?.text || '',
          title: ad.snapshot?.title || '',
          page_name: ad.pageName || '',
          ad_archive_id: ad.adArchiveId || ''
        },
        status: 'pending' as const
      }
    })

    const { data: insertedAds, error: insertError } = await supabase
      .from('scraped_ads')
      .insert(scrapedAdRecords)
      .select()

    if (insertError || !insertedAds) {
      throw new Error(`Failed to save scraped ads: ${insertError?.message}`)
    }

    await logInfo(env, jobId, `Saved ${insertedAds.length} scraped ads to database`)

    // Step 3: Process ads in batches
    await updateJobStatus(env, jobId, 'generating')

    const batchSize = job.batch_size || 5
    const batches = chunkArray(insertedAds, batchSize)

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      await logInfo(env, jobId, `Processing batch ${batchIndex + 1}/${batches.length}`)

      // Process batch in parallel
      await Promise.all(
        batch.map(scrapedAd => processScrapedAd(env, jobId, scrapedAd, job))
      )
    }

    // Step 4: Mark job as complete
    await updateJobStatus(env, jobId, 'done')

    const { data: finalJob } = await supabase
      .from('jobs')
      .select('successful_ads, failed_ads')
      .eq('id', jobId)
      .single()

    await logInfo(env, jobId, `Job completed! Generated ${finalJob?.successful_ads || 0} ads, ${finalJob?.failed_ads || 0} failed`)

  } catch (error: any) {
    await logError(env, jobId, `Job processing failed: ${error.message}`, { error: error.stack })
    await updateJobStatus(env, jobId, 'failed', { error: error.message })
    throw error
  }
}

/**
 * Process a single scraped ad
 */
async function processScrapedAd(
  env: Env,
  jobId: string,
  scrapedAd: ScrapedAd,
  job: Job
): Promise<void> {
  const supabase = getSupabaseAdminClient(env)

  try {
    // Update scraped ad status
    await supabase
      .from('scraped_ads')
      .update({ status: 'processing' })
      .eq('id', scrapedAd.id)

    await logInfo(env, jobId, `Processing ad ${scrapedAd.position + 1}: ${scrapedAd.source_image_url}`)

    // Download competitor ad image
    const competitorAdBase64 = await downloadImageAsBase64(scrapedAd.source_image_url)

    // Save source ad to storage
    await uploadSourceAd(env, jobId, scrapedAd.position, competitorAdBase64)

    // Get product image (already uploaded, stored in job.product_image_url)
    // For now, we'll need to download it and convert to base64
    const productImageBase64 = await downloadImageAsBase64(job.product_image_url)

    // Step 1: Generate meta-prompt with Gemini Pro
    await logInfo(env, jobId, `Generating meta-prompt for ad ${scrapedAd.position + 1}`)
    const metaPrompt = await generateMetaPrompt(
      env,
      productImageBase64,
      competitorAdBase64,
      job.brand_name || 'Your Brand'
    )

    await logInfo(env, jobId, `Meta-prompt generated for ad ${scrapedAd.position + 1}`, { prompt: metaPrompt.substring(0, 200) + '...' })

    // Step 2: Generate image with Nano Banana
    await logInfo(env, jobId, `Generating image for ad ${scrapedAd.position + 1}`)
    const { imageBase64, prohibited } = await generateImageWithNanoBanana(
      env,
      metaPrompt,
      productImageBase64,
      competitorAdBase64
    )

    if (prohibited) {
      await logWarn(env, jobId, `Ad ${scrapedAd.position + 1} flagged as prohibited content - skipping`)
      
      await supabase
        .from('scraped_ads')
        .update({ status: 'prohibited' })
        .eq('id', scrapedAd.id)

      // Create asset record for prohibited content
      await supabase
        .from('assets')
        .insert({
          job_id: jobId,
          scraped_ad_id: scrapedAd.id,
          file_url: '',
          prohibited: true,
          notes: 'Content flagged by Gemini safety filters'
        })

      await incrementJobCounter(env, jobId, 'failed_ads')
      await incrementJobCounter(env, jobId, 'processed_ads')

      return
    }

    // Upload generated image
    const { url, path } = await uploadGeneratedAd(env, jobId, scrapedAd.position, imageBase64)

    await logInfo(env, jobId, `Successfully generated ad ${scrapedAd.position + 1}: ${url}`)

    // Save asset record
    await supabase
      .from('assets')
      .insert({
        job_id: jobId,
        scraped_ad_id: scrapedAd.id,
        file_url: url,
        storage_path: path,
        mime_type: 'image/png',
        prohibited: false
      })

    // Update scraped ad status
    await supabase
      .from('scraped_ads')
      .update({ status: 'completed' })
      .eq('id', scrapedAd.id)

    await incrementJobCounter(env, jobId, 'successful_ads')
    await incrementJobCounter(env, jobId, 'processed_ads')

  } catch (error: any) {
    await logError(env, jobId, `Failed to process ad ${scrapedAd.position + 1}: ${error.message}`, { error: error.stack })

    await supabase
      .from('scraped_ads')
      .update({ status: 'failed' })
      .eq('id', scrapedAd.id)

    await incrementJobCounter(env, jobId, 'failed_ads')
    await incrementJobCounter(env, jobId, 'processed_ads')
  }
}

/**
 * Update job status
 */
async function updateJobStatus(
  env: Env,
  jobId: string,
  status: Job['status'],
  additionalData?: Partial<Job>
): Promise<void> {
  const supabase = getSupabaseAdminClient(env)

  const updateData: any = { status, ...additionalData }

  if (status === 'done') {
    updateData.completed_at = new Date().toISOString()
  }

  await supabase
    .from('jobs')
    .update(updateData)
    .eq('id', jobId)
}

/**
 * Increment job counter
 */
async function incrementJobCounter(
  env: Env,
  jobId: string,
  field: 'processed_ads' | 'successful_ads' | 'failed_ads'
): Promise<void> {
  const supabase = getSupabaseAdminClient(env)

  const { data: job } = await supabase
    .from('jobs')
    .select(field)
    .eq('id', jobId)
    .single()

  if (job) {
    await supabase
      .from('jobs')
      .update({ [field]: (job[field] || 0) + 1 })
      .eq('id', jobId)
  }
}

/**
 * Utility: Chunk array into batches
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}
