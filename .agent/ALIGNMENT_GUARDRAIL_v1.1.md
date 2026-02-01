# DEFRAG Alignment Guardrail v1.1 Amendments

> Precision upgrades and hardening. Append to or supersede sections in the base ALIGNMENT_GUARDRAIL.md.

***

## Amendment 1: SEDA as Hard Gate (Behavioral Encoding)

SEDA is no longer just a copy guideline — it is the **first call** in every high-impact flow.

### Mandatory SEDA Integration Points

| Flow | SEDA Position | Enforcement |
|------|---------------|-------------|
| Manual generation (ECHO) | First call before any analysis | Block generation if score unavailable |
| ORBIT map generation | First call per participant | Aggregate score determines map depth |
| Agent surfaces (future) | Per-session and per-output | Gate response intensity |
| External API wrapper | Every request | Include score in response headers |

### Threshold Behaviors (Not Just Copy)

```typescript
interface SEDABehavior {
  score: number;
  allowed: {
    fullAnalysis: boolean;      // 61-75
    mildConstraints: boolean;   // 46-60
    heavyConstraints: boolean;  // 30-45
    groundingOnly: boolean;     // ≤30
  };
  actions: {
    throttleIntensity: number;  // 0-1 multiplier
    showWarnings: boolean;
    blockEsoteric: boolean;
    forceSomatic: boolean;
  };
}

function getSEDABehavior(score: number): SEDABehavior {
  if (score >= 61) return { fullAnalysis: true, throttleIntensity: 1.0 };
  if (score >= 46) return { mildConstraints: true, throttleIntensity: 0.7, showWarnings: false };
  if (score >= 30) return { heavyConstraints: true, throttleIntensity: 0.3, showWarnings: true, blockEsoteric: true };
  return { groundingOnly: true, throttleIntensity: 0, blockEsoteric: true, forceSomatic: true };
}
```

### SEDA Audit Logging

- Log SEDA decisions **separately** from content logs
- Schema: `{ timestamp, user_id_hash, score, tier, action_taken, flow_type }`
- Never log narrative content in safety audit trail
- Retention: 90 days for audit, then aggregate only

***

## Amendment 2: Vocabulary Lock Enforcement

### Forbidden Language Checker (CI Gate)

Create `.agent/scripts/vocabulary-lint.ts` that blocks deploys when prohibited terms appear in user-facing surfaces.

#### Prohibited Terms (Hard Block)

```
energy, vibes, cosmic, manifest, destiny, universe, spiritual, 
chakra, aura, higher self, twin flame, soul mate, karmic,
BPD, NPD, trauma, disorder, diagnosis, mental illness, pathology,
broken, damaged, healed, fixed, cured, treatment plan
```

#### Warning Terms (Review Required)

```
personality, compatible, harmony, alignment (non-technical), 
healing, journey, growth, awakening, transformation
```

#### Exceptions

- Technical documentation with explicit clinical context
- Internal methodology files (not user-facing)
- Quoted third-party content with disclaimer

### Required Vocabulary Mapping

| If you write... | Change to... |
|-----------------|--------------|
| personality type | design specification |
| compatible/harmony | coherence / low friction |
| chart data | Human OS JSON Object |
| transits | Environmental Pressure |
| inner planets | Biological Pressure |
| relationship reading | Relational Geometry map |
| compatibility score | friction coefficient |

***

## Amendment 3: Product Boundaries (Hard Documentation)

### Product Contracts

| Product | Entry | Promise | Pricing Logic | SEDA Behavior |
|---------|-------|---------|---------------|---------------|
| **ECHO** | `/echo`, `/start` | One-time Personal Design Specification | $29 one-time, Stripe-gated | Full SEDA gate before generation |
| **SIGNAL** | `/signal` | Real-time message de-escalation | $9/mo when activated | Per-message SEDA check, immediate degradation at ≤30 |
| **ORBIT** | `/relational` | Multi-person system map | $39 per group (6 people), +$15 additional | Aggregate SEDA across participants |
| **API** | `/platform`, `/developer` | B2B Clinical Firewall | From $99/mo, 5000 calls/mo testing | SEDA score in every response header |

### ORBIT Clarification (Locked Decision)

ORBIT is **one-time mapping** with optional monitoring add-on:

