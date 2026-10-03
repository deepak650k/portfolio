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
  Radio,
  Zap,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/**
 * CyberHUDMatrix - Futuristic Sci-Fi / Arc Reactor Diagnostic Core
 * Inspired by Iron Man (JARVIS) & Tactical Sci-Fi Aerospace Cockpits.
 */
export default function InteractiveTerminalCard() {
  const [activeMode, setActiveMode] = useState('reactor'); // 'reactor' | 'telemetry' | 'uplink'
  const [powerLevel, setPowerLevel] = useState(99.4);
  const [activeFrequencies, setActiveFrequencies] = useState([40, 65, 80, 55, 90, 75, 60, 85, 95, 70, 50, 65]);

  // Audio equalizer pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFrequencies(prev => prev.map(() => Math.floor(Math.random() * 65) + 30));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-lg w-full font-mono select-none">
      {/* Outer Cyan Arc-Reactor Glow Backlight */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-sky-400/20 opacity-80 blur-2xl pointer-events-none" />

      {/* Main Tactical HUD Frame with Cybernetic Angle Brackets */}
      <div className="relative rounded-2xl bg-[#060c18]/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
        
        {/* Corner HUD Bracket Graphics */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

        {/* Top Tactical Status Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-500/30 text-[11px]">
          <div className="flex items-center gap-2 text-cyan-400">
            <Radio size={13} className="animate-pulse text-cyan-300" />
            <span className="font-bold tracking-wider">HUD.CORE // V4.8</span>
          </div>

          {/* Mode Selectors */}
          <div className="flex items-center gap-1 bg-[#091528] p-0.5 rounded-lg border border-cyan-500/30">
            <button
              onClick={() => setActiveMode('reactor')}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                activeMode === 'reactor'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'text-cyan-400/70 hover:text-cyan-300'
              }`}
            >
              Reactor
            </button>
            <button
              onClick={() => setActiveMode('telemetry')}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                activeMode === 'telemetry'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'text-cyan-400/70 hover:text-cyan-300'
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setActiveMode('uplink')}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                activeMode === 'uplink'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'text-cyan-400/70 hover:text-cyan-300'
              }`}
            >
              Uplink
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Tab 1: Arc Reactor / JARVIS Core Interface */}
        {activeMode === 'reactor' && (
          <div className="p-6 space-y-6">
            
            {/* Center Arc Reactor Graphic with Rotating Rings */}
            <div className="relative flex items-center justify-center py-4">
              {/* Outer Concentric Rotating Ring */}
              <div className="relative w-44 h-44 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
                <div className="absolute top-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
                <div className="absolute bottom-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
                <div className="absolute left-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
                <div className="absolute right-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
              </div>

              {/* Inner Counter-Rotating Concentric Ring */}
              <div className="absolute w-32 h-32 rounded-full border border-dashed border-sky-400/40 flex items-center justify-center animate-spin-reverse">
                <div className="w-24 h-24 rounded-full border border-cyan-400/50" />
              </div>

              {/* Core Glowing Arc Reactor Center */}
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-sky-400 to-blue-500 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.7)] text-white">
                <Zap size={22} className="animate-pulse" />
                <span className="text-[10px] font-black tracking-tight">{powerLevel}%</span>
              </div>
            </div>

            {/* Neural Audio Equalizer Waves */}
            <div className="p-3.5 rounded-xl bg-[#091528] border border-cyan-500/30">
              <div className="flex items-center justify-between text-[11px] text-cyan-300 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <Activity size={12} className="text-cyan-400" />
                  <span>NEURAL SYNAPSE WAVEFORM</span>
                </span>
                <span className="text-emerald-400 text-[10px]">FREQ: 432.8 MHz</span>
              </div>

              {/* Equalizer Frequency Bars */}
              <div className="h-8 flex items-end justify-between gap-1 px-1">
                {activeFrequencies.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-t-xs transition-all duration-150"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Live Tactical Specifications */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#091528] border border-cyan-500/20">
                <div className="text-[9px] text-cyan-400/60 uppercase">System Pilot</div>
                <div className="text-white font-bold text-xs truncate">{personalInfo.name}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#091528] border border-cyan-500/20">
                <div className="text-[9px] text-cyan-400/60 uppercase">Academy Sector</div>
                <div className="text-white font-bold text-xs truncate">JECRC Univ (CSE)</div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: System Telemetry & Weapons Arsenal */}
        {activeMode === 'telemetry' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between text-cyan-400 pb-2 border-b border-cyan-500/20">
              <span className="font-bold tracking-wider">TACTICAL ARSENAL // MODULES</span>
              <span className="text-[10px] text-emerald-400 font-mono">100% OPERATIONAL</span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'MOD-01: REACT 18 & MODERN WEB', status: 'ARMED', stat: '98%' },
                { name: 'MOD-02: PYTHON & LLM AGENTS', status: 'ACTIVE', stat: '94%' },
                { name: 'MOD-03: TAILWIND DESIGN MATRIX', status: 'ONLINE', stat: '96%' },
                { name: 'MOD-04: DSA & SYSTEM ALGORITHMS', status: 'SYNCED', stat: '90%' },
                { name: 'MOD-05: CAMPUS BUDDY BOT CORE', status: 'DEPLOYED', stat: '99%' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-2.5 rounded-lg bg-[#091528] border border-cyan-500/25 flex items-center justify-between hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] font-bold text-white">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">{item.status}</span>
                    <span className="text-cyan-400 font-bold text-[10px]">{item.stat}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-cyan-400/60 pt-1">
              &gt; ALL HARDWARE REGISTERS CALIBRATED AND READY FOR IMMEDIATE INTEGRATION.
            </div>
          </div>
        )}

        {/* Tab 3: Uplink to Campus Buddy AI */}
        {activeMode === 'uplink' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 shrink-0">
                <Bot size={20} className="animate-pulse text-cyan-200" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-heading">CAMPUS BUDDY AI AGENT</div>
                <div className="text-[10px] text-cyan-300 font-mono">STATUS: UPLINK ACTIVE • JECRC SECTOR</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#091528] border border-cyan-500/30 text-xs text-slate-200 leading-relaxed">
              <span className="text-cyan-400 font-bold">&gt; JARVIS_BOT: </span>
              "Greetings, Commander. I am ready to answer queries regarding Deepak's engineering background, projects, technical skills, or university achievements."
            </div>

            <button
              onClick={() => {
                if (window.botpress && typeof window.botpress.open === 'function') {
                  window.botpress.open();
                } else {
                  const btn = document.querySelector('#bp-web-widget-container button, .bp-widget-web button, [aria-label*="chat" i]');
                  if (btn) btn.click();
                }
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap size={14} />
              <span>LAUNCH FULL SCREEN UPLINK</span>
            </button>
          </div>
        )}

        {/* Bottom Cockpit Telemetry Footer */}
        <div className="px-4 py-2 bg-cyan-950/50 border-t border-cyan-500/30 flex items-center justify-between text-[10px] text-cyan-400/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>LOC: JAIPUR [26.9°N, 75.8°E]</span>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={personalInfo.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-200 transition-colors"
            >
              [GITHUB]
            </a>
            <span>•</span>
            <a 
              href={personalInfo.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-200 transition-colors"
            >
              [LINKEDIN]
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
