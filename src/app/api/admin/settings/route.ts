import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readSettings, writeSettings } from '@/lib/settings';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const s = readSettings();
  return NextResponse.json({
    ...s,
    claudeApiKey: s.claudeApiKey ? '****' + s.claudeApiKey.slice(-4) : '',
    hasClaudeKey: !!s.claudeApiKey,
    geminiApiKey: s.geminiApiKey ? '****' + s.geminiApiKey.slice(-4) : '',
    hasGeminiKey: !!s.geminiApiKey,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  // Only update geminiApiKey if a non-masked value is provided
  const update: Record<string, string> = {};
  if (body.claudeApiKey && !body.claudeApiKey.startsWith('****')) {
    update.claudeApiKey = body.claudeApiKey;
  }
  if (body.geminiApiKey && !body.geminiApiKey.startsWith('****')) {
    update.geminiApiKey = body.geminiApiKey;
  }
  if (body.siteName) update.siteName = body.siteName;
  if (body.siteDesc) update.siteDesc = body.siteDesc;
  writeSettings(update);
  return NextResponse.json({ ok: true });
}
