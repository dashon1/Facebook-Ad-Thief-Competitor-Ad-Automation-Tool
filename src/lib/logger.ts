import type { Env, EventLevel } from '../types'
import { getSupabaseAdminClient } from './supabase'

/**
 * Log event to database
 */
export async function logEvent(
  env: Env,
  jobId: string,
  level: EventLevel,
  message: string,
  context?: any
): Promise<void> {
  try {
    const supabase = getSupabaseAdminClient(env)

    const { error } = await supabase
      .from('events')
      .insert({
        job_id: jobId,
        level,
        message,
        context: context || null
      })

    if (error) {
      console.error('Failed to log event to database:', error)
    }

    // Also log to console
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : ''
    console.log(`[${level.toUpperCase()}] [Job: ${jobId}] ${message}${contextStr}`)
  } catch (error) {
    console.error('Error in logEvent:', error)
  }
}

/**
 * Log info event
 */
export async function logInfo(env: Env, jobId: string, message: string, context?: any): Promise<void> {
  return logEvent(env, jobId, 'info', message, context)
}

/**
 * Log warning event
 */
export async function logWarn(env: Env, jobId: string, message: string, context?: any): Promise<void> {
  return logEvent(env, jobId, 'warn', message, context)
}

/**
 * Log error event
 */
export async function logError(env: Env, jobId: string, message: string, context?: any): Promise<void> {
  return logEvent(env, jobId, 'error', message, context)
}
