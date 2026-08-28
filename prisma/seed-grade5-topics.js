// Tạo topics lớp 5 cho tất cả môn học theo chương trình Kết nối tri thức
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const GRADE_ID = 'grade-5';

// Chỉ thêm các môn CHƯA có topic lớp 5 (Toán + Tiếng Anh đã có rồi)
const TOPICS_TO_CREATE = [
  // ── Tiếng Việt ──
  { subjectId: 'sub-tieng-viet', name: 'Đọc hiểu văn bản', sortOrder: 1 },
  { subjectId: 'sub-tieng-viet', name: 'Luyện từ và câu', sortOrder: 2 },
  { subjectId: 'sub-tieng-viet', name: 'Chính tả', sortOrder: 3 },
  { subjectId: 'sub-tieng-viet', name: 'Tập làm văn', sortOrder: 4 },
  { subjectId: 'sub-tieng-viet', name: 'Kể chuyện', sortOrder: 5 },

  // ── Đạo đức ──
  { subjectId: 'sub-daoduc', name: 'Em yêu quê hương, đất nước', sortOrder: 1 },
  { subjectId: 'sub-daoduc', name: 'Biết ơn và kính trọng', sortOrder: 2 },
  { subjectId: 'sub-daoduc', name: 'Trách nhiệm và hợp tác', sortOrder: 3 },
  { subjectId: 'sub-daoduc', name: 'Bảo vệ môi trường', sortOrder: 4 },
  { subjectId: 'sub-daoduc', name: 'An toàn và sức khỏe', sortOrder: 5 },

  // ── Khoa học ──
  { subjectId: 'sub-khoahoc', name: 'Chất và sự biến đổi của chất', sortOrder: 1 },
  { subjectId: 'sub-khoahoc', name: 'Năng lượng', sortOrder: 2 },
  { subjectId: 'sub-khoahoc', name: 'Thực vật và động vật', sortOrder: 3 },
  { subjectId: 'sub-khoahoc', name: 'Con người và sức khỏe', sortOrder: 4 },
  { subjectId: 'sub-khoahoc', name: 'Môi trường và tài nguyên thiên nhiên', sortOrder: 5 },

  // ── Lịch sử & Địa lí ──
  { subjectId: 'sub-lichsu-dialy', name: 'Địa lí Việt Nam', sortOrder: 1 },
  { subjectId: 'sub-lichsu-dialy', name: 'Lịch sử Việt Nam thời kì hiện đại', sortOrder: 2 },
  { subjectId: 'sub-lichsu-dialy', name: 'Việt Nam trong khu vực và thế giới', sortOrder: 3 },
  { subjectId: 'sub-lichsu-dialy', name: 'Bảo vệ chủ quyền lãnh thổ', sortOrder: 4 },

  // ── Tin học & Công nghệ ──
  { subjectId: 'sub-tinhoc', name: 'Thông tin và xã hội', sortOrder: 1 },
  { subjectId: 'sub-tinhoc', name: 'Máy tính và cách sử dụng', sortOrder: 2 },
  { subjectId: 'sub-tinhoc', name: 'Lập trình cơ bản', sortOrder: 3 },
  { subjectId: 'sub-tinhoc', name: 'Internet và ứng dụng', sortOrder: 4 },

  // ── Hoạt động Trải nghiệm ──
  { subjectId: 'sub-hdtn', name: 'Em với nhà trường', sortOrder: 1 },
  { subjectId: 'sub-hdtn', name: 'Em với gia đình', sortOrder: 2 },
  { subjectId: 'sub-hdtn', name: 'Em với cộng đồng', sortOrder: 3 },
  { subjectId: 'sub-hdtn', name: 'Em với thiên nhiên và đất nước', sortOrder: 4 },

  // ── Âm nhạc ──
  { subjectId: 'sub-amnhac', name: 'Học hát', sortOrder: 1 },
  { subjectId: 'sub-amnhac', name: 'Nhạc lí cơ bản', sortOrder: 2 },
  { subjectId: 'sub-amnhac', name: 'Nghe nhạc và cảm thụ âm nhạc', sortOrder: 3 },

  // ── Mĩ thuật ──
  { subjectId: 'sub-mythuat', name: 'Vẽ theo mẫu và vẽ tranh', sortOrder: 1 },
  { subjectId: 'sub-mythuat', name: 'Màu sắc và trang trí', sortOrder: 2 },
  { subjectId: 'sub-mythuat', name: 'Cảm thụ và thưởng thức nghệ thuật', sortOrder: 3 },

  // ── Giáo dục thể chất ──
  { subjectId: 'sub-gdtc', name: 'Thể dục cơ bản', sortOrder: 1 },
  { subjectId: 'sub-gdtc', name: 'Trò chơi vận động', sortOrder: 2 },
  { subjectId: 'sub-gdtc', name: 'Giáo dục sức khỏe', sortOrder: 3 },
];

async function main() {
  console.log('Tạo topics lớp 5 cho các môn chưa có...\n');
  let created = 0;
  let skipped = 0;

  for (const t of TOPICS_TO_CREATE) {
    // Kiểm tra đã tồn tại chưa
    const exists = await p.topic.findFirst({
      where: { subjectId: t.subjectId, gradeId: GRADE_ID, name: t.name },
    });
    if (exists) { skipped++; continue; }

    await p.topic.create({
      data: {
        subjectId: t.subjectId,
        gradeId: GRADE_ID,
        name: t.name,
        sortOrder: t.sortOrder,
      },
    });
    created++;
    console.log(`  ✅ ${t.name} (${t.subjectId})`);
  }

  console.log(`\n📊 Kết quả: tạo ${created} topic, bỏ qua ${skipped} topic đã có`);

  // Kiểm tra lại các môn có topic lớp 5
  const subjects = await p.topic.findMany({
    where: { gradeId: GRADE_ID },
    select: { subject: { select: { name: true } } },
    distinct: ['subjectId'],
  });
  console.log(`\n📚 Lớp 5 hiện có ${subjects.length} môn học:`);
  subjects.forEach(s => console.log(`   - ${s.subject.name}`));
}

main().catch(console.error).finally(() => p.$disconnect());
