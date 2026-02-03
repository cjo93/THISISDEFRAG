import React, { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
    isPlaying: boolean;
    audioContext?: AudioContext;
    analyser?: AnalyserNode;
    className?: string;
}

/**
 * DEFRAG // Audio Visualizer
 * Premium waveform visualization that reacts to TTS playback
 */
export default function AudioVisualizer({
    isPlaying,
    audioContext,
    analyser,
    className = ''
}: AudioVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const [bars, setBars] = useState<number[]>(new Array(32).fill(0.1));

    useEffect(() => {
        if (!isPlaying) {
            // Idle animation - subtle breathing effect
            const idleAnimation = () => {
                setBars(prev => prev.map((_, i) => {
                    const time = Date.now() / 1000;
                    const wave = Math.sin(time * 2 + i * 0.3) * 0.15 + 0.2;
                    return wave;
                }));
                animationRef.current = requestAnimationFrame(idleAnimation);
            };
            idleAnimation();
            return () => {
                if (animationRef.current) cancelAnimationFrame(animationRef.current);
            };
        }

        if (!analyser) {
            // Simulated visualization when no analyser available
            const simulatedAnimation = () => {
                setBars(prev => prev.map((_, i) => {
                    const time = Date.now() / 100;
                    const base = Math.sin(time + i * 0.5) * 0.4 + 0.5;
                    const noise = Math.random() * 0.2;
                    return Math.min(1, Math.max(0.1, base + noise));
                }));
                animationRef.current = requestAnimationFrame(simulatedAnimation);
            };
            simulatedAnimation();
            return () => {
                if (animationRef.current) cancelAnimationFrame(animationRef.current);
            };
        }

        // Real audio visualization
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const visualize = () => {
            analyser.getByteFrequencyData(dataArray);

            // Sample 32 frequency bands
            const newBars = [];
            const step = Math.floor(bufferLength / 32);
            for (let i = 0; i < 32; i++) {
                const value = dataArray[i * step] / 255;
                newBars.push(Math.max(0.1, value));
            }
            setBars(newBars);

            animationRef.current = requestAnimationFrame(visualize);
        };

        visualize();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying, analyser]);

    return (
        <div className={`flex items-end justify-center gap-[2px] h-12 ${className}`}>
            {bars.map((height, i) => (
                <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-75 ease-out"
                    style={{
                        height: `${height * 100}%`,
                        background: isPlaying
                            ? `linear-gradient(to top, rgba(249, 115, 22, ${0.6 + height * 0.4}), rgba(251, 146, 60, ${0.8 + height * 0.2}))`
                            : `rgba(255, 255, 255, ${0.1 + height * 0.2})`,
                        boxShadow: isPlaying
                            ? `0 0 ${height * 10}px rgba(249, 115, 22, ${height * 0.5})`
                            : 'none',
                    }}
                />
            ))}
        </div>
    );
}
