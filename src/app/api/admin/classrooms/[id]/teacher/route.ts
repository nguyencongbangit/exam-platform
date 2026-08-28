import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT: assign or unassign homeroom teacher
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { teacherUserId } = await req.json(); // userId of teacher, or null to unassign

  let teacherId: string | null = null;
  if (teacherUserId) {
    const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) return NextResponse.json({ error: 'Không tìm thấy giáo viên' }, { status: 404 });
    teacherId = teacher.id;
  }

  const updated = await prisma.classroom.update({
    where: { id: params.id },
    data: { teacherId },
    include: { teacher: { include: { user: { select: { fullName: true, email: true } } } } },
  });

  return NextResponse.json(updated);
}
