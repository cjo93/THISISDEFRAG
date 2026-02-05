# GODMODE-COLAB (Human OS JSON)

## Canonical Structure
All engine calls must output this structure:

```ts
{
  input: {
    birthData: ...,
    people: ...,
    journal?: string
  },
  telemetry: {
    // NASA vectors
  },
  seda: {
    score: number,
    band: string,
    safetyAction: {
      mode: string
    }
  },
  orbit: {
    geometry: ...,
    frictionMatrix: ...,
    pressurePoints: ...
  },
  meta: ...
}
```

## Safety Rules
- When `seda.band == "clinical_crisis"` or `seda.score <= 30`:
  - Suppress interpretive/esoteric content.
  - Switch to **Grounding Mode** UI (somatic guidance only).
