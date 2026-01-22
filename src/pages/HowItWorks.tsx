import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Enter Birth Data',
      desc: 'You provide basic birth information for yourself and someone you want to understand better.',
      details: ['Date of birth (required)', 'Time of birth (optional, improves accuracy)', 'Place of birth (optional)'],
    },
    {
      num: '02',
      title: 'Pattern Analysis',
      desc: 'We calculate real planetary positions using NASA\'s JPL HORIZONS system—the same data used for space missions.',
      details: ['Sun Position — Core identity and energy style', 'Moon Position — Emotional processing patterns', 'Mars Position — Action patterns under pressure'],
    },
    {
      num: '03',
      title: 'Manual Generation',
      desc: 'AI analyzes the pattern interactions and generates a practical relationship guide.',
      details: ['Specifications — How your patterns interact', 'Operating Procedures — Best ways to engage', 'Troubleshooting — Common issues and fixes', 'Maintenance — Ongoing practices that help'],
    },
  ];

  const systems = [
    { icon: '☉', name: 'Astrology', desc: 'Planetary positions at birth correlate with behavioral tendencies' },
    { icon: '◎', name: 'Human Design', desc: 'Energy types and decision-making strategies' },
    { icon: '☰', name: 'I-Ching', desc: 'Timing patterns and change cycles' },
    { icon: '🧬', name: 'Bowen Family Systems', desc: 'Intergenerational patterns and differentiation' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -bottom-80 -left-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="tracking-[0.25em] text-sm font-medium text-white/90">DEFRAG</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] text-white/50">
            <Link to="/about" className="hover:text-white transition">ABOUT</Link>
            <Link to="/how-it-works" className="text-white font-medium">HOW IT WORKS</Link>
            <Link to="/privacy" className="hover:text-white transition">PRIVACY</Link>
          </div>

          <Link
            to="/start"
            className="h-10 px-5 flex items-center justify-center bg-white text-black text-xs tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition rounded-lg"
          >
            GET STARTED
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-orange-500/50" />
            <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">HOW IT WORKS</span>
            <span className="h-px w-8 bg-orange-500/50" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight mb-6">
            The <span className="text-orange-500">Process</span>
          </h1>
          
          <p className="text-xl text-white/50 mb-16 max-w-2xl">
            From birth data to actionable relationship insights in under 2 minutes.
          </p>

          {/* Steps */}
          <div className="space-y-16 mb-20">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-orange-500/30 to-transparent hidden sm:block" />
                )}
                
                <div className="flex gap-6 sm:gap-8">
                  {/* Number */}
                  <div className="shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-orange-500 flex items-center justify-center text-black font-mono font-bold text-lg">
                      {step.num}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-white mb-3">{step.title}</h2>
                    <p className="text-base text-white/60 leading-relaxed mb-5">{step.desc}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                          <span className="text-orange-400 text-xs mt-0.5">✓</span>
                          <span className="text-sm text-white/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pattern Systems */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 mb-12">
            <h2 className="text-2xl font-medium text-white mb-4">The Pattern Systems</h2>
            <p className="text-base text-white/60 mb-8 max-w-2xl">
              DEFRAG draws from established frameworks—not as belief systems, 
              but as pattern-recognition tools refined over thousands of years.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {systems.map((system) => (
                <div key={system.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-orange-500/20 transition group">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-xl group-hover:border-orange-500/40 transition">
                    <span className="text-orange-400">{system.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">{system.name}</div>
                    <div className="text-sm text-white/50">{system.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy note */}
          <blockquote className="border-l-2 border-orange-500 pl-8 py-4 mb-12">
            <p className="text-lg text-white/50 italic">
              These systems describe patterns, not destinies. Your manual is a guide, 
              not a script. Use what helps, adapt what doesn't.
            </p>
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/start"
              className="h-14 px-8 flex items-center justify-center bg-white text-black font-semibold tracking-[0.12em] text-sm hover:bg-orange-500 hover:text-white transition rounded-lg shadow-lg shadow-white/10"
            >
              CREATE YOUR MANUAL →
            </Link>
            <Link
              to="/privacy"
              className="h-14 px-8 flex items-center justify-center border border-white/15 text-white/70 tracking-[0.12em] text-sm hover:border-white/30 hover:text-white transition rounded-lg"
            >
              PRIVACY INFO
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/30">© 2026 DEFRAG</span>
          <div className="flex gap-6 text-sm text-white/30">
            <Link to="/about" className="hover:text-white/60 transition">About</Link>
            <Link to="/how-it-works" className="hover:text-white/60 transition">How It Works</Link>
            <Link to="/privacy" className="hover:text-white/60 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
