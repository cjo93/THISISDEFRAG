
'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

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
        { label: 'Platform', path: '/platform' },
        { label: 'Echo', path: '/echo' },
        { label: 'Orbit', path: '/relational' },
        { label: 'Developer', path: '/developer' },
        { label: 'About', path: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                    : 'py-8 bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-12">

                {/* Logo — Premium Font-Weight */}
                <Link
                    to="/"
                    className="group flex items-center gap-3 text-2xl font-light text-white tracking-[-0.04em] transition-all hover:opacity-80"
                >
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black font-black text-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">D</div>
                    <span className="font-bold tracking-[0.2em] text-sm hidden sm:inline">DEFRAG</span>
                </Link>

                {/* Desktop Nav — Centered & Spaced */}
                <nav className="hidden md:flex flex-1 justify-center gap-10">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${isActive
                                        ? 'text-orange-500'
                                        : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA — Pill Shape */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        to="/start"
                        className="h-10 px-6 flex items-center justify-center bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 rounded-full hover:bg-orange-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        Initialize
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu — Full Page Blur */}
            {mobileOpen && (
                <div className="fixed inset-0 top-[header-height] bg-black/95 backdrop-blur-2xl z-[90] flex flex-col p-12 animate-fade-in md:hidden pt-24">
                    <div className="flex flex-col gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className="text-3xl font-light text-white hover:text-orange-500 transition-colors tracking-tight"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            to="/start"
                            onClick={() => setMobileOpen(false)}
                            className="h-16 mt-8 flex items-center justify-center bg-orange-500 text-black text-sm tracking-[0.2em] font-bold uppercase rounded-full"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
