import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const cls = await prisma.classroom.findFirst({ where: { id: params.id, teacherId: teacher.id } });
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  const { examId, openAt, dueDate, note } = await req.json();
  if (!examId) return NextResponse.json({ error: 'Chưa chọn đề thi' }, { status: 400 });

  const existing = await prisma.classExamAssignment.findUnique({
    where: { classId_examId: { classId: params.id, examId } },
  });
  if (existing) return NextResponse.json({ error: 'Đề thi này đã được giao cho lớp' }, { status: 400 });

  const assignment = await prisma.classExamAssignment.create({
    data: {
      classId: params.id,
      examId,
      openAt: openAt ? new Date(openAt) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      note: note?.trim() || null,
    },
    include: { exam: { select: { id: true, title: true, subject: { select: { name: true } } } } },
  });

  return NextResponse.json(assignment, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { examId } = await req.json();

  await prisma.classExamAssignment.delete({
    where: { classId_examId: { classId: params.id, examId } },
  });

  return NextResponse.json({ ok: true });
}
