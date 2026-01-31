import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* LOGO area */}
                <div className="text-center md:text-left">
                    <Link to="/" className="text-white font-mono font-bold tracking-[0.2em] text-lg hover:text-cyan-400 transition">
                        DEFRAG
                    </Link>
                    <p className="text-white/20 text-xs mt-2 font-mono">
                        Cognitive Infrastructure for Human Systems.
                    </p>
                </div>

                {/* LINKS */}
                <div className="flex gap-8 text-xs font-mono uppercase tracking-widest text-white/40">
                    <Link to="/platform" className="hover:text-white transition">Platform</Link>
                    <Link to="/agents" className="hover:text-white transition">Agents</Link>
                    <Link to="/analysis" className="hover:text-white transition">Login</Link>
                </div>

                {/* COPYRIGHT */}
                <div className="text-white/10 text-[10px] font-mono">
                    © {new Date().getFullYear()} THISISDEFRAG.
                </div>

            </div>
        </footer>
    );
}
