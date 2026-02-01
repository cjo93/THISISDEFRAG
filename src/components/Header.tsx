'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(10, 10, 10, 0.98)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: 'var(--space-4) 0',
            }}
        >
            <div
                style={{
                    maxWidth: '80rem',
                    margin: '0 auto',
                    padding: '0 var(--space-6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-8)',
                }}
            >
                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--color-white)',
                        textDecoration: 'none',
                        letterSpacing: '-0.05em',
                        transition: 'color var(--transition-base)',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                >
                    DEFRAG
                </Link>

                {/* Desktop Nav */}
                <nav
                    className="desktop-nav"
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'var(--space-8)',
                    }}
                >
                    {[
                        { label: 'Platform', path: '/platform' },
                        { label: 'Agents', path: '/agents' },
                        { label: 'Developer', path: '/developer' },
                        { label: 'Docs', path: '/docs' },
                        { label: 'About', path: '/contact' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'var(--color-slate-400)',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'color var(--transition-base)',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-slate-400)')}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-white)',
                        cursor: 'pointer',
                        padding: 0,
                    }}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* CTA */}
                <Link
                    to="/developer"
                    className="desktop-cta"
                    style={{
                        padding: 'var(--space-3) var(--space-6)',
                        background: 'var(--color-orange)',
                        color: 'var(--color-black)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        border: 'none',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'all var(--transition-base)',
                        boxShadow: 'var(--shadow-md)',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-orange-dark)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow-orange)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-orange)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                >
                    Get Started
                </Link>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <nav
                    style={{
                        background: 'rgba(26, 31, 58, 0.95)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: 'var(--space-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-4)',
                    }}
                >
                    {[
                        { label: 'Platform', path: '/platform' },
                        { label: 'Agents', path: '/agents' },
                        { label: 'Developer', path: '/developer' },
                        { label: 'Docs', path: '/docs' },
                        { label: 'About', path: '/contact' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                color: 'var(--color-slate-200)',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}

            {/* Responsive Styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </header>
    );
}
