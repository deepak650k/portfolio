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
    <section id="education" className="pt-28 pb-20 relative">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 transition-all hover:shadow-2xl">
            
            {/* Top decorative accent ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400"></div>

            {/* University & Degree Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start sm:items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/25"
                >
                  <GraduationCap size={32} />
                </motion.div>
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

            {/* Relevant Learning Areas Section */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={18} className="text-brand-500" />
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Relevant Learning Areas & Core Coursework
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningAreas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-200 flex items-start gap-3.5"
                    >
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50 shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
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
                <span>Academic Milestones & Highlights</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {edu.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
