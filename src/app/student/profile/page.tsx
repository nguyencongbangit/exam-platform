'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AvatarUploader from '@/components/ui/AvatarUploader';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { getRoleLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<{ id: string; name: string }[]>([]);

  const [info, setInfo] = useState({
    fullName: '', phone: '', avatar: '', dateOfBirth: '', schoolName: '',
    gradeId: '', targetScore: '', email: '', role: '', createdAt: '', studentCode: '',
    level: 'MEDIUM',
  });
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoError, setInfoError] = useState('');

  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingPw, setSavingPw] = useState(false);
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/me').then((r) => r.json()),
      fetch('/api/admin/grades').then((r) => r.json()),
    ]).then(([me, gs]) => {
      setInfo({
        fullName: me.fullName || '',
        phone: me.phone || '',
        avatar: me.avatar || '',
        email: me.email || '',
        role: me.role || '',
        createdAt: me.createdAt || '',
        studentCode: me.student?.studentCode || '',
        dateOfBirth: me.student?.dateOfBirth || '',
        schoolName: me.student?.schoolName || '',
        gradeId: me.student?.gradeId || '',
        targetScore: me.student?.targetScore != null ? String(me.student.targetScore) : '',
        level: me.student?.level || 'MEDIUM',
      });
      setGrades(gs || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSaveInfo(e: React.FormEvent) {
    e.preventDefault();
    setSavingInfo(true); setInfoError('');
    try {
      const res = await fetch('/api/me', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: info.fullName, phone: info.phone, avatar: info.avatar,
          dateOfBirth: info.dateOfBirth, schoolName: info.schoolName,
          gradeId: info.gradeId || null,
          targetScore: info.targetScore ? parseFloat(info.targetScore) : null,
          level: info.level,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setInfoError(data.error || 'Có lỗi xảy ra'); return; }
      toast.success('Đã lưu thông tin hồ sơ!');
    } catch { setInfoError('Không thể kết nối đến server'); }
    finally { setSavingInfo(false); }
  }

  async function handleSavePw(e: React.FormEvent) {
    e.preventDefault(); setPwError('');
    if (pw.newPassword !== pw.confirmPassword) { setPwError('Mật khẩu mới không khớp'); return; }
    setSavingPw(true);
    try {
      const res = await fetch('/api/me', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: info.fullName, currentPassword: pw.currentPassword, newPassword: pw.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPwError(data.error || 'Có lỗi xảy ra'); return; }
      toast.success('Đã đổi mật khẩu thành công!');
      setPw({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch { setPwError('Không thể kết nối đến server'); }
    finally { setSavingPw(false); }
  }

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-500 text-sm mt-1">{getRoleLabel(info.role)} · Tham gia {formatDate(info.createdAt)}</p>
      </div>

      {/* Ảnh đại diện */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Ảnh đại diện</h2></div>
        <CardBody className="flex flex-col items-center py-6">
          <AvatarUploader
            avatar={info.avatar}
            name={info.fullName}
            onChange={(base64) => setInfo({ ...info, avatar: base64 })}
          />
          {info.avatar !== (undefined as any) && (
            <Button
              type="button"
              size="sm"
              variant="primary"
              className="mt-4"
              disabled={savingInfo}
              onClick={async () => {
                setSavingInfo(true);
                try {
                  const res = await fetch('/api/me', {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName: info.fullName, avatar: info.avatar }),
                  });
                  if (res.ok) toast.success('Đã lưu ảnh đại diện!');
                } finally { setSavingInfo(false); }
              }}
            >
              {savingInfo ? 'Đang lưu...' : 'Lưu ảnh'}
            </Button>
          )}
        </CardBody>
      </Card>

      {/* Thông tin tài khoản */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Thông tin tài khoản</h2></div>
        <CardBody className="space-y-3 text-sm">
          <div className="flex gap-2"><span className="text-gray-500 w-32">Email:</span><span className="font-medium">{info.email}</span></div>
          <div className="flex gap-2"><span className="text-gray-500 w-32">Mã học sinh:</span><span className="font-medium">{info.studentCode || '—'}</span></div>
          <div className="flex gap-2"><span className="text-gray-500 w-32">Vai trò:</span><span className="font-medium">{getRoleLabel(info.role)}</span></div>
        </CardBody>
      </Card>

      {/* Chỉnh sửa thông tin */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Chỉnh sửa hồ sơ</h2></div>
        <CardBody>
          <form onSubmit={handleSaveInfo} className="space-y-4">
            {infoError && <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg border border-red-200">{infoError}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                <input type="text" required value={info.fullName} onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input type="tel" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0901234567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                <input type="date" value={info.dateOfBirth} onChange={(e) => setInfo({ ...info, dateOfBirth: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trường học</label>
                <input type="text" value={info.schoolName} onChange={(e) => setInfo({ ...info, schoolName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên trường" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                <select value={info.gradeId} onChange={(e) => setInfo({ ...info, gradeId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">— Chọn lớp —</option>
                  {grades.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điểm mục tiêu (0–10)</label>
                <input type="number" min="0" max="10" step="0.5" value={info.targetScore}
                  onChange={(e) => setInfo({ ...info, targetScore: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="8.5" />
              </div>
            </div>

            {/* Trình độ luyện tập */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trình độ luyện tập</label>
              <p className="text-xs text-gray-500 mb-3">Hệ thống sẽ chỉ hiển thị các chủ đề có câu hỏi phù hợp với trình độ bạn chọn.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'EASY',   label: 'Cơ bản',   desc: 'Câu hỏi dễ',           color: 'green',  icon: '🌱' },
                  { value: 'MEDIUM', label: 'Trung bình', desc: 'Dễ + Trung bình',      color: 'blue',   icon: '📘' },
                  { value: 'HARD',   label: 'Nâng cao',  desc: 'Tất cả câu hỏi',        color: 'purple', icon: '🚀' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setInfo({ ...info, level: opt.value })}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all ${
                      info.level === opt.value
                        ? opt.color === 'green'  ? 'border-green-500 bg-green-50 text-green-700'
                        : opt.color === 'blue'   ? 'border-blue-500 bg-blue-50 text-blue-700'
                        :                          'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs opacity-75">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={savingInfo}>{savingInfo ? 'Đang lưu...' : 'Lưu thông tin'}</Button>
          </form>
        </CardBody>
      </Card>

      {/* Đổi mật khẩu */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Đổi mật khẩu</h2></div>
        <CardBody>
          <form onSubmit={handleSavePw} className="space-y-4">
            {pwError && <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg border border-red-200">{pwError}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại *</label>
              <input type="password" required value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới * (tối thiểu 6 ký tự)</label>
              <input type="password" required minLength={6} value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới *</label>
              <input type="password" required value={pw.confirmPassword} onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
            </div>
            <Button type="submit" variant="secondary" disabled={savingPw}>{savingPw ? 'Đang đổi...' : 'Đổi mật khẩu'}</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
