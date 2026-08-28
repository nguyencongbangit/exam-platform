'use client';

import { cn } from '@/lib/utils';

interface QuestionNavProps {
  total: number;
  current: number;
  answered: Set<number>;
  flagged: Set<number>;
  onSelect: (index: number) => void;
}

export default function QuestionNav({ total, current, answered, flagged, onSelect }: QuestionNavProps) {
  return (
    <div className="p-4">
      <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Danh sách câu hỏi</div>
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={cn(
              'w-9 h-9 rounded-lg text-xs font-bold transition-all duration-150',
              i === current && 'ring-2 ring-blue-500 ring-offset-1',
              flagged.has(i) ? 'bg-orange-400 text-white' :
              answered.has(i) ? 'bg-blue-500 text-white' :
              'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-gray-600">Đã trả lời ({answered.size})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-orange-400 rounded" />
          <span className="text-gray-600">Đã đánh dấu ({flagged.size})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
          <span className="text-gray-600">Chưa làm ({total - answered.size})</span>
        </div>
      </div>
    </div>
  );
}
