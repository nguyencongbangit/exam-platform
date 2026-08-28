import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PRACTICE_LABELS: Record<string, string> = { EASY: 'Dễ', MEDIUM: 'Trung bình', HARD: 'Khó' };

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: params.id },
    include: {
      exam: { include: { subject: true, grade: true } },
      attemptQuestions: {
        include: {
          question: { include: { options: { orderBy: { sortOrder: 'asc' } }, topic: true, subject: true } },
        },
        orderBy: { displayOrder: 'asc' },
      },
      answers: {
        include: {
          question: { include: { options: { orderBy: { sortOrder: 'asc' } }, topic: true } },
          selectedOption: true,
        },
      },
    },
  });

  if (!attempt) return NextResponse.json({ error: 'Không tìm thấy kết quả' }, { status: 404 });

  if (attempt.practiceMode) {
    const examQuestions = attempt.attemptQuestions.map((aq) => ({
      questionId: aq.questionId,
      questionOrder: aq.displayOrder,
    }));

    // Get subject name from the questions in this attempt
    const subjectNames = [...new Set(
      attempt.attemptQuestions
        .map((aq: any) => aq.question?.subject?.name)
        .filter(Boolean)
    )];
    const subjectName = subjectNames.length === 1 ? subjectNames[0] : 'Tổng hợp';

    return NextResponse.json({
      attempt: {
        ...attempt,
        exam: {
          title: `Luyện tập - ${PRACTICE_LABELS[attempt.practiceMode] || attempt.practiceMode}`,
          subject: { name: subjectName },
          grade: null,
          maxScore: 10,
        },
      },
      examQuestions,
      isPractice: true,
    });
  }

  const examQuestions = await prisma.examQuestion.findMany({
    where: { examId: attempt.examId! },
    orderBy: { questionOrder: 'asc' },
  });

  return NextResponse.json({ attempt, examQuestions });
}
