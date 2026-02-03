import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal, Book, Users, Map, Box } from 'lucide-react';

export default function DeveloperLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-white/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-neutral-900/50 backdrop-blur-xl">
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition">
                            <Terminal size={14} />
                        </div>
                        <span className="font-mono text-sm tracking-widest font-bold text-white/90 group-hover:text-white transition">DEFRAG_DEV</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <NavItem to="/developer" icon={<Box size={16} />} label="Overview" active={location.pathname === '/developer'} />
                    <NavItem to="/developer/guides" icon={<Book size={16} />} label="Guides" active={location.pathname.startsWith('/developer/guides')} />
                    <NavItem to="/developer/resources" icon={<Terminal size={16} />} label="Resources" active={location.pathname.startsWith('/developer/resources')} />
                    <NavItem to="/developer/community" icon={<Users size={16} />} label="Community" active={location.pathname.startsWith('/developer/community')} />
                    <NavItem to="/developer/roadmap" icon={<Map size={16} />} label="Roadmap" active={location.pathname.startsWith('/developer/roadmap')} />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link to="/docs" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors text-sm">
                        <Book size={16} />
                        <span>Generic Docs</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden h-14 border-b border-white/10 flex items-center px-4 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-10">
                    <Link to="/developer" className="font-mono text-sm font-bold tracking-widest">DEFRAG_DEV</Link>
                </header>

                <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

function NavItem({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${active
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
