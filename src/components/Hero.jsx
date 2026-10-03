import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  ChevronDown
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ParticleBackground from './ParticleBackground';
import InteractiveTerminalCard from './InteractiveTerminalCard';

export default function Hero() {
  const roles = [
    "B.Tech Student | AI Enthusiast",
    "Full-Stack Web Developer",
    "Generative AI & Python Builder",
    "Digital Productivity Architect"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
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

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.section 
      id="hero" 
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950/20"
    >
      {/* Interactive Neural Canvas Background */}
      <ParticleBackground />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-float"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-64 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Greeting Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-50/80 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Projects &amp; Internships</span>
              <Sparkles size={14} className="text-amber-500" />
            </motion.div>

            {/* Name Heading with Gradient Glow */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4"
            >
              I'm{' '}
              <span className="bg-gradient-to-r from-brand-500 via-indigo-400 via-cyan-400 to-brand-500 bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent drop-shadow-sm">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Kinetic Role Showcase with Smooth Vertical Flip */}
            <motion.div
              variants={itemVariants}
              className="h-11 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md backdrop-blur-md mb-6"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shrink-0">
                <GraduationCap size={16} />
              </div>
              <div className="h-6 overflow-hidden relative flex items-center min-w-[270px] sm:min-w-[310px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0, filter: 'blur(3px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 font-mono text-sm sm:text-base font-bold bg-gradient-to-r from-brand-600 via-indigo-500 to-cyan-500 dark:from-brand-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Short Professional Introduction */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* Action Buttons with High-End Shimmer and Magnetic Hover */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('projects')}
                className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Subtle animated light gleam on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="relative">View Projects</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-base bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 hover:border-brand-500/50 shadow-md backdrop-blur-md transition-all duration-300 cursor-pointer group"
              >
                <Mail size={18} className="text-brand-500 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </motion.button>
            </motion.div>

            {/* Social Links & Quick Meta */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect With Me
              </div>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -4 }}
                  whileTap={{ scale: 0.92 }}
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.92 }}
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, rotate: -4 }}
                  whileTap={{ scale: 0.92 }}
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm"
                  aria-label="Email Deepak"
                >
                  <Mail size={18} />
                </motion.a>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium ml-auto">
                <MapPin size={14} className="text-rose-500" />
                <span>{personalInfo.location}</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Multi-Tab Terminal with Soft Floating Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.2 },
              scale: { duration: 0.7, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="lg:col-span-5 relative"
          >
            <InteractiveTerminalCard />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-500 transition-colors animate-bounce"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Explore Portfolio</span>
            <ChevronDown size={18} />
          </button>
        </div>

      </div>
    </motion.section>
  );
}
