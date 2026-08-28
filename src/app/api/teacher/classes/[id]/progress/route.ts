export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const cls = await prisma.classroom.findFirst({ where: { id: params.id, teacherId: teacher.id } });
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  const [members, assignments] = await Promise.all([
    prisma.classMember.findMany({
      where: { classId: params.id },
      include: { student: { include: { user: { select: { fullName: true } } } } },
      orderBy: { joinedAt: 'asc' },
    }),
    prisma.classExamAssignment.findMany({
      where: { classId: params.id },
      include: { exam: { select: { id: true, title: true, durationMinutes: true, subject: { select: { name: true } } } } },
      orderBy: { assignedAt: 'desc' },
    }),
  ]);

  if (assignments.length === 0 || members.length === 0) {
    return NextResponse.json({ exams: [], members: members.map(m => ({ studentId: m.studentId, fullName: m.student.user.fullName })) });
  }

  const studentIds = members.map(m => m.studentId);
  const examIds = assignments.map(a => a.examId);

  // Fetch submitted attempts for these students+exams
  const attempts = await prisma.attempt.findMany({
    where: {
      studentId: { in: studentIds },
      examId: { in: examIds },
      status: 'SUBMITTED',
    },
    select: { studentId: true, examId: true, score: true, submittedAt: true, correctCount: true, wrongCount: true },
    orderBy: { submittedAt: 'desc' },
  });

  // Build map: examId -> studentId -> attempt
  const attemptMap = new Map<string, Map<string, typeof attempts[0]>>();
  for (const a of attempts) {
    if (!attemptMap.has(a.examId!)) attemptMap.set(a.examId!, new Map());
    const byStudent = attemptMap.get(a.examId!)!;
    if (!byStudent.has(a.studentId)) byStudent.set(a.studentId, a);
  }

  const result = assignments.map(a => {
    const byStudent = attemptMap.get(a.examId) || new Map();
    const studentProgress = members.map(m => {
      const att = byStudent.get(m.studentId);
      return {
        studentId: m.studentId,
        fullName: m.student.user.fullName,
        status: att ? 'submitted' : 'not_started',
        score: att?.score ?? null,
        submittedAt: att?.submittedAt?.toISOString() ?? null,
        correctCount: att?.correctCount ?? null,
        wrongCount: att?.wrongCount ?? null,
      };
    });

    const submitted = studentProgress.filter(s => s.status === 'submitted');
    const scores = submitted.map(s => s.score).filter((s): s is number => s !== null);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

    return {
      assignmentId: a.id,
      examId: a.examId,
      examTitle: a.exam.title,
      subjectName: a.exam.subject?.name ?? null,
      durationMinutes: a.exam.durationMinutes,
      openAt: a.openAt?.toISOString() ?? null,
      dueDate: a.dueDate?.toISOString() ?? null,
      note: a.note,
      assignedAt: a.assignedAt.toISOString(),
      submittedCount: submitted.length,
      totalStudents: members.length,
      avgScore,
      students: studentProgress,
    };
  });

  return NextResponse.json({ exams: result });
}
