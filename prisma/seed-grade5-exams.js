// Tạo đề thi luyện tập lớp 5 cho tất cả môn học
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const GRADE_ID   = 'grade-5';
const CREATED_BY = 'user-admin';

// Shuffle mảng ngẫu nhiên
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Tạo 1 đề thi và gắn câu hỏi vào
async function createExam({ title, description, subjectId, difficulty, totalQ, duration, questions }) {
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

  if (questions.length > 0) {
    await p.examQuestion.createMany({
      data: questions.slice(0, totalQ).map((qId, i) => ({
        examId:        exam.id,
        questionId:    qId,
        questionOrder: i + 1,
        points:        parseFloat((10 / Math.min(questions.length, totalQ)).toFixed(2)),
      })),
    });
  }

  return exam;
}

// Lấy câu hỏi của môn + lớp theo độ khó
async function getQuestions(subjectId, difficulties, limit) {
  const qs = await p.question.findMany({
    where: {
      subjectId,
      gradeId:      GRADE_ID,
      status:       'ACTIVE',
      questionType: 'MULTIPLE_CHOICE',
      difficulty:   { in: difficulties },
    },
    select: { id: true },
  });
  return shuffle(qs.map(q => q.id)).slice(0, limit);
}

async function main() {
  console.log('🏫 Tạo đề thi luyện tập lớp 5...\n');

  // ── Kế hoạch đề thi theo môn ──
  // Môn có câu hỏi: Toán, Tiếng Anh → tạo đề đầy đủ (Dễ + TB + Khó)
  // Môn chưa có câu hỏi → tạo đề placeholder (0 câu, giáo viên bổ sung sau)

  const EXAMS = [
    // ── TOÁN ──
    { title: 'Toán lớp 5 – Đề luyện tập số 1 (Dễ)',        subjectId: 'sub-toan',         diff: 'EASY',   diffs: ['EASY'],              totalQ: 15, dur: 20 },
    { title: 'Toán lớp 5 – Đề luyện tập số 2 (Trung bình)', subjectId: 'sub-toan',         diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 20, dur: 30 },
    { title: 'Toán lớp 5 – Đề luyện tập số 3 (Khó)',        subjectId: 'sub-toan',         diff: 'HARD',   diffs: ['MEDIUM','HARD'],      totalQ: 20, dur: 40 },
    { title: 'Toán lớp 5 – Phân số và Số thập phân',        subjectId: 'sub-toan',         diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 20, dur: 30 },
    { title: 'Toán lớp 5 – Đo lường và Hình học',           subjectId: 'sub-toan',         diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 15, dur: 25 },

    // ── TIẾNG ANH ──
    { title: 'Tiếng Anh lớp 5 – Đề luyện tập số 1 (Dễ)',        subjectId: 'sub-anh',     diff: 'EASY',   diffs: ['EASY'],              totalQ: 15, dur: 20 },
    { title: 'Tiếng Anh lớp 5 – Đề luyện tập số 2 (Trung bình)', subjectId: 'sub-anh',     diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 20, dur: 25 },
    { title: 'Tiếng Anh lớp 5 – Đề luyện tập số 3 (Khó)',        subjectId: 'sub-anh',     diff: 'HARD',   diffs: ['MEDIUM','HARD'],      totalQ: 20, dur: 30 },
    { title: 'Tiếng Anh lớp 5 – Ngữ pháp tổng hợp',              subjectId: 'sub-anh',     diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 20, dur: 25 },
    { title: 'Tiếng Anh lớp 5 – Từ vựng và Đọc hiểu',            subjectId: 'sub-anh',     diff: 'MEDIUM', diffs: ['EASY','MEDIUM'],      totalQ: 15, dur: 20 },

    // ── TIẾNG VIỆT (placeholder) ──
    { title: 'Tiếng Việt lớp 5 – Đọc hiểu văn bản',   subjectId: 'sub-tieng-viet', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },
    { title: 'Tiếng Việt lớp 5 – Luyện từ và câu',    subjectId: 'sub-tieng-viet', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },
    { title: 'Tiếng Việt lớp 5 – Tập làm văn',        subjectId: 'sub-tieng-viet', diff: 'MEDIUM', diffs: [], totalQ: 15, dur: 25 },

    // ── KHOA HỌC (placeholder) ──
    { title: 'Khoa học lớp 5 – Chất và năng lượng',           subjectId: 'sub-khoahoc', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },
    { title: 'Khoa học lớp 5 – Thực vật, động vật và môi trường', subjectId: 'sub-khoahoc', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },

    // ── LỊCH SỬ & ĐỊA LÍ (placeholder) ──
    { title: 'Lịch sử & Địa lí lớp 5 – Địa lí Việt Nam',          subjectId: 'sub-lichsu-dialy', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },
    { title: 'Lịch sử & Địa lí lớp 5 – Lịch sử Việt Nam hiện đại', subjectId: 'sub-lichsu-dialy', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 30 },

    // ── ĐẠO ĐỨC (placeholder) ──
    { title: 'Đạo đức lớp 5 – Bài tập tổng hợp số 1', subjectId: 'sub-daoduc', diff: 'EASY',   diffs: [], totalQ: 15, dur: 20 },
    { title: 'Đạo đức lớp 5 – Bài tập tổng hợp số 2', subjectId: 'sub-daoduc', diff: 'MEDIUM', diffs: [], totalQ: 20, dur: 25 },

    // ── TIN HỌC & CN (placeholder) ──
    { title: 'Tin học lớp 5 – Máy tính và Internet', subjectId: 'sub-tinhoc', diff: 'EASY',   diffs: [], totalQ: 15, dur: 20 },
    { title: 'Tin học lớp 5 – Lập trình cơ bản',     subjectId: 'sub-tinhoc', diff: 'MEDIUM', diffs: [], totalQ: 15, dur: 25 },

    // ── HĐ TRẢI NGHIỆM (placeholder) ──
    { title: 'HĐ Trải nghiệm lớp 5 – Bài tập tổng hợp', subjectId: 'sub-hdtn', diff: 'EASY', diffs: [], totalQ: 15, dur: 20 },

    // ── ÂM NHẠC (placeholder) ──
    { title: 'Âm nhạc lớp 5 – Nhạc lí và bài hát', subjectId: 'sub-amnhac', diff: 'EASY', diffs: [], totalQ: 10, dur: 15 },

    // ── MĨ THUẬT (placeholder) ──
    { title: 'Mĩ thuật lớp 5 – Lí thuyết cơ bản', subjectId: 'sub-mythuat', diff: 'EASY', diffs: [], totalQ: 10, dur: 15 },

    // ── GDTC (placeholder) ──
    { title: 'GDTC lớp 5 – Sức khỏe và thể thao', subjectId: 'sub-gdtc', diff: 'EASY', diffs: [], totalQ: 10, dur: 15 },
  ];

  let created = 0;
  for (const e of EXAMS) {
    // Lấy câu hỏi thực nếu môn có dữ liệu
    const qIds = e.diffs.length > 0
      ? await getQuestions(e.subjectId, e.diffs, e.totalQ * 2)
      : [];

    // Thực tế totalQ = số câu có thể lấy được (tối thiểu 0)
    const actualQ = qIds.length > 0 ? Math.min(qIds.length, e.totalQ) : e.totalQ;

    const descSuffix = qIds.length === 0
      ? ' (Đề thi chưa có câu hỏi – giáo viên sẽ bổ sung)'
      : ` – ${actualQ} câu hỏi`;

    await createExam({
      title:       e.title,
      description: `Đề luyện tập ${e.diff === 'EASY' ? 'dễ' : e.diff === 'HARD' ? 'khó' : 'trung bình'} – Lớp 5${descSuffix}`,
      subjectId:   e.subjectId,
      difficulty:  e.diff,
      totalQ:      actualQ,
      duration:    e.dur,
      questions:   qIds,
    });

    console.log(`  ✅ ${e.title} (${qIds.length > 0 ? actualQ + ' câu' : 'placeholder'})`);
    created++;
  }

  // Thống kê
  const total = await p.exam.count({ where: { gradeId: GRADE_ID } });
  console.log(`\n✅ Đã tạo ${created} đề thi`);
  console.log(`📊 Tổng đề thi lớp 5: ${total}`);

  const bySubject = await p.exam.groupBy({
    by: ['subjectId'],
    where: { gradeId: GRADE_ID },
    _count: { id: true },
  });
  const subjects = await p.subject.findMany({ where: { id: { in: bySubject.map(b => b.subjectId) } }, select: { id:true, name:true } });
  const nameMap = Object.fromEntries(subjects.map(s => [s.id, s.name]));
  bySubject.forEach(b => console.log(`   📚 ${nameMap[b.subjectId] || b.subjectId}: ${b._count.id} đề`));
}

main().catch(console.error).finally(() => p.$disconnect());
