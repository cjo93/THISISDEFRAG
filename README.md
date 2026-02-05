# DEFRAG Platform v2

DEFRAG is a computational platform that models human behavior using orbital mechanics and gene keys.
This repository contains the v2 production architecture.

## Structure

- `/src`: Main React application (Dashboard, Docs, Products)
- `/api`: Vercel Serverless Functions (Backend API)
- `/v1`: Legacy codebase archive
- `/public`: Static assets

## Documentation

- [Platform Spec](./PLATFORM-SPEC.md) - Routing, Auth, Pages
- [API Spec](./API-SPEC.md) - Endpoints, Schema, Keys
- [UX Guide](./UX-GUIDE.md) - Theming, Tone, Visuals
- [Godmode Colab](./GODMODE-COLAB.md) - Human OS JSON, SEDA Logic

## Development

### Prerequisites

- Node.js 18+
- Firebase Project (Auth, Firestore)
- Stripe Account (Test Mode)

### Setup

Run npm install and then npm run dev to start.

## Status

System is currently in **PRE-PRODUCTION**.
- Dashboard: [Active]
- API: [Active]
- SEDA Engine: [Active]

## Operational Roadmap

- [x] Repo Realignment
- [x] Auth & User Model
- [x] API Key Management
- [x] Developer Portal
- [ ] Inversion Engine (Coming Soon)
