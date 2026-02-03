import React from 'react';
import { MessageCircle, Github, Twitter, Mail, Users, ExternalLink } from 'lucide-react';

export default function DeveloperCommunity() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-light text-white mb-2">Community</h1>
                <p className="text-white/50">Connect with developers building human systems clarity.</p>
            </div>

            {/* Community Channels */}
            <div className="grid sm:grid-cols-2 gap-4">
                <a
                    href="https://github.com/cjo93/defrag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group"
                >
                    <Github size={28} className="text-white/60 mb-4" />
                    <h3 className="text-lg font-medium text-white group-hover:text-white transition mb-2">
                        GitHub
                    </h3>
                    <p className="text-white/40 text-sm mb-3">
                        Report issues, request features, and contribute to the codebase.
                    </p>
                    <span className="text-white text-sm flex items-center gap-1">
                        View Repository <ExternalLink size={14} />
                    </span>
                </a>

                <a
                    href="https://twitter.com/defragapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group"
                >
                    <Twitter size={28} className="text-white/60 mb-4" />
                    <h3 className="text-lg font-medium text-white group-hover:text-white transition mb-2">
                        Twitter / X
                    </h3>
                    <p className="text-white/40 text-sm mb-3">
                        Product updates, release announcements, and community highlights.
                    </p>
                    <span className="text-white text-sm flex items-center gap-1">
                        Follow @defragapp <ExternalLink size={14} />
                    </span>
                </a>

                <a
                    href="mailto:dev@defrag.app"
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group"
                >
                    <Mail size={28} className="text-white/60 mb-4" />
                    <h3 className="text-lg font-medium text-white group-hover:text-white transition mb-2">
                        Developer Support
                    </h3>
                    <p className="text-white/40 text-sm mb-3">
                        Direct line to the engineering team for integration help.
                    </p>
                    <span className="text-white text-sm">dev@defrag.app</span>
                </a>

                <div className="p-6 bg-white/5 border border-white/20 rounded-xl">
                    <MessageCircle size={28} className="text-white mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                        Discord Coming Soon
                    </h3>
                    <p className="text-white/40 text-sm mb-3">
                        Real-time community chat launching Q2 2026.
                    </p>
                    <button className="text-white/60 text-sm cursor-not-allowed">
                        Join Waitlist
                    </button>
                </div>
            </div>

            {/* Platform Status */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-white font-medium mb-4">Platform Status</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-2xl font-bold text-green-400">Live</div>
                        <div className="text-white/40 text-sm">API Status</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">v2.0</div>
                        <div className="text-white/40 text-sm">Platform Version</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">2026</div>
                        <div className="text-white/40 text-sm">Launch Year</div>
                    </div>
                </div>
            </div>

            {/* Code of Conduct */}
            <div className="p-5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                    <Users size={20} className="text-white/40" />
                    <h3 className="text-white font-medium">Community Guidelines</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                    We're building tools for understanding human systems. Our community reflects that mission:
                    respectful discourse, psychological safety, and collaborative problem-solving.
                    Be kind, be curious, help others succeed.
                </p>
            </div>
        </div>
    );
}
