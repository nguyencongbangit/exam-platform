import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/chess-room/[code] — lấy trạng thái phòng (polling)
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const room = await prisma.chessRoom.findUnique({ where: { code: params.code.toUpperCase() } });
  if (!room) return NextResponse.json({ error: 'Phòng không tồn tại' }, { status: 404 });

  return NextResponse.json({
    code: room.code,
    hostId: room.hostId,
    guestId: room.guestId,
    hostName: room.hostName,
    guestName: room.guestName,
    hostColor: room.hostColor,
    fen: room.fen,
    moveHistory: JSON.parse(room.moveHistory),
    status: room.status,
    result: room.result,
    updatedAt: room.updatedAt,
  });
}

// POST /api/chess-room/[code] — tham gia phòng
export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const room = await prisma.chessRoom.findUnique({ where: { code: params.code.toUpperCase() } });
  if (!room) return NextResponse.json({ error: 'Phòng không tồn tại' }, { status: 404 });
  if (room.status !== 'WAITING') return NextResponse.json({ error: 'Phòng đã đầy hoặc kết thúc' }, { status: 400 });
  if (room.hostId === session.user.id) return NextResponse.json({ error: 'Bạn đã là chủ phòng' }, { status: 400 });

  const updated = await prisma.chessRoom.update({
    where: { code: room.code },
    data: {
      guestId: session.user.id,
      guestName: session.user.name ?? session.user.email ?? 'Bạn',
      status: 'PLAYING',
    },
  });

  return NextResponse.json({
    code: updated.code,
    hostColor: updated.hostColor,
    myColor: updated.hostColor === 'w' ? 'b' : 'w',
  });
}
