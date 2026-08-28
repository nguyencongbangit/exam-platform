import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { roomId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { questionId, selectedOptionId } = await req.json();

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const room = await prisma.gameRoom.findUnique({ where: { id: params.roomId } });
  if (!room || room.status !== 'PLAYING') {
    return NextResponse.json({ error: 'Phòng không ở trạng thái đang chơi' }, { status: 400 });
  }

  const currentQ = await prisma.gameRoomQuestion.findFirst({
    where: { roomId: room.id, order: room.currentQuestionIndex },
  });
  if (!currentQ || currentQ.questionId !== questionId) {
    return NextResponse.json({ error: 'Câu hỏi không hợp lệ' }, { status: 400 });
  }

  const existing = await prisma.gameAnswer.findUnique({
    where: { roomId_questionId_studentId: { roomId: room.id, questionId, studentId: student.id } },
  });
  if (existing) return NextResponse.json({ error: 'Đã trả lời rồi' }, { status: 400 });

  const timeMs = room.questionStartedAt ? Date.now() - room.questionStartedAt.getTime() : 0;
  if (timeMs > room.secondsPerQuestion * 1000) {
    return NextResponse.json({ error: 'Hết giờ' }, { status: 400 });
  }

  const option = await prisma.questionOption.findUnique({ where: { id: selectedOptionId } });
  const isCorrect = option?.isCorrect ?? false;

  const ratio = Math.max(0.1, (room.secondsPerQuestion * 1000 - timeMs) / (room.secondsPerQuestion * 1000));
  const pointsEarned = isCorrect ? Math.round(1000 * ratio) : 0;

  await prisma.gameAnswer.create({
    data: { roomId: room.id, questionId, studentId: student.id, selectedOptionId, isCorrect, timeMs, pointsEarned },
  });

  if (pointsEarned > 0) {
    await prisma.gameParticipant.update({
      where: { roomId_studentId: { roomId: room.id, studentId: student.id } },
      data: { score: { increment: pointsEarned } },
    });
  }

  return NextResponse.json({ isCorrect, pointsEarned });
}
