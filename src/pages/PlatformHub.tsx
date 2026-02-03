
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <Header />

            {/* HERO — Centered, Spacious, Premium */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-24 bg-black">
                <div className="max-w-5xl mx-auto px-6 w-full text-center flex flex-col items-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        RELATIONAL INTELLIGENCE
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
                        Simplifying Relationship<br />
                        <span className="text-white/30">Systems.</span>
                    </h1>

                    {/* Subline */}
                    <p className="text-lg sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        Turn complex dynamics into clear insights and practical tools.<br className="hidden sm:block" />
                        For individuals, couples, teams, and platforms.
                    </p>

                    {/* Dual CTAs - Large touch targets */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto mb-24">
                        <Link to="/products/manuals" className="group h-16 px-12 flex items-center justify-center bg-white text-black text-sm tracking-[0.15em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(249,115,22,0.4)]">
                            Explore Tools
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/developer" className="h-16 px-12 flex items-center justify-center border border-white/20 text-white text-sm tracking-[0.15em] font-medium hover:bg-white/[0.05] hover:border-white/40 transition-all duration-300 rounded-full uppercase">
                            For Developers
                        </Link>
                    </div>

                    {/* Footer / Trust - Subtle and aligned */}
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <div className="text-center group">
                            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white mb-1 group-hover:text-orange-400 transition-colors">SEDA-Gated</div>
                            <div className="text-[10px] tracking-wider text-white/50">Clinical Safety Standard</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white mb-1 group-hover:text-orange-400 transition-colors">SOC 2 Type II</div>
                            <div className="text-[10px] tracking-wider text-white/50">Enterprise Ready</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white mb-1 group-hover:text-orange-400 transition-colors">99.9% Uptime</div>
                            <div className="text-[10px] tracking-wider text-white/50">Production SLA</div>
                        </div>
                    </div>
                </div>

                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* OFFERINGS GRID — High Contrast, Clean Lines */}
            <section className="py-32 bg-zinc-950 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 tracking-tight">Core Infrastructure</h2>
                        <p className="text-white/40 text-lg font-light tracking-wide">The modular stack for human alignment.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* ECHO */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8 font-mono text-xl">◎</div>
                            <h3 className="text-2xl font-light mb-3 text-white tracking-tight">ECHO</h3>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">Personal Manual</p>
                            <p className="text-white/60 mb-10 leading-relaxed text-sm font-light">A short, plain-language manual: what drains you, what restores you, and the rules that keep you stable.</p>
                            <Link to="/products/manuals" className="text-white/80 hover:text-orange-500 flex items-center gap-3 font-semibold tracking-widest text-[10px] uppercase transition-all mt-auto border-b border-transparent hover:border-orange-500/50 pb-1">
                                Get Your Manual <ArrowRight size={12} />
                            </Link>
                        </div>

                        {/* SIGNAL */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.005] opacity-60 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-8 font-mono text-xl">💬</div>
                            <h3 className="text-2xl font-light mb-3 text-white tracking-tight">SIGNAL</h3>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">Conflict Resolution</p>
                            <p className="text-white/50 mb-10 leading-relaxed text-sm font-light">Real-time message filtering. Removes entropy markers before they trigger relational collapse.</p>
                            <span className="absolute bottom-8 text-[9px] font-mono tracking-[0.3em] uppercase text-white/20 border border-white/10 px-3 py-1.5 rounded-full">COMING SOON</span>
                        </div>

                        {/* ORBIT */}
                        <Link to="/relational" className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8 font-mono text-xl">⬡</div>
                            <h3 className="text-2xl font-light mb-3 text-white tracking-tight">ORBIT</h3>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">System Map</p>
                            <p className="text-white/60 mb-10 leading-relaxed text-sm font-light">A simple map of where a family or team locks up, and who holds most of the pressure.</p>
                            <span className="text-orange-500 flex items-center gap-3 font-semibold tracking-widest text-[10px] uppercase transition-all mt-auto">
                                Map Your System <ArrowRight size={12} />
                            </span>
                        </Link>

                        {/* API */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group cursor-pointer flex flex-col items-center text-center" onClick={() => setShowDevModal(true)}>
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8 font-mono text-xl">{"{ }"}</div>
                            <div className="flex items-center gap-3 mb-3 justify-center">
                                <h3 className="text-2xl font-light text-white tracking-tight">API</h3>
                                <span className="text-[9px] font-mono tracking-wider bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 uppercase">Alpha</span>
                            </div>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-6">Safety Layer</p>
                            <p className="text-white/60 mb-10 leading-relaxed text-sm font-light">A safety layer any app can use to keep people safe when talking about big life topics.</p>
                            <span className="text-white/80 hover:text-orange-500 flex items-center gap-3 font-semibold tracking-widest text-[10px] uppercase transition-all mt-auto border-b border-transparent hover:border-orange-500/50 pb-1">
                                Request Access <ArrowRight size={12} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEDA SECTION - Clean Layout */}
            <section className="py-32 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center justify-center text-center mb-20">
                        <span className="inline-block text-[10px] font-mono tracking-[0.2em] text-orange-400 mb-6 border border-orange-500/20 px-3 py-1 rounded bg-orange-500/5 uppercase">
                            Telemetry-Based Safety
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-light text-white mb-8 leading-tight tracking-tight">
                            SEDA: Universal Safety Gate
                        </h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto font-light">
                            Every interaction is monitored by our Safety-Enhanced Dynamic Assessment (SEDA) protocol. We use NASA-grade telemetry to detect entropy before it causes systemic failure.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="text-left space-y-10">
                            <div>
                                <h4 className="text-white text-xl font-light mb-4 tracking-tight">Graceful Degradation</h4>
                                <p className="text-white/50 leading-loose text-lg font-light">
                                    Using topocentric precision, we map relative pressure between nodes. If safety scores drop below critical thresholds, we automatically engage graceful degradation—shifting from high-bandwidth communication to somatic grounding protocols.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-xs font-mono text-white/70 tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                100% Deterministic Safety Layers
                            </div>
                        </div>

                        {/* Visualizing the Safety Bands - Aligned */}
                        <div className="space-y-4">
                            {[
                                { range: "61–100", label: "OPTIMAL", sub: "High Coherence", color: "green" },
                                { range: "46–60", label: "STABLE", sub: "Moderate Constraints", color: "blue" },
                                { range: "30–45", label: "CAUTION", sub: "Heavy Filtering", color: "yellow" },
                                { range: "≤29", label: "CRITICAL", sub: "Grounding Protocols", color: "red" }
                            ].map((band) => (
                                <div key={band.range} className={`p-5 rounded-xl border border-${band.color}-500/20 bg-${band.color}-500/[0.03] flex items-center justify-between`}>
                                    <div>
                                        <div className={`text-${band.color}-400 text-lg font-mono font-bold mb-1`}>{band.range} · {band.label}</div>
                                        <div className="text-white/30 text-[10px] uppercase tracking-[0.2em]">{band.sub}</div>
                                    </div>
                                    <div className={`text-${band.color}-500/20 font-mono text-xl`}>●</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MOAT SECTION - Unreplicable */}
            <section className="py-32 bg-zinc-950 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="p-16 rounded-[40px] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-5xl font-light text-white mb-10 tracking-tight">
                                Why DEFRAG is Unreplicable
                            </h2>
                            <p className="text-xl sm:text-2xl text-white/60 leading-relaxed font-light mb-16">
                                We didn't just scrape the internet. We built a physics engine for human emotional pressure.
                                Our dataset is built on <span className="text-white font-normal">millions of verified relationship vectors</span>, mapped against astrological topocentric coordinates.
                                This creates a <span className="text-orange-400 font-normal">closed-loop verification system</span> that LLMs cannot hallucinate.
                            </p>
                            <div className="grid sm:grid-cols-3 gap-12 text-left">
                                <div>
                                    <div className="text-orange-500 font-mono mb-4 text-xl">01.</div>
                                    <h4 className="text-white text-lg font-light mb-3">Physics, Not Vibes</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">We treat emotional pressure as a mechanical force with predictable vectors, not a mysterious "energy".</p>
                                </div>
                                <div>
                                    <div className="text-orange-500 font-mono mb-4 text-xl">02.</div>
                                    <h4 className="text-white text-lg font-light mb-3">Topocentric Precision</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">NASA-grade positional data ensures our "astrology" is astronomical engineering, not metaphor.</p>
                                </div>
                                <div>
                                    <div className="text-orange-500 font-mono mb-4 text-xl">03.</div>
                                    <h4 className="text-white text-lg font-light mb-3">Safety By Design</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">Our SEDA firewall is hard-coded. It cannot be bypassed by prompt engineering or user manipulation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
};

export default PlatformHub;
