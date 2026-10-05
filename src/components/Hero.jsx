import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles, 
  Code, 
  Cpu, 
  GraduationCap, 
  MapPin, 
  ChevronDown,
  FileText
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const roles = [
    personalInfo.headline,
    "B.Tech CSE Student @ JECRC University",
    "Generative AI & Machine Learning Explorer",
    "Modern Full-Stack Web Developer",
    "Digital Productivity System Designer"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Smooth role text cycler (3.2s interval)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [roles.length]);

  // 3D card tilt tracking
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-dot-grid"
    >
      {/* Background ambient lighting orbs with subtle pulse */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div 
        animate={{ y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/15 dark:bg-teal-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-64 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Greeting Pill */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-50/80 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Hello, Welcome to my Portfolio</span>
              <Sparkles size={14} className="text-amber-500" />
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4"
            >
              I'm{' '}
              <span className="bg-gradient-to-r from-brand-600 via-teal-600 to-cyan-500 dark:from-brand-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Role & Kinetic Headline Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base sm:text-lg md:text-xl mb-6 shadow-sm min-h-[46px]"
            >
              <GraduationCap className="text-brand-500 shrink-0" size={22} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Short Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('projects')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base bg-gradient-to-r from-brand-600 to-brand-secondary hover:from-brand-500 hover:to-brand-secondary-light text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResumeOpen(true)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-base bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30 transition-all duration-200 shadow-sm"
              >
                <FileText size={18} className="transition-transform duration-200 group-hover:scale-110" />
                <span>View Resume</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('contact')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-base bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow transition-all duration-200"
              >
                <Mail size={18} className="text-brand-500 transition-transform duration-200 group-hover:scale-110" />
                <span>Contact Me</span>
              </motion.button>
            </motion.div>

            {/* Social Links & Quick Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect With Me
              </div>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.92 }}
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.92 }}
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.92 }}
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow"
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

          </div>

          {/* Right Column: Visual Interactive Student Profile Card with 3D Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative mx-auto max-w-md w-full"
            >
              
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 via-brand-secondary to-brand-400 opacity-30 blur-xl"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 backdrop-blur-xl">
                
                {/* Header of card with simulated code tab */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 font-mono text-xs text-slate-400">deepak_profile.json</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium">
                    ACTIVE
                  </span>
                </div>

                {/* Profile snippet */}
                <div className="py-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ duration: 0.2 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-500/30"
                    >
                      DK
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                        {personalInfo.name}
                      </h3>
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        {personalInfo.college}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-rose-500" />
                        Jaipur, India
                      </p>
                    </div>
                  </div>

                  {/* Code-like JSON snippet */}
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800 shadow-inner">
                    <p><span className="text-purple-400">const</span> <span className="text-blue-400">student</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-400">"{personalInfo.name}"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">degree:</span> <span className="text-emerald-400">"B.Tech"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">institution:</span> <span className="text-emerald-400">"JECRC University"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">passions:</span> [<span className="text-amber-400">"AI"</span>, <span className="text-amber-400">"Web Dev"</span>, <span className="text-amber-400">"Productivity"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-cyan-400">"Building & Learning"</span></p>
                    <p>&#125;;</p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                        <Cpu size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Domain</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">AI & Tech</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <Code size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Craft</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Modern Web</div>
                      </div>
                    </motion.div>
                  </div>

                </div>

                {/* Footer of card */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ready to build impactful solutions
                  </span>
                  <button 
                    onClick={() => scrollTo('about')}
                    className="hover:text-brand-500 font-medium transition-colors flex items-center gap-1 group"
                  >
                    <span>Learn more</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>

              </div>

              {/* Floating tech badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 text-white border border-slate-700/80 shadow-xl backdrop-blur-md"
              >
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-xs font-semibold">Generative AI Enthusiast</span>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-500 transition-colors animate-bounce"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Scroll Down</span>
            <ChevronDown size={18} />
          </button>
        </div>

      </div>

      {/* Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
}
