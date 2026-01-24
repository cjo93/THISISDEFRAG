
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { generateManualPreview } from '../services/geminiService';
import { calculateMechanics } from '../services/defragEngine';
import { UnitData, ManualPreview } from '../types';
import ShareCard from '../components/ui/ShareCard';
import Header from '../components/Header';
import { trackEvent, AnalyticsEvents, ConversionFunnel } from '../lib/analytics';

const LOADING_PHASES = [
  { message: 'Verifying access...' },
  { message: 'Fetching planetary ephemeris...' },
  { message: 'Charting relational dynamics...' },
  { message: 'Mapping behavioral patterns...' },
  { message: 'Creating your guide...' },
];

export default function Manual() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [manual, setManual] = useState<ManualPreview | null>(null);
  const [unitA, setUnitA] = useState<UnitData | null>(null);
  const [unitB, setUnitB] = useState<UnitData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('specs');

  const sections = [
    { id: 'specs', label: 'ABOUT THEM' },
    { id: 'procedures', label: 'HOW TO CONNECT' },
    { id: 'troubleshooting', label: 'WHEN THINGS GO SIDEWAYS' },
    { id: 'maintenance', label: 'STAYING HEALTHY' },
    { id: 'share', label: 'SHARE' },
  ];

  // Animate through loading phases
  useEffect(() => {
    if (loading && loadingPhase < LOADING_PHASES.length - 1) {
      const timer = setTimeout(() => setLoadingPhase(p => p + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingPhase]);

  useEffect(() => {
    const verifyAndGenerate = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        const isNew = searchParams.get('new') === 'true';

        // Track purchase if this is a new manual from checkout
        if (isNew || sessionId) {
          ConversionFunnel.step5_purchase(sessionId || 'manual_bypass', 19.00);
        } else {
          // It's a view of an existing manual
          trackEvent(AnalyticsEvents.ANALYSIS_VIEW);
        }

        // Check for owner bypass or stored payment
        const ownerBypass = localStorage.getItem('defrag_owner_bypass');
        const storedPayment = localStorage.getItem('defrag_payment_verified');

        if (!sessionId && !storedPayment && !ownerBypass) {
          const storedA = localStorage.getItem('defrag_unitA');
          const storedB = localStorage.getItem('defrag_unitB');

          if (storedA && storedB) {
            navigate('/checkout');
          } else {
            navigate('/start');
          }
          return;
        }

        let birthA, birthB;

        if (sessionId) {
          setLoadingPhase(0);
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyData.paid) {
            setError('Payment not completed. Please try again.');
            setLoading(false);
            return;
          }

          birthA = verifyData.unitA || JSON.parse(localStorage.getItem('defrag_unitA') || '{}');
          birthB = verifyData.unitB || JSON.parse(localStorage.getItem('defrag_unitB') || '{}');

          localStorage.setItem('defrag_payment_verified', 'true');
          localStorage.setItem('defrag_session_id', sessionId);
        } else {
          birthA = JSON.parse(localStorage.getItem('defrag_unitA') || '{}');
          birthB = JSON.parse(localStorage.getItem('defrag_unitB') || '{}');
        }

        if (!birthA?.name || !birthB?.name) {
          setError('Missing birth data. Please start over.');
          setLoading(false);
          return;
        }

        // Calculate mechanics
        setLoadingPhase(2);
        const mechanicsA = await calculateMechanics(
          birthA.name,
          birthA.birthDate,
          birthA.birthTime || '12:00',
          birthA.birthPlace || 'Unknown'
        );

        const mechanicsB = await calculateMechanics(
          birthB.name,
          birthB.birthDate,
          birthB.birthTime || '12:00',
          birthB.birthPlace || 'Unknown'
        );

        setUnitA(mechanicsA);
        setUnitB(mechanicsB);

        // Generate manual
        // Generate manual (or load from cache)
        setLoadingPhase(4);

        const cachedManual = localStorage.getItem('defrag_manual_preview');
        // Simple invalidation strategy: if unit names match (basic check)
        const cachedSignature = localStorage.getItem('defrag_manual_sig');
        const currentSignature = `${mechanicsA.name}-${mechanicsB.name}`;

        if (cachedManual && cachedSignature === currentSignature) {
          console.log('Loading cached manual...');
          setManual(JSON.parse(cachedManual));
        } else {
          console.log('Generating new manual...');
          const result = await generateManualPreview(mechanicsA, mechanicsB);
          setManual(result);
          localStorage.setItem('defrag_manual_preview', JSON.stringify(result));
          localStorage.setItem('defrag_manual_sig', currentSignature);
        }
      } catch (err) {
        console.error('Error generating manual:', err);
        setError('Failed to generate manual. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyAndGenerate();
  }, [searchParams, navigate]);

  if (loading) {
    const currentPhase = LOADING_PHASES[loadingPhase];
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-2xl bg-orange-500/[0.02] rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="text-center relative z-10 w-full max-w-sm px-6">
          {/* Geometric Mandala Logo */}
          <div className="relative w-32 h-32 mx-auto mb-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.8">
              <circle cx="50" cy="50" r="45" strokeOpacity="0.1" />
              <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 22.5 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 22.5 * Math.sin((deg * Math.PI) / 180)}
                  r="22.5"
                  strokeOpacity="0.4"
                />
              ))}
              <path d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z" strokeOpacity="0.6" strokeWidth="1" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              DEFRAG
            </div>
          </div>

          <p className="text-base text-white/70 tracking-[0.15em] mb-2">
            {currentPhase.message.toUpperCase()}
          </p>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${((loadingPhase + 1) / LOADING_PHASES.length) * 100}%` }}
            />
          </div>

          <p className="mt-4 text-xs text-white/30">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-6 text-red-500 font-mono">ERR</div>
          <p className="text-lg text-red-400 mb-6">{error}</p>
          <Link
            to="/start"
            className="inline-flex items-center justify-center h-12 px-8 border border-orange-500/50 text-orange-400 text-sm tracking-[0.15em] rounded-lg hover:bg-orange-500/10 transition"
          >
            START OVER
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[150px]" />
      </div>

      {/* Top bar */}
      <Header />

      {/* Main */}
      <main className="relative z-10 px-6 pt-8 pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-orange-500/50" />
              <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">YOUR MANUAL</span>
              <span className="h-px w-8 bg-orange-500/50" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
              {unitA?.name} <span className="text-white/20">&</span> {unitB?.name}
            </h1>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-5 py-2.5 text-xs tracking-[0.15em] rounded-lg transition-all ${activeSection === section.id
                  ? 'bg-orange-500 text-black font-semibold'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {manual && (
            <div className="space-y-8">
              {/* Specifications */}
              {activeSection === 'specs' && (
                <Section title="WHO THEY ARE" subtitle="Core personality and how they tend to show up">
                  <div className="grid md:grid-cols-2 gap-6">
                    <UnitCard unit={unitA} isFirst />
                    <UnitCard unit={unitB} isFirst={false} />
                  </div>
                </Section>
              )}

              {/* Operating Procedures */}
              {activeSection === 'procedures' && (
                <Section title="HOW TO CONNECT" subtitle="Practical ways to stay grounded with each other">
                  <div className="space-y-4">
                    {manual.operatingProcedures.map((proc, i) => (
                      <div key={i} className="p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-orange-500/20 transition group">
                        <div className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 text-sm font-mono shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white mb-2 group-hover:text-orange-400 transition">{proc.title}</div>
                            <p className="text-sm text-white/60 leading-relaxed">{proc.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Troubleshooting */}
              {activeSection === 'troubleshooting' && (
                <Section title="WHEN THINGS GET TENSE" subtitle="Common patterns and what helps">
                  <div className="space-y-4">
                    {manual.troubleshooting.map((item, i) => (
                      <div key={i} className="p-5 bg-white/[0.03] rounded-xl border border-white/5 overflow-hidden">
                        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-white/5">
                          <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 text-[10px] font-bold shrink-0">
                            issue
                          </div>
                          <div>
                            <div className="text-xs tracking-[0.15em] text-red-400/80 mb-1">WHAT HAPPENS</div>
                            <p className="text-sm text-white/80">{item.symptom}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 pl-12">
                          <div>
                            <div className="text-xs tracking-[0.15em] text-green-400/80 mb-1">WHAT HELPS</div>
                            <p className="text-sm text-white/60 leading-relaxed">{item.resolution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Maintenance Schedule */}
              {activeSection === 'maintenance' && (
                <Section title="KEEPING THINGS HEALTHY" subtitle="Simple practices to stay connected and reduce stress">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {manual.maintenanceSchedule.map((item, i) => (
                      <div key={i} className="p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-orange-500/20 transition group">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-xs tracking-[0.15em] text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded">
                            {item.frequency}
                          </div>
                        </div>
                        <p className="text-sm text-white/70 group-hover:text-white/90 transition">{item.task}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Share Card */}
              {activeSection === 'share' && unitA && (
                <Section title="SHARE YOUR RESULTS" subtitle="Post a summary card to social media">
                  <div className="py-8">
                    <ShareCard
                      name={unitA.name}
                      archetype={unitA.model || 'Generator'}
                      oneLiner={unitA.operatingMode || 'Operating correctly.'}
                    />
                  </div>
                </Section>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-sm tracking-[0.25em] text-white/40 mb-1">{title}</div>
        <div className="text-sm text-white/60">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function UnitCard({ unit, isFirst }: { unit: UnitData | null; isFirst: boolean }) {
  if (!unit) return null;
  return (
    <div className={`p-5 rounded-xl border ${isFirst ? 'bg-orange-500/[0.03] border-orange-500/20' : 'bg-white/[0.02] border-white/10'}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-lg ${isFirst ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/80'}`}>
          {unit.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-white">{unit.name}</div>
          <div className="text-xs text-white/40">Unit {isFirst ? 'A' : 'B'}</div>
        </div>
      </div>
      <div className="space-y-3">
        <SpecRow label="Archetype" value={unit.model} highlight />
        <SpecRow label="Processing Style" value={unit.coreProcessor} />
        <SpecRow label="Default Mode" value={unit.operatingMode} />
        <SpecRow label="Energy Style" value={unit.energyType} />
      </div>
    </div>
  );
}

function SpecRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-white/5 last:border-0">
      <span className="text-white/50">{label}</span>
      <span className={highlight ? 'text-orange-400 font-medium' : 'text-white/80'}>{value}</span>
    </div>
  );
}
