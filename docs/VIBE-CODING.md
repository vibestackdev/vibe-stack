# The Vibe Coding Masterclass

> **The Complete Framework for Building Production Apps with AI**
>
> This guide is broken into 3 phases. Phase 1 (free) teaches the foundation.
> Phases 2-3 are included in the Complete Vault.

---

## Phase 1: The Foundation

### The Core Mindset Shift

Stop asking the AI to "build a feature."

LLMs excel at writing isolated functions with perfect syntax. But they lose context across large architectures. When you prompt "build me a dashboard with auth," you're asking the model to simultaneously solve authentication, database access, component architecture, error handling, and UI — across 8+ files. That's where hallucinations happen.

**Start asking the AI to "plan, then implement in batches, then self-audit."**

### The 3-Stage Agentic Loop

Every feature you build should follow this exact sequence:

#### Stage 1: PLAN (The Architect Prompt)

Before the AI writes a single line of code, force it to think architecturally:

> *"I need to add Stripe subscription management to this app. Before writing any code, create an Architectural Plan that includes:*
> 1. *Which files you'll create or modify*
> 2. *Which are Server Components vs Client Components (justify each)*
> 3. *What database changes are needed (tables, RLS policies)*
> 4. *What environment variables are required*
> 5. *What edge cases or security concerns exist*
>
> *Wait for my approval before proceeding."*

This single prompt change is worth more than any boilerplate. By forcing the AI to plan, you catch bad decisions before they become 500 lines of bad code.

**Why this works:** LLMs are "eager to please" — they'll immediately start writing code to show you progress. But the first implementation they generate is usually based on the simplest (and often wrong) approach. Making them plan forces a deeper reasoning pass.

#### Stage 2: IMPLEMENT (Constrained Batches)

Once you approve the plan, tell the AI to implement in small focused chunks:

> *"Execute Phase 1 only — create the database schema and RLS policies. Stop when Phase 1 is complete. Do not start the UI."*

Then review. Then:

> *"Phase 1 looks good. Execute Phase 2 — create the server actions for subscription management. Stop when done."*

**Why batches?** AI output quality degrades as context grows. A model generating 200 lines of code in one shot makes 3-5x more errors than one generating 50 lines four times. Small batches = higher quality.

#### Stage 3: VERIFY (Self-Audit)

After each batch, ask the AI to review its own work:

> *"Review the server action you just wrote. Check:*
> 1. *Did you use getUser() not getSession()?*
> 2. *Did you validate input with Zod?*
> 3. *Is the error handling consistent with our ActionResponse type?*
> 4. *Did you add rate limiting for this sensitive endpoint?*
>
> *Fix any issues you find."*

On average, the AI catches 2-3 issues in its own code when asked to self-audit. That's 2-3 bugs you don't ship to production.

---

### Why .mdc Rules Are Non-Negotiable

AI models are trained on internet data from 2-3 years ago. When you ask an LLM to build a Next.js page, it generates Next.js 13 patterns. It uses:

- `getSession()` instead of `getUser()` (deprecated, insecure)
- Synchronous `params` (crashes in Next.js 15)
- `@supabase/auth-helpers-nextjs` (deprecated in favor of `@supabase/ssr`)
- `'use client'` on everything (ships unnecessary JavaScript)

The `.cursor/rules/` directory overrides these defaults. Each `.mdc` file is read automatically by Cursor based on which files you're editing (via `globs` in the YAML frontmatter).

You don't need to remember to mention security in your prompts. The rules inject that context automatically.

### The Code Review Checklist

Never blind-commit AI code. Your role has shifted from Writer to **Senior Reviewer**.

After every AI-generated batch, check for:

1. **The "Everything is Client" Problem** — Did it add `'use client'` to a file that only fetches data? If yes, remove it — Server Components are faster and more secure.

2. **The "Silent Catch" Problem** — Check error handlers. AI loves `catch (error) { console.log(error) }`, leaving users with broken UIs and zero feedback. Force it to return structured errors.

3. **The "N+1 Query" Problem** — Did the AI put a database query inside a `.map()` loop? That fires 100 queries instead of 1. Use `.in()` for batch fetching.

4. **The "Hardcoded Secret" Problem** — Did it hardcode an API key or URL instead of using environment variables?

