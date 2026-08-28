export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const invitations = await prisma.classInvitation.findMany({
    where: { studentId: student.id, status: 'PENDING' },
    include: {
      classroom: {
        include: {
          teacher: { include: { user: { select: { fullName: true } } } },
          _count: { select: { members: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(invitations);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'STUDENT') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { invitationId, action } = await req.json(); // action: 'accept' | 'decline'
  if (!invitationId || !['accept', 'decline'].includes(action)) {
    return NextResponse.json({ error: 'Tham số không hợp lệ' }, { status: 400 });
  }

  const invitation = await prisma.classInvitation.findFirst({
    where: { id: invitationId, studentId: student.id, status: 'PENDING' },
  });
  if (!invitation) return NextResponse.json({ error: 'Không tìm thấy lời mời' }, { status: 404 });

  if (action === 'accept') {
    await prisma.$transaction([
      prisma.classInvitation.update({ where: { id: invitationId }, data: { status: 'ACCEPTED' } }),
      prisma.classMember.upsert({
        where: { classId_studentId: { classId: invitation.classId, studentId: student.id } },
        create: { classId: invitation.classId, studentId: student.id },
        update: {},
      }),
    ]);
  } else {
    await prisma.classInvitation.update({ where: { id: invitationId }, data: { status: 'DECLINED' } });
  }

  return NextResponse.json({ ok: true });
}
