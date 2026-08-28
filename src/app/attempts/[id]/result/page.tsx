'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { CheckCircle, XCircle, MinusCircle, Clock, RotateCcw, Eye, ChevronDown, ChevronUp, Home } from 'lucide-react';
import { formatTime, formatScore, getScoreColor, getScoreGrade } from '@/lib/utils';
import { useEffect as useLayoutEffect, useRef } from 'react';
import katex from 'katex';

function LatexText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    let html = text
      .replace(/\$\$(.+?)\$\$/g, (_, m) => { try { return katex.renderToString(m, { displayMode: true, throwOnError: false }); } catch { return m; } })
      .replace(/\$(.+?)\$/g, (_, m) => { try { return katex.renderToString(m, { displayMode: false, throwOnError: false }); } catch { return m; } });
    ref.current.innerHTML = html;
  }, [text]);
  return <span ref={ref} />;
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQ, setExpandedQ] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`/api/attempts/${params.id}/result`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
        // Auto-expand all wrong answers
        const wrongIds = new Set<string>(
          (d.attempt?.answers || [])
            .filter((a: any) => a.isCorrect === false)
            .map((a: any) => a.questionId)
        );
        setExpandedQ(wrongIds);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <PageLoader />;
  if (!data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Không tìm thấy kết quả</p>
    </div>
  );

  const { attempt, examQuestions } = data;
  const score = attempt.score || 0;
  const scoreColor = getScoreColor(score);
  const grade = getScoreGrade(score);

  // Build ordered question list
  const answerMap: Record<string, any> = {};
  for (const ans of attempt.answers || []) {
    answerMap[ans.questionId] = ans;
  }

  const orderedAnswers = (examQuestions || []).map((eq: any) => {
    const ans = answerMap[eq.questionId];
    return ans || { questionId: eq.questionId, isCorrect: null, selectedOptionId: null };
  });

  function toggleExpand(qId: string) {
    setExpandedQ((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  }

  const displayAnswers = showAll ? orderedAnswers : orderedAnswers.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Score card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
          <div className="text-6xl mb-2">
            {score >= 8 ? '🏆' : score >= 6.5 ? '👍' : score >= 5 ? '📚' : '💪'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{attempt.exam.title}</h1>
          <p className="text-gray-500 mb-6">{attempt.exam.subject.name} • {attempt.exam.grade?.name}</p>

          <div className={`text-7xl font-extrabold ${scoreColor} mb-2`}>{formatScore(score)}</div>
          <div className="text-xl text-gray-500 mb-1">/ {attempt.exam.maxScore}</div>
          <div className={`text-lg font-bold ${scoreColor}`}>{grade}</div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-green-50 rounded-2xl p-4">
              <CheckCircle size={24} className="text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-700">{attempt.correctCount}</div>
              <div className="text-xs text-gray-600">Đúng</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4">
              <XCircle size={24} className="text-red-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-700">{attempt.wrongCount}</div>
              <div className="text-xs text-gray-600">Sai</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <MinusCircle size={24} className="text-gray-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-600">{attempt.blankCount}</div>
              <div className="text-xs text-gray-600">Bỏ trống</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <Clock size={24} className="text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-700">{formatTime(attempt.timeSpentSeconds)}</div>
              <div className="text-xs text-gray-600">Thời gian</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link href="/">
            <Button variant="secondary">
              <Home size={16} />
              Trang chủ
            </Button>
          </Link>
          <Link href={data.isPractice ? '/practice' : `/exams/${attempt.examId}`}>
            <Button variant="outline">
              <RotateCcw size={16} />
              {data.isPractice ? 'Luyện tiếp' : 'Làm lại'}
            </Button>
          </Link>
          <Link href="/student/wrong-questions">
            <Button variant="primary">
              <Eye size={16} />
              Luyện câu sai
            </Button>
          </Link>
        </div>

        {/* Answer review */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Chi tiết đáp án</h2>

          <div className="space-y-3">
            {displayAnswers.map((ans: any, i: number) => {
              if (!ans.question) return null;
              const isExpanded = expandedQ.has(ans.questionId);
              const correct = ans.isCorrect === true;
              const wrong = ans.isCorrect === false;

              return (
                <div
                  key={ans.questionId}
                  className={`rounded-2xl border-2 overflow-hidden transition-all ${correct ? 'border-green-200' : wrong ? 'border-red-200' : 'border-gray-200'}`}
                >
                  <button
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50"
                    onClick={() => toggleExpand(ans.questionId)}
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${correct ? 'bg-green-500 text-white' : wrong ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 text-left text-sm font-medium text-gray-700 line-clamp-1 pr-4">
                      <LatexText text={ans.question?.content?.slice(0, 80) || ''} />
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      {correct && <CheckCircle size={18} className="text-green-500" />}
                      {wrong && <XCircle size={18} className="text-red-500" />}
                      {!correct && !wrong && <MinusCircle size={18} className="text-gray-400" />}
                      {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>
                  </button>

                  {isExpanded && ans.question && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <p className="text-sm font-semibold text-gray-700 mt-3 mb-2">
                        <LatexText text={ans.question.content} />
                      </p>
                      <div className="space-y-2">
                        {ans.question.options?.map((opt: any) => {
                          const isSelected = ans.selectedOptionId === opt.id;
                          const isCorrectOpt = opt.isCorrect;
                          return (
                            <div
                              key={opt.id}
                              className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                                isCorrectOpt ? 'bg-green-50 border border-green-200' :
                                isSelected && !isCorrectOpt ? 'bg-red-50 border border-red-200' :
                                'bg-gray-50'
                              }`}
                            >
                              <span className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${isCorrectOpt ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {opt.optionKey}
                              </span>
                              <span className="text-gray-700 flex-1"><LatexText text={opt.content} /></span>
                              {isCorrectOpt && <span className="text-green-600 text-xs font-bold shrink-0">✓ Đúng</span>}
                              {isSelected && !isCorrectOpt && <span className="text-red-500 text-xs font-bold shrink-0">✗ Bạn chọn</span>}
                            </div>
                          );
                        })}
                      </div>
                      {ans.question.explanation ? (
                        <div className={`mt-3 p-4 rounded-xl text-sm border ${wrong ? 'bg-red-50 border-red-200 text-red-900' : 'bg-green-50 border-green-200 text-green-900'}`}>
                          <div className="flex items-center gap-2 font-bold mb-2 text-base">
                            {wrong ? '❓ Tại sao bạn sai?' : '💡 Giải thích'}
                          </div>
                          {wrong && ans.selectedOptionId && (() => {
                            const selected = ans.question.options?.find((o: any) => o.id === ans.selectedOptionId);
                            const correct = ans.question.options?.find((o: any) => o.isCorrect);
                            return selected && correct ? (
                              <div className="mb-2 text-xs space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">{selected.optionKey}</span>
                                  <span className="text-red-700">Bạn chọn: <strong>{selected.content}</strong> — sai</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="bg-green-500 text-white px-1.5 py-0.5 rounded font-bold">{correct.optionKey}</span>
                                  <span className="text-green-700">Đáp án đúng: <strong>{correct.content}</strong></span>
                                </div>
                              </div>
                            ) : null;
                          })()}
                          <div className={`leading-relaxed ${wrong ? 'text-red-800' : 'text-green-800'}`}>
                            <LatexText text={ans.question.explanation} />
                          </div>
                        </div>
                      ) : wrong ? (
                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                          ❌ Bạn đã chọn sai — hãy xem lại đáp án đúng được tô xanh ở trên.
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {orderedAnswers.length > 10 && (
            <div className="text-center mt-4">
              <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Thu gọn' : `Xem thêm ${orderedAnswers.length - 10} câu`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
