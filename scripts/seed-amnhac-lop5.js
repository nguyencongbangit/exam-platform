const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-amnhac';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== 7 NỐT NHẠC =====
  {
    content: '7 nốt nhạc cơ bản trong âm nhạc theo thứ tự từ thấp đến cao là?',
    difficulty: 'EASY',
    explanation: 'Bảy nốt nhạc cơ bản theo thứ tự: Đô - Rê - Mi - Fa - Sol - La - Si.',
    options: [
      { key: 'A', content: 'Đô - Mi - Rê - Fa - Sol - Si - La', correct: false },
      { key: 'B', content: 'Đô - Rê - Mi - Fa - Sol - La - Si', correct: true },
      { key: 'C', content: 'La - Si - Đô - Rê - Mi - Fa - Sol', correct: false },
      { key: 'D', content: 'Mi - Fa - Sol - La - Si - Đô - Rê', correct: false },
    ],
  },
  {
    content: 'Nốt nhạc thứ ba trong thang âm Đô trưởng là nốt nào?',
    difficulty: 'EASY',
    explanation: 'Thứ tự: Đô(1) - Rê(2) - Mi(3) - Fa(4)... Nốt thứ ba là Mi.',
    options: [
      { key: 'A', content: 'Rê', correct: false },
      { key: 'B', content: 'Mi', correct: true },
      { key: 'C', content: 'Fa', correct: false },
      { key: 'D', content: 'Sol', correct: false },
    ],
  },
  {
    content: 'Nốt Sol nằm ở vị trí thứ mấy trong 7 nốt nhạc?',
    difficulty: 'EASY',
    explanation: 'Đô(1)-Rê(2)-Mi(3)-Fa(4)-Sol(5)-La(6)-Si(7). Sol là nốt thứ 5.',
    options: [
      { key: 'A', content: 'Thứ 4', correct: false },
      { key: 'B', content: 'Thứ 5', correct: true },
      { key: 'C', content: 'Thứ 6', correct: false },
      { key: 'D', content: 'Thứ 3', correct: false },
    ],
  },
  {
    content: 'Nốt nhạc nào đứng giữa Fa và La?',
    difficulty: 'EASY',
    explanation: 'Thứ tự: Fa - Sol - La. Sol đứng giữa Fa và La.',
    options: [
      { key: 'A', content: 'Mi', correct: false },
      { key: 'B', content: 'Si', correct: false },
      { key: 'C', content: 'Sol', correct: true },
      { key: 'D', content: 'Rê', correct: false },
    ],
  },
  // ===== KHUÔNG NHẠC VÀ KHÓA SON =====
  {
    content: 'Khuông nhạc gồm bao nhiêu dòng kẻ?',
    difficulty: 'EASY',
    explanation: 'Khuông nhạc gồm 5 dòng kẻ ngang song song và 4 khoảng trống giữa các dòng.',
    options: [
      { key: 'A', content: '3 dòng', correct: false },
      { key: 'B', content: '4 dòng', correct: false },
      { key: 'C', content: '5 dòng', correct: true },
      { key: 'D', content: '6 dòng', correct: false },
    ],
  },
  {
    content: 'Khóa Son được đặt ở đầu khuông nhạc có tác dụng gì?',
    difficulty: 'MEDIUM',
    explanation: 'Khóa Son xác định vị trí nốt Sol (Son) trên dòng kẻ thứ hai của khuông nhạc, từ đó xác định vị trí các nốt khác.',
    options: [
      { key: 'A', content: 'Trang trí khuông nhạc', correct: false },
      { key: 'B', content: 'Xác định tên và vị trí các nốt trên khuông', correct: true },
      { key: 'C', content: 'Chỉ nhịp điệu', correct: false },
      { key: 'D', content: 'Chỉ tốc độ bài hát', correct: false },
    ],
  },
  {
    content: 'Khóa Son được đặt ở dòng kẻ thứ mấy của khuông nhạc?',
    difficulty: 'MEDIUM',
    explanation: 'Khóa Son (treble clef) cuộn xoắn quanh dòng kẻ thứ hai, đánh dấu vị trí nốt Sol.',
    options: [
      { key: 'A', content: 'Dòng thứ nhất', correct: false },
      { key: 'B', content: 'Dòng thứ hai', correct: true },
      { key: 'C', content: 'Dòng thứ ba', correct: false },
      { key: 'D', content: 'Dòng thứ tư', correct: false },
    ],
  },
  // ===== PHÁCH VÀ NHỊP =====
  {
    content: 'Nhịp 2/4 có nghĩa là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Nhịp 2/4 nghĩa là mỗi ô nhịp có 2 phách, mỗi phách tương đương với 1 nốt đen.',
    options: [
      { key: 'A', content: 'Mỗi ô nhịp có 4 phách', correct: false },
      { key: 'B', content: 'Mỗi ô nhịp có 2 phách, mỗi phách là nốt đen', correct: true },
      { key: 'C', content: 'Bài hát có 2 đoạn', correct: false },
      { key: 'D', content: 'Mỗi ô nhịp có 2 nốt tròn', correct: false },
    ],
  },
  {
    content: 'Phách mạnh trong nhịp 2/4 là phách nào?',
    difficulty: 'MEDIUM',
    explanation: 'Trong nhịp 2/4, phách 1 là phách mạnh, phách 2 là phách nhẹ.',
    options: [
      { key: 'A', content: 'Phách 2', correct: false },
      { key: 'B', content: 'Phách 1', correct: true },
      { key: 'C', content: 'Cả hai phách đều mạnh', correct: false },
      { key: 'D', content: 'Không có phách mạnh', correct: false },
    ],
  },
  // ===== TRƯỜNG ĐỘ NỐT NHẠC =====
  {
    content: 'Nốt nhạc nào có trường độ dài nhất?',
    difficulty: 'EASY',
    explanation: 'Nốt tròn có trường độ dài nhất, tương đương 4 phách (4 nốt đen).',
    options: [
      { key: 'A', content: 'Nốt trắng', correct: false },
      { key: 'B', content: 'Nốt tròn', correct: true },
      { key: 'C', content: 'Nốt đen', correct: false },
      { key: 'D', content: 'Nốt móc đơn', correct: false },
    ],
  },
  {
    content: 'Nốt trắng có trường độ bằng bao nhiêu phách?',
    difficulty: 'MEDIUM',
    explanation: 'Nốt trắng tương đương 2 phách (2 nốt đen).',
    options: [
      { key: 'A', content: '1 phách', correct: false },
      { key: 'B', content: '2 phách', correct: true },
      { key: 'C', content: '4 phách', correct: false },
      { key: 'D', content: '1/2 phách', correct: false },
    ],
  },
  {
    content: 'Nốt đen có trường độ bằng bao nhiêu phách?',
    difficulty: 'EASY',
    explanation: 'Nốt đen tương đương 1 phách.',
    options: [
      { key: 'A', content: '2 phách', correct: false },
      { key: 'B', content: '1/2 phách', correct: false },
      { key: 'C', content: '1 phách', correct: true },
      { key: 'D', content: '4 phách', correct: false },
    ],
  },
  {
    content: 'Nốt móc đơn có trường độ bằng bao nhiêu phách?',
    difficulty: 'MEDIUM',
    explanation: 'Nốt móc đơn tương đương 1/2 phách (một nốt đen bằng 2 nốt móc đơn).',
    options: [
      { key: 'A', content: '1 phách', correct: false },
      { key: 'B', content: '1/2 phách', correct: true },
      { key: 'C', content: '2 phách', correct: false },
      { key: 'D', content: '1/4 phách', correct: false },
    ],
  },
  {
    content: 'Một nốt tròn bằng bao nhiêu nốt đen?',
    difficulty: 'MEDIUM',
    explanation: 'Nốt tròn = 2 nốt trắng = 4 nốt đen = 8 nốt móc đơn.',
    options: [
      { key: 'A', content: '2 nốt đen', correct: false },
      { key: 'B', content: '4 nốt đen', correct: true },
      { key: 'C', content: '8 nốt đen', correct: false },
      { key: 'D', content: '3 nốt đen', correct: false },
    ],
  },
  // ===== NHẠC CỤ VIỆT NAM =====
  {
    content: 'Đàn bầu là nhạc cụ có đặc điểm nào nổi bật?',
    difficulty: 'MEDIUM',
    explanation: 'Đàn bầu (độc huyền cầm) chỉ có một dây, tạo ra âm thanh bằng cách gảy dây và điều chỉnh vòi đàn. Tiếng đàn bầu nghe như giọng người.',
    options: [
      { key: 'A', content: 'Có hai dây, đánh bằng cung', correct: false },
      { key: 'B', content: 'Chỉ có một dây, tiếng ngân như giọng người', correct: true },
      { key: 'C', content: 'Là nhạc cụ gõ', correct: false },
      { key: 'D', content: 'Là nhạc cụ thổi hơi', correct: false },
    ],
  },
  {
    content: 'Đàn tranh là loại nhạc cụ nào?',
    difficulty: 'EASY',
    explanation: 'Đàn tranh là nhạc cụ dây gảy của Việt Nam, có 16 đến 21 dây.',
    options: [
      { key: 'A', content: 'Nhạc cụ gõ', correct: false },
      { key: 'B', content: 'Nhạc cụ hơi', correct: false },
      { key: 'C', content: 'Nhạc cụ dây gảy', correct: true },
      { key: 'D', content: 'Nhạc cụ kéo cung', correct: false },
    ],
  },
  {
    content: 'Sáo trúc là nhạc cụ thuộc loại nào?',
    difficulty: 'EASY',
    explanation: 'Sáo trúc là nhạc cụ hơi (thổi hơi qua lỗ thổi tạo ra âm thanh).',
    options: [
      { key: 'A', content: 'Nhạc cụ dây', correct: false },
      { key: 'B', content: 'Nhạc cụ gõ', correct: false },
      { key: 'C', content: 'Nhạc cụ hơi', correct: true },
      { key: 'D', content: 'Nhạc cụ điện tử', correct: false },
    ],
  },
  {
    content: 'Trống là nhạc cụ thuộc loại nào?',
    difficulty: 'EASY',
    explanation: 'Trống là nhạc cụ gõ (gõ vào mặt trống để tạo ra âm thanh).',
    options: [
      { key: 'A', content: 'Nhạc cụ hơi', correct: false },
      { key: 'B', content: 'Nhạc cụ dây', correct: false },
      { key: 'C', content: 'Nhạc cụ gõ', correct: true },
      { key: 'D', content: 'Nhạc cụ phím', correct: false },
    ],
  },
  {
    content: 'Đàn tỳ bà có nguồn gốc từ đâu và được sử dụng nhiều trong thể loại âm nhạc nào?',
    difficulty: 'HARD',
    explanation: 'Đàn tỳ bà có nguồn gốc từ Trung Đông, du nhập vào Việt Nam và được dùng nhiều trong nhạc thính phòng, nhạc cung đình.',
    options: [
      { key: 'A', content: 'Từ Việt Nam, dùng trong âm nhạc dân gian đồng bằng', correct: false },
      { key: 'B', content: 'Từ Trung Đông, dùng trong thính phòng và cung đình', correct: true },
      { key: 'C', content: 'Từ Trung Quốc, dùng trong hát chèo', correct: false },
      { key: 'D', content: 'Từ Ấn Độ, dùng trong lễ hội', correct: false },
    ],
  },
  // ===== BÀI HÁT SGK ÂM NHẠC 5 =====
  {
    content: 'Bài hát "Reo vang bình minh" trong SGK Âm nhạc 5 do nhạc sĩ nào sáng tác?',
    difficulty: 'MEDIUM',
    explanation: 'Bài hát "Reo vang bình minh" do nhạc sĩ Lưu Hữu Phước sáng tác.',
    options: [
      { key: 'A', content: 'Văn Cao', correct: false },
      { key: 'B', content: 'Lưu Hữu Phước', correct: true },
      { key: 'C', content: 'Đỗ Nhuận', correct: false },
      { key: 'D', content: 'Hoàng Việt', correct: false },
    ],
  },
  {
    content: 'Bài hát "Hãy giữ cho em bầu trời xanh" trong SGK Âm nhạc 5 nói về điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Bài hát kêu gọi bảo vệ hòa bình, giữ gìn bầu trời trong xanh không có chiến tranh cho thiếu nhi.',
    options: [
      { key: 'A', content: 'Tình yêu gia đình', correct: false },
      { key: 'B', content: 'Bảo vệ hòa bình, giữ bầu trời trong xanh', correct: true },
      { key: 'C', content: 'Thiên nhiên đẹp', correct: false },
      { key: 'D', content: 'Niềm vui học tập', correct: false },
    ],
  },
  {
    content: 'Bài hát "Em vẫn nhớ trường xưa" trong chương trình Âm nhạc 5 thể hiện điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Bài hát nói về tình cảm yêu mến, kỷ niệm về ngôi trường thân yêu.',
    options: [
      { key: 'A', content: 'Niềm vui được nghỉ học', correct: false },
      { key: 'B', content: 'Tình cảm yêu mến và kỷ niệm về trường', correct: true },
      { key: 'C', content: 'Nỗi buồn khi đi học', correct: false },
      { key: 'D', content: 'Cuộc sống ở nông thôn', correct: false },
    ],
  },
  // ===== NHẠC SĨ VIỆT NAM =====
  {
    content: 'Nhạc sĩ Văn Cao nổi tiếng với bài nhạc nào?',
    difficulty: 'MEDIUM',
    explanation: 'Văn Cao (1923-1995) nổi tiếng với "Tiến quân ca" (Quốc ca Việt Nam) và nhiều bài như "Làng Tôi", "Suối Mơ".',
    options: [
      { key: 'A', content: 'Bài ca hy vọng', correct: false },
      { key: 'B', content: 'Tiến quân ca (Quốc ca Việt Nam)', correct: true },
      { key: 'C', content: 'Trường Sơn Đông Trường Sơn Tây', correct: false },
      { key: 'D', content: 'Mùa xuân đầu tiên', correct: false },
    ],
  },
  {
    content: 'Nhạc sĩ Đỗ Nhuận nổi tiếng với bài hát nào liên quan đến kháng chiến?',
    difficulty: 'HARD',
    explanation: 'Đỗ Nhuận nổi tiếng với "Chiến thắng Điện Biên" - bài hát về chiến thắng lịch sử 1954.',
    options: [
      { key: 'A', content: 'Giải phóng miền Nam', correct: false },
      { key: 'B', content: 'Chiến thắng Điện Biên', correct: true },
      { key: 'C', content: 'Tiến về Hà Nội', correct: false },
      { key: 'D', content: 'Cô gái mở đường', correct: false },
    ],
  },
  {
    content: 'Nhạc sĩ Hoàng Việt có tác phẩm nổi tiếng nào?',
    difficulty: 'HARD',
    explanation: 'Hoàng Việt nổi tiếng với tình khúc "Tình ca" (1957) - một trong những bài hát trữ tình hay nhất của nhạc Việt.',
    options: [
      { key: 'A', content: 'Hòn Vọng Phu', correct: false },
      { key: 'B', content: 'Tình ca', correct: true },
      { key: 'C', content: 'Sơn Nữ ca', correct: false },
      { key: 'D', content: 'Diễm xưa', correct: false },
    ],
  },
  // ===== TỔNG HỢP ÂM NHẠC =====
  {
    content: 'Âm nhạc có tác dụng gì đối với con người?',
    difficulty: 'EASY',
    explanation: 'Âm nhạc giúp giải trí, thư giãn tinh thần, kích thích sáng tạo, giáo dục cảm xúc và gắn kết con người với nhau.',
    options: [
      { key: 'A', content: 'Chỉ để giải trí', correct: false },
      { key: 'B', content: 'Giải trí, thư giãn, giáo dục cảm xúc và gắn kết người', correct: true },
      { key: 'C', content: 'Chỉ có hại', correct: false },
      { key: 'D', content: 'Không có tác dụng gì', correct: false },
    ],
  },
  {
    content: 'Nhịp điệu trong âm nhạc là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Nhịp điệu là sự sắp xếp có quy luật của các âm thanh theo thời gian, tạo ra cảm giác chuyển động, phách mạnh nhẹ luân phiên.',
    options: [
      { key: 'A', content: 'Âm lượng to hay nhỏ', correct: false },
      { key: 'B', content: 'Sự sắp xếp có quy luật của âm thanh theo thời gian', correct: true },
      { key: 'C', content: 'Cao độ của nốt nhạc', correct: false },
      { key: 'D', content: 'Màu sắc của âm nhạc', correct: false },
    ],
  },
  {
    content: 'Giai điệu (melody) trong âm nhạc là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Giai điệu là chuỗi các nốt nhạc nối tiếp nhau tạo thành một câu nhạc hoàn chỉnh, là phần dễ nhớ nhất của bài hát.',
    options: [
      { key: 'A', content: 'Nhịp điệu của bài nhạc', correct: false },
      { key: 'B', content: 'Chuỗi nốt nhạc nối tiếp tạo câu nhạc', correct: true },
      { key: 'C', content: 'Âm lượng to nhỏ', correct: false },
      { key: 'D', content: 'Nhạc cụ đệm', correct: false },
    ],
  },
  {
    content: 'Đâu là bộ nhạc cụ (ensemble) dân tộc truyền thống Việt Nam?',
    difficulty: 'MEDIUM',
    explanation: 'Bộ nhạc cụ dân tộc VN gồm đàn bầu, đàn tranh, đàn tỳ bà, sáo trúc, nhị (đàn kéo dây), trống... là nhạc cụ đặc trưng của Việt Nam.',
    options: [
      { key: 'A', content: 'Violin, cello, flute, oboe', correct: false },
      { key: 'B', content: 'Guitar, bass, drum, piano', correct: false },
      { key: 'C', content: 'Đàn bầu, đàn tranh, sáo trúc, nhị', correct: true },
      { key: 'D', content: 'Saxophone, trumpet, trombone', correct: false },
    ],
  },
  {
    content: 'Tốc độ trong âm nhạc được ký hiệu bằng tiếng nước nào?',
    difficulty: 'HARD',
    explanation: 'Các ký hiệu tốc độ trong âm nhạc thường dùng tiếng Ý (Italian) như: Allegro (nhanh), Andante (chậm vừa), Lento (chậm)...',
    options: [
      { key: 'A', content: 'Tiếng Anh', correct: false },
      { key: 'B', content: 'Tiếng Pháp', correct: false },
      { key: 'C', content: 'Tiếng Ý', correct: true },
      { key: 'D', content: 'Tiếng Đức', correct: false },
    ],
  },
  {
    content: 'Dấu lặng (rest) trong âm nhạc có ý nghĩa gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dấu lặng ký hiệu cho khoảng thời gian im lặng (không phát ra âm thanh) trong bản nhạc.',
    options: [
      { key: 'A', content: 'Hát to hơn', correct: false },
      { key: 'B', content: 'Khoảng thời gian im lặng không phát âm', correct: true },
      { key: 'C', content: 'Nốt nhạc đặc biệt', correct: false },
      { key: 'D', content: 'Nhắc lại đoạn nhạc', correct: false },
    ],
  },
  {
    content: 'Cao độ của nốt nhạc là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cao độ là độ cao thấp của âm thanh. Nốt nhạc cao khi rung động nhiều (tần số cao), thấp khi rung ít.',
    options: [
      { key: 'A', content: 'Thời gian kéo dài của nốt nhạc', correct: false },
      { key: 'B', content: 'Độ cao thấp của âm thanh', correct: true },
      { key: 'C', content: 'Âm lượng to nhỏ', correct: false },
      { key: 'D', content: 'Loại nhạc cụ', correct: false },
    ],
  },
  {
    content: 'Lễ hội âm nhạc nào ở Việt Nam nổi tiếng hàng năm?',
    difficulty: 'HARD',
    explanation: 'Liên hoan phim và âm nhạc quốc tế Hà Nội, Lễ hội Âm nhạc Gió Mùa (Monsoon Music Festival) ở Hà Nội là những lễ hội âm nhạc nổi tiếng.',
    options: [
      { key: 'A', content: 'Grammy Awards', correct: false },
      { key: 'B', content: 'Monsoon Music Festival (Lễ hội âm nhạc Gió Mùa)', correct: true },
      { key: 'C', content: 'Cannes Festival', correct: false },
      { key: 'D', content: 'Eurovision', correct: false },
    ],
  },
  {
    content: 'Bài Quốc ca "Tiến quân ca" của Việt Nam được sáng tác vào năm nào?',
    difficulty: 'HARD',
    explanation: '"Tiến quân ca" do nhạc sĩ Văn Cao sáng tác năm 1944, được chọn làm Quốc ca từ Cách mạng tháng Tám 1945.',
    options: [
      { key: 'A', content: '1945', correct: false },
      { key: 'B', content: '1944', correct: true },
      { key: 'C', content: '1954', correct: false },
      { key: 'D', content: '1975', correct: false },
    ],
  },
  {
    content: 'Để hát đúng cao độ, người hát cần luyện tập gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cần luyện nghe nhạc nhiều, tập xướng âm (hát theo nốt nhạc), luyện giọng và học cách hít thở đúng.',
    options: [
      { key: 'A', content: 'Chỉ cần hát to', correct: false },
      { key: 'B', content: 'Luyện nghe, tập xướng âm, luyện giọng', correct: true },
      { key: 'C', content: 'Không cần luyện tập', correct: false },
      { key: 'D', content: 'Chỉ cần biết lời bài hát', correct: false },
    ],
  },
  { content: 'Nhịp 3/4 có đặc điểm gì?', difficulty: 'HARD', explanation: 'Nhịp 3/4 có 3 phách trong mỗi ô nhịp, mỗi phách bằng một nốt đen. Phách đầu mạnh, hai phách sau nhẹ hơn.', options: [{ key: 'A', content: '2 phách trong ô nhịp, phách nốt đen', correct: false }, { key: 'B', content: '3 phách trong ô nhịp, phách nốt đen', correct: true }, { key: 'C', content: '4 phách trong ô nhịp', correct: false }, { key: 'D', content: '1 phách trong ô nhịp', correct: false }] },
  { content: 'Dấu lặng đen (dấu lặng phách) trong âm nhạc có nghĩa là gì?', difficulty: 'MEDIUM', explanation: 'Dấu lặng đen chỉ khoảng nghỉ im lặng bằng thời gian của một nốt đen (một phách trong nhịp 2/4 hay 3/4).', options: [{ key: 'A', content: 'Hát to hơn', correct: false }, { key: 'B', content: 'Nghỉ lặng trong thời gian một nốt đen', correct: true }, { key: 'C', content: 'Hát nốt nhạc đó lại', correct: false }, { key: 'D', content: 'Hát nhanh hơn', correct: false }] },
  { content: 'Bài hát "Màu xanh quê hương" thuộc thể loại nào?', difficulty: 'MEDIUM', explanation: 'Bài hát thiếu nhi ca ngợi quê hương đất nước thường được gọi là ca khúc thiếu nhi hoặc bài hát về quê hương.', options: [{ key: 'A', content: 'Nhạc cổ điển', correct: false }, { key: 'B', content: 'Ca khúc thiếu nhi về quê hương', correct: true }, { key: 'C', content: 'Nhạc dance', correct: false }, { key: 'D', content: 'Nhạc thính phòng', correct: false }] },
  { content: 'Nhạc sĩ nào sáng tác bài "Quốc ca Việt Nam" (Tiến quân ca)?', difficulty: 'MEDIUM', explanation: 'Nhạc sĩ Văn Cao sáng tác bài "Tiến quân ca" năm 1944, được chọn làm Quốc ca Việt Nam.', options: [{ key: 'A', content: 'Đỗ Nhuận', correct: false }, { key: 'B', content: 'Văn Cao', correct: true }, { key: 'C', content: 'Phạm Duy', correct: false }, { key: 'D', content: 'Hoàng Việt', correct: false }] },
  { content: 'Đàn guitar thuộc nhóm nhạc cụ nào?', difficulty: 'MEDIUM', explanation: 'Đàn guitar là nhạc cụ dây, âm thanh tạo ra bằng cách gảy hoặc đàn dây.', options: [{ key: 'A', content: 'Nhạc cụ hơi', correct: false }, { key: 'B', content: 'Nhạc cụ dây', correct: true }, { key: 'C', content: 'Nhạc cụ gõ', correct: false }, { key: 'D', content: 'Nhạc cụ phím', correct: false }] },
  { content: 'Sáo trúc tạo ra âm thanh bằng cách nào?', difficulty: 'EASY', explanation: 'Sáo trúc là nhạc cụ hơi: người thổi thổi hơi qua lỗ thổi, làm không khí rung động trong ống sáo tạo ra âm thanh.', options: [{ key: 'A', content: 'Gõ vào thân sáo', correct: false }, { key: 'B', content: 'Thổi hơi qua lỗ thổi', correct: true }, { key: 'C', content: 'Kéo dây', correct: false }, { key: 'D', content: 'Nhấn phím', correct: false }] },
  { content: 'Trong bản nhạc, ký hiệu "f" (forte) có nghĩa là gì?', difficulty: 'HARD', explanation: 'Ký hiệu "f" (forte) trong âm nhạc có nghĩa là hát/chơi to, mạnh.', options: [{ key: 'A', content: 'Hát nhẹ', correct: false }, { key: 'B', content: 'Hát to, mạnh', correct: true }, { key: 'C', content: 'Hát nhanh', correct: false }, { key: 'D', content: 'Hát chậm', correct: false }] },
  { content: 'Nhạc cụ nào là nhạc cụ gõ trong dàn nhạc?', difficulty: 'EASY', explanation: 'Trống là nhạc cụ gõ phổ biến nhất trong dàn nhạc, được sử dụng để giữ nhịp.', options: [{ key: 'A', content: 'Đàn violin', correct: false }, { key: 'B', content: 'Kèn saxophone', correct: false }, { key: 'C', content: 'Trống', correct: true }, { key: 'D', content: 'Đàn piano', correct: false }] },
  { content: 'Vì sao học hát cần học thuộc lời trước hay học nốt nhạc trước?', difficulty: 'MEDIUM', explanation: 'Thông thường nên học nốt nhạc (giai điệu) trước để hát đúng cao độ và trường độ, sau đó ghép lời bài hát.', options: [{ key: 'A', content: 'Học lời trước rồi ghi nhớ nốt', correct: false }, { key: 'B', content: 'Học giai điệu (nốt nhạc) trước rồi ghép lời', correct: true }, { key: 'C', content: 'Cả hai cùng một lúc', correct: false }, { key: 'D', content: 'Không cần học nốt nhạc', correct: false }] },
  { content: 'Bài hát nào sau đây là dân ca Quan họ Bắc Ninh?', difficulty: 'HARD', explanation: '"Trống cơm" là bài dân ca Quan họ Bắc Ninh nổi tiếng.', options: [{ key: 'A', content: 'Lý con sáo (Nam Bộ)', correct: false }, { key: 'B', content: 'Trống cơm', correct: true }, { key: 'C', content: 'Hò kéo lưới (Miền Trung)', correct: false }, { key: 'D', content: 'Inh lả ơi (Tây Bắc)', correct: false }] },
  { content: 'Điệu lý trong dân ca Nam Bộ có đặc điểm gì?', difficulty: 'HARD', explanation: 'Điệu lý trong dân ca Nam Bộ thường vui tươi, nhộn nhịp, gần gũi với cuộc sống lao động của người dân vùng sông nước.', options: [{ key: 'A', content: 'Buồn, ai oán', correct: false }, { key: 'B', content: 'Vui tươi, nhộn nhịp', correct: true }, { key: 'C', content: 'Hùng tráng', correct: false }, { key: 'D', content: 'Trang nghiêm', correct: false }] },
  { content: 'Âm nhạc có tác dụng gì đối với sức khỏe tinh thần?', difficulty: 'EASY', explanation: 'Âm nhạc có tác dụng thư giãn, giảm căng thẳng, cải thiện tâm trạng và tăng cường khả năng tập trung.', options: [{ key: 'A', content: 'Không có tác dụng gì', correct: false }, { key: 'B', content: 'Thư giãn, giảm căng thẳng, cải thiện tâm trạng', correct: true }, { key: 'C', content: 'Chỉ làm cho buồn hơn', correct: false }, { key: 'D', content: 'Làm mất tập trung', correct: false }] },
  { content: 'Bài hát "Lên đàng" của nhạc sĩ nào?', difficulty: 'HARD', explanation: 'Bài "Lên đàng" do nhạc sĩ Lưu Hữu Phước sáng tác, một bài hát nổi tiếng của phong trào thanh niên Việt Nam.', options: [{ key: 'A', content: 'Văn Cao', correct: false }, { key: 'B', content: 'Lưu Hữu Phước', correct: true }, { key: 'C', content: 'Đỗ Nhuận', correct: false }, { key: 'D', content: 'Hoàng Việt', correct: false }] },
  { content: 'Nhạc cụ đàn bầu có âm thanh đặc biệt như thế nào?', difficulty: 'MEDIUM', explanation: 'Đàn bầu có âm thanh trong trẻo, ngân dài, đặc trưng riêng không thể nhầm lẫn với nhạc cụ khác - được coi là linh hồn của âm nhạc dân tộc Việt Nam.', options: [{ key: 'A', content: 'Âm thanh to và hùng mạnh', correct: false }, { key: 'B', content: 'Âm thanh trong trẻo, ngân dài, đặc biệt', correct: true }, { key: 'C', content: 'Âm thanh giống đàn guitar', correct: false }, { key: 'D', content: 'Âm thanh như tiếng gõ', correct: false }] },
  { content: 'Tốc độ trong âm nhạc (tempo) được đo bằng đơn vị nào?', difficulty: 'HARD', explanation: 'Tốc độ trong âm nhạc đo bằng BPM (Beats Per Minute - nhịp mỗi phút), thể hiện số phách trong một phút.', options: [{ key: 'A', content: 'Km/h', correct: false }, { key: 'B', content: 'BPM (nhịp mỗi phút)', correct: true }, { key: 'C', content: 'Hz', correct: false }, { key: 'D', content: 'Decibel (dB)', correct: false }] },
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
