
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-24 px-6 border-t border-white/5 bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">

                    {/* Brand Section */}
                    <div className="max-w-xs space-y-6">
                        <Link to="/" className="inline-flex items-center gap-2 group">
                            <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-black font-black text-[10px]">D</div>
                            <span className="text-white font-bold tracking-[0.3em] text-xs uppercase group-hover:text-orange-400 transition-colors">DEFRAG</span>
                        </Link>
                        <p className="text-white/20 text-sm font-light leading-relaxed italic pr-8">
                            Deterministic cognitive infrastructure for high-precision human systems. No astrology. No psychology. Just mechanics.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-24">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link to="/platform" className="text-sm font-light text-white/40 hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/agents" className="text-sm font-light text-white/40 hover:text-white transition-colors">Agents</Link></li>
                                <li><Link to="/relational" className="text-sm font-light text-white/40 hover:text-white transition-colors">ORBIT</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link to="/developer" className="text-sm font-light text-white/40 hover:text-white transition-colors">Developer Portal</Link></li>
                                <li><Link to="/docs" className="text-sm font-light text-white/40 hover:text-white transition-colors">Documentation</Link></li>
                                <li><Link to="/learn" className="text-sm font-light text-white/40 hover:text-white transition-colors">Knowledge Base</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Connect</h4>
                            <div className="flex gap-4">
                                <a href="https://github.com/cjo93/defrag" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"><Github size={14} /></a>
                                <a href="https://twitter.com/defragapp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"><Twitter size={14} /></a>
                                <a href="mailto:info@defrag.app" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"><Mail size={14} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white/10 text-[9px] font-mono tracking-widest uppercase italic">
                        © {new Date().getFullYear()} THISISDEFRAG. ALL SYSTEM CODES RESERVED.
                    </div>
                    <div className="flex gap-8 text-[9px] font-mono tracking-widest text-white/20 uppercase">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy_Protocol</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Service_Terms</Link>
                    </div>
                </div>
            </div>

            {/* Subtle bottom detail */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
        </footer>
    );
}
