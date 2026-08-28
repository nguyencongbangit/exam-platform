/**
 * Refresh câu hỏi cho 52 đề thi Tiếng Anh lớp 7
 * - Xóa ExamQuestion cũ
 * - Lấy ngẫu nhiên câu hỏi từ topic tương ứng
 * - Insert ExamQuestion mới
 */
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

// Topic IDs lớp 7 TA
const T = {
  u1:  'cmt322xj70001eq3ri71h823o',
  u2:  'cmt322xjh0003eq3rx7vmrnj9',
  u3:  'cmt322xjr0005eq3rvok92cgd',
  u4:  'cmt322xjx0007eq3r567dplsb',
  u5:  'cmt322xk20009eq3rn4iltiwl',
  u6:  'cmt322xk9000beq3rujaraqyx',
  u7:  'cmt322xke000deq3rt11zw3hd',
  u8:  'cmt322xkk000feq3rglp3zg7l',
  u9:  'cmt322xkp000heq3rr6mens45',
  u10: 'cmt322xku000jeq3r7z3k6w6a',
  u11: 'cmt322xkz000leq3r26pfzrny',
  u12: 'cmt322xl6000neq3ry0xai4py',
  grPresent:     'cmt322xld000peq3ruys0zc2g',
  grPast:        'cmt322xlj000req3rjiceyabc',
  grConditional: 'cmt322xlp000teq3rt2st1e45',
  grPassive:     'cmt322xlu000veq3rvrb5t91r',
  grPerfect:     'cmt322xlz000xeq3rah6q4zdn',
};

const ALL_UNITS  = [T.u1,T.u2,T.u3,T.u4,T.u5,T.u6,T.u7,T.u8,T.u9,T.u10,T.u11,T.u12];
const ALL_GRAM   = [T.grPresent,T.grPast,T.grConditional,T.grPassive,T.grPerfect];
const ALL        = [...ALL_UNITS, ...ALL_GRAM];
const HK1_UNITS  = [T.u1,T.u2,T.u3,T.u4,T.u5,T.u6];
const HK2_UNITS  = [T.u7,T.u8,T.u9,T.u10,T.u11,T.u12];

