
import React from 'react';
import { CheckCircle, Circle, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export default function DeveloperRoadmap() {
    const phases = [
        {
            status: 'completed',
            quarter: 'PHASE_01',
            date: 'Q4_2025',
            title: 'Genetic Foundation',
            items: [
                { label: 'ECHO Design Specification', done: true },
                { label: 'NASA JPL Telemetry Synthesis', done: true },
                { label: 'SEDA Safety Firewall Alpha', done: true },
                { label: 'REST API Infrastructure', done: true }
            ]
        },
        {
            status: 'current',
            quarter: 'PHASE_02',
            date: 'Q1_2026',
            title: 'Expansion Layer',
            items: [
                { label: 'ORBIT Relational Geometry', done: true },
                { label: 'Developer Portal Deployment', done: true },
                { label: 'Collective System Mapping', done: false },
                { label: 'Subscription Protocols', done: false }
            ]
        },
        {
            status: 'upcoming',
            quarter: 'PHASE_03',
            date: 'Q2_2026',
            title: 'Neural Synthesis',
            items: [
                { label: 'SIGNAL Context Revision', done: false },
                { label: 'Integration Keyboard API', done: false },
                { label: 'Entropy Marker Detection', done: false },
                { label: 'Ecosystem Chat Launch', done: false }
            ]
        },
        {
            status: 'upcoming',
            quarter: 'PHASE_04',
            date: 'Q3-Q4_2026',
            title: 'Global Scale',
            items: [
                { label: 'Enterprise SSO Modules', done: false },
                { label: 'Custom Protocol Partnering', done: false },
                { label: 'Event Consciousness Stream', done: false },
                { label: 'White-Label Platform API', done: false }
            ]
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle size={20} className="text-white/20" />;
            case 'current': return <Zap size={20} className="text-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.3)]" />;
            default: return <Circle size={20} className="text-white/5" />;
        }
    };

    return (
        <div className="space-y-24 animate-fade-in py-12">
            <div className="space-y-6">
                <h1 className="text-5xl font-light text-white tracking-tighter leading-tight">System_Trajectory</h1>
                <p className="text-xl text-white/30 font-light italic max-w-2xl">The architectural development curve of high-precision behavioral intelligence.</p>
            </div>

            <div className="space-y-12">
                {phases.map((phase, index) => (
                    <div
                        key={index}
                        className={`p-12 rounded-[64px] border transition-all duration-700 relative overflow-hidden ${phase.status === 'current'
                            ? 'bg-white/[0.03] border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.02)]'
                            : 'bg-white/[0.01] border-white/5'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-10 mb-16 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                                    {getStatusIcon(phase.status)}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase">{phase.quarter}</div>
                                    <h3 className="text-3xl font-light text-white tracking-tight uppercase">{phase.title}</h3>
                                </div>
                            </div>
                            <div className="md:ml-auto flex items-center gap-4">
                                <span className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-[0.4em] border border-white/10 uppercase ${phase.status === 'current' ? 'text-white' : 'text-white/20'}`}>
                                    {phase.date}
                                </span>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10 relative z-10">
                            {phase.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-700 ${item.done ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-white/5 group-hover:bg-white/10'}`} />
                                    <span className={`text-base font-light tracking-wide italic ${item.done ? 'text-white/60' : 'text-white/20'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {phase.status === 'current' && (
                            <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-16 rounded-[64px] border border-white/5 bg-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-12 group transition-all hover:border-white/10">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all duration-700">
                        <MessageSquare size={24} strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-light text-white tracking-tight uppercase">System Feedback</h3>
                        <p className="text-base text-white/30 font-light italic max-w-sm">Propose specialized modules or systemic enhancements.</p>
                    </div>
                </div>
                <a
                    href="mailto:help@defrag.app?subject=System Enhancement Proposal"
                    className="h-16 px-12 bg-white text-black text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-slate-200 transition-all flex items-center justify-center uppercase shadow-xl group/btn"
                >
                    Submit_Proposal <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
}
