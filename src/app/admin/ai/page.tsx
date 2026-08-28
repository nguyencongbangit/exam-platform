'use client';

import { useState } from 'react';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import { Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const SUBJECTS = [
  { value: 'sub-toan', label: 'Toán học' },
  { value: 'sub-van', label: 'Ngữ Văn' },
  { value: 'sub-anh', label: 'Tiếng Anh' },
  { value: 'sub-ly', label: 'Vật Lý' },
  { value: 'sub-hoa', label: 'Hóa Học' },
  { value: 'sub-sinh', label: 'Sinh Học' },
];
const GRADES = Array.from({ length: 8 }, (_, i) => ({ value: `grade-${i + 5}`, label: `Lớp ${i + 5}` }));
const DIFFICULTIES = [
  { value: 'EASY', label: 'Dễ' },
  { value: 'MEDIUM', label: 'Trung bình' },
  { value: 'HARD', label: 'Khó' },
  { value: 'VERY_HARD', label: 'Rất khó' },
];
const COUNTS = [5, 10, 15, 20, 30, 50].map((n) => ({ value: String(n), label: `${n} câu` }));

interface Result {
  saved: number;
  total: number;
}

export default function AdminAIPage() {
  const [form, setForm] = useState({
    subjectId: 'sub-toan',
    gradeId: 'grade-9',
    difficulty: 'MEDIUM',
    count: '10',
    topicHint: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, count: Number(form.count) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Có lỗi xảy ra');
      } else {
        setResult(data);
        toast.success(`Đã tạo ${data.saved} câu hỏi thành công!`);
      }
    } catch {
      setError('Không thể kết nối đến server');
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-purple-500" size={24} />
          Tạo câu hỏi bằng AI (Gemini)
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Google Gemini sẽ tự động sinh câu hỏi trắc nghiệm và lưu vào ngân hàng câu hỏi.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-bold">Thông số sinh câu hỏi</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select label="Môn học" id="subject" options={SUBJECTS} value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })} />
              <Select label="Khối lớp" id="grade" options={GRADES} value={form.gradeId}
                onChange={(e) => setForm({ ...form, gradeId: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Độ khó" id="diff" options={DIFFICULTIES} value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
              <Select label="Số câu hỏi" id="count" options={COUNTS} value={form.count}
                onChange={(e) => setForm({ ...form, count: e.target.value })} />
            </div>
            <Input
              id="topic"
              label="Chủ đề / Gợi ý (không bắt buộc)"
              placeholder="Ví dụ: Phân số, Phương trình bậc hai, Điện từ học..."
              value={form.topicHint}
              onChange={(e) => setForm({ ...form, topicHint: e.target.value })}
            />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
              <strong>Lưu ý:</strong> Gemini cần khoảng 10–30 giây để sinh câu hỏi. Vui lòng chờ và không tắt trang.
            </div>

            <Button type="submit" loading={loading} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang sinh câu hỏi...</span>
              ) : (
                <span className="flex items-center gap-2"><Sparkles size={16} />Sinh câu hỏi bằng Gemini AI</span>
              )}
            </Button>
          </form>
        </CardBody>
      </Card>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-800">Lỗi</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            {error.includes('API key') && (
              <Link href="/admin/settings" className="text-sm text-red-600 underline mt-1 block">
                → Vào Cài đặt để thêm Gemini API key
              </Link>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-green-800">Thành công!</p>
            <p className="text-sm text-green-700 mt-1">
              Đã tạo và lưu <strong>{result.saved}</strong> / {result.total} câu hỏi vào ngân hàng câu hỏi.
            </p>
            <Link href="/teacher/questions" className="text-sm text-green-600 underline mt-1 block">
              → Xem ngân hàng câu hỏi
            </Link>
          </div>
        </div>
      )}

      <Card>
        <CardHeader><h3 className="font-bold text-sm">Hướng dẫn cấu hình</h3></CardHeader>
        <CardBody className="text-sm text-gray-600 space-y-2">
          <p>1. Truy cập <strong>aistudio.google.com</strong> → <em>Get API key</em> → tạo key miễn phí</p>
          <p>2. Vào <Link href="/admin/settings" className="text-blue-600 underline">Admin → Cài đặt</Link> → dán key vào ô <em>Gemini API Key</em></p>
          <p>3. Quay lại trang này và bắt đầu sinh câu hỏi</p>
        </CardBody>
      </Card>
    </div>
  );
}
