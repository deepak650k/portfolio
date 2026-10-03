import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, GraduationCap } from 'lucide-react';

export default function WelcomeAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Expanded duration: ~3.2s of cinematic showcase before raising the curtain
    const timer = setTimeout(() => {
      handleExit();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 750); // Matches the expanded curtain exit slide transition
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-curtain"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          }}
          onClick={handleExit}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden cursor-pointer"
        >
          {/* 1. Ambient Lighting & Micro-Grid Blueprint Background */}
          <div 
            className="absolute inset-0 opacity-[0.16] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
            }}
          />

          {/* 2. Floating Atmospheric Aurora Nebula Glow Orbs */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.25, 1.1], 
              opacity: [0, 0.45, 0.35] 
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/35 via-indigo-500/25 to-cyan-400/25 rounded-full blur-[140px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
            
            {/* Top Glowing Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/40 shadow-xl shadow-brand-500/20 text-xs font-mono uppercase tracking-widest text-brand-300 mb-6 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-cyan-400 animate-spin-slow" />
              <span>Welcome to my Portfolio</span>
            </motion.div>

            {/* Monogram Box with Animated Glow Halo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-3xl shadow-2xl shadow-brand-500/40 mb-6"
            >
              <span>DK</span>
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 opacity-60 blur-md -z-10 animate-pulse"></div>
            </motion.div>

            {/* Main Name Heading with Luxury Metallic Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-white mb-4"
            >
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Deepak{' '}
              </span>
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Kumawat
              </span>
            </motion.h1>

            {/* Expanding Laser Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="w-56 sm:w-72 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mb-4"
            />

            {/* Subtitle / Focus Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-mono text-slate-300 tracking-wide mb-3"
            >
              B.Tech • Artificial Intelligence &amp; Web Developer
            </motion.p>

            {/* University & Location Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 text-[11px] font-mono text-slate-400 bg-slate-900/60 px-3 py-1 rounded-xl border border-slate-800"
            >
              <span className="flex items-center gap-1 text-brand-400">
                <GraduationCap size={13} />
                <span>JECRC University</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin size={12} className="text-rose-400" />
                <span>Jaipur, India</span>
              </span>
            </motion.div>

          </div>

          {/* Quick Click to Skip Hint at Bottom */}
          <div className="absolute bottom-6 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
            Click anywhere to enter &rarr;
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
