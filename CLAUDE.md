# CLAUDE.md — Vibe Stack Architecture Rules
# For use with Claude Code (Anthropic's agentic CLI)
# These rules prevent the most common AI hallucinations in Next.js 15 + Supabase + Stripe projects.

## Project Overview
This is a Next.js 15 + Supabase + Stripe application using the App Router, TypeScript strict mode, and Tailwind CSS. All server-side auth MUST use `getUser()`, never `getSession()`.

## Tech Stack
- Next.js 15 (App Router only — no Pages Router)
- React 19
- TypeScript (strict mode)
- Supabase (auth, database, storage)
- Stripe (payments via Checkout Sessions)
- Tailwind CSS + shadcn/ui
- Zod (validation at every boundary)

## Critical Build Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build (catches type errors)
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting
```

## SECURITY RULES — NEVER VIOLATE

<security_critical>
1. NEVER use `supabase.auth.getSession()` in server-side code (Server Components, Server Actions, Route Handlers, middleware). It reads the JWT from cookies WITHOUT verifying it — a forged token passes silently. ALWAYS use `supabase.auth.getUser()` which makes a verification call to the Supabase auth server.

2. NEVER import from `@supabase/auth-helpers-nextjs` — it is DEPRECATED. Always use `@supabase/ssr` for both `createBrowserClient` (client) and `createServerClient` (server).

3. NEVER put auth enforcement logic in `middleware.ts`. Middleware runs on Edge Runtime and cannot securely verify Supabase JWTs. Middleware should ONLY call `updateSession()` to refresh tokens. Auth enforcement MUST happen in layouts/pages via `getUser()`.

4. NEVER build a custom credit card form. ALWAYS redirect to Stripe Checkout. Custom forms create PCI compliance liability.

5. NEVER handle Stripe webhook events without calling `stripe.webhooks.constructEvent()` first to verify the `stripe-signature` header. Without this, anyone can POST fake events to your webhook endpoint.

6. NEVER upload files directly from client code using the Supabase anon key — it allows writing to any storage path. ALWAYS generate signed upload URLs server-side, scoped to `user.id`.

7. Row Level Security (RLS) MUST be enabled on EVERY Supabase table. Without RLS, the anon key (public in every client bundle) can read ALL rows from any table.

8. NEVER expose raw error messages, stack traces, or database errors to the client. Log server-side, return `{ error: "Internal server error" }` to the client.
</security_critical>

## NEXT.JS 15 RULES

<nextjs15_breaking_changes>
1. `params` and `searchParams` are PROMISES in Next.js 15. You MUST await them:
```typescript
// CORRECT
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}

// WRONG — compiles but crashes at runtime
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id // TypeError at runtime
}
```

2. After mutations (Server Actions, Route Handlers), ALWAYS call `revalidatePath()` or `revalidateTag()`. Next.js 15 aggressively caches — stale data is the default without explicit revalidation.

3. Use Server Components by default. Only add `'use client'` when the component genuinely needs browser APIs (useState, useEffect, onClick handlers, window/document access).

4. NEVER use `Math.random()`, `Date.now()`, or `new Date()` directly in Server Components for rendering. These cause hydration mismatches. Use them in `useEffect` or pass from the server as props.
</nextjs15_breaking_changes>

## API & VALIDATION RULES

<api_validation>
1. EVERY Route Handler and Server Action MUST validate input with Zod before any business logic. Raw `request.json()` access without validation is a crash and injection risk.

2. Auth check ALWAYS happens BEFORE input validation. Order: authenticate -> validate -> execute.

3. Return consistent error shapes: `{ error: string, details?: unknown }`. Never expose internal error messages.
</api_validation>

## CODE PATTERNS

<code_patterns>
1. TypeScript: NEVER use `any`. Use `unknown` + type narrowing or Zod inference.

2. Always use `cn()` from `@/lib/utils` for conditional Tailwind classes (wraps clsx + tailwind-merge).

3. Server Actions must return `ActionResponse<T>` — `{ success: true, data: T } | { success: false, error: string }`.

4. File naming: kebab-case for files, PascalCase for React components, camelCase for utilities.

5. Import order: React/Next -> external packages -> @/ aliases -> relative imports -> types.
</code_patterns>

## SUPABASE PATTERNS

<supabase>
1. Use `createClient()` from `@/lib/supabase/server` in Server Components and Server Actions.
2. Use `createClient()` from `@/lib/supabase/client` in Client Components.
3. Always handle errors: `const { data, error } = await supabase.from('table').select()` — check `error` before using `data`.
4. Enable RLS on every table. Write policies that check `auth.uid()`.
5. For email auth, implement the PKCE flow with a callback route at `app/auth/confirm/route.ts`.
</supabase>

## WORKFLOW

<workflow>
1. Before writing any code, read the relevant source files to verify current state — do not rely on memory.
2. After generating code, run `npx tsc --noEmit` to verify types.
3. Run `npm run lint` before declaring a task complete.
4. For complex features, break into sub-tasks and verify each step independently.
</workflow>
