
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

            {/* HERO — 'THE MONOLITH' (Centered Pivot) */}
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

            {/* SECTION 01: SYSTEM ARCHITECTURE (Swiss Grid / Left Aligned) */}
            <section className="py-32 bg-black relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-left mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-xs font-bold tracking-[0.4em] text-white/40 uppercase mb-4">Architecture</h2>
                        <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">The Mechanical Structure</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16">
                        {/* Column 01 */}
                        <div className="flex flex-col items-start text-left space-y-6 group">
                            <span className="text-sm font-mono text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded">01_INPUT</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Ingest Data</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                Ingest raw relational data. Classify friction points against a deterministic 64-gate framework.
                            </p>
                        </div>

                        {/* Column 02 */}
                        <div className="flex flex-col items-start text-left space-y-6 group">
                            <span className="text-sm font-mono text-purple-500 border border-purple-500/30 px-2 py-1 rounded">02_PROCESS</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Inversion Engine</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                The Engine calculates systemic voltage and identifies fusion triangles in real-time.
                            </p>
                        </div>

                        {/* Column 03 */}
                        <div className="flex flex-col items-start text-left space-y-6 group">
                            <span className="text-sm font-mono text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded">03_OUTPUT</span>
                            <h4 className="text-xl font-medium text-white tracking-wide">Protocol</h4>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                Receive actionable, mechanical protocols to neutralize entropy and restore authority.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 02: OPERATIONAL CAPABILITIES (Cards - Left Aligned) */}
            <section className="py-32 bg-zinc-950 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-left mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-xs font-bold tracking-[0.4em] text-white/40 uppercase mb-4">Modules</h2>
                        <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">Operational Capabilities</h3>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* ECHO CARD */}
                        <div className="group relative h-[420px] bg-black border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col p-10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="flex justify-between items-start mb-auto">
                                <h3 className="text-3xl font-bold text-white tracking-tight">ECHO</h3>
                                <ArrowRight className="text-white/20 -rotate-45 group-hover:rotate-0 group-hover:text-cyan-400 transition-all duration-500" />
                            </div>

                            <div className="relative z-10 space-y-6 mt-auto">
                                <div>
                                    <h4 className="text-sm text-white/60 uppercase tracking-widest mb-2">Individual Telemetry</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        Establish your mechanical baseline. Identify shadow triggers and core drive.
                                    </p>
                                </div>
                                <Link to="/echo" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-all">
                                    Launch Module_
                                </Link>
                            </div>
                        </div>

                        {/* ORBIT CARD */}
                        <div className="group relative h-[420px] bg-black border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col p-10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="flex justify-between items-start mb-auto">
                                <h3 className="text-3xl font-bold text-white tracking-tight">ORBIT</h3>
                                <ArrowRight className="text-white/20 -rotate-45 group-hover:rotate-0 group-hover:text-purple-400 transition-all duration-500" />
                            </div>

                            <div className="relative z-10 space-y-6 mt-auto">
                                <div>
                                    <h4 className="text-sm text-white/60 uppercase tracking-widest mb-2">Relational CRM</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        Map pressure transparency and team dynamics. Visualize the geometry of connection.
                                    </p>
                                </div>
                                <Link to="/relational" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-purple-400 transition-all">
                                    Launch Module_
                                </Link>
                            </div>
                        </div>

                        {/* SIGNAL CARD */}
                        <div className="group relative h-[420px] bg-black/50 border border-dashed border-white/5 flex flex-col p-10 opacity-50">
                            <div className="absolute top-10 right-10">
                                <Lock size={16} className="text-white/20" />
                            </div>
                            <h3 className="text-3xl font-bold text-white/30 tracking-tight mb-auto">SIGNAL</h3>
                            <div className="relative z-10 space-y-6 mt-auto">
                                <div>
                                    <h4 className="text-sm text-white/30 uppercase tracking-widest mb-2">Real-time Filtration</h4>
                                    <p className="text-white/20 text-sm leading-relaxed">
                                        Prevent relational breakdown before it occurs. Active monitoring.
                                    </p>
                                </div>
                                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 cursor-not-allowed">
                                    Status: Offline
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
