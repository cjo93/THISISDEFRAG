
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackEvent, AnalyticsEvents, ConversionFunnel } from '../lib/analytics';
import { ShieldCheck, Lock, CreditCard, ArrowRight, Zap, Info, Terminal, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-mono italic">
      <Header />

      <main className="relative z-10 pt-56 pb-32 px-8">
        <div className="max-w-4xl mx-auto space-y-32">

          {wasCancelled && (
            <div className="p-12 rounded-[48px] border border-white/5 bg-white/[0.01] text-center animate-fade-in shadow-2xl">
              <p className="text-xl font-light text-white/30">Analysis preserved. The system remains ready for initialization.</p>
            </div>
          )}

          {/* Header */}
          <div className="text-center space-y-12 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full animate-fade-in shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
              Topology_Sync_Complete
            </div>
            <h1 className="text-5xl sm:text-7xl font-light tracking-tighter uppercase text-white leading-none">
              Authorization <span className="text-white/40 italic">Required.</span>
            </h1>
            <p className="text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed italic pr-4">
              Relational architecture mapped. Final disclosure requires secure authorization through our gateway.
            </p>
          </div>

          {/* Units Summary Card — Premium Monochrome Architecture */}
          <div className="p-16 rounded-[64px] border border-white/5 bg-zinc-950 relative overflow-hidden group shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">

              {/* Unit A */}
              <div className="flex flex-col items-center md:items-start gap-8 flex-1 text-center md:text-left">
                <div className="h-28 w-28 rounded-[40px] bg-white text-black flex items-center justify-center font-bold text-5xl shadow-2xl">
                  {unitA.name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-3">
                  <div className="font-light text-4xl text-white tracking-tighter uppercase">{unitA.name}</div>
                  <div className="text-[10px] tracking-[0.6em] text-white/20 uppercase italic">Node_Primary</div>
                </div>
              </div>

              {/* Interaction Bridge */}
              <div className="flex flex-col items-center gap-8 py-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-4">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${i === pulseIndex ? 'bg-white scale-125 shadow-[0_0_10px_white]' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
                <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Zap size={24} strokeWidth={1} className="text-white/40" />
              </div>

              {/* Unit B */}
              <div className="flex flex-col items-center md:items-end gap-8 flex-1 text-center md:text-right">
                <div className="h-28 w-28 rounded-[40px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/20 font-bold text-5xl group-hover:border-white/20 transition-all duration-700">
                  {unitB.name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-3">
                  <div className="font-light text-4xl text-white tracking-tighter uppercase">{unitB.name}</div>
                  <div className="text-[10px] tracking-[0.6em] text-white/20 uppercase italic">Node_Secondary</div>
                </div>
              </div>

            </div>

            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
          </div>

          {/* Pricing Grid — Clean & Structured */}
          <div className="p-16 rounded-[80px] border border-white/5 bg-white/[0.01] relative group hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-10 mb-16">
              <div className="space-y-4">
                <h3 className="text-4xl font-light text-white tracking-tighter uppercase italic">Full Operating Manual</h3>
                <p className="text-xl text-white/30 font-light italic pr-4">One-time protocol generation. Eternal node access.</p>
              </div>
              <div className="text-7xl font-light text-white tracking-tighter uppercase">$19</div>
            </div>

            <div className="h-px bg-white/5 mb-16" />

            <ul className="grid md:grid-cols-2 gap-10">
              {[
                'Full system architecture',
                'Interaction cycles mapping',
                'Advanced regulation protocols',
                'Cloud-synchronized access'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 text-lg font-light text-white/40 italic">
                  <div className="h-2 w-2 rounded-full border border-white/20 group-hover:bg-white transition-all duration-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="p-10 rounded-[40px] border border-red-500/10 bg-red-500/5 text-center animate-shake">
              <p className="text-lg font-light text-red-500/60 italic uppercase tracking-widest">{error}</p>
            </div>
          )}

          {/* CTA — Large Monochrome Initialize */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-24 bg-white text-black font-bold tracking-[0.5em] rounded-none hover:bg-slate-200 transition-all duration-700 disabled:bg-white/10 disabled:text-white/10 disabled:cursor-not-allowed flex items-center justify-center gap-6 shadow-2xl group uppercase text-[10px]"
          >
            {isLoading ? (
              <>
                <span className="h-6 w-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Validating_Node...
              </>
            ) : (
              <>
                <CreditCard size={22} strokeWidth={1} />
                <span>Initialize Full Disclosure ($19)</span>
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
              </>
            )}
          </button>

          {/* Trust Matrix — High Contrast Monochrome */}
          <div className="flex flex-wrap items-center justify-center gap-16 opacity-20 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-4 text-[10px] tracking-[0.6em] uppercase text-white italic">
              <ShieldCheck size={18} strokeWidth={1} className="text-white/40" />
              ENCRYPTED
            </div>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.6em] uppercase text-white italic">
              <Lock size={18} strokeWidth={1} className="text-white/40" />
              Stripe_Secure
            </div>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.6em] uppercase text-white italic">
              <Info size={18} strokeWidth={1} className="text-white/40" />
              Instant_Deploy
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 text-white/10 text-[9px] font-mono tracking-[0.6em] uppercase italic pt-12 pb-20">
            <div className="flex items-center gap-4">
              <Activity size={14} strokeWidth={1} />
              PCI_Compliance: Verified
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-4">
              <Terminal size={14} strokeWidth={1} />
              Node: Checkout_Active
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Background Detail */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
    </div>
  );
}
