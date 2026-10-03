import React, { useState, useEffect } from 'react';
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
  Activity,
  ShieldCheck,
  Cpu,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Zap,
  Globe2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * ExecutiveBentoMatrix - High-End Luxury Bento Card
 * Built for tech recruiters and elite software engineering portfolios.
 * Interactive tabs: Overview, Tech Arsenal, and AI Uplink.
 */
export default function InteractiveTerminalCard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'stack' | 'assistant'
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openCampusBuddy = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    } else {
      const btn = document.querySelector('#bp-web-widget-container button, .bp-widget-web button, [aria-label*="chat" i]');
      if (btn) btn.click();
    }
  };

  return (
    <div className="relative mx-auto max-w-lg w-full select-none">
      {/* Luxury Ambient Backlight */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/15 to-indigo-500/20 opacity-70 blur-2xl pointer-events-none" />

      {/* Main Luxury Frosted Glass Chassis */}
      <div className="relative rounded-3xl luxury-glass overflow-hidden transition-all duration-300">
        
        {/* Top Executive Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-slate-900/40">
          
          {/* Status Badge */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white tracking-tight">Executive Dossier</span>
              <span className="text-[10px] text-slate-400 font-mono">Verified Portfolio</span>
            </div>
          </div>

          {/* Luxury Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/60 border border-white/[0.06]">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'stack', label: 'Stack' },
              { id: 'assistant', label: 'AI Copilot' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeBentoTab"
                    className="absolute inset-0 bg-blue-600/90 rounded-lg shadow-sm shadow-blue-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Tab 1: Executive Overview Bento */}
        {activeTab === 'overview' && (
          <div className="p-5 space-y-4">
            
            {/* Bento Row 1: Location & Time Card + Academy Card */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Location & Time Widget */}
              <div className="p-3.5 rounded-2xl luxury-card flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Location</span>
                  <MapPin size={14} className="text-blue-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm font-bold text-white tracking-tight">{personalInfo.location}</div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                    <Clock size={11} className="text-slate-500" />
                    <span>{localTime || '12:00:00 PM'} IST</span>
                  </div>
                </div>
              </div>

              {/* Academy & Track Widget */}
              <div className="p-3.5 rounded-2xl luxury-card flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Education</span>
                  <GraduationCap size={14} className="text-sky-400" />
                </div>
                <div className="mt-2">
                  <div className="text-sm font-bold text-white tracking-tight">JECRC University</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    B.Tech CSE • Class 2027
                  </div>
                </div>
              </div>

            </div>

            {/* Bento Row 2: Quantifiable Impact Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/[0.12] transition-colors">
                <div className="text-lg font-extrabold font-heading text-white">10+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Projects Built</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/[0.12] transition-colors">
                <div className="text-lg font-extrabold font-heading text-sky-400">500+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">DSA Problems</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-white/[0.12] transition-colors">
                <div className="text-lg font-extrabold font-heading text-emerald-400">99.9%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">App Reliability</div>
              </div>
            </div>

            {/* Bento Row 3: Currently Engineering Status */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/40 border border-blue-500/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                <Activity size={16} className="animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Currently Engineering</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                  Developing autonomous AI agent workflows and resilient full-stack web applications with React & Python.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Categorized Tech Stack */}
        {activeTab === 'stack' && (
          <div className="p-5 space-y-3.5 text-xs">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Code2 size={13} className="text-blue-400" />
                <span>Frontend Architecture</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['React 18', 'JavaScript ES6+', 'Tailwind CSS', 'Framer Motion', 'Vite', 'HTML5 / CSS3'].map((item) => (
                  <span 
                    key={item}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 text-[11px] hover:border-blue-400/50 hover:bg-blue-500/10 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Cpu size={13} className="text-sky-400" />
                <span>Backend & Intelligence</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'FastAPI', 'Gemini API', 'LLM Agents', 'Node.js', 'RESTful APIs'].map((item) => (
                  <span 
                    key={item}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 text-[11px] hover:border-sky-400/50 hover:bg-sky-500/10 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Engineering Practices</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Data Structures & Algorithms', 'Git & GitHub', 'System Design', 'Performance Optimization'].map((item) => (
                  <span 
                    key={item}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 text-[11px] hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AI Copilot Quick Uplink */}
        {activeTab === 'assistant' && (
          <div className="p-5 space-y-4">
            
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/25">
              <div className="relative w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0">
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-heading">Campus Buddy AI</div>
                <div className="text-[11px] text-slate-300 font-sans">
                  Deepak's personal AI representative & project companion.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Suggested Prompts:
              </div>
              {[
                "What are Deepak's featured projects?",
                "What is Deepak's engineering skill set?",
                "How do I contact Deepak for opportunities?"
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={openCampusBuddy}
                  className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-blue-400/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate mr-2 font-sans">{prompt}</span>
                  <ArrowUpRight size={13} className="text-slate-500 group-hover:text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ))}
            </div>

            <button
              onClick={openCampusBuddy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Bot size={15} />
              <span>Open Campus Buddy Chat</span>
            </button>

          </div>
        )}

        {/* Executive Card Footer */}
        <div className="px-5 py-3 border-t border-white/[0.08] bg-slate-900/30 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Globe2 size={13} className="text-blue-400" />
            <span>Open for Summer '25 & Full-Time</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
