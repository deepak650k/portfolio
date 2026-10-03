import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  MapPin, 
  ChevronDown,
  Code2,
  Cpu,
  Radio,
  Zap,
  ShieldCheck,
  Crosshair,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import InteractiveTerminalCard from './InteractiveTerminalCard';

/**
 * Hero - Futuristic Cyber HUD / JARVIS Command Interface
 * Operative Dossier with real-time telemetry, rotating Arc Reactor diagnostics,
 * and tactical cyber-corner action controls.
 */
export default function Hero() {
  const protocols = [
    "PROTOCOL // FULL-STACK WEB ARCHITECTURE",
    "PROTOCOL // AUTONOMOUS AI AGENTS & LLMs",
    "PROTOCOL // HIGH-PERFORMANCE SYSTEM DESIGN",
    "PROTOCOL // SCALABLE DIGITAL PRODUCTIVITY"
  ];
  const [protocolIndex, setProtocolIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Live HUD telemetry clock (Local / Mission Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins}:${secs} IST`);
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Kinetic protocol cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setProtocolIndex((prev) => (prev + 1) % protocols.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [protocols.length]);

  // Client-side synthesized Sci-Fi audio feedback (Web Audio API)
  const triggerHudSound = (freq = 1200) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext policy safe fallback
    }
  };

  const scrollTo = (id) => {
    triggerHudSound(1400);
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Precision HUD Reticle Overlay Watermarks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-cyan-500/[0.04] rounded-full pointer-events-none -z-10 animate-spin-slow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400/20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400/20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Top Tactical Telemetry HUD Bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 p-2.5 sm:px-4 rounded-xl bg-[#060d1a]/80 border border-cyan-500/30 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono shadow-lg shadow-cyan-950/40"
        >
          {/* System Online Status */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
            </span>
            <span className="text-cyan-300 font-bold tracking-wide">SYS.ONLINE // 99.8% NOMINAL</span>
            <span className="text-cyan-500/40 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">CORE: MK-4 COMMAND</span>
          </div>

          {/* Sector & Telemetry Data */}
          <div className="flex items-center gap-3 text-cyan-400/90">
            <div className="flex items-center gap-1.5">
              <Compass size={13} className="text-cyan-300 animate-spin-slow" />
              <span className="hidden md:inline text-slate-400">SECTOR:</span>
              <span className="font-semibold text-slate-200">JAIPUR [26.9°N, 75.8°E]</span>
            </div>

            <span className="text-cyan-500/40">•</span>

            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Radio size={13} className="text-cyan-400 animate-pulse" />
              <span>{currentTime || 'SYNCHRONIZING...'}</span>
            </div>

            {/* Audio Feedback Toggle */}
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) triggerHudSound(1200);
              }}
              title={soundEnabled ? 'HUD Audio: ON' : 'HUD Audio: MUTED'}
              className="ml-1 p-1 rounded hover:bg-cyan-500/20 text-cyan-400 transition-colors"
            >
              {soundEnabled ? <Volume2 size={14} className="text-cyan-300" /> : <VolumeX size={14} className="text-slate-500" />}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Operative Dossier & Tactical Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Classified Operative Callout Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-5 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Crosshair size={13} className="text-cyan-400 animate-pulse" />
              <span className="font-bold tracking-wider">OPERATIVE DOSSIER // JECRC DIVISION</span>
              <span className="text-cyan-400/40">•</span>
              <span className="text-emerald-400 font-semibold text-[11px]">B.TECH CSE 2027</span>
            </div>

            {/* Futuristic Operative Name Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.05] mb-4 text-white">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 block mb-1 uppercase">
                &gt; DESIGNATION IDENTIFIER
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent hud-text-glow">
                DEEPAK KUMAWAT
              </span>
            </h1>

            {/* Kinetic Protocol Decoder Strip */}
            <div className="w-full max-w-xl h-12 flex items-center px-4 rounded-xl bg-[#060c18]/90 border border-cyan-500/35 mb-6 backdrop-blur-md shadow-inner">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 shrink-0 mr-3">
                <Terminal size={14} />
              </div>
              <div className="h-6 overflow-hidden relative flex items-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={protocolIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute left-0 font-mono text-xs sm:text-sm font-bold text-cyan-400 tracking-wider flex items-center gap-1.5"
                  >
                    <span>&gt;</span>
                    <span className="text-slate-100">{protocols[protocolIndex]}</span>
                    <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse ml-1" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mission Statement & Architectural Brief */}
            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl leading-relaxed mb-8">
              B.Tech Computer Science engineer orchestrating high-performance full-stack web applications and autonomous AI workflows. Engineering resilient software with surgical precision and modern UI aesthetics.
            </p>

            {/* Cyber-Corner Tactical HUD Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              
              {/* Primary Initiate Mission Button with Angled Cyber Corners */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => triggerHudSound(1500)}
                onClick={() => scrollTo('projects')}
                className="relative group px-7 py-3.5 font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer cyber-corner hud-glow-cyan flex items-center gap-2.5"
              >
                <Zap size={15} className="text-black group-hover:scale-110 transition-transform" />
                <span>INITIATE MISSION // PROJECTS</span>
                <ArrowRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Secondary Establish Uplink Button */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => triggerHudSound(1100)}
                onClick={() => scrollTo('contact')}
                className="relative group px-6 py-3.5 font-mono font-bold text-xs uppercase tracking-wider text-cyan-300 hover:text-white bg-[#060c18]/90 hover:bg-[#0c182d] border border-cyan-500/50 hover:border-cyan-400 transition-all cursor-pointer cyber-corner flex items-center gap-2"
              >
                <Mail size={14} className="text-cyan-400" />
                <span>ESTABLISH UPLINK</span>
              </motion.button>

            </div>

            {/* Comm-Link Nodes & Armor Telemetry Footer */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-cyan-500/20 w-full font-mono text-xs text-slate-400">
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">UPLINK NODES:</span>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => triggerHudSound(1300)}
                  className="px-2.5 py-1 rounded bg-[#091528] border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  aria-label="GitHub Profile"
                >
                  <Github size={13} />
                  <span className="text-[11px]">GH</span>
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => triggerHudSound(1300)}
                  className="px-2.5 py-1 rounded bg-[#091528] border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={13} />
                  <span className="text-[11px]">LI</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onMouseEnter={() => triggerHudSound(1300)}
                  className="px-2.5 py-1 rounded bg-[#091528] border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  aria-label="Email Deepak"
                >
                  <Mail size={13} />
                  <span className="text-[11px]">MAIL</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold sm:ml-auto">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>DEFENSE MATRIX: OPTIMAL</span>
              </div>

            </div>

          </motion.div>

          {/* Right Column: Arc Reactor Core & Telemetry Cockpit Matrix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -6, 0]
            }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.2 },
              scale: { duration: 0.7, delay: 0.2 },
              y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="lg:col-span-5 relative"
          >
            <InteractiveTerminalCard />
          </motion.div>

        </div>

        {/* Tactical Scroll Reticle */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-cyan-400/70 hover:text-cyan-300 transition-colors animate-bounce cursor-pointer font-mono"
            aria-label="Scroll to Dossier Breakdown"
          >
            <span className="text-[10px] tracking-widest uppercase">&gt; SCAN SYSTEM ARCHITECTURE &lt;</span>
            <ChevronDown size={18} className="text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
