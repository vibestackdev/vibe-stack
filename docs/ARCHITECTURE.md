# Architecture Decision Records

This document explains **why** every architectural choice was made in Vibe Stack.
Understanding the "why" is critical — it lets you extend the boilerplate without
accidentally breaking the security or performance guarantees.

---

## 1. Why Server Components by Default?

**Decision:** Every `.tsx` file is a React Server Component unless it explicitly has `'use client'`.

**Why:** Server Components:
- Never ship JavaScript to the browser (smaller bundles)
- Can directly access the database, file system, and environment variables
- Are automatically streamed with Suspense boundaries
- Cannot leak secrets to the client

**Rule:** `server-vs-client-components.mdc` enforces this. The AI is trained to default
to Server Components and only add `'use client'` when hooks or event handlers are needed.

---

## 2. Why `getUser()` Instead of `getSession()`?

**Decision:** We ban `getSession()` in all server-side code.

**Why:** `getSession()` reads the JWT from cookies but does NOT verify it with Supabase's
auth server. A malicious user can craft a fake JWT that `getSession()` accepts as valid.
`getUser()` sends a network request to Supabase to cryptographically verify the token.

**Impact:** Every millisecond of latency added by `getUser()` is worth the security guarantee.
If you need performance, cache the result in the request scope — never cache the auth check itself.

**Rule:** `supabase-auth-security.mdc` enforces this globally.

---

## 3. Why Middleware for Session Refresh?

**Decision:** We use Next.js middleware to refresh Supabase sessions on every request.

**Why:** Supabase issues short-lived access tokens (1 hour default). Without middleware
refreshing these tokens transparently, users will be silently logged out after an hour
and Server Components will see `null` users — leading to confusing redirect loops.

The middleware calls `updateSession()` which:
1. Reads the current cookies
2. Attempts to refresh the access token if it's expired
3. Sets the new cookies on the response

**File:** `src/middleware.ts` → calls `src/lib/supabase/middleware.ts`

---

## 4. Why Zod at Every Boundary?

**Decision:** All external input must pass through a Zod schema before processing.

**Why:** TypeScript types are erased at runtime. A `FormData` object from a form submission
or a `request.json()` from an API call can contain anything — including malicious payloads.
Zod provides runtime validation that matches your TypeScript types.

**Where to validate:**
- Server Actions: `formData` → Zod → business logic
- Route Handlers: `request.json()` → Zod → business logic
- Webhooks: `event.data` → Zod → database operations

**Rule:** `typescript-strict.mdc` and `server-actions.mdc` enforce this.

---

## 5. Why Route Groups for Auth?

**Decision:** Auth pages (login, signup) are in `app/(auth)/` — a route group.

**Why:** The `(auth)` folder doesn't create a URL segment. `/login` renders from
`app/(auth)/login/page.tsx`. This lets us apply a shared layout to all auth pages
without nesting them under `/auth/login` in the URL.

**Benefit:** Clean URLs + shared auth layout + easy to add forgot-password later.

---

## 6. Why Stripe Checkout Instead of Custom Forms?

**Decision:** We redirect to Stripe-hosted Checkout. We never build custom card forms.

**Why:** Building a custom payment form creates PCI DSS compliance requirements.
You'd need to handle card data securely, implement 3D Secure, handle retries,
and audit your entire infrastructure. Stripe Checkout handles all of this.

**Rule:** `stripe-payments.mdc` enforces this pattern.

---

## 7. Why 4 MCP Servers?

**Decision:** We ship pre-configured MCP integrations for GitHub, Filesystem, Supabase, and Browser.

**Why:** This is our core differentiator. No other boilerplate ships MCP configs.
By letting the AI read your GitHub PRs, inspect your Supabase schema, and browse
your running app, you transform Cursor from a code autocomplete tool into an
autonomous development partner.

**File:** `.cursor/mcp.json` → See `docs/MCP-SETUP.md` for setup instructions.

---

## 8. File Structure Philosophy

```
src/
├── app/                    # Routes and pages (Next.js App Router)
│   ├── (auth)/             # Auth route group (login, signup)
│   │   ├── actions.ts      # Auth server actions
│   │   ├── login/page.tsx  # Login page
│   │   └── signup/page.tsx # Signup page
│   ├── auth/confirm/       # PKCE email verification callback
│   ├── dashboard/          # Protected pages
│   ├── api/webhooks/       # External webhook handlers
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Global loading state
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # Custom 404
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui primitives (generated)
├── lib/                    # Business logic & third-party integrations
│   ├── supabase/           # Server & client factories + middleware
│   ├── stripe/             # Stripe checkout & portal helpers
│   ├── email/              # Resend email templates
│   ├── env.ts              # Type-safe environment variables
│   └── utils.ts            # cn() helper & general utilities
├── types/                  # Shared TypeScript types
│   └── index.ts            # ActionResponse, UserProfile, etc.
└── middleware.ts            # Session refresh (entry point)
```

Every directory has a single responsibility. The AI can navigate this structure
deterministically because the `project-context.mdc` rule maps it.
