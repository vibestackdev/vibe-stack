# MCP Server Configuration Guide

This project ships with **4 pre-configured MCP (Model Context Protocol) servers** that dramatically extend what the AI can do inside your project.

## What is MCP?

MCP lets your AI coding assistant (Cursor, Claude) interact directly with external tools — reading GitHub PRs, querying your database schema, browsing web pages, and accessing your local filesystem — all from within the chat window.

**This is the #1 feature that separates Vibe Stack from every other boilerplate.** Other templates give you code. We give you a fully wired AI development environment.

---

## Server Configuration

### 1. GitHub MCP Server
**Purpose:** Lets the AI read your GitHub repos, PRs, issues, and commits directly.

**Setup:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create a **Fine-grained personal access token** with read access to your repos
3. Replace `<YOUR_GITHUB_PAT>` in `.cursor/mcp.json`

**Example Use:**
> "Read the open pull request on the vibe-stack repo and review the code changes for security issues based on our `.mdc` rules."

---

### 2. Filesystem MCP Server
**Purpose:** Gives the AI read/write access to your project directory.

**Setup:** Works out of the box — no configuration needed.

**Example Use:**
> "List all files in the `src/app/` directory and identify any components that are missing error boundaries."

---

### 3. Supabase MCP Server ⭐ (Vault Feature)
**Purpose:** Lets the AI query your Supabase project directly — inspect tables, read RLS policies, and validate schemas.

**Setup:**
1. Go to [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
2. Generate an access token
3. Replace `<YOUR_SUPABASE_PAT>` in `.cursor/mcp.json`

> ⚠️ **Security:** The server is configured with `--read-only` by default. The AI can inspect your schema but cannot modify your production data.

**Example Use:**
> "Connect to my Supabase project and check if the `profiles` table has RLS enabled. If not, generate the policy SQL."

---

### 4. Browser MCP Server ⭐ (Vault Feature)
**Purpose:** Lets the AI control a headless browser — navigate pages, take screenshots, fill forms, and extract data.

**Setup:** Works out of the box if you have Node.js installed (uses Puppeteer).

**Example Use:**
> "Open localhost:3000/dashboard in the browser, take a screenshot, and tell me if the layout matches our design spec."

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Green dot doesn't appear in Cursor | Restart Cursor after saving `mcp.json` |
| "ENOENT" error | Run `npm install` to ensure `npx` is available |
| GitHub rate limiting | Upgrade to a GitHub Pro token or reduce request frequency |
| Supabase connection refused | Verify your project URL and access token are correct |
