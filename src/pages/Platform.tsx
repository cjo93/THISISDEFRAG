
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Shield, Radio, Network, ArrowRight, Lock, Code2, Globe, Cpu } from 'lucide-react';

export default function Platform() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
            <Header />

            {/* HERO */}
            <section className="pt-40 pb-32 px-8 bg-black relative min-h-[80vh] flex flex-col justify-center items-center text-center">
                <div className="max-w-4xl mx-auto relative z-10">

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium leading-tight tracking-tight mb-12 text-white">
                        The DEFRAG Platform
                    </h1>

                    <p className="text-xl sm:text-3xl text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                        Infrastructure for stable human systems at scale.
                    </p>

                    <p className="text-lg text-white/30 max-w-2xl mx-auto mb-20 leading-relaxed font-light">
                        The DEFRAG platform provides deterministic tools for measuring, modeling, and managing relational pressure across individuals and groups.
                        <br /><br />
                        It is designed for environments where failure is costly—organizations, platforms, and high-stakes human systems.
                    </p>

                    <div className="flex justify-center w-full">
                        <a href="#features" className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                            View Platform Features
                        </a>
                    </div>
                </div>

                {/* Visual depth detail */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-none blur-[180px] pointer-events-none" />
            </section>

            {/* FEATURES LIST */}
            <section id="features" className="py-40 bg-zinc-950 border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group">
                            <h3 className="text-2xl font-light text-white mb-6 uppercase tracking-wide">Clear Baselines</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Establish clear baselines for human interaction, enabling objective measurement of deviation and stress.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group">
                            <h3 className="text-2xl font-light text-white mb-6 uppercase tracking-wide">Predictable Behavior</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Model and predict system behavior under stress, allowing for preemptive intervention.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-10 border border-white/10 bg-black hover:border-white/30 transition-all duration-500 group">
                            <h3 className="text-2xl font-light text-white mb-6 uppercase tracking-wide">Built-in Safety</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Implement built-in safety constraints for sensitive contexts, preventing catastrophic relational failure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
