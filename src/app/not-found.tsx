import Link from 'next/link'

/**
 * Custom 404 Page
 *
 * Next.js 15 uses `not-found.tsx` for custom 404 pages.
 * This file is automatically rendered when notFound() is called
 * or when a route doesn't match any page.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'hsl(0 0% 3.9%)',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 800,
            background:
              'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 90% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: 'hsl(0 0% 98%)',
          }}
        >
          Page not found
        </h2>
        <p
          style={{
            color: 'hsl(0 0% 50%)',
            marginBottom: '2rem',
            maxWidth: '400px',
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            background:
              'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
