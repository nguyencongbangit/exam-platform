'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const SUBJECT_META: Record<string, { icon: string; color: string; desc: string }> = {
  'sub-toan':         { icon: '📐', color: 'from-blue-500 to-blue-700',        desc: 'Đại số, Hình học, Giải tích, Xác suất thống kê' },
  'sub-van':          { icon: '📚', color: 'from-purple-500 to-purple-700',    desc: 'Đọc hiểu, Nghị luận, Tác phẩm văn học Việt Nam' },
  'sub-anh':          { icon: '🌍', color: 'from-green-500 to-green-700',      desc: 'Ngữ pháp, Từ vựng, Đọc hiểu, Nghe nói' },
  'sub-ly':           { icon: '⚡', color: 'from-yellow-500 to-orange-500',    desc: 'Cơ học, Điện từ, Quang học, Nhiệt học' },
  'sub-hoa':          { icon: '🧪', color: 'from-orange-500 to-red-500',       desc: 'Hóa vô cơ, Hữu cơ, Điện hóa, Hóa phân tích' },
  'sub-sinh':         { icon: '🌿', color: 'from-emerald-500 to-teal-600',     desc: 'Tế bào, Di truyền, Tiến hóa, Sinh thái' },
  'sub-khtn':         { icon: '🔬', color: 'from-teal-500 to-cyan-600',        desc: 'Khoa học tự nhiên tích hợp Lý - Hóa - Sinh' },
  'sub-lichsu-dialy': { icon: '🗺️', color: 'from-amber-500 to-yellow-600',    desc: 'Lịch sử Việt Nam, Thế giới, Địa lí tự nhiên' },
  'sub-tinhoc':       { icon: '💻', color: 'from-sky-500 to-blue-600',         desc: 'Lập trình, Thuật toán, Ứng dụng CNTT' },
  'sub-gdcd':         { icon: '⚖️', color: 'from-indigo-500 to-violet-600',    desc: 'Đạo đức, Pháp luật, Kinh tế, Kỹ năng sống' },
  'sub-congnghee':    { icon: '⚙️', color: 'from-gray-500 to-gray-700',        desc: 'Kỹ thuật, Công nghệ, Thiết kế kỹ thuật' },
  'sub-amnhac':       { icon: '🎵', color: 'from-pink-500 to-rose-600',        desc: 'Nhạc lý, Hát, Nhạc cụ, Thưởng thức âm nhạc' },
  'sub-mythuat':      { icon: '🎨', color: 'from-fuchsia-500 to-pink-600',     desc: 'Vẽ, Thủ công, Điêu khắc, Lịch sử mĩ thuật' },
  'sub-gdtc':         { icon: '⚽', color: 'from-lime-500 to-green-600',       desc: 'Thể dục, Thể thao, Sức khỏe' },
  'sub-tieng-viet':   { icon: '📖', color: 'from-rose-500 to-pink-600',        desc: 'Đọc hiểu, Luyện từ và câu, Tập làm văn' },
  'sub-daoduc':       { icon: '🌟', color: 'from-yellow-400 to-amber-500',     desc: 'Đạo đức, Kỹ năng sống, Giá trị sống' },
  'sub-khoahoc':      { icon: '🔭', color: 'from-cyan-500 to-sky-600',         desc: 'Khoa học tự nhiên, Môi trường, Sức khỏe' },
  'sub-hdtn':         { icon: '🏫', color: 'from-violet-500 to-purple-600',    desc: 'Hoạt động trải nghiệm, Hướng nghiệp' },
};

const GRADES = [
  { id: 'grade-5',  label: 'Lớp 5' },
  { id: 'grade-6',  label: 'Lớp 6' },
  { id: 'grade-7',  label: 'Lớp 7' },
  { id: 'grade-8',  label: 'Lớp 8' },
  { id: 'grade-9',  label: 'Lớp 9' },
  { id: 'grade-10', label: 'Lớp 10' },
  { id: 'grade-11', label: 'Lớp 11' },
  { id: 'grade-12', label: 'Lớp 12' },
];

interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string | null;
  gradeCode: string | null;
}

export default function SubjectsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [studentGrade, setStudentGrade] = useState<{ id: string; name: string } | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(me => {
        const grade = me.student?.grade ?? null;
        const level = me.student?.level || 'MEDIUM';
        setStudentGrade(grade);

        // Fetch subjects lọc theo lớp + trình độ
        const params = new URLSearchParams();
        if (grade?.id) params.set('gradeId', grade.id);
        params.set('level', level);
        fetch(`/api/subjects?${params}`)
          .then(r => r.json())
          .then(data => { setSubjects(Array.isArray(data) ? data : []); setLoading(false); })
          .catch(() => setLoading(false));
      })
      .catch(() => setLoading(false));

    fetch('/api/subjects/stats')
      .then(r => r.json())
      .then(data => setStats(data.stats || {}))
      .catch(() => {});
  }, []);

  const subjectsWithExams = subjects.filter(s => (stats[s.id] || 0) > 0);
  const subjectsNoExams  = subjects.filter(s => (stats[s.id] || 0) === 0);
  const displaySubjects  = [...subjectsWithExams, ...subjectsNoExams];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Môn học</h1>
          <p className="text-gray-600">
            {studentGrade
              ? `Hiển thị các môn trong chương trình ${studentGrade.name}`
              : 'Chọn môn học để xem đề thi theo từng lớp'}
          </p>
          {studentGrade && (
            <p className="text-xs text-gray-400 mt-1">
              Không thấy môn cần tìm?{' '}
              <Link href="/student/profile" className="text-blue-500 hover:underline">
                Kiểm tra lại lớp trong hồ sơ
              </Link>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Đang tải...</div>
        ) : displaySubjects.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p>Chưa có môn học nào cho trình độ này.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displaySubjects.map((subject) => {
              const meta = SUBJECT_META[subject.id] ?? {
                icon: subject.icon || '📝',
                color: 'from-gray-400 to-gray-600',
                desc: '',
              };
              const count  = stats[subject.id] || 0;
              const isOpen = expanded === subject.id;

              return (
                <div key={subject.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full flex items-center gap-5 p-5 hover:bg-gray-50 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : subject.id)}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                      {meta.icon}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-lg">{subject.name}</span>
                        {subject.gradeCode && (
                          <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded-md">
                            {subject.gradeCode}
                          </span>
                        )}
                      </div>
                      {meta.desc && <div className="text-sm text-gray-500 truncate">{meta.desc}</div>}
                    </div>
                    <div className="text-right mr-4 shrink-0">
                      <div className={`text-2xl font-bold ${count > 0 ? 'text-blue-600' : 'text-gray-300'}`}>{count}</div>
                      <div className="text-xs text-gray-500">đề thi</div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-4">
                      {studentGrade ? (
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/exams?subjectId=${subject.id}&gradeId=${studentGrade.id}`}
                            className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-semibold transition-colors"
                          >
                            📋 Xem đề {studentGrade.name}
                          </Link>
                          <Link
                            href={`/practice?subjectId=${subject.id}`}
                            className="px-5 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-xl text-sm font-semibold transition-colors"
                          >
                            ✏️ Luyện tập
                          </Link>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Chọn lớp</p>
                          <div className="flex flex-wrap gap-2">
                            {GRADES.map((g) => (
                              <Link
                                key={g.id}
                                href={`/exams?subjectId=${subject.id}&gradeId=${g.id}`}
                                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-xl text-sm font-medium transition-colors"
                              >
                                {g.label}
                              </Link>
                            ))}
                            <Link
                              href={`/exams?subjectId=${subject.id}`}
                              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-colors"
                            >
                              Tất cả lớp
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
