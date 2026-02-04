import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, ShieldAlert, Users, Lock, ChevronRight, Activity } from 'lucide-react';
import PlanetaryView from '../components/orbit/PlanetaryView';
import { inversionEngineInstance, RelationalSystem, AuditResult } from '../services/InversionEngine';
import LivingBackground from '../components/visuals/LivingBackground';

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

    const runAudit = () => {
        setIsAuditRunning(true);
        // Simulate processing delay
        setTimeout(() => {
            // Mock System Data (In a real app, this would come from a form or JSON upload)
            const mockSystem: RelationalSystem = {
                system_metadata: {
                    group_name: "User Family System",
                    primary_node_id: "USER_01",
                    analysis_date: new Date().toISOString()
                },
                nodes: [
                    { id: "USER_01", role: "Self", status: "Active" },
                    { id: "PARENT_1", role: "Father", status: "Active" },
                    { id: "PARENT_2", role: "Mother", status: "Active" }
                ],
                relational_vectors: [
                    { from: "USER_01", to: "PARENT_1", type: "Direct", tension_level: "High", frequency: "Weekly" },
                    { from: "USER_01", to: "PARENT_2", type: "Fusion", tension_level: "Medium", frequency: "Daily" }
                ]
            };

            const result = inversionEngineInstance.performRelationalAudit(mockSystem);
            setAuditResult(result);
            setIsAuditRunning(false);
        }, 2000);
    };

    // MARKETING VIEW (No Data)
    if (!loading && !appMode) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-x-hidden font-sans">
                <Header />
                <LivingBackground />
                <section className="pt-40 pb-32 px-8 relative min-h-[80vh] flex flex-col justify-center items-center text-center">
                    <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                            <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Module_02</span>
                        </div>
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tight leading-none mb-10 text-white uppercase animate-fade-in">ORBIT</h1>
                        <p className="text-xl sm:text-3xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16 italic animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Geometric mapping of relational pressure.
                        </p>
                        <div className="flex justify-center w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <button onClick={() => navigate('/start')} className="h-14 px-10 flex items-center justify-center bg-white text-black text-sm tracking-widest font-bold hover:bg-slate-200 transition-all duration-300 uppercase shadow-lg">
                                Initialize Map
                            </button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    // APP VIEW (Data Present)
    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-orange-500/30">
            {/* Nav Bar */}
            <div className="fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-black/50 backdrop-blur-md z-50 flex items-center justify-between px-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={14} />
                    Back to Dashboard
                </Link>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">ORBIT // Relational_Mapper</div>
            </div>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h1 className="text-6xl font-light text-white tracking-tighter uppercase italic mb-4">ORBIT_Field</h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase flex items-center gap-3">
                             <span className={`w-2 h-2 rounded-full animate-pulse ${auditResult ? 'bg-red-500' : 'bg-green-500'}`} />
                            Unit_A: {userData?.name || 'Unknown'} // Status: {auditResult ? 'AUDIT_COMPLETE' : 'ACTIVE'}
                        </p>
                    </div>
                    {!auditResult && (
                        <button
                            onClick={runAudit}
                            disabled={isAuditRunning}
                            className="h-14 px-8 bg-white border border-white text-black text-[10px] tracking-widest font-bold uppercase hover:bg-transparent hover:text-white transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isAuditRunning ? <Loader2 className="animate-spin" size={16} /> : <Activity size={16} className="group-hover:text-white transition-colors" />}
                            {isAuditRunning ? 'Analyzing_Vectors...' : 'Run_Relational_Audit'}
                        </button>
                    )}
                </header>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">

                    {/* LEFT: VISUALIZER (Takes up 2 cols) */}
                    <div className="lg:col-span-2 h-[600px] w-full border border-white/10 rounded-[32px] bg-white/[0.02] relative overflow-hidden flex items-center justify-center glass-panel">
                        {/* Planetary View Canvas */}
                        <PlanetaryView date={userData?.birthDate ? `${userData.birthDate}T${userData.birthTime || '12:00'}:00` : new Date().toISOString()} />

                        {auditResult && (
                            <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse" />
                        )}

                        <div className="absolute bottom-8 right-8 text-right pointer-events-none">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                                {userData?.birthDate ? `Epoch: ${userData.birthDate}` : 'Live Telemetry'}
                            </div>
                            <div className="flex gap-1 justify-end">
                                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                <span className={`w-1 h-1 rounded-full animate-pulse delay-75 ${auditResult ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                <span className={`w-1 h-1 rounded-full animate-pulse delay-150 ${auditResult ? 'bg-red-500' : 'bg-green-500'}`}></span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: DATA / PAYWALL */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Audit Result Card with HARD IRIDESCENCE BORDER */}
                        <div className={`p-[1px] rounded-[32px] relative overflow-hidden group transition-all duration-1000 ${auditResult
                            ? 'bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_50px_rgba(168,85,247,0.15)] animate-shimmer'
                            : 'bg-white/10'
                            }`}>
                            <div className="bg-black/90 backdrop-blur-2xl rounded-[31px] p-8 h-full relative overflow-hidden flex flex-col">
                                {!auditResult ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                                        <Users size={48} strokeWidth={1} />
                                        <p className="text-xs uppercase tracking-widest max-w-[200px]">
                                            Initialize Audit to detect system fusion and triangles.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 animate-fade-in relative z-10">
                                        {/* Voltage Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold animate-pulse">System_Voltage</span>
                                                <ShieldAlert size={16} className="text-red-500" />
                                            </div>
                                            <div className="text-6xl font-black text-white tracking-tighter mb-2" style={{ textShadow: '0 0 30px rgba(255,0,0,0.5)' }}>
                                                {auditResult.system_voltage}%
                                            </div>
                                            <p className="text-xs text-white/40 leading-relaxed font-light">
                                                High entropy detected. Your system is acting as a release valve for external tension.
                                            </p>
                                        </div>

                                        {/* Findings Preview - Frosted Overlay Effect */}
                                        <div className="space-y-4 border-t border-white/5 pt-6 relative">
                                            <div className="flex items-center gap-3 text-sm text-white/70 blur-[2px] select-none opacity-50">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                <span>{auditResult.fusion_points.length} Zones of Fusion Detected</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-white/70 blur-[2px] select-none opacity-50">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                <span>{auditResult.triangles.length} Active Triangles</span>
                                            </div>

                                            {/* Overlay Text */}
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-white/30 font-bold pointer-events-none">
                                                Encrypted_Data
                                            </div>
                                        </div>

                                        {/* PAYWALL ACTION */}
                                        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden group/btn">
                                            {/* Iridescent shimmer overlay for button area */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 pointer-events-none" />

                                            <div className="flex justify-center mb-2">
                                                <Lock size={24} className="text-white/50" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-light text-white italic">Relational Audit</h3>
                                                <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">$89.00 // One-time</p>
                                            </div>
                                            <button className="w-full h-12 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 relative z-10">
                                                Unlock Protocol <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                            <div className="text-[9px] text-white/30 uppercase tracking-widest pt-2 border-t border-white/5">
                                                Includes Heatmap & Inversion Table
                                            </div>
                                        </div>

                                        {/* Subscription Upsell */}
                                        <div className="text-center pt-2">
                                            <button className="text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                                                Or Subscribe to Live System ($39/mo)
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Blurry Background for Paywall Feel */}
                                {auditResult && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
