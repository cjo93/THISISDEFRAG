
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
    const location = useLocation();
    const [targetLink, setTargetLink] = useState('/');

    useEffect(() => {
        // Check for login state
        const isOwner = localStorage.getItem('defrag_owner_bypass');
        const isVerified = localStorage.getItem('defrag_payment_verified');

        if (isOwner) {
            setTargetLink('/admin');
        } else if (isVerified) {
            setTargetLink('/manual');
        } else {
            setTargetLink('/');
        }
    }, [location]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-black/90 border-b border-white/5 safe-top supports-[backdrop-filter]:bg-black/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                <Link to={targetLink} className="flex items-center gap-2 sm:gap-3 group">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden relative">
                        <div className="absolute inset-0 bg-orange-500" />
                        {/* Simple Mandala (Petal) SVG */}
                        <svg width="24" height="24" viewBox="0 0 100 100" className="relative w-5 h-5 sm:w-6 sm:h-6 text-black animate-[spin_10s_linear_infinite]">
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(0 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(45 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(90 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(135 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(180 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(225 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(270 50 50)" fill="currentColor" opacity="0.8" />
                            <path d="M50 50 L50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z" transform="rotate(315 50 50)" fill="currentColor" opacity="0.8" />
                            <circle cx="50" cy="50" r="10" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="tracking-[0.2em] sm:tracking-[0.25em] text-sm font-medium text-white/90">DEFRAG</span>
                </Link>
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        to="/signin"
                        className="text-xs tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                    >
                        MEMBER LOGIN
                    </Link>
                    <Link
                        to="/start"
                        className="h-9 sm:h-10 px-4 sm:px-5 flex items-center justify-center bg-white text-black text-xs tracking-[0.15em] font-semibold hover:bg-orange-500 hover:text-white transition rounded-lg"
                    >
                        CREATE MANUAL
                    </Link>
                </div>
            </div>
        </nav>
    );
}
