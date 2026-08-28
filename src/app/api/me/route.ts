export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, email: true, fullName: true, phone: true, avatar: true,
      role: true, status: true, createdAt: true,
      student: {
        select: {
          dateOfBirth: true, schoolName: true, gradeId: true, targetScore: true, studentCode: true, level: true,
          grade: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { fullName, phone, avatar, dateOfBirth, schoolName, gradeId, targetScore, level, currentPassword, newPassword } = body;

  if (!fullName?.trim()) {
    return NextResponse.json({ error: 'Họ tên không được để trống' }, { status: 400 });
  }

  // Đổi mật khẩu nếu có yêu cầu
  let passwordHash: string | undefined;
  if (currentPassword || newPassword) {
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Cần nhập cả mật khẩu hiện tại và mật khẩu mới' }, { status: 400 });
    }
    if ((newPassword as string).length < 6) {
      return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    const valid = await bcrypt.compare(currentPassword, user!.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Mật khẩu hiện tại không đúng' }, { status: 400 });
    }
    passwordHash = await bcrypt.hash(newPassword, 10);
  }

  // Cập nhật bảng User
  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      fullName: fullName.trim(),
      phone: phone?.trim() || null,
      ...(avatar !== undefined ? { avatar: avatar || null } : {}),
      ...(passwordHash ? { passwordHash } : {}),
    },
    select: { id: true, email: true, fullName: true, phone: true, role: true },
  });

  // Cập nhật bảng Student nếu là học sinh
  if (session.user.role === 'STUDENT') {
    await prisma.student.update({
      where: { userId: session.user.id },
      data: {
        dateOfBirth: dateOfBirth?.trim() || null,
        schoolName: schoolName?.trim() || null,
        gradeId: gradeId || null,
        targetScore: targetScore != null ? parseFloat(targetScore) : null,
        level: ['EASY', 'MEDIUM', 'HARD'].includes(level) ? level : undefined,
      },
    });
  }

  return NextResponse.json(updated);
}
