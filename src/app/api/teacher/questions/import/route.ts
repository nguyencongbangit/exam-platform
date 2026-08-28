import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const VALID_DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'VERY_HARD'];
const VALID_KEYS = ['A', 'B', 'C', 'D'];

const SUBJECT_ALIASES: Record<string, string> = {
  'tieng_anh': 'ANH',
  'tieng anh': 'ANH',
  'ngu_van': 'VAN',
  'ngu van': 'VAN',
  'vat_ly': 'LY',
  'vat ly': 'LY',
  'hoa_hoc': 'HOA',
  'hoa hoc': 'HOA',
  'sinh_hoc': 'SINH',
  'sinh hoc': 'SINH',
  'toan_hoc': 'TOAN',
  'toan hoc': 'TOAN',
};

/** Normalize string: lowercase + NFC unicode form + trim */
function norm(s: string) {
  return s.trim().toLowerCase().normalize('NFC');
}

/** Detect delimiter: comma or semicolon based on first data line */
function detectDelimiter(text: string): ',' | ';' {
  const firstLine = text.split('\n').find((l) => l.trim()) || '';
  const commas = (firstLine.match(/,/g) || []).length;
  const semis = (firstLine.match(/;/g) || []).length;
  return semis > commas ? ';' : ',';
}

/** Robust CSV parser – quoted fields, escaped quotes, \r\n, variable delimiter */
function parseCsv(raw: string, delimiter: string): string[][] {
  // Strip BOM (U+FEFF)
  const text = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  const str = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i <= str.length; i++) {
    const ch = i < str.length ? str[i] : '\n'; // sentinel to flush last row
    const next = str[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(cell.trim());
        cell = '';
      } else if (ch === '\n') {
        row.push(cell.trim());
        if (row.some((c) => c !== '')) rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += ch;
      }
    }
  }

  return rows;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['TEACHER', 'ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Resolve teacher record ──────────────────────────────────────────────────
  // Admin users don't have a Teacher row; find one to use as createdById.
  let teacher = await prisma.teacher.findFirst({ where: { userId: session.user.id } });
  if (!teacher && session.user.role === 'ADMIN') {
    teacher = await prisma.teacher.findFirst(); // use any existing teacher
  }
  if (!teacher) {
    return NextResponse.json(
      { error: 'Không tìm thấy thông tin giáo viên. Hãy đăng nhập bằng tài khoản giáo viên.' },
      { status: 400 },
    );
  }

  // ── Parse uploaded file ─────────────────────────────────────────────────────
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Không tìm thấy file' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext !== 'csv') return NextResponse.json({ error: 'Chỉ hỗ trợ file .csv' }, { status: 400 });

  const rawText = await file.text();
  const delimiter = detectDelimiter(rawText);
  const allRows = parseCsv(rawText, delimiter);

  if (allRows.length < 2) {
    return NextResponse.json(
      { error: 'File CSV không có dữ liệu (cần ít nhất 1 dòng dữ liệu sau dòng tiêu đề)' },
      { status: 400 },
    );
  }

  // Skip header row; filter blank rows
  const dataRows = allRows.slice(1).filter((r) => r.some((c) => c !== ''));

  // ── Load lookup data ────────────────────────────────────────────────────────
  const [subjects, grades, topics] = await Promise.all([
    prisma.subject.findMany(),
    prisma.grade.findMany(),
    prisma.topic.findMany(),
  ]);

  const errors: { row: number; message: string }[] = [];
  const toCreate: any[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const rowNum = i + 2;

    // Pad to 11 columns
    while (row.length < 11) row.push('');

    const [content, subjectCode, gradeName, topicName, difficulty, optA, optB, optC, optD, correctKey, explanation] =
      row.map((c) => c.trim());

    // ── Validate required fields ──────────────────────────────────────────────
    if (!content) {
      errors.push({ row: rowNum, message: 'Thiếu nội dung câu hỏi (cột A)' });
      continue;
    }
    if (!subjectCode) {
      errors.push({ row: rowNum, message: 'Thiếu môn học (cột B). Phải là: TOAN, TIENG_VIET, VAN, ANH, LY, HOA, SINH' });
      continue;
    }
    if (!gradeName) {
      errors.push({ row: rowNum, message: 'Thiếu lớp (cột C). Ví dụ: Lớp 9' });
      continue;
    }
    if (!difficulty || !VALID_DIFFICULTIES.includes(difficulty.toUpperCase())) {
      errors.push({
        row: rowNum,
        message: `Độ khó không hợp lệ (cột E): "${difficulty}". Phải là EASY, MEDIUM, HARD hoặc VERY_HARD`,
      });
      continue;
    }
    if (!optA || !optB || !optC || !optD) {
      errors.push({ row: rowNum, message: 'Thiếu nội dung đáp án (cột F–I phải đầy đủ A, B, C, D)' });
      continue;
    }
    if (!correctKey || !VALID_KEYS.includes(correctKey.toUpperCase())) {
      errors.push({
        row: rowNum,
        message: `Đáp án đúng không hợp lệ (cột J): "${correctKey}". Phải là A, B, C hoặc D`,
      });
      continue;
    }

    // ── Lookup subject (normalize + alias for comparison) ────────────────────
    const normalizedCode = norm(subjectCode);
    const resolvedCode = SUBJECT_ALIASES[normalizedCode] ?? subjectCode;
    const subject = subjects.find((s) => norm(s.code) === norm(resolvedCode));
    if (!subject) {
      errors.push({
        row: rowNum,
        message: `Không tìm thấy môn học (cột B): "${subjectCode}". Các môn hợp lệ: ${subjects.map((s) => s.code).join(', ')}`,
      });
      continue;
    }

    // ── Lookup grade (normalize for comparison) ───────────────────────────────
    const grade = grades.find((g) => norm(g.name) === norm(gradeName));
    if (!grade) {
      errors.push({
        row: rowNum,
        message: `Không tìm thấy lớp (cột C): "${gradeName}". Các lớp hợp lệ: ${grades.map((g) => g.name).join(', ')}`,
      });
      continue;
    }

    // ── Lookup topic; auto-create if missing ──────────────────────────────────
    let topicId: string | null = null;
    if (topicName) {
      let topic = topics.find(
        (t) => norm(t.name) === norm(topicName) && t.subjectId === subject.id,
      );
      if (!topic) {
        // Auto-create topic so the question isn't orphaned
        topic = await prisma.topic.create({
          data: {
            subjectId: subject.id,
            gradeId: grade.id,
            name: topicName.trim(),
            sortOrder: 0,
          },
        });
        topics.push(topic); // cache so duplicate topics aren't re-created
      }
      topicId = topic.id;
    }

    toCreate.push({
      content,
      subjectId: subject.id,
      gradeId: grade.id,
      topicId,
      difficulty: difficulty.toUpperCase(),
      explanation: explanation || null,
      createdById: teacher.id,
      questionType: 'MULTIPLE_CHOICE',
      options: [
        { key: 'A', content: optA, isCorrect: correctKey.toUpperCase() === 'A', sortOrder: 0 },
        { key: 'B', content: optB, isCorrect: correctKey.toUpperCase() === 'B', sortOrder: 1 },
        { key: 'C', content: optC, isCorrect: correctKey.toUpperCase() === 'C', sortOrder: 2 },
        { key: 'D', content: optD, isCorrect: correctKey.toUpperCase() === 'D', sortOrder: 3 },
      ],
    });
  }

  // ── Insert questions ────────────────────────────────────────────────────────
  let imported = 0;
  for (const q of toCreate) {
    const { options, ...questionData } = q;
    await prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: options.map((o: any) => ({
            optionKey: o.key,
            content: o.content,
            isCorrect: o.isCorrect,
            sortOrder: o.sortOrder,
          })),
        },
      },
    });
    imported++;
  }

  return NextResponse.json({
    imported,
    errors,
    total: dataRows.length,
    skipped: errors.length,
    detectedDelimiter: delimiter,
  });
}
