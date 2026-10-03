/**
 * Grandmaster Chess - App Controller
 * Orchestrates UI interactions, animations, drag-and-drop, clocks, AI turns, and modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Core Instances
  const engine = new ChessEngine();
  const ai = new ChessAI(engine);
  const audio = new ChessAudio();

  // Game Settings State
  const state = {
    gameMode: 'ai', // 'ai' or 'pvp'
    aiDifficulty: 'medium', // 'easy', 'medium', 'hard'
    playerColor: 'w', // 'w' or 'b'
    isFlipped: false,
    selectedSquare: null,
    legalMovesForSelected: [],
    lastMove: null,
    isAiThinking: false,
    pendingPromotion: null, // { from, to, capture, isDoublePawn, ... }
    
    // Clock State
    timeControl: 'none', // 'none', 300 (5m), 600 (10m), 900 (15m)
    whiteTime: 600,
    blackTime: 600,
    timerInterval: null
  };

  // DOM Elements
  const boardEl = document.getElementById('chessboard');
  const turnDotEl = document.getElementById('turnDot');
  const turnTextEl = document.getElementById('turnText');
  const muteBtn = document.getElementById('muteBtn');
  const soundIcon = document.getElementById('soundIcon');
  const undoBtn = document.getElementById('undoBtn');
  const flipBtn = document.getElementById('flipBtn');
  const newGameBtn = document.getElementById('newGameBtn');
  const exportPgnBtn = document.getElementById('exportPgnBtn');
  const historyListEl = document.getElementById('historyList');

  // Player Pods
  const topTimerEl = document.getElementById('topTimer');
  const bottomTimerEl = document.getElementById('bottomTimer');
  const topNameEl = document.getElementById('topPlayerName');
  const bottomNameEl = document.getElementById('bottomPlayerName');
  const topCapturedEl = document.getElementById('topCaptured');
  const bottomCapturedEl = document.getElementById('bottomCaptured');
  const topAvatarEl = document.getElementById('topAvatar');
  const bottomAvatarEl = document.getElementById('bottomAvatar');

  // Modals
  const promoModal = document.getElementById('promoModal');
  const gameOverModal = document.getElementById('gameOverModal');
  const gameOverTitle = document.getElementById('gameOverTitle');
  const gameOverSubtitle = document.getElementById('gameOverSubtitle');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const closeGameOverBtn = document.getElementById('closeGameOverBtn');
  const toastContainer = document.getElementById('toastContainer');

  // Mini SVGs for captured piece trays
  const MINI_PIECES = {
    'p': `<svg viewBox="0 0 45 45" class="captured-mini-svg"><path d="M 22.5 9 C 19.8 9 17.6 11.2 17.6 13.9 C 17.6 15.6 18.5 17.1 19.8 18 C 17.5 19.2 16 21.6 16 24.5 L 16 27 C 16 28 17 29 18 29.5 L 14 36 L 31 36 L 27 29.5 C 28 29 29 28 29 27 L 29 24.5 C 29 21.6 27.5 19.2 25.2 18 C 26.5 17.1 27.4 15.6 27.4 13.9 C 27.4 11.2 25.2 9 22.5 9 z" fill="currentColor"/></svg>`,
    'n': `<svg viewBox="0 0 45 45" class="captured-mini-svg"><path d="M 22 10 C 22 10 20 7 15 9 C 11 11 10 16 11 19 C 11 20 13 22 14 20 C 14 19 15 18 16 18 C 15 21 11 22 9 25 C 7 28 8 32 12 34 L 14 36 L 31 36 L 31 32 C 31 30 33 26 33 22 C 33 16 30 11 24 10 z" fill="currentColor"/></svg>`,
    'b': `<svg viewBox="0 0 45 45" class="captured-mini-svg"><path d="M 22.5 11 C 18 11 15 15 15 21 C 15 25 17 28 18 30 L 14.5 36 L 30.5 36 L 27 30 C 28 28 30 25 30 21 C 30 15 27 11 22.5 11 z" fill="currentColor"/></svg>`,
    'r': `<svg viewBox="0 0 45 45" class="captured-mini-svg"><path d="M 14 13 L 14 17 L 17 17 L 17 14 L 20 14 L 20 17 L 25 17 L 25 14 L 28 14 L 28 17 L 31 17 L 31 13 L 14 13 z M 15 17 L 17 28 L 14 36 L 31 36 L 28 28 L 30 17 z" fill="currentColor"/></svg>`,
    'q': `<svg viewBox="0 0 45 45" class="captured-mini-svg"><path d="M 11.5 15 L 14 28 L 13 36 L 32 36 L 31 28 L 33.5 15 L 27.5 21 L 22.5 13 L 17.5 21 z" fill="currentColor"/></svg>`
  };

  // Toast notification helper
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // -------------------------------------------------------------
  // Board Rendering & Square Construction
  // -------------------------------------------------------------
  function initBoard() {
    boardEl.innerHTML = '';

    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        // Handle board orientation
        const r = state.isFlipped ? 7 - rowIdx : rowIdx;
        const c = state.isFlipped ? 7 - colIdx : colIdx;

        const square = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        square.className = `square ${isLight ? 'light' : 'dark'}`;
        square.dataset.r = r;
        square.dataset.c = c;
        square.id = `sq-${r}-${c}`;

        // Square coordinates notation (rank & file labels)
        if (colIdx === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'square-coord rank';
          rankLabel.textContent = 8 - r;
          square.appendChild(rankLabel);
        }
        if (rowIdx === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'square-coord file';
          fileLabel.textContent = String.fromCharCode(97 + c);
          square.appendChild(fileLabel);
        }

        // Click event listener
        square.addEventListener('click', () => handleSquareClick(r, c));

        // Drag & Drop listeners
        square.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        square.addEventListener('drop', (e) => {
          e.preventDefault();
          handleDrop(r, c);
        });

        boardEl.appendChild(square);
      }
    }

    renderPieces();
  }

  // Render pieces on top of squares
  function renderPieces() {
    // Clear existing pieces and highlights
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.getElementById(`sq-${r}-${c}`);
        if (!sq) continue;

        // Retain rank/file labels, remove existing piece or hint elements
        const pieceEl = sq.querySelector('.chess-piece');
        if (pieceEl) pieceEl.remove();
        const hintDot = sq.querySelector('.move-hint-dot');
        if (hintDot) hintDot.remove();
        const hintCapture = sq.querySelector('.move-hint-capture');
        if (hintCapture) hintCapture.remove();

        // Remove classes
        sq.classList.remove('selected', 'last-move', 'in-check');

        // Apply last move highlight
        if (state.lastMove) {
          if ((state.lastMove.from.r === r && state.lastMove.from.c === c) ||
              (state.lastMove.to.r === r && state.lastMove.to.c === c)) {
            sq.classList.add('last-move');
          }
        }

        // Check highlight on king
        const inCheck = engine.isCheck(engine.turn);
        if (inCheck) {
          const king = engine.findKing(engine.turn);
          if (king && king.r === r && king.c === c) {
            sq.classList.add('in-check');
          }
        }

        // Render piece
        const piece = engine.getPiece(r, c);
        if (piece) {
          const key = `${piece.color}${piece.type.toUpperCase()}`;
          const svgContent = window.PIECES_SVG[key];
          if (svgContent) {
            const pieceDiv = document.createElement('div');
            pieceDiv.className = 'chess-piece';
            pieceDiv.innerHTML = svgContent;
            pieceDiv.draggable = true;

            // Drag Start
            pieceDiv.addEventListener('dragstart', (e) => {
              if (state.isAiThinking) {
                e.preventDefault();
                return;
              }
              if (state.gameMode === 'ai' && engine.turn !== state.playerColor) {
                e.preventDefault();
                return;
              }
              if (piece.color !== engine.turn) {
                e.preventDefault();
                return;
              }

              selectSquare(r, c);
              pieceDiv.classList.add('dragging');
              e.dataTransfer.setData('text/plain', JSON.stringify({ r, c }));
            });

            pieceDiv.addEventListener('dragend', () => {
              pieceDiv.classList.remove('dragging');
            });

            sq.appendChild(pieceDiv);
          }
        }
      }
    }

    // Apply Selected Square and Legal Move Hints
    if (state.selectedSquare) {
      const { r, c } = state.selectedSquare;
      const selSq = document.getElementById(`sq-${r}-${c}`);
      if (selSq) selSq.classList.add('selected');

      for (const m of state.legalMovesForSelected) {
        const destSq = document.getElementById(`sq-${m.to.r}-${m.to.c}`);
        if (!destSq) continue;

        if (m.capture || m.isEnPassant) {
          const captureRing = document.createElement('div');
          captureRing.className = 'move-hint-capture';
          destSq.appendChild(captureRing);
        } else {
          const dot = document.createElement('div');
          dot.className = 'move-hint-dot';
          destSq.appendChild(dot);
        }
      }
    }
  }

  // -------------------------------------------------------------
  // Interaction Logic (Click & Drag)
  // -------------------------------------------------------------
  function handleSquareClick(r, c) {
    if (state.isAiThinking) return;

    // In AI mode, ignore clicks during AI's turn
    if (state.gameMode === 'ai' && engine.turn !== state.playerColor) return;

    // If already selected a piece, check if clicked square is a legal destination
    if (state.selectedSquare) {
      const matchMove = state.legalMovesForSelected.find(m => m.to.r === r && m.to.c === c);
      if (matchMove) {
        attemptMove(matchMove);
        return;
      }
    }

    // Otherwise, select piece at clicked square if it belongs to current player
    const piece = engine.getPiece(r, c);
    if (piece && piece.color === engine.turn) {
      if (state.selectedSquare && state.selectedSquare.r === r && state.selectedSquare.c === c) {
        // Deselect on second click
        deselectSquare();
      } else {
        selectSquare(r, c);
      }
    } else {
      deselectSquare();
    }
  }

  function handleDrop(toR, toC) {
    if (!state.selectedSquare) return;
    const matchMove = state.legalMovesForSelected.find(m => m.to.r === toR && m.to.c === toC);
    if (matchMove) {
      attemptMove(matchMove);
    } else {
      deselectSquare();
    }
  }

  function selectSquare(r, c) {
    state.selectedSquare = { r, c };
    state.legalMovesForSelected = engine.getLegalMovesForSquare(r, c);
    renderPieces();
  }

  function deselectSquare() {
    state.selectedSquare = null;
    state.legalMovesForSelected = [];
    renderPieces();
  }

  // -------------------------------------------------------------
  // Move Execution & Pawn Promotion
  // -------------------------------------------------------------
  function attemptMove(move) {
    const movingPiece = engine.getPiece(move.from.r, move.from.c);

    // Check if move is a pawn promotion for human player
    if (movingPiece.type === 'p') {
      const promoRow = movingPiece.color === 'w' ? 0 : 7;
      if (move.to.r === promoRow && !move.promotion) {
        state.pendingPromotion = move;
        showPromotionModal(movingPiece.color);
        return;
      }
    }

    executeMove(move);
  }

  function executeMove(move) {
    deselectSquare();
    state.lastMove = move;

    // Execute in engine
    const result = engine.makeMove(move);

    // Audio cue
    if (result.isGameOver.over) {
      if (result.isGameOver.result === 'draw') {
        audio.playDefeat();
      } else if (state.gameMode === 'ai') {
        if (result.isGameOver.result === (state.playerColor === 'w' ? 'white' : 'black')) {
          audio.playVictory();
        } else {
          audio.playDefeat();
        }
      } else {
        audio.playVictory();
      }
    } else if (result.isCheck) {
      audio.playCheck();
    } else if (move.isCastling) {
      audio.playCastle();
    } else if (result.capturedPiece) {
      audio.playCapture();
    } else {
      audio.playMove();
    }

    // Update UI components
    updateGameUI();

    // Check game over
    if (result.isGameOver.over) {
      handleGameOver(result.isGameOver);
      return;
    }

    // Trigger AI move if applicable
    if (state.gameMode === 'ai' && engine.turn !== state.playerColor) {
      triggerAiMove();
    }
  }

  // -------------------------------------------------------------
  // AI Turn Handling
  // -------------------------------------------------------------
  function triggerAiMove() {
    state.isAiThinking = true;
    turnTextEl.textContent = 'Engine thinking...';
    turnDotEl.classList.add('in-check');

    // Natural human-like pause before AI responds
    const delay = state.aiDifficulty === 'easy' ? 350 : 500;
    setTimeout(() => {
      const bestMove = ai.getBestMove(state.aiDifficulty);
      state.isAiThinking = false;

      if (bestMove) {
        // If AI pawn promotes, default to Queen
        const piece = engine.getPiece(bestMove.from.r, bestMove.from.c);
        if (piece && piece.type === 'p' && (bestMove.to.r === 0 || bestMove.to.r === 7)) {
          bestMove.promotion = 'q';
        }
        executeMove(bestMove);
      }
    }, delay);
  }

  // -------------------------------------------------------------
  // Pawn Promotion Dialog
  // -------------------------------------------------------------
  function showPromotionModal(color) {
    const optionsContainer = document.getElementById('promotionOptions');
    optionsContainer.innerHTML = '';

    const pieces = ['q', 'r', 'b', 'n'];
    pieces.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'promo-btn';
      const key = `${color}${p.toUpperCase()}`;
      btn.innerHTML = window.PIECES_SVG[key];
      btn.addEventListener('click', () => {
        promoModal.classList.remove('active');
        if (state.pendingPromotion) {
          const move = { ...state.pendingPromotion, promotion: p };
          state.pendingPromotion = null;
          executeMove(move);
        }
      });
      optionsContainer.appendChild(btn);
    });

    promoModal.classList.add('active');
  }

  // -------------------------------------------------------------
  // Clocks & Timers
  // -------------------------------------------------------------
  function startClocks() {
    clearInterval(state.timerInterval);
    if (state.timeControl === 'none') {
      topTimerEl.textContent = '∞';
      bottomTimerEl.textContent = '∞';
      return;
    }

    state.whiteTime = parseInt(state.timeControl, 10);
    state.blackTime = parseInt(state.timeControl, 10);
    updateClockDisplays();

    state.timerInterval = setInterval(() => {
      if (engine.isGameOver().over) {
        clearInterval(state.timerInterval);
        return;
      }

      if (engine.turn === 'w') {
        state.whiteTime--;
        if (state.whiteTime <= 0) {
          clearInterval(state.timerInterval);
          handleGameOver({ over: true, result: 'black', reason: 'time out' });
        }
      } else {
        state.blackTime--;
        if (state.blackTime <= 0) {
          clearInterval(state.timerInterval);
          handleGameOver({ over: true, result: 'white', reason: 'time out' });
        }
      }
      updateClockDisplays();
    }, 1000);
  }

  function updateClockDisplays() {
    if (state.timeControl === 'none') return;

    const fmt = (s) => {
      const mins = Math.floor(Math.max(0, s) / 60);
      const secs = Math.max(0, s) % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isWhiteBottom = !state.isFlipped;
    const bTimer = isWhiteBottom ? bottomTimerEl : topTimerEl;
    const wTimer = isWhiteBottom ? topTimerEl : bottomTimerEl;

    if (isWhiteBottom) {
      bottomTimerEl.textContent = fmt(state.whiteTime);
      topTimerEl.textContent = fmt(state.blackTime);
      bottomTimerEl.classList.toggle('active', engine.turn === 'w');
      topTimerEl.classList.toggle('active', engine.turn === 'b');
      bottomTimerEl.classList.toggle('low-time', state.whiteTime < 30);
      topTimerEl.classList.toggle('low-time', state.blackTime < 30);
    } else {
      bottomTimerEl.textContent = fmt(state.blackTime);
      topTimerEl.textContent = fmt(state.whiteTime);
      bottomTimerEl.classList.toggle('active', engine.turn === 'b');
      topTimerEl.classList.toggle('active', engine.turn === 'w');
      bottomTimerEl.classList.toggle('low-time', state.blackTime < 30);
      topTimerEl.classList.toggle('low-time', state.whiteTime < 30);
    }
  }

  // -------------------------------------------------------------
  // UI Synchronization (Status, Badges, History, Trays)
  // -------------------------------------------------------------
  function updateGameUI() {
    renderPieces();

    // Turn indicator
    const turnColor = engine.turn === 'w' ? 'White' : 'Black';
    const inCheck = engine.isCheck(engine.turn);

    turnDotEl.className = `turn-dot ${engine.turn === 'b' ? 'black' : ''} ${inCheck ? 'in-check' : ''}`;
    if (inCheck) {
      turnTextEl.textContent = `${turnColor} is in CHECK!`;
    } else {
      turnTextEl.textContent = `${turnColor}'s Turn`;
    }

    // Material Balance & Captured Pieces
    const mat = engine.getMaterialScore();
    renderCapturedTrays(mat);

    // Move History Table
    renderHistoryTable();

    // Active timer highlight
    updateClockDisplays();
  }

  function renderCapturedTrays(mat) {
    const isWhiteBottom = !state.isFlipped;
    const bottomTray = isWhiteBottom ? bottomCapturedEl : topCapturedEl;
    const topTray = isWhiteBottom ? topCapturedEl : bottomCapturedEl;

    // Captured pieces by White (Black pieces lost)
    let whiteHTML = '';
    mat.capturedBlack.forEach(type => {
      whiteHTML += `<span style="color: #60a5fa">${MINI_PIECES[type]}</span>`;
    });
    if (mat.diff > 0) {
      whiteHTML += `<span class="captured-lead-badge">+${mat.diff}</span>`;
    }

    // Captured pieces by Black (White pieces lost)
    let blackHTML = '';
    mat.capturedWhite.forEach(type => {
      blackHTML += `<span style="color: #f8fafc">${MINI_PIECES[type]}</span>`;
    });
    if (mat.diff < 0) {
      blackHTML += `<span class="captured-lead-badge">+${Math.abs(mat.diff)}</span>`;
    }

    if (isWhiteBottom) {
      bottomTray.innerHTML = whiteHTML;
      topTray.innerHTML = blackHTML;
    } else {
      bottomTray.innerHTML = blackHTML;
      topTray.innerHTML = whiteHTML;
    }
  }

  function renderHistoryTable() {
    historyListEl.innerHTML = '';
    const moves = engine.history;

    for (let i = 0; i < moves.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const whiteMove = moves[i];
      const blackMove = moves[i + 1];

      const row = document.createElement('tr');
      row.className = `history-row ${i >= moves.length - 2 ? 'latest' : ''}`;

      row.innerHTML = `
        <td class="move-num">${moveNum}.</td>
        <td><span class="move-san">${whiteMove.san}</span></td>
        <td><span class="move-san">${blackMove ? blackMove.san : ''}</span></td>
      `;
      historyListEl.appendChild(row);
    }

    const container = document.getElementById('historyContainer');
    container.scrollTop = container.scrollHeight;
  }

  function updatePlayerPods() {
    const isWhiteBottom = !state.isFlipped;
    if (state.gameMode === 'ai') {
      if (isWhiteBottom) {
        bottomNameEl.textContent = 'You (White)';
        bottomAvatarEl.className = 'player-avatar white';
        bottomAvatarEl.textContent = 'YOU';

        topNameEl.textContent = `Computer (${state.aiDifficulty.toUpperCase()})`;
        topAvatarEl.className = 'player-avatar black';
        topAvatarEl.textContent = 'AI';
      } else {
        bottomNameEl.textContent = 'You (Black)';
        bottomAvatarEl.className = 'player-avatar black';
        bottomAvatarEl.textContent = 'YOU';

        topNameEl.textContent = `Computer (${state.aiDifficulty.toUpperCase()})`;
        topAvatarEl.className = 'player-avatar white';
        topAvatarEl.textContent = 'AI';
      }
    } else {
      bottomNameEl.textContent = isWhiteBottom ? 'White (Player 1)' : 'Black (Player 2)';
      bottomAvatarEl.className = isWhiteBottom ? 'player-avatar white' : 'player-avatar black';
      bottomAvatarEl.textContent = isWhiteBottom ? 'W' : 'B';

      topNameEl.textContent = isWhiteBottom ? 'Black (Player 2)' : 'White (Player 1)';
      topAvatarEl.className = isWhiteBottom ? 'player-avatar black' : 'player-avatar white';
      topAvatarEl.textContent = isWhiteBottom ? 'B' : 'W';
    }
  }

  // -------------------------------------------------------------
  // Game Over Handling
  // -------------------------------------------------------------
  function handleGameOver(status) {
    let title = 'Game Over';
    let subtitle = '';

    if (status.reason === 'checkmate') {
      const winner = status.result === 'white' ? 'White' : 'Black';
      title = `Checkmate! ${winner} Wins`;
      subtitle = `${winner} has delivered checkmate.`;
    } else if (status.reason === 'time out') {
      const winner = status.result === 'white' ? 'White' : 'Black';
      title = `${winner} Won on Time!`;
      subtitle = `Opponent ran out of time.`;
    } else {
      title = 'Draw!';
      subtitle = `Game ended peacefully (${status.reason}).`;
    }

    gameOverTitle.textContent = title;
    gameOverSubtitle.textContent = subtitle;
    gameOverModal.classList.add('active');
  }

  // -------------------------------------------------------------
  // New Game & Controls
  // -------------------------------------------------------------
  function startNewGame() {
    engine.reset();
    state.selectedSquare = null;
    state.legalMovesForSelected = [];
    state.lastMove = null;
    state.isAiThinking = false;
    state.pendingPromotion = null;

    gameOverModal.classList.remove('active');
    promoModal.classList.remove('active');

    // Orientation based on player color
    state.isFlipped = state.playerColor === 'b';

    updatePlayerPods();
    initBoard();
    updateGameUI();
    startClocks();
    showToast('New game started! Good luck.');

    // If player is Black against AI, AI moves first
    if (state.gameMode === 'ai' && state.playerColor === 'b') {
      triggerAiMove();
    }
  }

  // Undo Move
  undoBtn.addEventListener('click', () => {
    if (state.isAiThinking) return;

    if (state.gameMode === 'ai') {
      // Undo AI move + player's move
      if (engine.history.length >= 2) {
        engine.undo();
        engine.undo();
      } else if (engine.history.length === 1 && state.playerColor === 'w') {
        engine.undo();
      }
    } else {
      engine.undo();
    }

    state.selectedSquare = null;
    state.legalMovesForSelected = [];
    state.lastMove = engine.history.length > 0 ? engine.history[engine.history.length - 1] : null;
    updateGameUI();
    showToast('Move undone');
  });

  // Flip Board
  flipBtn.addEventListener('click', () => {
    state.isFlipped = !state.isFlipped;
    updatePlayerPods();
    initBoard();
    updateGameUI();
    showToast(`Board flipped to ${state.isFlipped ? 'Black' : 'White'} view`);
  });

  // Export PGN
  exportPgnBtn.addEventListener('click', () => {
    let pgn = `[Event "Casual Game"]\n[Site "Grandmaster Chess Local"]\n[Date "${new Date().toISOString().split('T')[0]}"]\n[White "White"]\n[Black "Black"]\n\n`;
    const moves = engine.history;
    for (let i = 0; i < moves.length; i += 2) {
      const moveNum = Math.floor(i / 2) + 1;
      const w = moves[i].san;
      const b = moves[i + 1] ? moves[i + 1].san : '';
      pgn += `${moveNum}. ${w} ${b} `;
    }
    const over = engine.isGameOver();
    if (over.over) {
      if (over.result === 'white') pgn += ' 1-0';
      else if (over.result === 'black') pgn += ' 0-1';
      else pgn += ' 1/2-1/2';
    } else {
      pgn += ' *';
    }

    navigator.clipboard.writeText(pgn).then(() => {
      showToast('PGN copied to clipboard!');
    }).catch(() => {
      prompt('Copy PGN:', pgn);
    });
  });

  // Mute / Unmute
  muteBtn.addEventListener('click', () => {
    const isMuted = audio.toggleMute();
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
    showToast(isMuted ? 'Sound muted' : 'Sound unmuted');
  });

  newGameBtn.addEventListener('click', startNewGame);
  playAgainBtn.addEventListener('click', startNewGame);
  closeGameOverBtn.addEventListener('click', () => {
    gameOverModal.classList.remove('active');
  });

  // -------------------------------------------------------------
  // Settings Controls (Segmented Buttons)
  // -------------------------------------------------------------
  // Mode Selector
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.gameMode = e.target.dataset.mode;
      const aiSettings = document.getElementById('aiSettingsGroup');
      aiSettings.style.display = state.gameMode === 'ai' ? 'flex' : 'none';
      startNewGame();
    });
  });

  // AI Difficulty Selector
  document.querySelectorAll('[data-difficulty]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.aiDifficulty = e.target.dataset.difficulty;
      updatePlayerPods();
      showToast(`AI difficulty set to ${state.aiDifficulty.toUpperCase()}`);
    });
  });

  // Play As Color Selector
  document.querySelectorAll('[data-color]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-color]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const val = e.target.dataset.color;
      if (val === 'random') {
        state.playerColor = Math.random() < 0.5 ? 'w' : 'b';
      } else {
        state.playerColor = val;
      }
      startNewGame();
    });
  });

  // Clock Control Selector
  document.querySelectorAll('[data-time]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-time]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.timeControl = e.target.dataset.time;
      startClocks();
      showToast(`Clock set to ${e.target.textContent}`);
    });
  });

  // Keyboard Shortcuts: Z (Undo), F (Flip), N (New Game)
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if ((e.key === 'z' || e.key === 'Z') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      undoBtn.click();
    } else if (e.key === 'f' || e.key === 'F') {
      flipBtn.click();
    }
  });

  // Initialize
  startNewGame();
});
