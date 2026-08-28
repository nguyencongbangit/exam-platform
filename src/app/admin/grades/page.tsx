'use client';

import { useEffect, useState } from 'react';
import { PageLoader } from '@/components/ui/LoadingSpinner';

interface Topic {
  id: string;
  name: string;
  sortOrder: number;
  _count: { questions: number };
}

interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string | null;
  topicCount: number;
  questionCount: number;
  topics: Topic[];
}

interface Grade {
  id: string;
  name: string;
  sortOrder: number;
  subjectCount: number;
  topicCount: number;
  subjects: Subject[];
}

export default function AdminGradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [openGrades, setOpenGrades] = useState<Set<string>>(new Set());
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/admin/curriculum')
      .then((r) => r.json())
      .then((d) => { setGrades(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleGrade = (id: string) => {
    setOpenGrades((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSubject = (key: string) => {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Chương trình học theo lớp</h1>
        <span className="text-sm text-gray-500">{grades.length} lớp học</span>
      </div>

      <div className="space-y-2">
        {grades.map((grade) => {
          const gradeOpen = openGrades.has(grade.id);
          return (
            <div key={grade.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Grade row */}
              <button
                onClick={() => toggleGrade(grade.id)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-blue-50 transition-colors text-left"
              >
                <span className={`text-gray-400 transition-transform duration-200 ${gradeOpen ? 'rotate-90' : ''}`}>
                  ▶
                </span>
                <span className="text-lg font-bold text-blue-700">{grade.name}</span>
                <div className="flex gap-3 ml-auto text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {grade.subjectCount} môn
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                    {grade.topicCount} chủ đề
                  </span>
                </div>
              </button>

              {/* Subjects */}
              {gradeOpen && (
                <div className="border-t border-gray-100 bg-gray-50">
                  {grade.subjects.length === 0 ? (
                    <p className="px-10 py-4 text-sm text-gray-400 italic">Chưa có môn học nào cho lớp này.</p>
                  ) : (
                    grade.subjects.map((subject) => {
                      const key = `${grade.id}-${subject.id}`;
                      const subOpen = openSubjects.has(key);
                      return (
                        <div key={subject.id} className="border-b border-gray-100 last:border-0">
                          {/* Subject row */}
                          <button
                            onClick={() => toggleSubject(key)}
                            className="w-full flex items-center gap-3 px-10 py-3 hover:bg-indigo-50 transition-colors text-left"
                          >
                            <span className={`text-gray-400 text-xs transition-transform duration-200 ${subOpen ? 'rotate-90' : ''}`}>
                              ▶
                            </span>
                            <span className="text-xl">{subject.icon || '📚'}</span>
                            <span className="font-semibold text-gray-800">{subject.name}</span>
                            <code className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded ml-1">
                              {subject.code}
                            </code>
                            <div className="flex gap-2 ml-auto text-xs text-gray-500">
                              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                {subject.topicCount} chủ đề
                              </span>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {subject.questionCount} câu hỏi
                              </span>
                            </div>
                          </button>

                          {/* Topics */}
                          {subOpen && (
                            <div className="bg-white border-t border-gray-100">
                              {subject.topics.length === 0 ? (
                                <p className="px-16 py-3 text-sm text-gray-400 italic">Chưa có chủ đề nào.</p>
                              ) : (
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                      <th className="text-left px-16 py-2">Chủ đề</th>
                                      <th className="text-center px-4 py-2 w-28">Câu hỏi</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {subject.topics.map((topic, idx) => (
                                      <tr key={topic.id} className={`border-t border-gray-50 ${idx % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                                        <td className="px-16 py-2.5 flex items-center gap-2">
                                          <span className="text-gray-300">└</span>
                                          <span className="text-gray-700">{topic.name}</span>
                                        </td>
                                        <td className="px-4 py-2.5 text-center">
                                          <span className={`font-semibold ${topic._count.questions > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                                            {topic._count.questions}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
