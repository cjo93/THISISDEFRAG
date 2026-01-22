import React, { useRef, useState } from 'react';

interface ShareCardProps {
    name: string;
    archetype: string;
    oneLiner: string;
}

export default function ShareCard({ name, archetype, oneLiner }: ShareCardProps) {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        // Basic share text for now - in a real app catching the detailed image is complex without html2canvas
        const text = `My DEFRAG Manual: ${name} is the "${archetype}". ${oneLiner} Find out yours at defrag.app`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My DEFRAG Manual',
                    text: text,
                    url: 'https://defrag.app',
                });
            } catch (err) {
                // user cancelled or failed, fallback to copy
                copyToClipboard(text);
            }
        } else {
            copyToClipboard(text);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-sm mx-auto group perspective-1000">
            {/* Card Visual */}
            <div
                ref={cardRef}
                className="relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-2 group-hover:scale-[1.02]"
            >
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col items-center text-center">
                    {/* Master Mandala Logo */}
                    <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <circle cx="50" cy="50" r="40" strokeOpacity="0.15" />
                            <circle cx="50" cy="50" r="2" fill="currentColor" />
                            {[0, 60, 120, 180, 240, 300].map((deg) => (
                                <circle
                                    key={deg}
                                    cx={50 + 20 * Math.cos((deg * Math.PI) / 180)}
                                    cy={50 + 20 * Math.sin((deg * Math.PI) / 180)}
                                    r="20"
                                    strokeOpacity="0.5"
                                />
                            ))}
                            <path d="M50 30 L67.32 40 L67.32 60 L50 70 L32.68 60 L32.68 40 Z" strokeOpacity="0.8" strokeWidth="1" />
                        </svg>
                    </div>

                    <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">OPERATING MANUAL FOR</h3>
                    <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">{name}</h2>

                    <div className="w-full border-t border-white/10 my-4" />

                    <div className="space-y-4">
                        <div>
                            <div className="text-[10px] tracking-[0.2em] text-orange-400 uppercase mb-1">ARCHETYPE</div>
                            <div className="text-xl font-light text-white/90">{archetype}</div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 mt-4">
                            <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">CORE INSIGHT</div>
                            <p className="text-sm text-white/70 italic leading-relaxed">
                                "{oneLiner}"
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-[10px] tracking-[0.2em] text-white/20">
                        DEFRAG.APP
                    </div>
                </div>
            </div>

            {/* Share Actions */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold tracking-[0.1em] rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {copied ? 'COPIED' : 'SHARE RESULT'}
                </button>
            </div>
        </div>
    );
}
