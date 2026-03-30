/**
 * Type-safe environment variable access.
 *
 * Centralizes all env var access so it's easy to audit what secrets
 * the app requires. If a required var is missing, the app crashes
 * at startup instead of silently failing in production.
 */

function getEnvVar(key: string, required = true): string {
  const value = process.env[key]
  if (!value && required) {
    throw new Error(
      `❌ Missing required environment variable: ${key}\n` +
        `   Please check your .env.local file. See .env.example for reference.`
    )
  }
  return value ?? ''
}

export const env = {
  // Supabase
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),

  // Stripe (optional during dev)
  stripeSecretKey: getEnvVar('STRIPE_SECRET_KEY', false),
  stripeWebhookSecret: getEnvVar('STRIPE_WEBHOOK_SECRET', false),
  stripePublishableKey: getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', false),

  // Resend (optional during dev)
  resendApiKey: getEnvVar('RESEND_API_KEY', false),

  // App
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', false) || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const
