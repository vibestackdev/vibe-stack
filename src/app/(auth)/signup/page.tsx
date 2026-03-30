import { signup } from '../actions'
import Link from 'next/link'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params?.error

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(ellipse at top, hsl(262 83% 12% / 0.3), hsl(0 0% 3.9%))',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid hsl(0 0% 14.9%)',
          background: 'hsl(0 0% 6%)',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          Create your account
        </h1>
        <p
          style={{
            color: 'hsl(0 0% 63.9%)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}
        >
          Start building with AI guardrails
        </p>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              background: 'hsl(0 62.8% 30.6% / 0.2)',
              border: '1px solid hsl(0 62.8% 30.6% / 0.3)',
              color: 'hsl(0 80% 70%)',
              fontSize: '0.875rem',
              marginBottom: '1rem',
            }}
          >
            {decodeURIComponent(error)}
          </div>
        )}

        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.375rem',
                color: 'hsl(0 0% 80%)',
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid hsl(0 0% 20%)',
                background: 'hsl(0 0% 9%)',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.375rem',
                color: 'hsl(0 0% 80%)',
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid hsl(0 0% 20%)',
                background: 'hsl(0 0% 9%)',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            formAction={signup}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background:
                'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Create Account
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: 'hsl(0 0% 63.9%)',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            style={{ color: 'hsl(262 83% 70%)', fontWeight: 500 }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
