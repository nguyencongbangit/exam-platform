// Tạo đề thi Tiếng Anh lớp 7 - dành cho học sinh học yếu tiến bộ hơn
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

// Pick questions: prefer EASY then MEDIUM, limit count
async function pickQuestions(where, count, preferEasy = true) {
  const easyWhere = { ...where, difficulty: preferEasy ? { in: ['EASY', 'MEDIUM'] } : { in: ['EASY', 'MEDIUM', 'HARD'] } };
  let qs = await p.question.findMany({ where: easyWhere, select: { id: true } });
  if (qs.length < count) {
    qs = await p.question.findMany({ where, select: { id: true } });
  }
  return shuffle(qs).slice(0, count);
}

async function createExam({ id, title, description, topicIds, extraWhere, count, duration, difficulty, examType }) {
  // Delete existing if any
  const existing = await p.exam.findUnique({ where: { id } });
  if (existing) {
    await p.examQuestion.deleteMany({ where: { examId: id } });
    await p.exam.delete({ where: { id } });
  }

  const baseWhere = {
    subjectId: 'sub-anh',
    gradeId: 'grade-7',
    status: 'ACTIVE',
    questionType: 'MULTIPLE_CHOICE',
    ...extraWhere,
  };

  let questions = [];

  if (topicIds && topicIds.length > 0) {
    // Spread questions from each topic evenly
    const perTopic = Math.ceil(count / topicIds.length);
    const seen = new Set();

    for (const topicId of topicIds) {
      const qs = await pickQuestions({ ...baseWhere, topicId }, perTopic);
      for (const q of qs) {
        if (!seen.has(q.id)) { seen.add(q.id); questions.push(q); }
      }
    }

    // Top up from any topic if not enough
    if (questions.length < count) {
      const topUpWhere = { ...baseWhere, topicId: { in: topicIds }, id: { notIn: questions.map(q => q.id) } };
      const more = await p.question.findMany({ where: topUpWhere, select: { id: true } });
      for (const q of shuffle(more)) {
        if (questions.length >= count) break;
        questions.push(q);
      }
    }
  } else {
    questions = await pickQuestions(baseWhere, count);
  }

  questions = shuffle(questions).slice(0, count);
  if (questions.length < 5) {
    console.log(`⚠️  ${title}: chỉ có ${questions.length} câu, bỏ qua`);
    return null;
  }

  const exam = await p.exam.create({
    data: {
      id,
      title,
      description,
      subjectId: 'sub-anh',
      gradeId: 'grade-7',
      durationMinutes: duration,
      totalQuestions: questions.length,
      maxScore: 10,
      difficulty,
      examType: examType || 'PRACTICE',
      createdById: 'user-admin',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      questions: {
        create: questions.map((q, i) => ({ questionId: q.id, questionOrder: i + 1, points: 0.25 })),
      },
    },
  });
  console.log(`✅ ${title} — ${questions.length} câu`);
  return exam;
}

