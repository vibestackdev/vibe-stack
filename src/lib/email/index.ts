import { Resend } from 'resend'

/**
 * Email Utilities (Resend)
 *
 * Transactional email service for welcome emails,
 * password resets, and notifications.
 *
 * Setup: Get an API key from https://resend.com
 *        and add it to .env.local as RESEND_API_KEY
 */

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

/**
 * Send a transactional email.
 *
 * @example
 * await sendEmail({
 *   to: 'user@example.com',
 *   subject: 'Welcome to Vibe Stack!',
 *   html: '<h1>Welcome!</h1><p>Your account is ready.</p>',
 * })
 */
export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from ?? `Vibe Stack <noreply@${process.env.NEXT_PUBLIC_APP_URL?.replace('https://', '') ?? 'example.com'}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

/**
 * Pre-built email templates.
 */
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to Vibe Stack 🚀',
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #fafafa;">
          Welcome, ${name}!
        </h1>
        <p style="color: #a1a1aa; line-height: 1.6; margin-top: 16px;">
          Your account has been created. You're now ready to start building
          production-grade apps with AI guardrails.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
           style="display: inline-block; margin-top: 24px; padding: 12px 24px;
                  background: linear-gradient(135deg, #7c3aed, #6d28d9);
                  color: white; border-radius: 8px; font-weight: 600;
                  text-decoration: none;">
          Go to Dashboard →
        </a>
      </div>
    `,
  }),

  passwordReset: (resetUrl: string) => ({
    subject: 'Reset your password',
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #fafafa;">
          Password Reset
        </h1>
        <p style="color: #a1a1aa; line-height: 1.6; margin-top: 16px;">
          Click the button below to reset your password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}"
           style="display: inline-block; margin-top: 24px; padding: 12px 24px;
                  background: linear-gradient(135deg, #7c3aed, #6d28d9);
                  color: white; border-radius: 8px; font-weight: 600;
                  text-decoration: none;">
          Reset Password →
        </a>
        <p style="color: #71717a; font-size: 12px; margin-top: 32px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  }),
}
