import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';

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

  // Animated pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(i => (i + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load saved unit data
    const savedA = localStorage.getItem('defrag_unitA');
    const savedB = localStorage.getItem('defrag_unitB');

    if (savedA && savedB) {
      setUnitA(JSON.parse(savedA));
      setUnitB(JSON.parse(savedB));
    } else {
      // No data, redirect to start
      navigate('/start');
    }
  }, [navigate]);

  const handleCheckout = async () => {
    if (!unitA || !unitB) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitA, unitB }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data.sessionId) {
        // Fallback to stripe.js redirect
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

  if (!unitA || !unitB) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/[0.08] rounded-full blur-[150px]" />
      </div>

      <Header />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto">

          {wasCancelled && (
            <div className="mb-8 p-4 border border-orange-500/30 bg-orange-500/10 rounded-xl text-center backdrop-blur">
              <p className="text-sm text-orange-300">Analysis preserved. Ready to initialize when you are.</p>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-6 bg-orange-500/50" />
              <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">ANALYSIS COMPLETE</span>
              <span className="h-px w-6 bg-orange-500/50" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-5">
              Mapping Behavioral Architecture
            </h1>
            <p className="text-lg text-white/50">
              The source code for this dynamic has been mapped. Unlock the full operating manual.
            </p>
          </div>

          {/* Units Summary Card */}
          <div className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-2xl shadow-black/50">
            <div className="text-xs tracking-[0.3em] text-white/40 uppercase mb-5">System Units</div>

            <div className="flex items-center justify-between gap-4">
              {/* Unit A */}
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-orange-500/25">
                  {unitA.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-white">{unitA.name}</div>
                  <div className="text-xs text-white/40">OPERATOR</div>
                </div>
              </div>

              {/* Connection visual */}
              <div className="flex items-center gap-1 px-4">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === pulseIndex ? 'bg-orange-500 scale-125' : 'bg-white/20'}`}
                  />
                ))}
              </div>

              {/* Unit B */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="text-right">
                  <div className="font-medium text-white">{unitB.name}</div>
                  <div className="text-xs text-white/40">SUBJECT</div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-white/80 font-bold text-lg border border-white/10">
                  {unitB.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-white/70">Complete Operating Manual</span>
              <span className="text-3xl font-light">$19</span>
            </div>
            <div className="h-px bg-white/10 my-4" />
            <ul className="space-y-2.5">
              {[
                'Full system architecture & default modes',
                'Relational interaction cycles mapping',
                'Advanced self-regulation protocols',
                'Instant secure cloud access',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="text-orange-500 text-xs mt-1 font-mono">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 rounded-xl">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-16 bg-white text-black text-sm tracking-[0.15em] font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-white/10 hover:shadow-orange-500/20"
          >
            {isLoading ? (
              <>
                <span className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                INITIALIZING...
              </>
            ) : (
              <>
                <span>UNLOCK FOR $19</span>
                <span className="text-black/40">-</span>
                <span>GET MANUAL</span>
              </>
            )}
          </button>

          <p className="mt-6 text-center text-sm text-white/40">
            Secure payment via Stripe
          </p>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-6 text-xs text-white/30 tracking-wide">
            <span className="flex items-center gap-2">
              <span className="font-mono">[SECURE]</span> SSL ENCRYPTED
            </span>
            <span className="text-white/10">·</span>
            <span>STRIPE SECURE</span>
            <span className="text-white/10">·</span>
            <span>INSTANT ACCESS</span>
          </div>
        </div>
      </main>
    </div>
  );
}
