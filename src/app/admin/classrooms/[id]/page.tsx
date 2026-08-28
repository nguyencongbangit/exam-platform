'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Users, UserCheck, Eye, UserMinus, Plus, Trash2, Copy, Check, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';

interface Teacher { id: string; user: { id: string; fullName: string; email: string } }
interface Member {
  studentId: string; joinedAt: string;
  student: { studentCode: string; user: { fullName: string; email: string; phone?: string }; grade?: { name: string }; attempts: { score: number | null }[] };
}
interface ClassParentEntry {
  parentId: string; addedAt: string;
  parent: { user: { fullName: string; email: string; phone?: string } };
}
interface ClassDetail {
  id: string; name: string; code: string; description: string | null; createdAt: string;
  teacher: { id: string; user: { id: string; fullName: string; email: string } } | null;
  members: Member[];
  parents: ClassParentEntry[];
}

type Tab = 'students' | 'teacher' | 'parents';

export default function AdminClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cls, setCls] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('students');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [copied, setCopied] = useState(false);

  // Edit class
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);

  // Add student
  const [studentQuery, setStudentQuery] = useState('');
  const [addingStudent, setAddingStudent] = useState(false);

  // Assign teacher
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [assigningTeacher, setAssigningTeacher] = useState(false);

  // Add parent
  const [parentQuery, setParentQuery] = useState('');
  const [addingParent, setAddingParent] = useState(false);

  // Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const load = useCallback(() => {
    fetch(`/api/admin/classrooms/${id}`).then(r => r.json()).then(d => { setCls(d); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch('/api/admin/users?role=TEACHER&limit=100').then(r => r.json()).then(d => {
      // d.users is array of User, we need Teacher records
      fetch('/api/admin/users?role=TEACHER&limit=100').then(r => r.json()).then(data => {
        setTeachers((data.users || []).map((u: any) => ({ id: u.teacherId || u.id, user: u })));
      });
    });
    // Actually fetch teacher list differently
    fetch('/api/admin/users?role=TEACHER&limit=100').then(r => r.json()).then(d => {
      setTeachers(d.users || []);
    });
  }, []);

  const copyCode = () => { navigator.clipboard.writeText(cls!.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/classrooms/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
      if (res.ok) { toast.success('Đã cập nhật lớp'); setShowEditModal(false); load(); }
      else { const d = await res.json(); toast.error(d.error); }
    } finally { setSaving(false); }
  };

  const handleAddStudent = async () => {
    if (!studentQuery.trim()) return;
    setAddingStudent(true);
    try {
      const res = await fetch(`/api/admin/classrooms/${id}/students`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: studentQuery.trim() }) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success(`Đã thêm ${data.studentName} vào lớp!`);
      setStudentQuery('');
      load();
    } finally { setAddingStudent(false); }
  };

  const handleRemoveStudent = async (studentId: string, name: string) => {
    if (!confirm(`Xóa ${name} khỏi lớp?`)) return;
    const res = await fetch(`/api/admin/classrooms/${id}/students`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId }) });
    if (res.ok) { toast.success(`Đã xóa ${name}`); load(); }
  };

  const handleAssignTeacher = async () => {
    setAssigningTeacher(true);
    try {
      // Find the actual teacher record id
      const teacherUser = teachers.find(t => t.user?.id === selectedTeacherId || t.id === selectedTeacherId);
      // We need teacher.id from Teacher model, not User.id
      // Fetch teacher by userId
      const res = await fetch(`/api/admin/classrooms/${id}/teacher`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherUserId: selectedTeacherId || null }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success(selectedTeacherId ? 'Đã phân công giáo viên chủ nhiệm' : 'Đã gỡ giáo viên chủ nhiệm');
      load();
    } finally { setAssigningTeacher(false); }
  };

  const handleAddParent = async () => {
    if (!parentQuery.trim()) return;
    setAddingParent(true);
    try {
      const res = await fetch(`/api/admin/classrooms/${id}/parents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: parentQuery.trim() }) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success(`Đã thêm ${data.parentName} theo dõi lớp!`);
      setParentQuery('');
      load();
    } finally { setAddingParent(false); }
  };

  const handleRemoveParent = async (parentId: string, name: string) => {
    if (!confirm(`Xóa ${name} khỏi danh sách theo dõi?`)) return;
    const res = await fetch(`/api/admin/classrooms/${id}/parents`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ parentId }) });
    if (res.ok) { toast.success(`Đã xóa ${name}`); load(); }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/classrooms/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Đã xóa lớp'); router.push('/admin/classrooms'); }
    else toast.error('Có lỗi xảy ra');
  };

  if (loading) return <PageLoader />;
  if (!cls) return <div className="text-center py-20 text-gray-500">Không tìm thấy lớp học</div>;

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'students', label: '👥 Học sinh', count: cls.members.length },
    { key: 'teacher', label: '👨‍🏫 Giáo viên CN', count: cls.teacher ? 1 : 0 },
    { key: 'parents', label: '👪 Phụ huynh', count: cls.parents.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button onClick={() => router.push('/admin/classrooms')} className="mt-1 p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-gray-900">{cls.name}</h1>
            <button onClick={() => { setEditForm({ name: cls.name, description: cls.description || '' }); setShowEditModal(true); }}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
              <Edit2 size={16} />
            </button>
          </div>
          {cls.description && <p className="text-gray-500 text-sm mt-0.5">{cls.description}</p>}
        </div>
        {/* Code */}
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl shrink-0">
          <div>
            <p className="text-xs text-indigo-500 font-medium">Mã lớp</p>
            <p className="font-mono font-black text-indigo-800 text-xl tracking-widest">{cls.code}</p>
          </div>
          <button onClick={copyCode} className="p-1.5 hover:bg-indigo-100 rounded-lg">
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-indigo-500" />}
          </button>
        </div>
        <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 mt-1">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '👥', label: 'Học sinh', value: cls.members.length, color: 'bg-blue-50 text-blue-600' },
          { icon: '👨‍🏫', label: 'Giáo viên CN', value: cls.teacher ? cls.teacher.user.fullName : '—', color: 'bg-purple-50 text-purple-600', small: true },
          { icon: '👪', label: 'Phụ huynh theo dõi', value: cls.parents.length, color: 'bg-green-50 text-green-600' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border border-gray-100 shadow-sm p-4 text-center ${s.color} bg-opacity-50`} style={{ background: 'white' }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`${s.small ? 'text-sm font-bold' : 'text-2xl font-black'} text-gray-900 truncate`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors ${tab === t.key ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Students tab */}
          {tab === 'students' && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <input type="text" value={studentQuery} onChange={e => setStudentQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddStudent()}
                  placeholder="Mã học sinh hoặc email..." className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <Button onClick={handleAddStudent} disabled={addingStudent || !studentQuery.trim()} className="flex items-center gap-2">
                  <Plus size={15} />{addingStudent ? 'Đang thêm...' : 'Thêm'}
                </Button>
              </div>
              {cls.members.length === 0 ? (
                <div className="text-center py-8 text-gray-400"><Users size={36} className="mx-auto mb-2 opacity-30" /><p>Chưa có học sinh nào</p></div>
              ) : (
                <div className="space-y-2">
                  {cls.members.map((m, idx) => {
                    const scores = m.student.attempts.filter(a => a.score !== null).map(a => a.score!);
                    const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : null;
                    return (
                      <div key={m.studentId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 w-6 text-center">{idx + 1}</span>
                        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                          {m.student.user.fullName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-gray-900">{m.student.user.fullName}</p>
                            {m.student.grade && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{m.student.grade.name}</span>}
                          </div>
                          <p className="text-xs text-gray-500">{m.student.studentCode} · {m.student.user.email}</p>
                        </div>
                        {avg && <div className="text-center shrink-0"><p className="text-sm font-black text-indigo-600">{avg}</p><p className="text-xs text-gray-400">TB</p></div>}
                        <button onClick={() => handleRemoveStudent(m.studentId, m.student.user.fullName)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 shrink-0">
                          <UserMinus size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Teacher tab */}
          {tab === 'teacher' && (
            <div className="space-y-5">
              {/* Current teacher */}
              <div className={`p-5 rounded-xl border-2 ${cls.teacher ? 'border-purple-200 bg-purple-50' : 'border-dashed border-gray-200 bg-gray-50'}`}>
                <p className="text-sm font-semibold text-gray-600 mb-2">Giáo viên chủ nhiệm hiện tại</p>
                {cls.teacher ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">
                      {cls.teacher.user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{cls.teacher.user.fullName}</p>
                      <p className="text-sm text-gray-500">{cls.teacher.user.email}</p>
                    </div>
                    <Badge variant="success" className="ml-auto">Đang phụ trách</Badge>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">Chưa có giáo viên chủ nhiệm</p>
                )}
              </div>

              {/* Assign */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phân công / thay đổi giáo viên chủ nhiệm</label>
                <div className="flex gap-3">
                  <select value={selectedTeacherId} onChange={e => setSelectedTeacherId(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option value="">-- Gỡ giáo viên chủ nhiệm --</option>
                    {teachers.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.fullName} ({t.email})</option>
                    ))}
                  </select>
                  <Button onClick={handleAssignTeacher} disabled={assigningTeacher} className="flex items-center gap-2">
                    <UserCheck size={15} />{assigningTeacher ? 'Đang lưu...' : 'Lưu'}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Chọn trống để gỡ giáo viên chủ nhiệm khỏi lớp.</p>
              </div>
            </div>
          )}

          {/* Parents tab */}
          {tab === 'parents' && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 mb-1">Thêm phụ huynh theo dõi lớp</p>
                <p className="text-xs text-green-600 mb-3">Nhập email hoặc tên của tài khoản phụ huynh đã đăng ký</p>
                <div className="flex gap-3">
                  <input type="text" value={parentQuery} onChange={e => setParentQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddParent()}
                    placeholder="Email hoặc tên phụ huynh..." className="flex-1 px-4 py-2.5 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
                  <Button onClick={handleAddParent} disabled={addingParent || !parentQuery.trim()} className="flex items-center gap-2">
                    <Plus size={15} />{addingParent ? 'Đang thêm...' : 'Thêm'}
                  </Button>
                </div>
              </div>

              {cls.parents.length === 0 ? (
                <div className="text-center py-8 text-gray-400"><Eye size={36} className="mx-auto mb-2 opacity-30" /><p>Chưa có phụ huynh theo dõi lớp này</p></div>
              ) : (
                <div className="space-y-2">
                  {cls.parents.map(cp => (
                    <div key={cp.parentId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
                        {cp.parent.user.fullName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{cp.parent.user.fullName}</p>
                        <p className="text-xs text-gray-500">{cp.parent.user.email}{cp.parent.user.phone ? ` · ${cp.parent.user.phone}` : ''}</p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 hidden sm:block">Thêm {new Date(cp.addedAt).toLocaleDateString('vi-VN')}</span>
                      <button onClick={() => handleRemoveParent(cp.parentId, cp.parent.user.fullName)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 shrink-0">
                        <UserMinus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Sửa thông tin lớp" size="md">
        <form onSubmit={handleEdit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên lớp *</label>
            <input type="text" required value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</Button>
            <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>Hủy</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Xóa lớp học" size="sm">
        <div className="px-6 py-4 space-y-4">
          <p className="text-gray-600 text-sm">Bạn chắc chắn muốn xóa lớp <strong>"{cls.name}"</strong>? Tất cả dữ liệu thành viên và phụ huynh theo dõi sẽ bị xóa.</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm">Xóa lớp</button>
            <Button variant="ghost" className="flex-1" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
