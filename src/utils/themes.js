export const THEMES = [
  {
    id: 'sapphire',
    name: 'Sapphire Blue',
    vibe: 'Professional & Clean',
    category: 'Professional',
    primaryColor: '#2563eb',
    secondaryColor: '#4f46e5',
    vars: {
      '--brand-50': '239 246 255',
      '--brand-100': '219 234 254',
      '--brand-200': '191 219 254',
      '--brand-300': '147 197 253',
      '--brand-400': '96 165 250',
      '--brand-500': '37 99 235',
      '--brand-600': '29 78 216',
      '--brand-700': '30 64 175',
      '--brand-800': '30 58 138',
      '--brand-900': '23 37 84',
      '--brand-950': '10 21 53',
      '--brand-secondary': '79 70 229',
      '--brand-secondary-light': '99 102 241',
      '--brand-glow': '37, 99, 235'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    vibe: 'Modern & Fresh',
    category: 'Professional',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6',
    vars: {
      '--brand-50': '236 253 245',
      '--brand-100': '209 250 229',
      '--brand-200': '167 243 208',
      '--brand-300': '110 231 183',
      '--brand-400': '52 211 153',
      '--brand-500': '16 185 129',
      '--brand-600': '5 150 105',
      '--brand-700': '4 120 87',
      '--brand-800': '6 95 70',
      '--brand-900': '6 78 59',
      '--brand-950': '2 44 34',
      '--brand-secondary': '20 184 166',
      '--brand-secondary-light': '45 212 191',
      '--brand-glow': '16, 185, 129'
    }
  },
  {
    id: 'violet',
    name: 'Midnight Violet',
    vibe: 'AI & GenAI',
    category: 'Tech & AI',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    vars: {
      '--brand-50': '250 245 255',
      '--brand-100': '243 232 255',
      '--brand-200': '233 213 255',
      '--brand-300': '216 180 254',
      '--brand-400': '192 132 252',
      '--brand-500': '168 85 247',
      '--brand-600': '147 51 234',
      '--brand-700': '126 34 206',
      '--brand-800': '107 33 168',
      '--brand-900': '88 28 135',
      '--brand-950': '59 7 100',
      '--brand-secondary': '236 72 153',
      '--brand-secondary-light': '244 114 182',
      '--brand-glow': '168, 85, 247'
    }
  },
  {
    id: 'cyan',
    name: 'Ocean Cyan',
    vibe: 'High-Tech & Clean',
    category: 'Tech & AI',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    vars: {
      '--brand-50': '236 254 255',
      '--brand-100': '207 250 254',
      '--brand-200': '165 243 252',
      '--brand-300': '103 232 249',
      '--brand-400': '34 211 238',
      '--brand-500': '6 182 212',
      '--brand-600': '8 145 178',
      '--brand-700': '14 116 144',
      '--brand-800': '21 94 117',
      '--brand-900': '22 78 99',
      '--brand-950': '8 51 68',
      '--brand-secondary': '59 130 246',
      '--brand-secondary-light': '96 165 250',
      '--brand-glow': '6, 182, 212'
    }
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    vibe: 'Warm & Creative',
    category: 'Tech & AI',
    primaryColor: '#f59e0b',
    secondaryColor: '#ea580c',
    vars: {
      '--brand-50': '255 251 235',
      '--brand-100': '254 243 199',
      '--brand-200': '253 230 138',
      '--brand-300': '252 211 77',
      '--brand-400': '251 191 36',
      '--brand-500': '245 158 11',
      '--brand-600': '217 119 6',
      '--brand-700': '180 83 9',
      '--brand-800': '146 64 14',
      '--brand-900': '120 53 15',
      '--brand-950': '69 26 3',
      '--brand-secondary': '234 88 12',
      '--brand-secondary-light': '249 115 22',
      '--brand-glow': '245, 158, 11'
    }
  }
];

export const DEFAULT_THEME_ID = 'sapphire'; // Default to ultra-clean professional Sapphire Enterprise!

export function applyThemeVariables(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const root = document.documentElement;

  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.setAttribute('data-theme', theme.id);
}
