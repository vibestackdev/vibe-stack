'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

/**
 * Auth Server Actions
 *
 * These follow the patterns enforced by:
 * - server-actions.mdc (Zod validation, error handling)
 * - supabase-auth-security.mdc (getUser() only, never getSession())
 * - error-handling.mdc (structured error returns)
 */

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function login(formData: FormData) {
  const supabase = await createClient()

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    redirect('/login?error=Invalid+credentials')
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    redirect('/signup?error=Invalid+input')
  }

  const { error } = await supabase.auth.signUp(parsed.data)

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
