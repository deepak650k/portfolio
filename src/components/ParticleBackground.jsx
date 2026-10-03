import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground - Calm, Luxurious, Battery-Friendly Atmospheric Space
 * Refined based on feedback:
 * - Removed distracting scanlines and fast meteors
 * - Smooth, subtle, floating starlight particles (calm 60fps drift)
 * - Atmospheric deep sapphire and slate ambient glow
 * - Precision dot-grid with soft radial vignette
 * - 0% distraction, 100% executive elegance
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle star colors (Soft silver, faint sky blue, soft white)
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Pure White
      { r: 226, g: 232, b: 240 }, // Slate 200
      { r: 186, g: 230, b: 253 }, // Sky 200
      { r: 147, g: 197, b: 253 }  // Blue 300
    ];

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 22 : 45;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18, // Ultra gentle drift
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.3 + 0.6,
        baseAlpha: Math.random() * 0.35 + 0.15,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        color
      });
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render calm, twinkling starlight motes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;

        // Seamless wrap
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        s.phase += s.pulseSpeed;
        const alpha = Math.max(0.08, s.baseAlpha + Math.sin(s.phase) * 0.2);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.fill();

        // Subtle soft corona on brighter stars
        if (s.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* 1. Precision Subtle Dot Grid with Radial Fade */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.14] transition-opacity duration-500"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 95%)'
        }}
      />

      {/* 2. Calm, Deep Ambient Sapphire & Slate Glows (Smooth, Non-distracting) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-blue-600/[0.07] dark:bg-blue-600/[0.11] blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[550px] h-[550px] rounded-full bg-indigo-600/[0.06] dark:bg-indigo-600/[0.09] blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-slate-500/[0.04] dark:bg-slate-400/[0.06] blur-[140px] pointer-events-none" />

      {/* 3. Calm 60fps Star Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
