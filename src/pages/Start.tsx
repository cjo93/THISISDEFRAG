
import React, { useState } from 'react';
import { ArrowRight, Loader2, Play } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Start() {
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = () => {
    setIsLoading(true);
    // Simulate initialization delay
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-sans">
      <Header />

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20 pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-16 rounded-full">
            System_Initialization
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-12 text-white uppercase">
            Initialize Your <br />
            <span className="text-white/30 italic">Baseline.</span>
          </h1>

          <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
            Establish your system’s operational starting point.
          </p>

          <p className="text-lg text-white/30 max-w-2xl mx-auto leading-relaxed font-light mb-24">
            Initialization creates a baseline map of how your system responds to interaction and pressure.
            <br />
            This step is required before accessing advanced features.
          </p>

          <button
            onClick={handleInitialize}
            disabled={isLoading}
            className="group h-24 px-12 sm:w-auto w-full flex items-center justify-center bg-white text-black text-xs tracking-[0.4em] font-bold hover:bg-slate-200 transition-all duration-500 uppercase shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-4">
                <Loader2 size={18} className="animate-spin" />
                Processing_Request...
              </span>
            ) : (
              <span className="flex items-center gap-4">
                Begin Initialization
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            )}
          </button>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-30 text-[10px] font-mono uppercase tracking-[0.2em] italic">
            <span>Encrypted_Session</span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>Latency: 12ms</span>
          </div>

        </div>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none" />
      </section>
    </div>
  );
}
