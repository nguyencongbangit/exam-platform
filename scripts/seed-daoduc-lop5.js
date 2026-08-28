const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-daoduc';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== EM LÀ HỌC SINH LỚP 5 =====
  {
    content: 'Học sinh lớp 5 là học sinh lớn nhất trường tiểu học. Điều đó có nghĩa là?',
    difficulty: 'EASY',
    explanation: 'Học sinh lớp 5 cần có tinh thần trách nhiệm cao, gương mẫu cho các em nhỏ, tích cực tham gia các hoạt động của trường.',
    options: [
      { key: 'A', content: 'Được quyền làm gì cũng được', correct: false },
      { key: 'B', content: 'Cần gương mẫu, có trách nhiệm hơn', correct: true },
      { key: 'C', content: 'Không cần học nữa', correct: false },
      { key: 'D', content: 'Có thể bắt nạt các em nhỏ', correct: false },
    ],
  },
  {
    content: 'Bạn Lan thường xuyên giúp đỡ các bạn lớp dưới học bài và dọn dẹp sân trường. Hành động của Lan thể hiện điều gì?',
    difficulty: 'EASY',
    explanation: 'Hành động của Lan thể hiện tinh thần trách nhiệm, gương mẫu của học sinh lớp 5.',
    options: [
      { key: 'A', content: 'Sự kiêu ngạo', correct: false },
      { key: 'B', content: 'Tinh thần trách nhiệm và gương mẫu', correct: true },
      { key: 'C', content: 'Sự lười biếng', correct: false },
      { key: 'D', content: 'Sự ích kỷ', correct: false },
    ],
  },
  {
    content: 'Để xứng đáng là học sinh lớp 5, em cần làm gì?',
    difficulty: 'EASY',
    explanation: 'Học sinh lớp 5 cần học tốt, rèn luyện đạo đức, giúp đỡ bạn bè và các em nhỏ, tham gia các hoạt động của trường.',
    options: [
      { key: 'A', content: 'Chỉ cần học giỏi', correct: false },
      { key: 'B', content: 'Học tốt, rèn đạo đức, giúp đỡ mọi người', correct: true },
      { key: 'C', content: 'Chỉ cần vui chơi', correct: false },
      { key: 'D', content: 'Không cần làm gì thêm', correct: false },
    ],
  },
  // ===== CÓ CHÍ THÌ NÊN =====
  {
    content: 'Câu tục ngữ "Có chí thì nên" muốn khuyên chúng ta điều gì?',
    difficulty: 'EASY',
    explanation: '"Có chí thì nên" nghĩa là người có ý chí quyết tâm, kiên trì thì sẽ đạt được mục tiêu.',
    options: [
      { key: 'A', content: 'Cần có nhiều tiền', correct: false },
      { key: 'B', content: 'Cần có ý chí, kiên trì thì sẽ thành công', correct: true },
      { key: 'C', content: 'Cần phải thông minh', correct: false },
      { key: 'D', content: 'Cần có bạn bè', correct: false },
    ],
  },
  {
    content: 'Bạn Minh học toán rất kém. Bạn quyết tâm luyện tập mỗi ngày và sau 3 tháng đã đạt điểm 9. Điều này thể hiện?',
    difficulty: 'EASY',
    explanation: 'Bạn Minh đã thể hiện ý chí kiên trì, không bỏ cuộc dù gặp khó khăn.',
    options: [
      { key: 'A', content: 'Bạn Minh may mắn', correct: false },
      { key: 'B', content: 'Ý chí kiên trì và không bỏ cuộc', correct: true },
      { key: 'C', content: 'Bạn Minh có năng khiếu toán', correct: false },
      { key: 'D', content: 'Thầy cô dạy giỏi', correct: false },
    ],
  },
  {
    content: 'Khi gặp bài toán khó không giải được, em nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Khi gặp khó khăn, cần bình tĩnh, suy nghĩ thêm, tìm cách khác hoặc nhờ thầy cô, bạn bè hướng dẫn, không bỏ cuộc.',
    options: [
      { key: 'A', content: 'Bỏ không làm', correct: false },
      { key: 'B', content: 'Bình tĩnh suy nghĩ, nhờ hướng dẫn, không bỏ cuộc', correct: true },
      { key: 'C', content: 'Chép bài của bạn', correct: false },
      { key: 'D', content: 'Khóc và than thở', correct: false },
    ],
  },
  // ===== NHỚ ƠN TỔ TIÊN =====
  {
    content: 'Ngày Giỗ Tổ Hùng Vương được tổ chức vào ngày nào hàng năm?',
    difficulty: 'MEDIUM',
    explanation: 'Ngày Giỗ Tổ Hùng Vương là ngày 10/3 âm lịch hàng năm.',
    options: [
      { key: 'A', content: '1/1 âm lịch', correct: false },
      { key: 'B', content: '10/3 âm lịch', correct: true },
      { key: 'C', content: '15/7 âm lịch', correct: false },
      { key: 'D', content: '2/9 dương lịch', correct: false },
    ],
  },
  {
    content: 'Việc tổ chức giỗ tổ tiên, ông bà thể hiện điều gì?',
    difficulty: 'EASY',
    explanation: 'Việc tổ chức giỗ thể hiện lòng biết ơn, tưởng nhớ đến tổ tiên, ông bà đã khuất theo truyền thống "Uống nước nhớ nguồn".',
    options: [
      { key: 'A', content: 'Mê tín dị đoan', correct: false },
      { key: 'B', content: 'Lòng biết ơn và nhớ đến tổ tiên', correct: true },
      { key: 'C', content: 'Tốn kém lãng phí', correct: false },
      { key: 'D', content: 'Thói quen không cần thiết', correct: false },
    ],
  },
  {
    content: 'Em có thể thể hiện lòng biết ơn với tổ tiên bằng cách nào?',
    difficulty: 'EASY',
    explanation: 'Có thể biết ơn tổ tiên bằng cách giữ gìn truyền thống văn hóa, học tập tốt, xây dựng đất nước, thăm viếng mộ phần tổ tiên.',
    options: [
      { key: 'A', content: 'Không cần làm gì', correct: false },
      { key: 'B', content: 'Giữ gìn truyền thống, học tốt, xây dựng đất nước', correct: true },
      { key: 'C', content: 'Chỉ đốt vàng mã', correct: false },
      { key: 'D', content: 'Bỏ các phong tục cũ', correct: false },
    ],
  },
  // ===== TÌNH BẠN =====
  {
    content: 'Bạn thật sự là người bạn tốt khi?',
    difficulty: 'EASY',
    explanation: 'Bạn tốt là người chia sẻ vui buồn, giúp đỡ khi khó khăn, thành thật, không phải người chỉ chơi cùng khi vui.',
    options: [
      { key: 'A', content: 'Chỉ chơi cùng khi vui, bỏ đi khi khó khăn', correct: false },
      { key: 'B', content: 'Chia sẻ vui buồn, giúp đỡ và thành thật', correct: true },
      { key: 'C', content: 'Luôn đồng ý với mọi điều bạn nói', correct: false },
      { key: 'D', content: 'Cho bạn chép bài khi kiểm tra', correct: false },
    ],
  },
  {
    content: 'Khi bạn bè mắc lỗi, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cần thành thật, nhẹ nhàng góp ý cho bạn, không nên nói xấu sau lưng hay bao che cho lỗi lầm của bạn.',
    options: [
      { key: 'A', content: 'Mặc kệ, không liên quan', correct: false },
      { key: 'B', content: 'Thành thật nhẹ nhàng góp ý cho bạn', correct: true },
      { key: 'C', content: 'Kể cho cả lớp nghe', correct: false },
      { key: 'D', content: 'Bao che cho bạn mọi lúc', correct: false },
    ],
  },
  {
    content: 'Tình bạn đẹp dựa trên nền tảng nào?',
    difficulty: 'EASY',
    explanation: 'Tình bạn đẹp dựa trên sự chân thành, tôn trọng lẫn nhau, giúp đỡ nhau cùng tiến bộ.',
    options: [
      { key: 'A', content: 'Cùng nhà giàu', correct: false },
      { key: 'B', content: 'Chân thành, tôn trọng, giúp đỡ nhau', correct: true },
      { key: 'C', content: 'Cùng sở thích chơi game', correct: false },
      { key: 'D', content: 'Ở gần nhau', correct: false },
    ],
  },
  // ===== KÍNH GIÀ YÊU TRẺ =====
  {
    content: 'Truyền thống "kính già yêu trẻ" của người Việt Nam có ý nghĩa gì?',
    difficulty: 'EASY',
    explanation: 'Đây là truyền thống tốt đẹp: kính trọng người cao tuổi và thương yêu, bảo vệ trẻ em.',
    options: [
      { key: 'A', content: 'Chỉ giúp đỡ người già, không cần quan tâm trẻ em', correct: false },
      { key: 'B', content: 'Kính trọng người cao tuổi và thương yêu bảo vệ trẻ em', correct: true },
      { key: 'C', content: 'Không cần tôn trọng ai', correct: false },
      { key: 'D', content: 'Chỉ yêu trẻ em, không quan tâm người già', correct: false },
    ],
  },
  {
    content: 'Khi đi xe buýt, thấy một cụ già không có chỗ ngồi, em nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Nhường chỗ ngồi cho cụ già là hành động thể hiện lòng kính trọng người cao tuổi.',
    options: [
      { key: 'A', content: 'Giả vờ không thấy', correct: false },
      { key: 'B', content: 'Nhường chỗ ngồi cho cụ', correct: true },
      { key: 'C', content: 'Tiếp tục ngồi vì mình lên trước', correct: false },
      { key: 'D', content: 'Nhờ người khác nhường chỗ', correct: false },
    ],
  },
  {
    content: 'Việc giúp em nhỏ qua đường thể hiện điều gì?',
    difficulty: 'EASY',
    explanation: 'Giúp em nhỏ qua đường thể hiện tình yêu thương, bảo vệ trẻ em và tinh thần trách nhiệm.',
    options: [
      { key: 'A', content: 'Muốn ra vẻ tốt', correct: false },
      { key: 'B', content: 'Tình yêu thương và trách nhiệm bảo vệ em nhỏ', correct: true },
      { key: 'C', content: 'Sự tò mò', correct: false },
      { key: 'D', content: 'Không có ý nghĩa gì', correct: false },
    ],
  },
  // ===== BẢO VỆ TÀI NGUYÊN THIÊN NHIÊN =====
  {
    content: 'Tài nguyên thiên nhiên bao gồm những gì?',
    difficulty: 'MEDIUM',
    explanation: 'Tài nguyên thiên nhiên gồm đất đai, rừng, biển, khoáng sản, nguồn nước, không khí, năng lượng mặt trời...',
    options: [
      { key: 'A', content: 'Chỉ có đất đai và rừng', correct: false },
      { key: 'B', content: 'Đất, rừng, biển, khoáng sản, nước, không khí...', correct: true },
      { key: 'C', content: 'Chỉ có tiền và của cải', correct: false },
      { key: 'D', content: 'Nhà máy và xí nghiệp', correct: false },
    ],
  },
  {
    content: 'Tại sao cần bảo vệ tài nguyên thiên nhiên?',
    difficulty: 'EASY',
    explanation: 'Tài nguyên thiên nhiên có giới hạn và cần thời gian dài để phục hồi. Cần bảo vệ để các thế hệ sau có thể sử dụng.',
    options: [
      { key: 'A', content: 'Vì tài nguyên vô tận, không cần tiết kiệm', correct: false },
      { key: 'B', content: 'Vì tài nguyên có giới hạn, cần để lại cho thế hệ sau', correct: true },
      { key: 'C', content: 'Vì nhà nước yêu cầu', correct: false },
      { key: 'D', content: 'Không cần bảo vệ', correct: false },
    ],
  },
  {
    content: 'Hành động nào sau đây giúp bảo vệ tài nguyên nước?',
    difficulty: 'EASY',
    explanation: 'Khóa vòi nước khi không dùng là hành động thiết thực tiết kiệm tài nguyên nước.',
    options: [
      { key: 'A', content: 'Để vòi nước chảy khi đánh răng', correct: false },
      { key: 'B', content: 'Khóa vòi nước khi không sử dụng', correct: true },
      { key: 'C', content: 'Dùng nước thật nhiều', correct: false },
      { key: 'D', content: 'Không cần quan tâm', correct: false },
    ],
  },
  {
    content: 'Việc trồng cây xanh có tác dụng gì với tài nguyên môi trường?',
    difficulty: 'EASY',
    explanation: 'Trồng cây xanh giúp tạo bóng mát, điều hòa không khí, giữ đất, giữ nước, ngăn xói mòn và là lá phổi xanh.',
    options: [
      { key: 'A', content: 'Không có tác dụng gì', correct: false },
      { key: 'B', content: 'Điều hòa không khí, giữ đất nước, tạo lá phổi xanh', correct: true },
      { key: 'C', content: 'Làm đường phố bẩn hơn', correct: false },
      { key: 'D', content: 'Tốn kém không cần thiết', correct: false },
    ],
  },
  // ===== HỢP TÁC =====
  {
    content: 'Hợp tác là gì?',
    difficulty: 'EASY',
    explanation: 'Hợp tác là cùng làm việc với người khác để đạt được mục tiêu chung, chia sẻ công việc và trách nhiệm.',
    options: [
      { key: 'A', content: 'Làm việc một mình', correct: false },
      { key: 'B', content: 'Cùng làm việc để đạt mục tiêu chung', correct: true },
      { key: 'C', content: 'Bắt người khác làm thay', correct: false },
      { key: 'D', content: 'Không cần đến người khác', correct: false },
    ],
  },
  {
    content: 'Khi làm việc nhóm, điều quan trọng nhất là?',
    difficulty: 'MEDIUM',
    explanation: 'Khi làm việc nhóm cần lắng nghe ý kiến mọi người, tôn trọng lẫn nhau, phân công rõ ràng và cùng hoàn thành mục tiêu.',
    options: [
      { key: 'A', content: 'Chỉ một người làm tất cả', correct: false },
      { key: 'B', content: 'Lắng nghe, tôn trọng nhau và cùng hành động', correct: true },
      { key: 'C', content: 'Ai làm nhanh nhất thì thắng', correct: false },
      { key: 'D', content: 'Không cần bàn bạc', correct: false },
    ],
  },
  {
    content: 'Bạn Nam từ chối tham gia nhóm học tập vì cho rằng mình làm một mình tốt hơn. Điều đó cho thấy?',
    difficulty: 'MEDIUM',
    explanation: 'Bạn Nam chưa nhận thức được giá trị của tinh thần hợp tác, làm việc nhóm sẽ đạt kết quả tốt hơn nhờ sức mạnh tập thể.',
    options: [
      { key: 'A', content: 'Bạn Nam rất giỏi', correct: false },
      { key: 'B', content: 'Bạn Nam chưa có tinh thần hợp tác', correct: true },
      { key: 'C', content: 'Bạn Nam đúng', correct: false },
      { key: 'D', content: 'Bạn Nam lười biếng', correct: false },
    ],
  },
  // ===== ỦY BAN NHÂN DÂN XÃ/PHƯỜNG =====
  {
    content: 'Ủy ban nhân dân xã/phường có vai trò gì?',
    difficulty: 'MEDIUM',
    explanation: 'UBND xã/phường là cơ quan hành chính nhà nước ở cấp cơ sở, quản lý mọi mặt của đời sống xã hội tại địa phương.',
    options: [
      { key: 'A', content: 'Chỉ lo việc thu thuế', correct: false },
      { key: 'B', content: 'Quản lý mọi mặt đời sống địa phương', correct: true },
      { key: 'C', content: 'Chỉ dạy học', correct: false },
      { key: 'D', content: 'Chỉ chăm sóc y tế', correct: false },
    ],
  },
  {
    content: 'Khi gia đình em cần đăng ký khai sinh cho em bé, phải đến đâu?',
    difficulty: 'EASY',
    explanation: 'Việc đăng ký khai sinh thực hiện tại UBND xã/phường nơi thường trú.',
    options: [
      { key: 'A', content: 'Bệnh viện', correct: false },
      { key: 'B', content: 'UBND xã/phường', correct: true },
      { key: 'C', content: 'Trường học', correct: false },
      { key: 'D', content: 'Chùa/nhà thờ', correct: false },
    ],
  },
  // ===== AN TOÀN GIAO THÔNG =====
  {
    content: 'Khi đi xe máy hoặc xe đạp điện, người ngồi trên xe phải làm gì?',
    difficulty: 'EASY',
    explanation: 'Đội mũ bảo hiểm là bắt buộc khi tham gia giao thông để bảo vệ đầu trong trường hợp tai nạn.',
    options: [
      { key: 'A', content: 'Không cần làm gì thêm', correct: false },
      { key: 'B', content: 'Đội mũ bảo hiểm', correct: true },
      { key: 'C', content: 'Nghe nhạc', correct: false },
      { key: 'D', content: 'Dùng điện thoại', correct: false },
    ],
  },
  {
    content: 'Đèn giao thông màu đỏ có nghĩa là?',
    difficulty: 'EASY',
    explanation: 'Đèn đỏ nghĩa là DỪNG LẠI, không được đi.',
    options: [
      { key: 'A', content: 'Đi nhanh', correct: false },
      { key: 'B', content: 'Dừng lại', correct: true },
      { key: 'C', content: 'Cẩn thận', correct: false },
      { key: 'D', content: 'Rẽ trái', correct: false },
    ],
  },
  {
    content: 'Đèn giao thông màu xanh có nghĩa là?',
    difficulty: 'EASY',
    explanation: 'Đèn xanh nghĩa là được phép đi.',
    options: [
      { key: 'A', content: 'Dừng lại', correct: false },
      { key: 'B', content: 'Chuẩn bị dừng', correct: false },
      { key: 'C', content: 'Được phép đi', correct: true },
      { key: 'D', content: 'Đi chậm lại', correct: false },
    ],
  },
  {
    content: 'Người đi bộ phải đi ở đâu trên đường phố?',
    difficulty: 'EASY',
    explanation: 'Người đi bộ phải đi trên vỉa hè. Khi qua đường phải đi đúng phần đường dành cho người đi bộ (vạch kẻ sọc ngựa vằn).',
    options: [
      { key: 'A', content: 'Giữa lòng đường', correct: false },
      { key: 'B', content: 'Trên vỉa hè, qua đường ở vạch kẻ dành cho người đi bộ', correct: true },
      { key: 'C', content: 'Phía bên phải lòng đường', correct: false },
      { key: 'D', content: 'Bất cứ chỗ nào cũng được', correct: false },
    ],
  },
  {
    content: 'Vì sao cần đội mũ bảo hiểm khi đi xe máy?',
    difficulty: 'EASY',
    explanation: 'Mũ bảo hiểm bảo vệ đầu (não bộ) trong trường hợp tai nạn, giảm nguy cơ chấn thương sọ não nghiêm trọng.',
    options: [
      { key: 'A', content: 'Vì đẹp hơn', correct: false },
      { key: 'B', content: 'Vì bảo vệ đầu/não khi tai nạn', correct: true },
      { key: 'C', content: 'Vì luật bắt buộc mà không cần thiết', correct: false },
      { key: 'D', content: 'Vì sợ nắng', correct: false },
    ],
  },
  {
    content: 'Hành vi nào là vi phạm an toàn giao thông?',
    difficulty: 'MEDIUM',
    explanation: 'Vượt đèn đỏ là vi phạm luật giao thông, rất nguy hiểm và có thể gây tai nạn nghiêm trọng.',
    options: [
      { key: 'A', content: 'Dừng đèn đỏ', correct: false },
      { key: 'B', content: 'Vượt đèn đỏ', correct: true },
      { key: 'C', content: 'Đi đúng làn đường', correct: false },
      { key: 'D', content: 'Đội mũ bảo hiểm', correct: false },
    ],
  },
  // ===== QUYỀN TRẺ EM =====
  {
    content: 'Quyền nào là quyền cơ bản nhất của trẻ em?',
    difficulty: 'EASY',
    explanation: 'Trẻ em có các quyền cơ bản: quyền được sống, được học tập, được vui chơi, được bảo vệ và được yêu thương.',
    options: [
      { key: 'A', content: 'Quyền được làm bất cứ điều gì', correct: false },
      { key: 'B', content: 'Quyền được sống, học tập, vui chơi, bảo vệ', correct: true },
      { key: 'C', content: 'Quyền không phải đi học', correct: false },
      { key: 'D', content: 'Quyền được mua đồ chơi', correct: false },
    ],
  },
  {
    content: 'Công ước Liên Hợp Quốc về quyền trẻ em được thông qua vào năm nào?',
    difficulty: 'HARD',
    explanation: 'Công ước Liên Hợp Quốc về quyền trẻ em được thông qua năm 1989.',
    options: [
      { key: 'A', content: '1979', correct: false },
      { key: 'B', content: '1989', correct: true },
      { key: 'C', content: '1995', correct: false },
      { key: 'D', content: '2000', correct: false },
    ],
  },
  {
    content: 'Khi trẻ em bị bạo lực hoặc lạm dụng, cần làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cần báo ngay cho người thân, thầy cô hoặc cơ quan có thẩm quyền để được bảo vệ. Số điện thoại đường dây hỗ trợ trẻ em: 111.',
    options: [
      { key: 'A', content: 'Im lặng chịu đựng', correct: false },
      { key: 'B', content: 'Báo ngay cho người thân hoặc gọi đường dây 111', correct: true },
      { key: 'C', content: 'Trả thù lại', correct: false },
      { key: 'D', content: 'Bỏ đi nơi khác', correct: false },
    ],
  },
  {
    content: 'Trẻ em có quyền được học tập. Điều đó có nghĩa là?',
    difficulty: 'EASY',
    explanation: 'Mọi trẻ em đều có quyền được học tập, không ai có thể tước bỏ quyền này. Nhà nước và gia đình có nghĩa vụ đảm bảo quyền học tập.',
    options: [
      { key: 'A', content: 'Chỉ trẻ em nhà giàu mới được học', correct: false },
      { key: 'B', content: 'Mọi trẻ em đều có quyền được học tập', correct: true },
      { key: 'C', content: 'Trẻ em có thể từ chối đi học', correct: false },
      { key: 'D', content: 'Chỉ trẻ em thông minh mới được học', correct: false },
    ],
  },
  {
    content: 'Bổn phận của trẻ em đối với gia đình là?',
    difficulty: 'EASY',
    explanation: 'Bổn phận của trẻ em với gia đình: kính trọng cha mẹ, ông bà; học tập tốt; giúp đỡ gia đình theo khả năng.',
    options: [
      { key: 'A', content: 'Không cần làm gì', correct: false },
      { key: 'B', content: 'Kính trọng cha mẹ, học tốt, giúp đỡ gia đình', correct: true },
      { key: 'C', content: 'Chỉ cần chơi vui', correct: false },
      { key: 'D', content: 'Đòi hỏi nhiều quyền lợi', correct: false },
    ],
  },
  // ===== TỔNG HỢP ĐẠO ĐỨC =====
  {
    content: 'Hành động nào sau đây là việc làm tốt?',
    difficulty: 'EASY',
    explanation: 'Nhặt được ví tiền rơi và trả lại người mất là hành động trung thực, tốt bụng.',
    options: [
      { key: 'A', content: 'Nhặt ví tiền rơi rồi giữ lấy', correct: false },
      { key: 'B', content: 'Nhặt ví tiền rơi và trả lại người mất', correct: true },
      { key: 'C', content: 'Giả vờ không thấy', correct: false },
      { key: 'D', content: 'Đợi xem có ai thấy không', correct: false },
    ],
  },
  {
    content: 'Tính trung thực giúp ích gì cho cuộc sống?',
    difficulty: 'EASY',
    explanation: 'Tính trung thực xây dựng lòng tin với người khác, giúp cuộc sống lành mạnh, được mọi người tôn trọng.',
    options: [
      { key: 'A', content: 'Khiến người khác sợ hãi', correct: false },
      { key: 'B', content: 'Xây dựng lòng tin và được mọi người tôn trọng', correct: true },
      { key: 'C', content: 'Làm người khác tức giận', correct: false },
      { key: 'D', content: 'Không có lợi ích gì', correct: false },
    ],
  },
  {
    content: 'Khi thấy bạn bị bắt nạt, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cần lên tiếng bảo vệ bạn, tìm cách can ngăn hoặc báo với thầy cô, người lớn để được giúp đỡ.',
    options: [
      { key: 'A', content: 'Đứng xem và cổ vũ', correct: false },
      { key: 'B', content: 'Bỏ đi vì không liên quan', correct: false },
      { key: 'C', content: 'Lên tiếng bảo vệ hoặc báo thầy cô', correct: true },
      { key: 'D', content: 'Quay phim đăng lên mạng', correct: false },
    ],
  },
  {
    content: 'Sự khiêm tốn có ý nghĩa gì?',
    difficulty: 'MEDIUM',
    explanation: 'Khiêm tốn giúp chúng ta luôn học hỏi, không tự mãn, được mọi người quý mến và tiếp tục tiến bộ.',
    options: [
      { key: 'A', content: 'Thể hiện sự yếu đuối', correct: false },
      { key: 'B', content: 'Giúp tiếp tục học hỏi và được mọi người quý mến', correct: true },
      { key: 'C', content: 'Không dám nói năng', correct: false },
      { key: 'D', content: 'Luôn nhường nhịn dù mình đúng', correct: false },
    ],
  },
  {
    content: 'Câu nào sau đây thể hiện đúng tinh thần dân chủ trong trường học?',
    difficulty: 'MEDIUM',
    explanation: 'Dân chủ trong trường học thể hiện qua việc học sinh được bày tỏ ý kiến, thầy cô lắng nghe và tôn trọng ý kiến học sinh.',
    options: [
      { key: 'A', content: 'Chỉ thầy cô mới có quyền phát biểu', correct: false },
      { key: 'B', content: 'Học sinh được bày tỏ ý kiến và được thầy cô lắng nghe', correct: true },
      { key: 'C', content: 'Học sinh làm gì cũng không ai phản đối', correct: false },
      { key: 'D', content: 'Mọi quyết định do lớp trưởng đưa ra', correct: false },
    ],
  },
  {
    content: 'Việc nào sau đây giúp bảo vệ môi trường?',
    difficulty: 'EASY',
    explanation: 'Phân loại rác thải là hành động thiết thực giúp bảo vệ môi trường, dễ tái chế và xử lý rác hơn.',
    options: [
      { key: 'A', content: 'Đốt rác tại nhà', correct: false },
      { key: 'B', content: 'Phân loại rác thải', correct: true },
      { key: 'C', content: 'Xả rác ra sông', correct: false },
      { key: 'D', content: 'Không cần quan tâm đến rác', correct: false },
    ],
  },
  {
    content: 'Giá trị nào quan trọng nhất trong cuộc sống con người?',
    difficulty: 'HARD',
    explanation: 'Lòng nhân ái (yêu thương, chia sẻ) là một trong những giá trị đạo đức nền tảng, giúp xã hội tốt đẹp hơn.',
    options: [
      { key: 'A', content: 'Tiền bạc', correct: false },
      { key: 'B', content: 'Danh tiếng', correct: false },
      { key: 'C', content: 'Lòng nhân ái', correct: true },
      { key: 'D', content: 'Quyền lực', correct: false },
    ],
  },
  {
    content: 'Hành vi nào thể hiện sự không tôn trọng người khác?',
    difficulty: 'EASY',
    explanation: 'Ngắt lời khi người khác đang nói là hành vi không lịch sự, không tôn trọng người khác.',
    options: [
      { key: 'A', content: 'Lắng nghe khi người khác nói', correct: false },
      { key: 'B', content: 'Chào hỏi lịch sự', correct: false },
      { key: 'C', content: 'Ngắt lời khi người khác đang nói', correct: true },
      { key: 'D', content: 'Cảm ơn khi được giúp đỡ', correct: false },
    ],
  },
  {
    content: 'Lòng biết ơn (gratitude) thể hiện qua hành động nào?',
    difficulty: 'EASY',
    explanation: 'Nói lời cảm ơn và giúp đỡ lại người đã giúp mình là biểu hiện của lòng biết ơn.',
    options: [
      { key: 'A', content: 'Im lặng nhận sự giúp đỡ', correct: false },
      { key: 'B', content: 'Nói lời cảm ơn và tìm cách giúp lại', correct: true },
      { key: 'C', content: 'Quên đi sự giúp đỡ', correct: false },
      { key: 'D', content: 'Đòi hỏi thêm', correct: false },
    ],
  },
  {
    content: 'Câu "Tiên học lễ, hậu học văn" có ý nghĩa gì?',
    difficulty: 'MEDIUM',
    explanation: 'Câu này có nghĩa là phải học lễ nghĩa (đạo đức, cách ứng xử) trước, rồi mới đến học kiến thức văn hóa.',
    options: [
      { key: 'A', content: 'Phải học văn hóa trước đạo đức', correct: false },
      { key: 'B', content: 'Phải học lễ nghĩa đạo đức trước, rồi mới học kiến thức', correct: true },
      { key: 'C', content: 'Học lễ và văn như nhau', correct: false },
      { key: 'D', content: 'Không cần học lễ', correct: false },
    ],
  },
  {
    content: 'Khi em mắc lỗi, em nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Khi mắc lỗi cần dũng cảm nhận lỗi, xin lỗi và cố gắng sửa chữa, không đổ lỗi cho người khác.',
    options: [
      { key: 'A', content: 'Đổ lỗi cho người khác', correct: false },
      { key: 'B', content: 'Dũng cảm nhận lỗi, xin lỗi và sửa chữa', correct: true },
      { key: 'C', content: 'Im lặng như không có gì', correct: false },
      { key: 'D', content: 'Khóc để thoát khỏi lỗi', correct: false },
    ],
  },
  { content: 'Em nên làm gì khi thấy bạn bị bắt nạt?', difficulty: 'MEDIUM', explanation: 'Khi thấy bạn bị bắt nạt cần bảo vệ bạn, báo cáo với thầy cô hoặc người lớn để giải quyết đúng cách.', options: [{ key: 'A', content: 'Thờ ơ, không quan tâm', correct: false }, { key: 'B', content: 'Bảo vệ bạn và báo với thầy cô', correct: true }, { key: 'C', content: 'Cùng tham gia bắt nạt', correct: false }, { key: 'D', content: 'Bỏ đi nơi khác', correct: false }] },
  { content: 'Thái độ nào thể hiện sự tôn trọng người cao tuổi?', difficulty: 'EASY', explanation: 'Nhường chỗ ngồi cho người cao tuổi trên xe buýt là hành động thể hiện sự kính trọng và quan tâm đúng mực.', options: [{ key: 'A', content: 'Nói chuyện thô lỗ với ông bà', correct: false }, { key: 'B', content: 'Nhường chỗ ngồi cho người già trên xe buýt', correct: true }, { key: 'C', content: 'Không chào hỏi người lớn tuổi', correct: false }, { key: 'D', content: 'Coi thường ý kiến của người già', correct: false }] },
  { content: 'Bảo vệ tài nguyên thiên nhiên có tác dụng gì?', difficulty: 'EASY', explanation: 'Tài nguyên thiên nhiên không vô tận. Bảo vệ tài nguyên giúp đảm bảo điều kiện sống cho các thế hệ tương lai.', options: [{ key: 'A', content: 'Không có tác dụng gì', correct: false }, { key: 'B', content: 'Đảm bảo điều kiện sống cho các thế hệ tương lai', correct: true }, { key: 'C', content: 'Chỉ có lợi cho nhà nước', correct: false }, { key: 'D', content: 'Làm chậm phát triển kinh tế', correct: false }] },
  { content: 'Hành động tiết kiệm điện, nước thể hiện đức tính gì?', difficulty: 'EASY', explanation: 'Tiết kiệm điện nước thể hiện ý thức bảo vệ tài nguyên, trách nhiệm với môi trường và cộng đồng.', options: [{ key: 'A', content: 'Keo kiệt', correct: false }, { key: 'B', content: 'Tiết kiệm và có trách nhiệm với môi trường', correct: true }, { key: 'C', content: 'Lười biếng', correct: false }, { key: 'D', content: 'Ích kỷ', correct: false }] },
  { content: 'Trong lớp học, khi bạn phát biểu, em nên làm gì?', difficulty: 'EASY', explanation: 'Lắng nghe bạn phát biểu, không ngắt lời thể hiện sự tôn trọng và tạo không khí học tập văn minh.', options: [{ key: 'A', content: 'Nói chuyện riêng với bạn bên cạnh', correct: false }, { key: 'B', content: 'Chú ý lắng nghe, không ngắt lời', correct: true }, { key: 'C', content: 'Giơ tay phát biểu cắt ngang', correct: false }, { key: 'D', content: 'Làm việc riêng', correct: false }] },
  { content: 'Vì sao phải giữ gìn vệ sinh trường lớp?', difficulty: 'EASY', explanation: 'Giữ vệ sinh trường lớp tạo môi trường học tập sạch đẹp, bảo vệ sức khỏe và thể hiện ý thức cộng đồng.', options: [{ key: 'A', content: 'Vì thầy cô bắt buộc', correct: false }, { key: 'B', content: 'Tạo môi trường học tập sạch đẹp, bảo vệ sức khỏe', correct: true }, { key: 'C', content: 'Không cần thiết', correct: false }, { key: 'D', content: 'Chỉ vì quy định của trường', correct: false }] },
  { content: 'Trách nhiệm của học sinh đối với môn học là gì?', difficulty: 'EASY', explanation: 'Học sinh có trách nhiệm học tập nghiêm túc, hoàn thành bài tập, tham gia đầy đủ và nỗ lực hết mình.', options: [{ key: 'A', content: 'Chỉ học những môn mình thích', correct: false }, { key: 'B', content: 'Học tập nghiêm túc, hoàn thành bài tập đầy đủ', correct: true }, { key: 'C', content: 'Chờ thầy cô nhắc nhở', correct: false }, { key: 'D', content: 'Sao chép bài của bạn', correct: false }] },
  { content: 'Điều gì là trung thực khi làm bài kiểm tra?', difficulty: 'EASY', explanation: 'Trung thực là tự làm bài theo khả năng của mình, không nhìn bài của bạn hay dùng tài liệu không được phép.', options: [{ key: 'A', content: 'Nhìn bài của bạn ngồi bên', correct: false }, { key: 'B', content: 'Tự làm bài theo khả năng của mình', correct: true }, { key: 'C', content: 'Dùng tài liệu không được phép', correct: false }, { key: 'D', content: 'Nhờ bạn làm thay', correct: false }] },
  { content: 'Vì sao phải giúp đỡ những người có hoàn cảnh khó khăn?', difficulty: 'MEDIUM', explanation: 'Giúp đỡ người khó khăn thể hiện lòng nhân ái, tình người và tinh thần tương thân tương ái - truyền thống đẹp của người Việt.', options: [{ key: 'A', content: 'Để được khen thưởng', correct: false }, { key: 'B', content: 'Vì lòng nhân ái và tình người', correct: true }, { key: 'C', content: 'Vì bị ép buộc', correct: false }, { key: 'D', content: 'Để nổi tiếng', correct: false }] },
  { content: 'Hành động nào thể hiện đạo đức tốt khi tham gia giao thông?', difficulty: 'EASY', explanation: 'Dừng đúng vạch khi đèn đỏ, đội mũ bảo hiểm và tuân theo luật giao thông là hành vi đạo đức đúng đắn.', options: [{ key: 'A', content: 'Vượt đèn đỏ khi vắng người', correct: false }, { key: 'B', content: 'Tuân theo luật giao thông, đội mũ bảo hiểm', correct: true }, { key: 'C', content: 'Đi lên vỉa hè cho nhanh', correct: false }, { key: 'D', content: 'Dùng điện thoại khi lái xe', correct: false }] },
  { content: 'Quyền nào dưới đây là quyền cơ bản của trẻ em?', difficulty: 'MEDIUM', explanation: 'Quyền được học tập là quyền cơ bản của mọi trẻ em, được công nhận trong Công ước Quốc tế về Quyền Trẻ em.', options: [{ key: 'A', content: 'Quyền không đi học nếu không thích', correct: false }, { key: 'B', content: 'Quyền được học tập và phát triển', correct: true }, { key: 'C', content: 'Quyền làm mọi điều mình muốn', correct: false }, { key: 'D', content: 'Quyền không tham gia hoạt động cộng đồng', correct: false }] },
  { content: 'Ngày Quốc tế Thiếu nhi là ngày nào?', difficulty: 'EASY', explanation: 'Ngày Quốc tế Thiếu nhi là ngày 1/6, được tổ chức trên toàn thế giới để kỷ niệm và bảo vệ quyền trẻ em.', options: [{ key: 'A', content: '1/5', correct: false }, { key: 'B', content: '1/6', correct: true }, { key: 'C', content: '2/9', correct: false }, { key: 'D', content: '15/10', correct: false }] },
  { content: 'Nghĩa vụ của học sinh khi tham gia các hoạt động trường lớp là gì?', difficulty: 'MEDIUM', explanation: 'Học sinh có nghĩa vụ tích cực tham gia, đóng góp và hoàn thành tốt các nhiệm vụ được giao trong hoạt động trường lớp.', options: [{ key: 'A', content: 'Chỉ tham gia khi thích', correct: false }, { key: 'B', content: 'Tích cực tham gia và hoàn thành tốt nhiệm vụ', correct: true }, { key: 'C', content: 'Quan sát từ xa', correct: false }, { key: 'D', content: 'Bắt người khác làm thay', correct: false }] },
  { content: 'Khi thấy người bị tai nạn cần làm gì đầu tiên?', difficulty: 'MEDIUM', explanation: 'Khi thấy người bị tai nạn cần gọi cấp cứu ngay (gọi 115), báo cho người lớn, không tự ý di chuyển nạn nhân khi chưa có hướng dẫn.', options: [{ key: 'A', content: 'Bỏ đi vì không liên quan', correct: false }, { key: 'B', content: 'Gọi cấp cứu 115 và báo người lớn', correct: true }, { key: 'C', content: 'Tự cứu chữa mà không gọi ai', correct: false }, { key: 'D', content: 'Chụp ảnh đăng mạng xã hội', correct: false }] },
  { content: 'Vì sao cần kính trọng người lao động?', difficulty: 'MEDIUM', explanation: 'Người lao động tạo ra của cải vật chất, dịch vụ cho xã hội. Kính trọng họ thể hiện nhân cách và lòng biết ơn.', options: [{ key: 'A', content: 'Vì họ có tiền nhiều', correct: false }, { key: 'B', content: 'Vì họ tạo ra của cải vật chất, đóng góp cho xã hội', correct: true }, { key: 'C', content: 'Vì quy định của pháp luật', correct: false }, { key: 'D', content: 'Không cần kính trọng', correct: false }] },
  { content: 'Thế nào là người có lòng dũng cảm?', difficulty: 'MEDIUM', explanation: 'Dũng cảm là dám làm điều đúng, dám nhận lỗi, dám đương đầu với khó khăn dù biết có nguy hiểm hay khó khăn.', options: [{ key: 'A', content: 'Không sợ ai và không nghe ai', correct: false }, { key: 'B', content: 'Dám làm điều đúng, dám nhận lỗi', correct: true }, { key: 'C', content: 'Hay đánh nhau với người khác', correct: false }, { key: 'D', content: 'Luôn làm theo số đông', correct: false }] },
  { content: 'Sự hợp tác trong nhóm có lợi ích gì?', difficulty: 'EASY', explanation: 'Hợp tác giúp công việc hoàn thành nhanh hơn, chất lượng tốt hơn, tạo tinh thần đoàn kết và mỗi người đóng góp thế mạnh riêng.', options: [{ key: 'A', content: 'Chỉ người trưởng nhóm được lợi', correct: false }, { key: 'B', content: 'Công việc nhanh hơn, kết quả tốt hơn', correct: true }, { key: 'C', content: 'Dễ xảy ra xung đột', correct: false }, { key: 'D', content: 'Không có lợi ích gì', correct: false }] },
  { content: 'Khi bất đồng ý kiến với bạn trong nhóm, em nên làm gì?', difficulty: 'MEDIUM', explanation: 'Khi bất đồng ý kiến cần bình tĩnh, lắng nghe, giải thích ý kiến của mình và cùng tìm giải pháp tốt nhất.', options: [{ key: 'A', content: 'Cãi nhau to để thắng', correct: false }, { key: 'B', content: 'Bình tĩnh lắng nghe và cùng thảo luận', correct: true }, { key: 'C', content: 'Bỏ ra khỏi nhóm', correct: false }, { key: 'D', content: 'Im lặng và làm theo ý mình', correct: false }] },
  { content: 'Truyền thống "Uống nước nhớ nguồn" dạy ta điều gì?', difficulty: 'MEDIUM', explanation: '"Uống nước nhớ nguồn" dạy về lòng biết ơn những người đã cống hiến, hy sinh trước đây để có cuộc sống tốt hôm nay.', options: [{ key: 'A', content: 'Cách tiết kiệm nước', correct: false }, { key: 'B', content: 'Biết ơn những người có công với đất nước', correct: true }, { key: 'C', content: 'Uống nước sạch để bảo vệ sức khỏe', correct: false }, { key: 'D', content: 'Quý trọng thiên nhiên', correct: false }] },
  { content: 'Hành động nào thể hiện sự chăm sóc đến cha mẹ?', difficulty: 'EASY', explanation: 'Hỏi thăm sức khỏe, giúp đỡ việc nhà, học giỏi để cha mẹ yên tâm là những việc thể hiện lòng hiếu thảo.', options: [{ key: 'A', content: 'Đòi hỏi mua đồ đắt tiền', correct: false }, { key: 'B', content: 'Hỏi thăm và giúp đỡ việc nhà', correct: true }, { key: 'C', content: 'Không nghe lời cha mẹ', correct: false }, { key: 'D', content: 'Chỉ học khi cha mẹ nhắc', correct: false }] },
  { content: 'Ý nghĩa của ngày 20/11 (Ngày Nhà giáo Việt Nam) là gì?', difficulty: 'EASY', explanation: 'Ngày 20/11 là Ngày Nhà giáo Việt Nam, dịp để học sinh bày tỏ lòng biết ơn và kính trọng thầy cô giáo.', options: [{ key: 'A', content: 'Ngày học sinh nghỉ học', correct: false }, { key: 'B', content: 'Bày tỏ lòng biết ơn thầy cô giáo', correct: true }, { key: 'C', content: 'Kỷ niệm ngày thành lập trường', correct: false }, { key: 'D', content: 'Ngày phụ huynh họp', correct: false }] },
  { content: 'Em nên làm gì khi muốn dùng điện thoại của bố mẹ?', difficulty: 'EASY', explanation: 'Cần xin phép cha mẹ trước khi dùng đồ của người khác. Đây là cách thể hiện sự tôn trọng và biết phép tắc.', options: [{ key: 'A', content: 'Tự lấy dùng mà không hỏi', correct: false }, { key: 'B', content: 'Xin phép bố mẹ trước', correct: true }, { key: 'C', content: 'Chờ bố mẹ không ở nhà rồi lấy', correct: false }, { key: 'D', content: 'Không bao giờ dùng điện thoại', correct: false }] },
  { content: 'Thế nào là sự kiên trì?', difficulty: 'MEDIUM', explanation: 'Kiên trì là tiếp tục cố gắng, không bỏ cuộc dù gặp khó khăn, thất bại. Kiên trì giúp đạt được mục tiêu.', options: [{ key: 'A', content: 'Làm một việc rồi bỏ ngay khi thấy khó', correct: false }, { key: 'B', content: 'Tiếp tục cố gắng dù gặp khó khăn', correct: true }, { key: 'C', content: 'Làm nhanh không cần cẩn thận', correct: false }, { key: 'D', content: 'Chỉ làm việc dễ', correct: false }] },
  { content: 'Để bảo vệ môi trường, học sinh lớp 5 có thể làm gì?', difficulty: 'EASY', explanation: 'Học sinh có thể bảo vệ môi trường bằng cách không xả rác bừa bãi, phân loại rác, tiết kiệm điện nước và trồng cây.', options: [{ key: 'A', content: 'Chờ lớn lên mới làm', correct: false }, { key: 'B', content: 'Không xả rác, phân loại rác, tiết kiệm điện nước', correct: true }, { key: 'C', content: 'Đây là việc của người lớn', correct: false }, { key: 'D', content: 'Chỉ dọn vệ sinh khi có ai nhìn', correct: false }] },
  { content: 'Điều gì thể hiện ý thức tham gia giao thông văn minh?', difficulty: 'MEDIUM', explanation: 'Đi đúng phần đường, tuân thủ đèn tín hiệu, không lấn làn, không dùng điện thoại khi lái xe là hành vi giao thông văn minh.', options: [{ key: 'A', content: 'Bấm còi liên tục', correct: false }, { key: 'B', content: 'Đi đúng phần đường, tuân thủ đèn hiệu', correct: true }, { key: 'C', content: 'Lách qua các xe khác khi kẹt đường', correct: false }, { key: 'D', content: 'Vượt xe ngay khi có thể', correct: false }] },
  { content: 'Khi người lạ cho kẹo hoặc quà và rủ đi theo, em nên làm gì?', difficulty: 'EASY', explanation: 'Không nhận quà và không đi theo người lạ. Hét to, chạy đến nơi có người hoặc gọi ngay cho bố mẹ.', options: [{ key: 'A', content: 'Nhận quà rồi đi theo xem có gì không', correct: false }, { key: 'B', content: 'Từ chối, không đi theo và báo cho người thân', correct: true }, { key: 'C', content: 'Im lặng đi theo để an toàn', correct: false }, { key: 'D', content: 'Nhờ bạn cùng đi', correct: false }] },
  { content: 'Biểu hiện nào của tính tự lập ở học sinh lớp 5?', difficulty: 'MEDIUM', explanation: 'Tự giác học bài, tự chuẩn bị đồ dùng học tập, tự làm việc nhà phù hợp là biểu hiện của tính tự lập.', options: [{ key: 'A', content: 'Nhờ bố mẹ làm hết mọi việc', correct: false }, { key: 'B', content: 'Tự giác học bài và chuẩn bị đồ dùng', correct: true }, { key: 'C', content: 'Không cần làm gì khi ở nhà', correct: false }, { key: 'D', content: 'Chỉ làm việc khi được nhắc', correct: false }] },
  { content: 'Khi nhặt được đồ vật của người khác, em nên làm gì?', difficulty: 'EASY', explanation: 'Nhặt được đồ của người khác cần tìm cách trả lại hoặc nộp lên ban quản lý (trường học, cơ quan) để tìm người mất.', options: [{ key: 'A', content: 'Giữ lại dùng vì của nhặt được', correct: false }, { key: 'B', content: 'Tìm cách trả lại hoặc nộp cho thầy cô', correct: true }, { key: 'C', content: 'Vứt bỏ đi', correct: false }, { key: 'D', content: 'Cho bạn khác', correct: false }] },
  { content: 'Thế nào là lối sống giản dị?', difficulty: 'MEDIUM', explanation: 'Giản dị là không phô trương, không lãng phí, sống phù hợp với điều kiện thực tế và không đua đòi vật chất.', options: [{ key: 'A', content: 'Sống xa hoa, nhiều đồ đắt tiền', correct: false }, { key: 'B', content: 'Không phô trương, không lãng phí, phù hợp thực tế', correct: true }, { key: 'C', content: 'Không chơi với bạn bè', correct: false }, { key: 'D', content: 'Không quan tâm đến bề ngoài', correct: false }] },
  { content: 'Việc làm nào thể hiện tinh thần đoàn kết với bạn bè?', difficulty: 'EASY', explanation: 'Chia sẻ đồ dùng học tập với bạn khi bạn cần thể hiện tinh thần sẻ chia và đoàn kết.', options: [{ key: 'A', content: 'Không cho bạn mượn đồ dùng', correct: false }, { key: 'B', content: 'Chia sẻ đồ dùng khi bạn cần', correct: true }, { key: 'C', content: 'Chỉ chơi với bạn học giỏi', correct: false }, { key: 'D', content: 'Không tham gia hoạt động nhóm', correct: false }] },
  { content: 'Vì sao không nên phân biệt đối xử với bạn bè vì hoàn cảnh gia đình?', difficulty: 'MEDIUM', explanation: 'Mọi người đều có giá trị và phẩm giá riêng bất kể hoàn cảnh. Phân biệt đối xử là thiếu công bằng và không thể hiện lòng nhân ái.', options: [{ key: 'A', content: 'Vì bạn nghèo cũng giỏi như bạn giàu', correct: false }, { key: 'B', content: 'Vì mọi người đều có phẩm giá và đáng được tôn trọng', correct: true }, { key: 'C', content: 'Vì như vậy mới được người khác thích', correct: false }, { key: 'D', content: 'Vì quy định của trường', correct: false }] },
  { content: 'Hành vi nào thể hiện sự tôn trọng tài sản công cộng?', difficulty: 'EASY', explanation: 'Không khắc chữ, vẽ bậy lên bàn ghế; giữ gìn sách thư viện; không làm hỏng đồ dùng chung là tôn trọng tài sản công cộng.', options: [{ key: 'A', content: 'Vẽ lên bàn ghế trường', correct: false }, { key: 'B', content: 'Giữ gìn sách thư viện, không làm hỏng đồ dùng chung', correct: true }, { key: 'C', content: 'Lấy đồ chung về nhà dùng', correct: false }, { key: 'D', content: 'Không quan tâm đồ của trường', correct: false }] },
  { content: 'Đức tính nào giúp em vượt qua thất bại trong học tập?', difficulty: 'MEDIUM', explanation: 'Sự kiên trì và tinh thần lạc quan giúp không bỏ cuộc sau thất bại, rút kinh nghiệm và tiếp tục cố gắng.', options: [{ key: 'A', content: 'Sự ngại ngùng', correct: false }, { key: 'B', content: 'Kiên trì và lạc quan', correct: true }, { key: 'C', content: 'Sự tự mãn', correct: false }, { key: 'D', content: 'Sự vô tâm', correct: false }] },
  { content: 'Câu tục ngữ "Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau" dạy ta điều gì?', difficulty: 'MEDIUM', explanation: 'Câu tục ngữ dạy rằng lời nói không tốn kém nhưng rất có giá trị. Cần lựa chọn lời nói phù hợp để không làm tổn thương người khác.', options: [{ key: 'A', content: 'Nói nhiều để lấy lòng người', correct: false }, { key: 'B', content: 'Lựa chọn lời nói khéo léo, tránh làm tổn thương người khác', correct: true }, { key: 'C', content: 'Không nên nói nhiều', correct: false }, { key: 'D', content: 'Chỉ nói khi được hỏi', correct: false }] },
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
