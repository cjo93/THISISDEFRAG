import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';

// Pages
import PlatformHub from './pages/PlatformHub';

// Products
import Manuals from './pages/products/Manuals';
import InversionReport from './pages/products/InversionReport';

// Relational
import RelationalIndex from './pages/relational/Index';

// Signal
import SignalIndex from './pages/signal/Index';

// Dashboard
import DashboardIndex from './pages/dashboard/index';
import DashboardKeys from './pages/dashboard/Keys';
import DashboardUsage from './pages/dashboard/Usage';
import DashboardBilling from './pages/dashboard/Billing';

// Docs
import DocsIndex from './pages/docs/Index';
import DocsGettingStarted from './pages/docs/GettingStarted';
import DocsAPIReference from './pages/docs/APIReference';
import DocsAuthentication from './pages/docs/Authentication';
import DocsSDKs from './pages/docs/SDKs';
import DocsCodeExamples from './pages/docs/CodeExamples';
import DocsFAQs from './pages/docs/FAQs';
import DocsTutorials from './pages/docs/Tutorials';
import DocsSupport from './pages/docs/Support';

// Developer
import DeveloperIndex from './pages/developer/Index';
import DeveloperGuides from './pages/developer/Guides';
import DeveloperResources from './pages/developer/Resources';
import DeveloperRoadmap from './pages/developer/Roadmap';
import DeveloperCommunity from './pages/developer/Community';

// Company
import CompanyAbout from './pages/company/About';
import CompanyBlog from './pages/company/Blog';
import CompanyCareers from './pages/company/Careers';
import CompanyContact from './pages/company/Contact';
import CompanyPress from './pages/company/Press';
import CompanySecurity from './pages/company/Security';

// Legal
import LegalTerms from './pages/legal/Terms';
import LegalPrivacy from './pages/legal/Privacy';
import LegalClinical from './pages/legal/Clinical';
import LegalCookiePolicy from './pages/legal/CookiePolicy';

// Auth
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Onboarding from './pages/auth/Onboarding';
import AuthPricing from './pages/auth/Pricing';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlatformHub />} />

        {/* Products */}
        <Route path="/products/manuals" element={<Manuals />} />
        <Route path="/products/inversion" element={<InversionReport />} />

        {/* Relational */}
        <Route path="/relational" element={<RelationalIndex />} />

        {/* Signal */}
        <Route path="/signal" element={<SignalIndex />} />

        {/* Dashboard (Protected Routes) */}
        <Route path="/dashboard" element={<AuthGuard><DashboardIndex /></AuthGuard>} />
        <Route path="/dashboard/keys" element={<AuthGuard><DashboardKeys /></AuthGuard>} />
        <Route path="/dashboard/usage" element={<AuthGuard><DashboardUsage /></AuthGuard>} />
        <Route path="/dashboard/billing" element={<AuthGuard><DashboardBilling /></AuthGuard>} />

        {/* Docs */}
        <Route path="/docs" element={<DocsIndex />} />
        <Route path="/docs/getting-started" element={<DocsGettingStarted />} />
        <Route path="/docs/api-reference" element={<DocsAPIReference />} />
        <Route path="/docs/authentication" element={<DocsAuthentication />} />
        <Route path="/docs/sdks" element={<DocsSDKs />} />
        <Route path="/docs/code-examples" element={<DocsCodeExamples />} />
        <Route path="/docs/faqs" element={<DocsFAQs />} />
        <Route path="/docs/tutorials" element={<DocsTutorials />} />
        <Route path="/docs/support" element={<DocsSupport />} />

        {/* Developer */}
        <Route path="/developer" element={<DeveloperIndex />} />
        <Route path="/developer/guides" element={<DeveloperGuides />} />
        <Route path="/developer/resources" element={<DeveloperResources />} />
        <Route path="/developer/roadmap" element={<DeveloperRoadmap />} />
        <Route path="/developer/community" element={<DeveloperCommunity />} />

        {/* Company */}
        <Route path="/company/about" element={<CompanyAbout />} />
        <Route path="/company/blog" element={<CompanyBlog />} />
        <Route path="/company/careers" element={<CompanyCareers />} />
        <Route path="/company/contact" element={<CompanyContact />} />
        <Route path="/company/press" element={<CompanyPress />} />
        <Route path="/company/security" element={<CompanySecurity />} />

        {/* Legal */}
        <Route path="/legal/terms" element={<LegalTerms />} />
        <Route path="/legal/privacy" element={<LegalPrivacy />} />
        <Route path="/legal/clinical" element={<LegalClinical />} />
        <Route path="/legal/cookie-policy" element={<LegalCookiePolicy />} />

        {/* Auth */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/onboarding" element={<Onboarding />} />
        <Route path="/auth/pricing" element={<AuthPricing />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
