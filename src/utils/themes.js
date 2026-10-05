export const THEMES = [
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    vibe: 'Linear & Supabase AI',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6',
    previewDot: 'bg-emerald-500',
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
    id: 'blue',
    name: 'Electric Blue',
    vibe: 'Silicon Valley Executive',
    primaryColor: '#0ea5e9',
    secondaryColor: '#6366f1',
    previewDot: 'bg-sky-500',
    vars: {
      '--brand-50': '240 247 255',
      '--brand-100': '224 239 254',
      '--brand-200': '186 224 253',
      '--brand-300': '124 199 251',
      '--brand-400': '56 168 248',
      '--brand-500': '14 140 233',
      '--brand-600': '2 110 199',
      '--brand-700': '3 88 161',
      '--brand-800': '7 75 133',
      '--brand-900': '12 63 110',
      '--brand-950': '8 40 73',
      '--brand-secondary': '99 102 241',
      '--brand-secondary-light': '129 140 248',
      '--brand-glow': '14, 140, 233'
    }
  },
  {
    id: 'violet',
    name: 'Midnight Violet',
    vibe: 'Next-Gen GenAI & Raycast',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    previewDot: 'bg-purple-500',
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
    id: 'amber',
    name: 'Sunset Amber',
    vibe: 'Warm Craft & Product',
    primaryColor: '#f59e0b',
    secondaryColor: '#ea580c',
    previewDot: 'bg-amber-500',
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
  },
  {
    id: 'rose',
    name: 'Cyber Rose',
    vibe: 'Neon Magenta & High Energy',
    primaryColor: '#f43f5e',
    secondaryColor: '#a855f7',
    previewDot: 'bg-rose-500',
    vars: {
      '--brand-50': '255 241 242',
      '--brand-100': '255 228 230',
      '--brand-200': '254 205 211',
      '--brand-300': '253 164 175',
      '--brand-400': '251 113 133',
      '--brand-500': '244 63 94',
      '--brand-600': '225 29 72',
      '--brand-700': '190 18 60',
      '--brand-800': '159 18 57',
      '--brand-900': '136 19 55',
      '--brand-950': '76 5 25',
      '--brand-secondary': '168 85 247',
      '--brand-secondary-light': '192 132 252',
      '--brand-glow': '244, 63, 94'
    }
  },
  {
    id: 'cyan',
    name: 'Ocean Cyan',
    vibe: 'Hyper-Clean Aqua Tech',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    previewDot: 'bg-cyan-500',
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
    id: 'mono',
    name: 'Monochrome Silver',
    vibe: 'Minimalist OLED Luxury',
    primaryColor: '#e4e4e7',
    secondaryColor: '#71717a',
    previewDot: 'bg-zinc-300',
    vars: {
      '--brand-50': '250 250 250',
      '--brand-100': '244 244 245',
      '--brand-200': '228 228 231',
      '--brand-300': '212 212 216',
      '--brand-400': '161 161 170',
      '--brand-500': '228 228 231',
      '--brand-600': '212 212 216',
      '--brand-700': '161 161 170',
      '--brand-800': '113 113 122',
      '--brand-900': '63 63 70',
      '--brand-950': '24 24 27',
      '--brand-secondary': '161 161 170',
      '--brand-secondary-light': '212 212 216',
      '--brand-glow': '228, 228, 231'
    }
  }
];

export const DEFAULT_THEME_ID = 'emerald';

export function applyThemeVariables(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const root = document.documentElement;

  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.setAttribute('data-theme', theme.id);
}
