# n8n AI Lead Machine — Workflow Templates

This directory contains 3 ready-to-import n8n automation workflows that replace a $200/month marketing SaaS stack.

## 📥 How to Import

1. Open your n8n instance (self-hosted or cloud)
2. Click **"+ Add Workflow"** → **"Import from File"**
3. Select any `.json` file from this directory
4. Update the placeholder credentials (marked with `YOUR_*`)

---

## Workflow 1: GitHub Star Lead Machine
**File:** `github-star-lead-machine.json`

**What it does:**
When someone stars your GitHub repo, this workflow automatically:
1. Captures their username, email, and avatar into a Google Sheet
2. Sends them a branded welcome email with a link to your paid product

**Setup Required:**
- GitHub webhook (Settings → Webhooks → point to your n8n webhook URL)
- Google Sheets API credentials
- Gmail credentials

**Why this matters:** Every GitHub star is a high-intent developer who actively chose to bookmark your work. This workflow converts that passive interest into an email subscriber and potential customer — automatically, 24/7.

---

## Workflow 2: Dev.to Social Cross-Post
**File:** `devto-social-crosspost.json`

**What it does:**
Every 6 hours, checks your Dev.to account for new published articles. When a new article is detected, it automatically formats and posts a promotional tweet to X/Twitter.

**Setup Required:**
- Dev.to API key (Settings → Extensions)
- X/Twitter API credentials

**Why this matters:** Cross-posting is the #1 distribution hack for developer content. But manually tweeting every time you publish is tedious and easy to forget. This runs silently in the background.

---

## Workflow 3: Gumroad Sale → Notion CRM
**File:** `gumroad-sale-crm.json`

**What it does:**
When someone buys your product on Gumroad, this workflow:
1. Creates a row in your Notion CRM with the customer's email, product name, revenue, and date
2. Sends a branded "Thank You" email with onboarding instructions

**Setup Required:**
- Gumroad webhook (Settings → Advanced → Ping URL → n8n webhook URL)
- Notion API integration + database ID
- Gmail credentials

**Why this matters:** Manual follow-up emails are the #1 missed revenue opportunity for indie creators. This automates your entire post-sale experience while building a customer database you own.

---

## 🔐 Security Notes

- **Never commit credentials.** All credential fields use `YOUR_*` placeholders.
- **Use n8n's built-in credential manager** to store API keys securely.
- **Webhook URLs are public endpoints.** Consider adding signature verification for production use.
- **Test with a single record first** before enabling production webhooks.
