export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

const VALID_ROLES = ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'];
const VALID_STATUSES = ['ACTIVE', 'INACTIVE', 'BANNED'];

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { fullName, email, phone, role, status, password } = await req.json();

  if (!fullName?.trim() || !email?.trim() || !role || !status) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
  }
  if (!VALID_ROLES.includes(role)) return NextResponse.json({ error: 'Vai trò không hợp lệ' }, { status: 400 });
  if (!VALID_STATUSES.includes(status)) return NextResponse.json({ error: 'Trạng thái không hợp lệ' }, { status: 400 });
  if (password && password.length < 6) return NextResponse.json({ error: 'Mật khẩu tối thiểu 6 ký tự' }, { status: 400 });

  // Check email unique (exclude self)
  const emailConflict = await prisma.user.findFirst({ where: { email: email.trim(), NOT: { id: params.id } } });
  if (emailConflict) return NextResponse.json({ error: 'Email đã được dùng bởi tài khoản khác' }, { status: 400 });

  const updateData: Record<string, unknown> = {
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone?.trim() || null,
    role,
    status,
  };
  if (password?.trim()) updateData.passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ id: user.id, fullName: user.fullName, email: user.email });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (params.id === session.user.id) return NextResponse.json({ error: 'Không thể xóa tài khoản của chính mình' }, { status: 400 });

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
