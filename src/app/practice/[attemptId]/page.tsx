'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Timer from '@/components/exam/Timer';
import QuestionCard from '@/components/exam/QuestionCard';
import QuestionNav from '@/components/exam/QuestionNav';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { ChevronLeft, ChevronRight, Flag, Send, BookOpen, ShieldAlert } from 'lucide-react';

interface AttemptData {
  id: string;
  practiceMode: string;
  durationMinutes: number;
  exam: {
    title: string;
    subject: { name: string };
    durationMinutes: number;
    maxScore: number;
    questions: Array<{
      questionOrder: number;
      question: {
        id: string;
        content: string;
        options: Array<{ id: string; optionKey: string; content: string }>;
      };
    }>;
  };
  answers: Array<{ questionId: string; selectedOptionId: string | null }>;
}

const DIFFICULTY_LABEL: Record<string, string> = { EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó' };
const MAX_VIOLATIONS = 3;

export default function PracticeExamPage({ params }: { params: { attemptId: string } }) {
  const router = useRouter();
  const { attemptId } = params;

  const [attempt, setAttempt] = useState<AttemptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [violations, setViolations] = useState(0);
  const [violationReason, setViolationReason] = useState('');
  const [showViolationOverlay, setShowViolationOverlay] = useState(false);
  const [autoSubmitting, setAutoSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const startTimeRef = useRef<Date>(new Date());
  const storageKey = `practice_${attemptId}`;
  const submittingRef = useRef(false);

  useEffect(() => { loadAttempt(); }, []);

  // Fullscreen lock: enter on mount, block all exit keys, force back instantly on exit
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(() => {}).then(() => setIsFullscreen(true));

    const onFsChange = () => {
      const inFs = !!document.fullscreenElement;
      setIsFullscreen(inFs);
      if (!inFs && !submittingRef.current) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (submittingRef.current) return;
      const blocked = ['Escape', 'F11', 'F5'];
      if (blocked.includes(e.key)) { e.preventDefault(); e.stopPropagation(); return; }
      if (e.ctrlKey && ['r', 'R', 'w', 'W', 'F4'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); return; }
      if (e.altKey && e.key === 'F4') { e.preventDefault(); e.stopPropagation(); }
    };

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('keydown', onKeyDown, true);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // Tab switch = violation
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden || submittingRef.current) return;
      setViolations((prev) => {
        const next = prev + 1;
        setViolationReason('Bạn đã chuyển sang tab / cửa sổ khác trong lúc làm bài.');
        setShowViolationOverlay(true);
        if (next >= MAX_VIOLATIONS) {
          setAutoSubmitting(true);
          setTimeout(() => doSubmit(), 3000);
        }
        return next;
      });
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Disable right-click
  useEffect(() => {
    const block = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', block);
    return () => document.removeEventListener('contextmenu', block);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(answers).length > 0) {
        localStorage.setItem(storageKey, JSON.stringify({ answers, currentIndex, flagged: Array.from(flagged) }));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [answers, currentIndex, flagged]);

  async function loadAttempt() {
    try {
      const res = await fetch(`/api/attempts/${attemptId}`);
      if (!res.ok) { toast.error('Không thể tải bài thi'); router.push('/practice'); return; }
      const data = await res.json();
      if (data.status === 'SUBMITTED') { router.push(`/attempts/${attemptId}/result`); return; }
      setAttempt(data);
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentIndex(parsed.currentIndex || 0);
        setFlagged(new Set(parsed.flagged || []));
      } else {
        const serverAnswers: Record<string, string> = {};
        for (const ans of data.answers || []) {
          if (ans.selectedOptionId) serverAnswers[ans.questionId] = ans.selectedOptionId;
        }
        setAnswers(serverAnswers);
      }
    } catch {
      toast.error('Không thể tải bài thi');
    }
    setLoading(false);
  }

  const saveAnswer = useCallback(async (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    await fetch(`/api/attempts/${attemptId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, selectedOptionId: optionId }),
    }).catch(() => {});
  }, [attemptId]);

  async function doSubmit() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    const timeSpent = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
    try {
      const res = await fetch(`/api/attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeSpentSeconds: timeSpent }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.removeItem(storageKey);
        if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
        toast.success('Đã nộp bài thành công!');
        if (data.newAchievements?.length > 0) {
          for (const ach of data.newAchievements) {
            setTimeout(() => {
              toast(`🏅 Thành tích mới: ${ach.icon} ${ach.name}`, { duration: 5000, style: { background: '#fef9c3', border: '1px solid #fbbf24', color: '#92400e', fontWeight: 'bold' } });
            }, 800);
          }
        }
        if (data.pointsEarned) {
          const { points, reason } = data.pointsEarned;
          const icons: Record<string, string> = { HARD_PERFECT: '⭐', HARD_GREAT: '🔥', HARD_GOOD: '👍', MEDIUM_GOOD: '✅', EASY_PERFECT: '🌟' };
          setTimeout(() => {
            toast(`${icons[reason] ?? '🌟'} +${points} điểm thưởng!`, { duration: 4000, style: { background: '#fff7ed', border: '1px solid #fb923c', color: '#9a3412', fontWeight: 'bold', fontSize: '1rem' } });
          }, 400);
        }
        router.push(`/attempts/${attemptId}/result`);
      } else {
        toast.error('Có lỗi khi nộp bài');
        submittingRef.current = false;
        setSubmitting(false);
      }
    } catch {
      toast.error('Có lỗi khi nộp bài');
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  if (loading || !attempt) return <PageLoader />;

  const questions = attempt.exam.questions.sort((a, b) => a.questionOrder - b.questionOrder);
  const currentQ = questions[currentIndex];
  const answeredSet = new Set(questions.map((q, i) => (answers[q.question.id] ? i : -1)).filter((i) => i >= 0));
  const answeredCount = answeredSet.size;
  const totalQ = questions.length;
  const blankCount = totalQ - answeredCount;

  return (
    <div className="exam-fullscreen" onContextMenu={(e) => e.preventDefault()}>
      {/* Fullscreen lock overlay — hiển thị khi bị thoát fullscreen */}
      {!isFullscreen && !submittingRef.current && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-5 select-none">
          <div className="text-6xl animate-pulse">🔒</div>
          <p className="text-white text-xl font-extrabold">Không được thoát toàn màn hình!</p>
          <p className="text-gray-400 text-sm">Đang khôi phục chế độ toàn màn hình...</p>
          <button
            onClick={() => document.documentElement.requestFullscreen().catch(() => {})}
            className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-2xl text-base transition-colors"
          >
            Nhấn để quay lại toàn màn hình
          </button>
        </div>
      )}
      {/* Top bar */}
      <div className="shrink-0 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 max-w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Luyện tập</div>
              <div className="text-sm font-bold text-gray-900">
                Chế độ {DIFFICULTY_LABEL[attempt.practiceMode] || attempt.practiceMode}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-xs text-gray-500">
              <span className="text-blue-600 font-bold">{answeredCount}</span>/{totalQ} câu
            </div>
            <Timer
              durationSeconds={attempt.exam.durationMinutes * 60}
              onExpire={() => { toast('Hết giờ! Đang tự động nộp bài...', { icon: '⏰' }); doSubmit(); }}
            />
          </div>
        </div>

        {/* Rules notice bar */}
        <div className="bg-amber-50 border-t border-amber-200 px-4 py-1.5 flex items-center gap-2 text-xs text-amber-800 font-medium">
          <ShieldAlert size={13} className="shrink-0 text-amber-600" />
          <span>
            Quy định: <strong>Không được thoát toàn màn hình</strong> · <strong>Không chuyển tab/cửa sổ</strong> · <strong>Không chuột phải</strong>. Vi phạm {MAX_VIOLATIONS} lần → bài tự động nộp.
          </span>
          {violations > 0 && (
            <span className="ml-auto shrink-0 font-bold text-red-600">Vi phạm: {violations}/{MAX_VIOLATIONS}</span>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="exam-content flex">
        <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
          <div className="mb-4 text-sm text-gray-500">Câu {currentIndex + 1} / {totalQ}</div>

          {currentQ && (
            <QuestionCard
              questionNumber={currentIndex + 1}
              content={currentQ.question.content}
              options={currentQ.question.options}
              selectedOptionId={answers[currentQ.question.id]}
              onSelect={(optId) => saveAnswer(currentQ.question.id, optId)}
            />
          )}

          <div className="flex items-center justify-between mt-6">
            <Button variant="secondary" onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0}>
              <ChevronLeft size={18} /> Câu trước
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={'outline'}
                onClick={() => setFlagged((prev) => { const n = new Set(prev); n.has(currentIndex) ? n.delete(currentIndex) : n.add(currentIndex); return n; })}
                className={flagged.has(currentIndex) ? 'bg-orange-100 border-orange-400 text-orange-700' : ''}
              >
                <Flag size={16} /> {flagged.has(currentIndex) ? 'Bỏ đánh dấu' : 'Đánh dấu'}
              </Button>
              <Button variant="danger" onClick={() => setShowSubmitModal(true)}>
                <Send size={16} /> Nộp bài
              </Button>
            </div>
            <Button variant="secondary" onClick={() => setCurrentIndex((i) => Math.min(totalQ - 1, i + 1))} disabled={currentIndex === totalQ - 1}>
              Câu sau <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="hidden lg:block w-60 shrink-0 border-l border-gray-100 bg-white">
          <QuestionNav total={totalQ} current={currentIndex} answered={answeredSet} flagged={flagged} onSelect={setCurrentIndex} />
        </div>
      </div>

      {/* Violation overlay */}
      {showViolationOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="text-5xl mb-3">{autoSubmitting ? '🚫' : '⚠️'}</div>
            <h2 className="text-xl font-extrabold text-red-600 mb-2">
              {autoSubmitting ? 'Đang tự động nộp bài!' : 'Cảnh báo vi phạm!'}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{violationReason}</p>
            <div className="flex items-center justify-center gap-2 mb-5">
              {Array.from({ length: MAX_VIOLATIONS }).map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i < violations ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
            {autoSubmitting ? (
              <p className="text-red-600 font-semibold text-sm animate-pulse">Bài thi sẽ được nộp sau 3 giây...</p>
            ) : (
              <button
                onClick={() => setShowViolationOverlay(false)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Tôi hiểu, tiếp tục làm bài
              </button>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="Xác nhận nộp bài">
        <div className="p-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
              <div className="text-xs text-gray-600">Đã trả lời</div>
            </div>
            <div className="text-center bg-gray-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-gray-600">{blankCount}</div>
              <div className="text-xs text-gray-600">Bỏ trống</div>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-orange-600">{flagged.size}</div>
              <div className="text-xs text-gray-600">Đánh dấu</div>
            </div>
          </div>
          {blankCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-yellow-800">
              ⚠️ Bạn còn <strong>{blankCount} câu chưa trả lời</strong>. Bạn có chắc muốn nộp?
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowSubmitModal(false)}>Làm tiếp</Button>
            <Button variant="danger" className="flex-1" onClick={doSubmit} loading={submitting}>Nộp bài</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
