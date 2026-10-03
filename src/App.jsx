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

export default function App() {
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans selection:bg-brand-500 selection:text-white"
    >
      {/* Top Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main className="flex-1">
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
      <CampusBuddyEnhancer />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
