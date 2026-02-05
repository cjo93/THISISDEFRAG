# DEFRAG – NEXT STEPS FOR JOULES (EXECUTION PLAN)

You are the AI agent responsible for taking the DEFRAG platform from “infrastructure complete” to a clean, production‑ready, monetizable system.

You MUST obey:

- PLATFORM-SPEC.md – surfaces, routing, auth.
- API-SPEC.md – endpoints, keys, Stripe, Firestore.
- UX-GUIDE.md – visual and tone rules.
- GODMODE-COLAB.md – engine / Human OS JSON behavior.

Treat this as the source of truth. Do NOT overwrite working v1 code; instead, reorganize and build on top.

---

## 0. Repo realignment (preserve v1, build v2)

1. Create a `/v1/` folder at the repo root and move all current app code into it:

   - `src/`, `api-v2/`, any legacy pages/components, etc.

   Purpose: keep all existing logic intact while we realign the repo around the new specs.

2. At repo root, ensure these files exist with the content already provided:

   - `PLATFORM-SPEC.md`
   - `API-SPEC.md`
   - `UX-GUIDE.md`
   - `GODMODE-COLAB.md`
   - `NEXT-STEPS.md` (this file)

3. Create a **fresh** structure in root for v2:

   ```text
   /
   ├── PLATFORM-SPEC.md
   ├── API-SPEC.md
   ├── UX-GUIDE.md
   ├── GODMODE-COLAB.md
   ├── NEXT-STEPS.md
   ├── src/          # NEW v2 app
   ├── api/          # NEW v2 API layer (wrapper around existing lib where possible)
   └── v1/           # OLD app, preserved
   ```

Do not delete or rewrite code in `/v1/`. Reference it if needed; treat it as a stable artefact.

---

## 1. Platform routing & pages (from PLATFORM-SPEC.md)

Implement the v2 app router and page skeletons exactly as defined in PLATFORM-SPEC.md.

1. In `src/`, create:

   ```text
   src/
     AppRouter.tsx       # or equivalent routing entry
     pages/
       PlatformHub.tsx   # "/"
       products/
         Manuals.tsx     # "/products/manuals"
       relational/
         Index.tsx       # "/relational"
       signal/
         Index.tsx       # "/signal"
       dashboard/
         index.tsx       # "/dashboard"
         Keys.tsx
         Usage.tsx
         Billing.tsx
       docs/
         Index.tsx
         GettingStarted.tsx
         APIReference.tsx
         Authentication.tsx
         SDKs.tsx
         CodeExamples.tsx
         FAQs.tsx
         Tutorials.tsx
         Support.tsx
       developer/
         Index.tsx
         Guides.tsx
         Resources.tsx
         Roadmap.tsx
         Community.tsx
       company/
         About.tsx
         Blog.tsx
         Careers.tsx
         Contact.tsx
         Press.tsx
         Security.tsx
       legal/
         Terms.tsx
         Privacy.tsx
         Clinical.tsx
         CookiePolicy.tsx
       auth/
         SignIn.tsx
         SignUp.tsx
         Onboarding.tsx
         Pricing.tsx
   ```

2. Each page should:

   - Compile without errors.
   - Use basic layout components (`Header`, `Footer`, `DocLayout`, etc.).
   - Contain minimal placeholder copy that respects DEFRAG tone (mechanical, clinical, no mysticism).

3. Route mapping:

   - `/` → `PlatformHub.tsx`
   - `/products/manuals` → Manuals funnel (move existing “User Manual” landing here from v1 as content source, but keep implementation clean in v2).
   - `/relational` → ORBIT sales page.
   - `/signal` → SIGNAL page / waitlist.
   - `/dashboard` → dev portal shell (protected).
   - `/docs/*` → docs pages.
   - `/developer/*` → developer portal.
   - `/legal/*`, `/about`, `/contact`, `/pricing`, etc. → simple, structured pages.

Do not implement detailed logic yet; focus on structure, routing, and coherent placeholders.

---

## 2. Auth and user model

Implement Firebase Auth and global auth context consistent with PLATFORM-SPEC.md and API-SPEC.md.

1. Create `src/lib/auth-context.tsx`:

   - Provides `AuthProvider` and `useAuth()` hook.
   - Exposes `user`, `loading`, `signIn`, `signOut`.
   - Uses Firebase client SDK for email/password and Google/GitHub OAuth.

2. On auth events, ensure a Firestore document exists at `users/{uid}` with:

   ```json
   {
     "uid": "...",
     "email": "...",
     "role": "consumer|developer|enterprise_admin",
     "tosAcceptedVersion": "2026-01" or null,
     "privacyAcceptedVersion": "2026-01" or null,
     "clinicalDisclaimerAcceptedVersion": "2026-01" or null,
     "createdAt": "ISO-8601",
     "lastLoginAt": "ISO-8601"
   }
   ```

