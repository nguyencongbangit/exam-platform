import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

const VALID_ROLES = ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'];

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const roleFilter = searchParams.get('role') || '';
  const statusFilter = searchParams.get('status') || '';

  const where = {
    AND: [
      search ? { OR: [{ fullName: { contains: search } }, { email: { contains: search } }] } : {},
      roleFilter ? { role: roleFilter } : {},
      statusFilter ? { status: statusFilter } : {},
    ],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, email: true, fullName: true, role: true, status: true, createdAt: true, phone: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, password, fullName, role, phone } = await req.json();

  if (!email?.trim() || !password?.trim() || !fullName?.trim() || !role?.trim()) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc (email, mật khẩu, họ tên, vai trò)' }, { status: 400 });
  }
  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: `Vai trò không hợp lệ. Phải là: ${VALID_ROLES.join(', ')}` }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: email.trim() } });
  if (existing) {
    return NextResponse.json({ error: 'Email này đã được sử dụng' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.trim(),
      passwordHash,
      fullName: fullName.trim(),
      role,
      phone: phone?.trim() || null,
    },
  });

  // Tạo record phụ theo vai trò
  if (role === 'STUDENT') {
    const count = await prisma.student.count();
    await prisma.student.create({
      data: {
        userId: user.id,
        studentCode: `HS${new Date().getFullYear()}${String(count + 1).padStart(3, '0')}`,
      },
    });
  } else if (role === 'TEACHER') {
    await prisma.teacher.create({ data: { userId: user.id } });
  } else if (role === 'PARENT') {
    await prisma.parent.create({ data: { userId: user.id } });
  }

  return NextResponse.json({ id: user.id, email: user.email, fullName: user.fullName, role: user.role }, { status: 201 });
}
