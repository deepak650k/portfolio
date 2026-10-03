import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  ChevronDown,
  Sparkles,
  Code2,
  Cpu,
  GraduationCap,
  Zap,
  Globe2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * Hero - Clean, Centered Modern Silicon Valley Developer Hero
 * Balanced, elegant, and authentic without cluttered widget boxes.
 */
export default function Hero() {
  const roles = [
    "Full-Stack Web Architect",
    "Autonomous AI Agent Builder",
    "Generative AI & Python Engineer",
    "B.Tech Computer Science Student"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-sky-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* 1. Status Pill: Availability & Academy */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 mb-8 backdrop-blur-xl shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Summer '25 &amp; Full-Time Roles</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px]">JECRC University</span>
        </motion.div>

        {/* 2. Developer Monogram / Profile Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 border border-slate-700/80 text-white font-extrabold text-2xl shadow-xl shadow-blue-500/15 mb-6 cursor-default"
        >
          <span>DK</span>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/15 blur-lg -z-10" />
        </motion.div>

        {/* 3. Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08] mb-5 max-w-3xl"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">{personalInfo.name}</span>.
          <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            Crafting scalable web systems &amp; intelligent AI.
          </span>
        </motion.h1>

        {/* 4. Kinetic Specialization Cycler */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="h-9 inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-6"
        >
          <Code2 size={15} className="text-blue-400 shrink-0" />
          <div className="h-5 overflow-hidden relative flex items-center min-w-[250px] sm:min-w-[280px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="absolute left-0 right-0 font-mono text-xs sm:text-sm font-semibold text-sky-400 text-center"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 5. Authentic, Grounded Narrative Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans"
        >
          B.Tech Computer Science student at JECRC University building modern, high-performance web applications and intelligent AI agent workflows. Dedicated to clean architecture, intuitive design, and production engineering.
        </motion.p>

        {/* 6. Executive Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {/* Primary Action Button: White Luxury Pill */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 transition-all cursor-pointer group"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="text-slate-900 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary Action Button: Frosted Glass Pill */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 backdrop-blur-xl transition-all cursor-pointer shadow-lg shadow-black/20"
          >
            <Mail size={16} className="text-slate-400" />
            <span>Get In Touch</span>
          </motion.button>
        </motion.div>

        {/* 7. Quick Highlights & Social Node Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-800/80 w-full max-w-xl text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              aria-label="Email Deepak"
            >
              <Mail size={16} />
            </a>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <MapPin size={13} className="text-blue-400" />
            <span>{personalInfo.location}</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <GraduationCap size={13} className="text-sky-400" />
            <span>CSE Class of '27</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-14">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            aria-label="Scroll to About section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Explore Portfolio</span>
            <ChevronDown size={16} className="text-slate-500 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
}
