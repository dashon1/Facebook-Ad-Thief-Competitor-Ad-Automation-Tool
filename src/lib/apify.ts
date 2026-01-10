import type { Env, ApifyScrapedAd } from '../types'

const APIFY_API_URL = 'https://api.apify.com/v2'
// Official Apify Facebook Ads Scraper - most reliable and actively maintained
const FACEBOOK_AD_LIBRARY_ACTOR = 'apify/facebook-ads-scraper'

export interface ApifyRunResponse {
  data: {
    id: string
    actId: string
    status: string
    defaultDatasetId: string
  }
}

export async function scrapeFacebookAdLibrary(
  env: Env,
  sourceUrl: string,
  maxAds: number = 20
): Promise<ApifyScrapedAd[]> {
  if (!env.APIFY_TOKEN) {
    throw new Error('Missing APIFY_TOKEN environment variable')
  }

  console.log(`Starting Apify scrape for URL: ${sourceUrl}`)

  // Step 1: Start the actor run
  const runResponse = await fetch(
    `${APIFY_API_URL}/acts/${FACEBOOK_AD_LIBRARY_ACTOR}/runs?token=${env.APIFY_TOKEN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Input format for apify/facebook-ads-scraper
        startUrls: [{ url: sourceUrl }],
        maxItems: maxAds,
        scrapeAdDetails: true  // Get full ad details including images
      })
    }
  )

  if (!runResponse.ok) {
    const errorText = await runResponse.text()
    throw new Error(`Apify actor start failed: ${runResponse.status} - ${errorText}`)
  }

  const runData: ApifyRunResponse = await runResponse.json()
  const runId = runData.data.id
  const datasetId = runData.data.defaultDatasetId

  console.log(`Apify run started with ID: ${runId}`)

  // Step 2: Poll for completion (max 2 minutes)
  const maxAttempts = 24 // 24 * 5s = 2 minutes
  let attempts = 0
  let runStatus = 'RUNNING'

  while (runStatus === 'RUNNING' && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds

    const statusResponse = await fetch(
      `${APIFY_API_URL}/acts/${FACEBOOK_AD_LIBRARY_ACTOR}/runs/${runId}?token=${env.APIFY_TOKEN}`
    )

    if (!statusResponse.ok) {
      throw new Error(`Failed to check Apify run status: ${statusResponse.status}`)
    }

    const statusData: ApifyRunResponse = await statusResponse.json()
    runStatus = statusData.data.status

    console.log(`Apify run status: ${runStatus} (attempt ${attempts + 1}/${maxAttempts})`)
    attempts++
  }

  if (runStatus !== 'SUCCEEDED') {
    throw new Error(`Apify run did not complete successfully. Final status: ${runStatus}`)
  }

  // Step 3: Fetch the dataset results
  console.log(`Fetching dataset: ${datasetId}`)

  const datasetResponse = await fetch(
    `${APIFY_API_URL}/datasets/${datasetId}/items?token=${env.APIFY_TOKEN}&format=json`
  )

  if (!datasetResponse.ok) {
    throw new Error(`Failed to fetch Apify dataset: ${datasetResponse.status}`)
  }

  const items: ApifyScrapedAd[] = await datasetResponse.json()

  console.log(`Successfully scraped ${items.length} ads from Facebook Ad Library`)

  // Filter out items without images
  // The official scraper returns data with different structure
  const validItems = items.filter(item => {
    // Check for images in snapshot object (official scraper format)
    const hasImages = item.snapshot?.images?.length > 0
    const hasOriginalImage = item.original_image_url || item.resized_image_url
    return hasImages || hasOriginalImage
  })

  console.log(`Filtered ${validItems.length} ads with images from ${items.length} total ads`)

  return validItems
}
