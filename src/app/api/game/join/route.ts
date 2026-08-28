export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: 'Thiếu mã phòng' }, { status: 400 });

  const room = await prisma.gameRoom.findUnique({ where: { code: code.toUpperCase() } });
  if (!room) return NextResponse.json({ error: 'Không tìm thấy phòng' }, { status: 404 });
  if (room.status !== 'WAITING') return NextResponse.json({ error: 'Phòng đã bắt đầu hoặc kết thúc' }, { status: 400 });

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.gameParticipant.upsert({
    where: { roomId_studentId: { roomId: room.id, studentId: student.id } },
    create: { roomId: room.id, studentId: student.id },
    update: {},
  });

  return NextResponse.json({ roomId: room.id });
}
