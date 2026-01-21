# DEFRAG - Human User Manuals

## Project Overview

DEFRAG is a React/TypeScript web app that generates satirical "relationship operating manuals" by reframing human personality traits as mechanical/industrial specifications. It uses Gemini AI to produce content and TTS audio.

**Core metaphor**: Humans are machines with "source code" (birth data → zodiac-derived personality types). The UI mimics industrial control panels, terminals, and technical documentation.

## Architecture

```
App.tsx                    # Main router + state (profiles, active units, view switching)
├── components/
│   ├── LoginGate.tsx      # Entry gate with username capture
│   ├── Hero.tsx           # Landing page hero section
│   ├── Explainer.tsx      # Product explanation
│   ├── Funnies.tsx        # Testimonials/social proof
│   ├── ManualGenerator.tsx # Core form: input birth data → terminal animation → AI-generated manual
│   ├── Dashboard.tsx      # Display generated manual + live "friction alerts" + proxy voice buttons
│   ├── Schematic.tsx      # Decorative system diagram
│   └── Footer.tsx
└── services/
    ├── geminiService.ts   # Gemini API calls (manual generation + TTS)
    └── defragEngine.ts    # Deterministic personality calculation from birth data
```

### Data Flow
1. User inputs "coordinates" (name, birth date/time, location) for two "units"
2. `defragEngine.calculateMechanics()` derives personality type deterministically (no AI call)
3. `geminiService.generateManualPreview()` calls Gemini to generate relationship manual
4. Results stored in React state + localStorage (`defrag_profiles`)

## Key Patterns

### Industrial/Mechanical Tone
All UI text uses mechanical terminology: "Unit", "Coordinates", "Source Code", "Kernel Panic", "Thermal Throttling". Maintain this voice in any new copy.

### Gemini Integration ([services/geminiService.ts](services/geminiService.ts))
- Uses `@google/genai` SDK with structured JSON output via `responseSchema`
- Model: `gemini-3-flash-preview` for text, `gemini-2.5-flash-preview-tts` for voice
- API key from `process.env.API_KEY` (set in `.env.local`)

### Type System ([types.ts](types.ts))
```typescript
UnitData      // Person's input data + calculated personality fields
ManualPreview // AI-generated manual sections (specifications, procedures, troubleshooting)
FrictionAlert // Real-time "alerts" based on unit data
AppView       // Navigation state enum
```

### Styling
- Tailwind CSS with custom color scheme: `zinc-*` backgrounds, `orange-600` accents
- Monospace fonts (`font-mono`) for all technical text
- Dark theme only (`bg-[#050505]`, `bg-black`, `bg-zinc-950`)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
```

**Required**: Set `GEMINI_API_KEY` in `.env.local` before running.

## Conventions

- Component files are PascalCase, services are camelCase
- All user-facing text is UPPERCASE (via `.toUpperCase()` or Tailwind `uppercase`)
- State management: React useState + localStorage for persistence
- No external state library - keep it simple

## When Adding Features

1. **New personality types**: Extend `defragEngine.ts` ZODIAC arrays and profile mappings
2. **New manual sections**: Update `geminiService.ts` prompt and `ManualPreview` type
3. **New views**: Add to `AppView` enum, update `App.tsx` router logic
4. **New Gemini features**: Follow existing pattern in `geminiService.ts` with typed responses
