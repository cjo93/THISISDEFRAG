import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Manuals from './pages/products/Manuals';
import PlatformHub from './pages/PlatformHub'; // New Main Entry
import Echo from './pages/Echo';
import Platform from './pages/Platform';
import Agents from './pages/Agents';
import Start from './pages/Start';
import Analysis from './pages/Analysis';
import Checkout from './pages/Checkout';
import Manual from './pages/Manual';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import SignIn from './pages/SignIn';
import SignInVerify from './pages/SignInVerify';
// import Learn from './pages/Learn'; // If exists
// import Relational from './pages/Relational'; // If exists

// Admin
import Admin from './pages/Admin';
import OwnerRoute from './components/OwnerRoute';
// import ProtectedRoute from './components/ProtectedRoute'; // Using DashboardLayout's internal auth check for new dashboard

// Dashboard (New)
import DashboardLayout from './pages/dashboard/Layout';
import Overview from './pages/dashboard/Overview';
import Keys from './pages/dashboard/Keys';
import Usage from './pages/dashboard/Usage';

// Documentation
import DocsIndex from './pages/docs/Index';
import DocLayout from './components/docs/DocLayout';
import GettingStarted from './pages/docs/GettingStarted';
import APIReference from './pages/docs/APIReference';
import Authentication from './pages/docs/Authentication';
import SDKs from './pages/docs/SDKs';
import CodeExamples from './pages/docs/CodeExamples';

// Developer Portal
import DeveloperLayout from './pages/developer/Layout';
import DeveloperIndex from './pages/developer/Index';
import DeveloperGuides from './pages/developer/Guides';
import DeveloperResources from './pages/developer/Resources';
import DeveloperCommunity from './pages/developer/Community';
import DeveloperRoadmap from './pages/developer/Roadmap';

export default function AppRouter() {
  return (
    <Routes>
      {/* --- MAIN PLATFORM --- */}
      <Route path="/" element={<Platform />} />

      {/* Legacy/Specific Product Landings */}
      <Route path="/echo" element={<Echo />} />
      <Route path="/platform" element={<PlatformHub />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/start" element={<Start />} />
      <Route path="/analysis" element={<Analysis />} />

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
  );
}
