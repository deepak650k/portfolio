
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

  // Control welcome-screen styling
  useEffect(() => {
    document.documentElement.classList.toggle(
      'welcome-active',
      showWelcome
    );
    document.body.classList.toggle(
      'welcome-active',
      showWelcome
    );
  }, [showWelcome]);

  // Load DEONIKA after the welcome screen finishes
  useEffect(() => {
    if (showWelcome) return;

    const configUrl =
      'https://files.bpcontent.cloud/2026/10/14/16/20261014164838-W6FTKTBM.js';

    // Avoid loading the new chatbot more than once
    if (document.getElementById('botpress-config-script')) return;

    const loadConfig = () => {
      if (document.getElementById('botpress-config-script')) return;

      const configScript = document.createElement('script');
      configScript.id = 'botpress-config-script';
      configScript.src = configUrl;
      configScript.async = true;
      document.body.appendChild(configScript);
    };

    const existingInjector = document.querySelector(
      'script[src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"]'
    );

    if (window.botpress) {
      loadConfig();
    } else if (existingInjector) {
      existingInjector.addEventListener('load', loadConfig, {
        once: true
      });
    } else {
      const injectScript = document.createElement('script');
      injectScript.id = 'botpress-inject-script';
      injectScript.src =
        'https://cdn.botpress.cloud/webchat/v5.0/inject.js';
      injectScript.async = true;
      injectScript.onload = loadConfig;
      document.body.appendChild(injectScript);
    }

    return () => {
      // Keep the loaded chatbot scripts in place.
      // This prevents unnecessary reinjection during React updates.
    };
  }, [showWelcome]);

  // Hide the chatbot while the resume modal is open
  useEffect(() => {
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

    const setBotpressVisibility = (visible) => {
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
        try {
          window.botpress.close();
        } catch {}
      }
    };

    if (isResumeOpen) {
      setBotpressVisibility(false);

      const interval = setInterval(() => {
        setBotpressVisibility(false);
      }, 200);

      return () => {
        clearInterval(interval);
        setBotpressVisibility(true);
      };
    }

    setBotpressVisibility(true);
  }, [isResumeOpen]);

  // Clean and automatically hide the chatbot's proactive preview
  useEffect(() => {
    if (showWelcome) return;

    let timerStarted = false;
    let autoHideTimer = null;
    let hideAnimationTimer = null;

    const cleanSecondsText = (el) => {
      if (!el?.textContent) return;

      const original = el.textContent;
      const cleaned = original
        .replace(
          /\s*[-–—]?\s*(in\s+)?\d+\s*sec(ond)?(s)?(\s*ago)?/gi,
          ''
        )
        .replace(
          /\s*[-–—]?\s*(in\s+a\s+few\s+seconds|just\s+now)/gi,
          ''
        )
        .trim();

      if (original !== cleaned && cleaned.length > 0) {
        el.textContent = cleaned;
      }
    };

    const handlePreviewElement = (previewEl, root) => {
      if (!previewEl) return;

      previewEl
        .querySelectorAll('.bpMessagePreviewDescription, p')
        .forEach(cleanSecondsText);

      if (
        !previewEl.hasAttribute('data-timer-started') &&
        !timerStarted
      ) {
        timerStarted = true;
        previewEl.setAttribute('data-timer-started', 'true');

        autoHideTimer = setTimeout(() => {
          const closeBtn =
            previewEl.querySelector('.bpMessagePreviewCloseButton') ||
            root.querySelector('.bpMessagePreviewCloseButton');

          if (closeBtn) {
            closeBtn.dispatchEvent(
              new MouseEvent('click', {
                bubbles: true,
                cancelable: true
              })
            );
          }

          previewEl.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';
          previewEl.style.opacity = '0';
          previewEl.style.transform =
            'translateY(24px) scale(0.96)';
          previewEl.style.pointerEvents = 'none';

          hideAnimationTimer = setTimeout(() => {
            previewEl.style.display = 'none';
          }, 600);
        }, 7000);
      }
    };

    const inspectDOMAndShadowRoots = () => {
      const hosts = Array.from(
        document.querySelectorAll('*')
      ).filter((el) => el.shadowRoot);

      hosts.forEach((host) => {
        const root = host.shadowRoot;
        if (!root) return;

        root
          .querySelectorAll(
            '.bpMessagePreview, [data-name="message-preview"], .bpMessagePreviewContainer, .bpFABMessagePreview'
          )
          .forEach((container) =>
            handlePreviewElement(container, root)
          );

        root
          .querySelectorAll('.bpMessagePreviewDescription')
          .forEach(cleanSecondsText);
      });

      document
        .querySelectorAll(
          '.bpMessagePreview, [data-name="message-preview"], .bpMessagePreviewContainer'
        )
        .forEach((container) =>
          handlePreviewElement(container, document)
        );
    };

    const interval = setInterval(inspectDOMAndShadowRoots, 150);

    return () => {
      clearInterval(interval);
      if (autoHideTimer) clearTimeout(autoHideTimer);
      if (hideAnimationTimer) clearTimeout(hideAnimationTimer);
    };
  }, [showWelcome]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {showWelcome && (
        <WelcomeAnimation onComplete={handleWelcomeComplete} />
      )}

      <div
        id="portfolio-website-content"
        className="flex flex-col min-h-screen flex-1"
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main className="flex-1">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
