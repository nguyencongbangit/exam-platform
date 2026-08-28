// Tạo đề thi lớp 7 cho tất cả môn còn lại
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

async function getQIds(subjectId, topicIds, count, difficulty) {
  const diff = difficulty === 'EASY' ? ['EASY','MEDIUM'] : difficulty === 'MEDIUM' ? ['EASY','MEDIUM','HARD'] : ['EASY','MEDIUM','HARD','VERY_HARD'];
  const base = { subjectId, gradeId: 'grade-7', status: 'ACTIVE', questionType: 'MULTIPLE_CHOICE', difficulty: { in: diff } };
  const where = topicIds?.length ? { ...base, topicId: { in: topicIds } } : base;
  let qs = await p.question.findMany({ where, select: { id: true } });
  if (qs.length < Math.min(count, 5)) {
    const wider = topicIds?.length ? { ...base } : base; // drop topic filter
    qs = await p.question.findMany({ where: wider, select: { id: true } });
  }
  return shuffle(qs).slice(0, count).map(q => q.id);
}

async function mkExam({ id, title, desc, subjectId, topicIds, count, duration, diff }) {
  const ex = await p.exam.findUnique({ where: { id } });
  if (ex) { await p.examQuestion.deleteMany({ where: { examId: id } }); await p.exam.delete({ where: { id } }); }
  const ids = await getQIds(subjectId, topicIds, count, diff || 'EASY');
  if (ids.length < 5) { console.log(`  ⚠️  ${title}: chỉ ${ids.length} câu, bỏ qua`); return; }
  await p.exam.create({ data: {
    id, title, description: desc, subjectId, gradeId: 'grade-7',
    durationMinutes: duration, totalQuestions: ids.length, maxScore: 10,
    difficulty: diff || 'EASY', examType: 'PRACTICE', createdById: 'user-admin',
    status: 'PUBLISHED', publishedAt: new Date(),
    questions: { create: ids.map((qId, i) => ({ questionId: qId, questionOrder: i+1, points: parseFloat((10/ids.length).toFixed(2)) })) },
  }});
  console.log(`  ✅ ${title} — ${ids.length} câu, ${duration} phút`);
}

