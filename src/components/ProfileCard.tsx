import React from 'react';
import AudioVisualizer from './AudioVisualizer';
import { useTTS } from '../hooks/useTTS';

interface ProfileCardProps {
    name: string;
    sunSign?: string;
    marsSign?: string;
    risingSign?: string;
    archetype?: string;
    briefText?: string;
}

/**
 * DEFRAG // Profile Card
 * Hero section displaying user's natal identity with TTS brief
 */
export default function ProfileCard({
    name,
    sunSign = 'Unknown',
    marsSign = 'Unknown',
    risingSign,
    archetype = 'The Operator',
    briefText,
}: ProfileCardProps) {
    const { speak, stop, isPlaying, isLoading, analyser } = useTTS();

    const defaultBrief = `Welcome back, ${name}. Your operating system runs on ${sunSign} energy, with ${marsSign} driving your actions. Today's mission: decode the friction in your relationships.`;

    const handleListen = () => {
        if (isPlaying) {
            stop();
        } else {
            speak(briefText || defaultBrief);
        }
    };

    // Generate initials mandala pattern
    const initials = name.charAt(0).toUpperCase();

    return (
        <div className="glass-box rounded-2xl p-8 border border-white/10 relative overflow-hidden group">
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />

            <div className="relative z-10">
                {/* Top row: Avatar + Info */}
                <div className="flex items-start gap-6 mb-6">
                    {/* Mandala Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
                            <span className="text-3xl font-light text-gray-300">{initials}</span>
                        </div>
                        {/* Orbital ring */}
                        <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_20s_linear_infinite]"
                            style={{ transform: 'scale(1.3)' }} />
                    </div>

                    {/* Identity Info */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-light tracking-tight mb-1">{name}</h2>
                        <p className="text-gray-300/80 text-sm tracking-wider mb-3">{archetype}</p>

                        {/* Natal badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60">
                                ☀️ {sunSign}
                            </span>
                            <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60">
                                ♂ {marsSign}
                            </span>
                            {risingSign && (
                                <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60">
                                    ↑ {risingSign}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Audio Visualizer */}
                <div className="mb-6">
                    <AudioVisualizer
                        isPlaying={isPlaying}
                        analyser={analyser || undefined}
                        className="h-16"
                    />
                </div>

                {/* Listen Button */}
                <button
                    onClick={handleListen}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl text-sm tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-3 ${isPlaying
                            ? 'bg-white text-black shadow-lg shadow-white/20'
                            : isLoading
                                ? 'bg-white/5 text-white/30 cursor-wait'
                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Synthesizing...
                        </>
                    ) : isPlaying ? (
                        <>
                            <span className="text-lg">⏹</span>
                            Stop Playback
                        </>
                    ) : (
                        <>
                            <span className="text-lg">🔊</span>
                            Listen to Your Brief
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
