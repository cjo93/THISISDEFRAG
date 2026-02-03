
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackEvent, AnalyticsEvents, ConversionFunnel } from '../lib/analytics';
import { ShieldCheck, Lock, CreditCard, ArrowRight, Zap } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [unitA, setUnitA] = useState<BirthData | null>(null);
  const [unitB, setUnitB] = useState<BirthData | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  const wasCancelled = searchParams.get('cancelled') === 'true';

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(i => (i + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedA = localStorage.getItem('defrag_unitA');
    const savedB = localStorage.getItem('defrag_unitB');
    if (savedA && savedB) {
      setUnitA(JSON.parse(savedA));
      setUnitB(JSON.parse(savedB));
      ConversionFunnel.step4_checkout();
    } else {
      navigate('/start');
    }
  }, [navigate]);

  const handleCheckout = async () => {
    if (!unitA || !unitB) return;
    setIsLoading(true);
    setError('');
    trackEvent(AnalyticsEvents.CHECKOUT_BEGIN);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitA, unitB }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await (stripe as any).redirectToCheckout({ sessionId: data.sessionId });
          if (error) setError(error.message || 'Payment failed');
        }
      } else {
        setError(data.error || 'Failed to create checkout session');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!unitA || !unitB) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
      <Header />

      <main className="relative z-10 pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {wasCancelled && (
            <div className="mb-12 p-6 rounded-3xl border border-orange-500/20 bg-orange-500/5 text-center animate-fade-in">
              <p className="text-sm font-light text-orange-400">Analysis preserved. Ready to initialize when you are.</p>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              ANALYSIS COMPLETE
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-8">
              Deployment Protocol
            </h1>
            <p className="text-xl text-white/40 font-light max-w-lg mx-auto leading-relaxed">
              System architecture mapped across all interaction layers. Authorization required for full disclosure.
            </p>
          </div>

          {/* Units Summary Card — Premium Visual */}
          <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] mb-8 relative overflow-hidden group">
            <div className="flex items-center justify-between gap-8 relative z-10">

              {/* Unit A */}
              <div className="flex flex-col items-start gap-4 flex-1">
                <div className="h-20 w-20 rounded-[24px] bg-orange-500 flex items-center justify-center text-black font-black text-3xl shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                  {unitA.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-light text-2xl text-white">{unitA.name}</div>
                  <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase mt-1">PRIMARY_NODE</div>
                </div>
              </div>

              {/* Interaction Link */}
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${i === pulseIndex ? 'bg-orange-500 scale-150' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                <Zap size={16} className="text-orange-500/50" />
              </div>

              {/* Unit B */}
              <div className="flex flex-col items-end gap-4 flex-1">
                <div className="h-20 w-20 rounded-[24px] bg-zinc-900 border border-white/10 flex items-center justify-center text-white/40 font-black text-3xl group-hover:border-white/30 transition-colors">
                  {unitB.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <div className="font-light text-2xl text-white">{unitB.name}</div>
                  <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase mt-1">SYSTEM_SUBJECT</div>
                </div>
              </div>

            </div>
            {/* Subtle light detail */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_-20px_40px_rgba(255,255,255,0.02)]" />
          </div>

          {/* Pricing Grid */}
          <div className="p-10 rounded-[40px] border border-white/5 bg-zinc-950 mb-12 relative group">
            <div className="flex items-baseline justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-light text-white">Full Behavioral Manual</h3>
                <p className="text-sm text-white/20 font-light">One-time generation • Eternal access</p>
              </div>
              <div className="text-5xl font-light text-white">$19</div>
            </div>

            <div className="h-px bg-white/5 mb-8" />

            <ul className="grid sm:grid-cols-2 gap-6">
              {[
                'Full system architecture',
                'Interaction cycles mapping',
                'Advanced regulation protocols',
                'Cloud-synchronized access'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-light text-white/40 italic">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="mb-10 p-6 rounded-3xl border border-red-500/20 bg-red-500/5">
              <p className="text-sm font-light text-red-400">{error}</p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-20 bg-white text-black font-bold tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-2xl group"
          >
            {isLoading ? (
              <>
                <span className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                SYNCHRONIZING...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                <span>AUTHORIZE DEPLOYMENT ($19)</span>
                <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>

          {/* Trust Matrix */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-10 opacity-20 hover:opacity-100 transition-opacity duration-700 pb-20">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
              <ShieldCheck size={14} className="text-orange-500" />
              ENCRYPTED
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
              <Lock size={14} className="text-orange-500" />
              PCI_LEVEL_1
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
              <Zap size={14} className="text-orange-500" />
              INSTANT_LOAD
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
