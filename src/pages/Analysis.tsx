
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ANALYSIS_STEPS = [
    { label: "INITIALIZING PROXIES", delay: 800 },
    { label: "ACCESSING NASA JPL EPHEMERIS", delay: 1200 },
    { label: "MAPPING ARCHITECTURAL LAYERS", delay: 1000 },
    { label: "DECODING COMMUNICATION FRAGMENTS", delay: 1500 },
    { label: "OPTIMIZING SAFETY PROTOCOLS", delay: 1200 },
    { label: "COMPILING OPERATING MANUAL", delay: 1000 },
];

export default function Analysis() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let stepTimer: NodeJS.Timeout;

        const runStep = (index: number) => {
            if (index >= ANALYSIS_STEPS.length) {
                // Complete
                setTimeout(() => {
                    const isOwner = localStorage.getItem('defrag_owner_bypass');
                    if (isOwner) {
                        navigate('/manual');
                    } else {
                        navigate('/checkout');
                    }
                }, 500);
                return;
            }

            setCurrentStep(index);

            stepTimer = setTimeout(() => {
                runStep(index + 1);
            }, ANALYSIS_STEPS[index].delay);
        };

        runStep(0);

        return () => clearTimeout(stepTimer);
    }, [navigate]);

    useEffect(() => {
        const totalDuration = ANALYSIS_STEPS.reduce((acc, step) => acc + step.delay, 0);
        const interval = 50;
        const increment = (interval / totalDuration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                return next > 100 ? 100 : next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-orange-500/20">

            {/* Geometric Mandala in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <svg width="600" height="600" viewBox="0 0 100 100" className="w-full h-full max-w-[600px] animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="45" strokeOpacity="0.1" />
                    <circle cx="50" cy="50" r="1" fill="currentColor" />

                    {/* Master Geometric Structure */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <circle
                            key={deg}
                            cx={50 + 25 * Math.cos((deg * Math.PI) / 180)}
                            cy={50 + 25 * Math.sin((deg * Math.PI) / 180)}
                            r="25"
                            strokeOpacity="0.2"
                        />
                    ))}

                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <line
                            key={deg}
                            x1="50" y1="50"
                            x2={50 + 45 * Math.cos((deg * Math.PI) / 180)}
                            y2={50 + 45 * Math.sin((deg * Math.PI) / 180)}
                            opacity="0.1"
                            strokeDasharray="1 1"
                        />
                    ))}

                    <path
                        d="M50 15 L80.3 32.5 L80.3 67.5 L50 85 L19.7 67.5 L19.7 32.5 Z"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-sm">

                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] tracking-[0.3em] font-mono text-orange-400 uppercase">System Analysis in Progress</span>
                    </div>
                    <h1 className="text-2xl font-light tracking-widest text-white/90 uppercase">Crafting Your Manual...</h1>
                </div>

                {/* Progress Bar Container */}
                <div className="space-y-8">
                    <div className="relative h-[2px] w-full bg-white/5 overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-linear shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Current Action */}
                    <div className="space-y-4">
                        {ANALYSIS_STEPS.map((step, idx) => {
                            const isActive = idx === currentStep;
                            const isPast = idx < currentStep;

                            return (
                                <div
                                    key={step.label}
                                    className={`flex items-center justify-between text-[11px] font-mono tracking-[0.2em] transition-all duration-500 ${isActive ? 'text-orange-400 opacity-100' : isPast ? 'text-white/40 opacity-80' : 'text-white/10 opacity-30'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-4">{isPast ? '✓' : isActive ? '>' : '○'}</span>
                                        <span>{step.label}</span>
                                    </div>
                                    {isActive && <span className="animate-pulse">_</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Technical Footer */}
                <div className="mt-16 pt-8 border-t border-white/5 space-y-2">
                    <p className="text-[9px] text-white/20 font-mono tracking-widest text-center uppercase">
                        Protocol: Bowen System Dynamics // Symmetric Encryption
                    </p>
                    <p className="text-[9px] text-white/10 font-mono tracking-widest text-center uppercase">
                        Ephemeris Integration: Active // Node Mapping: Complete
                    </p>
                </div>

            </div>
        </div>
    );
}
