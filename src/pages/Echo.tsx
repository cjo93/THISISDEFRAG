
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import PulseVisualizer from '../components/echo/PulseVisualizer';
import { getElement } from '../lib/astronomy';

export default function Echo() {
    const navigate = useNavigate();
    const [appMode, setAppMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        // Check for User Data
        const storedUnitA = localStorage.getItem('defrag_unitA');
        if (storedUnitA) {
            setUserData(JSON.parse(storedUnitA));
            setAppMode(true);
        }
        setLoading(false);
    }, []);

    // MARKETING VIEW (No Data)
    if (!loading && !appMode) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
                <Header />
                <section className="relative pt-40 pb-32 px-8 border-b border-white/5 bg-black overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center">
                    <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase">ECHO</h1>
                        <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
                            Operational parameters for the human system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 mb-32 w-full max-w-lg justify-center">
                            <button onClick={() => navigate('/start')} className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                                Initialize System
                            </button>
                        </div>
                    </div>
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-none blur-[150px] pointer-events-none" />
                </section>
                <Footer />
            </div>
        );
    }

    // APP VIEW (Data Present)
    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-orange-500/30">
            {/* Nav Bar for App Mode */}
            <div className="fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-black/50 backdrop-blur-md z-50 flex items-center justify-between px-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={14} />
                    Back to Dashboard
                </Link>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">ECHO // Analysis_Engine</div>
            </div>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-20">
                    <h1 className="text-6xl font-light text-white tracking-tighter uppercase italic mb-4">ECHO_Output</h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">
                        Target: {userData?.name || 'Unknown_Unit'}
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Data Readout */}
                    <div className="space-y-12">

                        {/* Sun Sign (Drive) */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.05] transition-colors">⚡️</div>
                            <h3 className="text-xs text-orange-500 font-bold tracking-[0.4em] uppercase mb-6">Core_Drive // Sun</h3>
                            <div className="text-5xl font-light text-white mb-4 uppercase">{userData?.sun_sign || 'Calculating...'}</div>
                            <p className="text-white/40 text-sm leading-relaxed">
                                The primary engine of your operational identity. This determines how you consume energy and where you direct your focus.
                            </p>
                        </div>

                        {/* Mars Sign (Action) */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.05] transition-colors">🔥</div>
                            <h3 className="text-xs text-red-500 font-bold tracking-[0.4em] uppercase mb-6">Action_Vector // Mars</h3>
                            <div className="text-5xl font-light text-white mb-4 uppercase">{userData?.mars_sign || 'Calculating...'}</div>
                            <p className="text-white/40 text-sm leading-relaxed">
                                The mechanism of defense and assertion. This defines how you handle conflict and execute tasks.
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Visualizer */}
                    <div className="relative aspect-square">
                        <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.01] overflow-hidden">
                            {userData?.sun_sign && (
                                <PulseVisualizer mode={getElement(userData.sun_sign)} />
                            )}

                            {/* Overlay Status */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">System Status</div>
                                    <div className="text-3xl font-light text-white italic tracking-tighter shadow-black drop-shadow-lg">OPTIMAL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
