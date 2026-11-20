import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    try { sessionStorage.setItem('hasSeenWelcome', 'true'); } catch {}

    const exitTimer = setTimeout(() => handleExit(), 1500);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') handleExit();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExit = () => {
    try { sessionStorage.setItem('hasSeenWelcome', 'true'); } catch {}
    setIsVisible(false);
    setTimeout(() => onComplete?.(), 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          onClick={handleExit}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950 cursor-pointer select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            {/* Monogram */}
            <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-2xl">
              DK
            </div>

            {/* Name */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Deepak Kumawat
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">
                B.Tech · AI & Web Development
              </p>
            </div>

            {/* Loading bar */}
            <div className="w-32 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-brand-600 rounded-full"
              />
            </div>
          </motion.div>

          <p className="absolute bottom-8 text-xs text-slate-400 dark:text-slate-600 font-mono">
            Click to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
