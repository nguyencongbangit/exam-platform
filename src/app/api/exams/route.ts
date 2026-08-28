export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');
  let gradeId = searchParams.get('gradeId');
  const difficulty = searchParams.get('difficulty');
  const examType = searchParams.get('examType');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const skip = (page - 1) * limit;

  // Học sinh chỉ thấy đề đúng lớp của mình (tự động, không cần truyền gradeId)
  if (session?.user.role === 'STUDENT' && !gradeId) {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { gradeId: true },
    });
    if (student?.gradeId) gradeId = student.gradeId;
  }

  const topicId = searchParams.get('topicId');

  const where: any = { status: 'PUBLISHED' };
  if (subjectId) where.subjectId = subjectId;
  if (gradeId) where.gradeId = gradeId;
  if (difficulty) where.difficulty = difficulty;
  if (examType) where.examType = examType;
  if (topicId) where.questions = { some: { question: { topicId } } };

  const [exams, total] = await Promise.all([
    prisma.exam.findMany({
      where,
      include: {
        subject: true,
        grade: true,
        createdBy: { select: { fullName: true } },
        _count: { select: { attempts: true } },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.exam.count({ where }),
  ]);

  return NextResponse.json({ exams, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const exam = await prisma.exam.create({
    data: {
      ...body,
      createdById: session.user.id,
    },
  });
  return NextResponse.json(exam, { status: 201 });
}
