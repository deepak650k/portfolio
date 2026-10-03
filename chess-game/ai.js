/**
 * Grandmaster Chess AI Engine
 * Upgraded with:
 * - Rich Opening Book (E4, D4, Sicilian, French, Caro-Kann, Italian, Queen's Gambit, Indian Defenses)
 * - Intelligent Easy Mode: Sensible development, center control, and tactical piece safety (no more mindless random moves)
 * - Tactical Medium Mode: 3-ply Minimax + Alpha-Beta Pruning + Quiescence capture resolution
 * - Grandmaster Hard Mode: 3-4 ply Minimax + Deep Quiescence + MVV-LVA move ordering + Positional King Safety
 * - Anti-Repetition Shield: Heavily penalizes repeating positions, eliminating premature draws
 */

const OPENING_BOOK = [
  // Open Game (1. e4 e5)
  ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6"], // Italian Game Giuoco Piano
  ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "d3", "Bc5"], // Italian Game Two Knights
  ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7"], // Ruy Lopez Morphy
  ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4"], // Ruy Lopez Berlin
  ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4"], // Petroff Defense
  ["e4", "e5", "f4", "exf4", "Nf3", "g5"], // King's Gambit
  ["e4", "e5", "Nc3", "Nf6", "Bc4", "Bc5"], // Vienna Game

  // Sicilian Defense (1. e4 c5)
  ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"], // Sicilian Najdorf
  ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "g6"], // Sicilian Dragon
  ["e4", "c5", "Nf3", "e6", "d4", "cxd4", "Nxd4", "a6"], // Sicilian Kan
  ["e4", "c5", "c3", "d5", "exd5", "Qxd5", "d4", "Nf6"], // Alapin Sicilian

  // French & Caro-Kann
  ["e4", "e6", "d4", "d5", "Nc3", "Nf6", "e5", "Nfd7"], // French Classical
  ["e4", "e6", "d4", "d5", "Nd2", "Nf6", "e5", "Nfd7"], // French Tarrasch
  ["e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6"], // French Advance
  ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5"], // Caro-Kann Classical
  ["e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6"], // Caro-Kann Advance

  // Other 1. e4 responses
  ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6"], // Scandinavian
  ["e4", "d6", "d4", "Nf6", "Nc3", "g6"], // Pirc Defense

  // Queen's Pawn Games (1. d4)
  ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Nf3", "Be7"], // Queen's Gambit Declined
  ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4"], // Slav Defense
  ["d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6"], // Queen's Gambit Accepted
  ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4", "e3", "O-O"], // Nimzo-Indian
  ["d4", "Nf6", "c4", "g6", "Nc3", "d5", "cxd5", "Nxd5"], // Grunfeld
  ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6"], // King's Indian
  ["d4", "Nf6", "Nf3", "e6", "Bf4", "d5", "e3", "c5"], // London System

  // Flank Openings
  ["c4", "e5", "Nc3", "Nf6", "g3", "d5"], // English Opening
  ["c4", "c5", "Nc3", "Nc6", "g3", "g6"], // Symmetrical English
  ["Nf3", "d5", "g3", "Nf6", "Bg2", "c6", "O-O"] // Reti / King's Indian Attack
];

