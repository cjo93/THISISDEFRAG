
import React, { useRef, useEffect } from 'react';
import { getPlanetStateVector, PlanetName } from '../../lib/astronomy';

interface PlanetaryViewProps {
    date: string; // ISO Date String
}

export default function PlanetaryView({ date }: PlanetaryViewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Planets to render (Inner + Jupiter)
        const planets: { name: PlanetName, color: string, scale: number }[] = [
            { name: 'Mercury', color: '#9CA3AF', scale: 0.4 }, // Gray
            { name: 'Venus', color: '#FCD34D', scale: 0.7 },   // Gold
            { name: 'Earth', color: '#60A5FA', scale: 1.0 },   // Blue
            { name: 'Mars', color: '#EF4444', scale: 1.5 },    // Red
            { name: 'Jupiter', color: '#F97316', scale: 5.2 }, // Orange
        ];

        // Animation Loop (Orbiting effect just for visual liveliness, or static for accuracy?)
        // Requirement: "Real Data". Static accurate map is better for "Real Data" claim.
        // However, "High Quality" usually implies motion.
        // Compromise: Draw ACCURATE position for the date, but add subtle pulse/glow.

        let animationFrame: number;
        let time = 0;

        const render = () => {
            time += 0.05;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const maxRadius = Math.min(cx, cy) * 0.45; // Keep margins

            // Draw Sun
            ctx.beginPath();
            ctx.arc(cx, cy, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#FFF';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Planets
            planets.forEach(planet => {
                // Get Real Position
                // Note: getPlanetStateVector returns HelioVector {x, y, z} in AU
                // We project x,y to 2D canvas.
                try {
                    const state = getPlanetStateVector(planet.name, date);
                    const { x, y } = state.position;

                    // Normalize Radius for Visuals
                    // Real Scale is too sparse. We use logarithmic or fixed visual steps.
                    // Let's use specific Orbit Radii for visual clarity (Visualizing the Angle is what matters for Geometry)

                    // Calculate Angle regardless of distance
                    const angle = Math.atan2(y, x);

                    // Visual Radius (Steps)
                    // Mercury (0) -> Jupiter (4)
                    const visualRadius = 30 + (planets.indexOf(planet) + 1) * (maxRadius / 6) * 1.5;

                    // Draw Orbit Path
                    ctx.beginPath();
                    ctx.arc(cx, cy, visualRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Draw Planet
                    const px = cx + Math.cos(angle) * visualRadius;
                    const py = cy + Math.sin(angle) * visualRadius;

                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fillStyle = planet.color;
                    ctx.shadowColor = planet.color;
                    ctx.shadowBlur = 10;
                    ctx.fill();

                    // Label (Optional, maybe too cluttered on mobile)
                    // ctx.font = '8px monospace';
                    // ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    // ctx.fillText(planet.name.toUpperCase(), px + 8, py + 8);

                    // Connection Line to Sun (Subtle)
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.02)`;
                    ctx.stroke();

                } catch (e) {
                    console.error("Orbit Error", e);
                }
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, [date]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
