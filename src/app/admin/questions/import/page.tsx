'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const SAMPLE_JSON = JSON.stringify(
  [
    {
      content: 'Giá trị của sin(90°) bằng bao nhiêu?',
      subjectCode: 'TOAN',
      gradeName: 'Lớp 10',
      topicName: 'Lượng giác',
      difficulty: 'EASY',
      explanation: 'sin(90°) = 1 là giá trị cơ bản của hàm sin.',
      options: [
        { key: 'A', content: '0', isCorrect: false },
        { key: 'B', content: '1', isCorrect: true },
        { key: 'C', content: '-1', isCorrect: false },
        { key: 'D', content: '0.5', isCorrect: false },
      ],
    },
    {
      content: 'Đạo hàm của f(x) = x² là?',
      subjectCode: 'TOAN',
      gradeName: 'Lớp 11',
      difficulty: 'MEDIUM',
      explanation: "Theo quy tắc đạo hàm, f'(x) = 2x.",
      options: [
        { key: 'A', content: 'x', isCorrect: false },
        { key: 'B', content: '2x', isCorrect: true },
        { key: 'C', content: 'x²', isCorrect: false },
        { key: 'D', content: '2', isCorrect: false },
      ],
    },
  ],
  null,
  2
);

type ResultItem = {
  index: number;
  success: boolean;
  error?: string;
  warning?: string;
  content?: string;
};

