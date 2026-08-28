const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-hdtn';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== KỸ NĂNG GIAO TIẾP =====
  {
    content: 'Kỹ năng nghe tốt bao gồm điều gì?',
    difficulty: 'EASY',
    explanation: 'Nghe tốt là chú ý lắng nghe, không ngắt lời, nhìn vào người nói và phản hồi phù hợp.',
    options: [
      { key: 'A', content: 'Ngắt lời và bàn về chủ đề khác', correct: false },
      { key: 'B', content: 'Chú ý, không ngắt lời, nhìn người nói, phản hồi phù hợp', correct: true },
      { key: 'C', content: 'Vừa nghe vừa làm việc khác', correct: false },
      { key: 'D', content: 'Chỉ nghe phần mình thích', correct: false },
    ],
  },
  {
    content: 'Khi nói chuyện, nói rõ ràng có nghĩa là?',
    difficulty: 'EASY',
    explanation: 'Nói rõ ràng là nói đủ nghe, phát âm chuẩn, không quá nhanh hay quá chậm, dùng từ ngữ phù hợp.',
    options: [
      { key: 'A', content: 'Nói thật to cho mọi người nghe', correct: false },
      { key: 'B', content: 'Nói đủ nghe, phát âm chuẩn, tốc độ vừa phải', correct: true },
      { key: 'C', content: 'Nói thật nhanh cho xong', correct: false },
      { key: 'D', content: 'Nói thầm thì', correct: false },
    ],
  },
  {
    content: 'Tôn trọng người nghe khi nói chuyện thể hiện qua?',
    difficulty: 'EASY',
    explanation: 'Tôn trọng người nghe qua việc: nhìn vào mắt họ, dùng từ lịch sự, không nói xấu người vắng mặt, đúng chủ đề.',
    options: [
      { key: 'A', content: 'Nói mọi điều mình muốn', correct: false },
      { key: 'B', content: 'Nhìn vào mắt, dùng từ lịch sự, đúng chủ đề', correct: true },
      { key: 'C', content: 'Nhìn đi chỗ khác khi nói', correct: false },
      { key: 'D', content: 'Dùng điện thoại trong khi nói', correct: false },
    ],
  },
  {
    content: 'Khi cần xin phép, em nên nói như thế nào?',
    difficulty: 'EASY',
    explanation: 'Khi xin phép cần nói lịch sự, rõ ràng mục đích: "Dạ thưa thầy/cô, con xin phép..."',
    options: [
      { key: 'A', content: 'Cứ làm không cần xin phép', correct: false },
      { key: 'B', content: 'Nói lịch sự, rõ ràng: "Dạ, con xin phép..."', correct: true },
      { key: 'C', content: 'Nhờ bạn khác xin thay', correct: false },
      { key: 'D', content: 'Không cần nói gì', correct: false },
    ],
  },
  {
    content: 'Kỹ năng giao tiếp tốt giúp ích gì trong cuộc sống?',
    difficulty: 'MEDIUM',
    explanation: 'Giao tiếp tốt giúp xây dựng mối quan hệ tốt, giải quyết vấn đề hiệu quả, được người khác tôn trọng và thành công hơn.',
    options: [
      { key: 'A', content: 'Không có tác dụng gì', correct: false },
      { key: 'B', content: 'Xây dựng quan hệ tốt, giải quyết vấn đề, được tôn trọng', correct: true },
      { key: 'C', content: 'Chỉ cần khi đi xin việc', correct: false },
      { key: 'D', content: 'Chỉ dùng trong trường học', correct: false },
    ],
  },
  // ===== KỸ NĂNG HỢP TÁC NHÓM =====
  {
    content: 'Khi làm việc nhóm, nếu ý kiến của em và bạn khác nhau, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Nên trình bày ý kiến bình tĩnh, lắng nghe ý kiến bạn, cùng thảo luận tìm giải pháp tốt nhất cho cả nhóm.',
    options: [
      { key: 'A', content: 'Bắt bạn phải theo ý mình', correct: false },
      { key: 'B', content: 'Trình bày bình tĩnh, lắng nghe, cùng thảo luận', correct: true },
      { key: 'C', content: 'Bỏ ra khỏi nhóm', correct: false },
      { key: 'D', content: 'Im lặng và không nói gì', correct: false },
    ],
  },
  {
    content: 'Ai là người quan trọng nhất trong nhóm làm việc?',
    difficulty: 'MEDIUM',
    explanation: 'Không có ai quan trọng hơn ai. Mỗi thành viên đều có vai trò quan trọng và đóng góp vào thành công chung của nhóm.',
    options: [
      { key: 'A', content: 'Người giỏi nhất', correct: false },
      { key: 'B', content: 'Nhóm trưởng', correct: false },
      { key: 'C', content: 'Mọi thành viên đều quan trọng như nhau', correct: true },
      { key: 'D', content: 'Người nói nhiều nhất', correct: false },
    ],
  },
  {
    content: 'Phân công công việc trong nhóm nên dựa trên yếu tố nào?',
    difficulty: 'MEDIUM',
    explanation: 'Phân công nên dựa trên khả năng và sở trường của từng thành viên để hiệu quả nhất.',
    options: [
      { key: 'A', content: 'Ai ngồi gần thì làm nhiều hơn', correct: false },
      { key: 'B', content: 'Khả năng và sở trường của từng thành viên', correct: true },
      { key: 'C', content: 'Ai nói to hơn thì làm ít hơn', correct: false },
      { key: 'D', content: 'Bốc thăm ngẫu nhiên', correct: false },
    ],
  },
  // ===== PHÒNG TRÁNH TAI NẠN ĐUỐI NƯỚC =====
  {
    content: 'Nguyên tắc quan trọng nhất để phòng tránh đuối nước là?',
    difficulty: 'EASY',
    explanation: 'Không bao giờ bơi một mình, luôn có người lớn giám sát, không bơi ở nơi không an toàn.',
    options: [
      { key: 'A', content: 'Học bơi thật giỏi là đủ', correct: false },
      { key: 'B', content: 'Không bơi một mình, có người lớn giám sát, không bơi nơi nguy hiểm', correct: true },
      { key: 'C', content: 'Mang theo điện thoại khi bơi', correct: false },
      { key: 'D', content: 'Chỉ bơi vào ban ngày', correct: false },
    ],
  },
  {
    content: 'Nơi nào sau đây KHÔNG an toàn để bơi?',
    difficulty: 'EASY',
    explanation: 'Sông, hồ, ao, kênh, suối không được giám sát là những nơi không an toàn để bơi vì có thể có dòng chảy ngầm, vực sâu, địa hình bất thường.',
    options: [
      { key: 'A', content: 'Bể bơi có cứu hộ', correct: false },
      { key: 'B', content: 'Sông, hồ, ao không có người giám sát', correct: true },
      { key: 'C', content: 'Bể bơi trường học', correct: false },
      { key: 'D', content: 'Khu du lịch nước có nhân viên', correct: false },
    ],
  },
  {
    content: 'Khi thấy người đuối nước, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Không nhảy xuống cứu nếu không biết bơi - dễ chết cùng. Phải la to gọi người lớn, gọi 113/115, ném phao hoặc dây cho nạn nhân.',
    options: [
      { key: 'A', content: 'Nhảy xuống cứu ngay dù không biết bơi', correct: false },
      { key: 'B', content: 'La to gọi người lớn, gọi 113/115, ném phao hoặc dây', correct: true },
      { key: 'C', content: 'Chạy đi không làm gì', correct: false },
      { key: 'D', content: 'Quay phim đưa lên mạng', correct: false },
    ],
  },
  {
    content: 'Vì sao không nên bơi sau khi ăn no?',
    difficulty: 'MEDIUM',
    explanation: 'Sau ăn no, máu dồn về dạ dày để tiêu hóa. Bơi lúc này thiếu máu cho cơ bắp, dễ chuột rút và đuối sức.',
    options: [
      { key: 'A', content: 'Vì sẽ làm bẩn nước bơi', correct: false },
      { key: 'B', content: 'Vì thiếu máu cho cơ bắp, dễ chuột rút và đuối sức', correct: true },
      { key: 'C', content: 'Vì không tốt cho dạ dày', correct: false },
      { key: 'D', content: 'Không có lý do gì, vẫn bơi được', correct: false },
    ],
  },
  {
    content: 'Kỹ năng bơi lội giúp ích gì khi gặp tình huống khẩn cấp dưới nước?',
    difficulty: 'MEDIUM',
    explanation: 'Biết bơi giúp tự cứu bản thân khi rơi xuống nước, và có thể hỗ trợ cứu người khác trong các tình huống khẩn cấp dưới nước.',
    options: [
      { key: 'A', content: 'Không giúp ích gì', correct: false },
      { key: 'B', content: 'Giúp tự cứu bản thân và hỗ trợ người khác', correct: true },
      { key: 'C', content: 'Chỉ tốt để thi đấu', correct: false },
      { key: 'D', content: 'Giúp bơi nhanh hơn cá', correct: false },
    ],
  },
  // ===== PHÒNG CHÁY CHỮA CHÁY =====
  {
    content: 'Số điện thoại cứu hỏa (phòng cháy chữa cháy) tại Việt Nam là?',
    difficulty: 'EASY',
    explanation: 'Số điện thoại cứu hỏa tại Việt Nam là 114.',
    options: [
      { key: 'A', content: '113', correct: false },
      { key: 'B', content: '114', correct: true },
      { key: 'C', content: '115', correct: false },
      { key: 'D', content: '119', correct: false },
    ],
  },
  {
    content: 'Khi phát hiện đám cháy, việc đầu tiên cần làm là?',
    difficulty: 'MEDIUM',
    explanation: 'Đầu tiên phải la to "Cháy!" để mọi người biết, rồi gọi 114 và thoát khỏi khu vực nguy hiểm.',
    options: [
      { key: 'A', content: 'Cố gắng tự dập lửa một mình', correct: false },
      { key: 'B', content: 'La to "Cháy!", gọi 114, thoát khỏi khu nguy hiểm', correct: true },
      { key: 'C', content: 'Quay phim trước', correct: false },
      { key: 'D', content: 'Tìm đồ vật quý giá', correct: false },
    ],
  },
  {
    content: 'Khi thoát khỏi đám cháy trong nhà, em nên?',
    difficulty: 'MEDIUM',
    explanation: 'Di chuyển sát sàn nhà (khói lên cao), che mũi miệng bằng khăn ướt, không dùng thang máy, thoát ra nơi thoáng.',
    options: [
      { key: 'A', content: 'Chạy thẳng đứng qua đám khói', correct: false },
      { key: 'B', content: 'Di chuyển sát sàn, che mũi miệng, không dùng thang máy', correct: true },
      { key: 'C', content: 'Trốn trong phòng kín', correct: false },
      { key: 'D', content: 'Dùng thang máy để thoát nhanh', correct: false },
    ],
  },
  {
    content: 'Nguyên nhân phổ biến nhất gây cháy nhà là?',
    difficulty: 'MEDIUM',
    explanation: 'Chập điện (điện ngắn mạch), bếp gas/bếp điện không tắt, nến, hương... là những nguyên nhân phổ biến gây cháy nhà.',
    options: [
      { key: 'A', content: 'Mưa to sấm sét', correct: false },
      { key: 'B', content: 'Chập điện, bếp không tắt, nến/hương bỏ quên', correct: true },
      { key: 'C', content: 'Gió lớn', correct: false },
      { key: 'D', content: 'Trẻ em chơi đùa', correct: false },
    ],
  },
  // ===== AN TOÀN GIAO THÔNG =====
  {
    content: 'Số điện thoại cảnh sát (công an) tại Việt Nam là?',
    difficulty: 'EASY',
    explanation: 'Số điện thoại cảnh sát/công an là 113.',
    options: [
      { key: 'A', content: '114', correct: false },
      { key: 'B', content: '115', correct: false },
      { key: 'C', content: '113', correct: true },
      { key: 'D', content: '116', correct: false },
    ],
  },
  {
    content: 'Khi đi bộ qua đường, em nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Qua đường đúng nơi quy định, nhìn trước nhìn sau, nhìn trái nhìn phải trước khi sang đường.',
    options: [
      { key: 'A', content: 'Chạy thật nhanh qua', correct: false },
      { key: 'B', content: 'Nhìn trái phải, đi đúng vạch dành cho người đi bộ', correct: true },
      { key: 'C', content: 'Nhắm mắt chạy qua', correct: false },
      { key: 'D', content: 'Băng qua đường bất cứ chỗ nào', correct: false },
    ],
  },
  {
    content: 'Trẻ em bao nhiêu tuổi được phép đi xe đạp trên đường phố một mình?',
    difficulty: 'HARD',
    explanation: 'Theo luật Việt Nam, trẻ em từ 12 tuổi trở lên mới được đi xe đạp một mình trên đường.',
    options: [
      { key: 'A', content: '8 tuổi', correct: false },
      { key: 'B', content: '10 tuổi', correct: false },
      { key: 'C', content: '12 tuổi', correct: true },
      { key: 'D', content: '15 tuổi', correct: false },
    ],
  },
  // ===== BẢO VỆ MÔI TRƯỜNG =====
  {
    content: 'Phân loại rác thải có ý nghĩa gì?',
    difficulty: 'EASY',
    explanation: 'Phân loại rác giúp tái chế hiệu quả, giảm lượng rác ra bãi chôn lấp, giảm ô nhiễm môi trường.',
    options: [
      { key: 'A', content: 'Không có ý nghĩa gì', correct: false },
      { key: 'B', content: 'Giúp tái chế hiệu quả, giảm ô nhiễm', correct: true },
      { key: 'C', content: 'Chỉ mất thêm thời gian', correct: false },
      { key: 'D', content: 'Chỉ người lớn mới cần làm', correct: false },
    ],
  },
  {
    content: 'Tại sao không nên xả rác bừa bãi nơi công cộng?',
    difficulty: 'EASY',
    explanation: 'Xả rác nơi công cộng làm ô nhiễm môi trường, mất mỹ quan đô thị, là nơi vi khuẩn sinh sôi và vi phạm pháp luật.',
    options: [
      { key: 'A', content: 'Vì người khác sẽ dọn', correct: false },
      { key: 'B', content: 'Vì gây ô nhiễm, mất vẻ đẹp, sinh vi khuẩn và vi phạm luật', correct: true },
      { key: 'C', content: 'Chỉ vì bị phạt tiền', correct: false },
      { key: 'D', content: 'Không có lý do gì', correct: false },
    ],
  },
  {
    content: 'Hành động nào sau đây giúp bảo vệ môi trường?',
    difficulty: 'EASY',
    explanation: 'Trồng cây xanh là hành động tích cực bảo vệ môi trường, giúp hấp thụ CO2 và tạo ô-xi.',
    options: [
      { key: 'A', content: 'Chặt cây lấy củi', correct: false },
      { key: 'B', content: 'Trồng cây xanh', correct: true },
      { key: 'C', content: 'Đốt rác', correct: false },
      { key: 'D', content: 'Xả nước thải ra sông', correct: false },
    ],
  },
  {
    content: 'Em có thể đóng góp bảo vệ môi trường như thế nào?',
    difficulty: 'EASY',
    explanation: 'Học sinh có thể: không xả rác bừa bãi, tham gia trồng cây, nhắc nhở người khác, tiết kiệm điện nước, dùng túi vải thay túi ni-lông.',
    options: [
      { key: 'A', content: 'Chỉ chờ người lớn làm', correct: false },
      { key: 'B', content: 'Không xả rác, tiết kiệm điện nước, trồng cây', correct: true },
      { key: 'C', content: 'Không cần làm gì', correct: false },
      { key: 'D', content: 'Chỉ cần học giỏi', correct: false },
    ],
  },
  // ===== HOẠT ĐỘNG CỘNG ĐỒNG =====
  {
    content: 'Giúp đỡ người già, người yếu thế thể hiện điều gì?',
    difficulty: 'EASY',
    explanation: 'Giúp đỡ người già, người yếu thế thể hiện lòng nhân ái, tinh thần tương thân tương ái và trách nhiệm với cộng đồng.',
    options: [
      { key: 'A', content: 'Sự kiêu ngạo', correct: false },
      { key: 'B', content: 'Lòng nhân ái và tinh thần tương thân tương ái', correct: true },
      { key: 'C', content: 'Muốn ra vẻ', correct: false },
      { key: 'D', content: 'Không có ý nghĩa gì', correct: false },
    ],
  },
  {
    content: 'Hoạt động tình nguyện ở cộng đồng giúp em phát triển những gì?',
    difficulty: 'MEDIUM',
    explanation: 'Hoạt động tình nguyện giúp phát triển kỹ năng sống, lòng trắc ẩn, tinh thần trách nhiệm và mở rộng các mối quan hệ xã hội.',
    options: [
      { key: 'A', content: 'Không giúp ích gì', correct: false },
      { key: 'B', content: 'Kỹ năng sống, lòng trắc ẩn, trách nhiệm, quan hệ xã hội', correct: true },
      { key: 'C', content: 'Chỉ mất thời gian', correct: false },
      { key: 'D', content: 'Chỉ giúp học giỏi hơn', correct: false },
    ],
  },
  {
    content: 'Khi người cao tuổi cần mang đồ nặng, em nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Nên chủ động hỏi và đề nghị giúp mang đồ - đây là hành động thể hiện lòng kính trọng và nhân ái.',
    options: [
      { key: 'A', content: 'Giả vờ không thấy', correct: false },
      { key: 'B', content: 'Chủ động đề nghị giúp mang đồ', correct: true },
      { key: 'C', content: 'Chờ họ tự làm', correct: false },
      { key: 'D', content: 'Nhờ người khác giúp thay', correct: false },
    ],
  },
  // ===== TRUYỀN THỐNG TRƯỜNG LỚP =====
  {
    content: 'Truyền thống "học sinh giỏi" của trường/lớp có ý nghĩa gì?',
    difficulty: 'MEDIUM',
    explanation: 'Truyền thống học tốt là niềm tự hào chung, tạo động lực để các thế hệ học sinh tiếp theo cố gắng duy trì và phát huy.',
    options: [
      { key: 'A', content: 'Chỉ là danh hiệu trống rỗng', correct: false },
      { key: 'B', content: 'Niềm tự hào, động lực để các thế hệ sau cố gắng', correct: true },
      { key: 'C', content: 'Tạo áp lực không cần thiết', correct: false },
      { key: 'D', content: 'Không có ý nghĩa gì', correct: false },
    ],
  },
  {
    content: 'Em có thể làm gì để xây dựng truyền thống tốt cho lớp học?',
    difficulty: 'MEDIUM',
    explanation: 'Có thể: học tập tốt, đoàn kết giúp đỡ nhau, tham gia hoạt động tập thể, tôn trọng nội quy, làm gương tốt cho bạn bè.',
    options: [
      { key: 'A', content: 'Chỉ lo cho bản thân', correct: false },
      { key: 'B', content: 'Học tốt, đoàn kết, tham gia hoạt động, tôn trọng nội quy', correct: true },
      { key: 'C', content: 'Không cần quan tâm đến lớp', correct: false },
      { key: 'D', content: 'Chỉ chơi với bạn thân', correct: false },
    ],
  },
  {
    content: 'Ngày 20/11 là ngày gì ở Việt Nam?',
    difficulty: 'EASY',
    explanation: 'Ngày 20/11 là Ngày Nhà giáo Việt Nam - ngày tôn vinh những người làm nghề dạy học.',
    options: [
      { key: 'A', content: 'Ngày trẻ em Việt Nam', correct: false },
      { key: 'B', content: 'Ngày Nhà giáo Việt Nam', correct: true },
      { key: 'C', content: 'Ngày môi trường thế giới', correct: false },
      { key: 'D', content: 'Ngày thành lập trường', correct: false },
    ],
  },
  {
    content: 'Hoạt động trải nghiệm có nghĩa là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Hoạt động trải nghiệm là các hoạt động thực tế giúp học sinh áp dụng kiến thức, rèn kỹ năng sống qua trực tiếp làm, tham quan, thực hành.',
    options: [
      { key: 'A', content: 'Chỉ học lý thuyết trong sách', correct: false },
      { key: 'B', content: 'Các hoạt động thực tế áp dụng kiến thức và rèn kỹ năng sống', correct: true },
      { key: 'C', content: 'Không liên quan đến học tập', correct: false },
      { key: 'D', content: 'Chỉ là chơi trò chơi', correct: false },
    ],
  },
  {
    content: 'Kỹ năng sống quan trọng nhất học sinh lớp 5 cần có là?',
    difficulty: 'HARD',
    explanation: 'Kỹ năng sống quan trọng bao gồm: giao tiếp, hợp tác, giải quyết vấn đề, tư duy phản biện, tự quản lý bản thân.',
    options: [
      { key: 'A', content: 'Chỉ cần học giỏi', correct: false },
      { key: 'B', content: 'Giao tiếp, hợp tác, giải quyết vấn đề, tự quản lý bản thân', correct: true },
      { key: 'C', content: 'Chỉ cần biết dùng điện thoại', correct: false },
      { key: 'D', content: 'Chỉ cần vâng lời người lớn', correct: false },
    ],
  },
  {
    content: 'Số điện thoại cấp cứu y tế tại Việt Nam là?',
    difficulty: 'EASY',
    explanation: 'Số điện thoại cấp cứu y tế tại Việt Nam là 115.',
    options: [
      { key: 'A', content: '113', correct: false },
      { key: 'B', content: '114', correct: false },
      { key: 'C', content: '115', correct: true },
      { key: 'D', content: '116', correct: false },
    ],
  },
  {
    content: 'Khi bạn bè bị bắt nạt trực tuyến (cyberbullying), em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Không tham gia vào hành vi bắt nạt, hỗ trợ bạn bị bắt nạt, báo cáo cho phụ huynh, thầy cô hoặc chặn người gây hại.',
    options: [
      { key: 'A', content: 'Chia sẻ nội dung bắt nạt', correct: false },
      { key: 'B', content: 'Hỗ trợ bạn, báo người lớn, không tham gia bắt nạt', correct: true },
      { key: 'C', content: 'Không quan tâm', correct: false },
      { key: 'D', content: 'Bắt nạt ngược lại', correct: false },
    ],
  },
  {
    content: 'Kỹ năng quản lý thời gian giúp học sinh lớp 5 như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Quản lý thời gian giúp cân bằng học tập và vui chơi, không bị áp lực trước khi thi, hoàn thành bài vở đúng hạn.',
    options: [
      { key: 'A', content: 'Không giúp ích gì', correct: false },
      { key: 'B', content: 'Cân bằng học-chơi, hoàn thành bài đúng hạn', correct: true },
      { key: 'C', content: 'Chỉ giúp học giỏi môn Toán', correct: false },
      { key: 'D', content: 'Chỉ cần học giỏi không cần quản lý', correct: false },
    ],
  },
  { content: 'Khi bị lạc ở chỗ đông người, em nên làm gì đầu tiên?', difficulty: 'EASY', explanation: 'Khi bị lạc cần bình tĩnh, đứng yên một chỗ, tìm người lớn đáng tin cậy (bảo vệ, công an) để nhờ giúp đỡ.', options: [{ key: 'A', content: 'Chạy thật nhanh tìm bố mẹ', correct: false }, { key: 'B', content: 'Bình tĩnh, đứng yên và nhờ người lớn giúp đỡ', correct: true }, { key: 'C', content: 'Khóc to một mình', correct: false }, { key: 'D', content: 'Theo người lạ tốt bụng', correct: false }] },
  { content: 'Kỹ năng lắng nghe tích cực là gì?', difficulty: 'MEDIUM', explanation: 'Lắng nghe tích cực là chú ý đến người nói, nhìn vào mắt họ, không ngắt lời và phản hồi để thể hiện mình đang hiểu.', options: [{ key: 'A', content: 'Nghe trong khi làm việc khác', correct: false }, { key: 'B', content: 'Chú ý, không ngắt lời và phản hồi phù hợp', correct: true }, { key: 'C', content: 'Chờ người kia nói xong rồi không phản hồi', correct: false }, { key: 'D', content: 'Nghe và gật đầu liên tục dù không hiểu', correct: false }] },
  { content: 'Để hoạt động nhóm hiệu quả, vai trò của trưởng nhóm là gì?', difficulty: 'MEDIUM', explanation: 'Trưởng nhóm có vai trò phân công việc phù hợp với từng thành viên, điều phối, động viên và đảm bảo mọi người hợp tác.', options: [{ key: 'A', content: 'Làm tất cả mọi việc một mình', correct: false }, { key: 'B', content: 'Phân công, điều phối và động viên nhóm', correct: true }, { key: 'C', content: 'Chỉ đứng nhìn người khác làm', correct: false }, { key: 'D', content: 'Làm phần khó nhất và bỏ việc dễ cho người khác', correct: false }] },
  { content: 'Cách nào giúp em giải quyết xung đột với bạn bè hiệu quả?', difficulty: 'MEDIUM', explanation: 'Giải quyết xung đột tốt nhất bằng cách bình tĩnh trao đổi, tìm hiểu quan điểm của nhau và cùng đồng thuận giải pháp.', options: [{ key: 'A', content: 'Cãi vã cho đến khi bạn nhượng bộ', correct: false }, { key: 'B', content: 'Bình tĩnh trao đổi và tìm giải pháp cùng đồng thuận', correct: true }, { key: 'C', content: 'Im lặng tránh mặt mãi mãi', correct: false }, { key: 'D', content: 'Nhờ nhiều bạn khác về phía mình', correct: false }] },
  { content: 'Hoạt động tình nguyện giúp học sinh phát triển điều gì?', difficulty: 'MEDIUM', explanation: 'Hoạt động tình nguyện giúp phát triển lòng nhân ái, kỹ năng xã hội, ý thức cộng đồng và tạo ý nghĩa cho cuộc sống.', options: [{ key: 'A', content: 'Chỉ tốn thời gian', correct: false }, { key: 'B', content: 'Phát triển lòng nhân ái và ý thức cộng đồng', correct: true }, { key: 'C', content: 'Không có ích lợi', correct: false }, { key: 'D', content: 'Chỉ có lợi cho người được giúp', correct: false }] },
  { content: 'Khi gặp khó khăn trong học tập, em nên làm gì?', difficulty: 'EASY', explanation: 'Khi gặp khó khăn, nên chủ động hỏi thầy cô, nhờ bạn giải thích hoặc tìm tài liệu bổ sung, không bỏ cuộc.', options: [{ key: 'A', content: 'Bỏ học môn đó', correct: false }, { key: 'B', content: 'Hỏi thầy cô, nhờ bạn và tìm tài liệu bổ sung', correct: true }, { key: 'C', content: 'Giả vờ hiểu và sao chép bài', correct: false }, { key: 'D', content: 'Chờ thầy cô tự giải thích lại', correct: false }] },
  { content: 'Kỹ năng tự bảo vệ bản thân quan trọng nhất khi gặp nguy hiểm là gì?', difficulty: 'MEDIUM', explanation: 'Kỹ năng quan trọng nhất là nhận biết nguy hiểm sớm, tránh xa tình huống nguy hiểm và kêu gọi người lớn giúp đỡ kịp thời.', options: [{ key: 'A', content: 'Đánh nhau để tự vệ', correct: false }, { key: 'B', content: 'Nhận biết nguy hiểm, tránh xa và kêu gọi người lớn', correct: true }, { key: 'C', content: 'Im lặng chịu đựng', correct: false }, { key: 'D', content: 'Chạy mà không báo ai', correct: false }] },
  { content: 'Cách giới thiệu bản thân lần đầu gặp ai đó lịch sự là gì?', difficulty: 'EASY', explanation: 'Tự giới thiệu tên, mỉm cười, bắt tay (với người lớn) hoặc chào hỏi thân thiện là cách giới thiệu bản thân lịch sự.', options: [{ key: 'A', content: 'Không nói gì, chờ người kia hỏi', correct: false }, { key: 'B', content: 'Mỉm cười, nói tên và chào thân thiện', correct: true }, { key: 'C', content: 'Nói thật nhanh rồi đi', correct: false }, { key: 'D', content: 'Liệt kê ngay những thành tích của mình', correct: false }] },
  { content: 'Thế nào là "văn hóa ứng xử" khi sử dụng mạng xã hội?', difficulty: 'MEDIUM', explanation: 'Văn hóa ứng xử trên mạng là không bình luận tiêu cực, không phát tán tin sai, tôn trọng người khác như trong cuộc sống thực.', options: [{ key: 'A', content: 'Được nói gì cũng được vì ẩn danh', correct: false }, { key: 'B', content: 'Tôn trọng người khác, không bình luận tiêu cực', correct: true }, { key: 'C', content: 'Chỉ cần không vi phạm luật', correct: false }, { key: 'D', content: 'Chia sẻ mọi thứ thoải mái', correct: false }] },
  { content: 'Khi tham gia lễ hội truyền thống của địa phương, học sinh nên có thái độ gì?', difficulty: 'EASY', explanation: 'Khi tham gia lễ hội truyền thống cần trân trọng, tìm hiểu ý nghĩa, giữ gìn trật tự và bảo vệ di sản văn hóa địa phương.', options: [{ key: 'A', content: 'Thờ ơ vì lễ hội cũ kỹ', correct: false }, { key: 'B', content: 'Trân trọng, tìm hiểu ý nghĩa và giữ gìn di sản', correct: true }, { key: 'C', content: 'Chỉ đi để chụp ảnh', correct: false }, { key: 'D', content: 'Không tham gia', correct: false }] },
  { content: 'Học sinh lớp 5 có thể tham gia hoạt động nào để giúp ích cho trường lớp?', difficulty: 'EASY', explanation: 'Học sinh có thể tham gia trực tuần, giữ gìn vệ sinh, trồng cây, tham gia hoạt động từ thiện và hỗ trợ bạn học yếu.', options: [{ key: 'A', content: 'Không cần làm gì', correct: false }, { key: 'B', content: 'Trực tuần, vệ sinh trường lớp, hỗ trợ bạn yếu', correct: true }, { key: 'C', content: 'Chỉ học thật giỏi là đủ', correct: false }, { key: 'D', content: 'Chỉ khi thầy cô yêu cầu', correct: false }] },
  { content: 'Điều gì giúp duy trì tình bạn lâu dài?', difficulty: 'MEDIUM', explanation: 'Tin tưởng, trung thực, tôn trọng lẫn nhau, cùng chia sẻ vui buồn và hỗ trợ nhau là nền tảng của tình bạn bền vững.', options: [{ key: 'A', content: 'Luôn cho nhau đồ vật', correct: false }, { key: 'B', content: 'Tin tưởng, trung thực và tôn trọng lẫn nhau', correct: true }, { key: 'C', content: 'Chỉ chơi với nhau khi có lợi', correct: false }, { key: 'D', content: 'Không bao giờ tranh cãi', correct: false }] },
  { content: 'Kỹ năng đặt mục tiêu học tập giúp ích gì?', difficulty: 'MEDIUM', explanation: 'Đặt mục tiêu cụ thể giúp tập trung nỗ lực, có định hướng rõ ràng, tạo động lực học tập và dễ đánh giá tiến bộ.', options: [{ key: 'A', content: 'Tạo áp lực không cần thiết', correct: false }, { key: 'B', content: 'Giúp tập trung, có định hướng và tạo động lực', correct: true }, { key: 'C', content: 'Không có ích gì', correct: false }, { key: 'D', content: 'Chỉ phù hợp với học sinh giỏi', correct: false }] },
  { content: 'Hoạt động nào giúp em kết nối với truyền thống gia đình?', difficulty: 'EASY', explanation: 'Nghe ông bà, cha mẹ kể chuyện về gia đình, tham gia các nghi lễ truyền thống, thăm mộ tổ tiên giúp kết nối với truyền thống gia đình.', options: [{ key: 'A', content: 'Chỉ xem phim về lịch sử', correct: false }, { key: 'B', content: 'Nghe ông bà kể chuyện, tham gia nghi lễ gia đình', correct: true }, { key: 'C', content: 'Tìm hiểu lịch sử nước ngoài', correct: false }, { key: 'D', content: 'Không cần thiết', correct: false }] },
  { content: 'Vì sao cần có kỹ năng từ chối trước áp lực từ bạn bè?', difficulty: 'MEDIUM', explanation: 'Kỹ năng từ chối giúp bảo vệ bản thân khỏi những điều không tốt (hút thuốc, bỏ học, đánh nhau...) khi bạn bè rủ rê.', options: [{ key: 'A', content: 'Để trở thành kẻ cô đơn', correct: false }, { key: 'B', content: 'Bảo vệ bản thân khỏi những hành vi tiêu cực', correct: true }, { key: 'C', content: 'Vì không thích bạn bè', correct: false }, { key: 'D', content: 'Không cần thiết', correct: false }] },
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
