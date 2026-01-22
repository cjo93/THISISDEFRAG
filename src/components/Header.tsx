
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
                <Link to={targetLink} className="flex items-center gap-2 group">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-orange-500 overflow-visible transition-transform duration-700 ease-in-out group-hover:rotate-90">
                        {/* True Mandala Identity */}
                        <svg width="40" height="40" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {/* Center */}
                            <circle cx="50" cy="50" r="4" fill="currentColor" />
                            {/* Inner Petals */}
                            <path d="M50 25 Q55 35 65 40 Q55 50 50 65 Q45 50 35 40 Q45 35 50 25 Z" />
                            <path d="M75 50 Q65 55 60 65 Q50 55 35 50 Q50 45 60 35 Q65 45 75 50 Z" transform="rotate(45 50 50)" />
                            {/* Middle Ring */}
                            <circle cx="50" cy="50" r="28" strokeOpacity="0.5" strokeDasharray="2 2" />
                            {/* Outer Petals / Rays */}
                            <path d="M50 10 L50 20 M50 80 L50 90 M90 50 L80 50 M20 50 L10 50" strokeOpacity="0.8" />
                            <path d="M78 22 L71 29 M29 71 L22 78 M78 78 L71 71 M29 29 L22 22" strokeOpacity="0.8" />
                            {/* Outer Circle */}
                            <circle cx="50" cy="50" r="42" strokeOpacity="0.3" />
                        </svg>
                    </div>
                    <span className="tracking-[0.2em] sm:tracking-[0.25em] text-sm font-medium text-white/90 group-hover:text-white transition-colors">DEFRAG</span>
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
