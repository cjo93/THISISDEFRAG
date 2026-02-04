
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Activity, Cpu } from 'lucide-react';

const ANALYSIS_STEPS = [
    { label: "INITIALIZING_PROXIES", delay: 800 },
    { label: "ACCESSING_NASA_JPL_EPHEMERIS", delay: 1200 },
    { label: "MAPPING_ARCHITECTURAL_LAYERS", delay: 1000 },
    { label: "DECODING_COMMUNICATION_FRAGMENTS", delay: 1500 },
    { label: "OPTIMIZING_SAFETY_PROTOCOLS", delay: 1200 },
    { label: "COMPILING_OPERATING_MANUAL", delay: 1000 },
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
                }, 800);
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
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 selection:bg-white/10 font-mono italic">

            {/* Geometric Mandala in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <svg width="600" height="600" viewBox="0 0 100 100" className="w-full h-full max-w-[800px] animate-[spin_240s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.2">
                    <circle cx="50" cy="50" r="48" strokeOpacity="0.1" />
                    <circle cx="50" cy="50" r="1.5" fill="currentColor" />

                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <circle
                            key={deg}
                            cx={50 + 30 * Math.cos((deg * Math.PI) / 180)}
                            cy={50 + 30 * Math.sin((deg * Math.PI) / 180)}
                            r="30"
                            strokeOpacity="0.1"
                        />
                    ))}

                    <path
                        d="M50 5 L95 50 L50 95 L5 50 Z"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-2xl space-y-24">

                <div className="text-center space-y-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full animate-fade-in shadow-2xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                        System_Analysis_Active
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-light tracking-tighter uppercase text-white/90 leading-none">
                        Crafting_Manual
                    </h1>
                </div>

                {/* Progress Container */}
                <div className="space-y-16">
                    <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Current Action */}
                    <div className="space-y-6 max-w-md mx-auto">
                        {ANALYSIS_STEPS.map((step, idx) => {
                            const isActive = idx === currentStep;
                            const isPast = idx < currentStep;

                            return (
                                <div
                                    key={step.label}
                                    className={`flex items-center justify-between text-[10px] tracking-[0.3em] transition-all duration-700 uppercase ${isActive ? 'text-white translate-x-3' : isPast ? 'text-white/20' : 'text-white/5 opacity-30'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="w-6 font-bold">{isPast ? '✓' : isActive ? '->' : '[]'}</span>
                                        <span>{step.label}</span>
                                    </div>
                                    {isActive && <span className="animate-pulse">_</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Technical Footer */}
                <div className="pt-16 border-t border-white/5 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-10 text-[9px] text-white/10 tracking-[0.5em] uppercase">
                        <div className="flex items-center gap-3">
                            <Activity size={12} strokeWidth={1} />
                            Telemetry: Sync
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <div className="flex items-center gap-3">
                            <Cpu size={12} strokeWidth={1} />
                            Core: Established
                        </div>
                    </div>
                    <p className="text-[8px] text-white/5 tracking-[0.8em] uppercase">
                        DEFRAG_Symmetric_Encryption_Active
                    </p>
                </div>

            </div>

            {/* Background Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[200px] pointer-events-none" />
        </div>
    );
}
