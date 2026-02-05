import React from 'react';
import { Shield, Layers, Box, Terminal, Cpu, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const useIsDevPilot = () => {
    const user = JSON.parse(localStorage.getItem('defrag_user') || '{}');
    return user.isDevPilot === true || user.email === 'chadowen93@gmail.com' || user.email === 'info@defrag.app';
};

export default function DeveloperIndex() {
    const isDevPilot = useIsDevPilot();
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#64748B] selection:text-white">
        <Header />
        {isDevPilot ? <FullDevDashboard /> : <DeveloperLanding />}
        <Footer />
      </div>
    );
}

// Public Developer Landing
function DeveloperLanding() {
    return (
        <main className="relative z-10 pt-32 pb-20 px-6">
            {/* HERO */}
            <section className="min-h-[70vh] flex items-center justify-center">
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 w-full">
                     <div className="col-span-12 md:col-span-8 md:col-start-3 text-center space-y-12">
                         <div className="flex justify-center mb-8">
                             <div className="w-px h-24 bg-gradient-to-b from-transparent to-white/20"></div>
                         </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-none">
                            Developer <br />
                            <span className="italic text-[#64748B]">Console.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#94A3B8] font-light max-w-2xl mx-auto leading-relaxed">
                            Build with deterministic relational data. The DEFRAG API allows developers to integrate human-system safety directly into their products.
                        </p>
                        <div className="flex justify-center pt-8">
                            <a
                                href="mailto:api@defrag.app?subject=Request Developer Key"
                                className="group relative inline-flex items-center justify-center px-12 py-5 border border-[#F8FAFC]/20 hover:border-[#F8FAFC] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all duration-500"
                            >
                                <span className="text-sm font-bold tracking-[0.2em] uppercase">Request Key</span>
                                <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                        <div className="bg-[#0F172A] p-12 border border-transparent hover:bg-[#1E293B] transition-all duration-500 group">
                            <Shield className="text-[#64748B] mb-6 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                            <h3 className="text-xl font-serif text-white italic mb-4">Safety Layer</h3>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">
                                Embed constraints that prevent AI agents from triggering relational degradation.
                            </p>
                        </div>
                        <div className="bg-[#0F172A] p-12 border border-transparent hover:bg-[#1E293B] transition-all duration-500 group">
                            <Layers className="text-[#64748B] mb-6 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                            <h3 className="text-xl font-serif text-white italic mb-4">Context Awareness</h3>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">
                                Applications that adjust their behavior based on the user's current relational load.
                            </p>
                        </div>
                        <div className="bg-[#0F172A] p-12 border border-transparent hover:bg-[#1E293B] transition-all duration-500 group">
                            <Box className="text-[#64748B] mb-6 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                            <h3 className="text-xl font-serif text-white italic mb-4">Human Centric</h3>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">
                                Deepen user trust by enforcing mechanical boundaries in social implementations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Monochrome Pilot Dashboard
function FullDevDashboard() {
    return (
        <main className="relative z-10 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* Hero */}
                <div className="space-y-8 border-b border-white/5 pb-20">
                    <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/10 bg-white/5 text-[#64748B] text-[10px] tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 bg-slate-500/50 rounded-full animate-pulse"></span>
                        Terminal_Active
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-none">
                        L0 <span className="italic text-[#64748B]">Control.</span>
                    </h1>
                    <div className="flex flex-wrap gap-6 pt-6">
                        <Link to="/docs/getting-started" className="h-14 px-8 flex items-center justify-center bg-white text-[#0F172A] font-bold tracking-[0.2em] uppercase hover:bg-[#E2E8F0] transition-all text-xs">
                            Initialize Keys
                        </Link>
                        <Link to="/docs/api-reference" className="h-14 px-8 flex items-center justify-center bg-transparent text-white border border-white/20 font-bold tracking-[0.2em] uppercase hover:border-white transition-all text-xs">
                            Read Specs
                        </Link>
                    </div>
                </div>

                {/* Quick Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatusCard icon={<Terminal size={20} strokeWidth={1} />} label="System_Status" value="OPERATIONAL" />
                    <StatusCard icon={<Cpu size={20} strokeWidth={1} />} label="Auth_Layer" value="ENCRYPTED" />
                    <StatusCard icon={<Activity size={20} strokeWidth={1} />} label="Coherence" value="OPTIMAL" />
                </div>
            </div>
        </main>
    );
}

function StatusCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-8 border border-white/10 bg-[#0F172A] flex items-center gap-6 hover:border-white/20 transition-colors group">
            <div className="text-[#64748B] group-hover:text-white transition-colors">{icon}</div>
            <div>
                <p className="text-[10px] text-[#64748B] tracking-[0.2em] uppercase mb-2">{label}</p>
                <p className="font-serif text-xl font-light text-white italic tracking-wide">{value}</p>
            </div>
        </div>
    );
}
