
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

            {/* HERO — Simple, Centered, Focused */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-40 pb-32 bg-black">
                <div className="max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 bg-white/5 text-white text-xs tracking-widest uppercase mb-12 shadow-lg backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                        System_Online
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-tight mb-10 text-white">
                        Relational Intelligence,<br />
                        <span className="text-white/50">Engineered.</span>
                    </h1>

                    {/* Subline */}
                    <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-6">
                        DEFRAG is a deterministic system for mapping human interaction, pressure, and stability.
                    </p>
                    <p className="text-lg sm:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed font-light mb-16">
                        No psychology. No astrology. Just mechanics.
                    </p>

                    {/* Supporting Copy */}
                    <p className="text-base sm:text-lg text-white/30 max-w-2xl mx-auto leading-relaxed mb-20">
                        Human systems fail under invisible pressure.
                        DEFRAG turns relational dynamics into measurable data—so individuals, teams, and platforms can operate with clarity.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto mb-32">
                        <Link to="/start" className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg border border-transparent">
                            Initialize Mapping
                        </Link>
                        <Link to="/developer" className="h-14 px-10 flex items-center justify-center bg-transparent text-white border border-white/20 text-sm tracking-widest font-bold hover:bg-white/10 transition-all duration-300 uppercase">
                            Connect API
                        </Link>
                    </div>

                </div>

                {/* Subtle Background Detail */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.02] rounded-none blur-[150px] pointer-events-none" />
            </section>

            {/* CORE OFFERINGS */}
            <section className="py-40 bg-zinc-950 border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-4 gap-8">

                        {/* ECHO */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group flex flex-col text-left">
                            <h3 className="text-2xl font-light mb-6 text-white tracking-wide uppercase">ECHO</h3>
                            <p className="text-white/40 mb-10 leading-relaxed text-sm">
                                Identify what drains you, what restores you, and how your system responds under load.
                            </p>
                            <Link to="/echo" className="text-xs font-bold tracking-widest uppercase text-white/30 group-hover:text-white transition-all mt-auto flex items-center gap-3">
                                View_Spec <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* SIGNAL */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group flex flex-col text-left">
                            <h3 className="text-2xl font-light mb-6 text-white tracking-wide uppercase">SIGNAL</h3>
                            <p className="text-white/40 mb-10 leading-relaxed text-sm">
                                Filter interactions in real time to prevent relational breakdown before it happens.
                            </p>
                            <span className="text-xs font-bold tracking-widest uppercase text-white/30 mt-auto flex items-center gap-3">
                                Coming Soon
                            </span>
                        </div>

                        {/* ORBIT */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group flex flex-col text-left">
                            <h3 className="text-2xl font-light mb-6 text-white tracking-wide uppercase">ORBIT</h3>
                            <p className="text-white/40 mb-10 leading-relaxed text-sm">
                                Visualize pressure distribution across teams, families, or organizations.
                            </p>
                            <Link to="/relational" className="text-xs font-bold tracking-widest uppercase text-white/30 group-hover:text-white transition-all mt-auto flex items-center gap-3">
                                Map_Orbit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* API */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group flex flex-col text-left">
                            <h3 className="text-2xl font-light mb-6 text-white tracking-wide uppercase">API</h3>
                            <p className="text-white/40 mb-10 leading-relaxed text-sm">
                                A deterministic safety layer for human-centric AI and interfaces.
                            </p>
                            <Link to="/developer" className="text-xs font-bold tracking-widest uppercase text-white/30 group-hover:text-white transition-all mt-auto flex items-center gap-3">
                                Access_Docs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
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
