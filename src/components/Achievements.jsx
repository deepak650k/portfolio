import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  Sparkles, 
  Medal, 
  Users, 
  PlusCircle, 
  Calendar, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

// Map icon strings to Lucide components
const iconMap = {
  Award: Award,
  BookOpen: BookOpen,
  Trophy: Trophy,
  Sparkles: Sparkles,
  Medal: Medal,
  Users: Users
};

// Styling by achievement category
const typeStyles = {
  Certifications: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-500",
    borderHover: "hover:border-blue-500/50"
  },
  Hackathons: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    iconBg: "bg-purple-500/10 text-purple-500",
    borderHover: "hover:border-purple-500/50"
  },
  Courses: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    borderHover: "hover:border-emerald-500/50"
  },
  Awards: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    iconBg: "bg-amber-500/10 text-amber-500",
    borderHover: "hover:border-amber-500/50"
  },
  "Other achievements": {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    iconBg: "bg-rose-500/10 text-rose-500",
    borderHover: "hover:border-rose-500/50"
  }
};

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Certifications',
    'Hackathons',
    'Courses',
    'Awards',
    'Other achievements'
  ];

  const filteredItems = achievementsData.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.type === activeCategory;
  });

  return (
    <section id="achievements" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/40">
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
            <Trophy size={14} />
            <span>Milestones & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Achievements
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A growing portfolio of certifications, courses, hackathons, awards, and technical milestones.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const Icon = iconMap[item.icon] || Award;
              const style = typeStyles[item.type] || {
                badge: "bg-brand-500/10 text-brand-600 border-brand-500/20",
                iconBg: "bg-brand-500/10 text-brand-500",
                borderHover: "hover:border-brand-500/50"
              };

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${style.borderHover}`}
                >
                  <div>
                    {/* Top Bar with Icon & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`p-3 rounded-xl ${style.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.badge}`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors">
                      {item.title}
                    </h3>

                    {/* Issuer & Year */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                      <span className="text-brand-600 dark:text-brand-400 font-semibold">{item.issuer}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Status Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                      <ShieldCheck size={14} />
                      Verified Milestone
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {item.badge}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Extensibility Placeholder Card for Deepak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-brand-500/5 via-slate-100/50 to-white dark:from-brand-500/5 dark:via-slate-900/40 dark:to-slate-950 border border-dashed border-brand-300 dark:border-brand-700/60 shadow-sm flex flex-col justify-between items-center text-center p-8 group hover:border-brand-500 transition-colors"
          >
            <div className="my-auto py-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle size={28} />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
                Add More Achievements
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Easily update <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[11px] font-mono">portfolioData.js</code> to showcase new certifications, hackathons, courses, and awards.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1">
              <span>Ready for Expansion</span>
              <ChevronRight size={14} />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
