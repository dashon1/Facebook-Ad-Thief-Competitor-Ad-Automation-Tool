import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Env } from '../types'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient(env: Env): SupabaseClient {
  // Reuse client if already created (for performance)
  if (supabaseClient) {
    return supabaseClient
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.')
  }

  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })

  return supabaseClient
}

export function getSupabaseAdminClient(env: Env): SupabaseClient {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase admin configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}
