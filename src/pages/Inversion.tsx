
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight, Lock, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { inversionEngineInstance, ShadowInversionResult } from '../services/InversionEngine';

export default function Inversion() {
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<ShadowInversionResult | null>(null);

    const handleInvert = () => {
        if (!inputText.trim()) return;
        setIsProcessing(true);

        // Emulate "Engine Processing" latency for perceived value
        setTimeout(() => {
            const data = inversionEngineInstance.performShadowInversion(inputText);
            setResult(data);
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-fuchsia-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="flex justify-center">
                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-white/50 backdrop-blur-md">
                            Direct Data Converter
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-none text-white uppercase">
                        Shadow <span className="text-white/30 italic">Inversion</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-white/40 font-light leading-relaxed">
                        Input raw situational data. The engine will identify the mechanical shadow and invert it to its functional gift.
                    </p>
                </div>

                {/* Input Area */}
                {!result ? (
                    <div className="w-full max-w-2xl animate-slide-up">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/20 via-white/5 to-fuchsia-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-2">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Describe the friction (e.g., 'I feel like I have to control everyone...')"
                                    className="w-full h-48 bg-transparent text-white p-6 outline-none text-xl font-light placeholder:text-white/10 resize-none font-mono tracking-wide"
                                />
                                <div className="border-t border-white/5 p-2 flex justify-center">
                                    <button
                                        onClick={handleInvert}
                                        disabled={!inputText.trim() || isProcessing}
                                        className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-slate-200 transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                                        Initialize Inversion
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-center mt-6 text-[10px] uppercase tracking-widest text-white/20">
                            Zero-knowledge Environment // No Data Stored
                        </p>
                    </div>
                ) : (
                    // RESULT VIEW
                    <div className="w-full max-w-3xl animate-fade-in space-y-12">

                        {/* 1. Identified Pattern (Visible) */}
                        <div className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-500"></div>
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500">Identified_Pattern</h3>
                                <AlertTriangle size={16} className="text-slate-500" />
                            </div>
                            <div className="text-4xl font-light text-white mb-2 tracking-tight">
                                {result.identified_pattern}
                            </div>
                            <div className="text-white/40 text-sm font-mono mt-4">
                                Systemic_Tension: {result.systemic_tension}%
                            </div>
                        </div>

                        {/* 2. Action Protocol (Locked/Blurred) */}
                        <div className="relative group">
                            {/* The "Locked" Content Preview */}
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 blur-sm select-none opacity-50 relative z-0">
                                <div className="flex items-start justify-between mb-8">
                                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500">Corrective_Frequency</h3>
                                </div>
                                <div className="text-3xl font-light text-white mb-8 tracking-tight">
                                    {result.corrective_frequency}
                                </div>
                                <div className="space-y-4 font-mono text-sm text-white/60">
                                    <p>1. {result.action_protocol[0]}</p>
                                    <p>2. {result.action_protocol[1]}</p>
                                    <p>3. {result.action_protocol[2]}</p>
                                </div>
                            </div>

                            {/* The Paywall Overlay (Stripe Integrated Look) */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
                                <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-500/10 to-fuchsia-500/10 pointer-events-none" />

                                    <Lock size={32} className="mx-auto text-white mb-6" strokeWidth={1} />

                                    <h3 className="text-xl text-white font-medium mb-2">Unlock Action Protocol</h3>
                                    <p className="text-white/40 text-sm mb-8 leading-relaxed">
                                        Access the mechanical steps to unblock this gate and restore flow.
                                    </p>

                                    <button className="w-full h-14 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                        Reveal Protocol <ArrowRight size={14} />
                                    </button>
                                    <div className="mt-4 text-[10px] uppercase tracking-widest text-white/30">
                                        $89.00 // One-time
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => { setInputText(''); setResult(null); }}
                                className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                            >
                                ← New Inversion
                            </button>
                        </div>

                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
