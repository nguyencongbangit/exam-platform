'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Users, Send, BookOpen, Trash2, UserMinus, Copy, Check,
  ChevronLeft, Clock, BarChart2, AlertTriangle, CheckCircle2,
  XCircle, Star, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { formatScore, getScoreColor } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Member {
  studentId: string;
  joinedAt: string;
  student: {
    studentCode: string;
    user: { fullName: string; email: string; phone?: string };
    grade?: { name: string };
    attempts: { score: number | null }[];
  };
}

interface Invitation {
  id: string;
  status: string;
  createdAt: string;
  student: { studentId: string; user: { fullName: string; email: string } };
}

interface Assignment {
  id: string;
  assignedAt: string;
  openAt: string | null;
  dueDate: string | null;
  note: string | null;
  exam: { id: string; title: string; subject?: { name: string }; durationMinutes: number; totalQuestions: number };
}

interface ClassDetail {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  members: Member[];
  invitations: Invitation[];
  assignments: Assignment[];
}

interface Exam {
  id: string;
  title: string;
  subject?: { name: string };
  durationMinutes: number;
  totalQuestions: number;
}

interface StudentProgress {
  studentId: string;
  fullName: string;
  status: 'submitted' | 'not_started';
  score: number | null;
  submittedAt: string | null;
  correctCount: number | null;
  wrongCount: number | null;
}

interface ExamProgress {
  assignmentId: string;
  examId: string;
  examTitle: string;
  subjectName: string | null;
  durationMinutes: number;
  openAt: string | null;
  dueDate: string | null;
  note: string | null;
  assignedAt: string;
  submittedCount: number;
  totalStudents: number;
  avgScore: number | null;
  students: StudentProgress[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getHocLuc(avg: number | null): { label: string; color: string; bg: string; rank: number } {
  if (avg === null) return { label: 'Chưa có', color: 'text-gray-400', bg: 'bg-gray-50', rank: 5 };
  if (avg >= 8.5) return { label: 'Giỏi', color: 'text-green-700', bg: 'bg-green-50', rank: 1 };
  if (avg >= 7.0) return { label: 'Khá', color: 'text-blue-700', bg: 'bg-blue-50', rank: 2 };
  if (avg >= 5.0) return { label: 'Trung bình', color: 'text-yellow-700', bg: 'bg-yellow-50', rank: 3 };
  return { label: 'Yếu', color: 'text-red-700', bg: 'bg-red-50', rank: 4 };
}

type Tab = 'members' | 'invite' | 'exams' | 'progress';

// ─── Component ───────────────────────────────────────────────────────────────

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cls, setCls] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('members');
  const [copied, setCopied] = useState(false);

  // Invite
  const [inviteQuery, setInviteQuery] = useState('');
  const [inviting, setInviting] = useState(false);

  // Assign exam
  const [myExams, setMyExams] = useState<Exam[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({ examId: '', openAt: '', dueDate: '', note: '' });
  const [assigning, setAssigning] = useState(false);

  // Progress
  const [progressData, setProgressData] = useState<ExamProgress[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  // Members grouping
  const [groupByHocLuc, setGroupByHocLuc] = useState(false);

  // Delete class
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const load = useCallback(() => {
    fetch(`/api/teacher/classes/${id}`).then(r => r.json()).then(d => { setCls(d); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (tab === 'exams') {
      fetch('/api/teacher/exams').then(r => r.json()).then(d => setMyExams(Array.isArray(d) ? d : d.exams || []));
    }
    if (tab === 'progress') {
      setLoadingProgress(true);
      fetch(`/api/teacher/classes/${id}/progress`)
        .then(r => r.json())
        .then(d => { setProgressData(d.exams || []); setLoadingProgress(false); })
        .catch(() => setLoadingProgress(false));
    }
  }, [tab, id]);

  const copyCode = () => { navigator.clipboard.writeText(cls!.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handleInvite = async () => {
    if (!inviteQuery.trim()) return;
    setInviting(true);
    try {
      const res = await fetch(`/api/teacher/classes/${id}/invite`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: inviteQuery.trim() }) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success(`Đã gửi lời mời tới ${data.studentName}!`);
      setInviteQuery('');
      load();
    } finally { setInviting(false); }
  };

  const handleRemoveMember = async (studentId: string, name: string) => {
    if (!confirm(`Xóa ${name} khỏi lớp?`)) return;
    const res = await fetch(`/api/teacher/classes/${id}/members/${studentId}`, { method: 'DELETE' });
    if (res.ok) { toast.success(`Đã xóa ${name} khỏi lớp`); load(); }
    else toast.error('Có lỗi xảy ra');
  };

  const handleAssignExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignForm.examId) { toast.error('Chưa chọn đề thi'); return; }
    setAssigning(true);
    try {
      const res = await fetch(`/api/teacher/classes/${id}/assign-exam`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignForm),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success('Đã giao đề thi cho lớp!');
      setShowAssignModal(false);
      setAssignForm({ examId: '', openAt: '', dueDate: '', note: '' });
      load();
    } finally { setAssigning(false); }
  };

  const handleRemoveExam = async (examId: string, title: string) => {
    if (!confirm(`Thu hồi đề thi "${title}"?`)) return;
    const res = await fetch(`/api/teacher/classes/${id}/assign-exam`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ examId }) });
    if (res.ok) { toast.success('Đã thu hồi đề thi'); load(); }
  };

