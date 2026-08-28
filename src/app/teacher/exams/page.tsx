'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Plus, Eye, Trash2 } from 'lucide-react';
import { getDifficultyLabel, getExamTypeLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function TeacherExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teacher/exams')
      .then((r) => r.json())
      .then((d) => { setExams(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Xóa đề thi này?')) return;
    try {
      await fetch(`/api/teacher/exams/${id}`, { method: 'DELETE' });
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast.success('Đã xóa đề thi');
    } catch { toast.error('Có lỗi xảy ra'); }
  }

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Đề thi của tôi</h1>
        <Link href="/teacher/exams/create">
          <Button><Plus size={16} />Tạo đề thi</Button>
        </Link>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Tiêu đề</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Môn</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Loại</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Câu hỏi</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Lượt làm</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 max-w-xs truncate">{exam.title}</p>
                      <p className="text-xs text-gray-400">{exam.grade?.name} • {exam.durationMinutes} phút</p>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{exam.subject?.name}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="primary">{getExamTypeLabel(exam.examType)}</Badge>
                    </td>
                    <td className="px-4 py-4 text-center font-semibold">{exam._count?.questions || 0}</td>
                    <td className="px-4 py-4 text-center">{exam._count?.attempts || 0}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant={exam.status === 'PUBLISHED' ? 'success' : exam.status === 'DRAFT' ? 'warning' : 'default'}>
                        {exam.status === 'PUBLISHED' ? 'Đã xuất bản' : exam.status === 'DRAFT' ? 'Bản nháp' : 'Ẩn'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <Link href={`/exams/${exam.id}`}>
                          <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={15} /></button>
                        </Link>
                        <button onClick={() => handleDelete(exam.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {exams.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>Chưa có đề thi nào</p>
                <Link href="/teacher/exams/create">
                  <Button className="mt-3" size="sm">Tạo đề thi đầu tiên</Button>
                </Link>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
