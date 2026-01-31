import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Learn() {
    return (
        <div className="min-h-screen w-full bg-black text-white overflow-y-scroll">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/70 mb-8 sm:mb-12 border-l-2 border-orange-500/50 pl-4 uppercase">
                        Knowledge Base
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 sm:mb-12 text-white">
                        The science behind
                        <br />
                        <span className="text-orange-500">your user manual.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/60 font-light max-w-3xl">
                        DEFRAG is built on deterministic math, clinical safety protocols, and NASA-grade telemetry.
                        Not mysticism. Not diagnosis. Just mechanical transparency.
                    </p>
                </div>
            </section>

            {/* The Mantras Explained */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        Understanding the Mantras
                    </h2>

                    <div className="space-y-12">
                        {/* No Astrology, Astrology */}
                        <div className="bg-gradient-to-br from-orange-500/5 to-transparent p-8 sm:p-12 rounded-2xl border border-orange-500/20">
                            <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-orange-400">
                                No Astrology, Astrology
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed mb-6">
                                We use planetary positions—but not in the way you think.
                            </p>
                            <div className="space-y-4 text-white/60">
                                <p>
                                    <span className="text-orange-400 font-semibold">What we DON'T do:</span> Fortune-telling,
                                    mystical predictions, or claiming planets "cause" personality traits.
                                </p>
                                <p>
                                    <span className="text-orange-400 font-semibold">What we DO:</span> Use NASA JPL Horizons
                                    data to calculate precise planetary vectors at your birth moment. These become
                                    <span className="text-white font-medium"> Environmental Pressure markers</span>—deterministic
                                    data points that correlate with observable behavioral patterns, just like seasonal birth
                                    month correlates with certain health outcomes.
                                </p>
                                <p className="italic text-white/50 text-sm mt-6 pl-6 border-l-2 border-white/20">
                                    "We're using the same math NASA uses to land rovers on Mars. The difference? We're applying
                                    it to the moment you were born, not the moment Perseverance landed."
                                </p>
                            </div>
                        </div>

                        {/* No Psychology, Psychology */}
                        <div className="bg-gradient-to-br from-blue-500/5 to-transparent p-8 sm:p-12 rounded-2xl border border-blue-500/20">
                            <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-blue-400">
                                No Psychology, Psychology
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed mb-6">
                                We ground in clinical theory—but we don't diagnose.
                            </p>
                            <div className="space-y-4 text-white/60">
                                <p>
                                    <span className="text-blue-400 font-semibold">What we DON'T do:</span> Provide therapy,
                                    diagnose mental health conditions, or replace licensed clinical care.
                                </p>
                                <p>
                                    <span className="text-blue-400 font-semibold">What we DO:</span> Apply Bowen Family Systems
                                    Theory and Attachment Theory frameworks to reveal <span className="text-white font-medium">mechanical
                                        patterns</span> in your relational operating system. We explain <em>how</em> stress propagates
                                    through your family system—not <em>what's wrong with you</em>.
                                </p>
                                <p className="italic text-white/50 text-sm mt-6 pl-6 border-l-2 border-white/20">
                                    "Think of it like reading a car's diagnostic output. We're not saying the engine is 'bad'—we're
                                    showing you the temperature gauge and where the friction points are."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Math Behind It */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        The Math Behind It
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* NASA Telemetry */}
                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                    <circle cx="10" cy="10" r="2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">NASA JPL Telemetry</h3>
                            <p className="text-white/60 leading-relaxed mb-4">
                                We query the same Horizons ephemeris system NASA uses for interplanetary missions. Planetary
                                positions are calculated to sub-arcsecond precision.
                            </p>
                            <p className="text-white/50 text-sm">
                                These vectors become <span className="text-orange-400">Environmental Pressure</span> markers—not
                                "influences," but data points that map to observable relational mechanics.
                            </p>
                        </div>

                        {/* Biological Pressure */}
                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                    <path d="M7 10h2v5H7zm4-3h2v8h-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">Biological Pressure</h3>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Attachment styles, nervous system responses, and family-of-origin patterns create
                                <span className="text-blue-400"> Biological Pressure</span>—the internal mechanics of how you
                                respond to stress.
                            </p>
                            <p className="text-white/50 text-sm">
                                Grounded in Polyvagal Theory and Bowen's concept of differentiation, not pseudoscience.
                            </p>
                        </div>

                        {/* SEDA Safety Firewall */}
                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">SEDA Clinical Thresholds</h3>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Our Safety, Ego-strength, Differentiation, and Affect-regulation scores determine when to
                                gracefully degrade from analysis to grounding.
                            </p>
                            <p className="text-white/50 text-sm">
                                Scores below 30 trigger <span className="text-green-400">Crisis Protocol</span>: somatic stabilization
                                instead of esoteric insight.
                            </p>
                        </div>

                        {/* Relational Geometry */}
                        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">ORBIT: Relational Geometry</h3>
                            <p className="text-white/60 leading-relaxed mb-4">
                                Map triangulation patterns, emotional cut-offs, and pressure points across family systems
                                using Penta (5-person) and Hexa (6-person) geometries.
                            </p>
                            <p className="text-white/50 text-sm">
                                Visualize <em>why</em> certain family members become conflict lightning rods—it's positional,
                                not personal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        Who This Is For
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Parents & Families",
                                desc: "Understand why your teenager shuts down or why conflict with your partner escalates predictably.",
                                icon: "👨‍👩‍👧‍👦"
                            },
                            {
                                title: "Couples in Hard Seasons",
                                desc: "Stop guessing what your partner needs. See the mechanical patterns driving distance or pursuit.",
                                icon: "💑"
                            },
                            {
                                title: "High Narrative Clarity States",
                                desc: "Navigate elevated coherence experiences with mechanical transparency—not pathologizing, not spiritualizing.",
                                icon: "🌟"
                            },
                            {
                                title: "Founders & Leadership Teams",
                                desc: "Map team dynamics before they explode. Understand how stress propagates through your org.",
                                icon: "🚀"
                            },
                            {
                                title: "Therapists & Coaches",
                                desc: "Add mechanical transparency to your practice. SEDA scores as clinical triage, not replacement.",
                                icon: "🧠"
                            },
                            {
                                title: "Anyone Tired of Guessing",
                                desc: "If you're exhausted from trial-and-error in relationships, this is your diagnostic dashboard.",
                                icon: "🔍"
                            },
                        ].map((persona, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-orange-500/30 rounded-xl transition-all"
                            >
                                <div className="text-4xl mb-4">{persona.icon}</div>
                                <h3 className="text-lg font-semibold mb-3 text-white">{persona.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{persona.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        Common Questions
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Is this therapy or mental health treatment?",
                                a: "No. DEFRAG provides mechanical transparency about relational patterns—not diagnosis, treatment, or licensed clinical care. If you're in crisis or need mental health support, please contact a licensed provider or crisis line."
                            },
                            {
                                q: "Is this fortune-telling or predictive astrology?",
                                a: "No. We use planetary positions as data markers (Environmental Pressure), not predictive tools. We don't claim planets 'cause' outcomes—we use NASA-grade telemetry as one input among many to map observable relational mechanics."
                            },
                            {
                                q: "What if my SEDA score is low?",
                                a: "If your score falls below 30, we gracefully degrade to Crisis Protocol: somatic grounding exercises (sleep, hydration, physical stabilization) instead of esoteric analysis. Safety always comes first."
                            },
                            {
                                q: "Can I use this instead of couples therapy?",
                                a: "DEFRAG is a complement, not a replacement. Think of it as a diagnostic dashboard that helps you understand patterns—but a licensed therapist provides the treatment. Many therapists use DEFRAG alongside their practice."
                            },
                            {
                                q: "How is this different from Myers-Briggs or Enneagram?",
                                a: "Those are self-reported typologies. DEFRAG uses deterministic inputs (NASA telemetry, clinical attachment theory) to generate mechanical transparency about *how* you operate under stress—not just *what type* you are."
                            },
                        ].map((faq, idx) => (
                            <div key={idx} className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 rounded-xl">
                                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-orange-400">{faq.q}</h3>
                                <p className="text-white/60 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-500/5">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 text-white">
                        Ready to see your manual?
                    </h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                        Get your free SEDA safety audit and core design snapshot in 3 minutes.
                    </p>
                    <Link
                        to="/start"
                        className="inline-flex h-14 px-12 items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-lg shadow-orange-500/20"
                    >
                        Start Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-white/40 text-xs">
                    <p>© 2026 DEFRAG. Mechanical transparency, not diagnosis.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <a href="https://api.defrag.app" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Developer API</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
