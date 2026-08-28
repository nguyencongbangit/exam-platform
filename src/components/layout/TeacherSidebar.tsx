'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, HelpCircle, FileText, Users, BarChart2, User, School } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/classes', label: 'Lớp học', icon: School },
  { href: '/teacher/questions', label: 'Câu hỏi', icon: HelpCircle },
  { href: '/teacher/exams', label: 'Đề thi', icon: FileText },
  { href: '/teacher/students', label: 'Học sinh', icon: Users },
  { href: '/teacher/reports', label: 'Báo cáo', icon: BarChart2 },
  { href: '/teacher/profile', label: 'Hồ sơ', icon: User },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Giáo viên</h2>
      </div>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={cn('sidebar-link', pathname.startsWith(href) && 'active')}>
            <Icon size={18} />{label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
