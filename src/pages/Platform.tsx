import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Platform() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <Header />

            {/* HERO */}
            <section className="pt-32 pb-20 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block text-xs font-mono tracking-widest text-cyan-400 mb-6 border border-cyan-500/30 px-3 py-1 rounded bg-cyan-900/10 uppercase">
                        DEFRAG API v2
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
                        Cognitive Infrastructure<br />
                        <span className="text-white/40">for Human Systems.</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                        Add NASA-grade orbital telemetry and clinical safety barriers to your wellness platform with a single API.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex h-14 px-8 items-center justify-center bg-cyan-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-cyan-400 transition-all rounded-lg uppercase shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            Get API Keys
                        </button>
                        <Link to="/docs" className="inline-flex h-14 px-8 items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase">
                            Read Docs
                        </Link>
                    </div>
                </div>
            </section>

            {/* THREE PILLARS */}
            <section className="py-24 px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                    {/* SEDA */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400 text-2xl">🛡️</div>
                        <h3 className="text-2xl text-white font-light">SEDA Clinical Firewall</h3>
                        <p className="text-white/50 leading-relaxed">
                            Automated safety auditing for AI outputs. Detects esoteric delusion risk and throttles content based on SEDA scores.
                        </p>
                    </div>
                    {/* TELEMETRY */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400 text-2xl">📡</div>
                        <h3 className="text-2xl text-white font-light">NASA Telemetry</h3>
                        <p className="text-white/50 leading-relaxed">
                            Sub-arcsecond planetary position vectors. Topocentric precision for biologically accurate environmental pressure mapping.
                        </p>
                    </div>
                    {/* ORBIT */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400 text-2xl">🔗</div>
                        <h3 className="text-2xl text-white font-light">Relational Geometry</h3>
                        <p className="text-white/50 leading-relaxed">
                            Map the friction and flow between any two human systems. Identify structural pressure points in teams and families.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-light text-center mb-16">Infrastructure Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* FREE */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-xl text-white font-mono mb-2">Hobby</h3>
                            <div className="text-4xl font-light text-white mb-6">$0<span className="text-lg text-white/40">/mo</span></div>
                            <ul className="space-y-3 text-sm text-white/60 mb-8 font-mono">
                                <li>• 1,000 req/mo</li>
                                <li>• Telemetry Only</li>
                                <li>• Community Support</li>
                            </ul>
                            <button className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition uppercase text-xs tracking-widest font-bold rounded">
                                Start Free
                            </button>
                        </div>

                        {/* PRO */}
                        <div className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-900/5 relative">
                            <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                                Recommended
                            </div>
                            <h3 className="text-xl text-white font-mono mb-2">Pro</h3>
                            <div className="text-4xl font-light text-white mb-6">$499<span className="text-lg text-white/40">/mo</span></div>
                            <ul className="space-y-3 text-sm text-white/60 mb-8 font-mono">
                                <li>• 50,000 req/mo</li>
                                <li>• All Endpoints (SEDA + Relay)</li>
                                <li>• Priority Support</li>
                            </ul>
                            <button className="w-full py-4 bg-cyan-500 text-black hover:bg-cyan-400 transition uppercase text-xs tracking-widest font-bold rounded shadow-lg shadow-cyan-500/20">
                                Subscribe
                            </button>
                        </div>

                        {/* ENTERPRISE */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-xl text-white font-mono mb-2">Enterprise</h3>
                            <div className="text-4xl font-light text-white mb-6">Custom</div>
                            <ul className="space-y-3 text-sm text-white/60 mb-8 font-mono">
                                <li>• Unlimited Requests</li>
                                <li>• Custom SLA</li>
                                <li>• Dedicated Solutions Eng.</li>
                            </ul>
                            <button className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition uppercase text-xs tracking-widest font-bold rounded">
                                Contact Sales
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 text-center text-white/20 text-xs font-mono border-t border-white/5">
                API v2.0.0 • STATUS: OPERATIONAL
            </footer>

        </div>
    );
}
