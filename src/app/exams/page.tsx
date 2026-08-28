'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Clock, Users, Filter, BookOpen, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor, getExamTypeLabel } from '@/lib/utils';
import { SUBJECTS as ALL_SUBJECTS, GRADES as ALL_GRADES, DIFFICULTIES as ALL_DIFFICULTIES, SUBJECT_ICON } from '@/lib/constants';

const SUBJECTS = [{ id: '', label: 'Tất cả môn' }, ...ALL_SUBJECTS.map((s) => ({ id: s.id, label: s.name }))];
const GRADES = [{ id: '', label: 'Tất cả lớp' }, ...ALL_GRADES.map((g) => ({ id: g.id, label: g.name }))];
const DIFFICULTIES = [{ id: '', label: 'Tất cả mức' }, ...ALL_DIFFICULTIES.map((d) => ({ id: d.id, label: `${d.emoji} ${d.label}` }))];

const EXAM_TYPES = [
  { id: '', label: 'Tất cả loại' },
  { id: 'PRACTICE', label: 'Luyện tập' },
  { id: 'MOCK_EXAM', label: 'Thi thử' },
  { id: 'OFFICIAL', label: 'Chính thức' },
];

interface Topic {
  id: string;
  name: string;
  questionCount: number;
}

function ExamsContent() {
  const searchParams = useSearchParams();
  const [exams, setExams] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [studentGrade, setStudentGrade] = useState<{ id: string; name: string } | null | undefined>(undefined);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [filters, setFilters] = useState({
    subjectId: searchParams.get('subjectId') || '',
    gradeId: searchParams.get('gradeId') || '',
    difficulty: '',
    examType: '',
    topicId: '',
  });

  useEffect(() => {
    fetch('/api/me')
      .then((r) => r.json())
      .then((me) => {
        const grade = me.student?.grade ?? null;
        setStudentGrade(grade);
        if (grade) setFilters((f) => ({ ...f, gradeId: grade.id }));
      })
      .catch(() => setStudentGrade(null));
  }, []);

  // Load topics khi thay đổi môn hoặc lớp
  useEffect(() => {
    if (!filters.subjectId) {
      setTopics([]);
      setFilters((f) => ({ ...f, topicId: '' }));
      return;
    }
    setTopicsLoading(true);
    setFilters((f) => ({ ...f, topicId: '' }));
    const params = new URLSearchParams({ subjectId: filters.subjectId });
    if (filters.gradeId) params.set('gradeId', filters.gradeId);
    fetch(`/api/practice/topics?${params}`)
      .then((r) => r.json())
      .then((data) => setTopics(Array.isArray(data) ? data : []))
      .catch(() => setTopics([]))
      .finally(() => setTopicsLoading(false));
  }, [filters.subjectId, filters.gradeId]);

  useEffect(() => {
    if (studentGrade !== undefined) fetchExams();
  }, [filters, page, studentGrade]);

  async function fetchExams() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '12' });
    if (filters.subjectId) params.set('subjectId', filters.subjectId);
    if (filters.gradeId) params.set('gradeId', filters.gradeId);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.examType) params.set('examType', filters.examType);
    if (filters.topicId) params.set('topicId', filters.topicId);

    try {
      const res = await fetch(`/api/exams?${params}`);
      const data = await res.json();
      setExams(data.exams || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  function setFilter(key: string, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  }

  const subjectIcons = SUBJECT_ICON;

  const visibleTopics = showAllTopics ? topics : topics.slice(0, 6);
  const activeFiltersCount = [filters.topicId, filters.difficulty, filters.examType].filter(Boolean).length;

  return (
    <div className="flex gap-8">
      {/* Sidebar filters */}
      <aside className="w-60 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Filter size={16} />
              Bộ lọc
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={() => setFilters((f) => ({ ...f, topicId: '', difficulty: '', examType: '' }))}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Xoá lọc ({activeFiltersCount})
              </button>
            )}
          </div>

          {studentGrade && (
            <div className="mb-4 px-3 py-2 bg-blue-50 rounded-xl text-sm text-blue-700 font-semibold">
              🎓 {studentGrade.name}
            </div>
          )}

          <div className="space-y-5">
            {/* Môn học */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Môn học</p>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                {SUBJECTS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFilter('subjectId', opt.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      filters.subjectId === opt.id
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {opt.id ? `${subjectIcons[opt.id] || '📝'} ${opt.label}` : opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chủ đề - chỉ hiện khi chọn môn */}
            {filters.subjectId && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen size={12} className="text-gray-400" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Chủ đề</p>
                </div>
                {topicsLoading ? (
                  <div className="text-xs text-gray-400 py-2 text-center">Đang tải...</div>
                ) : topics.length === 0 ? (
                  <div className="text-xs text-gray-400 py-2 text-center">Không có chủ đề</div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <button
                        onClick={() => setFilter('topicId', '')}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          filters.topicId === ''
                            ? 'bg-indigo-100 text-indigo-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Tất cả chủ đề
                      </button>
                      {visibleTopics.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setFilter('topicId', t.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between gap-1 ${
                            filters.topicId === t.id
                              ? 'bg-indigo-100 text-indigo-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span className="truncate">{t.name}</span>
                          <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded-full ${
                            filters.topicId === t.id ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-100 text-gray-500'
                          }`}>{t.questionCount}</span>
                        </button>
                      ))}
                    </div>
                    {topics.length > 6 && (
                      <button
                        onClick={() => setShowAllTopics(!showAllTopics)}
                        className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium py-1"
                      >
                        {showAllTopics ? (
                          <><ChevronUp size={14} />Thu gọn</>
                        ) : (
                          <><ChevronDown size={14} />Xem thêm ({topics.length - 6})</>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Lớp (nếu không phải học sinh) */}
            {!studentGrade && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lớp</p>
                <div className="space-y-1">
                  {GRADES.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFilter('gradeId', opt.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        filters.gradeId === opt.id
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Độ khó */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BarChart2 size={12} className="text-gray-400" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Độ khó</p>
              </div>
              <div className="space-y-1">
                {DIFFICULTIES.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFilter('difficulty', opt.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      filters.difficulty === opt.id
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loại đề */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Loại đề</p>
              <div className="space-y-1">
                {EXAM_TYPES.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFilter('examType', opt.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      filters.examType === opt.id
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Exams grid */}
      <div className="flex-1">
        {/* Active filter chips */}
        {(filters.topicId || filters.difficulty || filters.examType) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.topicId && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                <BookOpen size={13} />
                {topics.find(t => t.id === filters.topicId)?.name || 'Chủ đề'}
                <button onClick={() => setFilter('topicId', '')} className="ml-1 hover:text-indigo-900">×</button>
              </span>
            )}
            {filters.difficulty && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <BarChart2 size={13} />
                {DIFFICULTIES.find(d => d.id === filters.difficulty)?.label}
                <button onClick={() => setFilter('difficulty', '')} className="ml-1 hover:text-blue-900">×</button>
              </span>
            )}
            {filters.examType && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {EXAM_TYPES.find(e => e.id === filters.examType)?.label}
                <button onClick={() => setFilter('examType', '')} className="ml-1 hover:text-gray-900">×</button>
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-600 text-sm">
            Tìm thấy <strong>{total}</strong> đề thi
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Đang tải đề thi..." />
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📝</div>
            <p className="font-semibold">Không tìm thấy đề thi phù hợp</p>
            <p className="text-sm mt-1">Thử thay đổi bộ lọc để xem thêm đề</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {exams.map((exam) => (
                <Link key={exam.id} href={`/exams/${exam.id}`}>
                  <Card hover className="h-full flex flex-col">
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{subjectIcons[exam.subjectId] || '📝'}</span>
                        <Badge variant={exam.examType === 'OFFICIAL' ? 'danger' : exam.examType === 'MOCK_EXAM' ? 'warning' : 'primary'}>
                          {getExamTypeLabel(exam.examType)}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">{exam.title}</h3>
                      {exam.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{exam.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>{exam.subject?.name}</span>
                        {exam.grade && <><span>•</span><span>{exam.grade.name}</span></>}
                      </div>
                      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {exam.durationMinutes} phút
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                          {getDifficultyLabel(exam.difficulty)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          {exam._count?.attempts || 0}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination page={page} totalPages={Math.ceil(total / 12)} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Đề thi</h1>
          <p className="text-gray-600">Luyện tập với hàng trăm đề thi từ các môn học</p>
        </div>
        <Suspense fallback={<LoadingSpinner size="lg" text="Đang tải..." className="py-20" />}>
          <ExamsContent />
        </Suspense>
      </div>
    </div>
  );
}
