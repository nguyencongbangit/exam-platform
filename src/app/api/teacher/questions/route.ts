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

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const subjectId = searchParams.get('subjectId');
  const difficulty = searchParams.get('difficulty');

  const where: any = {};
  if (subjectId) where.subjectId = subjectId;
  if (difficulty) where.difficulty = difficulty;

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      include: {
        subject: true,
        grade: true,
        topic: true,
        options: { orderBy: { sortOrder: 'asc' } },
        createdBy: { select: { fullName: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.question.count({ where }),
  ]);

  return NextResponse.json({ questions, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content, subjectId, gradeId, topicId, difficulty, explanation, options } = await req.json();

  const question = await prisma.question.create({
    data: {
      content,
      subjectId,
      gradeId,
      topicId,
      difficulty,
      explanation,
      createdById: session.user.id,
      questionType: 'MULTIPLE_CHOICE',
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

  return NextResponse.json(question, { status: 201 });
}
