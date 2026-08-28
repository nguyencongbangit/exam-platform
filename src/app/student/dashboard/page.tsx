'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ScoreLineChart from '@/components/charts/ScoreLineChart';
import SubjectBarChart from '@/components/charts/SubjectBarChart';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { BookOpen, CheckCircle, Clock, Target, TrendingUp, ChevronRight, School, FileText, CheckSquare, AlertCircle, Bell, Flame } from 'lucide-react';
import { formatScore, formatDate, getScoreColor, getDifficultyLabel, getDifficultyColor } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ClassInvitation {
  id: string;
  classroom: { id: string; name: string; code: string; _count: { members: number }; teacher: { user: { fullName: string } } };
}

interface AssignedExam {
  assignmentId: string;
  classId: string;
  className: string;
  teacherName: string | null;
  dueDate: string | null;
  note: string | null;
  assignedAt: string;
  exam: { id: string; title: string; durationMinutes: number; difficulty: string; examType: string; subject: { name: string }; grade: { name: string } | null };
  attempted: boolean;
  lastAttempt: { score: number | null; submittedAt: string | null } | null;
}

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<ClassInvitation[]>([]);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [assignedExams, setAssignedExams] = useState<AssignedExam[]>([]);
  const [dailyRemaining, setDailyRemaining] = useState<{ id: string; name: string; icon: string | null; usedToday: number; remaining: number }[]>([]);

  useEffect(() => {
    fetch('/api/student/stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
    fetch('/api/student/class-invitations')
      .then(r => r.json()).then(d => setInvitations(Array.isArray(d) ? d : [])).catch(() => {});
    fetch('/api/student/assigned-exams')
      .then(r => r.json()).then(d => setAssignedExams(Array.isArray(d) ? d : [])).catch(() => {});
    fetch('/api/student/daily-remaining')
      .then(r => r.json()).then(d => setDailyRemaining(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const respondInvitation = async (invitationId: string, action: 'accept' | 'decline') => {
    setRespondingId(invitationId);
    try {
      const res = await fetch('/api/student/class-invitations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invitationId, action }) });
      if (res.ok) {
        toast.success(action === 'accept' ? 'Đã vào lớp thành công!' : 'Đã từ chối lời mời');
        setInvitations(prev => prev.filter(i => i.id !== invitationId));
      }
    } finally { setRespondingId(null); }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Xin chào, {session?.user?.name?.split(' ').slice(-1)[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Hôm nay bạn muốn ôn luyện môn gì?</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Đề đã làm', value: stats?.totalAttempts || 0, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Câu đã làm', value: stats?.totalAnswers || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Điểm trung bình', value: formatScore(stats?.avgScore || 0), icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Tỷ lệ đúng', value: `${(stats?.accuracyRate || 0).toFixed(1)}%`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
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
        ))}
      </div>

      {/* Daily remaining reminder */}
      {dailyRemaining.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={18} className="text-amber-600" />
            <h3 className="font-bold text-amber-800">Hôm nay bạn còn lượt thưởng điểm!</h3>
            <span className="ml-auto text-xs text-amber-600 font-medium">Mỗi môn tối đa 2 lượt/ngày</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dailyRemaining.map(s => (
              <Link key={s.id} href={`/practice?subjectId=${s.id}`}>
                <div className="flex items-center gap-2 bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm rounded-xl px-3 py-2 transition-all cursor-pointer">
                  <span className="text-lg">{s.icon ?? '📚'}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{s.name}</p>
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <Flame size={10} />
                      Còn {s.remaining} lượt thưởng
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Class invitations */}
      {invitations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <School size={18} className="text-blue-600" />
            <h3 className="font-bold text-blue-800">Lời mời vào lớp học ({invitations.length})</h3>
          </div>
          <div className="space-y-3">
            {invitations.map(inv => (
              <div key={inv.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <School size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{inv.classroom.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Giáo viên: {inv.classroom.teacher.user.fullName} · {inv.classroom._count.members} học sinh</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => respondInvitation(inv.id, 'accept')} disabled={respondingId === inv.id}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50">
                    Chấp nhận
                  </button>
                  <button onClick={() => respondInvitation(inv.id, 'decline')} disabled={respondingId === inv.id}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-lg transition-colors disabled:opacity-50">
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assigned exams from teacher */}
      {assignedExams.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-indigo-600" />
            <h3 className="font-bold text-gray-900 text-lg">Đề giáo viên giao ({assignedExams.length})</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assignedExams.map((item) => {
              const overdue = item.dueDate && !item.attempted && new Date(item.dueDate) < new Date();
              return (
                <Link key={item.assignmentId} href={`/exams/${item.exam.id}`}>
                  <div className={`bg-white rounded-2xl border p-4 hover:shadow-md transition-shadow cursor-pointer ${overdue ? 'border-red-200' : item.attempted ? 'border-green-200' : 'border-blue-200'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{item.exam.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.className} · GV: {item.teacherName || '—'}</p>
                      </div>
                      {item.attempted ? (
                        <span className="ml-2 shrink-0 flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                          <CheckSquare size={12} /> Đã làm
                        </span>
                      ) : overdue ? (
                        <span className="ml-2 shrink-0 flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                          <AlertCircle size={12} /> Quá hạn
                        </span>
                      ) : (
                        <span className="ml-2 shrink-0 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Chưa làm</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={11} />{item.exam.durationMinutes} phút</span>
                      <span>{item.exam.subject.name}</span>
                      {item.dueDate && (
                        <span className={overdue ? 'text-red-500 font-semibold' : ''}>
                          Hạn: {new Date(item.dueDate).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                      {item.attempted && item.lastAttempt?.score != null && (
                        <span className={`ml-auto font-bold ${getScoreColor(item.lastAttempt.score)}`}>
                          {formatScore(item.lastAttempt.score)} điểm
                        </span>
                      )}
                    </div>
                    {item.note && <p className="mt-2 text-xs text-indigo-600 italic">📌 {item.note}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-bold text-gray-900">Điểm theo 7 ngày gần nhất</h3>
          </CardHeader>
          <CardBody>
            {stats?.dailyScores && stats.dailyScores.some((d: any) => d.score > 0) ? (
              <ScoreLineChart data={stats.dailyScores} />
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-400 text-sm">
                Chưa có dữ liệu
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-bold text-gray-900">Số câu đã làm theo môn</h3>
          </CardHeader>
          <CardBody>
            {stats?.subjectData && stats.subjectData.length > 0 ? (
              <SubjectBarChart data={stats.subjectData} />
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-400 text-sm">
                Chưa có dữ liệu
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Recent attempts */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Bài làm gần đây</h3>
          <Link href="/student/history">
            <Button variant="ghost" size="sm">Xem tất cả <ChevronRight size={14} /></Button>
          </Link>
        </CardHeader>
        <CardBody className="p-0">
          {stats?.recentAttempts && stats.recentAttempts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentAttempts.map((attempt: any) => (
                <div key={attempt.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{attempt.exam?.title || 'Đề thi'}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {attempt.submittedAt ? formatDate(attempt.submittedAt) : 'N/A'} •
                      Đúng: {attempt.correctCount} | Sai: {attempt.wrongCount}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-extrabold ${getScoreColor(attempt.score || 0)}`}>
                      {formatScore(attempt.score)}
                    </span>
                    <Link href={`/attempts/${attempt.id}/result`}>
                      <Button variant="ghost" size="xs">Xem</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
              <p>Chưa có bài làm nào</p>
              <Link href="/exams" className="mt-3 inline-block">
                <Button size="sm" className="mt-3">Bắt đầu luyện tập</Button>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Quick suggestions */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-gray-900">Gợi ý luyện tập</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Toán 9 - Phương trình', href: '/exams?subjectId=sub-toan&gradeId=grade-9', icon: '📐' },
              { label: 'Toán 9 - Hình học', href: '/exams?subjectId=sub-toan&gradeId=grade-9', icon: '📏' },
              { label: 'Luyện câu sai', href: '/student/wrong-questions', icon: '🔁' },
            ].map(({ label, href, icon }) => (
              <Link key={label} href={href}>
                <div className="p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm font-semibold text-blue-800">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
