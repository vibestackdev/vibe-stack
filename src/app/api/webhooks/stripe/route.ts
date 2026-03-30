import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

/**
 * Stripe Webhook Handler
 *
 * Handles subscription lifecycle events from Stripe.
 * This is the ONLY place where we use the service_role key
 * to bypass RLS — because webhooks don't have a user session.
 *
 * @security This route validates the Stripe signature before
 *           processing any events, preventing replay attacks.
 *
 * @see security.mdc (rate limiting note)
 * @see api-design.mdc (route handler pattern)
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
])

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return Response.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('⚠️ Stripe webhook signature verification failed:', err)
    return Response.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  if (!relevantEvents.has(event.type)) {
    return Response.json({ received: true })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (!session.customer || !session.metadata?.userId) break

        // Link Stripe customer to our user
        await supabase
          .from('profiles')
          .update({
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
          })
          .eq('id', session.metadata.userId)

        console.log(`✅ Checkout completed for user: ${session.metadata.userId}`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            subscription_id: subscription.id,
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        console.log(`🔄 Subscription updated: ${subscription.status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            subscription_id: null,
          })
          .eq('stripe_customer_id', customerId)

        console.log(`❌ Subscription canceled for customer: ${customerId}`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId)

        console.log(`⚠️ Payment failed for customer: ${customerId}`)
        break
      }
    }
  } catch (error) {
    console.error('Webhook handler error:', error)
    return Response.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }

  return Response.json({ received: true })
}
