export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ totalPoints: 0, history: [], leaderboard: [] });

  // Tổng điểm và lịch sử của học sinh này
  const [pointRows, history] = await Promise.all([
    prisma.studentPoint.groupBy({
      by: ['studentId'],
      where: { studentId: student.id },
      _sum: { points: true },
    }),
    prisma.studentPoint.findMany({
      where: { studentId: student.id },
      include: { subject: { select: { name: true, icon: true } } },
      orderBy: { earnedAt: 'desc' },
      take: 20,
    }),
  ]);

  const totalPoints = pointRows[0]?._sum.points ?? 0;

  // Bảng xếp hạng: top 10 học sinh có nhiều điểm nhất
  const leaderboardRaw = await prisma.studentPoint.groupBy({
    by: ['studentId'],
    _sum: { points: true },
    orderBy: { _sum: { points: 'desc' } },
    take: 10,
  });

  const studentIds = leaderboardRaw.map(r => r.studentId);
  const students = await prisma.student.findMany({
    where: { id: { in: studentIds } },
    include: { user: { select: { fullName: true, avatar: true } } },
  });
  const studentMap = new Map(students.map(s => [s.id, s]));

  const leaderboard = leaderboardRaw.map((r, idx) => {
    const s = studentMap.get(r.studentId);
    return {
      rank: idx + 1,
      studentId: r.studentId,
      name: s?.user.fullName ?? 'Học sinh',
      avatar: s?.user.avatar ?? null,
      totalPoints: r._sum.points ?? 0,
      isMe: r.studentId === student.id,
    };
  });

  // Xếp hạng của học sinh hiện tại (nếu không trong top 10)
  let myRank = leaderboard.find(l => l.isMe)?.rank ?? null;
  if (!myRank && totalPoints > 0) {
    const above = await prisma.studentPoint.groupBy({
      by: ['studentId'],
      _sum: { points: true },
      having: { points: { _sum: { gt: totalPoints } } },
    });
    myRank = above.length + 1;
  }

  return NextResponse.json({ totalPoints, myRank, history, leaderboard });
}
