import React, { useEffect, useRef, useState } from 'react';

/**
 * ParticleBackground - High-Performance Canvas & Cybernetic Aurora Background
 * Features:
 * - 60fps HTML5 Canvas with glowing constellation star particles & filaments
 * - Interactive mouse physics (magnetic particle displacement & cursor laser threads)
 * - Random cosmic shooting stars (meteors) with luminous fading trails
 * - Slow-drifting atmospheric Aurora Nebulae (Violet, Sunset Rose, Amber Gold)
 * - Traveling cybernetic laser scanline beam
 * - Battery-friendly visibility awareness (pauses RAF when tab is hidden)
 * - High-DPI retina display support
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions corresponding to the Royal Violet, Rose & Amber luxury palette
    const colorPalette = [
      { r: 139, g: 92, b: 246 },  // Royal Violet (brand-500)
      { r: 196, g: 181, b: 253 }, // Soft Lavender
      { r: 244, g: 63, b: 94 },   // Sunset Rose
      { r: 245, g: 158, b: 11 },  // Amber Gold
      { r: 251, g: 191, b: 36 }   // Champagne
    ];

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 70;

    // Initialize particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        baseAlpha: Math.random() * 0.45 + 0.25,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color
      });
    }

    // Active Shooting Stars (Meteors)
    const meteors = [];
    let lastMeteorTime = Date.now();

    const spawnMeteor = () => {
      const startX = Math.random() * (width * 0.85);
      const startY = Math.random() * (height * 0.35);
      const length = Math.random() * 80 + 70;
      const speed = Math.random() * 6 + 9;
      const angle = (Math.PI / 180) * (35 + Math.random() * 15); // ~35 - 50 deg angle

      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.012
      });
    };

    // Resize handler with High-DPI support
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

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        lastMeteorTime = Date.now();
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

      // --- 1. Constellation Connection Lines ---
      const maxDistance = isMobile ? 90 : 120;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDistance) * 0.16;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // --- 2. Interactive Mouse Filaments & Repulsion ---
      const mouse = mouseRef.current;
      if (mouse.active) {
        const mouseRange = 145;
        const mouseRangeSq = mouseRange * mouseRange;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRangeSq) {
            const dist = Math.sqrt(distSq);

            // Subtle magnetic deflection to create fluid wakes
            if (dist < 55 && dist > 0) {
              p.x += (dx / dist) * 0.9;
              p.y += (dy / dist) * 0.9;
            }

            // Luminous laser thread connecting cursor to node
            const threadAlpha = (1 - dist / mouseRange) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${threadAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // --- 3. Update & Draw Particles (Stars) ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position progression
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries seamlessly
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Twinkle luminance modulation
        p.phase += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, p.baseAlpha + Math.sin(p.phase) * 0.25);

        // Render Star Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.fill();

        // Star corona soft glow
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.2})`;
          ctx.fill();
        }
      }

      // --- 4. Cosmic Meteors / Shooting Stars ---
      const now = Date.now();
      if (now - lastMeteorTime > 4200 && meteors.length < 2) {
        spawnMeteor();
        lastMeteorTime = now;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        // Tail calculation
        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
        meteorGrad.addColorStop(0.65, `rgba(244, 63, 94, ${m.alpha * 0.6})`);
        meteorGrad.addColorStop(1, `rgba(255, 245, 200, ${m.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Meteor Head Spark
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* 1. Precision Cybernetic Grid Pattern with Radial Vignette */}
      <div 
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.22] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 90%)'
        }}
      />

      {/* 2. Interactive Ambient Mouse Spotlight Beam */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-60 dark:opacity-85 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.13), transparent 70%)`
        }}
      />

      {/* 3. Deep Atmospheric Cosmic Nebula Orbs (Breathing & Rotating) */}
      <div className="absolute -top-32 left-1/4 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-brand-600/25 via-rose-500/20 to-amber-400/15 blur-[135px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-[-100px] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-brand-600/20 via-purple-600/15 to-rose-500/15 blur-[140px] animate-orbit-slow pointer-events-none" />
      <div className="absolute bottom-[-80px] left-1/3 w-[620px] h-[380px] rounded-full bg-gradient-to-t from-amber-600/12 via-brand-500/10 to-transparent blur-[130px] animate-float pointer-events-none" />
      <div className="absolute top-2/3 left-[-80px] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-rose-500/15 via-brand-600/10 to-transparent blur-[130px] pointer-events-none" />

      {/* 4. Traveling Futuristic Cyber Scanline Beam */}
      <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand-500/10 to-transparent pointer-events-none animate-cyber-scan" />

      {/* 5. 60fps HTML5 Canvas: Star Particles, Constellations, & Shooting Meteors */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Subtle Ambient Horizontal Horizon Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent pointer-events-none" />
    </div>
  );
}
