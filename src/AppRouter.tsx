import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageLoader from './components/ui/PageLoader';

// Eagerly loaded Main Entry (Critical Path)
import PlatformHub from './pages/PlatformHub';
import OwnerRoute from './components/OwnerRoute';

// Pages - Lazy Loaded
const Manuals = lazy(() => import('./pages/products/Manuals'));
const Echo = lazy(() => import('./pages/Echo'));
const Platform = lazy(() => import('./pages/Platform'));
const Agents = lazy(() => import('./pages/Agents'));
const Start = lazy(() => import('./pages/Start'));
const Analysis = lazy(() => import('./pages/Analysis'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Manual = lazy(() => import('./pages/Manual'));
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignInVerify = lazy(() => import('./pages/SignInVerify'));
// const Learn = lazy(() => import('./pages/Learn')); // If exists
const Relational = lazy(() => import('./pages/Relational'));
const Inversion = lazy(() => import('./pages/Inversion'));

// Admin - Lazy Loaded
const Admin = lazy(() => import('./pages/Admin'));

// Dashboard (New) - Lazy Loaded
const DashboardLayout = lazy(() => import('./pages/dashboard/Layout'));
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const Keys = lazy(() => import('./pages/dashboard/Keys'));
const Usage = lazy(() => import('./pages/dashboard/Usage'));

// Documentation - Lazy Loaded
const DocsIndex = lazy(() => import('./pages/docs/Index'));
const DocLayout = lazy(() => import('./components/docs/DocLayout'));
const GettingStarted = lazy(() => import('./pages/docs/GettingStarted'));
const APIReference = lazy(() => import('./pages/docs/APIReference'));
const Authentication = lazy(() => import('./pages/docs/Authentication'));
const SDKs = lazy(() => import('./pages/docs/SDKs'));
const CodeExamples = lazy(() => import('./pages/docs/CodeExamples'));

// Developer Portal - Lazy Loaded
const DeveloperLayout = lazy(() => import('./pages/developer/Layout'));
const DeveloperIndex = lazy(() => import('./pages/developer/Index'));
const DeveloperGuides = lazy(() => import('./pages/developer/Guides'));
const DeveloperResources = lazy(() => import('./pages/developer/Resources'));
const DeveloperCommunity = lazy(() => import('./pages/developer/Community'));
const DeveloperRoadmap = lazy(() => import('./pages/developer/Roadmap'));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* --- MAIN PLATFORM --- */}
        {/* defrag.app root = Infrastructure Hub (ECHO/ORBIT/SIGNAL/API grid) */}
        <Route path="/" element={<PlatformHub />} />

        {/* Product-specific landings */}
        <Route path="/echo" element={<Echo />} />
        <Route path="/api" element={<Platform />} />  {/* API-specific page (was at root, now at /api) */}
        <Route path="/platform" element={<PlatformHub />} />  {/* Legacy support */}
        <Route path="/agents" element={<Agents />} />
        <Route path="/start" element={<Start />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/relational" element={<Relational />} />
        <Route path="/inversion" element={<Inversion />} />

        {/* Product Pages */}
        <Route path="/products/manuals" element={<Manuals />} /> {/* Original Sales Page */}
        <Route path="/manual" element={<Navigate to="/defrag-manual" replace />} />
        <Route path="/defrag-manual" element={<Manual />} /> {/* Legacy path support */}

        {/* --- DASHBOARD --- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="keys" element={<Keys />} />
          <Route path="usage" element={<Usage />} />
        </Route>

        {/* --- DEVELOPER PORTAL --- */}
        <Route path="/developer" element={<DeveloperLayout />}>
          <Route index element={<DeveloperIndex />} />
          <Route path="guides" element={<DeveloperGuides />} />
          <Route path="resources" element={<DeveloperResources />} />
          <Route path="community" element={<DeveloperCommunity />} />
          <Route path="roadmap" element={<DeveloperRoadmap />} />
        </Route>

        {/* --- DOCUMENTATION --- */}
        <Route path="/docs" element={<DocLayout><DocsIndex /></DocLayout>} />
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/api-reference" element={<APIReference />} />
        <Route path="/docs/authentication" element={<Authentication />} />
        <Route path="/docs/sdks" element={<SDKs />} />
        <Route path="/docs/code-examples" element={<CodeExamples />} />

        {/* --- AUTH & UTILS --- */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/verify" element={<SignInVerify />} />

        {/* --- LEGAL & INFO --- */}
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* --- ADMIN --- */}
        <Route
          path="/admin"
          element={
            <OwnerRoute>
              <Admin />
            </OwnerRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
