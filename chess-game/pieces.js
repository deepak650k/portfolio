/**
 * Clean & Minimalist SVG Chess Pieces
 * Designed with high-contrast styling for the Blue-Black Theme:
 * - White pieces: Platinum Ice (#F8FAFC) with deep navy edge (#0F172A) and cyan accent
 * - Black pieces: Midnight Obsidian (#0F172A) with vibrant cyan-blue contours (#38BDF8)
 */

const PIECES_SVG = {
  // WHITE PIECES
  'wP': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wPawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
      <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <g filter="url(#whiteGlow)">
      <path d="M 22.5 9 C 19.8 9 17.6 11.2 17.6 13.9 C 17.6 15.6 18.5 17.1 19.8 18 C 17.5 19.2 16 21.6 16 24.5 L 16 27 C 16 28 17 29 18 29.5 L 14 36 L 31 36 L 27 29.5 C 28 29 29 28 29 27 L 29 24.5 C 29 21.6 27.5 19.2 25.2 18 C 26.5 17.1 27.4 15.6 27.4 13.9 C 27.4 11.2 25.2 9 22.5 9 z" 
        fill="url(#wPawnGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 12 36 L 33 36 C 34 36 34.5 37 34 38 L 32.5 40 L 12.5 40 L 11 38 C 10.5 37 11 36 12 36 z" 
        fill="url(#wPawnGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="22.5" cy="13.9" r="3.2" fill="#f8fafc" stroke="#38bdf8" stroke-width="0.8"/>
      <path d="M 17 28.5 L 28 28.5" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  'wN': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wKnightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <g filter="url(#whiteGlow)">
      <path d="M 22 10 C 22 10 20 7 15 9 C 11 11 10 16 11 19 C 11 20 13 22 14 20 C 14 19 15 18 16 18 C 15 21 11 22 9 25 C 7 28 8 32 12 34 L 14 36 L 31 36 L 31 32 C 31 30 33 26 33 22 C 33 16 30 11 24 10 z" 
        fill="url(#wKnightGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 11 36 L 34 36 C 35 36 35.5 37 35 38 L 33.5 40 L 11.5 40 L 10 38 C 9.5 37 10 36 11 36 z" 
        fill="url(#wKnightGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="15.5" cy="16" r="1.5" fill="#0f172a"/>
      <path d="M 20 13 C 24 15 27 18 27 24" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 15 24 C 18 26 21 28 22 31" fill="none" stroke="#38bdf8" stroke-width="1" stroke-linecap="round"/>
    </g>
  </svg>`,

  'wB': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wBishopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <g filter="url(#whiteGlow)">
      <circle cx="22.5" cy="8.5" r="2.2" fill="#38bdf8" stroke="#0f172a" stroke-width="1.2"/>
      <path d="M 22.5 11 C 18 11 15 15 15 21 C 15 25 17 28 18 30 L 14.5 36 L 30.5 36 L 27 30 C 28 28 30 25 30 21 C 30 15 27 11 22.5 11 z" 
        fill="url(#wBishopGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 11.5 36 L 33.5 36 C 34.5 36 35 37 34.5 38 L 33 40 L 12 40 L 10.5 38 C 10 37 10.5 36 11.5 36 z" 
        fill="url(#wBishopGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <!-- Bishop cut -->
      <path d="M 21 16 L 25 21 M 25 16 L 21 21" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M 17 29 L 28 29" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  'wR': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wRookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <g filter="url(#whiteGlow)">
      <path d="M 14 13 L 14 17 L 17 17 L 17 14 L 20 14 L 20 17 L 25 17 L 25 14 L 28 14 L 28 17 L 31 17 L 31 13 L 14 13 z" 
        fill="url(#wRookGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 15 17 L 17 28 L 14 36 L 31 36 L 28 28 L 30 17 z" 
        fill="url(#wRookGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 11.5 36 L 33.5 36 C 34.5 36 35 37 34.5 38 L 33 40 L 12 40 L 10.5 38 C 10 37 10.5 36 11.5 36 z" 
        fill="url(#wRookGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 18 24 L 27 24" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="22.5" cy="24" r="1.5" fill="#38bdf8"/>
    </g>
  </svg>`,

  'wQ': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wQueenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <g filter="url(#whiteGlow)">
      <circle cx="11" cy="13" r="1.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1"/>
      <circle cx="16.5" cy="11" r="1.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1"/>
      <circle cx="22.5" cy="10" r="2.2" fill="#38bdf8" stroke="#0f172a" stroke-width="1"/>
      <circle cx="28.5" cy="11" r="1.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1"/>
      <circle cx="34" cy="13" r="1.8" fill="#38bdf8" stroke="#0f172a" stroke-width="1"/>
      <path d="M 11.5 15 L 14 28 L 13 36 L 32 36 L 31 28 L 33.5 15 L 27.5 21 L 22.5 13 L 17.5 21 z" 
        fill="url(#wQueenGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 10.5 36 L 34.5 36 C 35.5 36 36 37 35.5 38 L 34 40 L 11 40 L 9.5 38 C 9 37 9.5 36 10.5 36 z" 
        fill="url(#wQueenGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 16 30 L 29 30" stroke="#38bdf8" stroke-width="1.3" stroke-linecap="round"/>
      <circle cx="22.5" cy="26" r="2" fill="#f8fafc" stroke="#38bdf8" stroke-width="1"/>
    </g>
  </svg>`,

  'wK': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-white">
    <defs>
      <linearGradient id="wKingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <g filter="url(#whiteGlow)">
      <!-- Cross finial -->
      <path d="M 22.5 6 L 22.5 12 M 19.5 9 L 25.5 9" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      <path d="M 15 14 C 18 12 27 12 30 14 C 32 17 31 22 28 26 L 31 36 L 14 36 L 17 26 C 14 22 13 17 15 14 z" 
        fill="url(#wKingGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 10.5 36 L 34.5 36 C 35.5 36 36 37 35.5 38 L 34 40 L 11 40 L 9.5 38 C 9 37 9.5 36 10.5 36 z" 
        fill="url(#wKingGrad)" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M 16 28 L 29 28" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M 19 20 C 22.5 18 22.5 18 26 20" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round"/>
    </g>
  </svg>`,

  // BLACK PIECES
  'bP': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bPawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
      <filter id="blackGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>
    <g filter="url(#blackGlow)">
      <path d="M 22.5 9 C 19.8 9 17.6 11.2 17.6 13.9 C 17.6 15.6 18.5 17.1 19.8 18 C 17.5 19.2 16 21.6 16 24.5 L 16 27 C 16 28 17 29 18 29.5 L 14 36 L 31 36 L 27 29.5 C 28 29 29 28 29 27 L 29 24.5 C 29 21.6 27.5 19.2 25.2 18 C 26.5 17.1 27.4 15.6 27.4 13.9 C 27.4 11.2 25.2 9 22.5 9 z" 
        fill="url(#bPawnGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 12 36 L 33 36 C 34 36 34.5 37 34 38 L 32.5 40 L 12.5 40 L 11 38 C 10.5 37 11 36 12 36 z" 
        fill="url(#bPawnGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="22.5" cy="13.9" r="3.2" fill="#0f172a" stroke="#60a5fa" stroke-width="0.8"/>
      <path d="M 17 28.5 L 28 28.5" stroke="#60a5fa" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  'bN': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bKnightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <g filter="url(#blackGlow)">
      <path d="M 22 10 C 22 10 20 7 15 9 C 11 11 10 16 11 19 C 11 20 13 22 14 20 C 14 19 15 18 16 18 C 15 21 11 22 9 25 C 7 28 8 32 12 34 L 14 36 L 31 36 L 31 32 C 31 30 33 26 33 22 C 33 16 30 11 24 10 z" 
        fill="url(#bKnightGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 11 36 L 34 36 C 35 36 35.5 37 35 38 L 33.5 40 L 11.5 40 L 10 38 C 9.5 37 10 36 11 36 z" 
        fill="url(#bKnightGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="15.5" cy="16" r="1.5" fill="#38bdf8"/>
      <path d="M 20 13 C 24 15 27 18 27 24" fill="none" stroke="#60a5fa" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 15 24 C 18 26 21 28 22 31" fill="none" stroke="#60a5fa" stroke-width="1" stroke-linecap="round"/>
    </g>
  </svg>`,

  'bB': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bBishopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <g filter="url(#blackGlow)">
      <circle cx="22.5" cy="8.5" r="2.2" fill="#38bdf8" stroke="#60a5fa" stroke-width="0.8"/>
      <path d="M 22.5 11 C 18 11 15 15 15 21 C 15 25 17 28 18 30 L 14.5 36 L 30.5 36 L 27 30 C 28 28 30 25 30 21 C 30 15 27 11 22.5 11 z" 
        fill="url(#bBishopGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 11.5 36 L 33.5 36 C 34.5 36 35 37 34.5 38 L 33 40 L 12 40 L 10.5 38 C 10 37 10.5 36 11.5 36 z" 
        fill="url(#bBishopGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 21 16 L 25 21 M 25 16 L 21 21" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 17 29 L 28 29" stroke="#60a5fa" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  'bR': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bRookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <g filter="url(#blackGlow)">
      <path d="M 14 13 L 14 17 L 17 17 L 17 14 L 20 14 L 20 17 L 25 17 L 25 14 L 28 14 L 28 17 L 31 17 L 31 13 L 14 13 z" 
        fill="url(#bRookGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 15 17 L 17 28 L 14 36 L 31 36 L 28 28 L 30 17 z" 
        fill="url(#bRookGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 11.5 36 L 33.5 36 C 34.5 36 35 37 34.5 38 L 33 40 L 12 40 L 10.5 38 C 10 37 10.5 36 11.5 36 z" 
        fill="url(#bRookGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 18 24 L 27 24" stroke="#60a5fa" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="22.5" cy="24" r="1.5" fill="#38bdf8"/>
    </g>
  </svg>`,

  'bQ': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bQueenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <g filter="url(#blackGlow)">
      <circle cx="11" cy="13" r="1.8" fill="#38bdf8"/>
      <circle cx="16.5" cy="11" r="1.8" fill="#38bdf8"/>
      <circle cx="22.5" cy="10" r="2.2" fill="#38bdf8"/>
      <circle cx="28.5" cy="11" r="1.8" fill="#38bdf8"/>
      <circle cx="34" cy="13" r="1.8" fill="#38bdf8"/>
      <path d="M 11.5 15 L 14 28 L 13 36 L 32 36 L 31 28 L 33.5 15 L 27.5 21 L 22.5 13 L 17.5 21 z" 
        fill="url(#bQueenGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 10.5 36 L 34.5 36 C 35.5 36 36 37 35.5 38 L 34 40 L 11 40 L 9.5 38 C 9 37 9.5 36 10.5 36 z" 
        fill="url(#bQueenGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 16 30 L 29 30" stroke="#60a5fa" stroke-width="1.3" stroke-linecap="round"/>
      <circle cx="22.5" cy="26" r="2" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
    </g>
  </svg>`,

  'bK': `<svg viewBox="0 0 45 45" class="chess-piece-svg piece-black">
    <defs>
      <linearGradient id="bKingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <g filter="url(#blackGlow)">
      <path d="M 22.5 6 L 22.5 12 M 19.5 9 L 25.5 9" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      <path d="M 15 14 C 18 12 27 12 30 14 C 32 17 31 22 28 26 L 31 36 L 14 36 L 17 26 C 14 22 13 17 15 14 z" 
        fill="url(#bKingGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 10.5 36 L 34.5 36 C 35.5 36 36 37 35.5 38 L 34 40 L 11 40 L 9.5 38 C 9 37 9.5 36 10.5 36 z" 
        fill="url(#bKingGrad)" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M 16 28 L 29 28" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M 19 20 C 22.5 18 22.5 18 26 20" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`
};

window.PIECES_SVG = PIECES_SVG;
