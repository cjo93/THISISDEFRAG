import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Platform() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <Header />

            {/* HERO */}
            <section className="pt-32 pb-20 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/10 via-black to-black">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block text-xs font-mono tracking-widest text-orange-400 mb-6 border border-orange-500/30 px-3 py-1 rounded bg-slate-900/10 uppercase">
                        DEFRAG API — Safety Layer
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
                        Keep people safe<br />
                        <span className="text-white/40">when talking about big life topics.</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                        api.defrag.app checks if a user looks overloaded, tells you when to switch into grounding mode, and keeps risky advice from ever leaving your system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex h-14 px-8 items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-[0_0_30px_rgba(6,182,212,0.3)]">
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
                        <div className="h-12 w-12 bg-orange-500/10 rounded flex items-center justify-center text-orange-400 text-2xl">🛡️</div>
                        <h3 className="text-2xl text-white font-light">SEDA Safety Check</h3>
                        <p className="text-white/50 leading-relaxed">
                            Scores how literal and unstable a user sounds, then returns one clear instruction: full content, reduce intensity, or switch to grounding only.
                        </p>
                    </div>
                    {/* TELEMETRY */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-orange-500/10 rounded flex items-center justify-center text-orange-400 text-2xl">📡</div>
                        <h3 className="text-2xl text-white font-light">Pressure Forecast</h3>
                        <p className="text-white/50 leading-relaxed">
                            Turns NASA data into "pressure today" for a user's location, so your product can time hard conversations for lower friction.
                        </p>
                    </div>
                    {/* ORBIT */}
                    <div className="space-y-4">
                        <div className="h-12 w-12 bg-orange-500/10 rounded flex items-center justify-center text-orange-400 text-2xl">🔗</div>
                        <h3 className="text-2xl text-white font-light">Friction Map</h3>
                        <p className="text-white/50 leading-relaxed">
                            Ingests a roster and returns which pairs strain the system, which roles are missing, and where a mediator is non-optional.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING - Single Builder Testing Tier */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-mono tracking-widest bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full border border-orange-500/20 uppercase">Private Testing</span>
                        <h2 className="text-3xl font-light mt-6 mb-4">API Access</h2>
                        <p className="text-white/50">We're testing this with a small group.</p>
                    </div>

                    {/* Single Builder Tier */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl text-white font-mono mb-2">Builder (testing)</h3>
                                <div className="text-3xl font-light text-white mb-4">From $99<span className="text-lg text-white/40">/mo</span></div>
                                <ul className="space-y-2 text-sm text-white/60 font-mono">
                                    <li>• Up to 5,000 calls a month while we're in testing</li>
                                    <li>• Safety scores, pressure scores, and basic group mapping</li>
                                    <li>• If you need more, we'll discuss a custom testing agreement</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="px-8 py-4 border border-white/20 text-white/50 uppercase text-xs tracking-widest font-bold rounded cursor-not-allowed">
                                    Not Open Yet
                                </button>
                                <a
                                    href="mailto:help@defrag.app?subject=API%20Access%20Request"
                                    className="text-center px-8 py-3 text-orange-400 border border-orange-500/30 uppercase text-xs tracking-widest font-bold rounded hover:bg-orange-500/10 transition"
                                >
                                    Request Access
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-white/30 text-xs font-mono mt-8">
                        If you've been invited, sign in and check your dashboard.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 text-center text-white/20 text-xs font-mono border-t border-white/5">
                API STATUS: OPERATIONAL
            </footer>

        </div>
    );
}
