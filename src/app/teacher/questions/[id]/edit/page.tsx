'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { ChevronLeft, Eye } from 'lucide-react';
import katex from 'katex';

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

function renderLatex(text: string): string {
  return text
    .replace(/\$\$(.+?)\$\$/gs, (_, m) => { try { return katex.renderToString(m, { displayMode: true, throwOnError: false }); } catch { return m; } })
    .replace(/\$(.+?)\$/g, (_, m) => { try { return katex.renderToString(m, { displayMode: false, throwOnError: false }); } catch { return m; } });
}

function LatexPreview({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.innerHTML = renderLatex(text); }, [text]);
  return <div ref={ref} className="katex-question text-gray-800 text-sm leading-relaxed" />;
}

export default function EditQuestionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    subjectId: 'sub-toan',
    gradeId: 'grade-9',
    difficulty: 'MEDIUM',
    content: '',
    explanation: '',
    options: [
      { key: 'A', content: '', isCorrect: false },
      { key: 'B', content: '', isCorrect: false },
      { key: 'C', content: '', isCorrect: false },
      { key: 'D', content: '', isCorrect: false },
    ],
  });

  useEffect(() => {
    fetch(`/api/teacher/questions/${id}`)
      .then((r) => r.json())
      .then((q) => {
        setForm({
          subjectId: q.subjectId,
          gradeId: q.gradeId,
          difficulty: q.difficulty,
          content: q.content,
          explanation: q.explanation || '',
          options: ['A', 'B', 'C', 'D'].map((key) => {
            const opt = q.options.find((o: any) => o.optionKey === key);
            return { key, content: opt?.content || '', isCorrect: opt?.isCorrect || false };
          }),
        });
        setLoading(false);
      })
      .catch(() => { toast.error('Không tải được câu hỏi'); setLoading(false); });
  }, [id]);

  function setCorrect(idx: number) {
    setForm((f) => ({ ...f, options: f.options.map((o, i) => ({ ...o, isCorrect: i === idx })) }));
  }

  function setOptionContent(idx: number, content: string) {
    setForm((f) => ({ ...f, options: f.options.map((o, i) => (i === idx ? { ...o, content } : o)) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.content.trim()) { toast.error('Vui lòng nhập nội dung câu hỏi'); return; }
    if (form.options.some((o) => !o.content.trim())) { toast.error('Vui lòng nhập đủ 4 đáp án'); return; }
    if (!form.options.some((o) => o.isCorrect)) { toast.error('Vui lòng chọn đáp án đúng'); return; }

    setSaving(true);
    try {
      const res = await fetch(`/api/teacher/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Đã cập nhật câu hỏi');
        router.push('/teacher/questions');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Có lỗi xảy ra');
      }
    } catch {
      toast.error('Có lỗi xảy ra');
    }
    setSaving(false);
  }

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/teacher/questions">
          <Button variant="ghost" size="sm"><ChevronLeft size={16} />Quay lại</Button>
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900">Chỉnh sửa câu hỏi</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader><h3 className="font-bold">Thông tin câu hỏi</h3></CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Select label="Môn học" id="subject" options={SUBJECTS} value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })} />
              <Select label="Lớp" id="grade" options={GRADES} value={form.gradeId}
                onChange={(e) => setForm({ ...form, gradeId: e.target.value })} />
              <Select label="Độ khó" id="diff" options={DIFFICULTIES} value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Nội dung câu hỏi (hỗ trợ LaTeX: $x^2$)</label>
                <button type="button" onClick={() => setPreview(!preview)} className="text-xs text-blue-600 flex items-center gap-1">
                  <Eye size={12} />{preview ? 'Tắt' : 'Xem'} preview
                </button>
              </div>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm resize-none"
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {preview && form.content && (
                <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-400 mb-2">Preview:</p>
                  <LatexPreview text={form.content} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h3 className="font-bold">Đáp án (chọn đáp án đúng)</h3></CardHeader>
          <CardBody className="space-y-3">
            {form.options.map((opt, idx) => (
              <div key={opt.key} className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-colors ${opt.isCorrect ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
                <input type="radio" name="correct" checked={opt.isCorrect} onChange={() => setCorrect(idx)} className="mt-3 accent-green-600" />
                <span className={`w-7 h-7 mt-1.5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${opt.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {opt.key}
                </span>
                <textarea
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 resize-none bg-white"
                  rows={2}
                  placeholder={`Đáp án ${opt.key}`}
                  value={opt.content}
                  onChange={(e) => setOptionContent(idx, e.target.value)}
                />
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h3 className="font-bold">Giải thích (không bắt buộc)</h3></CardHeader>
          <CardBody>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm resize-none"
              rows={3}
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            />
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Link href="/teacher/questions"><Button variant="secondary">Hủy</Button></Link>
          <Button type="submit" loading={saving}>Lưu thay đổi</Button>
        </div>
      </form>
    </div>
  );
}
