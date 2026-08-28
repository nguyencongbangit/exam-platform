'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { HelpCircle, FileText, Users, Plus, School, ChevronRight, TrendingUp } from 'lucide-react';
import { formatScore, getScoreColor } from '@/lib/utils';

interface ClassMemberItem {
  studentId: string;
  joinedAt: string;
  student: {
    studentCode: string;
    user: { fullName: string; email: string };
    grade?: { name: string };
    attempts: { score: number | null }[];
  };
}

interface ClassItem {
  id: string;
  name: string;
  code: string;
  members: ClassMemberItem[];
  assignments: { id: string }[];
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState({ questions: 0, exams: 0 });
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/teacher/questions?limit=1').then(r => r.json()),
      fetch('/api/teacher/exams').then(r => r.json()),
    ]).then(([qData, eData]) => {
      setStats({ questions: qData.total || 0, exams: Array.isArray(eData) ? eData.length : 0 });
    }).catch(() => {});

    // Load all classes with members
    fetch('/api/teacher/classes')
      .then(r => r.json())
      .then(async (classList: any[]) => {
        if (!Array.isArray(classList) || classList.length === 0) { setLoadingClasses(false); return; }
        // Fetch details for each class (to get members)
        const detailed = await Promise.all(
          classList.map(c => fetch(`/api/teacher/classes/${c.id}`).then(r => r.json()).catch(() => null))
        );
        setClasses(detailed.filter(Boolean));
        setLoadingClasses(false);
      })
      .catch(() => setLoadingClasses(false));
  }, []);

  const totalStudents = new Set(classes.flatMap(c => c.members.map(m => m.studentId))).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard Giáo viên</h1>
        <div className="flex gap-2">
          <Link href="/teacher/questions/create">
            <Button size="sm"><Plus size={14} />Thêm câu hỏi</Button>
          </Link>
          <Link href="/teacher/exams/create">
            <Button variant="secondary" size="sm"><Plus size={14} />Tạo đề thi</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Câu hỏi đã tạo', value: stats.questions, icon: HelpCircle, color: 'text-blue-600', bg: 'bg-blue-50', href: '/teacher/questions' },
          { label: 'Đề thi đã tạo', value: stats.exams, icon: FileText, color: 'text-green-600', bg: 'bg-green-50', href: '/teacher/exams' },
          { label: 'Học sinh', value: loadingClasses ? '...' : totalStudents, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', href: '/teacher/classes' },
        ].map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}>
            <Card hover>
              <CardBody className="flex items-center gap-4">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Homeroom Classes */}
      {!loadingClasses && classes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School size={20} className="text-indigo-600" />
              <h2 className="text-lg font-extrabold text-gray-900">Lớp chủ nhiệm</h2>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{classes.length} lớp</span>
            </div>
            <Link href="/teacher/classes">
              <Button variant="ghost" size="sm">Quản lý <ChevronRight size={14} /></Button>
            </Link>
          </div>

          {classes.map(cls => {
            const isExpanded = expandedClass === cls.id;
            const memberCount = cls.members.length;
            const allScores = cls.members.flatMap(m => m.student.attempts.filter(a => a.score !== null).map(a => a.score!));
            const clsAvg = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : null;

            return (
              <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Class header */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedClass(isExpanded ? null : cls.id)}
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <School size={18} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{cls.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Mã lớp: <span className="font-mono font-bold">{cls.code}</span> · {memberCount} học sinh · {cls.assignments.length} đề thi</p>
                  </div>
                  {clsAvg !== null && (
                    <div className="text-center shrink-0 hidden sm:block">
                      <p className={`text-base font-black ${getScoreColor(clsAvg)}`}>{formatScore(clsAvg)}</p>
                      <p className="text-xs text-gray-400">Điểm TB</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/teacher/classes/${cls.id}`} onClick={e => e.stopPropagation()}>
                      <span className="text-xs text-blue-600 hover:underline font-semibold">Quản lý</span>
                    </Link>
                    <ChevronRight size={16} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Members list */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {memberCount === 0 ? (
                      <p className="text-center py-6 text-sm text-gray-400">Chưa có học sinh nào trong lớp</p>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {cls.members.map((m, idx) => {
                          const scores = m.student.attempts.filter(a => a.score !== null).map(a => a.score!);
                          const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
                          return (
                            <div key={m.studentId} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                                {idx + 1}
                              </div>
                              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                                {m.student.user.fullName.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{m.student.user.fullName}</p>
                                <p className="text-xs text-gray-400">{m.student.studentCode} {m.student.grade ? `· ${m.student.grade.name}` : ''}</p>
                              </div>
                              <div className="text-right shrink-0">
                                {avg !== null ? (
                                  <>
                                    <p className={`text-sm font-black ${getScoreColor(avg)}`}>{formatScore(avg)}</p>
                                    <p className="text-xs text-gray-400">{scores.length} bài</p>
                                  </>
                                ) : (
                                  <p className="text-xs text-gray-300">Chưa làm</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quick actions & guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h3 className="font-bold text-gray-900 mb-4">Công việc nhanh</h3>
            <div className="space-y-2">
              {[
                { label: 'Tạo câu hỏi mới', href: '/teacher/questions/create', icon: '➕' },
                { label: 'Tạo đề thi mới', href: '/teacher/exams/create', icon: '📝' },
                { label: 'Xem danh sách đề thi', href: '/teacher/exams', icon: '📋' },
                { label: 'Xem báo cáo', href: '/teacher/reports', icon: '📊' },
                { label: 'Quản lý lớp học', href: '/teacher/classes', icon: '🏫' },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                  <span>{icon}</span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-bold text-gray-900 mb-4">Hướng dẫn</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>1. <strong>Tạo câu hỏi</strong> với nhiều độ khó khác nhau</p>
              <p>2. <strong>Tạo đề thi</strong> bằng cách chọn câu hỏi thủ công</p>
              <p>3. <strong>Giao đề thi</strong> cho lớp học của mình</p>
              <p>4. <strong>Theo dõi kết quả</strong> qua báo cáo chi tiết</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
