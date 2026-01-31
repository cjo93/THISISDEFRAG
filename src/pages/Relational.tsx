import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Relational() {
    return (
        <div className="min-h-screen w-full bg-black text-white overflow-y-scroll">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.3em] text-orange-400/70 mb-8 sm:mb-12 border-l-2 border-orange-500/50 pl-4 uppercase">
                        ORBIT: Relational Geometry
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 sm:mb-12 text-white">
                        Map the geometry
                        <br />
                        <span className="text-orange-500">of your people.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
                        ORBIT reveals the invisible patterns in family systems using NASA JPL topocentric precision: triangulation, emotional cut-offs, and
                        pressure points. See <em>why</em> certain people become conflict lightning rods—it's positional,
                        not personal.
                    </p>
                    <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                        <span className="text-sm text-orange-400 font-semibold uppercase tracking-wider">Coming Soon</span>
                    </div>
                </div>
            </section>

            {/* What is ORBIT */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        What is ORBIT?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-white/60 leading-relaxed">
                            <p>
                                <span className="text-white font-semibold">ORBIT</span> (Operational Relational Behavioral
                                Intelligence Tool) maps the mechanical geometry of family systems using Penta (5-person)
                                and Hexa (6-person) configurations.
                            </p>
                            <p>
                                Based on Bowen Family Systems Theory, ORBIT shows how anxiety propagates through relational
                                networks—not through individual pathology, but through <span className="text-orange-400">systemic position</span>.
                            </p>
                            <p className="text-white/80 italic">
                                "You're not the problem. You're in the position that absorbs the system's friction."
                            </p>
                        </div>

                        <div className="relative h-80 rounded-2xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center">
                            {/* Placeholder visualization */}
                            <div className="relative w-64 h-64">
                                {/* Center node */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/30 border-2 border-orange-400 flex items-center justify-center">
                                    <span className="text-xs font-bold text-orange-400">YOU</span>
                                </div>
                                {/* Orbiting nodes */}
                                {[0, 72, 144, 216, 288].map((angle, idx) => {
                                    const radius = 100;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                                    return (
                                        <div
                                            key={idx}
                                            className="absolute w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-400/60"
                                            style={{
                                                top: `calc(50% + ${y}px)`,
                                                left: `calc(50% + ${x}px)`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    );
                                })}
                                {/* Connection lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-30" style={{ pointerEvents: 'none' }}>
                                    <line x1="50%" y1="50%" x2="50%" y2="calc(50% - 100px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% + 95px)" y2="calc(50% - 31px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% + 59px)" y2="calc(50% + 81px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% - 59px)" y2="calc(50% + 81px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% - 95px)" y2="calc(50% - 31px)" stroke="#f97316" strokeWidth="1" />
                                </svg>
                            </div>
                            <p className="absolute bottom-6 text-center text-xs text-white/40 px-6">
                                Penta (5-person) configuration preview
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        What ORBIT Reveals
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Triangulation Patterns",
                                desc: "See when two people unconsciously pull in a third to stabilize their anxiety. ORBIT maps who gets triangulated and when.",
                                icon: "🔺"
                            },
                            {
                                title: "Emotional Cut-Offs",
                                desc: "Identify where connections have been severed—and how that distance affects the rest of the system.",
                                icon: "✂️"
                            },
                            {
                                title: "Pressure Points",
                                desc: "Discover which family member absorbs the most system friction (often the most empathic one).",
                                icon: "⚡"
                            },
                            {
                                title: "Differentiation Scores",
                                desc: "Understand who stays calm under system stress vs. who gets pulled into reactivity.",
                                icon: "🎯"
                            },
                            {
                                title: "Chronic Anxiety Flow",
                                desc: "Watch how stress ripples through your family—it's not random, it follows geometric rules.",
                                icon: "🌊"
                            },
                            {
                                title: "Intervention Points",
                                desc: "Find where a small shift in one person's stance can calm the whole system.",
                                icon: "🔧"
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-orange-500/30 rounded-xl transition-all"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        Who Needs ORBIT
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                title: "Families Stuck in Chronic Conflict",
                                desc: "If the same fight keeps happening, it's systemic, not personal. ORBIT shows you the geometry.",
                                example: "\"Why does my sister always side with my mom against me?\"—ORBIT reveals the triangulation pattern."
                            },
                            {
                                title: "Blended Families",
                                desc: "Navigate complex stepfamily dynamics by mapping who's allied with whom—and where the friction points are.",
                                example: "\"My partner's kids won't connect with me.\"—ORBIT shows the protective alliance geometry at play."
                            },
                            {
                                title: "Leadership Teams",
                                desc: "Organizational conflict often mirrors family patterns. ORBIT maps team triangulation and cut-offs.",
                                example: "\"Why does my co-founder always go quiet when I raise budget concerns?\"—Systemic withdrawal pattern."
                            },
                            {
                                title: "Intergenerational Trauma",
                                desc: "See how unprocessed anxiety from previous generations flows through current relationships.",
                                example: "\"I have my grandmother's anxiety.\"—Not genetics, geometry. ORBIT shows the transmission pathway."
                            },
                        ].map((useCase, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 rounded-xl"
                            >
                                <h3 className="text-xl font-semibold mb-3 text-orange-400">{useCase.title}</h3>
                                <p className="text-white/70 leading-relaxed mb-4">{useCase.desc}</p>
                                <p className="text-sm text-white/50 italic pl-6 border-l-2 border-white/20">{useCase.example}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 border-b border-white/5 bg-gradient-to-b from-transparent to-orange-500/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-light mb-12 text-white">
                        How ORBIT Works
                    </h2>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-400 flex items-center justify-center">
                                <span className="text-orange-400 font-bold text-lg">1</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Input Your Family System</h3>
                                <p className="text-white/60">
                                    Add 3-6 people from your family, partnership, or team. Include birth data for each
                                    (date, time, location) to generate their core design.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-400 flex items-center justify-center">
                                <span className="text-orange-400 font-bold text-lg">2</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">ORBIT Generates Relational Geometry</h3>
                                <p className="text-white/60">
                                    Using Penta (5-person) or Hexa (6-person) mapping, ORBIT calculates who occupies
                                    which systemic positions: mediator, scapegoat, withdrawn, pursuer, triangulated.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-400 flex items-center justify-center">
                                <span className="text-orange-400 font-bold text-lg">3</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">See the Friction Points</h3>
                                <p className="text-white/60">
                                    ORBIT highlights where chronic anxiety concentrates, who's absorbing the most
                                    system friction, and what happens when one person shifts their stance.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-400 flex items-center justify-center">
                                <span className="text-orange-400 font-bold text-lg">4</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Get Intervention Strategies</h3>
                                <p className="text-white/60">
                                    ORBIT suggests where small changes create cascading calm—often by one person
                                    differentiating (staying grounded while others react).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-light mb-8 text-white">
                        ORBIT is coming soon
                    </h2>
                    <p className="text-xl text-white/60 mb-12">
                        Early access will be included in the <span className="text-orange-400 font-semibold">Teams + Families</span> tier ($29/mo).
                        Get your individual User Manual now, and ORBIT will be added to your account when it launches.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/start"
                            className="inline-flex h-14 px-12 items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-bold hover:bg-orange-400 transition-all rounded-lg uppercase shadow-lg shadow-orange-500/20"
                        >
                            Start with Your Manual
                        </Link>
                        <a
                            href="https://api.defrag.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 px-12 items-center justify-center border-2 border-white/20 text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all rounded-lg uppercase"
                        >
                            Developer API
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-white/40 text-xs">
                    <p>© 2026 DEFRAG. Relational geometry, not blame.</p>
                    <div className="flex gap-6">
                        <Link to="/learn" className="hover:text-white transition-colors">Learn</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
