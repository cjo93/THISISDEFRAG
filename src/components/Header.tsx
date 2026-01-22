
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
                <Link to={targetLink} className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 flex items-center justify-center text-orange-500 overflow-visible transition-all duration-[3000ms] ease-in-out group-hover:rotate-[360deg] group-hover:scale-110">
                        {/* Intricate Sacred Geometry Petal Mandala */}
                        <svg width="44" height="44" viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.2">
                            {/* Recursive Petal Layers */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                <g key={deg} transform={`rotate(${deg} 50 50)`}>
                                    <path d="M50 50 C50 35 40 25 50 10 C60 25 50 35 50 50" opacity="0.9" />
                                    <path d="M50 45 C55 38 52 32 50 25 C48 32 45 38 50 45" opacity="0.4" strokeWidth="0.8" />
                                </g>
                            ))}
                            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
                                <path
                                    key={deg}
                                    d="M50 50 L50 35"
                                    transform={`rotate(${deg} 50 50)`}
                                    opacity="0.3"
                                    strokeDasharray="1 1"
                                />
                            ))}
                            {/* Central Sacred Geometry */}
                            <circle cx="50" cy="50" r="4" fill="currentColor" />
                            <circle cx="50" cy="50" r="10" opacity="0.2" strokeWidth="0.5" />
                        </svg>
                    </div>
                    <span className="tracking-[0.3em] text-sm font-bold text-white group-hover:text-orange-500 transition-colors uppercase">Defrag</span>
                </Link>
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        to="/signin"
                        className="text-xs tracking-[0.15em] text-white/50 hover:text-white transition-colors uppercase"
                    >
                        Member Login
                    </Link>
                    <Link
                        to="/start"
                        className="h-9 sm:h-10 px-4 sm:px-5 flex items-center justify-center bg-white text-black text-xs tracking-[0.15em] font-bold hover:bg-orange-500 hover:text-white transition rounded-lg uppercase"
                    >
                        Create Manual
                    </Link>
                </div>
            </div>
        </nav>
    );
}
