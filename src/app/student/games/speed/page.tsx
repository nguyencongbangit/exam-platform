'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';

const TIME_PER_Q = 15;

type Option = { id: string; key: string; content: string; isCorrect: boolean };
type Question = { id: string; content: string; options: Option[]; explanation: string | null; subject: string };

function SpeedGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || '';
  const gradeId = searchParams.get('gradeId') || '';

  const [phase, setPhase] = useState<'loading' | 'playing' | 'result'>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; chosen: string | null }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ count: '10' });
    if (subjectId) params.set('subjectId', subjectId);
    if (gradeId) params.set('gradeId', gradeId);
    fetch(`/api/student/games/questions?${params}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions || []); setPhase('playing'); });
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || chosen !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { handleAnswer(null); return TIME_PER_Q; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, index, chosen]);

  function handleAnswer(optionId: string | null) {
    if (chosen !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setChosen(optionId);
    const q = questions[index];
    const correct = q.options.find((o) => o.isCorrect)?.id === optionId;
    if (correct) setScore((s) => s + 1);
    setResults((r) => [...r, { correct, chosen: optionId }]);
    setTimeout(() => {
      if (index + 1 >= questions.length) { setPhase('result'); return; }
      setIndex((i) => i + 1);
      setChosen(null);
      setTimeLeft(TIME_PER_Q);
    }, 1200);
  }

  if (phase === 'loading') return <PageLoader />;

  if (questions.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-5xl">😅</p>
        <p className="text-gray-600">Không có câu hỏi nào phù hợp. Hãy thử chọn bộ lọc khác!</p>
        <Button onClick={() => router.push('/student/games')}>← Quay lại</Button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : '💪';
    return (
      <div className="max-w-lg mx-auto space-y-6 text-center py-8">
        <p className="text-6xl">{emoji}</p>
        <h2 className="text-2xl font-extrabold text-gray-900">Kết quả Tốc Chiến</h2>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <p className="text-5xl font-black text-orange-500">{score}/{questions.length}</p>
          <p className="text-gray-500 mt-1">Chính xác {pct}%</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {results.map((r, i) => (
            <div key={i} className={`rounded-lg px-3 py-2 text-left ${r.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {r.correct ? '✅' : '❌'} Câu {i + 1}: {r.correct ? 'Đúng' : r.chosen ? 'Sai' : 'Hết giờ'}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setPhase('loading'); setIndex(0); setScore(0); setResults([]); setChosen(null); setTimeLeft(TIME_PER_Q);
            const params = new URLSearchParams({ count: '10' });
            if (subjectId) params.set('subjectId', subjectId);
            if (gradeId) params.set('gradeId', gradeId);
            fetch(`/api/student/games/questions?${params}`).then((r) => r.json()).then((d) => { setQuestions(d.questions || []); setPhase('playing'); });
          }}>🔁 Chơi lại</Button>
          <Button variant="ghost" onClick={() => router.push('/student/games')}>← Chọn game khác</Button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const correctId = q.options.find((o) => o.isCorrect)?.id;
  const timerPct = (timeLeft / TIME_PER_Q) * 100;
  const timerColor = timeLeft > 8 ? 'bg-green-400' : timeLeft > 4 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Câu {index + 1}/{questions.length}</span>
        <span className="font-bold text-orange-500 text-lg">⚡ Tốc Chiến</span>
        <span className="text-sm font-semibold text-gray-700">Điểm: {score}</span>
      </div>

      {/* Timer bar */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
          style={{ width: `${timerPct}%` }}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">{timeLeft}s</span>
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-xs text-gray-400 mb-2">{q.subject}</p>
        <p className="text-base font-semibold text-gray-900 leading-relaxed">{q.content}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt) => {
          let cls = 'w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ';
          if (chosen === null) {
            cls += 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
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
    </div>
  );
}

export default function SpeedPage() {
  return <Suspense fallback={<PageLoader />}><SpeedGame /></Suspense>;
}
