'use client';
import { useState } from 'react';
import { Database, Play, CheckCircle, XCircle, Loader } from 'lucide-react';

interface SeedResult { script: string; ok: boolean; output: string }

export default function SeedDataPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<SeedResult[]>([]);
  const [done, setDone] = useState(false);

  async function runSeed() {
    setRunning(true);
    setResults([]);
    setDone(false);
    try {
      const res = await fetch('/api/admin/seed-questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      const data = await res.json();
      setResults(data.results || []);
      setDone(true);
    } catch (e) {
      setResults([{ script: 'error', ok: false, output: String(e) }]);
    }
    setRunning(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
          <Database size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Seed Câu Hỏi</h1>
          <p className="text-sm text-gray-500">Chạy một lần sau khi deploy lên server mới</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        ⚠️ <strong>Chỉ chạy một lần duy nhất</strong> sau khi cài đặt server mới. Chạy lại sẽ tạo dữ liệu trùng lặp.
      </div>

      <button
        onClick={runSeed}
        disabled={running || done}
        className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl text-base transition-colors"
      >
        {running ? <><Loader size={20} className="animate-spin" /> Đang seed dữ liệu... (5-15 phút)</> :
         done    ? <><CheckCircle size={20} /> Đã seed xong!</> :
                   <><Play size={20} /> Bắt đầu Seed Câu Hỏi</>}
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl p-4 border ${r.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                {r.ok ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-red-600" />}
                <span className="font-mono text-sm font-bold">{r.script}</span>
              </div>
              {r.output && <pre className="text-xs text-gray-600 whitespace-pre-wrap">{r.output}</pre>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
