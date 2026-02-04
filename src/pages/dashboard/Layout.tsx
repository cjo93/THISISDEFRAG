
import React, { useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { Toaster } from 'react-hot-toast';
import { Terminal, Shield, Cpu, Activity, CreditCard, Settings, User } from 'lucide-react';

export default function DashboardLayout() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-white font-mono uppercase tracking-[0.5em] text-[10px] italic">Synchronizing_Nodes...</div>;
    if (!user) return null;

    return (
        <div className="flex h-screen bg-black text-white selection:bg-white/10 font-mono">
            <Toaster position="bottom-right" toastOptions={{
                style: { background: '#09090b', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '12px', letterSpacing: '0.1em' }
            }} />

            {/* SIDEBAR — Industrial Monochrome */}
            <aside className="w-72 border-r border-white/5 flex flex-col bg-zinc-950/50 backdrop-blur-xl">
                <div className="p-10 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs uppercase shadow-xl transition-all duration-700">D</div>
                        <div>
                            <div className="text-sm font-bold tracking-[0.4em] uppercase text-white group-hover:text-white/70 transition-colors">DEFRAG</div>
                            <div className="text-[9px] text-white/20 uppercase tracking-[0.3em] italic mt-1 font-light">System_Console</div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-3">
                    <NavItem to="/dashboard" label="Overview" icon={<Activity size={16} />} active={location.pathname === '/dashboard'} />
                    <NavItem to="/dashboard/keys" label="API Keys" icon={<Terminal size={16} />} active={location.pathname.startsWith('/dashboard/keys')} />
                    <NavItem to="/dashboard/usage" label="Usage" icon={<Cpu size={16} />} active={location.pathname.startsWith('/dashboard/usage')} />
                    <NavItem to="/dashboard/billing" label="Billing" icon={<CreditCard size={16} />} active={location.pathname.startsWith('/dashboard/billing')} />
                    <NavItem to="/dashboard/settings" label="Settings" icon={<Settings size={16} />} active={location.pathname.startsWith('/dashboard/settings')} />
                </nav>

                <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shadow-inner">
                            <User size={18} strokeWidth={1} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-[10px] text-white/60 truncate tracking-tight lowercase">{user.email}</div>
                            <div className="text-[8px] text-white/20 uppercase tracking-[0.5em] mt-1 italic">Pro_Tier</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto bg-black relative">
                <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

function NavItem({ to, label, icon, active }: { to: string, label: string, icon: React.ReactNode, active: boolean }) {
    return (
        <Link to={to} className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 group ${active
            ? 'bg-white text-black shadow-2xl'
            : 'text-white/20 hover:text-white hover:bg-white/[0.03]'
            }`}>
            <span className={`${active ? 'text-black' : 'text-white/20 group-hover:text-white'} transition-colors duration-700`}>{icon}</span>
            <span className="truncate">{label}</span>
        </Link>
    );
}
