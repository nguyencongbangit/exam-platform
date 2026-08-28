import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { subjectId, topicId } = await req.json().catch(() => ({}));

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grade: true },
  });
  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh' }, { status: 403 });

  // Lấy các câu học sinh hay sai nhất (wrongCount > 0, sắp xếp theo tỉ lệ sai)
  const stats = await prisma.studentQuestionStat.findMany({
    where: {
      studentId: student.id,
      wrongCount: { gt: 0 },
      question: {
        status: 'ACTIVE',
        questionType: 'MULTIPLE_CHOICE',
        ...(student.gradeId ? { gradeId: student.gradeId } : {}),
        ...(subjectId ? { subjectId } : {}),
        ...(topicId ? { topicId } : {}),
      },
    },
    include: { question: { select: { id: true } } },
    orderBy: { wrongCount: 'desc' },
    take: 60,
  });

  let questionIds = stats.map(s => s.question.id);

  // Nếu chưa đủ 10 câu từ lịch sử sai → bổ sung câu ngẫu nhiên cùng môn/lớp
  if (questionIds.length < 10) {
    const extra = await prisma.question.findMany({
      where: {
        status: 'ACTIVE',
        questionType: 'MULTIPLE_CHOICE',
        ...(student.gradeId ? { gradeId: student.gradeId } : {}),
        ...(subjectId ? { subjectId } : {}),
        ...(topicId ? { topicId } : {}),
        id: { notIn: questionIds },
      },
      select: { id: true },
      take: 40,
    });
    questionIds = [...questionIds, ...shuffle(extra.map(q => q.id))];
  }

  if (questionIds.length < 5) {
    return NextResponse.json({ error: 'Chưa có đủ dữ liệu để luyện điểm yếu. Hãy làm thêm bài thi trước!' }, { status: 400 });
  }

  const selected = questionIds.slice(0, 20);

  const attempt = await prisma.attempt.create({
    data: {
      studentId: student.id,
      practiceMode: 'WEAK',
      durationMinutes: 25,
      status: 'IN_PROGRESS',
      attemptQuestions: {
        create: selected.map((id, i) => ({ questionId: id, displayOrder: i })),
      },
    },
  });

  return NextResponse.json({ attemptId: attempt.id, gradeName: student.grade?.name ?? null }, { status: 201 });
}
