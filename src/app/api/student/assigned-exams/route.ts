import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json([]);

  // Get all classes this student is a member of
  const memberships = await prisma.classMember.findMany({
    where: { studentId: student.id },
    select: { classId: true },
  });
  const classIds = memberships.map((m) => m.classId);
  if (classIds.length === 0) return NextResponse.json([]);

  // Get all exam assignments for those classes
  const assignments = await prisma.classExamAssignment.findMany({
    where: { classId: { in: classIds } },
    include: {
      classroom: { select: { id: true, name: true, teacher: { select: { user: { select: { fullName: true } } } } } },
      exam: {
        select: {
          id: true, title: true, durationMinutes: true, difficulty: true, examType: true,
          subject: { select: { name: true } },
          grade: { select: { name: true } },
          _count: { select: { attempts: true } },
        },
      },
    },
    orderBy: { assignedAt: 'desc' },
  });

  // Check which exams student has already attempted
  const examIds = assignments.map((a) => a.examId);
  const attempts = await prisma.attempt.findMany({
    where: { studentId: student.id, examId: { in: examIds }, status: 'SUBMITTED' },
    select: { examId: true, score: true, submittedAt: true },
    orderBy: { submittedAt: 'desc' },
  });
  const attemptMap = new Map<string, { score: number | null; submittedAt: Date | null }>();
  for (const a of attempts) {
    if (!attemptMap.has(a.examId!)) attemptMap.set(a.examId!, { score: a.score, submittedAt: a.submittedAt });
  }

  const result = assignments.map((a) => ({
    assignmentId: a.id,
    classId: a.classId,
    className: a.classroom.name,
    teacherName: a.classroom.teacher?.user.fullName ?? null,
    dueDate: a.dueDate?.toISOString() ?? null,
    note: a.note,
    assignedAt: a.assignedAt.toISOString(),
    exam: a.exam,
    attempted: attemptMap.has(a.examId),
    lastAttempt: attemptMap.get(a.examId) ?? null,
  }));

  return NextResponse.json(result);
}
