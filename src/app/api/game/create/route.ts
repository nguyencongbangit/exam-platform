import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const DIFFICULTY_MAP: Record<string, string[]> = {
  EASY: ['EASY'],
  MEDIUM: ['EASY', 'MEDIUM'],
  HARD: ['HARD', 'VERY_HARD'],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function generateCode(): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const exists = await prisma.gameRoom.findUnique({ where: { code } });
    if (!exists) return code;
  }
  throw new Error('Could not generate unique code');
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Bạn cần đăng nhập để tạo phòng' }, { status: 401 });
  }

  const { difficulty = 'MEDIUM', subjectId } = await req.json();
  const difficulties = DIFFICULTY_MAP[difficulty] || ['EASY', 'MEDIUM'];

  // Get student record if available (for grade filtering)
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });

  // For non-student roles (admin/teacher), create a virtual host entry using their user record
  // They can host a room without grade restriction
  let hostStudentId: string;
  if (student) {
    hostStudentId = student.id;
  } else {
    // Admin/Teacher: use first student account as placeholder host OR reject
    return NextResponse.json({ error: 'Chỉ học sinh mới có thể tạo phòng chơi' }, { status: 403 });
  }

  const where: Record<string, unknown> = {
    difficulty: { in: difficulties },
    status: 'ACTIVE',
    questionType: 'MULTIPLE_CHOICE',
  };
  if (student.gradeId) where.gradeId = student.gradeId;
  if (subjectId) where.subjectId = subjectId;

  let questions = await prisma.question.findMany({ where, select: { id: true } });
  if (questions.length < 5 && subjectId) {
    const { subjectId: _s, ...rest } = where;
    questions = await prisma.question.findMany({ where: rest, select: { id: true } });
  }
  if (questions.length < 5) {
    return NextResponse.json({ error: 'Không đủ câu hỏi cho chế độ này' }, { status: 400 });
  }

  const selected = shuffle(questions).slice(0, 10);
  const code = await generateCode();

  const room = await prisma.gameRoom.create({
    data: {
      code,
      hostId: student.id,
      gradeId: student.gradeId,
      subjectId: subjectId || null,
      difficulty,
      totalQuestions: selected.length,
      participants: { create: { studentId: student.id } },
      questions: { create: selected.map((q, i) => ({ questionId: q.id, order: i })) },
    },
  });

  return NextResponse.json({ roomId: room.id, code }, { status: 201 });
}
