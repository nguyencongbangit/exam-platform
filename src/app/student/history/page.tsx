'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { ClipboardList } from 'lucide-react';
import { formatDateTime, formatTime, formatScore, getScoreColor, getDifficultyLabel } from '@/lib/utils';

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/attempts')
      .then((r) => r.json())
      .then((d) => { setAttempts(Array.isArray(d) ? d : d.attempts || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Lịch sử làm bài</h1>
        <p className="text-gray-500 mt-1">Xem lại các bài thi đã hoàn thành</p>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-gray-600">Tổng: <strong>{attempts.length}</strong> bài đã làm</p>
        </CardHeader>
        <CardBody className="p-0">
          {attempts.length === 0 ? (
            <EmptyState icon={ClipboardList} title="Chưa có bài làm nào" description="Hãy bắt đầu luyện tập ngay!" action={<Link href="/exams"><Button>Xem đề thi</Button></Link>} className="py-12" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Đề thi</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Môn</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Ngày làm</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Điểm</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Đúng/Sai</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Thời gian</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Xem</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <p className="font-semibold text-gray-900 max-w-xs truncate">{attempt.exam?.title}</p>
                        <p className="text-xs text-gray-500">{getDifficultyLabel(attempt.exam?.difficulty)}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{attempt.exam?.subject?.name}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{attempt.submittedAt ? formatDateTime(attempt.submittedAt) : '-'}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-lg font-extrabold ${getScoreColor(attempt.score || 0)}`}>
                          {formatScore(attempt.score)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-green-600 font-semibold">{attempt.correctCount}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-red-600 font-semibold">{attempt.wrongCount}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{formatTime(attempt.timeSpentSeconds)}</td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/attempts/${attempt.id}/result`}>
                          <Button size="xs" variant="outline">Xem</Button>
                        </Link>
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
