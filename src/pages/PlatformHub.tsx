
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Zap, Network, ShieldCheck, Database, Layout, Terminal } from 'lucide-react';
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

            {/* HERO — Dramatic & High Hierarchy */}
            <section className="min-h-screen flex flex-col justify-center px-6 pt-40 pb-20 bg-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto w-full relative z-10">

                    <span className="text-[10px] tracking-[0.3em] text-cyan-500 font-bold mb-8 block opacity-80 uppercase animate-fade-in">
                        System_Online
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-white animate-slide-up">
                        RELATIONAL <br />
                        <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500">
                            Intelligence
                        </span>, <br />
                        ENGINEERED.
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-400 leading-relaxed max-w-2xl mb-12 font-light animate-slide-up delay-100">
                        A deterministic system for mapping <span className="text-white italic">human interaction</span>,
                        pressure, and stability. Predict friction before it occurs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                        <Link to="/start" className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center">
                            Initialize Mapping
                        </Link>
                        <Link to="/developer" className="px-10 py-4 border border-white/20 text-white font-medium hover:border-white transition-all uppercase tracking-widest flex items-center justify-center">
                            Connect API
                        </Link>
                    </div>
                </div>

                {/* Subtle BG Glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/[0.05] rounded-full blur-[120px] pointer-events-none" />
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
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 flex flex-col h-96 relative group">
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
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 flex flex-col h-96 relative group overflow-hidden">
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
                        <div className="p-10 border border-white/5 bg-black/50 flex flex-col h-96 relative opacity-80">
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
