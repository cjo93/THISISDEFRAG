
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal, Box, Book, Database, Users, Map, ShieldCheck } from 'lucide-react';

export default function DeveloperLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-orange-500/30 overflow-hidden">
            {/* Sidebar — Premium Glassmorphism */}
            <aside className="w-72 border-r border-white/5 hidden md:flex flex-col bg-zinc-950/50 backdrop-blur-3xl relative z-20">
                <div className="p-10 mb-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                            <Terminal size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-mono text-sm tracking-[0.3em] font-black text-white group-hover:text-orange-500 transition-colors uppercase">DEV_HUB</span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-2 overflow-y-auto pb-10">
                    <div className="px-4 py-3 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Core API</div>
                    <NavItem to="/developer" icon={<Box size={18} />} label="Overview" active={location.pathname === '/developer'} />
                    <NavItem to="/developer/guides" icon={<Book size={18} />} label="Guides" active={location.pathname.startsWith('/developer/guides')} />
                    <NavItem to="/developer/resources" icon={<Database size={18} />} label="Resources" active={location.pathname.startsWith('/developer/resources')} />

                    <div className="pt-8 px-4 py-3 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Ecosystem</div>
                    <NavItem to="/developer/community" icon={<Users size={18} />} label="Community" active={location.pathname.startsWith('/developer/community')} />
                    <NavItem to="/developer/roadmap" icon={<Map size={18} />} label="Roadmap" active={location.pathname.startsWith('/developer/roadmap')} />
                </nav>

                <div className="p-8 border-t border-white/5">
                    <Link to="/docs" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all duration-300 text-sm font-light italic">
                        <ShieldCheck size={18} className="text-orange-500/40" />
                        <span>Generic Docs</span>
                    </Link>
                </div>

                {/* Sidebar detail */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-black relative">

                {/* Mobile Header */}
                <header className="md:hidden h-20 border-b border-white/5 flex items-center justify-between px-6 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black">
                            <Terminal size={16} strokeWidth={2.5} />
                        </div>
                        <span className="font-mono text-xs tracking-[0.3em] font-bold uppercase">DEV_HUB</span>
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                </header>

                <div className="flex-1 overflow-y-auto px-6 py-12 md:px-16 md:py-24">
                    <div className="max-w-4xl mx-auto w-full">
                        <Outlet />
                    </div>
                </div>

                {/* Content background detail */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
            </main>
        </div>
    );
}

function NavItem({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 text-sm font-light tracking-wide group ${active
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                : 'text-white/40 hover:bg-white/[0.03] hover:text-white border border-transparent'
                }`}
        >
            <div className={`transition-colors duration-500 ${active ? 'text-orange-400' : 'text-white/20 group-hover:text-white'}`}>
                {icon}
            </div>
            <span>{label}</span>
        </Link>
    );
}
