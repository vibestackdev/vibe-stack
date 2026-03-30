# 🚀 Vibe Stack: The AI Builder's Next.js Boilerplate

A production-ready Next.js 15 template designed specifically for **AI-assisted "vibe coding"**.

If you're using Cursor, Copilot, or Claude to generate code, generic templates will lead you into a maze of deprecated patterns and security holes. Furthermore, dropping $299 on a "monolithic boilerplate" is a trap—you end up spending 3 days reading their 400-page proprietary documentation just to understand their rigid, bloated architecture.

**Vibe Stack is the antidote.** It is radically modular. You don't have to learn our custom syntax. Instead, this template comes with **pre-configured agent tools (MCP)** and strict **architecture-enforcing cursor rules**. You let the AI build *your* app, but our rules ensure the AI doesn't hallucinate or create security flaws.

## 🎁 What's Included (Free Tier)

- **Next.js 15 App Router** + React 19
- **Tailwind CSS + Shadcn/ui** baseline setup
- **Supabase SSR Auth** utilities (secure by default)
- **.cursor/mcp.json**: Integrated GitHub & local filesystem context
- **15+ Battle-Tested `.mdc` Rules**: Prevents the AI from hallucinating bad Next.js 14 patterns or insecure auth calls.

***

## 👑 Upgrade to The AI Builder's Complete Vault

This repo contains the *base setup*. If you want the complete end-to-end system I use to ship production apps in 4 hours, check out [The AI Builder's Complete System](https://whop.com/example-link).

**The $149 Complete Vault includes:**
1. **The Full Boilerplate Extension**: Multi-tenant SaaS structure, Stripe payments, Resend emails, and PostHog analytics pre-integrated.
2. **Claude MCP Config Pack**: Advanced integrations for Notion, Browser tools, and direct Database querying.
3. **The n8n Agent Lead Machine**: 3 ready-to-deploy workflow templates that replace a $200/mo marketing SaaS.
4. **Vibe Coding Masterclass**: My 5,000-word exact framework for prompting models to build architecture, not just snippets.
5. **Private Discord Community**: Direct support from me.

👉 **[Get the Complete System Here](https://whop.com/example-link)** 👈

***

## 🛠️ Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add your Supabase credentials
4. Run the development server: `npm run dev`

Open your AI code editor (Cursor recommended) and read the `docs/VIBE-CODING.md` guide to get started.

## 🤖 How the Rules Work

This repo includes a `.cursor/rules` directory. When you use Cursor's Composer or AI chat, Cursor will automatically read these rules based on the files you're editing.

For example, if the AI tries to write a database query on the server using `getSession()`, the `supabase-auth-security.mdc` rule will override it and force the secure `getUser()` method instead, preventing major security vulnerabilities before they are even written.

Check `docs/ARCHITECTURE.md` to understand why these rules exist.

---
*Built for the AI Engineering era by Lavie.*
