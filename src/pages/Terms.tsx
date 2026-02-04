
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, Shield, Scale, Activity, Terminal } from 'lucide-react';

export default function Terms() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white/10 font-mono italic">
            <Header />

            <main className="relative z-10 px-8 pt-56 pb-32">
                <div className="mx-auto max-w-5xl space-y-32">

                    <div className="text-center space-y-12 flex flex-col items-center">
                        <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full shadow-2xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                            System_Agreement_v3
                        </div>
                        <h1 className="text-6xl sm:text-8xl font-light tracking-tighter uppercase text-white leading-none">
                            Terms_of_ <span className="text-white/40 italic">Service.</span>
                        </h1>
                        <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic pb-4">Last Updated: January 23, 2026</p>
                    </div>

                    <div className="p-16 rounded-[80px] border border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden group">
                        <div className="space-y-24 text-white/40 leading-relaxed max-w-3xl mx-auto relative z-10">

                            {/* Agreement to Terms */}
                            <section className="space-y-8">
                                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                                    <Scale size={24} strokeWidth={1} className="text-white/20" />
                                    1. Agreement_to_Terms
                                </h2>
                                <p className="text-xl font-light italic leading-relaxed pr-8">
                                    By accessing or using DEFRAG ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                                </p>
                            </section>

                            {/* Description of Service */}
                            <section className="space-y-8">
                                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                                    <Terminal size={24} strokeWidth={1} className="text-white/20" />
                                    2. Service_Description
                                </h2>
                                <p className="text-xl font-light italic leading-relaxed pr-8">
                                    DEFRAG provides personalized relationship analysis tools based on NASA JPL telemetry, family systems frameworks, and AI-powered topology synthesis.
                                </p>
                                <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] space-y-4">
                                    <p className="text-sm font-bold text-white uppercase tracking-widest italic">Clinical_Disclaimer_Alpha:</p>
                                    <p className="text-lg italic font-light text-white/60">
                                        DEFRAG is an informational tool, NOT a substitute for professional therapy, medical advice, or clinical diagnosis.
                                    </p>
                                </div>
                            </section>

                            {/* Purchases and Payments */}
                            <section className="space-y-8">
                                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                                    <Activity size={24} strokeWidth={1} className="text-white/20" />
                                    3. Transactional_Protocols
                                </h2>
                                <p className="text-xl font-light italic leading-relaxed pr-8">
                                    Digital products—specifically the "Operating Manual"—are delivered instantly upon payment authorization. Due to the personalized nature of these artifacts, we generally do not offer refunds once synchronization is complete.
                                </p>
                            </section>

                            {/* Acceptable Use */}
                            <section className="space-y-8">
                                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                                    <Shield size={24} strokeWidth={1} className="text-white/20" />
                                    4. Operational_Boundaries
                                </h2>
                                <p className="text-xl font-light italic leading-relaxed pr-8">
                                    Users are prohibited from reverse-engineering the DEFRAG engine, scraping telemetry data, or bypassing SEDA safety gates for unauthorized extraction.
                                </p>
                            </section>

                            {/* Contact */}
                            <section className="space-y-12 pt-20 border-t border-white/5">
                                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter">Security_Contact</h2>
                                <div className="grid sm:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Legal_Protocol</div>
                                        <div className="text-xl text-white italic">legal@defrag.app</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Primary_Support</div>
                                        <div className="text-xl text-white italic">support@defrag.app</div>
                                    </div>
                                </div>
                            </section>

                        </div>
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
                    </div>

                    <div className="flex justify-center pt-20">
                        <Link
                            to="/"
                            className="h-20 px-16 inline-flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-full uppercase shadow-2xl italic"
                        >
                            Back_To_Root
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Background Detail */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
        </div>
    );
}
