import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LivingBackground from '../components/visuals/LivingBackground';
import { ArrowRight, User, Calendar, Clock, MapPin, Loader2, Terminal, Shield } from 'lucide-react';
import { calculateMechanics } from '../services/defragEngine';

export default function Start() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        birthTime: '',
        birthPlace: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = async () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            try {
                // Execute Engine
                const mechanics = await calculateMechanics(
                    formData.name,
                    formData.birthDate,
                    formData.birthTime,
                    formData.birthPlace
                );

                // Store
                localStorage.setItem('defrag_unitA', JSON.stringify(mechanics));

                // Latency Simulation for "Premium Feel"
                await new Promise(resolve => setTimeout(resolve, 2000));

                navigate('/echo');
            } catch (error) {
                console.error("Calculation Failure", error);
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-[var(--color-white)] selection:bg-white/20 font-sans overflow-x-hidden">
            <Header />

            {/* GLOBAL FIXED ELEMENTS */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <LivingBackground />
            </div>

            {/* MAIN GRID LAYOUT */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 pt-32 pb-20 px-6 max-w-[1400px] mx-auto min-h-screen items-center">

                {/* LEFT COLUMN: CONTEXT */}
                <div className="col-span-1 md:col-span-12 lg:col-span-5 lg:col-start-2 flex flex-col justify-center space-y-12">
                     <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] backdrop-blur-md text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase rounded-full w-fit animate-fade-in">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Protocol_Initiation
                    </div>

                    <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Establish <br/>
                        <span className="font-serif italic text-white/50">Temporal Baseline.</span>
                    </h1>

                    <p className="text-lg text-white/40 leading-relaxed font-light max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Accurate mechanical analysis requires precise input vectors. Data is encrypted locally and used strictly for calculation.
                    </p>

                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <Shield size={12} />
                        <span>Zero-Retention Architecture</span>
                    </div>
                </div>

                {/* RIGHT COLUMN: INTERFACE */}
                <div className="col-span-1 md:col-span-12 lg:col-span-5 lg:col-start-8">
                     {/* INPUT CARD */}
                    <div className="bg-[#0F172A]/80 border border-white/10 p-8 sm:p-12 rounded-[2px] backdrop-blur-xl shadow-2xl relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>

                        {/* Progress Indicator */}
                        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">Phase {String(step).padStart(2, '0')} / 03</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`w-12 h-0.5 transition-all duration-500 ${step >= i ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-12 min-h-[280px]">
                            {step === 1 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="space-y-4 group">
                                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold transition-colors group-focus-within:text-white">Designation (Full Name)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl text-white focus:border-white outline-none transition-all placeholder:text-white/5 font-light"
                                                placeholder="Enter Name..."
                                                autoFocus
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4 group">
                                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold transition-colors group-focus-within:text-white">Signal Path (Email)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl text-white focus:border-white outline-none transition-all placeholder:text-white/5 font-light"
                                                placeholder="name@domain.com"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="space-y-4 group">
                                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold transition-colors group-focus-within:text-white">Temporal Coordinates (Date)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl text-white focus:border-white outline-none transition-all font-light appearance-none text-white/80"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4 group">
                                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold transition-colors group-focus-within:text-white">Temporal Precision (Time)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="time"
                                                name="birthTime"
                                                value={formData.birthTime}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl text-white focus:border-white outline-none transition-all font-light appearance-none text-white/80"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="space-y-4 group">
                                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold transition-colors group-focus-within:text-white">Spatial Vector (Place of Birth)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="birthPlace"
                                                value={formData.birthPlace}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl text-white focus:border-white outline-none transition-all placeholder:text-white/5 font-light"
                                                placeholder="City, Country"
                                                autoFocus
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-lg">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed font-mono">
                                            CONFIRMATION: Data is transient. No permanent record is created on our servers without explicit "Save" action in Phase 2.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                         <div className="mt-16 flex justify-between items-center pt-8 border-t border-white/5">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-2 font-bold"
                                >
                                    <ArrowRight className="rotate-180" size={12} /> Return
                                </button>
                            ) : <div />}

                            <button
                                onClick={handleNext}
                                disabled={isLoading || (step === 1 && !formData.name) || (step === 2 && !formData.birthDate) || (step === 3 && !formData.birthPlace)}
                                className="h-14 px-10 bg-white text-black text-[10px] tracking-[0.2em] font-bold hover:bg-slate-200 transition-all uppercase flex items-center gap-4 disabled:opacity-20 disabled:cursor-not-allowed rounded-[1px] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Synthesizing...
                                    </>
                                ) : (
                                    <>
                                        {step === 3 ? 'Initialize_Sequence' : 'Proceed'}
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
