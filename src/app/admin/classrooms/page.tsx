'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { School, Plus, Users, BookOpen, UserCheck, Copy, Check, Search } from 'lucide-react';
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
  teacher: { user: { fullName: string } } | null;
  _count: { members: number; parents: number };
}

export default function AdminClassroomsPage() {
  const router = useRouter();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = (s = search) => {
    setLoading(true);
    const params = s ? `?search=${encodeURIComponent(s)}` : '';
    fetch(`/api/admin/classrooms${params}`).then(r => r.json()).then(d => { setClassrooms(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/classrooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
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

  if (loading && classrooms.length === 0) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Quản lý lớp học</h1>
          <p className="text-gray-500 text-sm mt-1">{classrooms.length} lớp học</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={16} /> Tạo lớp mới
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && load(search)}
            placeholder="Tìm theo tên lớp..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <Button variant="ghost" onClick={() => load(search)}>Tìm</Button>
        {search && <Button variant="ghost" onClick={() => { setSearch(''); load(''); }}>Xóa lọc</Button>}
      </div>

      {classrooms.length === 0 ? (
        <div className="text-center py-20">
          <School size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-600 mb-2">Chưa có lớp học nào</h3>
          <p className="text-gray-400 text-sm mb-6">Tạo lớp và phân công giáo viên chủ nhiệm</p>
          <Button onClick={() => setShowModal(true)}>Tạo lớp đầu tiên</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {classrooms.map(cls => (
            <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                  <School size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg leading-tight">{cls.name}</h3>
                {cls.description && <p className="text-indigo-100 text-sm mt-1 line-clamp-2">{cls.description}</p>}
              </div>

              {/* Code */}
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mã lớp</p>
                  <p className="font-mono font-black text-gray-800 text-xl tracking-widest">{cls.code}</p>
                </div>
                <button onClick={() => copyCode(cls.code, cls.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50">
                  {copiedId === cls.id ? <><Check size={13} className="text-green-500" />Đã sao chép</> : <><Copy size={13} />Sao chép</>}
                </button>
              </div>

              {/* Info */}
              <div className="px-5 py-3 space-y-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck size={14} className="text-indigo-400 shrink-0" />
                  <span className="text-gray-600">
                    {cls.teacher ? <span className="font-medium">{cls.teacher.user.fullName}</span> : <span className="text-orange-500 italic">Chưa có giáo viên chủ nhiệm</span>}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Users size={13} className="text-blue-400" />{cls._count.members} học sinh</span>
                  <span className="flex items-center gap-1.5"><BookOpen size={13} className="text-purple-400" />{cls._count.parents} phụ huynh</span>
                </div>
              </div>

              <div className="px-5 py-3">
                <button onClick={() => router.push(`/admin/classrooms/${cls.id}`)}
                  className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  Quản lý →
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="VD: Lớp 7A1, Lớp 6B..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Ghi chú..." />
          </div>
          <p className="text-xs text-gray-400">Mã lớp sẽ được tạo tự động. Có thể phân công giáo viên sau.</p>
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1" disabled={submitting}>{submitting ? 'Đang tạo...' : 'Tạo lớp'}</Button>
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Hủy</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
