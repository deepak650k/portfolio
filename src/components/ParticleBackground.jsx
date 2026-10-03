import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground - Futuristic Cyber HUD & Holographic Atmosphere
 * Features:
 * - Ambient Arc Reactor Cyan & Sapphire atmospheric glow
 * - Calm floating cyber starlight motes in electric cyan & ice blue
 * - Tactical holographic radar ring & telemetry coordinate grid
 * - High-DPI support, battery-friendly visibility pause
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

    // Cyber HUD Starlight Colors (Electric Cyan, Ice Blue, White)
    const starColors = [
      { r: 0, g: 240, b: 255 },   // Electric Neon Cyan
      { r: 56, g: 189, b: 248 },  // Sky 400
      { r: 147, g: 197, b: 253 }, // Blue 300
      { r: 255, g: 255, b: 255 }  // Pure White
    ];

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 22 : 45;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.4 + 0.6,
        baseAlpha: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.018 + 0.008,
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

      // Render calm cyber starlight motes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        s.phase += s.pulseSpeed;
        const alpha = Math.max(0.08, s.baseAlpha + Math.sin(s.phase) * 0.22);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.fill();

        // Subtle electric corona
        if (s.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.16})`;
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
      {/* 1. Precision Cybernetic Tactical Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.18] transition-opacity duration-500"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(0, 240, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 40%, transparent 95%)'
        }}
      />

      {/* 2. Deep Atmospheric Arc-Reactor Cyan & Sapphire Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.08] dark:bg-cyan-500/[0.12] blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[550px] h-[550px] rounded-full bg-blue-600/[0.06] dark:bg-blue-600/[0.10] blur-[160px] pointer-events-none" />

      {/* 3. Subtle Tactical HUD Holographic Radar Rings in Corner */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-cyan-500/10 pointer-events-none animate-spin-slow">
        <div className="absolute inset-8 rounded-full border border-dashed border-cyan-400/10"></div>
        <div className="absolute inset-20 rounded-full border border-cyan-300/[0.08]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-cyan-400/30">000° RADAR</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[9px] font-mono text-cyan-400/30">180° CORE</div>
      </div>

      {/* 4. Canvas Star Dust */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
