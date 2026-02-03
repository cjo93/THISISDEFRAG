
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, AlertTriangle, ShieldCheck, Microscope } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
      <Header />

      {/* Hero Section — Premium Spacing */}
      <section className="pt-40 pb-32 px-6 border-b border-white/5 bg-black relative">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            MISSION STATEMENT
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
            What is <span className="text-orange-500">DEFRAG?</span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-16 antialiased">
            DEFRAG creates personalized relationship guides—practical manuals that explain how two people interact under pressure and what helps reduce systemic friction.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
            <Link to="/start" className="group h-16 w-full flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]">
              Start Now
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Content — Grid and List Polish */}
      <section className="py-32 px-6 bg-zinc-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-32">

          {/* PROBLEM / SOLUTION GRID */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
              <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-4">
                <Info size={20} className="text-white/20" />
                The Problem
              </h2>
              <p className="text-white/40 leading-loose font-light">
                Most relationship friction isn't about big issues—it's about small, recurring patterns that nobody fully understands. The same argument happens again. Someone feels dismissed without knowing why. Timing feels off but you can't explain it.
              </p>
            </div>

            <div className="p-10 rounded-[32px] border border-orange-500/10 bg-orange-500/[0.01] hover:bg-orange-500/[0.03] transition-colors group">
              <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-4">
                <ShieldCheck size={20} className="text-orange-500/40" />
                The Solution
              </h2>
              <p className="text-white/40 leading-loose font-light">
                DEFRAG maps these patterns using birth telemetry and ancient timing systems—astrology, Human Design, the I-Ching. Not as mysticism, but as pattern-recognition frameworks that have tracked human behavior for millennia.
              </p>
            </div>
          </div>

          {/* WHAT YOU GET */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-light text-white mb-12 tracking-tight text-center">Standard Deliverables</h2>
            <div className="space-y-6">
              {[
                'A clear explanation of how two nodes interact',
                'Common triggers and pressure points to monitor',
                'Strategic resolution scripts that actually bridge friction',
                'Real-time forecasts based on planetary transits'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                  <span className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-xl text-orange-400 font-mono text-xs">{i + 1}</span>
                  <span className="text-lg text-white/60 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCKQUOTE */}
          <div className="py-20 border-y border-white/5">
            <blockquote className="text-center max-w-2xl mx-auto">
              <p className="text-2xl sm:text-3xl font-light text-white/50 italic leading-relaxed mb-8">
                "Human behavior isn't random. It follows patterns. DEFRAG makes those patterns visible and actionable."
              </p>
              <cite className="not-italic text-[10px] font-mono tracking-[0.4em] text-orange-500 uppercase">— System Director</cite>
            </blockquote>
          </div>

          {/* NEGATIVES (WHAT IT'S NOT) */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Fortune Telling', desc: 'We identify patterns, we don\'t predict futures.' },
              { label: 'Therapy', desc: 'DEFRAG is a technical tool, not a clinical treatment.' },
              { label: 'Judgment', desc: 'There are no "bad" patterns. Only different configurations.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-red-500/5 bg-red-500/[0.01]">
                <div className="flex items-center gap-3 mb-4 text-red-400/30">
                  <AlertTriangle size={16} />
                  <span className="text-[10px] font-mono tracking-widest uppercase">EXCLUSION</span>
                </div>
                <h3 className="text-xl font-light mb-3 text-white">{item.label}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* SCIENCE SECTION */}
          <div className="pt-24 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light text-white mb-8 tracking-tight flex items-center gap-4">
                <Microscope size={28} className="text-white/20" />
                Technical Foundations
              </h2>
              <p className="text-lg text-white/40 leading-loose font-light mb-12">
                DEFRAG utilizes real astronomical telemetry from NASA's JPL HORIZONS system—the same ephemeris data used for deep-space flight. We synthesize this with pattern systems and modern logic engines to generate architectural insights.
              </p>
              <div className="flex flex-wrap gap-4">
                {['NASA JPL HORIZONS', 'Bowen Theory', 'Attachment Logic', 'Human Design API'].map((tag) => (
                  <span key={tag} className="px-5 py-2 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono tracking-widest text-white/40 uppercase">
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
