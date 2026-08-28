import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const count = Math.min(parseInt(searchParams.get('count') || '10'), 30);
  const subjectId = searchParams.get('subjectId') || undefined;
  const gradeId = searchParams.get('gradeId') || undefined;
  const difficulty = searchParams.get('difficulty') || undefined;

  const where: any = { status: 'ACTIVE', questionType: 'MULTIPLE_CHOICE' };
  if (subjectId) where.subjectId = subjectId;
  if (gradeId) where.gradeId = gradeId;
  if (difficulty) where.difficulty = difficulty;

  const total = await prisma.question.count({ where });
  if (total === 0) return NextResponse.json({ questions: [] });

  // Lấy ngẫu nhiên bằng cách skip random offset
  const skip = Math.max(0, Math.floor(Math.random() * Math.max(1, total - count)));
  const questions = await prisma.question.findMany({
    where,
    include: {
      options: { orderBy: { sortOrder: 'asc' } },
      subject: { select: { name: true } },
    },
    skip,
    take: count,
  });

  // Shuffle options cho mỗi câu
  const shuffled = questions.map((q) => ({
    id: q.id,
    content: q.content,
    difficulty: q.difficulty,
    explanation: q.explanation,
    subject: q.subject.name,
    options: [...q.options].sort(() => Math.random() - 0.5).map((o) => ({
      id: o.id,
      key: o.optionKey,
      content: o.content,
      isCorrect: o.isCorrect,
    })),
  }));

  // Shuffle thứ tự câu hỏi
  shuffled.sort(() => Math.random() - 0.5);

  return NextResponse.json({ questions: shuffled });
}
