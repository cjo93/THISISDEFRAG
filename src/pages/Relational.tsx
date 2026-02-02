import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Relational() {
    return (
        <div className="min-h-screen w-full bg-black text-white overflow-y-scroll selection:bg-orange-500/30">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 lg:pt-40 pb-24 lg:pb-32 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/40 font-mono text-xs font-semibold tracking-widest text-orange-300 uppercase mb-10 lg:mb-16">
                        ORBIT: Relational Geometry
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-8 sm:mb-12 text-white">
                        Map the geometry
                        <br />
                        <span className="bg-gradient-to-br from-white to-orange-400 bg-clip-text text-transparent">of your people.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/60 max-w-3xl mx-auto mb-12 lg:mb-16 leading-relaxed">
                        ORBIT reveals the invisible patterns in family systems using NASA JPL topocentric precision: triangulation, emotional cut-offs, and
                        pressure points. See <em>why</em> certain people become conflict lightning rods—it's positional,
                        not personal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        <Link to="/start" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-black font-bold text-sm tracking-wider uppercase rounded-full hover:bg-orange-400 transition-all">
                            Start Mapping
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is ORBIT */}
            <section className="py-32 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-white">
                            What is ORBIT?
                        </h2>
                        <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto">
                            Maps relational mechanics, not just personalities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
                        <div className="space-y-6 text-white/70 leading-relaxed text-left">
                            <p className="text-lg">
                                <span className="text-white font-semibold">ORBIT</span> (Operational Relational Behavioral
                                Intelligence Tool) maps the mechanical geometry of family systems using Penta (5-person)
                                and Hexa (6-person) configurations.
                            </p>
                            <p className="text-lg">
                                Based on Bowen Family Systems Theory, ORBIT shows how anxiety propagates through relational
                                networks—not through individual pathology, but through <span className="bg-gradient-to-br from-white to-orange-400 bg-clip-text text-transparent font-semibold">systemic position</span>.
                            </p>
                            <p className="text-lg text-white/80 italic pl-6 border-l-2 border-orange-500/50">
                                "You're not the problem. You're in the position that absorbs the system's friction."
                            </p>
                        </div>

                        <div className="card-premium h-80 lg:h-96 flex items-center justify-center">
                            {/* Visual Placeholder */}
                            <div className="relative w-64 h-64 animate-[spin_60s_linear_infinite]">
                                {/* Center node */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center z-10 backdrop-blur-sm">
                                    <span className="text-[10px] font-bold text-orange-400 tracking-widest">YOU</span>
                                </div>
                                {/* Orbiting nodes */}
                                {[0, 72, 144, 216, 288].map((angle, idx) => {
                                    const radius = 100;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                                    return (
                                        <div
                                            key={idx}
                                            className="absolute w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40"
                                            style={{
                                                top: `calc(50% + ${y}px)`,
                                                left: `calc(50% + ${x}px)`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    );
                                })}
                                {/* Connection lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ pointerEvents: 'none' }}>
                                    <circle cx="50%" cy="50%" r="100" stroke="#f97316" strokeWidth="1" fill="none" className="opacity-50" />
                                    <line x1="50%" y1="50%" x2="50%" y2="calc(50% - 100px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% + 95px)" y2="calc(50% - 31px)" stroke="#f97316" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="calc(50% + 59px)" y2="calc(50% + 81px)" stroke="#f97316" strokeWidth="1" />
                                </svg>
                            </div>
                            <p className="absolute bottom-4 text-center text-[10px] text-white/30 tracking-widest uppercase px-6">
                                Penta Configuration Preview
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="section-premium border-b border-white/5 bg-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <div className="section-header">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-white">
                            What ORBIT Reveals
                        </h2>
                        <p className="text-premium max-w-2xl mx-auto">
                            Deep insights into relational geometry and system dynamics.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                                className="card-premium group"
                            >
                                <div className="text-4xl mb-6 opacity-70 group-hover:opacity-100 transition-opacity">{feature.icon}</div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-4 text-white group-hover:gradient-text transition-all">{feature.title}</h3>
                                <p className="text-white/60 text-base leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="section-premium border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="section-header">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-white">
                            Who Needs ORBIT
                        </h2>
                    </div>

                    <div className="space-y-6">
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
                                className="p-8 bg-gradient-to-r from-white/[0.02] to-transparent border-l-2 border-white/10 hover:border-orange-500 transition-all rounded-r-xl"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-orange-400">{useCase.title}</h3>
                                <p className="text-white/70 leading-relaxed mb-3">{useCase.desc}</p>
                                <p className="text-sm text-white/40 italic">Example: {useCase.example}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - Numbered Steps Refined */}
            <section className="py-20 px-6 border-b border-white/5 bg-gradient-to-b from-transparent to-orange-500/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-light mb-6 text-white">
                            How ORBIT Works
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {[
                            { num: "01", title: "Input System", text: "Add 3-6 people from your family or team. Include birth data generate their core design." },
                            { num: "02", title: "Generate Geometry", text: "ORBIT calculates who occupies which systemic positions: mediator, scapegoat, withdrawn, etc." },
                            { num: "03", title: "Visualize Friction", text: "See where chronic anxiety concentrates and who is absorbing the system's pressure." },
                            { num: "04", title: "Simulate Intervention", text: "Test how small changes in one person's stance can cascade calm through the whole map." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors">
                                <span className="text-4xl font-light text-white/20 font-mono">{step.num}</span>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-3xl sm:text-4xl font-light mb-8 text-white">
                        Map your system geometry.
                    </h2>
                    <p className="text-xl text-white/60 mb-12 max-w-xl">
                        Identify the pressure points in your family or team with NASA-grade precision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                        <Link
                            to="/start"
                            className="inline-flex h-14 px-12 items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-black hover:bg-white transition-all rounded-full uppercase shadow-lg shadow-orange-500/20"
                        >
                            Start Mapping ($29–99)
                        </Link>
                        <a
                            href="https://api.defrag.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 px-12 items-center justify-center border border-white/20 text-white text-sm tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all rounded-full uppercase"
                        >
                            For Platforms (API)
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
