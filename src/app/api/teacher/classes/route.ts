export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function genCode() {
  return Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6).padEnd(6, '0');
}

async function getTeacher(userId: string) {
  return prisma.teacher.findUnique({ where: { userId } });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const teacher = await getTeacher(session.user.id);
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const classes = await prisma.classroom.findMany({
    where: { teacherId: teacher.id },
    include: {
      _count: { select: { members: true, invitations: { where: { status: 'PENDING' } } } },
      assignments: { include: { exam: { select: { id: true, title: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(classes);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'TEACHER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const teacher = await getTeacher(session.user.id);
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { name, description } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Tên lớp không được để trống' }, { status: 400 });

  let code = genCode();
  while (await prisma.classroom.findUnique({ where: { code } })) code = genCode();

  const classroom = await prisma.classroom.create({
    data: { name: name.trim(), description: description?.trim() || null, code, teacherId: teacher.id },
  });

  return NextResponse.json(classroom, { status: 201 });
}
