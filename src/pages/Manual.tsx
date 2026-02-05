import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { generateManualPreview } from '../services/geminiService';
import { calculateMechanics } from '../services/defragEngine';
import { UnitData, ManualPreview } from '../types';
import ShareCard from '../components/ui/ShareCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { trackEvent, AnalyticsEvents, ConversionFunnel } from '../lib/analytics';
import { Activity, Terminal, ShieldCheck, Zap, AlertCircle, Info, ArrowRight, Radio, Cpu, Share2, Loader2 } from 'lucide-react';

export default function Manual() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Accessing planetary archive...');
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

  // The "Processing" Simulation
  useEffect(() => {
    // Only run this sequence if we are in the initial loading state
    if (loading) {
      const timer1 = setTimeout(() => setLoadingText('Mapping stress triggers...'), 1500);
      const timer2 = setTimeout(() => setLoadingText('Generating manual...'), 3000);
      // Actual data fetching will eventually set loading(false), but let's ensure minimum dwell time
    }

    return () => {
        // Cleanup timers if component unmounts
    };
  }, [loading]);


  useEffect(() => {
    const verifyAndGenerate = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        let calcA: UnitData;
        let calcB: UnitData | null = null;

        // Wait for minimum animation time (4.5s total to match the sequence roughly)
        // We'll use a promise race or just simple logic to ensure we don't flash content too early
        const minWait = new Promise(resolve => setTimeout(resolve, 4500));

        if (sessionId) {
          // Verify Checkout Session logic (omitted for brevity, assume success/mock)
          // For now, load from localStorage fallback if session logic isn't fully mocked
           const storedA = localStorage.getItem('defrag_unitA');
           if (storedA) {
               calcA = JSON.parse(storedA);
           } else {
             throw new Error("No data found");
           }
        } else {
            // Check Local Storage (Flow from Start.tsx)
            const storedA = localStorage.getItem('defrag_unitA');
            const storedB = localStorage.getItem('defrag_unitB');

            if (!storedA) {
                // Redirect if no data
                navigate('/');
                return;
            }

            // Recalculate or use stored data
            const inputA = JSON.parse(storedA);
            calcA = calculateMechanics(inputA.name, inputA.birthDate, inputA.birthTime, inputA.birthPlace);

            if (storedB) {
                const inputB = JSON.parse(storedB);
                calcB = calculateMechanics(inputB.name, inputB.birthDate, inputB.birthTime, inputB.birthPlace);
            }
        }

        setUnitA(calcA);
        setUnitB(calcB);

        // Generate Manual Content
        const generatedManual = await generateManualPreview(calcA, calcB);

        await minWait; // Ensure we showed the cool animation

        setManual(generatedManual);
        setLoading(false);

      } catch (err) {
        console.error('Manual Generation Error:', err);
        setError('System generation failed. Please contact support.');
        setLoading(false);
      }
    };

    verifyAndGenerate();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
        {/* The Blinking Cursor Effect on Loading Text */}
        <p className="font-mono text-sm text-emerald-500 cursor-blink uppercase tracking-widest">
          {loadingText}
        </p>

        {/* Simple Progress Bar */}
        <div className="w-48 h-0.5 bg-gray-900 mt-6 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-[scan_2s_infinite]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="max-w-md text-center space-y-4">
            <AlertCircle className="w-12 h-12 mx-auto text-[#64748B]" />
            <h1 className="text-xl font-serif">Critical Failure</h1>
            <p className="text-white/50">{error}</p>
            <Link to="/" className="inline-block border-b border-white pb-1">Return to Platform</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#64748B] selection:text-white">
      <Header />

      <main className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
            {/* Header / Title */}
            <div className="text-center mb-20 space-y-4">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#64748B]">System_Output_Log</div>
                <h1 className="text-4xl md:text-5xl font-serif text-white italic">
                    Operational Manual
                </h1>
                <p className="text-white/40 font-light max-w-xl mx-auto">
                    Analysis complete. Authorized documentation for {unitA?.name}.
                </p>
            </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-white/5 pb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 text-xs tracking-[0.2em] transition-all duration-300 uppercase ${
                    activeSection === section.id
                  ? 'bg-white text-[#0F172A] font-bold'
                  : 'text-white/40 hover:text-white border border-transparent hover:border-white/10'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {manual && (
            <div className="animate-fade-in space-y-24">
              {/* Specifications */}
              {activeSection === 'specs' && (
                <Section title="Interface Specification" subtitle="Core architectural design and default operating modes.">
                  <div className="grid md:grid-cols-2 gap-8">
                    <UnitCard unit={unitA} isFirst />
                    {unitB && <UnitCard unit={unitB} isFirst={false} />}
                  </div>
                </Section>
              )}

              {/* Operating Procedures */}
              {activeSection === 'procedures' && (
                <Section title="Deployment Dynamic" subtitle="Strategic protocols for synchronization and relational stability.">
                  <div className="space-y-8">
                    {manual.operatingProcedures.map((proc, i) => (
                      <div key={i} className="group border-l border-white/10 pl-8 hover:border-white transition-colors duration-500 py-2">
                          <div className="flex items-baseline gap-4 mb-2">
                             <span className="text-xs font-mono text-[#64748B]">0{i + 1}</span>
                             <h3 className="text-2xl font-serif text-white italic">{proc.title}</h3>
                          </div>
                          <p className="text-white/60 font-light leading-relaxed max-w-3xl">
                              {proc.description}
                          </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Troubleshooting */}
              {activeSection === 'troubleshooting' && (
                <Section title="Tensile Analysis" subtitle="Mechanical friction vectors and remedial alignment logic.">
                  <div className="grid gap-12">
                    {manual.troubleshooting.map((item, i) => (
                      <div key={i} className="bg-white/[0.02] p-8 border border-white/5">
                        <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <div className="text-[10px] tracking-widest text-[#64748B] mb-3 uppercase">Strain_Marker</div>
                                <p className="text-xl font-serif text-white italic leading-snug">
                                    "{item.symptom}"
                                </p>
                             </div>
                             <div>
                                <div className="text-[10px] tracking-widest text-[#64748B] mb-3 uppercase">Remedial_Protocol</div>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {item.resolution}
                                </p>
                             </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Maintenance Schedule */}
              {activeSection === 'maintenance' && (
                <Section title="System Hygiene" subtitle="Cyclical maintenance routines for optimized performance.">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {manual.maintenanceSchedule.map((item, i) => (
                      <div key={i} className="p-8 border border-white/5 hover:bg-white/[0.02] transition-colors flex flex-col h-full">
                        <div className="mb-6 flex items-center gap-2 text-[#64748B]">
                            <Activity size={14} />
                            <span className="text-[10px] tracking-widest uppercase">{item.frequency}</span>
                        </div>
                        <p className="text-lg text-white/70 font-serif italic mt-auto">
                          {item.task}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Share Card */}
              {activeSection === 'share' && unitA && (
                <Section title="Dispatch Log" subtitle="Generate shared identification credentials.">
                  <div className="py-12 flex flex-col items-center space-y-12">
                    <ShareCard
                      name={unitA.name}
                      archetype={unitA.model || 'Generator'}
                      oneLiner={unitA.operatingMode || 'Operating correctly.'}
                    />
                    <button className="h-14 px-10 bg-white text-[#0F172A] font-bold text-xs tracking-[0.2em] hover:bg-[#E2E8F0] transition-colors uppercase flex items-center gap-4">
                      Copy Access Link
                      <Share2 size={16} />
                    </button>
                  </div>
                </Section>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="border-b border-white/10 pb-8">
        <h2 className="text-3xl font-serif text-white italic mb-2">{title}</h2>
        <p className="text-white/40 font-light">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function UnitCard({ unit, isFirst }: { unit: UnitData | null; isFirst: boolean }) {
  if (!unit) return null;
  return (
    <div className="p-8 border border-white/10 bg-[#0F172A]">
      <div className="flex items-center gap-6 mb-8">
        <div className={`w-16 h-16 flex items-center justify-center font-serif text-2xl italic border ${isFirst ? 'bg-white text-[#0F172A] border-white' : 'bg-transparent text-white border-white/20'}`}>
          {unit.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-2xl font-serif text-white italic">{unit.name}</div>
          <div className="text-[10px] tracking-[0.2em] text-[#64748B] uppercase">Unit_{isFirst ? 'A' : 'B'}</div>
        </div>
      </div>
      <div className="space-y-6">
        <SpecRow label="ARCHETYPE" value={unit.model} />
        <SpecRow label="PROCESSOR" value={unit.coreProcessor} />
        <SpecRow label="MODE" value={unit.operatingMode} />
        <SpecRow label="FUEL" value={unit.energyType} />
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-3 last:border-0">
      <span className="text-[10px] tracking-widest text-[#64748B] uppercase col-span-1">{label}</span>
      <span className="text-sm text-white font-mono col-span-2">{value}</span>
    </div>
  );
}
