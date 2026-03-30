# The "Vibe Coding" Mini-Guide: Building with AI

Welcome to the AI Era. Writing code line-by-line is rapidly becoming a legacy skill. Today, the most effective developers are **Architects and Orchestrators**. They focus on product, user flow, and system design, while LLMs handle the syntactic implementation.

This is often called "vibe coding." But to do it in production, you need structure. Without it, your codebase quickly turns into an unmaintainable, insecure ball of mud.

This document outlines the foundation of working with AI coding assistants (like Cursor) effectively.

## 1. The Core Mindset Shift

**Stop asking the AI to "build a feature."**
LLMs are excellent at writing isolated functions, but they lose context over large architectures.

**Start asking the AI to "plan, verify, and implement."**
You must command the AI to act systematically. Use the 3-Step Agentic Loop:

### Step 1: PLAN
Before writing any code, prompt the AI:
> *"Analyze the current project structure and plan out exactly how we should implement [Feature]. Detail which files will be created or modified, what Next.js components will be used (Server vs Client), and how the database schema will change. Do NOT write the implementation code yet."*

### Step 2: VERIFY
Review the AI's plan.
- Is it trying to use a deprecated package?
- Did it specify `'use client'` where a Server Component would be better?
- This is where YOU inject your architectural expertise. Correct the plan before it generates junk code.

### Step 3: IMPLEMENT (in batches)
Once the plan is solid, tell it to proceed:
> *"Implement the plan for the database migration and the Server Actions first. Stop when you're done so I can review before moving to the UI."*

## 2. Why Cursor Rules (`.mdc` files) Matter

AI models are trained on internet data, which means they are trained on tutorials from 3 years ago. If you ask an LLM to build a Next.js page, it will almost certainly spit out Next.js 13/14 code. It might use the deprecated pages router, synchronous `params`, or older Supabase `auth-helpers`.

The `.cursor/rules/` directory in this boilerplate acts as **anti-hallucination armor**. 

When you ask Cursor to build something, it first reads the rules associated with your current file context. We have provided strict, production-tested rules that force the AI to:
- Await async `params` in Next.js 15
- Use `@supabase/ssr` instead of deprecated packages
- Enforce strict Row Level Security (RLS) policies
- Implement `error.tsx` and `loading.tsx` boundaries automatically

By modifying these rules over time, you effectively "train" your own personal AI engineer to write code exactly how you want it.

## 3. Reviewing AI Code (The Checklist)

Never blind-commit AI code. Always review the diffs. Your job is now **Senior Code Reviewer**.

Look for these common AI failures:
1. **The "Everything is Client" Problem:** Did it unnecessarily add `'use client'` to the top of a file that just fetches data?
2. **The "Silent Catch" Problem:** Check error handlers. AI loves to write `catch (error) { console.log(error) }` and move on, leaving the user with a broken UI and no feedback.
3. **The "N+1 Query" Problem:** Did the AI put a database fetch inside a `.map()` loop?

## 4. Upgrading Your System

This boilerplate gives you the foundation. 

If you want to move from "writing small apps faster" to "deploying full-scale SaaS businesses autonomously," you need to expand your toolset to include **Agentic Orchestration**.

This involves using **MCP (Model Context Protocol)** servers to allow Claude to connect directly to your GitHub PRs, your Slack channels, and your live databases without leaving your editor. It also involves offloading backend logic to visual automation tools like **n8n**.

If you're ready to make that jump, upgrade to **The AI Builder's Complete System**. It includes all the advanced MCP scripts, the full 5,000-word Masterclass on agentic workflow, and the pre-built n8n automations that handle the business side of your SaaS.

*Happy Vibe Coding.*