async function main() {
  // Get topic IDs
  const topics = await p.topic.findMany({
    where: { subjectId: 'sub-anh', gradeId: 'grade-7' },
    select: { id: true, name: true, sortOrder: true },
    orderBy: { sortOrder: 'asc' },
  });
  const T = {};
  for (const t of topics) T[t.sortOrder] = t.id; // T[1] = Unit 1 id, etc.

  console.log('\n📚 TẠO ĐỀ THI TIẾNG ANH LỚP 7\n');

  // ====================================================
  // NHÓM 1: ĐỀ KHỞI ĐỘNG (dành cho học sinh rất yếu)
  // ====================================================
  console.log('--- Nhóm 1: Đề khởi động ---');

  await createExam({
    id: 'anh7-start-01',
    title: '[Anh 7] Khởi động - Từ vựng và Giao tiếp cơ bản',
    description: 'Đề dành cho học sinh mới bắt đầu. Chỉ gồm từ vựng cơ bản và các câu giao tiếp hàng ngày. Làm quen với tiếng Anh lớp 7.',
    topicIds: [T[1], T[2], T[5]],
    extraWhere: { difficulty: 'EASY' },
    count: 15,
    duration: 20,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-start-02',
    title: '[Anh 7] Khởi động - Ngữ pháp nền tảng',
    description: 'Ôn lại các thì cơ bản: hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn. Dành cho học sinh cần củng cố nền tảng.',
    topicIds: [T[13], T[14]],
    count: 15,
    duration: 20,
    difficulty: 'EASY',
  });

  // ====================================================
  // NHÓM 2: ĐỀ THEO UNIT (15-20 câu mỗi unit)
  // ====================================================
  console.log('\n--- Nhóm 2: Đề theo Unit ---');

  const unitExams = [
    { id: 'anh7-u01', unit: 1, title: '[Anh 7 - Unit 1] My Hobbies - Sở thích', duration: 20, desc: 'Từ vựng và ngữ pháp về sở thích. Học cách dùng V-ing sau enjoy/hate/love/prefer. Trạng từ tần suất.' },
    { id: 'anh7-u02', unit: 2, title: '[Anh 7 - Unit 2] Health - Sức khỏe', duration: 20, desc: 'Từ vựng về sức khỏe, bệnh tật. Dùng should/shouldn\'t để đưa lời khuyên. Câu mệnh lệnh.' },
    { id: 'anh7-u03', unit: 3, title: '[Anh 7 - Unit 3] Community Service - Hoạt động cộng đồng', duration: 20, desc: 'Từ vựng về hoạt động tình nguyện. Quá khứ đơn. Liên từ because/but/so.' },
    { id: 'anh7-u04', unit: 4, title: '[Anh 7 - Unit 4] Music and Arts - Âm nhạc và Nghệ thuật', duration: 20, desc: 'Từ vựng về âm nhạc, hội họa. Thì hiện tại hoàn thành với ever/never/already. Tính từ đuôi -ed và -ing.' },
    { id: 'anh7-u05', unit: 5, title: '[Anh 7 - Unit 5] Vietnamese Food - Ẩm thực Việt Nam', duration: 20, desc: 'Từ vựng ẩm thực Việt Nam. Danh từ đếm được/không đếm được. Some/any/much/many/a lot of.' },
    { id: 'anh7-u06', unit: 6, title: '[Anh 7 - Unit 6] The First University - Văn Miếu', duration: 20, desc: 'Lịch sử Văn Miếu Quốc Tử Giám. Quá khứ đơn (sự kiện lịch sử). Cấu trúc used to.' },
    { id: 'anh7-u07', unit: 7, title: '[Anh 7 - Unit 7] Traffic - Giao thông', duration: 20, desc: 'Từ vựng giao thông an toàn. Động từ khuyết thiếu must/mustn\'t/should. Liên từ because/so that.' },
    { id: 'anh7-u08', unit: 8, title: '[Anh 7 - Unit 8] Films - Điện ảnh', duration: 20, desc: 'Từ vựng về phim ảnh. Câu bị động. Quá khứ tiếp diễn vs quá khứ đơn.' },
    { id: 'anh7-u09', unit: 9, title: '[Anh 7 - Unit 9] Festivals - Lễ hội', duration: 20, desc: 'Lễ hội trên thế giới và Việt Nam. Hiện tại đơn (phong tục). So sánh hơn.' },
    { id: 'anh7-u10', unit: 10, title: '[Anh 7 - Unit 10] Sources of Energy - Năng lượng', duration: 20, desc: 'Từ vựng về các nguồn năng lượng. Câu điều kiện loại 1 và 2. Động từ khuyết thiếu.' },
    { id: 'anh7-u11', unit: 11, title: '[Anh 7 - Unit 11] Future Travel - Du lịch tương lai', duration: 20, desc: 'Phương tiện tương lai. Will vs be going to. Thì tương lai tiếp diễn.' },
    { id: 'anh7-u12', unit: 12, title: '[Anh 7 - Unit 12] Overcrowded World - Dân số', duration: 20, desc: 'Vấn đề đô thị hóa. Hiện tại hoàn thành. So sánh nhất. Mệnh đề điều kiện.' },
  ];

  for (const ex of unitExams) {
    await createExam({
      id: ex.id,
      title: ex.title,
      description: ex.desc,
      topicIds: [T[ex.unit]],
      count: 20,
      duration: ex.duration,
      difficulty: 'EASY',
    });
  }

  // ====================================================
  // NHÓM 3: ĐỀ ÔN TẬP HỌC KỲ
  // ====================================================
  console.log('\n--- Nhóm 3: Đề ôn tập học kỳ ---');

  await createExam({
    id: 'anh7-hk1-easy',
    title: '[Anh 7] Ôn tập Học kỳ 1 - Cơ bản (Units 1-6)',
    description: 'Ôn tập toàn bộ kiến thức HK1: sở thích, sức khỏe, cộng đồng, âm nhạc, ẩm thực, Văn Miếu. Đề dễ, phù hợp học sinh yếu.',
    topicIds: [T[1], T[2], T[3], T[4], T[5], T[6]],
    count: 25,
    duration: 30,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-hk1-medium',
    title: '[Anh 7] Ôn tập Học kỳ 1 - Nâng cao (Units 1-6)',
    description: 'Đề ôn HK1 ở mức trung bình. Kiểm tra toàn diện từ vựng, ngữ pháp và kỹ năng đọc hiểu các unit 1-6.',
    topicIds: [T[1], T[2], T[3], T[4], T[5], T[6]],
    count: 25,
    duration: 35,
    difficulty: 'MEDIUM',
  });

  await createExam({
    id: 'anh7-hk2-easy',
    title: '[Anh 7] Ôn tập Học kỳ 2 - Cơ bản (Units 7-12)',
    description: 'Ôn tập HK2: giao thông, điện ảnh, lễ hội, năng lượng, tương lai, dân số. Đề dễ, phù hợp học sinh yếu.',
    topicIds: [T[7], T[8], T[9], T[10], T[11], T[12]],
    count: 25,
    duration: 30,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-hk2-medium',
    title: '[Anh 7] Ôn tập Học kỳ 2 - Nâng cao (Units 7-12)',
    description: 'Đề ôn HK2 ở mức trung bình. Kiểm tra toàn diện từ vựng, ngữ pháp và kỹ năng các unit 7-12.',
    topicIds: [T[7], T[8], T[9], T[10], T[11], T[12]],
    count: 25,
    duration: 35,
    difficulty: 'MEDIUM',
  });

  // ====================================================
  // NHÓM 4: ĐỀ THEO KỸ NĂNG NGỮ PHÁP
  // ====================================================
  console.log('\n--- Nhóm 4: Đề theo kỹ năng ngữ pháp ---');

  await createExam({
    id: 'anh7-grammar-tenses',
    title: '[Anh 7] Ngữ pháp - Các thì động từ',
    description: 'Ôn luyện chuyên sâu các thì: hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn, quá khứ tiếp diễn, hiện tại hoàn thành. Dạng bài điền vào chỗ trống.',
    topicIds: [T[13], T[14], T[17]],
    count: 20,
    duration: 25,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-grammar-advanced',
    title: '[Anh 7] Ngữ pháp - Câu điều kiện & Bị động',
    description: 'Luyện câu điều kiện loại 1 và 2, câu bị động ở các thì. Kết hợp với ngữ pháp nâng cao của lớp 7.',
    topicIds: [T[15], T[16], T[14], T[17]],
    count: 20,
    duration: 25,
    difficulty: 'MEDIUM',
  });

  await createExam({
    id: 'anh7-grammar-modal',
    title: '[Anh 7] Ngữ pháp - Động từ khuyết thiếu & Cấu trúc câu',
    description: 'Ôn luyện must/mustn\'t/should/can/might, so sánh hơn/nhất, mệnh đề quan hệ, câu hỏi đuôi. Phù hợp học sinh cần củng cố ngữ pháp.',
    topicIds: null,
    extraWhere: { difficulty: { in: ['EASY', 'MEDIUM'] } },
    count: 20,
    duration: 25,
    difficulty: 'MEDIUM',
  });

  // ====================================================
  // NHÓM 5: ĐỀ KIỂM TRA TỔNG HỢP (giống đề thi thật)
  // ====================================================
  console.log('\n--- Nhóm 5: Đề kiểm tra tổng hợp ---');

  await createExam({
    id: 'anh7-mock-easy-01',
    title: '[Anh 7] Đề kiểm tra 45 phút - Số 1 (Cơ bản)',
    description: 'Đề kiểm tra 45 phút bám sát chương trình lớp 7. Gồm từ vựng, ngữ pháp và đọc hiểu. Mức độ dễ, dành cho học sinh cần ôn lại kiến thức.',
    topicIds: [T[1], T[2], T[3], T[7], T[9], T[13]],
    count: 30,
    duration: 45,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-mock-easy-02',
    title: '[Anh 7] Đề kiểm tra 45 phút - Số 2 (Cơ bản)',
    description: 'Đề kiểm tra 45 phút bám sát chương trình lớp 7. Tập trung vào nửa sau chương trình: giao thông, phim ảnh, lễ hội, năng lượng.',
    topicIds: [T[4], T[5], T[6], T[8], T[10], T[14]],
    count: 30,
    duration: 45,
    difficulty: 'EASY',
  });

  await createExam({
    id: 'anh7-mock-medium-01',
    title: '[Anh 7] Đề kiểm tra học kỳ - Số 1 (Trung bình)',
    description: 'Đề thi học kỳ mức trung bình. Tổng hợp toàn bộ chương trình lớp 7. Cấu trúc giống đề thi thật: từ vựng, ngữ pháp, đọc hiểu.',
    topicIds: [T[1], T[2], T[3], T[4], T[5], T[6], T[13], T[14], T[15]],
    count: 30,
    duration: 45,
    difficulty: 'MEDIUM',
  });

  await createExam({
    id: 'anh7-mock-medium-02',
    title: '[Anh 7] Đề kiểm tra học kỳ - Số 2 (Trung bình)',
    description: 'Đề thi học kỳ mức trung bình - bộ 2. Tổng hợp chương trình lớp 7 với trọng tâm là nửa sau: giao thông, phim, lễ hội, năng lượng, tương lai.',
    topicIds: [T[7], T[8], T[9], T[10], T[11], T[12], T[16], T[17]],
    count: 30,
    duration: 45,
    difficulty: 'MEDIUM',
  });

  await createExam({
    id: 'anh7-mock-full-01',
    title: '[Anh 7] Đề thi cuối năm - Tổng hợp toàn bộ',
    description: 'Đề thi tổng hợp cuối năm lớp 7. Bao phủ tất cả 12 units và các điểm ngữ pháp trọng tâm. Chuẩn bị cho kỳ thi học kỳ.',
    topicIds: Object.values(T),
    count: 40,
    duration: 60,
    difficulty: 'MEDIUM',
  });

  // ====================================================
  // NHÓM 6: ĐỀ LUYỆN NHANH (10 câu - cho buổi học ngắn)
  // ====================================================
  console.log('\n--- Nhóm 6: Đề luyện nhanh 10 phút ---');

  const quickExams = [
    { id: 'anh7-quick-vocab-1', title: '[Anh 7] Luyện nhanh - Từ vựng Units 1-3', units: [1, 2, 3], desc: 'Bài kiểm tra từ vựng nhanh 10 phút. Chỉ 10 câu, phù hợp đầu buổi học hoặc ôn nhanh.' },
    { id: 'anh7-quick-vocab-2', title: '[Anh 7] Luyện nhanh - Từ vựng Units 4-6', units: [4, 5, 6], desc: 'Bài kiểm tra từ vựng nhanh 10 phút cho Units 4-6.' },
    { id: 'anh7-quick-vocab-3', title: '[Anh 7] Luyện nhanh - Từ vựng Units 7-9', units: [7, 8, 9], desc: 'Bài kiểm tra từ vựng nhanh 10 phút cho Units 7-9.' },
    { id: 'anh7-quick-vocab-4', title: '[Anh 7] Luyện nhanh - Từ vựng Units 10-12', units: [10, 11, 12], desc: 'Bài kiểm tra từ vựng nhanh 10 phút cho Units 10-12.' },
    { id: 'anh7-quick-grammar-1', title: '[Anh 7] Luyện nhanh - Thì hiện tại & quá khứ', units: [13, 14], desc: 'Bài kiểm tra ngữ pháp nhanh: phân biệt các thì hiện tại và quá khứ.' },
    { id: 'anh7-quick-grammar-2', title: '[Anh 7] Luyện nhanh - Câu điều kiện', units: [15, 16, 17], desc: 'Bài kiểm tra ngữ pháp nhanh: câu điều kiện loại 1 và 2, bị động, hoàn thành.' },
  ];

  for (const ex of quickExams) {
    await createExam({
      id: ex.id,
      title: ex.title,
      description: ex.desc,
      topicIds: ex.units.map(u => T[u]).filter(Boolean),
      count: 10,
      duration: 10,
      difficulty: 'EASY',
    });
  }

  // Summary
  const total = await p.exam.count({ where: { gradeId: 'grade-7', subjectId: 'sub-anh' } });
  console.log(`\n🎉 Tổng cộng: ${total} đề thi Tiếng Anh lớp 7`);
}

main().catch(console.error).finally(() => p.$disconnect());
