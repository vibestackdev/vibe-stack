# Changelog

All notable changes to Vibe Stack will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] - 2026-03-30

### Added
- **20 `.mdc` Architecture Rules** — Battle-tested constraints for AI-assisted development
  - `supabase-auth-security.mdc` — Bans getSession(), enforces getUser()
  - `nextjs15-params.mdc` — Prevents synchronous params (Next.js 15 breaking change)
  - `supabase-ssr-only.mdc` — Blocks deprecated auth-helpers-nextjs
  - `security.mdc` — OWASP Top 10 enforcement
  - `stripe-payments.mdc` — Server-only Stripe integration
  - `typescript-strict.mdc` — Bans `any`, enforces Zod
  - `performance.mdc` — Parallel fetching, N+1 prevention
  - `server-vs-client-components.mdc` — Prevents 'use client' overuse
  - `project-context.mdc` — Global architecture context
  - `server-actions.mdc` — Zod validation + ActionResponse
  - `error-handling.mdc` — Error boundaries
  - `supabase-rls.mdc` — Row Level Security enforcement
  - `shadcn-patterns.mdc` — Form patterns
  - `api-design.mdc` — Route Handler standards
  - `testing.mdc` — Vitest + Playwright
  - `git-conventions.mdc` — Conventional commits
  - `ai-collaboration.mdc` — 3-stage agentic loop
  - `file-naming.mdc` — Naming conventions + import order
  - `database-design.mdc` — Schema patterns + RLS templates
  - `env-management.mdc` — Secret classification

- **4 MCP Server Integrations** — GitHub, Filesystem, Supabase, Browser
- **Complete Auth System** — Login, signup, email verification (PKCE), protected dashboard
- **Stripe Integration** — Webhook handler, checkout, customer portal
- **Resend Email** — Welcome + password reset templates
- **3 n8n Workflows** — GitHub star leads, Dev.to cross-post, Gumroad CRM
- **Documentation** — VIBE-CODING.md, ARCHITECTURE.md, MCP-SETUP.md
- **Error Handling** — Global error boundary, loading state, custom 404
- **Type Safety** — ActionResponse<T>, UserProfile, type-safe env config
