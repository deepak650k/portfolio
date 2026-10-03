import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight,
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  ChevronDown,
  Code2,
  Sparkles,
  Bot,
  Terminal,
  Layers,
  FileText
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import InteractiveTerminalCard from './InteractiveTerminalCard';

/**
 * Hero - High-End Luxury Tech & Executive Developer Dossier
 * Designed to impress top recruiters, engineering leaders, and clients.
 */
export default function Hero() {
  const roles = [
    "Full-Stack Web Architect",
    "Autonomous AI Agent Builder",
    "B.Tech Computer Science Student",
    "Digital Systems & DSA Engineer"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
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
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Executive Headline & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Status Pill: Available for Roles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full luxury-badge text-xs font-medium text-slate-200 mb-6 backdrop-blur-xl"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering Roles</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono text-[11px]">JECRC University</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08] mb-5">
              Engineering scalable systems &{' '}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                intelligent AI agents.
              </span>
            </h1>

            {/* Name & Kinetic Role Cycler */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-base sm:text-lg font-medium text-slate-400 font-sans">
                Hi, I'm <strong className="text-white font-semibold">{personalInfo.name}</strong> —
              </span>

              <div className="h-8 inline-flex items-center px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                <div className="h-5 overflow-hidden relative flex items-center min-w-[240px] sm:min-w-[270px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 font-mono text-xs sm:text-sm font-semibold text-sky-400 whitespace-nowrap"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Professional Narrative Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8 font-sans">
              B.Tech Computer Science student building production-ready web applications and autonomous agent pipelines. Driven by system performance, clean architectural design, and modern interactive experiences.
            </p>

            {/* Executive Action Controls */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              
              {/* Primary Action Button: White Luxury Pill */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-xl shadow-white/10 transition-all cursor-pointer group"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={16} className="text-slate-900 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Secondary Action Button: Frosted Glass Pill */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.12] hover:border-white/[0.22] backdrop-blur-xl transition-all cursor-pointer shadow-lg shadow-black/20"
              >
                <Mail size={16} className="text-slate-400" />
                <span>Get In Touch</span>
              </motion.button>

            </div>

            {/* Trust Meta & Social Nodes */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08] w-full max-w-xl">
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all"
                  aria-label="Email Deepak"
                >
                  <Mail size={17} />
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono ml-auto">
                <MapPin size={13} className="text-blue-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Executive Interactive Bento Matrix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <InteractiveTerminalCard />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Discover More</span>
            <ChevronDown size={18} className="text-slate-400 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
}
