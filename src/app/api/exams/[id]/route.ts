export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const exam = await prisma.exam.findUnique({
    where: { id: params.id },
    include: {
      subject: true,
      grade: true,
      createdBy: { select: { fullName: true } },
      questions: {
        include: {
          question: {
            include: { options: { orderBy: { sortOrder: 'asc' } }, topic: true },
          },
        },
        orderBy: { questionOrder: 'asc' },
      },
      _count: { select: { attempts: { where: { status: 'SUBMITTED' } } } },
    },
  });

  if (!exam) return NextResponse.json({ error: 'Không tìm thấy đề thi' }, { status: 404 });

  // Calculate average score
  const avgResult = await prisma.attempt.aggregate({
    where: { examId: params.id, status: 'SUBMITTED', score: { not: null } },
    _avg: { score: true },
  });

  return NextResponse.json({ ...exam, avgScore: avgResult._avg.score });
}
