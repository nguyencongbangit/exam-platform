export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST: add student (by studentCode or email)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { query, studentId } = await req.json();

  let student;
  if (studentId) {
    student = await prisma.student.findUnique({ where: { id: studentId }, include: { user: { select: { fullName: true } } } });
  } else if (query?.trim()) {
    student = await prisma.student.findFirst({
      where: { OR: [{ studentCode: query.trim() }, { user: { email: query.trim() } }] },
      include: { user: { select: { fullName: true } } },
    });
  }

  if (!student) return NextResponse.json({ error: 'Không tìm thấy học sinh' }, { status: 404 });

  const existing = await prisma.classMember.findUnique({
    where: { classId_studentId: { classId: params.id, studentId: student.id } },
  });
  if (existing) return NextResponse.json({ error: `${student.user.fullName} đã có trong lớp` }, { status: 400 });

  await prisma.classMember.create({ data: { classId: params.id, studentId: student.id } });

  return NextResponse.json({ ok: true, studentName: student.user.fullName });
}

// DELETE: remove student
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { studentId } = await req.json();
  await prisma.classMember.delete({
    where: { classId_studentId: { classId: params.id, studentId } },
  });

  return NextResponse.json({ ok: true });
}
