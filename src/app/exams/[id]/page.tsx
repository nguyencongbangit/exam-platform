'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Clock, Users, BookOpen, Target, Star, ChevronRight, Play } from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor, getExamTypeLabel, formatDateTime, formatScore } from '@/lib/utils';

export default function ExamDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    fetch(`/api/exams/${params.id}`)
      .then((r) => r.json())
      .then((d) => { setExam(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleStart() {
    if (!session) {
      router.push(`/login?callbackUrl=/exams/${params.id}`);
      return;
    }
    if (session.user.role !== 'STUDENT') {
      toast.error('Chỉ học sinh mới có thể làm bài thi');
      return;
    }
    setStarting(true);
    try {
      const res = await fetch(`/api/exams/${params.id}/start`, { method: 'POST' });
      const data = await res.json();
      if (data.attemptId) {
        router.push(`/exams/${params.id}/start?attemptId=${data.attemptId}`);
      } else {
        toast.error('Không thể bắt đầu bài thi');
      }
    } catch {
      toast.error('Có lỗi xảy ra');
    }
    setStarting(false);
  }

  if (loading) return <PageLoader />;
  if (!exam) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-500">Không tìm thấy đề thi</p>
        <Link href="/exams"><Button className="mt-4">Quay lại danh sách</Button></Link>
      </div>
    </div>
  );

  const subjectIcons: Record<string, string> = { TOAN: '📐', VAN: '📚', ANH: '🌍', LY: '⚡', HOA: '🧪', SINH: '🌿' };
  const icon = subjectIcons[exam.subject?.code] || '📝';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/exams" className="hover:text-blue-600">Đề thi</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate">{exam.title}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start gap-5">
              <div className="text-5xl">{icon}</div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={exam.examType === 'OFFICIAL' ? 'danger' : exam.examType === 'MOCK_EXAM' ? 'warning' : 'primary'}>
                    {getExamTypeLabel(exam.examType)}
                  </Badge>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(exam.difficulty)}`}>
                    {getDifficultyLabel(exam.difficulty)}
                  </span>
                  {exam.grade && <Badge variant="info">{exam.grade.name}</Badge>}
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-3">{exam.title}</h1>
                {exam.description && <p className="text-gray-600 leading-relaxed">{exam.description}</p>}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-b border-gray-100">
            {[
              { icon: Clock, label: 'Thời gian', value: `${exam.durationMinutes} phút` },
              { icon: BookOpen, label: 'Số câu', value: `${exam.totalQuestions} câu` },
              { icon: Users, label: 'Lượt làm', value: `${exam._count?.attempts || 0}` },
              { icon: Star, label: 'Điểm TB', value: exam.avgScore ? formatScore(exam.avgScore) : 'N/A' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-5 text-center border-r last:border-r-0 border-gray-100">
                <Icon size={22} className="text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-6">
              Bạn có <strong>{exam.durationMinutes} phút</strong> để hoàn thành <strong>{exam.totalQuestions} câu hỏi</strong>.
              Hãy chuẩn bị tốt trước khi bắt đầu!
            </p>
            <Button size="xl" onClick={handleStart} loading={starting} className="min-w-[200px] shadow-lg shadow-blue-200">
              <Play size={20} />
              Bắt đầu làm bài
            </Button>
            {!session && (
              <p className="text-sm text-gray-500 mt-3">
                Bạn cần <Link href="/login" className="text-blue-600 font-semibold">đăng nhập</Link> để làm bài
              </p>
            )}
          </div>

          {/* Info */}
          <div className="px-8 pb-8 text-sm text-gray-500 bg-gray-50 rounded-b-3xl">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span>Môn học</span>
              <span className="font-semibold text-gray-900">{exam.subject?.name}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span>Giáo viên tạo</span>
              <span className="font-semibold text-gray-900">{exam.createdBy?.fullName}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span>Ngày xuất bản</span>
              <span className="font-semibold text-gray-900">{exam.publishedAt ? formatDateTime(exam.publishedAt) : 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span>Điểm tối đa</span>
              <span className="font-semibold text-gray-900">{exam.maxScore} điểm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
