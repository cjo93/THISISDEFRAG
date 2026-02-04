
'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'ECHO', path: '/products/manuals' },
        { label: 'ORBIT', path: '/relational' },
        { label: 'Developer', path: '/developer' },
        { label: 'About', path: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${scrolled
                ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
                : 'py-10 bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-8 flex items-center justify-between relative">

                {/* Logo — Industrial Monochrome */}
                <Link
                    to="/"
                    className="relative z-10 group flex items-center gap-4 text-2xl font-light text-white tracking-[-0.04em] transition-all hover:opacity-70"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 font-black text-sm group-hover:bg-white group-hover:text-black transition-all duration-700">D</div>
                    <span className="font-bold tracking-[0.4em] text-[11px] hidden sm:inline uppercase opacity-40 group-hover:opacity-100 transition-opacity">DEFRAG</span>
                </Link>

                {/* Desktop Nav — Centered, Spaced, Monochrome */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-12">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-500 ${isActive
                                    ? 'text-white'
                                    : 'text-white/20 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA — Premium Pill */}
                <div className="hidden md:flex items-center gap-8 relative z-10">
                    <Link
                        to="/start"
                        className="h-12 px-10 flex items-center justify-center bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-700 rounded-full hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95"
                    >
                        Initialize
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu — Full Page Monochrome Blur */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[90] flex flex-col p-12 animate-fade-in md:hidden pt-32">
                    <div className="flex flex-col gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className="text-4xl font-light text-white/40 hover:text-white transition-all duration-500 tracking-tighter uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            to="/start"
                            onClick={() => setMobileOpen(false)}
                            className="h-20 mt-12 flex items-center justify-center bg-white text-black text-xs tracking-[0.4em] font-bold uppercase rounded-full shadow-2xl"
                        >
                            Start_Engine
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
