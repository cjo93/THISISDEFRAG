
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
                        {/* Intricate Mandala Logo */}
                        <svg width="44" height="44" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor">
                            {/* Rotating outer petals (8-fold symmetry) */}
                            <g className="origin-center animate-[rotate-slow_30s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(45 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(90 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(135 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(180 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(225 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(270 50 50)" />
                                <path d="M50 10 Q55 20 50 30 Q45 20 50 10" stroke="#f97316" strokeWidth="0.6" fill="none" transform="rotate(315 50 50)" />
                            </g>

                            {/* Concentric circles */}
                            <circle cx="50" cy="50" r="42" strokeWidth="0.8" className="animate-[pulse-ring_4s_ease-in-out_infinite]" style={{ opacity: 0.8 }} />
                            <circle cx="50" cy="50" r="35" strokeWidth="0.8" opacity="0.7" />
                            <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
                            <circle cx="50" cy="50" r="21" strokeWidth="0.8" opacity="0.5" />

                            {/* Star pattern (12-fold) */}
                            <g strokeWidth="0.5" opacity="0.4">
                                <line x1="50" y1="15" x2="50" y2="85" />
                                <line x1="15" y1="50" x2="85" y2="50" />
                                <line x1="23" y1="23" x2="77" y2="77" />
                                <line x1="77" y1="23" x2="23" y2="77" />
                                <line x1="35" y1="15" x2="65" y2="85" />
                                <line x1="65" y1="15" x2="35" y2="85" />
                                <line x1="15" y1="35" x2="85" y2="65" />
                                <line x1="85" y1="35" x2="15" y2="65" />
                            </g>

                            {/* Inner lotus petals (8-fold) */}
                            <g strokeWidth="1" opacity="0.6">
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(45 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(90 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(135 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(180 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(225 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(270 50 50)" />
                                <path d="M50 30 L55 40 L50 45 L45 40 Z" transform="rotate(315 50 50)" />
                            </g>

                            {/* Sacred geometry hexagon */}
                            <path d="M50 35 L60 42.5 L60 57.5 L50 65 L40 57.5 L40 42.5 Z" strokeWidth="0.8" opacity="0.7" />

                            {/* Center core with pulsing */}
                            <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-[pulse-ring_4s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
                            <circle cx="50" cy="50" r="12" strokeWidth="0.8" className="animate-[pulse-ring_4s_ease-in-out_infinite]" style={{ animationDelay: '1s', opacity: 0.8 }} />

                            {/* Center dot */}
                            <circle cx="50" cy="50" r="3" fill="currentColor" />
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
