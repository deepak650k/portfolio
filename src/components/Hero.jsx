import React, { useState, useEffect, useRef } from 'react';
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
  Volume2,
  Bot,
  Layers,
  FolderGit2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { MOTION_TOKENS, fadeInUp, fadeInScale, microInteractions, staggerContainer } from '../utils/motion';

/**
 * Hero - High-End Centered Developer Hero with Interactive 3D Tilt Card,
 * Magnetic Glass Dock, and Synthesized Audio Chime.
 */
export default function Hero() {
  const roles = [
    "Full-Stack Web Architect",
    "Autonomous AI Agent Builder",
    "Generative AI & Python Engineer",
    "B.Tech Computer Science Student"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  // 3D Tilt State & Specular Glare
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isAudioPlayed, setIsAudioPlayed] = useState(false);

  // Kinetic specialization cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Gentle Crystal Audio Chime (Web Audio API)
  const playAudioChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      // Gentle 3-note harmonic chime (C5, E5, G5)
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.035, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.65);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
      setIsAudioPlayed(true);
      setTimeout(() => setIsAudioPlayed(false), 800);
    } catch {
      // Audio fallback safe
    }
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

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

  const openCampusBuddy = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    } else {
      const btn = document.querySelector('#bp-web-widget-container button, .bp-widget-web button, [aria-label*="chat" i]');
      if (btn) btn.click();
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      <motion.div 
        variants={staggerContainer(0.07, 0.05)}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center"
      >
        
        {/* 1. Status Pill: Availability & Academy */}
        <motion.div
          variants={fadeInScale(0.94)}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 mb-6 backdrop-blur-xl shadow-sm"
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
          variants={fadeInScale(0.85)}
          whileHover={{ scale: 1.05 }}
          className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 border border-slate-700/80 text-white font-extrabold text-2xl shadow-xl shadow-blue-500/15 mb-6 cursor-default"
        >
          <span>DK</span>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/15 blur-lg -z-10" />
        </motion.div>

        {/* 3. Main Headline */}
        <motion.h1
          variants={fadeInUp(20, MOTION_TOKENS.duration.hero)}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08] mb-5 max-w-3xl"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">{personalInfo.name}</span>.
          <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            Crafting scalable web systems &amp; intelligent AI.
          </span>
        </motion.h1>

        {/* 4. Kinetic Specialization Cycler */}
        <motion.div
          variants={fadeInUp(16, MOTION_TOKENS.duration.ui)}
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
          variants={fadeInUp(16, MOTION_TOKENS.duration.ui)}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans"
        >
          B.Tech Computer Science student at JECRC University building modern, high-performance web applications and intelligent AI agent workflows. Dedicated to clean architecture, intuitive design, and production engineering.
        </motion.p>

        {/* 6. Creative Interactive 3D Perspective Tilt Card */}
        <motion.div
          variants={fadeInUp(24, MOTION_TOKENS.duration.section)}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.12s ease-out'
          }}
          className="relative w-full max-w-xl p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] shadow-2xl backdrop-blur-2xl text-left select-none mb-10 overflow-hidden group cursor-pointer"
        >
          {/* Dynamic Specular Glare Effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`
            }}
          />

          {/* Top Row: Interactive Status & Audio Chime Action */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-white font-mono">
                ENGINEERING STATUS: ACTIVE
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudioChime();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-mono transition-all cursor-pointer"
              title="Click to play interactive UI chime"
            >
              <Volume2 size={13} className={isAudioPlayed ? 'animate-bounce text-emerald-400' : ''} />
              <span>{isAudioPlayed ? 'CHIMED ♪' : 'PLAY CHIME'}</span>
            </button>
          </div>

          {/* Center Content: Interactive Tech Arsenal Chips */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Interactive Tech Arsenal (Hover chips):
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'React 18', tag: 'UI Library' },
                { name: 'Python 3', tag: 'Core AI' },
                { name: 'Tailwind CSS', tag: 'Styling' },
                { name: 'Gemini API', tag: 'LLM Agent' },
                { name: 'FastAPI', tag: 'Backend' },
                { name: 'DSA & Systems', tag: 'Algorithms' }
              ].map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-blue-400/40 text-xs text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer: Location & Academy Coordinates */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-blue-400" />
              <span>Jaipur, Rajasthan [26.9°N, 75.8°E]</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">3D Gyro Perspective Active</span>
          </div>
        </motion.div>

        {/* 7. Floating Magnetic Interactive Glass Dock */}
        <motion.div
          variants={fadeInUp(18, MOTION_TOKENS.duration.ui)}
          className="flex items-center gap-1.5 sm:gap-2 p-2 rounded-2xl bg-slate-900/80 border border-white/[0.1] backdrop-blur-xl shadow-2xl mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollTo('projects')}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-blue-600 hover:text-white text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Projects"
          >
            <FolderGit2 size={16} />
            <span className="hidden sm:inline">Projects</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollTo('skills')}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-sky-600 hover:text-white text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Skills"
          >
            <Layers size={16} />
            <span className="hidden sm:inline">Skills</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => scrollTo('contact')}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-indigo-600 hover:text-white text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Contact"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Contact</span>
          </motion.button>

          <div className="w-px h-5 bg-white/[0.1] mx-0.5" />

          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github size={16} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={openCampusBuddy}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
            title="Chat with Campus Buddy AI"
          >
            <Bot size={16} />
            <span className="hidden sm:inline">AI Chat</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-6">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            aria-label="Scroll to About section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Explore Portfolio</span>
            <ChevronDown size={16} className="text-slate-500 animate-bounce" />
          </button>
        </div>

      </motion.div>
    </section>
  );
}
