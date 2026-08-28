export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PRACTICE_LABELS: Record<string, string> = { EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó' };

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const attempt = await prisma.attempt.findUnique({
    where: { id: params.id },
    include: {
      exam: {
        include: {
          subject: true,
          grade: true,
          questions: {
            include: {
              question: { include: { options: { orderBy: { sortOrder: 'asc' } }, topic: true } },
            },
            orderBy: { questionOrder: 'asc' },
          },
        },
      },
      attemptQuestions: {
        include: {
          question: { include: { options: { orderBy: { sortOrder: 'asc' } }, topic: true } },
        },
        orderBy: { displayOrder: 'asc' },
      },
      answers: true,
    },
  });

  if (!attempt) return NextResponse.json({ error: 'Không tìm thấy bài làm' }, { status: 404 });

  // Normalize practice mode to match exam structure expected by frontend
  if (attempt.practiceMode) {
    return NextResponse.json({
      ...attempt,
      exam: {
        title: `Luyện tập - ${PRACTICE_LABELS[attempt.practiceMode] || attempt.practiceMode}`,
        subject: { name: 'Tổng hợp' },
        grade: null,
        durationMinutes: attempt.durationMinutes,
        maxScore: 10,
        questions: attempt.attemptQuestions.map((aq) => ({
          questionOrder: aq.displayOrder,
          question: aq.question,
        })),
      },
    });
  }

  return NextResponse.json(attempt);
}
