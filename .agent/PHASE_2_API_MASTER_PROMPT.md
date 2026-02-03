# PHASE 2: api.defrag.app - B2B INFRASTRUCTURE LAUNCH

# Complete Master Prompt for Google Antigravity

# Created: 2026-01-31 | Authority: Supersedes all previous Phase 2 guidance

# Strategy: Fastest path to enterprise monetization with Stripe gating

---

## EXECUTIVE SUMMARY: PHASE 2 MISSION

api.defrag.app is the B2B infrastructure layer. It is NOT a consumer product.
It is a gated, monetizable utility for enterprises, platforms, and developers.

**What you're building:**

- Subdomain: api.defrag.app (separate from defrag.app, gated by Stripe)
- Purpose: Clinical Firewall for wellness platforms (SEDA safety + NASA telemetry)
- Revenue: Enterprise SaaS model (Free/Pro/Enterprise tiers)
- Timeline: 2-3 weeks to MVP

**Why this matters:**

- B2B revenue is 10x better margin than B2C
- Enterprise validation feeds consumer trust
- API calls = validation data for both markets

---

## PART 1: ARCHITECTURE & STRUCTURE (Option C: Vercel Serverless)

### Directory Structure (Monorepo Hybrid)

```
THISISDEFRAG/
├── src/                          # Consumer frontend (defrag.app)
│   ├── pages/
│   ├── components/
│   └── ...
├── api/                          # EXISTING Vercel functions
│   ├── seda-audit.ts            # Internal SEDA endpoint
│   ├── generate-manual.ts
│   └── ...
├── api-v2/                       # NEW B2B API endpoints
│   ├── v1/
│   │   ├── seda/audit.ts        # Public SEDA endpoint (gated)
│   │   ├── telemetry/vectors.ts # Public NASA telemetry (gated)
│   │   ├── orbit/map.ts         # Public relational geometry (gated)
│   │   ├── auth/keys.ts         # API key management
│   │   └── stripe/webhook.ts    # Stripe billing events
│   ├── middleware/
│   │   ├── auth.ts              # API key validation
│   │   ├── ratelimit.ts         # Rate limiting per tier
│   │   └── logging.ts           # Audit logging
│   └── lib/
│       ├── stripe.ts            # Stripe helper functions
│       └── telemetry.ts         # Shared telemetry logic
├── docs/                         # Developer documentation
│   ├── api-reference.md
│   ├── quickstart.md
│   ├── openapi.yaml
│   └── examples/
└── public/                       # Static assets for api.defrag.app

```

**Why this structure:**

- `/api-v2/` is separate from existing `/api/` (no conflicts)
- Vercel automatically deploys everything in `/api-v2/` as functions
- Shared `/src/lib/` code is reused by both consumer and API
- `/docs/` is static and deployed as part of the site

### Vercel Configuration (vercel.json)

Add to existing vercel.json:

