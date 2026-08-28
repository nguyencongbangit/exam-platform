import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const q = await prisma.question.findUnique({
    where: { id: params.id },
    include: { options: { orderBy: { sortOrder: 'asc' } }, subject: true, grade: true, topic: true },
  });
  if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(q);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content, difficulty, explanation, options } = await req.json();

  await prisma.questionOption.deleteMany({ where: { questionId: params.id } });

  const q = await prisma.question.update({
    where: { id: params.id },
    data: {
      content,
      difficulty,
      explanation,
      options: {
        create: options.map((opt: any, i: number) => ({
          optionKey: opt.key,
          content: opt.content,
          isCorrect: opt.isCorrect,
          sortOrder: i,
        })),
      },
    },
    include: { options: true },
  });
  return NextResponse.json(q);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.question.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
