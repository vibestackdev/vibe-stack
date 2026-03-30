# Contributing to Vibe Stack

Thanks for your interest in contributing! This project thrives on community-reported hallucination patterns.

## How to Contribute

### Report a Hallucination Pattern

If you've found a pattern that AI models consistently get wrong:

1. **Open an issue** with the title: `[Rule Request] Description of the pattern`
2. Include:
   - **The wrong code** the AI generates
   - **The correct code** it should generate
   - **Why it's wrong** (security flaw, deprecated API, performance issue)
   - **Which models** you've tested it with (Claude, GPT-4, Gemini)

### Submit a New Rule

If you've already written a `.mdc` rule:

1. Fork the repo
2. Add your rule to `.cursor/rules/`
3. Ensure it follows the format:
   ```markdown
   ---
   description: Brief description of what this rule prevents
   globs: ["**/relevant/path/**"]
   alwaysApply: false
   ---

   # Rule Title

   CLEAR INSTRUCTION about what to do and not do.
   
   ✅ CORRECT: example code
   ❌ WRONG: example code that AI typically generates
   ```
4. Open a PR with a description of what pattern this prevents

### Improve Documentation

Found a typo? Want to improve an explanation? PRs for documentation are always welcome.

## Development Setup

```bash
git clone https://github.com/vibestackdev/vibe-stack.git
cd vibe-stack
npm install
cp .env.example .env.local
npm run dev
```

## Code of Conduct

Be helpful. Be respectful. We're all here to ship better software with AI.
