'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { getDifficultyLabel, getDifficultyColor } from '@/lib/utils';

export default function AdminQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/teacher/questions?page=${page}&limit=20`)
      .then(r => r.json())
      .then(d => { setQuestions(d.questions || []); setTotal(d.total || 0); setLoading(false); })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Tất cả câu hỏi ({total})</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/questions/import')}>📥 Import JSON</Button>
          <Link href="/teacher/questions/create"><Button>+ Thêm câu hỏi</Button></Link>
        </div>
      </div>
      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Nội dung</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Môn / Lớp</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Độ khó</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Người tạo</th>
            </tr></thead>
            <tbody>
              {questions.map(q => (
                <tr key={q.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-xs"><p className="line-clamp-2 text-gray-800">{q.content.replace(/\$.*?\$/g, '[biểu thức]').slice(0, 80)}</p></td>
                  <td className="px-4 py-4"><p className="text-gray-700">{q.subject?.name}</p><p className="text-xs text-gray-400">{q.grade?.name}</p></td>
                  <td className="px-4 py-4 text-center"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(q.difficulty)}`}>{getDifficultyLabel(q.difficulty)}</span></td>
                  <td className="px-4 py-4 text-gray-600">{q.createdBy?.fullName}</td>
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
