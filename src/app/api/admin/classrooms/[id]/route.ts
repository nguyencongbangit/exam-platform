export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const classroom = await prisma.classroom.findUnique({
    where: { id: params.id },
    include: {
      teacher: { include: { user: { select: { id: true, fullName: true, email: true } } } },
      members: {
        include: {
          student: {
            include: {
              user: { select: { fullName: true, email: true, phone: true } },
              grade: { select: { name: true } },
              attempts: { select: { score: true, submittedAt: true }, orderBy: { submittedAt: 'desc' }, take: 5 },
            },
          },
        },
        orderBy: { joinedAt: 'asc' },
      },
      parents: {
        include: { parent: { include: { user: { select: { fullName: true, email: true, phone: true } } } } },
        orderBy: { addedAt: 'asc' },
      },
    },
  });

  if (!classroom) return NextResponse.json({ error: 'Không tìm thấy lớp' }, { status: 404 });
  return NextResponse.json(classroom);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.classroom.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
