
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
    <Link
        to={to}
        className={`text-[10px] tracking-[0.3em] font-mono uppercase transition-all duration-300 ${active ? 'text-orange-500' : 'text-white/40 hover:text-white'
            }`}
    >
        {label}
    </Link>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="relative w-10 h-10 flex items-center justify-center text-orange-500">
                        <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" className="opacity-20" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
                            <circle cx="50" cy="50" r="8" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="text-xl font-light tracking-[0.4em] uppercase group-hover:tracking-[0.5em] transition-all duration-500">
                        DEFRAG
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12">
                    <NavLink to="/products/manuals" label="Manuals" active={location.pathname === '/products/manuals'} />
                    <NavLink to="/dashboard" label="Dashboard" active={location.pathname.startsWith('/dashboard')} />
                    <NavLink to="/developer" label="Developer" active={location.pathname.startsWith('/developer')} />
                    <NavLink to="/docs" label="Docs" active={location.pathname.startsWith('/docs')} />
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-6">
                    <Link to="/signin" className="hidden sm:block text-[10px] tracking-[0.3em] font-mono uppercase text-white/40 hover:text-white transition-all">
                        Sign In
                    </Link>
                    <Link
                        to="/start"
                        className="px-6 py-2 bg-orange-500 text-black text-[10px] tracking-[0.3em] font-bold uppercase rounded-lg hover:bg-white transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
