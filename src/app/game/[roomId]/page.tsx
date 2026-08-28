'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

interface Option {
  id: string;
  optionKey: string;
  content: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  content: string;
  options: Option[];
}

interface Participant {
  studentId: string;
  name: string;
  score: number;
  answeredCurrent: boolean;
  isHost: boolean;
}

interface MyAnswer {
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  pointsEarned: number;
}

interface ChatMessage {
  id: string;
  studentId: string;
  senderName: string;
  message: string;
  createdAt: string;
}

interface GameState {
  roomId: string;
  code: string;
  status: 'WAITING' | 'PLAYING' | 'FINISHED';
  hostId: string;
  myStudentId: string | null;
  difficulty: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  secondsPerQuestion: number;
  questionStartedAt: string | null;
  participants: Participant[];
  currentQuestion: Question | null;
  myAnswer: MyAnswer | null;
  messages: ChatMessage[];
}

const OPTION_COLORS = [
  { bg: 'bg-blue-500', light: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800', label: 'bg-blue-500 text-white' },
  { bg: 'bg-orange-500', light: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800', label: 'bg-orange-500 text-white' },
  { bg: 'bg-green-500', light: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800', label: 'bg-green-500 text-white' },
  { bg: 'bg-purple-500', light: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800', label: 'bg-purple-500 text-white' },
];

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  EASY: { label: 'Dễ', color: 'bg-green-100 text-green-700' },
  MEDIUM: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700' },
  HARD: { label: 'Khó', color: 'bg-red-100 text-red-700' },
};

function getInitials(name: string) {
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function CountdownTimer({ secondsPerQuestion, questionStartedAt }: { secondsPerQuestion: number; questionStartedAt: string | null }) {
  const [timeLeft, setTimeLeft] = useState(secondsPerQuestion);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!questionStartedAt) { setTimeLeft(secondsPerQuestion); return; }
    const tick = () => {
      const elapsed = (Date.now() - new Date(questionStartedAt).getTime()) / 1000;
      setTimeLeft(Math.max(0, secondsPerQuestion - elapsed));
    };
    tick();
    animRef.current = setInterval(tick, 100);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [questionStartedAt, secondsPerQuestion]);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / secondsPerQuestion;
  const dashOffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 5;
  const strokeColor = isUrgent ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#8b5cf6';

  return (
    <div className="relative flex items-center justify-center">
      <svg width="108" height="108" className={isUrgent ? 'animate-pulse' : ''}>
        <circle cx="54" cy="54" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="54" cy="54" r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 54 54)"
          style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s' }}
        />
      </svg>
      <div className="absolute text-center">
        <span className={`text-3xl font-black ${isUrgent ? 'text-red-500' : 'text-gray-800'}`}>
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
}

function ChatBox({ roomId, messages, myStudentId }: { roomId: string; messages: ChatMessage[]; myStudentId: string | null }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput('');
    await fetch(`/api/game/${roomId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    }).catch(() => {});
    setSending(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col h-[420px]">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
        <span className="text-lg">💬</span>
        <h3 className="font-bold text-gray-800 text-sm">Trò chuyện</h3>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-xs mt-6">Chưa có tin nhắn. Hãy chào nhau! 👋</p>
        )}
        {messages.map((m) => {
          const isMe = m.studentId === myStudentId;
          return (
            <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && <span className="text-xs text-gray-500 mb-0.5 ml-1">{m.senderName}</span>}
              <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${isMe ? 'bg-purple-500 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                {m.message}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 200))}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Nhắn tin..."
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 bg-gray-50"
        />
        <button
          onClick={send}
          disabled={!input.trim() || sending}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-colors"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

function WaitingRoom({ state, onStart }: { state: GameState; onStart: () => void }) {
  const [copied, setCopied] = useState(false);
  const isHost = state.myStudentId === state.hostId;

  const copyCode = () => {
    navigator.clipboard.writeText(state.code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Phòng chờ</h1>
        <p className="text-gray-500">Chia sẻ mã để bạn bè tham gia</p>
      </div>

      {/* Room Code */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 mb-6 text-center shadow-xl shadow-purple-200">
        <p className="text-purple-200 text-sm font-medium mb-2 uppercase tracking-widest">Mã phòng</p>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="text-5xl font-black text-white tracking-[0.15em] font-mono">{state.code}</span>
        </div>
        <button
          onClick={copyCode}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-semibold transition-all"
        >
          {copied ? '✅ Đã sao chép!' : '📋 Sao chép mã'}
        </button>
      </div>

      {/* 2-column: participants + chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Participants */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Người chơi ({state.participants.length})</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Trực tiếp</span>
            </div>
          </div>
          <div className="space-y-2">
            {state.participants.map((p) => (
              <div key={p.studentId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${p.isHost ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}`}>
                  {getInitials(p.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  {p.isHost && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">👑 Chủ phòng</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <ChatBox roomId={state.roomId} messages={state.messages} myStudentId={state.myStudentId} />
      </div>

      {/* Action */}
      {isHost ? (
        <button
          onClick={onStart}
          disabled={state.participants.length < 1}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
        >
          🚀 Bắt đầu trò chơi
        </button>
      ) : (
        <div className="flex items-center justify-center gap-3 py-4 text-gray-500">
          <svg className="animate-spin h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="font-medium">Đang chờ chủ phòng bắt đầu...</span>
        </div>
      )}
    </div>
  );
}

function PlayingRoom({ state, onAnswer }: { state: GameState; onAnswer: (questionId: string, optionId: string) => Promise<void> }) {
  const [answering, setAnswering] = useState(false);
  const [localAnswer, setLocalAnswer] = useState<{ optionId: string; isCorrect: boolean | null } | null>(null);
  const [pointsAnim, setPointsAnim] = useState<number | null>(null);
  const q = state.currentQuestion;
  const myAnswer = state.myAnswer;
  const answered = !!myAnswer || !!localAnswer;
  const diff = DIFFICULTY_LABELS[state.difficulty] || DIFFICULTY_LABELS.MEDIUM;

  // Reset local answer on question change
  const qId = q?.id;
  useEffect(() => {
    setLocalAnswer(null);
    setPointsAnim(null);
  }, [qId]);

  const handleAnswer = async (optionId: string) => {
    if (answered || answering || !q) return;
    setAnswering(true);
    try {
      const res = await fetch(`/api/game/${state.roomId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, selectedOptionId: optionId }),
      });
      const data = await res.json();
      if (res.ok) {
        setLocalAnswer({ optionId, isCorrect: data.isCorrect });
        if (data.pointsEarned > 0) {
          setPointsAnim(data.pointsEarned);
          setTimeout(() => setPointsAnim(null), 2000);
        }
      } else {
        setLocalAnswer({ optionId, isCorrect: null });
      }
    } finally {
      setAnswering(false);
    }
  };

  const getOptionStyle = (opt: Option, idx: number) => {
    const colors = OPTION_COLORS[idx % 4];
    const selectedId = myAnswer?.selectedOptionId || localAnswer?.optionId;
    const isSelected = selectedId === opt.id;
    const showResult = answered || (myAnswer !== null);

    if (showResult) {
      if (opt.isCorrect === true) return `border-2 border-green-500 bg-green-50 text-green-800 shadow-md shadow-green-100`;
      if (isSelected && opt.isCorrect === false) return `border-2 border-red-400 bg-red-50 text-red-800`;
      return `border-2 border-gray-200 bg-gray-50 text-gray-400 opacity-60`;
    }
    if (isSelected) return `border-2 ${colors.bg} text-white shadow-md`;
    return `border-2 ${colors.light}`;
  };

  const sortedParticipants = [...state.participants].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Main Game Area */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-600">
                Câu <span className="text-purple-600">{state.currentQuestionIndex + 1}</span> / {state.totalQuestions}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${diff.color}`}>{diff.label}</span>
            </div>
            {/* Progress bar */}
            <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${((state.currentQuestionIndex + 1) / state.totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          {q ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold text-gray-900 flex-1 leading-relaxed">{q.content}</p>
                <div className="shrink-0">
                  <CountdownTimer secondsPerQuestion={state.secondsPerQuestion} questionStartedAt={state.questionStartedAt} />
                </div>
              </div>
            </div>
          ) : null}

          {/* Options Grid */}
          {q && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              {pointsAnim !== null && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                  <span className="bg-yellow-400 text-yellow-900 font-black text-xl px-4 py-1 rounded-full shadow-lg">
                    +{pointsAnim} ✨
                  </span>
                </div>
              )}
              {q.options.map((opt, idx) => {
                const colors = OPTION_COLORS[idx % 4];
                const showResult = answered;
                const isCorrectOpt = opt.isCorrect === true;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    disabled={answered || answering}
                    className={`flex items-center gap-4 p-4 rounded-2xl text-left font-medium transition-all duration-200 cursor-pointer disabled:cursor-default ${getOptionStyle(opt, idx)}`}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${showResult ? (isCorrectOpt ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600') : `${colors.label}`}`}>
                      {opt.optionKey}
                    </span>
                    <span className="text-sm leading-snug">{opt.content}</span>
                    {showResult && isCorrectOpt && <span className="ml-auto text-green-500 text-xl">✓</span>}
                    {showResult && (myAnswer?.selectedOptionId === opt.id || localAnswer?.optionId === opt.id) && !isCorrectOpt && (
                      <span className="ml-auto text-red-400 text-xl">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Answer feedback */}
          {answered && (
            <div className={`mt-4 p-4 rounded-2xl text-center font-bold text-lg ${myAnswer?.isCorrect || localAnswer?.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {myAnswer?.isCorrect || localAnswer?.isCorrect
                ? `🎉 Chính xác! +${myAnswer?.pointsEarned ?? 0} điểm`
                : '❌ Sai rồi! Đợi câu tiếp theo...'}
            </div>
          )}
        </div>

        {/* Sidebar Scoreboard */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 sticky top-20">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏆</span> Bảng điểm
            </h3>
            <div className="space-y-2">
              {sortedParticipants.map((p, i) => (
                <div key={p.studentId} className={`flex items-center gap-3 p-2.5 rounded-xl ${p.studentId === state.myStudentId ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
                  <span className={`w-6 h-6 flex items-center justify-center text-xs font-black rounded-lg ${i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {i + 1}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${p.isHost ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}`}>
                    {getInitials(p.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">{p.name.split(' ').pop()}</p>
                    <p className="text-xs text-purple-600 font-bold">{p.score.toLocaleString()}</p>
                  </div>
                  {p.answeredCurrent && <span className="text-green-500 text-xs">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scoreboard */}
      <div className="lg:hidden mt-6 bg-white rounded-3xl shadow-lg border border-gray-100 p-4">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm"><span>🏆</span> Bảng điểm</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sortedParticipants.map((p, i) => (
            <div key={p.studentId} className={`flex flex-col items-center gap-1 p-2 rounded-xl shrink-0 ${p.studentId === state.myStudentId ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
              <span className={`text-xs font-black ${i === 0 ? 'text-yellow-500' : 'text-gray-500'}`}>#{i + 1}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${p.isHost ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}`}>
                {getInitials(p.name)}
              </div>
              <p className="text-xs font-bold text-purple-600">{p.score}</p>
              {p.answeredCurrent && <span className="text-green-500 text-xs">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinishedRoom({ state, onPlayAgain }: { state: GameState; onPlayAgain: () => void; }) {
  const router = useRouter();
  const sorted = [...state.participants].sort((a, b) => b.score - a.score);
  const [first, second, third] = sorted;

  const podiumColors = ['from-yellow-400 to-orange-400', 'from-gray-300 to-gray-400', 'from-amber-600 to-amber-700'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-6xl mb-3">🏆</div>
        <h1 className="text-3xl font-black text-gray-900">Kết quả</h1>
        <p className="text-gray-500 mt-2">Trò chơi đã kết thúc!</p>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-8 h-44">
        {/* 2nd */}
        {second && (
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="text-3xl">🥈</div>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${podiumColors[1]} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
              {getInitials(second.name)}
            </div>
            <p className="text-sm font-bold text-gray-700 text-center truncate w-full">{second.name.split(' ').slice(-1)[0]}</p>
            <p className="text-sm font-black text-gray-600">{second.score.toLocaleString()}</p>
            <div className={`w-full h-20 bg-gradient-to-br ${podiumColors[1]} rounded-t-2xl flex items-center justify-center`}>
              <span className="text-white font-black text-xl">2</span>
            </div>
          </div>
        )}

        {/* 1st */}
        {first && (
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="text-4xl animate-bounce">🥇</div>
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${podiumColors[0]} flex items-center justify-center text-white font-black text-xl shadow-xl ring-4 ring-yellow-300`}>
              {getInitials(first.name)}
            </div>
            <p className="text-sm font-bold text-gray-700 text-center truncate w-full">{first.name.split(' ').slice(-1)[0]}</p>
            <p className="text-base font-black text-yellow-600">{first.score.toLocaleString()}</p>
            <div className={`w-full h-32 bg-gradient-to-br ${podiumColors[0]} rounded-t-2xl flex items-center justify-center shadow-xl`}>
              <span className="text-white font-black text-2xl">1</span>
            </div>
          </div>
        )}

        {/* 3rd */}
        {third && (
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="text-3xl">🥉</div>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${podiumColors[2]} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
              {getInitials(third.name)}
            </div>
            <p className="text-sm font-bold text-gray-700 text-center truncate w-full">{third.name.split(' ').slice(-1)[0]}</p>
            <p className="text-sm font-black text-gray-600">{third.score.toLocaleString()}</p>
            <div className={`w-full h-12 bg-gradient-to-br ${podiumColors[2]} rounded-t-2xl flex items-center justify-center`}>
              <span className="text-white font-black text-xl">3</span>
            </div>
          </div>
        )}
      </div>

      {/* Full list */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">Bảng xếp hạng đầy đủ</h2>
        <div className="space-y-2">
          {sorted.map((p, i) => (
            <div key={p.studentId} className={`flex items-center gap-4 p-3 rounded-2xl ${p.studentId === state.myStudentId ? 'bg-purple-50 border-2 border-purple-300' : 'bg-gray-50'}`}>
              <span className={`w-8 h-8 flex items-center justify-center font-black rounded-xl text-sm ${i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-200 text-gray-700' : i === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {i < 3 ? medals[i] : i + 1}
              </span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${p.isHost ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}`}>
                {getInitials(p.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{p.name}</p>
                {p.studentId === state.myStudentId && <p className="text-xs text-purple-600">Bạn</p>}
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-gray-800">{p.score.toLocaleString()}</p>
                <p className="text-xs text-gray-400">điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={onPlayAgain}
          className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 transition-all"
        >
          🔄 Chơi lại
        </button>
        <button
          onClick={() => router.push('/student/dashboard')}
          className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
        >
          🏠 Về trang chủ
        </button>
      </div>

      {/* Post-game chat */}
      <ChatBox roomId={state.roomId} messages={state.messages} myStudentId={state.myStudentId} />
    </div>
  );
}

export default function GameRoomPage({ params }: { params: { roomId: string } }) {
  const router = useRouter();
  const [state, setState] = useState<GameState | null>(null);
  const [error, setError] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`/api/game/${params.roomId}/state`);
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Lỗi tải trạng thái');
        return;
      }
      const data = await res.json();
      setState(data);
    } catch {
      setError('Lỗi kết nối');
    }
  }, [params.roomId]);

  useEffect(() => {
    fetchState();
    intervalRef.current = setInterval(fetchState, 1500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchState]);

  const handleStart = async () => {
    await fetch(`/api/game/${params.roomId}/start`, { method: 'POST' });
    await fetchState();
  };

  const handleAnswer = async (questionId: string, optionId: string) => {
    await fetch(`/api/game/${params.roomId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, selectedOptionId: optionId }),
    });
    await fetchState();
  };

  const handlePlayAgain = async () => {
    if (!state) return;
    try {
      const res = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: state.difficulty }),
      });
      const data = await res.json();
      if (res.ok) router.push(`/game/${data.roomId}`);
    } catch {}
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
          <button onClick={() => router.push('/game')} className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-600 font-medium">Đang tải phòng chơi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Header />
      {state.status === 'WAITING' && (
        <WaitingRoom state={state} onStart={handleStart} />
      )}
      {state.status === 'PLAYING' && (
        <PlayingRoom
          state={state}
          onAnswer={(qId, optId) => handleAnswer(qId, optId)}
        />
      )}
      {state.status === 'FINISHED' && (
        <FinishedRoom state={state} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}
