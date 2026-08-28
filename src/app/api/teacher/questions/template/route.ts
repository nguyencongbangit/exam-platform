export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function toCsvRow(cells: string[]): string {
  return cells.map((c) => `"${c.replace(/"/g, '""')}"`).join(',');
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const header = toCsvRow([
    'Nội dung câu hỏi',
    'Môn học',
    'Lớp',
    'Chủ đề',
    'Độ khó',
    'Đáp án A',
    'Đáp án B',
    'Đáp án C',
    'Đáp án D',
    'Đáp án đúng',
    'Lời giải',
  ]);

  // Two example rows so users can see the expected format
  const rows = [
    toCsvRow([
      'Giải phương trình: x^2 - 5x + 6 = 0',
      'TOAN',
      'Lớp 9',
      'Phương trình bậc hai',
      'MEDIUM',
      'x = 2 và x = 3',
      'x = 1 và x = 6',
      'x = -2 và x = -3',
      'x = 3 và x = 4',
      'A',
      'Dùng công thức nghiệm: delta = 1, x1 = 2, x2 = 3',
    ]),
    toCsvRow([
      'Tìm giá trị của sin 30 độ',
      'TOAN',
      'Lớp 9',
      'Hàm số',
      'EASY',
      '1/2',
      'căn 2 / 2',
      'căn 3 / 2',
      '1',
      'A',
      'sin 30° = 1/2',
    ]),
  ];

  // BOM (U+FEFF) so spreadsheet apps display Vietnamese correctly
  const bom = '﻿';
  const csv = bom + [header, ...rows].join('\r\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="mau_nhap_cau_hoi.csv"',
    },
  });
}
