import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json([]);

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      studentId: student.id,
      question: student.gradeId ? { gradeId: student.gradeId } : undefined,
    },
    include: { question: { include: { subject: true, topic: true, grade: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(bookmarks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { questionId } = await req.json();
  const bm = await prisma.bookmark.upsert({
    where: { studentId_questionId: { studentId: student.id, questionId } },
    update: {},
    create: { studentId: student.id, questionId },
  });
  return NextResponse.json(bm, { status: 201 });
}
