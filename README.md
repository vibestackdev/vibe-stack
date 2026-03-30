# ⚡ Vibe Stack

### Stop fixing AI-generated bugs. Start shipping production apps.

A **Next.js 15 + Supabase boilerplate** with **22 `.mdc` architecture rules** that physically prevent AI coding assistants from hallucinating insecure auth, deprecated packages, and broken patterns.

> **The problem:** AI models generate code that compiles perfectly but ships critical vulnerabilities — `getSession()` instead of `getUser()`, synchronous params that crash in Next.js 15, missing RLS policies that expose your database. These bugs are invisible until production.
>
> **The fix:** Architecture rules that override the AI's training data. When a rule says "NEVER use getSession()", the model is constrained to generate the secure pattern. Every time.

---

## 🏗️ What's Inside

### 22 Architecture Rules (`.cursor/rules/`)

| Rule File | What It Prevents |
|---|---|
| `supabase-auth-security.mdc` | Bans `getSession()`, enforces `getUser()` for JWT verification |
| `nextjs15-params.mdc` | Prevents synchronous `params` access (the #1 Next.js 15 breaking change) |
| `supabase-ssr-only.mdc` | Blocks deprecated `@supabase/auth-helpers-nextjs` imports |
| `security.mdc` | OWASP Top 10 enforcement with rate limiting examples |
| `stripe-payments.mdc` | Server-only Stripe, webhook signature verification |
| `typescript-strict.mdc` | Bans `any`, enforces Zod validation at every boundary |
| `performance.mdc` | Parallel fetching, N+1 prevention, dynamic imports |
| `server-vs-client-components.mdc` | Prevents unnecessary `'use client'` overuse |
| `project-context.mdc` | Global context rule (always active) — maps the full architecture |
| `server-actions.mdc` | Zod validation + structured error returns |
| `error-handling.mdc` | Mandates error boundaries and loading states |
| `supabase-rls.mdc` | Enforces Row Level Security on every table |
| `shadcn-patterns.mdc` | Form patterns with react-hook-form + Zod |
| `api-design.mdc` | Standard Route Handler patterns with auth checks |
| `testing.mdc` | Vitest + Playwright testing strategy |
| `git-conventions.mdc` | Conventional commits + PR structure |
| `ai-collaboration.mdc` | The 3-stage agentic loop (Plan → Implement → Verify) |
| `file-naming.mdc` | File/directory naming conventions + import order |
| `database-design.mdc` | Schema patterns, UUID keys, RLS templates |
| `env-management.mdc` | Secret classification + NEXT_PUBLIC_ safety rules |
| `hydration-safety.mdc` | Prevents hydration mismatches (Math.random, window, Date) |
| `caching-revalidation.mdc` | Correct caching defaults + revalidatePath after mutations |

### 4 MCP Integrations (`.cursor/mcp.json`)

Your AI doesn't just write code — it **reads your GitHub PRs, inspects your Supabase schema, navigates your filesystem, and browses your running app.**

- **GitHub MCP** — AI reads PRs, commit history, and issues
- **Supabase MCP** — AI inspects your database schema and RLS policies
- **Filesystem MCP** — AI navigates your project structure
- **Browser MCP** — AI takes screenshots and tests your running app

### Production Application Layer

```
src/
├── app/
│   ├── (auth)/              # Login + Signup with Zod validation
│   ├── auth/confirm/        # PKCE email verification callback
│   ├── dashboard/           # Protected dashboard (server-side auth)
│   ├── api/webhooks/stripe/ # Stripe webhook handler
│   ├── page.tsx             # Dark-mode landing page
│   ├── error.tsx            # Global error boundary
│   ├── loading.tsx          # Global loading state
│   └── not-found.tsx        # Custom 404
├── lib/
│   ├── supabase/            # Server + client factories + middleware
│   ├── stripe/              # Checkout + portal utilities
│   ├── email/               # Resend templates (welcome, password reset)
│   ├── env.ts               # Type-safe environment variables
│   └── utils.ts             # cn() helper + utilities
├── types/                   # ActionResponse, UserProfile, PaginatedResponse
└── middleware.ts             # Session refresh
```

### 3 n8n Automation Workflows

Ready-to-import JSON templates that replace a $200/month marketing stack:

- **GitHub Star → Lead Capture** — Auto-emails stargazers with your paid product link
- **Dev.to → Social Cross-Post** — Auto-tweets new articles
- **Gumroad Sale → CRM + Thank You** — Tracks customers in Notion, sends onboarding email

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

Open in **Cursor** and start building. The rules activate automatically.

Read [`docs/VIBE-CODING.md`](docs/VIBE-CODING.md) for the complete prompting framework.

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [VIBE-CODING.md](docs/VIBE-CODING.md) | The 3-stage agentic loop for AI-assisted development |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 8 Architecture Decision Records — explains every "why" |
| [MCP-SETUP.md](docs/MCP-SETUP.md) | Step-by-step MCP server setup guide |

---

## 🔥 How It Compares

| Feature | Vibe Stack | ShipFast ($169) | MakerKit ($299) |
|---|:---:|:---:|:---:|
| AI Architecture Rules | ✅ 22 rules | ❌ | ❌ |
| MCP Integrations | ✅ 4 servers | ❌ | ❌ |
| n8n Automations | ✅ 3 workflows | ❌ | ❌ |
| Next.js 15 + React 19 | ✅ | ✅ | ✅ |
| Supabase SSR Auth | ✅ Secure | ✅ | ✅ |
| Stripe Payments | ✅ | ✅ | ✅ |
| Time to First Feature | **20 min** | 3-4 hours | 1-2 days |
| Documentation to Read | 3 short docs | 400+ pages | 200+ pages |
| Learning Curve | **Your AI reads the rules** | You read their docs | You read their docs |

---

## 💎 Want the Complete System?

This repo is the free foundation. The extended version includes the full boilerplate, Stripe integration, email templates, n8n workflows, and the Vibe Coding Masterclass.

**→ [Get the AI Builder's Complete System](https://vibestackdev.gumroad.com/l/vibe-stack)**

| Tier | What You Get | Price |
|---|---|---|
| **Rules Pack** | All 22 .mdc rules + Vibe Coding guide | $29 |
| **Builder System** | Rules + 4 MCP configs + Architecture docs + SQL migrations | $69 |
| **Complete Vault** | Everything + full boilerplate + Stripe + email + Masterclass | $149 |

---

## 🤝 Contributing

Found a hallucination pattern I'm missing? Open an issue describing the incorrect pattern the AI generates and the correct fix. I'll add it as a new rule.

## 📄 License

MIT — use it however you want.

---

*Built by [VibeStack](https://github.com/vibestackdev) — Architecture intelligence for AI-assisted development.*
