
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
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-orange-500 overflow-visible">
                        {/* New Geometric Identity - No Box */}
                        <svg width="32" height="32" viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="2">
                            {/* Outer ring */}
                            <circle cx="50" cy="50" r="45" opacity="0.2" strokeDasharray="4 4" />
                            {/* Inner geometric structure */}
                            <path d="M50 10 L85 85 L15 85 Z" opacity="0.8" />
                            <circle cx="50" cy="50" r="15" fill="currentColor" className="text-orange-500" />
                            <path d="M50 5 L95 95 H5 Z" opacity="0.3" transform="rotate(180 50 50)" />
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
