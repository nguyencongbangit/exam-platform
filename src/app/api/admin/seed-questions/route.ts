export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { spawn } from 'child_process';
import path from 'path';

// Danh sách seed scripts theo thứ tự
const SEED_SCRIPTS = [
  // Lớp 5
  'scripts/seed-toan-lop5.js',
  'scripts/seed-tienganh-lop5.js',
  'scripts/seed-tiengviet-lop5.js',
  // Lớp 7
  'scripts/seed-lop7-toan.js',
  'scripts/seed-lop7-van.js',
  'scripts/seed-lop7-anh.js',
];

async function runScript(scriptPath: string): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    const fullPath = path.join(process.cwd(), scriptPath);
    const proc = spawn('node', [fullPath], { env: process.env });
    let output = '';
    proc.stdout.on('data', (d) => { output += d.toString(); });
    proc.stderr.on('data', (d) => { output += d.toString(); });
    proc.on('close', (code) => resolve({ ok: code === 0, output: output.slice(-500) }));
    proc.on('error', (err) => resolve({ ok: false, output: err.message }));
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const scripts = (body.scripts as string[] | undefined) || SEED_SCRIPTS;

  const results: { script: string; ok: boolean; output: string }[] = [];
  for (const script of scripts) {
    const { ok, output } = await runScript(script);
    results.push({ script, ok, output });
  }

  return NextResponse.json({ results });
}

export async function GET() {
  return NextResponse.json({ scripts: SEED_SCRIPTS });
}
