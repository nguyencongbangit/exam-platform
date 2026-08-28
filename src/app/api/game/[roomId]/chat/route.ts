export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { roomId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await req.json();
  const trimmed = (message || '').trim().slice(0, 200);
  if (!trimmed) return NextResponse.json({ error: 'Tin nhắn trống' }, { status: 400 });

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { fullName: true } } },
  });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Must be a participant
  const participant = await prisma.gameParticipant.findUnique({
    where: { roomId_studentId: { roomId: params.roomId, studentId: student.id } },
  });
  if (!participant) return NextResponse.json({ error: 'Bạn không ở trong phòng này' }, { status: 403 });

  await prisma.gameMessage.create({
    data: {
      roomId: params.roomId,
      studentId: student.id,
      senderName: student.user.fullName,
      message: trimmed,
    },
  });

  return NextResponse.json({ ok: true });
}
