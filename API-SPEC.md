# API-SPEC

## Endpoints
- `GET /api-v2/dashboard/keys`
- `POST /api-v2/dashboard/keys-create`
- `DELETE /api-v2/dashboard/keys/{keyId}`
- `GET /api-v2/dashboard/stats`

## Firestore Schema

### `users/{uid}`
```json
{
  "uid": "...",
  "email": "...",
  "role": "consumer|developer|enterprise_admin",
  "tosAcceptedVersion": "2026-01",
  "privacyAcceptedVersion": "2026-01",
  "clinicalDisclaimerAcceptedVersion": "2026-01",
  "createdAt": "ISO-8601",
  "lastLoginAt": "ISO-8601"
}
```

### `apikeys/{keyId}`
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

### `usageAggregates/{(userId or keyId)-(YYYY-MM-DD)}`
- Aggregated stats.

## Logic
- Generate plain API key once, hash with SHA-256, store hash + metadata.
- Email plain key via Resend.
- Middleware: validates key, enforces rateLimitMonthly, increments usage.
