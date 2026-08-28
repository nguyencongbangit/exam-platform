'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';

type Option = { id: string; key: string; content: string; isCorrect: boolean };
type Question = { id: string; content: string; options: Option[]; explanation: string | null; subject: string; difficulty: string };

const DIFF_LABEL: Record<string, string> = { EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó', VERY_HARD: 'Rất khó' };
const DIFF_COLOR: Record<string, string> = { EASY: 'text-green-600 bg-green-50', MEDIUM: 'text-yellow-600 bg-yellow-50', HARD: 'text-orange-600 bg-orange-50', VERY_HARD: 'text-red-600 bg-red-50' };

function FlashcardGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId') || '';
  const gradeId = searchParams.get('gradeId') || '';

  const [phase, setPhase] = useState<'loading' | 'playing' | 'result'>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<boolean[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);

  function loadQuestions() {
    const params = new URLSearchParams({ count: '10' });
    if (subjectId) params.set('subjectId', subjectId);
    if (gradeId) params.set('gradeId', gradeId);
    fetch(`/api/student/games/questions?${params}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions || []); setPhase('playing'); });
  }

  useEffect(() => { loadQuestions(); }, []);

  function handleKnown(val: boolean) {
    const next = [...known, val];
    setKnown(next);
    if (index + 1 >= questions.length) {
      setPhase('result');
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
      setChosen(null);
    }
  }

  function handleFlip() {
    setFlipped(true);
  }

  function handleAnswer(optionId: string) {
    if (chosen !== null) return;
    setChosen(optionId);
  }

  function restart() {
    setPhase('loading');
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setChosen(null);
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
    const knownCount = known.filter(Boolean).length;
    const pct = Math.round((knownCount / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : '💪';
    return (
      <div className="max-w-lg mx-auto space-y-6 text-center py-8">
        <p className="text-6xl">{emoji}</p>
        <h2 className="text-2xl font-extrabold text-gray-900">Kết quả Lật Bài</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-5xl font-black text-blue-500">{knownCount}/{questions.length}</p>
          <p className="text-gray-500 mt-1">Đã thuộc {pct}%</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {known.map((k, i) => (
            <div key={i} className={`rounded-lg px-3 py-2 text-left ${k ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {k ? '✅' : '❌'} Thẻ {i + 1}: {k ? 'Đã thuộc' : 'Cần ôn thêm'}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={restart}>🔁 Ôn lại</Button>
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
        <span className="text-sm text-gray-500">Thẻ {index + 1}/{questions.length}</span>
        <span className="font-bold text-blue-500 text-lg">🃏 Lật Bài</span>
        <span className="text-sm font-semibold text-gray-700">{known.filter(Boolean).length} đã thuộc</span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="relative">
        {/* Front — Question */}
        <div className={`bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-md transition-all ${flipped ? 'hidden' : 'block'}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFF_COLOR[q.difficulty] || ''}`}>
              {DIFF_LABEL[q.difficulty] || q.difficulty}
            </span>
            <span className="text-xs text-gray-400">{q.subject}</span>
          </div>
          <p className="text-base font-semibold text-gray-900 leading-relaxed mb-8">{q.content}</p>
          <button
            onClick={handleFlip}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
          >
            Lật bài xem đáp án ↓
          </button>
        </div>

        {/* Back — Answer */}
        {flipped && (
          <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFF_COLOR[q.difficulty] || ''}`}>
                {DIFF_LABEL[q.difficulty] || q.difficulty}
              </span>
              <span className="text-xs text-gray-400">{q.subject}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{q.content}</p>

            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt) => {
                let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ';
                if (chosen === null) {
                  cls += 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
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

            {chosen !== null && q.explanation && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
                💡 {q.explanation}
              </div>
            )}

            {chosen !== null && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleKnown(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition-colors"
                >
                  😕 Cần ôn thêm
                </button>
                <button
                  onClick={() => handleKnown(true)}
                  className="flex-1 py-3 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-colors"
                >
                  😊 Đã thuộc!
                </button>
              </div>
            )}

            {chosen === null && (
              <p className="text-center text-sm text-gray-400">Chọn đáp án để đánh giá mức độ nắm bài</p>
            )}
          </div>
        )}
      </div>

      {/* Skip */}
      {!flipped && (
        <div className="text-center">
          <button
            onClick={() => handleKnown(false)}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Bỏ qua thẻ này →
          </button>
        </div>
      )}
    </div>
  );
}

export default function FlashcardPage() {
  return <Suspense fallback={<PageLoader />}><FlashcardGame /></Suspense>;
}
