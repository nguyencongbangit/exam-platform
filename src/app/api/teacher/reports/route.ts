import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const where = session.user.role === 'ADMIN' ? {} : { exam: { createdById: session.user.id } };

  const [totalAttempts, scores] = await Promise.all([
    prisma.attempt.count({ where: { status: 'SUBMITTED', ...where } }),
    prisma.attempt.findMany({
      where: { status: 'SUBMITTED', score: { not: null }, ...where },
      select: { score: true, correctCount: true, wrongCount: true },
    }),
  ]);

  const avgScore = scores.length > 0 ? scores.reduce((s, a) => s + (a.score || 0), 0) / scores.length : 0;
  const totalAnswered = scores.reduce((s, a) => s + a.correctCount + a.wrongCount, 0);
  const totalCorrect = scores.reduce((s, a) => s + a.correctCount, 0);
  const avgAccuracy = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;

  return NextResponse.json({ totalAttempts, avgScore, avgAccuracy, hardestQuestions: [] });
}