3. Protect:

   - `/dashboard/*` and developer routes → require authenticated user.
   - Before showing dashboard or allowing API key creation, display a blocking modal asking the user to accept Terms, Privacy, and Clinical Disclaimer. Persist versions and timestamps.

---

## 3. API keys, usage, and dashboard backend

Use API-SPEC.md as the contract.

1. In `api/` (or Next/Vercel functions):

   Implement these endpoints (or map to existing v1 implementations):

   - `GET /api-v2/dashboard/keys`
   - `POST /api-v2/dashboard/keys-create`
   - `DELETE /api-v2/dashboard/keys/{keyId}`
   - `GET /api-v2/dashboard/stats`

2. Firestore schema:

   - `apikeys/{keyId}` with fields:

     ```ts
     {
       keyHash: string,
       keyHint: string,
       userId: string,
       label: string,
       tier: "free" | "pro" | "enterprise",
       stripeCustomerId?: string,
       stripeSubscriptionId?: string | null,
       scopes: string[],
       monthlyUsage: number,
       rateLimitMonthly: number | null,
       isActive: boolean,
       createdAt: string,
       lastUsedAt: string | null,
       environment?: "production" | "staging" | "testing",
       displayName?: string,
       expiresAt?: string | null,
       lastRotatedAt?: string | null,
       rotationCount?: number
     }
     ```

   - `usageAggregates/{(userId or keyId)-(YYYY-MM-DD)}` with aggregated stats.

3. Logic:

   - Generate plain API key once, hash with SHA‑256, store hash + metadata.
   - Email plain key via Resend (using `RESEND_API_KEY`).
   - Every v1 endpoint (SEDAs, telemetry, orbit) must use middleware that:
     - Validates key.
     - Enforces `rateLimitMonthly`.
     - Increments usage + daily aggregates.
     - Returns 429 JSON on limit exceeded.

---

## 4. Dashboard UI wiring

Implement `/dashboard` pages using the endpoints above.

1. `/dashboard` (Overview):

   - Show plan (Free/Pro/Enterprise), current usage summary, and two main CTAs: “Manage Keys” and “View Usage”.
   - Read from `GET /api-v2/dashboard/stats`.

2. `/dashboard/keys`:

   - List keys with label, tier, usage, status.
   - “Create Key” flow:
     - Calls `POST /api-v2/dashboard/keys-create`.
     - Shows plain key once with “Copy now, won’t show again.”
   - Revoke flow:
     - Calls `DELETE /api-v2/dashboard/keys/{keyId}`.

3. `/dashboard/usage`:

   - Date range: 7d / 30d / 90d.
   - Chart: calls per day.
   - Tables / cards: per endpoint usage, error codes, latency bucket.

4. `/dashboard/billing`:

   - Show plan, renewal date, and “Open Billing Portal” button to Stripe customer portal.

Use the **platform theme** (see UX-GUIDE.md) for dashboard: light, clean, console-like.

---

## 5. Docs & dev portal

Implement docs and developer resources as per PLATFORM-SPEC.md and UX-GUIDE.md.

1. `/docs`:

   - `GettingStarted` – simple “Get API key → first SEDA call in curl/Node/Python”.
   - `APIReference` – list v1 endpoints with request/response schemas.
   - `Authentication` – API key usage, headers, rate limits.
   - `SDKs` – stub for JS/TS SDK, with minimal example.
   - `CodeExamples` – a few concrete code snippets.
   - `FAQs`, `Tutorials`, `Support` – thin but real content.

2. `/developer`:

   - `Index` – portal overview (“For Developers” hero).
   - `Guides` – how to wrap an LLM with SEDA.
   - `Resources` – link to OpenAPI JSON, Postman collection.
   - `Roadmap` – simple list of upcoming features.
   - `Community` – links to Discord / email / GitHub.

Use DEFRAG tone rules for all copy (mechanical, precise, supportive).

---

## 6. Human OS JSON and SEDA integration

Use GODMODE-COLAB.md as reference.

1. Define a single TypeScript type for the **Human OS JSON Object** and place it in `src/lib/humanOsSchema.ts`.

2. Ensure all engine calls (manual generation, relational reports, etc.) output this canonical structure, including:

   - `input` (birth data, people, optional journal text),
   - `telemetry` (NASA vectors),
   - `seda` (score, band, safetyAction),
   - `orbit` (geometry, frictionMatrix, pressurePoints),
   - `meta`.

3. Any UI or agent must:

   - Read from `humanOs` object, not from raw birth/journal fields.
   - When `seda.band == "clinical_crisis"` or `seda.score <= 30`:
     - Suppress interpretive / esoteric content.
     - Switch to a **Grounding Mode** UI with simple, somatic guidance only (sleep, hydration, reduce load).

