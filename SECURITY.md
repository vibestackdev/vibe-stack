# Security Guide

Vibe Stack enforces security at the architecture level through `.mdc` rules that physically prevent AI coding assistants from generating insecure patterns.

## Security Rules Included

### Authentication Security
| Rule | Threat Prevented |
|---|---|
| `supabase-auth-security.mdc` | **JWT forgery** — `getSession()` accepts unverified tokens; `getUser()` cryptographically verifies every JWT |
| `supabase-ssr-only.mdc` | **Deprecated auth** — blocks `@supabase/auth-helpers-nextjs` which mishandles App Router cookies |
| `middleware-auth.mdc` | **Silent session expiry** — enforces `updateSession()` middleware to refresh tokens |

### Data Security
| Rule | Threat Prevented |
|---|---|
| `supabase-rls.mdc` | **Data exposure** — every table must have RLS policies; without them, the anon key reads all data |
| `database-design.mdc` | **Schema vulnerabilities** — enforces UUID primary keys, proper foreign key constraints, and audit columns |
| `env-management.mdc` | **Secret leakage** — classifies env vars and prevents `NEXT_PUBLIC_` exposure of secrets |

### Input Validation
| Rule | Threat Prevented |
|---|---|
| `typescript-strict.mdc` | **Type bypass** — bans `any`, enforces Zod schemas at every input boundary |
| `server-actions.mdc` | **Injection attacks** — all Server Action inputs must pass Zod validation before processing |
| `api-validation.mdc` | **Malformed requests** — Route Handler inputs validated and sanitized |

### Payment Security
| Rule | Threat Prevented |
|---|---|
| `stripe-payments.mdc` | **PCI liability** — forces Stripe Checkout (never custom card forms); requires webhook signature verification |

### Application Security
| Rule | Threat Prevented |
|---|---|
| `security.mdc` | **OWASP Top 10** — rate limiting, CSRF protection, XSS prevention, secure headers |
| `hydration-safety.mdc` | **Hydration attacks** — prevents client/server mismatches that expose internal state |
| `file-uploads.mdc` | **Malicious uploads** — file type validation, size limits, secure Supabase Storage patterns |

## Security Architecture

### The Secure Auth Flow
```
User submits login form
  → Server Action validates input with Zod
    → supabase.auth.signInWithPassword()
      → Supabase issues JWT (cookie-based, httpOnly)
        → Middleware refreshes token on every request
          → Server Components verify with getUser() (NEVER getSession())
```

### Why `getUser()` is Non-Negotiable

`getSession()` reads the JWT from cookies and trusts it at face value. An attacker can:
1. Craft a fake JWT with any `user_id`
2. Set it as a cookie
3. `getSession()` will return it as a valid session

`getUser()` sends the JWT to Supabase's auth server for cryptographic verification. If the token is forged, tampered, or expired, it returns an error.

**Every AI model defaults to `getSession()` because the training data contains years of pre-2024 tutorials.** Our rule overrides this default.

### Row Level Security Pattern

Every table in the `public` schema must follow this pattern:

```sql
-- 1. Create the table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS (MANDATORY)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Users can only access own projects"
  ON public.projects FOR ALL
  USING (auth.uid() = user_id);
```

Without step 2, any user with the `anon` key can read ALL rows in the table.

## Reporting Vulnerabilities

If you discover a security vulnerability in Vibe Stack, please [open a private issue](https://github.com/vibestackdev/vibe-stack/security/advisories/new) or email security concerns directly.

Do NOT open a public issue for security vulnerabilities.

---

*Vibe Stack security rules are updated whenever Next.js, Supabase, or Stripe release security-relevant changes. All paid tiers include lifetime updates.*
