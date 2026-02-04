import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import OwnerRoute from './components/OwnerRoute';

// Pages
const Manuals = lazy(() => import(/* webpackChunkName: "Manuals" */ './pages/products/Manuals'));
const PlatformHub = lazy(() => import(/* webpackChunkName: "PlatformHub" */ './pages/PlatformHub'));
const Echo = lazy(() => import(/* webpackChunkName: "Echo" */ './pages/Echo'));
const Platform = lazy(() => import(/* webpackChunkName: "Platform" */ './pages/Platform'));
const Agents = lazy(() => import(/* webpackChunkName: "Agents" */ './pages/Agents'));
const Start = lazy(() => import(/* webpackChunkName: "Start" */ './pages/Start'));
const Analysis = lazy(() => import(/* webpackChunkName: "Analysis" */ './pages/Analysis'));
const Checkout = lazy(() => import(/* webpackChunkName: "Checkout" */ './pages/Checkout'));
const Manual = lazy(() => import(/* webpackChunkName: "Manual" */ './pages/Manual'));
const About = lazy(() => import(/* webpackChunkName: "About" */ './pages/About'));
const HowItWorks = lazy(() => import(/* webpackChunkName: "HowItWorks" */ './pages/HowItWorks'));
const Privacy = lazy(() => import(/* webpackChunkName: "Privacy" */ './pages/Privacy'));
const Terms = lazy(() => import(/* webpackChunkName: "Terms" */ './pages/Terms'));
const SignIn = lazy(() => import(/* webpackChunkName: "SignIn" */ './pages/SignIn'));
const SignInVerify = lazy(() => import(/* webpackChunkName: "SignInVerify" */ './pages/SignInVerify'));
const Relational = lazy(() => import(/* webpackChunkName: "Relational" */ './pages/Relational'));
const Inversion = lazy(() => import(/* webpackChunkName: "Inversion" */ './pages/Inversion'));

// Admin
const Admin = lazy(() => import(/* webpackChunkName: "Admin" */ './pages/Admin'));

// Dashboard (New)
const DashboardLayout = lazy(() => import(/* webpackChunkName: "DashboardLayout" */ './pages/dashboard/Layout'));
const Overview = lazy(() => import(/* webpackChunkName: "Overview" */ './pages/dashboard/Overview'));
const Keys = lazy(() => import(/* webpackChunkName: "Keys" */ './pages/dashboard/Keys'));
const Usage = lazy(() => import(/* webpackChunkName: "Usage" */ './pages/dashboard/Usage'));

// Documentation
const DocsIndex = lazy(() => import(/* webpackChunkName: "DocsIndex" */ './pages/docs/Index'));
const DocLayout = lazy(() => import(/* webpackChunkName: "DocLayout" */ './components/docs/DocLayout'));
const GettingStarted = lazy(() => import(/* webpackChunkName: "GettingStarted" */ './pages/docs/GettingStarted'));
const APIReference = lazy(() => import(/* webpackChunkName: "APIReference" */ './pages/docs/APIReference'));
const Authentication = lazy(() => import(/* webpackChunkName: "Authentication" */ './pages/docs/Authentication'));
const SDKs = lazy(() => import(/* webpackChunkName: "SDKs" */ './pages/docs/SDKs'));
const CodeExamples = lazy(() => import(/* webpackChunkName: "CodeExamples" */ './pages/docs/CodeExamples'));

// Developer Portal
const DeveloperLayout = lazy(() => import(/* webpackChunkName: "DeveloperLayout" */ './pages/developer/Layout'));
const DeveloperIndex = lazy(() => import(/* webpackChunkName: "DeveloperIndex" */ './pages/developer/Index'));
const DeveloperGuides = lazy(() => import(/* webpackChunkName: "DeveloperGuides" */ './pages/developer/Guides'));
const DeveloperResources = lazy(() => import(/* webpackChunkName: "DeveloperResources" */ './pages/developer/Resources'));
const DeveloperCommunity = lazy(() => import(/* webpackChunkName: "DeveloperCommunity" */ './pages/developer/Community'));
const DeveloperRoadmap = lazy(() => import(/* webpackChunkName: "DeveloperRoadmap" */ './pages/developer/Roadmap'));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
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