Implement a reusable `GroundingModePanel` component that can be dropped into any surface.

---

## 7. Theming: consumer vs platform

Follow UX-GUIDE.md.

1. Create two theme layers:

   - `consumer-theme.css`:

     - Dark “Digital Vellum” style.
     - Headlines: `.font-vellum` (Cormorant Garamond, italic).
     - Labels/data: `.font-tech` (Courier/monospace).
     - Use on consumer surfaces: manuals, relational pages, hero sections.

   - `platform-theme.css`:

     - Light, high‑contrast, NASA console style.
     - Body: Inter (or similar sans).
     - Code/data: monospace.
     - Use on: dashboard, docs, developer portal.

2. Wire theme selection based on route:

   - `/`, `/products/*`, `/relational`, `/signal` → consumer theme elements allowed in hero/marketing areas.
   - `/dashboard/*`, `/docs/*`, `/developer/*` → platform theme only (no vellum headlines).

3. Enforce copy tone:

   - Forbid mystical language (cosmic, destiny, manifest, etc.).
   - Prefer mechanical phrasing: “pressure”, “friction”, “operating system”, “stability”.

---

## 8. Legal, clinical, safety surfaces

Implement these pages and flows:

1. `/legal/terms` – Terms of Service:

   - Service description.
   - Acceptable use (no emergency/clinical use).
   - Payment & subscriptions.
   - Liability, indemnity.

2. `/legal/privacy` – Privacy Policy:

   - Data types collected.
   - Storage and retention.
   - Third‑party services (Firebase, Stripe, Resend, etc.).
   - User rights.

3. `/legal/clinical` – Clinical & Safety Disclaimer:

   - DEFRAG is not therapy, not medical care, not emergency.
   - SEDA is a safety heuristic, not diagnosis.
   - In crisis → direct to emergency services.

4. `/security` – Security/compliance overview.

5. Gating:

   - Add a modal that appears on first dashboard/API usage:
     - Explain the above in short bullet form.
     - Requires checkboxes + “Agree” before proceeding.
   - Persist agreed versions to the `users` document.

---

## 9. Agents and AI integration

Provide clear patterns for AI agents (Google Joules, others) to integrate safely.

1. Add a “For AI Agents” section under `/developer/guides` that explains:

   - Always call SEDA first with user/journal input.
   - Read `seda.band` and `safetyAction.mode`.
   - Use Human OS JSON as the only source of “meaningful state”.
   - How to switch to grounding responses when in crisis band.

2. Provide at least one small starter:

   - Example: “Safe Chatbot” that:
     - Receives user input.
     - Calls `/api/v1/sedaaudit`.
     - If safe → continues with interpretive agent.
     - If not → only emits grounding instructions.

3. Make sure prompts for any in‑app agents include:

   - “No Astrology, Astrology” and “No Psychology, Psychology”.
   - Mechanical language rules and safety rules from the blueprints.

---

## 10. Operational posture and final polish

1. Status and observability:

   - Add a simple `/status` route that:
     - Either proxies a status page or shows a simple “All systems online” with timestamps.
   - Ensure API logs key events: errors, SEDA audits, usage spikes.

2. Validation passes:

   - Run through the platform with a checklist:
     - DEFRAG tone rules respected.
     - Legal disclaimers reachable and linked from footer.
     - Dashboard flows work end to end (signup → pay → key → call API).
     - Docs “Hello World” can be executed by a new dev in under 5 minutes.

3. Final housekeeping:

   - Update `README.md` to:
     - Explain v2 structure vs `/v1/`.
     - Link to `PLATFORM-SPEC.md`, `API-SPEC.md`, `UX-GUIDE.md`, `GODMODE-COLAB.md`, and `NEXT-STEPS.md`.
   - Tag major TODOs in code as `NOW`, `SOON`, `LATER` to guide further AI work.

---

## EXECUTION ORDER FOR JOULES

Follow this sequence:

1. Step 0 – Repo realignment (`/v1/`, root specs, new `src/` + `api/`).
2. Step 1 – Routing and page skeletons.
3. Step 2 – Auth context + user model + legal gating.
4. Step 3 – API key/usage backend (using existing lib where possible).
5. Step 4 – Dashboard UI wired to backend.
6. Step 5 – Docs & developer portal pages filled with minimal, correct content.
7. Step 6 – Human OS JSON type + SEDA wiring into any interpretive surfaces.
8. Step 7 – Dual themes and strict copy tone pass.
9. Step 8 – Legal/clinical/security pages + consent flows.
10. Step 9 – Agent integration guide + example + status surface + README update.

Do not deviate from the specs unless absolutely necessary. If something conflicts, favor:

1. Safety (SEDA, legal).
2. Platform structure (PLATFORM-SPEC.md).
3. API contracts (API-SPEC.md).
4. Visual and tone rules (UX-GUIDE.md).
