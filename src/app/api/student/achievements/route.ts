export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ earned: [], all: [] });

  const [all, earned] = await Promise.all([
    prisma.achievement.findMany({ orderBy: { conditionValue: 'asc' } }),
    prisma.studentAchievement.findMany({ where: { studentId: student.id }, orderBy: { earnedAt: 'desc' } }),
  ]);

  return NextResponse.json({ all, earned });
}
