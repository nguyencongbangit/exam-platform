'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Users } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

export default function ChildrenPage() {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/parent/children')
      .then((r) => r.json())
      .then((d) => { setChildren(d?.children || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Con em</h1>

      {children.length === 0 ? (
        <EmptyState icon={Users} title="Chưa có con em nào" description="Liên hệ quản trị viên để liên kết tài khoản" />
      ) : (
        <div className="space-y-4">
          {children.map((child: any) => (
            <Card key={child.id}>
              <CardBody className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-700">
                  {child.user?.fullName?.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">{child.user?.fullName}</p>
                  <p className="text-gray-500 text-sm">{child.user?.email}</p>
                  <p className="text-gray-500 text-sm">{child.grade?.name} • {child.schoolName || 'Chưa cập nhật trường'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Mã học sinh</p>
                  <p className="font-mono font-bold text-gray-900">{child.studentCode}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
