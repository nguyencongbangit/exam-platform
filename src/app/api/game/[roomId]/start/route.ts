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

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const room = await prisma.gameRoom.findUnique({ where: { id: params.roomId } });
  if (!room) return NextResponse.json({ error: 'Không tìm thấy phòng' }, { status: 404 });
  if (room.hostId !== student.id) return NextResponse.json({ error: 'Chỉ chủ phòng mới có thể bắt đầu' }, { status: 403 });
  if (room.status !== 'WAITING') return NextResponse.json({ error: 'Phòng đã bắt đầu' }, { status: 400 });

  await prisma.gameRoom.update({
    where: { id: room.id },
    data: { status: 'PLAYING', currentQuestionIndex: 0, questionStartedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
