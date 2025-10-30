import type { Env, GeminiResponse, GeminiPart } from '../types'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

/**
 * Generate a meta-prompt using Gemini 2.5 Pro
 * Analyzes product image and competitor ad to create detailed editing instructions
 */
export async function generateMetaPrompt(
  env: Env,
  productImageBase64: string,
  competitorAdBase64: string,
  brandName: string = 'Your Brand'
): Promise<string> {
  if (!env.GOOGLE_API_KEY) {
    throw new Error('Missing GOOGLE_API_KEY environment variable')
  }

  const systemPrompt = `You are an expert image editor and advertising creative director. 

Analyze two images:
1. Our product photo (brand: ${brandName})
2. A competitor's advertisement

Your task: Write a DETAILED image-editing prompt that will recreate the competitor ad's layout, lighting, composition, and typography while replacing ANY brand marks, logos, text, or product imagery with ${brandName}'s branding.

CRITICAL REQUIREMENTS:
- Detect and specify removal of ALL competitor brand elements (including partial fragments like "A", "AG", "G", "G1", etc.)
- Preserve the exact layout, composition, color scheme, and visual style
- Maintain the same messaging tone and copy structure, but replace brand name
- Specify exact placement for ${brandName} product/packaging
- Include lighting, shadow, and reflection adjustments needed
- Keep background, typography style, and overall aesthetic identical
- If multiple product packages appear, specify ${brandName} replacement for each

Output ONLY the final editing prompt - no explanations, no preamble. The prompt should be ready to send directly to an image generation model.`

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: systemPrompt },
          {
            inline_data: {
              mime_type: 'image/png',
              data: productImageBase64
            }
          },
          {
            inline_data: {
              mime_type: 'image/png',
              data: competitorAdBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048
    }
  }

  const response = await fetch(
    `${GEMINI_API_URL}/gemini-2.0-flash-exp:generateContent?key=${env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini meta-prompt API failed: ${response.status} - ${errorText}`)
  }

  const data: GeminiResponse = await response.json()

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini meta-prompt API')
  }

  const candidate = data.candidates[0]

  // Check for prohibited content
  if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
    throw new Error(`Content flagged by Gemini: ${candidate.finishReason}`)
  }

  // Extract text from response
  const textParts = candidate.content.parts.filter(part => part.text)
  if (textParts.length === 0) {
    throw new Error('No text response from Gemini meta-prompt')
  }

  return textParts.map(part => part.text).join('\n')
}

/**
 * Generate image using Gemini 2.5 Flash Image Preview (Nano Banana)
 */
export async function generateImageWithNanoBanana(
  env: Env,
  prompt: string,
  productImageBase64: string,
  competitorAdBase64: string
): Promise<{ imageBase64: string; prohibited: boolean }> {
  if (!env.GOOGLE_API_KEY) {
    throw new Error('Missing GOOGLE_API_KEY environment variable')
  }

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: 'image/png',
              data: productImageBase64
            }
          },
          {
            inline_data: {
              mime_type: 'image/png',
              data: competitorAdBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7
    }
  }

  const response = await fetch(
    `${GEMINI_API_URL}/gemini-2.0-flash-exp:generateContent?key=${env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini image generation API failed: ${response.status} - ${errorText}`)
  }

  const data: GeminiResponse = await response.json()

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini image generation API')
  }

  const candidate = data.candidates[0]

  // Check for prohibited content
  if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
    console.warn('Content flagged as prohibited by Gemini')
    return { imageBase64: '', prohibited: true }
  }

  // Extract image data from inline_data parts
  const imageParts = candidate.content.parts.filter(part => part.inline_data)
  
  if (imageParts.length === 0) {
    throw new Error('No image data returned from Gemini')
  }

  const imageBase64 = imageParts[0].inline_data!.data

  return { imageBase64, prohibited: false }
}

/**
 * Download image from URL and convert to base64
 */
export async function downloadImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl)
  
  if (!response.ok) {
    throw new Error(`Failed to download image from ${imageUrl}: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  
  return base64
}

/**
 * Convert base64 string to Blob
 */
export function base64ToBlob(base64: string, mimeType: string = 'image/png'): Blob {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}
