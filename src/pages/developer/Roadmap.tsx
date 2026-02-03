import React from 'react';
import { CheckCircle, Circle, Clock, Rocket, Zap, Shield, MessageCircle, Globe } from 'lucide-react';

export default function DeveloperRoadmap() {
    const phases = [
        {
            status: 'completed',
            quarter: 'Q4 2025',
            title: 'Foundation',
            items: [
                { label: 'ECHO Personal Design Specification', done: true },
                { label: 'NASA JPL Telemetry Integration', done: true },
                { label: 'SEDA Safety Firewall v1', done: true },
                { label: 'REST API & SDK Launch', done: true }
            ]
        },
        {
            status: 'current',
            quarter: 'Q1 2026',
            title: 'Platform Expansion',
            items: [
                { label: 'ORBIT Relational Geometry System', done: true },
                { label: 'Developer Portal & Docs', done: true },
                { label: 'Team Dashboard', done: false },
                { label: 'Subscription Management', done: false }
            ]
        },
        {
            status: 'upcoming',
            quarter: 'Q2 2026',
            title: 'Intelligence Layer',
            items: [
                { label: 'SIGNAL Real-time Message Revision', done: false },
                { label: 'Design-Aware Keyboard (iOS/Android)', done: false },
                { label: 'Entropy Marker Detection API', done: false },
                { label: 'Community Discord Launch', done: false }
            ]
        },
        {
            status: 'upcoming',
            quarter: 'Q3-Q4 2026',
            title: 'Enterprise & Scale',
            items: [
                { label: 'Enterprise SSO & Admin Controls', done: false },
                { label: 'Custom Integration Partnerships', done: false },
                { label: 'Webhook & Event Streaming', done: false },
                { label: 'White-Label Platform API', done: false }
            ]
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle size={20} className="text-green-400" />;
            case 'current': return <Zap size={20} className="text-white" />;
            default: return <Circle size={20} className="text-white/20" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/30';
            case 'current': return 'bg-white/10 text-white border-white/30';
            default: return 'bg-white/5 text-white/40 border-white/10';
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-light text-white mb-2">Platform Roadmap</h1>
                <p className="text-white/50">See what we're building and where we're headed.</p>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-6">
                {phases.map((phase, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl border ${phase.status === 'current'
                                ? 'bg-white/5 border-white/30'
                                : 'bg-white/5 border-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {getStatusIcon(phase.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusBadge(phase.status)}`}>
                                {phase.quarter}
                            </span>
                            <h3 className="text-lg font-medium text-white">{phase.title}</h3>
                            {phase.status === 'current' && (
                                <span className="ml-auto text-xs text-white font-mono">IN PROGRESS</span>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 pl-8">
                            {phase.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    {item.done ? (
                                        <CheckCircle size={16} className="text-green-400" />
                                    ) : (
                                        <Circle size={16} className="text-white/20" />
                                    )}
                                    <span className={item.done ? 'text-white/60' : 'text-white/40'}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Feature Request */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                    <MessageCircle size={20} className="text-white" />
                    <h3 className="text-white font-medium">Request a Feature</h3>
                </div>
                <p className="text-white/40 text-sm mb-4">
                    Have an idea for the platform? We prioritize features based on community feedback.
                </p>
                <a
                    href="mailto:features@defrag.app?subject=Feature Request"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold hover:bg-gray-100 transition"
                >
                    Submit Feature Request
                </a>
            </div>
        </div>
    );
}
