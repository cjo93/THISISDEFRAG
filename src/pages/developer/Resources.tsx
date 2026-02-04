
import React from 'react';
import { Download, FileJson, Palette, Package, ExternalLink, ShieldCheck, Terminal, Disc } from 'lucide-react';

export default function DeveloperResources() {
    const resources = [
        {
            icon: <Terminal size={20} strokeWidth={1.5} />,
            title: "JS/TS SDK",
            description: "Official SDK for Node, React, and browser environments.",
            action: "npm install @defrag/sdk",
            type: "npm"
        },
        {
            icon: <Terminal size={20} strokeWidth={1.5} />,
            title: "Python SDK",
            description: "High-performance library for backend integrations.",
            action: "pip install defrag-sdk",
            type: "pip"
        },
        {
            icon: <FileJson size={20} strokeWidth={1.5} />,
            title: "Postman Collection",
            description: "Pre-configured API requests for rapid testing.",
            action: "Download_v2.0",
            type: "download"
        },
        {
            icon: <FileJson size={20} strokeWidth={1.5} />,
            title: "OpenAPI Spec",
            description: "Complete API schema for cross-language generation.",
            action: "View_Schema",
            type: "link"
        }
    ];

    return (
        <div className="space-y-24 animate-fade-in py-12">
            <div className="space-y-6">
                <h1 className="text-5xl font-light text-white tracking-tighter leading-tight">Assets_&_Protocols</h1>
                <p className="text-xl text-white/30 font-light italic max-w-2xl">Distribution channels and architectural assets for DEFRAG integration.</p>
            </div>

            {/* SDK & Tools */}
            <div className="space-y-12">
                <div className="flex items-center gap-6">
                    <h2 className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">Distribution</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid gap-4">
                    {resources.map((resource, index) => (
                        <div
                            key={index}
                            className="p-10 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 flex flex-col sm:flex-row sm:items-center gap-10"
                        >
                            <div className="w-16 h-16 bg-white/5 text-white/30 rounded-3xl flex items-center justify-center shrink-0">
                                {resource.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-light text-white mb-2 tracking-tight uppercase">{resource.title}</h3>
                                <p className="text-white/30 text-base font-light italic max-w-md">{resource.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <code className="px-8 py-4 bg-zinc-950 border border-white/10 text-white text-[11px] rounded-full font-mono shadow-2xl">
                                    {resource.action}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Assets — Monochrome Shift */}
            <div className="space-y-12">
                <div className="flex items-center gap-6">
                    <h2 className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">Aesthetics</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] transition-all duration-700 group">
                        <Palette size={24} strokeWidth={1.5} className="text-white/20 mb-8 group-hover:text-white transition-colors" />
                        <h3 className="text-2xl font-light text-white mb-4 tracking-tight uppercase">System Toolkit</h3>
                        <p className="text-white/30 text-base font-light mb-10 italic">High-resolution SVG and PNG markers in all system variations. Standardized for light and dark environments.</p>
                        <button className="h-14 px-10 bg-white text-black text-[10px] font-bold tracking-[0.3em] rounded-full hover:bg-slate-200 transition-all uppercase flex items-center gap-4">
                            <Download size={14} /> Download Assets
                        </button>
                    </div>

                    <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] transition-all duration-700 group">
                        <Disc size={24} strokeWidth={1.5} className="text-white/20 mb-8 group-hover:text-white transition-colors" />
                        <h3 className="text-2xl font-light text-white mb-4 tracking-tight uppercase">Visual Taxonomy</h3>
                        <p className="text-white/30 text-base font-light mb-10 italic">Monochrome design tokens, glassmorphism coordinates, and typographic standards for DEFRAG-compliant interfaces.</p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-white shadow-xl shadow-white/5" />
                            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/5" />
                            <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/5 shadow-inner" />
                        </div>
                    </div>
                </div>
            </div>

            {/* API Status — Monochrome Refinement */}
            <div className="p-12 bg-white/[0.02] border border-white/10 rounded-[48px] flex flex-col md:flex-row md:items-center gap-10 group overflow-hidden relative">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all duration-700 relative z-10">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-light text-white mb-2 tracking-tight">System Topology: Optimal</h3>
                    <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.5em]">99.9% Uptime confirmed across all active clusters</p>
                </div>
                <a href="https://status.defrag.app" target="_blank" rel="noopener noreferrer" className="h-14 px-10 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all duration-700 uppercase flex items-center gap-4 relative z-10">
                    Verify Node <ExternalLink size={14} />
                </a>
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
