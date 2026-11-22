import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = "Deepak".split("");

export default function WelcomeAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { onComplete?.(); return; }
    try { sessionStorage.setItem('hasSeenWelcome', 'true'); } catch {}

    const exitTimer = setTimeout(() => handleExit(), 2200);
    const handleKeyDown = (e) => {
      if (['Escape','Enter',' '].includes(e.key)) handleExit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { clearTimeout(exitTimer); window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  const handleExit = () => {
    try { sessionStorage.setItem('hasSeenWelcome', 'true'); } catch {}
    setIsVisible(false);
    setTimeout(() => onComplete?.(), 700);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          onClick={handleExit}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 cursor-pointer select-none"
          role="dialog" aria-modal="true"
        >
          {/* Subtle top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-brand-600 origin-left"
          />

          <div className="flex flex-col items-center gap-6">
            {/* Letter-by-letter name reveal */}
            <div className="flex items-baseline gap-0 overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-8xl font-extrabold text-white tracking-tight font-heading"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Role + university */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-center space-y-1"
            >
              <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">
                B.Tech · AI & Web Development
              </p>
              <p className="text-slate-600 text-xs font-mono">
                JECRC University, Jaipur
              </p>
            </motion.div>

            {/* Thin animated line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-px bg-brand-600"
            />
          </div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 text-xs text-slate-700 font-mono tracking-wider"
          >
            click anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
