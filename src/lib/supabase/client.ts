import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in Client Components.
 *
 * This client automatically handles cookie-based sessions in the browser.
 * Use this ONLY in files marked with 'use client'.
 *
 * For server-side operations, use the server client from ./server.ts
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
