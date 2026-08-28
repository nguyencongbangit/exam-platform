export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PRACTICE_CONFIG: Record<string, { difficulties: string[]; count: number; duration: number }> = {
  EASY:   { difficulties: ['EASY'],              count: 15, duration: 15 },
  MEDIUM: { difficulties: ['EASY', 'MEDIUM'],    count: 20, duration: 20 },
  HARD:   { difficulties: ['HARD', 'VERY_HARD'], count: 20, duration: 25 },
};

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

  const { difficulty, subjectId, topicId } = await req.json();
  const config = PRACTICE_CONFIG[difficulty];
  if (!config) return NextResponse.json({ error: 'Độ khó không hợp lệ' }, { status: 400 });

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grade: true },
  });
  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh' }, { status: 403 });

  const where: any = {
    difficulty: { in: config.difficulties },
    status: 'ACTIVE',
    questionType: 'MULTIPLE_CHOICE',
  };

  if (student.gradeId) where.gradeId = student.gradeId;
  if (subjectId) where.subjectId = subjectId;
  if (topicId) where.topicId = topicId;

  let questions = await prisma.question.findMany({ where, select: { id: true } });

  // Fallback 1: topic quá hẹp → bỏ topic, giữ môn + độ khó
  if (questions.length < 5 && topicId) {
    const { topicId: _t, ...whereNoTopic } = where;
    questions = await prisma.question.findMany({ where: whereNoTopic, select: { id: true } });
  }

  // Fallback 2: môn có ít câu đúng độ khó → mở rộng sang tất cả độ khó, VẪN GIỮ NGUYÊN môn học
  if (questions.length < 5) {
    const { difficulty: _d, topicId: _t2, ...whereAllDiff } = where;
    whereAllDiff.status = 'ACTIVE';
    questions = await prisma.question.findMany({ where: whereAllDiff, select: { id: true } });
  }

  if (questions.length < 5) {
    return NextResponse.json({ error: 'Ngân hàng câu hỏi chưa có đủ câu cho môn này' }, { status: 400 });
  }

  const selected = shuffle(questions).slice(0, Math.min(config.count, questions.length));

  const attempt = await prisma.attempt.create({
    data: {
      studentId: student.id,
      subjectId: subjectId || null,
      practiceMode: difficulty,
      durationMinutes: config.duration,
      status: 'IN_PROGRESS',
      attemptQuestions: {
        create: selected.map((q, i) => ({ questionId: q.id, displayOrder: i })),
      },
    },
  });

  return NextResponse.json({
    attemptId: attempt.id,
    gradeName: student.grade?.name ?? null,
  }, { status: 201 });
}