```json
{
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "/api-v2/v1/:path*"
    }
  ],
  "env": {
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook_secret",
    "JWT_SECRET": "@jwt_secret",
    "FIREBASE_PROJECT_ID": "@firebase_project_id"
  },
  "functions": {
    "api-v2/**/*.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

---

## PART 2: STRIPE SETUP (Enterprise SaaS Model)

### Stripe Products to Create

**Product 1: DEFRAG API - Free Tier**

```
Product ID: prod_xxx_free
Name: DEFRAG API - Free
Description: "1,000 requests/month, /v1/telemetry/vectors only"
Price: $0/month (free tier)
Metadata: {
  "tier": "free",
  "rate_limit_monthly": 1000,
  "endpoints": ["telemetry"]
}
```

**Product 2: DEFRAG API - Pro Tier**

```
Product ID: prod_xxx_pro
Name: DEFRAG API - Pro
Description: "50,000 requests/month, all endpoints"
Price: $499/month (recurring)
Metadata: {
  "tier": "pro",
  "rate_limit_monthly": 50000,
  "endpoints": ["seda", "telemetry", "orbit"]
}
```

**Product 3: DEFRAG API - Enterprise Tier**

```
Product ID: prod_xxx_enterprise
Name: DEFRAG API - Enterprise
Description: "Unlimited requests, custom SLA"
Price: Custom (contact sales)
Metadata: {
  "tier": "enterprise",
  "rate_limit_monthly": null,
  "endpoints": ["*"]
}
```

**Action:** Create these products in Stripe dashboard NOW. Save the Price IDs to `.env.local`:

```
STRIPE_FREE_PRICE_ID=price_xxx_free
STRIPE_PRO_PRICE_ID=price_xxx_pro
STRIPE_ENTERPRISE_PRICE_ID=price_xxx_enterprise
```

### Stripe Webhook Events to Handle

- `customer.subscription.created` → Create API key, store in Firestore
- `customer.subscription.updated` → Update rate limits, tier
- `customer.subscription.deleted` → Revoke API key
- `invoice.payment_failed` → Alert customer

---

## PART 3: API KEY MANAGEMENT (Gating Mechanism)

### Firestore Schema for API Keys

Collection: `/api_keys/{key_id}`

```
{
  key_id: "sk_live_xyz123...",         // Stripe-style prefix
  key_hash: "sha256_hash_...",         // Never store plain key
  user_id: "firebase_uid",
  stripe_customer_id: "cus_xxx",
  stripe_subscription_id: "sub_xxx",
  tier: "free" | "pro" | "enterprise",
  created_at: timestamp,
  last_used: timestamp,
  usage_count: number,
  monthly_usage_reset: timestamp,
  rate_limit_monthly: 1000 | 50000 | null,
  endpoints: ["seda", "telemetry", "orbit"],
  is_active: boolean,
  expires_at: null | timestamp (for trial keys)
}
```

### API Key Generation Endpoint

**POST /api-v2/auth/create-key.ts**

```typescript
// Input: { user_id, stripe_customer_id, tier }
// Output: { api_key, key_id } (plain key returned ONCE)
// Process:
//   1. Generate 32-char random key with "sk_live_" prefix
//   2. Hash key with SHA-256
//   3. Store hash + metadata in Firestore
//   4. Return plain key (user must copy)
//   5. Never log plain key

// Security: Only return plain key on creation. Never in logs.
```

---

## PART 4: PUBLIC API ENDPOINTS (Stripe-Gated)

### Endpoint 1: POST /api/v1/seda/audit

**Purpose:** Safety scoring (public, requires API key)

**Request:**

```json
{
  "journal_text": "optional user text",
  "birth_data": { "date": "1990-01-15", "time": "14:30", "lat": 34.05, "lon": -118.24 },
  "context": "optional"
}
```

**Headers:**

```
Authorization: Bearer sk_live_xyz123...
```

**Response (200 OK):**

```json
{
  "request_id": "req_xxx",
  "timestamp": "2026-01-31T20:00:00Z",
  "seda_score": 42,
  "band": "caution",
  "mode": "throttled",
  "threshold_details": {
    "score_range": "30-45",
    "label": "Dual Diagnosis Risk",
    "action": "Reduce esoteric output by 70%, prioritize reality testing"
  },
  "safety_action_taken": "content_throttled",
  "audit_logged": true,
  "input_hash": "sha256_hash_for_privacy"
}
```

**Rate Limit:** Counted against monthly limit

**Implementation:**

```typescript
// /api-v2/v1/seda/audit.ts

import { validateApiKey } from '../middleware/auth';
import { logUsage } from '../middleware/logging';
import { calculateSEDA } from '@/src/lib/seda/calculator';

