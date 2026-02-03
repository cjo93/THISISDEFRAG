import React from 'react';
import { Link } from 'react-router-dom';

export default function Overview() {
    return (
        <div className="p-12 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-light mb-2">Dashboard</h1>
                <p className="text-white/40">Welcome back to the command line.</p>
            </header>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard label="API Calls" value="12,450" trend="78% of limit" color="text-cyan-400" />
                <StatCard label="Active Keys" value="3" trend="Production" color="text-green-400" />
                <StatCard label="Error Rate" value="0.02%" trend="Normal" color="text-white" />
                <StatCard label="Current Plan" value="PRO" trend="Renews Feb 1" color="text-purple-400" />
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* RECENT ACTIVITY */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-mono mb-6 flex items-center justify-between">
                        Recent Activity
                        <Link to="/dashboard/usage" className="text-xs text-white/40 hover:text-white transition">View All</Link>
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                    <span className="font-mono text-white/60">POST /seda/audit</span>
                                </div>
                                <span className="text-white/20 text-xs">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* KEYS */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-mono mb-6 flex items-center justify-between">
                        API Keys
                        <Link to="/dashboard/keys" className="text-xs text-cyan-400 hover:text-cyan-300 transition">+ Generate New</Link>
                    </h3>
                    <div className="space-y-4">
                        <KeyRow name="Production Key" prefix="sk_live_...x92f" custom="text-green-400 bg-green-400/10" status="Active" />
                        <KeyRow name="Dev Key" prefix="sk_test_...k29a" custom="text-yellow-400 bg-yellow-400/10" status="Test" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, color }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{label}</p>
            <p className={`text-3xl font-light mb-2 ${color}`}>{value}</p>
            <p className="text-[10px] text-white/30 font-mono">{trend}</p>
        </div>
    );
}

function KeyRow({ name, prefix, custom, status }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5">
            <div>
                <div className="text-sm font-bold text-white mb-1">{name}</div>
                <div className="text-xs font-mono text-white/40">{prefix}</div>
            </div>
            <span className={`text-[10px] uppercase px-2 py-1 rounded ${custom}`}>
                {status}
            </span>
        </div>
    );
}
