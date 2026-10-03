import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

export default function CampusBuddyEnhancer() {
  const [stage, setStage] = useState('hidden'); // 'hidden' | 'need-help' | 'ask-campus' | 'dismissed'
  const [botReady, setBotReady] = useState(false);

  useEffect(() => {
    // 1. Give chatbot launcher entrance timing
    // After ~1s, enable launcher entrance and ripple
    const entranceTimer = setTimeout(() => {
      setBotReady(true);
      applyBotpressLauncherStyles();
    }, 1000);

    // 2. Tooltip stage 1: "Need help? 👋" at 1.7s
    const tooltipTimer1 = setTimeout(() => {
      setStage('need-help');
    }, 1700);

    // 3. Tooltip stage 2: "Ask Campus Buddy →" at 3.6s
    const tooltipTimer2 = setTimeout(() => {
      setStage('ask-campus');
    }, 3600);

    // 4. Dismiss tooltip after a few seconds at 7s
    const dismissTimer = setTimeout(() => {
      setStage('dismissed');
    }, 7200);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(tooltipTimer1);
      clearTimeout(tooltipTimer2);
      clearTimeout(dismissTimer);
    };
  }, []);

  // Inject graceful styles to the Botpress container once injected
  const applyBotpressLauncherStyles = () => {
    const styleId = 'campus-buddy-custom-animation';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* Target Botpress launcher container */
      #bp-web-widget-container,
      div:has(> iframe[title*="chat" i]),
      div:has(> iframe[src*="botpress" i]),
      .bp-widget-web,
      #bp-web-widget {
        animation: botpressEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                   botpressGlowPulse 2.5s ease-out 1,
                   botpressSubtleFloat 5s ease-in-out infinite 2.5s !important;
        transform-origin: bottom right;
      }

      @keyframes botpressEntrance {
        0% {
          opacity: 0;
          transform: translateY(22px) scale(0.85);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes botpressGlowPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(58, 136, 254, 0.7);
        }
        50% {
          box-shadow: 0 0 0 18px rgba(58, 136, 254, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(58, 136, 254, 0);
        }
      }

      @keyframes botpressSubtleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-4px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #bp-web-widget-container,
        .bp-widget-web {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const handleOpenChat = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    } else {
      // Find and click the launcher element directly
      const launcher = document.querySelector(
        '#bp-web-widget-container, .bpw-widget-btn, button[aria-label*="chat" i], div:has(> iframe[src*="botpress" i])'
      );
      if (launcher) launcher.click();
    }
    setStage('dismissed');
  };

  return (
    <div className="fixed bottom-24 right-5 sm:right-6 z-40 pointer-events-auto select-none">
      <AnimatePresence mode="wait">
        {stage !== 'hidden' && stage !== 'dismissed' && (
          <motion.button
            key={stage}
            onClick={handleOpenChat}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-brand-500/40 dark:border-brand-500/50 shadow-xl shadow-brand-500/15 backdrop-blur-md cursor-pointer group"
          >
            {stage === 'need-help' ? (
              <>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                  Need help? 👋
                </span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-blue-500" />
                <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  Ask Campus Buddy
                </span>
                <ArrowRight size={13} className="text-blue-500 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}

            {/* Downward triangle pointer pointing towards chatbot */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-brand-500/40 rotate-45"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
