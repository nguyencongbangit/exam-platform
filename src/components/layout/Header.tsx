'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import Button from '../ui/Button';

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (session) {
      fetch('/api/me').then((r) => r.json()).then((me) => setAvatar(me.avatar || '')).catch(() => {});
    }
  }, [session]);

  const getDashboardLink = () => {
    if (!session) return '/login';
    switch (session.user.role) {
      case 'STUDENT': return '/student/dashboard';
      case 'TEACHER': return '/teacher/dashboard';
      case 'PARENT': return '/parent/dashboard';
      case 'ADMIN': return '/admin';
      default: return '/';
    }
  };

  const getProfileLink = () => {
    switch (session?.user.role) {
      case 'TEACHER': return '/teacher/profile';
      case 'PARENT': return '/parent/profile';
      case 'ADMIN': return '/admin/profile';
      default: return '/student/profile';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-blue-700">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="hidden sm:block">Ôn Luyện Đề</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/exams" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              Vào Thi
            </Link>
            <Link href="/subjects" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              Môn học
            </Link>
            <Link href="/game" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
              🎮 Trò Chơi
            </Link>
            {session && (
              <Link href={getDashboardLink()} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                    {avatar ? (
                      <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {session.user.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-500">Đăng nhập với</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <Link
                      href={getProfileLink()}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User size={16} />
                      Hồ sơ
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => { signOut({ callbackUrl: '/' }); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Đăng ký</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
