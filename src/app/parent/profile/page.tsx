'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AvatarUploader from '@/components/ui/AvatarUploader';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { getRoleLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ParentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({ fullName: '', phone: '', avatar: '', email: '', role: '', createdAt: '' });
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoError, setInfoError] = useState('');
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingPw, setSavingPw] = useState(false);
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    fetch('/api/me').then((r) => r.json()).then((me) => {
      setInfo({ fullName: me.fullName || '', phone: me.phone || '', avatar: me.avatar || '', email: me.email || '', role: me.role || '', createdAt: me.createdAt || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSaveInfo(e: React.FormEvent) {
    e.preventDefault(); setSavingInfo(true); setInfoError('');
    try {
      const res = await fetch('/api/me', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: info.fullName, phone: info.phone, avatar: info.avatar }),
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

      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Ảnh đại diện</h2></div>
        <CardBody className="flex flex-col items-center py-6">
          <AvatarUploader avatar={info.avatar} name={info.fullName} onChange={(b) => setInfo({ ...info, avatar: b })} />
        </CardBody>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-800">Thông tin tài khoản</h2></div>
        <CardBody className="text-sm space-y-3">
          <div className="flex gap-2"><span className="text-gray-500 w-32">Email:</span><span className="font-medium">{info.email}</span></div>
          <div className="flex gap-2"><span className="text-gray-500 w-32">Vai trò:</span><span className="font-medium">{getRoleLabel(info.role)}</span></div>
        </CardBody>
      </Card>

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
            </div>
            <Button type="submit" disabled={savingInfo}>{savingInfo ? 'Đang lưu...' : 'Lưu thông tin'}</Button>
          </form>
        </CardBody>
      </Card>

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
