/**
 * Tạo / điền câu hỏi cho đề thi lớp 7 còn thiếu:
 * 1. Điền câu cho 33 đề Toán lớp 7 đang trống
 * 2. Tạo ~25 đề Sinh Học lớp 7
 * 3. Tạo ~15 đề HĐ Trải nghiệm lớp 7
 */
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

// ── Helpers ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function pickQ(topicIds, subjectId, count) {
  const rows = await p.question.findMany({
    where: { topicId: { in: topicIds }, gradeId: 'grade-7', subjectId },
    select: { id: true },
  });
  return shuffle(rows).slice(0, count).map(r => r.id);
}

async function fillExam(examId, topicIds, subjectId, count) {
  const qIds = await pickQ(topicIds, subjectId, count);
  if (!qIds.length) { console.log(`  ⚠️  Không tìm được câu cho ${examId}`); return; }
  await p.$transaction([
    p.examQuestion.deleteMany({ where: { examId } }),
    p.examQuestion.createMany({
      data: qIds.map((questionId, i) => ({ examId, questionId, questionOrder: i + 1 })),
    }),
    p.exam.update({ where: { id: examId }, data: { totalQuestions: qIds.length } }),
  ]);
  console.log(`  ✅ ${examId}: ${qIds.length} câu`);
}

