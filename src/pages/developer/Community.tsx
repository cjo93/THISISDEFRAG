
import React from 'react';
import { Github, Twitter, Mail, Users, ExternalLink, MessageSquare } from 'lucide-react';

export default function DeveloperCommunity() {
    return (
        <div className="space-y-16 animate-fade-in">
            <div className="space-y-4">
                <h1 className="text-4xl font-light text-white tracking-tight leading-tight">Ecosystem</h1>
                <p className="text-lg text-white/40 font-light max-w-xl">Connect with the minds architecting better human systems.</p>
            </div>

            {/* Channels */}
            <div className="grid sm:grid-cols-2 gap-6">
                <a
                    href="https://github.com/cjo93/defrag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-10 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.03] transition-all duration-500 group relative overflow-hidden"
                >
                    <Github size={32} className="text-white/20 mb-8 group-hover:text-white transition-colors" />
                    <h3 className="text-2xl font-light text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">GitHub</h3>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-6">Contribute to the core engine, report issues, or propose new modules.</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-orange-400 uppercase">
                        View Repository <ExternalLink size={12} />
                    </div>
                </a>

                <a
                    href="https://twitter.com/defragapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-10 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.03] transition-all duration-500 group relative overflow-hidden"
                >
                    <Twitter size={32} className="text-white/20 mb-8 group-hover:text-[#1DA1F2] transition-colors" />
                    <h3 className="text-2xl font-light text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">Network</h3>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-6">Real-time updates, release telemetry, and community demonstrations.</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-orange-400 uppercase">
                        Follow @defragapp <ExternalLink size={12} />
                    </div>
                </a>

                <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[32px] hover:bg-white/[0.03] transition-all duration-500 group relative overflow-hidden">
                    <Mail size={32} className="text-white/20 mb-8 group-hover:text-orange-500 transition-colors" />
                    <h3 className="text-2xl font-light text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">Direct Support</h3>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-6">A direct line to the engineering team for architectural consultation.</p>
                    <div className="text-[10px] font-mono tracking-widest text-orange-400 uppercase">dev@defrag.app</div>
                </div>

                <div className="p-10 bg-orange-500/[0.02] border border-orange-500/10 rounded-[32px] flex flex-col justify-between group">
                    <div>
                        <MessageSquare size={32} className="text-orange-500/50 mb-8" />
                        <h3 className="text-2xl font-light text-white mb-2 tracking-tight">Discord Alpha</h3>
                        <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-widest text-[10px]">Launching Q2 2026</p>
                    </div>
                    <button className="h-10 px-6 bg-white/5 text-orange-400/50 border border-orange-500/10 text-[10px] font-bold tracking-widest rounded-full cursor-not-allowed uppercase mt-8">
                        Waitlist Active
                    </button>
                </div>
            </div>

            {/* Platform Stats */}
            <div className="p-10 rounded-[40px] bg-zinc-950 border border-white/5 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                    <div className="space-y-4">
                        <div className="text-3xl font-light text-green-500">OPTIMAL</div>
                        <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">API STATUS</div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-3xl font-light text-orange-500">v2.4.2</div>
                        <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">STABLE VERSION</div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-3xl font-light text-white">2026</div>
                        <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">LAUNCH CYCLE</div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            {/* Code of Conduct */}
            <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[32px] max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <Users size={20} className="text-orange-500/50" />
                    <h2 className="text-xl font-light text-white tracking-tight">Guidelines for System Discourse</h2>
                </div>
                <p className="text-white/40 text-lg font-light leading-relaxed italic">
                    "We are building tools for high-precision human interaction. Our community reflects this: respectful discourse, psychological safety, and collaborative architecture. Be kind, be curious, protect the nodes."
                </p>
            </div>
        </div>
    );
}
