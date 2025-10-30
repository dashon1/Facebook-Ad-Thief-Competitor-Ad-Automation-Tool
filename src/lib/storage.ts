import type { Env } from '../types'
import { getSupabaseAdminClient } from './supabase'

const BUCKET_NAME = 'ad-thief-images'

/**
 * Upload image to Supabase Storage
 * Returns the public URL of the uploaded file
 */
export async function uploadToStorage(
  env: Env,
  fileName: string,
  base64Data: string,
  mimeType: string = 'image/png'
): Promise<{ url: string; path: string }> {
  const supabase = getSupabaseAdminClient(env)

  // Convert base64 to buffer
  const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, buffer, {
      contentType: mimeType,
      upsert: false
    })

  if (error) {
    console.error('Supabase storage upload error:', error)
    throw new Error(`Failed to upload to storage: ${error.message}`)
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return {
    url: publicUrlData.publicUrl,
    path: data.path
  }
}

/**
 * Upload product image from form upload
 */
export async function uploadProductImage(
  env: Env,
  jobId: string,
  base64Data: string
): Promise<{ url: string; path: string }> {
  const fileName = `products/${jobId}/product-${Date.now()}.png`
  return uploadToStorage(env, fileName, base64Data, 'image/png')
}

/**
 * Upload generated ad image
 */
export async function uploadGeneratedAd(
  env: Env,
  jobId: string,
  adIndex: number,
  base64Data: string
): Promise<{ url: string; path: string }> {
  const fileName = `generated/${jobId}/cloned-ad-${adIndex}.png`
  return uploadToStorage(env, fileName, base64Data, 'image/png')
}

/**
 * Upload competitor source ad
 */
export async function uploadSourceAd(
  env: Env,
  jobId: string,
  adIndex: number,
  base64Data: string
): Promise<{ url: string; path: string }> {
  const fileName = `source/${jobId}/source-ad-${adIndex}.png`
  return uploadToStorage(env, fileName, base64Data, 'image/png')
}

/**
 * Initialize storage bucket (run once during setup)
 */
export async function initializeStorageBucket(env: Env): Promise<void> {
  const supabase = getSupabaseAdminClient(env)

  // Check if bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()

  if (listError) {
    console.error('Failed to list buckets:', listError)
    return
  }

  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME)

  if (!bucketExists) {
    // Create bucket with public access
    const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 10485760 // 10MB
    })

    if (error) {
      console.error('Failed to create bucket:', error)
      throw new Error(`Failed to create storage bucket: ${error.message}`)
    }

    console.log(`Created storage bucket: ${BUCKET_NAME}`)
  } else {
    console.log(`Storage bucket already exists: ${BUCKET_NAME}`)
  }
}
