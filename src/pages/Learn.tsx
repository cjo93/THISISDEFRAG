
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Telescope, Microscope, Shield, Database, Users, Rocket, Sparkles, Brain, Search, HelpCircle } from 'lucide-react';

export default function Learn() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
            <Header />

            {/* Hero Section — Premium Spacing */}
            <section className="pt-40 pb-32 px-6 border-b border-white/5 bg-black relative">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-10 rounded-full animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Knowledge Base
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1] mb-10 text-white drop-shadow-2xl">
                        The science behind <br />
                        <span className="text-orange-500">your user manual.</span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-16 antialiased">
                        DEFRAG is built on deterministic math, clinical safety protocols, and NASA-grade telemetry. <br className="hidden md:block" /> Not mysticism. Not diagnosis. Just mechanical transparency.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
                        <Link to="/start" className="group h-16 w-full flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.15em] font-bold hover:bg-white transition-all duration-300 rounded-full uppercase shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                            Start Analysis
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* THE MANTRAS — Spacious and Rich */}
            <section className="py-32 px-6 bg-zinc-950 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24 flex flex-col items-center">
                        <h2 className="text-3xl sm:text-5xl font-light mb-6 tracking-tight text-white">Understanding the Mantras</h2>
                        <div className="h-px w-24 bg-white/10" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* No Astrology, Astrology */}
                        <div className="p-12 rounded-[40px] border border-orange-500/10 bg-orange-500/[0.01] hover:bg-orange-500/[0.03] transition-all duration-500 group overflow-hidden relative">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                    <Telescope size={24} />
                                </div>
                                <h3 className="text-3xl font-light text-white tracking-tight">No Astrology, Astrology</h3>
                            </div>
                            <p className="text-xl text-white/70 italic font-light mb-10 leading-relaxed">
                                "We use planetary positions—but not in the way you think."
                            </p>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono tracking-widest text-red-400/40 uppercase">EXCLUSION</div>
                                    <p className="text-white/40 leading-relaxed font-light">
                                        Fortune-telling, mystical predictions, or claiming planets "cause" personality traits.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono tracking-widest text-green-400/40 uppercase">IMPLEMENTATION</div>
                                    <p className="text-white/40 leading-relaxed font-light">
                                        NASA JPL Horizons data to calculate precise planetary vectors at your birth moment. These become <span className="text-white">Environmental Pressure</span> markers—deterministic data points that correlate with observable behavioral patterns.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
                        </div>

                        {/* No Psychology, Psychology */}
                        <div className="p-12 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group overflow-hidden relative">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                    <Brain size={24} />
                                </div>
                                <h3 className="text-3xl font-light text-white tracking-tight">No Psychology, Psychology</h3>
                            </div>
                            <p className="text-xl text-white/70 italic font-light mb-10 leading-relaxed">
                                "We ground in clinical theory—but we don't diagnose."
                            </p>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono tracking-widest text-red-400/40 uppercase">EXCLUSION</div>
                                    <p className="text-white/40 leading-relaxed font-light">
                                        Providing therapy, diagnosing mental health conditions, or replacing licensed clinical care.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono tracking-widest text-green-400/40 uppercase">IMPLEMENTATION</div>
                                    <p className="text-white/40 leading-relaxed font-light">
                                        Bowen Family Systems and Attachment frameworks to reveal <span className="text-white">mechanical patterns</span> in your relational operating system. We explain how stress propagates—not what's wrong with you.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* THE TECH STACK — Refined Grid */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* NASA */}
                        <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform">
                                <Database size={20} />
                            </div>
                            <h3 className="text-xl font-light text-white mb-4">NASA JPL Horizons</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-light italic">
                                Interplanetary telemetry calculated to sub-arcsecond precision.
                            </p>
                        </div>

                        {/* PRESSURE */}
                        <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                                <Rocket size={20} />
                            </div>
                            <h3 className="text-xl font-light text-white mb-4">Orbital Pressure</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-light italic">
                                Mapping topocentric vectors to observable relational mechanics.
                            </p>
                        </div>

                        {/* SEDA */}
                        <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:scale-110 transition-transform">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-xl font-light text-white mb-4">SEDA Firewall</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-light italic">
                                Multi-layered safety gating for clinical compliance and boundary detection.
                            </p>
                        </div>

                        {/* ORBIT */}
                        <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="text-xl font-light text-white mb-4">Relational Geometry</h3>
                            <p className="text-white/40 text-sm leading-relaxed font-light italic">
                                Visualizing family system pressure points through systemic triangulation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR — Emoji Replacement */}
            <section className="py-32 px-6 bg-zinc-950 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-light mb-20 tracking-tight text-white text-center">User Verticals</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Parents & Families", desc: "Understand mechanical stress propagation between nodes (parents/children).", Icon: Users },
                            { title: "Couples", desc: "Stop guessing. See the mechanical patterns driving distance or pursuit.", Icon: HeartIcon },
                            { title: "High-Coherence States", desc: "Navigate elevated experiences with mechanical transparency—not pathology.", Icon: Sparkles },
                            { title: "Founders & Leaders", desc: "Map team dynamics and pressure points before system failure.", Icon: Rocket },
                            { title: "Therapists & Coaches", desc: "Add industrial-grade mechanical mapping to your existing practice.", Icon: Microscope },
                            { title: "Individual Research", desc: "For those exhausted with self-reporting and seeking deterministic data.", Icon: Search }
                        ].map((persona, i) => {
                            const Icon = persona.Icon === HeartIcon ? Rocket : persona.Icon; // Simple swap or custom if needed
                            return (
                                <div key={i} className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-orange-500 mb-8 transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-xl font-light text-white mb-4 tracking-tight">{persona.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-light">{persona.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ — Refined Accents */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-light mb-20 tracking-tight text-white flex items-center gap-6">
                        <HelpCircle size={40} className="text-white/10" />
                        Common Questions
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                q: "Is this therapy or mental health treatment?",
                                a: "No. DEFRAG provides mechanical transparency about relational patterns—not diagnosis or clinical care. Safety always comes first."
                            },
                            {
                                q: "Is this fortune-telling or predictive astrology?",
                                a: "No. We use planetary telemetry as Environmental Pressure data points, identifying patterns, not predicting futures."
                            },
                            {
                                q: "What happens during a SEDA lock?",
                                a: "If your safety score degrades below threshold, the system restricts analytical insights in favor of somatic stabilization protocols."
                            },
                            {
                                q: "Can I use this alongside therapy?",
                                a: "Yes. Many users treat DEFRAG as a diagnostic dashboard that complements their clinical work with a therapist."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all">
                                <h3 className="text-xl font-light text-orange-400 mb-6 tracking-tight">{faq.q}</h3>
                                <p className="text-lg text-white/40 leading-relaxed font-light italic">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — Final Touch */}
            <section className="py-40 px-6 bg-black text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
                    <h2 className="text-4xl sm:text-6xl font-light text-white mb-10 tracking-tight">Stop flying blind.</h2>
                    <p className="text-xl text-white/40 mb-16 leading-relaxed font-light max-w-2xl">
                        Ready to see the mechanical patterns governing your dynamic?
                    </p>
                    <Link to="/start" className="group h-16 px-16 flex items-center justify-center bg-white text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-full uppercase shadow-2xl">
                        Deploy System
                        <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
            </section>

            <Footer />
        </div>
    );
}

function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
