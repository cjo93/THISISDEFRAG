
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
                    <div className="relative w-10 h-10 flex items-center justify-center text-orange-500 overflow-visible transition-all duration-[3000ms] ease-in-out group-hover:rotate-[360deg] group-hover:scale-110">
                        {/* Geometric Sacred Geometry Mandala */}
                        <svg width="44" height="44" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor" strokeWidth="1">
                            <circle cx="50" cy="50" r="40" strokeOpacity="0.1" />
                            <circle cx="50" cy="50" r="2" fill="currentColor" />

                            {/* Interlocking Geometric Circles */}
                            {[0, 60, 120, 180, 240, 300].map((deg) => (
                                <circle
                                    key={deg}
                                    cx={50 + 20 * Math.cos((deg * Math.PI) / 180)}
                                    cy={50 + 20 * Math.sin((deg * Math.PI) / 180)}
                                    r="20"
                                    strokeOpacity="0.5"
                                />
                            ))}

                            {/* Geometric Connector Lines */}
                            {[30, 90, 150, 210, 270, 330].map((deg) => (
                                <line
                                    key={deg}
                                    x1="50" y1="50"
                                    x2={50 + 40 * Math.cos((deg * Math.PI) / 180)}
                                    y2={50 + 40 * Math.sin((deg * Math.PI) / 180)}
                                    opacity="0.3"
                                    strokeDasharray="2 2"
                                />
                            ))}

                            {/* Inner Hexagon */}
                            <path
                                d="M50 30 L67.32 40 L67.32 60 L50 70 L32.68 60 L32.68 40 Z"
                                strokeOpacity="0.8"
                                strokeWidth="1.2"
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
