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
    } else {
      document.documentElement.classList.remove('welcome-active');
    }
  }, [showWelcome]);

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
