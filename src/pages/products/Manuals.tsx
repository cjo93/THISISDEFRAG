
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { trackEvent, AnalyticsEvents, initScrollTracking, ConversionFunnel } from '../../lib/analytics';
import { ArrowRight, User, Users, Cpu, ShieldCheck, Microscope, Database, Terminal, Zap, Info, AlertTriangle } from 'lucide-react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setIsVisible(true);
      }, 300);
    }, 2800);

    ConversionFunnel.step1_landing();
    initScrollTracking();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
    <div id="landing-container" className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth selection:bg-white/10">

      {/* Nav */}
      <Header />

      {/* HERO SECTION - MONOCHROME INDUSTRIAL */}
      <section
        className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden bg-black"
        style={{ opacity: heroOpacity }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 70%)',
              transform: `translate(-50%, -50%) scale(${heroScale})`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          <div className="opacity-0 animate-[fadeReveal_1.5s_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] space-y-12">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter leading-[0.9] text-white uppercase italic">
              Stop repeating <br />
              <span className="text-white/30 italic">the same fight.</span>
            </h1>

            <p className="text-2xl sm:text-4xl text-white/40 font-light max-w-4xl mx-auto leading-relaxed italic pr-4">
              A plain-language manual for you and your people. Identify the baseline mechanics of your stability and friction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-24 max-w-lg mx-auto">
              <Link
                to="/start"
                onClick={() => trackEvent(AnalyticsEvents.GENERATE_MANUAL_CLICK)}
                className="w-full h-20 flex items-center justify-center bg-white text-black text-[10px] tracking-[0.4em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full shadow-2xl uppercase"
              >
                Start_Analysis
              </Link>
              <Link
                to="/signin"
                onClick={() => trackEvent(AnalyticsEvents.MEMBER_LOGIN_CLICK)}
                className="w-full h-20 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/40 text-[10px] tracking-[0.4em] font-bold hover:bg-white/5 hover:text-white transition-all duration-700 rounded-full uppercase"
              >
                Authenticate
              </Link>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-center gap-10 text-[10px] text-white/10 tracking-[0.5em] font-mono uppercase italic opacity-0 animate-[fadeReveal_1.5s_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]"></div>
              <span>Live_Telemetry</span>
            </div>
            <div>|</div>
            <span>Encrypted_Node</span>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-10 animate-bounce">
          <span className="text-[10px] tracking-[0.6em] uppercase italic font-mono">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* THE FRICTION SECTION - MONOCHROME */}
      <section className="h-screen w-full snap-start flex items-center py-24 relative border-t border-white/5 bg-black">
        <div className="max-w-[1400px] w-full mx-auto px-12 relative z-10">
          <div className="max-w-6xl">
            <span className="inline-block text-[10px] font-mono tracking-[0.6em] text-white/20 mb-16 border-l border-white/10 pl-6 uppercase italic">
              System_Entropy
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-light text-white mb-24 leading-[0.9] tracking-tighter uppercase italic">
              Different <br />
              <span className="text-white/30">Operating</span> <br />
              Systems.
            </h2>

            <div className="space-y-12 text-2xl sm:text-4xl font-light leading-none tracking-tight max-w-4xl italic">
              <p className="pl-10 border-l border-white/5 group hover:border-white/20 transition-all duration-700 py-4">
                <span className="text-white/20 block mb-4 uppercase text-[10px] font-mono tracking-widest italic">Node_Alpha</span>
                <span className="text-white/40">You synchronize.</span>
                <span className="block mt-4 text-white group-hover:text-white transition-colors lowercase">they de-couple.</span>
              </p>
              <p className="pl-10 border-l border-white/5 group hover:border-white/20 transition-all duration-700 py-4">
                <span className="text-white/20 block mb-4 uppercase text-[10px] font-mono tracking-widest italic">Node_Beta</span>
                <span className="text-white/40">You seek telemetry.</span>
                <span className="block mt-4 text-white group-hover:text-white transition-colors lowercase">they trigger firewall.</span>
              </p>
            </div>

            <div className="mt-28 pl-12 border-l-2 border-white/10 bg-white/[0.01] py-12 pr-12 max-w-3xl rounded-r-[64px]">
              <span className="block text-white/20 text-[10px] font-mono tracking-[0.6em] uppercase mb-8 italic">CORE_REALITY</span>
              <p className="text-3xl sm:text-5xl text-white font-light leading-[1.1] tracking-tighter uppercase">
                It is not <span className="text-white/30 italic">incompatibility</span>. <br />
                It is undocumented <br />
                <span className="text-white italic">mechanics.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE SECTION - MONOCHROME */}
      <section className="h-screen w-full snap-start flex items-center py-24 relative overflow-hidden border-t border-white/5 bg-zinc-950">
        <div className="max-w-[1400px] w-full mx-auto px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <span className="inline-block text-[10px] font-mono tracking-[0.6em] text-white/20 border-l border-white/10 pl-6 uppercase italic">
                Architectural_Method
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-light leading-[0.9] text-white uppercase italic tracking-tighter">
                Mapping the <br />
                <span className="text-white/30">Node Specification</span>
              </h2>
              <div className="space-y-12 text-2xl text-white/30 font-light leading-relaxed max-w-xl italic">
                <p>Advice focuses on <span className="text-white">what</span> people do.</p>
                <p className="text-white/60">We focus on the <span className="text-white underline decoration-white/20 underline-offset-8 uppercase">Machine Logic</span> underneath the behavior.</p>
                <p className="text-lg">DEFRAG maps how each node handles pressure, stays synchronized, and operates when the system load is high.</p>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-[500px] relative group/diagram">
                {/* Visual Layers — Industrial Monochrome */}
                {[
                  { label: "5. Triggers", opacity: "border-white/5", pos: "inset-0" },
                  { label: "4. Behaviors", opacity: "border-white/10", pos: "inset-[12%]" },
                  { label: "3. Needs", opacity: "border-white/20", pos: "inset-[24%]" },
                  { label: "2. Fears", opacity: "border-white/30", pos: "inset-[36%]" }
                ].map((l, i) => (
                  <div key={i} className={`absolute ${l.pos} rounded-full border ${l.opacity} flex items-start justify-center pt-6 transition-all duration-700 hover:bg-white/[0.02] hover:border-white/40 group`}>
                    <span className="text-[9px] font-mono tracking-[0.5em] text-white/10 uppercase italic bg-black/50 backdrop-blur-sm px-4 -mt-3.5 group-hover:text-white transition-colors">{l.label}</span>
                  </div>
                ))}

                {/* Core Node */}
                <div className="absolute inset-[48%] rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group hover:scale-105 transition-all duration-700">
                  <span className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">Core</span>
                </div>

                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.03]" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.03]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS GRID */}
      <section className="min-h-screen w-full snap-start flex items-center py-32 relative border-t border-white/5 bg-black">
        <div className="max-w-7xl w-full mx-auto px-12">
          <div className="text-center mb-32 space-y-8">
            <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase italic block">System_Offerings</span>
            <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter uppercase italic">The DEFRAG Suite</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ECHO */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-12 flex flex-col hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group">
              <div className="mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <Terminal size={24} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-light text-white mb-2 uppercase tracking-tight">ECHO</h3>
                <p className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase italic">Individual_Spec</p>
              </div>
              <p className="text-white/30 text-base leading-relaxed mb-12 flex-grow italic">One-time protocol generation. Understand your mechanical triggers and decision architecture.</p>
              <div className="space-y-4">
                <Link to="/echo" className="block w-full h-16 bg-white text-black text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-slate-200 transition-all flex items-center justify-center uppercase">Generate_Manual</Link>
                <span className="block text-center text-white/10 text-[9px] font-mono tracking-widest uppercase">$29 One-Time</span>
              </div>
            </div>

            {/* SIGNAL */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-12 flex flex-col opacity-40 grayscale group">
              <div className="mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                  <Zap size={24} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-light text-white mb-2 uppercase tracking-tight">SIGNAL</h3>
                <p className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase italic italic">Context_Revision</p>
              </div>
              <p className="text-white/30 text-base leading-relaxed mb-12 flex-grow italic">Real-time message filtering. Removes entropy markers before they trigger relational collapse.</p>
              <div className="space-y-4">
                <button className="w-full h-16 border border-white/5 bg-white/[0.02] text-white/20 text-[10px] font-bold tracking-[0.4em] rounded-full cursor-not-allowed uppercase">Pending_Q2</button>
                <span className="block text-center text-white/10 text-[9px] font-mono tracking-widest uppercase">$9 / Cycle</span>
              </div>
            </div>

            {/* ORBIT */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-12 flex flex-col hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group">
              <div className="mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <Users size={24} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-light text-white mb-2 uppercase tracking-tight">ORBIT</h3>
                <p className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase italic">Relational_Map</p>
              </div>
              <p className="text-white/30 text-base leading-relaxed mb-12 flex-grow italic">Multi-person system geometry. Identify friction points and stabilize group architectures.</p>
              <div className="space-y-4">
                <Link to="/relational" className="block w-full h-16 bg-white text-black text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-slate-200 transition-all flex items-center justify-center uppercase">Map_System</Link>
                <span className="block text-center text-white/10 text-[9px] font-mono tracking-widest uppercase">$39 One-Time</span>
              </div>
            </div>

            {/* API */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-12 flex flex-col opacity-60">
              <div className="mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                  <Cpu size={24} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-light text-white mb-2 uppercase tracking-tight">API</h3>
                <p className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase italic italic italic">Builder_Alpha</p>
              </div>
              <p className="text-white/30 text-base leading-relaxed mb-12 flex-grow italic">Custom protocol integration. High-precision SEDA safety gating for private systems.</p>
              <div className="space-y-4">
                <Link to="/developer" className="block w-full h-16 border border-white/10 bg-white/[0.02] text-white/40 text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-white/10 hover:text-white transition-all flex items-center justify-center uppercase">Enter_Dashboard</Link>
                <span className="block text-center text-white/10 text-[9px] font-mono tracking-widest uppercase">From $99 / Cycle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY SECTION */}
      <section className="h-screen w-full snap-start flex items-center py-24 relative border-t border-white/5 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-12 text-center space-y-24">
          <div className="space-y-8">
            <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase italic block">Safety_First</span>
            <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter uppercase italic">Mechanical Transparency.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { range: "61–75", label: "Optimal", desc: "High system clarity" },
              { range: "46–60", label: "Stable", desc: "Standard integration" },
              { range: "30–45", label: "Caution", desc: "Entropy increasing" },
              { range: "<30", label: "Crisis", desc: "System de-sync" },
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group">
                <div className="text-4xl font-light text-white mb-4 italic tracking-tighter group-hover:scale-110 transition-transform">{t.range}</div>
                <div className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mb-4 italic">{t.label}</div>
                <p className="text-white/20 text-xs italic">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-16 border border-white/5 bg-black rounded-[64px] max-w-4xl mx-auto relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono tracking-[0.5em] mb-10 uppercase italic">
                <AlertTriangle size={14} strokeWidth={1} />
                Crisis_Protocol
              </div>
              <p className="text-2xl sm:text-4xl text-white/60 font-light italic leading-tight mb-12">
                "When your safety score falls below 30, we <span className="text-white">gracefully degrade</span>. We shift to somatic grounding: sleep, hydration, and physical stabilization."
              </p>
              <div className="h-12 w-px bg-white/10" />
              <p className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase italic mt-10">— SEDA_System_Protocol</p>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <ShieldCheck size={100} strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="h-screen w-full snap-start flex items-center justify-center py-24 relative border-t border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-12 text-center space-y-20 relative z-10">
          <h2 className="text-6xl sm:text-9xl font-light text-white tracking-tighter uppercase italic leading-[0.9]">
            Deploy your <span className="text-white/30">manual.</span>
          </h2>
          <p className="text-2xl sm:text-4xl text-white/20 font-light italic max-w-4xl leading-relaxed">
            Patterns, not predictions. Use the architectural data to stabilize your connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-lg mx-auto w-full pt-12">
            <Link
              to="/start"
              className="w-full h-24 bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full flex items-center justify-center uppercase shadow-2xl"
            >
              Start_Engine
              <ArrowRight size={20} className="ml-4" />
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
}
