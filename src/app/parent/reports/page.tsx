'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { formatScore, formatDateTime, getScoreColor } from '@/lib/utils';
import ScoreLineChart from '@/components/charts/ScoreLineChart';

export default function ParentReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/parent/reports')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const children = data?.children || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Báo cáo học tập</h1>

      {children.map((child: any) => (
        <div key={child.id} className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{child.user?.fullName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><h3 className="font-bold">Điểm theo tuần</h3></CardHeader>
              <CardBody>
                {child.dailyScores ? <ScoreLineChart data={child.dailyScores} /> : <p className="text-gray-400 text-sm text-center py-12">Chưa có dữ liệu</p>}
              </CardBody>
            </Card>
            <Card>
              <CardHeader><h3 className="font-bold">Bài làm gần đây</h3></CardHeader>
              <CardBody className="p-0">
                {(child.recentAttempts || []).map((a: any) => (
                  <div key={a.id} className="flex justify-between items-center px-5 py-3 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{a.exam?.title}</p>
                      <p className="text-xs text-gray-500">{formatDateTime(a.submittedAt)}</p>
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(a.score || 0)}`}>{formatScore(a.score)}</span>
                  </div>
                ))}
                {(!child.recentAttempts || child.recentAttempts.length === 0) && (
                  <p className="text-gray-400 text-sm text-center py-8">Chưa có bài làm</p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
