
import React from 'react';
import { ArrowRight, Code, Shield, Zap, Lock, Activity, Terminal, ExternalLink, Globe, Cpu, Layers, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const useIsDevPilot = () => {
    const user = JSON.parse(localStorage.getItem('defrag_user') || '{}');
    return user.isDevPilot === true || user.email === 'chadowen93@gmail.com' || user.email === 'info@defrag.app';
};

export default function DeveloperIndex() {
    const isDevPilot = useIsDevPilot();
    if (isDevPilot) return <FullDevDashboard />;
    return <DeveloperLanding />;
}

// Public Developer Landing (Refactored)
function DeveloperLanding() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/10 font-sans">

            {/* HERO */}
            <section className="pt-40 pb-32 px-8 flex flex-col items-center justify-center text-center min-h-[80vh]">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase">
                        Developer Portal
                    </h1>
                    <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
                        Build with deterministic relational data.
                    </p>
                    <p className="text-lg text-white/30 max-w-2xl mx-auto leading-relaxed font-light mb-20">
                        The DEFRAG API allows developers to integrate human-system safety directly into their products.
                        <br />
                        Every request is gated. Every output is constrained.
                        <br /><br />
                        No hallucination. No drift.
                    </p>

                    <div className="flex justify-center w-full">
                        <a href="mailto:api@defrag.app?subject=Request Developer Key" className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                            Request Developer Key
                        </a>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
            </section>

            {/* CAPABILITIES */}
            <section className="py-40 bg-zinc-950 border-t border-white/10 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-light text-white tracking-wide uppercase">What You Can Build</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="p-10 border border-white/5 bg-black hover:border-white/20 transition-all duration-300">
                            <Shield className="text-white/40 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Safer AI Interfaces</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Embed constraints that prevent AI agents from triggering relational degradation.
                            </p>
                        </div>
                        <div className="p-10 border border-white/5 bg-black hover:border-white/20 transition-all duration-300">
                            <Layers className="text-white/40 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Context-Aware Systems</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Applications that adjust their behavior based on the user's current relational load.
                            </p>
                        </div>
                        <div className="p-10 border border-white/5 bg-black hover:border-white/20 transition-all duration-300">
                            <Box className="text-white/40 mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-xl font-light text-white mb-4 uppercase tracking-wide">Human-Centric Apps</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                Deepen user trust by enforcing mechanical boundaries in social implementations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Monochrome Pilot Dashboard (Preserved but styled)
function FullDevDashboard() {
    return (
        <div className="bg-black min-h-screen text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-24 py-12">
                {/* Hero */}
                <div className="space-y-10">
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 text-white/50 text-xs tracking-widest uppercase">
                        <span className="w-2 h-2 bg-white animate-pulse shadow-glow"></span>
                        Terminal_Active
                    </div>
                    <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-none">
                        L0 <span className="text-white/40 italic">Control.</span>
                    </h1>
                    <div className="flex flex-wrap gap-6 pt-6 mb-12">
                        <Link to="/docs/getting-started" className="h-14 px-8 flex items-center justify-center bg-white text-black font-bold tracking-widest uppercase hover:bg-slate-200 transition-all shadow-lg text-sm">
                            Initialize Keys
                        </Link>
                        <Link to="/docs/api-reference" className="h-14 px-8 flex items-center justify-center bg-transparent text-white border border-white/20 font-bold tracking-widest uppercase hover:bg-white/10 transition-all text-sm">
                            Read Specs
                        </Link>
                    </div>
                </div>

                {/* Quick Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatusCard icon={<Terminal size={20} strokeWidth={1.5} />} label="System_Status" value="OPERATIONAL" />
                    <StatusCard icon={<Cpu size={20} strokeWidth={1.5} />} label="Auth_Layer" value="ENCRYPTED" />
                    <StatusCard icon={<Activity size={20} strokeWidth={1.5} />} label="Coherence" value="OPTIMAL" />
                </div>
            </div>
        </div>
    );
}

function StatusCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-10 bg-white/[0.02] border border-white/5 flex items-center gap-8 hover:bg-white/[0.04] transition-colors group">
            <div className="text-white/40 group-hover:text-white transition-colors">{icon}</div>
            <div>
                <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase mb-1">{label}</p>
                <p className="font-mono text-xl font-bold tracking-tight text-white">{value}</p>
            </div>
        </div>
    );
}
