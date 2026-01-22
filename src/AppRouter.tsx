import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Start from './pages/Start';
import Checkout from './pages/Checkout';
import Manual from './pages/Manual';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Privacy from './pages/Privacy';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/start" element={<Start />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
