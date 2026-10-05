import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeAnimation from './components/WelcomeAnimation';
import ResumeModal from './components/ResumeModal';

import { useTheme } from './context/ThemeContext';

export default function App() {
  const { darkMode, setDarkMode } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      // Only show on first visit in the session; do not show on refresh
      return !sessionStorage.getItem('hasSeenWelcome');
    } catch {
      return false;
    }
  });

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    try {
      sessionStorage.setItem('hasSeenWelcome', 'true');
    } catch {}
  };

  useEffect(() => {
    if (showWelcome) {
      document.documentElement.classList.add('welcome-active');
      document.body.classList.add('welcome-active');
    } else {
      document.documentElement.classList.remove('welcome-active');
      document.body.classList.remove('welcome-active');
    }
  }, [showWelcome]);

  // Dynamically load Botpress chatbot ONLY AFTER welcome screen finishes
  useEffect(() => {
    if (showWelcome) return;

    if (document.getElementById('botpress-inject-script')) return;

    const injectScript = document.createElement('script');
    injectScript.id = 'botpress-inject-script';
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js';
    injectScript.async = true;

    injectScript.onload = () => {
      const configScript = document.createElement('script');
      configScript.id = 'botpress-config-script';
      configScript.src = 'https://files.bpcontent.cloud/2026/10/03/06/20261003061746-HGPHSTPW.js';
      configScript.defer = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);
  }, [showWelcome]);

  // Control Chatbot visibility when resume is opened or closed
  useEffect(() => {
    const setBotpressVisibility = (visible) => {
      const selectors = [
        'botpress-webchat',
        'bp-widget',
        'bp-webchat',
        '.bpContainer',
        '.bpWebchat',
        '.bpModalContainer',
        '#bp-web-widget-container',
        '#bp-web-widget',
        '.bp-widget-web',
        '.bpw-widget',
        '.bp-widget',
        '[class*="bpContainer"]',
        '[class*="bpWebchat"]',
        '[class*="bpModal"]',
        '[class*="bp-"]',
        '[id*="bp-"]',
        '[class*="botpress"]',
        '[id*="botpress"]',
        'iframe[title*="chat" i]',
        'iframe[src*="botpress" i]'
      ];

      document.querySelectorAll(selectors.join(',')).forEach((el) => {
        if (visible) {
          el.style.removeProperty('display');
          el.style.removeProperty('visibility');
          el.style.removeProperty('opacity');
          el.style.removeProperty('pointer-events');
          el.removeAttribute('data-hidden-by-resume');
        } else {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
          el.setAttribute('data-hidden-by-resume', 'true');
        }
      });

      if (!visible && window.botpress?.close) {
        try { window.botpress.close(); } catch {}
      }
    };

    if (isResumeOpen) {
      setBotpressVisibility(false);
      const interval = setInterval(() => setBotpressVisibility(false), 200);
      return () => {
        clearInterval(interval);
        setBotpressVisibility(true);
      };
    } else {
      setBotpressVisibility(true);
    }
  }, [isResumeOpen]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Cinematic Welcome Screen - Only shows on first visit, not on refresh */}
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}

      {/* Main Website Wrapper - cleanly hidden during resume PDF print */}
      <div id="portfolio-website-content" className="flex flex-col min-h-screen flex-1">
        {/* Top Navbar */}
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero / Home */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          {/* 2. About Me */}
          <About />

          {/* 3. Education */}
          <Education />

          {/* 4. Skills */}
          <Skills />

          {/* 5. Projects */}
          <Projects />

          {/* 6. Achievements */}
          <Achievements />

          {/* 7. Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Standalone Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
