import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Pain-point language that triggers instant recognition
const ROTATING_WORDS = [
  "the one who shuts down",
  "the one who never listens",
  "the one you can't reach",
  "the one who pulls away",
  "the one who overreacts",
  "the one you walk on eggshells around",
];

export default function Landing() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setIsVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0002;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-orange-500/20">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50">
        <div className="max-w-[1800px] mx-auto px-8 sm:px-12 h-20 flex items-center justify-between">
          <span className="text-[15px] tracking-[0.5em] font-medium text-white">DEFRAG</span>
          <div className="flex items-center gap-8">
            <Link
              to="/signin"
              className="text-[13px] tracking-[0.3em] text-white/50 hover:text-white transition-colors duration-300"
            >
              SIGN IN
            </Link>
            <Link
              to="/start"
              className="text-[13px] tracking-[0.3em] text-white/70 hover:text-orange-400 transition-colors duration-300"
            >
              GET STARTED →
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section 
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Animated gradient */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax]"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.04) 30%, transparent 60%)',
              transform: `translate(-50%, -50%) scale(${heroScale})`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl">
          
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] mb-10">
            <span className="block text-white/60 text-[clamp(0.85rem,2vw,1.1rem)] tracking-[0.4em] uppercase mb-8 font-medium">
              Finally
            </span>
            The user manual for<br />
            <span 
              className={`
                inline-block min-w-[280px] sm:min-w-[500px] text-orange-500 font-normal
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-3 blur-sm'}
              `}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/70 font-light max-w-xl mx-auto mb-14 leading-relaxed">
            Understand why they react that way—and what actually helps.
          </p>

          {/* CTA */}
          <Link
            to="/start"
            className="group inline-flex items-center gap-5"
          >
            <span className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-400 transition-all duration-500 ease-out shadow-lg shadow-orange-500/25">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span className="text-lg sm:text-xl text-white/80 group-hover:text-white transition-colors duration-300">
              Finally understand them →
            </span>
          </Link>

          {/* Micro-validation */}
          <p className="text-sm text-white/40 mt-8 italic">
            (You're 2 minutes away from the answer you've been looking for)
          </p>

          <p className="text-sm text-white/50 mt-4 tracking-[0.15em]">
            $19 · 2 MINUTES · INSTANT DELIVERY
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-28 sm:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 relative">
          <div className="max-w-4xl">
            <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 border-l-2 border-orange-500 pl-4 font-medium">
              The Problem
            </span>
            <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-light leading-[1.25] text-white mb-8">
              People don't come with instructions.
            </h2>
            <p className="text-[clamp(1.15rem,2.5vw,1.5rem)] font-light leading-[1.7] text-white/60">
              We try everything. We stay patient. We compromise. We apologize.<br />
              We don't understand why it's <em className="text-white/80 not-italic">never enough</em>.<br />
              <span className="block mt-4 text-white/50">And somehow... we're the problem.</span>
            </p>
          </div>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="py-28 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent" />
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 relative">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-16 lg:gap-24 items-center">
            
            <div>
              <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 border-l-2 border-orange-500 pl-4 font-medium">
                The Shift
              </span>
              <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-light leading-[1.25] mb-8 text-white">
                What if everything they do<br />
                <span className="text-orange-400">makes perfect sense</span>...<br />
                once you understand them?
              </h2>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md mb-6">
                DEFRAG reveals why they do what they do. Their core fears. What actually reaches them. The invisible architecture that explains everything.
              </p>
              <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-md">
                And suddenly... you're not angry anymore. You're compassionate.
              </p>
            </div>

            {/* Diagram */}
            <div className="relative">
              {/* Context line above diagram */}
              <p className="text-center text-xs tracking-[0.3em] text-white/40 uppercase mb-8">
                The 5 Invisible Layers
              </p>
              <div className="aspect-square max-w-sm lg:max-w-md mx-auto relative">
                {/* Outer glow */}
                <div className="absolute inset-[-20%] rounded-full bg-gradient-radial from-orange-500/5 to-transparent" />
                
                {/* Layer 5 - Triggers (outermost) */}
                <div className="absolute inset-0 rounded-full border border-white/10">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[10px] tracking-[0.25em] text-white/40 uppercase">Triggers</span>
                </div>
                
                {/* Layer 4 - Behaviors */}
                <div className="absolute inset-[10%] rounded-full border border-white/15">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[10px] tracking-[0.25em] text-white/50 uppercase">Behaviors</span>
                </div>
                
                {/* Layer 3 - Needs */}
                <div className="absolute inset-[20%] rounded-full border border-orange-500/20">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[10px] tracking-[0.25em] text-orange-400/60 uppercase">Needs</span>
                </div>
                
                {/* Layer 2 - Fears */}
                <div className="absolute inset-[30%] rounded-full border border-orange-500/30 bg-orange-500/[0.03]">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[10px] tracking-[0.25em] text-orange-400/70 uppercase">Fears</span>
                </div>
                
                {/* Layer 1 - Core (innermost) */}
                <div className="absolute inset-[40%] rounded-full border border-orange-500/50 bg-orange-500/[0.08]" />
                
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <span className="text-black text-lg sm:text-xl font-medium">1</span>
                    </div>
                    <div className="text-[10px] tracking-[0.3em] text-orange-400 uppercase mt-3 font-medium">Core Identity</div>
                  </div>
                </div>

                {/* Subtle connection lines */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
              </div>
              
              {/* Layer description */}
              <p className="text-center text-sm text-white/40 mt-8 max-w-xs mx-auto leading-relaxed">
                Every reaction starts at the core. We map all five layers so you finally understand why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-28 sm:py-40">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12">
          
          <div className="mb-16">
            <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 border-l-2 border-orange-500 pl-4 font-medium">
              Your Manual
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white">
              Everything you need to finally reach them.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                num: "01",
                title: "Operating Logic", 
                desc: "Why they shut down (not because of you). How they actually operate under stress. What they're really protecting."
              },
              { 
                num: "02",
                title: "Trigger Map", 
                desc: "The exact phrases that trigger them. And more importantly—the words that disarm them instantly."
              },
              { 
                num: "03",
                title: "What They Need", 
                desc: "Not what they say they want. The conditions that make them feel genuinely safe with you. When they finally open up."
              },
              { 
                num: "04",
                title: "Scripts That Work", 
                desc: "What to say when everything's broken. How to turn conflict into closeness. The exact words that rebuild trust."
              },
            ].map((item) => (
              <div 
                key={item.num} 
                className="group p-6 sm:p-8 border border-white/10 hover:border-orange-500/30 bg-white/[0.02] hover:bg-orange-500/[0.04] transition-all duration-500"
              >
                <div className="mb-6">
                  <span className="text-2xl font-light text-orange-500/80 group-hover:text-orange-400 transition-colors">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-white group-hover:text-orange-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT ON */}
      <section className="py-20 sm:py-28 border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm tracking-[0.1em] text-white/50">
            <span>Bowen Family Systems</span>
            <span className="text-white/30">◦</span>
            <span>Attachment Theory</span>
            <span className="text-white/30">◦</span>
            <span>NASA JPL Ephemeris</span>
            <span className="text-white/30">◦</span>
            <span>Human Design</span>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent" />
        <div className="max-w-3xl mx-auto px-8 sm:px-12 text-center relative">
          <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 font-medium">
            The Moment After You Read It
          </span>
          <div className="space-y-6 text-lg sm:text-xl text-white/70 leading-relaxed">
            <p>You'll finally understand <span className="text-white">why they react that way</span>.</p>
            <p>You'll know exactly <span className="text-white">what to say when things break</span>.</p>
            <p>You'll stop <span className="text-white">taking it personally</span>.</p>
            <p className="text-white/90 font-medium pt-4">And for the first time, you'll actually know how to reach them.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 sm:py-48 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.05] to-transparent" />
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 text-center relative">
          
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-light leading-[1.15] mb-4 text-white">
            Stop guessing. Stop blaming yourself.
          </h2>
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.1] mb-12 text-orange-500">
            Start understanding.
          </h2>
          
          <p className="text-lg sm:text-xl text-white/60 mb-6 max-w-lg mx-auto">
            Two people. Two minutes. One moment of<br />
            <span className="text-white italic">"OH, that's why they do that."</span>
          </p>

          <Link
            to="/start"
            className="inline-flex h-14 sm:h-16 px-10 sm:px-14 items-center justify-center bg-white text-black text-sm sm:text-base tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10"
          >
            UNDERSTAND THEM FINALLY — $19
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50 mt-10 tracking-[0.1em]">
            <span>Instant Delivery</span>
            <span className="text-white/20">|</span>
            <span>30-Day Guarantee</span>
            <span className="text-white/20">|</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black">
                D
              </div>
              <span className="tracking-[0.25em] text-sm font-medium text-white/70">DEFRAG</span>
            </div>
            <div className="flex gap-8 text-sm tracking-[0.15em] text-white/50">
              <Link to="/about" className="hover:text-white transition">About</Link>
              <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <span className="text-sm text-white/30">
              © 2026 DEFRAG. All rights reserved.
            </span>
            <a 
              href="mailto:chadowen93@gmail.com" 
              className="text-sm text-white/40 hover:text-orange-400 transition"
            >
              chadowen93@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