async function createExam({ id, title, subjectId, difficulty, totalQuestions, durationMinutes, topicIds }) {
  const existing = await p.exam.findUnique({ where: { id } });
  if (existing) {
    // Chỉ fill câu nếu chưa có
    const cnt = await p.examQuestion.count({ where: { examId: id } });
    if (cnt === 0) await fillExam(id, topicIds, subjectId, totalQuestions);
    else console.log(`  ⏭️  ${id}: đã có ${cnt} câu, bỏ qua`);
    return;
  }
  await p.exam.create({
    data: {
      id,
      title,
      subjectId,
      gradeId: 'grade-7',
      difficulty,
      totalQuestions,
      durationMinutes,
      maxScore: 10,
      examType: 'PRACTICE',
      status: 'PUBLISHED',
      createdById: (await p.user.findFirst({ where: { role: 'ADMIN' } }))?.id ?? 'admin',
    },
  });
  await fillExam(id, topicIds, subjectId, totalQuestions);
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. ĐIỀN CÂU CHO 33 ĐỀ TOÁN LỚP 7 TRỐNG
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n📐 [1/3] Điền câu cho 33 đề Toán lớp 7 trống...');
const SUB_TOAN = 'sub-toan';
const T7 = {
  soHuuTi:      'toan7-so-huu-ti',
  soThuc:       'toan7-so-thuc',
  tiLeThuc:     'toan7-ti-le-thuc',
  gocDuongThang:'toan7-goc-duong-thang',
  tamGiac:      'toan7-tam-giac-bang-nhau',
  dongQuy:      'toan7-duong-dong-quy',
  daThuc:       'toan7-da-thuc',
  thongKe:      'toan7-thong-ke-xac-suat',
  hinhKhoi:     'toan7-hinh-khoi',
  onHK1:        'toan7-on-tap-hk1',
  onHK2:        'toan7-on-tap-hk2',
};

const TOAN_EMPTY_MAP = [
  { id:'toan7-hk1-b1',    topics:[T7.soHuuTi],                      n:15 },
  { id:'toan7-hk1-b2',    topics:[T7.soHuuTi, T7.soThuc],           n:20 },
  { id:'toan7-hk1-b3',    topics:[T7.soHuuTi],                      n:20 },
  { id:'toan7-hk1-b4',    topics:[T7.soHuuTi],                      n:25 },
  { id:'toan7-hk1-b5',    topics:[T7.gocDuongThang],                n:15 },
  { id:'toan7-hk1-b6',    topics:[T7.gocDuongThang],                n:20 },
  { id:'toan7-hk1-b7',    topics:[T7.gocDuongThang],                n:25 },
  { id:'toan7-hk1-b8',    topics:[T7.soThuc],                       n:15 },
  { id:'toan7-hk1-b9',    topics:[T7.soThuc, T7.soHuuTi],           n:20 },
  { id:'toan7-hk1-b10',   topics:[T7.soThuc, T7.soHuuTi],           n:20 },
  { id:'toan7-hk1-b11',   topics:[T7.hinhKhoi],                     n:20 },
  { id:'toan7-hk1-b12',   topics:[T7.hinhKhoi],                     n:25 },
  { id:'toan7-hk1-b13-14',topics:[T7.onHK1, T7.soHuuTi, T7.gocDuongThang], n:25 },
  { id:'toan7-hk1-b15',   topics:[T7.onHK1],                        n:25 },
  { id:'toan7-hk1-b16-17',topics:[T7.onHK1, T7.soHuuTi, T7.soThuc], n:30 },
  { id:'toan7-hk1-b18-19',topics:[T7.onHK1, T7.gocDuongThang, T7.hinhKhoi], n:30 },
  { id:'toan7-hk1-b20',   topics:[T7.onHK1],                        n:30 },
  { id:'toan7-hk2-b21-22',topics:[T7.tiLeThuc],                     n:20 },
  { id:'toan7-hk2-b23',   topics:[T7.tiLeThuc],                     n:20 },
  { id:'toan7-hk2-b24',   topics:[T7.tiLeThuc],                     n:25 },
  { id:'toan7-hk2-b25-26',topics:[T7.tamGiac],                      n:20 },
  { id:'toan7-hk2-b27',   topics:[T7.tamGiac],                      n:20 },
  { id:'toan7-hk2-b28',   topics:[T7.tamGiac],                      n:25 },
  { id:'toan7-hk2-b29',   topics:[T7.tamGiac, T7.dongQuy],          n:25 },
  { id:'toan7-hk2-b30-31',topics:[T7.daThuc],                       n:20 },
  { id:'toan7-hk2-b32',   topics:[T7.daThuc],                       n:20 },
  { id:'toan7-hk2-b33',   topics:[T7.daThuc],                       n:25 },
  { id:'toan7-hk2-b34-35',topics:[T7.dongQuy],                      n:25 },
  { id:'toan7-hk2-b36',   topics:[T7.tamGiac, T7.dongQuy],          n:20 },
  { id:'toan7-hk2-b37',   topics:[T7.thongKe],                      n:20 },
  { id:'toan7-hk2-b38',   topics:[T7.thongKe],                      n:20 },
  { id:'toan7-hk2-b39',   topics:[T7.onHK2],                        n:30 },
  { id:'toan7-hk2-b40',   topics:[T7.onHK2],                        n:30 },
];

for (const { id, topics, n } of TOAN_EMPTY_MAP) {
  await fillExam(id, topics, SUB_TOAN, n);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. TẠO ĐỀ THI SINH HỌC LỚP 7
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n🌿 [2/3] Tạo đề thi Sinh Học lớp 7...');
const SUB_SINH = 'sub-sinh';
const S7 = {
  teBao:      'sinh7-te-bao',
  coThe:      'sinh7-co-the',
  phanLoai:   'sinh7-phan-loai',
  namThucVat: 'sinh7-nam-thuc-vat',
  dongVat:    'sinh7-dong-vat',
  traoDoi:    'sinh7-trao-doi-chat',
  camUng:     'sinh7-cam-ung',
  sinhTruong: 'sinh7-sinh-truong',
  sinhSan:    'sinh7-sinh-san',
  heSinhThai: 'sinh7-he-sinh-thai',
};
const ALL_SINH = Object.values(S7);
const HK1_SINH = [S7.teBao, S7.coThe, S7.phanLoai, S7.namThucVat, S7.dongVat];
const HK2_SINH = [S7.traoDoi, S7.camUng, S7.sinhTruong, S7.sinhSan, S7.heSinhThai];

const SINH_EXAMS = [
  // Theo chủ đề (10 đề)
  { id:'sinh7-u01', title:'[Sinh 7] Tế bào - Đơn vị cơ sở sự sống', difficulty:'EASY',   totalQuestions:20, durationMinutes:25, topicIds:[S7.teBao] },
  { id:'sinh7-u02', title:'[Sinh 7] Từ tế bào đến cơ thể',           difficulty:'EASY',   totalQuestions:20, durationMinutes:25, topicIds:[S7.coThe] },
  { id:'sinh7-u03', title:'[Sinh 7] Đa dạng và phân loại sinh vật',   difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.phanLoai] },
  { id:'sinh7-u04', title:'[Sinh 7] Nấm và Thực vật',                 difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.namThucVat] },
  { id:'sinh7-u05', title:'[Sinh 7] Đa dạng động vật',                difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.dongVat] },
  { id:'sinh7-u06', title:'[Sinh 7] Trao đổi chất và chuyển hóa năng lượng', difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.traoDoi] },
  { id:'sinh7-u07', title:'[Sinh 7] Cảm ứng ở sinh vật',              difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.camUng] },
  { id:'sinh7-u08', title:'[Sinh 7] Sinh trưởng và phát triển',        difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.sinhTruong] },
  { id:'sinh7-u09', title:'[Sinh 7] Sinh sản ở sinh vật',             difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.sinhSan] },
  { id:'sinh7-u10', title:'[Sinh 7] Hệ sinh thái và Sinh quyển',      difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[S7.heSinhThai] },
  // Ôn tập HK
  { id:'sinh7-hk1-easy',   title:'[Sinh 7] Ôn tập HK1 - Cơ bản (Chủ đề 1-5)',   difficulty:'EASY',   totalQuestions:25, durationMinutes:30, topicIds:HK1_SINH },
  { id:'sinh7-hk1-medium', title:'[Sinh 7] Ôn tập HK1 - Nâng cao (Chủ đề 1-5)', difficulty:'MEDIUM', totalQuestions:25, durationMinutes:30, topicIds:HK1_SINH },
  { id:'sinh7-hk2-easy',   title:'[Sinh 7] Ôn tập HK2 - Cơ bản (Chủ đề 6-10)',  difficulty:'EASY',   totalQuestions:25, durationMinutes:30, topicIds:HK2_SINH },
  { id:'sinh7-hk2-medium', title:'[Sinh 7] Ôn tập HK2 - Nâng cao (Chủ đề 6-10)',difficulty:'MEDIUM', totalQuestions:25, durationMinutes:30, topicIds:HK2_SINH },
  // Kiểm tra 45 phút
  { id:'sinh7-kt45-01', title:'[Sinh 7] Kiểm tra 45 phút - Đề 1', difficulty:'MEDIUM', totalQuestions:30, durationMinutes:45, topicIds:ALL_SINH },
  { id:'sinh7-kt45-02', title:'[Sinh 7] Kiểm tra 45 phút - Đề 2', difficulty:'MEDIUM', totalQuestions:30, durationMinutes:45, topicIds:ALL_SINH },
  { id:'sinh7-kt45-03', title:'[Sinh 7] Kiểm tra 45 phút - Đề 3', difficulty:'MEDIUM', totalQuestions:30, durationMinutes:45, topicIds:ALL_SINH },
  // Thi thử HK
  { id:'sinh7-thithu-01', title:'[Sinh 7] Thi thử Học kỳ - Đề 1', difficulty:'MEDIUM', totalQuestions:35, durationMinutes:45, topicIds:ALL_SINH },
  { id:'sinh7-thithu-02', title:'[Sinh 7] Thi thử Học kỳ - Đề 2', difficulty:'MEDIUM', totalQuestions:35, durationMinutes:45, topicIds:ALL_SINH },
  // Tổng hợp
  { id:'sinh7-tong-hop', title:'[Sinh 7] Đề thi cuối năm - Tổng hợp', difficulty:'HARD', totalQuestions:40, durationMinutes:60, topicIds:ALL_SINH },
  // Luyện nhanh
  { id:'sinh7-lt-01', title:'[Sinh 7] Luyện nhanh - Tế bào & Cơ thể',              difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[S7.teBao, S7.coThe] },
  { id:'sinh7-lt-02', title:'[Sinh 7] Luyện nhanh - Phân loại & Thực vật',          difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[S7.phanLoai, S7.namThucVat] },
  { id:'sinh7-lt-03', title:'[Sinh 7] Luyện nhanh - Động vật & Trao đổi chất',     difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[S7.dongVat, S7.traoDoi] },
  { id:'sinh7-lt-04', title:'[Sinh 7] Luyện nhanh - Cảm ứng, Sinh trưởng & Sinh sản', difficulty:'EASY', totalQuestions:15, durationMinutes:20, topicIds:[S7.camUng, S7.sinhTruong, S7.sinhSan] },
  { id:'sinh7-lt-05', title:'[Sinh 7] Luyện nhanh - Hệ sinh thái',                  difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[S7.heSinhThai] },
];

