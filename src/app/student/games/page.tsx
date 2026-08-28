'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const GAMES = [
  {
    id: 'speed',
    title: 'Tốc Chiến',
    emoji: '⚡',
    desc: '10 câu hỏi — 15 giây mỗi câu. Trả lời nhanh trước khi hết giờ!',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    isQuiz: true,
  },
  {
    id: 'survival',
    title: 'Vượt Ải',
    emoji: '❤️',
    desc: '10 câu tăng dần độ khó — 3 mạng. Mất mạng khi trả lời sai!',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    isQuiz: true,
  },
  {
    id: 'flashcard',
    title: 'Lật Bài',
    emoji: '🃏',
    desc: 'Ôn luyện theo thẻ ghi nhớ. Lật bài để xem đáp án đúng.',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    isQuiz: true,
  },
  {
    id: 'chess',
    title: 'Cờ Vua',
    emoji: '♟',
    desc: 'Thư giãn với cờ vua sau giờ học. Đối đầu với máy ở 3 cấp độ khó!',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    isQuiz: false,
  },
];

export default function GamesHubPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<{ id: string; name: string; icon: string }[]>([]);
  const [grades, setGrades] = useState<{ id: string; name: string }[]>([]);
  const [subjectId, setSubjectId] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [selected, setSelected] = useState('speed');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/subjects').then((r) => r.json()),
      fetch('/api/admin/grades').then((r) => r.json()),
    ]).then(([s, g]) => { setSubjects(s || []); setGrades(g || []); });
  }, []);

  function startGame() {
    if (selected === 'chess') {
      router.push('/student/games/chess');
      return;
    }
    const params = new URLSearchParams();
    if (subjectId) params.set('subjectId', subjectId);
    if (gradeId) params.set('gradeId', gradeId);
    router.push(`/student/games/${selected}?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Trò chơi học tập</h1>
        <p className="text-gray-500 text-sm mt-1">Ôn luyện kiến thức qua các trò chơi thú vị</p>
      </div>

      {/* Chọn game */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GAMES.map((g) => (
          <div
            key={g.id}
            onClick={() => setSelected(g.id)}
            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
              selected === g.id
                ? 'border-blue-500 shadow-lg scale-[1.02]'
                : `${g.border} hover:shadow-md`
            } ${g.bg}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-2xl shadow-sm`}>
                {g.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{g.title}</h3>
                  {selected === g.id && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Đã chọn</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bộ lọc */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-gray-800">Tùy chọn câu hỏi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— Tất cả môn —</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
              <select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— Tất cả lớp —</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={startGame} className="w-full sm:w-auto text-base px-8 py-2.5">
            🎮 Bắt đầu chơi
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
