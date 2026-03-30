import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth Callback Route — Handles Email Confirmation (PKCE Flow)
 *
 * When a user clicks the confirmation link in their email,
 * Supabase redirects them here with a `token_hash` and `type` parameter.
 * This route exchanges that token for a valid session.
 *
 * PKCE LIMITATION: The user MUST open this link in the same browser
 * and device where they initiated the signup flow.
 *
 * @see supabase-auth-security.mdc
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  const redirectTo = request.nextUrl.clone()

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      redirectTo.pathname = next
      redirectTo.searchParams.delete('token_hash')
      redirectTo.searchParams.delete('type')
      return NextResponse.redirect(redirectTo)
    }
  }

  // Redirect to error page if verification fails
  redirectTo.pathname = '/login'
  redirectTo.searchParams.set('error', 'Could not verify email. Please try again.')
  return NextResponse.redirect(redirectTo)
}
