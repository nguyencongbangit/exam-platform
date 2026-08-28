export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gradeId = searchParams.get('gradeId') || undefined;

  const where = gradeId
    ? { topics: { some: { gradeId } } }
    : {};

  const subjects = await prisma.subject.findMany({
    where,
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          topics:    gradeId ? { where: { gradeId } } : true,
          questions: gradeId ? { where: { gradeId } } : true,
        },
      },
    },
  });

  return NextResponse.json(subjects);
}
