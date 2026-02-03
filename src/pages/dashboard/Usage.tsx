import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../lib/api-client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export default function Usage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await authenticatedFetch('/api-v2/dashboard/stats');
            setStats(data);
        } catch (error) {
            toast.error('Failed to load usage data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-12 text-white">Loading...</div>;

    return (
        <div className="p-12 max-w-7xl mx-auto">
            <h1 className="text-4xl font-light mb-12">Usage Analytics</h1>

            {/* CHART */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12">
                <h3 className="text-lg font-mono mb-6">30-Day Volume</h3>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.usageHistory || []}>
                            <defs>
                                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10 }} tickFormatter={(tick) => tick.slice(5)} />
                            <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }}
                                itemStyle={{ color: '#a855f7' }}
                            />
                            <Area type="monotone" dataKey="calls" stroke="#a855f7" fillOpacity={1} fill="url(#colorCalls)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-white/40 text-xs mb-2 uppercase tracking-widest">Total Monthly Calls</div>
                    <div className="text-4xl font-light text-white">{stats?.monthlyUsage.toLocaleString()}</div>
                    <div className="text-white/20 text-xs mt-2">Vs Limit: {stats?.usageLimit?.toLocaleString()}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-white/40 text-xs mb-2 uppercase tracking-widest">Active Keys</div>
                    <div className="text-4xl font-light text-cyan-400">{stats?.activeKeys}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-white/40 text-xs mb-2 uppercase tracking-widest">Plan Renewal</div>
                    <div className="text-4xl font-light text-white">{stats?.renewalDate}</div>
                </div>
            </div>
        </div>
    );
}
