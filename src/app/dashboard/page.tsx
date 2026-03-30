import { createClient } from '@/lib/supabase/server'
import { signOut } from '../(auth)/actions'

/**
 * Dashboard Page (Protected)
 *
 * This page is protected by middleware — unauthenticated users
 * are redirected to /login before this component even renders.
 *
 * We use getUser() (not getSession) to fetch the user securely
 * on the server, as enforced by supabase-auth-security.mdc.
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  // SECURE: getUser() verifies the JWT against Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        background: 'hsl(0 0% 3.9%)',
      }}
    >
      {/* Top Navigation */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid hsl(0 0% 14.9%)',
        }}
      >
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            background:
              'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 90% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Vibe Stack
        </h1>
        <form>
          <button
            formAction={signOut}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid hsl(0 0% 20%)',
              background: 'transparent',
              color: 'hsl(0 0% 63.9%)',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Sign Out
          </button>
        </form>
      </nav>

      {/* Welcome Card */}
      <div
        style={{
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid hsl(0 0% 14.9%)',
          background: 'hsl(0 0% 6%)',
          maxWidth: '600px',
        }}
      >
        <h2
          style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}
        >
          Welcome to your Dashboard
        </h2>
        <p style={{ color: 'hsl(0 0% 63.9%)', marginBottom: '1rem' }}>
          You are signed in as{' '}
          <strong style={{ color: 'hsl(262 83% 70%)' }}>
            {user?.email ?? 'Unknown'}
          </strong>
        </p>
        <p style={{ color: 'hsl(0 0% 50%)', fontSize: '0.875rem' }}>
          This page is protected by Supabase middleware. Unauthorized users are
          redirected to /login before this Server Component even renders.
        </p>
      </div>

      {/* Architecture Note */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid hsl(262 83% 58% / 0.2)',
          background: 'hsl(262 83% 58% / 0.05)',
          maxWidth: '600px',
        }}
      >
        <p style={{ fontSize: '0.85rem', color: 'hsl(262 83% 75%)' }}>
          💡 <strong>Architecture Note:</strong> This is a React Server
          Component. The user data was fetched on the server using{' '}
          <code style={{ background: 'hsl(0 0% 14.9%)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
            getUser()
          </code>
          , not <code style={{ background: 'hsl(0 0% 14.9%)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>getSession()</code>. The
          Sign Out button uses a Server Action. No client-side JavaScript
          required.
        </p>
      </div>
    </main>
  )
}
