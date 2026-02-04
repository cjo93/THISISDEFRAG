
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DevAccessModal from '../components/DevAccessModal';

const PlatformHub: React.FC = () => {
    const [showDevModal, setShowDevModal] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <Header />

            {/* HERO — 'THE MONOLITH' */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">

                {/* Ambient Light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-12">

                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">System Online</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="flex flex-col items-center leading-none">
                        <span className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter text-white mix-blend-overlay opacity-90">
                            RELATIONAL
                        </span>
                        <span className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-tight text-white/50 -mt-2 sm:-mt-6 md:-mt-10 italic">
                            INTELLIGENCE
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-xl text-lg sm:text-2xl text-white/40 font-light leading-relaxed tracking-wide">
                        The friction isn't personal. It's <span className="text-white font-normal">structural</span>.
                        <br className="hidden sm:block" />
                        Map the invisible mechanics of your connections.
                    </p>

                    {/* Primary Action - "Liquid Obsidian" Button */}
                    <Link to="/inversion" className="group relative inline-flex items-center justify-center px-16 py-6 overflow-hidden rounded-full bg-white text-black transition-transform hover:scale-105 duration-500">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-zinc-200 via-white to-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-3">
                            Initialize Mapping <ArrowRight size={14} />
                        </span>
                    </Link>

                </div>
            </section>

            {/* SECTION 01: SYSTEM ARCHITECTURE */}
            <section className="py-40 bg-black relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-bold tracking-[0.4em] text-white/20 uppercase mb-4">Architecture</h2>
                        <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight">The Mechanical Structure</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16 relative">
                        {/* Divider Lines (Desktop) */}
                        <div className="hidden md:block absolute top-10 bottom-10 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        <div className="hidden md:block absolute top-10 bottom-10 right-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        {/* Column 01 */}
                        <div className="flex flex-col items-center text-center space-y-6 group">
                            <span className="text-4xl font-thin text-white/20 group-hover:text-cyan-400 transition-colors duration-500">01</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Input</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                                Ingest raw relational data. Classify friction points against a deterministic 64-gate framework.
                            </p>
                        </div>

                        {/* Column 02 */}
                        <div className="flex flex-col items-center text-center space-y-6 group">
                            <span className="text-4xl font-thin text-white/20 group-hover:text-purple-500 transition-colors duration-500">02</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Process</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                                The Inversion Engine calculates systemic voltage and identifies fusion triangles in real-time.
                            </p>
                        </div>

                        {/* Column 03 */}
                        <div className="flex flex-col items-center text-center space-y-6 group">
                            <span className="text-4xl font-thin text-white/20 group-hover:text-emerald-500 transition-colors duration-500">03</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Output</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                                Receive actionable, mechanical protocols to neutralize entropy and restore authority.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 02: OPERATIONAL CAPABILITIES (Cards) */}
            <section className="py-40 bg-black relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-bold tracking-[0.4em] text-white/20 uppercase mb-4">Modules</h2>
                        <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight">Operational Capabilities</h3>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* ECHO CARD */}
                        <div className="group relative h-[500px] bg-zinc-900/20 border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col items-center justify-center text-center p-12 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <h3 className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-700 tracking-tighter mb-8">ECHO</h3>
                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h4 className="text-xl text-white font-medium mb-2">Individual Telemetry</h4>
                                    <p className="text-white/40 text-sm leading-relaxed max-w-[240px] mx-auto">
                                        Establish your mechanical baseline. Identify shadow triggers and core drive.
                                    </p>
                                </div>
                                <Link to="/echo" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/20 pb-1 hover:border-cyan-400 hover:text-cyan-400 transition-all">
                                    Launch Module <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* ORBIT CARD */}
                        <div className="group relative h-[500px] bg-zinc-900/20 border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col items-center justify-center text-center p-12 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <h3 className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-700 tracking-tighter mb-8">ORBIT</h3>
                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h4 className="text-xl text-white font-medium mb-2">Relational CRM</h4>
                                    <p className="text-white/40 text-sm leading-relaxed max-w-[240px] mx-auto">
                                        Map pressure transparency and team dynamics. Visualize the geometry of connection.
                                    </p>
                                </div>
                                <Link to="/relational" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/20 pb-1 hover:border-purple-400 hover:text-purple-400 transition-all">
                                    Launch Module <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* SIGNAL CARD */}
                        <div className="group relative h-[500px] bg-zinc-900/10 border border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 opacity-60">
                            <div className="absolute top-6 right-6">
                                <Lock size={16} className="text-white/20" />
                            </div>
                            <h3 className="text-6xl font-black text-white/5 tracking-tighter mb-8">SIGNAL</h3>
                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h4 className="text-xl text-white/50 font-medium mb-2">Real-time Filtration</h4>
                                    <p className="text-white/20 text-sm leading-relaxed max-w-[240px] mx-auto">
                                        Prevent relational breakdown before it occurs. Active monitoring.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 cursor-not-allowed">
                                    Module Offline
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PRE-FOOTER */}
            <section className="py-40 bg-black border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                        Integrate Relational Intelligence.
                    </h2>
                    <p className="text-lg text-white/40 leading-relaxed font-light max-w-2xl mx-auto">
                        For builders and architects. Embed Defrag's safety and telemetry layers directly into your application.
                    </p>
                    <Link to="/developer" className="inline-flex h-14 px-10 items-center justify-center border border-white/10 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]">
                        View Documentation
                    </Link>
                </div>
            </section>

            <Footer />
            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
};

export default PlatformHub;
