import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

export default function WelcomeAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Auto-transition after 1.35 seconds
    const timer = setTimeout(() => {
      handleExit();
    }, 1350);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 650); // Matches exit slide transition
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-curtain"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
          }}
          onClick={handleExit}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden cursor-pointer"
        >
          {/* Ambient Lighting & Micro-Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.16] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
            }}
          />

          {/* Central Atmospheric Glow Orbs */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.35] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-brand-600/30 via-indigo-500/25 to-cyan-400/25 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
            
            {/* Top Glowing Welcome Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-brand-500/40 shadow-lg shadow-brand-500/20 text-xs font-mono uppercase tracking-widest text-brand-300 mb-6"
            >
              <Sparkles size={13} className="text-cyan-400 animate-spin-slow" />
              <span>Welcome to my Portfolio</span>
            </motion.div>

            {/* Monogram Box */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-2xl shadow-2xl shadow-brand-500/40 mb-6"
            >
              <span>DK</span>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 opacity-60 blur-md -z-10 animate-pulse"></div>
            </motion.div>

            {/* Main Name Heading with Luxury Gradient Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 sm:w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mb-4"
            />

            {/* Subtitle / Focus Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide"
            >
              B.Tech • Artificial Intelligence &amp; Web Developer
            </motion.p>

          </div>

          {/* Quick Click to Skip Hint at Bottom */}
          <div className="absolute bottom-6 text-[11px] font-mono text-slate-600 hover:text-slate-400 transition-colors">
            Click anywhere to enter &rarr;
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
