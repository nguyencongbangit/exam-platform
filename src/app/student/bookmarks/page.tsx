'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Bookmark, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/bookmarks')
      .then((r) => r.json())
      .then((d) => { setBookmarks(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function removeBookmark(questionId: string) {
    try {
      await fetch(`/api/student/bookmarks/${questionId}`, { method: 'DELETE' });
      setBookmarks((prev) => prev.filter((b) => b.questionId !== questionId));
      toast.success('Đã xóa khỏi danh sách lưu');
    } catch {
      toast.error('Có lỗi xảy ra');
    }
  }

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Câu đã lưu</h1>
        <p className="text-gray-500 mt-1">Những câu hỏi bạn đã đánh dấu để ôn lại</p>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Chưa có câu hỏi nào được lưu"
          description="Trong khi làm bài, bạn có thể lưu câu hỏi để ôn lại sau."
          action={<Link href="/exams"><Button>Bắt đầu làm bài</Button></Link>}
        />
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <Card key={bm.id}>
              <CardBody className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    {bm.question?.subject?.name} • {bm.question?.topic?.name}
                  </p>
                  <p className="text-sm text-gray-800">{bm.question?.content?.replace(/\$.*?\$/g, '[biểu thức]').slice(0, 150)}</p>
                </div>
                <button onClick={() => removeBookmark(bm.questionId)} className="shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
