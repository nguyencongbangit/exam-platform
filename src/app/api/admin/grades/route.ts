export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const grades = await prisma.grade.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(grades);
}
