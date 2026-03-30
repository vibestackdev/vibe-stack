import Stripe from 'stripe'

/**
 * Stripe Server Utilities
 *
 * All Stripe operations MUST happen server-side.
 * NEVER import this file in a Client Component.
 *
 * @see security.mdc rule — Stripe Secret Key is server-only
 */

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY is not set. Stripe features will be disabled.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

/**
 * Create a Checkout Session for a subscription.
 *
 * Call this from a Server Action, never from a Route Handler
 * (to maintain cookie-based auth context).
 */
export async function createCheckoutSession({
  userId,
  userEmail,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string
  userEmail: string
  priceId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
  })

  return session
}

/**
 * Create a Customer Portal session for managing subscriptions.
 */
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}
