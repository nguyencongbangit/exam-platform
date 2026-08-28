export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const exams = await prisma.exam.findMany({
    where: session.user.role === 'ADMIN' ? {} : { createdById: session.user.id },
    include: {
      subject: true,
      grade: true,
      _count: { select: { questions: true, attempts: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { questionIds, ...examData } = body;

  const exam = await prisma.exam.create({
    data: {
      ...examData,
      createdById: session.user.id,
      totalQuestions: questionIds?.length || 0,
      questions: questionIds
        ? {
            create: questionIds.map((qId: string, i: number) => ({
              questionId: qId,
              questionOrder: i + 1,
              points: examData.maxScore / questionIds.length,
            })),
          }
        : undefined,
    },
    include: { questions: true },
  });

  return NextResponse.json(exam, { status: 201 });
}
