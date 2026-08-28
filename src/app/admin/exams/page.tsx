'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { getExamTypeLabel, formatDate } from '@/lib/utils';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/exams?page=${page}&limit=20`)
      .then(r => r.json())
      .then(d => { setExams(d.exams || []); setTotal(d.total || 0); setLoading(false); })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Tất cả đề thi ({total})</h1>
        <Link href="/teacher/exams/create"><Button>+ Tạo đề thi</Button></Link>
      </div>
      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Tiêu đề</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Môn</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Loại</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Lượt làm</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Ngày tạo</th>
            </tr></thead>
            <tbody>
              {exams.map(e => (
                <tr key={e.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4"><Link href={`/exams/${e.id}`} className="font-medium text-blue-600 hover:underline">{e.title}</Link></td>
                  <td className="px-4 py-4 text-gray-600">{e.subject?.name}</td>
                  <td className="px-4 py-4 text-center"><Badge variant="primary">{getExamTypeLabel(e.examType)}</Badge></td>
                  <td className="px-4 py-4 text-center font-semibold">{e._count?.attempts || 0}</td>
                  <td className="px-4 py-4 text-center text-gray-500">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center py-4"><Pagination page={page} totalPages={Math.ceil(total / 20)} onPageChange={setPage} /></div>
        </CardBody>
      </Card>
    </div>
  );
}
