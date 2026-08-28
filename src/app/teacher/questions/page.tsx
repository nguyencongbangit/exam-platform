'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Download, Upload, FileDown, X, CheckCircle, AlertCircle } from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ImportResult {
  imported: number;
  skipped: number;
  total: number;
  errors: { row: number; message: string }[];
}

export default function TeacherQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchQuestions();
  }, [page]);

  async function fetchQuestions() {
    setLoading(true);
    try {
      const res = await fetch(`/api/teacher/questions?page=${page}&limit=20`);
      const data = await res.json();
      setQuestions(data.questions || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa câu hỏi này?')) return;
    try {
      await fetch(`/api/teacher/questions/${id}`, { method: 'DELETE' });
      toast.success('Đã xóa câu hỏi');
      fetchQuestions();
    } catch {
      toast.error('Có lỗi xảy ra');
    }
  }

  function handleDownloadTemplate() {
    window.open('/api/teacher/questions/template', '_blank');
  }

  function handleExport() {
    window.open('/api/teacher/questions/export', '_blank');
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'csv') {
      toast.error('Chỉ hỗ trợ file .csv');
      return;
    }

    setImporting(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/teacher/questions/import', {
        method: 'POST',
        body: formData,
      });
      const result: ImportResult = await res.json();
      setImportResult(result);
      if (result.imported > 0) {
        toast.success(`Đã nhập ${result.imported} câu hỏi thành công`);
        fetchQuestions();
      }
    } catch {
      toast.error('Có lỗi khi nhập file');
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  if (loading && questions.length === 0) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Ngân hàng câu hỏi</h1>
          <p className="text-gray-500 text-sm mt-1">Tổng: {total} câu hỏi</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Download template */}
          <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
            <FileDown size={15} />
            Tải file mẫu
          </Button>

          {/* Import */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
          >
            <Upload size={15} />
            {importing ? 'Đang nhập...' : 'Import CSV'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="hidden"
          />

          {/* Export */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={15} />
            Export CSV
          </Button>

          {/* Add new */}
          <Link href="/teacher/questions/create">
            <Button size="sm">
              <Plus size={15} />
              Thêm câu hỏi
            </Button>
          </Link>
        </div>
      </div>

      {/* Import result panel */}
      {importResult && (
        <Card>
          <CardBody className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {importResult.errors.length === 0 ? (
                  <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={20} />
                ) : (
                  <AlertCircle className="text-yellow-500 mt-0.5 shrink-0" size={20} />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    Kết quả import: {importResult.imported}/{importResult.total} câu hỏi đã được nhập
                    {importResult.skipped > 0 && (
                      <span className="text-yellow-600 ml-2">({importResult.skipped} dòng bị bỏ qua)</span>
                    )}
                  </p>
                  {importResult.errors.length > 0 && (
                    <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                      {importResult.errors.map((err, i) => (
                        <p key={i} className="text-sm text-red-600">
                          <span className="font-medium">Dòng {err.row}:</span> {err.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setImportResult(null)}
                className="text-gray-400 hover:text-gray-600 ml-4 shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Format guide card */}
      <Card>
        <CardBody className="p-4">
          <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FileDown size={16} className="text-blue-500" />
            Định dạng file CSV (Import / Export)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-50">
                  {['Cột', 'Tên cột', 'Mô tả', 'Giá trị hợp lệ', 'Bắt buộc'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['A', 'Nội dung câu hỏi', 'Đề bài (có thể dùng LaTeX: $x^2$)', 'Văn bản tự do', '✓'],
                  ['B', 'Môn học', 'Mã môn viết HOA không dấu', 'TOAN · VAN · ANH · LY · HOA · SINH', '✓'],
                  ['C', 'Lớp', 'Tên lớp đầy đủ', 'Lớp 6 → Lớp 12', '✓'],
                  ['D', 'Chủ đề', 'Phải khớp với chủ đề có trong hệ thống', 'Văn bản', ''],
                  ['E', 'Độ khó', 'Mức độ câu hỏi', 'EASY · MEDIUM · HARD · VERY_HARD', '✓'],
                  ['F', 'Đáp án A', 'Nội dung lựa chọn A', 'Văn bản', '✓'],
                  ['G', 'Đáp án B', 'Nội dung lựa chọn B', 'Văn bản', '✓'],
                  ['H', 'Đáp án C', 'Nội dung lựa chọn C', 'Văn bản', '✓'],
                  ['I', 'Đáp án D', 'Nội dung lựa chọn D', 'Văn bản', '✓'],
                  ['J', 'Đáp án đúng', 'Chữ cái của đáp án đúng (viết HOA)', 'A · B · C · D', '✓'],
                  ['K', 'Lời giải', 'Giải thích (có thể dùng LaTeX)', 'Văn bản', ''],
                ].map(([col, name, desc, values, required]) => (
                  <tr key={col} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5 font-mono font-bold text-blue-600">{col}</td>
                    <td className="px-3 py-1.5 font-medium text-gray-800 whitespace-nowrap">{name}</td>
                    <td className="px-3 py-1.5 text-gray-600">{desc}</td>
                    <td className="px-3 py-1.5 text-gray-500 font-mono text-xs">{values}</td>
                    <td className="px-3 py-1.5 text-center">
                      {required ? (
                        <span className="text-green-600 font-bold">{required}</span>
                      ) : (
                        <span className="text-gray-300">–</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Nhấn <strong>Tải file mẫu</strong> để tải về file <code>.csv</code> có sẵn hàng ví dụ. Có thể mở bằng Excel, Google Sheets hoặc Notepad.
          </p>
        </CardBody>
      </Card>

      {/* Question table */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Nội dung</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Môn / Lớp</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Độ khó</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Loại</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-gray-400">
                      Chưa có câu hỏi nào. Thêm mới hoặc import từ CSV.
                    </td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 line-clamp-2 max-w-xs">
                          {q.content.replace(/\$.*?\$/g, '[biểu thức]').slice(0, 80)}
                        </p>
                        {q.topic && <p className="text-xs text-gray-400 mt-0.5">{q.topic.name}</p>}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700">{q.subject?.name}</p>
                        <p className="text-xs text-gray-400">{q.grade?.name}</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(q.difficulty)}`}>
                          {getDifficultyLabel(q.difficulty)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="primary">
                          {q.questionType === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : 'Tự luận'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-1">
                          <Link href={`/teacher/questions/${q.id}/edit`}>
                            <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg" title="Sửa">
                              <Edit size={15} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(q.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Xóa"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center py-4">
            <Pagination page={page} totalPages={Math.ceil(total / 20)} onPageChange={setPage} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
