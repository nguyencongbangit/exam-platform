'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileBarChart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/parent/children', label: 'Con em', icon: Users },
  { href: '/parent/reports', label: 'Báo cáo', icon: FileBarChart },
  { href: '/parent/profile', label: 'Hồ sơ', icon: User },
];

export default function ParentSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Phụ huynh</h2>
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
