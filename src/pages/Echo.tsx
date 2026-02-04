
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, UserCheck, ShieldAlert, Sparkles, Zap, Target, Terminal } from 'lucide-react';

export default function Echo() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
            <Header />

            {/* HERO */}
            <section className="relative pt-40 pb-32 px-8 border-b border-white/5 bg-black overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center">
                <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase">
                        ECHO
                    </h1>

                    <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
                        Operational parameters for the human system.
                    </p>

                    <p className="text-lg text-white/30 max-w-2xl mx-auto leading-relaxed font-light mb-20">
                        ECHO identifies how your system responds to interaction.
                        What drains you. What restores you. Where instability begins.
                        <br /><br />
                        This data forms the baseline for all other DEFRAG functions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 mb-32 w-full max-w-lg justify-center">
                        <Link
                            to="/products/manuals"
                            className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg"
                        >
                            View Deployment Manual
                        </Link>
                    </div>

                    {/* Use Cases Grid */}
                    <div className="grid sm:grid-cols-3 gap-8 w-full border-t border-white/10 pt-16">
                        <div className="p-6">
                            <h3 className="text-lg font-light text-white mb-2 uppercase tracking-wide">Personal Regulation</h3>
                        </div>
                        <div className="p-6 border-l border-r border-white/5">
                            <h3 className="text-lg font-light text-white mb-2 uppercase tracking-wide">Team Analysis</h3>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-light text-white mb-2 uppercase tracking-wide">AI Constraints</h3>
                        </div>
                    </div>

                </div>

                {/* BACKGROUND GLOW */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-none blur-[150px] pointer-events-none" />
            </section>

            <Footer />
        </div>
    );
}
