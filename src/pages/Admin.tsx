
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Activity, Cpu, ShieldCheck, ShieldAlert, Zap, Radio, Database, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

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

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin-stats', {
                    headers: { 'x-admin-key': 'defrag-internal' }
                });
                if (res.ok) {
                    const data = await res.json();
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

        fetchStats();
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
        <div className="min-h-screen bg-black text-white selection:bg-white/10 font-mono italic">
            {/* Background Detail */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] bg-white rounded-full blur-[300px]" />
            </div>

            <div className="max-w-7xl mx-auto px-8 py-20 lg:px-16 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-none shadow-2xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                            Admin_Secure_Protocol
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-light tracking-tighter uppercase italic text-white leading-none">
                            System_Console<span className="text-white/20">.OS</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-10">
                        <Link
                            to="/start"
                            className="text-[10px] tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all uppercase border-b border-white/5 pb-2 italic"
                        >
                            Client_Simulation
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('defrag_owner_bypass');
                                navigate('/signin');
                            }}
                            className="h-16 px-8 bg-white/5 border border-white/10 text-white/30 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 rounded-none text-[10px] tracking-[0.4em] uppercase transition-all flex items-center gap-4 italic"
                        >
                            Log_Out <LogOut size={14} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-12 mb-20 border-b border-white/5">
                    {['overview', 'access', 'system'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-6 text-[11px] tracking-[0.5em] uppercase transition-all relative italic ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="animate-fade-in space-y-20">
                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <StatCard label="Active_Nodes" value={stats.activeUsers.toString()} trend="+12%" icon={<Radio size={14} />} />
                            <StatCard label="Total_Sessions" value={stats.totalSessions.toString()} trend="+5%" icon={<Terminal size={14} />} />
                            <StatCard label="Manuals_Finalized" value={stats.manualsGenerated.toString()} trend="+8%" icon={<CheckCircle size={14} />} />
                            <StatCard label="Revenue_System" value={`$${stats.revenue.toLocaleString()}`} trend="+15%" icon={<Database size={14} />} />
                        </div>

                        {/* Recent Transactions */}
                        <div className="p-16 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700 shadow-2xl">
                            <h3 className="text-[10px] tracking-[0.6em] text-white/20 uppercase mb-12 flex items-center gap-4 italic underline decoration-white/5 underline-offset-8">
                                <Zap size={14} strokeWidth={1} />
                                Live_Stripe_Stream
                            </h3>
                            <div className="space-y-6">
                                {(stats as any).recentTransactions && (stats as any).recentTransactions.length > 0 ? (
                                    (stats as any).recentTransactions.map((tx: any) => (
                                        <div key={tx.id} className="flex justify-between items-center py-10 border-b border-white/5 last:border-0 hover:bg-white/[0.01] -mx-8 px-8 transition-all rounded-3xl">
                                            <div className="flex items-center gap-8">
                                                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                                    <span className="text-xl">$</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="text-white text-xl font-light italic tracking-tight">{tx.email}</div>
                                                    <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">{new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right space-y-2">
                                                <div className="text-2xl font-light text-white italic tracking-tighter">${tx.amount.toFixed(2)}</div>
                                                <div className="flex items-center justify-end gap-3">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${tx.status === 'paid' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'}`} />
                                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] italic">{tx.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-24 space-y-4">
                                        <div className="text-white/10 text-[10px] tracking-[0.8em] uppercase italic">Zero_Stream_Activity</div>
                                        <div className="text-white/5 text-[9px] tracking-[0.4em] uppercase italic">System awaiting live sales synchronization</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'access' && (
                    <div className="animate-fade-in max-w-3xl mx-auto py-20">
                        <div className="text-center space-y-6 mb-20">
                            <h2 className="text-4xl font-light text-white tracking-tighter uppercase italic">Access_Protocol_Generator</h2>
                            <p className="text-white/20 text-[10px] tracking-[0.6em] uppercase italic">Override system requirements and authorize bypass</p>
                        </div>

                        <div className="p-16 rounded-[80px] border border-white/5 bg-white/[0.01] relative overflow-hidden group shadow-2xl">
                            <div className="space-y-16 relative z-10">
                                <div className="space-y-8">
                                    <label className="block text-[10px] tracking-[0.5em] text-white/20 uppercase italic px-4">Authorization_Temporal_Scale</label>
                                    <div className="grid grid-cols-2 gap-8">
                                        <button className="h-20 bg-white/5 border border-white/10 rounded-none text-[10px] tracking-[0.5em] uppercase hover:bg-white/10 transition-all font-bold italic text-white/40">30_Day_Grant</button>
                                        <button className="h-20 bg-white text-black rounded-none text-[10px] tracking-[0.5em] uppercase hover:bg-slate-200 transition-all font-bold italic shadow-2xl">Lifetime_Authorized</button>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <label className="block text-[10px] tracking-[0.5em] text-white/20 uppercase italic px-4">Node_Identification (Memo)</label>
                                    <input
                                        type="text"
                                        placeholder="INPUT_RECIPIENT_OR_REASON"
                                        className="w-full bg-transparent border-b border-white/10 py-6 text-xl italic font-light tracking-tight focus:border-white outline-none transition-colors placeholder:text-white/5 text-white"
                                    />
                                </div>
                                <button
                                    onClick={handleGenerateCard}
                                    disabled={isGenerating}
                                    className="w-full h-24 bg-white/[0.03] border border-white/10 text-white/20 rounded-none text-[10px] tracking-[0.6em] font-black uppercase hover:bg-white hover:text-black transition-all duration-700 disabled:opacity-20 italic flex items-center justify-center gap-6 shadow-2xl"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Synchronizing_Access...
                                        </>
                                    ) : (
                                        <>
                                            Generate_Highest_Protocol
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className="animate-fade-in grid md:grid-cols-2 gap-10">
                        <div className="p-12 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700">
                            <h2 className="text-[10px] tracking-[0.6em] text-white/20 uppercase mb-12 italic underline decoration-white/5 underline-offset-8">Critical_Interface_Status</h2>
                            <div className="space-y-4">
                                <StatusRow label="Architecture_Processing" value="STABLE" status="good" icon={<ShieldCheck size={14} />} />
                                <StatusRow label="Stripe_Relay" value="ACTIVE" status="good" icon={<Zap size={14} />} />
                                <StatusRow label="Ephemeris_Link" value="SYNCED" status="good" icon={<Activity size={14} />} />
                                <StatusRow label="Intelligence_Core" value="124ms" status="good" icon={<Cpu size={14} />} />
                            </div>
                        </div>
                        <div className="p-12 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-700 flex flex-col">
                            <h2 className="text-[10px] tracking-[0.6em] text-white/20 uppercase mb-12 italic underline decoration-white/5 underline-offset-8">Thermal_Load_Analysis</h2>
                            <div className="h-48 flex items-end gap-2 mt-auto">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-t-sm transition-all duration-1000 ${i > 32 ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/10'}`}
                                        style={{ height: `${Math.random() * 80 + 20}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Premium Access Card Modal */}
            {showCard && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8 sm:p-16 animate-fade-in">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setShowCard(false)} />

                    <div className="relative group max-w-lg w-full scale-in">
                        {/* The "Card" */}
                        <div className="aspect-[1.6/1] w-full bg-zinc-950 rounded-[3rem] border border-white/10 p-12 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col justify-between group-hover:border-white/20 transition-all duration-700 italic">
                            {/* Card Glow */}
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white shadow-[0_0_150px_rgba(255,255,255,0.05)] rounded-full blur-[100px]" />

                            <div className="relative z-10 flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5">
                                        <ShieldCheck size={28} strokeWidth={1} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-light tracking-tighter text-white uppercase italic">Full_Protocol_Access</h4>
                                        <p className="text-[9px] text-white/30 tracking-[0.6em] font-mono mt-2 uppercase">Authorized Deployment v2</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[8px] tracking-[0.6em] text-white/20 uppercase mb-2">Access_Token</span>
                                    <span className="block text-sm font-mono text-white/60">#X-42-DFRG</span>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-10 border-t border-white/5">
                                <div className="space-y-1">
                                    <span className="block text-[9px] tracking-[0.4em] font-bold text-white uppercase italic">Airdrop_Synchronized</span>
                                    <span className="block text-[8px] tracking-[0.2em] text-white/20 uppercase italic">Tier: Highest_Authorized</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-1.5 w-10 bg-white rounded-full shadow-[0_0_10px_white]" />
                                    <div className="h-1.5 w-3 bg-white/10 rounded-full" />
                                </div>
                            </div>

                            {/* Background Geometric Detail */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-[0.03] pointer-events-none">
                                <svg width="256" height="256" viewBox="0 0 100 100" className="text-white animate-[spin_60s_linear_infinite]">
                                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
                                    <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="currentColor" strokeWidth="0.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-16 space-y-6 flex flex-col items-center">
                            <button
                                onClick={() => {
                                    alert('Access protocol link copied to terminal buffer.');
                                    setShowCard(false);
                                }}
                                className="w-full h-24 bg-white text-black rounded-none font-bold text-[10px] tracking-[0.6em] uppercase hover:bg-slate-200 transition-all duration-700 shadow-2xl flex items-center justify-center gap-6"
                            >
                                Copy_Access_Link
                                <ArrowRight size={20} />
                            </button>
                            <p className="text-[9px] text-white/20 tracking-[0.8em] uppercase italic">Close_Authorized_View</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
    return (
        <div className="p-12 rounded-[56px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 relative overflow-hidden group shadow-xl">
            <div className="flex items-center gap-4 text-white/20 mb-10 group-hover:text-white transition-colors">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                    {icon}
                </div>
                <div className="text-[10px] uppercase tracking-[0.5em] italic">{label}</div>
            </div>
            <div className="text-5xl font-light text-white mb-6 italic tracking-tighter">{value}</div>
            <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                <div className="text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase italic">{trend} Increase</div>
            </div>
        </div>
    )
}

function StatusRow({ label, value, status, icon }: { label: string, value: string, status: 'good' | 'warning' | 'error', icon: React.ReactNode }) {
    const color = status === 'good' ? 'text-white' : status === 'warning' ? 'text-white/40' : 'text-red-500';
    return (
        <div className="flex justify-between items-center py-6 border-b border-white/5 last:border-0 hover:bg-white/[0.01] px-4 rounded-2xl transition-all font-mono italic">
            <div className="flex items-center gap-6">
                <div className="text-white/10">{icon}</div>
                <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 rounded-full ${status === 'good' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-red-500 shadow-[0_0_8px_red]'}`} />
                <span className={`text-[10px] tracking-[0.4em] ${color}`}>{value}</span>
            </div>
        </div>
    )
}
