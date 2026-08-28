'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { Users } from 'lucide-react';
import { formatScore, getScoreColor } from '@/lib/utils';

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users?limit=50')
      .then((r) => r.json())
      .then((d) => {
        const studentUsers = (d.users || []).filter((u: any) => u.role === 'STUDENT');
        setStudents(studentUsers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Danh sách học sinh</h1>

      <Card>
        <CardBody className="p-0">
          {students.length === 0 ? (
            <EmptyState icon={Users} title="Chưa có học sinh nào" className="py-12" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Học sinh</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Tham gia</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">
                            {s.fullName?.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">{s.fullName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{s.email}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {s.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-500">
                        {new Date(s.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
