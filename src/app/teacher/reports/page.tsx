'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { BarChart2, TrendingDown, TrendingUp } from 'lucide-react';

export default function TeacherReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teacher/reports')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Báo cáo phân tích</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Tổng lượt làm bài', value: data?.totalAttempts || 0, icon: BarChart2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Điểm trung bình', value: data?.avgScore ? data.avgScore.toFixed(2) : 'N/A', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Tỷ lệ đúng TB', value: data?.avgAccuracy ? `${data.avgAccuracy.toFixed(1)}%` : 'N/A', icon: TrendingDown, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardBody className="flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
                <Icon size={22} className={color} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><h3 className="font-bold">Câu hỏi khó nhất (tỷ lệ sai cao)</h3></CardHeader>
        <CardBody>
          {data?.hardestQuestions && data.hardestQuestions.length > 0 ? (
            <div className="space-y-3">
              {data.hardestQuestions.map((q: any, i: number) => (
                <div key={i} className="flex items-start justify-between gap-4 py-2 border-b last:border-0">
                  <p className="text-sm text-gray-700 line-clamp-1 flex-1">{q.content?.replace(/\$.*?\$/g, '[biểu thức]').slice(0, 80)}</p>
                  <span className="text-red-600 font-bold shrink-0">{q.wrongRate}% sai</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">Chưa có đủ dữ liệu</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
