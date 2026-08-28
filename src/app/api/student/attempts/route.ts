import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json([]);

  const gradeFilter = student.gradeId
    ? { OR: [{ exam: { gradeId: student.gradeId } }, { examId: null }] }
    : {};

  const attempts = await prisma.attempt.findMany({
    where: { studentId: student.id, status: 'SUBMITTED', ...gradeFilter },
    include: {
      exam: { include: { subject: true, grade: true } },
    },
    orderBy: { submittedAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(attempts);
}
