import React from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  Database, 
  Globe, 
  GitBranch, 
  Binary, 
  Zap 
} from 'lucide-react';

const technologies = [
  { name: 'Artificial Intelligence', icon: Cpu, color: 'text-purple-400' },
  { name: 'React 18', icon: Code2, color: 'text-cyan-400' },
  { name: 'Generative AI', icon: Sparkles, color: 'text-pink-400' },
  { name: 'Python 3', icon: Terminal, color: 'text-emerald-400' },
  { name: 'Tailwind CSS', icon: Layers, color: 'text-sky-400' },
  { name: 'Vite', icon: Zap, color: 'text-amber-400' },
  { name: 'DSA & Algorithms', icon: Binary, color: 'text-indigo-400' },
  { name: 'Full-Stack Web', icon: Globe, color: 'text-blue-400' },
  { name: 'Git & GitHub', icon: GitBranch, color: 'text-rose-400' },
  { name: 'Database Systems', icon: Database, color: 'text-teal-400' },
];

export default function TechMarquee() {
  return (
    <div className="relative py-7 bg-slate-900/40 dark:bg-slate-950/60 border-y border-slate-200/50 dark:border-slate-800/80 overflow-hidden">
      {/* Top and Bottom Horizon Laser Accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 via-amber-400/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 via-rose-500/20 to-transparent pointer-events-none" />

      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex select-none gap-6 animate-marquee hover:[animation-play-state:paused]">
        {[...technologies, ...technologies, ...technologies].map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-sm shrink-0 hover:border-brand-500/70 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-300 cursor-default group backdrop-blur-md"
            >
              <Icon size={16} className={`${tech.color} group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300`} />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-400 transition-colors">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
