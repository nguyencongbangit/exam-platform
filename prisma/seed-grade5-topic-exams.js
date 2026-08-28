// Tạo đề thi luyện tập theo từng chủ đề lớp 5
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const GRADE_ID   = 'grade-5';
const CREATED_BY = 'user-admin';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function createTopicExam({ title, description, subjectId, topicId, difficulty, totalQ, duration, questionIds }) {
  const exam = await p.exam.create({
    data: {
      title,
      description,
      subjectId,
      gradeId:         GRADE_ID,
      difficulty,
      examType:        'PRACTICE',
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

async function getTopicQuestions(subjectId, topicId, difficulties, limit) {
  const qs = await p.question.findMany({
    where: {
      subjectId,
      gradeId:      GRADE_ID,
      topicId,
      status:       'ACTIVE',
      questionType: 'MULTIPLE_CHOICE',
      difficulty:   { in: difficulties },
    },
    select: { id: true },
  });
  return shuffle(qs.map(q => q.id)).slice(0, limit);
}

async function main() {
  console.log('📚 Tạo đề thi theo chủ đề lớp 5...\n');

  // Lấy tất cả topic lớp 5
  const topics = await p.topic.findMany({
    where: { gradeId: GRADE_ID },
    select: {
      id: true,
      name: true,
      subjectId: true,
      sortOrder: true,
      subject: { select: { name: true } },
      _count: { select: { questions: true } },
    },
    orderBy: [{ subjectId: 'asc' }, { sortOrder: 'asc' }],
  });

  let created = 0;

  for (const topic of topics) {
    const hasQuestions = topic._count.questions > 0;

    // Xác định cấu hình đề theo số câu hỏi
    let totalQ, duration, difficulty;
    if (hasQuestions) {
      // Tính totalQ dựa trên số câu có sẵn
      const count = topic._count.questions;
      totalQ   = count >= 20 ? 20 : count >= 15 ? 15 : count >= 10 ? 10 : count;
      duration = totalQ >= 20 ? 30 : totalQ >= 15 ? 25 : totalQ >= 10 ? 15 : 10;
      difficulty = 'MEDIUM';
    } else {
      totalQ   = 15;
      duration = 20;
      difficulty = 'MEDIUM';
    }

    const questionIds = hasQuestions
      ? await getTopicQuestions(topic.subjectId, topic.id, ['EASY', 'MEDIUM', 'HARD'], totalQ)
      : [];

    const actualQ = questionIds.length > 0 ? questionIds.length : totalQ;
    const descSuffix = questionIds.length === 0
      ? ' (Chưa có câu hỏi – giáo viên sẽ bổ sung)'
      : ` – ${actualQ} câu hỏi`;

    await createTopicExam({
      title:       `${topic.subject.name} lớp 5 – ${topic.name}`,
      description: `Luyện tập chủ đề: ${topic.name}${descSuffix}`,
      subjectId:   topic.subjectId,
      topicId:     topic.id,
      difficulty,
      totalQ:      actualQ,
      duration,
      questionIds,
    });

    const status = questionIds.length > 0 ? `${actualQ} câu` : 'placeholder';
    console.log(`  ✅ [${topic.subject.name}] ${topic.name} (${status})`);
    created++;
  }

  console.log(`\n✅ Đã tạo ${created} đề thi theo chủ đề`);

  // Thống kê theo môn
  const bySubject = await p.exam.groupBy({
    by: ['subjectId'],
    where: { gradeId: GRADE_ID },
    _count: { id: true },
  });
  const subNames = await p.subject.findMany({
    where: { id: { in: bySubject.map(b => b.subjectId) } },
    select: { id: true, name: true },
  });
  const nameMap = Object.fromEntries(subNames.map(s => [s.id, s.name]));
  console.log('\n📊 Tổng đề thi lớp 5 theo môn:');
  bySubject
    .sort((a, b) => (nameMap[a.subjectId] || '').localeCompare(nameMap[b.subjectId] || '', 'vi'))
    .forEach(b => console.log(`   📚 ${nameMap[b.subjectId] || b.subjectId}: ${b._count.id} đề`));
}

main().catch(console.error).finally(() => p.$disconnect());
