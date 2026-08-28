import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');
  const gradeId = searchParams.get('gradeId');

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { gradeId: true },
  });

  const effectiveGradeId = gradeId || student?.gradeId || undefined;

  const topics = await prisma.topic.findMany({
    where: {
      ...(subjectId ? { subjectId } : {}),
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      sortOrder: true,
      _count: {
        select: {
          questions: {
            where: {
              status: 'ACTIVE',
              questionType: 'MULTIPLE_CHOICE',
              ...(effectiveGradeId ? { gradeId: effectiveGradeId } : {}),
            },
          },
        },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  const result = topics
    .filter(t => t._count.questions > 0)
    .map(t => ({ id: t.id, name: t.name, questionCount: t._count.questions }));

  return NextResponse.json(result);
}
