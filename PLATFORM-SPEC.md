# PLATFORM-SPEC

## Routing & Pages

### Structure
- `/` → PlatformHub.tsx
- `/products/manuals` → Manuals funnel (move existing "User Manual" landing here from v1 as content source, but keep implementation clean in v2).
- `/relational` → ORBIT sales page.
- `/signal` → SIGNAL page / waitlist.
- `/dashboard` → dev portal shell (protected).
- `/docs/*` → docs pages.
- `/developer/*` → developer portal.
- `/legal/*`, `/about`, `/contact`, `/pricing`, etc. → simple, structured pages.

### Pages Directory
```text
src/
  AppRouter.tsx
  pages/
    PlatformHub.tsx
    products/
      Manuals.tsx
    relational/
      Index.tsx
    signal/
      Index.tsx
    dashboard/
      index.tsx
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

## Auth
- `/dashboard/*` and developer routes require authenticated user.
- Blocking modal for Terms, Privacy, and Clinical Disclaimer before accessing dashboard.
