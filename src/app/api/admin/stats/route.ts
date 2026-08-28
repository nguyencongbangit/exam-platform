export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [totalUsers, totalStudents, totalTeachers, totalQuestions, totalExams, totalAttempts] = await Promise.all([
    prisma.user.count(),
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.question.count(),
    prisma.exam.count(),
    prisma.attempt.count({ where: { status: 'SUBMITTED' } }),
  ]);

  return NextResponse.json({ totalUsers, totalStudents, totalTeachers, totalQuestions, totalExams, totalAttempts });
}