export default function ImportQuestionsPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [jsonText, setJsonText] = useState('');
  const [preview, setPreview] = useState<any[] | null>(null);
  const [parseError, setParseError] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ successCount: number; failCount: number; warnCount: number; results: ResultItem[] } | null>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setJsonText(text);
      parseJson(text);
    };
    reader.readAsText(file, 'utf-8');
  }

  function parseJson(text: string) {
    setParseError('');
    setPreview(null);
    setResults(null);
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('JSON phải là một mảng []');
      setPreview(data);
    } catch (err: any) {
      setParseError(err.message);
    }
  }

  function handleTextChange(text: string) {
    setJsonText(text);
    if (text.trim()) parseJson(text);
    else { setPreview(null); setParseError(''); }
  }

  function loadSample() {
    setJsonText(SAMPLE_JSON);
    parseJson(SAMPLE_JSON);
  }

  function downloadSample() {
    const blob = new Blob([SAMPLE_JSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mau-cau-hoi.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadFullSample() {
    const res = await fetch('/data/mau-import-cau-hoi.json');
    const text = await res.text();
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mau-import-cau-hoi.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    if (!preview) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preview),
      });
      const data = await res.json();
      setResults(data);
    } catch {
      setParseError('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }

  const difficultyLabel: Record<string, string> = {
    EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó', VERY_HARD: 'Rất khó',
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Import câu hỏi từ JSON</h1>
          <p className="text-gray-500 text-sm mt-1">Dán JSON hoặc tải file lên để import hàng loạt câu hỏi</p>
        </div>
        <Button variant="ghost" onClick={() => router.back()}>← Quay lại</Button>
      </div>

      {/* Hướng dẫn định dạng */}
      <Card>
        <CardBody>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">Định dạng JSON yêu cầu</h2>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li><code className="bg-gray-100 px-1 rounded">content</code> — nội dung câu hỏi (bắt buộc)</li>
                <li><code className="bg-gray-100 px-1 rounded">subjectCode</code> — mã môn học (bắt buộc): <strong>TOAN</strong>, <strong>VAN</strong>, <strong>ANH</strong>, <strong>LY</strong>, <strong>HOA</strong>, <strong>SINH</strong>, <strong>KHTN</strong>, <strong>LICHSU_DIALY</strong>, <strong>GDCD</strong>, <strong>TINHOC</strong>, <strong>CONGNGHEE</strong>, <strong>TIENG_VIET</strong>, <strong>KHOAHOC</strong>, <strong>DAODUC</strong>, <strong>HDTN</strong>, <strong>AMNHAC</strong>, <strong>MYTHUAT</strong>, <strong>GDTC</strong></li>
                <li><code className="bg-gray-100 px-1 rounded">gradeName</code> — tên lớp, ví dụ: <strong>Lớp 10</strong> (không bắt buộc)</li>
                <li><code className="bg-gray-100 px-1 rounded">topicName</code> — tên chủ đề (không bắt buộc)</li>
                <li><code className="bg-gray-100 px-1 rounded">difficulty</code> — EASY / MEDIUM / HARD / VERY_HARD (mặc định: MEDIUM)</li>
                <li><code className="bg-gray-100 px-1 rounded">explanation</code> — giải thích đáp án (không bắt buộc)</li>
                <li><code className="bg-gray-100 px-1 rounded">options</code> — mảng đáp án, mỗi phần tử gồm <code className="bg-gray-100 px-1 rounded">key</code>, <code className="bg-gray-100 px-1 rounded">content</code>, <code className="bg-gray-100 px-1 rounded">isCorrect</code></li>
              </ul>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={loadSample} className="whitespace-nowrap">
                Xem JSON mẫu nhỏ
              </Button>
              <Button size="sm" onClick={downloadFullSample} className="whitespace-nowrap">
                ⬇ Tải file mẫu đầy đủ (Lớp 7)
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Input JSON */}
      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              📁 Tải file JSON
            </Button>
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            <span className="text-gray-400 text-sm">hoặc dán trực tiếp bên dưới</span>
          </div>

          <textarea
            className="w-full h-64 font-mono text-xs border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder='[{ "content": "...", "subjectCode": "TOAN", "options": [...] }]'
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
          />

          {parseError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              ❌ {parseError}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Preview */}
      {preview && !results && (
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">
                Xem trước — <span className="text-blue-600">{preview.length} câu hỏi</span>
              </h2>
              <Button onClick={handleImport} disabled={loading}>
                {loading ? 'Đang import...' : `✅ Import ${preview.length} câu hỏi`}
              </Button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {preview.map((q, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-gray-400 mt-0.5 w-6 shrink-0">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium line-clamp-2">{q.content}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{q.subjectCode}</span>
                        {q.gradeName && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{q.gradeName}</span>}
                        {q.difficulty && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">{difficultyLabel[q.difficulty] || q.difficulty}</span>}
                        {q.topicName && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{q.topicName}</span>}
                      </div>
                      <div className="flex gap-3 mt-2">
                        {(q.options || []).map((opt: any) => (
                          <span key={opt.key} className={`text-xs px-2 py-0.5 rounded ${opt.isCorrect ? 'bg-green-100 text-green-700 font-semibold' : 'bg-gray-100 text-gray-500'}`}>
                            {opt.key}. {opt.content?.slice(0, 30)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Kết quả import */}
      {results && (
        <Card>
          <CardBody>
            <h2 className="font-semibold text-gray-800 mb-4">Kết quả import</h2>
            <div className="flex gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center flex-1">
                <div className="text-2xl font-bold text-green-600">{results.successCount}</div>
                <div className="text-sm text-green-700">Thành công</div>
              </div>
              {results.warnCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-center flex-1">
                  <div className="text-2xl font-bold text-yellow-600">{results.warnCount}</div>
                  <div className="text-sm text-yellow-700">Không có chủ đề</div>
                </div>
              )}
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center flex-1">
                <div className="text-2xl font-bold text-red-600">{results.failCount}</div>
                <div className="text-sm text-red-700">Thất bại</div>
              </div>
            </div>

            {results.warnCount > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-yellow-700">⚠️ Câu hỏi lưu thành công nhưng không gán được chủ đề (tên chủ đề không khớp):</p>
                {results.results.filter((r) => r.success && r.warning).map((r) => (
                  <div key={r.index} className="bg-yellow-50 border border-yellow-200 rounded px-3 py-2 text-sm">
                    <span className="font-semibold text-yellow-700">Câu #{r.index}:</span>{' '}
                    <span className="text-yellow-800">{r.warning}</span>
                    {r.content && <span className="text-gray-500 ml-2">— "{r.content}..."</span>}
                  </div>
                ))}
              </div>
            )}

            {results.failCount > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-red-700">Các câu hỏi bị lỗi:</p>
                {results.results.filter((r) => !r.success).map((r) => (
                  <div key={r.index} className="bg-red-50 border border-red-200 rounded px-3 py-2 text-sm">
                    <span className="font-semibold text-red-600">Câu #{r.index}:</span>{' '}
                    <span className="text-red-700">{r.error}</span>
                    {r.content && <span className="text-gray-500 ml-2">— "{r.content}..."</span>}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              {results.successCount > 0 && (
                <Button onClick={() => router.push('/admin/questions')}>
                  Xem danh sách câu hỏi →
                </Button>
              )}
              <Button variant="outline" onClick={() => { setResults(null); setJsonText(''); setPreview(null); }}>
                Import thêm
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
