
import React, { useRef, useEffect } from 'react';

interface PulseVisualizerProps {
    mode: 'Fire' | 'Earth' | 'Air' | 'Water';
    intensity?: number; // 0-1
}

export default function PulseVisualizer({ mode, intensity = 0.5 }: PulseVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let time = 0;

        // Configuration based on Element
        const config = {
            Fire: { color: '249, 115, 22', speed: 2.0, sharp: true }, // Orange/Red
            Earth: { color: '34, 197, 94', speed: 0.5, sharp: false }, // Green
            Air: { color: '255, 255, 255', speed: 1.2, sharp: false }, // White
            Water: { color: '56, 189, 248', speed: 0.8, sharp: false }, // Cyan
        }[mode];

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const maxRadius = Math.min(cx, cy) * 0.8;

            time += 0.01 * config.speed;

            // Draw concentric pulsing rings
            for (let i = 0; i < 5; i++) {
                const offset = i * 1.5;
                const wave = (Math.sin(time + offset) + 1) / 2; // 0 to 1
                const radius = maxRadius * (0.2 + 0.8 * wave);
                const alpha = 1 - wave;

                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${config.color}, ${alpha * 0.5})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                if (config.sharp) {
                    // Draw geometric spikes for Fire
                    ctx.save();
                    ctx.translate(cx, cy);
                    ctx.rotate(time * (i % 2 === 0 ? 1 : -1));
                    ctx.beginPath();
                    const spikes = 8;
                    for (let j = 0; j < spikes * 2; j++) {
                        const r = j % 2 === 0 ? radius : radius * 0.8;
                        const a = (Math.PI / spikes) * j;
                        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
                    }
                    ctx.closePath();
                    ctx.strokeStyle = `rgba(${config.color}, ${alpha * 0.3})`;
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // Central Core
            const corePulse = 1 + Math.sin(time * 3) * 0.1;
            ctx.beginPath();
            ctx.arc(cx, cy, maxRadius * 0.15 * corePulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${config.color}, 0.8)`;
            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(${config.color}, 0.8)`;
            ctx.fill();
            ctx.shadowBlur = 0;

            animationFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, [mode, intensity]);

    return (
        <canvas ref={canvasRef} className="w-full h-full" />
    );
}
