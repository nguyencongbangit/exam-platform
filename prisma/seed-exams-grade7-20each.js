// Thêm 20 đề luyện tập cho mỗi môn lớp 7
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Lấy câu hỏi theo subjectId, topicIds tuỳ chọn, độ khó
async function getQIds(subjectId, topicIds, count, diffLevel) {
  const diffMap = {
    easy: ['EASY', 'MEDIUM'],
    medium: ['EASY', 'MEDIUM', 'HARD'],
    hard: ['MEDIUM', 'HARD', 'VERY_HARD'],
    all: ['EASY', 'MEDIUM', 'HARD', 'VERY_HARD'],
  };
  const diffs = diffMap[diffLevel] || diffMap.medium;
  const base = { subjectId, gradeId: 'grade-7', status: 'ACTIVE', questionType: 'MULTIPLE_CHOICE', difficulty: { in: diffs } };
  const where = topicIds?.length ? { ...base, topicId: { in: topicIds } } : base;
  let qs = await p.question.findMany({ where, select: { id: true } });
  if (qs.length < 5 && topicIds?.length) qs = await p.question.findMany({ where: base, select: { id: true } });
  return shuffle(qs).slice(0, count).map(q => q.id);
}

async function mkExam({ id, title, desc, subjectId, topicIds, count, duration, diffLevel }) {
  const existing = await p.exam.findUnique({ where: { id } });
  if (existing) {
    await p.examQuestion.deleteMany({ where: { examId: id } });
    await p.exam.delete({ where: { id } });
  }
  const ids = await getQIds(subjectId, topicIds, count, diffLevel);
  if (ids.length < 5) { console.log(`  ⚠️  ${id}: chỉ ${ids.length} câu, bỏ qua`); return; }
  const diffLabel = diffLevel === 'easy' ? 'EASY' : diffLevel === 'hard' ? 'HARD' : 'MEDIUM';
  await p.exam.create({
    data: {
      id, title, description: desc, subjectId, gradeId: 'grade-7',
      durationMinutes: duration, totalQuestions: ids.length, maxScore: 10,
      difficulty: diffLabel, examType: 'PRACTICE', createdById: 'user-admin',
      status: 'PUBLISHED', publishedAt: new Date(),
      questions: { create: ids.map((qId, i) => ({ questionId: qId, questionOrder: i + 1, points: parseFloat((10 / ids.length).toFixed(2)) })) },
    },
  });
  console.log(`  ✅ ${title} (${ids.length} câu, ${duration} phút)`);
}