for (const exam of SINH_EXAMS) {
  await createExam({ ...exam, subjectId: SUB_SINH });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. TẠO ĐỀ THI HĐ TRẢI NGHIỆM LỚP 7
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n🌟 [3/3] Tạo đề thi HĐ Trải nghiệm lớp 7...');
const SUB_HDTN = 'sub-hdtn';
const H7 = {
  banThan:    'hdtn7-ban-than-gia-dinh',
  nhaTruong:  'hdtn7-nha-truong-xa-hoi',
  tuNhien:    'hdtn7-tu-nhien-moi-truong',
  huongNghiep:'hdtn7-huong-nghiep',
};
const ALL_HDTN = Object.values(H7);

const HDTN_EXAMS = [
  // Theo chủ đề
  { id:'hdtn7-u01', title:'[HDTN 7] Khám phá bản thân và gia đình',  difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[H7.banThan] },
  { id:'hdtn7-u02', title:'[HDTN 7] Nhà trường và xã hội',            difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[H7.nhaTruong] },
  { id:'hdtn7-u03', title:'[HDTN 7] Thiên nhiên và môi trường',        difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[H7.tuNhien] },
  { id:'hdtn7-u04', title:'[HDTN 7] Hướng nghiệp sơ bộ',              difficulty:'EASY',   totalQuestions:15, durationMinutes:20, topicIds:[H7.huongNghiep] },
  // Luyện tập tổng hợp
  { id:'hdtn7-lt-01', title:'[HDTN 7] Luyện tập - Bộ 1 (Bản thân & Nhà trường)',    difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[H7.banThan, H7.nhaTruong] },
  { id:'hdtn7-lt-02', title:'[HDTN 7] Luyện tập - Bộ 2 (Thiên nhiên & Hướng nghiệp)',difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:[H7.tuNhien, H7.huongNghiep] },
  { id:'hdtn7-lt-03', title:'[HDTN 7] Luyện tập - Bộ 3 (Tổng hợp)',                 difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:ALL_HDTN },
  { id:'hdtn7-lt-04', title:'[HDTN 7] Luyện tập - Bộ 4 (Tổng hợp)',                 difficulty:'MEDIUM', totalQuestions:20, durationMinutes:25, topicIds:ALL_HDTN },
  // Ôn tập tổng hợp
  { id:'hdtn7-on-tap-01', title:'[HDTN 7] Ôn tập tổng hợp - Đề 1', difficulty:'MEDIUM', totalQuestions:25, durationMinutes:30, topicIds:ALL_HDTN },
  { id:'hdtn7-on-tap-02', title:'[HDTN 7] Ôn tập tổng hợp - Đề 2', difficulty:'MEDIUM', totalQuestions:25, durationMinutes:30, topicIds:ALL_HDTN },
  { id:'hdtn7-on-tap-03', title:'[HDTN 7] Ôn tập tổng hợp - Đề 3', difficulty:'MEDIUM', totalQuestions:25, durationMinutes:30, topicIds:ALL_HDTN },
  // Kiểm tra
  { id:'hdtn7-kt-01', title:'[HDTN 7] Kiểm tra - Đề 1', difficulty:'MEDIUM', totalQuestions:30, durationMinutes:40, topicIds:ALL_HDTN },
  { id:'hdtn7-kt-02', title:'[HDTN 7] Kiểm tra - Đề 2', difficulty:'MEDIUM', totalQuestions:30, durationMinutes:40, topicIds:ALL_HDTN },
  // Thi thử
  { id:'hdtn7-thithu-01', title:'[HDTN 7] Thi thử - Đề 1', difficulty:'HARD', totalQuestions:35, durationMinutes:45, topicIds:ALL_HDTN },
  { id:'hdtn7-thithu-02', title:'[HDTN 7] Thi thử - Đề 2', difficulty:'HARD', totalQuestions:35, durationMinutes:45, topicIds:ALL_HDTN },
];

for (const exam of HDTN_EXAMS) {
  await createExam({ ...exam, subjectId: SUB_HDTN });
}

console.log('\n✨ Hoàn tất tất cả!');
await p.$disconnect();
