import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          student: {
            include: {
              user: { select: { fullName: true, email: true } },
              grade: true,
            },
          },
        },
      },
    },
  });

  if (!parent) return NextResponse.json({ children: [] });

  const children = await Promise.all(
    parent.children.map(async (sp) => {
      const student = sp.student;
      const [totalAttempts, submittedAttempts] = await Promise.all([
        prisma.attempt.count({ where: { studentId: student.id } }),
        prisma.attempt.findMany({
          where: { studentId: student.id, status: 'SUBMITTED' },
          include: { exam: true },
          orderBy: { submittedAt: 'desc' },
          take: 5,
        }),
      ]);

      const totalAnswers = await prisma.answer.count({ where: { attempt: { studentId: student.id } } });
      const correctAnswers = await prisma.answer.count({ where: { attempt: { studentId: student.id }, isCorrect: true } });
      const avgScore = submittedAttempts.length > 0
        ? submittedAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / submittedAttempts.filter(a => a.score !== null).length
        : 0;

      return {
        ...student,
        stats: {
          totalAttempts,
          avgScore,
          accuracyRate: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0,
        },
        recentAttempts: submittedAttempts,
      };
    })
  );

  return NextResponse.json({ children });
}
