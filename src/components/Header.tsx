
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
                        {/* Animated Concentric Rings Logo - matches favicon */}
                        <svg width="44" height="44" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor">
                            {/* Animated rotating rings */}
                            <g className="origin-center animate-[rotate-slow_20s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
                                <circle cx="50" cy="50" r="45" strokeWidth="0.5" opacity="0.6" />
                                <circle cx="50" cy="50" r="35" strokeWidth="0.5" opacity="0.5" />
                                <circle cx="50" cy="50" r="25" strokeWidth="0.5" opacity="0.4" />
                                <circle cx="50" cy="50" r="15" strokeWidth="0.5" opacity="0.3" />
                            </g>

                            {/* Pulsing outer ring */}
                            <circle
                                cx="50" cy="50" r="42"
                                strokeWidth="1"
                                className="animate-[pulse-ring_3s_ease-in-out_infinite]"
                                style={{ opacity: 0.8 }}
                            />

                            {/* Geometric connector lines */}
                            <g opacity="0.3" strokeWidth="0.5">
                                <line x1="50" y1="10" x2="50" y2="90" />
                                <line x1="10" y1="50" x2="90" y2="50" />
                                <line x1="20" y1="20" x2="80" y2="80" />
                                <line x1="80" y1="20" x2="20" y2="80" />
                            </g>

                            {/* Inner hexagon */}
                            <path d="M50 30 L65 40 L65 60 L50 70 L35 60 L35 40 Z" strokeWidth="1" opacity="0.8" />

                            {/* Center core */}
                            <circle cx="50" cy="50" r="6" fill="currentColor" />
                            <circle
                                cx="50" cy="50" r="10"
                                strokeWidth="1"
                                className="animate-[pulse-ring_3s_ease-in-out_infinite]"
                                style={{ animationDelay: '1s', opacity: 0.8 }}
                            />
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
