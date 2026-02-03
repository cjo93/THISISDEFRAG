import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-[100] bg-[rgba(10,10,10,0.98)] backdrop-blur-xl border-b border-white/[0.08] py-4">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-white no-underline tracking-tight transition-colors duration-200 hover:text-orange-500"
                >
                    DEFRAG
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    {[
                        { label: 'Platform', path: '/platform' },
                        { label: 'Agents', path: '/agents' },
                        { label: 'Developer', path: '/developer' },
                        { label: 'Docs', path: '/docs' },
                        { label: 'About', path: '/about' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="text-sm font-medium text-slate-400 no-underline uppercase tracking-wider transition-colors duration-200 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden bg-transparent border-0 text-white cursor-pointer p-0"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* CTA */}
                <Link
                    to="/developer"
                    className="hidden md:inline-block px-6 py-3 bg-orange-500 text-black font-semibold text-sm uppercase tracking-wider rounded-xl no-underline transition-all duration-200 shadow-md hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] whitespace-nowrap"
                >
                    Get Started
                </Link>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <nav className="bg-[rgba(26,31,58,0.95)] border-t border-white/[0.08] p-6 flex flex-col gap-4">
                    {[
                        { label: 'Platform', path: '/platform' },
                        { label: 'Agents', path: '/agents' },
                        { label: 'Developer', path: '/developer' },
                        { label: 'Docs', path: '/docs' },
                        { label: 'About', path: '/about' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className="text-slate-200 text-base no-underline uppercase tracking-wider"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
