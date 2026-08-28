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
  if (!student) return NextResponse.json([]);

  const stats = await prisma.studentQuestionStat.findMany({
    where: {
      studentId: student.id,
      wrongCount: { gt: 0 },
      question: {
        status: 'ACTIVE',
        // Chỉ lấy câu hỏi đúng lớp của học sinh
        ...(student.gradeId ? { gradeId: student.gradeId } : {}),
      },
    },
    include: {
      question: {
        include: {
          subject: true,
          topic: true,
          grade: true,
          options: { orderBy: { sortOrder: 'asc' } },
        },
      },
    },
    orderBy: { wrongCount: 'desc' },
    take: 50,
  });

  return NextResponse.json(stats);
}
