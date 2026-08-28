const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-lichsu-dialy';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== LỊCH SỬ - CÁCH MẠNG THÁNG 8 =====
  {
    content: 'Cách mạng tháng Tám năm 1945 thành công vào ngày tháng nào?',
    difficulty: 'MEDIUM',
    explanation: 'Cách mạng tháng Tám 1945 thành công vào ngày 19 tháng 8 năm 1945 tại Hà Nội.',
    options: [
      { key: 'A', content: 'Ngày 2/9/1945', correct: false },
      { key: 'B', content: 'Ngày 19/8/1945', correct: true },
      { key: 'C', content: 'Ngày 7/5/1954', correct: false },
      { key: 'D', content: 'Ngày 30/4/1975', correct: false },
    ],
  },
  {
    content: 'Bác Hồ đọc Tuyên ngôn Độc lập tại đâu vào ngày 2/9/1945?',
    difficulty: 'EASY',
    explanation: 'Ngày 2/9/1945, Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội.',
    options: [
      { key: 'A', content: 'Sân vận động Hàng Đẫy', correct: false },
      { key: 'B', content: 'Quảng trường Ba Đình, Hà Nội', correct: true },
      { key: 'C', content: 'Cung Văn hóa Hữu Nghị', correct: false },
      { key: 'D', content: 'Hội trường Ba Đình', correct: false },
    ],
  },
  {
    content: 'Nước Việt Nam Dân chủ Cộng hòa được thành lập vào ngày nào?',
    difficulty: 'EASY',
    explanation: 'Ngày 2 tháng 9 năm 1945, Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
    options: [
      { key: 'A', content: '19/8/1945', correct: false },
      { key: 'B', content: '2/9/1945', correct: true },
      { key: 'C', content: '7/5/1954', correct: false },
      { key: 'D', content: '30/4/1975', correct: false },
    ],
  },
  {
    content: 'Ai là người đọc Tuyên ngôn Độc lập ngày 2/9/1945?',
    difficulty: 'EASY',
    explanation: 'Chủ tịch Hồ Chí Minh là người đọc Tuyên ngôn Độc lập ngày 2/9/1945.',
    options: [
      { key: 'A', content: 'Võ Nguyên Giáp', correct: false },
      { key: 'B', content: 'Hồ Chí Minh', correct: true },
      { key: 'C', content: 'Phạm Văn Đồng', correct: false },
      { key: 'D', content: 'Trường Chinh', correct: false },
    ],
  },
  // ===== KHÁNG CHIẾN CHỐNG PHÁP =====
  {
    content: 'Chiến dịch Điện Biên Phủ kết thúc vào ngày nào?',
    difficulty: 'MEDIUM',
    explanation: 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào ngày 7/5/1954.',
    options: [
      { key: 'A', content: '2/9/1945', correct: false },
      { key: 'B', content: '7/5/1954', correct: true },
      { key: 'C', content: '30/4/1975', correct: false },
      { key: 'D', content: '20/7/1954', correct: false },
    ],
  },
  {
    content: 'Ai là Đại tướng chỉ huy chiến dịch Điện Biên Phủ?',
    difficulty: 'EASY',
    explanation: 'Đại tướng Võ Nguyên Giáp là Tổng chỉ huy chiến dịch Điện Biên Phủ.',
    options: [
      { key: 'A', content: 'Hồ Chí Minh', correct: false },
      { key: 'B', content: 'Võ Nguyên Giáp', correct: true },
      { key: 'C', content: 'Nguyễn Chí Thanh', correct: false },
      { key: 'D', content: 'Lê Trọng Tấn', correct: false },
    ],
  },
  {
    content: 'Hiệp định Giơ-ne-vơ được ký kết vào năm nào, chia đôi đất nước tại vĩ tuyến mấy?',
    difficulty: 'HARD',
    explanation: 'Hiệp định Giơ-ne-vơ ký năm 1954, chia đôi đất nước tại vĩ tuyến 17.',
    options: [
      { key: 'A', content: 'Năm 1954, vĩ tuyến 17', correct: true },
      { key: 'B', content: 'Năm 1954, vĩ tuyến 16', correct: false },
      { key: 'C', content: 'Năm 1955, vĩ tuyến 17', correct: false },
      { key: 'D', content: 'Năm 1956, vĩ tuyến 18', correct: false },
    ],
  },
  {
    content: 'Tên "Điện Biên Phủ" gắn với sự kiện lịch sử nào?',
    difficulty: 'EASY',
    explanation: 'Điện Biên Phủ là nơi diễn ra chiến dịch lịch sử đại thắng quân Pháp năm 1954, chấm dứt 9 năm kháng chiến.',
    options: [
      { key: 'A', content: 'Chiến thắng quân Mỹ năm 1975', correct: false },
      { key: 'B', content: 'Chiến thắng quân Pháp năm 1954', correct: true },
      { key: 'C', content: 'Giải phóng miền Nam năm 1975', correct: false },
      { key: 'D', content: 'Cách mạng tháng Tám 1945', correct: false },
    ],
  },
  // ===== KHÁNG CHIẾN CHỐNG MỸ =====
  {
    content: 'Phong trào "Đồng khởi" nổ ra vào năm nào?',
    difficulty: 'MEDIUM',
    explanation: 'Phong trào "Đồng khởi" nổ ra năm 1960 ở miền Nam Việt Nam.',
    options: [
      { key: 'A', content: '1954', correct: false },
      { key: 'B', content: '1960', correct: true },
      { key: 'C', content: '1965', correct: false },
      { key: 'D', content: '1968', correct: false },
    ],
  },
  {
    content: 'Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra vào năm nào?',
    difficulty: 'MEDIUM',
    explanation: 'Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra năm 1968.',
    options: [
      { key: 'A', content: '1965', correct: false },
      { key: 'B', content: '1968', correct: true },
      { key: 'C', content: '1972', correct: false },
      { key: 'D', content: '1975', correct: false },
    ],
  },
  {
    content: 'Ngày 30/4/1975 đánh dấu sự kiện gì?',
    difficulty: 'EASY',
    explanation: 'Ngày 30/4/1975 là ngày giải phóng miền Nam, thống nhất đất nước.',
    options: [
      { key: 'A', content: 'Ký kết Hiệp định Pari', correct: false },
      { key: 'B', content: 'Giải phóng miền Nam, thống nhất đất nước', correct: true },
      { key: 'C', content: 'Chiến thắng Điện Biên Phủ', correct: false },
      { key: 'D', content: 'Thành lập nước CHXHCN Việt Nam', correct: false },
    ],
  },
  {
    content: 'Chiến dịch Hồ Chí Minh kết thúc thắng lợi vào ngày nào?',
    difficulty: 'MEDIUM',
    explanation: 'Chiến dịch Hồ Chí Minh kết thúc vào ngày 30/4/1975 với việc giải phóng Sài Gòn.',
    options: [
      { key: 'A', content: '27/1/1973', correct: false },
      { key: 'B', content: '30/4/1975', correct: true },
      { key: 'C', content: '7/5/1954', correct: false },
      { key: 'D', content: '2/9/1975', correct: false },
    ],
  },
  // ===== ĐỔI MỚI 1986 VÀ ANH HÙNG =====
  {
    content: 'Đại hội Đảng lần thứ mấy đã đề ra chính sách Đổi mới năm 1986?',
    difficulty: 'HARD',
    explanation: 'Đại hội Đảng lần thứ VI năm 1986 đề ra đường lối Đổi mới.',
    options: [
      { key: 'A', content: 'Đại hội IV', correct: false },
      { key: 'B', content: 'Đại hội V', correct: false },
      { key: 'C', content: 'Đại hội VI', correct: true },
      { key: 'D', content: 'Đại hội VII', correct: false },
    ],
  },
  {
    content: 'Anh hùng Lý Tự Trọng là người như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Lý Tự Trọng là người đoàn viên thanh niên cộng sản dũng cảm, hi sinh khi còn rất trẻ trong thời kỳ chống Pháp.',
    options: [
      { key: 'A', content: 'Nhà khoa học nổi tiếng', correct: false },
      { key: 'B', content: 'Anh hùng liệt sĩ trẻ tuổi trong kháng chiến chống Pháp', correct: true },
      { key: 'C', content: 'Nhà thơ cách mạng', correct: false },
      { key: 'D', content: 'Tướng lĩnh quân đội', correct: false },
    ],
  },
  {
    content: 'Anh hùng Nguyễn Văn Trỗi là ai?',
    difficulty: 'MEDIUM',
    explanation: 'Nguyễn Văn Trỗi là người công nhân, anh hùng liệt sĩ trong kháng chiến chống Mỹ, hi sinh năm 1964.',
    options: [
      { key: 'A', content: 'Nhà thơ nổi tiếng', correct: false },
      { key: 'B', content: 'Anh hùng liệt sĩ trong kháng chiến chống Mỹ', correct: true },
      { key: 'C', content: 'Nhà khoa học', correct: false },
      { key: 'D', content: 'Vị tướng cầm quân', correct: false },
    ],
  },
  // ===== ĐỊA LÍ - VỊ TRÍ VN =====
  {
    content: 'Việt Nam nằm ở khu vực nào của châu Á?',
    difficulty: 'EASY',
    explanation: 'Việt Nam nằm ở khu vực Đông Nam Á.',
    options: [
      { key: 'A', content: 'Đông Bắc Á', correct: false },
      { key: 'B', content: 'Nam Á', correct: false },
      { key: 'C', content: 'Đông Nam Á', correct: true },
      { key: 'D', content: 'Tây Nam Á', correct: false },
    ],
  },
  {
    content: 'Biển nào tiếp giáp với lãnh thổ Việt Nam ở phía Đông?',
    difficulty: 'EASY',
    explanation: 'Việt Nam tiếp giáp với Biển Đông ở phía Đông và Đông Nam.',
    options: [
      { key: 'A', content: 'Biển Ả-rập', correct: false },
      { key: 'B', content: 'Biển Đông', correct: true },
      { key: 'C', content: 'Thái Bình Dương', correct: false },
      { key: 'D', content: 'Ấn Độ Dương', correct: false },
    ],
  },
  {
    content: 'Việt Nam tiếp giáp với những nước nào?',
    difficulty: 'MEDIUM',
    explanation: 'Việt Nam giáp Trung Quốc ở phía Bắc, Lào và Campuchia ở phía Tây.',
    options: [
      { key: 'A', content: 'Thái Lan, Myanmar, Indonesia', correct: false },
      { key: 'B', content: 'Trung Quốc, Lào, Campuchia', correct: true },
      { key: 'C', content: 'Trung Quốc, Nhật Bản, Lào', correct: false },
      { key: 'D', content: 'Campuchia, Thái Lan, Lào', correct: false },
    ],
  },
  {
    content: 'Thủ đô của Việt Nam là gì?',
    difficulty: 'EASY',
    explanation: 'Hà Nội là thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    options: [
      { key: 'A', content: 'Thành phố Hồ Chí Minh', correct: false },
      { key: 'B', content: 'Đà Nẵng', correct: false },
      { key: 'C', content: 'Hà Nội', correct: true },
      { key: 'D', content: 'Huế', correct: false },
    ],
  },
  // ===== CÁC VÙNG ĐỊA LÝ =====
  {
    content: 'Đồng bằng sông Hồng có đặc điểm nổi bật nào?',
    difficulty: 'MEDIUM',
    explanation: 'Đồng bằng sông Hồng là vùng đồng bằng châu thổ màu mỡ, dân cư đông đúc, là vựa lúa lớn của miền Bắc.',
    options: [
      { key: 'A', content: 'Nhiều rừng nhiệt đới', correct: false },
      { key: 'B', content: 'Đồng bằng màu mỡ, dân cư đông đúc', correct: true },
      { key: 'C', content: 'Có nhiều cao nguyên', correct: false },
      { key: 'D', content: 'Khí hậu khô hạn', correct: false },
    ],
  },
  {
    content: 'Đồng bằng sông Cửu Long còn được gọi là gì?',
    difficulty: 'EASY',
    explanation: 'Đồng bằng sông Cửu Long còn được gọi là đồng bằng Nam Bộ.',
    options: [
      { key: 'A', content: 'Đồng bằng sông Hồng', correct: false },
      { key: 'B', content: 'Đồng bằng Nam Bộ', correct: true },
      { key: 'C', content: 'Đồng bằng ven biển miền Trung', correct: false },
      { key: 'D', content: 'Cao nguyên miền Nam', correct: false },
    ],
  },
  {
    content: 'Tây Nguyên nổi tiếng với sản phẩm nông nghiệp nào?',
    difficulty: 'MEDIUM',
    explanation: 'Tây Nguyên nổi tiếng với cà phê, cao su, hồ tiêu - các cây công nghiệp lâu năm.',
    options: [
      { key: 'A', content: 'Lúa gạo', correct: false },
      { key: 'B', content: 'Cà phê, cao su, hồ tiêu', correct: true },
      { key: 'C', content: 'Mía đường', correct: false },
      { key: 'D', content: 'Chè (trà)', correct: false },
    ],
  },
  {
    content: 'Duyên hải miền Trung có đặc điểm địa hình như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Duyên hải miền Trung có địa hình hẹp ngang (giữa núi và biển), đất đai ít màu mỡ, thường xuyên bị thiên tai bão lũ.',
    options: [
      { key: 'A', content: 'Đồng bằng rộng lớn, bằng phẳng', correct: false },
      { key: 'B', content: 'Địa hình hẹp ngang, kẹp giữa núi và biển', correct: true },
      { key: 'C', content: 'Toàn bộ là cao nguyên', correct: false },
      { key: 'D', content: 'Nhiều hồ và đầm lầy', correct: false },
    ],
  },
  {
    content: 'Vùng núi phía Bắc Việt Nam có đỉnh núi cao nhất là?',
    difficulty: 'MEDIUM',
    explanation: 'Phan-xi-păng (Fansipan) cao 3 143 m là đỉnh núi cao nhất Việt Nam và Đông Dương.',
    options: [
      { key: 'A', content: 'Đỉnh Bà Nà', correct: false },
      { key: 'B', content: 'Đỉnh Langbiang', correct: false },
      { key: 'C', content: 'Đỉnh Phan-xi-păng', correct: true },
      { key: 'D', content: 'Đỉnh Trường Sơn', correct: false },
    ],
  },
  // ===== SÔNG, THÀNH PHỐ =====
  {
    content: 'Sông Hồng bắt nguồn từ đâu và chảy qua các tỉnh nào?',
    difficulty: 'HARD',
    explanation: 'Sông Hồng bắt nguồn từ Trung Quốc, chảy qua các tỉnh Lào Cai, Yên Bái, Phú Thọ, Hà Nội, Nam Định rồi đổ ra Biển Đông.',
    options: [
      { key: 'A', content: 'Từ Tây Nguyên, chảy qua miền Trung', correct: false },
      { key: 'B', content: 'Từ Trung Quốc, chảy qua miền Bắc', correct: true },
      { key: 'C', content: 'Từ Lào, chảy qua miền Nam', correct: false },
      { key: 'D', content: 'Từ Campuchia, chảy qua đồng bằng Nam Bộ', correct: false },
    ],
  },
  {
    content: 'Sông Mê Kông ở Việt Nam còn gọi là?',
    difficulty: 'MEDIUM',
    explanation: 'Sông Mê Kông khi chảy vào Việt Nam được gọi là sông Cửu Long (chín rồng) vì chia thành 9 nhánh.',
    options: [
      { key: 'A', content: 'Sông Hồng', correct: false },
      { key: 'B', content: 'Sông Cửu Long', correct: true },
      { key: 'C', content: 'Sông Đà', correct: false },
      { key: 'D', content: 'Sông Mã', correct: false },
    ],
  },
  {
    content: 'Thành phố Hồ Chí Minh trước năm 1975 có tên gọi là?',
    difficulty: 'MEDIUM',
    explanation: 'Trước năm 1975, Thành phố Hồ Chí Minh có tên là Sài Gòn.',
    options: [
      { key: 'A', content: 'Gia Định', correct: false },
      { key: 'B', content: 'Sài Gòn', correct: true },
      { key: 'C', content: 'Chợ Lớn', correct: false },
      { key: 'D', content: 'Biên Hòa', correct: false },
    ],
  },
  {
    content: 'Đà Nẵng nằm ở vùng nào của Việt Nam?',
    difficulty: 'EASY',
    explanation: 'Đà Nẵng là thành phố lớn nằm ở vùng duyên hải miền Trung Việt Nam.',
    options: [
      { key: 'A', content: 'Miền Bắc', correct: false },
      { key: 'B', content: 'Miền Nam', correct: false },
      { key: 'C', content: 'Miền Trung', correct: true },
      { key: 'D', content: 'Tây Nguyên', correct: false },
    ],
  },
  {
    content: 'Huế là kinh đô của triều đại nào trong lịch sử Việt Nam?',
    difficulty: 'MEDIUM',
    explanation: 'Huế là kinh đô của triều Nguyễn (1802-1945), triều đại phong kiến cuối cùng của Việt Nam.',
    options: [
      { key: 'A', content: 'Triều Lý', correct: false },
      { key: 'B', content: 'Triều Trần', correct: false },
      { key: 'C', content: 'Triều Nguyễn', correct: true },
      { key: 'D', content: 'Triều Lê', correct: false },
    ],
  },
  // ===== KHÍ HẬU =====
  {
    content: 'Khí hậu Việt Nam thuộc kiểu nào?',
    difficulty: 'EASY',
    explanation: 'Việt Nam có khí hậu nhiệt đới gió mùa.',
    options: [
      { key: 'A', content: 'Khí hậu ôn đới', correct: false },
      { key: 'B', content: 'Khí hậu nhiệt đới gió mùa', correct: true },
      { key: 'C', content: 'Khí hậu sa mạc', correct: false },
      { key: 'D', content: 'Khí hậu cận cực', correct: false },
    ],
  },
  {
    content: 'Miền Bắc Việt Nam có bao nhiêu mùa rõ rệt trong năm?',
    difficulty: 'EASY',
    explanation: 'Miền Bắc Việt Nam có 4 mùa rõ rệt: Xuân, Hạ, Thu, Đông.',
    options: [
      { key: 'A', content: '2 mùa', correct: false },
      { key: 'B', content: '3 mùa', correct: false },
      { key: 'C', content: '4 mùa', correct: true },
      { key: 'D', content: '6 mùa', correct: false },
    ],
  },
  {
    content: 'Miền Nam Việt Nam có mấy mùa chính?',
    difficulty: 'EASY',
    explanation: 'Miền Nam Việt Nam có 2 mùa: mùa mưa và mùa khô.',
    options: [
      { key: 'A', content: '4 mùa', correct: false },
      { key: 'B', content: '2 mùa (mưa và khô)', correct: true },
      { key: 'C', content: '3 mùa', correct: false },
      { key: 'D', content: '1 mùa', correct: false },
    ],
  },
  // ===== TÀI NGUYÊN =====
  {
    content: 'Tỉnh nào ở miền Bắc Việt Nam nổi tiếng với mỏ than đá lớn nhất nước?',
    difficulty: 'MEDIUM',
    explanation: 'Quảng Ninh có mỏ than đá lớn nhất Việt Nam (vùng than Hòn Gai, Cẩm Phả).',
    options: [
      { key: 'A', content: 'Hải Phòng', correct: false },
      { key: 'B', content: 'Quảng Ninh', correct: true },
      { key: 'C', content: 'Lạng Sơn', correct: false },
      { key: 'D', content: 'Cao Bằng', correct: false },
    ],
  },
  {
    content: 'Dầu mỏ ở Việt Nam được khai thác chủ yếu ở đâu?',
    difficulty: 'MEDIUM',
    explanation: 'Dầu mỏ của Việt Nam được khai thác chủ yếu ở thềm lục địa phía Nam (vùng biển Vũng Tàu, Bà Rịa).',
    options: [
      { key: 'A', content: 'Vùng núi phía Bắc', correct: false },
      { key: 'B', content: 'Tây Nguyên', correct: false },
      { key: 'C', content: 'Thềm lục địa phía Nam (Vũng Tàu)', correct: true },
      { key: 'D', content: 'Đồng bằng sông Hồng', correct: false },
    ],
  },
  {
    content: 'Rừng Việt Nam có vai trò quan trọng như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Rừng có vai trò điều hòa khí hậu, giữ nguồn nước, bảo vệ đất, cung cấp gỗ và lâm sản, là "lá phổi xanh".',
    options: [
      { key: 'A', content: 'Chỉ cung cấp gỗ xây dựng', correct: false },
      { key: 'B', content: 'Điều hòa khí hậu, giữ đất, giữ nước, cung cấp lâm sản', correct: true },
      { key: 'C', content: 'Chỉ là nơi sống của động vật', correct: false },
      { key: 'D', content: 'Chỉ để tham quan du lịch', correct: false },
    ],
  },
  // ===== TỔNG HỢP LỊCH SỬ =====
  {
    content: 'Cuộc kháng chiến chống Pháp của nhân dân Việt Nam kéo dài bao nhiêu năm (1945-1954)?',
    difficulty: 'MEDIUM',
    explanation: 'Kháng chiến chống Pháp kéo dài 9 năm (1945-1954).',
    options: [
      { key: 'A', content: '7 năm', correct: false },
      { key: 'B', content: '8 năm', correct: false },
      { key: 'C', content: '9 năm', correct: true },
      { key: 'D', content: '10 năm', correct: false },
    ],
  },
  {
    content: 'Hiệp định Pari về chấm dứt chiến tranh ở Việt Nam được ký kết vào năm nào?',
    difficulty: 'HARD',
    explanation: 'Hiệp định Pari được ký kết ngày 27/1/1973, yêu cầu Mỹ rút quân khỏi Việt Nam.',
    options: [
      { key: 'A', content: '1968', correct: false },
      { key: 'B', content: '1973', correct: true },
      { key: 'C', content: '1975', correct: false },
      { key: 'D', content: '1972', correct: false },
    ],
  },
  {
    content: 'Bác Hồ sinh ngày tháng năm nào?',
    difficulty: 'EASY',
    explanation: 'Hồ Chí Minh sinh ngày 19 tháng 5 năm 1890 tại làng Hoàng Trù, Nghệ An.',
    options: [
      { key: 'A', content: '19/5/1890', correct: true },
      { key: 'B', content: '2/9/1890', correct: false },
      { key: 'C', content: '19/8/1890', correct: false },
      { key: 'D', content: '19/5/1870', correct: false },
    ],
  },
  {
    content: 'Trận Bạch Đằng năm 938 do ai lãnh đạo đánh tan quân Nam Hán?',
    difficulty: 'MEDIUM',
    explanation: 'Ngô Quyền lãnh đạo trận Bạch Đằng năm 938, đánh tan quân Nam Hán, giành lại độc lập.',
    options: [
      { key: 'A', content: 'Đinh Bộ Lĩnh', correct: false },
      { key: 'B', content: 'Ngô Quyền', correct: true },
      { key: 'C', content: 'Lê Lợi', correct: false },
      { key: 'D', content: 'Trần Hưng Đạo', correct: false },
    ],
  },
  {
    content: 'Ai là người sáng lập Đảng Cộng sản Việt Nam năm 1930?',
    difficulty: 'MEDIUM',
    explanation: 'Hồ Chí Minh là người sáng lập Đảng Cộng sản Việt Nam ngày 3/2/1930.',
    options: [
      { key: 'A', content: 'Võ Nguyên Giáp', correct: false },
      { key: 'B', content: 'Hồ Chí Minh', correct: true },
      { key: 'C', content: 'Trường Chinh', correct: false },
      { key: 'D', content: 'Lê Duẩn', correct: false },
    ],
  },
  {
    content: 'Sự kiện nào đánh dấu chấm dứt ách thống trị của thực dân Pháp tại Việt Nam?',
    difficulty: 'MEDIUM',
    explanation: 'Chiến thắng Điện Biên Phủ (7/5/1954) buộc Pháp ký Hiệp định Giơ-ne-vơ, chấm dứt ách thống trị của Pháp tại Đông Dương.',
    options: [
      { key: 'A', content: 'Cách mạng tháng Tám 1945', correct: false },
      { key: 'B', content: 'Chiến thắng Điện Biên Phủ 1954', correct: true },
      { key: 'C', content: 'Chiến dịch Hồ Chí Minh 1975', correct: false },
      { key: 'D', content: 'Đổi mới 1986', correct: false },
    ],
  },
  // ===== TỔNG HỢP ĐỊA LÝ =====
  {
    content: 'Việt Nam có bao nhiêu tỉnh thành phố trực thuộc Trung ương?',
    difficulty: 'HARD',
    explanation: 'Việt Nam hiện có 63 tỉnh thành phố trực thuộc Trung ương.',
    options: [
      { key: 'A', content: '58', correct: false },
      { key: 'B', content: '60', correct: false },
      { key: 'C', content: '63', correct: true },
      { key: 'D', content: '65', correct: false },
    ],
  },
  {
    content: 'Đảo lớn nhất Việt Nam là đảo nào?',
    difficulty: 'MEDIUM',
    explanation: 'Đảo Phú Quốc (Kiên Giang) là đảo lớn nhất Việt Nam.',
    options: [
      { key: 'A', content: 'Côn Đảo', correct: false },
      { key: 'B', content: 'Cát Bà', correct: false },
      { key: 'C', content: 'Phú Quốc', correct: true },
      { key: 'D', content: 'Lý Sơn', correct: false },
    ],
  },
  {
    content: 'Vùng Tây Nguyên gồm các tỉnh nào?',
    difficulty: 'HARD',
    explanation: 'Tây Nguyên gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng.',
    options: [
      { key: 'A', content: 'Thanh Hóa, Nghệ An, Hà Tĩnh', correct: false },
      { key: 'B', content: 'Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng', correct: true },
      { key: 'C', content: 'Quảng Nam, Quảng Ngãi, Bình Định', correct: false },
      { key: 'D', content: 'Long An, Tiền Giang, Đồng Tháp', correct: false },
    ],
  },
  {
    content: 'Sông dài nhất chảy qua lãnh thổ Việt Nam là?',
    difficulty: 'MEDIUM',
    explanation: 'Sông Mê Kông (đoạn trong Việt Nam gọi là sông Cửu Long) là con sông dài và có lưu lượng lớn nhất chảy qua Việt Nam.',
    options: [
      { key: 'A', content: 'Sông Hồng', correct: false },
      { key: 'B', content: 'Sông Cửu Long (Mê Kông)', correct: true },
      { key: 'C', content: 'Sông Đà', correct: false },
      { key: 'D', content: 'Sông Mã', correct: false },
    ],
  },
  {
    content: 'Hà Nội nằm bên bờ sông nào?',
    difficulty: 'EASY',
    explanation: 'Hà Nội nằm bên bờ sông Hồng.',
    options: [
      { key: 'A', content: 'Sông Đà', correct: false },
      { key: 'B', content: 'Sông Hồng', correct: true },
      { key: 'C', content: 'Sông Cầu', correct: false },
      { key: 'D', content: 'Sông Mã', correct: false },
    ],
  },
  {
    content: 'Vịnh Hạ Long thuộc tỉnh nào và được UNESCO công nhận là Di sản thiên nhiên thế giới vào năm nào?',
    difficulty: 'HARD',
    explanation: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh, được UNESCO công nhận là Di sản thiên nhiên thế giới năm 1994.',
    options: [
      { key: 'A', content: 'Hải Phòng, năm 1992', correct: false },
      { key: 'B', content: 'Quảng Ninh, năm 1994', correct: true },
      { key: 'C', content: 'Quảng Ninh, năm 2000', correct: false },
      { key: 'D', content: 'Quảng Bình, năm 2003', correct: false },
    ],
  },
  {
    content: 'Khu vực nào của Việt Nam có mật độ dân số cao nhất?',
    difficulty: 'MEDIUM',
    explanation: 'Đồng bằng sông Hồng có mật độ dân số cao nhất Việt Nam.',
    options: [
      { key: 'A', content: 'Tây Nguyên', correct: false },
      { key: 'B', content: 'Miền núi phía Bắc', correct: false },
      { key: 'C', content: 'Đồng bằng sông Hồng', correct: true },
      { key: 'D', content: 'Duyên hải miền Trung', correct: false },
    ],
  },
  {
    content: 'Ngành kinh tế nào là thế mạnh của đồng bằng sông Cửu Long?',
    difficulty: 'MEDIUM',
    explanation: 'Đồng bằng sông Cửu Long là vựa lúa lớn nhất, cũng là vùng sản xuất trái cây và thủy sản lớn nhất Việt Nam.',
    options: [
      { key: 'A', content: 'Khai thác khoáng sản', correct: false },
      { key: 'B', content: 'Trồng lúa, nuôi trồng thủy sản, trái cây', correct: true },
      { key: 'C', content: 'Trồng cây công nghiệp như cà phê, cao su', correct: false },
      { key: 'D', content: 'Chăn nuôi bò sữa', correct: false },
    ],
  },
  {
    content: 'Các dân tộc thiểu số của Việt Nam sinh sống chủ yếu ở đâu?',
    difficulty: 'MEDIUM',
    explanation: 'Các dân tộc thiểu số sinh sống chủ yếu ở vùng núi phía Bắc, Tây Nguyên và một số vùng biên giới.',
    options: [
      { key: 'A', content: 'Ven biển miền Trung', correct: false },
      { key: 'B', content: 'Đồng bằng sông Cửu Long', correct: false },
      { key: 'C', content: 'Vùng núi phía Bắc và Tây Nguyên', correct: true },
      { key: 'D', content: 'Vùng đồng bằng sông Hồng', correct: false },
    ],
  },
  {
    content: 'Núi Trường Sơn chạy theo hướng nào?',
    difficulty: 'MEDIUM',
    explanation: 'Dãy núi Trường Sơn chạy theo hướng Bắc - Nam dọc theo phía Tây của lãnh thổ Việt Nam.',
    options: [
      { key: 'A', content: 'Đông - Tây', correct: false },
      { key: 'B', content: 'Bắc - Nam', correct: true },
      { key: 'C', content: 'Tây Bắc - Đông Nam', correct: false },
      { key: 'D', content: 'Đông Bắc - Tây Nam', correct: false },
    ],
  },
  {
    content: 'Sản phẩm xuất khẩu nào nằm trong top cao của Việt Nam hiện nay?',
    difficulty: 'HARD',
    explanation: 'Việt Nam xuất khẩu gạo hàng đầu thế giới và xuất khẩu điện tử, dệt may lớn.',
    options: [
      { key: 'A', content: 'Kim cương', correct: false },
      { key: 'B', content: 'Gạo', correct: true },
      { key: 'C', content: 'Dầu thô', correct: false },
      { key: 'D', content: 'Vàng', correct: false },
    ],
  },
  {
    content: 'Lễ hội Đền Hùng diễn ra vào ngày nào hàng năm?',
    difficulty: 'MEDIUM',
    explanation: 'Lễ hội Đền Hùng (Giỗ Tổ Hùng Vương) diễn ra vào ngày 10/3 âm lịch hàng năm tại Phú Thọ.',
    options: [
      { key: 'A', content: '10/3 âm lịch', correct: true },
      { key: 'B', content: '3/10 dương lịch', correct: false },
      { key: 'C', content: '15/7 âm lịch', correct: false },
      { key: 'D', content: '1/1 dương lịch', correct: false },
    ],
  },
  {
    content: 'Anh hùng Hai Bà Trưng lãnh đạo khởi nghĩa chống lại triều đại nào?',
    difficulty: 'MEDIUM',
    explanation: 'Hai Bà Trưng (Trưng Trắc và Trưng Nhị) lãnh đạo khởi nghĩa năm 40 SCN chống lại sự đô hộ của nhà Hán (Trung Quốc).',
    options: [
      { key: 'A', content: 'Nhà Minh', correct: false },
      { key: 'B', content: 'Nhà Hán', correct: true },
      { key: 'C', content: 'Nhà Đường', correct: false },
      { key: 'D', content: 'Nhà Tống', correct: false },
    ],
  },
  {
    content: 'Phong trào Đông Du do ai lãnh đạo?',
    difficulty: 'HARD',
    explanation: 'Phong trào Đông Du do Phan Bội Châu tổ chức vào đầu thế kỷ 20, đưa thanh niên Việt Nam sang Nhật Bản học tập.',
    options: [
      { key: 'A', content: 'Phan Châu Trinh', correct: false },
      { key: 'B', content: 'Phan Bội Châu', correct: true },
      { key: 'C', content: 'Nguyễn Tất Thành', correct: false },
      { key: 'D', content: 'Hoàng Hoa Thám', correct: false },
    ],
  },
  {
    content: 'Khi nói "nước ta có hình chữ S" là đang nói về đặc điểm nào?',
    difficulty: 'EASY',
    explanation: 'Lãnh thổ Việt Nam trên bản đồ trông giống hình chữ S, kéo dài từ Bắc xuống Nam.',
    options: [
      { key: 'A', content: 'Diện tích đất nước', correct: false },
      { key: 'B', content: 'Hình dạng lãnh thổ trên bản đồ', correct: true },
      { key: 'C', content: 'Đường biên giới đất liền', correct: false },
      { key: 'D', content: 'Chiều dài bờ biển', correct: false },
    ],
  },
  {
    content: 'Chiều dài bờ biển của Việt Nam là bao nhiêu km?',
    difficulty: 'HARD',
    explanation: 'Việt Nam có đường bờ biển dài khoảng 3 260 km.',
    options: [
      { key: 'A', content: 'Khoảng 1 500 km', correct: false },
      { key: 'B', content: 'Khoảng 3 260 km', correct: true },
      { key: 'C', content: 'Khoảng 5 000 km', correct: false },
      { key: 'D', content: 'Khoảng 2 000 km', correct: false },
    ],
  },
  { content: 'Triều đại phong kiến nào xây dựng Văn Miếu - Quốc Tử Giám ở Hà Nội?', difficulty: 'MEDIUM', explanation: 'Văn Miếu được xây năm 1070 dưới thời vua Lý Thánh Tông; Quốc Tử Giám xây 1076.', options: [{ key: 'A', content: 'Triều Trần', correct: false }, { key: 'B', content: 'Triều Lý', correct: true }, { key: 'C', content: 'Triều Lê', correct: false }, { key: 'D', content: 'Triều Nguyễn', correct: false }] },
  { content: 'Kinh đô Thăng Long được đặt dưới triều đại nào?', difficulty: 'MEDIUM', explanation: 'Vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long năm 1010.', options: [{ key: 'A', content: 'Triều Đinh', correct: false }, { key: 'B', content: 'Triều Lý', correct: true }, { key: 'C', content: 'Triều Trần', correct: false }, { key: 'D', content: 'Triều Lê', correct: false }] },
  { content: 'Chiến thắng Bạch Đằng năm 1288 do ai lãnh đạo chống giặc Mông - Nguyên?', difficulty: 'MEDIUM', explanation: 'Hưng Đạo Đại Vương Trần Quốc Tuấn lãnh đạo trận Bạch Đằng 1288, đánh tan quân Mông - Nguyên lần thứ 3.', options: [{ key: 'A', content: 'Lê Lợi', correct: false }, { key: 'B', content: 'Trần Hưng Đạo', correct: true }, { key: 'C', content: 'Ngô Quyền', correct: false }, { key: 'D', content: 'Đinh Bộ Lĩnh', correct: false }] },
  { content: 'Lê Lợi lãnh đạo khởi nghĩa Lam Sơn chống lại triều đại nào?', difficulty: 'MEDIUM', explanation: 'Lê Lợi lãnh đạo khởi nghĩa Lam Sơn (1418-1427) chống lại sự xâm lược của nhà Minh (Trung Quốc).', options: [{ key: 'A', content: 'Nhà Thanh', correct: false }, { key: 'B', content: 'Nhà Minh', correct: true }, { key: 'C', content: 'Nhà Đường', correct: false }, { key: 'D', content: 'Nhà Hán', correct: false }] },
  { content: 'Nhà Nguyễn thành lập vào năm nào?', difficulty: 'HARD', explanation: 'Nguyễn Ánh thống nhất đất nước và lên ngôi vua năm 1802, lập ra triều Nguyễn.', options: [{ key: 'A', content: '1789', correct: false }, { key: 'B', content: '1802', correct: true }, { key: 'C', content: '1858', correct: false }, { key: 'D', content: '1884', correct: false }] },
  { content: 'Vua Quang Trung đại phá quân Thanh vào dịp Tết nào?', difficulty: 'HARD', explanation: 'Vua Quang Trung (Nguyễn Huệ) đại phá 20 vạn quân Thanh vào dịp Tết Kỷ Dậu 1789.', options: [{ key: 'A', content: 'Tết Mậu Thân 1788', correct: false }, { key: 'B', content: 'Tết Kỷ Dậu 1789', correct: true }, { key: 'C', content: 'Tết Canh Tuất 1790', correct: false }, { key: 'D', content: 'Tết Ất Mùi 1775', correct: false }] },
  { content: 'Ngày Quốc khánh nước CHXHCN Việt Nam là ngày nào?', difficulty: 'EASY', explanation: 'Ngày 2/9/1945, Hồ Chí Minh đọc Tuyên ngôn Độc lập, ngày này trở thành Quốc khánh Việt Nam.', options: [{ key: 'A', content: '30/4', correct: false }, { key: 'B', content: '2/9', correct: true }, { key: 'C', content: '19/8', correct: false }, { key: 'D', content: '7/5', correct: false }] },
  { content: 'Hiệp định Pari 1973 có ý nghĩa gì?', difficulty: 'MEDIUM', explanation: 'Hiệp định Pari buộc Mỹ rút quân khỏi Việt Nam, tạo điều kiện cho miền Nam giải phóng năm 1975.', options: [{ key: 'A', content: 'Kết thúc kháng chiến chống Pháp', correct: false }, { key: 'B', content: 'Buộc Mỹ rút quân, tạo điều kiện giải phóng miền Nam', correct: true }, { key: 'C', content: 'Thống nhất đất nước', correct: false }, { key: 'D', content: 'Bắt đầu Đổi mới', correct: false }] },
  { content: 'Quần đảo nào của Việt Nam nằm ở Biển Đông và đang là chủ quyền của Việt Nam?', difficulty: 'MEDIUM', explanation: 'Quần đảo Hoàng Sa và Trường Sa là hai quần đảo thuộc chủ quyền của Việt Nam ở Biển Đông.', options: [{ key: 'A', content: 'Maluku và Banda', correct: false }, { key: 'B', content: 'Hoàng Sa và Trường Sa', correct: true }, { key: 'C', content: 'Phú Quốc và Côn Đảo', correct: false }, { key: 'D', content: 'Cát Bà và Lý Sơn', correct: false }] },
  { content: 'Đồng bằng nào ở Việt Nam có diện tích lớn nhất?', difficulty: 'EASY', explanation: 'Đồng bằng sông Cửu Long (Nam Bộ) có diện tích khoảng 40 000 km², lớn hơn đồng bằng sông Hồng.', options: [{ key: 'A', content: 'Đồng bằng sông Hồng', correct: false }, { key: 'B', content: 'Đồng bằng sông Cửu Long', correct: true }, { key: 'C', content: 'Đồng bằng miền Trung', correct: false }, { key: 'D', content: 'Đồng bằng Tây Nguyên', correct: false }] },
  { content: 'Cầu Long Biên bắc qua sông nào ở Hà Nội?', difficulty: 'EASY', explanation: 'Cầu Long Biên bắc qua sông Hồng tại Hà Nội, được xây dựng từ năm 1898-1902 thời Pháp.', options: [{ key: 'A', content: 'Sông Đà', correct: false }, { key: 'B', content: 'Sông Hồng', correct: true }, { key: 'C', content: 'Sông Cầu', correct: false }, { key: 'D', content: 'Sông Đuống', correct: false }] },
  { content: 'Vùng kinh tế trọng điểm miền Nam gồm các tỉnh thành nào là trung tâm?', difficulty: 'HARD', explanation: 'Vùng kinh tế trọng điểm phía Nam gồm TP HCM, Bình Dương, Đồng Nai, Bà Rịa-Vũng Tàu là trung tâm.', options: [{ key: 'A', content: 'Hà Nội và Hải Phòng', correct: false }, { key: 'B', content: 'TP HCM, Bình Dương, Đồng Nai', correct: true }, { key: 'C', content: 'Đà Nẵng và Huế', correct: false }, { key: 'D', content: 'Cần Thơ và An Giang', correct: false }] },
  { content: 'Sản lượng lúa gạo Việt Nam đứng vị trí nào trên thế giới về xuất khẩu?', difficulty: 'HARD', explanation: 'Việt Nam thường xuyên nằm trong top 3 nước xuất khẩu gạo lớn nhất thế giới.', options: [{ key: 'A', content: 'Top 10', correct: false }, { key: 'B', content: 'Top 3', correct: true }, { key: 'C', content: 'Đứng đầu', correct: false }, { key: 'D', content: 'Top 20', correct: false }] },
  { content: 'Nhà máy thủy điện lớn nhất Việt Nam hiện nay là?', difficulty: 'HARD', explanation: 'Thủy điện Sơn La (trên sông Đà, tỉnh Sơn La) là nhà máy thủy điện lớn nhất Việt Nam và Đông Nam Á.', options: [{ key: 'A', content: 'Thủy điện Hòa Bình', correct: false }, { key: 'B', content: 'Thủy điện Sơn La', correct: true }, { key: 'C', content: 'Thủy điện Yaly', correct: false }, { key: 'D', content: 'Thủy điện Trị An', correct: false }] },
  { content: 'Thành phố nào được mệnh danh là "thành phố đáng sống" và "thành phố của những cây cầu" ở miền Trung?', difficulty: 'MEDIUM', explanation: 'Đà Nẵng là thành phố đáng sống và nổi tiếng với nhiều cây cầu đẹp như cầu Rồng, cầu Sông Hàn.', options: [{ key: 'A', content: 'Huế', correct: false }, { key: 'B', content: 'Đà Nẵng', correct: true }, { key: 'C', content: 'Quảng Nam', correct: false }, { key: 'D', content: 'Quảng Ngãi', correct: false }] },
  { content: 'Di sản văn hóa thế giới nào ở Huế được UNESCO công nhận?', difficulty: 'MEDIUM', explanation: 'Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản văn hóa thế giới năm 1993.', options: [{ key: 'A', content: 'Phố cổ Hội An', correct: false }, { key: 'B', content: 'Quần thể di tích Cố đô Huế', correct: true }, { key: 'C', content: 'Vịnh Hạ Long', correct: false }, { key: 'D', content: 'Vườn quốc gia Phong Nha', correct: false }] },
  { content: 'Nghề truyền thống nào nổi tiếng ở làng Bát Tràng (Hà Nội)?', difficulty: 'MEDIUM', explanation: 'Làng Bát Tràng nổi tiếng với nghề làm gốm sứ (đồ gốm) truyền thống.', options: [{ key: 'A', content: 'Đúc đồng', correct: false }, { key: 'B', content: 'Làm gốm sứ', correct: true }, { key: 'C', content: 'Dệt lụa', correct: false }, { key: 'D', content: 'Làm nón', correct: false }] },
  { content: 'Lễ hội Chùa Hương diễn ra ở tỉnh nào?', difficulty: 'MEDIUM', explanation: 'Lễ hội Chùa Hương diễn ra ở huyện Mỹ Đức, tỉnh Hà Nam (gần Hà Nội).', options: [{ key: 'A', content: 'Hà Nội', correct: false }, { key: 'B', content: 'Hà Nam', correct: true }, { key: 'C', content: 'Ninh Bình', correct: false }, { key: 'D', content: 'Nam Định', correct: false }] },
  { content: 'Dân số Việt Nam hiện nay xấp xỉ bao nhiêu người?', difficulty: 'HARD', explanation: 'Dân số Việt Nam hiện nay (2024) khoảng 98-99 triệu người.', options: [{ key: 'A', content: 'Khoảng 70 triệu', correct: false }, { key: 'B', content: 'Khoảng 99 triệu', correct: true }, { key: 'C', content: 'Khoảng 120 triệu', correct: false }, { key: 'D', content: 'Khoảng 50 triệu', correct: false }] },
  { content: 'Đâu là con sông dài nhất chỉ chảy trong lãnh thổ Việt Nam (không phải quốc tế)?', difficulty: 'HARD', explanation: 'Sông Đà là phụ lưu lớn nhất của sông Hồng chảy hoàn toàn trong lãnh thổ Việt Nam và Trung Quốc.', options: [{ key: 'A', content: 'Sông Mã', correct: true }, { key: 'B', content: 'Sông Mê Kông', correct: false }, { key: 'C', content: 'Sông Hồng', correct: false }, { key: 'D', content: 'Sông Đà', correct: false }] },
  { content: 'Ngày thành lập Quân đội nhân dân Việt Nam là?', difficulty: 'MEDIUM', explanation: 'Quân đội nhân dân Việt Nam thành lập ngày 22/12/1944.', options: [{ key: 'A', content: '19/8', correct: false }, { key: 'B', content: '22/12', correct: true }, { key: 'C', content: '2/9', correct: false }, { key: 'D', content: '7/5', correct: false }] },
  { content: 'Nước nào là thực dân đô hộ Việt Nam từ năm 1884 đến 1945?', difficulty: 'EASY', explanation: 'Pháp đô hộ Việt Nam từ năm 1884 (ký Hiệp ước Patenôtre) đến Cách mạng tháng 8/1945.', options: [{ key: 'A', content: 'Anh', correct: false }, { key: 'B', content: 'Pháp', correct: true }, { key: 'C', content: 'Mỹ', correct: false }, { key: 'D', content: 'Nhật', correct: false }] },
  { content: 'Địa danh nào ở Việt Nam được mệnh danh là "Nhà bếp" hay "vựa lúa" lớn nhất?', difficulty: 'EASY', explanation: 'Đồng bằng sông Cửu Long được mệnh danh là "vựa lúa" của Việt Nam và của cả thế giới.', options: [{ key: 'A', content: 'Đồng bằng sông Hồng', correct: false }, { key: 'B', content: 'Đồng bằng sông Cửu Long', correct: true }, { key: 'C', content: 'Tây Nguyên', correct: false }, { key: 'D', content: 'Duyên hải miền Trung', correct: false }] },
  { content: 'Hội nghị Genève 1954 chia Việt Nam thành hai miền tại vĩ tuyến 17 với điều kiện gì?', difficulty: 'HARD', explanation: 'Việt Nam tạm thời bị chia đôi tại vĩ tuyến 17, dự định tổ chức tổng tuyển cử thống nhất năm 1956 nhưng không được thực hiện.', options: [{ key: 'A', content: 'Vĩnh viễn chia đôi đất nước', correct: false }, { key: 'B', content: 'Tạm thời chia đôi, sau 2 năm tổ chức tổng tuyển cử', correct: true }, { key: 'C', content: 'Chia cho hai quốc gia khác nhau', correct: false }, { key: 'D', content: 'Chỉ chia về mặt kinh tế', correct: false }] },
  { content: 'Khởi nghĩa nào dưới đây xảy ra sớm nhất trong lịch sử Việt Nam?', difficulty: 'MEDIUM', explanation: 'Khởi nghĩa Hai Bà Trưng năm 40 SCN là sớm nhất trong các khởi nghĩa được liệt kê.', options: [{ key: 'A', content: 'Khởi nghĩa Lam Sơn', correct: false }, { key: 'B', content: 'Khởi nghĩa Hai Bà Trưng', correct: true }, { key: 'C', content: 'Khởi nghĩa Tây Sơn', correct: false }, { key: 'D', content: 'Khởi nghĩa Bà Triệu', correct: false }] },
  { content: 'Diện tích đất liền của Việt Nam là khoảng bao nhiêu km²?', difficulty: 'HARD', explanation: 'Diện tích đất liền Việt Nam khoảng 331 212 km².', options: [{ key: 'A', content: 'Khoảng 200 000 km²', correct: false }, { key: 'B', content: 'Khoảng 331 000 km²', correct: true }, { key: 'C', content: 'Khoảng 500 000 km²', correct: false }, { key: 'D', content: 'Khoảng 100 000 km²', correct: false }] },
  { content: 'Thủ đô Hà Nội mở rộng địa giới hành chính năm nào?', difficulty: 'HARD', explanation: 'Năm 2008, Hà Nội mở rộng địa giới, sáp nhập tỉnh Hà Tây và một số huyện lân cận.', options: [{ key: 'A', content: '2005', correct: false }, { key: 'B', content: '2008', correct: true }, { key: 'C', content: '2010', correct: false }, { key: 'D', content: '2000', correct: false }] },
  { content: 'Đặc sản nổi tiếng của tỉnh Thái Bình là?', difficulty: 'HARD', explanation: 'Thái Bình nổi tiếng với nghề dệt chiếu cói và bánh cuốn làng Kênh.', options: [{ key: 'A', content: 'Bánh cuốn và chiếu cói', correct: true }, { key: 'B', content: 'Phở bò', correct: false }, { key: 'C', content: 'Hủ tiếu', correct: false }, { key: 'D', content: 'Nem cua bể', correct: false }] },
  { content: 'Con đường mòn Hồ Chí Minh trong kháng chiến chống Mỹ có vai trò gì?', difficulty: 'MEDIUM', explanation: 'Đường Trường Sơn (đường mòn HCM) là tuyến đường vận chuyển vũ khí, lương thực từ miền Bắc vào miền Nam để chi viện chiến trường.', options: [{ key: 'A', content: 'Đường dân sinh bình thường', correct: false }, { key: 'B', content: 'Tuyến vận chuyển chi viện từ Bắc vào Nam', correct: true }, { key: 'C', content: 'Đường du lịch', correct: false }, { key: 'D', content: 'Đường thương mại', correct: false }] },
  { content: 'Phong trào "Đồng khởi" 1960 nổ ra mạnh nhất ở tỉnh nào?', difficulty: 'HARD', explanation: 'Phong trào "Đồng khởi" nổ ra đầu tiên và mạnh nhất ở tỉnh Bến Tre năm 1960.', options: [{ key: 'A', content: 'Sài Gòn', correct: false }, { key: 'B', content: 'Bến Tre', correct: true }, { key: 'C', content: 'Quảng Nam', correct: false }, { key: 'D', content: 'Thừa Thiên Huế', correct: false }] },
  { content: 'Sự kiện "Điện Biên Phủ trên không" xảy ra vào năm nào?', difficulty: 'HARD', explanation: '"Điện Biên Phủ trên không" là chiến thắng bắn hạ máy bay B52 của Mỹ trong tháng 12/1972, buộc Mỹ ký Hiệp định Pari.', options: [{ key: 'A', content: '1968', correct: false }, { key: 'B', content: '1972', correct: true }, { key: 'C', content: '1975', correct: false }, { key: 'D', content: '1970', correct: false }] },
  { content: 'Bộ Luật Hồng Đức được ban hành dưới thời vua nào?', difficulty: 'HARD', explanation: 'Bộ Luật Hồng Đức được soạn thảo và hoàn thiện dưới thời vua Lê Thánh Tông (1460-1497).', options: [{ key: 'A', content: 'Lê Thái Tổ', correct: false }, { key: 'B', content: 'Lê Thánh Tông', correct: true }, { key: 'C', content: 'Lê Nhân Tông', correct: false }, { key: 'D', content: 'Lê Hiến Tông', correct: false }] },
  { content: 'Thành phố nào của Việt Nam được mệnh danh là "thành phố đêm không ngủ"?', difficulty: 'MEDIUM', explanation: 'Thành phố Hồ Chí Minh được mệnh danh là "thành phố không ngủ" vì hoạt động kinh tế, thương mại nhộn nhịp suốt đêm.', options: [{ key: 'A', content: 'Hà Nội', correct: false }, { key: 'B', content: 'TP Hồ Chí Minh', correct: true }, { key: 'C', content: 'Đà Nẵng', correct: false }, { key: 'D', content: 'Cần Thơ', correct: false }] },
  { content: 'Dãy núi Hoàng Liên Sơn nằm ở vùng nào của Việt Nam?', difficulty: 'MEDIUM', explanation: 'Dãy núi Hoàng Liên Sơn (Tây Bắc) là dãy núi cao nhất Việt Nam, nơi có đỉnh Phan-xi-păng.', options: [{ key: 'A', content: 'Đông Bắc', correct: false }, { key: 'B', content: 'Tây Bắc', correct: true }, { key: 'C', content: 'Tây Nguyên', correct: false }, { key: 'D', content: 'Miền Trung', correct: false }] },
  { content: 'Nghề truyền thống nổi tiếng ở làng Vạn Phúc (Hà Đông) là?', difficulty: 'MEDIUM', explanation: 'Làng Vạn Phúc (Hà Đông, Hà Nội) nổi tiếng với nghề dệt lụa tơ tằm truyền thống.', options: [{ key: 'A', content: 'Làm gốm', correct: false }, { key: 'B', content: 'Dệt lụa', correct: true }, { key: 'C', content: 'Đúc đồng', correct: false }, { key: 'D', content: 'Sơn mài', correct: false }] },
  { content: 'Tổ chức quốc tế nào mà Việt Nam là thành viên sáng lập ở Đông Nam Á?', difficulty: 'HARD', explanation: 'Việt Nam gia nhập ASEAN năm 1995, không phải thành viên sáng lập. ASEAN thành lập năm 1967 gồm 5 nước: Indonesia, Malaysia, Philippines, Singapore, Thái Lan.', options: [{ key: 'A', content: 'ASEAN (thành viên sáng lập)', correct: false }, { key: 'B', content: 'LHQ (thành viên từ 1977)', correct: true }, { key: 'C', content: 'WTO (thành viên từ 2007)', correct: false }, { key: 'D', content: 'APEC (thành viên từ 1998)', correct: false }] },
  { content: 'Ngành kinh tế nào đóng góp nhiều nhất vào GDP của Việt Nam hiện nay?', difficulty: 'HARD', explanation: 'Công nghiệp và xây dựng đóng góp tỷ trọng lớn nhất vào GDP Việt Nam, vượt qua nông nghiệp và dịch vụ.', options: [{ key: 'A', content: 'Nông nghiệp', correct: false }, { key: 'B', content: 'Công nghiệp và xây dựng', correct: true }, { key: 'C', content: 'Du lịch', correct: false }, { key: 'D', content: 'Thủy sản', correct: false }] },
  { content: 'Sông nào được gọi là "sông mẹ" của Hà Nội?', difficulty: 'EASY', explanation: 'Sông Hồng chảy qua Hà Nội, gắn với lịch sử nghìn năm của Thăng Long - Hà Nội, được gọi là "sông mẹ".', options: [{ key: 'A', content: 'Sông Đáy', correct: false }, { key: 'B', content: 'Sông Hồng', correct: true }, { key: 'C', content: 'Sông Cầu', correct: false }, { key: 'D', content: 'Sông Đà', correct: false }] },
  { content: 'Vùng nào của Việt Nam có diện tích rừng ngập mặn lớn nhất?', difficulty: 'MEDIUM', explanation: 'Đồng bằng sông Cửu Long có diện tích rừng ngập mặn lớn nhất, đặc biệt ở Cà Mau (Mũi Cà Mau).', options: [{ key: 'A', content: 'Đồng bằng sông Hồng', correct: false }, { key: 'B', content: 'Đồng bằng sông Cửu Long', correct: true }, { key: 'C', content: 'Duyên hải Trung Bộ', correct: false }, { key: 'D', content: 'Đông Bắc Bộ', correct: false }] },
  { content: 'Trận chiến nào đánh dấu thắng lợi của nhà Trần lần thứ ba đánh bại quân Nguyên?', difficulty: 'HARD', explanation: 'Trận Bạch Đằng năm 1288 đánh dấu chiến thắng quyết định của nhà Trần lần thứ ba đánh bại quân Nguyên Mông.', options: [{ key: 'A', content: 'Trận Đống Đa', correct: false }, { key: 'B', content: 'Trận Bạch Đằng 1288', correct: true }, { key: 'C', content: 'Trận Chi Lăng', correct: false }, { key: 'D', content: 'Trận Rạch Gầm - Xoài Mút', correct: false }] },
  { content: 'Khí hậu miền Nam Việt Nam có đặc điểm gì?', difficulty: 'EASY', explanation: 'Miền Nam Việt Nam có khí hậu nhiệt đới gió mùa với hai mùa rõ rệt: mùa mưa (từ tháng 5 đến tháng 11) và mùa khô.', options: [{ key: 'A', content: 'Bốn mùa xuân hạ thu đông rõ rệt', correct: false }, { key: 'B', content: 'Hai mùa mưa và khô rõ rệt', correct: true }, { key: 'C', content: 'Quanh năm lạnh giá', correct: false }, { key: 'D', content: 'Khí hậu ôn đới', correct: false }] },
  { content: 'Cuộc kháng chiến chống Mỹ của Việt Nam kéo dài bao nhiêu năm (từ khi có sự can thiệp trực tiếp của Mỹ)?', difficulty: 'HARD', explanation: 'Mỹ bắt đầu can thiệp trực tiếp vào miền Nam Việt Nam từ năm 1965 và chiến tranh kết thúc năm 1975, kéo dài 20 năm nếu tính từ 1955.', options: [{ key: 'A', content: '10 năm', correct: false }, { key: 'B', content: '20 năm (1955-1975)', correct: true }, { key: 'C', content: '5 năm', correct: false }, { key: 'D', content: '30 năm', correct: false }] },
  { content: 'Thành phố nào của Việt Nam được mệnh danh là "thành phố đáng sống"?', difficulty: 'MEDIUM', explanation: 'Đà Nẵng nhiều lần được bình chọn là "thành phố đáng sống" nhất Việt Nam nhờ môi trường sạch đẹp, hạ tầng tốt.', options: [{ key: 'A', content: 'Hà Nội', correct: false }, { key: 'B', content: 'Đà Nẵng', correct: true }, { key: 'C', content: 'TP Hồ Chí Minh', correct: false }, { key: 'D', content: 'Hải Phòng', correct: false }] },
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
