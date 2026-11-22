import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  FileText,
  ChevronDown,
  Sparkles,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const roles = [
    'AI & Web Developer',
    'Generative AI Explorer',
    'Full-Stack Engineer',
    'Productivity System Builder',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, [roles.length]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle dot-grid background — CSS only, no JS animation */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Single soft accent glow — only one, no pulsing */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-600/10 dark:bg-brand-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to Internships & Opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-5"
            >
              Hi, I'm{' '}
              <span className="text-brand-600 dark:text-brand-400">
                {personalInfo.name.split(' ')[0]}
              </span>
              .
            </motion.h1>

            {/* Cycling role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-8 overflow-hidden mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-300"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-9 max-w-lg"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-brand-600/20 transition-all duration-200"
              >
                See My Projects <ArrowRight size={15} />
              </button>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:scale-[0.98] font-semibold text-sm transition-all duration-200"
              >
                <FileText size={15} /> View Resume
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="flex items-center gap-1"
            >
              {[
                { href: personalInfo.githubUrl, Icon: Github, label: 'GitHub' },
                { href: personalInfo.linkedinUrl, Icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Identity card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {/* Card header strip */}
              <div className="h-1.5 w-full bg-brand-600" />

              <div className="p-7">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md shadow-brand-600/30">
                    DK
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                      {personalInfo.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      B.Tech CSE (AI/ML)
                    </div>
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-4 mb-7">
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap size={15} className="text-brand-500 shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">JECRC University, 2026–2030</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={15} className="text-brand-500 shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Jaipur, Rajasthan, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Sparkles size={15} className="text-brand-500 shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">AI · Web Dev · Productivity</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                  {/* Stack */}
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'Tailwind', 'Generative AI', 'Vite'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-5 pt-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open for tech opportunities
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 transition-colors group"
            aria-label="Scroll to about"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest">Explore</span>
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
