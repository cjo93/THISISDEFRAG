import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-80 -left-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.06] bg-orange-500" />
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
            <Link to="/how-it-works" className="hover:text-white transition">HOW IT WORKS</Link>
            <Link to="/privacy" className="text-white font-medium">PRIVACY</Link>
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
            <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">PRIVACY & TERMS</span>
            <span className="h-px w-8 bg-orange-500/50" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight mb-10">
            Your <span className="text-orange-500">Data</span>
          </h1>

          <div className="space-y-8 text-white/80 leading-relaxed">
            
            {/* Key Points */}
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400">✓</span> The Short Version
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Your birth data is used only to generate your manual</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>We don't sell your information to third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Manuals are stored locally on your device by default</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>You can delete your data at any time</span>
                </li>
              </ul>
            </div>

            {/* Data Collection */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What We Collect</h2>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <div className="text-white">Birth Data</div>
                    <div className="text-sm text-white/50">Date, time, location</div>
                  </div>
                  <div className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded">Required</div>
                </div>
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <div className="text-white">Email Address</div>
                    <div className="text-sm text-white/50">For manual delivery and recovery</div>
                  </div>
                  <div className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded">Required</div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white">Generated Manuals</div>
                    <div className="text-sm text-white/50">Stored locally unless you opt into cloud sync</div>
                  </div>
                  <div className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">Local</div>
                </div>
              </div>
            </div>

            {/* How We Use It */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">How We Use It</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500">→</span>
                  <span>Calculate planetary positions from birth data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500">→</span>
                  <span>Generate personalized relationship manuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500">→</span>
                  <span>Provide real-time friction forecasts based on transits</span>
                </li>
              </ul>
            </div>

            {/* Important Disclaimers */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
              <h2 className="text-white font-semibold mb-4">Important Disclaimers</h2>
              
              <div className="space-y-4 text-sm">
                <p>
                  <strong className="text-white">This is not therapy.</strong> DEFRAG is an informational 
                  and educational tool. It does not provide medical advice, mental health treatment, 
                  or professional counseling.
                </p>
                
                <p>
                  <strong className="text-white">This is not a diagnosis.</strong> The patterns described 
                  are tendencies, not deterministic outcomes. People are complex and can always change.
                </p>
                
                <p>
                  <strong className="text-white">If you're in danger.</strong> If a relationship involves 
                  fear, control, manipulation, or physical harm, the safest step is to leave and seek 
                  professional support. Contact the National Domestic Violence Hotline: 1-800-799-7233.
                </p>
              </div>
            </div>

            {/* Third Parties */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="mb-4">We use the following external services:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white font-medium mb-1">NASA JPL HORIZONS</div>
                  <div className="text-sm text-white/50">Planetary position calculations</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white font-medium mb-1">Google Gemini</div>
                  <div className="text-sm text-white/50">Manual text generation</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white font-medium mb-1">Vercel</div>
                  <div className="text-sm text-white/50">Website hosting</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-white font-medium mb-1">Stripe</div>
                  <div className="text-sm text-white/50">Payment processing (Pro tier)</div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.03] p-8">
              <h2 className="text-xl font-medium text-white mb-4">Questions?</h2>
              <p className="text-base text-white/60 mb-6">
                If you have questions about your data or want to request deletion, contact us:
              </p>
              <a 
                href="mailto:info@defrag.app" 
                className="inline-flex items-center gap-3 text-orange-400 hover:text-orange-300 transition text-lg font-medium"
              >
                <span className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">✉</span>
                info@defrag.app
              </a>
            </div>

            <div className="text-sm text-white/40 pt-4">
              Last updated: January 2026
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/start"
              className="h-14 px-8 flex items-center justify-center bg-white text-black font-semibold tracking-[0.12em] text-sm hover:bg-orange-500 hover:text-white transition rounded-lg shadow-lg shadow-white/10"
            >
              GET STARTED →
            </Link>
            <Link
              to="/"
              className="h-14 px-8 flex items-center justify-center border border-white/15 text-white/70 tracking-[0.12em] text-sm hover:border-white/30 hover:text-white transition rounded-lg"
            >
              BACK HOME
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
