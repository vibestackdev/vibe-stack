'use client'

/**
 * Global Error Boundary
 *
 * This component catches unhandled errors in the application
 * and provides a user-friendly recovery UI.
 *
 * MUST be a Client Component ('use client') because it uses
 * the reset() callback to re-render the tree.
 *
 * @see error-handling.mdc rule
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
      <div
        style={{
          maxWidth: '500px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'hsl(0 62.8% 30.6% / 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.5rem',
          }}
        >
          ⚠️
        </div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            color: 'hsl(0 0% 98%)',
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            color: 'hsl(0 0% 50%)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          An unexpected error occurred. This has been logged automatically.
          {error.digest && (
            <span
              style={{
                display: 'block',
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                color: 'hsl(0 0% 35%)',
              }}
            >
              Error ID: {error.digest}
            </span>
          )}
        </p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            background:
              'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
