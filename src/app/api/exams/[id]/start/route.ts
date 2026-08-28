import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh' }, { status: 404 });

  const exam = await prisma.exam.findUnique({ where: { id: params.id } });
  if (!exam) return NextResponse.json({ error: 'Không tìm thấy đề thi' }, { status: 404 });

  // Check for existing in-progress attempt
  const existing = await prisma.attempt.findFirst({
    where: { examId: params.id, studentId: student.id, status: 'IN_PROGRESS' },
  });
  if (existing) return NextResponse.json({ attemptId: existing.id });

  const attempt = await prisma.attempt.create({
    data: {
      examId: params.id,
      studentId: student.id,
      status: 'IN_PROGRESS',
    },
  });

  return NextResponse.json({ attemptId: attempt.id }, { status: 201 });
}
