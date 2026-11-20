import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  FileText,
  ChevronDown
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const roles = [
    'B.Tech CSE Student @ JECRC University',
    'Generative AI & Machine Learning Explorer',
    'Modern Full-Stack Web Developer',
    'Digital Productivity System Designer',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Location pill */}
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
              <MapPin size={12} />
              <span>Jaipur, Rajasthan, India</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
              {personalInfo.name}
            </h1>

            {/* Cycling role */}
            <div className="h-7 overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base text-brand-600 dark:text-brand-400 font-medium"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-md">
              {personalInfo.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
              >
                View Projects <ArrowRight size={15} />
              </button>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
              >
                <FileText size={15} /> Resume
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right: Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              {/* Avatar row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  DK
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{personalInfo.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <GraduationCap size={12} /> {personalInfo.college}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800 mb-6" />

              {/* Info rows */}
              <div className="space-y-3 text-sm">
                {personalInfo.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-medium">{stat.label}</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold text-xs">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

              {/* Status */}
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open to internship opportunities
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-500 transition-colors"
            aria-label="Scroll to About"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
