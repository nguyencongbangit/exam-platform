import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function makeCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// POST /api/chess-room — tạo phòng mới
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let code = makeCode();
  // Đảm bảo code chưa tồn tại
  for (let i = 0; i < 5; i++) {
    const exists = await prisma.chessRoom.findUnique({ where: { code } });
    if (!exists) break;
    code = makeCode();
  }

  const room = await prisma.chessRoom.create({
    data: {
      code,
      hostId: session.user.id,
      hostName: session.user.name ?? session.user.email ?? 'Bạn',
      hostColor: 'w',
      status: 'WAITING',
    },
  });

  return NextResponse.json({ code: room.code, roomId: room.id }, { status: 201 });
}