// Tạo 20 đề cho một môn theo lộ trình tăng dần
async function create20Exams(subjectId, subCode, subName, topicGroups) {
  console.log(`\n📚 ${subName.toUpperCase()}`);

  // Cấu hình 20 đề: tăng dần từ dễ → khó, ít → nhiều câu
  const configs = [
    // 1-5: Khởi động (dễ, 15 câu, 20 phút)
    { n: 1,  level: 'easy',   count: 15, dur: 20, label: 'Khởi động - Bộ 1' },
    { n: 2,  level: 'easy',   count: 15, dur: 20, label: 'Khởi động - Bộ 2' },
    { n: 3,  level: 'easy',   count: 15, dur: 20, label: 'Khởi động - Bộ 3' },
    { n: 4,  level: 'easy',   count: 15, dur: 20, label: 'Khởi động - Bộ 4' },
    { n: 5,  level: 'easy',   count: 15, dur: 20, label: 'Khởi động - Bộ 5' },
    // 6-10: Luyện tập cơ bản (trung bình, 20 câu, 25 phút)
    { n: 6,  level: 'medium', count: 20, dur: 25, label: 'Luyện tập - Bộ 1' },
    { n: 7,  level: 'medium', count: 20, dur: 25, label: 'Luyện tập - Bộ 2' },
    { n: 8,  level: 'medium', count: 20, dur: 25, label: 'Luyện tập - Bộ 3' },
    { n: 9,  level: 'medium', count: 20, dur: 25, label: 'Luyện tập - Bộ 4' },
    { n: 10, level: 'medium', count: 20, dur: 25, label: 'Luyện tập - Bộ 5' },
    // 11-14: Ôn tập chuyên sâu (25 câu, 30 phút)
    { n: 11, level: 'medium', count: 25, dur: 30, label: 'Ôn tập chuyên sâu - Bộ 1' },
    { n: 12, level: 'medium', count: 25, dur: 30, label: 'Ôn tập chuyên sâu - Bộ 2' },
    { n: 13, level: 'medium', count: 25, dur: 30, label: 'Ôn tập chuyên sâu - Bộ 3' },
    { n: 14, level: 'medium', count: 25, dur: 30, label: 'Ôn tập chuyên sâu - Bộ 4' },
    // 15-17: Kiểm tra 45 phút (30 câu)
    { n: 15, level: 'medium', count: 30, dur: 45, label: 'Kiểm tra 45 phút - Đề 1' },
    { n: 16, level: 'medium', count: 30, dur: 45, label: 'Kiểm tra 45 phút - Đề 2' },
    { n: 17, level: 'medium', count: 30, dur: 45, label: 'Kiểm tra 45 phút - Đề 3' },
    // 18-19: Thi thử học kỳ (35 câu, 50 phút)
    { n: 18, level: 'all',    count: 35, dur: 50, label: 'Thi thử Học kỳ - Đề 1' },
    { n: 19, level: 'all',    count: 35, dur: 50, label: 'Thi thử Học kỳ - Đề 2' },
    // 20: Thử thách tổng hợp (40 câu, 60 phút)
    { n: 20, level: 'hard',   count: 40, dur: 60, label: 'Thử thách tổng hợp' },
  ];

  for (const cfg of configs) {
    // Chọn topic group xoay vòng nếu có topicGroups
    let topicIds = null;
    if (topicGroups?.length) {
      const groupIdx = (cfg.n - 1) % topicGroups.length;
      // Với đề ôn tập và kiểm tra: dùng tất cả topics
      if (cfg.count >= 25) {
        topicIds = topicGroups.flat();
      } else {
        topicIds = topicGroups[groupIdx];
      }
    }

    await mkExam({
      id: `${subCode}-lt-${String(cfg.n).padStart(2, '0')}`,
      title: `[${subName}] ${cfg.label}`,
      desc: descFor(subName, cfg.label, cfg.count, cfg.dur),
      subjectId,
      topicIds,
      count: cfg.count,
      duration: cfg.dur,
      diffLevel: cfg.level,
    });
  }
}

function descFor(subName, label, count, dur) {
  if (label.includes('Khởi động')) return `Bài luyện tập nhẹ nhàng môn ${subName}. ${count} câu dễ, ${dur} phút. Phù hợp học sinh ôn lại kiến thức nền trước khi làm bài khó hơn.`;
  if (label.includes('Luyện tập')) return `Bài luyện tập cơ bản môn ${subName}. ${count} câu trắc nghiệm mức trung bình, ${dur} phút. Củng cố kiến thức và nâng cao kỹ năng làm bài.`;
  if (label.includes('chuyên sâu')) return `Ôn tập chuyên sâu môn ${subName}. ${count} câu hỏi đa dạng, ${dur} phút. Bao phủ nhiều chủ đề, rèn luyện tư duy và củng cố kiến thức.`;
  if (label.includes('45 phút')) return `Đề kiểm tra 45 phút môn ${subName} bám sát chương trình. ${count} câu trắc nghiệm, cấu trúc giống đề thi học kỳ thực tế.`;
  if (label.includes('Học kỳ')) return `Đề thi thử học kỳ môn ${subName}. ${count} câu, ${dur} phút. Tổng hợp kiến thức toàn bộ chương trình, chuẩn bị tốt cho kỳ thi chính thức.`;
  if (label.includes('thách')) return `Đề thử thách tổng hợp môn ${subName}. ${count} câu bao phủ toàn bộ chương trình lớp 7, bao gồm câu hỏi nâng cao. Thời gian ${dur} phút.`;
  return `Đề luyện tập môn ${subName}. ${count} câu, ${dur} phút.`;
}

