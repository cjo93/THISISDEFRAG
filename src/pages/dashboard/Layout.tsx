import React, { useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context'; // Assuming AuthContext exists, or we use direct firebase auth
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout() {
    const { user, loading } = useAuth(); // Need to verify if this hook exists or create it
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex h-screen bg-black text-white selection:bg-purple-500/30 font-mono">
            <Toaster position="bottom-right" toastOptions={{
                style: { background: '#111', color: '#fff', border: '1px solid #333' }
            }} />

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/10 flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <Link to="/dashboard" className="text-xl font-bold tracking-[0.2em] hover:text-cyan-400 transition">
                        DEFRAG
                    </Link>
                    <div className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                        Developer Console
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem to="/dashboard" label="Overview" active={location.pathname === '/dashboard'} />
                    <NavItem to="/dashboard/keys" label="API Keys" active={location.pathname.startsWith('/dashboard/keys')} />
                    <NavItem to="/dashboard/usage" label="Usage" active={location.pathname.startsWith('/dashboard/usage')} />
                    <NavItem to="/dashboard/billing" label="Billing" active={location.pathname.startsWith('/dashboard/billing')} />
                    <NavItem to="/dashboard/settings" label="Settings" active={location.pathname.startsWith('/dashboard/settings')} />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-xs text-white truncate">{user.email}</div>
                            <div className="text-[10px] text-white/40 uppercase">Pro Plan</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-black to-black">
                <Outlet />
            </main>
        </div>
    );
}

function NavItem({ to, label, active }: { to: string, label: string, active: boolean }) {
    return (
        <Link to={to} className={`block px-4 py-3 rounded text-sm uppercase tracking-widest transition-all ${active
                ? 'bg-white/10 text-cyan-400 border-l-2 border-cyan-400'
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}>
            {label}
        </Link>
    );
}
