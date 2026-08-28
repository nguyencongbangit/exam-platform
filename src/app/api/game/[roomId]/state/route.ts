export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const roomInclude = {
  participants: {
    include: { student: { include: { user: { select: { fullName: true } } } } },
    orderBy: { score: 'desc' as const },
  },
  questions: {
    include: { question: { include: { options: { orderBy: { sortOrder: 'asc' as const } } } } },
    orderBy: { order: 'asc' as const },
  },
  messages: {
    orderBy: { createdAt: 'asc' as const },
    take: 50,
  },
};

export async function GET(req: NextRequest, { params }: { params: { roomId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let room = await prisma.gameRoom.findUnique({
    where: { id: params.roomId },
    include: roomInclude,
  });

  if (!room) return NextResponse.json({ error: 'Không tìm thấy phòng' }, { status: 404 });

  // Auto-advance: if time for current question has expired
  if (room.status === 'PLAYING' && room.questionStartedAt) {
    const elapsed = (Date.now() - room.questionStartedAt.getTime()) / 1000;
    if (elapsed >= room.secondsPerQuestion) {
      const nextIndex = room.currentQuestionIndex + 1;
      if (nextIndex < room.totalQuestions) {
        room = await prisma.gameRoom.update({
          where: { id: room.id },
          data: { currentQuestionIndex: nextIndex, questionStartedAt: new Date() },
          include: roomInclude,
        });
      } else {
        room = await prisma.gameRoom.update({
          where: { id: room.id },
          data: { status: 'FINISHED', finishedAt: new Date() },
          include: roomInclude,
        });
      }
    }
  }

  const student = session.user.role === 'STUDENT'
    ? await prisma.student.findUnique({ where: { userId: session.user.id } })
    : null;

  const currentQ = room.questions[room.currentQuestionIndex]?.question;

  const myAnswer = student && currentQ
    ? await prisma.gameAnswer.findUnique({
        where: { roomId_questionId_studentId: { roomId: room.id, questionId: currentQ.id, studentId: student.id } },
      })
    : null;

  const timeExpired = room.questionStartedAt
    ? (Date.now() - room.questionStartedAt.getTime()) / 1000 >= room.secondsPerQuestion
    : false;
  const revealAnswers = !!myAnswer || timeExpired || room.status === 'FINISHED';

  const currentQuestion = currentQ && room.status === 'PLAYING' ? {
    id: currentQ.id,
    content: currentQ.content,
    options: currentQ.options.map((o) => ({
      id: o.id,
      optionKey: o.optionKey,
      content: o.content,
      isCorrect: revealAnswers ? o.isCorrect : undefined,
    })),
  } : null;

  const participantsWithStatus = await Promise.all(
    room.participants.map(async (p) => {
      const answeredCurrent = currentQ
        ? !!(await prisma.gameAnswer.findUnique({
            where: { roomId_questionId_studentId: { roomId: room.id, questionId: currentQ.id, studentId: p.studentId } },
          }))
        : false;
      return {
        studentId: p.studentId,
        name: p.student.user.fullName,
        score: p.score,
        answeredCurrent,
        isHost: p.studentId === room!.hostId,
      };
    })
  );

  return NextResponse.json({
    roomId: room.id,
    code: room.code,
    status: room.status,
    hostId: room.hostId,
    myStudentId: student?.id ?? null,
    difficulty: room.difficulty,
    currentQuestionIndex: room.currentQuestionIndex,
    totalQuestions: room.totalQuestions,
    secondsPerQuestion: room.secondsPerQuestion,
    questionStartedAt: room.questionStartedAt?.toISOString() ?? null,
    participants: participantsWithStatus,
    currentQuestion,
    myAnswer: myAnswer ? {
      selectedOptionId: myAnswer.selectedOptionId,
      isCorrect: myAnswer.isCorrect,
      pointsEarned: myAnswer.pointsEarned,
    } : null,
    messages: room.messages.map((m) => ({
      id: m.id,
      studentId: m.studentId,
      senderName: m.senderName,
      message: m.message,
      createdAt: m.createdAt.toISOString(),
    })),
  });
}
