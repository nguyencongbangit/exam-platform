import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Lấy tất cả môn ACTIVE và số điểm thưởng đã nhận hôm nay cho mỗi môn
  const [subjects, todayPoints] = await Promise.all([
    prisma.subject.findMany({ where: { status: 'ACTIVE' }, select: { id: true, name: true, icon: true } }),
    prisma.studentPoint.groupBy({
      by: ['subjectId'],
      where: { studentId: student.id, earnedAt: { gte: todayStart } },
      _count: { id: true },
    }),
  ]);

  const pointsMap = new Map(todayPoints.map(p => [p.subjectId, p._count.id]));

  const remaining = subjects
    .map(s => ({ id: s.id, name: s.name, icon: s.icon, usedToday: pointsMap.get(s.id) ?? 0, remaining: Math.max(0, 2 - (pointsMap.get(s.id) ?? 0)) }))
    .filter(s => s.remaining > 0);

  return NextResponse.json(remaining);
}
