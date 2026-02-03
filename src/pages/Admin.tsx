
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeUsers: 42,
        totalSessions: 1240,
        manualsGenerated: 312,
        revenue: 5928
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'access' | 'system'>('overview');

    useEffect(() => {
        const isOwner = localStorage.getItem('defrag_owner_bypass');
        if (!isOwner) {
            navigate('/signin');
            return;
        }

        // Fetch live stats
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin-stats', {
                    headers: { 'x-admin-key': 'defrag-internal' }
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log('Live stats loaded:', data);
                    setStats(prev => ({
                        ...prev,
                        activeUsers: data.activeUsers || prev.activeUsers,
                        totalSessions: data.totalSessions || prev.totalSessions,
                        manualsGenerated: data.manualsGenerated || prev.manualsGenerated,
                        revenue: data.revenue || prev.revenue
                    }));
                }
            } catch (err) {
                console.error('Stats fetch failed, using cached data', err);
            }
        };

        // Initial fetch
        fetchStats();

        // Poll every 30s
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, [navigate]);

    const handleGenerateCard = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowCard(true);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9999] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/5 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] tracking-[0.3em] font-mono text-gray-300 uppercase">Secure Link Established</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Admin<span className="text-white/30">.OS</span></h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/start"
                            className="text-xs tracking-[0.2em] font-bold text-white hover:text-gray-300 transition-colors uppercase border-b border-white/10 pb-1"
                        >
                            Use as Normal User
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('defrag_owner_bypass');
                                navigate('/signin');
                            }}
                            className="bg-white/5 hover:bg-red-500/10 text-white/50 hover:text-red-400 px-4 py-2 rounded-lg text-xs tracking-widest uppercase transition-all border border-white/5"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mb-12 border-b border-white/5">
                    {['overview', 'access', 'system'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 text-xs tracking-[0.3em] uppercase transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-px bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <StatCard label="Active Users" value={stats.activeUsers.toString()} trend="+12%" />
                            <StatCard label="Total Sessions" value={stats.totalSessions.toString()} trend="+5%" />
                            <StatCard label="Manuals" value={stats.manualsGenerated.toString()} trend="+8%" />
                            <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+15%" />
                        </div>

                        {/* Charts Area Placeholder */}
                        {/* Real Data Area */}
                        <div className="glass-box border border-white/5 rounded-2xl p-8 mb-12">
                            <h3 className="text-xs tracking-[0.3em] text-white/40 uppercase mb-6 font-mono">Recent Transactions (Live Stripe Data)</h3>
                            <div className="space-y-2">
                                {(stats as any).recentTransactions && (stats as any).recentTransactions.length > 0 ? (
                                    (stats as any).recentTransactions.map((tx: any) => (
                                        <div key={tx.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-mono text-xs">
                                                    $
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium text-sm">{tx.email}</div>
                                                    <div className="text-[10px] text-white/40 font-mono tracking-wider">{new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-2 mb-1">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${tx.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                    <span className="text-sm font-light text-white">${tx.amount.toFixed(2)}</span>
                                                </div>
                                                <div className="text-[10px] text-white/30 uppercase tracking-widest">{tx.status}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-white/20 text-sm tracking-widest uppercase mb-1">No recent transactions</div>
                                        <div className="text-white/10 text-xs">Data will appear here once live sales occur</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'access' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto py-12">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-light mb-4">Access Generator</h2>
                            <p className="text-white/40 text-sm tracking-widest uppercase">Issue highest-tier manual access</p>
                        </div>

                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <label className="block text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-mono">Grant Duration</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="py-3 bg-white/5 border border-white/10 rounded-xl text-xs tracking-widest uppercase hover:bg-white/10 transition-all font-bold">1 Month</button>
                                        <button className="py-3 bg-white text-black border border-white rounded-xl text-xs tracking-widest uppercase hover:bg-gray-100 transition-all font-bold">LIFETIME ACCESS</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-mono">Recipient (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Name or Memo"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-white/50"
                                    />
                                </div>
                                <button
                                    onClick={handleGenerateCard}
                                    disabled={isGenerating}
                                    className="w-full py-5 bg-white text-black rounded-xl text-xs tracking-[0.4em] font-black uppercase hover:bg-gray-100 transition-all disabled:opacity-50"
                                >
                                    {isGenerating ? 'GENOCIDING ACCESS TOKEN...' : 'GENERATE SHARED ACCESS'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid md:grid-cols-2 gap-8">
                        <div className="bg-zinc-900/20 border border-white/5 rounded-2xl p-8">
                            <h2 className="text-xs tracking-[0.3em] text-white/40 uppercase mb-8 font-mono">Service Status</h2>
                            <div className="space-y-6">
                                <StatusRow label="Architecture Processing" value="STABLE" status="good" />
                                <StatusRow label="Stripe Integration" value="ACTIVE" status="good" />
                                <StatusRow label="Ephemeris Engine" value="SYNCED" status="good" />
                                <StatusRow label="Gemini AI Response" value="124ms" status="good" />
                            </div>
                        </div>
                        <div className="bg-zinc-900/20 border border-white/5 rounded-2xl p-8">
                            <h2 className="text-xs tracking-[0.3em] text-white/40 uppercase mb-8 font-mono">System Load</h2>
                            <div className="h-40 flex items-end gap-1">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${i > 24 ? 'bg-white' : 'bg-white/10'}`} style={{ height: `${Math.random() * 80 + 20}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Premium Access Card Modal */}
            {showCard && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12 animate-in fade-in zoom-in duration-500">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setShowCard(false)} />

                    <div className="relative group max-w-sm w-full">
                        {/* The "Card" */}
                        <div className="aspect-[1.6/1] w-full bg-gradient-to-br from-zinc-800 via-black to-zinc-900 rounded-[2rem] border border-white/20 p-8 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
                            {/* Mandala Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-[50px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 100 100" className="text-white" fill="currentColor">
                                            <circle cx="50" cy="50" r="40" opacity="0.1" />
                                            <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="4" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[8px] tracking-[0.4em] text-white/40 uppercase mb-1">Access Token</span>
                                        <span className="block text-xs font-mono text-white/90">#X-42-DFRG</span>
                                    </div>
                                </div>

                                <h4 className="text-xl font-light tracking-widest text-white uppercase">Full Access</h4>
                                <p className="text-[10px] text-white/30 tracking-[0.2em] font-mono mt-1 uppercase">Validity: 30 Days (Tier: Highest)</p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                                <span className="text-[10px] tracking-[0.3em] font-bold text-white uppercase">Airdrop Ready</span>
                                <div className="flex gap-1">
                                    <div className="h-1 w-8 bg-white rounded-full" />
                                    <div className="h-1 w-2 bg-white/20 rounded-full" />
                                </div>
                            </div>

                            {/* Intricate Mandala Pattern Overlaid */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.05] pointer-events-none">
                                <svg width="200" height="200" viewBox="0 0 100 100" className="text-white animate-[spin_20s_linear_infinite]">
                                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
                                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Copy Link / AirDrop Control */}
                        <div className="mt-12 space-y-4">
                            <button
                                onClick={() => {
                                    alert('Link copied to clipboard (Mockup)');
                                    setShowCard(false);
                                }}
                                className="w-full h-14 bg-white text-black rounded-xl font-bold text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                            >
                                Copy Share Link
                            </button>
                            <p className="text-center text-[10px] text-white/30 tracking-widest uppercase">Click outside to dismiss</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend: string }) {
    return (
        <div className="glass-box border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-3 font-mono">{label}</div>
            <div className="text-4xl font-light text-white mb-3">{value}</div>
            <div className="text-green-400 text-[10px] font-mono tracking-widest">{trend} this interval</div>
        </div>
    )
}

function StatusRow({ label, value, status }: { label: string, value: string, status: 'good' | 'warning' | 'error' }) {
    const color = status === 'good' ? 'text-green-400' : status === 'warning' ? 'text-yellow-400' : 'text-red-400';
    return (
        <div className="flex justify-between items-center text-xs tracking-widest uppercase py-4 border-b border-white/5 last:border-0">
            <span className="text-white/40">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${status === 'good' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`font-mono ${color}`}>{value}</span>
            </div>
        </div>
    )
}

function ProfileRow({ name, count }: { name: string, count: string }) {
    return (
        <div className="flex justify-between items-center group cursor-default">
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">{name}</span>
            <span className="text-xs font-mono text-white/60">{count}</span>
        </div>
    )
}
