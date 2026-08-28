import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readSettings } from '@/lib/settings';
import { prisma } from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';

interface GenerateRequest {
  subjectId: string;
  gradeId: string;
  topicHint?: string;
  difficulty: string;
  count: number;
}

function buildPrompt(req: GenerateRequest, subjectName: string, gradeName: string): string {
  const diffMap: Record<string, string> = { EASY: 'dễ', MEDIUM: 'trung bình', HARD: 'khó', VERY_HARD: 'rất khó' };
  const diff = diffMap[req.difficulty] || 'trung bình';
  const topic = req.topicHint ? ` về chủ đề "${req.topicHint}"` : '';

  return `Bạn là giáo viên chuyên nghiệp người Việt Nam. Hãy tạo ${req.count} câu hỏi trắc nghiệm môn ${subjectName}${topic} dành cho học sinh ${gradeName}, mức độ ${diff}.

Trả về ĐÚNG định dạng JSON sau, không thêm bất kỳ văn bản nào khác ngoài JSON:

{
  "questions": [
    {
      "content": "Nội dung câu hỏi",
      "optionA": "Đáp án A",
      "optionB": "Đáp án B",
      "optionC": "Đáp án C",
      "optionD": "Đáp án D",
      "correctKey": "A",
      "explanation": "Giải thích ngắn gọn",
      "topic": "Tên chủ đề"
    }
  ]
}

Lưu ý:
- correctKey phải là một trong: A, B, C, D
- Câu hỏi phải phù hợp chương trình giáo dục Việt Nam
- Đáp án phải rõ ràng, không mơ hồ
- Lời giải ngắn gọn, chính xác`;
}

async function callClaude(apiKey: string, prompt: string): Promise<string> {
  const client = new Anthropic({ apiKey });
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });
  const block = message.content[0];
  return block.type === 'text' ? block.text : '';
}

function parseOutput(text: string): any[] {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;
  const parsed = JSON.parse(jsonStr.trim());
  return parsed.questions || [];
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = readSettings();
  if (!settings.claudeApiKey) {
    return NextResponse.json({ error: 'Chưa cấu hình Claude API key. Vào Admin → Cài đặt để thêm key.' }, { status: 400 });
  }

  const body: GenerateRequest = await req.json();
  if (!body.subjectId || !body.gradeId || !body.difficulty || !body.count) {
    return NextResponse.json({ error: 'Thiếu thông tin yêu cầu' }, { status: 400 });
  }
  if (body.count > 50) {
    return NextResponse.json({ error: 'Tối đa 50 câu mỗi lần' }, { status: 400 });
  }

  const [subject, grade] = await Promise.all([
    prisma.subject.findUnique({ where: { id: body.subjectId } }),
    prisma.grade.findUnique({ where: { id: body.gradeId } }),
  ]);
  if (!subject || !grade) {
    return NextResponse.json({ error: 'Không tìm thấy môn học hoặc lớp' }, { status: 400 });
  }

  let teacher = await prisma.teacher.findFirst({ where: { userId: session.user.id } });
  if (!teacher) teacher = await prisma.teacher.findFirst();
  if (!teacher) {
    return NextResponse.json({ error: 'Không tìm thấy tài khoản giáo viên' }, { status: 400 });
  }

  const prompt = buildPrompt(body, subject.name, grade.name);
  let rawText: string;
  try {
    rawText = await callClaude(settings.claudeApiKey, prompt);
  } catch (e: any) {
    return NextResponse.json({ error: `Claude API lỗi: ${e.message}` }, { status: 500 });
  }

  let questions: any[];
  try {
    questions = parseOutput(rawText);
  } catch {
    return NextResponse.json({ error: 'Claude trả về dữ liệu không đúng định dạng. Thử lại.', raw: rawText }, { status: 500 });
  }

  const saved: string[] = [];
  for (const q of questions) {
    if (!q.content || !q.optionA || !q.correctKey) continue;

    let topicId: string | null = null;
    if (q.topic) {
      let topic = await prisma.topic.findFirst({ where: { name: q.topic, subjectId: subject.id } });
      if (!topic) {
        topic = await prisma.topic.create({
          data: { name: q.topic, subjectId: subject.id, gradeId: grade.id, sortOrder: 0 },
        });
      }
      topicId = topic.id;
    }

    const created = await prisma.question.create({
      data: {
        content: q.content,
        subjectId: subject.id,
        gradeId: grade.id,
        topicId,
        difficulty: body.difficulty,
        explanation: q.explanation || null,
        createdById: teacher.id,
        questionType: 'MULTIPLE_CHOICE',
        options: {
          create: ['A', 'B', 'C', 'D'].map((key, i) => ({
            optionKey: key,
            content: q[`option${key}`] || '',
            isCorrect: q.correctKey?.toUpperCase() === key,
            sortOrder: i,
          })),
        },
      },
    });
    saved.push(created.id);
  }

  return NextResponse.json({ saved: saved.length, total: questions.length, ids: saved });
}
