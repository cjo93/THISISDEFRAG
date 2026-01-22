import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ROTATING_WORDS = [
  "your partner",
  "your mother", 
  "your father",
  "your boss",
  "your kid",
  "your ex",
  "yourself",
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
    }, 2200);
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
          <Link
            to="/start"
            className="text-[13px] tracking-[0.3em] text-white/70 hover:text-orange-400 transition-colors duration-300"
          >
            GET STARTED →
          </Link>
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
          
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1.05] tracking-[-0.02em] mb-10">
            <span className="block text-white/60 text-[clamp(0.85rem,2vw,1.1rem)] tracking-[0.4em] uppercase mb-8 font-medium">
              Finally
            </span>
            The user manual for<br />
            <span 
              className={`
                inline-block min-w-[280px] sm:min-w-[380px] text-orange-500 font-normal
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
              Get your manual
            </span>
          </Link>

          <p className="text-sm text-white/50 mt-10 tracking-[0.15em]">
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
            <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-light leading-[1.25] text-white mb-6">
              People don't come with instructions.
            </h2>
            <p className="text-[clamp(1.15rem,2.5vw,1.6rem)] font-light leading-[1.6] text-white/60">
              So we guess. We project. We repeat the same fights.<br />
              We wonder why they can't just <em className="text-white/80 not-italic">see it our way</em>.
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
                What if you could see<br />
                <span className="text-orange-400">the operating system</span><br />
                underneath?
              </h2>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md">
                DEFRAG maps invisible patterns—stress responses inherited across generations, attachment styles formed in childhood, the exact conditions that trigger shutdown.
              </p>
            </div>

            {/* Diagram */}
            <div className="relative">
              <div className="aspect-square max-w-sm lg:max-w-md mx-auto relative">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-[8%] rounded-full border border-white/15 animate-[spin_45s_linear_infinite_reverse]" />
                <div className="absolute inset-[16%] rounded-full border border-orange-500/25" />
                <div className="absolute inset-[24%] rounded-full border border-orange-500/40 bg-orange-500/[0.05]" />
                <div className="absolute inset-[32%] rounded-full border border-orange-500/30" />
                
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-light text-orange-500">◎</div>
                    <div className="text-xs tracking-[0.3em] text-white/50 uppercase mt-2 font-medium">Core</div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/50 uppercase font-medium">Triggers</div>
                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/50 uppercase font-medium">Responses</div>
                <div className="absolute left-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.2em] text-white/50 uppercase font-medium [writing-mode:vertical-lr] rotate-180">Needs</div>
                <div className="absolute right-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.2em] text-white/50 uppercase font-medium [writing-mode:vertical-lr]">Fears</div>
                
                {/* Dots on rings */}
                <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-500/80" />
                <div className="absolute bottom-[24%] right-[18%] w-1.5 h-1.5 rounded-full bg-white/50" />
                <div className="absolute top-[35%] left-[12%] w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
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
              Everything you need to navigate them.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                num: "01",
                title: "Operating Logic", 
                desc: "How they process stress and protect themselves." 
              },
              { 
                num: "02",
                title: "Trigger Map", 
                desc: "Words, tones, and situations that activate defenses." 
              },
              { 
                num: "03",
                title: "What They Need", 
                desc: "Not what they say. What lands. What creates safety." 
              },
              { 
                num: "04",
                title: "Scripts That Work", 
                desc: "Exact phrases for de-escalation and repair." 
              },
            ].map((item) => (
              <div 
                key={item.num} 
                className="group p-6 sm:p-8 border border-white/10 hover:border-orange-500/30 bg-white/[0.02] hover:bg-orange-500/[0.04] transition-all duration-500"
              >
                <span className="text-xs tracking-[0.3em] text-orange-500 font-mono block mb-6">
                  {item.num}
                </span>
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

      {/* FINAL CTA */}
      <section className="py-32 sm:py-48 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.05] to-transparent" />
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 text-center relative">
          
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-[1.1] mb-6 text-white">
            Stop guessing.
          </h2>
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.1] mb-12 text-orange-500">
            Start understanding.
          </h2>
          
          <p className="text-lg sm:text-xl text-white/60 mb-14 max-w-md mx-auto">
            Two people. Two minutes. One manual.
          </p>

          <Link
            to="/start"
            className="inline-flex h-14 sm:h-16 px-10 sm:px-14 items-center justify-center bg-white text-black text-sm sm:text-base tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10"
          >
            GET YOUR MANUAL — $19
          </Link>

          <p className="text-sm text-white/50 mt-8 tracking-[0.2em]">
            INSTANT DELIVERY · 30-DAY GUARANTEE · SECURE CHECKOUT
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm tracking-[0.2em] text-white/40">
            © 2026 DEFRAG
          </span>
          <div className="flex gap-8 text-sm tracking-[0.15em] text-white/40">
            <Link to="/about" className="hover:text-white/70 transition">About</Link>
            <Link to="/how-it-works" className="hover:text-white/70 transition">How It Works</Link>
            <Link to="/privacy" className="hover:text-white/70 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
