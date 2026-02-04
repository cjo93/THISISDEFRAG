
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Terminal, Zap, ArrowUpRight, Cpu } from 'lucide-react';

export default function Overview() {
    return (
        <div className="p-6 sm:p-10 lg:p-20 max-w-7xl mx-auto space-y-12 lg:space-y-20 animate-fade-in">
            <header className="space-y-4">
                <h1 className="text-5xl font-light text-white tracking-tighter uppercase italic">System_Overview</h1>
                <p className="text-lg text-white/30 font-light italic">Operational baseline initialized. All nodes reporting as nominal.</p>
            </header>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard label="Load_Volume" value="12,450" trend="78% Capacity" icon={<Cpu size={20} />} active />
                <StatCard label="Active_Nodes" value="3" trend="Sync: Established" icon={<Terminal size={20} />} active />
                <StatCard label="Error_Entropy" value="0.02%" trend="Nominal" icon={<Activity size={20} />} />
                <StatCard label="Protocol_Tier" value="PRO_v2" trend="Renews: 01_FEB" icon={<Shield size={20} />} active />
            </div>

            {/* ACTIVE APPLICATIONS */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* ECHO APP */}
                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.02] transition-all duration-700 group relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-white text-white group-hover:text-black transition-all duration-500">⚡️</div>
                            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 border border-white/5 px-4 py-2 rounded-full italic">System_Ready</span>
                        </div>
                        <h3 className="text-3xl text-white font-light tracking-tight mb-4 uppercase italic">ECHO</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-light font-mono mb-10 h-12">
                            Real-time operational parameters. Analysis of drive and output vectors.
                        </p>

                        <Link to="/echo" className="flex items-center justify-between border-t border-white/5 pt-8 group-hover:text-white transition-colors text-white/30">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold italic">Launch_Sequence</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ORBIT APP */}
                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.02] transition-all duration-700 group relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-white text-white group-hover:text-black transition-all duration-500">🕸</div>
                            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 border border-white/5 px-4 py-2 rounded-full italic">Data_Synced</span>
                        </div>
                        <h3 className="text-3xl text-white font-light tracking-tight mb-4 uppercase italic">ORBIT</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-light font-mono mb-10 h-12">
                            Relational geometry mapping. Visualize pressure and distance.
                        </p>

                        <Link to="/relational" className="flex items-center justify-between border-t border-white/5 pt-8 group-hover:text-white transition-colors text-white/30">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold italic">Launch_Sequence</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid lg:grid-cols-2 gap-12">
                {/* RECENT ACTIVITY */}
                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.02] transition-all duration-700 group">
                    <h3 className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase italic mb-10 flex items-center justify-between">
                        Recent_Log_Activity
                        <Link to="/dashboard/usage" className="text-white/40 hover:text-white transition-all flex items-center gap-2 group/link">
                            Audit_Full
                            <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between text-sm py-4 border-b border-white/[0.03] last:border-0 group/item">
                                <div className="flex items-center gap-6">
                                    <span className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-white/10' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse'}`}></span>
                                    <span className="font-mono text-white/40 group-hover/item:text-white transition-colors tracking-tight italic">POST /seda/audit/v2</span>
                                </div>
                                <span className="text-white/10 text-[10px] font-mono tracking-widest">{6 * i}m_ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* KEYS */}
                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.02] transition-all duration-700 group">
                    <h3 className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase italic mb-10 flex items-center justify-between">
                        Node_Access_Keys
                        <Link to="/dashboard/keys" className="text-white hover:text-white/70 transition-all flex items-center gap-2 group/link uppercase text-[10px] font-bold tracking-[0.2em]">
                            + New_Node
                        </Link>
                    </h3>
                    <div className="space-y-6">
                        <KeyRow name="Production_Node" prefix="sk_live_...x92f" status="Primary" active />
                        <KeyRow name="Sandbox_Node" prefix="sk_test_...k29a" status="Sandbox" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, icon, active }: any) {
    return (
        <div className="bg-white/[0.01] border border-white/5 rounded-[40px] p-8 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 group">
            <div className="flex items-center justify-between mb-8">
                <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.4em] italic leading-none">{label}</p>
                <div className={`${active ? 'text-white' : 'text-white/10'} transition-colors`}>{icon}</div>
            </div>
            <p className="text-4xl font-light text-white tracking-tighter mb-4 italic leading-none">{value}</p>
            <p className="text-[9px] text-white/10 font-mono tracking-[0.2em] uppercase italic">{trend}</p>
        </div>
    );
}

function KeyRow({ name, prefix, status, active }: any) {
    return (
        <div className="flex items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/[0.03] group/row hover:border-white/10 transition-all">
            <div className="flex items-center gap-6">
                <Terminal size={16} className={`${active ? 'text-white' : 'text-white/10'} transition-colors`} />
                <div>
                    <div className="text-xs font-bold text-white mb-2 uppercase tracking-widest italic">{name}</div>
                    <div className="text-[10px] font-mono text-white/20 group-hover/row:text-white/40 transition-colors uppercase pr-4">{prefix}</div>
                </div>
            </div>
            <span className={`text-[9px] font-mono tracking-[0.3em] uppercase px-4 py-2 rounded-full italic border ${active ? 'bg-white text-black border-white' : 'bg-white/5 text-white/20 border-white/5'}`}>
                {status}
            </span>
        </div>
    );
}