  const handleDeleteClass = async () => {
    const res = await fetch(`/api/teacher/classes/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success(`Đã xóa lớp "${cls!.name}"`); router.push('/teacher/classes'); }
    else toast.error('Có lỗi xảy ra');
  };

  if (loading) return <PageLoader />;
  if (!cls) return <div className="text-center py-20 text-gray-500">Không tìm thấy lớp học</div>;

  const pendingInvites = cls.invitations.filter(i => i.status === 'PENDING');

  // Enrich members with avg score and học lực
  const enrichedMembers = cls.members.map(m => {
    const scores = m.student.attempts.filter(a => a.score !== null).map(a => a.score!);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    const hocLuc = getHocLuc(avg);
    return { ...m, avg, hocLuc };
  });

  // Sort / group
  const sortedMembers = [...enrichedMembers].sort((a, b) => a.hocLuc.rank - b.hocLuc.rank);
  const groupedMembers = groupByHocLuc
    ? (['Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Chưa có'] as const).map(label => ({
        label,
        members: sortedMembers.filter(m => m.hocLuc.label === label),
      })).filter(g => g.members.length > 0)
    : [{ label: null, members: enrichedMembers }];

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'members', label: '👥 Học sinh', count: cls.members.length },
    { key: 'invite', label: '✉️ Mời học sinh', count: pendingInvites.length || undefined },
    { key: 'exams', label: '📋 Đề thi', count: cls.assignments.length },
    { key: 'progress', label: '📊 Theo dõi' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button onClick={() => router.push('/teacher/classes')} className="mt-1 p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900 truncate">{cls.name}</h1>
          {cls.description && <p className="text-gray-500 text-sm mt-0.5">{cls.description}</p>}
        </div>
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
          <div>
            <p className="text-xs text-blue-500 font-medium">Mã lớp</p>
            <p className="font-mono font-black text-blue-800 text-xl tracking-widest">{cls.code}</p>
          </div>
          <button onClick={copyCode} className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-blue-500" />}
          </button>
        </div>
        <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '👥', label: 'Học sinh', value: cls.members.length },
          { icon: '📋', label: 'Đề thi giao', value: cls.assignments.length },
          { icon: '⏳', label: 'Lời mời chờ', value: pendingInvites.length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap px-3 ${tab === t.key ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* ── Members Tab ── */}
          {tab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{cls.members.length} học sinh</p>
                <button
                  onClick={() => setGroupByHocLuc(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${groupByHocLuc ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                  <TrendingUp size={13} />
                  {groupByHocLuc ? 'Đang nhóm theo học lực' : 'Nhóm theo học lực'}
                </button>
              </div>

              {cls.members.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <Users size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Chưa có học sinh nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedMembers.map(({ label, members }) => (
                    <div key={label ?? 'all'}>
                      {label && (
                        <div className={`flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg ${getHocLuc(label === 'Giỏi' ? 9 : label === 'Khá' ? 7.5 : label === 'Trung bình' ? 6 : label === 'Yếu' ? 3 : null).bg}`}>
                          <Star size={13} className={getHocLuc(label === 'Giỏi' ? 9 : label === 'Khá' ? 7.5 : label === 'Trung bình' ? 6 : label === 'Yếu' ? 3 : null).color} />
                          <span className={`text-xs font-bold ${getHocLuc(label === 'Giỏi' ? 9 : label === 'Khá' ? 7.5 : label === 'Trung bình' ? 6 : label === 'Yếu' ? 3 : null).color}`}>
                            {label} ({members.length} học sinh)
                          </span>
                        </div>
                      )}
                      <div className="space-y-2">
                        {members.map((m, idx) => (
                          <div key={m.studentId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                              {idx + 1}
                            </div>
                            <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 font-bold shrink-0">
                              {m.student.user.fullName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-gray-900">{m.student.user.fullName}</p>
                                {m.student.grade && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{m.student.grade.name}</span>}
                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.hocLuc.bg} ${m.hocLuc.color}`}>{m.hocLuc.label}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">{m.student.studentCode} · {m.student.user.email}</p>
                            </div>
                            <div className="text-center shrink-0 hidden sm:block">
                              {m.avg !== null ? (
                                <>
                                  <p className={`text-sm font-black ${getScoreColor(m.avg)}`}>{formatScore(m.avg)}</p>
                                  <p className="text-xs text-gray-400">{m.student.attempts.filter(a => a.score !== null).length} bài</p>
                                </>
                              ) : (
                                <p className="text-xs text-gray-300">Chưa làm</p>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 shrink-0 hidden lg:block">
                              {new Date(m.joinedAt).toLocaleDateString('vi-VN')}
                            </div>
                            <button onClick={() => handleRemoveMember(m.studentId, m.student.user.fullName)}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors shrink-0">
                              <UserMinus size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Invite Tab ── */}
          {tab === 'invite' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-1">Mời học sinh vào lớp</h3>
                <p className="text-sm text-blue-600 mb-4">Nhập mã học sinh (VD: HS2024001) hoặc địa chỉ email</p>
                <div className="flex gap-3">
                  <input type="text" value={inviteQuery} onChange={e => setInviteQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleInvite()}
                    placeholder="Mã học sinh hoặc email..."
                    className="flex-1 px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm" />
                  <Button onClick={handleInvite} disabled={inviting || !inviteQuery.trim()}>
                    <Send size={15} />{inviting ? 'Đang gửi...' : 'Gửi mời'}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 mb-0.5">Hoặc chia sẻ mã lớp</p>
                  <p className="text-xs text-gray-500">Học sinh nhập mã này để tự tham gia</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <span className="font-mono font-black text-gray-800 text-xl tracking-widest">{cls.code}</span>
                  <button onClick={copyCode} className="p-1 hover:bg-gray-100 rounded">
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
                  </button>
                </div>
              </div>
              {cls.invitations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Lịch sử lời mời</h3>
                  <div className="space-y-2">
                    {cls.invitations.map(inv => (
                      <div key={inv.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                          {inv.student.user.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{inv.student.user.fullName}</p>
                          <p className="text-xs text-gray-500">{inv.student.user.email}</p>
                        </div>
                        <Badge variant={inv.status === 'PENDING' ? 'warning' : inv.status === 'ACCEPTED' ? 'success' : 'danger'}>
                          {inv.status === 'PENDING' ? 'Chờ xác nhận' : inv.status === 'ACCEPTED' ? 'Đã vào lớp' : 'Từ chối'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Exams Tab ── */}
          {tab === 'exams' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setShowAssignModal(true)}>
                  <BookOpen size={15} /> Giao đề thi
                </Button>
              </div>
              {cls.assignments.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Chưa có đề thi nào được giao</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cls.assignments.map(a => (
                    <div key={a.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen size={18} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{a.exam.title}</p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          {a.exam.subject && <span className="text-xs text-gray-500">{a.exam.subject.name}</span>}
                          <span className="text-xs text-gray-400">{a.exam.totalQuestions} câu · {a.exam.durationMinutes} phút</span>
                          {a.openAt && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <Clock size={11} /> Mở: {new Date(a.openAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          )}
                          {a.dueDate && (
                            <span className="text-xs text-orange-600 flex items-center gap-1">
                              <AlertTriangle size={11} /> Hạn: {new Date(a.dueDate).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          )}
                        </div>
                        {a.note && <p className="text-xs text-gray-500 mt-1 italic">"{a.note}"</p>}
                      </div>
                      <div className="text-xs text-gray-400 shrink-0 hidden sm:block">{new Date(a.assignedAt).toLocaleDateString('vi-VN')}</div>
                      <button onClick={() => handleRemoveExam(a.exam.id, a.exam.title)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors shrink-0">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Progress Tab ── */}
          {tab === 'progress' && (
            <div className="space-y-4">
              {loadingProgress ? (
                <div className="text-center py-12 text-gray-400">Đang tải dữ liệu...</div>
              ) : progressData.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <BarChart2 size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Chưa có đề thi nào được giao</p>
                </div>
              ) : (
                progressData.map(ep => {
                  const pct = ep.totalStudents > 0 ? Math.round((ep.submittedCount / ep.totalStudents) * 100) : 0;
                  const isExpanded = expandedExam === ep.examId;
                  const notSubmitted = ep.students.filter(s => s.status === 'not_started');
                  const submitted = ep.students.filter(s => s.status === 'submitted');

                  return (
                    <div key={ep.examId} className="border border-gray-200 rounded-2xl overflow-hidden">
                      {/* Exam header */}
                      <div className="p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedExam(isExpanded ? null : ep.examId)}>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen size={18} className="text-indigo-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900">{ep.examTitle}</p>
                            <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                              {ep.subjectName && <span>{ep.subjectName}</span>}
                              {ep.openAt && <span className="text-green-600">Mở: {new Date(ep.openAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</span>}
                              {ep.dueDate && <span className="text-orange-600">Hạn: {new Date(ep.dueDate).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</span>}
                            </div>
                            {ep.note && <p className="text-xs text-indigo-600 italic mt-0.5">📌 {ep.note}</p>}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600 font-medium">Tiến độ nộp bài</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle2 size={12} />{ep.submittedCount} đã nộp</span>
                              <span className="flex items-center gap-1 text-gray-400"><XCircle size={12} />{ep.totalStudents - ep.submittedCount} chưa làm</span>
                              {ep.avgScore !== null && <span className="flex items-center gap-1 font-bold text-indigo-600">TB: {formatScore(ep.avgScore)}</span>}
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-orange-400'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <p className="text-right text-xs text-gray-400 mt-0.5">{pct}%</p>
                        </div>
                      </div>

                      {/* Student list */}
                      {isExpanded && (
                        <div className="border-t border-gray-100">
                          {/* Chưa nộp */}
                          {notSubmitted.length > 0 && (
                            <div>
                              <div className="px-4 py-2 bg-orange-50 text-xs font-bold text-orange-700 flex items-center gap-1.5">
                                <XCircle size={12} /> Chưa làm ({notSubmitted.length})
                              </div>
                              {notSubmitted.map(s => (
                                <div key={s.studentId} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 hover:bg-gray-50">
                                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
                                    {s.fullName.charAt(0)}
                                  </div>
                                  <p className="flex-1 text-sm text-gray-700">{s.fullName}</p>
                                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">Chưa làm</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Đã nộp */}
                          {submitted.length > 0 && (
                            <div>
                              <div className="px-4 py-2 bg-green-50 text-xs font-bold text-green-700 flex items-center gap-1.5">
                                <CheckCircle2 size={12} /> Đã nộp ({submitted.length})
                              </div>
                              {submitted.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).map((s, idx) => (
                                <div key={s.studentId} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 hover:bg-gray-50">
                                  <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold shrink-0">{idx + 1}</div>
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
                                    {s.fullName.charAt(0)}
                                  </div>
                                  <p className="flex-1 text-sm text-gray-700">{s.fullName}</p>
                                  <div className="text-xs text-gray-400 hidden sm:block">
                                    {s.submittedAt ? new Date(s.submittedAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                                  </div>
                                  <div className="text-right shrink-0">
                                    {s.score !== null && (
                                      <>
                                        <p className={`text-sm font-black ${getScoreColor(s.score)}`}>{formatScore(s.score)}</p>
                                        <p className="text-xs text-gray-400">{s.correctCount}Đ/{s.wrongCount}S</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Assign Exam Modal */}
      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} title="Giao đề thi cho lớp" size="md">
        <form onSubmit={handleAssignExam} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn đề thi *</label>
            <select required value={assignForm.examId} onChange={e => setAssignForm({ ...assignForm, examId: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Chọn đề thi --</option>
              {myExams.filter(e => !cls.assignments.some(a => a.exam.id === e.id)).map(e => (
                <option key={e.id} value={e.id}>{e.title} {e.subject ? `(${e.subject.name})` : ''}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock size={13} className="inline mr-1 text-green-600" />Thời gian mở đề
              </label>
              <input type="datetime-local" value={assignForm.openAt} onChange={e => setAssignForm({ ...assignForm, openAt: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-gray-400 mt-0.5">Để trống = mở ngay</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <AlertTriangle size={13} className="inline mr-1 text-orange-500" />Hạn nộp bài
              </label>
              <input type="datetime-local" value={assignForm.dueDate} onChange={e => setAssignForm({ ...assignForm, dueDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú cho học sinh</label>
            <textarea value={assignForm.note} onChange={e => setAssignForm({ ...assignForm, note: e.target.value })} rows={2}
              placeholder="VD: Bài kiểm tra chương 3, cần ôn từ trang 45-60..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1" disabled={assigning}>{assigning ? 'Đang giao...' : 'Giao đề thi'}</Button>
            <Button type="button" variant="ghost" onClick={() => setShowAssignModal(false)}>Hủy</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Xóa lớp học" size="sm">
        <div className="px-6 py-4 space-y-4">
          <p className="text-gray-600 text-sm">Bạn chắc chắn muốn xóa lớp <strong>"{cls.name}"</strong>? Hành động này sẽ xóa toàn bộ thành viên và lời mời.</p>
          <div className="flex gap-3">
            <button onClick={handleDeleteClass} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm">Xóa lớp</button>
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
