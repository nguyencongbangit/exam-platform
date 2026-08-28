'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Users, GraduationCap, HelpCircle, FileText, BarChart2, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const cards = [
    { label: 'Tổng người dùng', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', href: '/admin/users' },
    { label: 'Học sinh', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-50', href: '/admin/users' },
    { label: 'Giáo viên', value: stats?.totalTeachers || 0, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50', href: '/admin/users' },
    { label: 'Câu hỏi', value: stats?.totalQuestions || 0, icon: HelpCircle, color: 'text-orange-600', bg: 'bg-orange-50', href: '/admin/questions' },
    { label: 'Đề thi', value: stats?.totalExams || 0, icon: FileText, color: 'text-pink-600', bg: 'bg-pink-50', href: '/admin/exams' },
    { label: 'Lượt làm bài', value: stats?.totalAttempts || 0, icon: BarChart2, color: 'text-teal-600', bg: 'bg-teal-50', href: '/admin/reports' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Dashboard Quản trị</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}>
            <Card hover>
              <CardBody className="flex items-center gap-4">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{value.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h3 className="font-bold text-gray-900 mb-4">Quản lý hệ thống</h3>
            <div className="space-y-2">
              {[
                { label: 'Quản lý người dùng', href: '/admin/users', icon: '👥' },
                { label: 'Quản lý môn học', href: '/admin/subjects', icon: '📚' },
                { label: 'Quản lý lớp học', href: '/admin/grades', icon: '🎓' },
                { label: 'Quản lý chủ đề', href: '/admin/topics', icon: '📋' },
                { label: 'Xem nhật ký hệ thống', href: '/admin/logs', icon: '📜' },
                { label: 'Cài đặt hệ thống', href: '/admin/settings', icon: '⚙️' },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                  <span>{icon}</span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-bold text-gray-900 mb-4">Thống kê nhanh</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Đề thi đã xuất bản</span>
                <span className="font-bold text-gray-900">{stats?.totalExams || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Tổng lượt làm bài</span>
                <span className="font-bold text-gray-900">{stats?.totalAttempts || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Tổng câu hỏi</span>
                <span className="font-bold text-gray-900">{stats?.totalQuestions || 0}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
