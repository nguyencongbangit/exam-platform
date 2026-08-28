'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, XCircle, Bookmark, Trophy, Map, User, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/history', label: 'Lịch sử làm bài', icon: ClipboardList },
  { href: '/student/wrong-questions', label: 'Câu sai', icon: XCircle },
  { href: '/student/bookmarks', label: 'Câu đã lưu', icon: Bookmark },
  { href: '/student/achievements', label: 'Thành tích', icon: Trophy },
  { href: '/student/learning-path', label: 'Lộ trình học', icon: Map },
  { href: '/student/games', label: 'Trò chơi', icon: Gamepad2 },
  { href: '/student/profile', label: 'Hồ sơ', icon: User },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Học sinh</h2>
      </div>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'sidebar-link',
              pathname === href && 'active'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
