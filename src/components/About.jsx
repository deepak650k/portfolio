import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Code2, 
  Cpu, 
  Target, 
  Clock, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { fadeInUp, staggerContainer, defaultViewport } from '../utils/motion';

export default function About() {
  const pillars = [
    {
      icon: Cpu,
      title: "Artificial Intelligence",
      description: "Fascinated by neural networks, LLMs, and prompt engineering to build smart software that augments human thinking."
    },
    {
      icon: Code2,
      title: "Web Development",
      description: "Crafting modern, responsive frontend architectures with React, JavaScript, and Tailwind CSS that feel fluid and alive."
    },
    {
      icon: Clock,
      title: "Digital Productivity",
      description: "Obsessed with optimizing workflows, automated task pipelines, and digital systems that maximize output and study efficiency."
    },
    {
      icon: Target,
      title: "Practical Engineering",
      description: "Believing that true understanding comes from writing code, testing ideas in production, and iterating on feedback."
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Viewport Reveal */}
        <motion.div
          variants={fadeInUp(24)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 mb-3">
            <User size={14} />
            <span>Discover My Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A student developer dedicated to mastering technology, building software, and creating value.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Introduction & Key Quick Facts */}
          <motion.div
            variants={fadeInUp(24)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Main Bio Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md cursor-default"
                >
                  DK
                </motion.div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    {personalInfo.name}
                  </h3>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                    {personalInfo.role} • {personalInfo.college}
                  </p>
                </div>
              </div>

              {/* Bio Narrative */}
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {personalInfo.shortBio}
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
                {personalInfo.extendedBio}
              </p>

              {/* Quick Meta List */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <MapPin size={16} className="text-rose-500 shrink-0" />
                  <span>Jaipur, Rajasthan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <GraduationCap size={16} className="text-brand-500 shrink-0" />
                  <span>JECRC University</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Sparkles size={16} className="text-amber-500 shrink-0" />
                  <span>AI & Web Dev</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Project Ready</span>
                </div>
              </div>

            </div>

            {/* Student Mindset Banner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-gradient-to-r from-brand-600/10 via-indigo-600/10 to-transparent border border-brand-500/20 flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-brand-500 text-white shrink-0">
                <HeartHandshake size={20} />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-brand-600 dark:text-brand-400">Collaborative Spirit:</span> Eager to connect with fellow developers, participate in hackathons, and contribute to innovative initiatives.
              </p>
            </motion.div>

          </motion.div>

          {/* Right Column: Pillars of Interest & Activity */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={fadeInUp(20)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="space-y-4 mb-8"
            >
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                What Drives Me
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                As a computer science student at JECRC University, my daily focus revolves around these four strategic pillars:
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp(20)}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* University Learning Quote */}
            <motion.div 
              variants={fadeInUp(16)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="mt-6 p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-4"
            >
              <span className="text-3xl text-brand-500 font-serif leading-none">“</span>
              <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                Technology is at its best when it solves real human friction. As a student in Jaipur, I aim to merge solid algorithmic foundations with intuitive design to build products that make a tangible difference.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
