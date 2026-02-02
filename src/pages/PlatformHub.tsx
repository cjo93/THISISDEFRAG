
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Code, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';
import '../styles/PlatformHub.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DevAccessModal from '../components/DevAccessModal';
import { InfrastructureStatement, SafetyStandardExplainer, StanceStatement, CostOfError } from '../components/TrustMicrocopy';

const PlatformHub: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showDevModal, setShowDevModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="platform-container bg-black text-white">
            <Header />

            {/* HERO — Infrastructure-first, matching /agents visual language */}
            <section className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-black">
                <div className="max-w-7xl mx-auto px-6 py-24 w-full">
                    {/* Phase Badge — technical, not consumer */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-orange-500/50 text-orange-400 text-[10px] font-mono tracking-widest uppercase mb-8 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Cognitive Middleware
                    </div>

                    {/* Headline — left-aligned, high-contrast */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
                        Cognitive Middleware<br />
                        <span className="text-white/40">for Human Systems</span>
                    </h1>

                    {/* Subline — mechanical, not emotional */}
                    <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
                        NASA-grade telemetry with a clinical safety firewall. For individuals, couples, teams, and platforms.
                    </p>

                    {/* Dual CTAs — explore vs develop */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link to="/products/manuals" className="group h-14 px-10 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-black hover:bg-white transition-all rounded-full uppercase">
                            Explore Tools
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/developer" className="h-14 px-10 flex items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all rounded-full uppercase">
                            For Developers
                        </Link>
                    </div>

                    {/* Trust Badges — infrastructure credibility */}
                    <div className="flex flex-wrap gap-12 opacity-60">
                        <div>
                            <div className="text-xs font-bold tracking-widest uppercase text-white">SEDA-Gated</div>
                            <div className="text-[10px] tracking-widest text-zinc-500">Clinical Safety Standard</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-widest uppercase text-white">SOC 2 Type II</div>
                            <div className="text-[10px] tracking-widest text-zinc-500">Enterprise Ready</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-widest uppercase text-white">99.9% Uptime</div>
                            <div className="text-[10px] tracking-widest text-zinc-500">Production SLA</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="products-section py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">◎</div>
                            <h3 className="text-2xl font-light mb-2">ECHO</h3>
                            <p className="text-xs text-white/30 font-mono mb-4">Personal Manual</p>
                            <p className="text-white/50 mb-8 leading-relaxed text-sm">A short, plain-language manual: what drains you, what restores you, and the few rules that keep you stable.</p>
                            <Link to="/products/manuals" className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Get Your Manual <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] opacity-75 group">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">💬</div>
                            <h3 className="text-2xl font-light mb-2">SIGNAL</h3>
                            <p className="text-xs text-white/30 font-mono mb-4">Conflict Resolution</p>
                            <p className="text-white/50 mb-8 leading-relaxed text-sm">Real-time message filtering. Removes entropy markers before they trigger relational collapse.</p>
                            <span className="text-white/30 text-xs font-mono border border-white/10 px-2 py-1 rounded">COMING SOON</span>
                        </div>

                        <Link to="/relational" className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group block">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">⬡</div>
                            <h3 className="text-2xl font-light mb-2">ORBIT</h3>
                            <p className="text-xs text-white/30 font-mono mb-4">System Map</p>
                            <p className="text-white/50 mb-8 leading-relaxed text-sm">A simple map of where a family or team locks up, and who holds most of the pressure.</p>
                            <span className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Map Your System <ArrowRight size={14} />
                            </span>
                        </Link>

                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group cursor-pointer" onClick={() => setShowDevModal(true)}>
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">{"{ }"}</div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-light">API</h3>
                                <span className="text-[10px] font-mono tracking-widest bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 uppercase">Testing</span>
                            </div>
                            <p className="text-xs text-white/30 font-mono mb-4">Safety Layer</p>
                            <p className="text-white/50 mb-8 leading-relaxed text-sm">A safety layer any app can use to keep people safe when talking about big life topics.</p>
                            <span className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Request Access <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEDA SECTION - Universal Safety Gate */}
            <section className="py-24 bg-zinc-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block text-xs font-mono tracking-widest text-orange-400 mb-6 border border-orange-500/30 px-3 py-1 rounded bg-orange-500/5 uppercase">
                                Telemetry-Based Safety
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 leading-tight">
                                SEDA: The Universal<br />
                                <span className="text-white/40">Safety Gate</span>
                            </h2>
                            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                                Every interaction is monitored by our Safety-Enhanced Dynamic Assessment (SEDA) protocol. We use NASA-grade telemetry to detect entropy before it causes systemic failure.
                            </p>
                            <p className="text-white/50 leading-relaxed mb-8">
                                Using topocentric precision, we map relative pressure between nodes. If safety scores drop below critical thresholds, we automatically engage graceful degradation—shifting from high-bandwidth communication to somatic grounding protocols.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                100% Deterministic Safety Layers
                            </div>
                        </div>

                        {/* Visualizing the Safety Bands */}
                        <div className="space-y-4">
                            <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                                <div>
                                    <div className="text-green-400 text-lg font-mono font-bold mb-1">61–100 · OPTIMAL</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">High Coherence</div>
                                </div>
                                <div className="text-green-500/20 font-mono text-4xl">●</div>
                            </div>
                            <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
                                <div>
                                    <div className="text-blue-400 text-lg font-mono font-bold mb-1">46–60 · STABLE</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Moderate Constraints</div>
                                </div>
                                <div className="text-blue-500/20 font-mono text-4xl">●</div>
                            </div>
                            <div className="p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-between">
                                <div>
                                    <div className="text-yellow-400 text-lg font-mono font-bold mb-1">30–45 · CAUTION</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Heavy Filtering</div>
                                </div>
                                <div className="text-yellow-500/20 font-mono text-4xl">●</div>
                            </div>
                            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-between">
                                <div>
                                    <div className="text-red-400 text-lg font-mono font-bold mb-1">≤29 · CRITICAL</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Grounding Protocols Only</div>
                                </div>
                                <div className="text-red-500/20 font-mono text-4xl">●</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MOAT SECTION - Why DEFRAG is Unreplicable */}
            <section className="py-24 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="p-12 rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-light text-white mb-8">
                                Why DEFRAG is Unreplicable
                            </h2>
                            <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                                We didn't just scrape the internet. We built a physics engine for human emotional pressure.
                                Our dataset is built on <span className="text-white">millions of verified relationship vectors</span>, mapped against astrological topocentric coordinates and verified outcome data.
                                This creates a <span className="text-orange-400">closed-loop verification system</span> that LLMs cannot hallucinate.
                            </p>
                            <div className="grid sm:grid-cols-3 gap-8 text-left">
                                <div>
                                    <div className="text-orange-500 font-mono mb-2 text-lg">01.</div>
                                    <h4 className="text-white font-medium mb-2">Physics, Not Vibes</h4>
                                    <p className="text-white/40 text-sm">We treat emotional pressure as a mechanical force with predictable vectors, not a mysterious "energy".</p>
                                </div>
                                <div>
                                    <div className="text-orange-500 font-mono mb-2 text-lg">02.</div>
                                    <h4 className="text-white font-medium mb-2">Topocentric Precision</h4>
                                    <p className="text-white/40 text-sm">NASA-grade positional data ensures our "astrology" is astronomical engineering, not metaphor.</p>
                                </div>
                                <div>
                                    <div className="text-orange-500 font-mono mb-2 text-lg">03.</div>
                                    <h4 className="text-white font-medium mb-2">Safety By Design</h4>
                                    <p className="text-white/40 text-sm">Our SEDA firewall is hard-coded. It cannot be bypassed by prompt engineering or user manipulation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* USE CASE NAVIGATION */}
            <section className="py-24 bg-zinc-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-light text-white mb-4">Infrastructure for Every Scale</h2>
                        <p className="text-white/40">From single-user safety to platform-wide governance.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        <Link to="/products/manuals" className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group">
                            <h3 className="text-white text-lg font-light mb-2 group-hover:text-orange-400 transition-colors">Individuals</h3>
                            <p className="text-white/40 text-sm mb-4">Self-governance manual. Understand your own friction points.</p>
                            <ArrowRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors" />
                        </Link>

                        <Link to="/relational" className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group">
                            <h3 className="text-white text-lg font-light mb-2 group-hover:text-orange-400 transition-colors">Couples</h3>
                            <p className="text-white/40 text-sm mb-4">Conflict de-escalation. Map the geometry between two nodes.</p>
                            <ArrowRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors" />
                        </Link>

                        <Link to="/relational" className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group">
                            <h3 className="text-white text-lg font-light mb-2 group-hover:text-orange-400 transition-colors">Teams</h3>
                            <p className="text-white/40 text-sm mb-4">Group cohesion telemetry. Prevent burnout and triangulation.</p>
                            <ArrowRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors" />
                        </Link>

                        <Link to="/developer" className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group">
                            <h3 className="text-white text-lg font-light mb-2 group-hover:text-orange-400 transition-colors">Platforms</h3>
                            <p className="text-white/40 text-sm mb-4">API integration. Add a clinical safety layer to your app.</p>
                            <ArrowRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Dev Access Modal */}
            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
};

export default PlatformHub;
