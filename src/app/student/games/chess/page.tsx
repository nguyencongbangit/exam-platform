'use client';

import { useState, useEffect, useCallback, useRef, useTransition } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';

// Classic Wikipedia "diagram" chess piece SVGs
const PIECE_IMG: Record<Color, Record<PieceSymbol, string>> = {
  w: {
    k: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    r: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    b: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    n: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    p: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
  },
  b: {
    k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  },
};

// Mini piece icons for captured display (smaller)
const PIECE_MINI: Record<PieceSymbol, string> = {
  k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙',
};

const PIECE_VALUE: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const INITIAL_COUNTS: Record<PieceSymbol, number> = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 };

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

type Difficulty = 'easy' | 'medium' | 'hard';

// Piece-square tables (from Black's perspective, rank 0 = rank 8)
const PST: Record<PieceSymbol, number[][]> = {
  p: [
    [ 0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [ 5,  5, 10, 25, 25, 10,  5,  5],
    [ 0,  0,  0, 20, 20,  0,  0,  0],
    [ 5, -5,-10,  0,  0,-10, -5,  5],
    [ 5, 10, 10,-20,-20, 10, 10,  5],
    [ 0,  0,  0,  0,  0,  0,  0,  0],
  ],
  n: [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50],
  ],
  b: [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20],
  ],
  r: [
    [ 0,  0,  0,  0,  0,  0,  0,  0],
    [ 5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [ 0,  0,  0,  5,  5,  0,  0,  0],
  ],
  q: [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [ -5,  0,  5,  5,  5,  5,  0, -5],
    [  0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20],
  ],
  k: [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [ 20, 20,  0,  0,  0,  0, 20, 20],
    [ 20, 30, 10,  0,  0, 10, 30, 20],
  ],
};

function evaluateBoard(chess: Chess): number {
  if (chess.isCheckmate()) return chess.turn() === 'b' ? 99999 : -99999;
  if (chess.isDraw() || chess.isStalemate()) return 0;

  let score = 0;
  const board = chess.board();

  // Material + positional score
  const pawnsB: number[] = [];
  const pawnsW: number[] = [];
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const cell = board[r][f];
      if (!cell) continue;
      const base = PIECE_VALUE[cell.type] * 100;
      const pstRow = cell.color === 'b' ? r : 7 - r;
      const pst = PST[cell.type][pstRow][f];
      score += cell.color === 'b' ? (base + pst) : -(base + pst);
      if (cell.type === 'p') {
        if (cell.color === 'b') pawnsB.push(f);
        else pawnsW.push(f);
      }
    }
  }

  // Doubled pawns penalty (-20 per extra pawn on same file)
  for (let f = 0; f < 8; f++) {
    const bDouble = pawnsB.filter(x => x === f).length - 1;
    const wDouble = pawnsW.filter(x => x === f).length - 1;
    if (bDouble > 0) score -= bDouble * 20;
    if (wDouble > 0) score += wDouble * 20;
  }

  // Mobility bonus (số nước đi hợp lệ)
  const mobilityScore = chess.moves().length * 5;
  score += chess.turn() === 'b' ? mobilityScore : -mobilityScore;

  // Check bonus
  if (chess.inCheck()) score += chess.turn() === 'b' ? -30 : 30;

  return score;
}

// MVV-LVA score for move ordering (Most Valuable Victim - Least Valuable Attacker)
function mvvLva(move: { captured?: string; piece: string }): number {
  if (!move.captured) return 0;
  return PIECE_VALUE[move.captured as PieceSymbol] * 10 - PIECE_VALUE[move.piece as PieceSymbol];
}

function orderMoves(moves: ReturnType<Chess['moves']>) {
  return moves.sort((a, b) => {
    const aScore = mvvLva(a as { captured?: string; piece: string });
    const bScore = mvvLva(b as { captured?: string; piece: string });
    return bScore - aScore;
  });
}

// Quiescence search: tiếp tục tìm kiếm sau khi đạt depth 0 cho đến khi vị trí "yên tĩnh"
function quiescence(chess: Chess, alpha: number, beta: number, maximizing: boolean): number {
  const stand_pat = evaluateBoard(chess);
  if (chess.isGameOver()) return stand_pat;

  if (maximizing) {
    if (stand_pat >= beta) return beta;
    alpha = Math.max(alpha, stand_pat);
    const captures = chess.moves({ verbose: true }).filter(m => m.captured);
    orderMoves(captures);
    for (const move of captures) {
      chess.move(move.san);
      const score = quiescence(chess, alpha, beta, false);
      chess.undo();
      if (score >= beta) return beta;
      alpha = Math.max(alpha, score);
    }
    return alpha;
  } else {
    if (stand_pat <= alpha) return alpha;
    beta = Math.min(beta, stand_pat);
    const captures = chess.moves({ verbose: true }).filter(m => m.captured);
    orderMoves(captures);
    for (const move of captures) {
      chess.move(move.san);
      const score = quiescence(chess, alpha, beta, true);
      chess.undo();
      if (score <= alpha) return alpha;
      beta = Math.min(beta, score);
    }
    return beta;
  }
}

