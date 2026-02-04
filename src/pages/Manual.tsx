
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { generateManualPreview } from '../services/geminiService';
import { calculateMechanics } from '../services/defragEngine';
import { UnitData, ManualPreview } from '../types';
import ShareCard from '../components/ui/ShareCard';
import Header from '../components/Header';
import { trackEvent, AnalyticsEvents, ConversionFunnel } from '../lib/analytics';
import { Activity, Terminal, ShieldCheck, Zap, AlertCircle, Info, ArrowRight, Radio, Cpu, Share2 } from 'lucide-react';

const LOADING_PHASES = [
  { message: 'VERIFYING_ACCESS_PROTOCOL' },
  { message: 'SYNCHRONIZING_PLANETARY_EPHEMERIS' },
  { message: 'MAPPING_RELATIONAL_GEOMETRY' },
  { message: 'DECODING_BEHAVIORAL_TOPOLOGY' },
  { message: 'FINALIZING_SYSTEM_OPERATING_MANUAL' },
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
    { id: 'specs', label: 'INTERFACE_SPEC' },
    { id: 'procedures', label: 'DEPLOYMENT_LOGIC' },
    { id: 'troubleshooting', label: 'TENSILE_STRENGTH' },
    { id: 'maintenance', label: 'SYSTEM_HYGIENE' },
    { id: 'share', label: 'DISPATCH' },
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

        if (isNew || sessionId) {
          ConversionFunnel.step5_purchase(sessionId || 'manual_bypass', 19.00);
        } else {
          trackEvent(AnalyticsEvents.ANALYSIS_VIEW);
        }

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
            setError('Payment verification failure. Session unauthorized.');
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
          setError('Data corruption detected. Missing node parameters.');
          setLoading(false);
          return;
        }

        // Calculate mechanics
        setLoadingPhase(2);
<<<<<<< HEAD
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
=======
        const [mechanicsA, mechanicsB] = await Promise.all([
          calculateMechanics(
            birthA.name,
            birthA.birthDate,
            birthA.birthTime || '12:00',
            birthA.birthPlace || 'Unknown'
          ),
          calculateMechanics(
            birthB.name,
            birthB.birthDate,
            birthB.birthTime || '12:00',
            birthB.birthPlace || 'Unknown'
          )
        ]);
