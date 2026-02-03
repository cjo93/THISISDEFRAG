
import React from 'react';
import { CheckCircle, Circle, Zap, MessageSquare } from 'lucide-react';

export default function DeveloperRoadmap() {
    const phases = [
        {
            status: 'completed',
            quarter: 'PHASE 01',
            date: 'Q4 2025',
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
            quarter: 'PHASE 02',
            date: 'Q1 2026',
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
            quarter: 'PHASE 03',
            date: 'Q2 2026',
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
            quarter: 'PHASE 04',
            date: 'Q3-Q4 2026',
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
            case 'completed': return <CheckCircle size={18} className="text-white/20" />;
            case 'current': return <Zap size={18} className="text-orange-500 animate-pulse" />;
            default: return <Circle size={18} className="text-white/10" />;
        }
    };

    return (
        <div className="space-y-16 animate-fade-in">
            <div className="space-y-4">
                <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Platform Roadmap</h1>
                <p className="text-lg text-white/40 font-light max-w-xl">The trajectory of behavioral intelligence integration.</p>
            </div>

            <div className="space-y-8">
                {phases.map((phase, index) => (
                    <div
                        key={index}
                        className={`p-10 rounded-[40px] border transition-all duration-700 ${phase.status === 'current'
                            ? 'bg-orange-500/[0.02] border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.05)]'
                            : 'bg-white/[0.01] border-white/5'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                            <div className="flex items-center gap-4">
                                {getStatusIcon(phase.status)}
                                <div className="space-y-1">
                                    <div className="text-[10px] font-mono tracking-[0.4em] text-orange-400 uppercase">{phase.quarter}</div>
                                    <h3 className="text-2xl font-light text-white tracking-tight">{phase.title}</h3>
                                </div>
                            </div>
                            <div className="md:ml-auto flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest border border-white/10 uppercase ${phase.status === 'current' ? 'text-white' : 'text-white/20'}`}>
                                    {phase.date}
                                </span>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                            {phase.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${item.done ? 'bg-orange-500' : 'bg-white/10 group-hover:bg-white/20'}`} />
                                    <span className={`text-sm font-light tracking-wide ${item.done ? 'text-white/60' : 'text-white/20'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 rounded-[32px] border border-white/5 bg-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
                        <MessageSquare size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-light text-white">System Feedback</h3>
                        <p className="text-sm text-white/30 font-light max-w-sm">Propose new modules or architectural enhancements.</p>
                    </div>
                </div>
                <a
                    href="mailto:help@defrag.app?subject=System Enhancement Proposal"
                    className="h-12 px-10 bg-white text-black text-[10px] font-bold tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center uppercase"
                >
                    Submit Proposal
                </a>
            </div>
        </div>
    );
}
