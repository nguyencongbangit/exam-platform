import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const PRACTICE_LABELS: Record<string, string> = {
    EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó',
  };

  // Return recent attempts as activity log
  const recentAttempts = await prisma.attempt.findMany({
    where: { status: 'SUBMITTED' },
    include: {
      student: { include: { user: { select: { fullName: true } } } },
      exam: { include: { subject: { select: { name: true } } } },
      attemptQuestions: {
        take: 1,
        include: { question: { include: { subject: { select: { name: true } } } } },
      },
    },
    orderBy: { submittedAt: 'desc' },
    take: 30,
  });

  const logs = recentAttempts.map((a) => {
    let label: string;
    if (a.practiceMode) {
      const subjectName = a.attemptQuestions[0]?.question?.subject?.name;
      const modeLabel = PRACTICE_LABELS[a.practiceMode] ?? a.practiceMode;
      label = subjectName ? `Luyện tập ${subjectName} (${modeLabel})` : `Luyện tập (${modeLabel})`;
    } else {
      const subjectName = a.exam?.subject?.name;
      label = subjectName ? `${a.exam?.title ?? 'Đề thi'} — ${subjectName}` : (a.exam?.title ?? 'Đề thi');
    }
    return {
      icon: a.practiceMode ? '✏️' : '📝',
      message: `${a.student.user.fullName} đã nộp bài "${label}" - Điểm: ${a.score?.toFixed(2) || 'N/A'}`,
      user: a.student.user.fullName,
      timestamp: a.submittedAt,
    };
  });

  return NextResponse.json(logs);
}
