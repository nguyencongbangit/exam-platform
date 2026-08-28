const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-tieng-viet';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== TỪ ĐỒNG NGHĨA =====
  {
    content: 'Từ nào đồng nghĩa với từ "xinh đẹp"?',
    difficulty: 'EASY',
    explanation: '"Duyên dáng" là từ đồng nghĩa với "xinh đẹp", đều chỉ vẻ đẹp của người hay vật.',
    options: [
      { key: 'A', content: 'Xấu xí', correct: false },
      { key: 'B', content: 'Duyên dáng', correct: true },
      { key: 'C', content: 'Thô kệch', correct: false },
      { key: 'D', content: 'Cứng nhắc', correct: false },
    ],
  },
  {
    content: 'Từ nào đồng nghĩa với từ "chăm chỉ"?',
    difficulty: 'EASY',
    explanation: '"Cần cù" là từ đồng nghĩa với "chăm chỉ", đều chỉ thái độ siêng năng, cố gắng.',
    options: [
      { key: 'A', content: 'Lười biếng', correct: false },
      { key: 'B', content: 'Cần cù', correct: true },
      { key: 'C', content: 'Bất cẩn', correct: false },
      { key: 'D', content: 'Hờ hững', correct: false },
    ],
  },
  {
    content: 'Từ nào đồng nghĩa với từ "dũng cảm"?',
    difficulty: 'EASY',
    explanation: '"Can đảm" là từ đồng nghĩa với "dũng cảm".',
    options: [
      { key: 'A', content: 'Hèn nhát', correct: false },
      { key: 'B', content: 'Sợ hãi', correct: false },
      { key: 'C', content: 'Can đảm', correct: true },
      { key: 'D', content: 'Nhút nhát', correct: false },
    ],
  },
  {
    content: 'Câu nào sử dụng đúng cặp từ đồng nghĩa?',
    difficulty: 'MEDIUM',
    explanation: '"Tổ quốc" và "đất nước" là hai từ đồng nghĩa, đều chỉ quê hương, đất nước.',
    options: [
      { key: 'A', content: 'Tổ quốc và kẻ thù', correct: false },
      { key: 'B', content: 'Tổ quốc và đất nước', correct: true },
      { key: 'C', content: 'Tổ quốc và hòa bình', correct: false },
      { key: 'D', content: 'Tổ quốc và chiến tranh', correct: false },
    ],
  },
  {
    content: 'Cặp từ nào sau đây là từ đồng nghĩa?',
    difficulty: 'EASY',
    explanation: '"Vui" và "mừng" đều diễn tả cảm xúc vui vẻ, phấn khởi.',
    options: [
      { key: 'A', content: 'Buồn - vui', correct: false },
      { key: 'B', content: 'Vui - mừng', correct: true },
      { key: 'C', content: 'Khóc - cười', correct: false },
      { key: 'D', content: 'Trắng - đen', correct: false },
    ],
  },
  // ===== TỪ TRÁI NGHĨA =====
  {
    content: 'Từ trái nghĩa với "rộng rãi" là?',
    difficulty: 'EASY',
    explanation: '"Chật hẹp" là từ trái nghĩa với "rộng rãi".',
    options: [
      { key: 'A', content: 'Mênh mông', correct: false },
      { key: 'B', content: 'Bao la', correct: false },
      { key: 'C', content: 'Chật hẹp', correct: true },
      { key: 'D', content: 'Thênh thang', correct: false },
    ],
  },
  {
    content: 'Từ trái nghĩa với "thắng" là?',
    difficulty: 'EASY',
    explanation: '"Thua" là từ trái nghĩa với "thắng".',
    options: [
      { key: 'A', content: 'Đấu', correct: false },
      { key: 'B', content: 'Thua', correct: true },
      { key: 'C', content: 'Chiến', correct: false },
      { key: 'D', content: 'Đạt', correct: false },
    ],
  },
  {
    content: 'Câu nào sử dụng từ trái nghĩa đúng?',
    difficulty: 'MEDIUM',
    explanation: '"Ngày thắng lợi đối lập với ngày thất bại" – thắng lợi và thất bại là cặp từ trái nghĩa.',
    options: [
      { key: 'A', content: 'Bạn ấy vừa vui vẻ vừa hạnh phúc', correct: false },
      { key: 'B', content: 'Cuộc sống có lúc vui lúc buồn', correct: true },
      { key: 'C', content: 'Mặt trời sáng rực cả bầu trời', correct: false },
      { key: 'D', content: 'Bông hoa tươi đẹp nở rộ', correct: false },
    ],
  },
  {
    content: 'Cặp từ nào sau đây là từ trái nghĩa?',
    difficulty: 'EASY',
    explanation: '"Siêng năng" đối lập với "lười biếng".',
    options: [
      { key: 'A', content: 'Chăm chỉ - siêng năng', correct: false },
      { key: 'B', content: 'Siêng năng - lười biếng', correct: true },
      { key: 'C', content: 'Cần cù - chăm chỉ', correct: false },
      { key: 'D', content: 'Tốt bụng - nhân hậu', correct: false },
    ],
  },
  // ===== TỪ ĐỒNG ÂM =====
  {
    content: 'Trong hai câu "Con đường dài" và "Đường ngọt", từ "đường" có quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: 'Từ "đường" trong "con đường" (nơi đi lại) và "đường" trong "đường ngọt" (chất ngọt) là hai từ đồng âm, phát âm giống nhau nhưng nghĩa khác nhau.',
    options: [
      { key: 'A', content: 'Từ đồng nghĩa', correct: false },
      { key: 'B', content: 'Từ trái nghĩa', correct: false },
      { key: 'C', content: 'Từ đồng âm', correct: true },
      { key: 'D', content: 'Từ nhiều nghĩa', correct: false },
    ],
  },
  {
    content: 'Từ nào là từ đồng âm với "ba" trong "ba người"?',
    difficulty: 'MEDIUM',
    explanation: '"Ba" trong "ba người" là số 3. "Ba" trong "ba má" là tiếng gọi người cha. Đây là từ đồng âm.',
    options: [
      { key: 'A', content: '"Ba" trong "ba má"', correct: true },
      { key: 'B', content: '"Ba" nghĩa là ba người', correct: false },
      { key: 'C', content: '"Ba" nghĩa là số ba mươi', correct: false },
      { key: 'D', content: 'Không có từ đồng âm', correct: false },
    ],
  },
  // ===== TỪ NHIỀU NGHĨA =====
  {
    content: 'Từ "đầu" trong câu nào mang nghĩa gốc?',
    difficulty: 'MEDIUM',
    explanation: '"Đầu" trong "gội đầu" mang nghĩa gốc (bộ phận trên cùng của cơ thể người).',
    options: [
      { key: 'A', content: 'Đầu nguồn con sông', correct: false },
      { key: 'B', content: 'Đầu đàn', correct: false },
      { key: 'C', content: 'Gội đầu', correct: true },
      { key: 'D', content: 'Đầu bảng', correct: false },
    ],
  },
  {
    content: 'Từ "chân" trong "chân bàn" mang nghĩa gì?',
    difficulty: 'MEDIUM',
    explanation: '"Chân" trong "chân bàn" là nghĩa chuyển (bộ phận dưới cùng đỡ vật), không phải nghĩa gốc (chân người/động vật).',
    options: [
      { key: 'A', content: 'Nghĩa gốc', correct: false },
      { key: 'B', content: 'Nghĩa chuyển', correct: true },
      { key: 'C', content: 'Từ đồng âm', correct: false },
      { key: 'D', content: 'Từ đồng nghĩa', correct: false },
    ],
  },
  {
    content: 'Từ "mắt" trong "mắt lưới" có nghĩa là?',
    difficulty: 'MEDIUM',
    explanation: '"Mắt lưới" chỉ những ô vuông nhỏ trên lưới, đây là nghĩa chuyển của từ "mắt".',
    options: [
      { key: 'A', content: 'Bộ phận để nhìn', correct: false },
      { key: 'B', content: 'Những ô vuông trên lưới', correct: true },
      { key: 'C', content: 'Chỗ nút thắt', correct: false },
      { key: 'D', content: 'Hạt giống', correct: false },
    ],
  },
  // ===== CÂU ĐƠN / CÂU GHÉP =====
  {
    content: 'Câu nào là câu đơn?',
    difficulty: 'EASY',
    explanation: '"Mặt trời mọc" là câu đơn vì chỉ có một cụm chủ ngữ - vị ngữ.',
    options: [
      { key: 'A', content: 'Gió thổi và mưa rơi.', correct: false },
      { key: 'B', content: 'Mặt trời mọc.', correct: true },
      { key: 'C', content: 'Hoa nở rộ vì trời ấm.', correct: false },
      { key: 'D', content: 'Em học bài còn chị nấu cơm.', correct: false },
    ],
  },
  {
    content: 'Câu ghép là câu như thế nào?',
    difficulty: 'EASY',
    explanation: 'Câu ghép là câu do nhiều vế câu ghép lại, mỗi vế có đủ chủ ngữ và vị ngữ riêng.',
    options: [
      { key: 'A', content: 'Câu chỉ có một vế', correct: false },
      { key: 'B', content: 'Câu có nhiều vế, mỗi vế có chủ-vị riêng', correct: true },
      { key: 'C', content: 'Câu không có vị ngữ', correct: false },
      { key: 'D', content: 'Câu chỉ dùng để hỏi', correct: false },
    ],
  },
  {
    content: 'Trong câu "Vì trời mưa nên chúng tôi ở nhà", từ nối hai vế là?',
    difficulty: 'MEDIUM',
    explanation: 'Cặp từ nối "vì...nên" diễn tả quan hệ nguyên nhân - kết quả.',
    options: [
      { key: 'A', content: 'và', correct: false },
      { key: 'B', content: 'nhưng', correct: false },
      { key: 'C', content: 'vì...nên', correct: true },
      { key: 'D', content: 'tuy...nhưng', correct: false },
    ],
  },
  {
    content: 'Câu "Tuy nhà xa nhưng bạn Nam vẫn đi học đúng giờ" là câu thể hiện quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cặp quan hệ từ "tuy...nhưng" diễn tả quan hệ tương phản.',
    options: [
      { key: 'A', content: 'Quan hệ nguyên nhân - kết quả', correct: false },
      { key: 'B', content: 'Quan hệ tương phản', correct: true },
      { key: 'C', content: 'Quan hệ điều kiện', correct: false },
      { key: 'D', content: 'Quan hệ tăng tiến', correct: false },
    ],
  },
  {
    content: 'Bộ phận nào là chủ ngữ trong câu "Những bông hoa hồng tươi thắm nở rộ trong vườn"?',
    difficulty: 'MEDIUM',
    explanation: 'Chủ ngữ là "Những bông hoa hồng tươi thắm".',
    options: [
      { key: 'A', content: 'Nở rộ trong vườn', correct: false },
      { key: 'B', content: 'Những bông hoa hồng tươi thắm', correct: true },
      { key: 'C', content: 'Trong vườn', correct: false },
      { key: 'D', content: 'Hoa hồng', correct: false },
    ],
  },
  // ===== DẤU CÂU =====
  {
    content: 'Dấu câu nào được dùng để kết thúc câu hỏi?',
    difficulty: 'EASY',
    explanation: 'Dấu chấm hỏi (?) được dùng để kết thúc câu hỏi.',
    options: [
      { key: 'A', content: 'Dấu chấm (.)', correct: false },
      { key: 'B', content: 'Dấu chấm than (!)', correct: false },
      { key: 'C', content: 'Dấu chấm hỏi (?)', correct: true },
      { key: 'D', content: 'Dấu phẩy (,)', correct: false },
    ],
  },
  {
    content: 'Dấu hai chấm (:) thường được dùng để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dấu hai chấm báo hiệu phần đứng sau là lời giải thích, liệt kê hoặc lời nói trực tiếp.',
    options: [
      { key: 'A', content: 'Kết thúc câu', correct: false },
      { key: 'B', content: 'Ngăn cách các bộ phận trong câu', correct: false },
      { key: 'C', content: 'Báo hiệu lời giải thích hoặc liệt kê', correct: true },
      { key: 'D', content: 'Thể hiện cảm xúc mạnh', correct: false },
    ],
  },
  {
    content: 'Dấu phẩy (,) trong câu sau dùng để làm gì: "Trên bầu trời, những đám mây trắng trôi nhẹ nhàng."',
    difficulty: 'MEDIUM',
    explanation: 'Dấu phẩy ở đây ngăn cách trạng ngữ "Trên bầu trời" với phần còn lại của câu.',
    options: [
      { key: 'A', content: 'Ngăn cách các vế trong câu ghép', correct: false },
      { key: 'B', content: 'Ngăn cách trạng ngữ với chủ-vị', correct: true },
      { key: 'C', content: 'Ngăn cách các từ trong liệt kê', correct: false },
      { key: 'D', content: 'Dừng lại cuối câu', correct: false },
    ],
  },
  {
    content: 'Dấu gạch ngang (—) trong đoạn hội thoại được dùng để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dấu gạch ngang trong đoạn hội thoại đánh dấu lời nói trực tiếp của nhân vật.',
    options: [
      { key: 'A', content: 'Kết thúc đoạn văn', correct: false },
      { key: 'B', content: 'Đánh dấu lời nói trực tiếp của nhân vật', correct: true },
      { key: 'C', content: 'Liệt kê sự vật', correct: false },
      { key: 'D', content: 'Giải thích thêm', correct: false },
    ],
  },
  {
    content: 'Dấu chấm phẩy (;) được dùng để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dấu chấm phẩy ngăn cách các vế của câu ghép có quan hệ phức tạp, hoặc ngăn cách các bộ phận trong liệt kê dài.',
    options: [
      { key: 'A', content: 'Kết thúc câu kể', correct: false },
      { key: 'B', content: 'Đặt trước phần giải thích', correct: false },
      { key: 'C', content: 'Ngăn cách các vế câu phức tạp', correct: true },
      { key: 'D', content: 'Đánh dấu câu hỏi', correct: false },
    ],
  },
  {
    content: 'Dấu câu nào phù hợp điền vào chỗ trống: "Em ơi___ đã đến giờ đi học rồi!"?',
    difficulty: 'EASY',
    explanation: 'Dấu phẩy (,) dùng để ngăn cách khi gọi đáp trong câu.',
    options: [
      { key: 'A', content: 'Dấu chấm (.)', correct: false },
      { key: 'B', content: 'Dấu phẩy (,)', correct: true },
      { key: 'C', content: 'Dấu hỏi (?)', correct: false },
      { key: 'D', content: 'Dấu hai chấm (:)', correct: false },
    ],
  },
  // ===== THÀNH NGỮ TỤC NGỮ =====
  {
    content: 'Thành ngữ "Một công đôi việc" có nghĩa là?',
    difficulty: 'MEDIUM',
    explanation: 'Thành ngữ "Một công đôi việc" có nghĩa là chỉ làm một lần mà đạt được hai kết quả.',
    options: [
      { key: 'A', content: 'Làm hai lần mới xong một việc', correct: false },
      { key: 'B', content: 'Chỉ làm một lần mà đạt được hai kết quả', correct: true },
      { key: 'C', content: 'Làm việc đơn giản', correct: false },
      { key: 'D', content: 'Hai người làm một việc', correct: false },
    ],
  },
  {
    content: 'Tục ngữ "Có công mài sắt có ngày nên kim" khuyên chúng ta điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Tục ngữ khuyên chúng ta kiên trì, bền bỉ thì dù việc khó đến đâu cũng sẽ thành công.',
    options: [
      { key: 'A', content: 'Nên làm đồ sắt', correct: false },
      { key: 'B', content: 'Phải kiên trì, bền bỉ thì sẽ thành công', correct: true },
      { key: 'C', content: 'Không nên mài sắt', correct: false },
      { key: 'D', content: 'Cần mua nhiều kim khâu', correct: false },
    ],
  },
  {
    content: 'Tục ngữ nào nói về tinh thần đoàn kết?',
    difficulty: 'MEDIUM',
    explanation: '"Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" nói về sức mạnh của tinh thần đoàn kết.',
    options: [
      { key: 'A', content: 'Uống nước nhớ nguồn', correct: false },
      { key: 'B', content: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao', correct: true },
      { key: 'C', content: 'Học thầy không tày học bạn', correct: false },
      { key: 'D', content: 'Có công mài sắt có ngày nên kim', correct: false },
    ],
  },
  {
    content: 'Thành ngữ "Nước đổ lá khoai" có nghĩa là?',
    difficulty: 'HARD',
    explanation: '"Nước đổ lá khoai" ý nói dạy bảo không có tác dụng, như nước đổ vào lá khoai thì chảy đi ngay, không thấm vào đâu.',
    options: [
      { key: 'A', content: 'Rất dễ thấm', correct: false },
      { key: 'B', content: 'Dạy bảo không có tác dụng gì', correct: true },
      { key: 'C', content: 'Mưa rào lớn', correct: false },
      { key: 'D', content: 'Trồng khoai cần tưới nước', correct: false },
    ],
  },
  {
    content: 'Tục ngữ "Uống nước nhớ nguồn" khuyên chúng ta điều gì?',
    difficulty: 'EASY',
    explanation: 'Tục ngữ khuyên chúng ta phải biết ơn những người đã tạo ra thành quả mà chúng ta đang hưởng.',
    options: [
      { key: 'A', content: 'Cần uống đủ nước mỗi ngày', correct: false },
      { key: 'B', content: 'Phải biết ơn những người có công ơn với mình', correct: true },
      { key: 'C', content: 'Nên tìm hiểu địa lý các dòng sông', correct: false },
      { key: 'D', content: 'Cần bảo vệ nguồn nước sạch', correct: false },
    ],
  },
  // ===== ĐỌC HIỂU =====
  {
    content: 'Đọc đoạn văn sau và trả lời: "Mùa xuân, cây cối đâm chồi nảy lộc. Hoa đào, hoa mai khoe sắc rực rỡ. Tiếng chim hót véo von làm cho khung cảnh trở nên thêm sinh động." Nội dung chính của đoạn văn là?',
    difficulty: 'EASY',
    explanation: 'Đoạn văn miêu tả vẻ đẹp của thiên nhiên vào mùa xuân.',
    options: [
      { key: 'A', content: 'Miêu tả mùa hè oi ả', correct: false },
      { key: 'B', content: 'Miêu tả cảnh vật mùa xuân', correct: true },
      { key: 'C', content: 'Kể về các loài chim', correct: false },
      { key: 'D', content: 'Giới thiệu về hoa đào', correct: false },
    ],
  },
  {
    content: 'Đọc đoạn văn: "Bác nông dân thức dậy từ sáng sớm, cần mẫn ra đồng. Dù nắng gắt hay mưa rơi, bác vẫn miệt mài làm việc để có những hạt gạo thơm ngon nuôi sống mọi người." Tính cách của bác nông dân trong đoạn văn là?',
    difficulty: 'EASY',
    explanation: 'Bác nông dân được miêu tả là người chăm chỉ, cần cù, chịu thương chịu khó.',
    options: [
      { key: 'A', content: 'Lười biếng', correct: false },
      { key: 'B', content: 'Chăm chỉ, cần cù', correct: true },
      { key: 'C', content: 'Nóng nảy', correct: false },
      { key: 'D', content: 'Vui vẻ, hài hước', correct: false },
    ],
  },
  {
    content: 'Trong đoạn thơ "Quê hương là chùm khế ngọt / Cho con trèo hái mỗi ngày / Quê hương là đường đi học / Con về rợp bướm vàng bay", tác giả so sánh quê hương với những hình ảnh nào?',
    difficulty: 'MEDIUM',
    explanation: 'Tác giả so sánh quê hương với chùm khế ngọt và đường đi học - những hình ảnh gần gũi, thân thuộc.',
    options: [
      { key: 'A', content: 'Biển cả và núi cao', correct: false },
      { key: 'B', content: 'Chùm khế ngọt và đường đi học', correct: true },
      { key: 'C', content: 'Ánh trăng và sao trời', correct: false },
      { key: 'D', content: 'Cánh đồng và bầu trời', correct: false },
    ],
  },
  {
    content: 'Từ "rợp" trong câu "con về rợp bướm vàng bay" có nghĩa là?',
    difficulty: 'MEDIUM',
    explanation: '"Rợp" có nghĩa là che phủ, đầy khắp - ý nói bướm bay nhiều đến mức che phủ cả con đường.',
    options: [
      { key: 'A', content: 'Trống trải', correct: false },
      { key: 'B', content: 'Che phủ, đầy khắp', correct: true },
      { key: 'C', content: 'Lất phất', correct: false },
      { key: 'D', content: 'Lạnh lẽo', correct: false },
    ],
  },
  {
    content: 'Đọc câu: "Đôi mắt bé sáng long lanh như hai vì sao." Đây là biện pháp tu từ gì?',
    difficulty: 'MEDIUM',
    explanation: 'Câu này sử dụng biện pháp so sánh: đôi mắt được so sánh với hai vì sao.',
    options: [
      { key: 'A', content: 'Nhân hóa', correct: false },
      { key: 'B', content: 'So sánh', correct: true },
      { key: 'C', content: 'Điệp ngữ', correct: false },
      { key: 'D', content: 'Đảo ngữ', correct: false },
    ],
  },
  {
    content: 'Câu "Mưa ơi, xin hãy dừng lại!" sử dụng biện pháp tu từ gì?',
    difficulty: 'MEDIUM',
    explanation: 'Câu này sử dụng biện pháp nhân hóa - mưa được xem như người và được gọi, yêu cầu.',
    options: [
      { key: 'A', content: 'So sánh', correct: false },
      { key: 'B', content: 'Điệp ngữ', correct: false },
      { key: 'C', content: 'Nhân hóa', correct: true },
      { key: 'D', content: 'Liệt kê', correct: false },
    ],
  },
  // ===== TẬP LÀM VĂN - VĂN MIÊU TẢ =====
  {
    content: 'Bài văn miêu tả người thường có bố cục mấy phần?',
    difficulty: 'EASY',
    explanation: 'Bài văn miêu tả người thường có 3 phần: Mở bài, thân bài và kết bài.',
    options: [
      { key: 'A', content: '2 phần', correct: false },
      { key: 'B', content: '3 phần', correct: true },
      { key: 'C', content: '4 phần', correct: false },
      { key: 'D', content: '5 phần', correct: false },
    ],
  },
  {
    content: 'Khi miêu tả ngoại hình của người, ta thường chú ý đến những gì?',
    difficulty: 'MEDIUM',
    explanation: 'Miêu tả ngoại hình người thường bao gồm: vóc dáng, nét mặt (mắt, mũi, miệng), mái tóc, da, cách ăn mặc.',
    options: [
      { key: 'A', content: 'Chỉ kể tên người', correct: false },
      { key: 'B', content: 'Vóc dáng, nét mặt, mái tóc, cách ăn mặc', correct: true },
      { key: 'C', content: 'Chỉ kể tuổi tác', correct: false },
      { key: 'D', content: 'Chỉ kể công việc', correct: false },
    ],
  },
  {
    content: 'Đoạn văn nào miêu tả hành động của nhân vật?',
    difficulty: 'MEDIUM',
    explanation: '"Bà cụ chậm rãi bước từng bước, đôi tay run run vịn vào chiếc gậy" - miêu tả hành động cụ thể.',
    options: [
      { key: 'A', content: 'Bà cụ là người tốt bụng.', correct: false },
      { key: 'B', content: 'Bà cụ chậm rãi bước từng bước, đôi tay run run vịn vào chiếc gậy.', correct: true },
      { key: 'C', content: 'Bà cụ sống ở làng quê.', correct: false },
      { key: 'D', content: 'Bà cụ đã nhiều tuổi.', correct: false },
    ],
  },
  {
    content: 'Phần mở bài của bài văn miêu tả cảnh cần làm gì?',
    difficulty: 'EASY',
    explanation: 'Phần mở bài giới thiệu cảnh được tả (tên cảnh, địa điểm, thời điểm quan sát).',
    options: [
      { key: 'A', content: 'Miêu tả chi tiết toàn bộ cảnh vật', correct: false },
      { key: 'B', content: 'Giới thiệu cảnh vật sẽ được miêu tả', correct: true },
      { key: 'C', content: 'Nêu cảm nghĩ về cảnh vật', correct: false },
      { key: 'D', content: 'Liệt kê tất cả chi tiết', correct: false },
    ],
  },
  {
    content: 'Phần kết bài của bài văn thường viết gì?',
    difficulty: 'EASY',
    explanation: 'Phần kết bài thường nêu cảm nghĩ, ấn tượng sâu sắc nhất của người viết về đối tượng được miêu tả.',
    options: [
      { key: 'A', content: 'Giới thiệu lại đề tài', correct: false },
      { key: 'B', content: 'Miêu tả thêm chi tiết', correct: false },
      { key: 'C', content: 'Nêu cảm nghĩ, ấn tượng của người viết', correct: true },
      { key: 'D', content: 'Đặt câu hỏi cho người đọc', correct: false },
    ],
  },
  {
    content: 'Từ nào KHÔNG phải là từ láy?',
    difficulty: 'MEDIUM',
    explanation: '"Học sinh" là từ ghép (hai từ tạo nghĩa mới), không phải từ láy.',
    options: [
      { key: 'A', content: 'Lung linh', correct: false },
      { key: 'B', content: 'Học sinh', correct: true },
      { key: 'C', content: 'Lấp lánh', correct: false },
      { key: 'D', content: 'Nhẹ nhàng', correct: false },
    ],
  },
  {
    content: 'Từ ghép "xe đạp" được tạo thành bằng cách nào?',
    difficulty: 'MEDIUM',
    explanation: '"Xe đạp" là từ ghép phân loại: "xe" là từ chỉ loại phương tiện, "đạp" chỉ cách vận hành, ghép lại tạo thành tên gọi.',
    options: [
      { key: 'A', content: 'Lặp âm đầu', correct: false },
      { key: 'B', content: 'Lặp vần', correct: false },
      { key: 'C', content: 'Ghép hai tiếng có quan hệ chính phụ', correct: true },
      { key: 'D', content: 'Lặp toàn bộ', correct: false },
    ],
  },
  {
    content: 'Đại từ "họ" trong câu "Họ đang học bài" thay thế cho?',
    difficulty: 'EASY',
    explanation: '"Họ" là đại từ nhân xưng thay thế cho danh từ chỉ nhiều người (số nhiều ngôi thứ ba).',
    options: [
      { key: 'A', content: 'Một người nào đó', correct: false },
      { key: 'B', content: 'Nhiều người nào đó', correct: true },
      { key: 'C', content: 'Người nói', correct: false },
      { key: 'D', content: 'Người nghe', correct: false },
    ],
  },
  {
    content: 'Câu "Cậu bé nhảy qua con mương." - động từ trong câu là?',
    difficulty: 'EASY',
    explanation: '"Nhảy" là động từ (từ chỉ hoạt động, hành động).',
    options: [
      { key: 'A', content: 'Cậu bé', correct: false },
      { key: 'B', content: 'Con mương', correct: false },
      { key: 'C', content: 'Nhảy', correct: true },
      { key: 'D', content: 'Qua', correct: false },
    ],
  },
  {
    content: 'Tính từ trong câu "Con mèo nhỏ đang ngủ ngon lành" là?',
    difficulty: 'EASY',
    explanation: '"Nhỏ" và "ngon lành" là tính từ. "Nhỏ" chỉ kích thước, "ngon lành" chỉ trạng thái.',
    options: [
      { key: 'A', content: 'Con mèo', correct: false },
      { key: 'B', content: 'Đang ngủ', correct: false },
      { key: 'C', content: 'Nhỏ', correct: true },
      { key: 'D', content: 'Ngủ', correct: false },
    ],
  },
  {
    content: 'Câu "Hôm nay trời đẹp quá!" là kiểu câu gì?',
    difficulty: 'EASY',
    explanation: 'Câu có dấu "!" và thể hiện cảm xúc là câu cảm thán.',
    options: [
      { key: 'A', content: 'Câu kể', correct: false },
      { key: 'B', content: 'Câu hỏi', correct: false },
      { key: 'C', content: 'Câu cảm thán', correct: true },
      { key: 'D', content: 'Câu cầu khiến', correct: false },
    ],
  },
  {
    content: 'Câu "Hãy đứng dậy!" là kiểu câu gì?',
    difficulty: 'EASY',
    explanation: 'Câu dùng để yêu cầu, ra lệnh là câu cầu khiến.',
    options: [
      { key: 'A', content: 'Câu kể', correct: false },
      { key: 'B', content: 'Câu cầu khiến', correct: true },
      { key: 'C', content: 'Câu cảm thán', correct: false },
      { key: 'D', content: 'Câu hỏi', correct: false },
    ],
  },
  {
    content: 'Từ "xanh" trong "trời xanh" và "xanh" trong "xanh lá cây" có quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: 'Từ "xanh" có nhiều sắc thái khác nhau (xanh da trời, xanh lá cây...) - đây là từ nhiều nghĩa.',
    options: [
      { key: 'A', content: 'Từ đồng âm', correct: false },
      { key: 'B', content: 'Từ đồng nghĩa', correct: false },
      { key: 'C', content: 'Từ nhiều nghĩa', correct: true },
      { key: 'D', content: 'Từ trái nghĩa', correct: false },
    ],
  },
  {
    content: 'Biện pháp tu từ nào được sử dụng trong câu: "Dòng sông uốn mình qua cánh đồng xanh"?',
    difficulty: 'MEDIUM',
    explanation: '"Uốn mình" là hành động của người, gán cho dòng sông - đây là nhân hóa.',
    options: [
      { key: 'A', content: 'So sánh', correct: false },
      { key: 'B', content: 'Nhân hóa', correct: true },
      { key: 'C', content: 'Điệp ngữ', correct: false },
      { key: 'D', content: 'Liệt kê', correct: false },
    ],
  },
  {
    content: 'Điền từ thích hợp: "Học ___ không tày học bạn." (tục ngữ)',
    difficulty: 'MEDIUM',
    explanation: 'Tục ngữ đầy đủ là: "Học thầy không tày học bạn."',
    options: [
      { key: 'A', content: 'mạnh', correct: false },
      { key: 'B', content: 'giỏi', correct: false },
      { key: 'C', content: 'thầy', correct: true },
      { key: 'D', content: 'nhiều', correct: false },
    ],
  },
  {
    content: 'Đoạn văn miêu tả vật thường miêu tả theo trình tự nào?',
    difficulty: 'MEDIUM',
    explanation: 'Miêu tả đồ vật thường theo trình tự từ bao quát đến chi tiết, từ ngoài vào trong.',
    options: [
      { key: 'A', content: 'Từ chi tiết nhỏ đến tổng thể', correct: false },
      { key: 'B', content: 'Từ bao quát đến chi tiết, từ ngoài vào trong', correct: true },
      { key: 'C', content: 'Theo thứ tự từ điển', correct: false },
      { key: 'D', content: 'Không cần theo trình tự', correct: false },
    ],
  },
  {
    content: 'Từ "chạy" trong "chạy bộ" và "chạy" trong "đồng hồ chạy" có quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: '"Chạy" có nghĩa gốc là di chuyển nhanh, nghĩa chuyển là hoạt động (đồng hồ chạy). Đây là từ nhiều nghĩa.',
    options: [
      { key: 'A', content: 'Từ đồng âm', correct: false },
      { key: 'B', content: 'Từ trái nghĩa', correct: false },
      { key: 'C', content: 'Từ nhiều nghĩa', correct: true },
      { key: 'D', content: 'Từ đồng nghĩa', correct: false },
    ],
  },
  {
    content: 'Trong câu "Chị ấy hát hay lắm", từ "hay" thuộc loại từ nào?',
    difficulty: 'EASY',
    explanation: '"Hay" ở đây chỉ đặc điểm, tính chất - là tính từ.',
    options: [
      { key: 'A', content: 'Động từ', correct: false },
      { key: 'B', content: 'Danh từ', correct: false },
      { key: 'C', content: 'Tính từ', correct: true },
      { key: 'D', content: 'Quan hệ từ', correct: false },
    ],
  },
  {
    content: 'Danh từ chung là gì?',
    difficulty: 'EASY',
    explanation: 'Danh từ chung là danh từ chỉ tên của một loại sự vật, không viết hoa (ví dụ: sông, núi, trường, thành phố).',
    options: [
      { key: 'A', content: 'Tên riêng của người, địa danh', correct: false },
      { key: 'B', content: 'Tên gọi chung cho một loại sự vật', correct: true },
      { key: 'C', content: 'Từ chỉ hành động', correct: false },
      { key: 'D', content: 'Từ chỉ đặc điểm', correct: false },
    ],
  },
  {
    content: 'Từ nào sau đây là danh từ riêng?',
    difficulty: 'EASY',
    explanation: '"Hà Nội" là danh từ riêng - tên gọi riêng của một địa danh cụ thể, phải viết hoa.',
    options: [
      { key: 'A', content: 'thành phố', correct: false },
      { key: 'B', content: 'sông', correct: false },
      { key: 'C', content: 'Hà Nội', correct: true },
      { key: 'D', content: 'núi', correct: false },
    ],
  },
  {
    content: 'Câu "Bạn có thể cho tôi mượn cây bút không?" là kiểu câu gì?',
    difficulty: 'MEDIUM',
    explanation: 'Đây là câu hỏi (dùng để hỏi), kết thúc bằng dấu "?".',
    options: [
      { key: 'A', content: 'Câu cầu khiến', correct: false },
      { key: 'B', content: 'Câu hỏi', correct: true },
      { key: 'C', content: 'Câu cảm thán', correct: false },
      { key: 'D', content: 'Câu kể', correct: false },
    ],
  },
  {
    content: 'Trạng ngữ trong câu "Buổi sáng, em thường dậy sớm tập thể dục" là?',
    difficulty: 'MEDIUM',
    explanation: 'Trạng ngữ "Buổi sáng" bổ sung thông tin về thời gian cho câu.',
    options: [
      { key: 'A', content: 'em', correct: false },
      { key: 'B', content: 'tập thể dục', correct: false },
      { key: 'C', content: 'Buổi sáng', correct: true },
      { key: 'D', content: 'dậy sớm', correct: false },
    ],
  },
  {
    content: 'Điền từ thích hợp vào chỗ trống: "Bầu ___ thương lấy bí cùng".',
    difficulty: 'MEDIUM',
    explanation: 'Câu tục ngữ đầy đủ: "Bầu ơi thương lấy bí cùng".',
    options: [
      { key: 'A', content: 'hỡi', correct: false },
      { key: 'B', content: 'ơi', correct: true },
      { key: 'C', content: 'nhỉ', correct: false },
      { key: 'D', content: 'nhé', correct: false },
    ],
  },
  {
    content: 'Từ "lao xao" trong "tiếng lá lao xao" là từ loại gì?',
    difficulty: 'MEDIUM',
    explanation: '"Lao xao" là từ láy, mô phỏng âm thanh nhẹ nhàng, đây cũng là tính từ chỉ trạng thái.',
    options: [
      { key: 'A', content: 'Danh từ', correct: false },
      { key: 'B', content: 'Động từ', correct: false },
      { key: 'C', content: 'Từ láy tượng thanh', correct: true },
      { key: 'D', content: 'Quan hệ từ', correct: false },
    ],
  },
  {
    content: 'Văn miêu tả khác văn tường thuật ở điểm nào?',
    difficulty: 'HARD',
    explanation: 'Văn miêu tả tái hiện đặc điểm, tính chất của người/vật/cảnh. Văn tường thuật kể lại sự việc theo trình tự thời gian.',
    options: [
      { key: 'A', content: 'Không có sự khác biệt', correct: false },
      { key: 'B', content: 'Văn miêu tả tái hiện đặc điểm; văn tường thuật kể lại sự việc', correct: true },
      { key: 'C', content: 'Văn miêu tả dài hơn', correct: false },
      { key: 'D', content: 'Văn tường thuật khó hơn', correct: false },
    ],
  },
  {
    content: 'Câu nào có sử dụng quan hệ từ?',
    difficulty: 'MEDIUM',
    explanation: '"Và" là quan hệ từ nối hai vế câu.',
    options: [
      { key: 'A', content: 'Em học bài.', correct: false },
      { key: 'B', content: 'Em học bài và chị nấu cơm.', correct: true },
      { key: 'C', content: 'Mặt trời mọc.', correct: false },
      { key: 'D', content: 'Hoa nở rộ.', correct: false },
    ],
  },
  {
    content: 'Từ "thương" trong câu "Em thương mẹ lắm" và "cây thương" có quan hệ gì?',
    difficulty: 'HARD',
    explanation: '"Thương" (tình cảm yêu mến) và "thương" (vũ khí - cây thương/giáo) là hai từ đồng âm, phát âm giống nhau nhưng nghĩa khác hoàn toàn.',
    options: [
      { key: 'A', content: 'Từ nhiều nghĩa', correct: false },
      { key: 'B', content: 'Từ đồng nghĩa', correct: false },
      { key: 'C', content: 'Từ đồng âm', correct: true },
      { key: 'D', content: 'Từ trái nghĩa', correct: false },
    ],
  },
  {
    content: 'Khi viết văn miêu tả cần tránh điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Khi viết văn miêu tả cần tránh liệt kê đơn thuần mà phải có cảm xúc, hình ảnh sinh động.',
    options: [
      { key: 'A', content: 'Dùng hình ảnh sinh động', correct: false },
      { key: 'B', content: 'Bày tỏ cảm xúc', correct: false },
      { key: 'C', content: 'Chỉ liệt kê mà không có cảm xúc', correct: true },
      { key: 'D', content: 'Sử dụng từ ngữ phong phú', correct: false },
    ],
  },
  {
    content: 'Quan hệ từ "mặc dù...nhưng" diễn tả mối quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: '"Mặc dù...nhưng" diễn tả quan hệ tương phản, nghịch lý giữa hai vế.',
    options: [
      { key: 'A', content: 'Quan hệ nguyên nhân - kết quả', correct: false },
      { key: 'B', content: 'Quan hệ tương phản', correct: true },
      { key: 'C', content: 'Quan hệ điều kiện', correct: false },
      { key: 'D', content: 'Quan hệ bổ sung', correct: false },
    ],
  },
  {
    content: 'Trong bài "Thư gửi các học sinh" của Bác Hồ, Bác muốn nhắn nhủ điều gì với học sinh?',
    difficulty: 'HARD',
    explanation: 'Bác Hồ nhắn nhủ học sinh phải cố gắng học tập để sau này xây dựng đất nước, sánh vai với các cường quốc năm châu.',
    options: [
      { key: 'A', content: 'Hãy vui chơi thỏa thích', correct: false },
      { key: 'B', content: 'Cố gắng học tập để sau này xây dựng đất nước', correct: true },
      { key: 'C', content: 'Nên tham gia hoạt động thể thao', correct: false },
      { key: 'D', content: 'Cần yêu thương cha mẹ', correct: false },
    ],
  },
  {
    content: 'Từ "mái ấm" trong "mái ấm gia đình" thuộc loại từ nào?',
    difficulty: 'MEDIUM',
    explanation: '"Mái ấm" là từ ghép, được dùng với nghĩa chuyển để chỉ gia đình yêu thương, ấm cúng.',
    options: [
      { key: 'A', content: 'Từ láy', correct: false },
      { key: 'B', content: 'Từ ghép nghĩa chuyển', correct: true },
      { key: 'C', content: 'Từ đơn', correct: false },
      { key: 'D', content: 'Từ đồng âm', correct: false },
    ],
  },
  {
    content: 'Câu "Trên cành cây, những chú chim đang hót líu lo." - Vị ngữ là?',
    difficulty: 'MEDIUM',
    explanation: 'Vị ngữ là phần thông báo về chủ thể: "đang hót líu lo".',
    options: [
      { key: 'A', content: 'Trên cành cây', correct: false },
      { key: 'B', content: 'Những chú chim', correct: false },
      { key: 'C', content: 'Đang hót líu lo', correct: true },
      { key: 'D', content: 'Líu lo', correct: false },
    ],
  },
  {
    content: 'Phép liên kết nào được dùng trong đoạn: "Nam học rất chăm. Bạn ấy luôn đạt điểm cao."?',
    difficulty: 'HARD',
    explanation: '"Bạn ấy" thay thế cho "Nam" - đây là phép thế (dùng đại từ thay thế).',
    options: [
      { key: 'A', content: 'Phép lặp', correct: false },
      { key: 'B', content: 'Phép thế', correct: true },
      { key: 'C', content: 'Phép nối', correct: false },
      { key: 'D', content: 'Phép liên tưởng', correct: false },
    ],
  },
  {
    content: 'Từ nào viết đúng chính tả?',
    difficulty: 'EASY',
    explanation: '"Kỉ niệm" là cách viết đúng chính tả tiếng Việt.',
    options: [
      { key: 'A', content: 'Kỷ niệm', correct: false },
      { key: 'B', content: 'Kỉ niệm', correct: true },
      { key: 'C', content: 'Kỵ niệm', correct: false },
      { key: 'D', content: 'Kị niệm', correct: false },
    ],
  },
  {
    content: 'Câu nào dưới đây mắc lỗi lặp từ?',
    difficulty: 'MEDIUM',
    explanation: '"Bạn Nam học tập học bài rất chăm chỉ" - lặp "học" không cần thiết.',
    options: [
      { key: 'A', content: 'Hôm nay trời nắng đẹp.', correct: false },
      { key: 'B', content: 'Bạn Nam học tập học bài rất chăm chỉ.', correct: true },
      { key: 'C', content: 'Mặt trời mọc ở phía Đông.', correct: false },
      { key: 'D', content: 'Em rất yêu mẹ của em.', correct: false },
    ],
  },
  {
    content: 'Tên bài thơ "Hạt gạo làng ta" của tác giả nào?',
    difficulty: 'HARD',
    explanation: '"Hạt gạo làng ta" là bài thơ của nhà thơ Trần Đăng Khoa.',
    options: [
      { key: 'A', content: 'Tố Hữu', correct: false },
      { key: 'B', content: 'Trần Đăng Khoa', correct: true },
      { key: 'C', content: 'Xuân Quỳnh', correct: false },
      { key: 'D', content: 'Phạm Tiến Duật', correct: false },
    ],
  },
  {
    content: 'Câu "Nếu em cố gắng học thì em sẽ đạt điểm cao." thể hiện quan hệ nào?',
    difficulty: 'MEDIUM',
    explanation: '"Nếu...thì" thể hiện quan hệ điều kiện - kết quả.',
    options: [
      { key: 'A', content: 'Nguyên nhân - kết quả', correct: false },
      { key: 'B', content: 'Điều kiện - kết quả', correct: true },
      { key: 'C', content: 'Tương phản', correct: false },
      { key: 'D', content: 'Tăng tiến', correct: false },
    ],
  },
  {
    content: 'Từ "bàn" trong "bàn ghế" và "bàn" trong "bàn bạc" có quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: '"Bàn" (đồ vật) và "bàn" (thảo luận) là hai từ đồng âm khác nghĩa hoàn toàn.',
    options: [
      { key: 'A', content: 'Từ nhiều nghĩa', correct: false },
      { key: 'B', content: 'Từ đồng âm', correct: true },
      { key: 'C', content: 'Từ đồng nghĩa', correct: false },
      { key: 'D', content: 'Từ trái nghĩa', correct: false },
    ],
  },
  {
    content: 'Câu ca dao "Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra" sử dụng biện pháp tu từ nào?',
    difficulty: 'MEDIUM',
    explanation: 'Câu ca dao sử dụng biện pháp so sánh: công cha được so sánh với núi, nghĩa mẹ được so sánh với nước nguồn.',
    options: [
      { key: 'A', content: 'Nhân hóa', correct: false },
      { key: 'B', content: 'So sánh', correct: true },
      { key: 'C', content: 'Điệp ngữ', correct: false },
      { key: 'D', content: 'Ẩn dụ', correct: false },
    ],
  },
  {
    content: 'Từ nào sau đây là từ ghép có nghĩa tổng hợp?',
    difficulty: 'MEDIUM',
    explanation: '"Quần áo" là từ ghép tổng hợp (chỉ chung đồ mặc, gồm cả quần lẫn áo).',
    options: [
      { key: 'A', content: 'Xe đạp', correct: false },
      { key: 'B', content: 'Quần áo', correct: true },
      { key: 'C', content: 'Học sinh', correct: false },
      { key: 'D', content: 'Bút chì', correct: false },
    ],
  },
  {
    content: 'Trong đoạn văn kể chuyện, yếu tố nào quan trọng nhất?',
    difficulty: 'MEDIUM',
    explanation: 'Trong văn kể chuyện, diễn biến sự việc (cốt truyện) là quan trọng nhất - phải có mở đầu, phát triển và kết thúc rõ ràng.',
    options: [
      { key: 'A', content: 'Chỉ cần có nhiều nhân vật', correct: false },
      { key: 'B', content: 'Diễn biến sự việc mạch lạc, có đầu có cuối', correct: true },
      { key: 'C', content: 'Dùng nhiều từ khó', correct: false },
      { key: 'D', content: 'Đoạn văn thật dài', correct: false },
    ],
  },
  {
    content: '"Trắng như tuyết" là ví dụ về?',
    difficulty: 'EASY',
    explanation: '"Trắng như tuyết" là so sánh ngang bằng, dùng "như" để so sánh hai sự vật có điểm chung là màu trắng.',
    options: [
      { key: 'A', content: 'Nhân hóa', correct: false },
      { key: 'B', content: 'So sánh', correct: true },
      { key: 'C', content: 'Điệp ngữ', correct: false },
      { key: 'D', content: 'Liệt kê', correct: false },
    ],
  },
  {
    content: 'Câu "Mùa xuân là tết trồng cây" - phần in đậm "là tết trồng cây" là?',
    difficulty: 'MEDIUM',
    explanation: '"Là tết trồng cây" là vị ngữ của câu, bổ sung thông tin cho chủ ngữ "Mùa xuân".',
    options: [
      { key: 'A', content: 'Chủ ngữ', correct: false },
      { key: 'B', content: 'Vị ngữ', correct: true },
      { key: 'C', content: 'Trạng ngữ', correct: false },
      { key: 'D', content: 'Bổ ngữ', correct: false },
    ],
  },
  {
    content: 'Viết đúng chính tả: "chim ___ trên cành" (hót hay hót)',
    difficulty: 'EASY',
    explanation: 'Viết đúng là "hót" (chim hót) không phải "hót". Đây là từ chỉ tiếng chim kêu.',
    options: [
      { key: 'A', content: 'hót', correct: true },
      { key: 'B', content: 'hót', correct: false },
      { key: 'C', content: 'hớt', correct: false },
      { key: 'D', content: 'hốt', correct: false },
    ],
  },
  {
    content: 'Câu "Bầu trời đêm nay thật đẹp!" là câu loại gì?',
    difficulty: 'EASY',
    explanation: 'Câu có dấu chấm than và bày tỏ cảm xúc (khen ngợi) là câu cảm thán.',
    options: [
      { key: 'A', content: 'Câu kể', correct: false },
      { key: 'B', content: 'Câu hỏi', correct: false },
      { key: 'C', content: 'Câu cảm thán', correct: true },
      { key: 'D', content: 'Câu cầu khiến', correct: false },
    ],
  },
  {
    content: 'Phần "Thân bài" trong bài văn miêu tả cần?',
    difficulty: 'EASY',
    explanation: 'Thân bài miêu tả chi tiết đặc điểm nổi bật của đối tượng theo một trình tự nhất định.',
    options: [
      { key: 'A', content: 'Giới thiệu đối tượng', correct: false },
      { key: 'B', content: 'Miêu tả chi tiết đặc điểm của đối tượng', correct: true },
      { key: 'C', content: 'Nêu cảm nghĩ kết bài', correct: false },
      { key: 'D', content: 'Liệt kê tên người và vật', correct: false },
    ],
  },
  {
    content: 'Từ "chạy" trong "chạy thi" và "chạy" trong "máy chạy" khác nhau ở điểm gì?',
    difficulty: 'MEDIUM',
    explanation: '"Chạy thi" là nghĩa gốc (di chuyển nhanh bằng chân), "máy chạy" là nghĩa chuyển (hoạt động). Đây là từ nhiều nghĩa.',
    options: [
      { key: 'A', content: 'Là từ đồng âm', correct: false },
      { key: 'B', content: 'Nghĩa gốc và nghĩa chuyển của từ nhiều nghĩa', correct: true },
      { key: 'C', content: 'Là từ trái nghĩa', correct: false },
      { key: 'D', content: 'Không khác nhau', correct: false },
    ],
  },
  {
    content: 'Thơ lục bát có đặc điểm gì về số tiếng trong mỗi dòng?',
    difficulty: 'HARD',
    explanation: 'Thơ lục bát có hai dòng luân phiên: dòng lục (6 tiếng) và dòng bát (8 tiếng).',
    options: [
      { key: 'A', content: 'Mỗi dòng 7 tiếng', correct: false },
      { key: 'B', content: 'Luân phiên dòng 6 tiếng và dòng 8 tiếng', correct: true },
      { key: 'C', content: 'Mỗi dòng 5 tiếng', correct: false },
      { key: 'D', content: 'Tất cả dòng 8 tiếng', correct: false },
    ],
  },
  {
    content: 'Đọc và trả lời: "Mỗi sáng mai thức dậy, bầu trời trong xanh và không khí trong lành làm tâm hồn tôi thêm phấn chấn." Trạng ngữ trong câu là?',
    difficulty: 'MEDIUM',
    explanation: '"Mỗi sáng mai thức dậy" là trạng ngữ chỉ thời gian.',
    options: [
      { key: 'A', content: 'Bầu trời trong xanh', correct: false },
      { key: 'B', content: 'Mỗi sáng mai thức dậy', correct: true },
      { key: 'C', content: 'Tâm hồn tôi', correct: false },
      { key: 'D', content: 'Không khí trong lành', correct: false },
    ],
  },
  {
    content: 'Câu thành ngữ "Chín bỏ làm mười" có nghĩa là?',
    difficulty: 'MEDIUM',
    explanation: '"Chín bỏ làm mười" nghĩa là bỏ qua, tha thứ những điều nhỏ nhặt, không quá cứng nhắc.',
    options: [
      { key: 'A', content: 'Tính toán cẩn thận', correct: false },
      { key: 'B', content: 'Bỏ qua, tha thứ điều nhỏ nhặt', correct: true },
      { key: 'C', content: 'Làm việc chậm chạp', correct: false },
      { key: 'D', content: 'Tính toán sai', correct: false },
    ],
  },
  {
    content: 'Câu "Sương mù bao phủ khắp núi đồi" sử dụng kiểu câu nào?',
    difficulty: 'EASY',
    explanation: 'Câu kể (trần thuật) dùng để thông báo, miêu tả sự việc, kết thúc bằng dấu chấm.',
    options: [
      { key: 'A', content: 'Câu hỏi', correct: false },
      { key: 'B', content: 'Câu cảm thán', correct: false },
      { key: 'C', content: 'Câu kể (trần thuật)', correct: true },
      { key: 'D', content: 'Câu cầu khiến', correct: false },
    ],
  },
  {
    content: 'Từ nào đồng nghĩa với "bình tĩnh"?',
    difficulty: 'EASY',
    explanation: '"Điềm tĩnh" có nghĩa gần giống "bình tĩnh" - đều chỉ trạng thái không bị kích động, lo lắng.',
    options: [
      { key: 'A', content: 'Nóng vội', correct: false },
      { key: 'B', content: 'Điềm tĩnh', correct: true },
      { key: 'C', content: 'Hấp tấp', correct: false },
      { key: 'D', content: 'Cuống cuồng', correct: false },
    ],
  },
  {
    content: 'Từ trái nghĩa với "thành thật" là?',
    difficulty: 'EASY',
    explanation: '"Dối trá" là từ trái nghĩa với "thành thật".',
    options: [
      { key: 'A', content: 'Trung thực', correct: false },
      { key: 'B', content: 'Chân thành', correct: false },
      { key: 'C', content: 'Dối trá', correct: true },
      { key: 'D', content: 'Ngay thẳng', correct: false },
    ],
  },
  {
    content: 'Khi viết bài văn miêu tả con vật, cần tả theo trình tự nào?',
    difficulty: 'MEDIUM',
    explanation: 'Tả con vật thường theo trình tự: hình dáng bên ngoài (hình thể, màu lông...) → hoạt động đặc trưng → quan hệ với người.',
    options: [
      { key: 'A', content: 'Chỉ tả màu sắc', correct: false },
      { key: 'B', content: 'Hình dáng → hoạt động → quan hệ với người', correct: true },
      { key: 'C', content: 'Chỉ kể tên con vật', correct: false },
      { key: 'D', content: 'Tả ngẫu nhiên không cần trình tự', correct: false },
    ],
  },
  {
    content: 'Câu "Mặc dù mệt nhưng anh ấy vẫn tiếp tục làm việc" diễn tả?',
    difficulty: 'MEDIUM',
    explanation: '"Mặc dù...nhưng" diễn tả quan hệ tương phản: kết quả xảy ra bất chấp điều kiện bất lợi.',
    options: [
      { key: 'A', content: 'Quan hệ nguyên nhân - kết quả', correct: false },
      { key: 'B', content: 'Quan hệ tương phản', correct: true },
      { key: 'C', content: 'Quan hệ điều kiện', correct: false },
      { key: 'D', content: 'Quan hệ bổ sung', correct: false },
    ],
  },
  {
    content: 'Tác phẩm "Dế Mèn phiêu lưu ký" của nhà văn nào?',
    difficulty: 'MEDIUM',
    explanation: '"Dế Mèn phiêu lưu ký" là tác phẩm nổi tiếng của nhà văn Tô Hoài.',
    options: [
      { key: 'A', content: 'Nam Cao', correct: false },
      { key: 'B', content: 'Tô Hoài', correct: true },
      { key: 'C', content: 'Nguyễn Tuân', correct: false },
      { key: 'D', content: 'Ngô Tất Tố', correct: false },
    ],
  },
  {
    content: 'Đọc đoạn: "Ông tôi đã 80 tuổi nhưng vẫn còn minh mẫn. Mỗi sáng ông dậy sớm đi tập thể dục rồi về đọc báo." Ông của tác giả là người như thế nào?',
    difficulty: 'EASY',
    explanation: 'Ông tuy tuổi cao nhưng còn minh mẫn, siêng năng tập thể dục - là người sức khỏe tốt, nề nếp.',
    options: [
      { key: 'A', content: 'Lười biếng', correct: false },
      { key: 'B', content: 'Minh mẫn, nề nếp, chăm tập thể dục', correct: true },
      { key: 'C', content: 'Hay ốm', correct: false },
      { key: 'D', content: 'Không thích đọc báo', correct: false },
    ],
  },
  {
    content: 'Từ "leo" trong "leo trèo" và "leo" trong "leo thang danh vọng" khác nhau như thế nào?',
    difficulty: 'MEDIUM',
    explanation: '"Leo trèo" là nghĩa gốc (leo lên vật thể), "leo thang danh vọng" là nghĩa chuyển (đạt được vị trí cao hơn). Từ nhiều nghĩa.',
    options: [
      { key: 'A', content: 'Đây là từ đồng âm', correct: false },
      { key: 'B', content: 'Nghĩa gốc và nghĩa chuyển của từ nhiều nghĩa', correct: true },
      { key: 'C', content: 'Hoàn toàn giống nhau', correct: false },
      { key: 'D', content: 'Đây là từ trái nghĩa', correct: false },
    ],
  },
  {
    content: 'Khi viết bài văn, câu chủ đề của đoạn văn thường đặt ở vị trí nào?',
    difficulty: 'MEDIUM',
    explanation: 'Câu chủ đề (câu nêu ý chính) thường đặt ở đầu đoạn văn (diễn dịch) hoặc cuối đoạn (quy nạp).',
    options: [
      { key: 'A', content: 'Chỉ ở giữa đoạn', correct: false },
      { key: 'B', content: 'Ở đầu hoặc cuối đoạn', correct: true },
      { key: 'C', content: 'Không cần câu chủ đề', correct: false },
      { key: 'D', content: 'Bất cứ đâu cũng được', correct: false },
    ],
  },
  {
    content: 'Từ "học" trong "học hành", "học thuộc", "học lỏm" có quan hệ gì?',
    difficulty: 'MEDIUM',
    explanation: '"Học" trong các cụm này có cùng nghĩa gốc (tiếp thu kiến thức) nhưng với sắc thái khác nhau. Đây là từ nhiều nghĩa.',
    options: [
      { key: 'A', content: 'Từ đồng âm', correct: false },
      { key: 'B', content: 'Từ nhiều nghĩa', correct: true },
      { key: 'C', content: 'Từ trái nghĩa', correct: false },
      { key: 'D', content: 'Từ đồng nghĩa', correct: false },
    ],
  },
  {
    content: 'Câu văn nào có sử dụng điệp ngữ?',
    difficulty: 'MEDIUM',
    explanation: '"Mưa rơi, mưa rơi, mưa rơi mãi" lặp lại từ "mưa rơi" - đây là điệp ngữ.',
    options: [
      { key: 'A', content: 'Trời xanh biếc.', correct: false },
      { key: 'B', content: 'Mưa rơi, mưa rơi, mưa rơi mãi.', correct: true },
      { key: 'C', content: 'Hoa nở rộ.', correct: false },
      { key: 'D', content: 'Em học bài.', correct: false },
    ],
  },
  {
    content: 'Phép liên kết "lặp từ" trong đoạn văn có tác dụng gì?',
    difficulty: 'HARD',
    explanation: 'Phép lặp từ (lặp lại một từ/cụm từ ở các câu khác nhau) giúp tạo sự liên kết, nhấn mạnh và tránh hiểu nhầm.',
    options: [
      { key: 'A', content: 'Làm đoạn văn dài hơn', correct: false },
      { key: 'B', content: 'Tạo liên kết và nhấn mạnh ý', correct: true },
      { key: 'C', content: 'Là lỗi viết văn', correct: false },
      { key: 'D', content: 'Không có tác dụng gì', correct: false },
    ],
  },
  { content: 'Câu "Mặc dù trời mưa, chúng tôi vẫn đi học" thuộc loại câu gì?', difficulty: 'MEDIUM', explanation: 'Câu ghép chỉ quan hệ tương phản, dùng cặp quan hệ từ "mặc dù...vẫn".', options: [{ key: 'A', content: 'Câu đơn', correct: false }, { key: 'B', content: 'Câu ghép tương phản', correct: true }, { key: 'C', content: 'Câu ghép nguyên nhân', correct: false }, { key: 'D', content: 'Câu cảm thán', correct: false }] },
  { content: 'Từ "đi" trong "đi học" và "đi giày" mang nghĩa gì?', difficulty: 'MEDIUM', explanation: '"Đi học" nghĩa là di chuyển đến trường; "đi giày" nghĩa là mang giày. Đây là từ nhiều nghĩa.', options: [{ key: 'A', content: 'Cùng một nghĩa', correct: false }, { key: 'B', content: 'Từ đồng âm khác nghĩa', correct: false }, { key: 'C', content: 'Từ nhiều nghĩa', correct: true }, { key: 'D', content: 'Từ trái nghĩa', correct: false }] },
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
