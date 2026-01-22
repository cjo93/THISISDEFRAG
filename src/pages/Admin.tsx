import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeUsers: 0,
        totalSessions: 0,
        manualsGenerated: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Basic auth check
        const isOwner = localStorage.getItem('defrag_owner_bypass');
        if (!isOwner) {
            navigate('/signin');
            return;
        }

        // Fetch real stats
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin-stats');
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
                    <div>
                        <h1 className="text-3xl font-light tracking-tight mb-2">Admin Console</h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase">Overview & Settings</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/" className="text-sm text-white/50 hover:text-white transition">Exit to Site</Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('defrag_owner_bypass');
                                navigate('/signin');
                            }}
                            className="text-sm text-red-400 hover:text-red-300 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <StatCard label="Active Users" value={stats.activeUsers.toString()} trend="+12%" />
                    <StatCard label="Total Sessions" value={stats.totalSessions.toString()} trend="+5%" />
                    <StatCard label="Manuals Generated" value={stats.manualsGenerated.toString()} trend="+8%" />
                    <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+15%" isCurrency />
                </div>

                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Access Management */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                        <h2 className="text-lg font-medium mb-6 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Access Management
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Issue Access Link</label>
                                <div className="flex gap-2">
                                    <input type="email" placeholder="user@email.com" className="bg-black border border-white/10 rounded-lg px-4 py-2 flex-grow text-sm focus:outline-none focus:border-orange-500/50" />
                                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition">Generate</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Revoke Session</label>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Session ID" className="bg-black border border-white/10 rounded-lg px-4 py-2 flex-grow text-sm focus:outline-none focus:border-red-500/50" />
                                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition">Revoke</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                        <h2 className="text-lg font-medium mb-6 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                            System Status
                        </h2>

                        <div className="space-y-4">
                            <StatusRow label="API Uptime" value="99.9%" status="good" />
                            <StatusRow label="Gemini AI Latency" value="142ms" status="good" />
                            <StatusRow label="Stripe Webhooks" value="Operational" status="good" />
                            <StatusRow label="Database Sync" value="Synced 2m ago" status="good" />
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <button className="w-full py-3 border border-white/10 rounded-lg text-xs hover:bg-white/5 transition tracking-widest uppercase">View System Logs</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function StatCard({ label, value, trend, isCurrency }: { label: string, value: string, trend: string, isCurrency?: boolean }) {
    return (
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-xl">
            <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">{label}</div>
            <div className="text-3xl font-light text-white mb-2">{value}</div>
            <div className="text-green-400/60 text-xs font-mono">{trend} this week</div>
        </div>
    )
}

function StatusRow({ label, value, status }: { label: string, value: string, status: 'good' | 'warning' | 'error' }) {
    const color = status === 'good' ? 'text-green-400' : status === 'warning' ? 'text-yellow-400' : 'text-red-400';
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">{label}</span>
            <span className={`font-mono ${color}`}>{value}</span>
        </div>
    )
}
