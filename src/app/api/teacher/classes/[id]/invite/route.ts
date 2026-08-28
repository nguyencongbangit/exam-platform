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

  const { query } = await req.json(); // studentCode or email
  if (!query?.trim()) return NextResponse.json({ error: 'Nhập mã học sinh hoặc email' }, { status: 400 });

  // Find student by studentCode or email
  const student = await prisma.student.findFirst({
    where: {
      OR: [
        { studentCode: query.trim() },
        { user: { email: query.trim() } },
      ],
    },
    include: { user: { select: { fullName: true, email: true } } },
  });

  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh với thông tin này' }, { status: 404 });

  // Already a member?
  const isMember = await prisma.classMember.findUnique({
    where: { classId_studentId: { classId: params.id, studentId: student.id } },
  });
  if (isMember) return NextResponse.json({ error: `${student.user.fullName} đã là thành viên của lớp` }, { status: 400 });

  // Already invited?
  const existing = await prisma.classInvitation.findUnique({
    where: { classId_studentId: { classId: params.id, studentId: student.id } },
  });
  if (existing) {
    if (existing.status === 'PENDING') return NextResponse.json({ error: `${student.user.fullName} đã có lời mời đang chờ xử lý` }, { status: 400 });
    // Re-invite if previously declined
    await prisma.classInvitation.update({ where: { id: existing.id }, data: { status: 'PENDING', createdAt: new Date() } });
    return NextResponse.json({ ok: true, studentName: student.user.fullName });
  }

  await prisma.classInvitation.create({
    data: { classId: params.id, studentId: student.id, status: 'PENDING' },
  });

  return NextResponse.json({ ok: true, studentName: student.user.fullName });
}
