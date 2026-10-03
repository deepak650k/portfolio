#!/usr/bin/env python3
"""
Grandmaster Chess - Python Desktop Edition (Tkinter)
Runs natively on macOS without requiring any pip installations.
Matches the requested Blue - Black minimalist theme.
"""

import tkinter as tk
from tkinter import messagebox
import random

# Color Theme: Blue - Black
COLOR_BG = "#060911"
COLOR_PANEL = "#0f172a"
COLOR_LIGHT_SQ = "#386290"
COLOR_DARK_SQ = "#101c2e"
COLOR_SELECTED = "#2563eb"
COLOR_HIGHLIGHT = "#38bdf8"
COLOR_CAPTURE = "#ef4444"
COLOR_LAST_MOVE = "#1e3a5f"
COLOR_TEXT = "#f8fafc"
COLOR_TEXT_MUTED = "#94a3b8"

# Unicode Chess Symbols
UNICODE_PIECES = {
    'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
    'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
}

PIECE_VALUES = {'p': 100, 'n': 320, 'b': 330, 'r': 500, 'q': 900, 'k': 20000}

class ChessDesktopApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Grandmaster Chess (Blue - Black Desktop)")
        self.root.configure(bg=COLOR_BG)
        self.root.resizable(False, False)

        self.board = [[None for _ in range(8)] for _ in range(8)]
        self.turn = 'w'
        self.selected_sq = None
        self.legal_moves = []
        self.history = []
        self.last_move = None
        self.mode = 'ai' # 'ai' or 'pvp'
        self.ai_level = 'medium'

        self.setup_board()
        self.create_ui()
        self.draw_board()

    def setup_board(self):
        self.board = [[None for _ in range(8)] for _ in range(8)]
        # Pawns
        for c in range(8):
            self.board[1][c] = ('b', 'p')
            self.board[6][c] = ('w', 'p')
        # Pieces
        back = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
        for c in range(8):
            self.board[0][c] = ('b', back[c])
            self.board[7][c] = ('w', back[c])

    def create_ui(self):
        # Header Status Bar
        self.header = tk.Frame(self.root, bg=COLOR_PANEL, padx=16, pady=10)
        self.header.pack(fill=tk.X)

        self.title_lbl = tk.Label(
            self.header, text="♞ GRANDMASTER CHESS", font=("Helvetica", 14, "bold"),
            bg=COLOR_PANEL, fg=COLOR_HIGHLIGHT
        )
        self.title_lbl.pack(side=tk.LEFT)

        self.turn_lbl = tk.Label(
            self.header, text="White's Turn", font=("Helvetica", 12, "bold"),
            bg="#1e293b", fg="#ffffff", padx=12, pady=4
        )
        self.turn_lbl.pack(side=tk.RIGHT)

        # Main Arena Frame
        self.arena = tk.Frame(self.root, bg=COLOR_BG, padx=20, pady=16)
        self.arena.pack()

        # Canvas Chessboard (8x8, 64px per square = 512px)
        self.sq_size = 64
        self.canvas = tk.Canvas(
            self.arena, width=self.sq_size * 8, height=self.sq_size * 8,
            bg=COLOR_DARK_SQ, highlightthickness=2, highlightbackground="#1e3a6a"
        )
        self.canvas.pack(side=tk.LEFT)
        self.canvas.bind("<Button-1>", self.on_canvas_click)

        # Side Control Panel
        self.panel = tk.Frame(self.arena, bg=COLOR_PANEL, padx=16, pady=16, width=220)
        self.panel.pack(side=tk.LEFT, fill=tk.Y, padx=(16, 0))

        # Mode selector
        tk.Label(self.panel, text="GAME MODE", font=("Helvetica", 9, "bold"),
                 bg=COLOR_PANEL, fg=COLOR_HIGHLIGHT).pack(anchor=tk.W, pady=(0, 4))
        
        mode_btn_frame = tk.Frame(self.panel, bg=COLOR_PANEL)
        mode_btn_frame.pack(fill=tk.X, pady=(0, 12))
        self.btn_ai = tk.Button(mode_btn_frame, text="Vs AI", command=lambda: self.set_mode('ai'),
                                bg=COLOR_SELECTED, fg="#ffffff", relief=tk.FLAT, font=("Helvetica", 9, "bold"))
        self.btn_ai.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)
        self.btn_pvp = tk.Button(mode_btn_frame, text="2-Player", command=lambda: self.set_mode('pvp'),
                                 bg="#1e293b", fg=COLOR_TEXT_MUTED, relief=tk.FLAT, font=("Helvetica", 9, "bold"))
        self.btn_pvp.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)

        # Move History listbox
        tk.Label(self.panel, text="MOVE HISTORY", font=("Helvetica", 9, "bold"),
                 bg=COLOR_PANEL, fg=COLOR_HIGHLIGHT).pack(anchor=tk.W, pady=(4, 4))
        self.history_box = tk.Listbox(
            self.panel, bg="#080e1b", fg=COLOR_TEXT, font=("Courier", 10),
            height=12, relief=tk.FLAT, highlightthickness=1, highlightbackground="#1e3a6a"
        )
        self.history_box.pack(fill=tk.X, pady=(0, 12))

        # Buttons
        self.btn_undo = tk.Button(
            self.panel, text="↩ Undo Move", command=self.undo_move,
            bg="#1e293b", fg=COLOR_TEXT, relief=tk.FLAT, font=("Helvetica", 10, "bold"), pady=6
        )
        self.btn_undo.pack(fill=tk.X, pady=4)

        self.btn_new = tk.Button(
            self.panel, text="⚡ New Game", command=self.reset_game,
            bg=COLOR_SELECTED, fg="#ffffff", relief=tk.FLAT, font=("Helvetica", 10, "bold"), pady=6
        )
        self.btn_new.pack(fill=tk.X, pady=4)

    def set_mode(self, mode):
        self.mode = mode
        if mode == 'ai':
            self.btn_ai.configure(bg=COLOR_SELECTED, fg="#ffffff")
            self.btn_pvp.configure(bg="#1e293b", fg=COLOR_TEXT_MUTED)
        else:
            self.btn_pvp.configure(bg=COLOR_SELECTED, fg="#ffffff")
            self.btn_ai.configure(bg="#1e293b", fg=COLOR_TEXT_MUTED)
        self.reset_game()

    def draw_board(self):
        self.canvas.delete("all")
        s = self.sq_size

        for r in range(8):
            for c in range(8):
                x1, y1 = c * s, r * s
                x2, y2 = x1 + s, y1 + s

                # Background Color
                color = COLOR_LIGHT_SQ if (r + c) % 2 == 0 else COLOR_DARK_SQ

                # Highlight last move
                if self.last_move:
                    (fr, fc), (tr, tc) = self.last_move
                    if (r == fr and c == fc) or (r == tr and c == tc):
                        color = COLOR_LAST_MOVE

                # Highlight selected
                if self.selected_sq and self.selected_sq == (r, c):
                    color = COLOR_SELECTED

                self.canvas.create_rectangle(x1, y1, x2, y2, fill=color, outline="")

                # Coordinates
                if c == 0:
                    self.canvas.create_text(x1 + 4, y1 + 10, text=str(8 - r), fill="#94a3b8", font=("Helvetica", 8))
                if r == 7:
                    self.canvas.create_text(x2 - 8, y2 - 8, text=chr(97 + c), fill="#94a3b8", font=("Helvetica", 8))

                # Piece Drawing
                piece = self.board[r][c]
                if piece:
                    pcolor, ptype = piece
                    symbol = UNICODE_PIECES.get(f"{pcolor}{ptype.upper()}", "")
                    fg_color = "#ffffff" if pcolor == 'w' else "#0a1120"
                    
                    # For black piece visibility on dark squares, draw subtle outline
                    if pcolor == 'b':
                        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            self.canvas.create_text(
                                x1 + s//2 + dx, y1 + s//2 + dy,
                                text=symbol, fill=COLOR_HIGHLIGHT, font=("Apple Color Emoji", 34)
                            )
                    self.canvas.create_text(
                        x1 + s//2, y1 + s//2,
                        text=symbol, fill=fg_color, font=("Apple Color Emoji", 34)
                    )

        # Highlight legal move destinations
        if self.selected_sq:
            for (tr, tc) in self.legal_moves:
                cx, cy = tc * s + s // 2, tr * s + s // 2
                target = self.board[tr][tc]
                if target:
                    # Capture red circle
                    self.canvas.create_oval(cx - 24, cy - 24, cx + 24, cy + 24, outline=COLOR_CAPTURE, width=3)
                else:
                    # Move dot
                    self.canvas.create_oval(cx - 8, cy - 8, cx + 8, cy + 8, fill=COLOR_HIGHLIGHT, outline="")

    def on_canvas_click(self, event):
        c = event.x // self.sq_size
        r = event.y // self.sq_size
        if not (0 <= r < 8 and 0 <= c < 8):
            return

        if self.mode == 'ai' and self.turn == 'b':
            return

        if self.selected_sq:
            if (r, c) in self.legal_moves:
                self.make_move(self.selected_sq, (r, c))
                self.selected_sq = None
                self.legal_moves = []
                self.draw_board()
                
                # Check game state
                if self.is_checkmate(self.turn):
                    winner = "Black" if self.turn == 'w' else "White"
                    messagebox.showinfo("Game Over", f"Checkmate! {winner} wins!")
                    return

                # AI Turn
                if self.mode == 'ai' and self.turn == 'b':
                    self.root.after(350, self.ai_move)
                return
            elif self.board[r][c] and self.board[r][c][0] == self.turn:
                self.selected_sq = (r, c)
                self.legal_moves = self.get_legal_moves(r, c)
            else:
                self.selected_sq = None
                self.legal_moves = []
        else:
            if self.board[r][c] and self.board[r][c][0] == self.turn:
                self.selected_sq = (r, c)
                self.legal_moves = self.get_legal_moves(r, c)

        self.draw_board()

    def get_legal_moves(self, r, c):
        moves = []
        piece = self.board[r][c]
        if not piece: return moves
        pcolor, ptype = piece

        def add_if_valid(nr, nc):
            if 0 <= nr < 8 and 0 <= nc < 8:
                tgt = self.board[nr][nc]
                if not tgt:
                    moves.append((nr, nc))
                    return True
                elif tgt[0] != pcolor:
                    moves.append((nr, nc))
                    return False
                else:
                    return False
            return False

        if ptype == 'p':
            forward = -1 if pcolor == 'w' else 1
            start_row = 6 if pcolor == 'w' else 1
            # 1 step
            nr = r + forward
            if 0 <= nr < 8 and not self.board[nr][c]:
                moves.append((nr, c))
                # 2 steps
                if r == start_row and not self.board[r + 2 * forward][c]:
                    moves.append((r + 2 * forward, c))
            # captures
            for dc in [-1, 1]:
                nc = c + dc
                if 0 <= nr < 8 and 0 <= nc < 8:
                    tgt = self.board[nr][nc]
                    if tgt and tgt[0] != pcolor:
                        moves.append((nr, nc))

        elif ptype == 'n':
            for dr, dc in [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]:
                add_if_valid(r + dr, c + dc)

        elif ptype in ['b', 'r', 'q']:
            dirs = []
            if ptype in ['b', 'q']:
                dirs.extend([(-1, -1), (-1, 1), (1, -1), (1, 1)])
            if ptype in ['r', 'q']:
                dirs.extend([(-1, 0), (1, 0), (0, -1), (0, 1)])
            for dr, dc in dirs:
                step = 1
                while True:
                    nr, nc = r + dr * step, c + dc * step
                    if not (0 <= nr < 8 and 0 <= nc < 8): break
                    tgt = self.board[nr][nc]
                    if not tgt:
                        moves.append((nr, nc))
                    else:
                        if tgt[0] != pcolor:
                            moves.append((nr, nc))
                        break
                    step += 1

        elif ptype == 'k':
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    if dr == 0 and dc == 0: continue
                    add_if_valid(r + dr, c + dc)

        return moves

    def make_move(self, from_sq, to_sq):
        fr, fc = from_sq
        tr, tc = to_sq
        moving = self.board[fr][fc]
        target = self.board[tr][tc]

        # Save history for undo
        self.history.append((from_sq, to_sq, moving, target))

        # Move
        self.board[tr][tc] = moving
        self.board[fr][fc] = None

        # Pawn promotion default to Queen
        if moving[1] == 'p' and (tr == 0 or tr == 7):
            self.board[tr][tc] = (moving[0], 'q')

        self.last_move = (from_sq, to_sq)
        self.turn = 'b' if self.turn == 'w' else 'w'

        # Record notation
        from_name = f"{chr(97+fc)}{8-fr}"
        to_name = f"{chr(97+tc)}{8-tr}"
        symbol = moving[1].upper() if moving[1] != 'p' else ''
        capture_str = "x" if target else "-"
        entry = f"{symbol}{from_name}{capture_str}{to_name}"
        self.history_box.insert(tk.END, entry)
        self.history_box.see(tk.END)

        self.turn_lbl.configure(
            text="White's Turn" if self.turn == 'w' else "Black's Turn",
            bg="#ffffff" if self.turn == 'w' else "#0f172a",
            fg="#0f172a" if self.turn == 'w' else COLOR_HIGHLIGHT
        )

    def undo_move(self):
        if not self.history: return
        steps = 2 if (self.mode == 'ai' and len(self.history) >= 2) else 1
        for _ in range(steps):
            if not self.history: break
            from_sq, to_sq, moving, target = self.history.pop()
            self.board[from_sq[0]][from_sq[1]] = moving
            self.board[to_sq[0]][to_sq[1]] = target
            self.turn = moving[0]
            self.history_box.delete(tk.END)

        self.last_move = (self.history[-1][0], self.history[-1][1]) if self.history else None
        self.selected_sq = None
        self.legal_moves = []
        self.draw_board()
        self.turn_lbl.configure(
            text="White's Turn" if self.turn == 'w' else "Black's Turn",
            bg="#ffffff" if self.turn == 'w' else "#0f172a",
            fg="#0f172a" if self.turn == 'w' else COLOR_HIGHLIGHT
        )

    def ai_move(self):
        all_moves = []
        for r in range(8):
            for c in range(8):
                if self.board[r][c] and self.board[r][c][0] == 'b':
                    for dst in self.get_legal_moves(r, c):
                        all_moves.append(((r, c), dst))

        if not all_moves:
            messagebox.showinfo("Game Over", "White wins by checkmate or stalemate!")
            return

        # Opening book responses
        if len(self.history) == 1 and self.last_move:
            (fr, fc), (tr, tc) = self.last_move
            # If 1. e4 -> respond 1... e5 or 1... c5
            if (fr, fc) == (6, 4) and (tr, tc) == (4, 4):
                preferred = [((1, 4), (3, 4)), ((1, 2), (3, 2))]
                for pref in preferred:
                    if pref in all_moves:
                        self.make_move(pref[0], pref[1])
                        self.draw_board()
                        return
            # If 1. d4 -> respond 1... d5 or 1... Nf6
            if (fr, fc) == (6, 3) and (tr, tc) == (4, 3):
                preferred = [((1, 3), (3, 3)), ((0, 6), (2, 5))]
                for pref in preferred:
                    if pref in all_moves:
                        self.make_move(pref[0], pref[1])
                        self.draw_board()
                        return

        # Intelligent positional and safety scoring
        scored_moves = []
        past_squares = set()
        if len(self.history) >= 2:
            past_squares.add(self.history[-2][0])

        for (fr, fc), (tr, tc) in all_moves:
            moving = self.board[fr][fc]
            tgt = self.board[tr][tc]
            score = 0

            # Capture rewards
            if tgt:
                score += PIECE_VALUES.get(tgt[1], 0) * 1.5

            # Center control bonus (d4, d5, e4, e5)
            if tr in [3, 4] and tc in [3, 4]:
                score += 35

            # Development bonus for knights and bishops in opening
            if moving[1] in ['n', 'b'] and fr == 0:
                score += 30

            # Penalty for moving Queen out too early
            if moving[1] == 'q' and len(self.history) < 6:
                score -= 40

            # Avoid immediate repetitive shuffling
            if (tr, tc) in past_squares:
                score -= 100

            scored_moves.append((score, (fr, fc), (tr, tc)))

        scored_moves.sort(key=lambda x: x[0], reverse=True)
        best_score = scored_moves[0][0]
        # Pick from candidate top moves
        candidates = [m for m in scored_moves if m[0] >= best_score - 40]
        chosen = random.choice(candidates)

        self.make_move(chosen[1], chosen[2])
        self.draw_board()

    def is_checkmate(self, color):
        # Quick king existence check
        has_king = any(self.board[r][c] == (color, 'k') for r in range(8) for c in range(8))
        return not has_king

    def reset_game(self):
        self.setup_board()
        self.turn = 'w'
        self.selected_sq = None
        self.legal_moves = []
        self.history = []
        self.last_move = None
        self.history_box.delete(0, tk.END)
        self.turn_lbl.configure(text="White's Turn", bg="#1e293b", fg="#ffffff")
        self.draw_board()

if __name__ == '__main__':
    root = tk.Tk()
    app = ChessDesktopApp(root)
    root.mainloop()
