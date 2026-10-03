import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

const greetings = [
  { text: "Hello", sub: "English" },
  { text: "नमस्ते", sub: "Hindi" },
  { text: "Welcome", sub: "Welcome" },
];

export default function WelcomeAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showIdentity, setShowIdentity] = useState(false);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Cycle through multilingual greetings with comfortable duration
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          clearInterval(greetingInterval);
          setShowIdentity(true);
          return prev;
        }
      });
    }, 750);

    // Auto-transition to portfolio after the expanded grand reveal (~5.2s total)
    const exitTimer = setTimeout(() => {
      handleExit();
    }, 5200);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleExit = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 750); // Matches exit slide transition
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
          {/* 1. Precision Cybernetic Tech Blueprint Grid */}
          <div 
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 35%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 80%)'
            }}
          />

          {/* 2. Deep Atmospheric Cosmic Nebula Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1], 
              opacity: [0.3, 0.5, 0.35],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-brand-600/30 via-purple-600/25 to-amber-500/20 rounded-full blur-[140px] pointer-events-none"
          />

          {/* Glowing Center Ring Horizon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-violet-500/15 pointer-events-none animate-ping [animation-duration:3s]"></div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl min-h-[280px] justify-center">
            
            {/* STAGE 1: Apple-style Multilingual Word Morph (First ~1.6s) */}
            {!showIdentity ? (
              <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={greetingIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(6px)', scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(6px)', scale: 1.05 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Ambient soft glow aura behind text */}
                      <div className="absolute -inset-8 bg-gradient-to-r from-violet-600/30 via-rose-500/25 to-amber-500/20 blur-3xl rounded-full -z-10 pointer-events-none" />

                      <span className="text-6xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight bg-gradient-to-r from-amber-200 via-rose-300 via-purple-300 to-violet-400 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]">
                        {greetings[greetingIndex].text}
                      </span>

                      {/* Luminous Cybernetic Language Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-violet-400/40 text-violet-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(139,92,246,0.3)] mt-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                        </span>
                        <span className="font-semibold text-amber-200">{greetings[greetingIndex].sub}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* STAGE 2: Deepak Kumawat Grand Identity Reveal (~1.6s to 3.6s) */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Monogram Box with Rotating Holographic Glow Ring */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-amber-500 text-white font-extrabold text-3xl shadow-2xl shadow-violet-500/40 mb-5"
                >
                  <span>D</span>
                  {/* Conic glowing halo */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-violet-500 via-rose-400 to-amber-400 opacity-70 blur-lg -z-10 animate-pulse"></div>
                </motion.div>

                {/* Name with Liquid Metallic Shimmer - First Name Only */}
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight mb-3"
                >
                  <span className="bg-gradient-to-r from-violet-400 via-rose-300 via-amber-300 to-violet-400 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
                    Deepak
                  </span>
                </motion.h1>

                {/* Expanding Laser Beam Line with Glowing End Sparks */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-64 sm:w-80 h-0.5 bg-gradient-to-r from-transparent via-amber-400 via-violet-400 to-transparent rounded-full mb-4"
                >
                  <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 blur-xs animate-ping"></div>
                </motion.div>

                {/* Subtitle / Focus Statement */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs sm:text-sm font-mono text-slate-300 tracking-wide mb-3"
                >
                  B.Tech • Artificial Intelligence &amp; Web Developer
                </motion.p>

                {/* University & Location Capsule */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-3 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-lg backdrop-blur-md"
                >
                  <span className="flex items-center gap-1.5 text-brand-400">
                    <GraduationCap size={13} />
                    <span>JECRC University</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin size={12} className="text-rose-400" />
                    <span>Jaipur, India</span>
                  </span>
                </motion.div>
              </motion.div>
            )}

          </div>

          {/* Bottom Luxury Skip Action Pill */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-7 flex items-center gap-2 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors py-1.5 px-3.5 rounded-full border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm"
          >
            <span>Click anywhere to explore</span>
            <ArrowRight size={12} className="text-brand-400" />
          </motion.div>

          {/* Bottom Horizon Accent Beam that sweeps up with the curtain */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 via-rose-500 via-brand-500 to-transparent shadow-[0_0_20px_rgba(244,63,94,0.8)]"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
