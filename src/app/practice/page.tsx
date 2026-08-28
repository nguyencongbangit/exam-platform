'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { BookOpen, Clock, HelpCircle, Zap, Flame, GraduationCap, AlertCircle, Target, School, CalendarDays, BookMarked, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface ClassInfo {
  progress: { label: string; percent: number; semester: number; weekNum: number; totalWeeks: number; isSummer: boolean; schoolYear: string };
  totalTopics: number;
  coveredTopics: number;
  currentTopics: { id: string; name: string; subject: string }[];
  availableQuestions: number;
  gradeName: string | null;
}

interface Topic {
  id: string;
  name: string;
  questionCount: number;
}

const SUBJECT_ICONS: Record<string, string> = {
  TOAN: '📐', VAN: '📚', ANH: '🌍', LY: '⚡', HOA: '🧪', SINH: '🌿',
  SU: '🏛️', DIA: '🗺️', GDCD: '⚖️', TIN: '💻',
};

const SMART_MODES = [
  {
    key: 'WEAK',
    label: 'Luyện điểm yếu',
    icon: Target,
    color: 'bg-orange-50 border-orange-300 hover:border-orange-500',
    iconBg: 'bg-orange-100 text-orange-600',
    badge: 'bg-orange-100 text-orange-700',
    count: 20,
    duration: 25,
    desc: 'Tự động chọn những câu bạn hay làm sai để luyện tập có trọng tâm',
    apiPath: '/api/practice/start-weak',
    tip: 'AI phân tích lịch sử → ưu tiên chủ đề yếu nhất',
  },
  {
    key: 'CLASS_PROGRESS',
    label: 'Theo tiến độ lớp',
    icon: School,
    color: 'bg-purple-50 border-purple-300 hover:border-purple-500',
    iconBg: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    count: 20,
    duration: 20,
    desc: 'Luyện đúng nội dung giáo viên đã giao, bám sát chương trình học trên lớp',
    apiPath: '/api/practice/start-class',
    tip: 'Lấy câu từ bài thi giáo viên đã giao cho lớp',
  },
];

const DIFFICULTY_MODES = [
  {
    key: 'EASY',
    label: 'Dễ',
    icon: BookOpen,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100 text-green-600',
    badge: 'bg-green-100 text-green-700',
    count: 15,
    duration: 15,
    desc: 'Câu hỏi cơ bản, phù hợp ôn lại kiến thức nền',
    apiPath: '/api/practice/start',
  },
  {
    key: 'MEDIUM',
    label: 'Trung bình',
    icon: Zap,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100 text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    count: 20,
    duration: 20,
    desc: 'Câu hỏi vừa phải, kiểm tra năng lực tổng quát',
    apiPath: '/api/practice/start',
  },
  {
    key: 'HARD',
    label: 'Khó',
    icon: Flame,
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100 text-red-600',
    badge: 'bg-red-100 text-red-700',
    count: 20,
    duration: 25,
    desc: 'Câu hỏi nâng cao, thử thách tư duy sâu',
    apiPath: '/api/practice/start',
  },
];

interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string | null;
  gradeCode: string | null;
}

