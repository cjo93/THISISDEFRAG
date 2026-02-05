
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight, User, Users, Cpu, ShieldCheck, Microscope, Database, Network, Terminal } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'System Ingestion',
      desc: 'Birth date, time, and precise coordinates for you (and optionally a partner).',
      Icon: Database
    },
    {
      num: '02',
      title: 'Neural Analysis',
      desc: 'Real planetary telemetry from NASA JPL reveals how you each operate and where friction happens.',
      Icon: Cpu
    },
    {
      num: '03',
      title: 'Unit Deployment',
      desc: 'A practical, technical guide to understanding the dynamic: triggers, requirements, and stability protocols.',
      Icon: ShieldCheck
    },
  ];

  const systems = [
    { name: 'NASA JPL Ephemeris', desc: 'Precise planetary telemetry', Icon: Microscope },
    { name: 'Attachment Theory', desc: 'Bonding & disconnection logic', Icon: Network },
    { name: 'Bowen Systems', desc: 'Intergenerational geometry', Icon: Network },
    { name: 'Relational Design', desc: 'Energetic & decision protocols', Icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden">
      <Header />

      {/* HERO — Monochrome Spacing */}
      <section className="pt-56 pb-40 px-8 bg-black relative">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-16 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
            System_Architecture
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter leading-[0.9] mb-16 text-white uppercase italic">
            Me Before <span className="text-white/40">We.</span>
          </h1>

          <p className="text-xl sm:text-3xl text-white/30 max-w-4xl mx-auto leading-relaxed font-light mb-24 italic pr-4">
            You cannot optimize a connection without first understanding your own source code. DEFRAG provides the individual and relational blueprints.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-20 w-full flex items-center justify-center bg-white text-black text-[10px] font-bold tracking-[0.4em] hover:bg-slate-200 transition-all duration-700 rounded-none uppercase shadow-2xl">
              Initialize_Analysis
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* PATHWAYS — Grid Polish */}
      <section className="py-40 px-8 bg-zinc-950 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Pathway 1: Individual */}
            <div className="relative p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group overflow-hidden">
              <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase mb-10 font-mono italic">Protocol_01: Individual</div>
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 mb-10 group-hover:bg-white group-hover:text-black transition-all duration-700">
                <User size={28} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-light text-white mb-8 tracking-tight uppercase">Decode Yourself</h3>
              <p className="text-white/30 text-lg leading-relaxed font-light mb-12 italic">
                Enter your birth telemetry to generate a "Primary User Manual." Understand your mechanical triggers, decision hardware, and automatic regulation scripts.
              </p>
              <ul className="space-y-6">
                {['Core emotional requirements', 'Automatic defense cycles', 'Optimal decision strategy'].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-white/40 font-light italic text-base">
                    <span className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white transition-all duration-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
            </div>

            {/* Pathway 2: Relational */}
            <div className="relative p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group overflow-hidden">
              <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase mb-10 font-mono italic">Protocol_02: Relational</div>
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 mb-10 group-hover:bg-white group-hover:text-black transition-all duration-700">
                <Users size={28} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-light text-white mb-8 tracking-tight uppercase">Decode The Dynamic</h3>
              <p className="text-white/30 text-lg leading-relaxed font-light mb-12 italic">
                Add a second node—partner, colleague, or system subject—to generate a "Conflict Protocol." Identify exactly where your architectures clash.
              </p>
              <ul className="space-y-6">
                {['5 invisible layers of friction', 'Deterministic resolution scripts', 'Co-triggering mechanics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-white/40 font-light italic text-base">
                    <span className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white transition-all duration-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS — Step Refine */}
      <section className="py-48 px-8 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="text-center mb-32 flex flex-col items-center space-y-8">
            <h2 className="text-4xl sm:text-6xl font-light mb-6 tracking-tighter text-white uppercase italic">Deployment Sequence</h2>
            <div className="h-px w-32 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
          </div>

          <div className="space-y-24 w-full">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-12 sm:gap-20 group">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[39px] sm:left-[47px] top-28 bottom-[-60px] w-px bg-white/5 hidden xs:block" />
                )}

                <div className="shrink-0 relative z-10">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-[32px] bg-white/[0.01] border border-white/10 flex items-center justify-center text-white/20 font-mono font-bold text-2xl group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-700 shadow-2xl">
                    {step.num}
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <h3 className="text-3xl font-light text-white mb-6 tracking-tight uppercase group-hover:text-white/60 transition-colors">{step.title}</h3>
                  <p className="text-xl text-white/30 leading-relaxed font-light italic pr-12">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patterns — Tech Stack */}
      <section className="py-48 px-8 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-light text-white tracking-tighter uppercase italic leading-none">Telemetry Systems</h2>
              <p className="text-2xl text-white/30 leading-relaxed font-light mb-16 italic pr-12">
                DEFRAG draws from established frameworks not as belief systems,
                but as pattern-recognition tools refined over millennia and validated by sub-arcsecond astronomical precision.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {systems.map((system, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-700 group">
                    <div className="text-white/10 mb-6 group-hover:text-white transition-colors">
                      <Terminal size={18} strokeWidth={1} />
                    </div>
                    <div className="font-bold text-white text-base mb-2 uppercase tracking-tight">{system.name}</div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-light">{system.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[64px] shadow-[0_0_100px_rgba(255,255,255,0.02)] overflow-hidden">
              <div className="bg-black rounded-[62px] p-16 aspect-[4/3] flex flex-col justify-center relative">
                <div className="space-y-10 opacity-20">
                  <div className="h-1.5 w-2/3 bg-white mb-6" />
                  <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                  <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                  <div className="h-10 w-1/2 bg-white/5 rounded-xl border border-white/5" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-16 left-16 right-16 text-center space-y-4">
                  <div className="h-px w-12 bg-white/20 mx-auto" />
                  <p className="text-[10px] font-mono tracking-[0.6em] text-white/30 uppercase italic">Axiomatic_Protocol_Reveal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCLUSION — Unified CTA */}
      <section className="py-56 px-8 bg-black">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center space-y-16">
          <h2 className="text-5xl sm:text-8xl font-light text-white tracking-tighter uppercase italic leading-none">
            Deploy your <span className="text-white/40">manual.</span>
          </h2>
          <p className="text-2xl sm:text-3xl text-white/30 leading-relaxed font-light max-w-3xl italic">
            Patterns, not predictions. Use the architectural data to stabilize your environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-24 w-full flex items-center justify-center bg-white text-black text-xs tracking-[0.4em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-none uppercase shadow-2xl">
              Initialize_Engine
              <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
