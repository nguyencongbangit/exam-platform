const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-gdtc';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== LỢI ÍCH TẬP THỂ DỤC =====
  {
    content: 'Tập thể dục thường xuyên mang lại lợi ích gì cho sức khỏe?',
    difficulty: 'EASY',
    explanation: 'Tập thể dục giúp tăng sức đề kháng, cải thiện chiều cao, tăng sức mạnh cơ bắp, tuần hoàn máu tốt hơn.',
    options: [
      { key: 'A', content: 'Làm người mệt mỏi hơn', correct: false },
      { key: 'B', content: 'Tăng sức đề kháng, chiều cao, sức mạnh và tuần hoàn', correct: true },
      { key: 'C', content: 'Không có lợi ích gì', correct: false },
      { key: 'D', content: 'Chỉ giúp giảm cân', correct: false },
    ],
  },
  {
    content: 'Bao lâu tập thể dục mỗi ngày được coi là đủ với học sinh tiểu học?',
    difficulty: 'MEDIUM',
    explanation: 'Học sinh tiểu học nên vận động thể chất ít nhất 60 phút mỗi ngày theo khuyến cáo của WHO.',
    options: [
      { key: 'A', content: '10 phút', correct: false },
      { key: 'B', content: '60 phút', correct: true },
      { key: 'C', content: '5 giờ', correct: false },
      { key: 'D', content: '2 phút', correct: false },
    ],
  },
  {
    content: 'Tập thể dục có giúp cải thiện giấc ngủ không?',
    difficulty: 'EASY',
    explanation: 'Tập thể dục thường xuyên giúp ngủ sâu và ngon giấc hơn, cơ thể được phục hồi tốt.',
    options: [
      { key: 'A', content: 'Không, làm khó ngủ hơn', correct: false },
      { key: 'B', content: 'Có, giúp ngủ sâu và ngon hơn', correct: true },
      { key: 'C', content: 'Không có liên quan', correct: false },
      { key: 'D', content: 'Chỉ giúp ngủ ít hơn', correct: false },
    ],
  },
  // ===== TƯ THẾ NGỒI HỌC ĐÚNG =====
  {
    content: 'Tư thế ngồi học đúng là như thế nào?',
    difficulty: 'EASY',
    explanation: 'Ngồi học đúng tư thế: lưng thẳng, chân đặt phẳng trên sàn, mắt cách sách vở 25-30 cm, không cúi đầu quá gần.',
    options: [
      { key: 'A', content: 'Cúi đầu sát sách, lưng cong', correct: false },
      { key: 'B', content: 'Lưng thẳng, mắt cách sách 25-30 cm', correct: true },
      { key: 'C', content: 'Nằm ngửa khi đọc sách', correct: false },
      { key: 'D', content: 'Ngồi nghiêng một bên', correct: false },
    ],
  },
  {
    content: 'Khoảng cách từ mắt đến sách vở khi đọc/viết nên là bao nhiêu?',
    difficulty: 'MEDIUM',
    explanation: 'Khoảng cách từ mắt đến sách vở khi đọc/viết nên là 25-30 cm để bảo vệ thị lực.',
    options: [
      { key: 'A', content: '5-10 cm', correct: false },
      { key: 'B', content: '25-30 cm', correct: true },
      { key: 'C', content: '50-60 cm', correct: false },
      { key: 'D', content: '1 mét', correct: false },
    ],
  },
  {
    content: 'Ngồi học sai tư thế (cúi đầu, vẹo lưng) có thể gây ra?',
    difficulty: 'MEDIUM',
    explanation: 'Ngồi sai tư thế gây ra cận thị, vẹo cột sống, đau lưng, đau cổ và ảnh hưởng đến sự phát triển của cơ thể.',
    options: [
      { key: 'A', content: 'Tốt cho sức khỏe', correct: false },
      { key: 'B', content: 'Gây cận thị, vẹo cột sống, đau lưng đau cổ', correct: true },
      { key: 'C', content: 'Không ảnh hưởng gì', correct: false },
      { key: 'D', content: 'Giúp học giỏi hơn', correct: false },
    ],
  },
  // ===== CÁC BÀI TẬP THỂ DỤC =====
  {
    content: 'Khẩu lệnh "Đứng nghiêm!" trong thể dục yêu cầu tư thế gì?',
    difficulty: 'EASY',
    explanation: 'Đứng nghiêm: đứng thẳng, hai chân khép, tay thả dọc theo người, mắt nhìn thẳng về phía trước.',
    options: [
      { key: 'A', content: 'Ngồi xuống', correct: false },
      { key: 'B', content: 'Đứng thẳng, chân khép, tay thả dọc, mắt nhìn thẳng', correct: true },
      { key: 'C', content: 'Hai tay chống hông', correct: false },
      { key: 'D', content: 'Dang hai tay sang ngang', correct: false },
    ],
  },
  {
    content: 'Khẩu lệnh "Đứng nghỉ!" trong thể dục yêu cầu tư thế gì?',
    difficulty: 'EASY',
    explanation: 'Đứng nghỉ: chuyển trọng tâm sang một chân, chân kia hơi thư giãn, giải phóng tư thế nghiêm.',
    options: [
      { key: 'A', content: 'Ngồi xuống đất', correct: false },
      { key: 'B', content: 'Chuyển trọng tâm một chân, tư thế thoải mái hơn nghiêm', correct: true },
      { key: 'C', content: 'Nằm xuống nghỉ', correct: false },
      { key: 'D', content: 'Giống y tư thế đứng nghiêm', correct: false },
    ],
  },
  {
    content: 'Bài tập thể dục tay không giúp ích gì?',
    difficulty: 'EASY',
    explanation: 'Bài tập tay không giúp tăng cường sức mạnh, dẻo dai, cải thiện phối hợp vận động và không cần dụng cụ.',
    options: [
      { key: 'A', content: 'Chỉ để trông đẹp hơn', correct: false },
      { key: 'B', content: 'Tăng sức mạnh, dẻo dai, cải thiện vận động', correct: true },
      { key: 'C', content: 'Không có tác dụng gì', correct: false },
      { key: 'D', content: 'Chỉ giúp giảm cân', correct: false },
    ],
  },
  {
    content: 'Sau khi vận động mạnh, cần làm gì để cơ thể phục hồi?',
    difficulty: 'MEDIUM',
    explanation: 'Sau vận động mạnh cần hạ nhiệt (cool down) bằng các động tác nhẹ nhàng, uống nước, nghỉ ngơi để cơ thể phục hồi.',
    options: [
      { key: 'A', content: 'Tiếp tục vận động mạnh hơn', correct: false },
      { key: 'B', content: 'Hạ nhiệt từ từ bằng vận động nhẹ, uống nước, nghỉ ngơi', correct: true },
      { key: 'C', content: 'Tắm nước lạnh ngay lập tức', correct: false },
      { key: 'D', content: 'Ăn thật nhiều', correct: false },
    ],
  },
  // ===== BƠI LỘI =====
  {
    content: 'Kiểu bơi ếch có đặc điểm nào?',
    difficulty: 'MEDIUM',
    explanation: 'Bơi ếch: hai tay đẩy nước ra trước rồi sang hai bên, hai chân đạp ra như chân ếch, đầu đưa lên thở.',
    options: [
      { key: 'A', content: 'Hai tay quay vòng, người úp sấp', correct: false },
      { key: 'B', content: 'Hai tay đẩy ra trước rồi sang ngang, chân đạp như ếch', correct: true },
      { key: 'C', content: 'Nằm ngửa đạp chân', correct: false },
      { key: 'D', content: 'Chỉ dùng chân không dùng tay', correct: false },
    ],
  },
  {
    content: 'Kiểu bơi trườn sấp (freestyle) có đặc điểm nào?',
    difficulty: 'MEDIUM',
    explanation: 'Bơi trườn sấp: nằm úp, hai tay quay vòng luân phiên kéo nước, chân đập lên xuống, đầu quay sang thở.',
    options: [
      { key: 'A', content: 'Nằm ngửa, tay đẩy phía sau', correct: false },
      { key: 'B', content: 'Nằm úp, tay quay vòng luân phiên, chân đập lên xuống', correct: true },
      { key: 'C', content: 'Hai tay dang ngang, chân đạp như ếch', correct: false },
      { key: 'D', content: 'Không cử động tay, chỉ đạp chân', correct: false },
    ],
  },
  {
    content: 'Khi học bơi cần lưu ý điều gì về an toàn?',
    difficulty: 'MEDIUM',
    explanation: 'Khi học bơi cần: có người lớn giám sát, không bơi ở nơi nguy hiểm, học ở bể bơi có cứu hộ, không chạy xung quanh bể bơi.',
    options: [
      { key: 'A', content: 'Cứ nhảy xuống nước là biết bơi', correct: false },
      { key: 'B', content: 'Có người giám sát, bơi ở nơi an toàn, tuân thủ quy định', correct: true },
      { key: 'C', content: 'Bơi một mình là tốt nhất', correct: false },
      { key: 'D', content: 'Không cần tuân thủ quy định nào', correct: false },
    ],
  },
  // ===== CẦU LÔNG =====
  {
    content: 'Cách cầm vợt cầu lông đúng là?',
    difficulty: 'MEDIUM',
    explanation: 'Cầm vợt như bắt tay, ngón cái và các ngón khác ôm chặt cán vợt, cổ tay linh hoạt để đánh cầu.',
    options: [
      { key: 'A', content: 'Cầm chặt toàn bộ bàn tay, cổ tay cứng đờ', correct: false },
      { key: 'B', content: 'Cầm như bắt tay, cổ tay linh hoạt', correct: true },
      { key: 'C', content: 'Cầm vợt bằng hai tay', correct: false },
      { key: 'D', content: 'Chỉ dùng đầu ngón tay cầm', correct: false },
    ],
  },
  {
    content: 'Trong cầu lông, quả cầu (shuttlecock) phải vượt qua đâu?',
    difficulty: 'EASY',
    explanation: 'Quả cầu phải bay qua lưới (net) sang sân đối phương mà không chạm lưới.',
    options: [
      { key: 'A', content: 'Qua dưới lưới', correct: false },
      { key: 'B', content: 'Qua trên lưới sang sân đối phương', correct: true },
      { key: 'C', content: 'Vào rổ', correct: false },
      { key: 'D', content: 'Vào cổng', correct: false },
    ],
  },
  {
    content: 'Khi đánh cầu lông, cần chú ý đến điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cần chú ý: di chuyển nhanh, mắt theo dõi cầu, phán đoán hướng cầu bay, vung vợt đúng thời điểm.',
    options: [
      { key: 'A', content: 'Chỉ đứng im chờ cầu đến', correct: false },
      { key: 'B', content: 'Di chuyển nhanh, theo dõi cầu, vung vợt đúng thời điểm', correct: true },
      { key: 'C', content: 'Đánh thật mạnh', correct: false },
      { key: 'D', content: 'Nhắm mắt đánh', correct: false },
    ],
  },
  // ===== BÓNG ĐÁ =====
  {
    content: 'Trong bóng đá, thủ môn có nhiệm vụ gì?',
    difficulty: 'EASY',
    explanation: 'Thủ môn có nhiệm vụ bảo vệ khung thành, ngăn bóng vào lưới của đội mình.',
    options: [
      { key: 'A', content: 'Ghi bàn cho đội', correct: false },
      { key: 'B', content: 'Bảo vệ khung thành, ngăn bóng vào lưới', correct: true },
      { key: 'C', content: 'Chỉ đứng nhìn', correct: false },
      { key: 'D', content: 'Phát bóng đầu hiệp', correct: false },
    ],
  },
  {
    content: 'Trong bóng đá, thủ môn có thể dùng tay bắt bóng ở đâu?',
    difficulty: 'MEDIUM',
    explanation: 'Thủ môn chỉ được dùng tay bắt bóng trong vùng cấm địa (penalty area) của đội mình.',
    options: [
      { key: 'A', content: 'Ở bất cứ đâu trên sân', correct: false },
      { key: 'B', content: 'Chỉ trong vùng cấm địa của đội mình', correct: true },
      { key: 'C', content: 'Ngoài vạch biên', correct: false },
      { key: 'D', content: 'Trên khắp nửa sân nhà', correct: false },
    ],
  },
  {
    content: 'Một trận bóng đá tiêu chuẩn gồm mấy hiệp?',
    difficulty: 'EASY',
    explanation: 'Trận bóng đá tiêu chuẩn gồm 2 hiệp, mỗi hiệp 45 phút (tổng 90 phút).',
    options: [
      { key: 'A', content: '1 hiệp', correct: false },
      { key: 'B', content: '2 hiệp', correct: true },
      { key: 'C', content: '3 hiệp', correct: false },
      { key: 'D', content: '4 hiệp', correct: false },
    ],
  },
  {
    content: 'Mỗi đội bóng đá có bao nhiêu cầu thủ thi đấu trên sân?',
    difficulty: 'EASY',
    explanation: 'Mỗi đội bóng đá có 11 cầu thủ thi đấu trên sân (bao gồm 1 thủ môn).',
    options: [
      { key: 'A', content: '9 cầu thủ', correct: false },
      { key: 'B', content: '10 cầu thủ', correct: false },
      { key: 'C', content: '11 cầu thủ', correct: true },
      { key: 'D', content: '12 cầu thủ', correct: false },
    ],
  },
  {
    content: 'Lỗi "việt vị" (offside) trong bóng đá là gì?',
    difficulty: 'HARD',
    explanation: 'Việt vị xảy ra khi cầu thủ nhận bóng đứng gần khung thành đối phương hơn người phòng thủ cuối cùng (trừ thủ môn) khi bóng được chuyền đến.',
    options: [
      { key: 'A', content: 'Dùng tay chạm bóng', correct: false },
      { key: 'B', content: 'Đứng gần khung thành đối phương hơn hậu vệ cuối khi nhận bóng', correct: true },
      { key: 'C', content: 'Tắc bóng mạnh', correct: false },
      { key: 'D', content: 'Đá bóng ra ngoài biên', correct: false },
    ],
  },
  // ===== DINH DƯỠNG =====
  {
    content: 'Protein (chất đạm) có chức năng chính gì?',
    difficulty: 'EASY',
    explanation: 'Protein xây dựng và sửa chữa cơ bắp, mô, tế bào của cơ thể. Cần thiết để phát triển chiều cao và sức mạnh.',
    options: [
      { key: 'A', content: 'Cung cấp năng lượng nhanh', correct: false },
      { key: 'B', content: 'Xây dựng và sửa chữa cơ bắp, mô, tế bào', correct: true },
      { key: 'C', content: 'Giữ ấm cơ thể', correct: false },
      { key: 'D', content: 'Điều tiết nhịp tim', correct: false },
    ],
  },
  {
    content: 'Tinh bột (carbohydrate) có vai trò gì với cơ thể?',
    difficulty: 'EASY',
    explanation: 'Tinh bột cung cấp năng lượng nhanh cho các hoạt động hàng ngày, đặc biệt cho não và cơ bắp.',
    options: [
      { key: 'A', content: 'Xây dựng cơ bắp', correct: false },
      { key: 'B', content: 'Cung cấp năng lượng cho hoạt động', correct: true },
      { key: 'C', content: 'Điều tiết hormone', correct: false },
      { key: 'D', content: 'Bảo vệ cơ thể khỏi vi khuẩn', correct: false },
    ],
  },
  {
    content: 'Vitamin có vai trò gì trong cơ thể?',
    difficulty: 'MEDIUM',
    explanation: 'Vitamin giúp điều tiết các chức năng sinh lý của cơ thể, tăng sức đề kháng và bảo vệ sức khỏe.',
    options: [
      { key: 'A', content: 'Chỉ giúp da đẹp', correct: false },
      { key: 'B', content: 'Điều tiết chức năng sinh lý, tăng sức đề kháng', correct: true },
      { key: 'C', content: 'Cung cấp năng lượng chính', correct: false },
      { key: 'D', content: 'Xây dựng xương', correct: false },
    ],
  },
  {
    content: 'Trước khi tập thể dục, không nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Không nên ăn no ngay trước khi tập vì máu dồn về dạ dày tiêu hóa, thiếu máu cho cơ bắp, dễ buồn nôn.',
    options: [
      { key: 'A', content: 'Khởi động nhẹ nhàng', correct: false },
      { key: 'B', content: 'Ăn no ngay trước khi tập', correct: true },
      { key: 'C', content: 'Uống đủ nước', correct: false },
      { key: 'D', content: 'Mặc đồ thoải mái', correct: false },
    ],
  },
  {
    content: 'Uống đủ nước trong ngày có lợi ích gì?',
    difficulty: 'EASY',
    explanation: 'Uống đủ nước giúp điều hòa nhiệt độ cơ thể, vận chuyển chất dinh dưỡng, loại bỏ độc tố và duy trì hoạt động của các cơ quan.',
    options: [
      { key: 'A', content: 'Chỉ làm hết khát', correct: false },
      { key: 'B', content: 'Điều hòa nhiệt độ, vận chuyển dinh dưỡng, thải độc tố', correct: true },
      { key: 'C', content: 'Không có lợi ích đặc biệt', correct: false },
      { key: 'D', content: 'Chỉ cần thiết khi tập thể dục', correct: false },
    ],
  },
  // ===== VẬN ĐỘNG VIÊN VIỆT NAM =====
  {
    content: 'Vận động viên Nguyễn Thị Ánh Viên nổi tiếng với môn thể thao nào?',
    difficulty: 'MEDIUM',
    explanation: 'Nguyễn Thị Ánh Viên là nữ VĐV bơi lội nổi tiếng của Việt Nam, đoạt nhiều huy chương SEA Games và ASIAD.',
    options: [
      { key: 'A', content: 'Cầu lông', correct: false },
      { key: 'B', content: 'Bơi lội', correct: true },
      { key: 'C', content: 'Bóng bàn', correct: false },
      { key: 'D', content: 'Điền kinh', correct: false },
    ],
  },
  {
    content: 'Vận động viên Hoàng Xuân Vinh đoạt huy chương vàng Olympic 2016 ở môn nào?',
    difficulty: 'HARD',
    explanation: 'Hoàng Xuân Vinh đoạt HCV Olympic Rio 2016 môn bắn súng (10m súng ngắn hơi), là HCV Olympic đầu tiên của Việt Nam.',
    options: [
      { key: 'A', content: 'Bơi lội', correct: false },
      { key: 'B', content: 'Bắn súng', correct: true },
      { key: 'C', content: 'Cử tạ', correct: false },
      { key: 'D', content: 'Judo', correct: false },
    ],
  },
  {
    content: 'SEA Games là đại hội thể thao của các nước nào?',
    difficulty: 'EASY',
    explanation: 'SEA Games (Đại hội thể thao Đông Nam Á) là đại hội thể thao của các nước Đông Nam Á, tổ chức 2 năm một lần.',
    options: [
      { key: 'A', content: 'Toàn châu Á', correct: false },
      { key: 'B', content: 'Các nước Đông Nam Á', correct: true },
      { key: 'C', content: 'Toàn thế giới', correct: false },
      { key: 'D', content: 'Chỉ Việt Nam và Thái Lan', correct: false },
    ],
  },
  {
    content: 'Olympic là đại hội thể thao lớn nhất thế giới, được tổ chức mấy năm một lần?',
    difficulty: 'EASY',
    explanation: 'Thế vận hội Olympic được tổ chức 4 năm một lần.',
    options: [
      { key: 'A', content: '2 năm', correct: false },
      { key: 'B', content: '3 năm', correct: false },
      { key: 'C', content: '4 năm', correct: true },
      { key: 'D', content: '5 năm', correct: false },
    ],
  },
  // ===== TỔNG HỢP GDTC =====
  {
    content: 'Khởi động (warm-up) trước khi tập thể dục quan trọng vì?',
    difficulty: 'MEDIUM',
    explanation: 'Khởi động giúp tăng nhiệt độ cơ thể, tăng tuần hoàn máu, giãn cơ và giảm nguy cơ chấn thương.',
    options: [
      { key: 'A', content: 'Mất thời gian vô ích', correct: false },
      { key: 'B', content: 'Tăng nhiệt độ cơ thể, giãn cơ, giảm nguy cơ chấn thương', correct: true },
      { key: 'C', content: 'Chỉ để ra mồ hôi', correct: false },
      { key: 'D', content: 'Không cần thiết', correct: false },
    ],
  },
  {
    content: 'Tư thế nào sau đây giúp tăng cường sức mạnh vùng bụng?',
    difficulty: 'MEDIUM',
    explanation: 'Bài tập gập bụng (sit-up/crunch) tập trung vào cơ bụng, giúp tăng cường sức mạnh vùng lõi.',
    options: [
      { key: 'A', content: 'Chạy bộ', correct: false },
      { key: 'B', content: 'Gập bụng (sit-up)', correct: true },
      { key: 'C', content: 'Nhảy dây', correct: false },
      { key: 'D', content: 'Đứng một chân', correct: false },
    ],
  },
  {
    content: 'Bơi lội tốt hơn chạy bộ ở điểm nào?',
    difficulty: 'HARD',
    explanation: 'Bơi lội nhẹ nhàng hơn với khớp vì nước nâng đỡ cơ thể, giảm tác động lên xương khớp so với chạy bộ.',
    options: [
      { key: 'A', content: 'Bơi lội tốn ít sức hơn', correct: false },
      { key: 'B', content: 'Bơi lội nhẹ nhàng hơn với khớp nhờ nước nâng đỡ', correct: true },
      { key: 'C', content: 'Bơi lội không giúp tim khỏe', correct: false },
      { key: 'D', content: 'Bơi lội không đốt calo', correct: false },
    ],
  },
  {
    content: 'Điều nào sau đây là thói quen tốt cho sức khỏe?',
    difficulty: 'EASY',
    explanation: 'Ngủ đủ giấc (8-9 tiếng với học sinh tiểu học) là thói quen tốt giúp cơ thể phục hồi và phát triển.',
    options: [
      { key: 'A', content: 'Thức khuya xem điện thoại', correct: false },
      { key: 'B', content: 'Ngủ đủ giấc 8-9 tiếng mỗi ngày', correct: true },
      { key: 'C', content: 'Ăn nhiều đồ ngọt', correct: false },
      { key: 'D', content: 'Không bao giờ tập thể dục', correct: false },
    ],
  },
  {
    content: 'Bộ môn thể thao nào phù hợp nhất với học sinh lớp 5 để phát triển chiều cao?',
    difficulty: 'MEDIUM',
    explanation: 'Bơi lội, bóng rổ, cầu lông đều tốt cho phát triển chiều cao nhờ kéo giãn cơ thể và tăng cường hệ xương.',
    options: [
      { key: 'A', content: 'Cử tạ (nâng tạ nặng)', correct: false },
      { key: 'B', content: 'Bơi lội, bóng rổ, cầu lông', correct: true },
      { key: 'C', content: 'Chỉ ngồi một chỗ học', correct: false },
      { key: 'D', content: 'Không cần tập thể dục', correct: false },
    ],
  },
  {
    content: 'Khi bị chấn thương nhẹ (bong gân) trong thể thao, bước sơ cứu đầu tiên là?',
    difficulty: 'MEDIUM',
    explanation: 'Khi bong gân, áp dụng nguyên tắc RICE: Rest (nghỉ), Ice (chườm đá), Compression (băng ép), Elevation (nâng cao vùng thương).',
    options: [
      { key: 'A', content: 'Tiếp tục tập thể thao', correct: false },
      { key: 'B', content: 'Nghỉ, chườm đá, băng nhẹ và nâng cao vùng thương', correct: true },
      { key: 'C', content: 'Xoa dầu nóng ngay', correct: false },
      { key: 'D', content: 'Bỏ qua, không cần xử lý', correct: false },
    ],
  },
  {
    content: 'Sự khác biệt giữa thể lực và kỹ thuật trong thể thao là?',
    difficulty: 'HARD',
    explanation: 'Thể lực là sức mạnh, sức bền, tốc độ, dẻo dai của cơ thể. Kỹ thuật là cách thực hiện đúng động tác trong môn thể thao cụ thể.',
    options: [
      { key: 'A', content: 'Không có sự khác biệt', correct: false },
      { key: 'B', content: 'Thể lực là sức mạnh thể chất; kỹ thuật là cách thực hiện đúng động tác', correct: true },
      { key: 'C', content: 'Kỹ thuật quan trọng hơn thể lực', correct: false },
      { key: 'D', content: 'Thể lực quan trọng hơn kỹ thuật', correct: false },
    ],
  },
  { content: 'Môn thể thao nào không cần dùng bóng?', difficulty: 'EASY', explanation: 'Điền kinh (chạy, nhảy, ném) là môn thể thao không nhất thiết phải dùng bóng, chỉ cần đường chạy hoặc sân vận động.', options: [{ key: 'A', content: 'Bóng đá', correct: false }, { key: 'B', content: 'Điền kinh (chạy, nhảy)', correct: true }, { key: 'C', content: 'Bóng chuyền', correct: false }, { key: 'D', content: 'Bóng rổ', correct: false }] },
  { content: 'Mục đích của bài tập khởi động trước khi tập thể thao là gì?', difficulty: 'EASY', explanation: 'Khởi động giúp làm nóng cơ thể, tăng nhiệt độ cơ bắp, cải thiện lưu thông máu và giảm nguy cơ chấn thương.', options: [{ key: 'A', content: 'Chỉ là thói quen không cần thiết', correct: false }, { key: 'B', content: 'Làm nóng người, giảm nguy cơ chấn thương', correct: true }, { key: 'C', content: 'Để tiêu thụ nhiều năng lượng hơn', correct: false }, { key: 'D', content: 'Không có tác dụng gì', correct: false }] },
  { content: 'Vì sao vận động viên cần nghỉ ngơi sau khi thi đấu?', difficulty: 'MEDIUM', explanation: 'Nghỉ ngơi giúp cơ thể phục hồi, cơ bắp sửa chữa và phát triển, bổ sung năng lượng đã tiêu thụ.', options: [{ key: 'A', content: 'Vì họ lười biếng', correct: false }, { key: 'B', content: 'Cơ thể cần phục hồi và cơ bắp cần tái tạo', correct: true }, { key: 'C', content: 'Không có lý do', correct: false }, { key: 'D', content: 'Chỉ để không bị thương thêm', correct: false }] },
  { content: 'Trong chạy ngắn (sprint), điều quan trọng nhất là gì?', difficulty: 'MEDIUM', explanation: 'Trong chạy ngắn (100m, 200m), tốc độ là yếu tố quyết định nhất. Vận động viên cần xuất phát nhanh và duy trì tốc độ tối đa.', options: [{ key: 'A', content: 'Sức bền dài hơi', correct: false }, { key: 'B', content: 'Tốc độ và xuất phát nhanh', correct: true }, { key: 'C', content: 'Kỹ thuật thở đúng', correct: false }, { key: 'D', content: 'Giữ sức để về đích', correct: false }] },
  { content: 'Hành động nào giúp giữ an toàn khi tập nhảy dây?', difficulty: 'EASY', explanation: 'Cần đảm bảo có đủ không gian xung quanh, mặc giày phù hợp, khởi động trước và không nhảy quá sức.', options: [{ key: 'A', content: 'Nhảy trên sàn trơn', correct: false }, { key: 'B', content: 'Đảm bảo không gian, đi giày phù hợp', correct: true }, { key: 'C', content: 'Nhảy càng nhanh càng tốt', correct: false }, { key: 'D', content: 'Không cần khởi động', correct: false }] },
  { content: 'Bóng bàn (tennis bàn) có bao nhiêu điểm để thắng một ván?', difficulty: 'MEDIUM', explanation: 'Trong bóng bàn, để thắng một ván cần đạt 11 điểm (và hơn đối thủ ít nhất 2 điểm).', options: [{ key: 'A', content: '21 điểm', correct: false }, { key: 'B', content: '11 điểm', correct: true }, { key: 'C', content: '15 điểm', correct: false }, { key: 'D', content: '25 điểm', correct: false }] },
  { content: 'Môn thể thao nào sử dụng cây vợt và quả cầu?', difficulty: 'EASY', explanation: 'Cầu lông sử dụng vợt và quả cầu (shuttlecock) - loại dụng cụ đặc trưng của môn thể thao này.', options: [{ key: 'A', content: 'Quần vợt (tennis)', correct: false }, { key: 'B', content: 'Cầu lông (badminton)', correct: true }, { key: 'C', content: 'Bóng bàn', correct: false }, { key: 'D', content: 'Bóng chuyền', correct: false }] },
  { content: 'Để tăng cường sức bền tim mạch, nên luyện tập môn nào?', difficulty: 'MEDIUM', explanation: 'Chạy bộ, bơi lội, đạp xe là các môn thể thao aerobic tốt nhất cho tim mạch, giúp tăng sức bền tim phổi.', options: [{ key: 'A', content: 'Cử tạ', correct: false }, { key: 'B', content: 'Chạy bộ, bơi lội, đạp xe', correct: true }, { key: 'C', content: 'Đánh cờ', correct: false }, { key: 'D', content: 'Bắn cung', correct: false }] },
  { content: 'Vì sao không nên tập thể dục ngay sau khi ăn no?', difficulty: 'MEDIUM', explanation: 'Sau khi ăn, máu tập trung về dạ dày để tiêu hóa. Tập thể dục lúc này gây đau bụng, buồn nôn và không tốt cho tiêu hóa.', options: [{ key: 'A', content: 'Vì thức ăn cần thời gian chín', correct: false }, { key: 'B', content: 'Gây đau bụng, cản trở tiêu hóa', correct: true }, { key: 'C', content: 'Không có lý do gì', correct: false }, { key: 'D', content: 'Vì sẽ chạy nhanh hơn', correct: false }] },
  { content: 'Trong bơi lội, kiểu bơi nào dùng hai chân đập xuống nước luân phiên?', difficulty: 'MEDIUM', explanation: 'Bơi trườn sấp (freestyle/crawl) dùng kỹ thuật đập chân luân phiên (flutter kick) kết hợp quay tay vòng trên mặt nước.', options: [{ key: 'A', content: 'Bơi ếch (breaststroke)', correct: false }, { key: 'B', content: 'Bơi trườn sấp (freestyle/crawl)', correct: true }, { key: 'C', content: 'Bơi ngửa (backstroke)', correct: false }, { key: 'D', content: 'Bơi bướm (butterfly)', correct: false }] },
  { content: 'Chiều cao của lưới cầu lông trong thi đấu đôi nam nữ là bao nhiêu?', difficulty: 'HARD', explanation: 'Lưới cầu lông cao 1,55m ở hai bên biên và 1,524m ở giữa lưới (cho cả đơn lẫn đôi).', options: [{ key: 'A', content: '1m', correct: false }, { key: 'B', content: '1,524m (giữa lưới)', correct: true }, { key: 'C', content: '2m', correct: false }, { key: 'D', content: '1,8m', correct: false }] },
  { content: 'Cơ bắp nào được sử dụng nhiều nhất khi chạy bộ?', difficulty: 'MEDIUM', explanation: 'Khi chạy bộ, các cơ ở chân (cơ tứ đầu, cơ sau đùi, bắp chân) và cơ mông được sử dụng nhiều nhất.', options: [{ key: 'A', content: 'Cơ tay và vai', correct: false }, { key: 'B', content: 'Cơ chân (đùi, bắp chân) và cơ mông', correct: true }, { key: 'C', content: 'Cơ bụng', correct: false }, { key: 'D', content: 'Cơ ngực', correct: false }] },
  { content: 'Bài tập nào giúp tăng cường sức mạnh cơ bụng?', difficulty: 'EASY', explanation: 'Bài tập gập bụng (sit-up/crunch) là bài tập cơ bản nhất để tăng cường sức mạnh các cơ vùng bụng.', options: [{ key: 'A', content: 'Chạy nhanh', correct: false }, { key: 'B', content: 'Gập bụng (sit-up)', correct: true }, { key: 'C', content: 'Bơi lội', correct: false }, { key: 'D', content: 'Đá cầu', correct: false }] },
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
