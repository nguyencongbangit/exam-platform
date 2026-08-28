'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ROLES = [
  { value: 'STUDENT', label: 'Học sinh', icon: '🎓', desc: 'Tôi muốn ôn luyện và thi thử' },
  { value: 'PARENT', label: 'Phụ huynh', icon: '👨‍👩‍👧', desc: 'Tôi muốn theo dõi kết quả con' },
  { value: 'TEACHER', label: 'Giáo viên', icon: '👨‍🏫', desc: 'Tôi muốn tạo đề và quản lý học sinh' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('STUDENT');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Vui lòng nhập họ tên';
    if (!form.email) errs.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email không hợp lệ';
    if (!form.password) errs.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) errs.password = 'Mật khẩu ít nhất 6 ký tự';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Mật khẩu không khớp';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Đăng ký thất bại');
        setLoading(false);
        return;
      }

      toast.success('Đăng ký thành công! Đang đăng nhập...');
      await signIn('credentials', { email: form.email, password: form.password, redirect: false });

      if (role === 'STUDENT') router.push('/student/dashboard');
      else if (role === 'TEACHER') router.push('/teacher/dashboard');
      else if (role === 'PARENT') router.push('/parent/dashboard');
      else router.push('/');
    } catch {
      toast.error('Có lỗi xảy ra');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-700 font-bold text-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            Ôn Luyện Đề
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-6 mb-2">Tạo tài khoản</h1>
          <p className="text-gray-500">Bắt đầu hành trình học tập cùng chúng tôi</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {step === 1 ? (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Bạn là ai?</h2>
              <div className="space-y-3 mb-6">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${role === r.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-3xl">{r.icon}</span>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{r.label}</div>
                      <div className="text-sm text-gray-500">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                Tiếp theo
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button type="button" onClick={() => setStep(1)} className="text-blue-600 text-sm font-medium hover:underline">← Quay lại</button>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">Đăng ký với vai trò: <strong>{ROLES.find(r => r.value === role)?.label}</strong></span>
              </div>

              <Input
                id="fullName"
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                error={errors.fullName}
              />
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
              <Input
                id="password"
                type="password"
                label="Mật khẩu"
                placeholder="Ít nhất 6 ký tự"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
              />

              <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
                Đăng ký
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
