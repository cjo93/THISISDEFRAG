
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Scale, Database, Zap, ArrowRight, Mail } from 'lucide-react';
import DevAccessModal from '../components/DevAccessModal';

export default function Agents() {
    const [showDevModal, setShowDevModal] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <Header />

            {/* HERO — Spacious, Aligned, Premium */}
            <section className="pt-40 pb-32 px-6 sm:px-12 border-b border-white/5 bg-black relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        PHASE 2.5 ACTIVE
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
                        Safety Barriers for<br />
                        <span className="text-white/30">Autonomous Minds.</span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        Give your AI agents a conscience. Real-time alignment checks, hallucination prevention, and SEDA auditing for autonomous systems.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto mb-16">
                        <button className="group h-16 px-12 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                            Deploy Agent
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="h-16 px-12 flex items-center justify-center border border-white/20 text-white text-sm tracking-[0.15em] font-medium hover:bg-white/[0.05] hover:border-white/40 transition-all duration-300 rounded-full uppercase">
                            View Specs
                        </button>
                    </div>
                </div>

                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* AGENT INFRASTRUCTURE GRID — No Emojis, Clean Icons */}
            <section className="py-32 px-6 border-b border-white/5 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* HALLUCINATION */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8">
                                <Shield size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">Hallucination Firewall</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                Real-time semantic drift detection. We stop your agent from inventing facts before the user sees them.
                            </p>
                        </div>

                        {/* ALIGNMENT */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8">
                                <Scale size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">Recursive Alignment</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                Every thought loop is checked against your core directives. SEDA-audit your agent's internal monologue.
                            </p>
                        </div>

                        {/* MEMORY */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-8">
                                <Database size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-white tracking-tight">Sanitized Memory</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                Auto-redact PII and dangerous context from your agent's vector store. Keep your long-term memory clean.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING — Clean, Aligned, Professional */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 flex flex-col items-center">
                        <div className="text-[10px] font-mono tracking-[0.2em] bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full border border-orange-500/20 uppercase mb-8">
                            Private Testing
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-light mb-6 tracking-tight">Agent Infrastructure</h2>
                        <p className="text-white/40 text-lg font-light tracking-wide max-w-xl">We're testing this with a small group of enterprise partners.</p>
                    </div>

                    {/* Tier Card */}
                    <div className="p-10 sm:p-16 rounded-[40px] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                            <div className="flex-1">
                                <div className="text-orange-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Builder Tier</div>
                                <h3 className="text-3xl font-light text-white mb-6 tracking-tight">Enterprise Alpha</h3>
                                <div className="text-5xl font-light text-white mb-10 flex items-baseline gap-2">
                                    $99 <span className="text-xl text-white/30 font-light">/ month</span>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        'Up to 5,000 recursive-audit calls',
                                        'Hallucination Firewall & Memory Sanitization',
                                        'SEDA Integrity scoring dashboard',
                                        'Dedicated technical onboarding'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white/60 font-light text-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-6 lg:w-80">
                                <button className="h-16 w-full bg-white/5 border border-white/10 text-white/30 uppercase text-xs tracking-[0.2em] font-bold rounded-full cursor-not-allowed">
                                    Closed Testing
                                </button>
                                <a
                                    href="mailto:help@defrag.app?subject=Agent%20API%20Access%20Request"
                                    className="h-16 w-full flex items-center justify-center bg-white text-black text-xs tracking-[0.2em] font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    REQUEST ACCESS
                                </a>
                            </div>
                        </div>

                        {/* Card Backdrop Glow */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-[100px] group-hover:bg-orange-500/[0.08] transition-colors duration-700" />
                    </div>

                    <p className="mt-12 text-center text-white/20 text-xs font-mono tracking-widest uppercase">
                        Current latency: 24ms • Cluster status: Stable
                    </p>
                </div>
            </section>

            <Footer />

            <DevAccessModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
        </div>
    );
}
