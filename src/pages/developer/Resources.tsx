
import React from 'react';
import { Download, FileJson, Palette, Package, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DeveloperResources() {
    const resources = [
        {
            icon: <Package size={20} />,
            title: "JS/TS SDK",
            description: "Official SDK for Node, React, and browser environments.",
            action: "npm install @defrag/sdk",
            type: "npm"
        },
        {
            icon: <Package size={20} />,
            title: "Python SDK",
            description: "High-performance library for backend integrations.",
            action: "pip install defrag-sdk",
            type: "pip"
        },
        {
            icon: <FileJson size={20} />,
            title: "Postman Collection",
            description: "Pre-configured API requests for rapid testing.",
            action: "Download v2.0",
            type: "download"
        },
        {
            icon: <FileJson size={20} />,
            title: "OpenAPI Spec",
            description: "Complete API schema for cross-language generation.",
            action: "View Schema",
            type: "link"
        }
    ];

    return (
        <div className="space-y-16 animate-fade-in">
            <div className="space-y-4">
                <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Assets & SDKs</h1>
                <p className="text-lg text-white/40 font-light max-w-xl">Everything you need to integrate DEFRAG behavioral intelligence into your stack.</p>
            </div>

            {/* SDK & Tools */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-xs font-mono tracking-[0.4em] text-white/20 uppercase">Distribution</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid gap-4">
                    {resources.map((resource, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.02] transition-all duration-500 flex flex-col sm:flex-row sm:items-center gap-6"
                        >
                            <div className="w-12 h-12 bg-white/5 text-white/40 rounded-2xl flex items-center justify-center shrink-0">
                                {resource.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-light text-white mb-2 tracking-tight">{resource.title}</h3>
                                <p className="text-white/40 text-sm font-light max-w-md">{resource.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <code className="px-5 py-3 bg-black border border-white/10 text-orange-400 text-xs rounded-2xl font-mono shadow-inner">
                                    {resource.action}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Assets */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-xs font-mono tracking-[0.4em] text-white/20 uppercase">Aesthetics</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.02] transition-all group">
                        <Palette size={20} className="text-white/20 mb-6 group-hover:text-orange-500 transition-colors" />
                        <h3 className="text-xl font-light text-white mb-3">System Toolkit</h3>
                        <p className="text-white/40 text-sm font-light mb-6">High-resolution SVG and PNG markers in all system variations.</p>
                        <button className="h-10 px-6 bg-white/5 text-white/50 text-[10px] font-bold tracking-widest rounded-full hover:bg-white/10 hover:text-white transition-all uppercase flex items-center gap-3">
                            <Download size={14} /> Download Assets
                        </button>
                    </div>

                    <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.02] transition-all group">
                        <Palette size={20} className="text-white/20 mb-6 group-hover:text-orange-500 transition-colors" />
                        <h3 className="text-xl font-light text-white mb-3">Color Taxonomy</h3>
                        <p className="text-white/40 text-sm font-light mb-6">System-defined HSL palettes, glassmorphism tokens, and gradients.</p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20" />
                            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10" />
                            <div className="w-8 h-8 rounded-xl bg-white shadow-lg shadow-white/10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* API Status — Refined */}
            <div className="p-8 bg-green-500/[0.02] border border-green-500/10 rounded-[32px] flex flex-col md:flex-row md:items-center gap-8 group">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-light text-white mb-1">System Topology: Optimal</h3>
                    <p className="text-white/40 text-sm font-light uppercase tracking-widest text-[10px]">99.9% Uptime across all regional clusters</p>
                </div>
                <a href="https://status.defrag.app" target="_blank" rel="noopener noreferrer" className="h-10 px-6 bg-green-500/10 text-green-400 text-[10px] font-bold tracking-widest rounded-full hover:bg-green-500/20 transition-all uppercase flex items-center gap-3">
                    Verify Status <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
