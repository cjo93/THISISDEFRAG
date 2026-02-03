
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { trackEvent, AnalyticsEvents, initScrollTracking, ConversionFunnel } from '../../lib/analytics';

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

    // Initialize analytics
    ConversionFunnel.step1_landing();
    initScrollTracking();

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
    <div id="landing-container" className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth selection:bg-white/20">

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
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.01) 40%, transparent 70%)',
              transform: `translate(-50%, -50%) scale(${heroScale})`,
            }}
          />
          {/* Accent glow rings */}
          {/* Accent glow rings - removed for cleaner look */}
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          <h1 className="space-y-6 sm:space-y-10">
            {/* Main headline - Static, clear value prop */}
            <div className="opacity-0 animate-[fadeReveal_1.5s_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] space-y-4 sm:space-y-6">
              <p className="text-white font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[1.1]">
                Stop repeating the same fight
                <br />
                <span className="relative inline-block bg-gradient-to-br from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                  on different days
                </span>
              </p>

              {/* Subheadline - plain language */}
              <p className="text-white/70 text-lg sm:text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto mt-6">
                A clear user manual for you and your people.
                <br className="hidden sm:block" />
                <span className="text-white/90">What drains you. What restores you. What keeps you stable.</span>
              </p>

              {/* Trust signal */}
              <p className="text-white/50 text-sm sm:text-base md:text-lg font-light max-w-3xl mx-auto mt-4">
                See how you run under stress — and what keeps the system from spinning out.
              </p>
            </div>
          </h1>

          {/* Subheadline - The promise */}
          <div className="opacity-0 animate-[fadeReveal_1.5s_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] mt-10 sm:mt-16 max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 font-light leading-relaxed mb-4 sm:mb-6">
              We don't do vibes or diagnosis.
              <br className="hidden sm:block" />
              <span className="text-white">We show the mechanics: where the pressure is, where the friction is, and what stabilizes it.</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
              No more guessing. No more feeling lost.<br className="hidden sm:block" />
              Just a short, plain-language manual you can actually use.
            </p>
          </div>

          {/* Methodology badges - Mantra-focused */}
          <div className="opacity-0 animate-[fadeReveal_1.5s_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] mt-10 sm:mt-14">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
              <div className="group relative px-6 py-3 rounded-full border-2 border-white/40 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wider uppercase">No Astrology, Astrology</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/60 whitespace-nowrap">NASA JPL topocentric precision</p>
                </div>
              </div>

              <div className="hidden sm:block text-2xl text-white/30 font-light">×</div>

              <div className="group relative px-6 py-3 rounded-full border-2 border-white/40 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                      <path d="M7 10h2v5H7zm4-3h2v8h-2z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wider uppercase">No Psychology, Psychology</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/60 whitespace-nowrap">Mechanical transparency · Not diagnosis</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-lg mx-auto">
              <Link
                to="/start"
                onClick={() => trackEvent(AnalyticsEvents.GENERATE_MANUAL_CLICK)}
                className="w-full h-14 flex items-center justify-center bg-white text-black text-xs sm:text-sm tracking-[0.2em] font-bold hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] uppercase"
              >
                Generate Manual
              </Link>
              <Link
                to="/signin"
                onClick={() => trackEvent(AnalyticsEvents.MEMBER_LOGIN_CLICK)}
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
            <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-white/70 mb-10 sm:mb-12 border-l-2 border-white/50 pl-4 uppercase">
              The Friction
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-16 sm:mb-20 leading-[1.1]">
              Why does it feel like<br className="hidden sm:block" />
              <span className="text-white/60">you're speaking</span><br className="hidden sm:block" />
              <span className="text-white">different languages</span>?
            </h2>

            <div className="space-y-8 sm:space-y-12 text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl">
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-white/40 transition-all duration-300">
                <span className="text-white/50">You try to connect.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-gray-100 transition-colors">They pull away.</span>
              </p>
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-white/40 transition-all duration-300">
                <span className="text-white/50">You ask for clarity.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-gray-100 transition-colors">They get defensive.</span>
              </p>
              <p className="pl-6 sm:pl-8 border-l-2 border-white/10 group hover:border-white/40 transition-all duration-300">
                <span className="text-white/50">You give them space.</span>
                <span className="block mt-3 text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-gray-100 transition-colors">They say you don't care.</span>
              </p>
            </div>

            <div className="mt-16 sm:mt-24 pl-6 sm:pl-10 border-l-2 border-white/60 bg-gradient-to-r from-white/5 to-transparent py-6 sm:py-8 pr-6">
              <span className="block text-white text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-4 opacity-90">The Truth</span>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
                It's not that you're <span className="text-white/60">incompatible</span>.<br />
                You're running on different<br className="hidden sm:block" />
                <span className="font-normal text-white bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">operating systems</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE SECTION - ELEVATED */}
      <section className="h-screen w-full snap-start flex items-center py-12 sm:py-20 relative overflow-hidden border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-white/70 mb-10 sm:mb-12 border-l-2 border-white/50 pl-4 uppercase">
                How It Works
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] mb-10 sm:mb-12 text-white">
                We look at<br />
                <span className="text-white font-normal">each person's design specification</span><br />
                <span className="text-white/60">underneath the stress response.</span>
              </h2>
              <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed max-w-xl">
                <p className="text-white/70">Most relationship advice focuses on <span className="text-white/40">what people do</span>.</p>
                <p className="text-2xl sm:text-3xl text-white font-light">We focus on <span className="text-white">why</span> they do it.</p>
                <p className="mt-8 sm:mt-10 text-base sm:text-lg text-white/50 leading-relaxed">DEFRAG maps how each person handles anxiety, stays connected under pressure, and shows up when things get hard.</p>
                <p className="text-white font-medium pl-6 border-l-2 border-white/40 text-xl sm:text-2xl">When you understand the person,<br />the behavior starts to make sense.</p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-[450px] relative shrink-0 group/diagram">
                {/* Outer glow */}
                <div className="absolute inset-[-20%] rounded-full bg-gradient-radial from-white/5 to-transparent animate-pulse duration-[5000ms]" />

                {/* Layer 5 - Triggers */}
                <div className="absolute inset-0 rounded-full border border-white/10 flex items-start justify-center pt-4 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.02] peer/l5 group">
                  <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase bg-black px-3 -mt-2 group-hover:text-white transition-colors">5. Triggers</span>
                  <div className="absolute inset-x-0 -bottom-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-white font-mono tracking-wider">EXTERNAL ENVIRONMENTAL STRESSORS</p>
                  </div>
                </div>

                {/* Layer 4 - Behaviors */}
                <div className="absolute inset-[15%] rounded-full border border-white/20 flex items-start justify-center pt-4 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.03] group">
                  <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase bg-black px-3 -mt-2 group-hover:text-white transition-colors">4. Behaviors</span>
                  <div className="absolute inset-x-0 -bottom-10 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-white font-mono tracking-wider">REACTIVE ACTION PATTERNS</p>
                  </div>
                </div>

                {/* Layer 3 - Needs */}
                <div className="absolute inset-[30%] rounded-full border border-white/30 flex items-start justify-center pt-4 transition-all duration-300 hover:border-white/60 hover:bg-white/[0.05] group">
                  <span className="text-[10px] tracking-[0.25em] text-white/80 uppercase bg-black px-3 -mt-2 group-hover:text-white transition-colors">3. Needs</span>
                  <div className="absolute inset-x-0 -bottom-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-white font-mono tracking-wider">ESSENTIAL SAFETY REQUIREMENTS</p>
                  </div>
                </div>

                {/* Layer 2 - Fears */}
                <div className="absolute inset-[45%] rounded-full border border-white/50 bg-white/[0.02] flex items-start justify-center pt-4 transition-all duration-300 hover:border-white/80 hover:bg-white/[0.08] group">
                  <span className="text-[10px] tracking-[0.25em] text-white uppercase bg-black px-3 -mt-2">2. Fears</span>
                  <div className="absolute inset-x-0 -bottom-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-white font-mono tracking-wider">PRIMAL INSTINCTUAL DEFENSES</p>
                  </div>
                </div>

                {/* Layer 1 - Core */}
                <div className="absolute inset-[60%] rounded-full bg-white flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-500 group">
                  <span className="text-black text-xs sm:text-sm font-bold tracking-widest uppercase">1. Core</span>
                  <div className="absolute inset-x-0 -bottom-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <p className="text-[11px] text-white font-mono tracking-wider">INNATE COGNITIVE ARCHITECTURE</p>
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

      {/* OFFERINGS GRID - 4 SEPARATE PRODUCTS */}
      <section className="min-h-screen w-full snap-start flex items-center py-16 sm:py-24 relative border-t border-white/5 bg-black">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white font-light text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
              DEFRAG Offerings
            </h2>
            <p className="text-white/50 text-lg sm:text-xl max-w-3xl mx-auto">
              Four tools. One clinical firewall. Choose what you need.
            </p>
          </div>

          {/* 4-Tile Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* TILE 1: ECHO */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col hover:border-white/30 transition-all">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📄</span>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-light mb-2">ECHO</h3>
                <p className="text-white text-sm font-mono">Personal Design Specification</p>
              </div>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                Understand your operating system. One-time User Manual with Gates, Environmental Pressure profiles, and pressure response protocols.
              </p>
              <div className="space-y-3">
                <Link
                  to="/echo"
                  className="block w-full px-4 py-3 bg-white text-black text-sm font-mono rounded hover:bg-gray-100 transition text-center"
                >
                  Generate Manual ($29)
                </Link>
                <span className="block text-center text-white/40 text-xs font-mono">29 one-time</span>
              </div>
            </div>

            {/* TILE 2: SIGNAL */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col opacity-75">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center mb-4">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-light mb-2">SIGNAL</h3>
                <p className="text-white text-sm font-mono">Design-Aware Conflict De-escalation</p>
              </div>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                Real-time message revision. Removes Entropy Markers before they trigger relational collapse. Design-aware keyboard app.
              </p>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 border border-white/50 text-white text-sm font-mono rounded opacity-50 cursor-not-allowed">
                  Coming Soon
                </button>
                <span className="block text-center text-white/60 text-xs font-mono">Planned price: 9 / month</span>
              </div>
            </div>

            {/* TILE 3: ORBIT */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col hover:border-white/30 transition-all">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🔗</span>
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-light mb-2">ORBIT</h3>
                <p className="text-white text-sm font-mono">Relational Geometry System</p>
              </div>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                Multi-person system mapping. Identify friction, pressure points, and triangulation patterns in families or teams. NASA JPL precision.
              </p>
              <div className="space-y-3">
                <Link
                  to="/relational"
                  className="block w-full px-4 py-3 bg-white text-black text-sm font-mono rounded hover:bg-gray-100 transition text-center"
                >
                  Map Your System ($39)
                </Link>
                <span className="block text-center text-white/40 text-xs font-mono">39 per group · Up to 6 people</span>
              </div>
            </div>

            {/* TILE 4: API - Builder (testing) */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col opacity-80">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center mb-4">
                  <span className="text-white text-xl">⚙️</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white text-xl sm:text-2xl font-light">DEFRAG API</h3>
                  <span className="text-[9px] font-mono tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 uppercase">Testing</span>
                </div>
                <p className="text-white text-sm font-mono">Builder (testing)</p>
              </div>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
                Currently in private testing. Safety scores, pressure scores, and basic group mapping.
              </p>
              <p className="text-white/40 text-xs leading-relaxed mb-6">
                Up to 5,000 calls a month while we're in testing.
              </p>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 border border-white/10 text-white/50 text-sm font-mono rounded cursor-not-allowed">
                  Not Open Yet
                </button>
                <span className="block text-center text-white/30 text-xs font-mono">From 99 / month</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SEDA SAFETY FIRST SECTION - NEW */}
      <section className="h-screen w-full snap-start flex items-center py-12 sm:py-20 relative border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-white/70 mb-10 sm:mb-12 border-l-2 border-white/50 pl-4 uppercase">
              Safety First
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-10 sm:mb-12 text-white">
              We don't diagnose.
              <br />
              <span className="text-white font-normal">We provide mechanical transparency.</span>
            </h2>

            {/* SEDA Threshold Chart */}
            <div className="mb-12 sm:mb-16">
              <h3 className="text-xl sm:text-2xl text-white/80 font-light mb-8">SEDA Safety Firewall</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { range: "61–75", label: "Optimal", color: "green", desc: "High narrative clarity" },
                  { range: "46–60", label: "Stable", color: "blue", desc: "Moderate integration" },
                  { range: "30–45", label: "Caution", color: "yellow", desc: "Dual diagnosis risk" },
                  { range: "<30", label: "Clinical Crisis", color: "red", desc: "Graceful degradation" },
                ].map((threshold) => (
                  <div
                    key={threshold.range}
                    className={`p-6 rounded-xl border ${threshold.color === 'green' ? 'border-green-500/30 bg-green-500/5' :
                      threshold.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5' :
                        threshold.color === 'yellow' ? 'border-yellow-500/30 bg-yellow-500/5' :
                          'border-red-500/30 bg-red-500/5'
                      }`}
                  >
                    <div className={`text-3xl font-bold mb-2 ${threshold.color === 'green' ? 'text-green-400' :
                      threshold.color === 'blue' ? 'text-blue-400' :
                        threshold.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                      }`}>
                      {threshold.range}
                    </div>
                    <div className="text-white font-medium text-sm mb-1">{threshold.label}</div>
                    <p className="text-white/50 text-xs">{threshold.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Crisis Protocol */}
            <div className="pl-6 sm:pl-10 border-l-2 border-white/60 bg-gradient-to-r from-white/5 to-transparent py-6 sm:py-8 pr-6 mb-10">
              <span className="block text-white text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-4 opacity-90">Crisis Protocol</span>
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-tight mb-4">
                When your safety score falls below 30, we <span className="text-white">gracefully degrade</span>.
              </p>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                Instead of esoteric analysis, we shift focus to <span className="text-white">somatic grounding</span>: sleep, hydration, and physical stabilization. We provide the transparency that enables self-governance, not diagnosis.
              </p>
            </div>

            {/* Supportive Tone */}
            <blockquote className="border-l-2 border-white/20 pl-6 sm:pl-8 py-4">
              <p className="text-lg sm:text-xl font-light text-white/70 italic">
                "Things feel intense right now. Let's pause the deep work and focus on getting you settled. We'll find clarity together once you're grounded."
              </p>
              <p className="text-sm text-white/40 mt-3 font-mono">— DEFRAG Safety Protocol</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="w-full snap-start flex flex-col pt-16 pb-10 relative border-t border-white/5 bg-black">
        <div className="max-w-5xl w-full mx-auto px-6 sm:px-12 text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Ready to build clarity?
          </h2>
          <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto">
            Start with your Personal Design Specification or explore multi-person system mapping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start"
              className="inline-flex h-14 px-12 items-center justify-center bg-white text-black font-bold hover:bg-gray-100 transition-all rounded-lg uppercase"
            >
              Generate Manual
            </Link>
            <Link
              to="/relational"
              className="inline-flex h-14 px-12 items-center justify-center border border-white/20 text-white/80 text-sm tracking-[0.2em] font-medium hover:bg-gray-100 hover:text-black transition-all rounded-lg uppercase"
            >
              Explore ORBIT
            </Link>
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
            <div className="hidden sm:block text-[9px] text-white/10 font-mono">DEFRAG PLATFORM</div>
          </div>
        </footer>
      </section>

    </div>
  );
}
