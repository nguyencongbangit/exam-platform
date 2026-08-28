import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSchoolProgress } from '@/lib/schoolCalendar';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grade: true },
  });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const progress = getSchoolProgress();

  // Lấy topics theo môn + lớp, sắp xếp ổn định (sortOrder → id)
  const where: Record<string, unknown> = {};
  if (student.gradeId) where.gradeId = student.gradeId;
  if (subjectId) where.subjectId = subjectId;

  const allTopics = await prisma.topic.findMany({
    where: Object.keys(where).length ? where : undefined,
    include: { subject: { select: { name: true, code: true } } },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });

  // Tính số topics đã học (theo % tiến độ)
  const coveredCount = Math.max(1, Math.ceil(allTopics.length * progress.percent));
  const coveredTopics = allTopics.slice(0, coveredCount);
  const currentTopics = coveredTopics.slice(-3); // 3 topic đang học gần nhất

  // Đếm câu hỏi khả dụng từ topics đã học
  const questionCount = await prisma.question.count({
    where: {
      status: 'ACTIVE',
      questionType: 'MULTIPLE_CHOICE',
      topicId: { in: coveredTopics.map(t => t.id) },
      ...(student.gradeId ? { gradeId: student.gradeId } : {}),
      ...(subjectId ? { subjectId } : {}),
    },
  });

  return NextResponse.json({
    progress,
    totalTopics: allTopics.length,
    coveredTopics: coveredCount,
    currentTopics: currentTopics.map(t => ({ id: t.id, name: t.name, subject: t.subject.name })),
    availableQuestions: questionCount,
    gradeName: student.grade?.name ?? null,
  });
}
