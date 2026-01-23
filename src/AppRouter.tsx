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
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/start" element={<Start />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/about" element={<div>ABOUT - Test</div>} />
      <Route path="/how-it-works" element={<div>HOW IT WORKS - Test</div>} />
      <Route path="/privacy" element={<div>PRIVACY - Test</div>} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
