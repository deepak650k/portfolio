import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Award, 
  CheckCircle, 
  BrainCircuit, 
  Code, 
  Database, 
  Binary, 
  Laptop
} from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { MOTION_TOKENS, fadeInUp, defaultViewport, staggerContainer } from '../utils/motion';

export default function Education() {
  const edu = educationData[0];

  const learningAreas = [
    {
      title: "Artificial Intelligence & ML",
      icon: BrainCircuit,
      desc: "Neural network principles, predictive modeling, machine learning workflows, and generative AI systems."
    },
    {
      title: "Data Structures & Algorithms (DSA)",
      icon: Binary,
      desc: "Problem solving, algorithm optimization, arrays, linked lists, trees, graphs, and time/space complexity."
    },
    {
      title: "Web Technologies & Architecture",
      icon: Code,
      desc: "Modern HTML5/CSS3, JavaScript (ES6+), React component lifecycles, state management, and responsive layouts."
    },
    {
      title: "Python Programming & Scripting",
      icon: Laptop,
      desc: "Object-oriented programming, data manipulation, automation scripts, and API consumption."
    },
    {
      title: "Database Management Systems (DBMS)",
      icon: Database,
      desc: "Relational database concepts, SQL queries, normalization, data integrity, and NoSQL storage fundamentals."
    },
    {
      title: "Digital Productivity & Systems",
      icon: BookOpen,
      desc: "Version control with Git, command-line proficiency, project management, and developer workflow design."
    }
  ];

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={fadeInUp(24, MOTION_TOKENS.duration.section)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 mb-3">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            My formal engineering foundation and specialized areas of study at university.
          </p>
        </motion.div>

        {/* Education Highlight Card */}
        <motion.div
          variants={fadeInUp(24, MOTION_TOKENS.duration.section, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 transition-all hover:shadow-2xl">
            
            {/* Top continuous fiber-optic laser beam */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full w-[200%] bg-gradient-to-r from-brand-500 via-rose-500 via-amber-400 to-brand-500 bg-[length:200%_auto] animate-shimmer" />
            </div>

            {/* University & Degree Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start sm:items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-600 via-rose-500 to-amber-500 opacity-40 blur-md group-hover:opacity-80 transition duration-500"></div>
                  <motion.div 
                    whileHover={{ scale: 1.08, rotate: 6 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/25"
                  >
                    <GraduationCap size={32} />
                  </motion.div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-1">
                    <span>{edu.status}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-base font-semibold text-brand-600 dark:text-brand-400">
                    {edu.institution}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5 font-medium text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-brand-500" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-rose-500" />
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {edu.description}
              </p>
            </div>

            {/* Relevant Learning Areas Section with Staggered Scroll-Reveal */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={18} className="text-brand-500" />
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Relevant Learning Areas &amp; Core Coursework
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningAreas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ scale: 1.025, y: -3 }}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 flex items-start gap-3.5 group"
                    >
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50 shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors">
                          {area.title}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* University Journey Highlights */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <Award size={14} className="text-amber-500" />
                <span>Academic Milestones &amp; Highlights</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {edu.highlights.map((highlight, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
