import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
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
            <Link to="/about" className="text-white font-medium">ABOUT</Link>
            <Link to="/how-it-works" className="hover:text-white transition">HOW IT WORKS</Link>
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
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-orange-500/50" />
            <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">ABOUT</span>
            <span className="h-px w-8 bg-orange-500/50" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight mb-10">
            What is <span className="text-orange-500">DEFRAG</span>?
          </h1>

          <div className="space-y-10 text-white/70 leading-relaxed">
            <p className="text-xl sm:text-2xl text-white/60 font-light leading-relaxed">
              DEFRAG creates personalized relationship guides—practical manuals that explain 
              how two people interact under pressure and what helps reduce friction.
            </p>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
              <h2 className="text-xl font-medium text-white mb-4">The Problem</h2>
              <p className="text-base leading-relaxed">
                Most relationship friction isn't about big issues—it's about small, recurring 
                patterns that nobody fully understands. The same argument happens again. 
                Someone feels dismissed without knowing why. Timing feels off but you can't 
                explain it.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-8">
              <h2 className="text-xl font-medium text-white mb-4">The Solution</h2>
              <p className="text-base leading-relaxed">
                DEFRAG maps these patterns using birth data and ancient timing systems—astrology, 
                Human Design, the I-Ching. Not as mysticism, but as pattern-recognition frameworks 
                that have tracked human behavior for thousands of years.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
              <h2 className="text-xl font-medium text-white mb-6">What You Get</h2>
              <ul className="space-y-4">
                {[
                  'A clear explanation of how two people\'s patterns interact',
                  'Common triggers and pressure points to watch for',
                  'Practical phrases and actions that actually help',
                  'Real-time friction forecasts based on planetary transits',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="h-6 w-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-400 text-xs font-mono shrink-0">{i + 1}</span>
                    <span className="text-base text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="border-l-2 border-orange-500 pl-8 py-4">
              <p className="text-xl font-light text-white/50 italic">
                "Human behavior isn't random. It follows patterns. DEFRAG makes those 
                patterns visible and actionable."
              </p>
            </blockquote>

            <div>
              <h2 className="text-2xl font-medium text-white mb-6">What DEFRAG is NOT</h2>
              
              <ul className="space-y-4">
                {[
                  { label: 'Fortune telling', desc: 'We don\'t predict the future. We identify patterns.' },
                  { label: 'Therapy replacement', desc: 'DEFRAG is a tool, not a therapist. It provides insight, not treatment.' },
                  { label: 'Relationship judgment', desc: 'There are no "good" or "bad" combinations. Only different patterns.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-red-400/60 mt-1">✕</span>
                    <div>
                      <span className="font-medium text-white">{item.label}</span>
                      <span className="text-white/50"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h2 className="text-2xl font-medium text-white mb-4">The Science</h2>
              <p className="text-base leading-relaxed mb-6">
                DEFRAG uses real astronomical data from NASA's JPL HORIZONS system—the same ephemeris 
                data used for actual space missions. We combine this with pattern systems (Western astrology, 
                Human Design, I-Ching gates) and modern AI to generate insights.
              </p>
              <div className="flex flex-wrap gap-3">
                {['NASA JPL Data', 'Bowen Family Systems', 'Attachment Theory', 'Human Design'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/50 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/start"
              className="inline-flex h-14 px-10 items-center justify-center bg-white text-black text-sm tracking-[0.12em] font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition shadow-lg shadow-white/10"
            >
              GET YOUR MANUAL →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/5">
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
                <span className="text-red-400">✕</span>
                <span>Not therapy or counseling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✕</span>
                <span>Not a medical or mental health diagnosis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✕</span>
                <span>Not a substitute for professional help</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✕</span>
                <span>Not a belief system you need to adopt</span>
              </li>
            </ul>

            <p>
              It's a practical tool. Use what helps. Ignore what doesn't.
            </p>
          </div>

          <div className="mt-12 flex gap-4">
            <Link
              to="/login"
              className="h-12 px-6 flex items-center justify-center bg-orange-500 text-black font-semibold tracking-[0.15em] text-xs hover:bg-orange-400 transition rounded"
            >
              TRY IT FREE
            </Link>
            <Link
              to="/how-it-works"
              className="h-12 px-6 flex items-center justify-center border border-white/20 text-white/70 tracking-[0.15em] text-xs hover:border-white/40 hover:text-white transition rounded"
            >
              HOW IT WORKS
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/50">© 2026 DEFRAG. All rights reserved.</div>
          <div className="flex gap-6 text-xs text-white/50">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
