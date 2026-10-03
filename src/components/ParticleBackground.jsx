import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ParticleBackground - Glowing Aurora Mesh & Interactive Mouse Spotlight
 * Fluid, luminous cosmic aurora gradients that breathe in the background,
 * paired with a responsive cursor spotlight and gentle starlight motes.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  // Track smooth cursor spotlight (desktop only with fine pointer)
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsDesktopPointer(hasFinePointer);
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Glowing starlight palette
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Crisp White
      { r: 147, g: 197, b: 253 }, // Soft Blue
      { r: 196, g: 181, b: 253 }, // Lavender Purple
      { r: 167, g: 243, b: 208 }  // Soft Mint
    ];

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 24 : 45;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.4 + 0.6,
        baseAlpha: Math.random() * 0.4 + 0.12,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.016 + 0.006,
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

      // Render gentle starlight motes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        s.phase += s.pulseSpeed;
        const alpha = Math.max(0.06, s.baseAlpha + Math.sin(s.phase) * 0.2);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.fill();

        // Subtle specular halo for primary motes
        if (s.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
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
      
      {/* 1. Interactive Cursor Radial Spotlight (Desktop pointer only) */}
      {isDesktopPointer && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none transition-all duration-300 ease-out opacity-40 dark:opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.10) 45%, transparent 70%)',
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          }}
        />
      )}

      {/* 2. Fluid Glowing Aurora Mesh Ribbons */}
      {/* Aurora Orb 1: Deep Indigo & Sapphire (Top Center) */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
          opacity: [0.18, 0.28, 0.18]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-400 blur-[150px] pointer-events-none"
      />

      {/* Aurora Orb 2: Luminous Violet & Amethyst (Top Right) */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[20%] right-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 blur-[160px] pointer-events-none"
      />

      {/* Aurora Orb 3: Soft Emerald & Cyan Glow (Center Left) */}
      <motion.div 
        animate={{
          scale: [1, 1.18, 1],
          x: [0, 40, 0],
          y: [0, -40, 0],
          opacity: [0.10, 0.18, 0.10]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[45%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 blur-[150px] pointer-events-none"
      />

      {/* Aurora Orb 4: Deep Midnight Blue Foundation (Bottom Center) */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-1/3 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-blue-900 via-indigo-800 to-sky-600 blur-[160px] pointer-events-none"
      />

      {/* 3. Subtle Luxury Micro-Dot Grid with Spotlight Falloff */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09] transition-opacity duration-500"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 40%, transparent 95%)'
        }}
      />

      {/* 4. Canvas Starlight Dust */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
