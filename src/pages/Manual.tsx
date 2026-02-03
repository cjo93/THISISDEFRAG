
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
          <div className="w-full h-full max-w-2xl bg-orange-500/[0.05] rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="text-center relative z-10 w-full max-w-sm px-6">
          {/* Geometric Mandala Logo */}
          <div className="relative w-32 h-32 mx-auto mb-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.8">
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

          <p className="text-base text-white/70 tracking-[0.2em] mb-4 font-light">
            {currentPhase.message.toUpperCase()}
          </p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${((loadingPhase + 1) / LOADING_PHASES.length) * 100}%` }}
            />
          </div>

          <p className="mt-6 text-[10px] tracking-wider text-white/30 uppercase">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-6 text-red-500 font-mono">ERR</div>
          <p className="text-lg text-red-400 mb-8 font-light">{error}</p>
          <Link
            to="/start"
            className="inline-flex items-center justify-center h-14 px-10 border border-white/20 text-white text-xs tracking-[0.2em] rounded-full hover:bg-white/10 transition uppercase"
          >
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-orange-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-500/[0.05] rounded-full blur-[150px]" />
      </div>

      {/* Top bar */}
      <Header />

      {/* Main */}
      <main className="relative z-10 px-6 pt-32 pb-32">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-white/10" />
              <span className="text-[10px] tracking-[0.4em] text-orange-400 font-mono uppercase bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">YOUR MANUAL</span>
              <span className="h-px w-12 bg-white/10" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-2">
              {unitA?.name} <span className="text-white/20 font-thin">&</span> {unitB?.name}
            </h1>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center flex-wrap gap-2 mb-16">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 text-[10px] sm:text-xs tracking-[0.15em] rounded-full transition-all uppercase ${activeSection === section.id
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {manual && (
            <div className="space-y-12 animate-fade-in">
              {/* Specifications */}
              {activeSection === 'specs' && (
                <Section title="Who They Are" subtitle="Core personality and how they tend to show up">
                  <div className="grid md:grid-cols-2 gap-8">
                    <UnitCard unit={unitA} isFirst />
                    <UnitCard unit={unitB} isFirst={false} />
                  </div>
                </Section>
              )}

              {/* Operating Procedures */}
              {activeSection === 'procedures' && (
                <Section title="How to Connect" subtitle="Practical ways to stay grounded with each other">
                  <div className="space-y-6">
                    {manual.operatingProcedures.map((proc, i) => (
                      <div key={i} className="p-8 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition group">
                        <div className="flex items-start gap-6">
                          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-sm font-mono shrink-0 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="text-lg font-light text-white mb-3 group-hover:text-orange-100 transition">{proc.title}</div>
                            <p className="text-white/60 leading-loose font-light">{proc.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Troubleshooting */}
              {activeSection === 'troubleshooting' && (
                <Section title="When Things Get Tense" subtitle="Common patterns and what helps">
                  <div className="space-y-6">
                    {manual.troubleshooting.map((item, i) => (
                      <div key={i} className="p-8 bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="flex items-start gap-5 mb-6 pb-6 border-b border-white/5">
                          <div className="h-6 w-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-[10px] font-bold shrink-0 mt-1">
                            !
                          </div>
                          <div>
                            <div className="text-[10px] tracking-[0.2em] text-red-400/60 mb-2 uppercase">The Trigger</div>
                            <p className="text-lg text-white/90 font-light">{item.symptom}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-5 pl-11">
                          <div>
                            <div className="text-[10px] tracking-[0.2em] text-green-400/60 mb-2 uppercase">The Fix</div>
                            <p className="text-white/60 leading-loose font-light">{item.resolution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Maintenance Schedule */}
              {activeSection === 'maintenance' && (
                <Section title="Keeping Things Healthy" subtitle="Simple practices to stay connected and reduce stress">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {manual.maintenanceSchedule.map((item, i) => (
                      <div key={i} className="p-8 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-green-500/20 transition group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-[10px] tracking-widest text-green-400/80 font-mono bg-green-500/10 px-2 py-1 rounded uppercase">
                            {item.frequency}
                          </div>
                        </div>
                        <p className="text-white/70 group-hover:text-white/90 transition leading-relaxed font-light">{item.task}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Share Card */}
              {activeSection === 'share' && unitA && (
                <Section title="Share Your Results" subtitle="Post a summary card to social media">
                  <div className="py-10">
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
    <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent p-8 sm:p-12">
      <div className="mb-12 text-center sm:text-left">
        <div className="text-[10px] tracking-[0.3em] text-orange-500/50 mb-3 uppercase font-mono">{title}</div>
        <div className="text-2xl text-white/80 font-light">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function UnitCard({ unit, isFirst }: { unit: UnitData | null; isFirst: boolean }) {
  if (!unit) return null;
  return (
    <div className={`p-8 rounded-3xl border transition-all duration-300 ${isFirst ? 'bg-orange-500/[0.03] border-orange-500/20' : 'bg-white/[0.02] border-white/10'}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-2xl ${isFirst ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-white/10 text-white/50'}`}>
          {unit.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-xl font-light text-white mb-1">{unit.name}</div>
          <div className="text-[10px] tracking-widest text-white/30 uppercase">Unit {isFirst ? 'A' : 'B'}</div>
        </div>
      </div>
      <div className="space-y-6">
        <SpecRow label="Archetype" value={unit.model} highlight={isFirst} />
        <SpecRow label="Processing Style" value={unit.coreProcessor} highlight={isFirst} />
        <SpecRow label="Default Mode" value={unit.operatingMode} highlight={isFirst} />
        <SpecRow label="Energy Style" value={unit.energyType} highlight={isFirst} />
      </div>
    </div>
  );
}

function SpecRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/5 last:border-0 gap-1">
      <span className="text-white/40 text-xs tracking-wide">{label}</span>
      <span className={`${highlight ? 'text-white font-medium' : 'text-white/70'} text-sm`}>{value}</span>
    </div>
  );
}
