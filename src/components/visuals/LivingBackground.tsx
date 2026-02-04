import React from 'react';

const LivingBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
      {/* Base Grid - Slow Movement */}
      <div
        className="absolute inset-[-100%] w-[300%] h-[300%] opacity-[0.15] animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top center'
        }}
      />

      {/* Radial Fade for Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_85%)]" />

      {/* Floating "Data Dust" Particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
    </div>
  );
};

export default LivingBackground;
