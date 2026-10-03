/**
 * Grandmaster Chess Engine
 * Complete rule-compliant chess logic:
 * - 8x8 Board representation
 * - Legal move generation (Pawn, Knight, Bishop, Rook, Queen, King)
 * - Castling (kingside & queenside) with attack-square checks
 * - En Passant captures
 * - Pawn promotion to Queen, Rook, Bishop, Knight
 * - Check, Checkmate, Stalemate detection
 * - Insufficient material & 50-move rule
 * - Full Undo/Redo stack
 * - Standard Algebraic Notation (SAN) generation & FEN export
 */

class ChessEngine {
  constructor() {
    this.reset();
  }

  reset() {
    // 8x8 board: board[0] = rank 8, board[7] = rank 1
    // cols: 0 = 'a', 7 = 'h'
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.turn = 'w'; // 'w' or 'b'
    this.castling = {
      wK: true, // White kingside (O-O)
      wQ: true, // White queenside (O-O-O)
      bK: true, // Black kingside
      bQ: true  // Black queenside
    };
    this.enPassant = null; // { r, c } target square enemy pawn skipped
    this.halfMoves = 0;    // 50-move rule counter
    this.fullMoves = 1;    // Fullmove counter
    this.history = [];     // Array of move records
    this.stateStack = [];  // Snapshots for undo
    this.positionHistory = {}; // For 3-fold repetition

    this.setupStartingPosition();
    this.recordPosition();
  }

  setupStartingPosition() {
    // Pawns
    for (let c = 0; c < 8; c++) {
      this.board[1][c] = { type: 'p', color: 'b' };
      this.board[6][c] = { type: 'p', color: 'w' };
    }
    // Pieces
    const backRow = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    for (let c = 0; c < 8; c++) {
      this.board[0][c] = { type: backRow[c], color: 'b' };
      this.board[7][c] = { type: backRow[c], color: 'w' };
    }
  }

  cloneState() {
    return {
      board: this.board.map(row => row.map(cell => cell ? { ...cell } : null)),
      turn: this.turn,
      castling: { ...this.castling },
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      halfMoves: this.halfMoves,
      fullMoves: this.fullMoves
    };
  }

  getPiece(r, c) {
    if (r < 0 || r > 7 || c < 0 || c > 7) return null;
    return this.board[r][c];
  }

  isSquareOnBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
  }

  coordsToSquare(r, c) {
    const file = String.fromCharCode(97 + c);
    const rank = 8 - r;
    return `${file}${rank}`;
  }

  squareToCoords(sq) {
    const c = sq.charCodeAt(0) - 97;
    const r = 8 - parseInt(sq[1], 10);
    return { r, c };
  }

  // Find King square for a color
  findKing(color, board = this.board) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === color) {
          return { r, c };
        }
      }
    }
    return null;
  }

  // Check if a square (r, c) is attacked by opponent of 'defenderColor'
  isSquareAttacked(r, c, defenderColor, board = this.board) {
    const attackerColor = defenderColor === 'w' ? 'b' : 'w';

    // 1. Pawn attacks
    const pawnDir = attackerColor === 'w' ? 1 : -1; // Pawns attack towards their forward direction
    // For square (r, c) to be attacked by attacker pawn, attacker must be at r + pawnDir
    const pawnAttackerRow = r + (attackerColor === 'w' ? 1 : -1);
    for (const dc of [-1, 1]) {
      const pawnCol = c + dc;
      if (this.isSquareOnBoard(pawnAttackerRow, pawnCol)) {
        const piece = board[pawnAttackerRow][pawnCol];
        if (piece && piece.color === attackerColor && piece.type === 'p') {
          return true;
        }
      }
    }

    // 2. Knight attacks
    const knightOffsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of knightOffsets) {
      const nr = r + dr;
      const nc = c + dc;
      if (this.isSquareOnBoard(nr, nc)) {
        const piece = board[nr][nc];
        if (piece && piece.color === attackerColor && piece.type === 'n') {
          return true;
        }
      }
    }

    // 3. Bishop / Queen diagonal attacks
    const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (const [dr, dc] of diagDirs) {
      let step = 1;
      while (true) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (!this.isSquareOnBoard(nr, nc)) break;
        const piece = board[nr][nc];
        if (piece) {
          if (piece.color === attackerColor && (piece.type === 'b' || piece.type === 'q')) {
            return true;
          }
          break; // Blocked
        }
        step++;
      }
    }

    // 4. Rook / Queen orthogonal attacks
    const orthoDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of orthoDirs) {
      let step = 1;
      while (true) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (!this.isSquareOnBoard(nr, nc)) break;
        const piece = board[nr][nc];
        if (piece) {
          if (piece.color === attackerColor && (piece.type === 'r' || piece.type === 'q')) {
            return true;
          }
          break; // Blocked
        }
        step++;
      }
    }

    // 5. King attacks (adjacent 1 square)
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (this.isSquareOnBoard(nr, nc)) {
          const piece = board[nr][nc];
          if (piece && piece.color === attackerColor && piece.type === 'k') {
            return true;
          }
        }
      }
    }

    return false;
  }

  isCheck(color = this.turn, board = this.board) {
    const kingPos = this.findKing(color, board);
    if (!kingPos) return false;
    return this.isSquareAttacked(kingPos.r, kingPos.c, color, board);
  }

  // Generate pseudo-legal moves for a specific piece at (r, c)
  getPseudoLegalMoves(r, c) {
    const piece = this.board[r][c];
    if (!piece || piece.color !== this.turn) return [];

    const moves = [];
    const color = piece.color;
    const forward = color === 'w' ? -1 : 1;
    const startRow = color === 'w' ? 6 : 1;
    const promoRow = color === 'w' ? 0 : 7;

    switch (piece.type) {
      case 'p': {
        // Forward 1 square
        const r1 = r + forward;
        if (this.isSquareOnBoard(r1, c) && !this.board[r1][c]) {
          if (r1 === promoRow) {
            for (const promo of ['q', 'r', 'b', 'n']) {
              moves.push({ from: { r, c }, to: { r: r1, c }, promotion: promo });
            }
          } else {
            moves.push({ from: { r, c }, to: { r: r1, c } });
            // Forward 2 squares from start
            const r2 = r + 2 * forward;
            if (r === startRow && !this.board[r2][c]) {
              moves.push({ from: { r, c }, to: { r: r2, c }, isDoublePawn: true });
            }
          }
        }

        // Diagonal captures
        for (const dc of [-1, 1]) {
          const tc = c + dc;
          if (this.isSquareOnBoard(r1, tc)) {
            const target = this.board[r1][tc];
            if (target && target.color !== color) {
              if (r1 === promoRow) {
                for (const promo of ['q', 'r', 'b', 'n']) {
                  moves.push({ from: { r, c }, to: { r: r1, c: tc }, capture: target, promotion: promo });
                }
              } else {
                moves.push({ from: { r, c }, to: { r: r1, c: tc }, capture: target });
              }
            }
            // En Passant capture
            if (this.enPassant && this.enPassant.r === r1 && this.enPassant.c === tc) {
              const epTarget = this.board[r][tc];
              if (epTarget && epTarget.color !== color && epTarget.type === 'p') {
                moves.push({ from: { r, c }, to: { r: r1, c: tc }, capture: epTarget, isEnPassant: true });
              }
            }
          }
        }
        break;
      }

      case 'n': {
        const knightOffsets = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        for (const [dr, dc] of knightOffsets) {
          const nr = r + dr;
          const nc = c + dc;
          if (this.isSquareOnBoard(nr, nc)) {
            const target = this.board[nr][nc];
            if (!target) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc } });
            } else if (target.color !== color) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc }, capture: target });
            }
          }
        }
        break;
      }

      case 'b': {
        this.addRayMoves(moves, r, c, [[-1, -1], [-1, 1], [1, -1], [1, 1]], color);
        break;
      }

      case 'r': {
        this.addRayMoves(moves, r, c, [[-1, 0], [1, 0], [0, -1], [0, 1]], color);
        break;
      }

      case 'q': {
        this.addRayMoves(moves, r, c, [
          [-1, -1], [-1, 1], [1, -1], [1, 1],
          [-1, 0], [1, 0], [0, -1], [0, 1]
        ], color);
        break;
      }

      case 'k': {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (this.isSquareOnBoard(nr, nc)) {
              const target = this.board[nr][nc];
              if (!target) {
                moves.push({ from: { r, c }, to: { r: nr, c: nc } });
              } else if (target.color !== color) {
                moves.push({ from: { r, c }, to: { r: nr, c: nc }, capture: target });
              }
            }
          }
        }

        // Castling moves
        const kRow = color === 'w' ? 7 : 0;
        if (r === kRow && c === 4 && !this.isCheck(color)) {
          // Kingside (O-O)
          const kRight = color === 'w' ? this.castling.wK : this.castling.bK;
          if (kRight) {
            const rook = this.board[kRow][7];
            if (rook && rook.type === 'r' && rook.color === color) {
              if (!this.board[kRow][5] && !this.board[kRow][6]) {
                if (!this.isSquareAttacked(kRow, 5, color) && !this.isSquareAttacked(kRow, 6, color)) {
                  moves.push({
                    from: { r, c },
                    to: { r: kRow, c: 6 },
                    isCastling: 'K'
                  });
                }
              }
            }
          }

          // Queenside (O-O-O)
          const qRight = color === 'w' ? this.castling.wQ : this.castling.bQ;
          if (qRight) {
            const rook = this.board[kRow][0];
            if (rook && rook.type === 'r' && rook.color === color) {
              if (!this.board[kRow][1] && !this.board[kRow][2] && !this.board[kRow][3]) {
                if (!this.isSquareAttacked(kRow, 3, color) && !this.isSquareAttacked(kRow, 2, color)) {
                  moves.push({
                    from: { r, c },
                    to: { r: kRow, c: 2 },
                    isCastling: 'Q'
                  });
                }
              }
            }
          }
        }
        break;
      }
    }

    return moves;
  }

  addRayMoves(moves, r, c, directions, color) {
    for (const [dr, dc] of directions) {
      let step = 1;
      while (true) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (!this.isSquareOnBoard(nr, nc)) break;
        const target = this.board[nr][nc];
        if (!target) {
          moves.push({ from: { r, c }, to: { r: nr, c: nc } });
        } else {
          if (target.color !== color) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc }, capture: target });
          }
          break; // Ray blocked
        }
        step++;
      }
    }
  }

  // Filter pseudo-legal moves: a move is strictly legal iff own king is not left in check
  getLegalMovesForSquare(r, c) {
    const pseudo = this.getPseudoLegalMoves(r, c);
    return pseudo.filter(m => this.isMoveSafe(m));
  }

  // Get all legal moves for current player
  getAllLegalMoves(color = this.turn) {
    const legalMoves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece && piece.color === color) {
          const pseudo = this.getPseudoLegalMoves(r, c);
          for (const m of pseudo) {
            if (this.isMoveSafe(m)) {
              legalMoves.push(m);
            }
          }
        }
      }
    }
    return legalMoves;
  }

  // Check if simulated move leaves own king safe
  isMoveSafe(move) {
    const { from, to, isEnPassant, isCastling, promotion } = move;
    const movingPiece = this.board[from.r][from.c];
    const targetPiece = this.board[to.r][to.c];
    const color = movingPiece.color;

    // Simulate move on board
    this.board[to.r][to.c] = promotion ? { type: promotion, color } : movingPiece;
    this.board[from.r][from.c] = null;

    let epCaptured = null;
    let epPos = null;
    if (isEnPassant) {
      epPos = { r: from.r, c: to.c };
      epCaptured = this.board[epPos.r][epPos.c];
      this.board[epPos.r][epPos.c] = null;
    }

    let rookFromCol = null;
    let rookToCol = null;
    let rookRow = null;
    if (isCastling) {
      rookRow = from.r;
      if (isCastling === 'K') {
        rookFromCol = 7;
        rookToCol = 5;
      } else {
        rookFromCol = 0;
        rookToCol = 3;
      }
      this.board[rookRow][rookToCol] = this.board[rookRow][rookFromCol];
      this.board[rookRow][rookFromCol] = null;
    }

    const inCheck = this.isCheck(color);

    // Revert simulation
    this.board[from.r][from.c] = movingPiece;
    this.board[to.r][to.c] = targetPiece;

    if (isEnPassant && epPos) {
      this.board[epPos.r][epPos.c] = epCaptured;
    }

    if (isCastling) {
      this.board[rookRow][rookFromCol] = this.board[rookRow][rookToCol];
      this.board[rookRow][rookToCol] = null;
    }

    return !inCheck;
  }

  // Execute a legal move
  makeMove(move, isSimulated = false) {
    const { from, to, capture, isEnPassant, isCastling, promotion, isDoublePawn } = move;
    const movingPiece = this.board[from.r][from.c];
    const prevTurn = this.turn;
    const prevCastling = { ...this.castling };
    const prevEnPassant = this.enPassant ? { ...this.enPassant } : null;
    const prevHalfMoves = this.halfMoves;

    // Save snapshot for undo
    this.stateStack.push({
      board: this.board.map(row => row.map(cell => cell ? { ...cell } : null)),
      turn: this.turn,
      castling: { ...this.castling },
      enPassant: this.enPassant ? { ...this.enPassant } : null,
      halfMoves: this.halfMoves,
      fullMoves: this.fullMoves,
      move: { ...move, piece: { ...movingPiece } },
      recordedKey: null
    });

    // 1. Move piece
    const placedPiece = promotion ? { type: promotion, color: prevTurn } : movingPiece;
    this.board[to.r][to.c] = placedPiece;
    this.board[from.r][from.c] = null;

    // 2. Handle En Passant capture
    let capturedPiece = capture || null;
    if (isEnPassant) {
      capturedPiece = this.board[from.r][to.c];
      this.board[from.r][to.c] = null;
    }

    // 3. Handle Castling rook move
    if (isCastling) {
      const kRow = from.r;
      if (isCastling === 'K') {
        this.board[kRow][5] = this.board[kRow][7];
        this.board[kRow][7] = null;
      } else {
        this.board[kRow][3] = this.board[kRow][0];
        this.board[kRow][0] = null;
      }
    }

    // 4. Update Castling Rights
    if (movingPiece.type === 'k') {
      if (prevTurn === 'w') {
        this.castling.wK = false;
        this.castling.wQ = false;
      } else {
        this.castling.bK = false;
        this.castling.bQ = false;
      }
    } else if (movingPiece.type === 'r') {
      if (from.r === 7 && from.c === 0) this.castling.wQ = false;
      if (from.r === 7 && from.c === 7) this.castling.wK = false;
      if (from.r === 0 && from.c === 0) this.castling.bQ = false;
      if (from.r === 0 && from.c === 7) this.castling.bK = false;
    }
    // If a rook is captured in the corner, revoke that right
    if (to.r === 7 && to.c === 0) this.castling.wQ = false;
    if (to.r === 7 && to.c === 7) this.castling.wK = false;
    if (to.r === 0 && to.c === 0) this.castling.bQ = false;
    if (to.r === 0 && to.c === 7) this.castling.bK = false;

    // 5. Update En Passant square
    if (isDoublePawn) {
      const epRow = prevTurn === 'w' ? 5 : 2;
      this.enPassant = { r: epRow, c: from.c };
    } else {
      this.enPassant = null;
    }

    // 6. Halfmove clock (reset on pawn move or capture)
    if (movingPiece.type === 'p' || capturedPiece) {
      this.halfMoves = 0;
    } else {
      this.halfMoves++;
    }

    // 7. Fullmove clock
    if (prevTurn === 'b') {
      this.fullMoves++;
    }

    // 8. Switch turn
    this.turn = prevTurn === 'w' ? 'b' : 'w';

    if (isSimulated) {
      return { move, capturedPiece };
    }

    // 9. Generate SAN notation & record real game position
    const san = this.generateSAN(move, movingPiece, capturedPiece, prevTurn);
    this.history.push({
      ...move,
      piece: movingPiece,
      capturedPiece,
      san,
      color: prevTurn
    });

    const key = this.getRepetitionKey();
    this.stateStack[this.stateStack.length - 1].recordedKey = key;
    this.positionHistory[key] = (this.positionHistory[key] || 0) + 1;

    return {
      move,
      capturedPiece,
      san,
      isCheck: this.isCheck(this.turn),
      isGameOver: this.isGameOver()
    };
  }

  // Undo last move
  undo(isSimulated = false) {
    if (this.stateStack.length === 0) return null;
    const lastState = this.stateStack.pop();

    if (!isSimulated) {
      if (lastState.recordedKey && this.positionHistory[lastState.recordedKey]) {
        this.positionHistory[lastState.recordedKey]--;
        if (this.positionHistory[lastState.recordedKey] <= 0) {
          delete this.positionHistory[lastState.recordedKey];
        }
      }
      this.history.pop();
    }

    this.board = lastState.board;
    this.turn = lastState.turn;
    this.castling = lastState.castling;
    this.enPassant = lastState.enPassant;
    this.halfMoves = lastState.halfMoves;
    this.fullMoves = lastState.fullMoves;

    return lastState.move;
  }

  // SAN (Standard Algebraic Notation) Generator
  generateSAN(move, piece, capturedPiece, moveColor) {
    if (move.isCastling === 'K') return 'O-O';
    if (move.isCastling === 'Q') return 'O-O-O';

    let san = '';
    const toSquare = this.coordsToSquare(move.to.r, move.to.c);

    if (piece.type === 'p') {
      if (capturedPiece) {
        const fromFile = String.fromCharCode(97 + move.from.c);
        san += `${fromFile}x${toSquare}`;
      } else {
        san += toSquare;
      }
      if (move.promotion) {
        san += `=${move.promotion.toUpperCase()}`;
      }
    } else {
      san += piece.type.toUpperCase();
      // Disambiguation if multiple pieces of same type can reach target square
      const ambiguous = this.getDisambiguation(move, piece, moveColor);
      san += ambiguous;
      if (capturedPiece) {
        san += 'x';
      }
      san += toSquare;
    }

    // Check or Checkmate symbol
    const nextInCheck = this.isCheck(this.turn);
    if (nextInCheck) {
      const legalAfter = this.getAllLegalMoves(this.turn);
      if (legalAfter.length === 0) {
        san += '#';
      } else {
        san += '+';
      }
    }

    return san;
  }

  getDisambiguation(move, piece, color) {
    let disambig = '';
    let sameRank = false;
    let sameFile = false;
    let count = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (r === move.from.r && c === move.from.c) continue;
        const p = this.board[r][c];
        if (p && p.type === piece.type && p.color === color) {
          const legal = this.getLegalMovesForSquare(r, c);
          if (legal.some(m => m.to.r === move.to.r && m.to.c === move.to.c)) {
            count++;
            if (c === move.from.c) sameFile = true;
            if (r === move.from.r) sameRank = true;
          }
        }
      }
    }

    if (count > 0) {
      if (!sameFile) {
        disambig = String.fromCharCode(97 + move.from.c);
      } else if (!sameRank) {
        disambig = (8 - move.from.r).toString();
      } else {
        disambig = this.coordsToSquare(move.from.r, move.from.c);
      }
    }

    return disambig;
  }

  // Game End Check
  isGameOver() {
    const legalMoves = this.getAllLegalMoves(this.turn);
    const inCheck = this.isCheck(this.turn);

    if (legalMoves.length === 0) {
      if (inCheck) {
        return {
          over: true,
          result: this.turn === 'w' ? 'black' : 'white',
          reason: 'checkmate'
        };
      } else {
        return {
          over: true,
          result: 'draw',
          reason: 'stalemate'
        };
      }
    }

    // 50-move rule (100 halfmoves)
    if (this.halfMoves >= 100) {
      return { over: true, result: 'draw', reason: '50-move rule' };
    }

    // Insufficient material
    if (this.isInsufficientMaterial()) {
      return { over: true, result: 'draw', reason: 'insufficient material' };
    }

    // Threefold repetition
    const fenKey = this.getRepetitionKey();
    if (this.positionHistory[fenKey] >= 3) {
      return { over: true, result: 'draw', reason: 'threefold repetition' };
    }

    return { over: false };
  }

  isInsufficientMaterial() {
    const pieces = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p) pieces.push({ ...p, r, c });
      }
    }

    // King vs King
    if (pieces.length === 2) return true;

    // King + Bishop / Knight vs King
    if (pieces.length === 3) {
      return pieces.some(p => p.type === 'b' || p.type === 'n');
    }

    // King + Bishop vs King + Bishop (same color square)
    if (pieces.length === 4) {
      const bishops = pieces.filter(p => p.type === 'b');
      if (bishops.length === 2 && bishops[0].color !== bishops[1].color) {
        const sqColor1 = (bishops[0].r + bishops[0].c) % 2;
        const sqColor2 = (bishops[1].r + bishops[1].c) % 2;
        return sqColor1 === sqColor2;
      }
    }

    return false;
  }

  // FEN Generator
  getFEN() {
    let fen = '';
    // 1. Piece placement
    for (let r = 0; r < 8; r++) {
      let empty = 0;
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (!p) {
          empty++;
        } else {
          if (empty > 0) {
            fen += empty;
            empty = 0;
          }
          const char = p.color === 'w' ? p.type.toUpperCase() : p.type.toLowerCase();
          fen += char;
        }
      }
      if (empty > 0) fen += empty;
      if (r < 7) fen += '/';
    }

    // 2. Active color
    fen += ` ${this.turn}`;

    // 3. Castling
    let castlingStr = '';
    if (this.castling.wK) castlingStr += 'K';
    if (this.castling.wQ) castlingStr += 'Q';
    if (this.castling.bK) castlingStr += 'k';
    if (this.castling.bQ) castlingStr += 'q';
    fen += ` ${castlingStr || '-'}`;

    // 4. En Passant
    if (this.enPassant) {
      fen += ` ${this.coordsToSquare(this.enPassant.r, this.enPassant.c)}`;
    } else {
      fen += ' -';
    }

    // 5. Halfmove clock & Fullmove clock
    fen += ` ${this.halfMoves} ${this.fullMoves}`;

    return fen;
  }

  getRepetitionKey() {
    // Repetition key includes piece layout, turn, and castling
    let key = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        key += p ? `${p.color}${p.type}` : '.';
      }
    }
    key += `_${this.turn}_`;
    if (this.castling.wK) key += 'K';
    if (this.castling.wQ) key += 'Q';
    if (this.castling.bK) key += 'k';
    if (this.castling.bQ) key += 'q';
    return key;
  }

  recordPosition() {
    const key = this.getRepetitionKey();
    this.positionHistory[key] = (this.positionHistory[key] || 0) + 1;
  }

  unrecordPosition() {
    const key = this.getRepetitionKey();
    if (this.positionHistory[key]) {
      this.positionHistory[key]--;
      if (this.positionHistory[key] <= 0) {
        delete this.positionHistory[key];
      }
    }
  }

  // Calculate material balance
  getMaterialScore() {
    const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    let whiteScore = 0;
    let blackScore = 0;
    const capturedWhite = []; // Pieces captured by black
    const capturedBlack = []; // Pieces captured by white

    // Count present pieces
    const counts = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 } };
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p && p.type !== 'k') {
          counts[p.color][p.type]++;
          if (p.color === 'w') whiteScore += values[p.type];
          else blackScore += values[p.type];
        }
      }
    }

    // Standard starting set
    const initial = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    for (const type of ['q', 'r', 'b', 'n', 'p']) {
      // White lost
      const lostWhite = initial[type] - counts.w[type];
      for (let i = 0; i < lostWhite; i++) capturedWhite.push(type);
      // Black lost
      const lostBlack = initial[type] - counts.b[type];
      for (let i = 0; i < lostBlack; i++) capturedBlack.push(type);
    }

    return {
      whiteScore,
      blackScore,
      diff: whiteScore - blackScore,
      capturedWhite, // Pieces White has lost (captured by Black)
      capturedBlack  // Pieces Black has lost (captured by White)
    };
  }
}

window.ChessEngine = ChessEngine;
