const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  console.log('Tạo câu hỏi Lịch sử & Địa lí lớp 5...');

  // =============================================
  // TOPIC 1: Địa lí Việt Nam (20 questions)
  // =============================================

  // EASY (8)
  await p.question.create({
    data: {
      content: 'Đồng bằng sông Hồng nằm ở vùng nào của Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Hồng nằm ở vùng Bắc Bộ, là đồng bằng lớn thứ hai Việt Nam.',
      options: {
        create: [
          { content: 'Bắc Bộ', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Trung Bộ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Nam Bộ', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Tây Nguyên', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đồng bằng sông Cửu Long còn được gọi là gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Cửu Long còn được gọi là đồng bằng Nam Bộ, là đồng bằng lớn nhất Việt Nam.',
      options: {
        create: [
          { content: 'Đồng bằng Nam Bộ', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Đồng bằng Bắc Bộ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Đồng bằng Trung Bộ', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Đồng bằng Tây Nguyên', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đỉnh Fansipan thuộc dãy núi nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Fansipan thuộc dãy Hoàng Liên Sơn, là đỉnh núi cao nhất Đông Dương.',
      options: {
        create: [
          { content: 'Hoàng Liên Sơn', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Trường Sơn', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Con Voi', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Bạch Mã', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sông nào dài nhất chảy qua miền Bắc Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Sông Hồng là con sông lớn nhất miền Bắc, bắt nguồn từ Trung Quốc chảy ra Vịnh Bắc Bộ.',
      options: {
        create: [
          { content: 'Sông Hồng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Sông Đà', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Sông Mã', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sông Lô', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tây Nguyên là vùng đất nổi tiếng với loại cây công nghiệp nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Tây Nguyên nổi tiếng với cà phê, Việt Nam là nước xuất khẩu cà phê lớn thứ hai thế giới.',
      options: {
        create: [
          { content: 'Cà phê', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Lúa nước', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Mía đường', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Bông vải', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sông Mê Kông khi chảy vào Việt Nam được gọi là sông gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Sông Mê Kông khi chảy vào Việt Nam được gọi là sông Cửu Long vì chia thành 9 nhánh đổ ra biển.',
      options: {
        create: [
          { content: 'Sông Cửu Long', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Sông Đồng Nai', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Sông Tiền', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sông Hậu', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam có đường bờ biển dài khoảng bao nhiêu ki-lô-mét?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đường bờ biển Việt Nam dài hơn 3 200 km, từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang).',
      options: {
        create: [
          { content: 'Hơn 3 200 km', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Khoảng 1 500 km', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Khoảng 2 000 km', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Hơn 5 000 km', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Địa hình Việt Nam chủ yếu là loại địa hình nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Khoảng 3/4 diện tích Việt Nam là đồi núi, còn lại là đồng bằng ven biển và các cao nguyên.',
      options: {
        create: [
          { content: 'Đồi núi', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Đồng bằng', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Cao nguyên', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sa mạc', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // MEDIUM (8)
  await p.question.create({
    data: {
      content: 'Đỉnh Fansipan cao bao nhiêu mét so với mực nước biển?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đỉnh Fansipan cao 3 143 m so với mực nước biển, là đỉnh núi cao nhất Việt Nam và Đông Dương.',
      options: {
        create: [
          { content: '3 143 m', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '2 598 m', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '3 750 m', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '2 900 m', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đồng bằng sông Cửu Long được bồi đắp bởi phù sa của sông nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Cửu Long được bồi đắp bởi phù sa của sông Mê Kông (sông Cửu Long).',
      options: {
        create: [
          { content: 'Sông Mê Kông (Cửu Long)', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Sông Hồng', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Sông Đồng Nai', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sông Mã', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Khí hậu Việt Nam thuộc kiểu khí hậu nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam có khí hậu nhiệt đới gió mùa, nóng ẩm, mưa nhiều, có sự phân hóa theo vùng.',
      options: {
        create: [
          { content: 'Nhiệt đới gió mùa', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Ôn đới hải dương', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Khô hạn sa mạc', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Cận cực', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vùng Tây Nguyên có đặc điểm địa hình như thế nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Tây Nguyên là vùng cao nguyên rộng lớn, gồm các cao nguyên xếp tầng: Kon Tum, Gia Lai, Đắk Lắk, Lâm Đồng.',
      options: {
        create: [
          { content: 'Cao nguyên xếp tầng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Đồng bằng thấp trũng', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Núi cao hiểm trở', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Bờ biển dài', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tài nguyên khoáng sản nào quan trọng nhất ở vùng Đông Bắc Bộ?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Vùng Đông Bắc Bộ có trữ lượng than đá lớn nhất Việt Nam, tập trung ở Quảng Ninh.',
      options: {
        create: [
          { content: 'Than đá', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Dầu mỏ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Bô-xít', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Vàng', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vùng nào của Việt Nam có mật độ dân số cao nhất?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Hồng có mật độ dân số cao nhất Việt Nam, do đất đai màu mỡ và lịch sử phát triển lâu đời.',
      options: {
        create: [
          { content: 'Đồng bằng sông Hồng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Đồng bằng sông Cửu Long', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Tây Nguyên', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Tây Bắc', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Dãy Hoàng Liên Sơn nằm ở vùng nào của Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Dãy Hoàng Liên Sơn nằm ở vùng Tây Bắc Bộ, là dãy núi cao và hùng vĩ nhất Việt Nam.',
      options: {
        create: [
          { content: 'Tây Bắc Bộ', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Đông Bắc Bộ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Bắc Trung Bộ', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Nam Trung Bộ', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đồng bằng sông Hồng được bồi đắp bởi phù sa của những sông nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Hồng được bồi đắp bởi phù sa của sông Hồng và sông Thái Bình.',
      options: {
        create: [
          { content: 'Sông Hồng và sông Thái Bình', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Sông Hồng và sông Mã', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Sông Đà và sông Lô', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sông Hồng và sông Đà', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // HARD (4)
  await p.question.create({
    data: {
      content: 'Vùng đồng bằng ven biển miền Trung có đặc điểm nào sau đây là ĐÚNG?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng ven biển miền Trung nhỏ hẹp, bị chia cắt bởi các dãy núi ngang, đất kém màu mỡ hơn hai đồng bằng lớn.',
      options: {
        create: [
          { content: 'Nhỏ hẹp, bị chia cắt bởi các dãy núi ngang', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Rộng lớn, bằng phẳng như đồng bằng Nam Bộ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Có nhiều ao hồ và vùng trũng', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Được bồi đắp bởi sông Mê Kông', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'So sánh diện tích của Đồng bằng sông Cửu Long và Đồng bằng sông Hồng, kết luận nào ĐÚNG?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đồng bằng sông Cửu Long khoảng 40 000 km², lớn hơn Đồng bằng sông Hồng (khoảng 15 000 km²).',
      options: {
        create: [
          { content: 'Đồng bằng sông Cửu Long rộng hơn gấp khoảng 3 lần', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Hai đồng bằng có diện tích gần bằng nhau', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Đồng bằng sông Hồng rộng hơn', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Đồng bằng sông Cửu Long nhỏ hơn', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tại sao vùng Đồng bằng sông Cửu Long được gọi là "vựa lúa" của cả nước?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'ĐBSCL có đất phù sa màu mỡ, khí hậu nóng ẩm, mạng lưới sông ngòi dày đặc, cung cấp nước tưới tiêu dồi dào, sản xuất trên 50% sản lượng lúa cả nước.',
      options: {
        create: [
          { content: 'Đất phù sa màu mỡ, khí hậu thuận lợi, nguồn nước dồi dào, sản xuất trên 50% lúa cả nước', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Dân số đông nên trồng nhiều lúa', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Có nhiều máy móc hiện đại hơn các vùng khác', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Được Nhà nước đầu tư nhiều nhất', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Dãy Trường Sơn có vai trò gì quan trọng đối với khí hậu Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0j000v97l0udobjmba',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Dãy Trường Sơn là ranh giới khí hậu Đông – Tây, chắn gió mùa Đông Nam, tạo ra sự khác biệt khí hậu giữa hai sườn núi.',
      options: {
        create: [
          { content: 'Là ranh giới khí hậu Đông – Tây, tạo sự khác biệt giữa hai sườn', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ có tác dụng trang trí cảnh quan', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Cung cấp nguồn nước cho sông Hồng', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Ngăn cách Việt Nam với Trung Quốc', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // =============================================
  // TOPIC 2: Lịch sử Việt Nam thời kì hiện đại (20 questions)
  // =============================================

  // EASY (8)
  await p.question.create({
    data: {
      content: 'Cách mạng tháng Tám thành công vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Cách mạng tháng Tám năm 1945 thành công, lật đổ ách thống trị của Pháp và Nhật, giành lại độc lập cho đất nước.',
      options: {
        create: [
          { content: '1945', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1954', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1975', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1930', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chiến thắng Điện Biên Phủ ngày 7-5-1954 kết thúc cuộc kháng chiến chống Pháp của nhân dân Việt Nam.',
      options: {
        create: [
          { content: '1954', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1945', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1968', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1975', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Ai là người đọc Tuyên ngôn Độc lập ngày 2-9-1945?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2-9-1945, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
      options: {
        create: [
          { content: 'Hồ Chí Minh', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Võ Nguyên Giáp', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Trường Chinh', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Phạm Văn Đồng', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đại tướng Võ Nguyên Giáp nổi tiếng với chiến thắng lịch sử nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đại tướng Võ Nguyên Giáp là Tổng tư lệnh chiến dịch Điện Biên Phủ năm 1954, đánh bại thực dân Pháp.',
      options: {
        create: [
          { content: 'Điện Biên Phủ 1954', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Cách mạng tháng Tám 1945', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Tổng tiến công Tết Mậu Thân 1968', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chiến dịch Hồ Chí Minh 1975', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chiến dịch Hồ Chí Minh kết thúc vào ngày nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chiến dịch Hồ Chí Minh kết thúc ngày 30-4-1975 với việc giải phóng Sài Gòn, thống nhất đất nước.',
      options: {
        create: [
          { content: '30-4-1975', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '2-9-1945', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '7-5-1954', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '27-1-1973', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Hiệp định Paris về Việt Nam được ký kết vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Hiệp định Paris được ký ngày 27-1-1973, buộc Mỹ rút quân khỏi miền Nam Việt Nam.',
      options: {
        create: [
          { content: '1973', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1954', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1975', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1968', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam thống nhất về mặt nhà nước vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Tháng 7-1976, Quốc hội thống nhất bầu ra Quốc hội chung, đổi tên nước thành Cộng hòa xã hội chủ nghĩa Việt Nam.',
      options: {
        create: [
          { content: '1976', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1975', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1977', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1973', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Cuộc Tổng tiến công Tết Mậu Thân diễn ra vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Cuộc Tổng tiến công Tết Mậu Thân diễn ra năm 1968, đánh vào các thành phố, thị xã miền Nam, làm lung lay ý chí xâm lược của Mỹ.',
      options: {
        create: [
          { content: '1968', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1965', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1972', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1973', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // MEDIUM (8)
  await p.question.create({
    data: {
      content: 'Chiến thắng "Điện Biên Phủ trên không" diễn ra vào thời gian nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chiến thắng "Điện Biên Phủ trên không" diễn ra tháng 12-1972, quân dân Hà Nội bắn rơi nhiều máy bay B-52 của Mỹ.',
      options: {
        create: [
          { content: 'Tháng 12-1972', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Tháng 3-1954', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Tháng 1-1968', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Tháng 4-1975', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sau chiến thắng Điện Biên Phủ 1954, Việt Nam bị chia cắt ở vĩ tuyến bao nhiêu?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Hiệp định Giơ-ne-vơ (1954) chia đôi Việt Nam tạm thời tại vĩ tuyến 17, với ranh giới là sông Bến Hải.',
      options: {
        create: [
          { content: 'Vĩ tuyến 17', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Vĩ tuyến 16', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Vĩ tuyến 18', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Vĩ tuyến 20', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tuyên ngôn Độc lập 2-9-1945 được đọc tại đâu?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Tuyên ngôn Độc lập được đọc tại Quảng trường Ba Đình, Hà Nội trước hàng chục vạn đồng bào.',
      options: {
        create: [
          { content: 'Quảng trường Ba Đình, Hà Nội', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Cột cờ Hà Nội', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Phủ Chủ tịch, Hà Nội', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Quảng trường Đông Kinh Nghĩa Thục', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chiến dịch nào đã giải phóng Sài Gòn ngày 30-4-1975?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chiến dịch Hồ Chí Minh (từ 26-4 đến 30-4-1975) đã giải phóng Sài Gòn, kết thúc chiến tranh.',
      options: {
        create: [
          { content: 'Chiến dịch Hồ Chí Minh', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chiến dịch Tây Nguyên', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chiến dịch Huế – Đà Nẵng', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chiến dịch Điện Biên Phủ', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Hiệp định Paris năm 1973 có ý nghĩa gì với Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Hiệp định Paris buộc Mỹ phải rút hết quân khỏi miền Nam Việt Nam, tạo điều kiện cho cuộc tổng tiến công 1975.',
      options: {
        create: [
          { content: 'Mỹ rút quân khỏi miền Nam Việt Nam', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Việt Nam thống nhất ngay lập tức', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Pháp trở lại Việt Nam', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chia cắt Việt Nam vĩnh viễn', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Hồ Chí Minh sinh năm bao nhiêu?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chủ tịch Hồ Chí Minh sinh ngày 19-5-1890 tại Kim Liên, Nam Đàn, Nghệ An.',
      options: {
        create: [
          { content: '1890', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1885', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1895', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1900', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Nước Việt Nam Dân chủ Cộng hòa được thành lập vào ngày nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Ngày 2-9-1945, Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
      options: {
        create: [
          { content: '2-9-1945', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '19-8-1945', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1-1-1946', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '7-5-1954', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Mục tiêu của cuộc Tổng tiến công Tết Mậu Thân 1968 là gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Tổng tiến công Tết Mậu Thân nhằm tấn công các thành phố, thị xã miền Nam, làm lung lay ý chí xâm lược của Mỹ và chính quyền Sài Gòn.',
      options: {
        create: [
          { content: 'Làm lung lay ý chí xâm lược của Mỹ, buộc Mỹ đàm phán', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Giải phóng hoàn toàn miền Nam', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chiếm giữ Sài Gòn lâu dài', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Kết thúc chiến tranh ngay lập tức', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // HARD (4)
  await p.question.create({
    data: {
      content: 'Điều gì đã buộc Mỹ phải ký Hiệp định Paris năm 1973?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Chiến thắng Điện Biên Phủ trên không (12-1972) đã đánh bại cuộc tập kích B-52, cùng áp lực quốc tế và phong trào phản chiến trong nước buộc Mỹ ký Hiệp định Paris.',
      options: {
        create: [
          { content: 'Chiến thắng Điện Biên Phủ trên không và áp lực quốc tế', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Quân Mỹ tự nguyện rút lui', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Liên Xô và Trung Quốc can thiệp quân sự', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chính phủ Sài Gòn yêu cầu Mỹ rút quân', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sắp xếp theo thứ tự thời gian: (1) Điện Biên Phủ, (2) Cách mạng tháng Tám, (3) Chiến dịch Hồ Chí Minh, (4) Hiệp định Paris',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Thứ tự: Cách mạng tháng Tám 1945 → Điện Biên Phủ 1954 → Hiệp định Paris 1973 → Chiến dịch Hồ Chí Minh 1975.',
      options: {
        create: [
          { content: '2 → 1 → 4 → 3', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1 → 2 → 3 → 4', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '2 → 1 → 3 → 4', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1 → 2 → 4 → 3', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chiến thắng Điện Biên Phủ 1954 có ý nghĩa lịch sử nào sau đây là ĐẦY ĐỦ và CHÍNH XÁC nhất?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Điện Biên Phủ kết thúc kháng chiến chống Pháp, buộc Pháp ký Hiệp định Giơ-ne-vơ, rút quân về nước, miền Bắc hoàn toàn giải phóng.',
      options: {
        create: [
          { content: 'Kết thúc kháng chiến chống Pháp, buộc Pháp ký Hiệp định Giơ-ne-vơ, miền Bắc giải phóng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Thống nhất đất nước ngay lập tức', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ là một trận đánh lớn, không ảnh hưởng đến chiến tranh', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Buộc Mỹ rút quân khỏi miền Nam', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vì sao ngày 30-4-1975 được gọi là ngày giải phóng hoàn toàn miền Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0p000x97l0e1orisgg',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Ngày 30-4-1975, xe tăng quân giải phóng tiến vào Dinh Độc Lập, chính quyền Sài Gòn đầu hàng vô điều kiện, chấm dứt chiến tranh, thống nhất đất nước.',
      options: {
        create: [
          { content: 'Chính quyền Sài Gòn đầu hàng vô điều kiện, chấm dứt hoàn toàn chiến tranh', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Mỹ tuyên bố ngừng bắn', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Quân giải phóng chiếm được Đà Nẵng', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Hiệp định hòa bình được ký kết', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // =============================================
  // TOPIC 3: Việt Nam trong khu vực và thế giới (20 questions)
  // =============================================

  // EASY (8)
  await p.question.create({
    data: {
      content: 'Việt Nam gia nhập ASEAN vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam gia nhập ASEAN ngày 28-7-1995, trở thành thành viên thứ 7 của tổ chức này.',
      options: {
        create: [
          { content: '1995', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1986', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '2000', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '2007', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'ASEAN hiện có bao nhiêu quốc gia thành viên?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'ASEAN có 10 quốc gia thành viên, bao gồm Việt Nam, Indonesia, Malaysia, Philippines, Singapore, Thái Lan, Brunei, Myanmar, Lào, Campuchia.',
      options: {
        create: [
          { content: '10 quốc gia', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '7 quốc gia', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '8 quốc gia', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '12 quốc gia', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chính sách Đổi mới của Việt Nam được thực hiện từ năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đại hội Đảng lần thứ VI năm 1986 đề ra chính sách Đổi mới, mở cửa hội nhập kinh tế quốc tế.',
      options: {
        create: [
          { content: '1986', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1975', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1990', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1995', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO) vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam chính thức gia nhập WTO ngày 11-1-2007, trở thành thành viên thứ 150 của tổ chức này.',
      options: {
        create: [
          { content: '2007', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '2000', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1995', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '2010', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'SEA Games là đại hội thể thao của khu vực nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'SEA Games (Southeast Asian Games) là Đại hội thể thao Đông Nam Á, tổ chức 2 năm một lần.',
      options: {
        create: [
          { content: 'Đông Nam Á', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Châu Á – Thái Bình Dương', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Toàn thế giới', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Đông Á', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'ASEAN là viết tắt của tên tổ chức nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'ASEAN là Hiệp hội các Quốc gia Đông Nam Á (Association of Southeast Asian Nations), thành lập năm 1967.',
      options: {
        create: [
          { content: 'Hiệp hội các Quốc gia Đông Nam Á', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Liên minh kinh tế Đông Nam Á', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Tổ chức hợp tác Châu Á', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Hiệp ước an ninh Đông Nam Á', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sông Mê Kông chảy qua mấy quốc gia ở Đông Nam Á?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Sông Mê Kông chảy qua 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
      options: {
        create: [
          { content: '6 quốc gia', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '4 quốc gia', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '5 quốc gia', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '7 quốc gia', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Sau Đổi mới 1986, kinh tế Việt Nam có sự thay đổi nào đáng kể nhất?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Sau Đổi mới, Việt Nam chuyển từ kinh tế bao cấp sang kinh tế thị trường, mở cửa thu hút đầu tư nước ngoài, GDP tăng trưởng nhanh.',
      options: {
        create: [
          { content: 'Chuyển sang kinh tế thị trường, mở cửa hội nhập', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Tăng cường kinh tế tập trung bao cấp', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Đóng cửa với nền kinh tế thế giới', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ phát triển nông nghiệp', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // MEDIUM (8)
  await p.question.create({
    data: {
      content: 'Ủy ban sông Mê Kông được thành lập nhằm mục đích gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Ủy ban sông Mê Kông (MRC) được thành lập để hợp tác quản lý, sử dụng bền vững nguồn nước sông Mê Kông giữa các quốc gia trong khu vực.',
      options: {
        create: [
          { content: 'Hợp tác quản lý và sử dụng bền vững nguồn nước sông Mê Kông', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Xây dựng đập thủy điện chung', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Kiểm soát biên giới giữa các nước', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Phát triển du lịch sông Mê Kông', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam lần đầu tiên tổ chức SEA Games vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam lần đầu đăng cai tổ chức SEA Games 22 vào năm 2003 tại Hà Nội và Thành phố Hồ Chí Minh.',
      options: {
        create: [
          { content: '2003', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1995', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '2007', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '2010', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Mục tiêu chính của ASEAN khi thành lập là gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'ASEAN được thành lập nhằm thúc đẩy hợp tác kinh tế, văn hóa, xã hội và duy trì hòa bình, ổn định trong khu vực Đông Nam Á.',
      options: {
        create: [
          { content: 'Thúc đẩy hợp tác kinh tế và duy trì hòa bình trong khu vực', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Thành lập quân đội chung', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chống lại các cường quốc bên ngoài', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Thống nhất tiền tệ chung', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tham gia WTO mang lại lợi ích gì cho Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Gia nhập WTO giúp Việt Nam mở rộng thị trường xuất khẩu, thu hút đầu tư nước ngoài, thúc đẩy kinh tế phát triển.',
      options: {
        create: [
          { content: 'Mở rộng thị trường xuất khẩu và thu hút đầu tư nước ngoài', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Được miễn nợ quốc tế', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Nhận viện trợ quân sự từ các nước', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Tự do di chuyển công dân sang các nước thành viên', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Trong hợp tác Mê Kông, Việt Nam đóng vai trò gì?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam là nước ở hạ lưu sông Mê Kông, vừa hưởng lợi từ nguồn nước, vừa chịu ảnh hưởng của các hoạt động phía thượng nguồn, nên tích cực tham gia hợp tác.',
      options: {
        create: [
          { content: 'Nước hạ lưu, tích cực tham gia hợp tác quản lý nguồn nước', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Nước thượng nguồn, kiểm soát lưu lượng nước', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Không tham gia hợp tác Mê Kông', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ quan tâm đến khai thác thủy sản', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Đổi mới 1986 có tác động như thế nào đến quan hệ quốc tế của Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Đổi mới giúp Việt Nam bình thường hóa quan hệ với nhiều nước, gia nhập ASEAN (1995), bình thường hóa với Mỹ (1995), gia nhập WTO (2007).',
      options: {
        create: [
          { content: 'Mở ra quan hệ với nhiều nước, hội nhập quốc tế sâu rộng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Khiến Việt Nam bị cô lập hơn', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ cải thiện quan hệ với các nước xã hội chủ nghĩa', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Không ảnh hưởng đến quan hệ quốc tế', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'ASEAN được thành lập vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'ASEAN được thành lập ngày 8-8-1967 tại Bangkok, Thái Lan, ban đầu gồm 5 thành viên sáng lập.',
      options: {
        create: [
          { content: '1967', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1975', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '1984', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '1990', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam xuất khẩu mặt hàng nông sản nào đứng nhất hoặc nhì thế giới?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam là nước xuất khẩu gạo và cà phê hàng đầu thế giới. Gạo xuất khẩu đứng thứ 3, cà phê robusta đứng nhất thế giới.',
      options: {
        create: [
          { content: 'Gạo và cà phê', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Lúa mì và ngô', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Đường và muối', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chè và bông vải', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // HARD (4)
  await p.question.create({
    data: {
      content: 'Tại sao việc gia nhập ASEAN năm 1995 có ý nghĩa quan trọng với Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Gia nhập ASEAN giúp Việt Nam phá vỡ thế bao vây cô lập, mở rộng quan hệ với khu vực và thế giới, thúc đẩy hợp tác kinh tế, thương mại, văn hóa.',
      options: {
        create: [
          { content: 'Phá vỡ thế bao vây cô lập, mở rộng hợp tác khu vực và quốc tế', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Được bảo vệ quân sự bởi các nước thành viên', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Nhận được viện trợ kinh tế lớn từ ASEAN', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Sáp nhập lãnh thổ với các nước ASEAN', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Hội nhập quốc tế mang lại thách thức nào cho Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Hội nhập tạo ra cơ hội nhưng cũng đặt ra thách thức về cạnh tranh kinh tế, bảo vệ văn hóa bản sắc dân tộc, và giữ vững chủ quyền trong bối cảnh toàn cầu hóa.',
      options: {
        create: [
          { content: 'Cạnh tranh kinh tế gay gắt và nguy cơ mai một bản sắc văn hóa', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Mất đi ngôn ngữ tiếng Việt', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Phải chia sẻ lãnh thổ với các nước khác', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Bị kiểm soát bởi tổ chức quốc tế', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'So sánh trước và sau Đổi mới 1986, điều nào phản ánh ĐÚNG nhất sự thay đổi của Việt Nam?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Trước Đổi mới, Việt Nam còn trong tình trạng khó khăn, bị bao vây cô lập; sau Đổi mới, kinh tế tăng trưởng, hội nhập sâu rộng, đời sống người dân cải thiện rõ rệt.',
      options: {
        create: [
          { content: 'Từ kinh tế bao cấp, bị cô lập sang kinh tế thị trường, hội nhập quốc tế sâu rộng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Không có sự thay đổi đáng kể', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ thay đổi về chính trị', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Trở nên phụ thuộc hoàn toàn vào nước ngoài', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vì sao hợp tác Mê Kông quan trọng đối với Việt Nam trong bối cảnh hiện nay?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0u000z97l0vu864zkn',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Sông Mê Kông cung cấp nước cho Đồng bằng sông Cửu Long – vựa lúa của Việt Nam. Biến đổi khí hậu và các đập thủy điện thượng nguồn đe dọa nguồn nước, nên hợp tác quốc tế là cần thiết.',
      options: {
        create: [
          { content: 'Bảo vệ nguồn nước cho ĐBSCL trước tác động của đập thượng nguồn và biến đổi khí hậu', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Để kiểm soát toàn bộ dòng sông Mê Kông', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ vì lợi ích giao thông đường thủy', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Để khai thác khoáng sản đáy sông', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // =============================================
  // TOPIC 4: Bảo vệ chủ quyền lãnh thổ (20 questions)
  // =============================================

  // EASY (8)
  await p.question.create({
    data: {
      content: 'Quần đảo Hoàng Sa thuộc chủ quyền của quốc gia nào theo lịch sử?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Quần đảo Hoàng Sa là lãnh thổ thuộc chủ quyền của Việt Nam, Việt Nam có đầy đủ bằng chứng lịch sử và pháp lý để khẳng định chủ quyền.',
      options: {
        create: [
          { content: 'Việt Nam', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Trung Quốc', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Philippines', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Đài Loan', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vùng lãnh hải của Việt Nam rộng bao nhiêu hải lý tính từ đường cơ sở?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Theo UNCLOS 1982, lãnh hải của mỗi quốc gia rộng 12 hải lý tính từ đường cơ sở.',
      options: {
        create: [
          { content: '12 hải lý', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '24 hải lý', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '200 hải lý', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '50 hải lý', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vùng đặc quyền kinh tế của Việt Nam rộng bao nhiêu hải lý?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Vùng đặc quyền kinh tế của mỗi quốc gia ven biển rộng 200 hải lý tính từ đường cơ sở theo UNCLOS 1982.',
      options: {
        create: [
          { content: '200 hải lý', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '12 hải lý', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '100 hải lý', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '300 hải lý', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'UNCLOS là tên viết tắt của công ước nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'UNCLOS là Công ước Liên Hợp Quốc về Luật Biển (United Nations Convention on the Law of the Sea), ký năm 1982.',
      options: {
        create: [
          { content: 'Công ước Liên Hợp Quốc về Luật Biển', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Hiệp ước phòng thủ biển Đông', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Công ước hàng hải quốc tế', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Liên minh hải quân thế giới', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Quần đảo Trường Sa nằm ở vùng biển nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Quần đảo Trường Sa nằm ở Biển Đông, thuộc chủ quyền của Việt Nam.',
      options: {
        create: [
          { content: 'Biển Đông', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Biển Tây', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Thái Bình Dương', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Ấn Độ Dương', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Luật Biển Việt Nam được ban hành vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Luật Biển Việt Nam được Quốc hội thông qua năm 2012, khẳng định chủ quyền và quyền chủ quyền của Việt Nam trên biển.',
      options: {
        create: [
          { content: '2012', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '1982', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '2005', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '2000', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam có chủ quyền đối với những vùng biển và đảo nào sau đây?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam có chủ quyền đối với quần đảo Hoàng Sa, Trường Sa và vùng biển, vùng đặc quyền kinh tế theo quy định của luật pháp quốc tế.',
      options: {
        create: [
          { content: 'Hoàng Sa, Trường Sa và vùng đặc quyền kinh tế 200 hải lý', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ vùng ven bờ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Toàn bộ Biển Đông', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ đảo Phú Quốc và Côn Đảo', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Công ước UNCLOS 1982 có bao nhiêu quốc gia phê chuẩn?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'EASY',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'UNCLOS 1982 được hơn 160 quốc gia phê chuẩn, là cơ sở pháp lý quan trọng để giải quyết tranh chấp biển.',
      options: {
        create: [
          { content: 'Hơn 160 quốc gia', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Khoảng 50 quốc gia', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ 10 quốc gia', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Khoảng 100 quốc gia', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // MEDIUM (8)
  await p.question.create({
    data: {
      content: 'UNCLOS 1982 được ký kết và có hiệu lực vào năm nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'UNCLOS được ký ngày 10-12-1982 tại Montego Bay, Jamaica và có hiệu lực từ ngày 16-11-1994.',
      options: {
        create: [
          { content: 'Ký năm 1982, có hiệu lực năm 1994', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Ký và có hiệu lực ngay năm 1982', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Ký năm 1975, có hiệu lực năm 1982', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Ký năm 1990, có hiệu lực năm 1994', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Vùng tiếp giáp lãnh hải theo UNCLOS rộng bao nhiêu hải lý?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Vùng tiếp giáp lãnh hải rộng 24 hải lý tính từ đường cơ sở (tức là 12 hải lý tiếp theo sau lãnh hải).',
      options: {
        create: [
          { content: '24 hải lý', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: '12 hải lý', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: '200 hải lý', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: '48 hải lý', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Việt Nam bảo vệ chủ quyền biển đảo bằng những biện pháp nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam bảo vệ chủ quyền bằng biện pháp hòa bình: đàm phán ngoại giao, sử dụng luật pháp quốc tế, phát triển kinh tế biển và tăng cường tiềm lực quốc phòng.',
      options: {
        create: [
          { content: 'Đàm phán ngoại giao, sử dụng luật pháp quốc tế, phát triển kinh tế biển', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ sử dụng sức mạnh quân sự', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Nhờ sự can thiệp của các cường quốc', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Từ bỏ mọi tranh chấp', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tại sao quần đảo Hoàng Sa và Trường Sa có tầm quan trọng chiến lược?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Hoàng Sa và Trường Sa nằm ở vị trí chiến lược trên Biển Đông, có nguồn tài nguyên phong phú, là tuyến đường hàng hải quốc tế quan trọng.',
      options: {
        create: [
          { content: 'Vị trí chiến lược, tài nguyên phong phú, tuyến hàng hải quốc tế quan trọng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ có giá trị về du lịch', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Là nơi trú ẩn của ngư dân', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ có ý nghĩa lịch sử', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Luật Biển Việt Nam 2012 được ban hành dựa trên cơ sở nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Luật Biển Việt Nam 2012 được ban hành dựa trên UNCLOS 1982 và thực tiễn lịch sử, khẳng định chủ quyền của Việt Nam đối với Hoàng Sa, Trường Sa.',
      options: {
        create: [
          { content: 'Công ước UNCLOS 1982 và lịch sử chủ quyền của Việt Nam', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Quyết định đơn phương của Việt Nam', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Thỏa thuận với các nước láng giềng', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Nghị quyết của Hội đồng Bảo an Liên Hợp Quốc', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Thềm lục địa của Việt Nam theo UNCLOS 1982 có thể mở rộng đến bao nhiêu hải lý?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Theo UNCLOS, thềm lục địa ít nhất 200 hải lý, có thể mở rộng đến 350 hải lý nếu thềm lục địa tự nhiên vượt ra ngoài giới hạn đó.',
      options: {
        create: [
          { content: 'Đến 350 hải lý', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ 200 hải lý', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Không giới hạn', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ 100 hải lý', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tuyến đường hàng hải quốc tế qua Biển Đông có tầm quan trọng như thế nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Biển Đông là một trong những tuyến hàng hải bận rộn nhất thế giới, chiếm khoảng 1/3 thương mại hàng hải toàn cầu.',
      options: {
        create: [
          { content: 'Chiếm khoảng 1/3 thương mại hàng hải toàn cầu', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ quan trọng với các nước Đông Nam Á', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Ít được sử dụng hơn các tuyến khác', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ dùng cho tàu cá', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Các bằng chứng lịch sử nào chứng minh chủ quyền của Việt Nam đối với Hoàng Sa và Trường Sa?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'MEDIUM',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam có nhiều bằng chứng lịch sử: bản đồ cổ, châu bản triều Nguyễn, văn bản hành chính, hoạt động quản lý liên tục từ thế kỷ XVII.',
      options: {
        create: [
          { content: 'Bản đồ cổ, châu bản triều Nguyễn và văn bản hành chính từ thế kỷ XVII', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ có văn bản sau năm 1975', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Không có bằng chứng lịch sử cụ thể', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Chỉ dựa vào lời khai của ngư dân', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  // HARD (4)
  await p.question.create({
    data: {
      content: 'Phân biệt "lãnh hải" và "vùng đặc quyền kinh tế" theo UNCLOS 1982, điều nào ĐÚNG?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Lãnh hải (12 hải lý) là vùng có chủ quyền hoàn toàn như lãnh thổ; vùng đặc quyền kinh tế (200 hải lý) là quốc gia ven biển có quyền khai thác tài nguyên nhưng tàu nước ngoài được tự do hàng hải.',
      options: {
        create: [
          { content: 'Lãnh hải 12 hải lý có chủ quyền hoàn toàn; EEZ 200 hải lý có quyền khai thác tài nguyên', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Cả hai đều có chủ quyền hoàn toàn như nhau', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Vùng đặc quyền kinh tế có chủ quyền hoàn toàn hơn lãnh hải', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Không có sự khác biệt nào giữa hai vùng', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Tại sao tài nguyên dầu khí ở Biển Đông lại liên quan đến tranh chấp chủ quyền?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Biển Đông được ước tính có trữ lượng dầu khí lớn. Theo UNCLOS, quốc gia có chủ quyền hợp pháp có quyền khai thác tài nguyên trong vùng đặc quyền kinh tế, nên tranh chấp chủ quyền trực tiếp ảnh hưởng đến quyền khai thác.',
      options: {
        create: [
          { content: 'Chủ quyền hợp pháp quyết định quyền khai thác tài nguyên theo UNCLOS', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Dầu khí chỉ thuộc về nước khai thác trước', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Tài nguyên biển thuộc về tất cả các nước cùng nhau', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Dầu khí không liên quan đến chủ quyền lãnh thổ', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Chiến lược bảo vệ chủ quyền biển đảo của Việt Nam hiện nay dựa trên nguyên tắc nào?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Việt Nam kiên trì nguyên tắc giải quyết tranh chấp bằng biện pháp hòa bình trên cơ sở luật pháp quốc tế (UNCLOS 1982), kết hợp phát triển kinh tế biển và tăng cường tiềm lực quốc phòng.',
      options: {
        create: [
          { content: 'Giải quyết hòa bình theo luật pháp quốc tế, kết hợp phát triển kinh tế và quốc phòng', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Chỉ dùng sức mạnh quân sự để bảo vệ', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Nhờ các nước lớn bảo vệ thay', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Từ bỏ các vùng đang tranh chấp', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  await p.question.create({
    data: {
      content: 'Nếu một nước vi phạm vùng đặc quyền kinh tế 200 hải lý của Việt Nam, Việt Nam có thể làm gì theo luật pháp quốc tế?',
      subjectId: 'sub-lichsu-dialy',
      gradeId: 'grade-5',
      topicId: 'cmt5s5b0z001197l0alv4z0w0',
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: 'Theo UNCLOS, Việt Nam có quyền phản đối ngoại giao, đưa vụ việc ra các cơ quan tài phán quốc tế (như Tòa ITLOS, Tòa Trọng tài), và thực thi quyền chủ quyền trong EEZ.',
      options: {
        create: [
          { content: 'Phản đối ngoại giao và đưa ra cơ quan tài phán quốc tế theo UNCLOS', isCorrect: true, optionKey: 'A', sortOrder: 0 },
          { content: 'Phải chấp nhận vì không có công cụ pháp lý', isCorrect: false, optionKey: 'B', sortOrder: 1 },
          { content: 'Chỉ có thể phản đối bằng sức mạnh quân sự', isCorrect: false, optionKey: 'C', sortOrder: 2 },
          { content: 'Cần xin phép Liên Hợp Quốc trước khi hành động', isCorrect: false, optionKey: 'D', sortOrder: 3 },
        ],
      },
    },
  });

  console.log('Hoàn thành!');
}

main().catch(console.error).finally(() => p.$disconnect());
