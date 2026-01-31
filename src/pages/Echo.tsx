import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Echo() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <Header />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-mono tracking-widest text-orange-400 mb-6 border-l border-orange-500/50 pl-3 uppercase">
                            ECHO: Personal Design Specification
                        </span>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] mb-8">
                            The User Manual for <br />
                            <span className="text-white/40">Your Operating System.</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/60 font-light mb-10 max-w-2xl leading-relaxed">
                            Stop guessing why you function the way you do. Get the mechanical schematics of your cognitive and emotional architecture.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/start"
                                className="inline-flex h-14 px-8 items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]"
                            >
                                Generate Manual ($19)
                            </Link>
                            <Link
                                to="/relational"
                                className="inline-flex h-14 px-8 items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase"
                            >
                                View System Maps
                            </Link>
                        </div>
                        <p className="mt-4 text-[10px] text-white/30 font-mono tracking-wider">
                            * INSTANT DELIVERY • ENCRYPTED • CLINICAL GRADE
                        </p>
                    </div>

                    {/* VISUAL MOCKUP */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-orange-500/5 blur-[100px] rounded-full"></div>
                        <div className="relative border border-white/10 bg-black/50 backdrop-blur-xl rounded-xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                            <div className="space-y-6 opacity-80">
                                <div className="h-2 w-20 bg-orange-500 rounded"></div>
                                <div className="h-8 w-3/4 bg-white/10 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                                </div>
                                <div className="p-6 border border-orange-500/20 bg-orange-500/5 rounded-lg">
                                    <div className="text-xs font-mono text-orange-400 mb-2">PRESSURE RESPONSE DETECTED</div>
                                    <div className="h-2 w-1/2 bg-orange-500/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET SECTION */}
            <section className="py-24 px-6 sm:px-12 bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* FEATURE 1 */}
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                            <span className="text-orange-500/50 font-mono text-xl mb-6 block">01</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-orange-400 transition-colors">Core Design</h3>
                            <p className="text-white/50 leading-relaxed">
                                A clear picture of your base operating state. How you process data, where your edges are, and what constitutes your "normal" before the world interferes.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                            <span className="text-orange-500/50 font-mono text-xl mb-6 block">02</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-orange-400 transition-colors">Pressure Protocols</h3>
                            <p className="text-white/50 leading-relaxed">
                                The specific patterns that emerge when your systemic pressure elevates. Know exactly where you degrade so you can catch it before collapse.
                            </p>
                        </div>

                        {/* FEATURE 3 */}
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                            <span className="text-orange-500/50 font-mono text-xl mb-6 block">03</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-orange-400 transition-colors">Coherence Strategy</h3>
                            <p className="text-white/50 leading-relaxed">
                                Mechanical strategies to stabilize your own design. No affirmations—just architectural adjustments to regain signal clarity.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="w-full py-20 border-t border-white/5 bg-black text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl sm:text-5xl font-light text-white mb-8">
                        Stop flying blind.
                    </h2>
                    <Link
                        to="/start"
                        className="inline-flex h-16 px-12 items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all rounded-lg uppercase shadow-2xl"
                    >
                        Get Your Manual Now
                    </Link>
                    <p className="mt-6 text-white/30 text-xs font-mono">
                        Full refund if your manual doesn't accurately describe your internal state.
                    </p>
                </div>
            </section>

            {/* SIMPLE FOOTER */}
            <footer className="w-full border-t border-white/5 py-8 text-center text-[10px] text-white/20 font-mono tracking-widest uppercase">
                &copy; 2026 DEFRAG • COGNITIVE MIDDLEWARE
            </footer>

        </div>
    );
}