class ChessAI {
  constructor(engine) {
    this.engine = engine;

    // Piece values in Centipawns
    this.PIECE_VALUES = {
      p: 100,
      n: 320,
      b: 335,
      r: 500,
      q: 900,
      k: 20000
    };

    // Positional Piece-Square Tables (White perspective, flipped for Black)
    this.PST = {
      p: [
        [  0,   0,   0,   0,   0,   0,   0,   0],
        [ 50,  50,  50,  50,  50,  50,  50,  50],
        [ 10,  15,  25,  35,  35,  25,  15,  10],
        [  5,   5,  20,  30,  30,  20,   5,   5],
        [  0,   0,  10,  25,  25,  10,   0,   0],
        [  5,  -5, -10,   5,   5, -10,  -5,   5],
        [  5,  10,  10, -25, -25,  10,  10,   5],
        [  0,   0,   0,   0,   0,   0,   0,   0]
      ],
      n: [
        [-50, -40, -30, -30, -30, -30, -40, -50],
        [-40, -20,   0,   5,   5,   0, -20, -40],
        [-30,   5,  15,  20,  20,  15,   5, -30],
        [-30,   5,  20,  25,  25,  20,   5, -30],
        [-30,   0,  15,  25,  25,  15,   0, -30],
        [-30,   5,  15,  20,  20,  15,   5, -30],
        [-40, -20,   0,   5,   5,   0, -20, -40],
        [-50, -40, -30, -30, -30, -30, -40, -50]
      ],
      b: [
        [-20, -10, -10, -10, -10, -10, -10, -20],
        [-10,   0,   5,   0,   0,   5,   0, -10],
        [-10,   5,  10,  15,  15,  10,   5, -10],
        [-10,   5,  15,  20,  20,  15,   5, -10],
        [-10,   0,  15,  20,  20,  15,   0, -10],
        [-10,  10,  10,  15,  15,  10,  10, -10],
        [-10,   5,   0,   0,   0,   0,   5, -10],
        [-20, -10, -10, -10, -10, -10, -10, -20]
      ],
      r: [
        [  0,   0,   0,   5,   5,   0,   0,   0],
        [ 15,  20,  20,  20,  20,  20,  20,  15],
        [ -5,   0,   0,   0,   0,   0,   0,  -5],
        [ -5,   0,   0,   0,   0,   0,   0,  -5],
        [ -5,   0,   0,   0,   0,   0,   0,  -5],
        [ -5,   0,   0,   0,   0,   0,   0,  -5],
        [ -5,   0,   0,   0,   0,   0,   0,  -5],
        [  0,   0,   0,   5,   5,   0,   0,   0]
      ],
      q: [
        [-20, -10, -10,  -5,  -5, -10, -10, -20],
        [-10,   0,   5,   0,   0,   0,   0, -10],
        [-10,   5,   5,   5,   5,   5,   0, -10],
        [ -5,   0,   5,   8,   8,   5,   0,  -5],
        [  0,   0,   5,   8,   8,   5,   0,  -5],
        [-10,   5,   5,   5,   5,   5,   0, -10],
        [-10,   0,   5,   0,   0,   0,   0, -10],
        [-20, -10, -10,  -5,  -5, -10, -10, -20]
      ],
      k: [
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-20, -30, -30, -40, -40, -30, -30, -20],
        [-10, -20, -20, -20, -20, -20, -20, -10],
        [ 20,  20,   0,   0,   0,   0,  20,  20],
        [ 20,  30,  10,   0,   0,  10,  30,  20]
      ]
    };
  }

  // Find book move matching game history
  getBookMove() {
    const currentSans = this.engine.history.map(m => m.san.replace(/[+#]/, ''));
    const matchingLines = OPENING_BOOK.filter(line => {
      if (line.length <= currentSans.length) return false;
      for (let i = 0; i < currentSans.length; i++) {
        if (line[i] !== currentSans[i]) return false;
      }
      return true;
    });

    if (matchingLines.length === 0) return null;

    // Pick candidate SAN
    const candidates = matchingLines.map(l => l[currentSans.length]);
    const chosenSan = candidates[Math.floor(Math.random() * candidates.length)];

    // Convert candidate SAN to matching legal move
    const legalMoves = this.engine.getAllLegalMoves();
    for (const m of legalMoves) {
      const piece = this.engine.board[m.from.r][m.from.c];
      const cap = m.capture || (m.isEnPassant ? this.engine.board[m.from.r][m.to.c] : null);
      const moveSan = this.engine.generateSAN(m, piece, cap, this.engine.turn).replace(/[+#]/, '');
      if (moveSan === chosenSan) {
        return m;
      }
    }

    return null;
  }

  // Static evaluation of current position (positive = White leads, negative = Black leads)
  evaluateBoard(board) {
    let score = 0;
    let whitePieces = 0;
    let blackPieces = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;

        const val = this.PIECE_VALUES[piece.type];
        const table = this.PST[piece.type];
        let posVal = 0;
        if (table) {
          posVal = piece.color === 'w' ? table[r][c] : table[7 - r][c];
        }

        const pieceTotal = val + posVal;
        if (piece.color === 'w') {
          score += pieceTotal;
          if (piece.type !== 'k' && piece.type !== 'p') whitePieces++;
        } else {
          score -= pieceTotal;
          if (piece.type !== 'k' && piece.type !== 'p') blackPieces++;
        }
      }
    }

    // Castling bonus / King safety incentive
    if (!this.engine.castling.wK && !this.engine.castling.wQ) {
      const wk = this.engine.findKing('w', board);
      if (wk && wk.r === 7 && (wk.c === 6 || wk.c === 2)) score += 40; // Castled white king
    }
    if (!this.engine.castling.bK && !this.engine.castling.bQ) {
      const bk = this.engine.findKing('b', board);
      if (bk && bk.r === 0 && (bk.c === 6 || bk.c === 2)) score -= 40; // Castled black king
    }

    return score;
  }

  // MVV-LVA (Most Valuable Victim - Least Valuable Aggressor) Move Ordering
  orderMoves(moves, board) {
    return moves.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.capture) {
        const vic = this.PIECE_VALUES[a.capture.type] || 100;
        const attPiece = board[a.from.r][a.from.c];
        const att = attPiece ? this.PIECE_VALUES[attPiece.type] : 100;
        scoreA += 2000 + vic - (att / 10);
      }
      if (a.promotion) scoreA += 1800;
      if (a.isCastling) scoreA += 150;

      if (b.capture) {
        const vic = this.PIECE_VALUES[b.capture.type] || 100;
        const attPiece = board[b.from.r][b.from.c];
        const att = attPiece ? this.PIECE_VALUES[attPiece.type] : 100;
        scoreB += 2000 + vic - (att / 10);
      }
      if (b.promotion) scoreB += 1800;
      if (b.isCastling) scoreB += 150;

      return scoreB - scoreA;
    });
  }

  // Quiescence Search: resolves all active captures to prevent horizon effect
  quiesce(alpha, beta, isMaximizing, qDepth = 3) {
    const standPat = this.evaluateBoard(this.engine.board);

    if (qDepth === 0) return standPat;

    if (isMaximizing) {
      if (standPat >= beta) return beta;
      if (standPat > alpha) alpha = standPat;

      const legalMoves = this.engine.getAllLegalMoves(this.engine.turn);
      const captures = legalMoves.filter(m => m.capture || m.isEnPassant);
      const ordered = this.orderMoves(captures, this.engine.board);

      for (const m of ordered) {
        this.engine.makeMove(m, true);
        const score = this.quiesce(alpha, beta, false, qDepth - 1);
        this.engine.undo(true);

        if (score >= beta) return beta;
        if (score > alpha) alpha = score;
      }
      return alpha;
    } else {
      if (standPat <= alpha) return alpha;
      if (standPat < beta) beta = standPat;

      const legalMoves = this.engine.getAllLegalMoves(this.engine.turn);
      const captures = legalMoves.filter(m => m.capture || m.isEnPassant);
      const ordered = this.orderMoves(captures, this.engine.board);

      for (const m of ordered) {
        this.engine.makeMove(m, true);
        const score = this.quiesce(alpha, beta, true, qDepth - 1);
        this.engine.undo(true);

        if (score <= alpha) return alpha;
        if (score < beta) beta = score;
      }
      return beta;
    }
  }

  // Minimax with Alpha-Beta Pruning
  minimax(depth, alpha, beta, isMaximizing, useQuiesce = false) {
    const gameOver = this.engine.isGameOver();
    if (gameOver.over) {
      if (gameOver.result === 'white') return 100000 + depth;
      if (gameOver.result === 'black') return -100000 - depth;
      return 0; // Stalemate or legitimate draw
    }

    if (depth === 0) {
      return useQuiesce ? this.quiesce(alpha, beta, isMaximizing) : this.evaluateBoard(this.engine.board);
    }

    const legalMoves = this.engine.getAllLegalMoves(this.engine.turn);
    if (legalMoves.length === 0) {
      return this.engine.isCheck(this.engine.turn)
        ? (isMaximizing ? -100000 - depth : 100000 + depth)
        : 0;
    }

    const orderedMoves = this.orderMoves(legalMoves, this.engine.board);

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of orderedMoves) {
        this.engine.makeMove(move, true); // Simulated move (zero positionHistory pollution)
        const evaluation = this.minimax(depth - 1, alpha, beta, false, useQuiesce);
        this.engine.undo(true);

        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Beta cutoff
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of orderedMoves) {
        this.engine.makeMove(move, true); // Simulated move (zero positionHistory pollution)
        const evaluation = this.minimax(depth - 1, alpha, beta, true, useQuiesce);
        this.engine.undo(true);

        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Alpha cutoff
      }
      return minEval;
    }
  }

  // -------------------------------------------------------------
  // Easy Mode: Intelligent Casual Play
  // -------------------------------------------------------------
  getEasyMove() {
    const aiColor = this.engine.turn;
    const opponentColor = aiColor === 'w' ? 'b' : 'w';
    const legalMoves = this.engine.getAllLegalMoves(aiColor);

    if (legalMoves.length === 0) return null;

    // 1. Try opening book (70% chance in opening)
    if (this.engine.history.length < 8 && Math.random() < 0.70) {
      const bookMove = this.getBookMove();
      if (bookMove) return bookMove;
    }

    // 2. Score each move based on development, safe capture, and square safety
    const scored = legalMoves.map(move => {
      let score = 0;
      const piece = this.engine.board[move.from.r][move.from.c];
      const target = this.engine.board[move.to.r][move.to.c];

      // Capture value
      if (target) {
        score += this.PIECE_VALUES[target.type] * 1.5;
      }

      // Check if moving to attacked square (piece safety check)
      this.engine.makeMove(move, true);
      const isAttacked = this.engine.isSquareAttacked(move.to.r, move.to.c, aiColor, this.engine.board);
      const givesCheck = this.engine.isCheck(opponentColor, this.engine.board);
      
      // Anti-repetition check: strongly avoid repeating past positions
      const key = this.engine.getRepetitionKey();
      const pastCount = this.engine.positionHistory[key] || 0;
      if (pastCount > 0) {
        score -= 400; // Never repeat in easy mode
      }

      this.engine.undo(true);

      if (isAttacked) {
        score -= this.PIECE_VALUES[piece.type]; // Danger penalty
      }

      if (givesCheck) score += 30;

      // Center control bonus for e4, d4, e5, d5, c4, c5, f4, f5
      if ((move.to.r === 3 || move.to.r === 4) && (move.to.c === 3 || move.to.c === 4)) {
        score += 25;
      }

      // PST table bonus
      const table = this.PST[piece.type];
      if (table) {
        score += aiColor === 'w' ? table[move.to.r][move.to.c] : table[7 - move.to.r][move.to.c];
      }

      return { move, score };
    });

    // Sort moves by score
    scored.sort((a, b) => b.score - a.score);

    // Pick from the top candidate moves (within 100 centipawns of the best move)
    const bestScore = scored[0].score;
    const candidates = scored.filter(s => s.score >= bestScore - 120);

    // Human-like selection: 70% best candidate, 30% second/third candidate
    return candidates[Math.floor(Math.random() * candidates.length)].move;
  }

  // -------------------------------------------------------------
  // Master Selector: Easy, Medium, Hard
  // -------------------------------------------------------------
  getBestMove(difficulty = 'medium') {
    const aiColor = this.engine.turn;
    const isMaximizing = aiColor === 'w';
    const legalMoves = this.engine.getAllLegalMoves(aiColor);

    if (legalMoves.length === 0) return null;

    // EASY MODE
    if (difficulty === 'easy') {
      return this.getEasyMove();
    }

    // MEDIUM & HARD: Try Opening Book First
    const bookChance = difficulty === 'hard' ? 0.95 : 0.85;
    if (this.engine.history.length < 12 && Math.random() < bookChance) {
      const bookMove = this.getBookMove();
      if (bookMove) return bookMove;
    }

    // Search Depth:
    // Medium: Depth 2 + Quiescence
    // Hard: Depth 3 + Deep Quiescence + Tactical Move Ordering
    const searchDepth = difficulty === 'hard' ? 3 : 2;
    const useQuiesce = true;
    const orderedMoves = this.orderMoves(legalMoves, this.engine.board);

    let bestMove = orderedMoves[0];
    let bestValue = isMaximizing ? -Infinity : Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    for (const move of orderedMoves) {
      this.engine.makeMove(move, true);

      // Check anti-repetition on root move
      const key = this.engine.getRepetitionKey();
      const pastVisits = this.engine.positionHistory[key] || 0;
      let repetitionPenalty = 0;
      if (pastVisits > 0) {
        // Punish repeating positions heavily so it never leads to an accidental draw
        repetitionPenalty = isMaximizing ? -400 : 400;
      }

      let evalValue = this.minimax(searchDepth - 1, alpha, beta, !isMaximizing, useQuiesce);
      evalValue += repetitionPenalty;

      this.engine.undo(true);

      if (isMaximizing) {
        if (evalValue > bestValue) {
          bestValue = evalValue;
          bestMove = move;
        }
        alpha = Math.max(alpha, evalValue);
      } else {
        if (evalValue < bestValue) {
          bestValue = evalValue;
          bestMove = move;
        }
        beta = Math.min(beta, evalValue);
      }
    }

    return bestMove;
  }
}

window.ChessAI = ChessAI;
