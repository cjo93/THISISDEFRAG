import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Shield, Lock, ArrowRight, Activity } from 'lucide-react';
import { api } from '../../lib/api-client';

const InversionReport: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false); // Mock payment state

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // In real app, use api client, here mocking the fetch to our new endpoint
      const res = await fetch('/api/inversion/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isPaid: paid })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    // In real app, redirect to Stripe
    if(confirm("Unlock full report for 9? (Mock Payment)")) {
        setPaid(true);
        // Re-analyze with paid flag
        setTimeout(() => {
             fetch('/api/inversion/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, isPaid: true })
              }).then(r => r.json()).then(setResult);
        }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col theme-consumer bg-[#0F172A] text-white">
      <Header />
      <main className="flex-1 p-8 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-vellum italic mb-4">Shadow Inversion Report</h1>
            <p className="font-tech text-gray-400">Structural Realignment Protocol</p>
        </div>

        {!result ? (
            <div className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-sm">
                <label className="block font-tech text-sm text-gray-400 mb-2">INPUT SIGNAL</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe the friction pattern..."
                    className="w-full h-40 bg-black/50 border border-white/20 rounded p-4 text-white placeholder-gray-600 font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={!text || loading}
                    className="w-full mt-4 bg-white text-black font-bold py-3 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
                >
                    {loading ? <Activity className="animate-spin" /> : <ArrowRight />}
                    {loading ? 'CALCULATING...' : 'RUN FREQUENCY AUDIT'}
                </button>
            </div>
        ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* 01: Frequency Audit */}
                <div className="border border-red-500/30 bg-red-900/10 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="font-tech text-red-400 text-sm">01 // FREQUENCY AUDIT</h2>
                        <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded">VOLTAGE: {result.systemicVoltage.toUpperCase()}</span>
                    </div>
                    <div className="text-center py-8">
                        <div className="text-6xl font-vellum mb-2">{result.shadow.label}</div>
                        <div className="font-mono text-sm text-gray-500">GATE {result.shadow.gate}</div>
                    </div>
                </div>

                {/* Locked Sections */}
                {result.phase === 'frequency_audit' ? (
                    <div className="relative overflow-hidden rounded-lg border border-white/10 p-8 text-center min-h-[300px] flex flex-col items-center justify-center gap-6">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md z-0"></div>
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <Lock size={48} className="text-gray-400" />
                            <h3 className="text-2xl font-bold">Inversion Gate Locked</h3>
                            <p className="text-gray-400 max-w-md">
                                Unlock the Gift State, Defrag Command, and structural realignment protocol.
                            </p>
                            <button
                                onClick={handleUnlock}
                                className="bg-white text-black px-8 py-3 rounded font-bold hover:scale-105 transition-transform"
                            >
                                UNLOCK REPORT (9)
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 02: Inversion Point */}
                         <div className="border border-white/10 bg-white/5 p-6 rounded-lg">
                            <h2 className="font-tech text-gray-400 text-sm mb-4">02 // INVERSION POINT</h2>
                            <p className="text-lg leading-relaxed text-gray-200">
                                The friction of <strong>{result.shadow.label}</strong> contains the potential energy for leadership.
                                By ceasing the attempt to control the outcome, the system naturally realigns into authority.
                            </p>
                        </div>

                         {/* 03: Gift State */}
                         <div className="border border-blue-500/30 bg-blue-900/10 p-6 rounded-lg">
                            <h2 className="font-tech text-blue-400 text-sm mb-4">03 // GIFT STATE</h2>
                            <div className="text-center py-8">
                                <div className="text-6xl font-vellum mb-2 text-blue-200">{result.gift.label}</div>
                                <div className="font-mono text-sm text-blue-400/60">SIDDHI: {result.siddhi.label.toUpperCase()}</div>
                            </div>
                        </div>

                        {/* 04: Defrag Command */}
                        <div className="border border-white/10 bg-black/40 p-6 rounded-lg">
                            <h2 className="font-tech text-gray-400 text-sm mb-6">04 // DEFRAG COMMAND</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <span className="font-mono text-blue-500">01.</span>
                                    <span>Increase latency between stimulus and response to 10 seconds.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="font-mono text-blue-500">02.</span>
                                    <span>Define operational boundaries: "I am responsible for my input, not the output."</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="font-mono text-blue-500">03.</span>
                                    <span>System reset: Engage breathing protocol when voltage exceeds medium threshold.</span>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default InversionReport;
