import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Chess } from 'chess.js';

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { move } = await req.json(); // { from, to, promotion? }
  if (!move?.from || !move?.to) return NextResponse.json({ error: 'Thiếu thông tin nước đi' }, { status: 400 });

  const room = await prisma.chessRoom.findUnique({ where: { code: params.code.toUpperCase() } });
  if (!room) return NextResponse.json({ error: 'Phòng không tồn tại' }, { status: 404 });
  if (room.status !== 'PLAYING') return NextResponse.json({ error: 'Ván cờ chưa bắt đầu hoặc đã kết thúc' }, { status: 400 });

  // Xác định màu của người gửi request
  const isHost = room.hostId === session.user.id;
  const isGuest = room.guestId === session.user.id;
  if (!isHost && !isGuest) return NextResponse.json({ error: 'Bạn không ở trong phòng này' }, { status: 403 });

  const myColor = isHost ? room.hostColor : (room.hostColor === 'w' ? 'b' : 'w');

  // Khôi phục bàn cờ từ FEN
  const chess = new Chess(room.fen);
  if (chess.turn() !== myColor) return NextResponse.json({ error: 'Chưa đến lượt bạn' }, { status: 400 });

  // Thực hiện nước đi
  let result;
  try {
    result = chess.move({ from: move.from, to: move.to, promotion: move.promotion ?? 'q' });
  } catch {
    return NextResponse.json({ error: 'Nước đi không hợp lệ' }, { status: 400 });
  }

  const history = JSON.parse(room.moveHistory) as string[];
  history.push(result.san);

  // Kiểm tra kết thúc ván
  let status = 'PLAYING';
  let gameResult: string | null = null;
  if (chess.isCheckmate()) {
    status = 'FINISHED';
    gameResult = `checkmate:${myColor}`;
  } else if (chess.isStalemate()) {
    status = 'FINISHED';
    gameResult = 'stalemate';
  } else if (chess.isDraw()) {
    status = 'FINISHED';
    gameResult = 'draw';
  }

  await prisma.chessRoom.update({
    where: { code: room.code },
    data: {
      fen: chess.fen(),
      moveHistory: JSON.stringify(history),
      status,
      result: gameResult,
    },
  });

  return NextResponse.json({ fen: chess.fen(), san: result.san, status, result: gameResult });
}
