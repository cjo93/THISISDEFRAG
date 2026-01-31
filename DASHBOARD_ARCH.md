# Developer Dashboard Architecture (Phase 3)

## Overview

A comprehensive B2B developer portal embedded within `defrag.app` at `/dashboard`. Allows users to manage API keys, view usage analytics, and manage billing.

## 1. Technical Approach (Option A)

- **Framework:** React (Vite) inside existing `src/`
- **Route:** `/dashboard/*` (Client-side routing via React Router)
- **Auth:** Firebase Auth (Google/GitHub/Email)
- **Database:** Firestore
- **Styling:** Tailwind CSS (matching `index.css` theme)
- **Charts:** Recharts

## 2. Database Schema Updates (Firestore)

### `users` (Collection)

Tracks user profile and Stripe association.

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  stripe_customer_id?: string;
  created_at: Timestamp;
  plan_tier: 'free' | 'pro' | 'enterprise'; // Cached from Stripe
}
```

### `api_keys` (Collection)

Already exists, but fields formalized for Dashboard visibility.

```typescript
interface ApiKey {
  key_id: string; // Firestore Doc ID
  key_hash: string; // SHA-256 (Never stored plain)
  key_hint: string; // "sk_live_...a1b2" (First 4, Last 4) of original? Or just last 4.
  user_id: string; // Link to users/{uid}
  label: string; // User-defined name e.g. "Prod Server"
  tier: 'free' | 'pro' | 'enterprise';
  created_at: Timestamp;
  last_used_at?: Timestamp;
  is_active: boolean;
  monthly_usage: number; // Counter (reset monthly via scheduled function)
  rate_limit_monthly: number;
}
```

### `api_usage_daily` (Collection - NEW)

Pre-aggregated stats for fast charting (Audit logs are too heavy to query raw for charts).
Doc ID: `{user_id}_{YYYY-MM-DD}`

```typescript
interface DailyUsage {
  user_id: string;
  date: string; // YYYY-MM-DD
  total_requests: number;
  requests_by_endpoint: Record<string, number>; // { 'seda': 50, 'orbit': 10 }
  requests_by_status: Record<string, number>; // { '200': 58, '429': 2 }
}
```

## 3. API Routes (Backend-for-Frontend)

Hosted in `api-v2/dashboard/`. Secure endpoints requiring Firebase ID Token.

- **GET** `/api-v2/dashboard/stats`: Returns aggregated usage data for charts.
- **GET** `/api-v2/dashboard/keys`: Lists all active/revoked keys for the user.
- **POST** `/api-v2/dashboard/keys`: Generate a new key (Returns plain key ONCE).
- **POST** `/api-v2/dashboard/keys/:id/revoke`: Revoke a specific key.
- **POST** `/api-v2/dashboard/billing/portal`: Returns Stripe Customer Portal URL.

## 4. UI Component Structure

```
src/
  pages/
    dashboard/
      Layout.tsx       (Sidebar, AuthCheck, Theme)
      Overview.tsx     (Stats cards, recent usage)
      Keys.tsx         (Key management table)
      Billing.tsx      (Plan details, Invoices)
      Settings.tsx     (Team members - Optional)
  components/
    dashboard/
      StatCard.tsx
      UsageChart.tsx   (Recharts)
      KeyTable.tsx
      CreateKeyModal.tsx
```

## 5. Implementation Steps

1. **Auth Context:** Ensure global `AuthProvider` passes current user to Dashboard.
2. **API Client:** Create `lib/api-client.ts` to handle authenticated fetch requests.
3. **Backend:** Implement `api-v2/dashboard/*` endpoints.
4. **Frontend:** Build Layout and Pages.
5. **Wiring:** Connect Frontend to Backend.

## 6. Execution Prompt (The Plan)

1. Create `src/pages/dashboard` directory structure.
2. Implement `api-v2/dashboard` endpoints.
3. Implement `UsageChart` and `KeyTable` components.
4. Build `Overview` and `Keys` pages.
5. Add `/dashboard` to `AppRouter`.
