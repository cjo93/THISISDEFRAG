# DEFRAG

### Simplifying Relationship Systems with Precision and Clarity

DEFRAG turns complex relational dynamics into clear insights and practical tools. By combining real-time astronomy, established frameworks (Human Design, I-Ching, Gene Keys, Hexagrams, Pentagrams), and AI synthesis, it helps map, understand, and improve how people connect.

---

## What is DEFRAG?

DEFRAG is a platform that gives you clear, actionable insight into how you and others work—individually and in groups. It integrates:

- **Human Design, I-Ching, Gene Keys, Hexagrams, and Pentagrams** — pattern and timing frameworks that feed the core engine.
- **Real-time astrology** — live planetary data (JPL/NASA HORIZONS) for timing and context.
- **AI synthesis** — Google Gemini, used with guardrails and aligned with systems like Bowen Family Systems.
- **Community dynamics** — anonymized insights and shared themes around common challenges.

### What it provides

1. **Real-time insights** — A daily dashboard with clear summaries and system maps.
2. **Interpersonal tools** — Explore relationship dynamics through structured, curated insights.
3. **Community** — Anonymized content and shared themes on dynamics and resilience.

---

## Core Features

### For all users

- **Tailored dashboards** — Interactive hubs with daily summaries, dynamics, and relational views in high-contrast grayscale.
- **System mapping** — Structured views of family or group pressure points, in grayscale.
- **Community insights** — Anonymized perspectives on challenges and what others have found helpful.
- **Simulations** — AI-generated, reality-based relationship dynamics, visualized in grayscale.
- **SEDA safety** — Safety-Enhanced Dynamic Assessment: emotional safety, stability, and guardrails so insights stay within platform policy.

### For paid users

- **AI-driven exploration** — Use AI to navigate daily summaries and relationships in a structured way.
- **Dynamic simulations with video** — See how to ease high-friction points, with short grayscale animations where applicable.
- **Group systems map tools** — Deeper mapping for personal (e.g. family) and professional (e.g. team) contexts.

---

## Products

- **ECHO** — One-time Personal Design Specification. Turns your data into a clear snapshot: what drains you, what restores you, and the rules that keep you stable.
- **SIGNAL** — Design-aware de-escalation. Softens messages and conflict in real time so the point lands without escalating. (Coming soon.)
- **ORBIT** — Relational geometry. Maps where a family or team locks up, who holds pressure, and small moves that release it.
- **API** — B2B access to DEFRAG’s safety and mapping infrastructure for integration into other products.

---

## Backend system

The core engine (`defragEngine.ts`) uses JPL/NASA HORIZONS for planetary data and overlays Human Design, I-Ching, Gene Keys, Hexagrams, and Pentagrams with live transits. It structures these into inputs for AI synthesis. All API and product features run through this engine. The engine uses a static Knowledge Base (Hexagrams, Gene Keys, Penta), a DefragEngine for birth-data to profile, and an InversionEngine for Shadow-to-Gift protocols.

Google Gemini is used with guardrails for generated content. Model usage in the repo includes Gemini for manual generation and TTS where applicable. No backend JSON or internal API details are exposed in the product UI.

---

## Technical stack

- **Frontend:** React 19 (ES modules), Vite.
- **Intelligence:** Google Gemini API.
- **Environment:** `API_KEY` (Google AI Studio API key) required for Gemini.
- **Styling:** Tailwind CSS.
- **Typography:** JetBrains Mono, Inter.

Planetary data: JPL/NASA HORIZONS. Latency is tuned for real-time use.

---

## Visual direction

DEFRAG is designed to feel like a new wave of tech: precise, insightful, and almost intuitive—a tool that seems to “just know” you and how you work best with others. The UI uses black, white, and a range of greys and off-whites, with very little intentional color. No stock photography; layout and type carry the tone.

---

## Operation and handoff

### API configuration

Set one environment variable:

- **Key:** `API_KEY`
- **Value:** Your Google AI Studio API key

### Local development

```bash
npm install
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Deployment

DEFRAG is a frontend build. Deploy to any static host (e.g. Firebase, Vercel, Netlify). Entry point: `index.html`.

---

For deeper product and brand guidance, see the docs in this repo (e.g. BRAND_VOICE_FRAMEWORK.md, DASHBOARD_ARCH.md, PLATFORM_V2_SPEC) where relevant.
