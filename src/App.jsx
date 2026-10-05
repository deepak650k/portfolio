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

import { useTheme } from './context/ThemeContext';

export default function App() {
  const { darkMode, setDarkMode } = useTheme();

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

      {/* Top Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero / Home */}
        <Hero />

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
  );
}
