import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground - High-End Luxury Tech Atmosphere
 * Features:
 * - Subtle ambient radial glows in midnight sapphire & deep slate
 * - Micro-grid with radial spotlight mask for depth
 * - Calm, slow-drifting luminous starlight motes
 * - Battery-friendly visibility pause & high-DPI scaling
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

    // Luxury Tech Palette (Subtle Sapphire, Soft Ice Blue, Pure White)
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Crisp White
      { r: 147, g: 197, b: 253 }, // Soft Blue 300
      { r: 186, g: 230, b: 253 }, // Sky 200
      { r: 203, g: 213, b: 225 }  // Slate 300
    ];

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 25 : 50;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.3 + 0.5,
        baseAlpha: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
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

      // Render calm luxury starlight motes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        s.phase += s.pulseSpeed;
        const alpha = Math.max(0.06, s.baseAlpha + Math.sin(s.phase) * 0.18);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.fill();

        // Subtle specular halo for primary stars
        if (s.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.12})`;
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
      {/* 1. Precision Luxury Micro-Dot Grid with Spotlight Falloff */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] transition-opacity duration-500"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 90%)'
        }}
      />

      {/* 2. Deep Obsidian & Midnight Sapphire Ambient Atmosphere (Quiet Luxury) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-blue-600/[0.07] dark:bg-blue-600/[0.10] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.05] dark:bg-indigo-500/[0.08] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-sky-500/[0.04] dark:bg-sky-500/[0.07] blur-[170px] pointer-events-none" />

      {/* 3. Star Dust Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
