
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, ArrowRight } from 'lucide-react';

export default function DeveloperGuides() {
    const guides = [
        {
            icon: <Zap size={20} />,
            title: "Quick Start: Unit Deployment",
            description: "Initialize your first behavioral node in under 5 minutes. Core API basics.",
            time: "05m",
            link: "/docs/getting-started"
        },
        {
            icon: <Shield size={20} />,
            title: "SEDA Safety Gating",
            description: "Implement the clinical firewall. Graceful degradation protocols for AI agents.",
            time: "12m",
            link: "/docs/authentication"
        },
        {
            icon: <Code size={20} />,
            title: "Relational Geometry (ORBIT)",
            description: "Map multi-person systems. Identify friction patterns in complex team structures.",
            time: "18m",
            link: "/docs/api-reference"
        },
        {
            icon: <BookOpen size={20} />,
            title: "NASA JPL Telemetry",
            description: "Leverage topocentric precision for sub-arcsecond spec calculations.",
            time: "10m",
            link: "/docs/sdks"
        }
    ];

    return (
        <div className="space-y-16 animate-fade-in">
            <div className="space-y-4">
                <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Integration Guides</h1>
                <p className="text-lg text-white/40 font-light max-w-xl">Walkthroughs for deploying behavioral architecture across your stack.</p>
            </div>

            <div className="grid gap-6">
                {guides.map((guide, index) => (
                    <Link
                        key={index}
                        to={guide.link}
                        className="group p-8 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.03] hover:border-orange-500/20 transition-all duration-500 flex items-center gap-8"
                    >
                        <div className="w-14 h-14 bg-white/5 text-orange-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-orange-500/10 transition-colors">
                            {guide.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">{guide.time}</span>
                                <div className="h-px w-4 bg-white/10" />
                            </div>
                            <h3 className="text-2xl font-light text-white group-hover:text-orange-400 transition-colors tracking-tight">
                                {guide.title}
                            </h3>
                            <p className="text-white/40 text-sm font-light mt-2 max-w-md">{guide.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-orange-400 group-hover:border-orange-500/20 transition-all">
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-10 rounded-[32px] bg-orange-500/[0.02] border border-orange-500/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h3 className="text-xl font-light text-white">Custom Solutions</h3>
                    <p className="text-white/40 text-sm font-light">Dedicated support for enterprise-grade behavioral systems.</p>
                </div>
                <a href="mailto:info@defrag.app" className="h-12 px-8 bg-white/5 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-[0.2em] rounded-full hover:bg-orange-500/10 transition-all flex items-center justify-center uppercase">
                    Contact Sales
                </a>
            </div>
        </div>
    );
}
