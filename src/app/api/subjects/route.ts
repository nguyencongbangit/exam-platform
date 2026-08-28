import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gradeId = searchParams.get('gradeId') || null;
  const level = searchParams.get('level') || 'MEDIUM';

  const levelMap: Record<string, string[]> = {
    EASY:   ['EASY'],
    MEDIUM: ['EASY', 'MEDIUM'],
    HARD:   ['EASY', 'MEDIUM', 'HARD', 'VERY_HARD'],
  };
  const allowedDifficulties = levelMap[level] ?? levelMap.MEDIUM;

  // Tính gradeNumber để tạo gradeCode (ANH5, TOAN7...)
  let gradeNumber: string | null = null;
  if (gradeId) {
    const grade = await prisma.grade.findUnique({
      where: { id: gradeId },
      select: { sortOrder: true },
    });
    if (grade) gradeNumber = String(grade.sortOrder);
  }

  let subjects;
  if (gradeId) {
    // Lấy môn có ít nhất 1 topic thuộc lớp này (topic existence, không bắt buộc có câu hỏi)
    const topicsWithSubjects = await prisma.topic.findMany({
      where: {
        gradeId,
      },
      select: {
        subject: { select: { id: true, name: true, code: true, icon: true, status: true } },
      },
      distinct: ['subjectId'],
    });

    const seen = new Set<string>();
    subjects = topicsWithSubjects
      .map(t => t.subject)
      .filter(s => s.status === 'ACTIVE' && !seen.has(s.id) && seen.add(s.id))
      .map(({ status: _s, ...s }) => s)
      .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  } else {
    // Không có lớp → hiện tất cả môn active
    subjects = await prisma.subject.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true, code: true, icon: true },
      orderBy: { name: 'asc' },
    });
  }

  const result = subjects.map(s => ({
    ...s,
    gradeCode: gradeNumber ? `${s.code}${gradeNumber}` : null,
  }));

  return NextResponse.json(result);
}
