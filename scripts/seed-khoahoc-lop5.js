const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-khoahoc';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== SINH SẢN THỰC VẬT =====
  {
    content: 'Thụ phấn ở thực vật là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Thụ phấn là quá trình hạt phấn (chứa tế bào đực) được chuyển đến nhụy hoa (chứa noãn) để thực hiện thụ tinh.',
    options: [
      { key: 'A', content: 'Quá trình hoa nở', correct: false },
      { key: 'B', content: 'Quá trình hạt phấn chuyển đến nhụy hoa', correct: true },
      { key: 'C', content: 'Quá trình ra quả', correct: false },
      { key: 'D', content: 'Quá trình hạt giống nảy mầm', correct: false },
    ],
  },
  {
    content: 'Côn trùng giúp thụ phấn cho hoa theo cách nào?',
    difficulty: 'EASY',
    explanation: 'Khi côn trùng hút mật hoa, hạt phấn bám vào thân chúng và được mang sang hoa khác, thực hiện thụ phấn.',
    options: [
      { key: 'A', content: 'Côn trùng ăn hạt phấn rồi nhổ ra', correct: false },
      { key: 'B', content: 'Hạt phấn bám vào thân côn trùng, được mang sang hoa khác', correct: true },
      { key: 'C', content: 'Côn trùng hút nhụy hoa', correct: false },
      { key: 'D', content: 'Côn trùng tạo ra hạt phấn', correct: false },
    ],
  },
  {
    content: 'Hoa thụ phấn nhờ gió thường có đặc điểm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Hoa thụ phấn nhờ gió thường nhỏ, không có màu sắc sặc sỡ, không có mật hoa, hạt phấn nhẹ và nhiều.',
    options: [
      { key: 'A', content: 'Hoa to, màu sặc sỡ, thơm', correct: false },
      { key: 'B', content: 'Hoa nhỏ, không màu sắc sặc sỡ, hạt phấn nhẹ và nhiều', correct: true },
      { key: 'C', content: 'Hoa có nhiều mật', correct: false },
      { key: 'D', content: 'Hoa mọc dưới đất', correct: false },
    ],
  },
  {
    content: 'Hạt giống được phát tán bởi gió có đặc điểm nào?',
    difficulty: 'MEDIUM',
    explanation: 'Hạt phát tán nhờ gió thường nhẹ, có cánh mỏng hoặc có sợi lông mịn như hoa bồ công anh, bông gòn.',
    options: [
      { key: 'A', content: 'Hạt nặng, to và cứng', correct: false },
      { key: 'B', content: 'Hạt nhẹ, có cánh hoặc lông mịn', correct: true },
      { key: 'C', content: 'Hạt có gai móc', correct: false },
      { key: 'D', content: 'Hạt có vỏ dày chứa nước', correct: false },
    ],
  },
  {
    content: 'Quả dừa được phát tán nhờ yếu tố nào?',
    difficulty: 'MEDIUM',
    explanation: 'Quả dừa phát tán nhờ nước vì quả có vỏ nhẹ, chứa không khí, nổi trên mặt nước.',
    options: [
      { key: 'A', content: 'Nhờ gió', correct: false },
      { key: 'B', content: 'Nhờ nước', correct: true },
      { key: 'C', content: 'Nhờ động vật', correct: false },
      { key: 'D', content: 'Tự phát tán', correct: false },
    ],
  },
  {
    content: 'Cây nào sinh sản bằng thân bò (thân bò ra đất và mọc rễ)?',
    difficulty: 'EASY',
    explanation: 'Cây rau má sinh sản bằng thân bò (thân bò lan trên mặt đất và mọc rễ phụ thành cây mới).',
    options: [
      { key: 'A', content: 'Cây hoa hồng', correct: false },
      { key: 'B', content: 'Cây rau má', correct: true },
      { key: 'C', content: 'Cây táo', correct: false },
      { key: 'D', content: 'Cây ổi', correct: false },
    ],
  },
  {
    content: 'Cây nào sinh sản bằng củ?',
    difficulty: 'EASY',
    explanation: 'Khoai tây sinh sản bằng củ - từ mắt củ nảy mầm thành cây mới.',
    options: [
      { key: 'A', content: 'Cây xoài', correct: false },
      { key: 'B', content: 'Khoai tây', correct: true },
      { key: 'C', content: 'Cây cà chua', correct: false },
      { key: 'D', content: 'Cây lúa', correct: false },
    ],
  },
  {
    content: 'Quá trình thụ tinh ở thực vật xảy ra ở đâu?',
    difficulty: 'HARD',
    explanation: 'Sau khi thụ phấn, ống phấn hình thành và tế bào đực đi xuống noãn để thụ tinh, tạo ra hạt.',
    options: [
      { key: 'A', content: 'Ở cánh hoa', correct: false },
      { key: 'B', content: 'Ở noãn (trong bầu nhụy)', correct: true },
      { key: 'C', content: 'Ở đầu nhụy', correct: false },
      { key: 'D', content: 'Ở cuống hoa', correct: false },
    ],
  },
  // ===== SINH SẢN ĐỘNG VẬT =====
  {
    content: 'Động vật nào dưới đây đẻ trứng?',
    difficulty: 'EASY',
    explanation: 'Gà đẻ trứng - đây là đặc điểm của gia cầm (chim).',
    options: [
      { key: 'A', content: 'Trâu', correct: false },
      { key: 'B', content: 'Gà', correct: true },
      { key: 'C', content: 'Mèo', correct: false },
      { key: 'D', content: 'Chó', correct: false },
    ],
  },
  {
    content: 'Động vật nào dưới đây đẻ con?',
    difficulty: 'EASY',
    explanation: 'Lợn (heo) là động vật có vú, đẻ con và cho con bú.',
    options: [
      { key: 'A', content: 'Cá chép', correct: false },
      { key: 'B', content: 'Rắn hổ mang', correct: false },
      { key: 'C', content: 'Lợn', correct: true },
      { key: 'D', content: 'Ếch', correct: false },
    ],
  },
  {
    content: 'Quá trình biến thái hoàn toàn của bướm theo thứ tự là?',
    difficulty: 'MEDIUM',
    explanation: 'Bướm biến thái hoàn toàn: Trứng → Sâu (ấu trùng) → Nhộng → Bướm (trưởng thành).',
    options: [
      { key: 'A', content: 'Trứng → Bướm → Nhộng → Sâu', correct: false },
      { key: 'B', content: 'Trứng → Sâu → Nhộng → Bướm', correct: true },
      { key: 'C', content: 'Sâu → Trứng → Nhộng → Bướm', correct: false },
      { key: 'D', content: 'Nhộng → Trứng → Sâu → Bướm', correct: false },
    ],
  },
  {
    content: 'Vòng đời của ếch gồm các giai đoạn nào?',
    difficulty: 'MEDIUM',
    explanation: 'Ếch: Trứng → Nòng nọc (có đuôi, sống dưới nước) → Ếch non (mọc chân, mất đuôi) → Ếch trưởng thành.',
    options: [
      { key: 'A', content: 'Trứng → Ếch con → Ếch lớn', correct: false },
      { key: 'B', content: 'Trứng → Nòng nọc → Ếch non → Ếch trưởng thành', correct: true },
      { key: 'C', content: 'Ếch → Trứng → Nòng nọc', correct: false },
      { key: 'D', content: 'Trứng → Nhộng → Ếch', correct: false },
    ],
  },
  {
    content: 'Sự khác nhau chính giữa động vật đẻ trứng và đẻ con là?',
    difficulty: 'MEDIUM',
    explanation: 'Động vật đẻ con mang thai, sinh con và cho con bú bằng sữa mẹ. Động vật đẻ trứng đẻ trứng và trứng nở thành con.',
    options: [
      { key: 'A', content: 'Động vật đẻ trứng sống lâu hơn', correct: false },
      { key: 'B', content: 'Động vật đẻ con mang thai, sinh con và cho con bú sữa', correct: true },
      { key: 'C', content: 'Động vật đẻ con thông minh hơn', correct: false },
      { key: 'D', content: 'Động vật đẻ trứng nhỏ hơn', correct: false },
    ],
  },
  // ===== CƠ THỂ NGƯỜI =====
  {
    content: 'Tuổi dậy thì ở nữ thường bắt đầu vào khoảng bao nhiêu tuổi?',
    difficulty: 'MEDIUM',
    explanation: 'Tuổi dậy thì ở nữ thường bắt đầu từ 10-13 tuổi.',
    options: [
      { key: 'A', content: '7-9 tuổi', correct: false },
      { key: 'B', content: '10-13 tuổi', correct: true },
      { key: 'C', content: '15-18 tuổi', correct: false },
      { key: 'D', content: '20-25 tuổi', correct: false },
    ],
  },
  {
    content: 'Tuổi dậy thì ở nam thường bắt đầu vào khoảng bao nhiêu tuổi?',
    difficulty: 'MEDIUM',
    explanation: 'Tuổi dậy thì ở nam thường bắt đầu từ 13-15 tuổi, muộn hơn nữ khoảng 2 năm.',
    options: [
      { key: 'A', content: '8-10 tuổi', correct: false },
      { key: 'B', content: '13-15 tuổi', correct: true },
      { key: 'C', content: '18-20 tuổi', correct: false },
      { key: 'D', content: '20-25 tuổi', correct: false },
    ],
  },
  {
    content: 'Sắp xếp đúng các giai đoạn phát triển của con người?',
    difficulty: 'MEDIUM',
    explanation: 'Các giai đoạn: Sơ sinh → Ấu thơ (mầm non) → Thiếu niên (học sinh) → Thanh niên → Trung niên → Tuổi già.',
    options: [
      { key: 'A', content: 'Sơ sinh → Thanh niên → Ấu thơ → Tuổi già', correct: false },
      { key: 'B', content: 'Sơ sinh → Ấu thơ → Thiếu niên → Thanh niên → Trung niên → Tuổi già', correct: true },
      { key: 'C', content: 'Ấu thơ → Sơ sinh → Thiếu niên → Tuổi già', correct: false },
      { key: 'D', content: 'Sơ sinh → Thiếu niên → Ấu thơ → Tuổi già', correct: false },
    ],
  },
  {
    content: 'Ở tuổi dậy thì, cơ thể bé gái có sự thay đổi đặc trưng nào?',
    difficulty: 'MEDIUM',
    explanation: 'Ở tuổi dậy thì, bé gái phát triển vú, mọc lông ở nách và vùng kín, bắt đầu có kinh nguyệt, cơ thể trở nên tròn hơn.',
    options: [
      { key: 'A', content: 'Giọng nói thay đổi trở nên trầm hơn', correct: false },
      { key: 'B', content: 'Phát triển vú, có kinh nguyệt, hông nở rộ', correct: true },
      { key: 'C', content: 'Cơ bắp phát triển to hơn', correct: false },
      { key: 'D', content: 'Mọc râu và lông mặt', correct: false },
    ],
  },
  {
    content: 'Cơ quan nào trong cơ thể người thực hiện chức năng trao đổi khí?',
    difficulty: 'EASY',
    explanation: 'Phổi là cơ quan hô hấp, thực hiện trao đổi khí (nhận ô-xi, thải khí CO2).',
    options: [
      { key: 'A', content: 'Tim', correct: false },
      { key: 'B', content: 'Phổi', correct: true },
      { key: 'C', content: 'Dạ dày', correct: false },
      { key: 'D', content: 'Gan', correct: false },
    ],
  },
  {
    content: 'Tim có vai trò gì trong cơ thể?',
    difficulty: 'EASY',
    explanation: 'Tim bơm máu đi khắp cơ thể, cung cấp ô-xi và chất dinh dưỡng cho các tế bào.',
    options: [
      { key: 'A', content: 'Tiêu hóa thức ăn', correct: false },
      { key: 'B', content: 'Bơm máu đi khắp cơ thể', correct: true },
      { key: 'C', content: 'Lọc máu', correct: false },
      { key: 'D', content: 'Điều tiết nhiệt độ', correct: false },
    ],
  },
  // ===== CHẤT RẮN/LỎNG/KHÍ VÀ SỰ CHUYỂN THỂ =====
  {
    content: 'Nước đá (nước đóng băng) là chất ở thể nào?',
    difficulty: 'EASY',
    explanation: 'Nước đá là nước ở thể rắn, khi nhiệt độ dưới 0°C nước chuyển thành đá.',
    options: [
      { key: 'A', content: 'Thể lỏng', correct: false },
      { key: 'B', content: 'Thể khí', correct: false },
      { key: 'C', content: 'Thể rắn', correct: true },
      { key: 'D', content: 'Thể huyền phù', correct: false },
    ],
  },
  {
    content: 'Khi đun nóng, nước lỏng chuyển thành hơi nước. Quá trình này gọi là?',
    difficulty: 'EASY',
    explanation: 'Quá trình nước lỏng chuyển thành hơi nước gọi là bay hơi (hoặc sôi khi đun mạnh).',
    options: [
      { key: 'A', content: 'Ngưng tụ', correct: false },
      { key: 'B', content: 'Đông đặc', correct: false },
      { key: 'C', content: 'Bay hơi', correct: true },
      { key: 'D', content: 'Nóng chảy', correct: false },
    ],
  },
  {
    content: 'Khi hơi nước gặp lạnh sẽ chuyển thành?',
    difficulty: 'EASY',
    explanation: 'Khi hơi nước gặp lạnh sẽ ngưng tụ, chuyển trở lại thành nước lỏng.',
    options: [
      { key: 'A', content: 'Băng', correct: false },
      { key: 'B', content: 'Nước lỏng (ngưng tụ)', correct: true },
      { key: 'C', content: 'Khí ô-xi', correct: false },
      { key: 'D', content: 'Khí CO2', correct: false },
    ],
  },
  {
    content: 'Đặc điểm nào của chất rắn khác với chất lỏng và chất khí?',
    difficulty: 'MEDIUM',
    explanation: 'Chất rắn có hình dạng và thể tích xác định, không chảy và không nén được (trong điều kiện thông thường).',
    options: [
      { key: 'A', content: 'Chất rắn không có khối lượng', correct: false },
      { key: 'B', content: 'Chất rắn có hình dạng và thể tích xác định', correct: true },
      { key: 'C', content: 'Chất rắn nhẹ hơn không khí', correct: false },
      { key: 'D', content: 'Chất rắn luôn trong suốt', correct: false },
    ],
  },
  {
    content: 'Nước sôi ở nhiệt độ bao nhiêu độ C (ở điều kiện thông thường)?',
    difficulty: 'EASY',
    explanation: 'Nước sôi ở 100°C trong điều kiện áp suất khí quyển bình thường.',
    options: [
      { key: 'A', content: '80°C', correct: false },
      { key: 'B', content: '90°C', correct: false },
      { key: 'C', content: '100°C', correct: true },
      { key: 'D', content: '120°C', correct: false },
    ],
  },
  {
    content: 'Nước đóng băng (đông đặc) ở nhiệt độ bao nhiêu độ C?',
    difficulty: 'EASY',
    explanation: 'Nước đông đặc (đóng băng) ở 0°C.',
    options: [
      { key: 'A', content: '10°C', correct: false },
      { key: 'B', content: '0°C', correct: true },
      { key: 'C', content: '-10°C', correct: false },
      { key: 'D', content: '5°C', correct: false },
    ],
  },
  // ===== HỖN HỢP VÀ DUNG DỊCH =====
  {
    content: 'Hỗn hợp là gì?',
    difficulty: 'EASY',
    explanation: 'Hỗn hợp là sự pha trộn của hai hay nhiều chất, trong đó mỗi chất vẫn giữ nguyên tính chất riêng của nó.',
    options: [
      { key: 'A', content: 'Một chất duy nhất', correct: false },
      { key: 'B', content: 'Sự pha trộn của hai hay nhiều chất', correct: true },
      { key: 'C', content: 'Chất không thể tách ra được', correct: false },
      { key: 'D', content: 'Chất tạo ra phản ứng hóa học', correct: false },
    ],
  },
  {
    content: 'Cách nào dùng để tách muối ra khỏi nước muối?',
    difficulty: 'MEDIUM',
    explanation: 'Đun nóng nước muối để nước bay hơi, còn lại muối - đây là phương pháp cô cạn.',
    options: [
      { key: 'A', content: 'Lọc qua vải', correct: false },
      { key: 'B', content: 'Đun sôi để nước bay hơi (cô cạn)', correct: true },
      { key: 'C', content: 'Dùng nam châm', correct: false },
      { key: 'D', content: 'Ly tâm', correct: false },
    ],
  },
  {
    content: 'Cách nào dùng để tách cát ra khỏi nước?',
    difficulty: 'EASY',
    explanation: 'Lọc qua giấy lọc hoặc vải để giữ cát lại, nước chảy qua.',
    options: [
      { key: 'A', content: 'Cô cạn', correct: false },
      { key: 'B', content: 'Dùng nam châm', correct: false },
      { key: 'C', content: 'Lọc qua vải hoặc giấy lọc', correct: true },
      { key: 'D', content: 'Đun lên', correct: false },
    ],
  },
  {
    content: 'Dung dịch là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dung dịch là hỗn hợp đồng nhất (đồng đều) khi một chất tan hòa tan trong dung môi, không nhìn thấy các hạt riêng lẻ.',
    options: [
      { key: 'A', content: 'Hỗn hợp không tan', correct: false },
      { key: 'B', content: 'Hỗn hợp đồng nhất của chất tan và dung môi', correct: true },
      { key: 'C', content: 'Chỉ là nước nguyên chất', correct: false },
      { key: 'D', content: 'Hỗn hợp nhìn thấy các hạt riêng', correct: false },
    ],
  },
  {
    content: 'Nước đường (đường hòa tan trong nước) là?',
    difficulty: 'EASY',
    explanation: 'Nước đường là dung dịch vì đường tan hoàn toàn trong nước, tạo hỗn hợp đồng nhất.',
    options: [
      { key: 'A', content: 'Hỗn hợp không đồng đều', correct: false },
      { key: 'B', content: 'Dung dịch', correct: true },
      { key: 'C', content: 'Chất rắn', correct: false },
      { key: 'D', content: 'Chất khí', correct: false },
    ],
  },
  {
    content: 'Cách nào tách hỗn hợp gạo và sạn (đá nhỏ)?',
    difficulty: 'MEDIUM',
    explanation: 'Đãi gạo với nước: gạo và đá có khối lượng riêng khác nhau, hoặc nhặt bằng tay; thường dùng sàng hay vo gạo.',
    options: [
      { key: 'A', content: 'Đun sôi', correct: false },
      { key: 'B', content: 'Sàng và nhặt bằng tay hoặc đãi với nước', correct: true },
      { key: 'C', content: 'Dùng nam châm', correct: false },
      { key: 'D', content: 'Lọc qua giấy', correct: false },
    ],
  },
  // ===== MÔI TRƯỜNG =====
  {
    content: 'Rừng nhiệt đới có vai trò quan trọng nào với khí hậu trái đất?',
    difficulty: 'MEDIUM',
    explanation: 'Rừng nhiệt đới điều hòa khí hậu, hấp thụ CO2 và tạo ra ô-xi, là "lá phổi xanh" của trái đất.',
    options: [
      { key: 'A', content: 'Tạo ra mưa axit', correct: false },
      { key: 'B', content: 'Hấp thụ CO2, tạo ô-xi, điều hòa khí hậu', correct: true },
      { key: 'C', content: 'Làm tăng nhiệt độ trái đất', correct: false },
      { key: 'D', content: 'Gây ra lũ lụt', correct: false },
    ],
  },
  {
    content: 'Ô nhiễm không khí chủ yếu do nguyên nhân nào?',
    difficulty: 'MEDIUM',
    explanation: 'Ô nhiễm không khí chủ yếu do khói thải từ xe máy, ô tô, nhà máy công nghiệp, đốt rác...',
    options: [
      { key: 'A', content: 'Nước mưa', correct: false },
      { key: 'B', content: 'Khói thải từ xe cộ, nhà máy', correct: true },
      { key: 'C', content: 'Gió', correct: false },
      { key: 'D', content: 'Ánh nắng mặt trời', correct: false },
    ],
  },
  {
    content: 'Ô nhiễm biển có thể gây ra hậu quả nào?',
    difficulty: 'MEDIUM',
    explanation: 'Ô nhiễm biển giết chết sinh vật biển, phá hủy hệ sinh thái san hô, ảnh hưởng đến nghề cá và du lịch biển.',
    options: [
      { key: 'A', content: 'Làm biển trong hơn', correct: false },
      { key: 'B', content: 'Tốt cho sinh vật biển', correct: false },
      { key: 'C', content: 'Giết chết sinh vật biển, phá hủy hệ sinh thái', correct: true },
      { key: 'D', content: 'Không ảnh hưởng gì', correct: false },
    ],
  },
  {
    content: 'Chúng ta có thể làm gì để bảo vệ rừng?',
    difficulty: 'EASY',
    explanation: 'Bảo vệ rừng bằng cách không chặt phá cây bừa bãi, không đốt rừng, trồng cây xanh, ngăn chặn săn bắt thú rừng.',
    options: [
      { key: 'A', content: 'Chặt nhiều cây để làm nhà', correct: false },
      { key: 'B', content: 'Không chặt phá, trồng cây, ngăn cháy rừng', correct: true },
      { key: 'C', content: 'Đốt rừng làm nương rẫy', correct: false },
      { key: 'D', content: 'Săn bắt thú rừng', correct: false },
    ],
  },
  {
    content: 'Vì sao không nên dùng quá nhiều túi ni-lông?',
    difficulty: 'EASY',
    explanation: 'Túi ni-lông rất khó phân hủy trong đất, gây ô nhiễm môi trường lâu dài, ảnh hưởng đến động vật và đất đai.',
    options: [
      { key: 'A', content: 'Túi ni-lông quá đắt tiền', correct: false },
      { key: 'B', content: 'Túi ni-lông khó phân hủy, gây ô nhiễm lâu dài', correct: true },
      { key: 'C', content: 'Túi ni-lông không đựng được nhiều đồ', correct: false },
      { key: 'D', content: 'Túi ni-lông dễ rách', correct: false },
    ],
  },
  {
    content: 'Hiệu ứng nhà kính là gì?',
    difficulty: 'HARD',
    explanation: 'Hiệu ứng nhà kính xảy ra khi khí CO2 và các khí khác giữ nhiệt của mặt trời trong bầu khí quyển, làm trái đất nóng lên.',
    options: [
      { key: 'A', content: 'Hiện tượng mưa axit', correct: false },
      { key: 'B', content: 'Các khí nhà kính giữ nhiệt làm Trái đất nóng lên', correct: true },
      { key: 'C', content: 'Hiện tượng tầng ô-dôn dày lên', correct: false },
      { key: 'D', content: 'Mưa nhiều hơn', correct: false },
    ],
  },
  {
    content: 'Khi rác thải không được xử lý đúng cách sẽ gây ra?',
    difficulty: 'EASY',
    explanation: 'Rác thải không xử lý gây ô nhiễm môi trường (đất, nước, không khí), là nơi sinh sản của vi khuẩn, muỗi truyền bệnh.',
    options: [
      { key: 'A', content: 'Làm đẹp môi trường', correct: false },
      { key: 'B', content: 'Ô nhiễm môi trường, sinh sôi vi khuẩn gây bệnh', correct: true },
      { key: 'C', content: 'Không ảnh hưởng gì', correct: false },
      { key: 'D', content: 'Làm đất màu mỡ hơn', correct: false },
    ],
  },
  // ===== TỔNG HỢP KHOA HỌC =====
  {
    content: 'Quá trình nào tạo ra thức ăn cho cây (quang hợp)?',
    difficulty: 'MEDIUM',
    explanation: 'Quang hợp: Cây dùng ánh sáng mặt trời + CO2 + nước để tạo ra đường (chất dinh dưỡng) và thải ra ô-xi.',
    options: [
      { key: 'A', content: 'Cây hút nước qua hoa', correct: false },
      { key: 'B', content: 'Cây dùng ánh sáng + CO2 + nước tạo chất dinh dưỡng', correct: true },
      { key: 'C', content: 'Cây hút khoáng chất qua rễ', correct: false },
      { key: 'D', content: 'Cây hấp thụ không khí qua thân', correct: false },
    ],
  },
  {
    content: 'Động vật nào là trung gian truyền bệnh sốt rét?',
    difficulty: 'MEDIUM',
    explanation: 'Muỗi Anopheles là trung gian truyền bệnh sốt rét.',
    options: [
      { key: 'A', content: 'Ruồi', correct: false },
      { key: 'B', content: 'Gián', correct: false },
      { key: 'C', content: 'Muỗi (Anopheles)', correct: true },
      { key: 'D', content: 'Chuột', correct: false },
    ],
  },
  {
    content: 'Vitamin C có nhiều trong loại thực phẩm nào?',
    difficulty: 'EASY',
    explanation: 'Vitamin C có nhiều trong cam, chanh, bưởi, ổi, kiwi và rau xanh.',
    options: [
      { key: 'A', content: 'Thịt đỏ', correct: false },
      { key: 'B', content: 'Dầu mỡ', correct: false },
      { key: 'C', content: 'Cam, chanh, bưởi', correct: true },
      { key: 'D', content: 'Gạo trắng', correct: false },
    ],
  },
  {
    content: 'Canxi (calcium) cần thiết để phát triển?',
    difficulty: 'EASY',
    explanation: 'Canxi rất cần thiết để xây dựng và phát triển xương và răng chắc khỏe.',
    options: [
      { key: 'A', content: 'Cơ bắp', correct: false },
      { key: 'B', content: 'Xương và răng', correct: true },
      { key: 'C', content: 'Da', correct: false },
      { key: 'D', content: 'Tóc', correct: false },
    ],
  },
  {
    content: 'Thực phẩm nào giàu protein (chất đạm)?',
    difficulty: 'EASY',
    explanation: 'Thịt, cá, trứng, đậu... là những thực phẩm giàu protein.',
    options: [
      { key: 'A', content: 'Cơm', correct: false },
      { key: 'B', content: 'Dầu ăn', correct: false },
      { key: 'C', content: 'Thịt, cá, trứng', correct: true },
      { key: 'D', content: 'Đường', correct: false },
    ],
  },
  {
    content: 'Tiếng "tách" khi bẻ gãy một cành khô là ví dụ về?',
    difficulty: 'MEDIUM',
    explanation: 'Âm thanh được tạo ra khi vật rắn rung động. Khi bẻ cành, cấu trúc gỗ bị phá vỡ tạo ra sóng âm.',
    options: [
      { key: 'A', content: 'Ánh sáng', correct: false },
      { key: 'B', content: 'Sự rung động tạo ra âm thanh', correct: true },
      { key: 'C', content: 'Điện năng', correct: false },
      { key: 'D', content: 'Từ trường', correct: false },
    ],
  },
  {
    content: 'Kính lúp có tác dụng gì?',
    difficulty: 'EASY',
    explanation: 'Kính lúp làm cho vật trông to hơn thực tế, giúp quan sát những vật nhỏ dễ hơn.',
    options: [
      { key: 'A', content: 'Làm vật trông nhỏ hơn', correct: false },
      { key: 'B', content: 'Làm vật trông to hơn', correct: true },
      { key: 'C', content: 'Thay đổi màu sắc của vật', correct: false },
      { key: 'D', content: 'Làm vật xa hơn', correct: false },
    ],
  },
  {
    content: 'Nam châm hút được vật nào dưới đây?',
    difficulty: 'EASY',
    explanation: 'Nam châm chỉ hút được các vật làm từ sắt, thép (và một số kim loại như niken, cobalt).',
    options: [
      { key: 'A', content: 'Bút chì gỗ', correct: false },
      { key: 'B', content: 'Tờ giấy', correct: false },
      { key: 'C', content: 'Đinh sắt', correct: true },
      { key: 'D', content: 'Sợi dây nhựa', correct: false },
    ],
  },
  {
    content: 'Ánh sáng Mặt trời chiếu qua lăng kính tạo ra?',
    difficulty: 'MEDIUM',
    explanation: 'Ánh sáng trắng (Mặt trời) chiếu qua lăng kính bị tán sắc thành dải màu cầu vồng: đỏ, cam, vàng, lục, lam, chàm, tím.',
    options: [
      { key: 'A', content: 'Màu đen', correct: false },
      { key: 'B', content: 'Dải màu cầu vồng', correct: true },
      { key: 'C', content: 'Chỉ màu trắng', correct: false },
      { key: 'D', content: 'Tia X', correct: false },
    ],
  },
  {
    content: 'Vì sao bầu trời ban ngày có màu xanh?',
    difficulty: 'HARD',
    explanation: 'Ánh sáng xanh (có bước sóng ngắn) bị tán xạ nhiều hơn bởi các phân tử khí trong khí quyển, làm bầu trời trông có màu xanh.',
    options: [
      { key: 'A', content: 'Do nước biển phản chiếu lên', correct: false },
      { key: 'B', content: 'Do ánh sáng xanh bị tán xạ nhiều hơn trong khí quyển', correct: true },
      { key: 'C', content: 'Do bầu trời được sơn màu xanh', correct: false },
      { key: 'D', content: 'Do màu của mây', correct: false },
    ],
  },
  {
    content: 'Trồng rừng có lợi ích gì với đất?',
    difficulty: 'MEDIUM',
    explanation: 'Rừng giữ đất, chống xói mòn, giữ nước, tránh lũ lụt và sa mạc hóa.',
    options: [
      { key: 'A', content: 'Làm đất khô cằn hơn', correct: false },
      { key: 'B', content: 'Chống xói mòn, giữ nước, tránh lũ lụt', correct: true },
      { key: 'C', content: 'Làm đất mặn hơn', correct: false },
      { key: 'D', content: 'Không ảnh hưởng gì đến đất', correct: false },
    ],
  },
  {
    content: 'Mưa axit hình thành từ?',
    difficulty: 'HARD',
    explanation: 'Mưa axit hình thành khi khí SO2 và NOx (từ đốt than, dầu, khí thải xe) phản ứng với hơi nước trong không khí tạo ra axit.',
    options: [
      { key: 'A', content: 'Nước biển bốc hơi', correct: false },
      { key: 'B', content: 'Khí SO2, NOx từ đốt nhiên liệu kết hợp với hơi nước', correct: true },
      { key: 'C', content: 'CO2 từ hô hấp của người', correct: false },
      { key: 'D', content: 'Hơi nước bình thường trong không khí', correct: false },
    ],
  },
  {
    content: 'Cơ thể người cần ô-xi để làm gì?',
    difficulty: 'EASY',
    explanation: 'Ô-xi cần thiết để tế bào hô hấp (đốt cháy chất dinh dưỡng) tạo ra năng lượng duy trì các hoạt động sống.',
    options: [
      { key: 'A', content: 'Để tiêu hóa thức ăn', correct: false },
      { key: 'B', content: 'Để tế bào hô hấp tạo năng lượng', correct: true },
      { key: 'C', content: 'Để bơm máu', correct: false },
      { key: 'D', content: 'Để suy nghĩ', correct: false },
    ],
  },
  {
    content: 'Côn trùng nào không có ích trong thụ phấn hoa?',
    difficulty: 'MEDIUM',
    explanation: 'Ong, bướm, ruồi... giúp thụ phấn hoa. Gián không thường xuyên thụ phấn hoa.',
    options: [
      { key: 'A', content: 'Ong mật', correct: false },
      { key: 'B', content: 'Bướm', correct: false },
      { key: 'C', content: 'Gián', correct: true },
      { key: 'D', content: 'Ruồi', correct: false },
    ],
  },
  {
    content: 'Điều gì xảy ra với cây khi thiếu ánh sáng?',
    difficulty: 'MEDIUM',
    explanation: 'Khi thiếu ánh sáng, cây không quang hợp được đủ, lá vàng úa, cây yếu, phát triển chậm, lá nhỏ và vàng.',
    options: [
      { key: 'A', content: 'Cây phát triển nhanh hơn', correct: false },
      { key: 'B', content: 'Cây vàng úa, yếu, phát triển chậm', correct: true },
      { key: 'C', content: 'Cây ra nhiều hoa hơn', correct: false },
      { key: 'D', content: 'Cây không bị ảnh hưởng', correct: false },
    ],
  },
  {
    content: 'Vi-rút khác vi khuẩn ở điểm nào?',
    difficulty: 'HARD',
    explanation: 'Vi-rút nhỏ hơn vi khuẩn nhiều lần, không có cấu trúc tế bào, chỉ có thể nhân lên trong tế bào sống.',
    options: [
      { key: 'A', content: 'Vi-rút lớn hơn vi khuẩn', correct: false },
      { key: 'B', content: 'Vi-rút nhỏ hơn vi khuẩn, không có tế bào', correct: true },
      { key: 'C', content: 'Vi-rút và vi khuẩn giống nhau hoàn toàn', correct: false },
      { key: 'D', content: 'Vi khuẩn không có tế bào', correct: false },
    ],
  },
  {
    content: 'Chất dinh dưỡng nào cung cấp năng lượng nhiều nhất cho cơ thể?',
    difficulty: 'MEDIUM',
    explanation: 'Chất béo (lipid) cung cấp 9 kcal/gram, nhiều hơn protein và carbohydrate (đều 4 kcal/gram).',
    options: [
      { key: 'A', content: 'Protein (chất đạm)', correct: false },
      { key: 'B', content: 'Carbohydrate (tinh bột, đường)', correct: false },
      { key: 'C', content: 'Chất béo (lipid)', correct: true },
      { key: 'D', content: 'Vitamin', correct: false },
    ],
  },
  { content: 'Hoa nào thụ phấn nhờ gió?', difficulty: 'MEDIUM', explanation: 'Hoa lúa, ngô, thông... thụ phấn nhờ gió vì hạt phấn nhẹ và hoa không có màu sặc sỡ hay mùi hương.', options: [{ key: 'A', content: 'Hoa hồng', correct: false }, { key: 'B', content: 'Hoa lúa', correct: true }, { key: 'C', content: 'Hoa cúc', correct: false }, { key: 'D', content: 'Hoa lan', correct: false }] },
  { content: 'Quả của cây nào phát tán bằng cách nổi trên nước?', difficulty: 'MEDIUM', explanation: 'Quả dừa có lớp xơ dày giúp nổi trên nước, phát tán đến các vùng đất ven biển.', options: [{ key: 'A', content: 'Quả táo', correct: false }, { key: 'B', content: 'Quả dừa', correct: true }, { key: 'C', content: 'Quả cam', correct: false }, { key: 'D', content: 'Quả nho', correct: false }] },
  { content: 'Hạt giống cần những điều kiện nào để nảy mầm?', difficulty: 'EASY', explanation: 'Hạt giống cần có độ ẩm, nhiệt độ phù hợp và oxy (không khí) để nảy mầm.', options: [{ key: 'A', content: 'Ánh sáng mặt trời', correct: false }, { key: 'B', content: 'Nước, nhiệt độ thích hợp và không khí', correct: true }, { key: 'C', content: 'Đất màu mỡ', correct: false }, { key: 'D', content: 'Phân bón', correct: false }] },
  { content: 'Bộ phận nào của hoa chứa noãn (tế bào trứng) để thụ tinh?', difficulty: 'MEDIUM', explanation: 'Noãn nằm trong bầu nhụy của hoa. Sau thụ tinh, noãn phát triển thành hạt và bầu nhụy thành quả.', options: [{ key: 'A', content: 'Cánh hoa', correct: false }, { key: 'B', content: 'Nhị (đực)', correct: false }, { key: 'C', content: 'Nhụy (bầu nhụy)', correct: true }, { key: 'D', content: 'Đài hoa', correct: false }] },
  { content: 'Con vật nào sinh sản bằng cách đẻ trứng?', difficulty: 'EASY', explanation: 'Gà đẻ trứng - đây là hình thức sinh sản đặc trưng của chim.', options: [{ key: 'A', content: 'Chó', correct: false }, { key: 'B', content: 'Gà', correct: true }, { key: 'C', content: 'Lợn', correct: false }, { key: 'D', content: 'Trâu', correct: false }] },
  { content: 'Quá trình biến thái hoàn toàn của bướm gồm những giai đoạn nào?', difficulty: 'MEDIUM', explanation: 'Bướm trải qua biến thái hoàn toàn: trứng → sâu (ấu trùng) → nhộng → bướm (trưởng thành).', options: [{ key: 'A', content: 'Trứng → bướm con → bướm trưởng thành', correct: false }, { key: 'B', content: 'Trứng → sâu → nhộng → bướm', correct: true }, { key: 'C', content: 'Trứng → nhộng → bướm', correct: false }, { key: 'D', content: 'Sâu → nhộng → bướm', correct: false }] },
  { content: 'Ếch thuộc nhóm động vật nào?', difficulty: 'MEDIUM', explanation: 'Ếch là động vật lưỡng cư (amphibia): sống được cả trong nước (khi còn là nòng nọc) và trên cạn (khi trưởng thành).', options: [{ key: 'A', content: 'Bò sát', correct: false }, { key: 'B', content: 'Động vật lưỡng cư', correct: true }, { key: 'C', content: 'Cá', correct: false }, { key: 'D', content: 'Động vật có vú', correct: false }] },
  { content: 'Nòng nọc là ấu trùng của con vật nào?', difficulty: 'EASY', explanation: 'Nòng nọc là giai đoạn ấu trùng của ếch/nhái. Nòng nọc sống trong nước, sau đó phát triển thành ếch.', options: [{ key: 'A', content: 'Bướm', correct: false }, { key: 'B', content: 'Ếch', correct: true }, { key: 'C', content: 'Muỗi', correct: false }, { key: 'D', content: 'Chuồn chuồn', correct: false }] },
  { content: 'Tuổi dậy thì ở nữ thường bắt đầu ở độ tuổi nào?', difficulty: 'MEDIUM', explanation: 'Tuổi dậy thì ở nữ thường bắt đầu trong khoảng 10-13 tuổi, biểu hiện qua sự phát triển cơ thể và kinh nguyệt lần đầu.', options: [{ key: 'A', content: '6-8 tuổi', correct: false }, { key: 'B', content: '10-13 tuổi', correct: true }, { key: 'C', content: '15-17 tuổi', correct: false }, { key: 'D', content: '18-20 tuổi', correct: false }] },
  { content: 'Đặc điểm nào sau đây là của tuổi dậy thì ở nam?', difficulty: 'MEDIUM', explanation: 'Ở tuổi dậy thì, nam giới có vỡ giọng (giọng trầm hơn), xuất hiện lông mặt và cơ thể phát triển to hơn.', options: [{ key: 'A', content: 'Vỡ giọng, mọc râu', correct: true }, { key: 'B', content: 'Kinh nguyệt', correct: false }, { key: 'C', content: 'Ngực phát triển', correct: false }, { key: 'D', content: 'Hông nở rộng', correct: false }] },
  { content: 'Con người trải qua bao nhiêu giai đoạn chính trong cuộc đời?', difficulty: 'EASY', explanation: 'Cuộc đời con người có 5 giai đoạn: sơ sinh, thiếu nhi, thiếu niên, trưởng thành, tuổi già.', options: [{ key: 'A', content: '3 giai đoạn', correct: false }, { key: 'B', content: '5 giai đoạn', correct: true }, { key: 'C', content: '7 giai đoạn', correct: false }, { key: 'D', content: '4 giai đoạn', correct: false }] },
  { content: 'Nước đá (thể rắn) chuyển thành nước lỏng là quá trình gì?', difficulty: 'EASY', explanation: 'Khi nhiệt độ tăng lên trên 0°C, nước đá tan chảy thành nước lỏng. Quá trình này gọi là sự nóng chảy.', options: [{ key: 'A', content: 'Sự đông đặc', correct: false }, { key: 'B', content: 'Sự nóng chảy', correct: true }, { key: 'C', content: 'Sự bay hơi', correct: false }, { key: 'D', content: 'Sự ngưng tụ', correct: false }] },
  { content: 'Hiện tượng nào là sự ngưng tụ của nước?', difficulty: 'MEDIUM', explanation: 'Sương mai hình thành khi hơi nước trong không khí gặp nhiệt độ lạnh và ngưng tụ thành giọt nước.', options: [{ key: 'A', content: 'Quần áo khô sau khi phơi', correct: false }, { key: 'B', content: 'Nước sôi bốc hơi', correct: false }, { key: 'C', content: 'Sương mai trên lá cây', correct: true }, { key: 'D', content: 'Nước đá tan', correct: false }] },
  { content: 'Tại sao mặt ngoài cốc nước lạnh bị ướt trong ngày nóng?', difficulty: 'HARD', explanation: 'Hơi nước trong không khí ấm tiếp xúc với bề mặt lạnh của cốc sẽ ngưng tụ thành giọt nước.', options: [{ key: 'A', content: 'Nước thấm qua thành cốc', correct: false }, { key: 'B', content: 'Hơi nước trong không khí ngưng tụ', correct: true }, { key: 'C', content: 'Cốc bị rỉ nước', correct: false }, { key: 'D', content: 'Nước từ bên trong tràn ra', correct: false }] },
  { content: 'Hỗn hợp nào có thể tách bằng cách lọc?', difficulty: 'MEDIUM', explanation: 'Hỗn hợp cát và nước có thể tách bằng cách lọc vì cát không tan trong nước.', options: [{ key: 'A', content: 'Nước muối', correct: false }, { key: 'B', content: 'Nước đường', correct: false }, { key: 'C', content: 'Cát và nước', correct: true }, { key: 'D', content: 'Rượu và nước', correct: false }] },
  { content: 'Phương pháp nào dùng để tách muối ra khỏi nước muối?', difficulty: 'MEDIUM', explanation: 'Bay hơi (cô cạn): đun nóng nước muối để nước bay hơi, muối còn lại. Đây là cách diêm dân làm muối từ nước biển.', options: [{ key: 'A', content: 'Lọc', correct: false }, { key: 'B', content: 'Cô cạn (bay hơi)', correct: true }, { key: 'C', content: 'Dùng nam châm', correct: false }, { key: 'D', content: 'Gạn lọc', correct: false }] },
  { content: 'Sắt và cát có thể tách ra khỏi nhau bằng cách nào?', difficulty: 'EASY', explanation: 'Dùng nam châm để hút sắt vì sắt là kim loại có từ tính, cát không bị hút bởi nam châm.', options: [{ key: 'A', content: 'Lọc qua vải', correct: false }, { key: 'B', content: 'Dùng nam châm', correct: true }, { key: 'C', content: 'Cô cạn', correct: false }, { key: 'D', content: 'Hòa vào nước', correct: false }] },
  { content: 'Dung dịch là gì?', difficulty: 'MEDIUM', explanation: 'Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi. Ví dụ: nước muối (muối là chất tan, nước là dung môi).', options: [{ key: 'A', content: 'Hỗn hợp không đồng nhất', correct: false }, { key: 'B', content: 'Hỗn hợp đồng nhất của chất tan và dung môi', correct: true }, { key: 'C', content: 'Chất lỏng nguyên chất', correct: false }, { key: 'D', content: 'Hỗn hợp của đất và nước', correct: false }] },
  { content: 'Chất nào dưới đây tan trong nước tạo thành dung dịch?', difficulty: 'EASY', explanation: 'Đường (sucrose) tan hoàn toàn trong nước tạo thành dung dịch đường trong suốt, đồng nhất.', options: [{ key: 'A', content: 'Cát', correct: false }, { key: 'B', content: 'Đá', correct: false }, { key: 'C', content: 'Đường', correct: true }, { key: 'D', content: 'Dầu ăn', correct: false }] },
  { content: 'Nguyên nhân chính gây ô nhiễm không khí ở thành thị là gì?', difficulty: 'MEDIUM', explanation: 'Khí thải từ xe cộ (ô tô, xe máy) là nguyên nhân chính gây ô nhiễm không khí ở các thành phố lớn.', options: [{ key: 'A', content: 'Hơi nước từ sông hồ', correct: false }, { key: 'B', content: 'Khí thải từ xe cộ và nhà máy', correct: true }, { key: 'C', content: 'Tiếng ồn', correct: false }, { key: 'D', content: 'Khói bếp than ở nông thôn', correct: false }] },
  { content: 'Ô nhiễm nguồn nước gây ra hậu quả gì cho sức khỏe?', difficulty: 'MEDIUM', explanation: 'Nước ô nhiễm chứa vi khuẩn, chất độc hại gây nhiều bệnh: tiêu chảy, tả, thương hàn, bệnh da liễu...', options: [{ key: 'A', content: 'Chỉ gây ô nhiễm môi trường, không ảnh hưởng sức khỏe', correct: false }, { key: 'B', content: 'Gây các bệnh như tiêu chảy, tả, thương hàn', correct: true }, { key: 'C', content: 'Làm mất điện', correct: false }, { key: 'D', content: 'Không có hậu quả gì', correct: false }] },
  { content: 'Hành động nào giúp bảo vệ môi trường?', difficulty: 'EASY', explanation: 'Phân loại rác tại nguồn giúp tái chế hiệu quả, giảm lượng rác chôn lấp và ô nhiễm môi trường.', options: [{ key: 'A', content: 'Đốt rác trong khu dân cư', correct: false }, { key: 'B', content: 'Phân loại rác trước khi vứt', correct: true }, { key: 'C', content: 'Đổ nước thải ra sông', correct: false }, { key: 'D', content: 'Chặt cây để lấy đất', correct: false }] },
  { content: 'Thực vật có vai trò gì trong việc bảo vệ đất?', difficulty: 'MEDIUM', explanation: 'Rễ cây bám chặt vào đất, ngăn không cho đất bị xói mòn do mưa và gió. Rừng đầu nguồn đặc biệt quan trọng.', options: [{ key: 'A', content: 'Làm đất cứng hơn', correct: false }, { key: 'B', content: 'Rễ cây chống xói mòn đất', correct: true }, { key: 'C', content: 'Làm đất màu mỡ tức thì', correct: false }, { key: 'D', content: 'Hút nước trong đất', correct: false }] },
  { content: 'Năng lượng mặt trời có thể chuyển thành dạng năng lượng nào?', difficulty: 'MEDIUM', explanation: 'Pin mặt trời (tấm quang điện) chuyển đổi năng lượng ánh sáng mặt trời thành điện năng.', options: [{ key: 'A', content: 'Chỉ thành nhiệt năng', correct: false }, { key: 'B', content: 'Điện năng (qua pin mặt trời)', correct: true }, { key: 'C', content: 'Không thể chuyển đổi', correct: false }, { key: 'D', content: 'Chỉ thành cơ năng', correct: false }] },
  { content: 'Ánh sáng trắng khi qua lăng kính tách ra thành màu sắc gì?', difficulty: 'MEDIUM', explanation: 'Ánh sáng trắng tách thành 7 màu (quang phổ): đỏ, cam, vàng, lục, lam, chàm, tím - tương tự như cầu vồng.', options: [{ key: 'A', content: '3 màu: đỏ, vàng, xanh', correct: false }, { key: 'B', content: '7 màu như cầu vồng', correct: true }, { key: 'C', content: 'Chỉ 2 màu đen trắng', correct: false }, { key: 'D', content: '5 màu: đỏ cam vàng lục lam', correct: false }] },
  { content: 'Âm thanh truyền được qua những môi trường nào?', difficulty: 'MEDIUM', explanation: 'Âm thanh truyền được qua cả rắn, lỏng và khí. Âm thanh không truyền được trong chân không.', options: [{ key: 'A', content: 'Chỉ qua không khí', correct: false }, { key: 'B', content: 'Qua rắn, lỏng và khí', correct: true }, { key: 'C', content: 'Chỉ qua chất lỏng', correct: false }, { key: 'D', content: 'Qua chân không', correct: false }] },
  { content: 'Điện năng có thể chuyển thành dạng năng lượng nào?', difficulty: 'EASY', explanation: 'Điện năng có thể chuyển thành nhiều dạng: nhiệt (bếp điện), ánh sáng (bóng đèn), cơ năng (motor), âm thanh (loa).', options: [{ key: 'A', content: 'Chỉ thành nhiệt năng', correct: false }, { key: 'B', content: 'Thành nhiệt, ánh sáng, cơ năng, âm thanh', correct: true }, { key: 'C', content: 'Không thể chuyển đổi', correct: false }, { key: 'D', content: 'Chỉ thành ánh sáng', correct: false }] },
  { content: 'Nguyên liệu hóa thạch (than, dầu mỏ) có đặc điểm gì?', difficulty: 'MEDIUM', explanation: 'Nhiên liệu hóa thạch là không tái tạo - hình thành từ hàng triệu năm, khai thác xong là hết, không thể tái tạo trong thời gian ngắn.', options: [{ key: 'A', content: 'Vô hạn và không gây ô nhiễm', correct: false }, { key: 'B', content: 'Không tái tạo, đốt cháy gây ô nhiễm', correct: true }, { key: 'C', content: 'Tái tạo được trong vài năm', correct: false }, { key: 'D', content: 'Không gây ô nhiễm không khí', correct: false }] },
  { content: 'Thực vật quang hợp cần những nguyên liệu gì?', difficulty: 'MEDIUM', explanation: 'Quang hợp: CO₂ + H₂O + ánh sáng → glucose (đường) + O₂. Cây cần CO₂, nước và ánh sáng mặt trời.', options: [{ key: 'A', content: 'Oxy và đường', correct: false }, { key: 'B', content: 'CO₂, nước và ánh sáng mặt trời', correct: true }, { key: 'C', content: 'Đất và phân bón', correct: false }, { key: 'D', content: 'Nước và oxy', correct: false }] },
  { content: 'Cây xanh thải ra khí gì trong quá trình quang hợp?', difficulty: 'EASY', explanation: 'Cây xanh thải ra khí oxy (O₂) trong quá trình quang hợp, đây là lý do cây xanh rất quan trọng cho sự sống.', options: [{ key: 'A', content: 'CO₂ (khí carbon dioxide)', correct: false }, { key: 'B', content: 'O₂ (khí oxy)', correct: true }, { key: 'C', content: 'N₂ (khí nitơ)', correct: false }, { key: 'D', content: 'H₂ (khí hydro)', correct: false }] },
  { content: 'Cơ thể người cần vitamin D để làm gì?', difficulty: 'MEDIUM', explanation: 'Vitamin D giúp cơ thể hấp thụ canxi, cần thiết cho sự phát triển của xương và răng.', options: [{ key: 'A', content: 'Tăng cường thị lực', correct: false }, { key: 'B', content: 'Hấp thụ canxi, chắc xương và răng', correct: true }, { key: 'C', content: 'Chống lão hóa da', correct: false }, { key: 'D', content: 'Tăng cường miễn dịch', correct: false }] },
  { content: 'Thiếu vitamin C có thể gây bệnh gì?', difficulty: 'MEDIUM', explanation: 'Thiếu vitamin C gây bệnh scorbut (bệnh hoại huyết): chảy máu chân răng, lâu liền vết thương.', options: [{ key: 'A', content: 'Bệnh còi xương', correct: false }, { key: 'B', content: 'Bệnh quáng gà', correct: false }, { key: 'C', content: 'Bệnh scorbut (chảy máu chân răng)', correct: true }, { key: 'D', content: 'Bệnh thiếu máu', correct: false }] },
  { content: 'Protein có vai trò chính gì trong cơ thể?', difficulty: 'MEDIUM', explanation: 'Protein (chất đạm) cần thiết để xây dựng và sửa chữa tế bào, mô cơ thể, tổng hợp enzyme và kháng thể.', options: [{ key: 'A', content: 'Cung cấp năng lượng chủ yếu', correct: false }, { key: 'B', content: 'Xây dựng và sửa chữa tế bào, mô', correct: true }, { key: 'C', content: 'Điều hòa thân nhiệt', correct: false }, { key: 'D', content: 'Chỉ để bảo vệ cơ quan nội tạng', correct: false }] },
  { content: 'Tại sao cần tiêm vắc-xin?', difficulty: 'MEDIUM', explanation: 'Vắc-xin kích thích hệ miễn dịch tạo kháng thể chống lại bệnh, giúp cơ thể phòng ngừa bệnh mà không cần mắc bệnh thực sự.', options: [{ key: 'A', content: 'Để chữa bệnh khi đã mắc', correct: false }, { key: 'B', content: 'Kích thích miễn dịch phòng ngừa bệnh', correct: true }, { key: 'C', content: 'Để tăng trưởng nhanh hơn', correct: false }, { key: 'D', content: 'Để bổ sung vitamin', correct: false }] },
  { content: 'Cơ quan nào trong cơ thể lọc máu và tạo ra nước tiểu?', difficulty: 'MEDIUM', explanation: 'Thận là cơ quan lọc máu, loại bỏ chất thải và tạo ra nước tiểu để đưa ra ngoài cơ thể.', options: [{ key: 'A', content: 'Gan', correct: false }, { key: 'B', content: 'Thận', correct: true }, { key: 'C', content: 'Tim', correct: false }, { key: 'D', content: 'Phổi', correct: false }] },
  { content: 'Cơ quan nào thực hiện trao đổi khí trong cơ thể người?', difficulty: 'EASY', explanation: 'Phổi là cơ quan thực hiện trao đổi khí: nhận O₂ từ không khí vào máu và thải CO₂ từ máu ra ngoài.', options: [{ key: 'A', content: 'Tim', correct: false }, { key: 'B', content: 'Phổi', correct: true }, { key: 'C', content: 'Gan', correct: false }, { key: 'D', content: 'Dạ dày', correct: false }] },
  { content: 'Trái Đất chuyển động quanh Mặt Trời mất bao lâu?', difficulty: 'EASY', explanation: 'Trái Đất mất 365 ngày (1 năm) để hoàn thành một vòng quay quanh Mặt Trời.', options: [{ key: 'A', content: '24 giờ', correct: false }, { key: 'B', content: '30 ngày', correct: false }, { key: 'C', content: '365 ngày (1 năm)', correct: true }, { key: 'D', content: '7 ngày', correct: false }] },
  { content: 'Tại sao có ngày và đêm?', difficulty: 'EASY', explanation: 'Trái Đất tự quay quanh trục của mình: phần hướng về phía Mặt Trời là ban ngày, phần khuất là ban đêm.', options: [{ key: 'A', content: 'Mặt Trời di chuyển quanh Trái Đất', correct: false }, { key: 'B', content: 'Trái Đất tự quay quanh trục của mình', correct: true }, { key: 'C', content: 'Mây che khuất Mặt Trời', correct: false }, { key: 'D', content: 'Mặt Trăng che khuất Mặt Trời', correct: false }] },
  { content: 'Hệ Mặt Trời gồm bao nhiêu hành tinh?', difficulty: 'MEDIUM', explanation: 'Hệ Mặt Trời gồm 8 hành tinh: Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương.', options: [{ key: 'A', content: '7 hành tinh', correct: false }, { key: 'B', content: '8 hành tinh', correct: true }, { key: 'C', content: '9 hành tinh', correct: false }, { key: 'D', content: '10 hành tinh', correct: false }] },
  { content: 'Hành tinh nào gần Mặt Trời nhất?', difficulty: 'MEDIUM', explanation: 'Sao Thủy (Mercury) là hành tinh gần Mặt Trời nhất trong Hệ Mặt Trời.', options: [{ key: 'A', content: 'Trái Đất', correct: false }, { key: 'B', content: 'Sao Kim', correct: false }, { key: 'C', content: 'Sao Thủy', correct: true }, { key: 'D', content: 'Sao Hỏa', correct: false }] },
  { content: 'Nhật thực xảy ra khi nào?', difficulty: 'HARD', explanation: 'Nhật thực xảy ra khi Mặt Trăng di chuyển vào giữa Mặt Trời và Trái Đất, che khuất ánh sáng mặt trời.', options: [{ key: 'A', content: 'Trái Đất vào giữa Mặt Trời và Mặt Trăng', correct: false }, { key: 'B', content: 'Mặt Trăng vào giữa Mặt Trời và Trái Đất', correct: true }, { key: 'C', content: 'Mặt Trời bị mây che phủ', correct: false }, { key: 'D', content: 'Trái Đất ngừng quay', correct: false }] },
  { content: 'Chất nào dẫn điện tốt?', difficulty: 'EASY', explanation: 'Kim loại, đặc biệt là đồng và nhôm, dẫn điện tốt. Đây là lý do dây điện làm bằng đồng.', options: [{ key: 'A', content: 'Nhựa', correct: false }, { key: 'B', content: 'Cao su', correct: false }, { key: 'C', content: 'Đồng (kim loại)', correct: true }, { key: 'D', content: 'Gỗ', correct: false }] },
  { content: 'Nam châm hút được vật liệu nào?', difficulty: 'EASY', explanation: 'Nam châm hút được các vật liệu có từ tính như sắt, thép, niken, coban. Đồng, nhôm, gỗ, nhựa không bị hút.', options: [{ key: 'A', content: 'Đồng và nhôm', correct: false }, { key: 'B', content: 'Sắt và thép', correct: true }, { key: 'C', content: 'Gỗ và nhựa', correct: false }, { key: 'D', content: 'Tất cả kim loại', correct: false }] },
  { content: 'Hiện tượng cầu vồng xuất hiện sau cơn mưa do đâu?', difficulty: 'MEDIUM', explanation: 'Các giọt nước mưa trong không khí đóng vai trò như lăng kính, tán sắc ánh sáng mặt trời thành 7 màu tạo cầu vồng.', options: [{ key: 'A', content: 'Mặt trời đổi màu', correct: false }, { key: 'B', content: 'Các giọt nước tán sắc ánh sáng mặt trời', correct: true }, { key: 'C', content: 'Hơi nước đổi màu', correct: false }, { key: 'D', content: 'Do mây hấp thụ ánh sáng', correct: false }] },
  { content: 'Vì sao không bao giờ nhìn thẳng vào mặt trời?', difficulty: 'EASY', explanation: 'Ánh sáng mặt trời chứa tia tử ngoại và tia hồng ngoại cực mạnh, nhìn thẳng có thể gây tổn thương nghiêm trọng cho mắt, thậm chí mù vĩnh viễn.', options: [{ key: 'A', content: 'Vì mặt trời xấu', correct: false }, { key: 'B', content: 'Tia sáng mạnh gây tổn thương mắt', correct: true }, { key: 'C', content: 'Vì sẽ làm chảy nước mắt', correct: false }, { key: 'D', content: 'Không có lý do gì', correct: false }] },
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
