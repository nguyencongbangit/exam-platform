import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { questionId, selectedOptionId } = await req.json();

  const option = selectedOptionId
    ? await prisma.questionOption.findUnique({ where: { id: selectedOptionId } })
    : null;

  const existing = await prisma.answer.findFirst({
    where: { attemptId: params.id, questionId },
  });

  if (existing) {
    await prisma.answer.update({
      where: { id: existing.id },
      data: {
        selectedOptionId,
        isCorrect: option?.isCorrect ?? null,
        answeredAt: new Date(),
      },
    });
  } else {
    await prisma.answer.create({
      data: {
        attemptId: params.id,
        questionId,
        selectedOptionId,
        isCorrect: option?.isCorrect ?? null,
        answeredAt: new Date(),
      },
    });
  }

  return NextResponse.json({ ok: true });
}
