
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Radio, Network, ArrowRight, Lock, Code2, Cpu } from 'lucide-react';

export default function Platform() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
            <Header />

            {/* HERO — API Focus */}
            <section className="pt-48 pb-32 px-6 sm:px-12 bg-black relative">
                <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-12 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        DEFRAG API — LAYER 0
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light leading-[1] tracking-tight mb-12 max-w-5xl">
                        Keep people safe <br />
                        <span className="text-white/30">during high-pressure interactions.</span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-light leading-relaxed italic">
                        `api.defrag.app` monitors system load, triggers grounding protocols, and restricts high-entropy content before deployment.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
                        <Link to="/developer" className="group h-16 w-full flex items-center justify-center bg-orange-500 text-black text-xs tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-2xl shadow-orange-500/10">
                            Get Access
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/docs" className="h-16 w-full flex items-center justify-center border border-white/10 bg-white/[0.02] text-white text-xs tracking-[0.2em] font-bold hover:bg-white/[0.05] hover:border-white/20 transition-all rounded-full uppercase">
                            Read Specs
                        </Link>
                    </div>
                </div>
                {/* Glow Detail */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* THREE PILLARS — Modular Grid */}
            <section className="py-40 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    {/* SEDA */}
                    <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-500 transition-colors mb-10">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6">SEDA Check</h3>
                        <p className="text-white/40 leading-relaxed font-light italic">
                            Returns deterministic safety instructions based on node stability. Graceful degradation from full bandwidth to grounding protocols.
                        </p>
                    </div>

                    {/* TELEMETRY */}
                    <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-500 transition-colors mb-10">
                            <Radio size={28} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6">Pressure Forecast</h3>
                        <p className="text-white/40 leading-relaxed font-light italic">
                            NASA-grade telemetry feeds. Identifies environmental entropy and times high-pressure deployments for optimal system coherence.
                        </p>
                    </div>

                    {/* ORBIT */}
                    <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 transition-colors mb-10">
                            <Network size={28} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6">Friction Topology</h3>
                        <p className="text-white/40 leading-relaxed font-light italic">
                            Maps relational geometry across multiple nodes. Identifies system lock-up points and non-optional mediation paths.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING — Single Layer */}
            <section className="py-40 px-6 bg-black">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 space-y-6">
                        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.4em] text-orange-500 mb-4 border border-orange-500/10 px-5 py-2 rounded-full bg-orange-500/[0.02] uppercase">
                            ALPHA_INTEGRATION
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight">API Access Protocol</h2>
                        <p className="text-xl text-white/30 font-light italic">Managed availability for production builders.</p>
                    </div>

                    {/* Single Merchant Card */}
                    <div className="p-16 rounded-[48px] border border-white/5 bg-zinc-950 relative group overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-3xl font-light text-white mb-2">Builder Alpha</h3>
                                    <div className="text-6xl font-light text-white tracking-tighter">$99<span className="text-sm font-mono text-white/20 tracking-normal ml-2 uppercase">/ cycle</span></div>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        '5,000 requests per billing cycle',
                                        'Full SEDA Gating & Feedback',
                                        'NASA JPL Telemetry Feed',
                                        'System Topology Mapping'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm font-light text-white/40 italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4 min-w-[240px]">
                                <button className="h-16 px-10 bg-white/5 text-white/20 border border-white/5 text-[10px] font-bold tracking-[0.2em] rounded-full cursor-not-allowed uppercase">
                                    Cohort Full
                                </button>
                                <a
                                    href="mailto:info@defrag.app?subject=API Protocol Request"
                                    className="h-16 px-10 border border-orange-500/20 text-orange-500 bg-orange-500/[0.02] text-[10px] font-bold tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500 flex items-center justify-center uppercase"
                                >
                                    Request Portal Access
                                </a>
                            </div>
                        </div>
                        {/* Detail */}
                        <div className="absolute top-0 right-0 p-8">
                            <Lock size={40} className="text-white/[0.02]" />
                        </div>
                    </div>

                    <p className="text-center text-[10px] font-mono tracking-widest text-white/20 mt-12 uppercase">
                        Authorized users please authenticate via the developer dashboard.
                    </p>
                </div>
            </section>

            {/* STATUS FOOTER */}
            <footer className="py-20 bg-black border-t border-white/5 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase">Topology Optimized: Optimal</span>
                </div>
                <div className="flex gap-8">
                    <Link to="/privacy" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
                    <Link to="/terms" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
                </div>
            </footer>
        </div>
    );
}
