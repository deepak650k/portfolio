import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, DEFAULT_THEME_ID, applyThemeVariables } from '../utils/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Color palette theme (e.g. emerald, blue, violet, amber, etc.)
  const [colorTheme, setColorThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-color-theme');
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {}
    return DEFAULT_THEME_ID;
  });

  // Dark / Light appearance mode
  const [darkMode, setDarkModeState] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
    } catch {}
    return true; // default dark
  });

  // Apply CSS color variables on mount and when colorTheme changes
  useEffect(() => {
    applyThemeVariables(colorTheme);
    try {
      localStorage.setItem('portfolio-color-theme', colorTheme);
    } catch {}
  }, [colorTheme]);

  // Apply dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    }
  }, [darkMode]);

  const setColorTheme = (id) => {
    if (THEMES.some((t) => t.id === id)) {
      setColorThemeState(id);
    }
  };

  const toggleDarkMode = () => {
    setDarkModeState((prev) => !prev);
  };

  const setDarkMode = (val) => {
    setDarkModeState(val);
  };

  const activeTheme = THEMES.find((t) => t.id === colorTheme) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        themes: THEMES,
        activeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
