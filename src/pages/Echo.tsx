import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Echo() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <Header />

            {/* HERO SECTION - Centered */}
            <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <span className="badge-premium mb-10 lg:mb-16">
                        ECHO: Personal Manual
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-8">
                        What drains you. <br />
                        <span className="gradient-text">What restores you.</span>
                    </h1>
                    <p className="text-premium max-w-2xl mx-auto mb-12 lg:mb-16">
                        ECHO turns your data into a short, plain-language manual: the few rules that keep you stable under pressure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
                        <Link
                            to="/start"
                            className="button-primary"
                        >
                            Generate Manual ($29)
                        </Link>
                        <Link
                            to="/relational"
                            className="button-secondary"
                        >
                            View System Maps
                        </Link>
                    </div>

                    <p className="mb-12 text-[10px] text-white/30 font-mono tracking-wider">
                        INSTANT DELIVERY • ENCRYPTED • CLINICAL GRADE
                    </p>

                    {/* VISUAL MOCKUP - Centered abstract representation */}
                    <div className="relative w-full max-w-lg">
                        <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-full"></div>
                        <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                            <div className="space-y-6 opacity-80 text-left">
                                <div className="h-2 w-20 bg-orange-500 rounded"></div>
                                <div className="h-8 w-3/4 bg-white/10 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                                </div>
                                <div className="p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg flex items-center justify-between">
                                    <div className="text-xs font-mono text-orange-400">PRESSURE RESPONSE DETECTED</div>
                                    <div className="h-2 w-12 bg-orange-500/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET SECTION */}
            <section className="section-premium bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="section-header">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-white">
                            Your Operating System
                        </h2>
                        <p className="text-premium max-w-2xl mx-auto">
                            Everything you need to understand and stabilize yourself.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-10">

                        {/* FEATURE 1 */}
                        <div className="card-premium group text-center">
                            <div className="icon-box mx-auto mb-8">
                                <span className="font-mono text-lg font-bold">01</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all">Core Design</h3>
                            <p className="text-white/60 leading-relaxed text-base">
                                A clear picture of your base operating state. How you process data, where your edges are, and what constitutes your "normal" before the world interferes.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="card-premium group text-center">
                            <div className="icon-box mx-auto mb-8">
                                <span className="font-mono text-lg font-bold">02</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all">Pressure Protocols</h3>
                            <p className="text-white/60 leading-relaxed text-base">
                                The specific patterns that emerge when your systemic pressure elevates. Know exactly where you degrade so you can catch it before collapse.
                            </p>
                        </div>

                        {/* FEATURE 3 */}
                        <div className="card-premium group text-center">
                            <div className="icon-box mx-auto mb-8">
                                <span className="font-mono text-lg font-bold">03</span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4 group-hover:gradient-text transition-all">Coherence Strategy</h3>
                            <p className="text-white/60 leading-relaxed text-base">
                                Mechanical strategies to stabilize your own design. No affirmations—just architectural adjustments to regain signal clarity.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="w-full py-24 border-t border-white/5 bg-zinc-950 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-light text-white mb-10">
                        Stop flying blind.
                    </h2>
                    <Link
                        to="/start"
                        className="inline-flex h-16 px-12 items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-black hover:bg-orange-500 hover:text-white transition-all rounded-full uppercase shadow-2xl mb-8"
                    >
                        Get Your Manual Now
                    </Link>
                    <p className="text-white/30 text-xs font-mono">
                        Full refund if your manual doesn't accurately describe your internal state.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
