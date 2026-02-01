
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
                        Safety Infrastructure<br />
                        <span className="text-white/40">for Human Systems</span>
                    </h1>

                    {/* Subline — mechanical, not emotional */}
                    <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
                        DEFRAG provides pattern recognition, safety gating, and stability tracking for any platform handling high-stakes human decisions.
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
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">◎</div>
                            <h3 className="text-2xl font-light mb-2">ECHO</h3>
                            <p className="text-xs text-white/30 font-mono mb-4">Personal Manual</p>
                            <p className="text-white/50 mb-8 leading-relaxed">A short, plain-language manual: what drains you, what restores you, and the few rules that keep you stable.</p>
                            <Link to="/products/manuals" className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Get Your Manual <ArrowRight size={14} />
                            </Link>
                        </div>

                        <Link to="/relational" className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group block">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">⬡</div>
                            <h3 className="text-2xl font-light mb-2">ORBIT</h3>
                            <p className="text-xs text-white/30 font-mono mb-4">System Map</p>
                            <p className="text-white/50 mb-8 leading-relaxed">A simple map of where a family or team locks up, who holds most of the pressure, and the smallest moves that release it.</p>
                            <span className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Map Your System <ArrowRight size={14} />
                            </span>
                        </Link>

                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all group cursor-pointer" onClick={() => setShowDevModal(true)}>
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 font-mono">{"{ }"}</div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-light">API</h3>
                                <span className="text-[10px] font-mono tracking-widest bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 uppercase">Private Testing</span>
                            </div>
                            <p className="text-xs text-white/30 font-mono mb-4">Safety Layer</p>
                            <p className="text-white/50 mb-8 leading-relaxed">A safety layer any app can use to keep people safe when talking about big life topics.</p>
                            <span className="text-orange-500 flex items-center gap-2 font-bold tracking-widest text-xs uppercase group-hover:gap-3 transition-all">
                                Request Access <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST & POSITIONING SECTION */}
            <section className="py-24 bg-gradient-to-b from-black to-slate-950 border-t border-white/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <InfrastructureStatement />
                        <h2 className="text-3xl font-light mt-8 mb-4">Why DEFRAG</h2>
                        <StanceStatement />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Safety Standard */}
                        <SafetyStandardExplainer variant="full" />

                        {/* Cost of Error Examples */}
                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                            <h3 className="text-lg font-light text-white mb-6">The Cost of Error</h3>
                            <CostOfError audience="family" />
                            <CostOfError audience="team" />
                            <CostOfError audience="platform" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-white/30 text-xs font-mono max-w-2xl mx-auto">
                            Same engine, different contracts. Consumer or infrastructure — SEDA safety gating applies to every output.
                        </p>
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
