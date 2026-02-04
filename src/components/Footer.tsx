
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Terminal } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-32 px-8 border-t border-white/5 bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">

                    {/* Brand Section */}
                    <div className="max-w-sm space-y-10">
                        <Link to="/" className="inline-flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 font-black text-xs uppercase group-hover:bg-white group-hover:text-black transition-all duration-700">D</div>
                            <span className="text-white font-bold tracking-[0.6em] text-[11px] uppercase opacity-40 group-hover:opacity-100 transition-all">DEFRAG</span>
                        </Link>
                        <p className="text-white/20 text-base font-light leading-relaxed italic pr-12">
                            Deterministic cognitive infrastructure for high-precision human systems. No astrology. No psychology. Just mechanical architecture.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16 sm:gap-24">
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-mono tracking-[0.6em] text-white/10 uppercase italic">Platform</h4>
                            <ul className="space-y-6">
                                <li><Link to="/api" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">Protocol</Link></li>
                                <li><Link to="/agents" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">Agents</Link></li>
                                <li><Link to="/relational" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">Orbit</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-mono tracking-[0.6em] text-white/10 uppercase italic">Resources</h4>
                            <ul className="space-y-6">
                                <li><Link to="/developer" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">Dev_Portal</Link></li>
                                <li><Link to="/docs" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">Documentation</Link></li>
                                <li><Link to="/about" className="text-sm font-light text-white/30 hover:text-white transition-all uppercase tracking-widest">About</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-mono tracking-[0.6em] text-white/10 uppercase italic">Network</h4>
                            <div className="flex gap-6">
                                <a href="https://github.com/cjo93/defrag" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-700"><Github size={16} strokeWidth={1} /></a>
                                <a href="https://twitter.com/defragapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-700"><Twitter size={16} strokeWidth={1} /></a>
                                <a href="mailto:info@defrag.app" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-700"><Mail size={16} strokeWidth={1} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-white/10 text-[9px] font-mono tracking-[0.5em] uppercase italic">
                        © {new Date().getFullYear()} THISISDEFRAG_OPERATING_SYSTEM_v2.
                    </div>
                    <div className="flex gap-12 text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase">
                        <Link to="/privacy" className="hover:text-white transition-all">Privacy_Protocol</Link>
                        <Link to="/terms" className="hover:text-white transition-all">Service_Terms</Link>
                    </div>
                </div>
            </div>

            {/* Subtle bottom detail */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        </footer>
    );
}
