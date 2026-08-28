const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-mythuat';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== 3 MÀU CƠ BẢN =====
  {
    content: 'Ba màu cơ bản (màu gốc) trong hội họa là?',
    difficulty: 'EASY',
    explanation: 'Ba màu cơ bản là đỏ, vàng và xanh lam. Từ ba màu này có thể pha trộn ra các màu khác.',
    options: [
      { key: 'A', content: 'Đỏ, xanh lá, tím', correct: false },
      { key: 'B', content: 'Đỏ, vàng, xanh lam', correct: true },
      { key: 'C', content: 'Đỏ, cam, vàng', correct: false },
      { key: 'D', content: 'Xanh lam, xanh lá, tím', correct: false },
    ],
  },
  {
    content: 'Màu cơ bản là màu như thế nào?',
    difficulty: 'EASY',
    explanation: 'Màu cơ bản là màu không pha trộn từ màu nào khác, nhưng có thể pha với nhau để tạo ra các màu mới.',
    options: [
      { key: 'A', content: 'Màu pha trộn từ hai màu khác', correct: false },
      { key: 'B', content: 'Màu không pha trộn, tự nhiên', correct: true },
      { key: 'C', content: 'Màu tối nhất', correct: false },
      { key: 'D', content: 'Màu sáng nhất', correct: false },
    ],
  },
  // ===== MÀU THỨ CẤP =====
  {
    content: 'Pha màu đỏ và màu vàng sẽ tạo ra màu gì?',
    difficulty: 'EASY',
    explanation: 'Đỏ + Vàng = Cam.',
    options: [
      { key: 'A', content: 'Tím', correct: false },
      { key: 'B', content: 'Xanh lá', correct: false },
      { key: 'C', content: 'Cam', correct: true },
      { key: 'D', content: 'Nâu', correct: false },
    ],
  },
  {
    content: 'Pha màu xanh lam và màu vàng sẽ tạo ra màu gì?',
    difficulty: 'EASY',
    explanation: 'Xanh lam + Vàng = Xanh lá (lục).',
    options: [
      { key: 'A', content: 'Tím', correct: false },
      { key: 'B', content: 'Cam', correct: false },
      { key: 'C', content: 'Xanh lá (lục)', correct: true },
      { key: 'D', content: 'Đen', correct: false },
    ],
  },
  {
    content: 'Pha màu đỏ và màu xanh lam sẽ tạo ra màu gì?',
    difficulty: 'EASY',
    explanation: 'Đỏ + Xanh lam = Tím.',
    options: [
      { key: 'A', content: 'Cam', correct: false },
      { key: 'B', content: 'Xanh lá', correct: false },
      { key: 'C', content: 'Tím', correct: true },
      { key: 'D', content: 'Nâu', correct: false },
    ],
  },
  {
    content: 'Màu cam, xanh lá và tím được gọi là?',
    difficulty: 'MEDIUM',
    explanation: 'Cam, xanh lá, tím là màu thứ cấp (màu nhị cấp) vì được pha trộn từ hai màu cơ bản.',
    options: [
      { key: 'A', content: 'Màu cơ bản', correct: false },
      { key: 'B', content: 'Màu thứ cấp (màu nhị cấp)', correct: true },
      { key: 'C', content: 'Màu trung tính', correct: false },
      { key: 'D', content: 'Màu nóng', correct: false },
    ],
  },
  // ===== MÀU NÓNG / LẠNH =====
  {
    content: 'Màu sắc nào thuộc nhóm màu nóng?',
    difficulty: 'EASY',
    explanation: 'Màu nóng là những màu gợi cảm giác ấm áp, năng động: đỏ, cam, vàng.',
    options: [
      { key: 'A', content: 'Xanh lam, tím, xanh lá', correct: false },
      { key: 'B', content: 'Đỏ, cam, vàng', correct: true },
      { key: 'C', content: 'Trắng, đen, xám', correct: false },
      { key: 'D', content: 'Xanh lam, xanh lá, trắng', correct: false },
    ],
  },
  {
    content: 'Màu sắc nào thuộc nhóm màu lạnh?',
    difficulty: 'EASY',
    explanation: 'Màu lạnh là những màu gợi cảm giác mát mẻ, yên tĩnh: xanh lam, xanh lá, tím.',
    options: [
      { key: 'A', content: 'Đỏ, cam, vàng', correct: false },
      { key: 'B', content: 'Xanh lam, xanh lá, tím', correct: true },
      { key: 'C', content: 'Đỏ, tím, cam', correct: false },
      { key: 'D', content: 'Vàng, cam, xanh lá', correct: false },
    ],
  },
  {
    content: 'Khi vẽ cảnh biển buổi chiều mát mẻ, nên dùng gam màu nào?',
    difficulty: 'MEDIUM',
    explanation: 'Cảnh biển mát mẻ nên dùng gam màu lạnh (xanh lam, xanh lá, tím) để tạo cảm giác trong lành, yên tĩnh.',
    options: [
      { key: 'A', content: 'Gam màu nóng', correct: false },
      { key: 'B', content: 'Gam màu lạnh', correct: true },
      { key: 'C', content: 'Chỉ dùng màu đen trắng', correct: false },
      { key: 'D', content: 'Gam màu nâu đất', correct: false },
    ],
  },
  // ===== ĐƯỜNG NÉT =====
  {
    content: 'Đường nét trong mỹ thuật bao gồm các loại nào?',
    difficulty: 'EASY',
    explanation: 'Đường nét trong mỹ thuật gồm: đường thẳng, đường cong, đường gãy khúc, đường lượn sóng...',
    options: [
      { key: 'A', content: 'Chỉ có đường thẳng', correct: false },
      { key: 'B', content: 'Đường thẳng, cong, gãy khúc, lượn sóng', correct: true },
      { key: 'C', content: 'Chỉ có đường cong', correct: false },
      { key: 'D', content: 'Chỉ có đường lượn', correct: false },
    ],
  },
  {
    content: 'Đường thẳng trong tranh thường tạo cảm giác gì?',
    difficulty: 'MEDIUM',
    explanation: 'Đường thẳng tạo cảm giác vững chắc, cứng nhắc, kiên định, trật tự.',
    options: [
      { key: 'A', content: 'Mềm mại, uyển chuyển', correct: false },
      { key: 'B', content: 'Vững chắc, kiên định, trật tự', correct: true },
      { key: 'C', content: 'Hỗn loạn, bất ổn', correct: false },
      { key: 'D', content: 'Nhẹ nhàng, bay bổng', correct: false },
    ],
  },
  {
    content: 'Đường cong tạo cảm giác gì trong tranh?',
    difficulty: 'MEDIUM',
    explanation: 'Đường cong tạo cảm giác mềm mại, uyển chuyển, nhẹ nhàng, dịu dàng.',
    options: [
      { key: 'A', content: 'Cứng nhắc, mạnh mẽ', correct: false },
      { key: 'B', content: 'Mềm mại, uyển chuyển, dịu dàng', correct: true },
      { key: 'C', content: 'Hỗn loạn, phức tạp', correct: false },
      { key: 'D', content: 'Buồn bã, u ám', correct: false },
    ],
  },
  // ===== HÌNH DẠNG CƠ BẢN =====
  {
    content: 'Ba hình dạng cơ bản trong mỹ thuật là?',
    difficulty: 'EASY',
    explanation: 'Ba hình dạng cơ bản: hình tròn, hình vuông (hoặc chữ nhật), hình tam giác.',
    options: [
      { key: 'A', content: 'Hình thang, hình thoi, hình chữ nhật', correct: false },
      { key: 'B', content: 'Hình tròn, hình vuông, hình tam giác', correct: true },
      { key: 'C', content: 'Hình cầu, hình lập phương, hình nón', correct: false },
      { key: 'D', content: 'Hình ellipse, hình lục giác, hình ngũ giác', correct: false },
    ],
  },
  {
    content: 'Hình tam giác trong tranh thường tạo cảm giác gì?',
    difficulty: 'MEDIUM',
    explanation: 'Hình tam giác có đỉnh nhọn tạo cảm giác năng động, chuyển động, nhọn sắc, hướng lên trên.',
    options: [
      { key: 'A', content: 'Tĩnh lặng, ổn định', correct: false },
      { key: 'B', content: 'Năng động, hướng lên, nhọn sắc', correct: true },
      { key: 'C', content: 'Hoàn hảo, vô tận', correct: false },
      { key: 'D', content: 'Mềm mại, tròn trịa', correct: false },
    ],
  },
  // ===== CHẤT LIỆU HỘI HỌA =====
  {
    content: 'Màu nước (watercolor) có đặc điểm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Màu nước trong suốt, nhẹ nhàng, dễ pha loãng với nước, tạo hiệu ứng mờ ảo, trong trẻo.',
    options: [
      { key: 'A', content: 'Đặc, không trong suốt, khó pha', correct: false },
      { key: 'B', content: 'Trong suốt, nhẹ nhàng, dễ pha với nước', correct: true },
      { key: 'C', content: 'Cần dầu để pha', correct: false },
      { key: 'D', content: 'Chỉ có màu đậm', correct: false },
    ],
  },
  {
    content: 'Bút chì thường dùng để làm gì trong mỹ thuật?',
    difficulty: 'EASY',
    explanation: 'Bút chì dùng để phác thảo (vẽ đường nét ban đầu trước khi tô màu) và vẽ tranh đen trắng.',
    options: [
      { key: 'A', content: 'Chỉ dùng để viết chữ', correct: false },
      { key: 'B', content: 'Phác thảo và vẽ đường nét, tranh đen trắng', correct: true },
      { key: 'C', content: 'Chỉ để tô màu', correct: false },
      { key: 'D', content: 'Không dùng trong mỹ thuật', correct: false },
    ],
  },
  {
    content: 'Màu sáp (crayon) có đặc điểm gì?',
    difficulty: 'EASY',
    explanation: 'Màu sáp làm từ sáp, dễ sử dụng, màu sắc rực rỡ, không cần nước, phù hợp cho trẻ em.',
    options: [
      { key: 'A', content: 'Cần pha với nước mới dùng được', correct: false },
      { key: 'B', content: 'Dễ dùng, rực rỡ, không cần nước, làm từ sáp', correct: true },
      { key: 'C', content: 'Chỉ có màu tối', correct: false },
      { key: 'D', content: 'Cần pha với dầu', correct: false },
    ],
  },
  {
    content: 'Bột màu (tempera/gouache) thường được dùng như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Bột màu pha với nước, có tính phủ (che phủ màu bên dưới), màu sắc tươi sáng, không trong suốt như màu nước.',
    options: [
      { key: 'A', content: 'Pha với dầu thực vật', correct: false },
      { key: 'B', content: 'Pha với nước, có tính phủ, màu không trong suốt', correct: true },
      { key: 'C', content: 'Dùng trực tiếp không cần pha', correct: false },
      { key: 'D', content: 'Chỉ dùng cho tranh khổ lớn', correct: false },
    ],
  },
  // ===== TRANH DÂN GIAN ĐÔNG HỒ =====
  {
    content: 'Tranh Đông Hồ có nguồn gốc từ đâu?',
    difficulty: 'MEDIUM',
    explanation: 'Tranh Đông Hồ xuất phát từ làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh.',
    options: [
      { key: 'A', content: 'Hà Nội', correct: false },
      { key: 'B', content: 'Làng Đông Hồ, Bắc Ninh', correct: true },
      { key: 'C', content: 'Nam Định', correct: false },
      { key: 'D', content: 'Hải Dương', correct: false },
    ],
  },
  {
    content: 'Tranh dân gian Đông Hồ được in bằng phương pháp nào?',
    difficulty: 'HARD',
    explanation: 'Tranh Đông Hồ in bằng khuôn gỗ khắc nổi (mộc bản), in nhiều lần với nhiều màu khác nhau lên giấy điệp.',
    options: [
      { key: 'A', content: 'Vẽ tay từng bức', correct: false },
      { key: 'B', content: 'In bằng khuôn gỗ (mộc bản) trên giấy điệp', correct: true },
      { key: 'C', content: 'In bằng máy in hiện đại', correct: false },
      { key: 'D', content: 'In bằng lụa', correct: false },
    ],
  },
  {
    content: 'Chủ đề phổ biến của tranh Đông Hồ là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Tranh Đông Hồ thường có chủ đề gần gũi với đời sống: gà trống, đám cưới chuột, hứng dừa, lợn đàn... thể hiện ước vọng của người nông dân.',
    options: [
      { key: 'A', content: 'Cảnh thiên nhiên hùng vĩ', correct: false },
      { key: 'B', content: 'Gà trống, đám cưới chuột, cảnh sinh hoạt nông thôn', correct: true },
      { key: 'C', content: 'Chân dung vua chúa', correct: false },
      { key: 'D', content: 'Cảnh chiến trận', correct: false },
    ],
  },
  {
    content: 'Bức tranh "Đám cưới chuột" trong tranh Đông Hồ có nội dung gì?',
    difficulty: 'HARD',
    explanation: '"Đám cưới chuột" miêu tả cảnh đám rước của nhà chuột đi xin lễ vật biếu mèo để được yên ổn, thể hiện sự châm biếm xã hội.',
    options: [
      { key: 'A', content: 'Cảnh chuột nhà hạnh phúc', correct: false },
      { key: 'B', content: 'Chuột rước đám cưới và đem lễ vật biếu mèo - châm biếm xã hội', correct: true },
      { key: 'C', content: 'Chuyện về mèo và chuột chơi đùa', correct: false },
      { key: 'D', content: 'Bữa tiệc của các loài vật', correct: false },
    ],
  },
  // ===== BỐ CỤC TRANH =====
  {
    content: 'Trọng tâm của tranh là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Trọng tâm (focal point) là điểm/khu vực quan trọng nhất trong tranh, thu hút sự chú ý nhất của người xem.',
    options: [
      { key: 'A', content: 'Phần nền của tranh', correct: false },
      { key: 'B', content: 'Điểm/khu vực quan trọng nhất, thu hút nhất của tranh', correct: true },
      { key: 'C', content: 'Màu sắc chủ đạo', correct: false },
      { key: 'D', content: 'Kích thước của tranh', correct: false },
    ],
  },
  {
    content: 'Bố cục tranh cân đối nghĩa là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Bố cục cân đối là cách sắp xếp các hình mảng hài hòa, không lệch về một phía, tạo cảm giác ổn định.',
    options: [
      { key: 'A', content: 'Tất cả vật ở cùng một phía', correct: false },
      { key: 'B', content: 'Sắp xếp hình mảng hài hòa, tạo cảm giác ổn định', correct: true },
      { key: 'C', content: 'Vẽ thật nhiều chi tiết', correct: false },
      { key: 'D', content: 'Để trống nhiều chỗ', correct: false },
    ],
  },
  {
    content: 'Khi vẽ tranh, cần đặt hình chính (chủ đề chính) ở đâu?',
    difficulty: 'MEDIUM',
    explanation: 'Hình chính nên đặt ở vị trí nổi bật (thường là trung tâm hoặc vị trí thu hút nhất), đủ lớn để thể hiện rõ ràng.',
    options: [
      { key: 'A', content: 'Ở góc tranh cho kín', correct: false },
      { key: 'B', content: 'Ở vị trí nổi bật, trung tâm hoặc hấp dẫn', correct: true },
      { key: 'C', content: 'Thật nhỏ để vừa tờ giấy', correct: false },
      { key: 'D', content: 'Bất cứ đâu cũng được', correct: false },
    ],
  },
  // ===== DANH HỌA VIỆT NAM =====
  {
    content: 'Họa sĩ Tô Ngọc Vân nổi tiếng với tác phẩm nào?',
    difficulty: 'HARD',
    explanation: 'Tô Ngọc Vân (1906-1954) nổi tiếng với "Thiếu nữ bên hoa huệ" - một trong những tuyệt phẩm của hội họa Việt Nam.',
    options: [
      { key: 'A', content: 'Thiếu nữ bên hoa sen', correct: false },
      { key: 'B', content: 'Thiếu nữ bên hoa huệ', correct: true },
      { key: 'C', content: 'Bình hoa cúc vàng', correct: false },
      { key: 'D', content: 'Chân dung người mẹ', correct: false },
    ],
  },
  {
    content: 'Họa sĩ Bùi Xuân Phái được biết đến với dòng tranh nào?',
    difficulty: 'HARD',
    explanation: 'Bùi Xuân Phái (1920-1988) nổi tiếng với loạt tranh về "Phố cổ Hà Nội" - được người yêu nghệ thuật gọi là "Phái Phố".',
    options: [
      { key: 'A', content: 'Tranh chân dung phụ nữ', correct: false },
      { key: 'B', content: 'Tranh phố cổ Hà Nội', correct: true },
      { key: 'C', content: 'Tranh phong cảnh đồng quê', correct: false },
      { key: 'D', content: 'Tranh hoa lá', correct: false },
    ],
  },
  {
    content: 'Họa sĩ Nguyễn Phan Chánh nổi tiếng với chất liệu tranh nào?',
    difficulty: 'HARD',
    explanation: 'Nguyễn Phan Chánh (1892-1984) nổi tiếng với tranh lụa - vẽ trên vải lụa, thể hiện cảnh sinh hoạt dân gian Việt Nam.',
    options: [
      { key: 'A', content: 'Tranh sơn dầu', correct: false },
      { key: 'B', content: 'Tranh lụa', correct: true },
      { key: 'C', content: 'Tranh sơn mài', correct: false },
      { key: 'D', content: 'Tranh khắc gỗ', correct: false },
    ],
  },
  // ===== TỔNG HỢP MỸ THUẬT =====
  {
    content: 'Sắc độ trong hội họa là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Sắc độ là độ đậm nhạt của màu sắc. Cùng một màu có thể có nhiều sắc độ từ nhạt đến đậm.',
    options: [
      { key: 'A', content: 'Tên của màu sắc', correct: false },
      { key: 'B', content: 'Độ đậm nhạt của màu sắc', correct: true },
      { key: 'C', content: 'Độ ấm lạnh của màu', correct: false },
      { key: 'D', content: 'Số lượng màu trong tranh', correct: false },
    ],
  },
  {
    content: 'Kỹ thuật nào tạo ra hiệu ứng chuyển màu mượt mà từ đậm sang nhạt?',
    difficulty: 'HARD',
    explanation: 'Kỹ thuật tô màu chuyển sắc (gradient/sfumato) tạo ra chuyển màu từ đậm sang nhạt một cách mềm mại.',
    options: [
      { key: 'A', content: 'Tô màu phẳng đều', correct: false },
      { key: 'B', content: 'Tô chuyển sắc từ đậm sang nhạt', correct: true },
      { key: 'C', content: 'Chấm màu riêng biệt', correct: false },
      { key: 'D', content: 'Để trắng giấy', correct: false },
    ],
  },
  {
    content: 'Khi pha màu trắng vào màu đỏ ta được?',
    difficulty: 'EASY',
    explanation: 'Thêm màu trắng vào màu đỏ sẽ làm màu đỏ nhạt hơn, tạo ra màu hồng.',
    options: [
      { key: 'A', content: 'Màu đen', correct: false },
      { key: 'B', content: 'Màu cam', correct: false },
      { key: 'C', content: 'Màu hồng', correct: true },
      { key: 'D', content: 'Màu tím', correct: false },
    ],
  },
  {
    content: 'Pha màu đen vào màu trắng ta được?',
    difficulty: 'EASY',
    explanation: 'Trắng + Đen = Xám (gray). Tùy theo tỷ lệ nhiều hay ít đen sẽ có xám nhạt hay đậm.',
    options: [
      { key: 'A', content: 'Màu nâu', correct: false },
      { key: 'B', content: 'Màu xám', correct: true },
      { key: 'C', content: 'Màu be', correct: false },
      { key: 'D', content: 'Màu vàng nhạt', correct: false },
    ],
  },
  {
    content: 'Nhóm màu tương phản (complementary colors) là nhóm màu như thế nào?',
    difficulty: 'HARD',
    explanation: 'Màu tương phản là các màu đối diện nhau trên vòng tròn màu sắc, ví dụ: đỏ-xanh lá, vàng-tím, cam-xanh lam.',
    options: [
      { key: 'A', content: 'Màu cùng gam (ví dụ tất cả màu nóng)', correct: false },
      { key: 'B', content: 'Màu đối diện nhau trên vòng tròn màu', correct: true },
      { key: 'C', content: 'Màu giống nhau nhưng khác sắc độ', correct: false },
      { key: 'D', content: 'Tất cả màu tối', correct: false },
    ],
  },
  {
    content: 'Phối màu hài hòa (analogous colors) là phối màu như thế nào?',
    difficulty: 'HARD',
    explanation: 'Màu hài hòa là các màu kề nhau trên vòng tròn màu sắc (ví dụ: đỏ-cam-vàng), tạo cảm giác nhẹ nhàng, êm dịu.',
    options: [
      { key: 'A', content: 'Màu tương phản, đối diện nhau', correct: false },
      { key: 'B', content: 'Màu kề nhau trên vòng tròn màu', correct: true },
      { key: 'C', content: 'Chỉ dùng một màu', correct: false },
      { key: 'D', content: 'Màu đen và trắng', correct: false },
    ],
  },
  {
    content: 'Khi quan sát một bức tranh, điều đầu tiên thu hút mắt người xem là?',
    difficulty: 'MEDIUM',
    explanation: 'Mắt người xem thường bị thu hút đầu tiên bởi vùng sáng nhất, màu sắc tương phản mạnh hoặc hình dạng đặc biệt - đó là trọng tâm của tranh.',
    options: [
      { key: 'A', content: 'Góc dưới phải của tranh', correct: false },
      { key: 'B', content: 'Vùng sáng nhất hoặc tương phản mạnh nhất (trọng tâm)', correct: true },
      { key: 'C', content: 'Phần nền tranh', correct: false },
      { key: 'D', content: 'Chữ ký của họa sĩ', correct: false },
    ],
  },
  {
    content: 'Mỹ thuật có ứng dụng trong những lĩnh vực nào của cuộc sống?',
    difficulty: 'MEDIUM',
    explanation: 'Mỹ thuật ứng dụng trong thiết kế thời trang, kiến trúc, đồ họa, bao bì sản phẩm, trang trí nội thất, quảng cáo...',
    options: [
      { key: 'A', content: 'Chỉ trong bảo tàng', correct: false },
      { key: 'B', content: 'Thiết kế thời trang, kiến trúc, đồ họa, trang trí', correct: true },
      { key: 'C', content: 'Chỉ trong lớp học mỹ thuật', correct: false },
      { key: 'D', content: 'Không có ứng dụng thực tế', correct: false },
    ],
  },
  { content: 'Kỹ thuật vẽ màu nước khác màu sáp ở điểm nào?', difficulty: 'MEDIUM', explanation: 'Màu nước pha với nước tạo hiệu ứng trong suốt, nhẹ nhàng, dễ tạo gradient màu. Màu sáp đặc hơn, không trong suốt.', options: [{ key: 'A', content: 'Màu nước không cần nước', correct: false }, { key: 'B', content: 'Màu nước tạo hiệu ứng trong suốt, nhẹ hơn', correct: true }, { key: 'C', content: 'Màu nước và màu sáp giống nhau', correct: false }, { key: 'D', content: 'Màu sáp trong suốt hơn', correct: false }] },
  { content: 'Tranh lụa được vẽ trên chất liệu nào?', difficulty: 'MEDIUM', explanation: 'Tranh lụa được vẽ trực tiếp trên vải lụa (tơ tằm), tạo nên vẻ đẹp nhẹ nhàng, thoáng và mềm mại.', options: [{ key: 'A', content: 'Giấy báo', correct: false }, { key: 'B', content: 'Vải lụa (tơ tằm)', correct: true }, { key: 'C', content: 'Gỗ', correct: false }, { key: 'D', content: 'Bìa cứng', correct: false }] },
  { content: 'Khi vẽ chân dung, phần nào của khuôn mặt thường được vẽ đầu tiên?', difficulty: 'MEDIUM', explanation: 'Khi vẽ chân dung thường phác thảo hình dạng khuôn mặt (hình oval) trước, rồi mới vẽ các bộ phận: mắt, mũi, miệng.', options: [{ key: 'A', content: 'Mắt', correct: false }, { key: 'B', content: 'Hình dạng khuôn mặt (tổng thể)', correct: true }, { key: 'C', content: 'Miệng', correct: false }, { key: 'D', content: 'Tai', correct: false }] },
  { content: 'Trong vẽ trang trí, nguyên tắc "nhắc lại" có nghĩa là gì?', difficulty: 'HARD', explanation: 'Nguyên tắc nhắc lại (lặp lại) trong trang trí là sử dụng hình, màu sắc hoặc đường nét lặp đi lặp lại để tạo nhịp điệu.', options: [{ key: 'A', content: 'Vẽ lại một bức tranh giống nhau', correct: false }, { key: 'B', content: 'Lặp lại hình, màu để tạo nhịp điệu', correct: true }, { key: 'C', content: 'Sửa lại những phần sai', correct: false }, { key: 'D', content: 'Không được dùng màu nào quá một lần', correct: false }] },
  { content: 'Màu bổ túc (complementary colors) là gì?', difficulty: 'HARD', explanation: 'Màu bổ túc là cặp màu đối diện nhau trên vòng màu sắc: đỏ-xanh lá, vàng-tím, xanh lam-cam. Khi đứng cạnh nhau tạo hiệu ứng tương phản mạnh.', options: [{ key: 'A', content: 'Hai màu giống nhau hoàn toàn', correct: false }, { key: 'B', content: 'Màu đối diện nhau trên vòng màu, tương phản mạnh', correct: true }, { key: 'C', content: 'Màu pha trộn của hai màu khác', correct: false }, { key: 'D', content: 'Màu nhạt và màu đậm của cùng một màu', correct: false }] },
  { content: 'Chất liệu đất sét (clay) dùng để làm gì trong mỹ thuật?', difficulty: 'EASY', explanation: 'Đất sét dùng để nặn hình, tạo tác phẩm điêu khắc 3D: tượng, đồ vật, con người, con thú...', options: [{ key: 'A', content: 'Vẽ lên giấy', correct: false }, { key: 'B', content: 'Nặn hình, tạo tác phẩm 3D', correct: true }, { key: 'C', content: 'Làm bút vẽ', correct: false }, { key: 'D', content: 'Pha màu', correct: false }] },
  { content: 'Đường cong trong tranh tạo cảm giác gì?', difficulty: 'MEDIUM', explanation: 'Đường cong tạo cảm giác mềm mại, nhẹ nhàng, uyển chuyển và sinh động - khác với đường thẳng tạo cảm giác cứng cáp.', options: [{ key: 'A', content: 'Cứng cáp, mạnh mẽ', correct: false }, { key: 'B', content: 'Mềm mại, nhẹ nhàng, uyển chuyển', correct: true }, { key: 'C', content: 'Buồn chán', correct: false }, { key: 'D', content: 'Hỗn loạn', correct: false }] },
  { content: 'Tranh Hàng Trống nổi tiếng của Việt Nam có xuất xứ từ đâu?', difficulty: 'HARD', explanation: 'Tranh Hàng Trống là dòng tranh dân gian xuất xứ từ phố Hàng Trống, Hà Nội. Tranh có màu sắc tươi sáng, đường nét tinh tế.', options: [{ key: 'A', content: 'Bắc Ninh', correct: false }, { key: 'B', content: 'Hà Nội (phố Hàng Trống)', correct: true }, { key: 'C', content: 'Nam Định', correct: false }, { key: 'D', content: 'Huế', correct: false }] },
  { content: 'Khi vẽ phong cảnh thiên nhiên, yếu tố nào tạo nên chiều sâu (không gian)?', difficulty: 'HARD', explanation: 'Để tạo chiều sâu, vật ở xa vẽ nhỏ hơn và màu nhạt hơn vật ở gần (luật phối cảnh - perspective).', options: [{ key: 'A', content: 'Vẽ tất cả mọi vật cùng kích thước', correct: false }, { key: 'B', content: 'Vật xa vẽ nhỏ hơn và màu nhạt hơn', correct: true }, { key: 'C', content: 'Dùng nhiều màu sắc khác nhau', correct: false }, { key: 'D', content: 'Vẽ thật nhiều chi tiết', correct: false }] },
  { content: 'Màu đen và trắng được gọi là gì trong mỹ thuật?', difficulty: 'MEDIUM', explanation: 'Đen và trắng được gọi là "vô sắc" hay "màu trung tính" - không có sắc thái màu (hue) mà chỉ có giá trị sáng tối.', options: [{ key: 'A', content: 'Màu cơ bản', correct: false }, { key: 'B', content: 'Màu trung tính / vô sắc', correct: true }, { key: 'C', content: 'Màu thứ cấp', correct: false }, { key: 'D', content: 'Màu lạnh', correct: false }] },
  { content: 'Tác phẩm "Thiếu nữ bên hoa huệ" là của họa sĩ nào?', difficulty: 'HARD', explanation: '"Thiếu nữ bên hoa huệ" là kiệt tác của họa sĩ Tô Ngọc Vân, sáng tác năm 1943, hiện đang lưu giữ tại Bảo tàng Mỹ thuật Việt Nam.', options: [{ key: 'A', content: 'Nguyễn Phan Chánh', correct: false }, { key: 'B', content: 'Tô Ngọc Vân', correct: true }, { key: 'C', content: 'Bùi Xuân Phái', correct: false }, { key: 'D', content: 'Trần Văn Cẩn', correct: false }] },
  { content: 'Vì sao học mỹ thuật quan trọng với học sinh?', difficulty: 'EASY', explanation: 'Học mỹ thuật giúp phát triển tư duy sáng tạo, khả năng quan sát, cảm nhận cái đẹp và thể hiện cảm xúc qua nghệ thuật.', options: [{ key: 'A', content: 'Chỉ để có môn học cho đủ', correct: false }, { key: 'B', content: 'Phát triển sáng tạo, cảm nhận cái đẹp', correct: true }, { key: 'C', content: 'Không có ích gì', correct: false }, { key: 'D', content: 'Chỉ để trở thành họa sĩ', correct: false }] },
  { content: 'Nghệ thuật origami (gấp giấy) có xuất xứ từ đâu?', difficulty: 'MEDIUM', explanation: 'Nghệ thuật origami (gấp giấy thành hình các con vật, đồ vật) có xuất xứ từ Nhật Bản, phổ biến toàn thế giới.', options: [{ key: 'A', content: 'Trung Quốc', correct: false }, { key: 'B', content: 'Nhật Bản', correct: true }, { key: 'C', content: 'Hàn Quốc', correct: false }, { key: 'D', content: 'Việt Nam', correct: false }] },
  { content: 'Bức tranh "Hà Nội phố" nổi tiếng gắn liền với họa sĩ nào?', difficulty: 'HARD', explanation: 'Họa sĩ Bùi Xuân Phái nổi tiếng với loạt tranh "Phố Phái" - các bức tranh vẽ phố cổ Hà Nội bằng chất liệu sơn dầu.', options: [{ key: 'A', content: 'Tô Ngọc Vân', correct: false }, { key: 'B', content: 'Bùi Xuân Phái', correct: true }, { key: 'C', content: 'Nguyễn Phan Chánh', correct: false }, { key: 'D', content: 'Lê Văn Miến', correct: false }] },
];
async function main() {
  console.log(`Bắt đầu chèn ${questions.length} câu...`);
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await p.question.create({
      data: {
        subjectId: SUBJECT_ID, gradeId: GRADE_ID, content: q.content,
        questionType: 'MULTIPLE_CHOICE', difficulty: q.difficulty,
        explanation: q.explanation, createdById: CREATED_BY, status: 'ACTIVE',
        options: { create: q.options.map((opt, idx) => ({ optionKey: opt.key, content: opt.content, isCorrect: opt.correct, sortOrder: idx })) },
      },
    });
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${questions.length}...`);
  }
  console.log('Hoàn thành!');
  await p.$disconnect();
}
main().catch((e) => { console.error(e); p.$disconnect(); process.exit(1); });
