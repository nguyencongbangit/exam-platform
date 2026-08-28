import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0] || req.headers.get('x-real-ip') || '';
  const isLocal = ['127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost'].includes(ip);
  return NextResponse.json({ isLocal });
}
