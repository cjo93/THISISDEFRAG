
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
            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
                <Link to={targetLink} className="flex items-center gap-3 group">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-orange-500 overflow-visible">
                        {/* Ultra-Clean Geometric Mandala Logo */}
                        <svg width="44" height="44" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor">
                            {/* Rotating Satellite Circles (8-fold) */}
                            <g className="origin-center animate-[rotate-slow_60s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(45 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(90 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(135 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(180 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(225 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(270 50 50)" />
                                <circle cx="50" cy="15" r="2.5" strokeWidth="1.5" transform="rotate(315 50 50)" />
                            </g>

                            {/* Clean Concentric Rings */}
                            <circle cx="50" cy="50" r="40" strokeWidth="1" className="animate-[pulse-ring_4s_ease-in-out_infinite]" style={{ opacity: 0.8 }} />
                            <circle cx="50" cy="50" r="30" strokeWidth="1" opacity="0.6" />
                            <circle cx="50" cy="50" r="22" strokeWidth="1" opacity="0.4" />

                            {/* Solid Core */}
                            <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-[pulse-ring_4s_ease-in-out_infinite]" />
                            <circle cx="50" cy="50" r="12" strokeWidth="1.5" style={{ opacity: 0.8 }} />
                        </svg>
                    </div>
                    <span className="tracking-[0.3em] text-sm font-bold text-white group-hover:text-orange-500 transition-colors uppercase">Defrag</span>
                </Link>

                <div className="flex items-center gap-4 sm:gap-8">
                    {location.pathname !== '/signin' && (
                        <Link
                            to="/signin"
                            className="text-[10px] sm:text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase font-medium"
                        >
                            Log In
                        </Link>
                    )}

                    {location.pathname !== '/start' && (
                        <Link
                            to="/start"
                            className="h-9 sm:h-10 px-4 sm:px-6 flex items-center justify-center bg-white text-black text-[10px] sm:text-xs tracking-[0.2em] font-bold hover:bg-orange-500 hover:text-white transition-all rounded-lg uppercase shadow-lg shadow-white/5"
                        >
                            Start Now
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