export default async function handler(req, res) {
  // 1. Validate API key
  const keyData = await validateApiKey(req);
  if (!keyData || !keyData.is_active) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  // 2. Check rate limit
  if (keyData.monthly_usage >= keyData.rate_limit_monthly) {
    return res.status(429).json({ error: "Monthly limit exceeded" });
  }

  // 3. Process SEDA
  const { journal_text, birth_data, context } = req.body;
  const sedaResult = calculateSEDA({ journal_text, birth_data, context });

  // 4. Log usage
  await logUsage(keyData.key_id, 'seda_audit', sedaResult);

  // 5. Increment counter
  await increaseUsageCount(keyData.key_id);

  // 6. Return result
  return res.status(200).json({
    request_id: generateRequestId(),
    timestamp: new Date().toISOString(),
    ...sedaResult,
    audit_logged: true
  });
}
```

### Endpoint 2: GET /api/v1/telemetry/vectors

**Purpose:** NASA JPL telemetry (public, requires API key)

**Query Params:**

```
date=YYYY-MM-DD&time=HH:MM&lat=±90&lon=±180&api_key=sk_live_xxx
OR
Authorization: Bearer sk_live_xxx
```

**Response (200 OK):**

```json
{
  "timestamp": "1990-01-15T14:30:00Z",
  "location": { "lat": 34.05, "lon": -118.24, "elevation_meters": 0 },
  "observer_timezone": "America/Los_Angeles",
  "planets": [
    {
      "body": "sun",
      "ra_degrees": 294.82,
      "dec_degrees": -21.15,
      "distance_au": 0.9833,
      "azimuth_degrees": 125.4,
      "altitude_degrees": 42.3,
      "topocentric": true,
      "biological_pressure_score": 0.78
    }
  ],
  "source": "astronomy-engine-2.1.19",
  "precision": "topocentric"
}
```

**Rate Limit:** Counted against monthly limit

**Implementation:**

```typescript
// /api-v2/v1/telemetry/vectors.ts

import { validateApiKey } from '../middleware/auth';
import { logUsage } from '../middleware/logging';
import { calculateTelemetry } from '@/src/lib/telemetry';

export default async function handler(req, res) {
  // 1. Validate API key
  const keyData = await validateApiKey(req);
  if (!keyData) return res.status(401).json({ error: "Invalid API key" });

  // 2. Check rate limit
  if (keyData.monthly_usage >= keyData.rate_limit_monthly) {
    return res.status(429).json({ error: "Monthly limit exceeded" });
  }

  // 3. Get params
  const { date, time, lat, lon } = req.query;

  // 4. Check cache (Redis or Firestore)
  const cacheKey = `telemetry_${lat}_${lon}_${date}_${time}`;
  const cached = await getFromCache(cacheKey);
  if (cached) {
    await logUsage(keyData.key_id, 'telemetry_vectors', null, true);
    return res.status(200).json({ ...cached, cache_hit: true });
  }

  // 5. Calculate telemetry (using astronomy-engine)
  const telemetry = await calculateTelemetry({ date, time, lat, lon });

  // 6. Cache result (1-hour TTL)
  await setCache(cacheKey, telemetry, 3600);

  // 7. Log usage
  await logUsage(keyData.key_id, 'telemetry_vectors', null, false);

  // 8. Return result
  return res.status(200).json({
    ...telemetry,
    cache_hit: false
  });
}
```

### Endpoint 3: POST /api/v1/orbit/map

**Purpose:** Relational geometry mapping (public, requires API key)

**Request:**

```json
{
  "people": [
    { "name": "Person A", "birth_data": {...}, "role": "parent" },
    { "name": "Person B", "birth_data": {...}, "role": "child" }
  ]
}
```

**Response (200 OK):**

```json
{
  "request_id": "req_xxx",
  "timestamp": "2026-01-31T20:00:00Z",
  "geometry": "dyad",
  "people_count": 2,
  "friction_matrix": {
    "Person A <> Person B": 0.68
  },
  "pressure_points": [
    {
      "person": "Person B",
      "role": "child",
      "avg_friction": 0.68,
      "interpretation": "Receiver of unresolved parental tension"
    }
  ],
  "triangulation": [],
  "recommendations": [
    "High friction detected: Consider conflict de-escalation protocol"
  ]
}
```

**Rate Limit:** Counted as (N * (N-1)/2) calls for N people (e.g., 2 people = 1 call, 3 people = 3 calls)

---

## PART 5: AUTHENTICATION & RATE LIMITING MIDDLEWARE

### Auth Middleware (/api-v2/middleware/auth.ts)

```typescript
import { hashKey } from '../lib/stripe';
import { db } from '@/src/lib/firebase';

export async function validateApiKey(req) {
  // Extract key from headers or query
  const key = req.headers.authorization?.replace('Bearer ', '') || 
              req.query.api_key;

  if (!key) return null;

  // Hash the key
  const keyHash = hashKey(key);

  // Look up in Firestore
  const keysRef = db.collection('api_keys');
  const querySnapshot = await keysRef
    .where('key_hash', '==', keyHash)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const keyData = querySnapshot.docs.data();

  // Check if active
  if (!keyData.is_active) return null;

  // Check if expired
  if (keyData.expires_at && new
