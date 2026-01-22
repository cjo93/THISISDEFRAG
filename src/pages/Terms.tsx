import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white/80">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Nav */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 safe-top">
                <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-base sm:text-lg group-hover:scale-105 transition-transform">
                            D
                        </div>
                        <span className="tracking-[0.2em] sm:tracking-[0.25em] text-sm font-medium text-white/90">DEFRAG</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/start" className="h-9 px-4 flex items-center justify-center bg-white text-black text-xs tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition rounded-lg">
                            START
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="relative z-10 px-6 py-20 mx-auto max-w-3xl">
                <h1 className="text-4xl font-light mb-12 tracking-tight">Terms of Service</h1>

                <div className="space-y-12 leading-relaxed text-sm sm:text-base">
                    <section>
                        <h2 className="text-xl text-white font-medium mb-4">1. Acceptance</h2>
                        <p>
                            By accessing DEFRAG, you agree to these terms. DEFRAG provides analysis based on astronomical metrics and psychological frameworks. This is an information tool, not a substitute for professional clinical therapy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-medium mb-4">2. Digital Products</h2>
                        <p>
                            The "Relationship Manual" is a generated digital product. Because it is personalized and delivered instantly, we generally do not offer refunds once the manual has been generated, unless there is a technical error in delivery.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-medium mb-4">3. Accuracy & Intent</h2>
                        <p>
                            We use NASA JPL Horizons data for planetary calculations. While our math is precise, the interpretation of human dynamics is qualitative. We provide frameworks for understanding, not predictive absolutes. You remain responsible for your own relationship decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-medium mb-4">4. Privacy</h2>
                        <p>
                            Input data (names, birth times) is used solely for the purpose of generating your report. We do not sell your personal data to third-party brokers. Please review our Privacy Policy for full details on data handling.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-medium mb-4">5. Liability</h2>
                        <p>
                            DEFRAG and its creators are not liable for any actions taken based on our content. This service identifies patterns but does not dictate behavior.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <p className="text-xs text-white/40">
                            Last Updated: January 2026<br />
                            Contact: info@defrag.app
                        </p>
                    </section>
                </div>
            </main>

            <footer className="relative z-10 py-10 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-white/30">2026 DEFRAG</span>
                    <div className="flex gap-6 text-sm text-white/30">
                        <Link to="/about" className="hover:text-white/60 transition">About</Link>
                        <Link to="/terms" className="hover:text-white/60 transition">Terms</Link>
                        <Link to="/privacy" className="hover:text-white/60 transition">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
