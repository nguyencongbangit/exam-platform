import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const SUBJECT_ALIASES: Record<string, string> = {
  'TIENG_ANH': 'ANH',
  'NGU_VAN': 'VAN',
  'VAT_LY': 'LY',
  'HOA_HOC': 'HOA',
  'SINH_HOC': 'SINH',
  'TOAN_HOC': 'TOAN',
  'LICH_SU': 'LICHSU_DIALY',
  'DIA_LY': 'LICHSU_DIALY',
  'LICHSU': 'LICHSU_DIALY',
  'TIN_HOC': 'TINHOC',
  'CONG_NGHE': 'CONGNGHEE',
  'AM_NHAC': 'AMNHAC',
  'MI_THUAT': 'MYTHUAT',
  'KHOA_HOC': 'KHOAHOC',
  'DAO_DUC': 'DAODUC',
};

interface ImportOption {
  key: string;
  content: string;
  isCorrect: boolean;
}

interface ImportQuestion {
  content: string;
  subjectCode: string;
  gradeName?: string;
  topicName?: string;
  difficulty?: string;
  explanation?: string;
  options: ImportOption[];
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let questions: ImportQuestion[];
  try {
    questions = await req.json();
    if (!Array.isArray(questions)) throw new Error('Dữ liệu phải là mảng JSON');
  } catch {
    return NextResponse.json({ error: 'JSON không hợp lệ' }, { status: 400 });
  }

  // Cache subjects, grades, topics để tránh query lặp
  const subjectCache = new Map<string, string>();
  const gradeCache = new Map<string, string>();
  const topicCache = new Map<string, string>();

  const results: { index: number; success: boolean; error?: string; warning?: string; content?: string }[] = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    try {
      // Validate
      if (!q.content?.trim()) throw new Error('Thiếu nội dung câu hỏi');
      if (!q.subjectCode?.trim()) throw new Error('Thiếu mã môn học (subjectCode)');
      if (!Array.isArray(q.options) || q.options.length < 2) throw new Error('Cần ít nhất 2 đáp án');
      const correctCount = q.options.filter((o) => o.isCorrect).length;
      if (correctCount !== 1) throw new Error('Phải có đúng 1 đáp án đúng');

      // Resolve subjectId
      const rawCode = q.subjectCode.trim().toUpperCase();
      const subjectCode = SUBJECT_ALIASES[rawCode] ?? rawCode;
      if (!subjectCache.has(subjectCode)) {
        const subject = await prisma.subject.findUnique({ where: { code: subjectCode } });
        if (!subject) throw new Error(`Không tìm thấy môn học với mã "${rawCode}". Các mã hợp lệ: TOAN, VAN, ANH, LY, HOA, SINH, KHTN, LICHSU_DIALY, GDCD, TINHOC, CONGNGHEE, TIENG_VIET, KHOAHOC, DAODUC, HDTN, AMNHAC, MYTHUAT, GDTC`);
        subjectCache.set(subjectCode, subject.id);
      }
      const subjectId = subjectCache.get(subjectCode)!;

      // Resolve gradeId (optional)
      let gradeId: string | undefined;
      if (q.gradeName?.trim()) {
        const gradeName = q.gradeName.trim();
        if (!gradeCache.has(gradeName)) {
          const grade = await prisma.grade.findFirst({ where: { name: { equals: gradeName } } });
          if (grade) gradeCache.set(gradeName, grade.id);
        }
        gradeId = gradeCache.get(gradeName);
      }

      // Resolve topicId (optional)
      let topicId: string | undefined;
      let topicWarning: string | undefined;
      if (q.topicName?.trim()) {
        const topicName = q.topicName.trim();
        const cacheKey = `${subjectId}:${gradeId ?? ''}:${topicName}`;
        if (!topicCache.has(cacheKey)) {
          const topic = await prisma.topic.findFirst({
            where: {
              subjectId,
              name: topicName,
              ...(gradeId ? { gradeId } : {}),
            },
          });
          if (topic) topicCache.set(cacheKey, topic.id);
        }
        topicId = topicCache.get(cacheKey);
        if (!topicId) topicWarning = `Chủ đề "${topicName}" không tìm thấy — câu hỏi được lưu không có chủ đề`;
      }

      const difficulty = ['EASY', 'MEDIUM', 'HARD', 'VERY_HARD'].includes(q.difficulty || '')
        ? q.difficulty!
        : 'MEDIUM';

      await prisma.question.create({
        data: {
          content: q.content.trim(),
          subjectId,
          gradeId,
          topicId,
          difficulty,
          explanation: q.explanation?.trim() || null,
          createdById: session.user.id,
          questionType: 'MULTIPLE_CHOICE',
          options: {
            create: q.options.map((opt, idx) => ({
              optionKey: opt.key,
              content: opt.content,
              isCorrect: opt.isCorrect,
              sortOrder: idx,
            })),
          },
        },
      });

      results.push({ index: i + 1, success: true, content: q.content.slice(0, 60), warning: topicWarning });
    } catch (err: any) {
      results.push({ index: i + 1, success: false, error: err.message, content: q.content?.slice(0, 60) });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const warnCount = results.filter((r) => r.success && r.warning).length;

  return NextResponse.json({ successCount, failCount, warnCount, results });
}
