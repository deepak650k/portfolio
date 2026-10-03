import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const words = [
      { text: 'Hello', at: 15 },
      { text: 'नमस्ते', at: 40 },
      { text: 'Welcome', at: 70 },
      { text: 'Deepak Kumawat', at: 95 }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const matchingWord = words.find(w => Math.abs(w.at - next) <= 2);
        if (matchingWord) {
          setStatusText(matchingWord.text);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onComplete?.();
            }, 650);
          }, 200);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            
            {/* Monogram with animated glowing ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-3xl shadow-2xl shadow-brand-500/30 mb-8"
            >
              <span>DK</span>
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400 opacity-60 blur-md -z-10 animate-pulse"></div>
            </motion.div>

            {/* Dynamic Morphing Word */}
            <div className="h-10 flex items-center justify-center mb-6">
              <motion.span
                key={statusText}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-heading font-bold text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
              >
                {statusText}
              </motion.span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-1.5 overflow-hidden p-0.5 mb-3 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between w-full text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-brand-500" />
                <span>loading portfolio</span>
              </span>
              <span>{progress}%</span>
            </div>

          </div>

          {/* Quick Skip button */}
          <button
            onClick={() => {
              setIsDone(true);
              setTimeout(() => onComplete?.(), 200);
            }}
            className="absolute bottom-8 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer py-1 px-3 rounded-lg border border-transparent hover:border-slate-800"
          >
            Skip intro &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
