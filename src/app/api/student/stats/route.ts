export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grade: true },
  });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Chỉ lấy attempts từ đề thi đúng lớp của học sinh (hoặc practice không có examId)
  const gradeFilter = student.gradeId
    ? { OR: [{ exam: { gradeId: student.gradeId } }, { examId: null }] }
    : {};

  const [totalAttempts, submittedAttempts, totalAnswers, correctAnswers] = await Promise.all([
    prisma.attempt.count({
      where: { studentId: student.id, ...gradeFilter },
    }),
    prisma.attempt.findMany({
      where: { studentId: student.id, status: 'SUBMITTED', ...gradeFilter },
      include: {
        exam: {
          include: {
            subject: true,
            grade: true,
          },
        },
      },
      orderBy: { submittedAt: 'desc' },
      take: 50,
    }),
    prisma.answer.count({
      where: {
        attempt: {
          studentId: student.id,
          ...(student.gradeId
            ? { OR: [{ exam: { gradeId: student.gradeId } }, { examId: null }] }
            : {}),
        },
      },
    }),
    prisma.answer.count({
      where: {
        isCorrect: true,
        attempt: {
          studentId: student.id,
          ...(student.gradeId
            ? { OR: [{ exam: { gradeId: student.gradeId } }, { examId: null }] }
            : {}),
        },
      },
    }),
  ]);

  const scoredAttempts = submittedAttempts.filter(a => a.score !== null);
  const avgScore = scoredAttempts.length > 0
    ? scoredAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0) / scoredAttempts.length
    : 0;

  const accuracyRate = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

  // Điểm 7 ngày gần nhất
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const dailyScores = last7Days.map((date) => {
    const dayAttempts = submittedAttempts.filter(a =>
      a.submittedAt?.toISOString().startsWith(date) && a.score !== null
    );
    const dayAvg = dayAttempts.length > 0
      ? dayAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0) / dayAttempts.length
      : 0;
    return {
      date: new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      score: Math.round(dayAvg * 100) / 100,
    };
  });

  // Thống kê theo môn — chỉ tính attempt đúng lớp
  const subjectMap: Record<string, { count: number; gradeName: string }> = {};
  for (const attempt of submittedAttempts) {
    if (!attempt.exam) continue; // bỏ qua practice mode không có exam
    const subj = attempt.exam.subject?.name ?? 'Khác';
    const grade = attempt.exam.grade?.name ?? student.grade?.name ?? '';
    if (!subjectMap[subj]) subjectMap[subj] = { count: 0, gradeName: grade };
    subjectMap[subj].count += attempt.correctCount ?? 0;
  }
  const subjectData = Object.entries(subjectMap)
    .map(([subject, { count, gradeName }]) => ({ subject, count, gradeName }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    totalAttempts,
    totalAnswers,
    avgScore: Math.round(avgScore * 100) / 100,
    accuracyRate: Math.round(accuracyRate * 100) / 100,
    dailyScores,
    subjectData,
    gradeName: student.grade?.name ?? null,
    recentAttempts: submittedAttempts.slice(0, 5),
  });
}
