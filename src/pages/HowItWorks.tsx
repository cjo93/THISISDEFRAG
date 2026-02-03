
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, User, Users, Cpu, ShieldCheck, Microscope, Database } from 'lucide-react';

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
      Icon: CPU
    },
    {
      num: '03',
      title: 'Unit Deployment',
      desc: 'A practical, technical guide to understanding them: triggers, requirements, and stability protocols.',
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
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
      <Header />

      {/* HERO — Standardized Premium */}
      <section className="pt-40 pb-32 px-6 border-b border-white/5 bg-black relative">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            SYSTEM ARCHITECTURE
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
            Me before <span className="text-orange-500">We.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-16 antialiased">
            You can't debug a connection if you don't know your own source code.
            DEFRAG works for individuals just as well as pairs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-16 w-full flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]">
              Start Analysis
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* DUAL PATHWAYS — Grid Polish */}
      <section className="py-32 px-6 bg-zinc-950 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Pathway 1: Self Discovery */}
            <div className="relative p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group overflow-hidden">
              <div className="text-[10px] tracking-[0.3em] text-orange-500 uppercase mb-8 font-mono">CODE 01: INDIVIDUAL</div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-8 transition-transform group-hover:scale-110">
                <User size={24} />
              </div>
              <h3 className="text-3xl font-light text-white mb-6 tracking-tight">Decode Yourself</h3>
              <p className="text-white/50 text-lg leading-loose font-light mb-8">
                Enter your birth telemetry to get a "User Manual for YOU."
                Understand your triggers, your decision hardware, and automatic scripts.
              </p>
              <ul className="space-y-4">
                {['Core emotional needs', 'Automatic defense scripts', 'Optimal decision strategy'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40 font-light italic">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Subtle background glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/[0.02] rounded-full blur-3xl group-hover:bg-orange-500/[0.05] transition-colors" />
            </div>

            {/* Pathway 2: Relationship */}
            <div className="relative p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group overflow-hidden">
              <div className="text-[10px] tracking-[0.3em] text-orange-500 uppercase mb-8 font-mono">CODE 02: RELATIONAL</div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-8 transition-transform group-hover:scale-110">
                <Users size={24} />
              </div>
              <h3 className="text-3xl font-light text-white mb-6 tracking-tight">Decode the Dynamic</h3>
              <p className="text-white/50 text-lg leading-loose font-light mb-8">
                Add a second node—partner, colleague, parent—to generate a "Conflict Protocol."
                See exactly where your systems clash and how to bridge.
              </p>
              <ul className="space-y-4">
                {['5 invisible layers of friction', 'Specific resolution scripts', 'Co-triggering mechanics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40 font-light italic">
                    <span className="w-1 h-1 rounded-full bg-orange-500/40" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Subtle background glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/[0.02] rounded-full blur-3xl group-hover:bg-orange-500/[0.05] transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS — Step Refine */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-24 flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl font-light mb-6 tracking-tight text-white">The Deployment Sequence</h2>
            <div className="h-px w-24 bg-white/10" />
          </div>

          <div className="space-y-16 w-full">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-10">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[31px] top-20 bottom-[-40px] w-px bg-white/10 hidden sm:block" />
                )}

                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-orange-500 font-mono font-bold text-xl relative z-10 hover:border-orange-500/50 transition-colors">
                    {step.num}
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-lg text-white/40 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pattern Systems — Grid Polish */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-light text-white mb-8 tracking-tight">The Telemetry Systems</h2>
              <p className="text-lg text-white/50 leading-loose font-light mb-12">
                DEFRAG draws from established frameworks not as belief systems,
                but as pattern-recognition tools refined over thousands of years and validated by clinical observation.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {systems.map((system, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
                    <div className="text-orange-500/40 mb-3 group-hover:text-orange-500 transition-colors">+</div>
                    <div className="font-normal text-white text-sm mb-1">{system.name}</div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{system.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[40px] shadow-2xl overflow-hidden">
              <div className="bg-black rounded-[38px] p-12 aspect-[4/3] flex flex-col justify-center">
                <div className="space-y-6 opacity-30">
                  <div className="h-1 w-2/3 bg-white mb-4" />
                  <div className="h-8 w-full bg-white/10" />
                  <div className="h-8 w-full bg-white/10" />
                  <div className="h-8 w-1/2 bg-white/10" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <p className="absolute bottom-12 left-12 right-12 text-center text-xs font-mono tracking-[0.3em] text-orange-500 uppercase">Axiomatic Pattern Reveal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Standard Conclusion */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-6xl font-light mb-10 text-white tracking-tight">
            Deploy your manual.
          </h2>
          <p className="text-xl sm:text-2xl text-white/50 mb-16 leading-relaxed font-light max-w-2xl">
            Patterns, not predictions. Use what helps you debug the system.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-16 w-full flex items-center justify-center bg-white text-black text-sm tracking-[0.15em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-full uppercase shadow-2xl">
              Start Now
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
