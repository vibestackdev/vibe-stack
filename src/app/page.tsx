import Link from 'next/link'

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background:
          'radial-gradient(ellipse at top, hsl(262 83% 12% / 0.4), hsl(0 0% 3.9%))',
      }}
    >
      {/* Hero Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 1rem',
          borderRadius: '9999px',
          border: '1px solid hsl(262 83% 58% / 0.3)',
          background: 'hsl(262 83% 58% / 0.1)',
          color: 'hsl(262 83% 75%)',
          fontSize: '0.875rem',
          fontWeight: 500,
          marginBottom: '1.5rem',
        }}
      >
        🚀 Built for the AI Engineering Era
      </div>

      {/* Hero Title */}
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: '800px',
          marginBottom: '1.5rem',
        }}
      >
        Stop letting AI{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 90% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          hallucinate
        </span>{' '}
        your architecture.
      </h1>

      {/* Hero Subtitle */}
      <p
        style={{
          fontSize: '1.25rem',
          color: 'hsl(0 0% 63.9%)',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
        }}
      >
        Vibe Stack is a Next.js 15 + Supabase boilerplate with 15 battle-tested
        Cursor rules that force the AI to write production-grade code — not
        StackOverflow copypasta.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 20px hsl(262 83% 58% / 0.3)',
          }}
        >
          Get Started →
        </Link>
        <a
          href="https://github.com/YOUR_USERNAME/vibe-stack"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            border: '1px solid hsl(0 0% 20%)',
            background: 'transparent',
            color: 'hsl(0 0% 80%)',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'border-color 0.2s',
          }}
        >
          ⭐ Star on GitHub
        </a>
      </div>

      {/* Feature Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '900px',
          width: '100%',
          marginTop: '5rem',
        }}
      >
        {[
          {
            icon: '🛡️',
            title: '15 Architecture Rules',
            desc: 'Battle-tested .mdc rules that catch AI hallucinations before they hit production.',
          },
          {
            icon: '🔐',
            title: 'Secure Auth by Default',
            desc: 'Supabase SSR auth with getUser() — never getSession(). RLS enforced everywhere.',
          },
          {
            icon: '⚡',
            title: 'MCP Integrations',
            desc: 'Pre-configured GitHub & Filesystem MCP servers. Let the AI read your PRs and docs natively.',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '1px solid hsl(0 0% 14.9%)',
              background: 'hsl(0 0% 6%)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              {feature.title}
            </h3>
            <p style={{ color: 'hsl(0 0% 63.9%)', lineHeight: 1.6 }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
