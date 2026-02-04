import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ShieldAlert, Users, Lock, ChevronRight, Activity } from 'lucide-react';
import PlanetaryView from '../components/orbit/PlanetaryView';
import { inversionEngineInstance, RelationalSystem, AuditResult } from '../services/InversionEngine';

export default function Relational() {
    const navigate = useNavigate();
    const [appMode, setAppMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
    const [isAuditRunning, setIsAuditRunning] = useState(false);

    useEffect(() => {
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

                <section className="pt-40 pb-32 px-8 bg-black relative min-h-[80vh] flex flex-col justify-center items-center text-center">
                    <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase">ORBIT</h1>
                        <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic">
                            Geometric mapping of relational pressure.
                        </p>
                        <div className="flex justify-center w-full">
                            <button onClick={() => navigate('/start')} className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                                Initialize Map
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
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
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">ORBIT // Relational_Mapper</div>
            </div>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-20">
                    <h1 className="text-6xl font-light text-white tracking-tighter uppercase italic mb-4">ORBIT_Field</h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">
                        Unit_A: {userData?.name || 'Unknown'} // Status: Active
                    </p>
                </header>

                <div className="h-[600px] w-full border border-white/10 rounded-[32px] bg-white/[0.02] relative overflow-hidden flex items-center justify-center">

                    {/* Planetary View Canvas */}
                    <PlanetaryView date={userData.birthDate ? `${userData.birthDate}T${userData.birthTime || '12:00'}:00` : new Date().toISOString()} />

                    <div className="absolute bottom-8 right-8 text-right pointer-events-none">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                            {userData.birthDate ? `Epoch: ${userData.birthDate}` : 'Live Telemetry'}
                        </div>
                        <div className="flex gap-1 justify-end">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75"></span>
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-150"></span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-xs tracking-widest uppercase">To add a secondary node, please initialize manual protocol.</p>
                </div>

            </main>
        </div>
    );
}
