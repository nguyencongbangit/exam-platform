/**
 * Bổ sung chủ đề lớp 7 theo chương trình GDPT 2018
 * Chạy: node scripts/seed-grade7-topics.js
 */

const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const GRADE_ID = "grade-7";

const TOPICS_BY_SUBJECT = {
  // ── Ngữ Văn ────────────────────────────────────────────────────────────────
  "sub-van": [
    { id: "van7-tho",            name: "Thơ (Đọc hiểu)",                sortOrder: 1 },
    { id: "van7-truyen-ngan",    name: "Truyện ngắn & Tiểu thuyết",     sortOrder: 2 },
    { id: "van7-truyen-dan-gian",name: "Truyện dân gian & Trung đại",   sortOrder: 3 },
    { id: "van7-tuy-but-tan-van",name: "Tùy bút & Tản văn",             sortOrder: 4 },
    { id: "van7-nghi-luan",      name: "Văn nghị luận",                 sortOrder: 5 },
    { id: "van7-van-ban-tt",     name: "Văn bản thông tin",             sortOrder: 6 },
    { id: "van7-tieng-viet-tv",  name: "Tiếng Việt - Từ vựng",         sortOrder: 7 },
    { id: "van7-tieng-viet-ngu-phap", name: "Tiếng Việt - Ngữ pháp câu", sortOrder: 8 },
    { id: "van7-tieng-viet-bptt",name: "Tiếng Việt - Biện pháp tu từ", sortOrder: 9 },
    { id: "van7-tap-lam-bieu-cam","name": "Tập làm văn - Biểu cảm",    sortOrder: 10 },
    { id: "van7-tap-lam-nghi-luan","name": "Tập làm văn - Nghị luận",  sortOrder: 11 },
    { id: "van7-tap-lam-thuyet-minh","name": "Tập làm văn - Thuyết minh", sortOrder: 12 },
  ],

  // ── Sinh Học (KHTN - phần Sinh) ────────────────────────────────────────────
  "sub-sinh": [
    { id: "sinh7-te-bao",        name: "Tế bào - Đơn vị cơ sở của sự sống", sortOrder: 1 },
    { id: "sinh7-co-the",        name: "Từ tế bào đến cơ thể",          sortOrder: 2 },
    { id: "sinh7-phan-loai",     name: "Đa dạng thế giới sống & Phân loại sinh vật", sortOrder: 3 },
    { id: "sinh7-nam-thuc-vat",  name: "Nấm & Thực vật",                sortOrder: 4 },
    { id: "sinh7-dong-vat",      name: "Đa dạng động vật",              sortOrder: 5 },
    { id: "sinh7-trao-doi-chat", name: "Trao đổi chất & Chuyển hóa năng lượng", sortOrder: 6 },
    { id: "sinh7-cam-ung",       name: "Cảm ứng ở sinh vật",            sortOrder: 7 },
    { id: "sinh7-sinh-truong",   name: "Sinh trưởng & Phát triển ở sinh vật", sortOrder: 8 },
    { id: "sinh7-sinh-san",      name: "Sinh sản ở sinh vật",           sortOrder: 9 },
    { id: "sinh7-he-sinh-thai",  name: "Hệ sinh thái & Sinh quyển",     sortOrder: 10 },
  ],

  // ── Lịch sử & Địa lí ───────────────────────────────────────────────────────
  "sub-lichsu-dialy": [
    // Lịch sử
    { id: "ls7-tay-au-trung-dai",  name: "Lịch sử - Tây Âu thời trung đại",            sortOrder: 1 },
    { id: "ls7-trung-quoc-pk",     name: "Lịch sử - Trung Quốc thời phong kiến",        sortOrder: 2 },
    { id: "ls7-dnasi-pk",          name: "Lịch sử - Đông Nam Á thời phong kiến",        sortOrder: 3 },
    { id: "ls7-dai-viet-ngo-dinh", name: "Lịch sử - Đại Việt thời Ngô - Đinh - Tiền Lê", sortOrder: 4 },
    { id: "ls7-dai-viet-ly-tran",  name: "Lịch sử - Đại Việt thời Lý - Trần - Hồ",    sortOrder: 5 },
    { id: "ls7-dai-viet-le-so",    name: "Lịch sử - Đại Việt thời Lê sơ",              sortOrder: 6 },
    { id: "ls7-vung-dat-phia-nam", name: "Lịch sử - Vùng đất phía Nam thế kỷ X-XVI",  sortOrder: 7 },
    // Địa lí
    { id: "dl7-chau-phi",          name: "Địa lí - Châu Phi",                           sortOrder: 8 },
    { id: "dl7-chau-my",           name: "Địa lí - Châu Mỹ",                            sortOrder: 9 },
    { id: "dl7-chau-dai-duong",    name: "Địa lí - Châu Đại Dương & Nam Cực",           sortOrder: 10 },
    { id: "dl7-bien-dai-duong",    name: "Địa lí - Biển và Đại dương thế giới",         sortOrder: 11 },
    { id: "dl7-moi-truong",        name: "Địa lí - Môi trường & Phát triển bền vững",  sortOrder: 12 },
  ],

  // ── GDCD ───────────────────────────────────────────────────────────────────
  "sub-gdcd": [
    { id: "gdcd7-tu-hao-que-huong",   name: "Tự hào về truyền thống quê hương",          sortOrder: 1 },
    { id: "gdcd7-quan-tam-chia-se",   name: "Quan tâm, cảm thông và chia sẻ",            sortOrder: 2 },
    { id: "gdcd7-hoc-tap-tu-giac",    name: "Học tập tự giác, tích cực",                 sortOrder: 3 },
    { id: "gdcd7-giu-chu-tin",        name: "Giữ chữ tín",                               sortOrder: 4 },
    { id: "gdcd7-bao-ton-di-san",     name: "Bảo tồn di sản văn hóa",                   sortOrder: 5 },
    { id: "gdcd7-ung-pho-tam-ly",     name: "Ứng phó với tâm lý căng thẳng",            sortOrder: 6 },
    { id: "gdcd7-phong-chong-te-nan", name: "Phòng, chống tệ nạn xã hội",               sortOrder: 7 },
    { id: "gdcd7-quyen-nghia-vu-gd",  name: "Quyền và nghĩa vụ công dân trong gia đình", sortOrder: 8 },
  ],

  // ── Tin học ────────────────────────────────────────────────────────────────
  "sub-tinhoc": [
    { id: "tin7-thong-tin-xa-hoi",    name: "Thông tin và xã hội",                       sortOrder: 1 },
    { id: "tin7-mang-internet",       name: "Mạng máy tính và Internet",                 sortOrder: 2 },
    { id: "tin7-dao-duc-phap-luat",   name: "Đạo đức, pháp luật & văn hóa ICT",         sortOrder: 3 },
    { id: "tin7-giai-quyet-van-de",   name: "Giải quyết vấn đề với máy tính",            sortOrder: 4 },
    { id: "tin7-trinh-chieu",         name: "Phần mềm trình chiếu (PowerPoint)",         sortOrder: 5 },
    { id: "tin7-bang-tinh",           name: "Phần mềm bảng tính (Excel)",                sortOrder: 6 },
  ],

  // ── Công nghệ ──────────────────────────────────────────────────────────────
  "sub-congnghee": [
    { id: "cn7-trong-trot",           name: "Trồng trọt & Lâm nghiệp",                   sortOrder: 1 },
    { id: "cn7-chan-nuoi",            name: "Chăn nuôi",                                 sortOrder: 2 },
    { id: "cn7-thuy-san",             name: "Thủy sản",                                  sortOrder: 3 },
    { id: "cn7-an-toan-lao-dong",     name: "An toàn lao động trong nông nghiệp",        sortOrder: 4 },
  ],

  // ── Âm nhạc ────────────────────────────────────────────────────────────────
  "sub-amnhac": [
    { id: "am7-hat",                  name: "Hát (Học hát các bài dân ca, nhạc trẻ)",    sortOrder: 1 },
    { id: "am7-nhac-cu",              name: "Nhạc cụ & Đọc nhạc",                        sortOrder: 2 },
    { id: "am7-ly-thuyet-nhac",       name: "Lý thuyết âm nhạc",                        sortOrder: 3 },
    { id: "am7-thuong-thuc-am-nhac",  name: "Thường thức âm nhạc",                      sortOrder: 4 },
  ],

  // ── Mĩ thuật ───────────────────────────────────────────────────────────────
  "sub-mythuat": [
    { id: "my7-ve-tranh",             name: "Vẽ tranh & Trang trí",                      sortOrder: 1 },
    { id: "my7-thu-cong",             name: "Thủ công & Tạo hình 3D",                    sortOrder: 2 },
    { id: "my7-lich-su-my-thuat",     name: "Lịch sử mĩ thuật",                         sortOrder: 3 },
  ],

  // ── GDTC ───────────────────────────────────────────────────────────────────
  "sub-gdtc": [
    { id: "gdtc7-the-duc-co-ban",     name: "Thể dục cơ bản",                           sortOrder: 1 },
    { id: "gdtc7-bong-da",            name: "Bóng đá",                                   sortOrder: 2 },
    { id: "gdtc7-bong-chuyen",        name: "Bóng chuyền",                               sortOrder: 3 },
    { id: "gdtc7-vo-thuat",           name: "Võ thuật & Tự vệ",                          sortOrder: 4 },
  ],

  // ── Hoạt động Trải nghiệm ──────────────────────────────────────────────────
  "sub-hdtn": [
    { id: "hdtn7-ban-than-gia-dinh",  name: "Khám phá bản thân và gia đình",             sortOrder: 1 },
    { id: "hdtn7-nha-truong-xa-hoi",  name: "Nhà trường và xã hội",                     sortOrder: 2 },
    { id: "hdtn7-tu-nhien-moi-truong","name": "Thiên nhiên và môi trường",               sortOrder: 3 },
    { id: "hdtn7-huong-nghiep",       name: "Hướng nghiệp sơ bộ",                        sortOrder: 4 },
  ],
};