5. **The "Missing Validation" Problem** — Is user input flowing directly into a database query without Zod validation?

---

## Phase 2: Advanced Workflows (Complete Vault)

### Debugging AI-Generated Code

When AI code breaks, debugging follows a different process than debugging human-written code.

#### The 3-Layer Debug Protocol

**Layer 1: Trace the Error to a Rule Violation**

Most AI bugs are caused by violating one of your `.mdc` rules. Before digging into the code, ask:

> *"This error is occurring in `/app/dashboard/page.tsx`. Check our project rules and tell me which rules apply to this file. Then review the file against each applicable rule and identify any violations."*

The AI will cross-reference the file against your rules and often immediately identify the bug.

**Layer 2: Version Mismatch Detection**

If the error isn't a rule violation, it's likely a version mismatch. Ask:

> *"Check `package.json` for the versions of Next.js, React, and Supabase. Then review the code in this file and tell me if any patterns are incompatible with these specific versions."*

Common finds: Next.js 14 patterns in a Next.js 15 project, React 18 patterns in React 19.

**Layer 3: Isolation**

If the first two layers don't find it:

> *"Create a minimal reproduction of this bug in a single file. Strip out everything except the broken functionality. Show me the simplest code that reproduces the error."*

Isolation forces the AI to separate the bug from the complexity of your codebase.

### Multi-File Orchestration

For features spanning 5+ files, use the **Dependency Map** technique:

> *"Before implementing, draw me a dependency map of this feature. Show which files import from which other files, and the order they should be created to avoid import errors."*

Then implement bottom-up: utilities first, then types, then server logic, then UI.

### The Context Window Budget

Every AI model has a context window limit. When you exceed it, the model starts "forgetting" earlier instructions — including your rules.

**Symptoms of context overflow:**
- The AI starts using `getSession()` again (it forgot the rule)
- Generated code contradicts instructions from earlier in the conversation
- The AI starts repeating itself or generating generic code

**The fix:** Start a new conversation. Your `.mdc` rules survive conversation resets because they're loaded from disk, not from chat history. This is the entire architectural advantage of rule files over prompt engineering.

---

## Phase 3: Agentic Power Tools (Complete Vault)

### MCP: Giving Your AI Superpowers

MCP (Model Context Protocol) lets your AI connect to external tools directly from your IDE.

With the 4 MCP servers in Vibe Stack, your AI can:

1. **Read your GitHub PRs** — "Review the latest PR and tell me if it violates any of our architecture rules"
2. **Inspect your Supabase schema** — "Check if all tables have RLS enabled and flag any that don't"
3. **Navigate your file system** — "Find all files that import from the deprecated auth-helpers package"
4. **Browse your running app** — "Take a screenshot of the /dashboard page and tell me if the layout matches the mockup"

### n8n: Automating the Business Layer

Code is only half of a SaaS. The other half is distribution, lead capture, and customer management.

The 3 n8n workflows included in Vibe Stack automate:

1. **Lead Capture** — Every GitHub star triggers an automated welcome email with a link to your paid product
2. **Content Distribution** — New Dev.to articles are automatically promoted on social media
3. **Customer Onboarding** — Every Gumroad sale creates a CRM entry and sends a branded onboarding email

These workflows replace tools like Mailchimp ($50/mo), Zapier ($30/mo), and a CRM ($30/mo) — saving $110/month on a self-hosted n8n instance.

### The Complete Feature Prompt Template

For any new feature, use this exact prompt template:

```
I need to build [FEATURE NAME].

Context:
- This is a [Next.js 15 / React 19 / Supabase] project
- The user is authenticated via cookie-based Supabase SSR
- We use Server Components by default, Client Components only when needed
- All server actions use Zod validation and return ActionResponse<T>

Requirements:
[List specific requirements]

Before writing code:
1. Create an Architectural Plan listing all files to create/modify
2. Specify Server vs Client for each component (justify)
3. List database changes (tables, columns, RLS policies)
4. Identify security considerations
5. Estimate the number of implementation phases

Wait for my approval before implementing.
```

This template encodes all of your architectural constraints into a single reusable block, ensuring consistent high-quality output regardless of which model you're using.

---

*Happy Vibe Coding. Build fast, ship secure, and let the AI do the heavy lifting — within the guardrails you've set.*
