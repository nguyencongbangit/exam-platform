'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { XCircle } from 'lucide-react';

export default function WrongQuestionsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/wrong-questions')
      .then((r) => r.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  // Group by subject
  const grouped: Record<string, any[]> = {};
  for (const item of data) {
    const subj = item.question?.subject?.name || 'Khác';
    if (!grouped[subj]) grouped[subj] = [];
    grouped[subj].push(item);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Câu sai</h1>
        <p className="text-gray-500 mt-1">Ôn luyện những câu bạn thường làm sai</p>
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={XCircle}
          title="Chưa có câu sai"
          description="Tuyệt vời! Hoặc bạn chưa làm bài thi nào."
          action={<Link href="/exams"><Button>Bắt đầu luyện tập</Button></Link>}
        />
      ) : (
        Object.entries(grouped).map(([subject, items]) => (
          <Card key={subject}>
            <CardHeader className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{subject}</h3>
              <Badge variant="danger">{items.length} câu sai</Badge>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {items.map((item, i) => (
                  <div key={item.questionId} className="px-6 py-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium line-clamp-2">{item.question?.content?.replace(/\$.*?\$/g, '[biểu thức]')}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Đã làm {item.attemptCount} lần • Đúng: {item.correctCount} • Sai: {item.wrongCount}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="text-red-600 font-semibold text-lg">{Math.round((item.wrongCount / item.attemptCount) * 100)}%</span>
                      <span className="text-xs text-gray-400 block text-center">sai</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <Link href="/exams">
                  <Button variant="outline" size="sm">Luyện lại môn này</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
