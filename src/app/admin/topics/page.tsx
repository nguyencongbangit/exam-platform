'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';

export default function AdminTopicsPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/topics').then(r => r.json()).then(d => { setTopics(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Chủ đề</h1>
        <Button>+ Thêm chủ đề</Button>
      </div>
      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50"><th className="text-left px-6 py-3 font-semibold text-gray-600">Tên chủ đề</th><th className="text-left px-4 py-3 font-semibold text-gray-600">Môn / Lớp</th><th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th></tr></thead>
            <tbody>
              {topics.map(t => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{t.name}</td>
                  <td className="px-4 py-4 text-gray-500">{t.subject?.name} {t.grade ? `• ${t.grade.name}` : ''}</td>
                  <td className="px-4 py-4 text-center"><Button variant="ghost" size="xs">Sửa</Button></td>
                </tr>
              ))}
              {topics.length === 0 && <tr><td colSpan={3} className="text-center py-8 text-gray-400">Chưa có chủ đề nào</td></tr>}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
