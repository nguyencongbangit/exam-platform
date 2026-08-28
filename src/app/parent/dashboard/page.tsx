'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Users, BookOpen, TrendingUp, School } from 'lucide-react';
import { formatScore, formatDate, getScoreColor } from '@/lib/utils';

export default function ParentDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [classrooms, setClassrooms] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/parent/children')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
    fetch('/api/parent/classrooms')
      .then(r => r.json()).then(d => setClassrooms(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  if (loading) return <PageLoader />;

  const children = data?.children || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Dashboard Phụ huynh</h1>

      {children.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Chưa có con em nào được liên kết</p>
            <p className="text-sm text-gray-400 mt-2">Liên hệ admin để liên kết tài khoản học sinh</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child: any) => (
            <Card key={child.id}>
              <CardHeader className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-blue-700">
                  {child.user?.fullName?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{child.user?.fullName}</p>
                  <p className="text-xs text-gray-500">{child.grade?.name} • {child.schoolName}</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-blue-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-blue-700">{child.stats?.totalAttempts || 0}</div>
                    <div className="text-xs text-gray-600">Đề đã làm</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-xl p-3">
                    <div className={`text-xl font-bold ${getScoreColor(child.stats?.avgScore || 0)}`}>
                      {formatScore(child.stats?.avgScore || 0)}
                    </div>
                    <div className="text-xs text-gray-600">Điểm TB</div>
                  </div>
                  <div className="text-center bg-purple-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-purple-700">{(child.stats?.accuracyRate || 0).toFixed(0)}%</div>
                    <div className="text-xs text-gray-600">Tỷ lệ đúng</div>
                  </div>
                </div>
                <Link href={`/parent/reports?studentId=${child.id}`}>
                  <Button variant="outline" size="sm" className="w-full">Xem báo cáo chi tiết</Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Classroom monitoring */}
      {classrooms.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><School size={20} className="text-indigo-500" />Lớp học đang theo dõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {classrooms.map((cls: any) => (
              <Card key={cls.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center"><School size={18} className="text-indigo-600" /></div>
                    <div>
                      <p className="font-bold text-gray-900">{cls.name}</p>
                      <p className="text-xs text-gray-500">{cls.teacher ? `GV: ${cls.teacher.user.fullName}` : 'Chưa có giáo viên CN'} · {cls.members?.length || 0} học sinh</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-2">
                    {(cls.members || []).slice(0, 5).map((m: any) => {
                      const scores = (m.student.attempts || []).filter((a: any) => a.score !== null).map((a: any) => a.score);
                      const avg = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length).toFixed(1) : '—';
                      return (
                        <div key={m.studentId} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                            {m.student.user.fullName.charAt(0)}
                          </div>
                          <p className="flex-1 text-sm font-medium text-gray-800 truncate">{m.student.user.fullName}</p>
                          <div className="text-right shrink-0">
                            <p className={`text-sm font-black ${getScoreColor(parseFloat(avg) || 0)}`}>{avg}</p>
                            <p className="text-xs text-gray-400">điểm TB</p>
                          </div>
                        </div>
                      );
                    })}
                    {(cls.members || []).length > 5 && (
                      <p className="text-xs text-gray-400 text-center pt-1">...và {cls.members.length - 5} học sinh khác</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