- Base: $39 one-time map for up to 6 people
- Add-on: +$15 per additional group after first
- Monitoring (future): If added, clearly separate subscription from map purchase

### Infrastructure vs Interface

| Surface | Contract | Audience |
|---------|----------|----------|
| `defrag.app` | Consumer OS ("The Manual for You and Your People") | Individuals, families, small teams |
| `api.defrag.app` | Clinical Firewall ("Same engine, different contract") | Platforms, apps, enterprise |

Microcopy for both: **"Same engine, different contracts."**

***

## Amendment 4: Agent Manager Hardening

### Non-Overridable Constraints (Top of Prompt)

Every agent session must begin with:

```
VALIDATION CHECKLIST (run before editing core files):
□ 1. Does this change weaken SEDA as universal gate?
□ 2. Does this blur infrastructure/interface split?
□ 3. Does this introduce forbidden vocabulary?
□ 4. Does this alter pricing without explicit ticket?
□ 5. Does this touch moat vocabulary tables?
□ 6. Does this change Landing page architecture?
□ 7. Does this modify threshold behaviors?
□ 8. Does this affect data-handling paths?

If ANY box would be checked YES → STOP and request ticket.
```

### Protected Sections (Do-Not-Touch Without Ticket)

These files/sections require explicit approval before modification:

| Protected Area | Reason |
|----------------|--------|
| `lib/seda/` | Core safety logic |
| `lib/seda/thresholds.ts` | Behavioral encoding |
| `**/pricing*.tsx` | Revenue logic |
| `.agent/ALIGNMENT_GUARDRAIL*.md` | Meta-alignment |
| `lib/vocabulary/forbidden.ts` | Moat enforcement |
| `PlatformHub.tsx` hero section | Brand architecture |

### Alignment Diff Summary Requirement

For any change touching Landing, pricing, or SEDA, agent must emit:

```markdown
## Alignment Diff Summary
- **File(s) changed**: [list]
- **Sovereign Infrastructure spec sections affected**: [list]
- **Changes relative to spec**:
  - [concrete delta 1]
  - [concrete delta 2]
- **Validation checklist result**: All PASS / [specific flags]
```

***

## Amendment 5: Public Trust Enhancements

### Required Microcopy Blocks

Add to `defrag.app` and `api.defrag.app`:

**Positioning Statement:**
> "We are infrastructure, not a personality app."

**Stance Statement:**
> "No Astrology, Astrology. No Psychology, Psychology. Just mechanics."

**Safety Standard Explainer (Compact):**
> "Every output passes SEDA safety scoring. At ≤30, we stop analysis and show grounding protocols only. This override is non-negotiable."

### Cost-of-Error Examples (Per Audience)

| Audience | Cost-of-Error Example |
|----------|----------------------|
| **Family** | "The average divorce costs $15,000–$30,000. ORBIT mapping is $39." |
| **Team** | "Replacing one bad hire costs 50–200% of annual salary. ORBIT mapping is $39." |
| **Platform** | "One malpractice suit can exceed $1M. SEDA gating is $99/month." |

***

## Amendment 6: Data Handling Guardrails

### Current State Documentation

| Flow | Processing Location | Rationale |
|------|---------------------|-----------|
| Birth data input | Client-side storage (localStorage) | Edge-first, no server storage required |
| NASA JPL Horizons calls | Cloud (external API) | Required for telemetry, no personal data sent |
| Manual generation | Cloud (LLM) | Heavy computation, anonymized context only |
| SEDA scoring | Cloud (model) | Safety-critical, audit logging required |
| ORBIT computation | Cloud | Multi-participant geometry requires central processing |

### Hard North Star

- "Data never leaves the edge" is the **convergence target**
- Any cloud-processed path must document:
  1. Why it cannot be on-device today
  2. What anonymization is applied
  3. Timeline for edge migration (if applicable)
  4. How it meets clinical + privacy bar

### Privacy Implementation Notes

- No raw birth data stored on server
- User IDs are hashed, not PII-linked
- SEDA audit logs contain only: timestamp, score, tier, action
- Manual content is not stored after delivery (user receives, we forget)

***

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.1 | 2026-02-01 | Added behavioral SEDA encoding, vocabulary linter spec, product contracts, agent hardening, trust microcopy, data handling documentation |
| v1.0 | 2026-02-01 | Initial alignment guardrail |
