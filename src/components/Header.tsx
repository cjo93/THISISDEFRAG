
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
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-orange-500 overflow-visible transition-transform duration-[2000ms] ease-in-out group-hover:rotate-[180deg]">
                        {/* True Petal Mandala Identity */}
                        <svg width="40" height="40" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                            {/* Center Dot */}
                            <circle cx="50" cy="50" r="2" fill="currentColor" />

                            {/* Inner Flower (8 petals) */}
                            <path d="M50 20 Q55 35 60 50 Q65 65 50 80 Q35 65 40 50 Q45 35 50 20" stroke="currentColor" fill="none" />
                            <path d="M80 50 Q65 55 50 60 Q35 65 20 50 Q35 35 50 40 Q65 45 80 50" stroke="currentColor" fill="none" />
                            <path d="M71 29 Q60 40 50 50 Q40 60 29 71" stroke="currentColor" fill="none" />
                            <path d="M29 29 Q40 40 50 50 Q60 60 71 71" stroke="currentColor" fill="none" />

                            {/* Middle Detailed Ring */}
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />

                            {/* Outer Decorative Petals */}
                            <path d="M50 10 C60 10 70 20 70 30 C70 40 60 50 50 50" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M50 50 C40 50 30 40 30 30 C30 20 40 10 50 10" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M50 90 C60 90 70 80 70 70 C70 60 60 50 50 50" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M50 50 C40 50 30 60 30 70 C30 80 40 90 50 90" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M90 50 C90 60 80 70 70 70 C60 70 50 60 50 50" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M50 50 C50 40 60 30 70 30 C80 30 90 40 90 50" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M10 50 C10 60 20 70 30 70 C40 70 50 60 50 50" stroke="currentColor" strokeOpacity="0.6" />
                            <path d="M50 50 C50 40 40 30 30 30 C20 30 10 40 10 50" stroke="currentColor" strokeOpacity="0.6" />
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
