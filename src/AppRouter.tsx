import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
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
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerRoute from './components/OwnerRoute';
import Learn from './pages/Learn';
import Relational from './pages/Relational';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/start" element={<Start />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signin/verify" element={<SignInVerify />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/relational" element={<Relational />} />

      {/* Protected Routes - Require Authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manual"
        element={
          <ProtectedRoute>
            <Manual />
          </ProtectedRoute>
        }
      />

      {/* Owner-Only Routes */}
      <Route
        path="/admin"
        element={
          <OwnerRoute>
            <Admin />
          </OwnerRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
