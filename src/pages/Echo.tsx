import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Echo() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/30">
            <Header />

            {/* HERO SECTION - Centered */}
            <section className="relative pt-32 pb-20 px-6 sm:px-12 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-black to-black">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <span className="inline-block text-xs font-mono tracking-widest text-gray-300 mb-8 border border-white/50 px-4 py-1 rounded-full uppercase bg-white/5 animate-pulse">
                        ECHO: Personal Manual
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] mb-8">
                        What drains you. <br />
                        <span className="text-white/40">What restores you.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                        ECHO turns your data into a short, plain-language manual: the few rules that keep you stable under pressure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link
                            to="/start"
                            className="inline-flex h-14 px-10 items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-black hover:bg-gray-100 transition-all rounded-full uppercase shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                        >
                            Generate Manual ($29)
                        </Link>
                        <Link
                            to="/relational"
                            className="inline-flex h-14 px-10 items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all rounded-full uppercase"
                        >
                            View System Maps
                        </Link>
                    </div>

                    <p className="mb-12 text-[10px] text-white/30 font-mono tracking-wider">
                        * INSTANT DELIVERY • ENCRYPTED • CLINICAL GRADE
                    </p>

                    {/* VISUAL MOCKUP - Centered abstract representation */}
                    <div className="relative w-full max-w-lg">
                        <div className="absolute inset-0 bg-white/10 blur-[80px] rounded-full"></div>
                        <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                            <div className="space-y-6 opacity-80 text-left">
                                <div className="h-2 w-20 bg-white rounded"></div>
                                <div className="h-8 w-3/4 bg-white/10 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-full bg-white/5 rounded"></div>
                                    <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                                </div>
                                <div className="p-4 border border-white/20 bg-white/5 rounded-lg flex items-center justify-between">
                                    <div className="text-xs font-mono text-gray-300">PRESSURE RESPONSE DETECTED</div>
                                    <div className="h-2 w-12 bg-white/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET SECTION */}
            <section className="py-24 px-6 sm:px-12 bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-light mb-6 text-white">
                            Your Operating System
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* FEATURE 1 */}
                        <div className="p-10 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group text-center hover:-translate-y-1 duration-300">
                            <span className="text-white/50 font-mono text-xl mb-6 block">01</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-gray-300 transition-colors">Core Design</h3>
                            <p className="text-white/50 leading-relaxed text-sm">
                                A clear picture of your base operating state. How you process data, where your edges are, and what constitutes your "normal" before the world interferes.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="p-10 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group text-center hover:-translate-y-1 duration-300">
                            <span className="text-white/50 font-mono text-xl mb-6 block">02</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-gray-300 transition-colors">Pressure Protocols</h3>
                            <p className="text-white/50 leading-relaxed text-sm">
                                The specific patterns that emerge when your systemic pressure elevates. Know exactly where you degrade so you can catch it before collapse.
                            </p>
                        </div>

                        {/* FEATURE 3 */}
                        <div className="p-10 border border-white/10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group text-center hover:-translate-y-1 duration-300">
                            <span className="text-white/50 font-mono text-xl mb-6 block">03</span>
                            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-gray-300 transition-colors">Coherence Strategy</h3>
                            <p className="text-white/50 leading-relaxed text-sm">
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
                        className="inline-flex h-16 px-12 items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-black hover:bg-gray-100 hover:text-black transition-all rounded-full uppercase shadow-2xl mb-8"
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
