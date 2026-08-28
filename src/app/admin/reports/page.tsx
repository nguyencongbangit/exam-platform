'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { BarChart2, Users, FileText, HelpCircle } from 'lucide-react';

export default function AdminReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Báo cáo hệ thống</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: stats?.totalUsers || 0, icon: Users },
          { label: 'Học sinh', value: stats?.totalStudents || 0, icon: Users },
          { label: 'Đề thi', value: stats?.totalExams || 0, icon: FileText },
          { label: 'Lượt làm bài', value: stats?.totalAttempts || 0, icon: BarChart2 },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardBody className="text-center">
              <Icon size={24} className="text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody>
          <h3 className="font-bold text-gray-900 mb-4">Tổng quan hệ thống</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Giáo viên</span>
              <span className="font-bold">{stats?.totalTeachers || 0}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Câu hỏi trong ngân hàng</span>
              <span className="font-bold">{stats?.totalQuestions || 0}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Lượt làm bài hoàn thành</span>
              <span className="font-bold">{stats?.totalAttempts || 0}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
