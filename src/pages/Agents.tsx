
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Shield, Scale, Database, Zap, ArrowRight, Mail, Terminal, Activity, Cpu } from 'lucide-react';
import DevAccessModal from '../components/DevAccessModal';

export default function Agents() {
    const [showDevModal, setShowDevModal] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden">
            <Header />

            {/* HERO — Spacious, Aligned, Premium */}
            <section className="pt-56 pb-40 px-8 bg-black relative overflow-hidden">
                <div className="max-w-6xl mx-auto text-center flex flex-col items-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-16 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                        Phase_2.5_Active
                    </div>

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter leading-[0.9] mb-16 text-white uppercase italic">
                        Safety Barriers for <br />
                        <span className="text-white/30 italic">Autonomous Minds.</span>
                    </h1>

                    <p className="text-xl sm:text-3xl text-white/40 max-w-4xl mx-auto leading-relaxed font-light mb-24 italic pr-4">
                        Give your AI agents a conscience. Real-time alignment checks, hallucination prevention, and SEDA auditing for autonomous systems.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto">
                        <button className="group h-24 w-full flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full uppercase shadow-2xl">
                            Deploy_Agent
                            <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />
            </section>

            {/* AGENT INFRASTRUCTURE GRID */}
            <section className="py-48 px-8 border-y border-white/5 bg-zinc-950 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* HALLUCINATION */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 group-hover:bg-white group-hover:text-black transition-all duration-700 mb-12 border border-white/5 shadow-xl">
                                <Shield size={28} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-light mb-8 text-white tracking-tighter uppercase italic group-hover:text-white/60 transition-colors">Hallucination_Firewall</h3>
                            <p className="text-white/30 text-lg font-light leading-relaxed italic">
                                Real-time semantic drift detection. We stop your agent from inventing facts before the user sees them.
                            </p>
                        </div>

                        {/* ALIGNMENT */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 group-hover:bg-white group-hover:text-black transition-all duration-700 mb-12 border border-white/5 shadow-xl">
                                <Scale size={28} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-light mb-8 text-white tracking-tighter uppercase italic group-hover:text-white/60 transition-colors">Recursive_Alignment</h3>
                            <p className="text-white/30 text-lg font-light leading-relaxed italic">
                                Every thought loop is checked against your core directives. SEDA-audit your agent's internal monologue.
                            </p>
                        </div>

                        {/* MEMORY */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 group-hover:bg-white group-hover:text-black transition-all duration-700 mb-12 border border-white/5 shadow-xl">
                                <Database size={28} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-light mb-8 text-white tracking-tighter uppercase italic group-hover:text-white/60 transition-colors">Sanitized_Memory</h3>
                            <p className="text-white/30 text-lg font-light leading-relaxed italic">
                                Auto-redact PII and dangerous context from your agent's vector store. Keep your long-term memory clean.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING — Clean, Aligned, Professional */}
            <section className="py-48 px-8 bg-black">
                <div className="max-w-6xl mx-auto space-y-32">
                    <div className="text-center space-y-8 flex flex-col items-center">
                        <div className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase italic border border-white/10 px-6 py-2 rounded-full">
                            Private_Testing_Protocol
                        </div>
                        <h2 className="text-5xl font-light text-white tracking-tighter uppercase italic">Agent_Infrastructure</h2>
                        <p className="text-2xl text-white/30 font-light italic max-w-2xl px-4">We are validating this architecture with a select group of enterprise partners.</p>
                    </div>

                    {/* Tier Card */}
                    <div className="p-20 rounded-[80px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-24">
                            <div className="flex-1 space-y-12">
                                <div className="space-y-4">
                                    <div className="text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase italic">Builder_Tier_v2</div>
                                    <h3 className="text-5xl font-light text-white tracking-tighter uppercase italic">Enterprise_Alpha</h3>
                                </div>
                                <div className="text-7xl font-light text-white flex items-baseline gap-4 italic tracking-tighter leading-none">
                                    $99 <span className="text-2xl text-white/20 font-light uppercase tracking-widest leading-none">/ Cycle</span>
                                </div>
                                <ul className="space-y-6">
                                    {[
                                        'Up to 5,000 recursive-audit calls',
                                        'Hallucination Firewall & Memory Sanitization',
                                        'SEDA Integrity scoring dashboard',
                                        'Dedicated technical onboarding'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-6 text-white/40 font-light text-xl italic">
                                            <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white transition-all duration-700" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-10 lg:w-96">
                                <button className="h-24 w-full border border-white/5 bg-white/[0.02] text-white/10 text-[10px] font-bold tracking-[0.5em] rounded-full cursor-not-allowed uppercase">
                                    Closed_Testing
                                </button>
                                <a
                                    href="mailto:help@defrag.app?subject=Agent%20API%20Access%20Request"
                                    className="h-24 w-full flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold rounded-full hover:bg-slate-200 transition-all duration-700 shadow-xl uppercase"
                                >
                                    Request_Access_Node
                                </a>
                            </div>
                        </div>

                        {/* Card Backdrop Glow */}
                        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px] group-hover:bg-white/[0.02] transition-colors duration-700 pointer-events-none" />
                    </div>

                    <div className="flex items-center justify-center gap-12 text-white/10 text-[10px] font-mono tracking-[0.6em] uppercase italic pt-12">
                        <div className="flex items-center gap-4">
                            <Activity size={14} strokeWidth={1} />
                            Latency: 24ms
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <div className="flex items-center gap-4">
                            <Cpu size={14} strokeWidth={1} />
                            Cluster_Status: Nominal
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
}
