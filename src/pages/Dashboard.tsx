import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Dashboard() {
    const navigate = useNavigate();
    const [manual, setManual] = useState<any>(null);
    const [hasPayment, setHasPayment] = useState(false);

    useEffect(() => {
        // Check for existing manual in local storage
        const storedManual = localStorage.getItem('defrag_manual_preview');
        const storedUnitA = localStorage.getItem('defrag_unitA');
        const storedUnitB = localStorage.getItem('defrag_unitB');
        const payment = localStorage.getItem('defrag_payment_verified') === 'true';

        setHasPayment(payment);

        if (storedUnitA && storedUnitB) {
            setManual({
                unitA: JSON.parse(storedUnitA),
                unitB: JSON.parse(storedUnitB),
                content: storedManual ? JSON.parse(storedManual) : null
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/20">
            <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9999] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            <Header />

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">

                {/* Welcome Header */}
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight mb-2">Command Center</h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase">User Dashboard // v1.1.2</p>
                    </div>
                    <Link
                        to="/start"
                        className="bg-white text-black px-6 py-3 rounded-lg text-xs font-bold tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-white/5"
                    >
                        + NEW PROFILE
                    </Link>
                </div>

                {/* Manuals Grid */}
                <div className="grid gap-6">
                    <h2 className="text-xs tracking-[0.3em] text-white/30 uppercase mb-2">Active Protocols</h2>

                    {manual ? (
                        <div className="glass-box border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${hasPayment ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-orange-500/30 text-orange-400 bg-orange-500/10'}`}>
                                    {hasPayment ? 'UNLOCKED' : 'PREVIEW MODE'}
                                </div>
                            </div>

                            <div className="flex gap-6 items-center">
                                {/* Avatar/Symbol */}
                                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 text-xl font-mono">
                                    {(manual.unitB.name || 'Unknown').charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-medium mb-1 group-hover:text-orange-400 transition-colors">
                                        {manual.unitA.name} <span className="text-white/30 text-sm mx-2">//</span> {manual.unitB.name}
                                    </h3>
                                    <div className="flex gap-4 text-xs text-white/40 font-mono">
                                        <span>SUN: {manual.unitB.sun_sign}</span>
                                        <span>MARS: {manual.unitB.mars_sign}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/manual"
                                    className="px-6 py-3 border border-white/20 rounded-lg text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                                >
                                    {hasPayment ? 'Open Manual' : 'Complete Setup'}
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-white/30 text-sm mb-6">No relationship manuals generated yet.</p>
                            <Link to="/start" className="text-orange-500 hover:text-orange-400 text-sm underline underline-offset-4">
                                Initialize your first profile
                            </Link>
                        </div>
                    )}
                </div>

                {/* Explore / Add More Section */}
                <div className="mt-20">
                    <div className="glass-box p-8 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-light mb-2">Expand Your Database</h3>
                            <p className="text-white/50 text-sm max-w-md">
                                Map the friction points with friends, family, or colleagues.
                                Each manual is stored here securely.
                            </p>
                        </div>
                        <Link to="/start" className="opacity-50 hover:opacity-100 transition-opacity">
                            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                +
                            </div>
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
