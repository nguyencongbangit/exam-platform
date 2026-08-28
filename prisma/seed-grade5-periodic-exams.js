// Tạo đề thi 15 phút, 45 phút, giữa kỳ, cuối kỳ lớp 5
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const GRADE_ID   = 'grade-5';
const CREATED_BY = 'user-admin';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function getQuestions(subjectId, difficulties, limit, topicIds = null) {
  const where = {
    subjectId,
    gradeId:      GRADE_ID,
    status:       'ACTIVE',
    questionType: 'MULTIPLE_CHOICE',
    difficulty:   { in: difficulties },
  };
  if (topicIds) where.topicId = { in: topicIds };

  const qs = await p.question.findMany({ where, select: { id: true } });
  return shuffle(qs.map(q => q.id)).slice(0, limit);
}

async function createExam({ title, description, subjectId, difficulty, examType, totalQ, duration, questionIds }) {
  const exam = await p.exam.create({
    data: {
      title,
      description,
      subjectId,
      gradeId:         GRADE_ID,
      difficulty,
      examType,
      totalQuestions:  totalQ,
      durationMinutes: duration,
      maxScore:        10,
      status:          'PUBLISHED',
      createdById:     CREATED_BY,
    },
  });

  if (questionIds.length > 0) {
    const selected = questionIds.slice(0, totalQ);
    await p.examQuestion.createMany({
      data: selected.map((qId, i) => ({
        examId:        exam.id,
        questionId:    qId,
        questionOrder: i + 1,
        points:        parseFloat((10 / selected.length).toFixed(2)),
      })),
    });
  }

  return exam;
}

// Cấu hình đề thi theo loại
const EXAM_TEMPLATES = [
  // label, examType, totalQ, duration, difficulty, diffs
  { label: 'Kiểm tra 15 phút',  tag: 'kt15',  examType: 'PRACTICE',  totalQ: 10, dur: 15, diff: 'EASY',   diffs: ['EASY', 'MEDIUM'] },
  { label: 'Kiểm tra 45 phút',  tag: 'kt45',  examType: 'PRACTICE',  totalQ: 25, dur: 45, diff: 'MEDIUM', diffs: ['EASY', 'MEDIUM', 'HARD'] },
  { label: 'Đề thi giữa kỳ',   tag: 'gk',    examType: 'MOCK_EXAM', totalQ: 30, dur: 45, diff: 'MEDIUM', diffs: ['EASY', 'MEDIUM', 'HARD'] },
  { label: 'Đề thi giữa kỳ',   tag: 'gk2',   examType: 'MOCK_EXAM', totalQ: 30, dur: 45, diff: 'MEDIUM', diffs: ['EASY', 'MEDIUM', 'HARD'] },
  { label: 'Đề thi cuối kỳ',   tag: 'ck',    examType: 'MOCK_EXAM', totalQ: 40, dur: 60, diff: 'HARD',   diffs: ['EASY', 'MEDIUM', 'HARD'] },
  { label: 'Đề thi cuối kỳ',   tag: 'ck2',   examType: 'MOCK_EXAM', totalQ: 40, dur: 60, diff: 'HARD',   diffs: ['EASY', 'MEDIUM', 'HARD'] },
];

// Danh sách môn lớp 5 — môn có câu hỏi thực, môn chưa có để placeholder
const SUBJECTS_WITH_QUESTIONS = ['sub-toan', 'sub-anh'];

async function main() {
  console.log('📝 Tạo đề kiểm tra định kỳ lớp 5...\n');

  const subjects = await p.subject.findMany({
    where: {
      topics: { some: { gradeId: GRADE_ID } },
      status: 'ACTIVE',
    },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  let created = 0;

  for (const subject of subjects) {
    const hasQ = SUBJECTS_WITH_QUESTIONS.includes(subject.id);
    console.log(`\n  📚 ${subject.name}${hasQ ? '' : ' (placeholder)'}`);

    for (const tmpl of EXAM_TEMPLATES) {
      const questionIds = hasQ
        ? await getQuestions(subject.id, tmpl.diffs, tmpl.totalQ * 2)
        : [];

      const actualQ = questionIds.length > 0
        ? Math.min(questionIds.length, tmpl.totalQ)
        : tmpl.totalQ;

      const descSuffix = questionIds.length === 0
        ? ' – Chưa có câu hỏi, giáo viên bổ sung sau'
        : ` – ${actualQ} câu`;

      const title = `${subject.name} lớp 5 – ${tmpl.label} số ${tmpl.tag.endsWith('2') ? 2 : 1}`;

      await createExam({
        title,
        description: `${tmpl.label} môn ${subject.name} lớp 5${descSuffix}`,
        subjectId:   subject.id,
        difficulty:  tmpl.diff,
        examType:    tmpl.examType,
        totalQ:      actualQ,
        duration:    tmpl.dur,
        questionIds,
      });

      const status = questionIds.length > 0 ? `${actualQ} câu` : 'placeholder';
      console.log(`     ✅ ${title} (${status})`);
      created++;
    }
  }

  // Thống kê
  const total = await p.exam.count({ where: { gradeId: GRADE_ID } });
  console.log(`\n✅ Đã tạo ${created} đề kiểm tra định kỳ`);
  console.log(`📊 Tổng đề thi lớp 5: ${total}`);

  const byType = await p.exam.groupBy({
    by: ['examType'],
    where: { gradeId: GRADE_ID },
    _count: { id: true },
  });
  byType.forEach(b => {
    const label = b.examType === 'MOCK_EXAM' ? 'Giữa kỳ / Cuối kỳ' : 'Luyện tập';
    console.log(`   ${label}: ${b._count.id} đề`);
  });
}

main().catch(console.error).finally(() => p.$disconnect());
