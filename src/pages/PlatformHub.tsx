
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Zap, Network, ShieldCheck, Database, Layout, Terminal, Lock } from 'lucide-react';
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
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
            <Header />

            {/* HERO — Dramatic Correction */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-black relative overflow-hidden">
                <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">

                    <div className="mb-6 text-[11px] tracking-[0.5em] text-cyan-400 font-medium uppercase opacity-60 animate-fade-in">
                        System Status: Operational
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8 text-white animate-slide-up">
                        RELATIONAL <br />
                        <span className="italic font-thin text-slate-500 block -mt-2 sm:-mt-4 mb-2">INTELLIGENCE</span>
                        ENGINEERED.
                    </h1>

                    <p className="max-w-2xl text-base sm:text-xl text-slate-400 leading-relaxed mb-12 animate-slide-up delay-100 font-light">
                        <span className="text-white font-medium">The friction isn't personal. It's structural.</span> <br className="hidden sm:block" />
                        DEFRAG maps the invisible mechanics of your connections, turning entropy into authority.
                    </p>

                    <Link to="/inversion" className="relative group px-12 py-5 bg-black border border-white/10 overflow-hidden animate-slide-up delay-200">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-lime-500/20"></div>

                        <span className="relative z-10 text-white tracking-[0.3em] font-bold uppercase text-sm">
                            Initialize Mapping
                        </span>

                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-lime-400"></div>
                    </Link>
                </div>

                {/* Subtle BG Glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/[0.04] rounded-full blur-[100px] pointer-events-none" />
            </section>

            {/* HOW IT WORKS (Mechanical Strip) */}
            <section className="py-24 bg-[#020202] border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-xs font-bold tracking-[0.3em] text-white/20 mb-12 uppercase">System_Architectonics</p>

                    <div className="grid md:grid-cols-3 gap-y-12 gap-x-8">
                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">01. Inputs</div>
                            <h4 className="text-white text-2xl font-light">Architectural JSON</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">System ingests multi-node data profiles (Type, Authority, Gates) to map the mechanical baseline.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-widest text-fuchsia-500 font-bold">02. Processing</div>
                            <h4 className="text-white text-2xl font-light">Inversion Engine</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Calculates systemic voltage, fusion points, and triangles to identify friction sources.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">03. Outputs</div>
                            <h4 className="text-white text-2xl font-light">Action Protocols</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Generates objective, non-emotional tasks to restore stability and optimize flow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE MODULES (Cards) */}
            <section className="py-32 bg-zinc-950 border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-xs font-bold tracking-[0.3em] text-white/20 mb-12 uppercase">Active_Modules</p>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* ECHO */}
                        <div className="p-10 border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/30 transition-all duration-500 flex flex-col h-96 relative group">
                            <h3 className="text-3xl font-bold mb-2 text-white tracking-tighter">ECHO</h3>
                            <p className="text-white/40 text-sm">Individual Telemetry</p>
                            <div className="mt-auto">
                                <p className="text-white/60 mb-6 leading-relaxed">
                                    Identify functional baseline and shadow triggers.
                                </p>
                                <Link to="/echo" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-cyan-400 transition-colors">
                                    Launch Module <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* ORBIT */}
                        <div className="p-10 border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/30 transition-all duration-500 flex flex-col h-96 relative group overflow-hidden">
                            {/* Subtle gradient background for premium feel */}
                            <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none" />
                            <h3 className="text-3xl font-bold mb-2 text-white tracking-tighter">ORBIT</h3>
                            <p className="text-white/40 text-sm italic">Relational CRM</p>
                            <div className="mt-auto relative z-10">
                                <p className="text-white/60 mb-6 leading-relaxed">
                                    Map pressure transparency and team dynamics.
                                </p>
                                <Link to="/relational" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-fuchsia-400 transition-colors">
                                    Launch Orbit <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* SIGNAL */}
                        <div className="p-10 border border-white/5 bg-black/20 backdrop-blur-sm flex flex-col h-96 relative opacity-80">
                            <h3 className="text-3xl font-bold mb-2 text-white/50 tracking-tighter">SIGNAL</h3>
                            <p className="text-white/20 text-sm">Real-time Filtration</p>

                            <div className="absolute top-10 right-10">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-white/50 rounded-full backdrop-blur-md">
                                    Coming Soon
                                </span>
                            </div>

                            <div className="mt-auto">
                                <p className="text-white/30 mb-6 leading-relaxed">
                                    Prevent relational breakdown before it occurs.
                                </p>
                                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/20 cursor-not-allowed">
                                    Offline <Lock size={12} />
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* DEVELOPER REDIRECT */}
            <section className="py-40 bg-black border-t border-white/10 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-16">
                    <Terminal size={32} strokeWidth={1} className="mx-auto text-white/30" />
                    <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight uppercase">
                        For Builders.
                    </h2>
                    <p className="text-xl text-white/40 leading-relaxed font-light italic max-w-3xl mx-auto">
                        Integrate Defrag's safety and telemetry layers directly into your application architecture.
                    </p>
                    <Link to="/developer" className="inline-flex h-14 px-12 items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase">
                        Enter_Developer_Portal
                    </Link>
                </div>
            </section>

            <Footer />

            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
};

export default PlatformHub;
