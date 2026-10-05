import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector({ showModeToggle = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { colorTheme, setColorTheme, themes, activeTheme, darkMode, toggleDarkMode } = useTheme();

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button with Text */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        aria-label="Change portfolio theme"
        aria-expanded={isOpen}
      >
        {/* Active Theme Color Swatch Dot */}
        <span className="relative flex h-3 w-3">
          <span 
            style={{ backgroundColor: activeTheme.primaryColor }}
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          />
          <span 
            style={{ backgroundColor: activeTheme.primaryColor }}
            className="relative inline-flex rounded-full h-3 w-3 shadow-xs"
          />
        </span>

        {/* Clear Theme Label Text */}
        <span className="hidden md:inline text-slate-500 dark:text-slate-400 font-medium text-[11px] uppercase tracking-wider">
          Theme:
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-100">
          {activeTheme.name.split(' ')[0]}
        </span>

        <ChevronDown 
          size={14} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      {/* Dropdown Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette size={15} className="text-brand-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Choose Color Theme
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold">
                7 Styles
              </span>
            </div>

            {/* Theme Options List */}
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {themes.map((theme) => {
                const isSelected = colorTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setColorTheme(theme.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                      isSelected
                        ? 'bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/30 text-brand-700 dark:text-brand-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Gradient Duo Swatch */}
                      <div 
                        className="w-5 h-5 rounded-lg shadow-sm border border-black/10 shrink-0 flex items-center justify-center overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
                        }}
                      />

                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {theme.name}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                          {theme.vibe}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-xs"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mode Toggle Footer inside dropdown */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 px-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Appearance Mode
              </span>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {darkMode ? (
                  <>
                    <Sun size={13} className="text-amber-400" />
                    <span>Dark (Switch to Light)</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-slate-600" />
                    <span>Light (Switch to Dark)</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
