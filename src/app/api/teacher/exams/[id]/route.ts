import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const exam = await prisma.exam.findUnique({
    where: { id: params.id },
    include: { subject: true, grade: true, questions: { include: { question: { include: { options: true } } } } },
  });
  if (!exam) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(exam);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const exam = await prisma.exam.update({ where: { id: params.id }, data: body });
  return NextResponse.json(exam);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await prisma.exam.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
