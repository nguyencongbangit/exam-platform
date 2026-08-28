export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password, fullName, role } = await req.json();

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const validRole = ['STUDENT', 'TEACHER', 'PARENT'].includes(role) ? role : 'STUDENT';

  const user = await prisma.user.create({
    data: { email, passwordHash, fullName, role: validRole },
  });

  if (validRole === 'STUDENT') {
    const code = 'HS' + Date.now().toString().slice(-6);
    await prisma.student.create({
      data: { userId: user.id, studentCode: code },
    });
  } else if (validRole === 'TEACHER') {
    await prisma.teacher.create({ data: { userId: user.id } });
  } else if (validRole === 'PARENT') {
    await prisma.parent.create({ data: { userId: user.id } });
  }

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