>>>>>>> origin/main

        setUnitA(mechanicsA);
        setUnitB(mechanicsB);

        setLoadingPhase(4);

        const cachedManual = localStorage.getItem('defrag_manual_preview');
        const cachedSignature = localStorage.getItem('defrag_manual_sig');
        const currentSignature = `${mechanicsA.name}-${mechanicsB.name}`;

        if (cachedManual && cachedSignature === currentSignature) {
          setManual(JSON.parse(cachedManual));
        } else {
          const result = await generateManualPreview(mechanicsA, mechanicsB);
          setManual(result);
          localStorage.setItem('defrag_manual_preview', JSON.stringify(result));
          localStorage.setItem('defrag_manual_sig', currentSignature);
        }
      } catch (err) {
        console.error('Error generating manual:', err);
        setError('Manual synthesis failure. Retry protocol.');
      } finally {
        setLoading(false);
      }
    };

    verifyAndGenerate();
  }, [searchParams, navigate]);

  if (loading) {
    const currentPhase = LOADING_PHASES[loadingPhase];
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-mono italic">
        {/* Background Detail */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="text-center relative z-10 w-full max-w-lg px-8 space-y-16">
          {/* Geometric Mandala Logo */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white/40 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] animate-[spin_40s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="48" strokeOpacity="0.1" />
              <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 25 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 25 * Math.sin((deg * Math.PI) / 180)}
                  r="25"
                  strokeOpacity="0.1"
                />
              ))}
              <path d="M50 5 L95 50 L50 95 L5 50 Z" strokeOpacity="0.2" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="space-y-8">
            <p className="text-xl text-white/40 tracking-[0.4em] uppercase font-light">
              {currentPhase.message}
            </p>
            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-white shadow-[0_0_15px_white] transition-all duration-1000 ease-linear"
                style={{ width: `${((loadingPhase + 1) / LOADING_PHASES.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-3 text-[9px] text-white/10 tracking-[0.5em] uppercase italic">
                <Activity size={12} strokeWidth={1} />
                Processing...
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-3 text-[9px] text-white/10 tracking-[0.5em] uppercase italic">
                <Cpu size={12} strokeWidth={1} />
                Node_Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono italic">
        <div className="text-center max-w-xl px-8 space-y-12">
          <div className="h-24 w-24 rounded-full bg-red-500/5 border border-red-500/10 flex items-center justify-center mx-auto shadow-2xl animate-shake">
            <AlertCircle size={40} strokeWidth={1} className="text-red-500" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-red-500 uppercase tracking-tighter">System_Fault</h2>
            <p className="text-white/30 text-lg leading-relaxed">{error}</p>
          </div>
          <button
            onClick={() => navigate('/start')}
            className="h-20 px-12 bg-white text-black font-bold text-[10px] tracking-[0.5em] rounded-full hover:bg-slate-200 transition-all duration-700 shadow-2xl uppercase"
          >
            Reset_Protocol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white/10 font-mono italic">
      <Header />

      {/* Main */}
      <main className="relative z-10 px-8 pt-56 pb-32">
        <div className="mx-auto max-w-6xl space-y-32">
          {/* Header */}
          <div className="text-center space-y-12 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
              Operating_Manual_Authorized
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter uppercase text-white leading-none">
              {unitA?.name} <span className="text-white/20 font-thin italic">/</span> {unitB?.name}
            </h1>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center flex-wrap gap-4 max-w-4xl mx-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`h-16 px-8 text-[10px] tracking-[0.4em] rounded-full transition-all duration-700 uppercase italic ${activeSection === section.id
                  ? 'bg-white text-black font-bold shadow-2xl'
                  : 'bg-white/[0.03] text-white/20 border border-white/5 hover:bg-white/[0.05] hover:text-white'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {manual && (
            <div className="animate-fade-in">
              {/* Specifications */}
              {activeSection === 'specs' && (
                <Section title="SPECIFICATION_STATIC" subtitle="Core architectural design and default operating modes.">
                  <div className="grid md:grid-cols-2 gap-16">
                    <UnitCard unit={unitA} isFirst />
                    <UnitCard unit={unitB} isFirst={false} />
                  </div>
                </Section>
              )}

              {/* Operating Procedures */}
              {activeSection === 'procedures' && (
                <Section title="DEPLOYMENT_DYNAMIC" subtitle="Strategic protocols for synchronization and relational stability.">
                  <div className="space-y-8 flex flex-col items-center">
                    {manual.operatingProcedures.map((proc, i) => (
                      <div key={i} className="w-full p-12 bg-white/[0.01] rounded-[48px] border border-white/5 hover:bg-white/[0.02] transition-all duration-700 group relative overflow-hidden">
                        <div className="flex items-start gap-10 relative z-10">
                          <div className="h-16 w-16 rounded-[24px] bg-white/5 border border-white/5 flex items-center justify-center text-white/10 text-xl font-bold italic shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="space-y-4 pr-12">
                            <div className="text-3xl font-light text-white uppercase italic tracking-tighter group-hover:text-white/70 transition-colors">{proc.title}</div>
                            <p className="text-white/30 text-xl leading-relaxed font-light pr-8">{proc.description}</p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Troubleshooting */}
              {activeSection === 'troubleshooting' && (
                <Section title="TENSILE_ANALYSIS" subtitle="Mechanical friction vectors and remedial alignment logic.">
                  <div className="grid md:grid-cols-2 gap-10">
                    {manual.troubleshooting.map((item, i) => (
                      <div key={i} className="p-12 bg-white/[0.01] rounded-[64px] border border-white/5 relative overflow-hidden group hover:bg-white/[0.02] transition-all duration-700">
                        <div className="space-y-10 relative z-10">
                          <div className="flex items-start gap-6 pb-10 border-b border-white/5">
                            <div className="h-10 w-10 rounded-full bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500 text-[10px] font-bold shrink-0 shadow-2xl">
                              !
                            </div>
                            <div className="space-y-4">
                              <div className="text-[10px] tracking-[0.4em] text-red-500/40 uppercase italic">Strain_Marker</div>
                              <p className="text-2xl text-white/80 font-light italic tracking-tight leading-snug">{item.symptom}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-6 pl-2">
                            <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shadow-2xl">
                              <ShieldCheck size={18} strokeWidth={1} />
                            </div>
                            <div className="space-y-4">
                              <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Remedial_Protocol</div>
                              <p className="text-white/40 text-lg leading-relaxed font-light italic">{item.resolution}</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/[0.01] rounded-full blur-[80px] pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Maintenance Schedule */}
              {activeSection === 'maintenance' && (
                <Section title="SYSTEM_HYGIENE" subtitle="Cyclical maintenance routines for optimized performance.">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {manual.maintenanceSchedule.map((item, i) => (
                      <div key={i} className="p-10 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group flex flex-col h-full shadow-xl">
                        <div className="mb-10">
                          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 text-[10px] tracking-[0.4em] text-white/40 font-mono italic rounded-full uppercase">
                            <Activity size={12} strokeWidth={1} />
                            {item.frequency}
                          </div>
                        </div>
                        <p className="text-xl text-white/30 italic group-hover:text-white/60 transition-colors leading-relaxed font-light mt-auto">
                          {item.task}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Share Card */}
              {activeSection === 'share' && unitA && (
                <Section title="DISPATCH_LOG" subtitle="Generate shared identification credentials.">
                  <div className="py-20 flex flex-col items-center space-y-20">
                    <ShareCard
                      name={unitA.name}
                      archetype={unitA.model || 'Generator'}
                      oneLiner={unitA.operatingMode || 'Operating correctly.'}
                    />
                    <button className="h-24 px-16 bg-white text-black font-bold text-[10px] tracking-[0.5em] rounded-full hover:bg-slate-200 transition-all duration-700 shadow-2xl uppercase flex items-center gap-6">
                      Copy_Access_Link
                      <Share2 size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </Section>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Background Detail */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[80px] border border-white/5 bg-white/[0.005] p-16 sm:p-24 shadow-2xl">
      <div className="mb-24 text-center space-y-8 flex flex-col items-center">
        <div className="text-[10px] tracking-[0.6em] text-white/20 uppercase font-mono italic underline decoration-white/5 underline-offset-8">{title}</div>
        <div className="text-3xl sm:text-5xl text-white/80 font-light tracking-tighter uppercase italic max-w-4xl">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function UnitCard({ unit, isFirst }: { unit: UnitData | null; isFirst: boolean }) {
  if (!unit) return null;
  return (
    <div className={`p-16 rounded-[64px] border transition-all duration-700 shadow-2xl relative overflow-hidden group ${isFirst ? 'bg-white/[0.01] border-white/10' : 'bg-white/[0.005] border-white/5'}`}>
      <div className="flex items-center gap-8 mb-16 relative z-10">
        <div className={`h-24 w-24 rounded-[32px] flex items-center justify-center font-bold text-4xl shadow-2xl transition-all duration-700 ${isFirst ? 'bg-white text-black' : 'bg-white/5 text-white/20 group-hover:bg-white/10'}`}>
          {unit.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-3xl font-light text-white mb-2 uppercase italic tracking-tighter">{unit.name}</div>
          <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase italic">Unit_{isFirst ? 'A_Primary' : 'B_Secondary'}</div>
        </div>
      </div>
      <div className="space-y-8 relative z-10">
        <SpecRow label="ARCHETYPE" value={unit.model} />
        <SpecRow label="CORE_PROCESSOR" value={unit.coreProcessor} />
        <SpecRow label="OPERATING_MODE" value={unit.operatingMode} />
        <SpecRow label="ENERGY_DYNAMICS" value={unit.energyType} />
      </div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-3 py-6 border-b border-white/5 last:border-0 hover:translate-x-2 transition-transform duration-500">
      <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase italic">{label}</span>
      <span className="text-white text-xl font-light italic tracking-tight">{value}</span>
    </div>
  );
}