async function main() {
  // ============================================================
  // NGỮ VĂN (79 câu)
  // ============================================================
  console.log('\n📖 NGỮ VĂN LỚP 7');
  const VAN = 'sub-van';
  await mkExam({ id:'van7-tu-vung-01', title:'[Văn 7] Từ vựng - Tiếng Việt nền tảng', desc:'Ôn luyện từ loại, nghĩa của từ, từ đồng nghĩa, trái nghĩa, từ nhiều nghĩa. Nền tảng tiếng Việt lớp 7.', subjectId:VAN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'van7-ngu-phap-01', title:'[Văn 7] Ngữ pháp - Câu và thành phần câu', desc:'Ôn luyện câu đơn, câu ghép, câu phức, các thành phần câu. Kiến thức ngữ pháp tiếng Việt lớp 7.', subjectId:VAN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'van7-doc-hieu-01', title:'[Văn 7] Đọc hiểu - Văn bản và Tập làm văn', desc:'Bài tập đọc hiểu văn bản, nhận biết thể loại, phương thức biểu đạt, nội dung và nghệ thuật.', subjectId:VAN, topicIds:null, count:20, duration:30, diff:'MEDIUM' });
  await mkExam({ id:'van7-on-tap-01', title:'[Văn 7] Ôn tập tổng hợp Học kỳ 1', desc:'Đề ôn tập HK1: từ vựng, ngữ pháp, đọc hiểu, kiến thức văn học. Phù hợp chuẩn bị thi học kỳ.', subjectId:VAN, topicIds:null, count:25, duration:35, diff:'MEDIUM' });
  await mkExam({ id:'van7-kiem-tra-01', title:'[Văn 7] Kiểm tra tổng hợp cuối năm', desc:'Đề kiểm tra tổng hợp toàn bộ chương trình Ngữ Văn lớp 7. Bao gồm đọc hiểu, ngữ pháp, từ vựng và kiến thức văn học.', subjectId:VAN, topicIds:null, count:30, duration:45, diff:'MEDIUM' });

  // ============================================================
  // HÓA HỌC (100 câu, 5 topics)
  // ============================================================
  console.log('\n🧪 HÓA HỌC LỚP 7');
  const HOA = 'sub-hoa';
  // Topic IDs from DB
  const hoaTopics = { nt:'hoa7-nguyen-tu', pt:'hoa7-phan-tu', ht:'hoa7-hoa-tri', pr:'hoa7-phan-ung', ab:'hoa7-acid-base' };
  await mkExam({ id:'hoa7-ch01-nguyen-tu', title:'[Hóa 7 - Chủ đề 1] Nguyên tử & Nguyên tố hóa học', desc:'Cấu tạo nguyên tử, điện tử, proton, neutron. Khái niệm nguyên tố hóa học, ký hiệu, nguyên tử khối. Bảng tuần hoàn cơ bản.', subjectId:HOA, topicIds:[hoaTopics.nt], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'hoa7-ch02-phan-tu', title:'[Hóa 7 - Chủ đề 2] Phân tử, Đơn chất & Hợp chất', desc:'Khái niệm phân tử, phân tử khối. Phân biệt đơn chất và hợp chất. Công thức phân tử và ý nghĩa.', subjectId:HOA, topicIds:[hoaTopics.pt], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'hoa7-ch03-hoa-tri', title:'[Hóa 7 - Chủ đề 3] Hóa trị & Công thức hóa học', desc:'Quy tắc hóa trị, cách lập công thức hóa học. Luyện tập tính hóa trị và viết CTHH của các hợp chất.', subjectId:HOA, topicIds:[hoaTopics.ht], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'hoa7-ch04-phan-ung', title:'[Hóa 7 - Chủ đề 4] Phản ứng hóa học', desc:'Hiện tượng vật lý và hóa học. Dấu hiệu nhận biết phản ứng hóa học. Phương trình hóa học, bảo toàn khối lượng.', subjectId:HOA, topicIds:[hoaTopics.pr], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'hoa7-ch05-acid-base', title:'[Hóa 7 - Chủ đề 5] Acid, Base & pH', desc:'Khái niệm acid, base, chất chỉ thị màu. Thang pH, phân loại dung dịch acid/base/trung tính. Ứng dụng thực tế.', subjectId:HOA, topicIds:[hoaTopics.ab], count:15, duration:20, diff:'EASY' });
  await mkExam({ id:'hoa7-hk1-easy', title:'[Hóa 7] Ôn tập Học kỳ 1 - Cơ bản (CĐ 1-3)', desc:'Ôn tập nguyên tử, phân tử, hóa trị. Nắm chắc kiến thức nền tảng trước kỳ thi HK1.', subjectId:HOA, topicIds:[hoaTopics.nt, hoaTopics.pt, hoaTopics.ht], count:25, duration:30, diff:'EASY' });
  await mkExam({ id:'hoa7-hk2-easy', title:'[Hóa 7] Ôn tập Học kỳ 2 - Cơ bản (CĐ 4-5)', desc:'Ôn tập phản ứng hóa học, acid-base. Nắm chắc kiến thức nửa sau chương trình Hóa 7.', subjectId:HOA, topicIds:[hoaTopics.pr, hoaTopics.ab], count:25, duration:30, diff:'EASY' });
  await mkExam({ id:'hoa7-mock-01', title:'[Hóa 7] Đề kiểm tra 45 phút - Số 1', desc:'Đề kiểm tra 45 phút bám sát chương trình Hóa 7. Tổng hợp tất cả chủ đề, mức độ trung bình.', subjectId:HOA, topicIds:[hoaTopics.nt,hoaTopics.pt,hoaTopics.ht,hoaTopics.pr,hoaTopics.ab], count:30, duration:45, diff:'MEDIUM' });
  await mkExam({ id:'hoa7-tong-hop', title:'[Hóa 7] Đề thi cuối năm - Tổng hợp', desc:'Đề thi tổng hợp toàn bộ chương trình Hóa 7. Bao phủ đầy đủ 5 chủ đề, chuẩn bị tốt cho kỳ thi.', subjectId:HOA, topicIds:null, count:35, duration:45, diff:'MEDIUM' });

  // ============================================================
  // VẬT LÝ (100 câu, 3 topics: quang 20, âm 15, điện 65)
  // ============================================================
  console.log('\n⚡ VẬT LÝ LỚP 7');
  const LY = 'sub-ly';
  const lyTopics = { quang:'ly7-quang', am:'ly7-am', dien:'ly7-dien' };
  await mkExam({ id:'ly7-quang-01', title:'[Lý 7 - Chương 1] Quang học', desc:'Ánh sáng truyền thẳng, phản xạ ánh sáng, gương phẳng, gương cầu. Ảnh của vật qua gương. Bài tập vẽ tia sáng.', subjectId:LY, topicIds:[lyTopics.quang], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'ly7-am-01', title:'[Lý 7 - Chương 2] Âm học', desc:'Nguồn âm, đặc điểm âm thanh: tần số, biên độ, độ to, độ cao. Môi trường truyền âm, tiếng vang, ô nhiễm tiếng ồn.', subjectId:LY, topicIds:[lyTopics.am], count:15, duration:20, diff:'EASY' });
  await mkExam({ id:'ly7-dien-co-ban', title:'[Lý 7 - Chương 3A] Điện học cơ bản', desc:'Sự nhiễm điện, điện tích, tương tác điện. Dòng điện, chiều dòng điện, nguồn điện. An toàn điện trong cuộc sống.', subjectId:LY, topicIds:[lyTopics.dien], count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'ly7-dien-nang-cao', title:'[Lý 7 - Chương 3B] Điện học nâng cao', desc:'Mạch điện, sơ đồ mạch điện, đo cường độ và hiệu điện thế. Định luật Ohm, mạch nối tiếp, mạch song song.', subjectId:LY, topicIds:[lyTopics.dien], count:20, duration:25, diff:'MEDIUM' });
  await mkExam({ id:'ly7-hk1-on', title:'[Lý 7] Ôn tập Học kỳ 1 (Quang & Âm)', desc:'Ôn tập hai chương Quang học và Âm học. Tổng hợp lý thuyết và bài tập dạng trắc nghiệm.', subjectId:LY, topicIds:[lyTopics.quang, lyTopics.am], count:25, duration:30, diff:'EASY' });
  await mkExam({ id:'ly7-hk2-on', title:'[Lý 7] Ôn tập Học kỳ 2 (Điện học)', desc:'Ôn toàn bộ chương Điện học. Lý thuyết và bài tập tính toán mạch điện, định luật Ohm.', subjectId:LY, topicIds:[lyTopics.dien], count:25, duration:30, diff:'MEDIUM' });
  await mkExam({ id:'ly7-mock-01', title:'[Lý 7] Đề kiểm tra 45 phút - Số 1', desc:'Đề kiểm tra 45 phút chuẩn bị kỳ thi. Bao gồm quang học, âm học, điện học cơ bản.', subjectId:LY, topicIds:[lyTopics.quang, lyTopics.am, lyTopics.dien], count:30, duration:45, diff:'MEDIUM' });
  await mkExam({ id:'ly7-tong-hop', title:'[Lý 7] Đề thi cuối năm - Tổng hợp', desc:'Đề thi tổng hợp toàn bộ chương trình Vật Lý 7. Bao phủ 3 chương, chuẩn bị tốt cho kỳ thi.', subjectId:LY, topicIds:null, count:35, duration:45, diff:'MEDIUM' });

  // ============================================================
  // KHOA HỌC TỰ NHIÊN - KHTN (100 câu)
  // ============================================================
  console.log('\n🔬 KHOA HỌC TỰ NHIÊN LỚP 7');
  const KHTN = 'sub-khtn';
  await mkExam({ id:'khtn7-ch1-easy', title:'[KHTN 7] Chủ đề 1 - Nguyên tử, nguyên tố, phân tử', desc:'Cấu tạo nguyên tử, nguyên tố hóa học, phân tử. Liên kết hóa học. Kiến thức Hóa học trong KHTN lớp 7.', subjectId:KHTN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'khtn7-ch2-easy', title:'[KHTN 7] Chủ đề 2 - Tốc độ & Lực', desc:'Tốc độ, chuyển động. Các loại lực: lực ma sát, lực hấp dẫn, áp suất. Kiến thức Vật lý trong KHTN 7.', subjectId:KHTN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'khtn7-ch3-easy', title:'[KHTN 7] Chủ đề 3 - Sinh học tế bào & Sinh vật', desc:'Tế bào - đơn vị cơ bản của sự sống. Phân loại sinh vật, đặc điểm các giới sinh vật. Kiến thức Sinh học trong KHTN 7.', subjectId:KHTN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'khtn7-hk1-on', title:'[KHTN 7] Ôn tập Học kỳ 1', desc:'Tổng ôn các chủ đề HK1: nguyên tử-phân tử, tốc độ, sinh vật. Phù hợp chuẩn bị thi HK1.', subjectId:KHTN, topicIds:null, count:25, duration:35, diff:'EASY' });
  await mkExam({ id:'khtn7-hk2-on', title:'[KHTN 7] Ôn tập Học kỳ 2', desc:'Tổng ôn các chủ đề HK2. Tổng hợp kiến thức Hóa, Lý, Sinh trong chương trình KHTN lớp 7.', subjectId:KHTN, topicIds:null, count:25, duration:35, diff:'MEDIUM' });
  await mkExam({ id:'khtn7-mock-01', title:'[KHTN 7] Đề kiểm tra 45 phút - Số 1', desc:'Đề kiểm tra 45 phút tổng hợp, mức trung bình. Bám sát cấu trúc đề thi KHTN thực tế.', subjectId:KHTN, topicIds:null, count:30, duration:45, diff:'MEDIUM' });
  await mkExam({ id:'khtn7-mock-02', title:'[KHTN 7] Đề kiểm tra 45 phút - Số 2', desc:'Đề kiểm tra 45 phút bộ 2. Câu hỏi tổng hợp đa dạng, phù hợp ôn luyện trước kỳ thi.', subjectId:KHTN, topicIds:null, count:30, duration:45, diff:'MEDIUM' });

  // ============================================================
  // LỊCH SỬ & ĐỊA LÍ (61 câu)
  // ============================================================
  console.log('\n🗺️  LỊCH SỬ & ĐỊA LÍ LỚP 7');
  const SD = 'sub-lichsu-dialy';
  await mkExam({ id:'sd7-ls-hk1', title:'[Sử-Địa 7] Lịch sử - Trung đại thế giới', desc:'Lịch sử thế giới trung đại: chế độ phong kiến châu Âu, châu Á. Các cuộc phát kiến địa lý. Phong trào Phục hưng.', subjectId:SD, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'sd7-ls-hk2', title:'[Sử-Địa 7] Lịch sử - Việt Nam thời trung đại', desc:'Lịch sử Việt Nam thời phong kiến: các triều đại Lý, Trần, Lê. Kháng chiến chống ngoại xâm. Văn hóa dân tộc.', subjectId:SD, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'sd7-dia-01', title:'[Sử-Địa 7] Địa lí - Châu Âu & Châu Mỹ', desc:'Vị trí địa lý, địa hình, khí hậu, dân cư và kinh tế châu Âu, châu Mỹ. Bản đồ và biểu đồ.', subjectId:SD, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'sd7-on-tap-01', title:'[Sử-Địa 7] Ôn tập tổng hợp cuối năm', desc:'Đề ôn tập tổng hợp Sử-Địa lớp 7. Bao gồm lịch sử Việt Nam, lịch sử thế giới và địa lý.', subjectId:SD, topicIds:null, count:30, duration:40, diff:'MEDIUM' });

  // ============================================================
  // TIN HỌC & CÔNG NGHỆ (49 câu)
  // ============================================================
  console.log('\n💻 TIN HỌC & CÔNG NGHỆ LỚP 7');
  const TIN = 'sub-tinhoc';
  await mkExam({ id:'tin7-co-ban-01', title:'[Tin học 7] Máy tính và Internet cơ bản', desc:'Cấu trúc máy tính, phần cứng/mềm, hệ điều hành. Sử dụng Internet, tìm kiếm thông tin, an toàn mạng.', subjectId:TIN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'tin7-excel-01', title:'[Tin học 7] Bảng tính điện tử - Excel', desc:'Khái niệm bảng tính, hàng, cột, ô. Nhập liệu, định dạng, hàm cơ bản: SUM, AVERAGE, MAX, MIN. Biểu đồ.', subjectId:TIN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'tin7-tong-hop', title:'[Tin học 7] Kiểm tra tổng hợp cuối năm', desc:'Đề kiểm tra tổng hợp Tin học 7. Bao gồm lý thuyết máy tính, Internet, bảng tính và lập trình cơ bản.', subjectId:TIN, topicIds:null, count:30, duration:40, diff:'MEDIUM' });

  // ============================================================
  // GIÁO DỤC CÔNG DÂN - GDCD (49 câu)
  // ============================================================
  console.log('\n⚖️  GDCD LỚP 7');
  const GDCD = 'sub-gdcd';
  await mkExam({ id:'gdcd7-bai1-5', title:'[GDCD 7] Bài 1-5 - Đức tính và lối sống', desc:'Tự trọng, trung thực, tự lập, yêu thương con người, tôn sư trọng đạo. Bài học đạo đức và lối sống lớp 7.', subjectId:GDCD, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'gdcd7-bai6-10', title:'[GDCD 7] Bài 6-10 - Pháp luật và cuộc sống', desc:'Quyền và nghĩa vụ công dân. Bảo vệ tài sản, quyền trẻ em, phòng chống tệ nạn xã hội.', subjectId:GDCD, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'gdcd7-tong-hop', title:'[GDCD 7] Kiểm tra tổng hợp cuối năm', desc:'Đề kiểm tra tổng hợp GDCD lớp 7. Bao gồm đạo đức, pháp luật, kỹ năng sống và quyền công dân.', subjectId:GDCD, topicIds:null, count:30, duration:40, diff:'MEDIUM' });

  // ============================================================
  // ÂM NHẠC (40 câu)
  // ============================================================
  console.log('\n🎵 ÂM NHẠC LỚP 7');
  const AM = 'sub-amnhac';
  await mkExam({ id:'amnhac7-ly-thuyet', title:'[Âm nhạc 7] Lý thuyết âm nhạc cơ bản', desc:'Kí hiệu âm nhạc, nốt nhạc, nhịp, phách, gam. Các thể loại âm nhạc. Nhạc cụ dân tộc Việt Nam.', subjectId:AM, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'amnhac7-van-hoa', title:'[Âm nhạc 7] Âm nhạc & Văn hóa dân tộc', desc:'Âm nhạc truyền thống Việt Nam và thế giới. Nhạc sĩ nổi tiếng. Các bài hát trong chương trình lớp 7.', subjectId:AM, topicIds:null, count:20, duration:25, diff:'EASY' });

  // ============================================================
  // MĨ THUẬT (40 câu)
  // ============================================================
  console.log('\n🎨 MĨ THUẬT LỚP 7');
  const MT = 'sub-mythuat';
  await mkExam({ id:'mythuat7-co-so', title:'[Mĩ thuật 7] Cơ sở Mĩ thuật - Màu sắc & Hình khối', desc:'Màu sắc trong hội họa, vòng tròn màu sắc. Hình khối, tỉ lệ, bố cục trong tranh. Các yếu tố ngôn ngữ tạo hình.', subjectId:MT, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'mythuat7-lich-su', title:'[Mĩ thuật 7] Lịch sử Mĩ thuật & Thực hành', desc:'Mĩ thuật Việt Nam và thế giới. Các trường phái hội họa. Tác phẩm và nghệ sĩ tiêu biểu. Thực hành sáng tạo.', subjectId:MT, topicIds:null, count:20, duration:25, diff:'EASY' });

  // ============================================================
  // GDTC - Giáo dục thể chất (40 câu)
  // ============================================================
  console.log('\n🏃 GDTC LỚP 7');
  const GDTC = 'sub-gdtc';
  await mkExam({ id:'gdtc7-luat-thi-dau', title:'[GDTC 7] Luật thi đấu & Kỹ thuật thể thao', desc:'Luật bóng đá, bóng chuyền, cầu lông, bơi lội. Kỹ thuật cơ bản các môn thể thao. An toàn trong luyện tập.', subjectId:GDTC, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'gdtc7-suc-khoe', title:'[GDTC 7] Sức khỏe, Dinh dưỡng & Vệ sinh', desc:'Chế độ dinh dưỡng cho học sinh. Vệ sinh cá nhân và phòng bệnh. Tác dụng của tập thể dục đối với sức khỏe.', subjectId:GDTC, topicIds:null, count:20, duration:25, diff:'EASY' });

  // ============================================================
  // CÔNG NGHỆ (40 câu)
  // ============================================================
  console.log('\n🔧 CÔNG NGHỆ LỚP 7');
  const CN = 'sub-congnghee';
  await mkExam({ id:'cn7-tron-trot', title:'[Công nghệ 7] Trồng trọt & Chăn nuôi', desc:'Kỹ thuật trồng trọt: chọn giống, làm đất, bón phân, phòng trừ sâu bệnh. Chăn nuôi gia súc gia cầm cơ bản.', subjectId:CN, topicIds:null, count:20, duration:25, diff:'EASY' });
  await mkExam({ id:'cn7-lam-nghiep', title:'[Công nghệ 7] Lâm nghiệp & Thủy sản', desc:'Kỹ thuật trồng rừng, khai thác lâm sản. Nuôi trồng thủy sản: các loại cá, tôm phổ biến ở Việt Nam.', subjectId:CN, topicIds:null, count:20, duration:25, diff:'EASY' });

  // ============================================================
  // TÓM TẮT
  // ============================================================
  const total = await p.exam.count({ where: { gradeId: 'grade-7' } });
  const bySubject = await p.exam.groupBy({ by:['subjectId'], where:{gradeId:'grade-7'}, _count:{id:true} });
  const subNames = await p.subject.findMany({ select:{id:true,name:true} });
  const nameMap = {}; subNames.forEach(s => nameMap[s.id] = s.name);
  console.log('\n📊 TỔNG KẾT ĐỀ THI LỚP 7:');
  bySubject.forEach(b => console.log(`  ${nameMap[b.subjectId] || b.subjectId}: ${b._count.id} đề`));
  console.log(`\n🎉 Tổng cộng: ${total} đề thi lớp 7`);
}

main().catch(console.error).finally(() => p.$disconnect());
