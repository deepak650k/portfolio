import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  ExternalLink,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { personalInfo, educationData, projectsData, achievementsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeRef = useRef(null);
  const [copiedPlainText, setCopiedPlainText] = useState(false);

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

  const handleCopyPlainText = () => {
    const atsText = `DEEPAK KUMAWAT
Jaipur, Rajasthan, India | ${personalInfo.email}
LinkedIn: ${personalInfo.linkedinUrl} | GitHub: ${personalInfo.githubUrl}
Portfolio: https://deepak-builds-26.vercel.app

PROFESSIONAL SUMMARY
Driven Computer Science undergraduate at JECRC University with strong technical foundations in Python, modern JavaScript, React.js, and Generative AI. Dedicated to architecting responsive, accessible web applications and exploring LLM workflows to build practical, user-centric software.

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science and Engineering
JECRC University, Jaipur, Rajasthan (2026 - 2030) | Currently Pursuing
• Relevant Coursework: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems, Web Technologies, Artificial Intelligence & Machine Learning Foundations.

TECHNICAL SKILLS
• Programming Languages: Python, JavaScript (ES6+), C/C++, HTML5, CSS3
• Frameworks & Libraries: React.js, Tailwind CSS, Vite, Framer Motion
• AI & Modern Technologies: Generative AI, Large Language Models (LLMs), Prompt Engineering, RESTful APIs
• Developer Tools & Platforms: Git, GitHub, VS Code, Vercel, LocalStorage API
• Core Competencies: Data Structures & Algorithms, Responsive Web Design, Component-Based UI, Digital Productivity Systems

TECHNICAL PROJECTS
1. Portfolio Platform | React, Tailwind CSS, Vite, Framer Motion
Live Demo: https://deepak-builds-26.vercel.app | GitHub: https://github.com/deepak650k/Portfolio
• Architected a responsive personal portfolio featuring 12 dynamic curated themes and 60fps animations.
• Implemented ATS-compliant printable CV modal export and accessible mobile drawer navigation.

2. Generative AI Web Application | Python, React, Generative AI, REST APIs
GitHub: https://github.com/deepak650k/AI-Website
• Engineered a modern AI conversational interface connecting user queries to LLM backend endpoints via structured prompt engineering.
• Implemented contextual prompt templates, dynamic streaming, and client-side error handling for high reliability.

3. Student Productivity System | JavaScript, React, Tailwind CSS, LocalStorage API
GitHub: https://github.com/deepak650k/student-productivity
• Built an offline-first academic management platform incorporating an Eisenhower priority matrix and Pomodoro focus timers.
• Designed zero-friction local state persistence ensuring instant data access without database latency.

CERTIFICATIONS & ACHIEVEMENTS
• AI & Machine Learning Foundations — DeepLearning.AI & Coursera (2026)
• Full-Stack Web Development Track — freeCodeCamp & Meta (2026)
• Generative AI & Prompt Engineering Specialization — Google Cloud & DeepLearning.AI (2026)
• Campus Tech & Innovation Hackathon Showcase — JECRC University (2026)`;

    navigator.clipboard.writeText(atsText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2500);
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
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <span>ATS-Friendly Curriculum Vitae</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    ATS Optimized
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.name} • Standard 1–2 Page Linear Layout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Plain Text ATS Button */}
              <button
                onClick={handleCopyPlainText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                title="Copy clean plain text for job application forms"
              >
                {copiedPlainText ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied ATS Text!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy ATS Text</span>
                  </>
                )}
              </button>

              {/* Save PDF Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Save as PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Resume Modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Printable ATS Resume Sheet (Single-column, linear standard structure) */}
          <div 
            className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-800 dark:text-slate-200 printable-resume-sheet print:p-0 print:space-y-4 print:text-black print:overflow-visible print:bg-white font-sans" 
            ref={resumeRef}
          >
            
            {/* 1. Standard ATS Header Block */}
            <div className="border-b-2 border-slate-900 dark:border-slate-300 pb-4 print:pb-2 print:border-b-2 print:border-black print-avoid-break text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight uppercase print:text-2xl print:text-black">
                {personalInfo.name}
              </h1>
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1 print:text-sm print:text-black">
                B.Tech in Computer Science and Engineering | Full-Stack Web & AI Developer
              </p>
              
              {/* ATS Standard Linear Contact Bar */}
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 print:text-[9.5pt] print:text-black print:gap-x-2">
                <span>{personalInfo.location}</span>
                <span className="text-slate-400 print:text-black">•</span>
                <a href={`mailto:${personalInfo.email}`} className="text-brand-600 dark:text-brand-400 hover:underline print:text-black font-medium">
                  {personalInfo.email}
                </a>
                <span className="text-slate-400 print:text-black">•</span>
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">
                  linkedin.com/in/{personalInfo.linkedin}
                </a>
                <span className="text-slate-400 print:text-black">•</span>
                <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">
                  github.com/{personalInfo.github}
                </a>
                <span className="text-slate-400 print:text-black">•</span>
                <a href="https://deepak-builds-26.vercel.app" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">
                  deepak-builds-26.vercel.app
                </a>
              </div>
            </div>

            {/* 2. Professional Summary */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-400 pb-0.5 mb-2 print:text-[10pt] print:text-black print:border-black">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-[9.5pt] print:text-black print:leading-normal">
                Driven Computer Science undergraduate at JECRC University with strong technical foundations in Python, modern JavaScript, React.js, and Generative AI. Dedicated to architecting responsive, accessible web applications and exploring LLM workflows to build practical, user-centric software.
              </p>
            </div>

            {/* 3. Education */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-400 pb-0.5 mb-2.5 print:text-[10pt] print:text-black print:border-black">
                EDUCATION
              </h2>
              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base print:text-[10pt] print:text-black">
                      {edu.institution}, {edu.location}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 print:text-[9pt] print:text-black">
                      {edu.period} ({edu.status})
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-brand-600 dark:text-brand-400 print:text-[9.5pt] print:text-black italic">
                    {edu.degree} in Computer Science and Engineering
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 print:text-[9pt] print:text-black">
                    <strong className="text-slate-800 dark:text-slate-200 print:text-black">Relevant Coursework:</strong> Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems, Web Technologies, Artificial Intelligence & Machine Learning Foundations.
                  </p>
                </div>
              ))}
            </div>

            {/* 4. Technical Skills (Categorized keywords for ATS scanners) */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-400 pb-0.5 mb-2 print:text-[10pt] print:text-black print:border-black">
                TECHNICAL SKILLS
              </h2>
              <ul className="text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300 print:text-[9.5pt] print:text-black print:space-y-0.5">
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Programming Languages:</strong> Python, JavaScript (ES6+), C/C++, HTML5, CSS3
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Frameworks & Libraries:</strong> React.js, Tailwind CSS, Vite, Framer Motion
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">AI & Machine Learning:</strong> Generative AI, Large Language Models (LLMs), Prompt Engineering, RESTful APIs
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Developer Tools & Platforms:</strong> Git, GitHub, VS Code, Vercel, LocalStorage API, npm
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Core Competencies:</strong> Data Structures & Algorithms (DSA), Responsive Web Design, Component-Based UI Architecture, Digital Productivity Systems
                </li>
              </ul>
            </div>

            {/* 5. Technical Projects */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-400 pb-0.5 mb-2.5 print:text-[10pt] print:text-black print:border-black">
                TECHNICAL PROJECTS
              </h2>
              <div className="space-y-3.5 print:space-y-2.5">
                
                {/* Project 1: Portfolio Platform */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[10pt] print:text-black">
                      Portfolio Platform | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">React.js, Tailwind CSS, Vite, Framer Motion</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black flex items-center gap-2">
                      <a href="https://deepak-builds-26.vercel.app" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">Demo</a>
                      <span>|</span>
                      <a href="https://github.com/deepak650k/Portfolio" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[9pt] print:text-black">
                    <li>Designed and engineered a production-ready personal portfolio featuring 12 dynamic themes, sub-second load times, and fluid 60fps animations.</li>
                    <li>Integrated an ATS-compliant CV export modal with 1-click PDF generation and responsive mobile navigation drawer.</li>
                  </ul>
                </div>

                {/* Project 2: Generative AI Web Application */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[10pt] print:text-black">
                      Generative AI Web Application | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">Python, React.js, Generative AI, REST APIs</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black">
                      <a href="https://github.com/deepak650k/AI-Website" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[9pt] print:text-black">
                    <li>Developed an interactive AI interface connecting client inputs to LLM endpoints with structured few-shot prompt engineering.</li>
                    <li>Engineered contextual prompt templates, asynchronous query pipelines, and client-side error handling for dependable user interactions.</li>
                  </ul>
                </div>

                {/* Project 3: Student Productivity System */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[10pt] print:text-black">
                      Student Productivity System | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">JavaScript, React.js, Tailwind CSS, LocalStorage API</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black">
                      <a href="https://github.com/deepak650k/student-productivity" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[9pt] print:text-black">
                    <li>Built an offline-first academic workflow platform incorporating priority task matrices and Pomodoro study timers.</li>
                    <li>Architected zero-friction client-side local persistence ensuring instantaneous task retrieval and reliable session logging.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 6. Certifications & Achievements */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-400 pb-0.5 mb-2 print:text-[10pt] print:text-black print:border-black">
                CERTIFICATIONS & ACHIEVEMENTS
              </h2>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-[9pt] print:text-black print:space-y-0.5">
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">AI & Machine Learning Foundations</strong> — DeepLearning.AI & Coursera (2026)
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Full-Stack Web Development Track</strong> — freeCodeCamp & Meta (2026)
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Generative AI & Prompt Engineering Specialization</strong> — Google Cloud & DeepLearning.AI (2026)
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Campus Tech & Innovation Hackathon Showcase</strong> — JECRC University Hackathon (2026)
                </li>
              </ul>
            </div>

          </div>

          {/* Modal Footer (Hidden on print) */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0 resume-modal-footer no-print">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ATS Score: 100% Parsable (Linear format, Standard Headings)</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCopyPlainText}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                {copiedPlainText ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedPlainText ? 'Copied ATS Text!' : 'Copy ATS Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/25 transition-all"
              >
                <Printer size={14} />
                <span>Save as ATS PDF</span>
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
