import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MapPin, 
  Sparkles, 
  Code2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  GraduationCap,
  Layers,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * DeveloperSpotlightCard - Modern, visual, clutter-free showcase
 * Replaces the noisy CLI terminal with a clean, executive portfolio card.
 */
export default function InteractiveTerminalCard() {
  const [activeTab, setActiveTab] = useState('spotlight'); // 'spotlight' | 'skills' | 'terminal'
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative mx-auto max-w-lg w-full">
      {/* Outer calm ambient sapphire backlight */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-slate-400/10 opacity-70 blur-xl pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300"
      >
        {/* Subtle radial sheen on mouse hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 50%)`
          }}
        />

        {/* Top Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200/70 dark:border-slate-800/80">
          {/* macOS dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/50 dark:border-slate-800 text-[11px] font-medium">
            <button
              onClick={() => setActiveTab('spotlight')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === 'spotlight'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles size={12} />
              <span>Spotlight</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers size={12} />
              <span>Stack</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === 'terminal'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal size={12} />
              <span>Bio</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE
          </span>
        </div>

        {/* Tab 1: Project Spotlight */}
        {activeTab === 'spotlight' && (
          <div className="p-6 space-y-5">
            {/* Developer Identity Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="relative group shrink-0">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 border border-slate-700/80 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  DK
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900"></span>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight truncate">
                    {personalInfo.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold uppercase">
                    B.Tech '27
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <GraduationCap size={13} className="text-blue-500 shrink-0" />
                  <span className="truncate">{personalInfo.college}</span>
                </p>
              </div>
            </div>

            {/* Featured Showcase Project Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 relative group/proj hover:border-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                    <Bot size={15} />
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                    Campus Buddy AI
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={10} />
                  Live Assistant
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Intelligent conversational AI companion integrated with real-time academic workflows and university assistance.
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5">
                {['React 18', 'Tailwind', 'Botpress GenAI', 'Web APIs'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Competencies Matrix */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Code2 size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Web Focus</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">React & Modern UI</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Cpu size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">AI Focus</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">GenAI & Python</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technology Stack */}
        {activeTab === 'skills' && (
          <div className="p-6 space-y-4">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Primary Engineering Toolkit
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'React 18 & Vite', level: 'Frontend OS', color: 'text-sky-400' },
                { name: 'Python 3', level: 'Backend & Scripting', color: 'text-emerald-400' },
                { name: 'Tailwind CSS', level: 'Modern Design', color: 'text-blue-400' },
                { name: 'Generative AI', level: 'Prompting & LLMs', color: 'text-purple-400' },
                { name: 'DSA & Algorithms', level: 'Problem Solving', color: 'text-indigo-400' },
                { name: 'Git & GitHub', level: 'Version Control', color: 'text-rose-400' },
              ].map((s) => (
                <div 
                  key={s.name}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800"
                >
                  <div className={`text-xs font-bold ${s.color}`}>{s.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{s.level}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
              Actively developing responsive full-stack applications with high emphasis on performance, clean structure, and user accessibility.
            </p>
          </div>
        )}

        {/* Tab 3: Quick Biography & Focus */}
        {activeTab === 'terminal' && (
          <div className="p-6 space-y-4 font-mono text-xs">
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-slate-300 leading-relaxed space-y-2">
              <p><span className="text-blue-400">const</span> <span className="text-emerald-300">developer</span> = &#123;</p>
              <p className="pl-4"><span className="text-slate-500">name:</span> <span className="text-slate-200">"{personalInfo.name}"</span>,</p>
              <p className="pl-4"><span className="text-slate-500">degree:</span> <span className="text-slate-200">"B.Tech Computer Science"</span>,</p>
              <p className="pl-4"><span className="text-slate-500">university:</span> <span className="text-slate-200">"JECRC University"</span>,</p>
              <p className="pl-4"><span className="text-slate-500">location:</span> <span className="text-slate-200">"Jaipur, India"</span>,</p>
              <p className="pl-4"><span className="text-slate-500">interests:</span> [<span className="text-sky-300">"AI"</span>, <span className="text-sky-300">"Full-Stack"</span>, <span className="text-sky-300">"Productivity"</span>]</p>
              <p>&#125;;</p>
            </div>
            <div className="text-center text-[11px] text-slate-500 font-sans">
              Open to Software Internships & Project Collaborations
            </div>
          </div>
        )}

        {/* Bottom Card Footer */}
        <div className="px-5 py-3 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin size={12} className="text-rose-500" />
            <span>Jaipur, India</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={personalInfo.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href={personalInfo.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
