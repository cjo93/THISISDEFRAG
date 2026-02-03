
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, BookOpen, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

export default function Echo() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
            <Header />

            {/* HERO — Centered, Spacious, Premium */}
            <section className="relative pt-40 pb-32 px-6 sm:px-12 border-b border-white/5 bg-black overflow-hidden">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        ECHO: PERSONAL MANUAL
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
                        What drains you.<br />
                        <span className="text-white/30">What restores you.</span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        ECHO turns your behavioral data into a plain-language operating manual: the few rules that keep you stable under systemic pressure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-20 w-full max-w-lg justify-center">
                        <Link
                            to="/start"
                            className="group h-16 px-12 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]"
                        >
                            Generate Manual
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/relational"
                            className="h-16 px-12 flex items-center justify-center border border-white/20 text-white text-sm tracking-[0.15em] font-medium hover:bg-white/[0.05] transition-all duration-300 rounded-full uppercase"
                        >
                            System Maps
                        </Link>
                    </div>

                    <div className="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-700">
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white">
                            <ShieldAlert size={14} className="text-orange-500" />
                            Encrypted
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white">
                            <BookOpen size={14} className="text-orange-500" />
                            Instant Delivery
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white">
                            <UserCheck size={14} className="text-orange-500" />
                            Clinical Grade
                        </div>
                    </div>
                </div>

                {/* VISUAL FLOURISH — Glowing orb behind mockup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* PRODUCT SHOWCASE — Grid Alignment */}
            <section className="py-32 px-6 sm:px-12 bg-zinc-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 flex flex-col items-center">
                        <h2 className="text-3xl sm:text-5xl font-light mb-6 tracking-tight text-white">Your Operating System</h2>
                        <div className="h-px w-24 bg-white/10 mb-8" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 px-4">
                        {/* FEATURE 1 */}
                        <div className="p-12 border border-white/5 rounded-[40px] bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Sparkles size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light text-white mb-6 tracking-tight group-hover:text-white transition-colors">Core Design</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                A clear picture of your base operating state. How you process data, where your edges are, and what constitutes your "normal" before the world interferes.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="p-12 border border-white/5 rounded-[40px] bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Zap size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light text-white mb-6 tracking-tight group-hover:text-white transition-colors">Pressure Protocols</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                The specific patterns that emerge when systemic pressure elevates. Know exactly where you degrade so you can catch it before systemic collapse.
                            </p>
                        </div>

                        {/* FEATURE 3 */}
                        <div className="p-12 border border-white/5 rounded-[40px] bg-white/[0.01] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-500 mb-10">
                                <Target size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light text-white mb-6 tracking-tight group-hover:text-white transition-colors">Coherence Strategy</h3>
                            <p className="text-white/50 leading-loose text-base font-light">
                                Mechanical strategies to stabilize your own design. No affirmations—just architectural adjustments to regain signal clarity and flow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION — Bold, Premium */}
            <section className="w-full py-40 border-t border-white/5 bg-black text-center px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="text-4xl sm:text-6xl font-light text-white mb-10 tracking-tight">
                        Stop flying blind.
                    </h2>
                    <Link
                        to="/start"
                        className="group h-16 px-16 flex items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-full uppercase shadow-2xl mb-12"
                    >
                        Get Your Manual
                        <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-white/30 text-xs font-mono tracking-[0.2em] uppercase">
                        Full guarantee: Precision mapping or full refund.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
