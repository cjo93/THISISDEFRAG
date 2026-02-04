
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, AlertTriangle, ShieldCheck, Microscope, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden">
      <Header />

      {/* Hero Section — Monochrome Spacing */}
      <section className="pt-56 pb-40 px-8 bg-black relative">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-16 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
            System_Manifesto
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter leading-[0.9] mb-16 text-white uppercase italic">
            What is <span className="text-white/40">DEFRAG?</span>
          </h1>

          <p className="text-xl sm:text-3xl text-white/30 max-w-4xl mx-auto leading-relaxed font-light mb-24 italic pr-4">
            DEFRAG translates the noise of human interaction into deterministic, actionable protocols. We map the architectural baseline of individual and relational behaviors.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-20 w-full flex items-center justify-center bg-white text-black text-[10px] font-bold tracking-[0.4em] hover:bg-slate-200 transition-all duration-700 rounded-none uppercase shadow-2xl">
              Initialize_Start
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Content — Structured & Clean */}
      <section className="py-40 px-8 bg-zinc-950 border-y border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto space-y-48">

          {/* PROBLEM / SOLUTION GRID */}
          <div className="grid md:grid-cols-2 gap-16">
            <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 mb-10 group-hover:text-white transition-colors">
                <Info size={24} strokeWidth={1} />
              </div>
              <h2 className="text-3xl font-light text-white mb-8 tracking-tight uppercase">The Noise</h2>
              <p className="text-white/30 leading-relaxed font-light italic text-lg">
                Relational friction is rarely about the surface topic. It's about recurring, low-frequency patterns that remain invisible to the subjects. DEFRAG isolates these patterns.
              </p>
            </div>

            <div className="p-12 rounded-[56px] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white/40 mb-10 group-hover:text-white transition-colors">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-light text-white mb-8 tracking-tight uppercase">The Baseline</h2>
              <p className="text-white/30 leading-relaxed font-light italic text-lg">
                By synthesizing high-precision NASA telemetry with established behavioral systems, we generate a technical manual for the relationship—moving from confusion to coherence.
              </p>
            </div>
          </div>

          {/* STANDARDS */}
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className="text-4xl font-light text-white tracking-tighter uppercase">Protocol Deliverables</h2>
            <div className="grid sm:grid-cols-2 gap-8 text-left">
              {[
                'Interaction cycle mapping',
                'Pressure node identification',
                'Low-latency resolution scripts',
                'Environmental telemetry feeds'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-zinc-900 transition-all duration-700">
                  <span className="text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase italic">{i + 1}</span>
                  <span className="text-xl text-white/60 font-light italic">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUOTE */}
          <div className="py-32 border-y border-white/5 relative overflow-hidden">
            <blockquote className="text-center max-w-3xl mx-auto relative z-10">
              <p className="text-3xl sm:text-5xl font-light text-white/40 italic leading-tight tracking-tighter mb-12 uppercase">
                "Human behavior isn't random. It follows <span className="text-white">mechanical</span> rules. DEFRAG makes those rules visible."
              </p>
              <cite className="not-italic text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">— System_Director_01</cite>
            </blockquote>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.01] blur-[100px] pointer-events-none" />
          </div>

          {/* EXCLUSIONS */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Fortune Telling', desc: 'Pattern identification is not prediction.' },
              { label: 'Therapy', desc: 'We provide technical manuals, not clinical care.' },
              { label: 'Judgment', desc: 'The system recognizes logic, not morality.' }
            ].map((item, i) => (
              <div key={i} className="p-12 rounded-[48px] border border-white/5 bg-zinc-950 flex flex-col justify-between group hover:border-white/10 transition-all duration-700">
                <div>
                  <div className="flex items-center gap-4 mb-10 text-white/10 group-hover:text-white/30 transition-colors">
                    <AlertTriangle size={18} strokeWidth={1} />
                    <span className="text-[9px] font-mono tracking-[0.4em] uppercase italic">Exclusion_0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white uppercase tracking-tight">{item.label}</h3>
                  <p className="text-white/20 text-base leading-relaxed italic pr-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SCIENCE SECTION */}
          <div className="pt-32 border-t border-white/5 relative overflow-hidden group">
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl font-light text-white mb-10 tracking-tighter uppercase flex items-center gap-6">
                <Microscope size={32} strokeWidth={1} className="text-white/20" />
                Structural_Foundations
              </h2>
              <p className="text-2xl text-white/30 leading-relaxed font-light mb-16 italic pr-12">
                We utilize sub-arcsecond astronomical telemetry from NASA's JPL HORIZONS system. Every manual is synchronized with the planetary ephemeris data used for deep-space coordination.
              </p>
              <div className="flex flex-wrap gap-6">
                {['NASA_JPL_HORIZONS', 'Bowen_Logic', 'Relational_Geometry', 'High_Precision_EPHEMERIS'].map((tag) => (
                  <span key={tag} className="px-8 py-3 border border-white/10 bg-white/[0.03] rounded-full text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase italic">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
