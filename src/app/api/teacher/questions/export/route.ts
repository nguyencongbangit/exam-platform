export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function escapeCell(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return `"${value}"`;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');
  const gradeId = searchParams.get('gradeId');
  const difficulty = searchParams.get('difficulty');

  const where: any = {};
  if (subjectId) where.subjectId = subjectId;
  if (gradeId) where.gradeId = gradeId;
  if (difficulty) where.difficulty = difficulty;
  if (session.user.role === 'TEACHER') {
    where.createdBy = { userId: session.user.id };
  }

  const questions = await prisma.question.findMany({
    where,
    include: {
      subject: true,
      grade: true,
      topic: true,
      options: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const header = 'Nội dung câu hỏi,Môn học,Lớp,Chủ đề,Độ khó,Đáp án A,Đáp án B,Đáp án C,Đáp án D,Đáp án đúng,Lời giải';

  const rows = questions.map((q) => {
    const opts = q.options;
    const correctKey = opts.find((o) => o.isCorrect)?.optionKey || '';
    return [
      q.content,
      q.subject?.code || '',
      q.grade?.name || '',
      q.topic?.name || '',
      q.difficulty,
      opts.find((o) => o.optionKey === 'A')?.content || '',
      opts.find((o) => o.optionKey === 'B')?.content || '',
      opts.find((o) => o.optionKey === 'C')?.content || '',
      opts.find((o) => o.optionKey === 'D')?.content || '',
      correctKey,
      q.explanation || '',
    ]
      .map(escapeCell)
      .join(',');
  });

  const csv = [header, ...rows].join('\n');
  const bom = '﻿';
  const now = new Date().toISOString().slice(0, 10);

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="cau_hoi_${now}.csv"`,
    },
  });
}
