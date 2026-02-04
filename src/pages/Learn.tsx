
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Telescope, Microscope, Shield, Database, Users, Rocket, Sparkles, Brain, Search, HelpCircle, Terminal, Activity, Cpu } from 'lucide-react';

export default function Learn() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-mono italic">
            <Header />

            {/* Hero Section — Premium Spacing */}
            <section className="pt-64 pb-32 px-8 bg-black relative">
                <div className="max-w-6xl mx-auto text-center flex flex-col items-center relative z-10 space-y-16">
                    <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full animate-fade-in shadow-2xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                        Knowledge_Base_Access
                    </div>

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tighter leading-none mb-10 text-white uppercase italic">
                        Technical_ <br />
                        <span className="text-white/40">Foundations.</span>
                    </h1>

                    <p className="text-2xl sm:text-3xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light italic antialiased pr-4">
                        DEFRAG is built on deterministic math, clinical safety protocols, and NASA-grade telemetry. Not mysticism. Not diagnosis. Just mechanical transparency.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-lg mx-auto pt-8">
                        <Link to="/start" className="group h-24 w-full flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full uppercase shadow-2xl italic">
                            Initialize_Analysis
                            <ArrowRight size={20} className="ml-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>

                {/* Background Ambient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
            </section>

            {/* THE MANTRAS — Spacious and Rich */}
            <section className="py-48 px-8 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto space-y-32">
                    <div className="text-center space-y-8 flex flex-col items-center">
                        <div className="text-[10px] tracking-[0.6em] text-white/20 uppercase italic underline decoration-white/5 underline-offset-8">Core_Principals</div>
                        <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white uppercase italic">Understanding the Mantras</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* No Astrology, Astrology */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group overflow-hidden relative shadow-2xl">
                            <div className="flex items-center gap-8 mb-16 relative z-10">
                                <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                    <Telescope size={28} strokeWidth={1} />
                                </div>
                                <h3 className="text-4xl font-light text-white tracking-tighter uppercase italic">No Astrology, Astrology</h3>
                            </div>
                            <p className="text-2xl text-white/60 italic font-light mb-16 leading-relaxed pr-8">
                                "We use planetary positions—but not in the way you think."
                            </p>
                            <div className="space-y-12 relative z-10">
                                <div className="space-y-4">
                                    <div className="text-[10px] tracking-[0.4em] text-white/10 uppercase italic">Fault_Exclusion</div>
                                    <p className="text-white/40 text-lg leading-relaxed font-light italic">
                                        Fortune-telling, mystical predictions, or claiming planets "cause" personality traits.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Implementation_Logic</div>
                                    <p className="text-white/40 text-lg leading-relaxed font-light italic">
                                        NASA JPL Horizons data to calculate precise planetary vectors at your birth moment. These become <span className="text-white">Environmental Pressure</span> markers—deterministic data points that correlate with observable behavioral patterns.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
                        </div>

                        {/* No Psychology, Psychology */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group overflow-hidden relative shadow-2xl text-right">
                            <div className="flex flex-row-reverse items-center gap-8 mb-16 relative z-10">
                                <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                    <Brain size={28} strokeWidth={1} />
                                </div>
                                <h3 className="text-4xl font-light text-white tracking-tighter uppercase italic">No Psychology, Psychology</h3>
                            </div>
                            <p className="text-2xl text-white/60 italic font-light mb-16 leading-relaxed pl-8">
                                "We ground in clinical theory—but we don't diagnose."
                            </p>
                            <div className="space-y-12 relative z-10">
                                <div className="space-y-4">
                                    <div className="text-[10px] tracking-[0.4em] text-white/10 uppercase italic">Boundary_Exclusion</div>
                                    <p className="text-white/40 text-lg leading-relaxed font-light italic">
                                        Providing therapy, diagnosing mental health conditions, or replacing licensed clinical care.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">System_Logic</div>
                                    <p className="text-white/40 text-lg leading-relaxed font-light italic">
                                        Bowen Family Systems and Attachment frameworks to reveal <span className="text-white">mechanical patterns</span> in your relational operating system. We explain how stress propagates—not what's wrong with you.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* THE TECH STACK — Refined Grid */}
            <section className="py-48 px-8 bg-black">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* NASA */}
                    <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group shadow-xl">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-12 group-hover:bg-white group-hover:text-black transition-all">
                            <Database size={24} strokeWidth={1} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6 uppercase italic tracking-tighter group-hover:text-white/70 transition-colors">NASA_JPL_Horizons</h3>
                        <p className="text-white/30 text-lg leading-relaxed font-light italic">
                            Interplanetary telemetry calculated to sub-arcsecond precision.
                        </p>
                    </div>

                    {/* PRESSURE */}
                    <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group shadow-xl">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-12 group-hover:bg-white group-hover:text-black transition-all">
                            <Activity size={24} strokeWidth={1} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6 uppercase italic tracking-tighter group-hover:text-white/70 transition-colors">Orbital_Pressure</h3>
                        <p className="text-white/30 text-lg leading-relaxed font-light italic">
                            Mapping topocentric vectors to observable relational mechanics.
                        </p>
                    </div>

                    {/* SEDA */}
                    <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group shadow-xl">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-12 group-hover:bg-white group-hover:text-black transition-all">
                            <Shield size={24} strokeWidth={1} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6 uppercase italic tracking-tighter group-hover:text-white/70 transition-colors">SEDA_Gate</h3>
                        <p className="text-white/30 text-lg leading-relaxed font-light italic">
                            Multi-layered safety gating for clinical compliance and boundary detection.
                        </p>
                    </div>

                    {/* ORBIT */}
                    <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 group shadow-xl">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-12 group-hover:bg-white group-hover:text-black transition-all">
                            <Sparkles size={24} strokeWidth={1} />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-6 uppercase italic tracking-tighter group-hover:text-white/70 transition-colors">Relational_Orbit</h3>
                        <p className="text-white/30 text-lg leading-relaxed font-light italic">
                            Visualizing family system pressure points through systemic triangulation.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR — Emoji Replacement */}
            <section className="py-48 px-8 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto space-y-32">
                    <div className="text-center space-y-8 flex flex-col items-center">
                        <div className="text-[10px] tracking-[0.6em] text-white/20 uppercase italic underline decoration-white/5 underline-offset-8">Target_Architecture</div>
                        <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white uppercase italic">User Verticals</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {[
                            { title: "Parents & Families", desc: "Understand mechanical stress propagation between nodes (parents/children).", Icon: Users },
                            { title: "Couples", desc: "Stop guessing. See the mechanical patterns driving distance or pursuit.", Icon: Activity },
                            { title: "High-Coherence States", desc: "Navigate elevated experiences with mechanical transparency—not pathology.", Icon: Sparkles },
                            { title: "Founders & Leaders", desc: "Map team dynamics and pressure points before system failure.", Icon: Rocket },
                            { title: "Therapists & Coaches", desc: "Add industrial-grade mechanical mapping to your existing practice.", Icon: Microscope },
                            { title: "Individual Research", desc: "For those exhausted with self-reporting and seeking deterministic data.", Icon: Search }
                        ].map((persona, i) => {
                            const Icon = persona.Icon;
                            return (
                                <div key={i} className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-700 group shadow-xl">
                                    <div className="w-14 h-14 rounded-[20px] bg-white/5 border border-white/5 flex items-center justify-center text-white/10 group-hover:bg-white group-hover:text-black transition-all mb-12">
                                        <Icon size={24} strokeWidth={1} />
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-6 tracking-tighter uppercase italic group-hover:text-white/70 transition-colors">{persona.title}</h3>
                                    <p className="text-white/30 text-lg leading-relaxed font-light italic">{persona.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ — Refined Accents */}
            <section className="py-48 px-8 bg-black">
                <div className="max-w-5xl mx-auto space-y-32">
                    <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white uppercase italic flex items-center gap-12">
                        <HelpCircle size={64} className="text-white/[0.03]" strokeWidth={1} />
                        Common_Protocol_Queries
                    </h2>

                    <div className="space-y-12">
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
                            <div key={i} className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700 group shadow-2xl">
                                <h3 className="text-3xl font-light text-white mb-10 tracking-tighter uppercase italic group-hover:text-white/70 transition-colors">{faq.q}</h3>
                                <div className="flex gap-10">
                                    <div className="h-px w-20 bg-white/10 mt-4 shrink-0" />
                                    <p className="text-xl text-white/30 leading-relaxed font-light italic">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — Final Touch */}
            <section className="py-64 px-8 bg-black text-center relative overflow-hidden flex flex-col items-center">
                <div className="max-w-4xl mx-auto space-y-16 relative z-10">
                    <h2 className="text-6xl sm:text-8xl md:text-9xl font-light text-white tracking-tighter uppercase italic leading-none">Stop_Flying <br /> <span className="text-white/40">Blind.</span></h2>
                    <p className="text-2xl text-white/30 leading-relaxed font-light max-w-2xl mx-auto italic">
                        Ready to see the mechanical patterns governing your relational dynamic?
                    </p>
                    <Link to="/start" className="group h-24 px-16 inline-flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full uppercase shadow-2xl italic">
                        Deploy_System_Now
                        <ArrowRight size={20} className="ml-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
                {/* Background Ambient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
            </section>

            <Footer />
        </div>
    );
}

