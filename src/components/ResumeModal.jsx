import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code2,
  CheckCircle2
} from 'lucide-react';
import { personalInfo, educationData, skillsData, projectsData, achievementsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        
        {/* Background Backdrop click */}
        <div className="fixed inset-0" onClick={onClose}></div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  Curriculum Vitae / Resume
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.name} • {personalInfo.college}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Resume Modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Printable Resume Sheet */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:overflow-visible text-slate-800 dark:text-slate-200" ref={resumeRef}>
            
            {/* 1. Header / Contact Block */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    {personalInfo.name}
                  </h1>
                  <p className="text-base font-semibold text-brand-600 dark:text-brand-400 mt-1">
                    B.Tech Computer Science Undergrad • AI & Web Technology Enthusiast
                  </p>
                </div>
                
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1 sm:text-right font-mono">
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Mail size={13} className="text-brand-500" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <MapPin size={13} className="text-rose-500" />
                    <span>{personalInfo.location}</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Linkedin size={13} className="text-blue-500" />
                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/{personalInfo.linkedin}</a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Github size={13} className="text-slate-700 dark:text-slate-300" />
                    <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">github.com/{personalInfo.github}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Professional Summary */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 flex items-center gap-2">
                <span>// Professional Summary</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {personalInfo.extendedBio}
              </p>
            </div>

            {/* 3. Education */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                <span>// Education</span>
              </h2>
              {educationData.map((edu, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 w-fit">
                      {edu.period} ({edu.status})
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {edu.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.learningAreas.map((area, aIdx) => (
                      <span key={aIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Technical Skills */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                <span>// Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                    Languages & Web Tech
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Python, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, React, Vite
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                    AI & Modern Tools
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Generative AI, Prompt Engineering, LLM Integration, Git, GitHub, REST APIs
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Key Engineering Projects */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                <span>// Key Technical Projects</span>
              </h2>
              <div className="space-y-4">
                {projectsData.map((project) => (
                  <div key={project.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {project.technologies.join(' • ')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
                      {project.shortDescription}
                    </p>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-brand-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Certifications & Achievements */}
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3 flex items-center gap-2">
                <span>// Certifications & Milestones</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievementsData.slice(0, 4).map((ach) => (
                  <div key={ach.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
                    <Award size={16} className="text-brand-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {ach.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ach.issuer} ({ach.year})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Ready to print or save as PDF
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/25 transition-all"
              >
                <Download size={14} />
                <span>Save as PDF</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
