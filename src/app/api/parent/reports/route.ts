export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'PARENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: { children: { include: { student: { include: { user: { select: { fullName: true } } } } } } },
  });

  if (!parent) return NextResponse.json({ children: [] });

  const children = await Promise.all(
    parent.children.map(async (sp) => {
      const student = sp.student;
      const recentAttempts = await prisma.attempt.findMany({
        where: { studentId: student.id, status: 'SUBMITTED' },
        include: { exam: { include: { subject: true } } },
        orderBy: { submittedAt: 'desc' },
        take: 10,
      });

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });

      const dailyScores = last7Days.map((date) => {
        const dayAttempts = recentAttempts.filter((a) => a.submittedAt?.toISOString().startsWith(date));
        const avg = dayAttempts.length > 0 ? dayAttempts.reduce((s, a) => s + (a.score || 0), 0) / dayAttempts.length : 0;
        return { date: new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }), score: Math.round(avg * 100) / 100 };
      });

      return { ...student, recentAttempts, dailyScores };
    })
  );

  return NextResponse.json({ children });
}
