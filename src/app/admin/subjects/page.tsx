'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [grades, setGrades] = useState<{ id: string; name: string }[]>([]);
  const [gradeId, setGradeId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/grades')
      .then((r) => r.json())
      .then((d) => setGrades(Array.isArray(d) ? d : []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = gradeId ? `?gradeId=${gradeId}` : '';
    fetch(`/api/admin/subjects${params}`)
      .then((r) => r.json())
      .then((d) => { setSubjects(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [gradeId]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Môn học</h1>
        <Button>+ Thêm môn học</Button>
      </div>

      {/* Bộ lọc */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-600">Lọc theo lớp:</label>
        <select
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">— Tất cả lớp —</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        {gradeId && (
          <button
            onClick={() => setGradeId('')}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Xóa lọc
          </button>
        )}
        {gradeId && !loading && (
          <span className="text-sm text-gray-500">
            Tìm thấy <span className="font-semibold text-blue-600">{subjects.length}</span> môn học
          </span>
        )}
      </div>

      <Card>
        <CardBody className="p-0">
          {loading ? (
            <div className="py-12"><PageLoader /></div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-3xl mb-2">📚</p>
              <p>Không có môn học nào{gradeId ? ' ở lớp này' : ''}.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Tên môn</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Mã</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Chủ đề</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Câu hỏi</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{s.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900">{s.name}</p>
                          {s.description && <p className="text-xs text-gray-400">{s.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{s.code}</code>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-semibold text-indigo-600">{s._count?.topics ?? 0}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-semibold text-green-600">{s._count?.questions ?? 0}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant={s.status === 'ACTIVE' ? 'success' : 'default'}>
                        {s.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Button variant="ghost" size="xs">Sửa</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
