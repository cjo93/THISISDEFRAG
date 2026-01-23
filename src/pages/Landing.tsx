
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Pain-point language that triggers instant recognition
const ROTATING_WORDS = [
  "your partner",
  "your parents",
  "your children",
  "your coworkers",
  "your family",
  "your friends",
  "your team",
  "yourself",
];

export default function Landing() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeManualItem, setActiveManualItem] = useState<number | null>(null);

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
    const handleScroll = () => {
      // For snap scrolling, we still want to track scrollY for hero parallax if desired
      // but the main container is now responsible for snapping
      const container = document.getElementById('landing-container');
      if (container) {
        setScrollY(container.scrollTop);
      }
    };
    const container = document.getElementById('landing-container');
    container?.addEventListener('scroll', handleScroll, { passive: true });
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0002;

  return (
    <div id="landing-container" className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth selection:bg-orange-500/20">

      {/* Nav */}
      <Header />

      {/* HERO SECTION - ELEVATED & DRAMATIC */}
      <section
        className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden bg-black"
        style={{ opacity: heroOpacity }}
      >
        {/* Enhanced atmospheric background - STARK BLACK */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Main radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax]"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.06) 20%, rgba(249,115,22,0.015) 40%, transparent 70%)',
              transform: `translate(-50%, -50%) scale(${heroScale})`,
            }}
          />
          {/* Accent glow rings */}
          {/* Accent glow rings - removed for cleaner look */}
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* Opening statement - smaller, builds anticipation */}


          <h1 className="space-y-6 sm:space-y-10">
            {/* "FINALLY" - Massive impact word */}


            {/* Main headline - Universal, emotional */}
            <div className="opacity-0 animate-[fadeReveal_1.5s_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] space-y-3 sm:space-y-5">
              <p className="text-white/70 text-base sm:text-xl md:text-2xl tracking-[0.2em] uppercase font-light">
                The User Manual For
              </p>

              {/* The rotating relationship word - HUGE */}
              <div
                className={`
                  relative inline-block
                  text-white font-light text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] 
                  tracking-tight leading-none
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}
                `}
                style={{
                  textShadow: '0 0 60px rgba(249,115,22,0.2), 0 0 120px rgba(249,115,22,0.1)',
                }}
              >
                <span className="relative inline-block bg-gradient-to-br from-white via-orange-50 to-orange-200 bg-clip-text text-transparent">
                  {ROTATING_WORDS[wordIndex]}
                </span>
                {/* Subtle underline that pulses */}
                <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-pulse" />
              </div>

              <p className="text-white/60 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                & everyone you care about
              </p>
            </div>
          </h1>

          {/* Subheadline - The promise */}
          <div className="opacity-0 animate-[fadeReveal_1.5s_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] mt-10 sm:mt-16 max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 font-light leading-relaxed mb-4 sm:mb-6">
              Why they do what they do.
              <br className="hidden sm:block" />
              <span className="text-white">How to stay connected when it's hard.</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
              No more guessing. No more feeling lost.<br className="hidden sm:block" />
              Just clarity when you need it most.
            </p>
          </div>

          {/* Methodology badges - More prominent */}
          <div className="opacity-0 animate-[fadeReveal_1.5s_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] mt-10 sm:mt-14">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
              <div className="group relative px-6 py-3 rounded-full border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-orange-400 text-sm sm:text-base font-semibold tracking-wider uppercase">Real Astrology</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/60 whitespace-nowrap">Natal charts · Timing · Patterns</p>
                </div>
              </div>

              <div className="hidden sm:block text-2xl text-orange-500/30 font-light">×</div>

              <div className="group relative px-6 py-3 rounded-full border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                      <path d="M7 10h2v5H7zm4-3h2v8h-2z" />
                    </svg>
                  </div>
                  <span className="text-orange-400 text-sm sm:text-base font-semibold tracking-wider uppercase">Psychology</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/60 whitespace-nowrap">Family Systems · Bowen Theory</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-lg mx-auto">
              <Link
                to="/start"
                className="w-full h-14 flex items-center justify-center bg-orange-500 text-black text-xs sm:text-sm tracking-[0.2em] font-bold hover:bg-orange-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.2)] uppercase"
              >
                Generate Manual
              </Link>
              <Link
                to="/signin"
                className="w-full h-14 flex items-center justify-center border border-white/20 text-white/70 text-xs sm:text-sm tracking-[0.2em] font-medium hover:border-white/50 hover:text-white transition-all duration-200 rounded-lg backdrop-blur-sm uppercase"
              >
                Member Login
              </Link>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 text-[10px] sm:text-xs text-white/30 tracking-[0.2em] font-mono uppercase">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Analysis</span>
            </div>
            <div>•</div>
            <div>Secure & Private</div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* THE FRICTION SECTION - ELEVATED */}
      <section className="h-screen w-full snap-start flex items-center py-12 sm:py-20 relative border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="max-w-5xl">
            <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/70 mb-10 sm:mb-12 border-l-2 border-orange-500/50 pl-4 uppercase">
              The Friction
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-16 sm:mb-20 leading-[1.1]">
              Why does it feel like<br className="hidden sm:block" />
              <span className="text-white/60">you're speaking</span><br className="hidden sm:block" />
              <span className="text-orange-400">different languages</span>?
            </h2>

            <div className="space-y-8 sm:space-y-12 text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl">
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-orange-500/40 transition-all duration-300">
                <span className="text-white/50">You try to connect.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-orange-100 transition-colors">They pull away.</span>
              </p>
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-orange-500/40 transition-all duration-300">
                <span className="text-white/50">You ask for clarity.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-orange-100 transition-colors">They get defensive.</span>
              </p>
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-orange-500/40 transition-all duration-300">
                <span className="text-white/50">You give them space.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-orange-100 transition-colors">They say you don't care.</span>
              </p>
            </div>

            <div className="mt-16 sm:mt-24 pl-6 sm:pl-10 border-l-2 border-orange-500/60 bg-gradient-to-r from-orange-500/5 to-transparent py-6 sm:py-8 pr-6">
              <span className="block text-orange-400 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-4 opacity-90">The Truth</span>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
                It's not that you're <span className="text-white/60">incompatible</span>.<br />
                You're running on different<br className="hidden sm:block" />
                <span className="font-normal text-orange-400 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">operating systems</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE SECTION - ELEVATED */}
      <section className="h-screen w-full snap-start flex items-center py-12 sm:py-20 relative overflow-hidden border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/70 mb-10 sm:mb-12 border-l-2 border-orange-500/50 pl-4 uppercase">
                How It Works
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] mb-10 sm:mb-12 text-white">
                We look at<br />
                <span className="text-orange-500 font-normal">who people really are</span><br />
                <span className="text-white/60">underneath the stress.</span>
              </h2>
              <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed max-w-xl">
                <p className="text-white/70">Most relationship advice focuses on <span className="text-white/40">what people do</span>.</p>
                <p className="text-2xl sm:text-3xl text-white font-light">We focus on <span className="text-orange-400">why</span> they do it.</p>
                <p className="mt-8 sm:mt-10 text-base sm:text-lg text-white/50 leading-relaxed">DEFRAG maps how each person handles anxiety, stays connected under pressure, and shows up when things get hard.</p>
                <p className="text-white font-medium pl-6 border-l-2 border-orange-500/40 text-xl sm:text-2xl">When you understand the person,<br />the behavior starts to make sense.</p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-[450px] relative shrink-0 group/diagram">
                {/* Outer glow */}
                <div className="absolute inset-[-20%] rounded-full bg-gradient-radial from-orange-500/5 to-transparent animate-pulse duration-[5000ms]" />

                {/* Layer 5 - Triggers */}
                <div className="absolute inset-0 rounded-full border border-white/10 flex items-start justify-center pt-4 transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/[0.02] peer/l5 group">
                  <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase bg-black px-3 -mt-2 group-hover:text-orange-400 transition-colors">5. Triggers</span>
                  <div className="absolute inset-x-0 -bottom-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-orange-400 font-mono tracking-wider">EXTERNAL ENVIRONMENTAL STRESSORS</p>
                  </div>
                </div>

                {/* Layer 4 - Behaviors */}
                <div className="absolute inset-[15%] rounded-full border border-white/20 flex items-start justify-center pt-4 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/[0.03] group">
                  <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase bg-black px-3 -mt-2 group-hover:text-orange-400 transition-colors">4. Behaviors</span>
                  <div className="absolute inset-x-0 -bottom-10 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-orange-400 font-mono tracking-wider">REACTIVE ACTION PATTERNS</p>
                  </div>
                </div>

                {/* Layer 3 - Needs */}
                <div className="absolute inset-[30%] rounded-full border border-orange-500/30 flex items-start justify-center pt-4 transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/[0.05] group">
                  <span className="text-[10px] tracking-[0.25em] text-orange-400/80 uppercase bg-black px-3 -mt-2 group-hover:text-orange-400 transition-colors">3. Needs</span>
                  <div className="absolute inset-x-0 -bottom-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-orange-400 font-mono tracking-wider">ESSENTIAL SAFETY REQUIREMENTS</p>
                  </div>
                </div>

                {/* Layer 2 - Fears */}
                <div className="absolute inset-[45%] rounded-full border border-orange-500/50 bg-orange-500/[0.02] flex items-start justify-center pt-4 transition-all duration-300 hover:border-orange-500/80 hover:bg-orange-500/[0.08] group">
                  <span className="text-[10px] tracking-[0.25em] text-orange-400 uppercase bg-black px-3 -mt-2">2. Fears</span>
                  <div className="absolute inset-x-0 -bottom-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-orange-400 font-mono tracking-wider">PRIMAL INSTINCTUAL DEFENSES</p>
                  </div>
                </div>

                {/* Layer 1 - Core */}
                <div className="absolute inset-[60%] rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform duration-500 group">
                  <span className="text-black text-xs sm:text-sm font-bold tracking-widest uppercase">1. Core</span>
                  <div className="absolute inset-x-0 -bottom-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-orange-400 font-mono tracking-wider">INNATE COGNITIVE ARCHITECTURE</p>
                  </div>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -z-10" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES SECTION */}
      <section className="min-h-screen w-full snap-start flex items-center py-12 sm:py-20 relative border-t border-white/5 bg-black">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12">
          <div className="mb-16 md:mb-20">
            <span className="inline-block text-xs font-mono tracking-widest text-orange-400/80 mb-8 border-l border-orange-500/50 pl-3 uppercase">
              The Manual
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight">
              The user manual for you and your people.
            </h2>
            <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] font-mono uppercase">// Here's what you get</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: "01", title: "Who They Are", short: "Understanding their core personality.", desc: "Learn how they handle stress, what makes them feel safe, and how they naturally show up in relationships." },
              { num: "02", title: "Patterns Under Stress", short: "What happens when things get tense.", desc: "See the cycles that play out when anxiety is high. Learn to spot when distance or pursuit patterns are starting." },
              { num: "03", title: "How to Stay Grounded", short: "What helps when emotions run high.", desc: "Practical ways to stay calm, connected, and clear-headed when the other person is stressed or pulling away." },
              { num: "04", title: "Keeping It Healthy", short: "Simple practices for your relationship.", desc: "Regular habits that help both of you stay connected and reduce the chronic stress that builds up over time." },
            ].map((item, index) => {
              const isActive = activeManualItem === index;
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveManualItem(isActive ? null : index)}
                  className={`group relative p-8 rounded-xl cursor-pointer transition-all duration-500 border ${isActive ? 'bg-orange-500 border-orange-500 text-black shadow-[0_0_40px_rgba(249,115,22,0.3)]' : 'bg-white/[0.01] border-white/10 hover:border-orange-500/50 hover:bg-orange-500/[0.05]'}`}
                >
                  <div className="mb-8 flex justify-between items-start">
                    <span className={`text-xl font-light font-mono opacity-60 ${isActive ? 'text-black' : 'text-orange-500'}`}>{item.num}</span>
                    <span className={`text-2xl transition-transform duration-300 ${isActive ? 'rotate-45 text-black' : 'text-white/20 group-hover:text-white/60'}`}>+</span>
                  </div>
                  <h3 className={`text-lg font-medium mb-4 tracking-wide ${isActive ? 'text-black' : 'text-white'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${isActive ? 'text-black/80 font-medium' : 'text-white/50'}`}>{isActive ? item.desc : item.short}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE SECTION - ELEVATED */}
      <section className="h-screen w-full snap-start flex items-center py-20 relative overflow-hidden border-t border-white/5 bg-black">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-orange-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/70 mb-10 sm:mb-12 border-l-2 border-orange-500/50 pl-4 uppercase">
                What You Get
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-10 sm:mb-12 leading-tight">
                Your personalized<br />
                <span className="text-orange-500 font-normal">relationship guide</span>.
              </h2>
              <ul className="space-y-8 sm:space-y-10">
                {[
                  { title: "WHO THEY ARE", text: "A clear picture of their core personality and how they handle stress." },
                  { title: "WHAT HAPPENS WHEN THINGS GET HARD", text: "The patterns that show up when anxiety is high and what you can do about it." },
                  { title: "HOW TO STAY CONNECTED", text: "Practical ways to stay calm and grounded, even when they're pulling away or pushing back." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 sm:gap-6 group">
                    <span className="text-orange-500/40 font-mono text-sm sm:text-base pt-1 font-bold">0{i + 1}</span>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-bold tracking-[0.2em] mb-2 group-hover:text-orange-400 transition-colors uppercase">{item.title}</h4>
                      <p className="text-white/50 text-base sm:text-lg leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              {/* Blurred "Pages" stack for premium feel */}
              <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                <div className="absolute top-0 right-0 w-[80%] h-full bg-black/80 border border-white/10 rounded-lg shadow-2xl rotate-2 translate-x-4 translate-y-4 blur-[2px] opacity-20" />
                <div className="absolute top-0 right-0 w-[80%] h-full bg-black/80 border border-white/10 rounded-lg shadow-2xl -rotate-1 translate-x-2 translate-y-2 opacity-40 blur-[1px]" />
                <div className="absolute top-0 right-0 w-[80%] h-full bg-black border border-orange-500/20 rounded-lg shadow-[0_0_50px_rgba(249,115,22,0.1)] p-8 overflow-hidden group/page">
                  {/* Decorative "content" */}
                  <div className="space-y-4 opacity-40 select-none">
                    <div className="h-2 w-1/2 bg-orange-500/50 rounded" />
                    <div className="space-y-2">
                      <div className="h-1 w-full bg-white/20 rounded" />
                      <div className="h-1 w-[90%] bg-white/20 rounded" />
                      <div className="h-1 w-[95%] bg-white/20 rounded" />
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="h-2 w-1/3 bg-white/30 rounded mb-2" />
                      <div className="h-40 w-full bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em]">Analysis Node 042</span>
                      </div>
                    </div>
                  </div>
                  {/* Floating callout */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-box-opaque border border-orange-500/50 p-6 rounded-lg w-64 shadow-2xl transition-transform group-hover/page:scale-105">
                    <p className="text-white/90 text-[10px] leading-relaxed font-mono">
                      <span className="text-orange-500 font-bold block mb-2 uppercase tracking-widest">Self-Differentiation</span>
                      "When anxiety rises in the emotional system, focus on regulating your own response rather than reacting to their withdrawal."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SECTION (PRICING + FOOTER) */}
      <section className="min-h-screen w-full snap-start flex flex-col pt-12 sm:pt-20 pb-10 relative border-t border-white/5 bg-black">
        <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-12 relative flex-grow flex flex-col justify-center">
          <div className="text-center mb-16 sm:mb-24 max-w-5xl mx-auto">
            <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/60 mb-8 sm:mb-12 uppercase">Ready to understand?</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-6 sm:mb-8 text-white text-center">
              Stop guessing.<br />
              <span className="text-white/40">Start understanding.</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
              Choose the right level of insight for your relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            <div className="p-6 sm:p-8 border border-white/10 glass-box rounded-2xl flex flex-col">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-mono">Quick Look</div>
              <div className="text-4xl font-light text-white mb-2">Free</div>
              <p className="text-sm text-white/50 mb-8 font-mono">Basic personality snapshot</p>
              <ul className="space-y-4 text-sm text-white/60 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Basic compatibility</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Core personality traits</li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center border border-white/20 text-white/80 text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">Try It</Link>
            </div>

            <div className="p-8 border border-orange-500 bg-orange-500/[0.05] rounded-2xl relative flex flex-col scale-[1.05] shadow-[0_0_50px_rgba(249,115,22,0.1)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-black text-[10px] tracking-[0.2em] font-bold rounded-full uppercase">Most Popular</div>
              <div className="text-[10px] tracking-[0.3em] text-orange-500 uppercase mb-4 font-mono">Full Manual</div>
              <div className="text-4xl font-light text-white mb-2">$19</div>
              <p className="text-sm text-orange-500/60 mb-8 font-mono">The user manual for you & your people</p>
              <ul className="space-y-4 text-sm text-white/80 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-orange-500/90 font-medium">● Who they really are</li>
                <li className="flex items-center gap-3 text-orange-500/90 font-medium">● Patterns under stress</li>
                <li className="flex items-center gap-3 text-orange-500/90 font-medium">● How to stay grounded</li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center bg-orange-500 text-black text-xs tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-lg shadow-orange-500/20">Get Your Manual</Link>
            </div>

            <div className="p-8 border border-white/10 bg-black/40 rounded-2xl flex flex-col">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-mono">For Teams</div>
              <div className="text-4xl font-light text-white mb-2">$29</div>
              <p className="text-sm text-white/50 mb-8 font-mono">Multiple people</p>
              <ul className="space-y-4 text-sm text-white/60 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Everything in Full Manual</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Family members & coworkers</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Compare dynamics</li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center border border-white/20 text-white/80 text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">Upgrade</Link>
            </div>
          </div>
        </div>

        <footer className="w-full border-t border-white/5 pt-10 px-6 sm:px-12 bg-black">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/30 tracking-widest uppercase pb-4">
            <p>&copy; 2026 DEFRAG</p>
            <div className="flex gap-8">
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <a href="mailto:help@defrag.app" className="hover:text-white transition">Contact</a>
            </div>
            <div className="hidden sm:block text-[9px] text-white/10 font-mono">v1.0.6</div>
          </div>
        </footer>
      </section>

    </div>
  );
}
