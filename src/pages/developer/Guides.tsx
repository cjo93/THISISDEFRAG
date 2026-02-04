
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Zap, Shield, ArrowRight, ChevronRight } from 'lucide-react';

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
        <div className="space-y-24 animate-fade-in py-12">
            <div className="space-y-6">
                <h1 className="text-5xl font-light text-white tracking-tighter leading-tight">Integration_Walkthroughs</h1>
                <p className="text-xl text-white/30 font-light italic max-w-2xl">Step-by-step protocols for deploying behavioral architecture across high-precision environments.</p>
            </div>

            <div className="grid gap-4">
                {guides.map((guide, index) => (
                    <Link
                        key={index}
                        to={guide.link}
                        className="group p-10 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 flex flex-col sm:flex-row sm:items-center gap-10"
                    >
                        <div className="w-16 h-16 bg-white/5 text-white/40 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-700">
                            {guide.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Protocol_{guide.time}</span>
                                <div className="h-px w-6 bg-white/5" />
                            </div>
                            <h3 className="text-2xl font-light text-white group-hover:text-white/60 transition-colors tracking-tight">
                                {guide.title}
                            </h3>
                            <p className="text-white/20 text-sm font-light mt-3 max-w-md italic">{guide.description}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white/20 transition-all">
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-12 rounded-[48px] bg-zinc-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-12 group transition-all hover:border-white/10">
                <div className="space-y-3">
                    <h3 className="text-2xl font-light text-white tracking-tight">Enterprise Architecture</h3>
                    <p className="text-white/30 text-base font-light italic">Dedicated coordination for large-scale systemic deployments.</p>
                </div>
                <a href="mailto:info@defrag.app" className="h-16 px-12 bg-white text-black text-[10px] font-bold tracking-[0.3em] rounded-full hover:bg-slate-200 transition-all flex items-center justify-center uppercase shadow-xl">
                    Request Manual Setup
                </a>
            </div>
        </div>
    );
}
