import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight, GraduationCap, Palette } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './ThemeSelector';

export default function Navbar() {
  const { darkMode, toggleDarkMode, colorTheme, setColorTheme, themes, activeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/90 bg-white/85 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/80 shadow-lg shadow-black/5 dark:shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
          >
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-secondary text-white font-bold text-lg shadow-md shadow-brand-500/25"
            >
              <span>DK</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono -mt-0.5 flex items-center gap-1">
                <span>{personalInfo.college}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-brand-600 rounded-full -z-10 shadow-sm shadow-brand-600/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Selector with visible text label & color indicator */}
            <ThemeSelector />

            {/* Dark / Light Mode Switcher with text */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.02 }}
              onClick={toggleDarkMode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-all duration-200 shadow-sm"
              aria-label="Toggle theme appearance"
            >
              {darkMode ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span className="text-xs font-semibold">Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-slate-700" />
                  <span className="text-xs font-semibold">Dark</span>
                </>
              )}
            </motion.button>

            {/* Let's Talk CTA */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 to-brand-secondary hover:from-brand-500 hover:to-brand-secondary-light text-white shadow-md shadow-brand-500/20 hover:shadow-brand-500/35 transition-all duration-200"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </motion.a>
          </div>

          {/* Mobile Menu & Theme Toggle Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSelector />

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme appearance"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-slate-900/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              {/* Mobile Quick Color Theme Picker */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Palette size={13} className="text-brand-500" />
                    Color Theme
                  </span>
                  <span className="text-[11px] font-mono text-brand-400 font-semibold">
                    {activeTheme.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 max-h-48 overflow-y-auto pr-1">
                  {themes.map((theme) => {
                    const isSelected = colorTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setColorTheme(theme.id)}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-brand-500/20 border border-brand-500 text-white font-bold'
                            : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <span className="truncate">{theme.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavClick(e, '#contact');
                  }}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-secondary hover:from-brand-500 hover:to-brand-secondary-light text-white font-medium shadow-lg shadow-brand-600/30"
                >
                  Contact Me
                </a>
                <div className="text-center text-xs text-slate-400 font-mono">
                  {personalInfo.college} • {personalInfo.location}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