export default function PracticePage() {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState<string | null>(null);
  const [grade, setGrade] = useState<{ id: string; name: string } | null>(null);
  const [studentLevel, setStudentLevel] = useState<string>('MEDIUM');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [classInfoLoading, setClassInfoLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(me => {
        const grade = me.student?.grade ?? null;
        const level = me.student?.level || 'MEDIUM';
        setGrade(grade);
        setStudentLevel(level);
        setProfileLoaded(true);

        // Fetch subjects riêng, SAU khi có grade + level
        const params = new URLSearchParams();
        if (grade?.id) params.set('gradeId', grade.id);
        params.set('level', level);
        fetch(`/api/subjects?${params}`)
          .then(r => r.json())
          .then(data => setSubjects(Array.isArray(data) ? data : []))
          .catch(() => {});
      })
      .catch(() => setProfileLoaded(true));
  }, []);

  // Load class info when subject changes
  useEffect(() => {
    setClassInfoLoading(true);
    const url = selectedSubject
      ? `/api/practice/class-info?subjectId=${selectedSubject}`
      : '/api/practice/class-info';
    fetch(url)
      .then(r => r.json())
      .then(data => { if (data.progress) setClassInfo(data); })
      .catch(() => {})
      .finally(() => setClassInfoLoading(false));
  }, [selectedSubject]);

  // Load topics when subject changes
  useEffect(() => {
    setSelectedTopic(null);
    setTopics([]);
    setShowAllTopics(false);
    if (!selectedSubject) return;
    setTopicsLoading(true);
    fetch(`/api/practice/topics?subjectId=${selectedSubject}`)
      .then(r => r.json())
      .then(data => setTopics(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setTopicsLoading(false));
  }, [selectedSubject]);

  async function startPractice(mode: { key: string; apiPath: string }) {
    setLoadingBtn(mode.key);
    try {
      const body: Record<string, string> = {};
      if (selectedSubject) body.subjectId = selectedSubject;
      if (selectedTopic) body.topicId = selectedTopic;
      if (['EASY', 'MEDIUM', 'HARD'].includes(mode.key)) body.difficulty = mode.key;

      const res = await fetch(mode.apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        toast.error('Bạn cần đăng nhập để làm bài');
        router.push('/login');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Có lỗi xảy ra');
        return;
      }

      router.push(`/practice/${data.attemptId}`);
    } catch {
      toast.error('Không thể kết nối server');
    } finally {
      setLoadingBtn(null);
    }
  }

  const selectedSubjectName = subjects.find(s => s.id === selectedSubject)?.name;
  const selectedTopicName = topics.find(t => t.id === selectedTopic)?.name;
  const TOPIC_PREVIEW = 6;
  const visibleTopics = showAllTopics ? topics : topics.slice(0, TOPIC_PREVIEW);

  const stepNum = (n: number) => subjects.length > 0 ? `Bước ${n} — ` : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-200">
          <HelpCircle size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Luyện tập</h1>
        <p className="text-gray-500 mb-6 text-lg">
          Chọn chế độ phù hợp để luyện tập hiệu quả nhất
        </p>

        {/* Grade + Level info */}
        {profileLoaded && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              grade ? 'bg-blue-100 text-blue-700' : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
            }`}>
              {grade ? (
                <><GraduationCap size={16} /> Lớp: <strong>{grade.name}</strong></>
              ) : (
                <><AlertCircle size={16} /> Chưa cài lớp — dùng toàn bộ ngân hàng</>
              )}
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              studentLevel === 'EASY'   ? 'bg-green-100 text-green-700' :
              studentLevel === 'HARD'  ? 'bg-purple-100 text-purple-700' :
                                         'bg-indigo-100 text-indigo-700'
            }`}>
              {studentLevel === 'EASY'  ? '🌱' : studentLevel === 'HARD' ? '🚀' : '📘'}
              {' '}Trình độ:{' '}
              <strong>
                {studentLevel === 'EASY' ? 'Cơ bản' : studentLevel === 'HARD' ? 'Nâng cao' : 'Trung bình'}
              </strong>
              <a href="/student/profile" className="ml-1 text-xs underline opacity-70 hover:opacity-100">(đổi)</a>
            </div>
          </div>
        )}

        {/* Bước 1: Chọn môn học */}
        {subjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{stepNum(1)}Chọn môn học</h2>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  !selectedSubject
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                📚 Tất cả môn
              </button>
              {subjects.map(s => {
                const icon = SUBJECT_ICONS[s.code] || s.icon || '📝';
                const isActive = selectedSubject === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubject(isActive ? null : s.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {icon} {s.name}
                    {s.gradeCode && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {s.gradeCode}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bước 2: Chọn chủ đề (chỉ hiện khi đã chọn môn và có topics) */}
        {selectedSubject && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-700">{stepNum(2)}Chọn chủ đề</h2>
              {selectedTopic && (
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Xoá lọc
                </button>
              )}
            </div>

            {topicsLoading ? (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Đang tải chủ đề...
              </div>
            ) : topics.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-400 text-center">
                <Tag size={16} className="inline mr-1.5 opacity-50" />
                Môn này chưa phân chia chủ đề — luyện toàn bộ câu hỏi của môn
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex flex-wrap gap-2 justify-start">
                  {/* Tất cả chủ đề */}
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                      !selectedTopic
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    <Tag size={13} />
                    Tất cả chủ đề
                  </button>

                  {visibleTopics.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(selectedTopic === t.id ? null : t.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                        selectedTopic === t.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {t.name}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                        selectedTopic === t.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {t.questionCount}
                      </span>
                    </button>
                  ))}
                </div>

                {topics.length > TOPIC_PREVIEW && (
                  <button
                    onClick={() => setShowAllTopics(!showAllTopics)}
                    className="mt-3 flex items-center gap-1 text-xs text-blue-500 hover:underline mx-auto"
                  >
                    {showAllTopics
                      ? <><ChevronUp size={14} /> Thu gọn</>
                      : <><ChevronDown size={14} /> Xem thêm {topics.length - TOPIC_PREVIEW} chủ đề</>
                    }
                  </button>
                )}

                {selectedTopic && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 text-left">
                    <Tag size={12} className="inline mr-1 text-blue-500" />
                    Đang lọc: <strong className="text-blue-600">{selectedTopicName}</strong>
                    {' '}·{' '}
                    <span className="text-gray-400">{topics.find(t => t.id === selectedTopic)?.questionCount} câu hỏi</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Luyện tập thông minh */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-700">
              {selectedSubject
                ? (topics.length > 0 ? stepNum(3) : stepNum(2))
                : (subjects.length > 0 ? stepNum(2) : '')}
              Luyện tập thông minh
            </h2>
            <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full">MỚI</span>
          </div>
          <p className="text-sm text-gray-400 mb-5">
            Hệ thống tự động chọn câu phù hợp
            {selectedTopicName ? ` · Chủ đề: ${selectedTopicName}` : selectedSubjectName ? ` (${selectedSubjectName})` : ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card: Luyện điểm yếu */}
            {(() => {
              const mode = SMART_MODES[0];
              const Icon = mode.icon;
              const isLoading = loadingBtn === mode.key;
              return (
                <button
                  key={mode.key}
                  onClick={() => startPractice(mode)}
                  disabled={loadingBtn !== null}
                  className={`flex flex-col items-center text-center rounded-3xl border-2 p-7 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${mode.color} ${!loadingBtn ? 'hover:shadow-lg hover:-translate-y-1' : ''}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${mode.iconBg}`}>
                    {isLoading ? <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Icon size={28} />}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${mode.badge}`}>{mode.label}</span>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{mode.desc}</p>
                  <p className="text-xs text-gray-400 italic mb-4">{mode.tip}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><HelpCircle size={13} /> {mode.count} câu</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {mode.duration} phút</span>
                  </div>
                </button>
              );
            })()}

            {/* Card: Theo tiến độ lớp */}
            {(() => {
              const mode = SMART_MODES[1];
              const isLoading = loadingBtn === mode.key;
              const ci = classInfo;
              const pct = ci ? Math.round(ci.progress.percent * 100) : 0;
              return (
                <button
                  onClick={() => startPractice(mode)}
                  disabled={loadingBtn !== null}
                  className={`flex flex-col rounded-3xl border-2 p-7 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-left ${mode.color} ${!loadingBtn ? 'hover:shadow-lg hover:-translate-y-1' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${mode.iconBg}`}>
                      {isLoading ? <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <School size={28} />}
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${mode.badge}`}>{mode.label}</span>
                      <p className="text-gray-600 text-sm mt-1 leading-snug">{mode.desc}</p>
                    </div>
                  </div>

                  {classInfoLoading ? (
                    <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      Đang tính tiến độ...
                    </div>
                  ) : ci ? (
                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-2 rounded-xl">
                        <CalendarDays size={14} />
                        <span>{ci.progress.label}</span>
                        {ci.progress.isSummer && <span className="ml-1 text-purple-400">(Mùa hè)</span>}
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Tiến độ chương trình</span>
                          <span className="font-bold text-purple-700">{ci.coveredTopics}/{ci.totalTopics} chủ đề ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      {ci.currentTopics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1 mr-1"><BookMarked size={12} /> Đang học:</span>
                          {ci.currentTopics.map(t => (
                            <span key={t.id} className="text-xs bg-white border border-purple-200 text-purple-700 px-2 py-0.5 rounded-lg font-medium">{t.name}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 border-t border-purple-100">
                        <span className="flex items-center gap-1"><HelpCircle size={13} /> {Math.min(ci.availableQuestions, 20)} câu</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> 20 phút</span>
                        {ci.availableQuestions === 0 && (
                          <span className="text-orange-500 font-semibold">Chưa có câu hỏi cho chủ đề này</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Không tải được thông tin lịch học</p>
                  )}
                </button>
              );
            })()}
          </div>
        </div>

        {/* Luyện theo độ khó */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <h2 className="text-lg font-bold text-gray-700 whitespace-nowrap">
              {selectedSubject
                ? (topics.length > 0 ? stepNum(3) : stepNum(2))
                : (subjects.length > 0 ? stepNum(2) : '')}
              Luyện theo độ khó
              {selectedTopicName
                ? ` · ${selectedTopicName}`
                : selectedSubjectName ? ` (${selectedSubjectName})` : ''}
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {DIFFICULTY_MODES.map(mode => {
              const Icon = mode.icon;
              const isLoading = loadingBtn === mode.key;
              const isRecommended = mode.key === studentLevel;
              return (
                <div key={mode.key} className="relative">
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-3 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full shadow-sm whitespace-nowrap">
                        ⭐ Phù hợp với bạn
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => startPractice(mode)}
                    disabled={loadingBtn !== null}
                    className={`w-full flex flex-col items-center text-center rounded-3xl border-2 p-8 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${mode.color} ${!loadingBtn ? 'hover:shadow-lg hover:-translate-y-1' : ''} ${isRecommended ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${mode.iconBg}`}>
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon size={28} />
                      )}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${mode.badge}`}>
                      {mode.label}
                    </span>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">{mode.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><HelpCircle size={13} /> {mode.count} câu</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {mode.duration} phút</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-sm text-gray-400">
          Câu hỏi được chọn ngẫu nhiên — mỗi lần làm là một bộ đề mới
        </p>

        {!grade && profileLoaded && (
          <p className="mt-3 text-sm text-gray-400">
            Muốn luyện đúng trình độ lớp?{' '}
            <a href="/student/profile" className="text-blue-500 underline">Cập nhật lớp học trong hồ sơ</a>
          </p>
        )}
      </div>
    </div>
  );
}
