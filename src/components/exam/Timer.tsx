'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';

interface TimerProps {
  durationSeconds: number;
  onExpire: () => void;
}

export default function Timer({ durationSeconds, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isWarning = remaining < 300;
  const isCritical = remaining < 60;

  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg',
      isCritical ? 'bg-red-100 text-red-700 timer-warning' :
      isWarning ? 'bg-orange-100 text-orange-700' :
      'bg-blue-100 text-blue-700'
    )}>
      <Clock size={20} />
      {formatTime(remaining)}
    </div>
  );
}
