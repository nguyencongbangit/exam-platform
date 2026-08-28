'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { BookOpen, Eye, EyeOff, MonitorSmartphone } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocal, setIsLocal] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/is-local').then(r => r.json()).then(d => setIsLocal(d.isLocal)).catch(() => setIsLocal(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Vui lòng nhập email';
    if (!password) errs.password = 'Vui lòng nhập mật khẩu';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);

    if (result?.error === 'LAN_STUDENT_ONLY') {
      toast.error('Truy cập từ mạng LAN chỉ dành cho tài khoản học sinh');
    } else if (result?.error) {
      toast.error('Email hoặc mật khẩu không đúng');
    } else {
      toast.success('Đăng nhập thành công!');
      // Redirect based on role from session
      const res = await fetch('/api/auth/session');
      const session = await res.json();
      const role = session?.user?.role;
      if (role === 'STUDENT') router.push('/student/dashboard');
      else if (role === 'TEACHER') router.push('/teacher/dashboard');
      else if (role === 'PARENT') router.push('/parent/dashboard');
      else if (role === 'ADMIN') router.push('/admin');
      else router.push('/');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-700 font-bold text-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            Ôn Luyện Đề
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-6 mb-2">Chào mừng trở lại!</h1>
          <p className="text-gray-500">Đăng nhập để tiếp tục học tập</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <div className="relative">
              <Input
                id="password"
                type={showPass ? 'text' : 'password'}
                label="Mật khẩu"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Đăng nhập
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {isLocal === false && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2 text-xs text-blue-700">
              <MonitorSmartphone size={14} className="shrink-0 mt-0.5" />
              <span>Đang truy cập qua mạng LAN — chỉ tài khoản <strong>học sinh</strong> được đăng nhập.</span>
            </div>
          )}

          {isLocal === true && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700 mb-2">Tài khoản demo:</p>
              <p>🎓 Học sinh: student@exam.vn / Student@123</p>
              <p>👨‍🏫 Giáo viên: teacher@exam.vn / Teacher@123</p>
              <p>👨‍👩‍👧 Phụ huynh: parent@exam.vn / Parent@123</p>
              <p>⚙️ Admin: admin@exam.vn / Admin@123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
