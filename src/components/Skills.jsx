import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  FileCode, 
  Terminal, 
  Brain, 
  Sparkles, 
  Globe, 
  Zap, 
  Layers
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

// Map icon strings to Lucide components
const iconMap = {
  Code2: Code2,
  Palette: Palette,
  FileCode: FileCode,
  Terminal: Terminal,
  Brain: Brain,
  Sparkles: Sparkles,
  Globe: Globe,
  Zap: Zap
};

// Color accents for each skill
const skillStyles = {
  HTML: {
    accent: "from-orange-500 to-amber-500",
    border: "group-hover:border-orange-500/50",
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    glow: "rgba(249, 115, 22, 0.15)"
  },
  CSS: {
    accent: "from-blue-500 to-cyan-500",
    border: "group-hover:border-blue-500/50",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    glow: "rgba(59, 130, 246, 0.15)"
  },
  JavaScript: {
    accent: "from-yellow-400 to-amber-500",
    border: "group-hover:border-yellow-500/50",
    badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    glow: "rgba(234, 179, 8, 0.15)"
  },
  Python: {
    accent: "from-emerald-500 to-teal-500",
    border: "group-hover:border-emerald-500/50",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  "Artificial Intelligence": {
    accent: "from-purple-500 to-indigo-600",
    border: "group-hover:border-purple-500/50",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  "Generative AI": {
    accent: "from-fuchsia-500 to-pink-500",
    border: "group-hover:border-pink-500/50",
    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    glow: "rgba(236, 72, 153, 0.15)"
  },
  "Web Development": {
    accent: "from-cyan-500 to-blue-600",
    border: "group-hover:border-cyan-500/50",
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    glow: "rgba(6, 182, 212, 0.15)"
  },
  "Digital Productivity": {
    accent: "from-amber-500 to-orange-500",
    border: "group-hover:border-amber-500/50",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    glow: "rgba(245, 158, 11, 0.15)"
  }
};

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Frontend', 'AI & Data', 'Core', 'Productivity'];

  const filteredSkills = skillsData.filter((skill) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Frontend') return skill.name === 'HTML' || skill.name === 'CSS' || skill.name === 'JavaScript' || skill.name === 'Web Development';
    if (activeFilter === 'AI & Data') return skill.name === 'Artificial Intelligence' || skill.name === 'Generative AI';
    if (activeFilter === 'Core') return skill.name === 'Python' || skill.name === 'JavaScript';
    if (activeFilter === 'Productivity') return skill.name === 'Digital Productivity';
    return true;
  });

  return (
    <section id="skills" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 mb-3">
            <Layers size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A balanced toolkit spanning modern web development, intelligent algorithms, and productivity frameworks.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Skills (8)' : cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || Code2;
              const style = skillStyles[skill.name] || {
                accent: "from-brand-500 to-indigo-500",
                border: "group-hover:border-brand-500/50",
                badge: "bg-brand-500/10 text-brand-600 border-brand-500/20",
                glow: "rgba(14, 140, 233, 0.15)"
              };

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${style.border}`}
                >
                  {/* Top Skill Row */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.badge}`}>
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Category Pill */}
                    <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">
                      {skill.category}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Progress Indicator with Animation */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                      <span>Proficiency</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${style.accent}`}
                      ></motion.div>
                    </div>
                  </div>

                  {/* Subtle hover backlight */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ background: style.glow }}
                  ></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Student Tech Philosophy Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 max-w-2xl mx-auto text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            💡 <strong className="text-slate-900 dark:text-white">Continuous Evolution:</strong> Actively staying up to date with modern web APIs, AI advancements, and developer workflow tools.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
