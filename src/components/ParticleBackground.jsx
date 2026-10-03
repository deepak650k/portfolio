import React, { useEffect, useState } from 'react';

export default function ParticleBackground() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* 1. Precision Cybernetic Grid Pattern with Radial Vignette Mask */}
      <div 
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.22] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 30%, transparent 85%)'
        }}
      />

      {/* 2. Interactive Ambient Mouse Spotlight Beam */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-60 dark:opacity-80"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.12), transparent 70%)`
        }}
      />

      {/* 3. High-End Atmospheric Aurora Glow Nebulae */}
      <div className="absolute -top-32 left-1/4 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-brand-600/25 via-indigo-500/20 to-cyan-400/20 blur-[130px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/4 right-[-80px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-cyan-500/15 blur-[140px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-1/3 w-[600px] h-[350px] rounded-full bg-gradient-to-t from-cyan-600/15 via-brand-500/10 to-transparent blur-[120px] pointer-events-none"></div>

      {/* 4. Subtle Ambient Horizontal Beam on Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
    </div>
  );
}
