import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function genCode() {
  return Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6).padEnd(6, '0');
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';

  const classrooms = await prisma.classroom.findMany({
    where: search ? { name: { contains: search } } : undefined,
    include: {
      teacher: { include: { user: { select: { fullName: true } } } },
      _count: { select: { members: true, parents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(classrooms);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, description } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Tên lớp không được để trống' }, { status: 400 });

  let code = genCode();
  while (await prisma.classroom.findUnique({ where: { code } })) code = genCode();

  const classroom = await prisma.classroom.create({
    data: { name: name.trim(), description: description?.trim() || null, code },
  });

  return NextResponse.json(classroom, { status: 201 });
}