async function main() {
  // Lấy topics theo môn
  const topics = await p.topic.findMany({ where: { gradeId: 'grade-7' }, select: { id: true, subjectId: true, sortOrder: true }, orderBy: { sortOrder: 'asc' } });
  const topicMap = {};
  for (const t of topics) {
    if (!topicMap[t.subjectId]) topicMap[t.subjectId] = [];
    topicMap[t.subjectId].push(t.id);
  }

  // Nhóm topics thành các nhóm nhỏ để xoay vòng
  function groupTopics(ids, groupSize = 3) {
    if (!ids?.length) return null;
    const groups = [];
    for (let i = 0; i < ids.length; i += groupSize) groups.push(ids.slice(i, i + groupSize));
    return groups.length ? groups : null;
  }

  // Tiếng Anh (topic groups: unit 1-4, 5-8, 9-12, grammar)
  const anhTopics = topicMap['sub-anh'] || [];
  const anhGroups = anhTopics.length ? [
    anhTopics.slice(0, 4),   // Units 1-4
    anhTopics.slice(4, 8),   // Units 5-8
    anhTopics.slice(8, 12),  // Units 9-12
    anhTopics.slice(12),     // Grammar topics
  ].filter(g => g.length) : null;

  await create20Exams('sub-anh', 'anh7', 'Tiếng Anh 7', anhGroups);
  await create20Exams('sub-toan', 'toan7', 'Toán 7', groupTopics(topicMap['sub-toan']));
  await create20Exams('sub-van', 'van7', 'Ngữ Văn 7', null);
  await create20Exams('sub-hoa', 'hoa7', 'Hóa Học 7', groupTopics(topicMap['sub-hoa'], 2));
  await create20Exams('sub-ly', 'ly7', 'Vật Lý 7', groupTopics(topicMap['sub-ly'], 1));
  await create20Exams('sub-khtn', 'khtn7', 'KHTN 7', null);
  await create20Exams('sub-lichsu-dialy', 'sd7', 'Sử - Địa 7', null);
  await create20Exams('sub-tinhoc', 'tin7', 'Tin học 7', null);
  await create20Exams('sub-gdcd', 'gdcd7', 'GDCD 7', null);
  await create20Exams('sub-amnhac', 'am7', 'Âm nhạc 7', null);
  await create20Exams('sub-mythuat', 'mt7', 'Mĩ thuật 7', null);
  await create20Exams('sub-gdtc', 'gdtc7', 'GDTC 7', null);
  await create20Exams('sub-congnghee', 'cn7', 'Công nghệ 7', null);

  // Tổng kết
  const bySubject = await p.exam.groupBy({ by: ['subjectId'], where: { gradeId: 'grade-7' }, _count: { id: true }, orderBy: { subjectId: 'asc' } });
  const subNames = await p.subject.findMany({ select: { id: true, name: true } });
  const nameMap = {}; subNames.forEach(s => nameMap[s.id] = s.name);
  const total = bySubject.reduce((s, b) => s + b._count.id, 0);

  console.log('\n' + '='.repeat(50));
  console.log('📊 TỔNG KẾT ĐỀ THI LỚP 7:');
  bySubject.forEach(b => console.log(`  ${(nameMap[b.subjectId] || b.subjectId).padEnd(25)} ${b._count.id} đề`));
  console.log(`\n🎉 TỔNG CỘNG: ${total} đề thi lớp 7`);
}

main().catch(console.error).finally(() => p.$disconnect());
