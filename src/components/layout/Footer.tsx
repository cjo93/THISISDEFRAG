import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-[#0F172A] text-white/40 font-sans">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-[10px] tracking-[0.2em] uppercase">
                    © 2024 DEFRAG.APP
                </div>
                <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/developer" className="hover:text-white transition-colors">API</Link>
                </div>
            </div>
        </footer>
    );
}
