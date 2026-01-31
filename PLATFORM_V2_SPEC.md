# DEFRAG PLATFORM v2.0 - AI AGENT BUILD SPECIFICATION

## PROJECT STRUCTURE SCAFFOLDING

```
THISISDEFRAG/
├── src/
│   ├── pages/
│   │   ├── PlatformHub.tsx          (NEW - Main platform landing)
│   │   ├── products/
│   │   │   └── Manuals.tsx          (MOVED - Old landing → /products/manuals)
│   │   ├── dashboard/
│   │   │   ├── Overview.tsx         (EXISTS)
│   │   │   ├── Keys.tsx             (EXISTS)
│   │   │   ├── Usage.tsx            (EXISTS)
│   │   │   └── index.tsx            (Layout wrapper)
│   │   ├── docs/
│   │   │   ├── Index.tsx            (Docs home)
│   │   │   ├── GettingStarted.tsx
│   │   │   ├── APIReference.tsx
│   │   │   ├── SDKs.tsx
│   │   │   ├── CodeExamples.tsx
│   │   │   ├── FAQs.tsx
│   │   │   ├── Tutorials.tsx
│   │   │   └── Support.tsx
│   │   ├── developer/
│   │   │   ├── Index.tsx            (Developer portal)
│   │   │   ├── Guides.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Roadmap.tsx
│   │   │   └── Community.tsx
│   │   ├── company/
│   │   │   ├── About.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Careers.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Press.tsx
│   │   │   └── Security.tsx
│   │   ├── legal/
│   │   │   ├── Terms.tsx
│   │   │   ├── Privacy.tsx
│   │   │   └── CookiePolicy.tsx
│   │   └── Auth/
│   │       ├── SignIn.tsx           (EXISTS)
│   │       ├── SignUp.tsx           (EXISTS)
│   │       ├── Pricing.tsx
│   │       └── Onboarding.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           (Platform header)
│   │   │   ├── Footer.tsx           (Platform footer)
│   │   │   ├── Navigation.tsx
│   │   │   ├── Sidebar.tsx          (Docs sidebar)
│   │   │   └── Breadcrumbs.tsx
│   │   │
│   │   ├── UI/
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── CodeBlock.tsx        (For docs)
│   │   │   ├── Tabs.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Table.tsx
│   │   │   └── SearchBar.tsx
│   │   │
│   │   ├── docs/
│   │   │   ├── DocLayout.tsx
│   │   │   ├── TocSidebar.tsx       (Table of contents)
│   │   │   ├── CodeSnippet.tsx
│   │   │   ├── APIEndpoint.tsx
│   │   │   ├── RequestResponse.tsx
│   │   │   └── FeatureHighlight.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.tsx  (EXISTS)
│   │   │   ├── StatCard.tsx
│   │   │   ├── Chart.tsx            (Recharts wrapper)
│   │   │   ├── ApiKeyCard.tsx
│   │   │   └── UsageChart.tsx
│   │   │
│   │   └── marketing/
│   │       ├── Hero.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── PricingTier.tsx
│   │       ├── Testimonial.tsx
│   │       └── CTA.tsx
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── PlatformHub.css           (NEW)
│   │   ├── docs.css                  (NEW)
│   │   ├── dashboard.css             (EXISTS)
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── admin.ts             (EXISTS)
│   │   │   ├── client.ts            (EXISTS)
│   │   │   └── auth-context.tsx     (EXISTS)
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── hooks.ts
│   │   ├── utils/
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   └── types/
│   │       ├── api.ts
│   │       ├── user.ts
│   │       └── index.ts
│   │
│   ├── content/
│   │   ├── docs/                    (NEW - MDX/markdown files)
│   │   │   ├── getting-started.md
│   │   │   ├── api-reference.md
│   │   │   ├── authentication.md
│   │   │   ├── rate-limiting.md
│   │   │   ├── errors.md
│   │   │   ├── sdks.md
│   │   │   ├── code-examples.md
│   │   │   └── faqs.md
│   │   │
│   │   ├── resources/
│   │   │   ├── templates/
│   │   │   ├── guides/
│   │   │   └── whitepapers/
│   │   │
│   │   └── blog/
│   │       ├── 2026-01-platform-launch.md
│   │       └── ...
│   │
│   ├── AppRouter.tsx                (EXISTS - UPDATE ROUTING)
│   └── App.tsx                      (EXISTS)
│
├── api-v2/                          (EXISTS - Backend)
│   ├── dashboard/                   (EXISTS)
│   ├── docs/
│   │   ├── swagger.ts               (NEW - API docs generation)
│   │   └── openapi.json             (NEW - OpenAPI spec)
│   └── ...
```

## ROUTING STRUCTURE (AppRouter.tsx Updates)

```typescript
// src/AppRouter.tsx - NEW ROUTING STRUCTURE

const AppRouter = () => {
  return (
    <Routes>
      {/* Platform Hub - Main Entry Point */}
      <Route path="/" element={<PlatformHub />} />

      {/* Products */}
      <Route path="/products/manuals" element={<Manuals />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="" element={<Overview />} />
        <Route path="keys" element={<Keys />} />
        <Route path="usage" element={<Usage />} />
      </Route>

      {/* Developer Portal */}
      <Route path="/developer" element={<DeveloperPortal />}>
        <Route path="" element={<DeveloperIndex />} />
        <Route path="guides" element={<Guides />} />
        <Route path="resources" element={<Resources />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="community" element={<Community />} />
      </Route>

      {/* Documentation */}
      <Route path="/docs" element={<DocLayout />}>
        <Route path="" element={<DocsIndex />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="api-reference" element={<APIReference />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="sdks" element={<SDKs />} />
        <Route path="code-examples" element={<CodeExamples />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Company */}
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/press" element={<Press />} />
      <Route path="/security" element={<Security />} />

      {/* Legal */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<CookiePolicy />} />

      {/* Auth */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Status & Misc */}
      <Route path="/status" element={<StatusPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
```

## COMPONENT SPECIFICATIONS

### 1. PlatformHub.tsx Specification

- **Sections**: Header, Hero, Product Showcase, Benefits, Pricing, Footer
- **Design**: Premium, modern, clean, mobile responsive

### 2. Documentation System Specification (/docs)

- **Architecture**: Sidebar nav, Main content, TOC, Search
- **Pages**: Getting Started, API Reference, Auth, SDKs, Examples, FAQs, Tutorials, Support

### 3. Developer Portal Specification (/developer)

- **Pages**: Home, Guides, Resources, Roadmap, Community
- **Design**: Developer-focused, code-heavy, dark mode preferred
