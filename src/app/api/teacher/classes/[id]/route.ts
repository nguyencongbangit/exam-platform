export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getTeacherClass(teacherUserId: string, classId: string) {
  const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
  if (!teacher) return null;
  return prisma.classroom.findFirst({ where: { id: classId, teacherId: teacher.id } });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cls = await getTeacherClass(session.user.id, params.id);
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  const [members, invitations, assignments] = await Promise.all([
    prisma.classMember.findMany({
      where: { classId: params.id },
      include: {
        student: {
          include: {
            user: { select: { fullName: true, email: true, phone: true } },
            grade: { select: { name: true } },
            attempts: { select: { score: true }, orderBy: { submittedAt: 'desc' }, take: 5 },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    }),
    prisma.classInvitation.findMany({
      where: { classId: params.id },
      include: { student: { include: { user: { select: { fullName: true, email: true } } } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.classExamAssignment.findMany({
      where: { classId: params.id },
      include: { exam: { select: { id: true, title: true, subject: { select: { name: true } }, durationMinutes: true, totalQuestions: true } } },
      // openAt, dueDate, note returned by default from ClassExamAssignment fields
      orderBy: { assignedAt: 'desc' },
    }),
  ]);

  return NextResponse.json({ ...cls, members, invitations, assignments });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cls = await getTeacherClass(session.user.id, params.id);
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  const { name, description } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Tên lớp không được để trống' }, { status: 400 });

  const updated = await prisma.classroom.update({
    where: { id: params.id },
    data: { name: name.trim(), description: description?.trim() || null },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cls = await getTeacherClass(session.user.id, params.id);
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  await prisma.classroom.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
