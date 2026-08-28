import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatScore(score: number | null | undefined): string {
  if (score == null) return 'N/A';
  return score.toFixed(2);
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}g ${m}p`;
  return `${m} phút`;
}

export function getDifficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    EASY: 'Dễ',
    MEDIUM: 'Trung bình',
    HARD: 'Khó',
    VERY_HARD: 'Rất khó',
  };
  return map[difficulty] || difficulty;
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    EASY: 'text-green-600 bg-green-100',
    MEDIUM: 'text-yellow-600 bg-yellow-100',
    HARD: 'text-orange-600 bg-orange-100',
    VERY_HARD: 'text-red-600 bg-red-100',
  };
  return map[difficulty] || 'text-gray-600 bg-gray-100';
}

export function getExamTypeLabel(type: string): string {
  const map: Record<string, string> = {
    PRACTICE: 'Luyện tập',
    MOCK_EXAM: 'Thi thử',
    OFFICIAL: 'Chính thức',
  };
  return map[type] || type;
}

export function getRoleLabel(role: string): string {
  const map: Record<string, string> = {
    STUDENT: 'Học sinh',
    TEACHER: 'Giáo viên',
    PARENT: 'Phụ huynh',
    ADMIN: 'Quản trị viên',
  };
  return map[role] || role;
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: 'Hoạt động',
    INACTIVE: 'Không hoạt động',
    BANNED: 'Bị khóa',
    DRAFT: 'Bản nháp',
    PUBLISHED: 'Đã xuất bản',
    HIDDEN: 'Ẩn',
    IN_PROGRESS: 'Đang làm',
    SUBMITTED: 'Đã nộp',
    ABANDONED: 'Bỏ dở',
  };
  return map[status] || status;
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-green-600';
  if (score >= 6.5) return 'text-blue-600';
  if (score >= 5) return 'text-yellow-600';
  return 'text-red-600';
}

export function getScoreGrade(score: number): string {
  if (score >= 9) return 'Xuất sắc';
  if (score >= 8) return 'Giỏi';
  if (score >= 6.5) return 'Khá';
  if (score >= 5) return 'Trung bình';
  return 'Yếu';
}
