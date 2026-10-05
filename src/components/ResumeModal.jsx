import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Printer, 
  ExternalLink,
  Copy,
  Check,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import { personalInfo, educationData, projectsData, achievementsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeRef = useRef(null);
  const [copiedPlainText, setCopiedPlainText] = useState(false);

  // Comprehensive selectors targeting Botpress WebChat v5 and other floating widgets
  const getChatbotElements = () => {
    const selectors = [
      'botpress-webchat',
      'bp-widget',
      'bp-webchat',
      '.bpContainer',
      '.bpWebchat',
      '.bpModalContainer',
      '[class*="bpContainer"]',
      '[class*="bpWebchat"]',
      '[class*="bpModal"]',
      '#bp-web-widget-container',
      '#bp-web-widget',
      '.bp-widget-web',
      '.bpw-widget',
      '.bp-widget',
      '[class*="bp-widget"]',
      '[id*="bp-web-widget"]',
      '[id*="bp-"]',
      '[class*="bp-"]',
      '[class*="botpress"]',
      '[id*="botpress"]',
      'iframe[title*="chat" i]',
      'iframe[src*="botpress" i]',
      'img[src*="bpcontent"]',
      'img[src*="botpress"]'
    ];
    return document.querySelectorAll(selectors.join(','));
  };

  // Helper to hide external floating chatbot widgets
  const setChatbotVisibility = (visible) => {
    getChatbotElements().forEach((el) => {
      if (visible) {
        el.removeAttribute('data-print-hidden');
        el.removeAttribute('data-hidden-by-resume');
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
        el.style.removeProperty('opacity');
        el.style.removeProperty('pointer-events');
      } else {
        el.setAttribute('data-print-hidden', 'true');
        el.setAttribute('data-hidden-by-resume', 'true');
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      }
    });

    if (!visible && window.botpress?.close) {
      try { window.botpress.close(); } catch {}
    }
  };

  // Toggle resume-modal-open class and hide chatbot while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('resume-modal-open');
      document.documentElement.classList.add('resume-modal-open');
      setChatbotVisibility(false);
      // Run interval check to catch any late DOM injections
      const interval = setInterval(() => setChatbotVisibility(false), 200);
      return () => {
        clearInterval(interval);
        document.body.classList.remove('resume-modal-open');
        document.documentElement.classList.remove('resume-modal-open');
        setChatbotVisibility(true);
      };
    } else {
      document.body.classList.remove('resume-modal-open');
      document.documentElement.classList.remove('resume-modal-open');
      setChatbotVisibility(true);
    }
  }, [isOpen]);

  // Handle system print events (Cmd+P / Ctrl+P / browser menu)
  useEffect(() => {
    if (!isOpen) return;

    let originalTitle = document.title;

    const handleBeforePrint = () => {
      originalTitle = document.title;
      document.title = '';
      setChatbotVisibility(false);
      Array.from(document.body.children).forEach((el) => {
        if (el.id !== 'root' && el.tagName !== 'SCRIPT') {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
        }
      });
    };

    const handleAfterPrint = () => {
      document.title = originalTitle;
      if (!isOpen) {
        setChatbotVisibility(true);
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
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
    // 1. Temporarily blank document title to remove browser print header (title, date)
    const originalTitle = document.title;
    document.title = '';

    // 2. Hide all chatbot and third party elements
    setChatbotVisibility(false);

    // 3. Temporarily hide any direct children of body that are not #root
    const nonRootElements = Array.from(document.body.children).filter(
      (el) => el.id !== 'root' && el.tagName !== 'SCRIPT'
    );
    nonRootElements.forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
    });

    // 4. Trigger print
    window.print();

    // 5. Restore after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
      nonRootElements.forEach((el) => {
        if (isOpen) {
          if (
            el.tagName.toLowerCase().includes('botpress') ||
            el.className?.includes?.('bp') ||
            el.id?.includes?.('bp')
          ) {
            el.style.setProperty('display', 'none', 'important');
          } else {
            el.style.removeProperty('display');
            el.style.removeProperty('visibility');
          }
        } else {
          el.style.removeProperty('display');
          el.style.removeProperty('visibility');
        }
      });
      if (!isOpen) {
        setChatbotVisibility(true);
      }
    }, 1500);
  };

  const handleCopyPlainText = () => {
    const atsText = `DEEPAK KUMAWAT
Jaipur, Rajasthan, India | ${personalInfo.email}
LinkedIn: ${personalInfo.linkedinUrl} | GitHub: ${personalInfo.githubUrl}
Portfolio: https://deepak-builds-26.vercel.app

PROFESSIONAL SUMMARY
Motivated Computer Science undergraduate at JECRC University with strong foundations in Python, modern JavaScript, React.js architecture, and Generative AI workflows. Proven ability to architect responsive web interfaces, optimize frontend performance, and integrate AI capabilities into user-centric software.

EDUCATION
JECRC University, Jaipur, Rajasthan
Bachelor of Technology (B.Tech) in Computer Science & Engineering (2026 - 2030) | Currently Pursuing
• Relevant Coursework: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems, System Design, Web Technologies, Artificial Intelligence & Machine Learning Foundations.

TECHNICAL SKILLS
• Programming Languages: Python, JavaScript (ES6+), C/C++, HTML5, CSS3, SQL
• Frameworks & Libraries: React.js, Tailwind CSS, Vite, Framer Motion
• AI & Modern Technologies: Generative AI, Large Language Models (LLMs), Prompt Engineering, RESTful APIs
• Developer Tools: Git, GitHub, VS Code, Vercel, LocalStorage API, npm, Chrome DevTools
• Core Competencies: Data Structures & Algorithms, Responsive Web Architecture, Component-Driven Design, Digital Productivity Systems

TECHNICAL PROJECTS
1. Portfolio & Personal Brand Platform | React.js, Tailwind CSS, Vite, Framer Motion
Live Demo: https://deepak-builds-26.vercel.app | GitHub: https://github.com/deepak650k/Portfolio
• Architected a production-grade personal portfolio featuring 12 dynamic themes, sub-second load times, and fluid 60fps animations.
• Engineered an ATS-compliant CV export engine with vector PDF generation and accessible mobile navigation drawer.

2. Generative AI Assistant Web Application | Python, React.js, Generative AI, REST APIs
GitHub: https://github.com/deepak650k/AI-Website
• Developed an interactive AI chat interface connecting user queries to LLM backend endpoints via structured few-shot prompt engineering.
• Implemented contextual prompt templates, asynchronous streaming query pipelines, and client-side error handling for reliable multi-turn interactions.

3. Student Productivity System (Workflow OS) | JavaScript, React.js, Tailwind CSS, LocalStorage API
GitHub: https://github.com/deepak650k/student-productivity
• Built an offline-first academic management platform incorporating an Eisenhower priority task matrix and Pomodoro focus timers.
• Architected zero-friction client-side local persistence ensuring instantaneous task retrieval and reliable session logging without database latency.

CERTIFICATIONS & ACHIEVEMENTS
• AI & Machine Learning Foundations — DeepLearning.AI & Coursera (2026)
• Full-Stack Web Development Track — freeCodeCamp & Meta (2026)
• Generative AI & Prompt Engineering Specialization — Google Cloud & DeepLearning.AI (2026)
• Campus Tech & Innovation Hackathon Showcase — JECRC University Hackathon (2026)`;

    navigator.clipboard.writeText(atsText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md resume-modal-backdrop">
        
        {/* Background Backdrop click */}
        <div className="fixed inset-0 resume-backdrop-click no-print" onClick={onClose}></div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 resume-modal-box"
        >
          {/* Header Action Bar (Hidden on print) */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0 resume-modal-header no-print">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <span>Professional Curriculum Vitae</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    ATS 100% Certified
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.name} • Clean 1-Page Layout
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
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              {/* Save PDF Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all cursor-pointer"
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

          {/* Clean Tip Bar for Safari / Chrome printing (Hidden on print) */}
          <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300 no-print">
            <div className="flex items-center gap-2">
              <Info size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <span>
                <strong>Print Tip:</strong> In your browser print settings, uncheck <em>"Print headers and footers"</em> to keep the PDF completely free of URLs and dates.
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-amber-700 dark:text-amber-400">
              A4 / Letter • 1 Page
            </span>
          </div>

          {/* Printable ATS Resume Sheet (Single-column, linear standard structure) */}
          <div 
            className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-5 text-slate-800 dark:text-slate-200 printable-resume-sheet print:p-0 print:space-y-3.5 print:text-black print:overflow-visible print:bg-white font-sans" 
            ref={resumeRef}
          >
            
            {/* 1. Standard ATS Header Block */}
            <div className="border-b-2 border-slate-900 dark:border-slate-300 pb-3 print:pb-2 print:border-b-2 print:border-black print-avoid-break text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight uppercase print:text-2xl print:text-black">
                {personalInfo.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5 print:text-[10pt] print:text-black">
                Computer Science Undergraduate • AI & Full-Stack Systems Developer
              </p>
              
              {/* ATS Standard Linear Contact Bar */}
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 print:text-[9pt] print:text-black print:gap-x-2">
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
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-slate-400 pb-0.5 mb-1.5 print:text-[10pt] print:text-black print:border-black">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-[9pt] print:text-black print:leading-normal">
                Motivated Computer Science undergraduate at JECRC University with strong technical foundations in Python, modern JavaScript, React.js architecture, and Generative AI workflows. Proven ability to architect responsive web interfaces, optimize frontend performance, and integrate AI capabilities into user-centric software.
              </p>
            </div>

            {/* 3. Education */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-slate-400 pb-0.5 mb-2 print:text-[10pt] print:text-black print:border-black">
                EDUCATION
              </h2>
              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[10pt] print:text-black">
                      {edu.institution}, {edu.location}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 print:text-[9pt] print:text-black">
                      {edu.period} (Currently Pursuing)
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-brand-600 dark:text-brand-400 print:text-[9pt] print:text-black italic">
                    {edu.degree} in Computer Science and Engineering
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-0.5 print:text-[8.5pt] print:text-black">
                    <strong className="text-slate-800 dark:text-slate-200 print:text-black">Relevant Coursework:</strong> Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems, System Design, Web Technologies, Artificial Intelligence & Machine Learning Foundations.
                  </p>
                </div>
              ))}
            </div>

            {/* 4. Technical Skills */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-slate-400 pb-0.5 mb-1.5 print:text-[10pt] print:text-black print:border-black">
                TECHNICAL SKILLS
              </h2>
              <ul className="text-xs sm:text-sm space-y-0.5 text-slate-700 dark:text-slate-300 print:text-[9pt] print:text-black print:space-y-0.5">
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Programming Languages:</strong> Python, JavaScript (ES6+), C/C++, HTML5, CSS3, SQL
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Frameworks & Libraries:</strong> React.js, Tailwind CSS, Vite, Framer Motion
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">AI & Modern Systems:</strong> Generative AI, Large Language Models (LLMs), Prompt Engineering, RESTful APIs
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Developer Tools:</strong> Git, GitHub, VS Code, Vercel, LocalStorage API, npm, Chrome DevTools
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white print:text-black font-semibold">Core Competencies:</strong> Data Structures & Algorithms, Responsive Web Architecture, Component-Driven Design, Digital Productivity Systems
                </li>
              </ul>
            </div>

            {/* 5. Technical Projects */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-slate-400 pb-0.5 mb-2 print:text-[10pt] print:text-black print:border-black">
                TECHNICAL PROJECTS
              </h2>
              <div className="space-y-3 print:space-y-2">
                
                {/* Project 1: Portfolio Platform */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[9.5pt] print:text-black">
                      Portfolio Platform | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">React.js, Tailwind CSS, Vite, Framer Motion</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black flex items-center gap-1.5">
                      <a href="https://deepak-builds-26.vercel.app" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">Demo</a>
                      <span>•</span>
                      <a href="https://github.com/deepak650k/Portfolio" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[8.5pt] print:text-black">
                    <li>Architected and deployed a production-grade personal portfolio platform featuring 12 dynamic themes, sub-second load times, and fluid 60fps animations.</li>
                    <li>Engineered an ATS-compliant CV export engine with vector PDF generation and accessible mobile navigation drawer.</li>
                  </ul>
                </div>

                {/* Project 2: Generative AI Web Application */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[9.5pt] print:text-black">
                      Generative AI Assistant Web Application | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">Python, React.js, Generative AI, REST APIs</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black">
                      <a href="https://github.com/deepak650k/AI-Website" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[8.5pt] print:text-black">
                    <li>Developed an interactive AI chat interface connecting user queries to LLM backend endpoints via structured few-shot prompt engineering.</li>
                    <li>Implemented contextual prompt templates, asynchronous streaming query pipelines, and client-side error handling for reliable multi-turn interactions.</li>
                  </ul>
                </div>

                {/* Project 3: Student Productivity System */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm print:text-[9.5pt] print:text-black">
                      Student Productivity System (Workflow OS) | <span className="font-normal text-xs text-slate-600 dark:text-slate-400 print:text-black">JavaScript, React.js, Tailwind CSS, LocalStorage API</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 print:text-[8.5pt] print:text-black">
                      <a href="https://github.com/deepak650k/student-productivity" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline print:text-black">GitHub</a>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300 print:text-[8.5pt] print:text-black">
                    <li>Built an offline-first academic management platform incorporating an Eisenhower priority task matrix and Pomodoro focus timers.</li>
                    <li>Architected zero-friction client-side local persistence ensuring instantaneous task retrieval and reliable session logging without database latency.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 6. Certifications & Achievements */}
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-slate-400 pb-0.5 mb-1.5 print:text-[10pt] print:text-black print:border-black">
                CERTIFICATIONS & ACHIEVEMENTS
              </h2>
              <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-[8.5pt] print:text-black">
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
              <span>Single-Page Clean Vector Export</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCopyPlainText}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {copiedPlainText ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedPlainText ? 'Copied ATS Text!' : 'Copy ATS Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/25 transition-all cursor-pointer"
              >
                <Printer size={14} />
                <span>Save as PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
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