function minimax(chess: Chess, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  if (chess.isGameOver()) return evaluateBoard(chess);
  if (depth === 0) return quiescence(chess, alpha, beta, maximizing);

  const moves = orderMoves(chess.moves({ verbose: true }));

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      chess.move(move.san);
      best = Math.max(best, minimax(chess, depth - 1, alpha, beta, false));
      chess.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      chess.move(move.san);
      best = Math.min(best, minimax(chess, depth - 1, alpha, beta, true));
      chess.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function getAIMove(chess: Chess, difficulty: Difficulty): string | null {
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;

  // Dễ: depth 3 + quiescence, TB: depth 4, Khó: depth 5
  const depth = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;

  const isBlack = chess.turn() === 'b';
  let bestScore = isBlack ? -Infinity : Infinity;
  let bestMoves: string[] = [];

  moves.sort((a, b) => (b.captured ? PIECE_VALUE[b.captured as PieceSymbol] : 0) - (a.captured ? PIECE_VALUE[a.captured as PieceSymbol] : 0));

  for (const move of moves) {
    chess.move(move.san);
    const score = minimax(chess, depth - 1, -Infinity, Infinity, !isBlack);
    chess.undo();
    if (isBlack) {
      if (score > bestScore) { bestScore = score; bestMoves = [move.san]; }
      else if (score === bestScore) bestMoves.push(move.san);
    } else {
      if (score < bestScore) { bestScore = score; bestMoves = [move.san]; }
      else if (score === bestScore) bestMoves.push(move.san);
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

function computeCaptured(board: ReturnType<Chess['board']>): Record<Color, PieceSymbol[]> {
  const counts: Record<Color, Partial<Record<PieceSymbol, number>>> = { w: {}, b: {} };
  for (const row of board) {
    for (const cell of row) {
      if (!cell) continue;
      counts[cell.color][cell.type] = (counts[cell.color][cell.type] ?? 0) + 1;
    }
  }
  const captured: Record<Color, PieceSymbol[]> = { w: [], b: [] };
  for (const color of ['w', 'b'] as Color[]) {
    for (const piece of ['q', 'r', 'b', 'n', 'p'] as PieceSymbol[]) {
      const missing = INITIAL_COUNTS[piece] - (counts[color][piece] ?? 0);
      for (let i = 0; i < missing; i++) captured[color].push(piece);
    }
  }
  return captured;
}

function materialAdv(captured: Record<Color, PieceSymbol[]>) {
  const wLost = captured.w.reduce((s, p) => s + PIECE_VALUE[p], 0);
  const bLost = captured.b.reduce((s, p) => s + PIECE_VALUE[p], 0);
  return bLost - wLost; // positive = white ahead
}

// ── Player bar component ─────────────────────────────────────────────────────
function PlayerBar({
  name, color, isActive, captured, adv, isFullscreen,
}: {
  name: string; color: Color; isActive: boolean;
  captured: PieceSymbol[]; adv: number; isFullscreen: boolean;
}) {
  const advStr = adv > 0 ? `+${adv}` : adv < 0 ? `${adv}` : '';
  const avatarGrad = color === 'b'
    ? 'from-gray-700 to-gray-900'
    : 'from-gray-100 to-gray-300 border border-gray-300';

  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
      isActive
        ? isFullscreen ? 'bg-white/10 ring-1 ring-white/30' : 'bg-blue-50 ring-1 ring-blue-200'
        : isFullscreen ? 'bg-white/5' : 'bg-gray-50'
    }`}>
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-sm font-black shrink-0 ${color === 'w' ? 'text-gray-700' : 'text-white'}`}>
        {color === 'b' ? '🤖' : '👤'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold truncate ${isFullscreen ? 'text-white' : 'text-gray-800'}`}>{name}</span>
          {isActive && (
            <span className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${isFullscreen ? 'bg-green-400' : 'bg-blue-500'}`} />
          )}
        </div>
        {/* Captured pieces + advantage */}
        <div className="flex items-center gap-1 flex-wrap">
          {captured.map((p, i) => (
            <span key={i} className={`text-xs leading-none ${isFullscreen ? 'text-white/70' : 'text-gray-500'}`}>
              {PIECE_MINI[p]}
            </span>
          ))}
          {advStr && (
            <span className={`text-xs font-bold ml-1 ${isFullscreen ? 'text-green-300' : 'text-green-600'}`}>
              {advStr}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Multiplayer Lobby ─────────────────────────────────────────────────────────
type GameMode = 'menu' | 'vs-ai' | 'create-room' | 'join-room' | 'multiplayer';

function MultiplayerLobby({ onStartAI, onStartMulti }: {
  onStartAI: () => void;
  onStartMulti: (code: string, myColor: Color, myName: string, opponentName: string) => void;
}) {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const createRoom = async () => {
    setLoading(true); setError('');
    const res = await fetch('/api/chess-room', { method: 'POST' });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Lỗi tạo phòng'); setLoading(false); return; }
    setRoomCode(data.code);
    setMode('create');
    setLoading(false);
    setWaiting(true);
  };

  // Poll cho đến khi có người vào phòng
  useEffect(() => {
    if (!waiting || !roomCode) return;
    pollRef.current = setInterval(async () => {
      const res = await fetch(`/api/chess-room/${roomCode}`);
      const data = await res.json();
      if (data.status === 'PLAYING') {
        clearInterval(pollRef.current!);
        onStartMulti(roomCode, data.hostColor as Color, data.hostName, data.guestName ?? '?');
      }
    }, 1500);
    return () => clearInterval(pollRef.current!);
  }, [waiting, roomCode, onStartMulti]);

  const joinRoom = async () => {
    if (!joinCode.trim()) return;
    setLoading(true); setError('');
    const res = await fetch(`/api/chess-room/${joinCode.trim().toUpperCase()}`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Không thể vào phòng'); setLoading(false); return; }
    // Lấy thêm thông tin phòng
    const roomRes = await fetch(`/api/chess-room/${joinCode.trim().toUpperCase()}`);
    const room = await roomRes.json();
    setLoading(false);
    onStartMulti(joinCode.trim().toUpperCase(), data.myColor as Color, room.guestName ?? '?', room.hostName ?? '?');
  };

  if (mode === 'create') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8">
        <div className="text-6xl">♟</div>
        <h2 className="text-2xl font-extrabold text-gray-900">Chờ bạn vào phòng...</h2>
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-8 py-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Gửi mã này cho bạn bè</p>
          <div className="text-4xl font-black tracking-[0.25em] text-indigo-700 mb-3">{roomCode}</div>
          <button onClick={() => { navigator.clipboard.writeText(roomCode); }}
            className="text-xs text-indigo-500 underline">Sao chép mã</button>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          Đang chờ người chơi...
        </div>
        <button onClick={() => { clearInterval(pollRef.current!); setMode('choose'); setWaiting(false); setRoomCode(''); }}
          className="text-sm text-gray-400 underline">Huỷ</button>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 p-8">
        <div className="text-5xl">🔗</div>
        <h2 className="text-2xl font-extrabold text-gray-900">Nhập mã phòng</h2>
        <input
          value={joinCode}
          onChange={e => setJoinCode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && joinRoom()}
          maxLength={6}
          placeholder="VD: AB12XY"
          className="text-3xl font-black tracking-[0.3em] text-center border-2 border-gray-300 rounded-2xl px-6 py-4 w-64 focus:outline-none focus:border-indigo-500 uppercase"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={joinRoom} disabled={loading || joinCode.length < 4}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 transition-all">
          {loading ? 'Đang vào...' : 'Vào phòng →'}
        </button>
        <button onClick={() => setMode('choose')} className="text-sm text-gray-400 underline">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-6xl">♟</div>
      <h1 className="text-3xl font-extrabold text-gray-900">Cờ Vua</h1>
      <p className="text-gray-500">Chọn chế độ chơi</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-2">
        <button onClick={onStartAI}
          className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🤖</div>
          <div>
            <div className="font-bold text-gray-800">Chơi với Máy</div>
            <div className="text-xs text-gray-500 mt-0.5">3 mức độ khó</div>
          </div>
        </button>

        <button onClick={() => setMode('join')}
          className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50 hover:shadow-lg transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🔗</div>
          <div>
            <div className="font-bold text-gray-800">Nhập mã vào phòng</div>
            <div className="text-xs text-gray-500 mt-0.5">Bạn bè đã tạo phòng</div>
          </div>
        </button>

        <button onClick={createRoom} disabled={loading}
          className="sm:col-span-2 flex items-center justify-center gap-3 p-5 rounded-3xl border-2 border-purple-200 bg-purple-50 hover:border-purple-400 hover:bg-purple-100 hover:shadow-lg transition-all disabled:opacity-60 group">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            {loading ? <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /> : '🎮'}
          </div>
          <div className="text-left">
            <div className="font-bold text-purple-800">Tạo phòng mời bạn</div>
            <div className="text-xs text-purple-500">Nhận mã → gửi cho bạn bè</div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChessPage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [multiCode, setMultiCode] = useState('');
  const [myColor, setMyColor] = useState<Color>('w');
  const [myName, setMyName] = useState('Bạn');
  const [opponentName, setOpponentName] = useState('Bạn bè');
  const pollRef2 = useRef<NodeJS.Timeout | null>(null);
  const lastFenRef = useRef('');
  const [, startTransition] = useTransition();

  const [chess] = useState(() => new Chess());
  const [board, setBoard] = useState(chess.board());
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [status, setStatus] = useState<'playing' | 'checkmate' | 'draw' | 'stalemate'>('playing');
  const [winner, setWinner] = useState<'w' | 'b' | null>(null);
  const [inCheck, setInCheck] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const [aiThinking, setAiThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [captured, setCaptured] = useState<Record<Color, PieceSymbol[]>>({ w: [], b: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [squareSize, setSquareSize] = useState(58);
  const [showGameOver, setShowGameOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const syncState = useCallback(() => {
    const b = chess.board();
    setBoard(b);
    setInCheck(chess.inCheck());
    setMoveHistory(chess.history());
    setCaptured(computeCaptured(b));
    if (chess.isCheckmate()) { setStatus('checkmate'); setWinner(chess.turn() === 'w' ? 'b' : 'w'); setTimeout(() => setShowGameOver(true), 800); }
    else if (chess.isStalemate()) { setStatus('stalemate'); setTimeout(() => setShowGameOver(true), 800); }
    else if (chess.isDraw()) { setStatus('draw'); setTimeout(() => setShowGameOver(true), 800); }
    else setStatus('playing');
  }, [chess]);

  // Polling for multiplayer
  useEffect(() => {
    if (gameMode !== 'multiplayer' || !multiCode) return;
    pollRef2.current = setInterval(async () => {
      const res = await fetch(`/api/chess-room/${multiCode}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.fen === lastFenRef.current) return; // không có gì mới
      lastFenRef.current = data.fen;
      startTransition(() => {
        chess.load(data.fen);
        // khôi phục lịch sử hiển thị
        setMoveHistory(data.moveHistory ?? []);
        const b = chess.board();
        setBoard(b);
        setInCheck(chess.inCheck());
        setCaptured(computeCaptured(b));
        // last move
        const hist = data.moveHistory as string[];
        if (hist?.length) {
          const fullHist = chess.history({ verbose: true });
          const last = fullHist[fullHist.length - 1];
          if (last) setLastMove({ from: last.from as Square, to: last.to as Square });
        }
        if (data.status === 'FINISHED') {
          const r = data.result as string;
          if (r?.startsWith('checkmate')) {
            const winColor = r.split(':')[1] as Color;
            setStatus('checkmate'); setWinner(winColor); setTimeout(() => setShowGameOver(true), 800);
          } else if (r === 'stalemate') {
            setStatus('stalemate'); setTimeout(() => setShowGameOver(true), 800);
          } else {
            setStatus('draw'); setTimeout(() => setShowGameOver(true), 800);
          }
          clearInterval(pollRef2.current!);
        } else {
          setStatus('playing');
        }
      });
    }, 1500);
    return () => clearInterval(pollRef2.current!);
  }, [gameMode, multiCode, chess]);

  const triggerAI = useCallback(() => {
    setAiThinking(true);
    setTimeout(async () => {
      const move = getAIMove(chess, difficulty);
      if (move) {
        chess.move(move);
        const hist = chess.history({ verbose: true });
        const last = hist[hist.length - 1];
        if (last) setLastMove({ from: last.from as Square, to: last.to as Square });
      }
      syncState();
      setAiThinking(false);
    }, difficulty === 'hard' ? 200 : 150);
  }, [chess, difficulty, syncState]);

  const handleSquareClick = async (sq: Square) => {
    if (status !== 'playing' || chess.turn() !== playerColor || aiThinking) return;
    if (selected) {
      if (legalMoves.includes(sq)) {
        try {
          if (gameMode === 'multiplayer') {
            // Gửi nước đi lên server, đợi polling cập nhật board
            const res = await fetch(`/api/chess-room/${multiCode}/move`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ move: { from: selected, to: sq, promotion: 'q' } }),
            });
            if (!res.ok) { setSelected(null); setLegalMoves([]); return; }
            setSelected(null); setLegalMoves([]);
            return;
          }
          chess.move({ from: selected, to: sq, promotion: 'q' });
          setLastMove({ from: selected, to: sq });
          setSelected(null);
          setLegalMoves([]);
          syncState();
          if (!chess.isGameOver()) setTimeout(triggerAI, 100);
          return;
        } catch { /* fall through */ }
      }
      if (selected === sq) { setSelected(null); setLegalMoves([]); return; }
    }
    const piece = chess.get(sq);
    if (piece && piece.color === playerColor) {
      setSelected(sq);
      setLegalMoves(chess.moves({ square: sq, verbose: true }).map(m => m.to as Square));
    } else {
      setSelected(null);
      setLegalMoves([]);
    }
  };

  const resetGame = () => {
    chess.reset();
    lastFenRef.current = '';
    setSelected(null); setLegalMoves([]); setLastMove(null);
    setStatus('playing'); setWinner(null); setAiThinking(false); setShowGameOver(false);
    syncState();
  };

  const handleStartMulti = useCallback((code: string, color: Color, name: string, oppName: string) => {
    chess.reset();
    lastFenRef.current = chess.fen();
    setMyColor(color);
    setPlayerColor(color);
    setMyName(name);
    setOpponentName(oppName);
    setMultiCode(code);
    setGameMode('multiplayer');
    setStatus('playing'); setWinner(null); setShowGameOver(false);
    syncState();
  }, [chess, syncState]);

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!isFullscreen) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  useEffect(() => {
    const onChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (fs) {
        const h = window.innerHeight;
        // Available for board: height - player bars (2×56px) - labels (2×20px) - padding (80px)
        const available = h - 112 - 40 - 80;
        const sz = Math.min(Math.max(Math.floor(available / 8), 56), 90);
        setSquareSize(sz);
      } else {
        setSquareSize(58);
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [moveHistory]);

  // Square color logic
  const getSquareBg = (file: string, rank: string, sq: Square): string => {
    const isLight = (FILES.indexOf(file) + parseInt(rank)) % 2 === 1;
    const isSelected = selected === sq;
    const isLastMove = lastMove?.from === sq || lastMove?.to === sq;

    if (isSelected) return '#7fc97f'; // selected: green
    if (isLastMove) return isLight ? '#f6f669' : '#baca2b'; // last move: yellow
    return isLight ? '#f0f0f0' : '#b0c4de'; // normal
  };

  const kingInCheck = inCheck ? chess.turn() : null;
  const adv = materialAdv(captured);
  const turn = chess.turn();

  const isMulti = gameMode === 'multiplayer';
  const opponentColor: Color = playerColor === 'w' ? 'b' : 'w';

  const statusLabel = () => {
    if (aiThinking) return { text: 'Máy đang suy nghĩ...', icon: '🤔', color: isFullscreen ? 'text-yellow-300' : 'text-yellow-600' };
    if (status === 'checkmate') return winner === playerColor
      ? { text: 'Bạn thắng! Chiếu hết!', icon: '🏆', color: 'text-green-400' }
      : { text: `${isMulti ? opponentName : 'Máy'} thắng! Chiếu hết!`, icon: '😔', color: 'text-red-400' };
    if (status === 'stalemate') return { text: 'Hòa cờ (Pat)!', icon: '🤝', color: 'text-gray-400' };
    if (status === 'draw') return { text: 'Hòa cờ!', icon: '🤝', color: 'text-gray-400' };
    if (inCheck) return turn === playerColor
      ? { text: 'Vua bạn đang bị chiếu!', icon: '⚠️', color: 'text-red-400' }
      : { text: `${isMulti ? opponentName : 'Máy'} đang bị chiếu!`, icon: '⚡', color: 'text-orange-400' };
    if (isMulti) return turn === playerColor
      ? { text: 'Lượt của bạn', icon: '♟', color: isFullscreen ? 'text-blue-300' : 'text-blue-600' }
      : { text: `Đang chờ ${opponentName}...`, icon: '⏳', color: isFullscreen ? 'text-gray-400' : 'text-gray-500' };
    return turn === playerColor
      ? { text: 'Lượt của bạn', icon: '♟', color: isFullscreen ? 'text-blue-300' : 'text-blue-600' }
      : { text: 'Lượt của máy...', icon: '⏳', color: isFullscreen ? 'text-gray-400' : 'text-gray-500' };
  };
  const sl = statusLabel();

  // Board size
  const boardPx = squareSize * 8;
  const labelSize = isFullscreen ? 22 : 18;

  // ── Chessboard render ──────────────────────────────────────────────────────
  const ChessBoard = () => (
    <div>
      {/* Top file labels */}
      <div className="flex" style={{ paddingLeft: labelSize, paddingRight: labelSize }}>
        <div style={{ width: labelSize }} />
        {FILES.map(f => (
          <div key={f} style={{ width: squareSize, fontSize: isFullscreen ? 13 : 11 }}
            className={`text-center font-semibold select-none ${isFullscreen ? 'text-white/60' : 'text-gray-500'}`}>
            {f}
          </div>
        ))}
        <div style={{ width: labelSize }} />
      </div>

      <div className="flex items-center">
        {/* Left rank labels */}
        <div style={{ width: labelSize }}>
          {RANKS.map(r => (
            <div key={r} style={{ height: squareSize, fontSize: isFullscreen ? 13 : 11 }}
              className={`flex items-center justify-center font-semibold select-none ${isFullscreen ? 'text-white/60' : 'text-gray-500'}`}>
              {r}
            </div>
          ))}
        </div>

        {/* Board */}
        <div style={{ width: boardPx, height: boardPx, border: isFullscreen ? '3px solid rgba(255,255,255,0.15)' : '2px solid #555', borderRadius: 4, overflow: 'hidden', boxShadow: isFullscreen ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' : '0 8px 32px rgba(0,0,0,0.18)' }}>
          {RANKS.map((rank, rankIdx) => (
            <div key={rank} className="flex">
              {FILES.map((file, fileIdx) => {
                const sq = `${file}${rank}` as Square;
                const piece = board[rankIdx][fileIdx];
                const isLegal = legalMoves.includes(sq);
                const isKingCheck = kingInCheck && piece?.type === 'k' && piece.color === kingInCheck;
                const bg = isKingCheck ? '#ff4444' : getSquareBg(file, rank, sq);

                return (
                  <div
                    key={sq}
                    onClick={() => handleSquareClick(sq)}
                    style={{ width: squareSize, height: squareSize, backgroundColor: bg, position: 'relative', cursor: 'pointer', transition: 'background-color 0.15s' }}
                  >
                    {/* Legal move indicator */}
                    {isLegal && !piece && (
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{ width: squareSize * 0.28, height: squareSize * 0.28, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.22)' }} />
                      </div>
                    )}
                    {isLegal && piece && (
                      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 4px rgba(0,0,0,0.28)', borderRadius: 2 }} />
                    )}
                    {/* Piece image */}
                    {piece && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={PIECE_IMG[piece.color][piece.type]}
                        alt={`${piece.color}${piece.type}`}
                        draggable={false}
                        style={{
                          width: squareSize * 0.9,
                          height: squareSize * 0.9,
                          position: 'absolute',
                          top: '50%', left: '50%',
                          transform: selected === sq ? 'translate(-50%,-50%) scale(1.12)' : 'translate(-50%,-50%) scale(1)',
                          transition: 'transform 0.1s',
                          userSelect: 'none',
                          pointerEvents: 'none',
                          filter: isKingCheck ? 'drop-shadow(0 0 6px #ff0000)' : 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Right rank labels */}
        <div style={{ width: labelSize }}>
          {RANKS.map(r => (
            <div key={r} style={{ height: squareSize, fontSize: isFullscreen ? 13 : 11 }}
              className={`flex items-center justify-center font-semibold select-none ${isFullscreen ? 'text-white/60' : 'text-gray-500'}`}>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom file labels */}
      <div className="flex" style={{ paddingLeft: labelSize, paddingRight: labelSize }}>
        <div style={{ width: labelSize }} />
        {FILES.map(f => (
          <div key={f} style={{ width: squareSize, fontSize: isFullscreen ? 13 : 11 }}
            className={`text-center font-semibold select-none ${isFullscreen ? 'text-white/60' : 'text-gray-500'}`}>
            {f}
          </div>
        ))}
        <div style={{ width: labelSize }} />
      </div>
    </div>
  );

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div className={`flex flex-col gap-3 ${isFullscreen ? 'w-64 h-full' : 'w-full lg:w-64'}`}>
      {/* Status */}
      <div className={`px-4 py-3 rounded-xl text-center ${isFullscreen ? 'bg-white/8 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
        <div className={`text-2xl mb-0.5`}>{sl.icon}</div>
        <p className={`text-sm font-bold ${sl.color}`}>{sl.text}</p>
        {aiThinking && (
          <div className="flex items-center justify-center gap-1 mt-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Difficulty — chỉ hiện khi chơi vs AI */}
      {!isMulti && (
        <div className={`px-4 py-3 rounded-xl ${isFullscreen ? 'bg-white/8 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <p className={`text-xs font-semibold mb-2 ${isFullscreen ? 'text-white/50' : 'text-gray-500'} uppercase tracking-wide`}>Độ khó</p>
          <div className="flex gap-1.5">
            {([['easy','Dễ','#22c55e'],['medium','TB','#f59e0b'],['hard','Khó','#ef4444']] as const).map(([k,l,c]) => (
              <button key={k} onClick={() => { setDifficulty(k); resetGame(); }}
                style={difficulty === k ? { backgroundColor: c, color: '#fff', border: `2px solid ${c}` } : {}}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${difficulty === k ? '' : isFullscreen ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Room code khi multiplayer */}
      {isMulti && (
        <div className={`px-4 py-3 rounded-xl text-center ${isFullscreen ? 'bg-white/8 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <p className={`text-xs font-semibold mb-1 ${isFullscreen ? 'text-white/50' : 'text-gray-500'} uppercase tracking-wide`}>Mã phòng</p>
          <p className={`text-xl font-black tracking-widest ${isFullscreen ? 'text-white' : 'text-indigo-700'}`}>{multiCode}</p>
          <p className={`text-xs mt-1 ${isFullscreen ? 'text-white/40' : 'text-gray-400'}`}>
            {playerColor === 'w' ? '⬜ Bạn đi Trắng' : '⬛ Bạn đi Đen'}
          </p>
        </div>
      )}

      {/* Move history */}
      <div className={`flex-1 rounded-xl overflow-hidden flex flex-col ${isFullscreen ? 'bg-white/8 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
        <p className={`text-xs font-semibold px-4 pt-3 pb-2 ${isFullscreen ? 'text-white/50' : 'text-gray-500'} uppercase tracking-wide shrink-0`}>Lịch sử nước đi</p>
        <div ref={historyRef} className="flex-1 overflow-y-auto px-3 pb-3">
          {moveHistory.length === 0 ? (
            <p className={`text-xs text-center py-3 ${isFullscreen ? 'text-white/30' : 'text-gray-400'}`}>Chưa có nước đi</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono">
              {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                <div key={i} className="contents">
                  <div className="flex items-center gap-1 py-0.5">
                    <span className={`text-xs w-5 shrink-0 ${isFullscreen ? 'text-white/30' : 'text-gray-400'}`}>{i+1}.</span>
                    <span className={`text-xs font-bold ${isFullscreen ? 'text-white/80' : 'text-gray-800'}`}>{moveHistory[i*2]}</span>
                  </div>
                  <div className="flex items-center py-0.5">
                    <span className={`text-xs ${isFullscreen ? 'text-white/60' : 'text-gray-500'}`}>{moveHistory[i*2+1] ?? ''}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={() => { clearInterval(pollRef2.current!); if (isMulti) { setGameMode('menu'); } else resetGame(); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${isFullscreen ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
          {isMulti ? '🏠 Thoát phòng' : '🔄 Ván mới'}
        </button>
        <button onClick={toggleFullscreen}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${isFullscreen ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'}`}>
          {isFullscreen ? '⛶' : '⛶'}
          {isFullscreen ? ' Thu' : ' Mở rộng'}
        </button>
      </div>

      {/* Tips (only in normal mode) */}
      {!isFullscreen && (
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-3">
          <p className="text-xs font-bold text-amber-800 mb-1.5">💡 Mẹo chơi cờ</p>
          <ul className="text-xs text-amber-700 space-y-1">
            <li>• Kiểm soát trung tâm ngay từ đầu</li>
            <li>• Phát triển Mã, Tượng trước khi đi Hậu</li>
            <li>• Nhập thành sớm để bảo vệ Vua</li>
          </ul>
        </div>
      )}
    </div>
  );

  // ── Game over overlay ──────────────────────────────────────────────────────
  const GameOverModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={(e) => e.target === e.currentTarget && setShowGameOver(false)}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-[fadeIn_0.3s_ease]">
        <div className="text-7xl mb-4">
          {status === 'checkmate' && winner === 'w' ? '🏆' : status === 'checkmate' ? '🤖' : '🤝'}
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-1">
          {status === 'checkmate' && winner === playerColor ? 'Bạn Thắng!' : status === 'checkmate' ? (isMulti ? `${opponentName} Thắng!` : 'Máy Thắng!') : 'Hòa!'}
        </h2>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          {status === 'checkmate' && winner === playerColor
            ? 'Xuất sắc! Bạn đã chiếu hết đối thủ.'
            : status === 'checkmate'
            ? 'Đừng nản lòng! Hãy thử lại nhé.'
            : 'Ván cờ kết thúc hòa.'}
        </p>
        <div className="text-sm text-gray-400 mb-6">{moveHistory.length} nước đi</div>
        <div className="flex gap-3">
          <button onClick={resetGame}
            className="flex-1 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:from-indigo-600 hover:to-purple-700 transition-all">
            🔄 Chơi lại
          </button>
          <a href="/student/games"
            className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center">
            🏠 Thoát
          </a>
        </div>
      </div>
    </div>
  );

  // Tên player dynamic
  const whitePlayerName = playerColor === 'w' ? myName : (isMulti ? opponentName : 'Máy tính');
  const blackPlayerName = playerColor === 'b' ? myName : (isMulti ? opponentName : 'Máy tính');
  const whiteIsActive = turn === 'w' && (playerColor === 'w' || (!isMulti && !aiThinking));
  const blackIsActive = turn === 'b' && (playerColor === 'b' || (!isMulti && !aiThinking));

  // ── Menu ──────────────────────────────────────────────────────────────────
  if (gameMode === 'menu') {
    return (
      <div ref={containerRef} className="pb-8">
        <MultiplayerLobby
          onStartAI={() => { chess.reset(); setPlayerColor('w'); setGameMode('vs-ai'); syncState(); }}
          onStartMulti={handleStartMulti}
        />
      </div>
    );
  }

  // ── Fullscreen layout ──────────────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <div ref={containerRef} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 24, boxSizing: 'border-box' }}>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div style={{ width: boardPx + labelSize * 2 }}>
            <PlayerBar name={`${blackPlayerName} (Đen)`} color="b" isActive={blackIsActive || (!isMulti && aiThinking)}
              captured={captured.b} adv={adv < 0 ? -adv : 0} isFullscreen={true} />
          </div>
          <ChessBoard />
          <div style={{ width: boardPx + labelSize * 2 }}>
            <PlayerBar name={`${whitePlayerName} (Trắng)`} color="w" isActive={whiteIsActive}
              captured={captured.w} adv={adv > 0 ? adv : 0} isFullscreen={true} />
          </div>
        </div>
        <div style={{ width: 240, height: boardPx + 120, display: 'flex', flexDirection: 'column' }}>
          <Sidebar />
        </div>
        {showGameOver && <GameOverModal />}
      </div>
    );
  }

  // ── Normal layout ──────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="space-y-4 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">♟ Cờ Vua</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isMulti ? `🎮 Phòng: ${multiCode} · Bạn đi ${playerColor === 'w' ? 'Trắng' : 'Đen'}` : `Bạn chơi quân Trắng · Bấm `}
            {!isMulti && <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⛶ Mở rộng</kbd>}
            {!isMulti && ' để chơi toàn màn hình'}
          </p>
        </div>
        <button onClick={() => { clearInterval(pollRef2.current!); setGameMode('menu'); }}
          className="text-sm text-gray-400 hover:text-gray-700 underline">← Chọn chế độ</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="shrink-0">
          <div style={{ width: boardPx + labelSize * 2 }} className="mb-2">
            <PlayerBar name={`${blackPlayerName} (Đen)`} color="b" isActive={blackIsActive || (!isMulti && aiThinking)}
              captured={captured.b} adv={adv < 0 ? -adv : 0} isFullscreen={false} />
          </div>
          <ChessBoard />
          <div style={{ width: boardPx + labelSize * 2 }} className="mt-2">
            <PlayerBar name={`${whitePlayerName} (Trắng)`} color="w" isActive={whiteIsActive}
              captured={captured.w} adv={adv > 0 ? adv : 0} isFullscreen={false} />
          </div>
        </div>
        <Sidebar />
      </div>

      {showGameOver && <GameOverModal />}
    </div>
  );
}