// Mapping: examId → topic IDs sẽ lấy câu từ đó
const EXAM_TOPICS = {
  // Unit-specific
  'anh7-u01': [T.u1],
  'anh7-u02': [T.u2],
  'anh7-u03': [T.u3],
  'anh7-u04': [T.u4],
  'anh7-u05': [T.u5],
  'anh7-u06': [T.u6],
  'anh7-u07': [T.u7],
  'anh7-u08': [T.u8],
  'anh7-u09': [T.u9],
  'anh7-u10': [T.u10],
  'anh7-u11': [T.u11],
  'anh7-u12': [T.u12],
  // Khởi động
  'anh7-start-01': [T.u1, T.u2, T.u3],
  'anh7-start-02': [T.grPresent, T.grPast],
  // Ôn tập HK
  'anh7-hk1-easy':   [...HK1_UNITS, T.grPresent, T.grPast],
  'anh7-hk1-medium': [...HK1_UNITS, T.grPresent, T.grPast, T.grConditional],
  'anh7-hk2-easy':   [...HK2_UNITS, T.grConditional, T.grPassive],
  'anh7-hk2-medium': [...HK2_UNITS, T.grConditional, T.grPassive, T.grPerfect],
  // Ngữ pháp
  'anh7-grammar-tenses':   [T.grPresent, T.grPast, T.grPerfect],
  'anh7-grammar-advanced':  [T.grConditional, T.grPassive],
  'anh7-grammar-modal':     ALL_GRAM,
  // Mock exams
  'anh7-mock-easy-01':    ALL,
  'anh7-mock-easy-02':    ALL,
  'anh7-mock-medium-01':  ALL,
  'anh7-mock-medium-02':  ALL,
  'anh7-mock-full-01':    ALL,
  // Luyện nhanh vocab
  'anh7-quick-vocab-1': [T.u1, T.u2, T.u3],
  'anh7-quick-vocab-2': [T.u4, T.u5, T.u6],
  'anh7-quick-vocab-3': [T.u7, T.u8, T.u9],
  'anh7-quick-vocab-4': [T.u10, T.u11, T.u12],
  'anh7-quick-grammar-1': [T.grPresent, T.grPast],
  'anh7-quick-grammar-2': [T.grConditional, T.grPassive],
  // lt series - Khởi động (15 câu mỗi bộ, phân đều theo nhóm unit)
  'anh7-lt-01': [T.u1, T.u2, T.u3],
  'anh7-lt-02': [T.u4, T.u5, T.u6],
  'anh7-lt-03': [T.u7, T.u8, T.u9],
  'anh7-lt-04': [T.u10, T.u11, T.u12],
  'anh7-lt-05': ALL_GRAM,
  // lt series - Luyện tập (20 câu)
  'anh7-lt-06': [...HK1_UNITS, T.grPresent],
  'anh7-lt-07': [...HK1_UNITS, T.grPast],
  'anh7-lt-08': [...HK2_UNITS, T.grConditional],
  'anh7-lt-09': [...HK2_UNITS, T.grPassive],
  'anh7-lt-10': ALL,
  // lt series - Ôn tập chuyên sâu (25 câu)
  'anh7-lt-11': [...HK1_UNITS, T.grPresent, T.grPast],
  'anh7-lt-12': [...HK2_UNITS, T.grConditional, T.grPassive],
  'anh7-lt-13': ALL,
  'anh7-lt-14': ALL,
  // lt series - Kiểm tra 45 phút (30 câu)
  'anh7-lt-15': ALL,
  'anh7-lt-16': ALL,
  'anh7-lt-17': ALL,
  // lt series - Thi thử HK (35 câu)
  'anh7-lt-18': ALL,
  'anh7-lt-19': ALL,
  // lt series - Thử thách (40 câu)
  'anh7-lt-20': ALL,
};

// Lấy ngẫu nhiên N câu từ danh sách topicIds (không trùng)
async function pickRandom(topicIds, count) {
  const questions = await p.question.findMany({
    where: { topicId: { in: topicIds }, gradeId: 'grade-7', subjectId: 'sub-anh' },
    select: { id: true },
  });
  // Shuffle Fisher-Yates
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions.slice(0, count).map(q => q.id);
}

// Main
const exams = await p.exam.findMany({
  where: { gradeId: 'grade-7', subjectId: 'sub-anh' },
  select: { id: true, title: true, totalQuestions: true },
});

let updated = 0, skipped = 0;

for (const exam of exams) {
  const topicIds = EXAM_TOPICS[exam.id];
  if (!topicIds) {
    console.log(`⚠️  Không có mapping: ${exam.id} - ${exam.title}`);
    skipped++;
    continue;
  }

  const count = exam.totalQuestions || 20;
  const qIds = await pickRandom(topicIds, count);

  if (qIds.length < count) {
    console.log(`⚠️  Chỉ tìm được ${qIds.length}/${count} câu cho: ${exam.title}`);
  }

  // Xóa câu cũ và insert câu mới trong transaction
  await p.$transaction([
    p.examQuestion.deleteMany({ where: { examId: exam.id } }),
    p.examQuestion.createMany({
      data: qIds.map((questionId, idx) => ({ examId: exam.id, questionId, questionOrder: idx + 1 })),
    }),
    p.exam.update({ where: { id: exam.id }, data: { totalQuestions: qIds.length } }),
  ]);

  console.log(`✅ ${exam.title}: ${qIds.length} câu`);
  updated++;
}

console.log(`\n📊 Kết quả: ${updated} đề đã cập nhật, ${skipped} bỏ qua`);
await p.$disconnect();
