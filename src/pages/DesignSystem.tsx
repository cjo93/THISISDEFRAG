import React from 'react';
import { ArrowRight, Activity, Lock } from 'lucide-react';

export default function DesignSystem() {
    return (
        <div className="min-h-screen bg-[var(--color-black)] text-[var(--color-white)] p-10 font-sans">
            <header className="mb-20 border-b border-white/10 pb-10">
                <h1 className="text-6xl font-light tracking-tighter mb-4">Design System</h1>
                <p className="text-xl text-white/40 font-mono">v2.0 // PREMIUM_ALCHEMICAL</p>
            </header>

            {/* TYPOGRAPHY */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Typography</h2>
                </div>
                <div className="col-span-12 md:col-span-8 space-y-12">
                    <div>
                        <h1 className="border-b border-white/10 pb-4 mb-2">Heading 1</h1>
                        <span className="text-xs text-white/30 font-mono">6rem / Light / -0.03em</span>
                    </div>
                    <div>
                        <h2>Heading 2</h2>
                        <span className="text-xs text-white/30 font-mono">3.75rem / Light / -0.02em</span>
                    </div>
                    <div>
                        <h3>Heading 3</h3>
                        <span className="text-xs text-white/30 font-mono">2.25rem / Light / -0.02em</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-medium">Heading 4</h4>
                        <span className="text-xs text-white/30 font-mono">1.25rem / Medium</span>
                    </div>
                    <div>
                        <p className="text-lg leading-relaxed text-white/60 max-w-2xl">
                            Body Large. The friction isn't personal. It's structural. Map the invisible mechanics of your connections.
                        </p>
                        <p className="text-base leading-relaxed text-white/60 max-w-2xl">
                            Body Standard. Ingest raw relational data. Classify friction points against a deterministic 64-gate framework.
                        </p>
                        <span className="text-xs text-white/30 font-mono">Body / Inter / 1.6 Line Height</span>
                    </div>
                </div>
            </section>

            {/* COLORS */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Palette</h2>
                </div>
                <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        <div className="w-full h-24 bg-[#0F172A] border border-white/10 rounded-lg"></div>
                        <div className="text-xs font-mono">
                            <div className="text-white">Deep Slate</div>
                            <div className="text-white/40">#0F172A</div>
                            <div className="text-emerald-500">Background</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-24 bg-[#F8FAFC] border border-white/10 rounded-lg"></div>
                        <div className="text-xs font-mono">
                            <div className="text-white">Off White</div>
                            <div className="text-white/40">#F8FAFC</div>
                            <div className="text-emerald-500">Text / Accent</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-24 bg-emerald-500 border border-white/10 rounded-lg"></div>
                        <div className="text-xs font-mono">
                            <div className="text-white">Emerald</div>
                            <div className="text-white/40">Token: Safe</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-24 bg-purple-500 border border-white/10 rounded-lg"></div>
                        <div className="text-xs font-mono">
                            <div className="text-white">Purple</div>
                            <div className="text-white/40">Token: Process</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTION */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Interaction</h2>
                </div>
                <div className="col-span-12 md:col-span-8 space-y-8">
                    <div className="flex flex-wrap gap-8 items-center">
                        <button className="button-primary">
                            Initialize System <ArrowRight size={16} />
                        </button>
                        <button className="button-secondary">
                            View Documentation
                        </button>
                    </div>
                    <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-md max-w-md">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity size={16} className="text-emerald-500" /> Card Element
                        </h4>
                        <p className="text-sm text-white/60 mb-6">
                            Glassmorphism card with 1px border and backdrop blur. High-end, precise feel.
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] uppercase font-bold px-2 py-1 bg-white/10 rounded text-white/80">
                                Unit A
                            </span>
                             <span className="text-[10px] uppercase font-bold px-2 py-1 bg-white/10 rounded text-white/80">
                                Unit B
                            </span>
                        </div>
                    </div>
                </div>
            </section>

             {/* GRID */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Grid System</h2>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <div className="grid grid-cols-12 gap-4 h-32 w-full border border-dashed border-white/20 p-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-white/10 h-full flex items-center justify-center text-[10px] text-white/30">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-white/40 font-mono">12-Column Grid / 1rem (16px) Gap</p>
                </div>
            </section>
        </div>
    );
}
