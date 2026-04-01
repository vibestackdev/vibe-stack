# AGENTS.md — AI Coding Agent Instructions

> This file provides project context and instructions for AI coding agents (Cursor, Claude, Copilot, Windsurf, Cline) working within this codebase.

## Project Overview

**Vibe Stack** is a production-ready Next.js 15 + Supabase boilerplate designed for AI-assisted development. It includes 22 `.mdc` architecture rule files that constrain AI models to generate secure, modern, production-grade code.

### Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Runtime:** React 19
- **Database & Auth:** Supabase (PostgreSQL, Auth with SSR, Row Level Security)
- **Payments:** Stripe (Checkout Sessions, Webhooks, Customer Portal)
- **Email:** Resend (transactional email with HTML templates)
- **Validation:** Zod (runtime validation at every boundary)
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript (strict mode, no `any`)

### Architecture Principles
1. **Server Components by default** — Only use `'use client'` when hooks or event handlers are required
2. **`getUser()` over `getSession()`** — Server-side auth MUST use `getUser()` for JWT verification
3. **`@supabase/ssr` only** — Never import from the deprecated `@supabase/auth-helpers-nextjs`
4. **Zod at every boundary** — All user input validated before processing
5. **RLS on every table** — Row Level Security is mandatory, never optional

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/             # Auth route group (login, signup)
│   │   ├── actions.ts      # Auth server actions with Zod validation
│   │   ├── login/page.tsx  # Login page (Server Component)
│   │   └── signup/page.tsx # Signup page (Server Component)
│   ├── auth/confirm/       # PKCE email verification callback
│   ├── dashboard/          # Protected pages (requires auth)
│   ├── api/webhooks/       # External webhook handlers (Stripe)
│   ├── layout.tsx          # Root layout (fonts, metadata, dark mode)
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Global loading state
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # Custom 404
├── lib/                    # Business logic & integrations
│   ├── supabase/           # Server + Client factories + middleware helper
│   ├── stripe/             # Checkout session + customer portal helpers
│   ├── email/              # Resend email templates (welcome, password reset)
│   ├── env.ts              # Type-safe environment variable access
│   └── utils.ts            # cn() helper and general utilities
├── types/                  # Shared TypeScript types
│   └── index.ts            # ActionResponse<T>, UserProfile, PaginatedResponse
└── middleware.ts            # Session refresh entry point

.cursor/
├── rules/                  # 22 .mdc architecture rules (auto-loaded by Cursor)
└── mcp.json                # 4 MCP server configurations

docs/
├── VIBE-CODING.md          # The 3-stage agentic loop framework
├── ARCHITECTURE.md         # 8 Architecture Decision Records
└── MCP-SETUP.md            # MCP server setup guide

n8n-workflows/              # 3 importable n8n automation templates
```

## Key Patterns

### Server Actions
All mutations use Server Actions with this pattern:
```typescript
'use server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({ /* fields */ })

export async function myAction(formData: FormData): Promise<ActionResponse<T>> {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: 'Validation failed' }
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  
  // ... business logic
  return { data: result }
}
```

### Auth Check Pattern
```typescript
// ALWAYS use this pattern in Server Components and Server Actions
const supabase = await createClient()
const { data: { user }, error } = await supabase.auth.getUser()
if (error || !user) redirect('/login')
```

### Environment Variables
- `NEXT_PUBLIC_*` — Safe to expose to client (Supabase URL, app URL)
- Everything else — Server-only (Stripe secret, Supabase service role, Resend key)
- Access via `src/lib/env.ts` for type safety

## Rules System

The `.cursor/rules/` directory contains 22 `.mdc` files that auto-activate based on file globs. These rules override AI training data defaults to prevent:
- Insecure auth patterns (`getSession()` → `getUser()`)
- Deprecated package imports
- Next.js 15 breaking changes (async params)
- Missing RLS policies
- Client-side Stripe usage
- Hydration mismatches
- N+1 query patterns

When adding new features, the AI should read and follow all applicable rules automatically.

## MCP Integrations

4 MCP servers are pre-configured in `.cursor/mcp.json`:
- **GitHub MCP** — Read repos, PRs, issues, commits
- **Supabase MCP** — Inspect database schema and RLS policies (read-only)
- **Filesystem MCP** — Navigate project structure
- **Browser MCP** — Take screenshots and test the running app

## Contributing

When adding new features:
1. Follow the 3-stage agentic loop: Plan → Implement (in batches) → Verify
2. Check applicable `.mdc` rules before writing code
3. Use Server Components by default
4. Validate all input with Zod
5. Add RLS policies for any new tables
6. Use conventional commits (`feat:`, `fix:`, `docs:`)
