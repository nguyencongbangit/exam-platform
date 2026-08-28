import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Trả về cây: Grade[] → Subject[] → Topic[]
export async function GET() {
  const grades = await prisma.grade.findMany({ orderBy: { sortOrder: 'asc' } });

  const result = await Promise.all(
    grades.map(async (grade) => {
      // Lấy topic theo lớp, group theo môn
      const topics = await prisma.topic.findMany({
        where: { gradeId: grade.id },
        select: {
          id: true,
          name: true,
          sortOrder: true,
          subjectId: true,
          subject: { select: { id: true, name: true, code: true, icon: true } },
          _count: { select: { questions: true } },
        },
        orderBy: [{ subject: { name: 'asc' } }, { sortOrder: 'asc' }],
      });

      // Group topics by subject
      const subjectMap = new Map<string, {
        id: string; name: string; code: string; icon: string | null;
        topics: typeof topics;
      }>();

      for (const t of topics) {
        if (!subjectMap.has(t.subjectId)) {
          subjectMap.set(t.subjectId, { ...t.subject, topics: [] });
        }
        subjectMap.get(t.subjectId)!.topics.push(t);
      }

      const subjects = Array.from(subjectMap.values()).map((s) => ({
        ...s,
        topicCount: s.topics.length,
        questionCount: s.topics.reduce((sum, t) => sum + t._count.questions, 0),
      }));

      return {
        ...grade,
        subjectCount: subjects.length,
        topicCount: topics.length,
        subjects,
      };
    })
  );

  return NextResponse.json(result);
}
