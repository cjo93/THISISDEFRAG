
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Pain-point language that triggers instant recognition
// Expanded to encompass broader relational dynamics
const ROTATING_WORDS = [
  "the partner who shuts you out",
  "the parent you can never please",
  "the teenager who became a stranger",
  "the one you walk on eggshells around",
  "the ex you still can't explain",
  "the person you're afraid to lose",
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0002;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-orange-500/20">

      {/* Nav */}
      <Header />

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
        {/* Clean background - removed grid pattern */}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-12 sm:pt-0">

          <h1 className="mb-8 sm:mb-10">
            <span className="block text-white/60 text-xs sm:text-sm tracking-[0.3em] font-mono uppercase mb-6 sm:mb-8 text-center">
              The Instruction Manual For
            </span>
            <span
              className={`
                block text-orange-500 font-normal text-4xl sm:text-6xl md:text-7xl tracking-tight leading-tight min-h-[1.2em] px-2
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'}
              `}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-12 leading-relaxed px-4">
            Decode their behavior. De-escalate conflict. Connect deeply.<br className="hidden sm:block" />
            <span className="text-white/50 text-sm sm:text-base mt-4 block font-normal tracking-wide">Grounded in NASA data & clinical psychology.</span>
          </p>

          {/* CTA Buttons - Standardized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full">
            <Link
              to="/start"
              className="w-full sm:w-auto h-14 px-8 flex items-center justify-center bg-orange-500 text-black text-sm tracking-widest font-bold hover:bg-orange-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              GENERATE MANUAL
            </Link>
            <Link
              to="/signin"
              className="w-full sm:w-auto h-14 px-8 flex items-center justify-center border border-white/20 text-white/70 text-sm tracking-widest font-medium hover:border-white/50 hover:text-white transition-all duration-200 rounded-lg backdrop-blur-sm"
            >
              LOG IN
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-white/30 tracking-[0.2em] font-mono uppercase">
            <span>Instant Analysis</span>
            <span className="text-orange-500/50">•</span>
            <span>Secure & Private</span>
          </div>
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
              The Friction
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
              Why does it feel like you're speaking different languages?
            </h2>

            <div className="space-y-8 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/70">
              <p className="pl-6 border-l border-white/10">
                You try to connect. <span className="text-white block mt-1 sm:inline">They pull away.</span>
              </p>
              <p className="pl-6 border-l border-white/10">
                You ask for clarity. <span className="text-white block mt-1 sm:inline">They get defensive.</span>
              </p>
              <p className="pl-6 border-l border-white/10">
                It's not that you're incompatible.<br />
                It's that you're running on different <span className="text-white border-b border-orange-500/50 pb-0.5">operating systems</span>.
              </p>
            </div>

            <div className="mt-16 pl-6 sm:pl-12 border-l border-orange-500/50">
              <span className="block text-orange-400 text-xs font-mono tracking-widest uppercase mb-2">The Result</span>
              <p className="text-xl sm:text-2xl text-white font-normal">Without a manual, every error feels personal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHIFT (5 Invisible Layers) */}
      <section className="py-28 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent" />
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 relative">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-16 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 border-l-2 border-orange-500 pl-4 font-medium">
                The Architecture
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.1] mb-8 text-white">
                We map the<br />
                <span className="text-orange-400 font-normal">5 Invisible Layers</span><br />
                of their internal nature.
              </h2>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md mb-6">
                Most advice focuses on behaviors (Layer 4). But behaviors are just symptoms.
              </p>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md mb-6">
                DEFRAG digs deeper—to the core nature of how they process emotion, handle stress, and perceive safety.
              </p>
              <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-md">
                When you understand the root, you stop fighting the symptoms.
              </p>
            </div>

            {/* Diagram */}
            <div className="relative order-1 lg:order-2 flex justify-center">
              <div className="aspect-square w-full max-w-[500px] relative">
                {/* Outer glow */}
                <div className="absolute inset-[-20%] rounded-full bg-gradient-radial from-orange-500/5 to-transparent" />

                {/* Layer 5 - Triggers */}
                <div className="absolute inset-0 rounded-full border border-white/10 flex items-start justify-center pt-4">
                  <span className="text-xs tracking-[0.25em] text-white/40 uppercase bg-black px-3 -mt-3.5">5. Triggers</span>
                </div>

                {/* Layer 4 - Behaviors */}
                <div className="absolute inset-[15%] rounded-full border border-white/20 flex items-start justify-center pt-4">
                  <span className="text-xs tracking-[0.25em] text-white/60 uppercase bg-black px-3 -mt-3.5">4. Behaviors</span>
                </div>

                {/* Layer 3 - Needs */}
                <div className="absolute inset-[30%] rounded-full border border-orange-500/30 flex items-start justify-center pt-4">
                  <span className="text-xs tracking-[0.25em] text-orange-400/80 uppercase bg-black px-3 -mt-3.5">3. Needs</span>
                </div>

                {/* Layer 2 - Fears */}
                <div className="absolute inset-[45%] rounded-full border border-orange-500/50 bg-orange-500/[0.02] flex items-start justify-center pt-4">
                  <span className="text-xs tracking-[0.25em] text-orange-400 uppercase bg-black px-3 -mt-3.5">2. Fears</span>
                </div>

                {/* Layer 1 - Core */}
                <div className="absolute inset-[60%] rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.4)]">
                  <span className="text-black text-sm font-bold tracking-widest uppercase">1. Core</span>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -z-10" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5 -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT YOU GET (Interactive) */}
      <section className="py-28 sm:py-40">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12">

          <div className="mb-16">
            <span className="inline-block text-xs tracking-[0.4em] text-orange-400 uppercase mb-10 border-l-2 border-orange-500 pl-4 font-medium">
              Your Manual
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white mb-6">
              Everything you need to finally reach them.
            </h2>
            <p className="text-white/50 text-sm tracking-wide">
              TAP EACH MODULE TO EXPLORE
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Operating Logic",
                short: "Why they operate the way they do.",
                desc: "Decode their internal processing. Do they need specific instructions or open space? Do they process internally or externally? Understand the nature so you can stop fighting the design."
              },
              {
                num: "02",
                title: "Trigger Map",
                short: "The exact words that cause shutdown.",
                desc: "A specific map of what triggers their defense mechanisms. Learn the exact phrases that cause them to withdraw or attack, and the alternative words that land safely."
              },
              {
                num: "03",
                title: "Safety Protocols",
                short: "How to make them feel safe.",
                desc: "Security is different for everyone. Some need consistency, others need freedom. Discover the specific conditions that allow their system to drop its defenses and connect."
              },
              {
                num: "04",
                title: "Recovery Scripts",
                short: "What to say when it breaks.",
                desc: "Don't improvise during a crash. Use pre-calculated repair scripts designed for their specific architecture. Learn exactly how to reset the connection after a conflict."
              },
            ].map((item, index) => {
              const isActive = activeManualItem === index;
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveManualItem(isActive ? null : index)}
                  className={`
                    relative p-6 sm:p-8 rounded-xl cursor-pointer transition-all duration-500 overflow-hidden
                    ${isActive
                      ? 'bg-orange-500 border-orange-500 text-black'
                      : 'bg-white/[0.02] border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/[0.04]'
                    }
                  `}
                >
                  <div className="mb-6 flex justify-between items-start">
                    <span className={`text-2xl font-light transition-colors ${isActive ? 'text-black/40' : 'text-orange-500/80'}`}>
                      {item.num}
                    </span>
                    <span className={`text-lg transition-transform duration-300 ${isActive ? 'rotate-45 text-black' : 'text-white/20'}`}>
                      +
                    </span>
                  </div>

                  <h3 className={`text-lg font-medium mb-3 transition-colors ${isActive ? 'text-black' : 'text-white'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-black/80' : 'text-white/60'}`}>
                    {isActive ? item.desc : item.short}
                  </p>

                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10">
                      <span className="text-orange-400 text-xs tracking-widest font-mono bg-black/80 px-3 py-1 rounded-none border-b border-orange-500/30">READ MORE</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUILT ON */}
      <section className="py-24 sm:py-32 border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12">

          {/* Clinical Psychology Highlight */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
              <span className="text-orange-400 text-lg font-bold font-mono">DATA</span>
              <span className="text-sm tracking-[0.15em] text-orange-300 font-medium">GROUNDED IN CLINICAL PSYCHOLOGY</span>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Every insight is guided by established therapeutic frameworks not generic horoscopes.
              We use birth data as a <span className="text-white/90">pattern-mapping tool</span>, not fortune telling.
            </p>
          </div>

          {/* Frameworks */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm tracking-[0.1em] text-white/50 mb-10">
            <span className="text-orange-400">Bowen Family Systems</span>
            <span className="text-white/30">◦</span>
            <span className="text-orange-400">Attachment Theory</span>
            <span className="text-white/30">◦</span>
            <span>NASA JPL Ephemeris</span>
            <span className="text-white/30">◦</span>
            <span>Human Design</span>
          </div>

          {/* No-BS Astrology Differentiator */}
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
              Not your typical astrology. No vague predictions. No "mercury retrograde" excuses.
            </p>
            <p className="text-sm text-white/60 mt-2">
              Just <span className="text-white">actionable relationship intelligence</span> you can use today.
            </p>
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

      {/* PRICING */}
      <section className="py-32 sm:py-48 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.05] to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative">

          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-light leading-[1.15] mb-4 text-white">
              Stop guessing. Start understanding.
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Choose the depth that fits your needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">

            {/* FREE */}
            <div className="p-6 sm:p-8 border border-white/10 bg-white/[0.02] rounded-xl">
              <div className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Quick Insight</div>
              <div className="text-3xl sm:text-4xl font-light text-white mb-2">Free</div>
              <p className="text-sm text-white/50 mb-8">A snapshot of your dynamic</p>
              <ul className="space-y-3 text-sm text-white/60 mb-8">
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Core compatibility overview</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Basic trigger patterns</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> One communication tip</li>
              </ul>
              <Link
                to="/start"
                className="block w-full h-12 flex items-center justify-center border border-white/20 text-white/70 text-xs tracking-[0.15em] font-medium hover:border-orange-500/50 hover:text-orange-400 transition rounded-lg"
              >
                GET FREE INSIGHT
              </Link>
            </div>

            {/* DEEP MANUAL - Highlighted */}
            <div className="p-6 sm:p-8 border-2 border-orange-500/50 bg-orange-500/[0.05] rounded-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-black text-xs tracking-[0.2em] font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-xs tracking-[0.3em] text-orange-400 uppercase mb-4">Complete Manual</div>
              <div className="text-3xl sm:text-4xl font-light text-white mb-2">$19</div>
              <p className="text-sm text-white/50 mb-8">One-time purchase, emailed to you</p>
              <ul className="space-y-3 text-sm text-white/70 mb-8">
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Full operating logic breakdown</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Complete trigger map</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Scripts for difficult moments</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> PDF manual delivered by email</li>
              </ul>
              <Link
                to="/start"
                className="block w-full h-12 flex items-center justify-center bg-orange-500 text-black text-xs tracking-[0.15em] font-bold hover:bg-orange-400 transition rounded-lg"
              >
                GET YOUR MANUAL
              </Link>
            </div>

            {/* FAMILY SYSTEMS */}
            <div className="p-6 sm:p-8 border border-white/10 bg-white/[0.02] rounded-xl">
              <div className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">You + Your People</div>
              <div className="text-3xl sm:text-4xl font-light text-white mb-2">$29</div>
              <p className="text-sm text-white/50 mb-8">One 1:1 Manual + Family System Login</p>
              <ul className="space-y-3 text-sm text-white/60 mb-8">
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Everything in Complete Manual</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Account login for future access</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Add family members later</li>
                <li className="flex items-start gap-3"><span className="text-orange-400 font-mono">+</span> Compare multiple charts</li>
              </ul>
              <Link
                to="/start"
                className="block w-full h-12 flex items-center justify-center border border-white/20 text-white/70 text-xs tracking-[0.15em] font-medium hover:border-orange-500/50 hover:text-orange-400 transition rounded-lg"
              >
                SELECT OPTION
              </Link>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/40 mt-12 tracking-[0.1em]">
            <span>Instant Delivery</span>
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
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <span className="text-sm text-white/30">
              2026 DEFRAG. All rights reserved.
            </span>
            <a
              href="mailto:info@defrag.app"
              className="text-sm text-white/40 hover:text-orange-400 transition"
            >
              info@defrag.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
