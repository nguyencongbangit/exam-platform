export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST: add parent (by email)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { query } = await req.json();
  if (!query?.trim()) return NextResponse.json({ error: 'Nhập email hoặc tên phụ huynh' }, { status: 400 });

  const parent = await prisma.parent.findFirst({
    where: { user: { OR: [{ email: query.trim() }, { fullName: { contains: query.trim() } }] } },
    include: { user: { select: { fullName: true, email: true } } },
  });

  if (!parent) return NextResponse.json({ error: 'Không tìm thấy tài khoản phụ huynh' }, { status: 404 });

  const existing = await prisma.classParent.findUnique({
    where: { classId_parentId: { classId: params.id, parentId: parent.id } },
  });
  if (existing) return NextResponse.json({ error: `${parent.user.fullName} đã theo dõi lớp này` }, { status: 400 });

  await prisma.classParent.create({ data: { classId: params.id, parentId: parent.id } });

  return NextResponse.json({ ok: true, parentName: parent.user.fullName });
}

// DELETE: remove parent
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { parentId } = await req.json();
  await prisma.classParent.delete({
    where: { classId_parentId: { classId: params.id, parentId } },
  });

  return NextResponse.json({ ok: true });
}
