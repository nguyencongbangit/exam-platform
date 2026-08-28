'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Plus, BookOpen, Clock, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';

interface Classroom {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: string;
  _count: { members: number; invitations: number };
  assignments: { exam: { id: string; title: string } }[];
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/teacher/classes').then(r => r.json()).then(d => { setClasses(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/teacher/classes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Lỗi tạo lớp'); return; }
      toast.success(`Đã tạo lớp "${data.name}"!`);
      setShowModal(false);
      setForm({ name: '', description: '' });
      load();
    } finally { setSubmitting(false); }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Lớp học của tôi</h1>
          <p className="text-gray-500 text-sm mt-1">{classes.length} lớp đang quản lý</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={16} /> Tạo lớp mới
        </Button>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">Chưa có lớp học nào</h3>
          <p className="text-gray-500 text-sm mb-6">Tạo lớp đầu tiên để quản lý học sinh và giao đề thi</p>
          <Button onClick={() => setShowModal(true)}>Tạo lớp ngay</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {classes.map(cls => (
            <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  {cls._count.invitations > 0 && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      {cls._count.invitations} chờ
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{cls.name}</h3>
                {cls.description && <p className="text-blue-100 text-sm line-clamp-2">{cls.description}</p>}
              </div>

              {/* Code */}
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mã lớp</p>
                  <p className="font-mono font-black text-gray-800 text-lg tracking-widest">{cls.code}</p>
                </div>
                <button onClick={() => copyCode(cls.code, cls.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  {copiedId === cls.id ? <><Check size={13} className="text-green-500" /> Đã sao chép</> : <><Copy size={13} /> Sao chép</>}
                </button>
              </div>

              {/* Stats */}
              <div className="px-5 py-3 flex items-center gap-4 text-sm text-gray-600 border-b border-gray-100">
                <span className="flex items-center gap-1.5"><Users size={14} className="text-blue-400" />{cls._count.members} học sinh</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-indigo-400" />{cls.assignments.length} đề thi</span>
                <span className="flex items-center gap-1.5 ml-auto text-xs text-gray-400">
                  <Clock size={12} />{new Date(cls.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>

              {/* Actions */}
              <div className="px-5 py-3">
                <button onClick={() => router.push(`/teacher/classes/${cls.id}`)}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  Quản lý lớp →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Tạo lớp học mới" size="md">
        <form onSubmit={handleCreate} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên lớp *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Lớp Toán 7A, Tiếng Anh K6..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Ghi chú về lớp học..." />
          </div>
          <p className="text-xs text-gray-400">Mã lớp sẽ được tạo tự động để học sinh tham gia.</p>
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1" disabled={submitting}>{submitting ? 'Đang tạo...' : 'Tạo lớp'}</Button>
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Hủy</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
