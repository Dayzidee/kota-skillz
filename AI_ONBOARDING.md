# 🧠 VIBE CODER'S AI ONBOARDING: EXECUTION PROTOCOL

This document defines the operational constraints and cognitive framework for AI agents working on the **Kota Skillz** codebase. Adherence is mandatory for efficiency and performance.

---

## 1. Memory & Context Optimization (The "Sparse Memory" Directive)

**Objective**: Prevent context rot and the "lost-in-the-middle" phenomenon.

- **Mandatory Read List**: You MUST always read this file (`AI_ONBOARDING.md`) AND the `onboarding.md` file. The `onboarding.md` file contains the complete folder structure and knowledge base map. Even if you cannot read every pattern file, you must know where they are.
- **Selective Ingestion**: Do not dump the entire context window. Prioritize high-value data points (Reasoning Anchors).
- **Noise Filtering**: Ignore environmental noise and boilerplate. If 10 files are provided, identify the ~3 that are relevant.
- **Explicit Anchors**: Treat specified data points as non-negotiable truth.

## 2. Cognitive Framework: Hermeneutic Reasoning (The "Circle" Method)

**Objective**: Move from linear "input-output" to architectural understanding.

### Step 1: Hypothesis Generation (The Whole)
Before writing code, state your hypotheses about:
- What the user is trying to build.
- The underlying architectural intent.
- Potential edge cases.

### Step 2: Implementation (The Parts)
Execute specific code changes, ensuring they align with the hypothesis.

### Step 3: Global Synthesis (The Return)
Reflect on how the specific changes affect the global architecture. Update patterns and documentation to reflect new learnings.

---

## 3. Industrial Standard: The "7 Backend Bibles"

All code must align with heuristics derived from:
1. **Designing Data-Intensive Applications (DDIA)**
2. **Building Microservices**
3. **Clean Code**
4. **The Pragmatic Programmer**
5. **Clean Architecture**
6. **Operating Systems: Three Easy Pieces**
7. **System Design Interview**

---

## 4. Current Reasoning Anchors (Session Context)
- **Primary Pattern**: Discriminated Union Results (`tag: 'success' | 'failure'`).
- **Data Strategy**: Fixed Virtual Partitioning for sharding.
- **Transactional Standard**: Snapshot Isolation as default; SSI for multi-object constraints.
- **Security Standard**: ASVS Level 2 (Default).

---

## 5. Security Rules (Always Apply)

### Authentication & Session
- [ ] **Password Security**: Passwords MUST be hashed with bcrypt (cost factor 12+). No plaintext passwords ever.
- [ ] **Cookie Safety**: Session cookies must have `Secure`, `HttpOnly`, and `SameSite=Strict/Lax` flags.
- [ ] **Session Expiry**: Maximum 30 minutes for sensitive operations.
- [ ] **MFA**: Require for account changes and high-value transactions.

### Authorization
- [ ] **Ownership Check**: Every resource access MUST check row-level ownership.
- [ ] **Non-Guessable IDs**: Use UUIDs (v4/v7) for all public-facing IDs (not sequential integers).
- [ ] **JWT**: Expiration MUST be < 1 hour. No sensitive data in payload.

### Input & Output
- [ ] **SQL Injection**: No SQL string concatenation. Use parameterized queries ONLY.
- [ ] **XSS Prevention**: No `innerHTML` with user input. Use `textContent` or sanitize.
- [ ] **CSP**: Configure Content-Security-Policy headers on frontend responses.
- [ ] **Validation**: All user input validated and sanitized.

### Security Headers (Include every response)
- [ ] Content-Security-Policy
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security

### Rate Limiting
- [ ] Login endpoints: 5 per minute.
- [ ] General API: 100 per minute.
- [ ] Upload endpoints: size limits configured.

### Secrets
- [ ] No hardcoded keys/tokens (use environment variables).
- [ ] No secrets in logs.
- [ ] `.env` files in `.gitignore`.

### CSRF Protection
- [ ] Anti-CSRF tokens for state-changing requests.
- [ ] SameSite cookies.

## Security Resources
- **OWASP ASVS**: The complete verification standard.
- **OWASP Cheat Sheets**: Specific mitigations indexed by ASVS section.
- **Security Headers Project**: Header validator.

---

## 6. Frontend Execution Protocol

**Always apply (Default Patterns):**
- **Mobile-First**: Build for mobile (0-640px) first, add layers for larger viewports.
- **Accessibility**: Keyboard focus indicators must be visible. Use semantic HTML (`nav`, `main`, `section`, `article`).
- **Performance Budget**: Lighthouse > 90 on all metrics. LCP < 2.5s.
- **Loading States**: Skeletons or spinners for all async operations.
- **Error Boundaries**: Handle runtime crashes gracefully in React/Vite.

**Never apply (Anti-Patterns):**
- No `outline: none` without replacement focus styles.
- No `!important` in CSS (use specificity or design tokens).
- No pixel values for fonts (use `rem`/`em` for user scaling).
- No horizontal scroll on mobile.

## 7. Frontend QA Checklist

**Accessibility (Critical)**
- [ ] Every image has `alt` text.
- [ ] Color contrast > 4.5:1.
- [ ] Interactive elements are focusable and labeled.

**Performance (Critical)**
- [ ] Images have explicit width/height (Layout Shift prevention).
- [ ] Bundle size < 200KB for initial load.
- [ ] No massive dependencies (e.g., full lodash).

**Maintainability**
- [ ] No nested ternary operators.
- [ ] Components < 300 lines of code.
- [ ] Effective cleanup in `useEffect` hooks.

---

## 8. Repository Setup & Version Control

**Objective**: Keep the user's repository clean of Kota Skillz framework files while retaining local AI context.

- **Mandatory First Step**: Immediately upon initialization or when reviewing a project, the AI MUST verify that the `kota-skillz/` directory is added to the user's `.gitignore` file. 
- Do not commit the `kota-skillz/` directory or its contents to the user's version control unless explicitly instructed to do so.
- **Git Branching Strategy**: For any massive refactors, large bug fixes, or the addition of a new architecture to an already working structure, the AI MUST automatically create and switch to a new git branch before writing code. The code should only be merged to the main branch after the new fix/feature is perfectly verified and working.

---

## 9. Automatic Learning & Experience Module

**Objective**: Continuously evolve the knowledge base based on the user's specific use cases, failures, and feature implementations.

The `kota-skillz/` directory contains three living folders that the AI MUST actively manage and consult:

1.  **`kota-skillz/features/`**: When a new feature is successfully implemented, the AI MUST document the architectural approach, data models, and specific constraints used, creating a new markdown file here.
2.  **`kota-skillz/failures/`**: When a significant bug, crash, or architectural failure occurs, the AI MUST document the root cause and the applied solution here to prevent recurring mistakes.
3.  **`kota-skillz/debugging/`**: For complex debugging sessions, document the tracing steps and insights gained.

**Execution Rule**: Before starting any new feature implementation, the AI MUST consult these three folders to leverage collated data, past experiences, and project-specific context to guide the current build. When a task concludes, the AI MUST strictly update these folders with the newly acquired experience.
