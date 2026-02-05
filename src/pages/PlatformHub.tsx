import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export default function PlatformHub() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#64748B] selection:text-white">
      <Header />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center relative px-6">
            <div className="grid grid-cols-12 gap-4 w-full max-w-7xl mx-auto">
                <div className="col-span-12 md:col-span-8 md:col-start-3 text-center space-y-12">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-none">
                        Spiritual <br />
                        <span className="italic text-[#64748B]">Rebellion.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#94A3B8] font-light max-w-2xl mx-auto leading-relaxed">
                        The modern stack is a cage. Defrag provides the tools to dismantle the system and reclaim your mechanical authority.
                    </p>
                    <div className="flex justify-center">
                         <Link
                            to="/defrag-manual"
                            className="group relative inline-flex items-center justify-center px-12 py-5 border border-[#F8FAFC]/20 hover:border-[#F8FAFC] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all duration-500"
                        >
                            <span className="text-sm font-bold tracking-[0.2em] uppercase">Unlock Manual</span>
                            <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Center Axis Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -translate-x-1/2 pointer-events-none" />
        </section>

        {/* MODULES GRID (Simpler, Text-Only) */}
        <section className="py-32 border-t border-white/5 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {/* ECHO */}
                <div className="bg-[#0F172A] p-12 flex flex-col items-center text-center space-y-6 group hover:bg-[#1E293B] transition-colors duration-500">
                    <span className="text-xs font-mono text-[#64748B] tracking-widest uppercase">Module_01</span>
                    <h3 className="text-3xl font-serif text-white italic">Echo</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Individual telemetry. Establish your mechanical baseline.
                    </p>
                    <Link to="/echo" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mt-auto border-b border-transparent group-hover:border-white transition-all">
                        Launch
                    </Link>
                </div>

                {/* ORBIT */}
                <div className="bg-[#0F172A] p-12 flex flex-col items-center text-center space-y-6 group hover:bg-[#1E293B] transition-colors duration-500">
                    <span className="text-xs font-mono text-[#64748B] tracking-widest uppercase">Module_02</span>
                    <h3 className="text-3xl font-serif text-white italic">Orbit</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Relational CRM. Visualize the geometry of connection.
                    </p>
                    <Link to="/relational" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mt-auto border-b border-transparent group-hover:border-white transition-all">
                        Launch
                    </Link>
                </div>

                {/* SIGNAL */}
                <div className="bg-[#0F172A] p-12 flex flex-col items-center text-center space-y-6 group hover:bg-[#1E293B] transition-colors duration-500 opacity-50">
                    <span className="text-xs font-mono text-[#64748B] tracking-widest uppercase">Module_03</span>
                    <h3 className="text-3xl font-serif text-white italic">Signal</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Real-time filtration. Active monitoring.
                    </p>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748B] mt-auto cursor-not-allowed">
                        Offline
                    </span>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
