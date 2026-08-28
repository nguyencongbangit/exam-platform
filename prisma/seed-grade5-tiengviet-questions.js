const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: data.subjectId,
      gradeId: 'grade-5',
      topicId: data.topicId,
      difficulty: data.d,
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: data.exp || `Đáp án: ${data.ans}`,
      options: {
        create: data.opts.map((text, i) => ({
          optionKey: KEYS[i],
          content: text,
          isCorrect: i === ci,
          sortOrder: i,
        })),
      },
    },
  });
}

async function main() {
  console.log('Tạo câu hỏi Tiếng Việt lớp 5...');

  // ── T1: Đọc hiểu văn bản – 20 câu (8 EASY / 8 MEDIUM / 4 HARD) ──
  const T1 = 'cmt5s5ay0000197l0xi8ey4wg';

  // EASY ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Phần nào của bài văn nêu nội dung chính của đoạn văn?',
    opts: ['Câu chủ đề', 'Câu kết', 'Câu dẫn', 'Câu hỏi'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Bài văn kể chuyện thường có mấy phần?',
    opts: ['Ba phần: mở bài, thân bài, kết bài', 'Hai phần: mở bài và kết bài', 'Một phần duy nhất', 'Bốn phần'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Đọc hiểu văn bản là kĩ năng giúp học sinh làm gì?',
    opts: ['Hiểu nội dung và ý nghĩa của bài đọc', 'Chép lại bài đọc cho chính xác', 'Học thuộc lòng bài đọc', 'Dịch bài đọc sang tiếng nước ngoài'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Khi đọc thầm một đoạn văn, em cần chú ý điều gì trước tiên?',
    opts: ['Nắm ý chính của đoạn văn', 'Đọc thật nhanh để tiết kiệm thời gian', 'Đếm số câu trong đoạn văn', 'Ghi nhớ từng từ trong đoạn văn'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Nhân vật chính trong câu chuyện là gì?',
    opts: ['Nhân vật xuất hiện nhiều nhất và đóng vai trò trung tâm', 'Nhân vật xuất hiện đầu tiên trong câu chuyện', 'Nhân vật phản diện trong câu chuyện', 'Nhân vật cuối cùng trong câu chuyện'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Bài thơ khác bài văn xuôi ở điểm nào?',
    opts: ['Có vần điệu và nhịp điệu', 'Dài hơn bài văn xuôi', 'Không có nhân vật', 'Không có nội dung'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Trong bài văn tả cảnh, tác giả thường sử dụng biện pháp nghệ thuật nào nhiều nhất?',
    opts: ['So sánh và nhân hóa', 'Liệt kê và định nghĩa', 'Phân tích và tổng hợp', 'Giải thích và chứng minh'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'EASY',
    q: 'Câu hỏi "Ai? Cái gì? Con gì?" dùng để hỏi về thành phần nào của câu?',
    opts: ['Chủ ngữ', 'Vị ngữ', 'Trạng ngữ', 'Bổ ngữ'], ans: 'A' });

  // MEDIUM ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Đọc đoạn văn: "Mùa xuân đến, hoa đào nở rộ khắp nơi. Tiếng chim hót vang lừng. Trẻ em nô đùa vui vẻ." Đoạn văn trên miêu tả cảnh gì?',
    opts: ['Cảnh mùa xuân tươi đẹp', 'Cảnh mùa hè nóng bức', 'Cảnh mùa thu se lạnh', 'Cảnh mùa đông giá rét'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Trong câu chuyện "Sự tích hồ Gươm", hồ Gươm gắn với sự kiện lịch sử nào?',
    opts: ['Lê Lợi trả gươm thần cho rùa vàng', 'Lý Thái Tổ dời đô về Thăng Long', 'Trần Hưng Đạo đánh quân Nguyên', 'Nguyễn Huệ đại phá quân Thanh'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Phép nhân hóa trong câu "Ông mặt trời thức dậy sớm" có tác dụng gì?',
    opts: ['Làm cho sự vật trở nên sinh động, gần gũi', 'Làm cho câu văn ngắn gọn hơn', 'Nhấn mạnh thời gian buổi sáng', 'Thể hiện sự ngưỡng mộ mặt trời'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Câu "Mưa rơi tí tách, lộp bộp trên mái tôn." sử dụng biện pháp nghệ thuật gì?',
    opts: ['Từ tượng thanh', 'So sánh', 'Nhân hóa', 'Điệp từ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Trong bài "Những người bạn tốt", điều gì thể hiện tình bạn chân thành?',
    opts: ['Giúp đỡ nhau khi gặp khó khăn', 'Chỉ chơi cùng nhau khi vui', 'Khen ngợi nhau mọi lúc mọi nơi', 'Tặng quà cho nhau vào các dịp lễ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Đoạn văn có câu chủ đề ở đầu đoạn được gọi là đoạn văn có cấu trúc gì?',
    opts: ['Diễn dịch', 'Quy nạp', 'Móc xích', 'Song hành'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Từ "xanh lơ" trong câu "Bầu trời xanh lơ sau cơn mưa" có nghĩa là gì?',
    opts: ['Màu xanh nhạt của bầu trời', 'Màu xanh đậm của nước biển', 'Màu xanh tươi của lá cây', 'Màu xanh sẫm của núi rừng'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'MEDIUM',
    q: 'Ý chính của đoạn văn thường được thể hiện ở đâu?',
    opts: ['Câu chủ đề (có thể ở đầu hoặc cuối đoạn)', 'Câu đầu tiên của đoạn văn', 'Câu dài nhất trong đoạn văn', 'Câu cuối cùng của đoạn văn'], ans: 'A' });

  // HARD ×4
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'HARD',
    q: 'Đọc đoạn thơ: "Quê hương là chùm khế ngọt / Cho con trèo hái mỗi ngày / Quê hương là đường đi học / Con về rợp bướm vàng bay." Tác giả sử dụng biện pháp tu từ gì chủ yếu trong đoạn thơ này?',
    opts: ['So sánh', 'Nhân hóa', 'Điệp ngữ', 'Ẩn dụ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'HARD',
    q: 'Trong bài văn tường thuật, trình tự sắp xếp các sự việc thường theo thứ tự nào?',
    opts: ['Trình tự thời gian (từ trước đến sau)', 'Trình tự không gian (từ xa đến gần)', 'Trình tự tầm quan trọng (từ nhỏ đến lớn)', 'Tùy theo cảm xúc của tác giả'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'HARD',
    q: 'Khi phân tích nhân vật trong truyện, học sinh cần dựa vào những yếu tố nào?',
    opts: ['Lời nói, hành động, suy nghĩ và mối quan hệ của nhân vật', 'Chỉ cần dựa vào tên của nhân vật', 'Dựa vào số lần nhân vật xuất hiện trong truyện', 'Dựa vào độ dài phần miêu tả nhân vật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T1, d: 'HARD',
    q: 'Câu "Tiếng suối trong như tiếng hát xa" (Hồ Chí Minh) sử dụng nghệ thuật gì và tác dụng ra sao?',
    opts: ['So sánh – làm cho âm thanh thiên nhiên trở nên gần gũi, sinh động', 'Nhân hóa – làm cho con suối có hồn người', 'Điệp từ – nhấn mạnh âm thanh của suối', 'Ẩn dụ – gợi lên hình ảnh người hát'], ans: 'A' });

  // ── T2: Luyện từ và câu – 20 câu (8 EASY / 8 MEDIUM / 4 HARD) ──
  const T2 = 'cmt5s5aya000397l0pb6438td';

  // EASY ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Từ nào sau đây là danh từ?',
    opts: ['Bàn', 'Chạy', 'Đẹp', 'Nhanh'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Từ "xinh xắn" thuộc loại từ nào?',
    opts: ['Từ láy', 'Từ ghép', 'Từ đơn', 'Thành ngữ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Câu nào sau đây là câu hỏi?',
    opts: ['Em học ở trường nào?', 'Em đi học đúng giờ.', 'Hãy học bài đi!', 'Trời ơi, đẹp quá!'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Từ "chạy" trong câu "Bé chạy nhanh" thuộc từ loại nào?',
    opts: ['Động từ', 'Danh từ', 'Tính từ', 'Đại từ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Trong câu "Hoa hồng rất đẹp", từ "đẹp" thuộc từ loại gì?',
    opts: ['Tính từ', 'Động từ', 'Danh từ', 'Số từ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Cặp từ trái nghĩa là gì?',
    opts: ['Hai từ có nghĩa đối lập nhau', 'Hai từ có nghĩa giống nhau', 'Hai từ viết giống nhau', 'Hai từ đọc giống nhau'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Câu "Mặt trời mọc ở đằng đông" có chủ ngữ là gì?',
    opts: ['Mặt trời', 'Mọc', 'Ở đằng đông', 'Đằng đông'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'EASY',
    q: 'Từ đồng nghĩa với "vui vẻ" là từ nào?',
    opts: ['Hớn hở', 'Buồn bã', 'Lo lắng', 'Sợ hãi'], ans: 'A' });

  // MEDIUM ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Trong câu "Những chú chim sơn ca hót véo von trên cành cây", bộ phận vị ngữ là gì?',
    opts: ['Hót véo von trên cành cây', 'Những chú chim sơn ca', 'Trên cành cây', 'Véo von'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Câu ghép là câu như thế nào?',
    opts: ['Câu có hai cụm chủ vị trở lên, không bao chứa nhau', 'Câu chỉ có một cụm chủ vị', 'Câu có nhiều tính từ', 'Câu rất dài và phức tạp'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Từ "đất nước" là từ ghép thuộc loại nào?',
    opts: ['Từ ghép tổng hợp', 'Từ ghép phân loại', 'Từ láy toàn bộ', 'Từ láy bộ phận'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Điền từ thích hợp vào chỗ trống: "Chúng ta phải biết ... ơn những người đã giúp đỡ mình."',
    opts: ['Biết ơn / ghi nhớ công ơn', 'Quên đi công ơn', 'Trả thù', 'Chê bai'], ans: 'A',
    exp: 'Đáp án: A. "Biết ơn" là thái độ đúng đắn với người đã giúp mình.' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Trong câu "Vì trời mưa to nên chúng tôi không đi chơi được", quan hệ giữa hai vế câu là gì?',
    opts: ['Quan hệ nguyên nhân – kết quả', 'Quan hệ tương phản', 'Quan hệ điều kiện – kết quả', 'Quan hệ tăng tiến'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Thành ngữ "Uống nước nhớ nguồn" có nghĩa là gì?',
    opts: ['Phải biết ơn những người đã tạo ra thành quả cho mình hưởng', 'Khi uống nước phải nhớ đến dòng suối nguồn', 'Phải tiết kiệm nước sạch', 'Nhớ lại kỉ niệm về quê hương'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Từ nào sau đây là từ láy?',
    opts: ['Lung linh', 'Xe cộ', 'Nhà cửa', 'Học hành'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'MEDIUM',
    q: 'Câu "Dù khó khăn đến đâu, em cũng cố gắng học tập tốt" thuộc kiểu câu ghép có quan hệ gì?',
    opts: ['Quan hệ nhượng bộ – tăng tiến', 'Quan hệ nguyên nhân – kết quả', 'Quan hệ tương phản', 'Quan hệ điều kiện'], ans: 'A' });

  // HARD ×4
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'HARD',
    q: 'Phân tích cấu trúc ngữ pháp câu: "Trên bầu trời xanh thẳm, những đám mây trắng bồng bềnh trôi qua." Xác định trạng ngữ, chủ ngữ, vị ngữ.',
    opts: ['Trạng ngữ: Trên bầu trời xanh thẳm; Chủ ngữ: những đám mây trắng; Vị ngữ: bồng bềnh trôi qua', 'Chủ ngữ: Trên bầu trời xanh thẳm; Vị ngữ: những đám mây trắng bồng bềnh trôi qua', 'Trạng ngữ: những đám mây trắng; Vị ngữ: bồng bềnh trôi qua', 'Chủ ngữ: bầu trời; Vị ngữ: xanh thẳm, bồng bềnh trôi qua'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'HARD',
    q: 'Từ "xuân" trong câu nào được dùng với nghĩa chuyển (nghĩa bóng)?',
    opts: ['"Ngày xuân con én đưa thoi" – xuân chỉ tuổi trẻ', '"Mùa xuân đến rồi" – xuân chỉ mùa', '"Hoa xuân nở rộ" – xuân chỉ mùa xuân', '"Tiết xuân ấm áp" – xuân chỉ thời tiết'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'HARD',
    q: 'Câu nào sau đây mắc lỗi về quan hệ từ?',
    opts: ['"Vì học giỏi nhưng bạn ấy được khen."', '"Vì học giỏi nên bạn ấy được khen."', '"Tuy học giỏi nhưng bạn ấy rất khiêm tốn."', '"Nếu chăm học thì em sẽ tiến bộ."'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T2, d: 'HARD',
    q: 'Trong tiếng Việt, từ nhiều nghĩa khác từ đồng âm ở điểm nào?',
    opts: ['Từ nhiều nghĩa có các nghĩa có liên quan nhau, còn từ đồng âm thì không', 'Từ nhiều nghĩa viết khác nhau, từ đồng âm viết giống nhau', 'Từ nhiều nghĩa chỉ có hai nghĩa, từ đồng âm có nhiều nghĩa', 'Hai loại này giống nhau hoàn toàn'], ans: 'A' });

  // ── T3: Chính tả – 20 câu (8 EASY / 8 MEDIUM / 4 HARD) ──
  const T3 = 'cmt5s5ayg000597l03gl2nxvd';

  // EASY ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Chọn từ viết đúng chính tả:',
    opts: ['giải thích', 'dải thích', 'rải thích', 'zải thích'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Từ nào viết đúng dấu thanh?',
    opts: ['nỗi buồn', 'nổi buồn', 'nõi buồn', 'nởi buồn'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Chọn từ viết đúng chính tả:',
    opts: ['trong sáng', 'chong sáng', 'trông sáng', 'trong xáng'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Từ nào sau đây viết đúng chính tả?',
    opts: ['kính trọng', 'kính chọng', 'kín trọng', 'kin trọng'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Chọn cách viết đúng cho âm đầu của từ chỉ con vật sống dưới nước, có vảy:',
    opts: ['cá', 'ca', 'gá', 'ká'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Điền chữ "s" hay "x" vào chỗ trống: "...ung sướng"?',
    opts: ['sung sướng', 'xung sướng', 'sung xướng', 'xung xướng'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Từ nào sau đây viết đúng chính tả?',
    opts: ['trường học', 'chường học', 'trường hok', 'trường hộc'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'EASY',
    q: 'Điền vần đúng: "b...t" để được từ chỉ hành động dừng lại?',
    opts: ['bắt (dừng) → "dừng" – điền: ừng', 'beng', 'bong', 'bing'],
    ans: 'A',
    exp: 'Đáp án: A. Từ "dừng" viết đúng với vần "ừng".' });

  // MEDIUM ×8
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Câu nào sau đây viết đúng chính tả hoàn toàn?',
    opts: ['Chúng tôi đi tham quan viện bảo tàng lịch sử.', 'Chúng tôi đi thăm quan viện bảo tàng lịch sử.', 'Chúng tôi đi tham quan viện bão tàng lịch sử.', 'Chúng tôi đi tham quan viện bảo tàn lịch sử.'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Chọn từ điền vào chỗ trống: "Bầu trời ... mây xám xịt, báo hiệu cơn mưa sắp đến."',
    opts: ['đầy', 'đây', 'đấy', 'đẩy'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Từ nào sau đây viết SAI chính tả?',
    opts: ['sương mù → sươn mù', 'trăng tròn', 'cánh đồng', 'mái trường'], ans: 'A',
    exp: 'Đáp án: A. "Sương mù" mới đúng, không phải "sươn mù".' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Điền "d", "gi" hay "r" vào chỗ trống: "Con ...ế đang kêu ngoài đồng."',
    opts: ['dế', 'giế', 'rế', 'đế'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Câu nào dưới đây viết đúng chính tả?',
    opts: ['Bạn Nam học rất chăm chỉ và thông minh.', 'Bạn Nam học rất chăm chỉ và thôn minh.', 'Bạn Nam học rất chăm chĩ và thông minh.', 'Bạn Nam hoc rất chăm chỉ và thông minh.'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Điền âm cuối đúng: "du lịch" hay "du lịt"?',
    opts: ['du lịch', 'du lịt', 'du lich', 'dụ lịch'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Chọn từ viết đúng chính tả trong nhóm từ sau:',
    opts: ['thắc mắc', 'thắt mắt', 'thắc mắt', 'thắt mắc'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'MEDIUM',
    q: 'Câu "Các bạn học sinh tích ... tham gia hoạt động thể dục thể thao." – Điền từ thích hợp:',
    opts: ['cực', 'cựt', 'cục', 'cức'], ans: 'A' });

  // HARD ×4
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'HARD',
    q: 'Phát hiện lỗi chính tả trong đoạn văn: "Buổi sáng, ánh nắng chiếu xuyên qua khung cửa sổ, rọi lên những hạt bụi li ti đang bay lơ lửng chong không khí." Từ nào viết sai?',
    opts: ['chong → trong', 'xuyên → suyên', 'lơ lửng → lơ lửn', 'li ti → ly ty'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'HARD',
    q: 'Quy tắc viết hoa nào sau đây là ĐÚNG trong tiếng Việt?',
    opts: ['Viết hoa chữ cái đầu tên riêng của người, địa danh, tổ chức', 'Viết hoa tất cả danh từ trong câu', 'Viết hoa chữ cái đầu tất cả các từ quan trọng', 'Viết hoa toàn bộ từ chỉ chức vụ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'HARD',
    q: 'Câu nào dưới đây viết đúng chính tả tên riêng và danh từ chung?',
    opts: ['Sông Hồng chảy qua thành phố Hà Nội.', 'Sông hồng chảy qua Thành Phố Hà Nội.', 'sông Hồng chảy qua thành Phố Hà Nội.', 'Sông Hồng chảy qua Thành phố hà nội.'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T3, d: 'HARD',
    q: 'Điền từ thích hợp (chú ý phân biệt "ch" / "tr", "s" / "x"): "Những ... em nhỏ ... trường về trong ... chiều tà."',
    opts: ['trẻ – tan – buổi', 'chẻ – xan – buổi', 'trẻ – san – buổi', 'chẻ – tan – buổi'], ans: 'A' });

  // ── T4: Tập làm văn – 15 câu (6 EASY / 6 MEDIUM / 3 HARD) ──
  const T4 = 'cmt5s5aym000797l0975bl388';

  // EASY ×6
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Đoạn văn tả cảnh thuộc thể loại văn gì?',
    opts: ['Văn miêu tả', 'Văn kể chuyện', 'Văn nghị luận', 'Văn thuyết minh'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Mở bài trong bài văn tả cảnh thường làm gì?',
    opts: ['Giới thiệu cảnh được tả', 'Tả chi tiết từng phần của cảnh', 'Nêu cảm nghĩ về cảnh vật', 'Kể lại lịch sử của cảnh vật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Khi viết đoạn văn tả người, em cần tả những gì?',
    opts: ['Ngoại hình, tính cách, hành động của người đó', 'Chỉ tả tên và tuổi của người đó', 'Chỉ tả quần áo của người đó', 'Kể lại lịch sử cuộc đời người đó'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Bài văn miêu tả thường sử dụng giác quan nào?',
    opts: ['Tất cả các giác quan: nhìn, nghe, ngửi, sờ, nếm', 'Chỉ dùng thị giác (nhìn)', 'Chỉ dùng thính giác (nghe)', 'Chỉ dùng xúc giác (sờ)'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Kết bài trong bài văn tả cảnh thường làm gì?',
    opts: ['Nêu cảm nghĩ hoặc ấn tượng về cảnh được tả', 'Giới thiệu cảnh vật lần đầu', 'Tả chi tiết màu sắc của cảnh vật', 'Liệt kê tên các cảnh vật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'EASY',
    q: 'Thân bài trong bài văn tả cây cối thường tả theo trình tự nào?',
    opts: ['Từ tổng thể đến bộ phận (hoặc từ gốc đến ngọn)', 'Từ nhỏ đến lớn', 'Theo thứ tự bảng chữ cái', 'Theo thứ tự màu sắc'], ans: 'A' });

  // MEDIUM ×6
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Khi viết đoạn văn mở bài gián tiếp cho bài văn tả con vật, em làm gì?',
    opts: ['Dẫn dắt từ một ý khác rồi mới giới thiệu con vật', 'Giới thiệu thẳng tên con vật ngay câu đầu', 'Kể lại câu chuyện về con vật', 'Tả chi tiết ngoại hình con vật ngay'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Biện pháp so sánh trong văn miêu tả có tác dụng gì?',
    opts: ['Làm cho sự vật được miêu tả trở nên sinh động, dễ hình dung hơn', 'Làm cho bài văn dài hơn', 'Làm cho bài văn khó hiểu hơn', 'Chứng minh sự vật đó là có thật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Khi viết bài văn tả cảnh ngôi trường, em nên quan sát theo trình tự nào?',
    opts: ['Từ cổng trường → sân trường → lớp học → vườn trường', 'Từ trong ra ngoài', 'Tùy ý, không cần trình tự', 'Tả từ nhỏ đến lớn'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Bài văn tả người thân cần thể hiện điều gì qua lời văn?',
    opts: ['Tình cảm yêu mến, trân trọng của người viết đối với người được tả', 'Chỉ mô tả khách quan không cần tình cảm', 'So sánh người đó với người khác', 'Kể công lao của người đó'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Để bài văn tả cảnh sinh động, người viết cần làm gì?',
    opts: ['Quan sát kĩ, sử dụng từ ngữ gợi tả và biện pháp tu từ phù hợp', 'Viết thật dài và nhiều chi tiết', 'Chép lại bài văn mẫu trong sách', 'Chỉ cần tả màu sắc của cảnh vật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'MEDIUM',
    q: 'Lập dàn ý cho bài văn là bước làm gì trước khi viết bài?',
    opts: ['Xác định và sắp xếp các ý chính sẽ viết theo trình tự hợp lí', 'Viết nháp toàn bộ bài văn', 'Đọc lại bài văn mẫu', 'Ghi lại tất cả từ vựng sẽ dùng'], ans: 'A' });

  // HARD ×3
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'HARD',
    q: 'Để tả cơn mưa rào mùa hè sinh động, học sinh cần huy động những giác quan nào và tả theo trình tự nào?',
    opts: ['Thị giác, thính giác, xúc giác; tả từ lúc mưa sắp đến → mưa to → tạnh mưa', 'Chỉ dùng thị giác; tả từ lúc mưa tạnh ngược về trước', 'Chỉ dùng thính giác; tả theo vần thơ', 'Không cần trình tự, tả cảm xúc là đủ'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'HARD',
    q: 'Đoạn văn kết bài mở rộng khác đoạn văn kết bài không mở rộng ở điểm nào?',
    opts: ['Kết bài mở rộng nêu thêm suy nghĩ, liên tưởng rộng hơn nội dung bài', 'Kết bài mở rộng dài hơn kết bài không mở rộng', 'Kết bài mở rộng tóm tắt lại toàn bộ nội dung bài', 'Kết bài mở rộng lặp lại câu mở bài'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T4, d: 'HARD',
    q: 'Khi tả hoạt động của một người thợ thủ công đang làm việc, em nên chú ý điều gì nhất?',
    opts: ['Tả các động tác tỉ mỉ, khéo léo kết hợp với thái độ làm việc nghiêm túc', 'Chỉ tả tên nghề và sản phẩm làm ra', 'Tả quần áo của người thợ', 'Kể lịch sử hình thành nghề thủ công đó'], ans: 'A' });

  // ── T5: Kể chuyện – 15 câu (6 EASY / 6 MEDIUM / 3 HARD) ──
  const T5 = 'cmt5s5ays000997l00i28d6qn';

  // EASY ×6
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Truyện "Tấm Cám" thuộc thể loại truyện gì?',
    opts: ['Truyện cổ tích', 'Truyện ngụ ngôn', 'Truyện thần thoại', 'Truyện lịch sử'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Truyện ngụ ngôn thường muốn truyền đạt điều gì?',
    opts: ['Bài học đạo lí qua hình ảnh loài vật hoặc đồ vật', 'Kể về các vị thần trong truyền thuyết', 'Giải thích nguồn gốc các hiện tượng tự nhiên', 'Kể về các anh hùng lịch sử'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Khi kể chuyện, người kể cần chú ý điều gì?',
    opts: ['Kể đúng cốt truyện, diễn đạt rõ ràng, thể hiện cảm xúc', 'Kể thật nhanh để tiết kiệm thời gian', 'Học thuộc lòng từng câu chữ trong truyện', 'Chỉ kể phần đầu câu chuyện'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Nhân vật phản diện trong truyện cổ tích thường có đặc điểm gì?',
    opts: ['Xấu xa, độc ác, hay gây hại cho người khác', 'Hiền lành, tốt bụng', 'Có phép màu giúp đỡ người tốt', 'Thông minh và dũng cảm'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Truyện "Con Rồng cháu Tiên" thuộc thể loại nào?',
    opts: ['Truyền thuyết', 'Cổ tích', 'Ngụ ngôn', 'Truyện đồng thoại'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'EASY',
    q: 'Khi kể lại câu chuyện theo lời nhân vật, người kể đóng vai là ai?',
    opts: ['Người kể chuyện xưng "tôi" nhập vai vào nhân vật', 'Tác giả của câu chuyện', 'Người nghe câu chuyện', 'Người đứng ngoài quan sát'], ans: 'A' });

  // MEDIUM ×6
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Trong truyện "Thạch Sanh", chi tiết cây đàn thần có ý nghĩa gì?',
    opts: ['Tượng trưng cho công lí, sức mạnh cảm hóa cái ác và kêu gọi hòa bình', 'Chỉ là vũ khí chiến đấu thông thường', 'Thể hiện tài năng âm nhạc của Thạch Sanh', 'Là phần thưởng của nhà vua ban tặng'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Bài học rút ra từ câu chuyện "Ếch ngồi đáy giếng" là gì?',
    opts: ['Không nên tự mãn, cần mở rộng hiểu biết, tránh cái nhìn hạn hẹp', 'Ếch nên ở trong giếng để an toàn', 'Con người nên học theo loài ếch', 'Không nên ra ngoài vì sẽ gặp nguy hiểm'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Khi kể chuyện sáng tạo (thay đổi kết thúc câu chuyện), học sinh cần đảm bảo điều gì?',
    opts: ['Phần đầu câu chuyện nhất quán với phần kết mới, vẫn hợp lí và có ý nghĩa', 'Thay đổi toàn bộ câu chuyện', 'Giữ nguyên phần kết, chỉ thay đổi phần đầu', 'Thêm thật nhiều nhân vật mới vào'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Truyện đồng thoại (truyện loài vật) có đặc điểm gì phân biệt với truyện ngụ ngôn?',
    opts: ['Nhân vật vừa có đặc điểm loài vật vừa có suy nghĩ như người, nhưng không nhất thiết phải có bài học', 'Chỉ có nhân vật là con người', 'Luôn kết thúc buồn', 'Không có nhân vật loài vật'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Khi kể chuyện trước lớp, học sinh cần lưu ý điều gì về giọng kể?',
    opts: ['Thay đổi giọng kể phù hợp với tính cách nhân vật và tình tiết câu chuyện', 'Kể thật nhanh và to', 'Kể đều đều không cần thay đổi giọng', 'Chỉ cần kể đủ nội dung là được'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'MEDIUM',
    q: 'Trong truyện cổ tích "Cây tre trăm đốt", nhân vật Khoai được giúp đỡ bởi ai?',
    opts: ['Bụt (tiên ông)', 'Ông vua', 'Người hàng xóm tốt bụng', 'Chính bản thân nhờ sức mạnh'], ans: 'A' });

  // HARD ×3
  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'HARD',
    q: 'So sánh điểm giống và khác nhau giữa truyện cổ tích và truyền thuyết. Phương án nào đúng?',
    opts: ['Giống: đều có yếu tố kì ảo; Khác: cổ tích hư cấu hoàn toàn, truyền thuyết liên quan sự kiện/nhân vật lịch sử', 'Giống: đều kể về người thật việc thật; Khác: cổ tích có phép màu còn truyền thuyết không có', 'Giống: đều là truyện ngắn; Khác: truyền thuyết hay hơn cổ tích', 'Hai thể loại này hoàn toàn giống nhau'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'HARD',
    q: 'Trong câu chuyện "Dế Mèn phiêu lưu kí" (Tô Hoài), nhân vật Dế Mèn học được bài học gì qua những cuộc phiêu lưu?',
    opts: ['Từ kiêu ngạo, hung hăng → trở nên khiêm tốn, biết quan tâm bạn bè và đấu tranh cho lẽ phải', 'Dế Mèn chưa học được bài học gì', 'Dế Mèn học được cách chiến đấu giỏi hơn', 'Dế Mèn trở nên kiêu ngạo hơn sau phiêu lưu'], ans: 'A' });

  await createQ({ subjectId: 'sub-tieng-viet', topicId: T5, d: 'HARD',
    q: 'Tại sao trong truyện cổ tích Việt Nam, người nghèo, người mồ côi thường được hưởng hạnh phúc ở cuối truyện?',
    opts: ['Thể hiện ước mơ công bằng xã hội và niềm tin vào phẩm chất tốt đẹp của nhân dân lao động', 'Vì người giàu luôn sai và người nghèo luôn đúng', 'Vì đó là sự thật lịch sử thời xưa', 'Vì tác giả thích nhân vật nghèo hơn'], ans: 'A' });

  console.log('Hoàn thành! Đã tạo 90 câu hỏi Tiếng Việt lớp 5.');
}

main().catch(console.error).finally(() => p.$disconnect());
