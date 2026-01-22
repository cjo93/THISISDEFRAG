
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
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth selection:bg-orange-500/20">

      {/* Nav */}
      <Header />

      {/* HERO */}
      <section
        className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Animated gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax]"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.04) 30%, transparent 60%)',
              transform: `translate(-50%, -50%) scale(${heroScale})`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-12 sm:pt-0">

          <h1 className="mb-8 sm:mb-12">
            <span className="block text-white/50 text-xs sm:text-sm tracking-[0.25em] font-mono uppercase mb-6 sm:mb-8 font-medium">
              The Instruction Manual For
            </span>
            <span
              className={`
                block text-orange-500 font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] min-h-[1.2em] px-2 relative
                transition-all duration-500 ease-out
                ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md'}
              `}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4">
            Decode their behavior. De-escalate conflict. Connect deeply.<br className="hidden sm:block" />
            <span className="text-white/40 text-sm sm:text-base mt-4 block font-normal tracking-wide">Grounded in NASA data & clinical psychology.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-lg mx-auto">
            <Link
              to="/start"
              className="w-full h-14 sm:h-14 flex items-center justify-center bg-orange-500 text-black text-xs sm:text-sm tracking-[0.15em] font-bold hover:bg-orange-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.2)] uppercase"
            >
              Generate Manual
            </Link>
            <Link
              to="/signin"
              className="w-full h-14 sm:h-14 flex items-center justify-center border border-white/20 text-white/70 text-xs sm:text-sm tracking-[0.15em] font-medium hover:border-white/50 hover:text-white transition-all duration-200 rounded-lg backdrop-blur-sm uppercase"
            >
              Member Login
            </Link>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce delay-1000 duration-[2000ms]">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* THE PROBLEM - Snap Section */}
      <section className="min-h-screen w-full snap-start flex items-center py-20 relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="max-w-4xl">
            <span className="inline-block text-xs font-mono tracking-widest text-orange-400/80 mb-8 border-l border-orange-500/50 pl-3 uppercase">
              The Friction
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-16 leading-[1.15]">
              Why does it feel like you're<br className="hidden sm:block" /> speaking different languages?
            </h2>

            <div className="space-y-10 text-xl sm:text-2xl font-light leading-relaxed text-white/60">
              <p className="pl-6 border-l border-white/10 group hover:border-white/30 transition-colors">
                You try to connect. <span className="text-white block mt-2 sm:mt-0 sm:inline group-hover:text-orange-100 transition-colors">They pull away.</span>
              </p>
              <p className="pl-6 border-l border-white/10 group hover:border-white/30 transition-colors">
                You ask for clarity. <span className="text-white block mt-2 sm:mt-0 sm:inline group-hover:text-orange-100 transition-colors">They get defensive.</span>
              </p>
              <p className="pl-6 border-l border-white/10 group hover:border-white/30 transition-colors">
                It's not that you're incompatible.<br />
                It's that you're running on different <span className="text-orange-400/90 font-normal">operating systems</span>.
              </p>
            </div>

            <div className="mt-20 pl-6 sm:pl-10 border-l border-orange-500/50">
              <span className="block text-orange-400 text-xs font-mono tracking-widest uppercase mb-3 opacity-80">The Result</span>
              <p className="text-2xl sm:text-3xl text-white font-normal leading-tight">Without a manual, every error feels personal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHIFT - Snap Section */}
      <section className="min-h-screen w-full snap-start flex items-center py-20 relative overflow-hidden border-t border-white/5 bg-zinc-950/20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs font-mono tracking-widest text-orange-400/80 mb-8 border-l border-orange-500/50 pl-3 uppercase">
                The Architecture
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.05] mb-10 text-white">
                We map the<br />
                <span className="text-orange-500 font-normal">5 Invisible Layers</span><br />
                of their nature.
              </h2>
              <div className="space-y-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
                <p>
                  Most advice focuses on behaviors (Layer 4). But behaviors are just symptoms.
                </p>
                <p>
                  DEFRAG digs deeper—to the core nature of how they process emotion, handle stress, and perceive safety.
                </p>
                <p className="text-white/90 font-medium pl-4 border-l-2 border-orange-500/20">
                  When you understand the root, you stop fighting the symptoms.
                </p>
              </div>
            </div>

            {/* Diagram */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-[500px] relative shrink-0">
                {/* Outer glow */}
                <div className="absolute inset-[-20%] rounded-full bg-gradient-radial from-orange-500/5 to-transparent animate-pulse delay-700 duration-[4000ms]" />

                {/* Layer 5 - Triggers */}
                <div className="absolute inset-0 rounded-full border border-white/10 flex items-start justify-center pt-4 transition-all hover:border-white/30 hover:bg-white/[0.02]">
                  <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase bg-black px-3 -mt-2">5. Triggers</span>
                </div>

                {/* Layer 4 - Behaviors */}
                <div className="absolute inset-[15%] rounded-full border border-white/20 flex items-start justify-center pt-4 transition-all hover:border-white/40 hover:bg-white/[0.02]">
                  <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase bg-black px-3 -mt-2">4. Behaviors</span>
                </div>

                {/* Layer 3 - Needs */}
                <div className="absolute inset-[30%] rounded-full border border-orange-500/30 flex items-start justify-center pt-4 transition-all hover:border-orange-500/50 hover:bg-orange-500/5">
                  <span className="text-[10px] tracking-[0.25em] text-orange-400/80 uppercase bg-black px-3 -mt-2">3. Needs</span>
                </div>

                {/* Layer 2 - Fears */}
                <div className="absolute inset-[45%] rounded-full border border-orange-500/50 bg-orange-500/[0.02] flex items-start justify-center pt-4 transition-all hover:bg-orange-500/10">
                  <span className="text-[10px] tracking-[0.25em] text-orange-400 uppercase bg-black px-3 -mt-2">2. Fears</span>
                </div>

                {/* Layer 1 - Core */}
                <div className="absolute inset-[60%] rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform duration-500 cursor-none">
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

      {/* MODULES - Snap Section */}
      <section className="min-h-screen w-full snap-start flex items-center py-20 relative border-t border-white/5">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12">

          <div className="mb-16 md:mb-24">
            <span className="inline-block text-xs font-mono tracking-widest text-orange-400/80 mb-8 border-l border-orange-500/50 pl-3 uppercase">
              Your Manual
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight">
              Everything you need to finally reach them.
            </h2>
            <p className="text-white/40 text-xs sm:text-sm tracking-[0.2em] font-mono uppercase">
              // Select a module to explore
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    group relative p-8 rounded-xl cursor-pointer transition-all duration-500 border
                    ${isActive
                      ? 'bg-orange-500 border-orange-500 text-black shadow-[0_0_40px_rgba(249,115,22,0.3)]'
                      : 'bg-white/[0.01] border-white/10 hover:border-orange-500/50 hover:bg-orange-500/[0.05]'
                    }
                  `}
                >
                  <div className="mb-8 flex justify-between items-start">
                    <span className={`text-xl font-light font-mono opacity-60 ${isActive ? 'text-black' : 'text-orange-500'}`}>
                      {item.num}
                    </span>
                    <span className={`text-2xl transition-transform duration-300 ${isActive ? 'rotate-45 text-black' : 'text-white/20 group-hover:text-white/60'}`}>
                      +
                    </span>
                  </div>

                  <h3 className={`text-lg font-medium mb-4 tracking-wide ${isActive ? 'text-black' : 'text-white'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${isActive ? 'text-black/80 font-medium' : 'text-white/50'}`}>
                    {isActive ? item.desc : item.short}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER / PRICING - Snap Section */}
      <section className="min-h-screen w-full snap-start flex flex-col justify-center py-20 relative border-t border-white/5 bg-zinc-950/30">
        <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-12 relative flex-grow flex flex-col justify-center">

          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-6xl font-light leading-[1.1] mb-6 text-white">
              Stop guessing.<br /><span className="text-white/40">Start understanding.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            {/* FREE */}
            <div className="p-8 border border-white/10 bg-black/40 rounded-2xl flex flex-col">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">Quick Insight</div>
              <div className="text-4xl font-light text-white mb-2">Free</div>
              <p className="text-sm text-white/50 mb-8 font-mono">Snapshot analysis</p>
              <ul className="space-y-4 text-sm text-white/60 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Core compatibility</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Trigger patterns</li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center border border-white/20 text-white/80 text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">
                Start Free
              </Link>
            </div>

            {/* FULL */}
            <div className="p-8 border border-orange-500 bg-orange-500/[0.05] rounded-2xl relative flex flex-col scale-[1.02] shadow-[0_0_50px_rgba(249,115,22,0.1)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-black text-[10px] tracking-[0.2em] font-bold rounded-full uppercase">
                Most Popular
              </div>
              <div className="text-[10px] tracking-[0.3em] text-orange-500 uppercase mb-4">Complete Manual</div>
              <div className="text-4xl font-light text-white mb-2">$19</div>
              <p className="text-sm text-orange-500/60 mb-8 font-mono">Full operating system</p>
              <ul className="space-y-4 text-sm text-white/80 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="text-orange-500">●</span> <b>Full Logic Breakdown</b></li>
                <li className="flex items-center gap-3"><span className="text-orange-500">●</span> <b>Complete Trigger Map</b></li>
                <li className="flex items-center gap-3"><span className="text-orange-500">●</span> <b>Recovery Scripts</b></li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center bg-orange-500 text-black text-xs tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-lg shadow-orange-500/20">
                Get Manual
              </Link>
            </div>

            {/* FAMILY */}
            <div className="p-8 border border-white/10 bg-black/40 rounded-2xl flex flex-col">
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">System Access</div>
              <div className="text-4xl font-light text-white mb-2">$29</div>
              <p className="text-sm text-white/50 mb-8 font-mono">Multi-profile account</p>
              <ul className="space-y-4 text-sm text-white/60 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Everything in Manual</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Add family members</li>
                <li className="flex items-center gap-3"><span className="text-orange-500">+</span> Comparative charts</li>
              </ul>
              <Link to="/start" className="w-full h-12 flex items-center justify-center border border-white/20 text-white/80 text-xs tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">
                Select
              </Link>
            </div>
          </div>
        </div>

        <footer className="w-full border-t border-white/5 mt-auto pt-8 pb-8 px-6 sm:px-12 bg-black">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 tracking-widest uppercase">
            <p>&copy; 2026 DEFRAG</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <a href="mailto:help@defrag.app" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </footer>
      </section>

    </div>
  );
}
