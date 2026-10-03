import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, ArrowRight } from 'lucide-react';

const promptMessages = [
  "👋 Hi! Ask me anything about JECRC University!",
  "🎓 Inquire about B.Tech CSE, syllabus & admissions!",
  "🏫 Curious about campus life, hostels & fee structure?",
  "💼 Want to know about placements & recruiters?",
  "⚡ Tap to start a live chat with Campus Buddy AI!"
];

export default function CampusBuddyEnhancer({ isWelcomeActive = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [autoHidden, setAutoHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const autoHideTimerRef = useRef(null);

  useEffect(() => {
    // If welcome screen is active, do not start show timers yet
    if (isWelcomeActive) {
      setIsReady(false);
      return;
    }

    // Show prompt bubble 2.5 seconds AFTER welcome animation finishes
    const showTimer = setTimeout(() => {
      setIsReady(true);
    }, 2500);

    // Auto-hide the prompt text bubble after 8.5 seconds
    autoHideTimerRef.current = setTimeout(() => {
      setAutoHidden(true);
    }, 9500);

    // Cycle prompt messages while active
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % promptMessages.length);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoHideTimerRef.current);
      clearInterval(interval);
    };
  }, [isWelcomeActive]);

  useEffect(() => {
    // Inject enhanced CSS for Botpress FAB & Chat Window
    const styleId = 'campus-buddy-custom-animation';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* Hide completely while welcome is active */
        .welcome-active #bp-web-widget-container,
        .welcome-active div:has(> iframe[title*="chat" i]),
        .welcome-active div:has(> iframe[src*="botpress" i]),
        .welcome-active .bp-widget-web,
        .welcome-active #bp-web-widget,
        .welcome-active .bpw-widget {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Hardware-accelerated entrance and gentle floating for Botpress FAB */
        #bp-web-widget-container,
        div:has(> iframe[title*="chat" i]),
        div:has(> iframe[src*="botpress" i]),
        .bp-widget-web,
        #bp-web-widget {
          animation: bpEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     bpFloat 4.5s ease-in-out infinite 0.75s !important;
          transform-origin: bottom right;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease !important;
        }

        #bp-web-widget-container:hover,
        .bp-widget-web:hover {
          transform: scale(1.08) translateY(-3px) !important;
          filter: drop-shadow(0 8px 24px rgba(58, 136, 254, 0.6)) !important;
        }

        @keyframes bpEntrance {
          0% {
            opacity: 0;
            transform: translateY(35px) scale(0.8);
          }
          70% {
            transform: translateY(-5px) scale(1.04);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bpFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Glassmorphism & drop-shadow for opened chat window */
        #bp-web-widget-container iframe,
        div:has(> iframe[title*="chat" i]) iframe,
        div:has(> iframe[src*="botpress" i]) iframe {
          border-radius: 24px !important;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.45), 0 0 30px rgba(58, 136, 254, 0.25) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          #bp-web-widget-container,
          .bp-widget-web {
            animation: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Connect with Botpress API events to track open/close
    const checkBotpressInterval = setInterval(() => {
      if (window.botpress) {
        try {
          window.botpress.on('webchat:opened', () => setIsOpen(true));
          window.botpress.on('webchat:closed', () => setIsOpen(false));
          clearInterval(checkBotpressInterval);
        } catch (e) {
          // Ignore
        }
      }
    }, 500);

    // Mutation observer fallback to detect when Botpress opens or closes iframe
    const observer = new MutationObserver(() => {
      const chatIframe = document.querySelector('iframe[title*="chat" i], iframe[src*="botpress" i]');
      if (chatIframe) {
        const isVisible = chatIframe.offsetWidth > 100 && chatIframe.offsetHeight > 100;
        setIsOpen(isVisible);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      clearInterval(checkBotpressInterval);
      observer.disconnect();
    };
  }, []);

  const handleOpenChat = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    } else {
      // Direct click fallback
      const btn = document.querySelector('#bp-web-widget-container button, .bp-widget-web button, [aria-label*="chat" i]');
      if (btn) btn.click();
    }
    setIsOpen(true);
    setAutoHidden(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Hide smoothly 3.5 seconds after user moves away
    autoHideTimerRef.current = setTimeout(() => {
      setAutoHidden(true);
    }, 3500);
  };

  return (
    <>
      {/* 1. Pulsing Radar Wave Beacon around Botpress FAB (Hidden during welcome) */}
      {!isOpen && !isWelcomeActive && (
        <div 
          onClick={handleOpenChat}
          onMouseEnter={() => {
            // Re-show prompt bubble if hovered over the launcher area
            if (!dismissed) {
              setAutoHidden(false);
              clearTimeout(autoHideTimerRef.current);
            }
          }}
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 w-18 h-18 pointer-events-none z-30 flex items-center justify-center cursor-pointer"
          aria-hidden="true"
        >
          {/* Outer Expanding Wave */}
          <span 
            className="absolute inline-flex w-16 h-16 rounded-full bg-violet-400/25 animate-ping"
            style={{ animationDuration: '3.2s' }}
          />
          {/* Inner Secondary Wave */}
          <span 
            className="absolute inline-flex w-14 h-14 rounded-full bg-amber-500/20 animate-ping"
            style={{ animationDuration: '2.4s', animationDelay: '0.8s' }}
          />
          {/* Ambient Radial Halo */}
          <span className="absolute inline-flex w-16 h-16 rounded-full bg-gradient-to-tr from-brand-500/20 to-amber-400/20 blur-md animate-pulse" />
        </div>
      )}

      {/* 2. Interactive Floating Speech Bubble Companion (Hidden during welcome, auto-hides after some time) */}
      <AnimatePresence>
        {isReady && !isOpen && !dismissed && !autoHidden && !isWelcomeActive && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed bottom-24 right-4 sm:right-6 z-40 max-w-[290px] sm:max-w-[320px] select-none"
          >
            {/* Glassmorphic Bubble Card */}
            <div 
              onClick={handleOpenChat}
              className="relative group p-3.5 rounded-2xl bg-slate-900/98 dark:bg-slate-950/98 border border-brand-500/40 hover:border-brand-500/70 shadow-2xl shadow-brand-500/25 backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Top Laser Accent Beam */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 via-rose-500 to-transparent" />

              {/* Header row with Avatar, Title and Close Button */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 shrink-0">
                    <Bot size={17} className="animate-pulse" />
                    {/* Live Green Online Dot */}
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold font-heading bg-gradient-to-r from-white via-rose-100 to-amber-300 bg-clip-text text-transparent leading-none">
                      Campus Buddy AI
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-bold uppercase">
                        Online
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        JECRC University
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDismissed(true);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Dismiss prompt"
                  title="Dismiss prompt"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Dynamic Kinetic Prompt Message with Distinctive Styling & Colors */}
              <div className="min-h-[42px] flex items-center py-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={promptIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs sm:text-[13px] leading-relaxed text-slate-100 font-sans"
                  >
                    <span className="inline-block px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500/20 to-amber-500/20 border border-violet-400/30 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider mr-1.5">
                      AI
                    </span>
                    <span className="font-semibold text-slate-100 drop-shadow-sm">
                      {promptMessages[promptIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Quick Call-to-action */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles size={12} className="text-amber-400 animate-spin-slow" />
                  <span className="tracking-wide">Ask Campus Buddy</span>
                </span>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 group-hover:bg-amber-500/25 transition-colors">
                  <span className="text-[10px] font-mono uppercase font-bold">Chat</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
