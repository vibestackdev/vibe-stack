# ⚡ Vibe Stack

### Stop fixing AI-generated bugs. Start shipping production apps.

A **Next.js 15 + Supabase boilerplate** with **29 `.mdc` architecture rules** that physically prevent AI coding assistants from hallucinating insecure auth, deprecated packages, and broken patterns.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-SSR-3ecf8e?logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **The problem:** AI models generate code that compiles perfectly but ships critical vulnerabilities — `getSession()` instead of `getUser()`, synchronous params that crash in Next.js 15, missing RLS policies that expose your database. These bugs are invisible until production.
>
> **The fix:** Architecture rules that override the AI's training data. When a rule says "NEVER use getSession()", the model is constrained to generate the secure pattern. Every time.

---

## 🚀 Quick Start

```bash
git clone https://github.com/vibestackdev/vibe-stack.git
cd vibe-stack
npm install
cp .env.example .env.local
# Add your Supabase URL + anon key to .env.local
npm run dev
```

Open in **Cursor** and start building. The rules activate automatically — zero configuration.

---

## 🆓 What's Free (This Repo)

This open-source repo includes **5 foundational architecture rules** — the most critical safeguards for any Next.js 15 + Supabase project:

| Free Rule | What It Prevents |
|---|---|
| `supabase-auth-security.mdc` | Bans `getSession()`, enforces `getUser()` for JWT verification |
| `nextjs15-params.mdc` | Prevents synchronous `params` access (the #1 Next.js 15 breaking change) |
| `supabase-ssr-only.mdc` | Blocks deprecated `@supabase/auth-helpers-nextjs` imports |
| `server-vs-client-components.mdc` | Prevents unnecessary `'use client'` overuse |
| `supabase-rls.mdc` | Enforces Row Level Security on every table |

Plus:
- ✅ Next.js 15 App Router + React 19 + TypeScript (strict mode)
- ✅ Supabase SSR auth (the secure way — PKCE flow, middleware refresh)
- ✅ Working auth flow (login → signup → email confirm → protected dashboard)
- ✅ Error boundaries, loading states, custom 404
- ✅ `VIBE-CODING.md` Phase 1 — The 3-stage agentic loop foundation
- ✅ `AGENTS.md` — AI coding agent instructions for Cursor/Copilot/Claude

**These 5 rules alone catch the most dangerous AI hallucination patterns.** Clone it, try it, and see the difference.

---

## 💎 The Complete System (Paid)

The free rules are the foundation. The **AI Builder's Complete System** is the entire architecture:

### Tier 1: Rules Pack — $29

**For developers who already have a project** and want to stop fixing AI hallucinations.

- ✅ All **29 battle-tested `.mdc` rules** (20 more than the free tier):
  - `security.mdc` — OWASP Top 10 with rate limiting examples
  - `stripe-payments.mdc` — Server-only Stripe, webhook signature verification
  - `typescript-strict.mdc` — Bans `any`, enforces Zod at every boundary
  - `performance.mdc` — Parallel fetching, N+1 prevention, dynamic imports
  - `database-design.mdc` — Schema patterns, UUID keys, RLS templates
  - `hydration-safety.mdc` — Prevents hydration mismatches
  - `caching-revalidation.mdc` — Correct caching + revalidatePath
  - `env-management.mdc` — Secret classification + NEXT_PUBLIC_ safety
  - `api-validation.mdc` — Input validation patterns for Route Handlers
  - `middleware-auth.mdc` — Protected route middleware patterns
  - `file-uploads.mdc` — Secure file upload with Supabase Storage
  - ...and 9 more covering testing, components, API design, git, and shadcn/ui
- ✅ **Lifetime updates** — new rules added as frameworks evolve

### Tier 2: Builder System — $69 ← MOST POPULAR

**For developers starting a new project** who want a production-ready foundation.

- ✅ Everything in Tier 1, PLUS:
- ✅ **4 pre-configured MCP servers** (GitHub, Supabase, Filesystem, Browser)
- ✅ Complete **MCP Setup Guide** with copy-paste examples
- ✅ **ARCHITECTURE.md** — 8 Architecture Decision Records explaining every choice
- ✅ **SQL migration templates** with auto-profile creation and RLS policies
- ✅ Type-safe environment configuration
- ✅ **Vibe Coding Masterclass Phases 2-3** (Advanced Debugging + Agentic Power Tools)

### Tier 3: Complete Vault — $149

**The full end-to-end system** for shipping production SaaS apps with AI.

- ✅ Everything in Tiers 1 & 2, PLUS:
- ✅ **Complete Next.js 15 boilerplate** with working Stripe subscriptions
- ✅ **Resend email integration** with branded HTML templates
- ✅ **3 n8n automation workflows** (lead capture, social cross-post, sale CRM)
- ✅ **The full Vibe Coding Masterclass** (3,500+ words)
- ✅ **Priority email support** from the creator
- ✅ **All future updates for life**

**→ [Get the AI Builder's Complete System](https://vibestackdev.gumroad.com/l/vibe-stack)**

---

## 🏗️ Architecture Overview

```
src/
├── app/
│   ├── (auth)/              # Login + Signup with Zod validation
│   ├── auth/confirm/        # PKCE email verification callback
│   ├── dashboard/           # Protected dashboard (server-side auth)
│   ├── api/webhooks/stripe/ # Stripe webhook handler ⭐ Vault
│   ├── page.tsx             # Dark-mode landing page
│   ├── error.tsx            # Global error boundary
│   ├── loading.tsx          # Global loading state
│   └── not-found.tsx        # Custom 404
├── lib/
│   ├── supabase/            # Server + client factories + middleware
│   ├── stripe/              # Checkout + portal utilities ⭐ Vault
│   ├── email/               # Resend templates ⭐ Vault
│   ├── env.ts               # Type-safe environment variables
│   └── utils.ts             # cn() helper + utilities
├── types/                   # ActionResponse, UserProfile, PaginatedResponse
└── middleware.ts             # Session refresh
```

---

## 🔥 How It Compares

| Feature | Vibe Stack (Free) | Vibe Stack ($149) | ShipFast ($169) | MakerKit ($299) |
|---|:---:|:---:|:---:|:---:|
| AI Architecture Rules | 5 rules | **29 rules** | ❌ | ❌ |
| MCP Integrations | ❌ | ✅ 4 servers | ❌ | ❌ |
| n8n Automations | ❌ | ✅ 3 workflows | ❌ | ❌ |
| AGENTS.md | ✅ | ✅ | ❌ | ❌ |
| Next.js 15 + React 19 | ✅ | ✅ | ✅ | ✅ |
| Supabase SSR Auth | ✅ Secure | ✅ Secure | ✅ | ✅ |
| Stripe Payments | ❌ | ✅ | ✅ | ✅ |
| Time to First Feature | **20 min** | **20 min** | 3-4 hours | 1-2 days |
| Documentation to Read | 3 short docs | 3 short docs | 400+ pages | 200+ pages |
| Learning Curve | **AI reads the rules** | **AI reads the rules** | You read their docs | You read their docs |

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [VIBE-CODING.md](docs/VIBE-CODING.md) | The 3-stage agentic loop for AI-assisted development |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 8 Architecture Decision Records — explains every "why" |
| [MCP-SETUP.md](docs/MCP-SETUP.md) | Step-by-step MCP server setup guide |
| [AGENTS.md](AGENTS.md) | AI coding agent instructions for this project |

---

## 🤝 Contributing

Found a hallucination pattern we're missing? [Open an issue](https://github.com/vibestackdev/vibe-stack/issues/new) describing the incorrect pattern the AI generates and the correct fix. We'll add it as a new rule.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT — use it however you want.

---

*Built by [VibeStack](https://github.com/vibestackdev) — Architecture intelligence for AI-assisted development.*
