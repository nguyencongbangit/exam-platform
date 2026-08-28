'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, GraduationCap, List, HelpCircle, FileText, BarChart2, Settings, ScrollText, Sparkles, User, School } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Người dùng', icon: Users },
  { href: '/admin/classrooms', label: 'Quản lý lớp', icon: School },
  { href: '/admin/subjects', label: 'Môn học', icon: BookOpen },
  { href: '/admin/grades', label: 'Trình độ', icon: GraduationCap },
  { href: '/admin/topics', label: 'Chủ đề', icon: List },
  { href: '/admin/questions', label: 'Câu hỏi', icon: HelpCircle },
  { href: '/admin/exams', label: 'Đề thi', icon: FileText },
  { href: '/admin/ai', label: 'Sinh câu hỏi AI', icon: Sparkles },
  { href: '/admin/reports', label: 'Báo cáo', icon: BarChart2 },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
  { href: '/admin/logs', label: 'Nhật ký', icon: ScrollText },
  { href: '/admin/profile', label: 'Hồ sơ', icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Quản trị viên</h2>
      </div>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={cn('sidebar-link', pathname === href && 'active')}>
            <Icon size={18} />{label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
