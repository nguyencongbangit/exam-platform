'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';

const MAX_LIVES = 3;

type Option = { id: string; key: string; content: string; isCorrect: boolean };
type Question = { id: string; content: string; options: Option[]; explanation: string | null; subject: string; difficulty: string };

const DIFF_LABEL: Record<string, string> = { EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó', VERY_HARD: 'Rất khó' };
const DIFF_COLOR: Record<string, string> = { EASY: 'text-green-600 bg-green-50', MEDIUM: 'text-yellow-600 bg-yellow-50', HARD: 'text-orange-600 bg-orange-50', VERY_HARD: 'text-red-600 bg-red-50' };

function SurvivalGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || '';
  const gradeId = searchParams.get('gradeId') || '';

  const [phase, setPhase] = useState<'loading' | 'playing' | 'result'>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [gameover, setGameover] = useState(false);

  function loadQuestions() {
    const params = new URLSearchParams({ count: '10' });
    if (subjectId) params.set('subjectId', subjectId);
    if (gradeId) params.set('gradeId', gradeId);
    fetch(`/api/student/games/questions?${params}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions || []); setPhase('playing'); });
  }

  useEffect(() => { loadQuestions(); }, []);

  function handleAnswer(optionId: string) {
    if (chosen !== null) return;
    setChosen(optionId);
    const q = questions[index];
    const correct = q.options.find((o) => o.isCorrect)?.id === optionId;
    if (correct) {
      setScore((s) => s + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameover(true);
        setTimeout(() => setPhase('result'), 1500);
        return;
      }
    }
    setTimeout(() => {
      if (index + 1 >= questions.length) { setPhase('result'); return; }
      setIndex((i) => i + 1);
      setChosen(null);
    }, 1200);
  }

  function restart() {
    setPhase('loading'); setIndex(0); setLives(MAX_LIVES); setScore(0); setChosen(null); setGameover(false);
    loadQuestions();
  }

  if (phase === 'loading') return <PageLoader />;

  if (questions.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-5xl">😅</p>
        <p className="text-gray-600">Không có câu hỏi nào phù hợp!</p>
        <Button onClick={() => router.push('/student/games')}>← Quay lại</Button>
      </div>
    );
  }

  if (phase === 'result') {
    const win = !gameover;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto space-y-6 text-center py-8">
        <p className="text-6xl">{win ? '🏆' : '💀'}</p>
        <h2 className="text-2xl font-extrabold text-gray-900">{win ? 'Vượt ải thành công!' : 'Thất thủ rồi!'}</h2>
        <div className={`${win ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-2xl p-6`}>
          <p className={`text-5xl font-black ${win ? 'text-green-500' : 'text-red-500'}`}>{score}/{questions.length}</p>
          <p className="text-gray-500 mt-1">Chính xác {pct}% · {win ? `Còn ${lives} ❤️` : 'Hết mạng'}</p>
          {!win && <p className="text-sm text-red-600 mt-2">Bạn bị loại ở câu {index + 1}</p>}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={restart}>🔁 Chơi lại</Button>
          <Button variant="ghost" onClick={() => router.push('/student/games')}>← Chọn game khác</Button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const correctId = q.options.find((o) => o.isCorrect)?.id;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xl">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
          ))}
        </div>
        <span className="font-bold text-rose-500 text-lg">❤️ Vượt Ải</span>
        <span className="text-sm font-semibold text-gray-700">Câu {index + 1}/{questions.length}</span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-rose-400 rounded-full transition-all" style={{ width: `${((index) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFF_COLOR[q.difficulty] || ''}`}>
            {DIFF_LABEL[q.difficulty] || q.difficulty}
          </span>
          <span className="text-xs text-gray-400">{q.subject}</span>
        </div>
        <p className="text-base font-semibold text-gray-900 leading-relaxed">{q.content}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt) => {
          let cls = 'w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ';
          if (chosen === null) {
            cls += 'border-gray-200 bg-white hover:border-rose-400 hover:bg-rose-50 cursor-pointer';
          } else if (opt.id === correctId) {
            cls += 'border-green-500 bg-green-50 text-green-800';
          } else if (opt.id === chosen) {
            cls += 'border-red-400 bg-red-50 text-red-800';
          } else {
            cls += 'border-gray-100 bg-gray-50 text-gray-400';
          }
          return (
            <button key={opt.id} className={cls} onClick={() => handleAnswer(opt.id)} disabled={chosen !== null}>
              <span className="font-bold mr-2">{opt.key}.</span> {opt.content}
              {chosen !== null && opt.id === correctId && <span className="ml-2">✅</span>}
              {chosen !== null && opt.id === chosen && opt.id !== correctId && <span className="ml-2">❌</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {chosen !== null && q.explanation && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
          💡 {q.explanation}
        </div>
      )}

      {/* Game over overlay */}
      {gameover && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center space-y-3">
            <p className="text-5xl">💀</p>
            <p className="text-xl font-bold text-red-600">Hết mạng!</p>
            <p className="text-gray-500 text-sm">Đang hiển thị kết quả...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SurvivalPage() {
  return <Suspense fallback={<PageLoader />}><SurvivalGame /></Suspense>;
}
