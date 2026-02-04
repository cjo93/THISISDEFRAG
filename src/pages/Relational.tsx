
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Network, Scissors, Zap, Target, ArrowRight } from 'lucide-react';

export default function Relational() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
            <Header />

            {/* HERO */}
            <section className="pt-40 pb-32 px-8 bg-black relative min-h-[80vh] flex flex-col justify-center items-center text-center">
                <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase">
                        ORBIT
                    </h1>

                    <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
                        Geometric mapping of relational pressure.
                    </p>

                    <p className="text-lg text-white/30 max-w-2xl mx-auto leading-relaxed font-light mb-20">
                        ORBIT visualizes how pressure moves through human systems.
                        <br />
                        It shows where load accumulates, where instability forms, and how interactions affect the whole.
                        <br /><br />
                        Designed for families, teams, and complex organizations.
                    </p>

                    <div className="flex justify-center w-full">
                        <Link to="/start" className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                            Initialize Map
                        </Link>
                    </div>

                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
            </section>

            {/* INFO GRID */}
            <section className="py-40 bg-zinc-950 border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="p-8 border border-white/5 bg-black hover:border-white/20 transition-all duration-500">
                            <Network className="text-white/50 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Pressure Points</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Identify which node absorbs the most system friction.
                            </p>
                        </div>
                        <div className="p-8 border border-white/5 bg-black hover:border-white/20 transition-all duration-500">
                            <Scissors className="text-white/50 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Cut-offs</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Identify severed connections and resulting pressure vacuums.
                            </p>
                        </div>
                        <div className="p-8 border border-white/5 bg-black hover:border-white/20 transition-all duration-500">
                            <Zap className="text-white/50 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Triangulation</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                See when nodes stabilize anxiety by pulling in a third party.
                            </p>
                        </div>
                        <div className="p-8 border border-white/5 bg-black hover:border-white/20 transition-all duration-500">
                            <Target className="text-white/50 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Propagation</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Watch how stress ripples through your network geometrically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
