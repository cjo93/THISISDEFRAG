
import React from 'react';
import { Github, Twitter, Mail, Users, ExternalLink, MessageSquare, Terminal, Globe } from 'lucide-react';

export default function DeveloperCommunity() {
    return (
        <div className="space-y-24 animate-fade-in py-12">
            <div className="space-y-6">
                <h1 className="text-5xl font-light text-white tracking-tighter leading-tight">Ecosystem_&_Network</h1>
                <p className="text-xl text-white/30 font-light italic max-w-2xl">Connect with the minds architecting deterministic human systems.</p>
            </div>

            {/* Channels — Monochrome Cards */}
            <div className="grid sm:grid-cols-2 gap-8">
                <a
                    href="https://github.com/cjo93/defrag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 group relative overflow-hidden"
                >
                    <Github size={32} strokeWidth={1} className="text-white/20 mb-10 group-hover:text-white transition-all duration-700" />
                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight uppercase">GitHub</h3>
                    <p className="text-white/30 text-base font-light leading-relaxed mb-10 italic">Contribute to the core behavioral engine, report system issues, or propose architectural updates.</p>
                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] text-white/40 group-hover:text-white transition-colors uppercase">
                        View_Repository <ExternalLink size={12} />
                    </div>
                </a>

                <a
                    href="https://twitter.com/defragapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 group relative overflow-hidden"
                >
                    <Twitter size={32} strokeWidth={1} className="text-white/20 mb-10 group-hover:text-white transition-all duration-700" />
                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight uppercase">Network</h3>
                    <p className="text-white/30 text-base font-light leading-relaxed mb-10 italic">Real-time system updates, architectural release telemetry, and platform-wide demonstrations.</p>
                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] text-white/40 group-hover:text-white transition-colors uppercase">
                        Follow_Protocol <ExternalLink size={12} />
                    </div>
                </a>

                <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden">
                    <Mail size={32} strokeWidth={1} className="text-white/20 mb-10 group-hover:text-white transition-all duration-700" />
                    <h3 className="text-3xl font-light text-white mb-4 tracking-tight uppercase">Direct Line</h3>
                    <p className="text-white/30 text-base font-light leading-relaxed mb-10 italic">A direct communication node for architectural consultation and enterprise integration support.</p>
                    <div className="text-[10px] font-mono tracking-[0.4em] text-white/40 group-hover:text-white transition-colors uppercase">info@defrag.app</div>
                </div>

                <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[48px] flex flex-col justify-between group relative overflow-hidden">
                    <div className="relative z-10">
                        <MessageSquare size={32} strokeWidth={1} className="text-white/10 mb-10 group-hover:text-white/30 transition-all duration-700" />
                        <h3 className="text-3xl font-light text-white mb-4 tracking-tight uppercase">Discord Alpha</h3>
                        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.5em] mb-4">Launching_Q2_2026</p>
                    </div>
                    <button className="h-16 px-10 bg-white/5 text-white/20 border border-white/5 text-[10px] font-bold tracking-[0.4em] rounded-full cursor-not-allowed uppercase mt-auto relative z-10">
                        Access_Pending
                    </button>
                    <div className="absolute top-0 right-0 p-8">
                        <Globe size={40} className="text-white/[0.02]" />
                    </div>
                </div>
            </div>

            {/* Platform Stats — High Contrast Monochrome */}
            <div className="p-16 rounded-[64px] bg-zinc-950 border border-white/5 group transition-all hover:border-white/10 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
                    <div className="space-y-6">
                        <div className="text-4xl font-light text-white tracking-tighter">OPTIMAL</div>
                        <div className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase">STATUS</div>
                    </div>
                    <div className="space-y-6">
                        <div className="text-4xl font-light text-white tracking-tighter italic">v2.4.2</div>
                        <div className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase">BUILD</div>
                    </div>
                    <div className="space-y-6">
                        <div className="text-4xl font-light text-white tracking-tighter">2026_01</div>
                        <div className="text-[10px] font-mono tracking-[0.6em] text-white/20 uppercase">NODE</div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
            </div>

            {/* Code of Conduct — Monochrome Style */}
            <div className="p-16 bg-white/[0.01] border border-white/5 rounded-[48px] max-w-4xl relative group hover:border-white/20 transition-all duration-700">
                <div className="flex items-center gap-6 mb-12">
                    <Terminal size={24} strokeWidth={1} className="text-white/20 group-hover:text-white transition-colors" />
                    <h2 className="text-2xl font-light text-white tracking-tight uppercase">System_Discourse_Guidelines</h2>
                </div>
                <p className="text-white/30 text-2xl font-light leading-relaxed italic pr-12">
                    "We are building tools for high-precision human interaction. Our network reflects this: respectful discourse, psychological safety, and collaborative architecture. Be kind, be curious, protect the nodes."
                </p>
                <div className="absolute top-0 right-0 p-12">
                    <Users size={60} className="text-white/[0.01]" />
                </div>
            </div>
        </div>
    );
}
