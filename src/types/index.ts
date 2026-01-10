// Database Types
export type JobStatus = 'queued' | 'scraping' | 'prompting' | 'generating' | 'saving' | 'done' | 'failed'
export type ScrapedAdStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'prohibited'
export type EventLevel = 'info' | 'warn' | 'error'

export interface Job {
  id: string
  user_id?: string
  source_url: string
  product_image_url: string
  brand_name: string
  max_ads: number
  batch_size: number
  status: JobStatus
  total_ads: number
  processed_ads: number
  successful_ads: number
  failed_ads: number
  created_at: string
  updated_at: string
  completed_at?: string
  error?: any
}

export interface ScrapedAd {
  id: string
  job_id: string
  source_image_url: string
  position: number
  meta?: any
  status: ScrapedAdStatus
  created_at: string
}

export interface Asset {
  id: string
  job_id: string
  scraped_ad_id?: string
  file_url: string
  storage_path?: string
  mime_type: string
  width?: number
  height?: number
  size_bytes?: number
  prohibited: boolean
  favorited: boolean
  notes?: string
  created_at: string
}

export interface Event {
  id: number
  job_id?: string
  level: EventLevel
  message: string
  context?: any
  created_at: string
}

// API Request/Response Types
export interface CreateJobRequest {
  sourceUrl: string
  productImage: string // Base64 or URL
  brandName?: string
  maxAds?: number
  batchSize?: number
}

export interface CreateJobResponse {
  jobId: string
  message: string
}

export interface JobStatusResponse extends Job {
  scraped_ads?: ScrapedAd[]
  assets?: Asset[]
  recent_events?: Event[]
}

// Apify Types - Official apify/facebook-ads-scraper format
export interface ApifyScrapedAd {
  // Direct image URLs (older format or backup)
  original_image_url?: string
  resized_image_url?: string
  
  // Official scraper format
  snapshot?: {
    images?: Array<{
      originalImageUrl?: string
      resizedImageUrl?: string
      imageUrl?: string
    }>
    videos?: Array<{
      videoHdUrl?: string
      videoSdUrl?: string
      videoPreviewImageUrl?: string
    }>
    body?: {
      text?: string
    }
    title?: string
    linkDescription?: string
    linkUrl?: string
  }
  
  // Ad metadata
  ad_creative_bodies?: string[]
  ad_creative_link_captions?: string[]
  ad_creative_link_descriptions?: string[]
  ad_creative_link_titles?: string[]
  
  // Page info
  pageName?: string
  pageId?: string
  adArchiveId?: string
  startDate?: number
  endDate?: number
  isActive?: boolean
}

// Gemini API Types
export interface GeminiMessage {
  role: 'user' | 'model'
  parts: GeminiPart[]
}

export interface GeminiPart {
  text?: string
  inline_data?: {
    mime_type: string
    data: string // Base64
  }
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: GeminiPart[]
      role: string
    }
    finishReason: string
    safetyRatings?: any[]
  }>
}

// Cloudflare Bindings
export interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  APIFY_TOKEN: string
  GOOGLE_API_KEY: string
  MAX_ADS_PER_JOB?: string
  DEFAULT_BATCH_SIZE?: string
  
  // Cloudflare Queues (for async processing)
  AD_PROCESSING_QUEUE?: Queue<QueueMessage>
}

// Queue Message Types
export interface QueueMessage {
  type: 'process_job' | 'process_ad'
  jobId: string
  scrapedAdId?: string
  productImageBase64?: string
  brandName?: string
}
