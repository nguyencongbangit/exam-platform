export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string; studentId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const cls = await prisma.classroom.findFirst({ where: { id: params.id, teacherId: teacher.id } });
  if (!cls) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });

  await prisma.classMember.delete({
    where: { classId_studentId: { classId: params.id, studentId: params.studentId } },
  });

  return NextResponse.json({ ok: true });
}
