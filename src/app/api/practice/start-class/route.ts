export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSchoolProgress } from '@/lib/schoolCalendar';

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

  const { subjectId } = await req.json().catch(() => ({}));

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grade: true },
  });
  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh' }, { status: 403 });

  const progress = getSchoolProgress();

  // Lấy toàn bộ topics theo lớp + môn, sắp xếp ổn định theo thứ tự chương trình
  const allTopics = await prisma.topic.findMany({
    where: {
      ...(student.gradeId ? { gradeId: student.gradeId } : {}),
      ...(subjectId ? { subjectId } : {}),
    },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    select: { id: true, name: true },
  });

  if (allTopics.length === 0) {
    return NextResponse.json({ error: 'Chưa có chương trình học cho lớp này. Hãy thử chế độ luyện tập khác!' }, { status: 400 });
  }

  // Tính số topics đã học đến thời điểm hiện tại
  const coveredCount = Math.max(1, Math.ceil(allTopics.length * progress.percent));
  const coveredTopics = allTopics.slice(0, coveredCount);

  // Ưu tiên 60% câu từ 3 topic gần nhất (đang học), 40% từ các topic trước (ôn tập)
  const recentTopics = coveredTopics.slice(-3);
  const olderTopics = coveredTopics.slice(0, -3);

  const [recentQuestions, olderQuestions] = await Promise.all([
    prisma.question.findMany({
      where: {
        status: 'ACTIVE',
        questionType: 'MULTIPLE_CHOICE',
        topicId: { in: recentTopics.map(t => t.id) },
        ...(student.gradeId ? { gradeId: student.gradeId } : {}),
        ...(subjectId ? { subjectId } : {}),
      },
      select: { id: true },
    }),
    olderTopics.length > 0
      ? prisma.question.findMany({
          where: {
            status: 'ACTIVE',
            questionType: 'MULTIPLE_CHOICE',
            topicId: { in: olderTopics.map(t => t.id) },
            ...(student.gradeId ? { gradeId: student.gradeId } : {}),
            ...(subjectId ? { subjectId } : {}),
          },
          select: { id: true },
        })
      : Promise.resolve([]),
  ]);

  // Nếu topics không có câu hỏi → fallback lấy toàn bộ câu theo lớp+môn
  let selectedIds: string[];

  if (recentQuestions.length + olderQuestions.length < 5) {
    const fallback = await prisma.question.findMany({
      where: {
        status: 'ACTIVE',
        questionType: 'MULTIPLE_CHOICE',
        ...(student.gradeId ? { gradeId: student.gradeId } : {}),
        ...(subjectId ? { subjectId } : {}),
      },
      select: { id: true },
    });
    if (fallback.length < 5) {
      return NextResponse.json({ error: 'Ngân hàng câu hỏi chưa đủ cho chương trình học này!' }, { status: 400 });
    }
    selectedIds = shuffle(fallback.map(q => q.id)).slice(0, 20);
  } else {
    const recentTarget = Math.min(12, recentQuestions.length); // 60% ≈ 12 câu topic hiện tại
    const olderTarget = Math.min(8, olderQuestions.length);   // 40% ≈ 8 câu ôn tập

    const picked = [
      ...shuffle(recentQuestions.map(q => q.id)).slice(0, recentTarget),
      ...shuffle(olderQuestions.map(q => q.id)).slice(0, olderTarget),
    ];

    // Nếu một phần thiếu câu → bổ sung từ phần còn lại
    if (picked.length < 20) {
      const allPool = shuffle([
        ...recentQuestions.map(q => q.id),
        ...olderQuestions.map(q => q.id),
      ]);
      const extra = allPool.filter(id => !picked.includes(id)).slice(0, 20 - picked.length);
      picked.push(...extra);
    }

    selectedIds = shuffle(picked).slice(0, 20);
  }

  const attempt = await prisma.attempt.create({
    data: {
      studentId: student.id,
      practiceMode: 'CLASS_PROGRESS',
      durationMinutes: 20,
      status: 'IN_PROGRESS',
      attemptQuestions: {
        create: selectedIds.map((id, i) => ({ questionId: id, displayOrder: i })),
      },
    },
  });

  return NextResponse.json({
    attemptId: attempt.id,
    gradeName: student.grade?.name ?? null,
    progressLabel: progress.label,
    coveredTopics: coveredCount,
    totalTopics: allTopics.length,
    currentTopics: recentTopics.map(t => t.name),
  }, { status: 201 });
}
