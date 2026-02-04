
import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../lib/api-client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { Activity, Clock, Zap, Cpu, BarChart3 } from 'lucide-react';

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
            toast.error('Telemetry failed');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="p-20 flex flex-col items-center justify-center animate-pulse">
            <BarChart3 size={40} className="text-white/5 mb-8" />
            <div className="text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase italic">Retrieving_Telemetry...</div>
        </div>
    );

    return (
        <div className="p-20 max-w-7xl mx-auto space-y-24 animate-fade-in">
            <div className="space-y-4">
                <h1 className="text-5xl font-light text-white tracking-tighter uppercase italic">Usage_Metrics</h1>
                <p className="text-lg text-white/30 font-light italic max-w-xl">Deep telemetry integration monitoring your system throughput and node activity.</p>
            </div>

            {/* CHART — Industrial Monochrome */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-12 relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-12">
                    <Activity size={18} className="text-white/20" />
                    <h3 className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase italic">30-Day_Load_Volume</h3>
                </div>

                <div className="h-[450px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.usageHistory || []}>
                            <defs>
                                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fff" stopOpacity={0.05} />
                                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="rgba(255,255,255,0.1)"
                                tick={{ fontSize: 9, fontStyle: 'italic', fontFamily: 'monospace', fill: 'rgba(255,255,255,0.2)' }}
                                tickFormatter={(tick) => tick.slice(5).replace('-', '/')}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.1)"
                                tick={{ fontSize: 9, fontStyle: 'italic', fontFamily: 'monospace', fill: 'rgba(255,255,255,0.2)' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '16px', fontSize: '12px', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="calls" stroke="rgba(255,255,255,0.4)" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" animationDuration={2000} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.03] transition-all duration-700 group">
                    <div className="flex items-center gap-4 mb-8">
                        <Zap size={14} className="text-white/20 group-hover:text-white transition-colors" />
                        <div className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase italic">Load_Cycle</div>
                    </div>
                    <div className="text-5xl font-light text-white tracking-tighter mb-4 italic">{stats?.monthlyUsage.toLocaleString()}</div>
                    <div className="text-white/10 text-[10px] font-mono tracking-[0.2em] italic uppercase">Limit_Threshold: {stats?.usageLimit?.toLocaleString()}</div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.03] transition-all duration-700 group">
                    <div className="flex items-center gap-4 mb-8">
                        <Cpu size={14} className="text-white/20 group-hover:text-white transition-colors" />
                        <div className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase italic">Active_Nodes</div>
                    </div>
                    <div className="text-5xl font-light text-white tracking-tighter mb-4 italic">{stats?.activeKeys}</div>
                    <div className="text-white/10 text-[10px] font-mono tracking-[0.2em] italic uppercase">Operational_State: Steady</div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-[48px] p-10 hover:bg-white/[0.03] transition-all duration-700 group">
                    <div className="flex items-center gap-4 mb-8">
                        <Clock size={14} className="text-white/20 group-hover:text-white transition-colors" />
                        <div className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase italic">Next_Sync</div>
                    </div>
                    <div className="text-5xl font-light text-white tracking-tighter mb-4 italic">{stats?.renewalDate}</div>
                    <div className="text-white/10 text-[10px] font-mono tracking-[0.2em] italic uppercase">Scheduled_Automation</div>
                </div>
            </div>
        </div>
    );
}
