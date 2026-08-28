import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const topics = await prisma.topic.findMany({
    include: { subject: true, grade: true },
    orderBy: [{ subject: { name: 'asc' } }, { sortOrder: 'asc' }],
  });
  return NextResponse.json(topics);
}
