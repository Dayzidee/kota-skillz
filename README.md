<h1 align="center">Kota Skillz</h1>

<p align="center">
  <strong>The Industrial-Grade "Vibe Coding" Standard Library</strong><br>
  <em>Stop generating React soup and insecure backend code. Give your AI constraints.</em>
</p>

---

## 🛑 The Problem: AI Needs Constraints

The rise of "Vibe Coding" (building software entirely by talking to AI agents like Cursor, Copilot, or Gemini) has exposed a massive flaw in current models: **They lack context.**

When you tell an AI to "build a login page," it relies on the statistical average of GitHub. It will give you a basic, unstyled layout, use insecure sequential IDs, probably forget to add a Content Security Policy, and write logic that fails under distributed concurrency. 

AI doesn't know your architecture. It doesn't know your performance budget. It doesn't know that you want mobile-first design.

## 🛠️ The Solution: Kota Skillz

**Kota Skillz** is not a framework. It is an **industrial standard library** designed strictly for consumption by Large Language Models. 

It is an opinionated execution protocol (`AI_ONBOARDING.md`) backed by a repository of 88+ highly dense, machine-readable Markdown patterns (`patterns/`). It provides the exact constraints an AI needs to write production-grade code.

### The Journey to Prod

To build this knowledge base, we didn't just write arbitrary "best practices." We ingested **11 of the most authoritative software engineering bibles**, extracted their core heuristics, and translated them into actionable Markdown patterns for AI context windows.

**Backend & Data Systems (The DDIA Standard):**
1. *Designing Data-Intensive Applications* (Martin Kleppmann)
2. *Building Microservices* (Sam Newman)
3. *System Design Interview* (Alex Xu)
4. *Operating Systems: Three Easy Pieces* (Arpaci-Dusseau)
5. *Clean Code* (Robert C. Martin)
6. *Clean Architecture* (Robert C. Martin)
7. *The Pragmatic Programmer* (Thomas & Hunt)

**Security (The ASVS Standard):**
8. *OWASP ASVS (Application Security Verification Standard) v4.0* Level 2

**Frontend & UX (The UX Standard):**
9. *Refactoring UI* (Adam Wathan & Steve Schoger)
10. *Don't Make Me Think* (Steve Krug)
11. *The Design of Everyday Things* (Don Norman)

---

## 🚀 How It Works

By injecting Kota Skillz into your project, you provide the AI with a strict cognitive framework. 

When the AI tries to write a database query, it is forced by the `AI_ONBOARDING.md` protocol to consult the `patterns/data/` directory. It will automatically apply snapshot isolation and broadcast hash joins. 

When it tries to write a frontend component, it will consult `patterns/frontend/design-system/design-tokens.md` and use your HSL color scales and base-16 spacing values instead of arbitrary pixel values.

### The `AI_ONBOARDING.md` Protocol
This is the core constitution. It uses the "Sparse Memory" directive to force the AI to use Hermeneutic Reasoning, preventing the "lost in the middle" context window problem.

### The `patterns/` Directory
Contains highly specialized markdown files covering:
- `api/` (BFFs, event sourcing)
- `architecture/` (CQRS, snowflake IDs)
- `concurrency/` (Rate limiting)
- `data/` (ACID isolation, sharding)
- `frontend/` (Accessibility, CRP, HSL tokens)
- `resiliency/` (Circuit breakers, bulkheads)
- `security/` (ASVS compliance, SSRF prevention)

---

### 1. The Magic Install
To automatically generate the lockfile and download the entire Kota Skillz ecosystem (including standard practices for Supabase and Remotion) into your agent's environment, simply run:

```bash
npx Dayzidee/kota-skillz
```

*This will pull the knowledge base directly into your `.agents/skills/` directory where tools like Cursor, Cline, and Antigravity can read them natively.*

### 3. Connect to your AI IDE (Cursor / Copilot / Windsurf)

**For Cursor:**
1. Open your project in Cursor.
2. In your `.cursorrules` file or the Cursor AI settings, add the following line:
   ```markdown
   CRITICAL: Before writing any code, you MUST read the rules in `AI_ONBOARDING.md` and consult the relevant architectural patterns in the `patterns/` directory.
   ```
3. Start vibe coding. Watch as the AI generates code that looks like it was written by a Staff Engineer.

### CLI Commands

| Command | Description |
| :--- | :--- |
| `npx Dayzidee/kota-skillz` | Automatically configures the ecosystem and downloads skills into `.agents/skills/`. |
| `kota audit` | *(Coming Soon)* Runs a static analysis check against the QA patterns. |

---

## 🤝 Contributing

We welcome contributions to expand the pattern library! Patterns must be:
1. Short and dense (AI context windows are precious).
2. Actionable (provide concrete code examples).
3. Backed by industry-standard literature (cite your sources).

## 📄 License
MIT
