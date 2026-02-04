
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal, Box, Book, Database, Users, Map, ShieldCheck, ChevronRight } from 'lucide-react';

export default function DeveloperLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-white/10 overflow-hidden">
            {/* Sidebar — Premium Monochrome Architecture */}
            <aside className="w-80 border-r border-white/5 hidden md:flex flex-col bg-zinc-950 px-4 relative z-20">
                <div className="p-10 mb-8">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all duration-700">
                            <Terminal size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-xs tracking-[0.4em] text-white opacity-40 group-hover:opacity-100 transition-opacity uppercase">DEV_PORTAL</span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto pb-10">
                    <div className="px-6 py-4 text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase mb-2">Technical_Layer</div>
                    <NavItem to="/developer" icon={<Box size={18} />} label="Overview" active={location.pathname === '/developer'} />
                    <NavItem to="/developer/guides" icon={<Book size={18} />} label="Guides" active={location.pathname.startsWith('/developer/guides')} />
                    <NavItem to="/developer/resources" icon={<Database size={18} />} label="Resources" active={location.pathname.startsWith('/developer/resources')} />

                    <div className="pt-12 px-6 py-4 text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase mb-2">Ecosystem</div>
                    <NavItem to="/developer/community" icon={<Users size={18} />} label="Community" active={location.pathname.startsWith('/developer/community')} />
                    <NavItem to="/developer/roadmap" icon={<Map size={18} />} label="Roadmap" active={location.pathname.startsWith('/developer/roadmap')} />
                </nav>

                <div className="p-8 border-t border-white/5 space-y-4">
                    <Link to="/docs" className="flex items-center justify-between px-6 py-4 rounded-3xl text-white/30 border border-transparent hover:border-white/5 hover:bg-white/[0.02] hover:text-white transition-all duration-500 text-[10px] font-bold tracking-[0.2em] uppercase">
                        <span className="flex items-center gap-4 italic"><ShieldCheck size={16} /> Global Specs</span>
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-black relative">

                {/* Mobile Header */}
                <header className="md:hidden h-24 border-b border-white/5 flex items-center justify-between px-8 bg-black/80 backdrop-blur-3xl sticky top-0 z-50">
                    <Link to="/" className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50">
                            <Terminal size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-[10px] tracking-[0.4em] uppercase opacity-40">DEFRAG_DEV</span>
                    </Link>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                </header>

                <div className="flex-1 overflow-y-auto px-8 py-12 md:px-20 md:py-32">
                    <div className="max-w-5xl mx-auto w-full">
                        <Outlet />
                    </div>
                </div>

                {/* Ambient detail */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
            </main>
        </div>
    );
}

function NavItem({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center justify-between px-6 py-4 rounded-3xl transition-all duration-700 text-[11px] font-bold tracking-[0.2em] uppercase group border ${active
                ? 'bg-white text-black border-white shadow-[0_4px_30px_rgba(255,255,255,0.1)]'
                : 'text-white/30 border-transparent hover:bg-white/[0.03] hover:text-white'
                }`}
        >
            <div className="flex items-center gap-5">
                <div className={`transition-all duration-700 ${active ? 'text-black' : 'text-white/10 group-hover:text-white'}`}>
                    {icon}
                </div>
                <span>{label}</span>
            </div>
            {active && <ChevronRight size={14} className="animate-pulse" />}
        </Link>
    );
}
