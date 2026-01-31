---
description: How to deploy DEFRAG changes to production (defrag.app)
---

# DEFRAG Deployment Workflow

## ⚠️ CRITICAL: Project Location

**ALWAYS use the LOCAL project path, NEVER Dropbox:**

- ✅ CORRECT: `/Users/cjo/dev/THISISDEFRAG`
- ❌ NEVER: `/Users/cjo/Library/CloudStorage/Dropbox-*`

Dropbox causes permission issues and shell command failures. All development MUST happen in the local `/Users/cjo/dev/THISISDEFRAG` directory.

## Project Structure

```
/Users/cjo/dev/THISISDEFRAG/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Shared components
│   ├── styles/          # CSS files
│   ├── lib/             # Utility libraries
│   └── services/        # API services
├── api/                 # Vercel serverless functions
├── public/              # Static assets
├── package.json
├── vercel.json
└── vite.config.ts
```

## Deployment Steps

// turbo-all

1. Check git status

```bash
cd /Users/cjo/dev/THISISDEFRAG && git status
```

1. Stage changes

```bash
cd /Users/cjo/dev/THISISDEFRAG && git add -A
```

1. Commit with descriptive message

```bash
cd /Users/cjo/dev/THISISDEFRAG && git commit -m "description of changes"
```

1. Push to trigger Vercel deploy

```bash
cd /Users/cjo/dev/THISISDEFRAG && git push origin main
```

1. Verify deployment (wait 2-3 minutes then check)

- Live URL: <https://defrag.app>
- Vercel Dashboard: <https://vercel.com/chads-projects-9f66a3c6/thisisdefrag>

## Local Development

// turbo

```bash
cd /Users/cjo/dev/THISISDEFRAG && npm run dev
```

Opens at <http://localhost:5173>

## Key Files

- `src/pages/PlatformHub.tsx` - Main landing page
- `src/styles/PlatformHub.css` - Landing page styles
- `src/pages/developer/*` - Developer Portal pages
- `src/AppRouter.tsx` - Route definitions

## Git Remote

- Repository: <https://github.com/cjo93/THISISDEFRAG>
- Branch: main
- Auto-deploy: Vercel connected to main branch
