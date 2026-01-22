import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Enter Two People',
      desc: 'Birth date, time, and place for you and someone you want to understand.',
    },
    {
      num: '02',
      title: 'We Analyze the Patterns',
      desc: 'Real planetary data from NASA reveals how you each operate—and where friction happens.',
    },
    {
      num: '03',
      title: 'Get Your Manual',
      desc: 'A practical guide to understanding them: what triggers them, what they need, and what actually works.',
    },
  ];

  const systems = [
    { name: 'NASA JPL Ephemeris', desc: 'Actual planetary positions' },
    { name: 'Attachment Theory', desc: 'How people bond and disconnect' },
    { name: 'Bowen Family Systems', desc: 'Intergenerational patterns' },
    { name: 'Human Design', desc: 'Energy and decision-making styles' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -bottom-80 -left-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 safe-top">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-base sm:text-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="tracking-[0.2em] sm:tracking-[0.25em] text-sm font-medium text-white/90">DEFRAG</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/signin" className="text-xs tracking-[0.15em] text-white/50 hover:text-white transition">
              LOG IN
            </Link>
            <Link
              to="/start"
              className="h-9 sm:h-10 px-4 sm:px-5 flex items-center justify-center bg-white text-black text-xs tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition rounded-lg"
            >
              START
            </Link>
          </div>
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
          <div className="space-y-12 mb-20">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-orange-500/30 to-transparent hidden sm:block" />
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
                    <h2 className="text-2xl font-medium text-white mb-2">{step.title}</h2>
                    <p className="text-base text-white/60 leading-relaxed">{step.desc}</p>
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
            
            <div className="grid sm:grid-cols-2 gap-3">
              {systems.map((system) => (
                <div key={system.name} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-orange-400">+</span>
                  <div>
                    <div className="font-medium text-white text-sm">{system.name}</div>
                    <div className="text-xs text-white/40">{system.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy note */}
          <blockquote className="border-l-2 border-orange-500 pl-6 py-2 mb-12">
            <p className="text-base text-white/50">
              Patterns, not predictions. Use what helps.
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
