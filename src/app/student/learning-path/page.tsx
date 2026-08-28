'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCircle, Circle, Target, BookOpen, TrendingUp } from 'lucide-react';

const LEARNING_PATH = [
  {
    subject: 'Toán 9',
    icon: '📐',
    topics: [
      { name: 'Căn bậc hai và căn bậc ba', done: true },
      { name: 'Hàm số bậc nhất y = ax + b', done: true },
      { name: 'Hệ phương trình bậc nhất hai ẩn', done: false },
      { name: 'Phương trình bậc hai một ẩn', done: false },
      { name: 'Hàm số bậc hai y = ax²', done: false },
      { name: 'Hình học: Đường tròn', done: false },
      { name: 'Hình học: Góc với đường tròn', done: false },
      { name: 'Xác suất và thống kê', done: false },
    ],
  },
];

export default function LearningPathPage() {
  const [paths, setPaths] = useState(LEARNING_PATH);

  function toggleTopic(pIdx: number, tIdx: number) {
    setPaths((prev) =>
      prev.map((p, i) =>
        i === pIdx
          ? { ...p, topics: p.topics.map((t, j) => (j === tIdx ? { ...t, done: !t.done } : t)) }
          : p
      )
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Lộ trình học</h1>
        <p className="text-gray-500 mt-1">Theo dõi tiến độ học tập của bạn</p>
      </div>

      {/* Goal */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0">
        <CardBody className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Target size={28} className="text-white" />
          </div>
          <div className="text-white">
            <p className="font-bold text-lg">Mục tiêu: Đạt 8.5 điểm Toán 9</p>
            <p className="text-blue-200 text-sm">Còn 3 tháng để ôn tập trước kỳ thi</p>
          </div>
        </CardBody>
      </Card>

      {paths.map((path, pIdx) => {
        const doneCount = path.topics.filter((t) => t.done).length;
        const progress = Math.round((doneCount / path.topics.length) * 100);

        return (
          <Card key={path.subject}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{path.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{path.subject}</h3>
                    <p className="text-xs text-gray-500">{doneCount}/{path.topics.length} chủ đề hoàn thành</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-blue-600">{progress}%</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-50">
                {path.topics.map((topic, tIdx) => (
                  <button
                    key={topic.name}
                    className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => toggleTopic(pIdx, tIdx)}
                  >
                    {topic.done ? (
                      <CheckCircle size={20} className="text-green-500 shrink-0" />
                    ) : (
                      <Circle size={20} className="text-gray-300 shrink-0" />
                    )}
                    <span className={`text-sm ${topic.done ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
                      {topic.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-4">
                <Link href="/exams?subjectId=sub-toan&gradeId=grade-9">
                  <Button variant="outline" size="sm">
                    <BookOpen size={14} />
                    Xem đề thi {path.subject}
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
