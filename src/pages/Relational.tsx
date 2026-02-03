
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Network, Scissors, Zap, Target, Waves, Wrench, ArrowRight } from 'lucide-react';

export default function Relational() {
    return (
        <div className="min-h-screen w-full bg-black text-white overflow-x-hidden selection:bg-orange-500/30">
            <Header />

            {/* Hero Section — Spaced, Premium, Aligned */}
            <section className="pt-40 pb-32 px-6 border-b border-white/5 bg-black relative">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        ORBIT: RELATIONAL GEOMETRY
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
                        Map the geometry<br />
                        <span className="text-orange-500">of your people.</span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        ORBIT reveals the invisible patterns in team and family systems using NASA-grade topocentric precision.
                        See <em className="text-white not-italic">why</em> certain nodes become conflict lightning rods.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-sm mx-auto">
                        <Link to="/start" className="group h-16 px-12 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                            Start Mapping
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* What is ORBIT — Grid Alignment */}
            <section className="py-32 px-6 border-b border-white/5 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10 text-left">
                            <h2 className="text-4xl font-light text-white tracking-tight">Systemic Integrity</h2>
                            <div className="space-y-6 text-white/50 leading-loose text-lg font-light">
                                <p>
                                    <span className="text-white font-normal uppercase tracking-wider text-xs">ORBIT</span> (Operational Relational Behavioral Intelligence Tool) maps the mechanical geometry of groups using Penta (5-person) and Hexa (6-person) configurations.
                                </p>
                                <p>
                                    Based on systemic behavioral theory, ORBIT shows how pressure propagates through relational networks—not through individual pathology, but through <span className="text-orange-400 font-normal">systemic position</span>.
                                </p>
                                <p className="text-white/80 italic pl-6 border-l border-white/20 py-2">
                                    "You're not the problem. You're simply in the position that absorbs the system's friction."
                                </p>
                            </div>
                        </div>

                        <div className="relative aspect-square max-w-md mx-auto w-full lg:max-w-none rounded-[40px] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                            {/* Visual Placeholder */}
                            <div className="relative w-72 h-72 animate-[spin_100s_linear_infinite]">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center z-10 backdrop-blur-md">
                                    <span className="text-[10px] font-mono font-bold text-orange-400 tracking-[0.3em] uppercase">YOU</span>
                                </div>
                                {[0, 72, 144, 216, 288].map((angle, idx) => {
                                    const radius = 110;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                                    return (
                                        <div
                                            key={idx}
                                            className="absolute w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                            style={{
                                                top: `calc(50% + ${y}px)`,
                                                left: `calc(50% + ${x}px)`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    );
                                })}
                                <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
                                    <circle cx="50%" cy="50%" r="110" stroke="#fff" strokeWidth="0.5" fill="none" />
                                </svg>
                            </div>
                            <div className="absolute bottom-8 text-center text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase px-6">
                                Penta Configuration Telemetry
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features — No Emojis, Clean Layout */}
            <section className="py-32 px-6 border-b border-white/5 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 flex flex-col items-center">
                        <h2 className="text-3xl sm:text-5xl font-light mb-6 tracking-tight">What ORBIT Reveals</h2>
                        <div className="h-px w-24 bg-orange-500/30 mb-8" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Triangulation Patterns",
                                desc: "See when nodes stabilize anxiety by pulling in a third party. Map who gets targeted and when.",
                                Icon: Network
                            },
                            {
                                title: "Emotional Cut-Offs",
                                desc: "Identify severed connections—and how that distance increases pressure on the rest of the system.",
                                Icon: Scissors
                            },
                            {
                                title: "Pressure Points",
                                desc: "Discover which node absorbs the most system friction. Often the most empathic unit.",
                                Icon: Zap
                            },
                            {
                                title: "Differentiation Scores",
                                desc: "Understand who stays calm under stress versus who gets pulled into systemic reactivity.",
                                Icon: Target
                            },
                            {
                                title: "Anxiety Propagation",
                                desc: "Watch how stress ripples through your network. It's not random; it follows geometric rules.",
                                Icon: Waves
                            },
                            {
                                title: "Intervention Logic",
                                desc: "Find where a single shift in one node's stance can cascade calm through the entire map.",
                                Icon: Wrench
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-10 bg-white/[0.01] border border-white/5 hover:border-orange-500/20 rounded-3xl transition-all duration-500 group flex flex-col items-start text-left"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8">
                                    <feature.Icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-light mb-4 text-white tracking-tight">{feature.title}</h3>
                                <p className="text-white/50 text-base font-light leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases — Premium List */}
            <section className="py-32 px-6 border-b border-white/5 bg-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">Operational Context</h2>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                title: "Chronic Conflict Systems",
                                desc: "If the same fight keeps happening, it's systemic, not personal. ORBIT surfaces the geometry.",
                                example: "Identifying recursive triangulation patterns in sibling groups."
                            },
                            {
                                title: "Blended Architectures",
                                desc: "Navigate complex step-dynamics by mapping protective alliance geometry and friction points.",
                                example: "Uncovering invisible barriers to new node integration."
                            },
                            {
                                title: "Leadership Cohesion",
                                desc: "Organizational conflict mirrors family mapping. Track board-room triangulation and cut-offs.",
                                example: "Mapping co-founder withdrawal patterns under financial pressure."
                            },
                            {
                                title: "Transmission Pathways",
                                desc: "Trace unprocessed generational anxiety as it flows through current configurations.",
                                example: "Decoding inherited behavioral vectors."
                            },
                        ].map((useCase, idx) => (
                            <div
                                key={idx}
                                className="p-12 bg-white/[0.01] border border-white/10 hover:border-orange-500/30 transition-all duration-500 rounded-[32px] group"
                            >
                                <h3 className="text-2xl font-light mb-3 text-orange-400 group-hover:text-white transition-colors">{useCase.title}</h3>
                                <p className="text-white/50 text-lg font-light leading-loose mb-6">{useCase.desc}</p>
                                <div className="flex items-center gap-4 text-sm font-mono text-white/20 uppercase tracking-[0.2em]">
                                    <span className="h-px w-8 bg-white/10" />
                                    Example: {useCase.example}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — Powerfull Conclusion */}
            <section className="py-40 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-4xl sm:text-6xl font-light mb-10 text-white tracking-tight">
                        Map your system geometry.
                    </h2>
                    <p className="text-xl sm:text-2xl text-white/50 mb-16 leading-relaxed font-light max-w-2xl">
                        Identify the pressure points in your network with NASA-grade architectural precision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
                        <Link
                            to="/start"
                            className="group h-16 px-12 flex items-center justify-center bg-white text-black text-sm tracking-[0.15em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-full uppercase shadow-2xl"
                        >
                            Start Mapping
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
