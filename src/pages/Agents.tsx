import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Agents() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header />

            {/* HERO */}
            <section className="pt-32 pb-20 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block text-xs font-mono tracking-widest text-purple-400 mb-6 border border-purple-500/30 px-3 py-1 rounded bg-purple-900/10 uppercase animate-pulse">
                        Phase 2.5 Active
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
                        Safety Barriers for<br />
                        <span className="text-white/40">Autonomous Minds</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                        Give your AI agents a conscience. Real-time alignment checks, hallucination prevention, and SEDA auditing for autonomous systems.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex h-14 px-8 items-center justify-center bg-purple-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-purple-400 transition-all rounded-lg uppercase shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            Deploy Agent
                        </button>
                        <button className="inline-flex h-14 px-8 items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">
                            View Specs
                        </button>
                    </div>
                </div>
            </section>

            {/* AGENT FEATURES */}
            <section className="py-24 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                    {/* HALLUCINATION */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 text-2xl">👁️</div>
                        <h3 className="text-2xl text-white font-light">Hallucination Firewall</h3>
                        <p className="text-white/50 leading-relaxed">
                            Real-time semantic drift detection. We stop your agent from inventing facts before the user sees them.
                        </p>
                    </div>
                    {/* ALIGNMENT */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 text-2xl">⚖️</div>
                        <h3 className="text-2xl text-white font-light">Recursive Alignment</h3>
                        <p className="text-white/50 leading-relaxed">
                            Every thought loop is checked against your core directives. SEDA-audit your agent's internal monologue.
                        </p>
                    </div>
                    {/* MEMORY */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 text-2xl">🧠</div>
                        <h3 className="text-2xl text-white font-light">Sanitized Memory</h3>
                        <p className="text-white/50 leading-relaxed">
                            Auto-redact PII and dangerous context from your agent's vector store. Keep your long-term memory clean.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-light text-center mb-16">Agent Pricing</h2>
                    <div className="grid md:grid-cols-4 gap-6">

                        {/* FREE */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg text-white font-mono mb-2">Hobby</h3>
                            <div className="text-3xl font-light text-white mb-4">$0<span className="text-sm text-white/40">/mo</span></div>
                            <ul className="space-y-2 text-xs text-white/60 mb-6 font-mono">
                                <li>• 1 Agent</li>
                                <li>• Basic SEDA Check</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition uppercase text-[10px] tracking-widest font-bold rounded">
                                Start
                            </button>
                        </div>

                        {/* STARTER */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg text-white font-mono mb-2">Starter</h3>
                            <div className="text-3xl font-light text-white mb-4">$29<span className="text-sm text-white/40">/mo</span></div>
                            <ul className="space-y-2 text-xs text-white/60 mb-6 font-mono">
                                <li>• 3 Agents</li>
                                <li>• Hallucination Firewall</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition uppercase text-[10px] tracking-widest font-bold rounded">
                                Subscribe
                            </button>
                        </div>

                        {/* PRO */}
                        <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-900/10 relative transform scale-105 shadow-2xl shadow-purple-900/20">
                            <div className="absolute top-0 right-0 bg-purple-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                                Popular
                            </div>
                            <h3 className="text-lg text-white font-mono mb-2">Pro</h3>
                            <div className="text-3xl font-light text-white mb-4">$99<span className="text-sm text-white/40">/mo</span></div>
                            <ul className="space-y-2 text-xs text-white/60 mb-6 font-mono">
                                <li>• 10 Agents</li>
                                <li>• Full Memory Audit</li>
                                <li>• Priority Latency</li>
                            </ul>
                            <button className="w-full py-3 bg-purple-500 text-black hover:bg-purple-400 transition uppercase text-[10px] tracking-widest font-bold rounded shadow-lg shadow-purple-500/20">
                                Go Pro
                            </button>
                        </div>

                        {/* ENTERPRISE */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg text-white font-mono mb-2">Grid</h3>
                            <div className="text-3xl font-light text-white mb-4">Custom</div>
                            <ul className="space-y-2 text-xs text-white/60 mb-6 font-mono">
                                <li>• Unlimited Fleet</li>
                                <li>• On-prem Deploy</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition uppercase text-[10px] tracking-widest font-bold rounded">
                                Contact
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
