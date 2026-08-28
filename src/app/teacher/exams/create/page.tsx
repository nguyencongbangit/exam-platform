'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import toast from 'react-hot-toast';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { getDifficultyLabel } from '@/lib/utils';
import { SUBJECTS as ALL_SUBJECTS, GRADES as ALL_GRADES, DIFFICULTIES as ALL_DIFFICULTIES } from '@/lib/constants';

const SUBJECTS = ALL_SUBJECTS.map((s) => ({ value: s.id, label: `${s.icon} ${s.name}` }));
const GRADES = ALL_GRADES.map((g) => ({ value: g.id, label: g.name }));
const DIFFICULTIES_OPT = [{ value: '', label: 'Tất cả mức' }, ...ALL_DIFFICULTIES.slice(0, 3).map((d) => ({ value: d.id, label: d.label }))];

export default function CreateExamPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);
  const [filter, setFilter] = useState({ subjectId: 'sub-toan', gradeId: 'grade-9', difficulty: '' });
  const [form, setForm] = useState({
    title: '',
    description: '',
    subjectId: 'sub-toan',
    gradeId: 'grade-9',
    durationMinutes: 45,
    maxScore: 10,
    difficulty: 'MEDIUM',
    examType: 'PRACTICE',
    status: 'PUBLISHED',
  });

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  async function fetchQuestions() {
    const params = new URLSearchParams({ subjectId: filter.subjectId, gradeId: filter.gradeId, limit: '50' });
    if (filter.difficulty) params.set('difficulty', filter.difficulty);
    const res = await fetch(`/api/teacher/questions?${params}`);
    const data = await res.json();
    setQuestions(data.questions || []);
  }

  function toggleQuestion(id: string) {
    setSelectedQIds((prev) => prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Vui lòng nhập tiêu đề'); return; }
    if (selectedQIds.length === 0) { toast.error('Vui lòng chọn ít nhất 1 câu hỏi'); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/teacher/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, questionIds: selectedQIds }),
      });
      if (res.ok) {
        toast.success('Đã tạo đề thi thành công');
        router.push('/teacher/exams');
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } catch { toast.error('Có lỗi xảy ra'); }
    setSaving(false);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/teacher/exams">
          <Button variant="ghost" size="sm"><ChevronLeft size={16} />Quay lại</Button>
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900">Tạo đề thi</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader><h3 className="font-bold">Thông tin đề thi</h3></CardHeader>
          <CardBody className="space-y-4">
            <Input id="title" label="Tiêu đề đề thi" placeholder="VD: Đề kiểm tra Toán 9 - HK1"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm resize-none"
              rows={2} placeholder="Mô tả (không bắt buộc)"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select label="Môn học" options={SUBJECTS} value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })} />
              <Select label="Lớp" options={GRADES} value={form.gradeId}
                onChange={(e) => setForm({ ...form, gradeId: e.target.value })} />
              <Input id="duration" label="Thời gian (phút)" type="number" min={15} max={180}
                value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: +e.target.value })} />
              <Select label="Loại đề" options={[{ value: 'PRACTICE', label: 'Luyện tập' }, { value: 'MOCK_EXAM', label: 'Thi thử' }, { value: 'OFFICIAL', label: 'Chính thức' }]}
                value={form.examType} onChange={(e) => setForm({ ...form, examType: e.target.value })} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-bold">Chọn câu hỏi <span className="text-blue-600">({selectedQIds.length} đã chọn)</span></h3>
            <div className="flex gap-2">
              <Select options={DIFFICULTIES_OPT} value={filter.difficulty}
                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })} placeholder="Tất cả mức" />
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {questions.map((q) => {
                const selected = selectedQIds.includes(q.id);
                return (
                  <label key={q.id} className={`flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 ${selected ? 'bg-blue-50' : ''}`}>
                    <input type="checkbox" checked={selected} onChange={() => toggleQuestion(q.id)} className="mt-1 accent-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 line-clamp-1">{q.content.replace(/\$.*?\$/g, '[biểu thức]').slice(0, 100)}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{getDifficultyLabel(q.difficulty)} • {q.topic?.name}</p>
                    </div>
                  </label>
                );
              })}
              {questions.length === 0 && (
                <p className="text-center py-8 text-gray-400 text-sm">Không có câu hỏi. Hãy tạo câu hỏi trước.</p>
              )}
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Link href="/teacher/exams"><Button variant="secondary">Hủy</Button></Link>
          <Button type="submit" loading={saving}>Tạo đề thi</Button>
        </div>
      </form>
    </div>
  );
}
