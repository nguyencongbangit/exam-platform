export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parent = await prisma.parent.findUnique({ where: { userId: session.user.id } });
  if (!parent) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const classMonitors = await prisma.classParent.findMany({
    where: { parentId: parent.id },
    include: {
      classroom: {
        include: {
          teacher: { include: { user: { select: { fullName: true, email: true } } } },
          members: {
            include: {
              student: {
                include: {
                  user: { select: { fullName: true } },
                  grade: { select: { name: true } },
                  attempts: {
                    where: { status: 'SUBMITTED' },
                    select: { score: true, submittedAt: true, exam: { select: { title: true } } },
                    orderBy: { submittedAt: 'desc' },
                    take: 3,
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(classMonitors.map(cm => cm.classroom));
}
