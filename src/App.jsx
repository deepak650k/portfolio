import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CampusBuddyEnhancer from './components/CampusBuddyEnhancer';
import WelcomeAnimation from './components/WelcomeAnimation';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !sessionStorage.getItem('hasSeenWelcome');
    } catch {
      return false;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode for premium developer aesthetic, check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // default dark
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (showWelcome) {
      document.documentElement.classList.add('welcome-active');
    } else {
      document.documentElement.classList.remove('welcome-active');
    }
  }, [showWelcome]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans selection:bg-brand-500 selection:text-white"
    >
      {/* Cinematic Welcome Animation Curtain Reveal */}
      {showWelcome && (
        <WelcomeAnimation 
          onComplete={() => {
            setShowWelcome(false);
            try {
              sessionStorage.setItem('hasSeenWelcome', 'true');
            } catch {}
          }} 
        />
      )}

      {/* Global Interactive Animated Particle Canvas & Atmospheric Background */}
      <ParticleBackground />

      {/* Top Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero / Home */}
        <Hero />

        {/* Dynamic Tech Marquee */}
        <TechMarquee />

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

      {/* Campus Buddy AI Chatbot Animation Companion */}
      <CampusBuddyEnhancer isWelcomeActive={showWelcome} />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
