
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

            <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(249,115,22,0.15)_0%,_transparent_50%)]" />

                <div className="hero-content relative z-10 text-center px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-xs font-mono tracking-widest uppercase mb-8">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        The Manual for You and Your People
                    </div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        DEFRAG
                    </h1>

                    <p className="text-xl sm:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-6">
                        A clear user manual for you and your people, so you <span className="text-white">stop repeating the same fight on different days</span>.
                    </p>
                    <p className="text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                        See how you run under stress, how the people around you run under stress, and what keeps the system stable instead of spinning out.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/start" className="group h-14 px-10 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-black hover:bg-white transition-all rounded-full uppercase">
                            Get Your Manual
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/products/manuals" className="h-14 px-10 flex items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all rounded-full uppercase">
                            How It Works
                        </Link>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <div className="text-center">
                            <div className="text-sm font-black tracking-widest uppercase">NASA JPL</div>
                            <div className="text-[10px] tracking-widest">Orbital Telemetry</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-black tracking-widest uppercase">SEDA</div>
                            <div className="text-[10px] tracking-widest">Clinical Firewall</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
                    <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
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
