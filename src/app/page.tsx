import Link from 'next/link'

const features = [
  {
    icon: '🛡️',
    title: '22 Architecture Rules',
    desc: 'Battle-tested .mdc rules that catch AI hallucinations before they hit production. Covers auth, params, RLS, Stripe, performance, and OWASP Top 10.',
  },
  {
    icon: '🔐',
    title: 'Secure Auth (Not the Fake Kind)',
    desc: 'Supabase SSR with getUser() — never getSession(). Cookie-based sessions, middleware refresh, and PKCE email verification.',
  },
  {
    icon: '🔌',
    title: '4 MCP Integrations',
    desc: 'GitHub, Filesystem, Supabase, and Browser MCP servers. Your AI reads your PRs, inspects your database, and tests your running app.',
  },
  {
    icon: '💳',
    title: 'Stripe Payments Built-In',
    desc: 'Webhook handler with signature verification, checkout session creation, customer portal, and full subscription lifecycle.',
  },
  {
    icon: '📧',
    title: 'Email Templates Ready',
    desc: 'Resend integration with branded HTML templates for welcome emails and password resets. Just add your API key.',
  },
  {
    icon: '⚡',
    title: 'n8n Automations',
    desc: '3 ready-to-import workflow templates: GitHub star lead capture, Dev.to cross-posting, and Gumroad sale CRM.',
  },
]

const stats = [
  { value: '22', label: 'Architecture Rules' },
  { value: '64', label: 'Production Files' },
  { value: '4', label: 'MCP Servers' },
  { value: '0', label: 'Hallucinations Shipped' },
]

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        background:
          'radial-gradient(ellipse at top, hsl(262 83% 12% / 0.4), hsl(0 0% 3.9%))',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
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
          ⚡ Open Source · Next.js 15 · React 19 · TypeScript
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: '800px',
            marginBottom: '1.5rem',
          }}
        >
          Stop letting AI{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 90% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            hallucinate
          </span>{' '}
          your architecture.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.25rem',
            color: 'hsl(0 0% 63.9%)',
            maxWidth: '640px',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          22 architecture rules that physically prevent Cursor from generating
          insecure auth, deprecated packages, and broken Next.js 15 patterns.
          Clone it. Open in Cursor. Ship production apps.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.875rem 2.25rem',
              borderRadius: '0.75rem',
              background:
                'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 0 30px hsl(262 83% 58% / 0.3)',
            }}
          >
            Get Started Free →
          </Link>
          <a
            href="https://github.com/vibestackdev/vibe-stack"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.875rem 2.25rem',
              borderRadius: '0.75rem',
              border: '1px solid hsl(0 0% 20%)',
              background: 'transparent',
              color: 'hsl(0 0% 80%)',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            ⭐ Star on GitHub
          </a>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '4rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 90% 70%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'hsl(0 0% 50%)',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section
        style={{
          maxWidth: '700px',
          textAlign: 'center',
          padding: '4rem 0',
          borderTop: '1px solid hsl(0 0% 10%)',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          The AI is writing bugs you can&apos;t see.
        </h2>
        <p
          style={{
            color: 'hsl(0 0% 55%)',
            lineHeight: 1.8,
            fontSize: '1.1rem',
          }}
        >
          AI models generate code that compiles perfectly, passes TypeScript
          checks, and ships critical vulnerabilities.{' '}
          <span style={{ color: 'hsl(0 80% 65%)' }}>getSession()</span> instead
          of{' '}
          <span style={{ color: 'hsl(142 70% 55%)' }}>getUser()</span>.
          Synchronous params that crash in production. Deprecated packages that
          break on deploy. These aren&apos;t edge cases — they&apos;re the
          default output.
        </p>
      </section>

      {/* Feature Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          width: '100%',
          padding: '2rem 0 4rem',
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              padding: '1.75rem',
              borderRadius: '1rem',
              border: '1px solid hsl(0 0% 14.9%)',
              background: 'hsl(0 0% 5%)',
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
            <p
              style={{
                color: 'hsl(0 0% 55%)',
                lineHeight: 1.6,
                fontSize: '0.95rem',
              }}
            >
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          maxWidth: '600px',
          borderTop: '1px solid hsl(0 0% 10%)',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Ready to ship with confidence?
        </h2>
        <p
          style={{
            color: 'hsl(0 0% 55%)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Clone the repo. Open in Cursor. Build your first feature. The rules
          activate automatically — zero configuration.
        </p>
        <div
          style={{
            background: 'hsl(0 0% 6%)',
            border: '1px solid hsl(0 0% 14.9%)',
            borderRadius: '0.75rem',
            padding: '1rem 1.5rem',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            color: 'hsl(262 83% 75%)',
            marginBottom: '2rem',
          }}
        >
          git clone https://github.com/vibestackdev/vibe-stack.git
        </div>
        <a
          href="https://vibestackdev.gumroad.com/l/vibe-stack"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.875rem 2.25rem',
            borderRadius: '0.75rem',
            background:
              'linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 45%))',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 0 30px hsl(262 83% 58% / 0.3)',
          }}
        >
          Get the Complete System — $29+
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid hsl(0 0% 10%)',
          padding: '2rem 0',
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          color: 'hsl(0 0% 40%)',
          fontSize: '0.85rem',
        }}
      >
        <span>© 2026 VibeStack. MIT License.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a
            href="https://github.com/vibestackdev/vibe-stack"
            style={{ color: 'hsl(0 0% 55%)' }}
          >
            GitHub
          </a>
          <a
            href="https://dev.to/vibestackdev"
            style={{ color: 'hsl(0 0% 55%)' }}
          >
            Blog
          </a>
          <a
            href="https://vibestackdev.gumroad.com"
            style={{ color: 'hsl(0 0% 55%)' }}
          >
            Store
          </a>
        </div>
      </footer>
    </main>
  )
}
