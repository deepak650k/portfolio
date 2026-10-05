import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Award, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { personalInfo, educationData, projectsData, achievementsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeRef = useRef(null);

  // Toggle resume-modal-open class on body to isolate print view
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('resume-modal-open');
      document.documentElement.classList.add('resume-modal-open');
    } else {
      document.body.classList.remove('resume-modal-open');
      document.documentElement.classList.remove('resume-modal-open');
    }
    return () => {
      document.body.classList.remove('resume-modal-open');
      document.documentElement.classList.remove('resume-modal-open');
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md resume-modal-backdrop">
        
        {/* Background Backdrop click */}
        <div className="fixed inset-0 resume-backdrop-click no-print" onClick={onClose}></div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 resume-modal-box"
        >
          {/* Header Action Bar (Hidden on print) */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0 resume-modal-header no-print">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Save as PDF</span>
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

          {/* Printable Resume Sheet */}
          <div 
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200 printable-resume-sheet print:p-0 print:space-y-4 print:text-black print:overflow-visible print:bg-white" 
            ref={resumeRef}
          >
            
            {/* 1. Header / Contact Block */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 print:pb-3 print:border-b-2 print:border-slate-800 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight print:text-2xl print:text-black">
                    {personalInfo.name}
                  </h1>
                  <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5 print:text-sm print:text-slate-700">
                    B.Tech Computer Science Engineering • JECRC University, Jaipur (2026 – 2030)
                  </p>
                </div>
                
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 sm:text-right font-mono print:text-[9.5pt] print:text-slate-700">
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Mail size={13} className="text-brand-500 print:hidden" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <MapPin size={13} className="text-rose-500 print:hidden" />
                    <span>{personalInfo.location}</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Linkedin size={13} className="text-blue-500 print:hidden" />
                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/{personalInfo.linkedin}</a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Github size={13} className="text-slate-700 dark:text-slate-300 print:hidden" />
                    <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">github.com/{personalInfo.github}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Professional Summary */}
            <div className="print-avoid-break">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1.5 print:text-[10pt] print:text-black print:font-bold print:border-b print:border-slate-300 print:pb-0.5 flex items-center gap-1.5">
                <span>// Professional Summary</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 print:text-[9.5pt] print:text-slate-800 print:leading-normal">
                {personalInfo.extendedBio}
              </p>
            </div>

            {/* 3. Education */}
            <div className="print-avoid-break">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 print:text-[10pt] print:text-black print:font-bold print:border-b print:border-slate-300 print:pb-0.5 flex items-center gap-1.5">
                <span>// Education</span>
              </h2>
              {educationData.map((edu, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border-0 print:border-l-2 print:border-slate-400 print:p-2 print:rounded-none">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base print:text-[10pt] print:text-black">
                      {edu.degree}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 w-fit print:border print:border-slate-300 print:text-[9pt] print:text-black">
                      {edu.period} ({edu.status})
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5 print:text-[9.5pt] print:text-slate-700">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 print:text-[9pt] print:text-slate-700">
                    {edu.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 print:gap-1">
                    {edu.learningAreas.map((area, aIdx) => (
                      <span key={aIdx} className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 print:border-slate-300 print:text-[8.5pt] print:text-black">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Technical Skills */}
            <div className="print-avoid-break">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 print:text-[10pt] print:text-black print:font-bold print:border-b print:border-slate-300 print:pb-0.5 flex items-center gap-1.5">
                <span>// Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 print:gap-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border print:border-slate-300 print:p-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1 print:text-[9.5pt] print:text-black">
                    Languages & Web Tech
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 print:text-[9pt] print:text-slate-800">
                    Python, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, React, Vite
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border print:border-slate-300 print:p-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1 print:text-[9.5pt] print:text-black">
                    AI & Modern Tools
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 print:text-[9pt] print:text-slate-800">
                    Generative AI, Prompt Engineering, LLM Integration, Git, GitHub, REST APIs
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Key Engineering Projects */}
            <div className="print-avoid-break">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 print:text-[10pt] print:text-black print:font-bold print:border-b print:border-slate-300 print:pb-0.5 flex items-center gap-1.5">
                <span>// Key Technical Projects</span>
              </h2>
              <div className="space-y-3 print:space-y-2">
                {projectsData.map((project) => (
                  <div key={project.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border-0 print:border-l-2 print:border-slate-400 print:p-2 print:rounded-none">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[9.5pt] print:text-black">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-slate-600">
                        {project.technologies.join(' • ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-1.5 print:text-[9pt] print:text-slate-800">
                      {project.shortDescription}
                    </p>
                    <ul className="space-y-0.5 print:space-y-0">
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 print:text-[8.5pt] print:text-slate-700">
                          <span className="text-brand-500 font-bold print:text-black">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Certifications & Achievements */}
            <div className="print-avoid-break">
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 print:text-[10pt] print:text-black print:font-bold print:border-b print:border-slate-300 print:pb-0.5 flex items-center gap-1.5">
                <span>// Certifications & Milestones</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-1.5">
                {achievementsData.slice(0, 4).map((ach) => (
                  <div key={ach.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2 print:bg-transparent print:border print:border-slate-300 print:p-1.5">
                    <Award size={15} className="text-brand-500 shrink-0 mt-0.5 print:hidden" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white print:text-[9pt] print:text-black">
                        {ach.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-slate-600">
                        {ach.issuer} ({ach.year})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer (Hidden on print) */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0 resume-modal-footer no-print">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Formatted for 1–2 page PDF export
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/25 transition-all"
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
