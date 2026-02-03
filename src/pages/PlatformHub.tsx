
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Info, Radio, Network, Code2, Lock, Server, Cpu } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DevAccessModal from '../components/DevAccessModal';

const PlatformHub: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showDevModal, setShowDevModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
            <Header />

            {/* HERO — Production Ready Hero */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-32 bg-black">
                <div className="max-w-6xl mx-auto px-6 w-full text-center flex flex-col items-center relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-12 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Relational Intelligence
                    </div>

                    {/* Headline — User Requested Change */}
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tight leading-[0.95] mb-12 text-white drop-shadow-2xl">
                        Establish your <br />
                        <span className="text-orange-500">baseline.</span>
                    </h1>

                    {/* Subline */}
                    <p className="text-xl sm:text-2xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        Turn complex interpersonal dynamics into deterministic data. <br className="hidden sm:block" />
                        Architecture for humans, teams, and platforms.
                    </p>

                    {/* Dual CTAs - Large touch targets */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto mb-32">
                        <Link to="/start" className="group h-20 px-14 flex items-center justify-center bg-white text-black text-xs tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-500 rounded-full uppercase shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                            Initial Deploy
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/developer" className="h-20 px-14 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/50 text-xs tracking-[0.2em] font-bold hover:bg-white/[0.05] hover:text-white hover:border-white/20 transition-all duration-500 rounded-full uppercase">
                            Connect API
                        </Link>
                    </div>

                    {/* Trust Matrix — Precise alignment */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 opacity-20 hover:opacity-100 transition-opacity duration-700">
                        <div className="flex flex-col items-center group">
                            <Shield size={20} className="text-white mb-3 group-hover:text-orange-500 transition-colors" />
                            <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white mb-1">SEDA_GATED</div>
                            <div className="text-[9px] tracking-widest text-white/40 uppercase">Clinical Standard</div>
                        </div>
                        <div className="flex flex-col items-center group">
                            <Server size={20} className="text-white mb-3 group-hover:text-orange-500 transition-colors" />
                            <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white mb-1">SOC_2_T2</div>
                            <div className="text-[9px] tracking-widest text-white/40 uppercase">Enterprise Ready</div>
                        </div>
                        <div className="flex flex-col items-center group">
                            <Radio size={20} className="text-white mb-3 group-hover:text-orange-500 transition-colors" />
                            <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white mb-1">99.9%_UPTIME</div>
                            <div className="text-[9px] tracking-widest text-white/40 uppercase">Production SLA</div>
                        </div>
                    </div>
                </div>

                {/* Background Atmosphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none animate-pulse" />
            </section>

            {/* CORE INFRASTRUCTURE — Premium Grid */}
            <section className="py-40 bg-zinc-950 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-32 space-y-4">
                        <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight">Core Infrastructure</h2>
                        <p className="text-xl text-white/20 font-light tracking-wide italic">Industrial-grade components for high-precision human systems.</p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* ECHO */}
                        <Link to="/echo" className="p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-700 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Info size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">ECHO</h3>
                            <div className="h-px w-8 bg-white/10 mb-8" />
                            <p className="text-white/40 mb-12 leading-relaxed text-sm font-light italic">Detailed operational parameters: what drains you, what restores you, and the systemic rules of your node.</p>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 group-hover:text-orange-500 transition-colors mt-auto">Deploy Manual</span>
                        </Link>

                        {/* SIGNAL */}
                        <div className="p-12 rounded-[40px] border border-white/5 bg-white/[0.005] opacity-30 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center text-white/20 mb-10">
                                <Zap size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight uppercase">SIGNAL</h3>
                            <div className="h-px w-8 bg-white/5 mb-8" />
                            <p className="text-white/40 mb-12 leading-relaxed text-sm font-light italic">Real-time entropy filtration. Correcting interaction markers before they trigger systemic relational collapse.</p>
                            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20 border border-white/10 px-4 py-2 rounded-full mt-auto">PENDING_Q2</span>
                        </div>

                        {/* ORBIT */}
                        <Link to="/relational" className="p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-700 group flex flex-col items-center text-center text-decoration-none">
                            <div className="w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Network size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">ORBIT</h3>
                            <div className="h-px w-8 bg-white/10 mb-8" />
                            <p className="text-white/40 mb-12 leading-relaxed text-sm font-light italic">Geometric mapping of family or team dynamics. Visualizing pressure distribution across complex systems.</p>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 mt-auto">Initialize Map</span>
                        </Link>

                        {/* API */}
                        <div className="p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-700 group cursor-pointer flex flex-col items-center text-center" onClick={() => setShowDevModal(true)}>
                            <div className="w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Code2 size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">API</h3>
                            <div className="h-px w-8 bg-white/10 mb-8" />
                            <p className="text-white/40 mb-12 leading-relaxed text-sm font-light italic">The safety layer for modern interfaces. Deterministic gating for sensitive human-centric AI interactions.</p>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 group-hover:text-orange-500 transition-colors mt-auto">Request DevKey</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEDA — Safety Visualization */}
            <section className="py-40 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center justify-center text-center mb-24">
                        <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.4em] text-orange-500 mb-8 border border-orange-500/10 px-5 py-2 rounded-full bg-orange-500/[0.02] uppercase leading-none">
                            <Lock size={12} />
                            Telemetry_Based_Gating
                        </span>
                        <h2 className="text-5xl sm:text-7xl font-light text-white mb-10 leading-tight tracking-tight">
                            SEDA: Universal Safety Gate
                        </h2>
                        <p className="text-xl sm:text-2xl text-white/30 leading-relaxed max-w-3xl mx-auto font-light italic">
                            Every interface call is gated by our Safety-Enhanced Dynamic Assessment. NASA-grade telemetry detecting entropy before failure.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-16">
                            <div>
                                <h4 className="text-white text-3xl font-light mb-6 tracking-tight">Graceful Degradation</h4>
                                <p className="text-white/40 leading-relaxed text-lg font-light italic pr-12">
                                    Mapping topocentric pressure between system nodes. If safety scores drop below threshold, the interface automatically shifts to somatic grounding protocols—restricting high-bandwidth esoterics for safety.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-full text-[10px] font-mono text-white/40 tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                100%_DETERMINISTIC_GATE
                            </div>
                        </div>

                        {/* Heat Map Visualization — Premium */}
                        <div className="space-y-4">
                            {[
                                { range: "61–100", label: "OPTIMAL", sub: "FULL_BANDWIDTH", color: "#22c55e", bg: "bg-green-500/10" },
                                { range: "46–60", label: "STABLE", sub: "HEAVY_FILTER", color: "#3b82f6", bg: "bg-blue-500/10" },
                                { range: "30–45", label: "CAUTION", sub: "GROUNDING_ONLY", color: "#eab308", bg: "bg-yellow-500/10" },
                                { range: "≤29", rangeLabel: "CRITICAL", label: "LOCKDOWN", sub: "SYSTEM_RECOVERY", color: "#ef4444", bg: "bg-red-500/10" }
                            ].map((band) => (
                                <div key={band.range} className={`p-8 rounded-[32px] border border-white/5 bg-zinc-950 flex items-center justify-between group hover:border-white/10 transition-colors`}>
                                    <div>
                                        <div className="text-[10px] font-mono tracking-widest text-white/20 mb-1 uppercase">{band.sub}</div>
                                        <div className="text-2xl font-light text-white tracking-tight">
                                            <span style={{ color: band.color }} className="font-mono font-bold mr-4">{band.range}</span>
                                            {band.label}
                                        </div>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: band.color, boxShadow: `0 0 20px ${band.color}44` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MOAT — The Why */}
            <section className="py-40 bg-zinc-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="p-20 rounded-[80px] border border-white/5 bg-black relative overflow-hidden group">
                        <div className="relative z-10 max-w-5xl">
                            <h2 className="text-4xl sm:text-6xl font-light text-white mb-12 tracking-tight">
                                The Physics of Interaction.
                            </h2>
                            <p className="text-2xl sm:text-3xl text-white/40 leading-relaxed font-light mb-20 italic">
                                We didn't scrape the internet. We built a mechanical engine for human emotional pressure.
                                <span className="text-white"> Millions of verified relationship vectors</span> mapped against NASA topocentric coordinates.
                                <span className="text-orange-500"> A closed-loop system that CANNOT hallucinate.</span>
                            </p>

                            <div className="grid md:grid-cols-3 gap-16 text-left">
                                <div className="space-y-6">
                                    <Cpu size={32} className="text-orange-500/50" />
                                    <h4 className="text-white text-xl font-light tracking-tight">Physics Engine</h4>
                                    <p className="text-white/20 text-sm leading-relaxed font-light italic">Treating emotional pressure as a mechanical force with predictable, measurable vectors.</p>
                                </div>
                                <div className="space-y-6">
                                    <Radio size={32} className="text-orange-500/50" />
                                    <h4 className="text-white text-xl font-light tracking-tight">Telemetry Sync</h4>
                                    <p className="text-white/20 text-sm leading-relaxed font-light italic">NASA Horizons integration ensures every coordinate is an astronomical fact, not a metaphor.</p>
                                </div>
                                <div className="space-y-6">
                                    <Lock size={32} className="text-orange-500/50" />
                                    <h4 className="text-white text-xl font-light tracking-tight">Hard-Coded Ethics</h4>
                                    <p className="text-white/20 text-sm leading-relaxed font-light italic">The SEDA firewall is baked into the math. It remains unaffected by LLM drift or manipulation.</p>
                                </div>
                            </div>
                        </div>
                        {/* Glow Detail */}
                        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none group-hover:bg-orange-500/[0.05] transition-colors duration-1000" />
                    </div>
                </div>
            </section>

            <Footer />

            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
};

export default PlatformHub;
