# ♞ Grandmaster Chess — Blue & Black Edition

A chess game featuring a **Blue - Black aesthetic**, **clean minimalist piece design**, tactile sound synthesis, and multiple game modes (Player vs Computer AI & Local 2-Player Pass-and-Play).

---

## 🎨 Theme & Visual Design
- **Palette**: Deep Obsidian / Midnight Black (`#060911`, `#101c2e`) paired with Azure / Slate Blue (`#386290`, `#2563eb`, `#38bdf8`).
- **Pieces**: Simple, modern geometric vector silhouettes with high contrast:
  - **White**: Platinum Ice with deep navy contours and cyan accents.
  - **Black**: Midnight Obsidian with glowing cyan-blue line art for sharp visibility on both dark and light squares.
- **Glassmorphism**: Translucent panels with backdrop blur, glowing check alerts, and last-move highlights.

---

## 🚀 How to Run on Your Laptop

### Option 1: Direct in Browser (Zero Installation)
Simply double-click:
```bash
open /Users/dkumawat/Desktop/portfolio/chess-game/index.html
```
or open `index.html` in Safari, Chrome, or any modern web browser. It is **100% offline-ready** with zero external CDN dependencies!

### Option 2: Python One-Click Web Launcher
Run from your terminal:
```bash
cd /Users/dkumawat/Desktop/portfolio/chess-game
python3 run_game.py
```
This automatically boots a local lightweight server and opens the browser interface.

### Option 3: Python Native Desktop Window (Tkinter)
If you prefer a native desktop application window:
```bash
cd /Users/dkumawat/Desktop/portfolio/chess-game
python3 chess_desktop.py
```
*(Uses macOS's built-in Python Tkinter library — no `pip install` required!)*

---

## ⚡ Features
- **Complete FIDE Chess Rules**:
  - Castling (Kingside & Queenside with safe-square path verification)
  - En Passant captures
  - Pawn Promotion modal selection (Queen, Rook, Bishop, Knight)
  - Check, Checkmate, and Stalemate detection
  - 50-move rule and Threefold Repetition tracking
- **Intelligent Computer AI**:
  - Minimax algorithm with Alpha-Beta pruning
  - Positional Piece-Square Tables (PST) and material valuation
  - Three difficulty settings: **Easy**, **Medium**, and **Hard**
- **Tactile Web Audio Effects**:
  - Real-time synthesized wooden piece knocks, capture snaps, castling slides, check warnings, and victory chimes.
  - Mute/Unmute button in header.
- **Match Controls**:
  - **Undo Move** (`⌘Z`)
  - **Flip Board** (`F`)
  - **Export PGN** notation to clipboard
  - **Clock Timers** (Casual Untimed, 5 min Blitz, 10 min Rapid, 15 min Classical)
  - **Captured Pieces Trays** with live material advantage counter (`+3`)
  - **Move History Log** formatted with standard algebraic notation (SAN)
