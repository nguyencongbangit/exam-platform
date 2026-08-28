export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  let gradeId = searchParams.get('gradeId');

  if (session?.user.role === 'STUDENT' && !gradeId) {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { gradeId: true },
    });
    if (student?.gradeId) gradeId = student.gradeId;
  }

  const where: any = { status: 'PUBLISHED' };
  if (gradeId) where.gradeId = gradeId;

  const grouped = await prisma.exam.groupBy({
    by: ['subjectId'],
    where,
    _count: { id: true },
  });

  const stats: Record<string, number> = {};
  for (const g of grouped) stats[g.subjectId] = g._count.id;

  return NextResponse.json({ stats, gradeId });
}