async function main() {
  console.log("=== Bổ sung chủ đề Lớp 7 ===\n");
  let added = 0, skipped = 0;

  for (const [subjectId, topics] of Object.entries(TOPICS_BY_SUBJECT)) {
    // Kiểm tra môn tồn tại
    const subject = await p.subject.findUnique({ where: { id: subjectId } });
    if (!subject) {
      console.log(`  ⚠️  Bỏ qua: môn ${subjectId} không tồn tại trong DB`);
      continue;
    }

    console.log(`📘 ${subject.name} (${topics.length} chủ đề):`);

    for (const topic of topics) {
      const exists = await p.topic.findUnique({ where: { id: topic.id } });
      if (exists) {
        console.log(`   ↳ [bỏ qua] ${topic.name}`);
        skipped++;
        continue;
      }
      await p.topic.create({
        data: {
          id: topic.id,
          name: topic.name,
          sortOrder: topic.sortOrder,
          subjectId,
          gradeId: GRADE_ID,
        },
      });
      console.log(`   ✅ ${topic.name}`);
      added++;
    }
    console.log("");
  }

  console.log(`\n=== Hoàn tất: thêm ${added} chủ đề, bỏ qua ${skipped} đã có ===`);
}

main().catch(console.error).finally(() => p.$disconnect());
