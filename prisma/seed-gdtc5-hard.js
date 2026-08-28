const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

const TOPIC_TD = 'cmt5s5b3d001v97l09idpitqd';
const TOPIC_TC = 'cmt5s5b3j001x97l0rrl7l5hq';
const TOPIC_SK = 'cmt5s5b3o001z97l0sk7fzz0b';

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: 'sub-gdtc',
      gradeId: 'grade-5',
      topicId: data.topicId,
      difficulty: 'HARD',
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: data.exp,
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

const questions = [
  // ============== THỂ DỤC CƠ BẢN (34 câu) ==============
  { topicId: TOPIC_TD, q: 'Trong chạy nước rút, giai đoạn nào quyết định thành tích lớn nhất?', opts: ['Xuất phát', 'Chạy lao sau xuất phát', 'Chạy giữa quãng', 'Về đích'], ans: 'C', exp: 'Chạy giữa quãng chiếm phần lớn cự ly nên quyết định thành tích nhiều nhất.' },
  { topicId: TOPIC_TD, q: 'Ở tư thế xuất phát thấp, góc gập của chân trước (ở khớp gối) khoảng bao nhiêu độ là hợp lý?', opts: ['45 độ', '90 độ', '120 độ', '160 độ'], ans: 'B', exp: 'Chân trước gập khoảng 90 độ để tạo lực đạp mạnh nhất.' },
  { topicId: TOPIC_TD, q: 'Khi chạy bền, kiểu thở nào giúp duy trì sức lâu nhất?', opts: ['Thở nhanh bằng miệng', 'Hít bằng mũi, thở bằng miệng theo nhịp bước', 'Nín thở từng đoạn', 'Chỉ thở bằng mũi'], ans: 'B', exp: 'Hít bằng mũi, thở bằng miệng theo nhịp bước giúp cung cấp oxy ổn định và giảm mệt.' },
  { topicId: TOPIC_TD, q: 'Công thức tính BMI là gì?', opts: ['Cân nặng (kg) / Chiều cao (m)', 'Cân nặng (kg) / Chiều cao² (m²)', 'Chiều cao (cm) - 100', 'Cân nặng (kg) × Chiều cao (m)'], ans: 'B', exp: 'BMI = cân nặng (kg) chia cho bình phương chiều cao (m).' },
  { topicId: TOPIC_TD, q: 'Nhịp tim bình thường lúc nghỉ của học sinh lớp 5 khoảng bao nhiêu lần/phút?', opts: ['40-60', '70-100', '110-130', '140-160'], ans: 'B', exp: 'Nhịp tim lúc nghỉ ở trẻ 10-11 tuổi khoảng 70-100 lần/phút.' },
  { topicId: TOPIC_TD, q: 'Trong nhảy xa kiểu ngồi, giai đoạn nào tạo ra độ xa chủ yếu?', opts: ['Chạy đà', 'Giậm nhảy', 'Trên không', 'Tiếp đất'], ans: 'B', exp: 'Giậm nhảy quyết định góc bay và lực đẩy nên tạo độ xa chủ yếu.' },
  { topicId: TOPIC_TD, q: 'Góc giậm nhảy tối ưu trong nhảy xa là khoảng bao nhiêu độ?', opts: ['10-15 độ', '20-25 độ', '40-45 độ', '60-70 độ'], ans: 'B', exp: 'Trong thực tế, góc giậm nhảy tối ưu của VĐV vào khoảng 20-25 độ.' },
  { topicId: TOPIC_TD, q: 'Trong nhảy cao kiểu bước qua, chân nào là chân giậm nhảy?', opts: ['Chân thuận', 'Chân không thuận', 'Chân ở gần xà', 'Chân ở xa xà'], ans: 'D', exp: 'Chân giậm là chân xa xà, chân lăng là chân gần xà đưa qua xà trước.' },
  { topicId: TOPIC_TD, q: 'Thứ tự đúng của các giai đoạn trong nhảy xa là?', opts: ['Giậm nhảy - Chạy đà - Trên không - Tiếp đất', 'Chạy đà - Giậm nhảy - Trên không - Tiếp đất', 'Chạy đà - Trên không - Giậm nhảy - Tiếp đất', 'Tiếp đất - Chạy đà - Giậm nhảy - Trên không'], ans: 'B', exp: 'Trình tự chuẩn: Chạy đà → Giậm nhảy → Trên không → Tiếp đất.' },
  { topicId: TOPIC_TD, q: 'Khi chạy nước rút, tay đánh về phía trước khoảng ngang đâu là hợp lý?', opts: ['Ngang thắt lưng', 'Ngang cằm', 'Ngang trán', 'Duỗi thẳng hết cỡ'], ans: 'B', exp: 'Tay đánh về trước cao ngang cằm, ra sau tới ngang hông giúp tăng tốc.' },
  { topicId: TOPIC_TD, q: 'Khi chạy bền, độ dài sải bước và tần số bước nên như thế nào?', opts: ['Sải rất dài, tần số thấp', 'Sải vừa phải, tần số đều', 'Sải rất ngắn, tần số rất cao', 'Sải và tần số thay đổi liên tục'], ans: 'B', exp: 'Chạy bền cần sải vừa phải, tần số đều để tiết kiệm sức.' },
  { topicId: TOPIC_TD, q: 'Nguyên tắc "tăng dần" trong tập luyện thể dục có nghĩa là gì?', opts: ['Tăng khối lượng ngay lập tức', 'Tăng dần lượng vận động theo thời gian', 'Chỉ tăng khi thi đấu', 'Tăng ngẫu nhiên'], ans: 'B', exp: 'Tăng dần lượng vận động giúp cơ thể thích nghi và tránh chấn thương.' },
  { topicId: TOPIC_TD, q: 'Bài khởi động trước khi tập nên kéo dài khoảng bao lâu?', opts: ['1-2 phút', '5-10 phút', '20-30 phút', '45 phút'], ans: 'B', exp: 'Khởi động 5-10 phút đủ làm nóng cơ và tăng nhịp tim từ từ.' },
  { topicId: TOPIC_TD, q: 'BMI của học sinh nặng 32 kg, cao 1,4 m là bao nhiêu (làm tròn 1 chữ số)?', opts: ['14,3', '16,3', '18,5', '22,4'], ans: 'B', exp: '32 / (1,4 × 1,4) = 32/1,96 ≈ 16,3.' },
  { topicId: TOPIC_TD, q: 'Trong chạy cự ly ngắn, khẩu lệnh xuất phát chuẩn quốc tế gồm mấy hiệu lệnh?', opts: ['1', '2', '3', '4'], ans: 'C', exp: 'Ba hiệu lệnh: "Vào chỗ" - "Sẵn sàng" - "Chạy" (tiếng súng).' },
  { topicId: TOPIC_TD, q: 'Nội dung nào KHÔNG thuộc thể dục cơ bản?', opts: ['Đội hình đội ngũ', 'Bài thể dục phát triển chung', 'Chạy bền', 'Đấu vật tự do'], ans: 'D', exp: 'Đấu vật tự do là môn thể thao thi đấu, không thuộc thể dục cơ bản trường tiểu học.' },
  { topicId: TOPIC_TD, q: 'Trong chạy tiếp sức, việc trao gậy được thực hiện trong khu vực dài bao nhiêu mét?', opts: ['10 m', '20 m', '30 m', '50 m'], ans: 'B', exp: 'Khu vực trao gậy trong chạy tiếp sức dài 20 m theo luật điền kinh.' },
  { topicId: TOPIC_TD, q: 'Tần số bước chạy nước rút của người tập tốt thường đạt khoảng bao nhiêu bước/giây?', opts: ['1-2', '2-3', '4-5', '7-8'], ans: 'C', exp: 'Tần số bước chạy nước rút của người tập tốt khoảng 4-5 bước/giây.' },
  { topicId: TOPIC_TD, q: 'Ý nghĩa của giai đoạn "thả lỏng" sau khi tập luyện là gì?', opts: ['Không có ý nghĩa', 'Đưa cơ thể trở về trạng thái bình thường, giảm mệt', 'Chỉ để đẹp bài tập', 'Tăng thêm sức mạnh cơ bắp'], ans: 'B', exp: 'Thả lỏng giúp nhịp tim, hô hấp trở lại bình thường và giảm đau cơ.' },
  { topicId: TOPIC_TD, q: 'Khi tiếp đất trong nhảy xa, để đạt thành tích tốt nhất, cần?', opts: ['Ngã ra sau', 'Đưa hai chân về trước, tay đánh mạnh ra sau', 'Duỗi thẳng hoàn toàn', 'Tiếp đất bằng đầu gối'], ans: 'B', exp: 'Đưa hai chân về trước và tay đánh ra sau giúp thân người vượt qua điểm tiếp đất, tăng độ xa.' },
  { topicId: TOPIC_TD, q: 'Trong chạy bền, hiện tượng "cực điểm" (điểm chết) là gì?', opts: ['Chạy nhanh nhất', 'Cảm giác mệt nặng, khó thở tạm thời khi bắt đầu chạy được một lúc', 'Về đích', 'Không thể chạy nữa mãi mãi'], ans: 'B', exp: 'Cực điểm là cảm giác mệt, khó thở tạm thời do cơ thể chưa kịp thích nghi, sẽ qua nếu tiếp tục chạy đều.' },
  { topicId: TOPIC_TD, q: 'Để vượt qua cực điểm trong chạy bền, cách tốt nhất là?', opts: ['Dừng chạy ngay', 'Chạy chậm lại, hít thở sâu và đều', 'Tăng tốc tối đa', 'Nín thở qua đoạn đó'], ans: 'B', exp: 'Giảm tốc và điều hòa nhịp thở giúp cơ thể thích nghi và vượt qua cực điểm.' },
  { topicId: TOPIC_TD, q: 'Trong đội hình hàng dọc, khoảng cách giữa hai người liền nhau chuẩn là?', opts: ['Một cánh tay', 'Một sải tay', 'Một khuỷu tay', 'Không quy định'], ans: 'A', exp: 'Cự ly chuẩn giữa hai người trong hàng dọc là một cánh tay dang thẳng.' },
  { topicId: TOPIC_TD, q: 'Khi giậm nhảy trong nhảy cao, lực chủ yếu do bộ phận nào tạo ra?', opts: ['Cánh tay', 'Cơ đùi và cơ chân giậm', 'Cơ bụng', 'Cơ lưng'], ans: 'B', exp: 'Cơ đùi và cơ chân giậm tạo lực bật chính, tay và chân lăng hỗ trợ.' },
  { topicId: TOPIC_TD, q: 'Nội dung "bài thể dục phát triển chung lớp 5" thường gồm bao nhiêu động tác?', opts: ['4 động tác', '6 động tác', '8 động tác', '12 động tác'], ans: 'C', exp: 'Bài thể dục phát triển chung lớp 5 gồm 8 động tác.' },
  { topicId: TOPIC_TD, q: 'Động tác nào thường mở đầu bài thể dục phát triển chung?', opts: ['Động tác nhảy', 'Động tác vươn thở', 'Động tác điều hòa', 'Động tác bụng'], ans: 'B', exp: 'Động tác vươn thở luôn mở đầu để tăng hô hấp và làm nóng cơ.' },
  { topicId: TOPIC_TD, q: 'Động tác nào thường kết thúc bài thể dục phát triển chung?', opts: ['Vươn thở', 'Tay', 'Nhảy', 'Điều hòa'], ans: 'D', exp: 'Động tác điều hòa kết thúc bài để đưa cơ thể trở về trạng thái bình thường.' },
  { topicId: TOPIC_TD, q: 'Khi thực hiện chạy đà trong nhảy xa, bước cuối cùng trước giậm nhảy thường?', opts: ['Ngắn hơn các bước trước', 'Dài hơn các bước trước', 'Bằng các bước trước', 'Nhảy lên cao'], ans: 'A', exp: 'Bước cuối ngắn hơn để hạ thấp trọng tâm, tạo điều kiện giậm nhảy mạnh.' },
  { topicId: TOPIC_TD, q: 'Chỉ số nào phản ánh khả năng chịu đựng của hệ tim mạch?', opts: ['Chiều cao', 'VO2 max (sức bền tim mạch)', 'BMI', 'Chiều dài sải tay'], ans: 'B', exp: 'VO2 max đo lượng oxy tối đa cơ thể sử dụng, phản ánh sức bền tim mạch.' },
  { topicId: TOPIC_TD, q: 'Trong chạy nước rút, thân người nên?', opts: ['Ngả về trước một chút', 'Ngả ra sau', 'Thẳng đứng hoàn toàn', 'Nghiêng sang một bên'], ans: 'A', exp: 'Thân hơi ngả về trước giúp trọng tâm về trước, tăng tốc độ.' },
  { topicId: TOPIC_TD, q: 'Nhịp tim tối đa an toàn khi vận động của học sinh 10 tuổi (theo công thức 220 - tuổi) là?', opts: ['180', '200', '210', '220'], ans: 'C', exp: '220 - 10 = 210 lần/phút là nhịp tim tối đa lý thuyết.' },
  { topicId: TOPIC_TD, q: 'Trong bài "đội hình đội ngũ", khẩu lệnh "Nghiêm!" yêu cầu?', opts: ['Đứng thoải mái', 'Đứng thẳng, hai gót chân sát nhau, mũi bàn chân mở khoảng 45 độ', 'Ngồi xuống', 'Chạy tại chỗ'], ans: 'B', exp: 'Tư thế nghiêm chuẩn: đứng thẳng, gót chân chạm nhau, mũi chân mở khoảng 45 độ.' },
  { topicId: TOPIC_TD, q: 'Việc luyện tập thể dục đều đặn có tác dụng gì với xương?', opts: ['Làm xương yếu đi', 'Tăng mật độ và độ chắc của xương', 'Không ảnh hưởng', 'Làm xương ngắn lại'], ans: 'B', exp: 'Vận động chịu tải giúp tăng mật độ khoáng và làm xương chắc khỏe hơn.' },
  { topicId: TOPIC_TD, q: 'Sải bước trong chạy nước rút của học sinh lớp 5 khoảng bao nhiêu?', opts: ['30-40 cm', '60-70 cm', '120-140 cm', '200-220 cm'], ans: 'C', exp: 'Sải bước học sinh lớp 5 khoảng 120-140 cm tùy chiều cao.' },

  // ============== TRÒ CHƠI VẬN ĐỘNG (33 câu) ==============
  { topicId: TOPIC_TC, q: 'Trong bóng đá mini 5 người, sân thi đấu tiêu chuẩn có kích thước khoảng?', opts: ['15 x 25 m', '25 x 42 m', '45 x 90 m', '68 x 105 m'], ans: 'B', exp: 'Sân futsal/bóng đá mini 5 người tiêu chuẩn khoảng 25 x 42 m.' },
  { topicId: TOPIC_TC, q: 'Trận bóng đá mini futsal chính thức gồm mấy hiệp và mỗi hiệp bao lâu?', opts: ['2 hiệp x 20 phút', '2 hiệp x 45 phút', '4 hiệp x 10 phút', '2 hiệp x 30 phút'], ans: 'A', exp: 'Futsal chính thức gồm 2 hiệp, mỗi hiệp 20 phút thời gian chết dừng đồng hồ.' },
  { topicId: TOPIC_TC, q: 'Trong bóng rổ, một cú ném rổ ngoài vạch 3 điểm được tính?', opts: ['1 điểm', '2 điểm', '3 điểm', '4 điểm'], ans: 'C', exp: 'Ném rổ ngoài vạch 3 điểm tính 3 điểm.' },
  { topicId: TOPIC_TC, q: 'Trong bóng rổ, một đội thi đấu chính thức có mấy cầu thủ trên sân?', opts: ['4', '5', '6', '7'], ans: 'B', exp: 'Bóng rổ có 5 cầu thủ mỗi đội trên sân.' },
  { topicId: TOPIC_TC, q: 'Trong cầu lông, chiều cao lưới ở giữa sân là?', opts: ['1,52 m', '1,524 m', '1,55 m', '1,60 m'], ans: 'B', exp: 'Lưới cầu lông cao 1,524 m ở giữa và 1,55 m ở cột lưới.' },
  { topicId: TOPIC_TC, q: 'Trong cầu lông đơn, cầu thủ ghi điểm tối đa để thắng một ván là?', opts: ['11', '15', '21', '25'], ans: 'C', exp: 'Ván cầu lông thắng khi đạt 21 điểm (chênh lệch tối thiểu 2 điểm).' },
  { topicId: TOPIC_TC, q: 'Trong bóng bàn hiện đại, một ván thắng khi đạt bao nhiêu điểm?', opts: ['11', '15', '21', '25'], ans: 'A', exp: 'Từ 2001, bóng bàn dùng thể thức 11 điểm mỗi ván (chênh lệch 2 điểm).' },
  { topicId: TOPIC_TC, q: 'Trong bóng bàn, mỗi cầu thủ giao bóng liên tiếp mấy quả rồi đổi giao?', opts: ['1', '2', '5', '10'], ans: 'B', exp: 'Theo luật hiện hành, mỗi bên giao 2 quả rồi đổi giao.' },
  { topicId: TOPIC_TC, q: 'Trong bóng đá 11 người, ở tình huống việt vị, cầu thủ bị coi là việt vị khi?', opts: ['Đứng ở phần sân đối phương', 'Đứng gần khung thành đối phương hơn bóng và hậu vệ đối phương thứ hai từ cuối tại thời điểm đồng đội chuyền bóng', 'Chạm bóng bằng tay', 'Đứng ngoài đường biên'], ans: 'B', exp: 'Việt vị: cầu thủ ở gần đường biên ngang đối phương hơn bóng và cầu thủ đối phương thứ hai tính từ cuối khi bóng được đồng đội chuyền.' },
  { topicId: TOPIC_TC, q: 'Trong trò chơi kéo co, đội thắng khi?', opts: ['Kéo được đối phương qua vạch giữa', 'Đối phương ngã trước', 'Đối phương buông tay trước', 'Tất cả đều đúng'], ans: 'A', exp: 'Đội thắng là đội kéo được điểm giữa (thường là nút đỏ trên dây) qua vạch của mình.' },
  { topicId: TOPIC_TC, q: 'Trò chơi ô ăn quan có mấy ô nhỏ (dân)?', opts: ['5', '8', '10', '12'], ans: 'C', exp: 'Bàn ô ăn quan có 10 ô nhỏ (5 mỗi bên) và 2 ô quan lớn.' },
  { topicId: TOPIC_TC, q: 'Trong ô ăn quan, mỗi ô dân ban đầu được đặt bao nhiêu quân?', opts: ['3', '5', '10', '12'], ans: 'B', exp: 'Mỗi ô dân đặt 5 quân, mỗi ô quan đặt 1 quân quan (10 điểm).' },
  { topicId: TOPIC_TC, q: 'Trong nhảy dây tập thể, kỷ lục đội đông đảm bảo yếu tố nào quan trọng nhất?', opts: ['Sức mạnh cá nhân', 'Nhịp điệu đồng bộ của cả đội', 'Chiều cao thành viên', 'Loại dây'], ans: 'B', exp: 'Nhảy dây tập thể cần nhịp điệu đồng bộ giữa người quay dây và người nhảy.' },
  { topicId: TOPIC_TC, q: 'Trong bóng đá, thẻ đỏ nghĩa là?', opts: ['Cảnh cáo', 'Truất quyền thi đấu', 'Đá phạt', 'Việt vị'], ans: 'B', exp: 'Thẻ đỏ có nghĩa là cầu thủ bị đuổi khỏi sân.' },
  { topicId: TOPIC_TC, q: 'Trong bóng rổ, lỗi "traveling" (chạy bước) là gì?', opts: ['Đập bóng bằng hai tay', 'Di chuyển quá số bước cho phép mà không dẫn bóng', 'Ném bóng ra ngoài', 'Chạm bóng bằng chân'], ans: 'B', exp: 'Traveling là di chuyển quá số bước quy định (thường quá 2 bước) mà không dẫn bóng.' },
  { topicId: TOPIC_TC, q: 'Trong bóng đá futsal, thủ môn không được giữ bóng trong tay quá bao nhiêu giây?', opts: ['2 giây', '4 giây', '6 giây', '10 giây'], ans: 'B', exp: 'Thủ môn futsal chỉ được giữ bóng trong tay tối đa 4 giây trên phần sân nhà.' },
  { topicId: TOPIC_TC, q: 'Đường kính vòng rổ trong bóng rổ chuẩn là?', opts: ['30 cm', '40 cm', '45 cm', '60 cm'], ans: 'C', exp: 'Vòng rổ bóng rổ có đường kính 45 cm.' },
  { topicId: TOPIC_TC, q: 'Chiều cao vành rổ so với mặt sân trong bóng rổ tiêu chuẩn là?', opts: ['2,05 m', '2,44 m', '3,05 m', '3,66 m'], ans: 'C', exp: 'Vành rổ cao 3,05 m tính từ mặt sân.' },
  { topicId: TOPIC_TC, q: 'Trong trò chơi "mèo đuổi chuột", số người tối thiểu để chơi hay là?', opts: ['3', '5', '8', '2'], ans: 'C', exp: 'Cần ít nhất khoảng 8 người để tạo vòng tròn và có mèo, chuột tham gia hấp dẫn.' },
  { topicId: TOPIC_TC, q: 'Cầu lông có nguồn gốc từ nước nào?', opts: ['Trung Quốc', 'Ấn Độ', 'Anh', 'Nhật Bản'], ans: 'B', exp: 'Cầu lông hiện đại bắt nguồn từ trò Poona ở Ấn Độ, được sĩ quan Anh phát triển.' },
  { topicId: TOPIC_TC, q: 'Trong đá cầu, điểm số ván đấu chính thức thắng khi đạt?', opts: ['11', '15', '21', '25'], ans: 'C', exp: 'Ván đá cầu thắng khi đạt 21 điểm (chênh lệch 2).' },
  { topicId: TOPIC_TC, q: 'Kích thước sân đá cầu đơn tiêu chuẩn là?', opts: ['5,18 x 11,88 m', '6,10 x 13,40 m', '9 x 18 m', '5 x 10 m'], ans: 'A', exp: 'Sân đá cầu đơn tiêu chuẩn 5,18 x 11,88 m.' },
  { topicId: TOPIC_TC, q: 'Trong bóng đá, một trận bóng đá 11 người chính thức gồm?', opts: ['2 hiệp x 30 phút', '2 hiệp x 45 phút', '4 hiệp x 15 phút', '3 hiệp x 30 phút'], ans: 'B', exp: 'Trận bóng đá 11 người: 2 hiệp x 45 phút, nghỉ giữa 15 phút.' },
  { topicId: TOPIC_TC, q: 'Trong bóng rổ, thời gian một hiệp thi đấu FIBA là?', opts: ['10 phút', '12 phút', '15 phút', '20 phút'], ans: 'A', exp: 'FIBA quy định 4 hiệp, mỗi hiệp 10 phút.' },
  { topicId: TOPIC_TC, q: 'Trong bóng chuyền, đội thắng một set khi đạt?', opts: ['15 điểm', '21 điểm', '25 điểm', '30 điểm'], ans: 'C', exp: 'Set bóng chuyền thắng khi đạt 25 điểm (chênh lệch 2), set quyết định 15 điểm.' },
  { topicId: TOPIC_TC, q: 'Trong trò chơi "rồng rắn lên mây", người "thầy thuốc" có nhiệm vụ gì?', opts: ['Dẫn đầu đoàn rắn', 'Đứng cuối đoàn', 'Đuổi bắt "khúc đuôi" của đoàn rồng rắn', 'Đứng ngoài quan sát'], ans: 'C', exp: 'Thầy thuốc có nhiệm vụ bắt khúc đuôi (người cuối) của đoàn rồng rắn.' },
  { topicId: TOPIC_TC, q: 'Trong bóng đá mini 5 người, mỗi đội được thay tối đa bao nhiêu cầu thủ dự bị?', opts: ['3', '5', '7', 'Không giới hạn số lần thay'], ans: 'D', exp: 'Futsal cho phép thay người không giới hạn số lần (thay bay), từ danh sách dự bị.' },
  { topicId: TOPIC_TC, q: 'Trong đá bóng, cú "sút phạt trực tiếp" khác "phạt gián tiếp" ở chỗ?', opts: ['Sút trực tiếp có thể ghi bàn ngay, gián tiếp thì bóng phải chạm cầu thủ khác trước khi vào lưới', 'Không có khác biệt', 'Sút gián tiếp mạnh hơn', 'Sút trực tiếp cách khung thành xa hơn'], ans: 'A', exp: 'Sút phạt trực tiếp có thể ghi bàn ngay, còn phạt gián tiếp bóng phải chạm người khác mới được tính bàn.' },
  { topicId: TOPIC_TC, q: 'Trong trò chơi nhảy bao bố, người chơi vi phạm khi?', opts: ['Nhảy bằng hai chân', 'Chân ra khỏi bao khi đang di chuyển', 'Vượt qua vạch đích', 'Nhảy quá cao'], ans: 'B', exp: 'Người chơi phải giữ chân trong bao suốt lượt chơi; nếu chân ra ngoài coi là phạm luật.' },
  { topicId: TOPIC_TC, q: 'Trong bóng rổ, cầu thủ bị phạm lỗi cá nhân thứ mấy sẽ bị truất quyền thi đấu (luật FIBA)?', opts: ['3', '4', '5', '6'], ans: 'C', exp: 'FIBA: 5 lỗi cá nhân là bị truất quyền thi đấu (NBA là 6).' },
  { topicId: TOPIC_TC, q: 'Chu vi bóng đá tiêu chuẩn số 5 (bóng người lớn) khoảng?', opts: ['58-60 cm', '68-70 cm', '75-78 cm', '85-90 cm'], ans: 'B', exp: 'Bóng đá số 5 có chu vi 68-70 cm, nặng 410-450 g.' },
  { topicId: TOPIC_TC, q: 'Trong cầu lông, khi giao bóng, người giao phải đánh cầu ở độ cao?', opts: ['Trên đầu', 'Dưới thắt lưng (dưới 1,15 m)', 'Ngang vai', 'Không quy định'], ans: 'B', exp: 'Luật cầu lông: tại thời điểm chạm cầu, cầu phải ở dưới độ cao 1,15 m (dưới thắt lưng).' },
  { topicId: TOPIC_TC, q: 'Trò chơi "bịt mắt bắt dê" rèn luyện chủ yếu kỹ năng nào?', opts: ['Sức mạnh', 'Thính giác và định hướng', 'Sự dẻo dai', 'Tốc độ nước rút'], ans: 'B', exp: 'Trò chơi rèn luyện thính giác và khả năng định hướng không gian khi bị bịt mắt.' },

  // ============== GIÁO DỤC SỨC KHỎE (33 câu) ==============
  { topicId: TOPIC_SK, q: 'Học sinh tiểu học được khuyến nghị ngủ bao nhiêu giờ mỗi đêm?', opts: ['5-6 giờ', '7-8 giờ', '9-11 giờ', '12-14 giờ'], ans: 'C', exp: 'Trẻ 6-12 tuổi cần ngủ 9-11 giờ mỗi đêm để phát triển tốt.' },
  { topicId: TOPIC_SK, q: 'Lượng nước một học sinh lớp 5 cần uống mỗi ngày khoảng?', opts: ['0,5 lít', '1,0-1,5 lít', '1,5-2 lít', '3-4 lít'], ans: 'C', exp: 'Trẻ 10-11 tuổi cần khoảng 1,5-2 lít nước mỗi ngày.' },
  { topicId: TOPIC_SK, q: 'Nguyên nhân chính gây chuột rút khi vận động là gì?', opts: ['Ăn quá no', 'Mất nước và mất điện giải, cơ bị mỏi', 'Không đội mũ', 'Mặc quần áo rộng'], ans: 'B', exp: 'Chuột rút thường do mất nước, mất muối khoáng và cơ bắp bị mỏi kéo dài.' },
  { topicId: TOPIC_SK, q: 'Khi bị bong gân cổ chân, xử lý đầu tiên nên là?', opts: ['Xoa dầu nóng và tiếp tục vận động', 'Chườm đá, băng ép, kê cao chân, nghỉ ngơi (RICE)', 'Massage mạnh', 'Ngâm nước nóng ngay lập tức'], ans: 'B', exp: 'Nguyên tắc RICE: Rest - Ice - Compression - Elevation là xử lý ban đầu chuẩn với bong gân.' },
  { topicId: TOPIC_SK, q: 'Chữ "I" trong nguyên tắc RICE (xử lý chấn thương) viết tắt của?', opts: ['Immobilize', 'Ice (chườm đá)', 'Injection', 'Increase'], ans: 'B', exp: 'RICE = Rest, Ice, Compression, Elevation. "I" là Ice - chườm đá.' },
  { topicId: TOPIC_SK, q: 'Nhóm chất dinh dưỡng nào cung cấp năng lượng chính khi vận động cường độ cao?', opts: ['Chất béo', 'Chất bột đường (carbohydrate)', 'Chất đạm', 'Vitamin'], ans: 'B', exp: 'Carbohydrate là nguồn năng lượng chính, dễ chuyển hóa nhất khi vận động cường độ cao.' },
  { topicId: TOPIC_SK, q: 'Vitamin nào giúp hấp thu canxi tốt nhất cho xương?', opts: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin B12'], ans: 'C', exp: 'Vitamin D giúp cơ thể hấp thu canxi hiệu quả, tốt cho xương.' },
  { topicId: TOPIC_SK, q: 'Nhịp tim tối đa lý thuyết của một học sinh 10 tuổi được tính bằng công thức nào?', opts: ['220 - tuổi', '200 - cân nặng', '180 + tuổi', '150 - tuổi'], ans: 'A', exp: 'Công thức nhịp tim tối đa: 220 - tuổi (lần/phút).' },
  { topicId: TOPIC_SK, q: 'Sau vận động mạnh, cơ bắp cần bao lâu để hồi phục hoàn toàn?', opts: ['1-2 giờ', '24-48 giờ', '1 tuần', '1 tháng'], ans: 'B', exp: 'Cơ bắp cần khoảng 24-48 giờ để phục hồi hoàn toàn sau vận động mạnh.' },
  { topicId: TOPIC_SK, q: 'Tư thế ngồi học đúng, khoảng cách từ mắt đến sách vở nên là?', opts: ['10-15 cm', '25-30 cm', '50-60 cm', '80-100 cm'], ans: 'B', exp: 'Khoảng cách chuẩn từ mắt đến sách vở là 25-30 cm để tránh cận thị.' },
  { topicId: TOPIC_SK, q: 'Khi tập chạy dài, nên uống nước như thế nào?', opts: ['Uống nhiều một lúc trước khi chạy', 'Uống từng ngụm nhỏ đều đặn trước, trong và sau khi chạy', 'Không uống trong khi chạy', 'Chỉ uống sau khi chạy'], ans: 'B', exp: 'Uống ngụm nhỏ, đều đặn giúp cơ thể hấp thu tốt và tránh xóc bụng.' },
  { topicId: TOPIC_SK, q: 'Thiếu vận động kéo dài KHÔNG dẫn đến tác hại nào sau đây?', opts: ['Béo phì', 'Cận thị tăng nhanh', 'Xương chắc khỏe hơn', 'Cong vẹo cột sống'], ans: 'C', exp: 'Thiếu vận động khiến xương yếu đi, KHÔNG chắc khỏe hơn.' },
  { topicId: TOPIC_SK, q: 'Nhóm cơ chính hoạt động khi thực hiện động tác hít đất là?', opts: ['Cơ đùi và cơ bụng', 'Cơ ngực, cơ tay sau (tam đầu) và cơ vai', 'Cơ lưng và cơ bắp chân', 'Cơ cổ và cơ mặt'], ans: 'B', exp: 'Hít đất chủ yếu tác động cơ ngực, cơ tam đầu (bắp tay sau) và cơ vai.' },
  { topicId: TOPIC_SK, q: 'Khi bị chảy máu cam do va chạm nhẹ, nên?', opts: ['Ngửa đầu ra sau', 'Cúi đầu về trước, bóp nhẹ cánh mũi 5-10 phút', 'Nằm ngửa và nhét bông sâu vào mũi', 'Xì mũi mạnh'], ans: 'B', exp: 'Cúi đầu về trước và bóp cánh mũi giúp cầm máu, tránh nuốt máu vào bụng.' },
  { topicId: TOPIC_SK, q: 'Một bữa ăn cân đối cho trẻ vận động cần đủ mấy nhóm chất chính?', opts: ['2', '3', '4', '6'], ans: 'C', exp: 'Bốn nhóm chất chính: bột đường, đạm, béo, vitamin và khoáng chất.' },
  { topicId: TOPIC_SK, q: 'Trước khi tập luyện thể thao, nên ăn xong bao lâu?', opts: ['Ngay khi ăn xong', 'Sau 15 phút', 'Sau 1-2 giờ', 'Không cần ăn'], ans: 'C', exp: 'Nên ăn no trước 1-2 giờ để thức ăn kịp tiêu hóa, tránh xóc bụng, khó chịu.' },
  { topicId: TOPIC_SK, q: 'Nhóm cơ chính hoạt động khi đá bóng bằng mu bàn chân là?', opts: ['Cơ cánh tay', 'Cơ đùi trước (tứ đầu đùi) và cơ chân', 'Cơ ngực', 'Cơ bụng dưới'], ans: 'B', exp: 'Cơ tứ đầu đùi và các cơ chân tạo lực chính khi đá bóng.' },
  { topicId: TOPIC_SK, q: 'Bệnh nào có thể phòng ngừa hiệu quả bằng cách tập thể dục đều đặn?', opts: ['Cận thị nặng bẩm sinh', 'Béo phì và bệnh tim mạch', 'Bệnh di truyền', 'Sốt xuất huyết'], ans: 'B', exp: 'Tập thể dục đều đặn giúp phòng ngừa béo phì và bệnh tim mạch hiệu quả.' },
  { topicId: TOPIC_SK, q: 'Khi bị say nắng, việc cần làm đầu tiên là?', opts: ['Cho uống nước đá', 'Đưa vào chỗ mát, nới lỏng quần áo, lau mát cơ thể', 'Bắt tập tiếp cho ra mồ hôi', 'Cho uống thuốc kháng sinh'], ans: 'B', exp: 'Đưa nạn nhân vào nơi mát, thoáng và làm mát cơ thể là bước xử lý đầu tiên với say nắng.' },
  { topicId: TOPIC_SK, q: 'Chỉ số BMI của trẻ 10 tuổi được đánh giá dựa vào?', opts: ['Chỉ so với BMI người lớn', 'Bảng phần trăm BMI theo tuổi và giới tính', 'Chỉ cân nặng', 'Chỉ chiều cao'], ans: 'B', exp: 'Ở trẻ em, BMI được so sánh với bảng phần trăm (percentile) theo tuổi và giới tính.' },
  { topicId: TOPIC_SK, q: 'Vitamin C có nhiều trong thực phẩm nào sau đây?', opts: ['Cam, bưởi, ổi', 'Thịt bò', 'Sữa tươi', 'Gạo trắng'], ans: 'A', exp: 'Trái cây họ cam quýt và ổi rất giàu vitamin C.' },
  { topicId: TOPIC_SK, q: 'Canxi cần thiết cho sự phát triển bộ phận nào của cơ thể?', opts: ['Chỉ da', 'Xương và răng', 'Chỉ tóc', 'Chỉ móng tay'], ans: 'B', exp: 'Canxi là khoáng chất chính cấu tạo xương và răng.' },
  { topicId: TOPIC_SK, q: 'Khi bị chấn thương phần mềm mới xảy ra, KHÔNG nên?', opts: ['Chườm đá', 'Băng ép nhẹ', 'Xoa dầu nóng, massage mạnh', 'Nghỉ ngơi'], ans: 'C', exp: 'Xoa dầu nóng và massage mạnh khi mới chấn thương làm tổn thương nặng thêm và tăng chảy máu bên trong.' },
  { topicId: TOPIC_SK, q: 'Trước khi khởi động chính, cần làm nóng cơ thể để?', opts: ['Tăng lưu lượng máu tới cơ, giảm nguy cơ chấn thương', 'Làm chậm nhịp tim', 'Giảm lượng oxy tới cơ', 'Làm cơ cứng lại'], ans: 'A', exp: 'Khởi động làm tăng nhiệt độ cơ, tăng lưu lượng máu và giảm chấn thương.' },
  { topicId: TOPIC_SK, q: 'Ăn quá nhiều đường tinh luyện lâu dài có thể gây?', opts: ['Tăng chiều cao', 'Sâu răng, béo phì, nguy cơ tiểu đường', 'Tăng thị lực', 'Cơ bắp phát triển'], ans: 'B', exp: 'Đường tinh luyện dùng nhiều gây sâu răng, béo phì và tăng nguy cơ tiểu đường.' },
  { topicId: TOPIC_SK, q: 'Khi tập chạy dưới trời nắng, nên đội mũ và mặc quần áo?', opts: ['Đen, dày, kín', 'Sáng màu, thoáng mát, thấm hút mồ hôi', 'Chỉ mặc áo khoác dày', 'Không cần đội mũ'], ans: 'B', exp: 'Quần áo sáng màu, thoáng mát giúp phản xạ nhiệt và thoát mồ hôi, tránh say nắng.' },
  { topicId: TOPIC_SK, q: 'Nhóm cơ chính hoạt động khi thực hiện động tác gập bụng là?', opts: ['Cơ tam đầu', 'Cơ thẳng bụng (rectus abdominis)', 'Cơ đùi sau', 'Cơ vai'], ans: 'B', exp: 'Động tác gập bụng chủ yếu tác động cơ thẳng bụng.' },
  { topicId: TOPIC_SK, q: 'Tư thế ngủ nào tốt nhất cho cột sống?', opts: ['Nằm sấp', 'Nằm ngửa hoặc nằm nghiêng với gối vừa phải', 'Nằm co người sát tường', 'Nằm gối cao 30 cm'], ans: 'B', exp: 'Nằm ngửa hoặc nghiêng với gối vừa phải giúp giữ cột sống thẳng tự nhiên.' },
  { topicId: TOPIC_SK, q: 'Đạm (protein) có vai trò chính là?', opts: ['Cung cấp năng lượng chính', 'Xây dựng và sửa chữa mô cơ thể', 'Bảo vệ cơ thể khỏi tia UV', 'Điều hòa nhiệt độ'], ans: 'B', exp: 'Đạm là nguyên liệu chính để xây dựng, sửa chữa các mô, đặc biệt là cơ bắp.' },
  { topicId: TOPIC_SK, q: 'Cong vẹo cột sống ở học sinh chủ yếu do?', opts: ['Ăn nhiều rau', 'Ngồi học sai tư thế, mang cặp lệch vai kéo dài', 'Tập thể dục quá nhiều', 'Uống nhiều nước'], ans: 'B', exp: 'Ngồi sai tư thế và đeo cặp lệch vai là nguyên nhân chính gây cong vẹo cột sống ở học sinh.' },
  { topicId: TOPIC_SK, q: 'Trong thời gian dài học sinh nhìn màn hình, cứ khoảng bao lâu nên nghỉ mắt và nhìn xa 20 giây (quy tắc 20-20-20)?', opts: ['5 phút', '20 phút', '60 phút', '2 giờ'], ans: 'B', exp: 'Quy tắc 20-20-20: cứ 20 phút, nhìn vật cách 20 feet (~6 m) trong 20 giây để giảm mỏi mắt.' },
  { topicId: TOPIC_SK, q: 'Cơ tim khác cơ vân ở điểm nào?', opts: ['Cơ tim hoạt động không theo ý muốn, còn cơ vân hoạt động có ý thức', 'Cơ tim yếu hơn cơ vân', 'Cơ tim không cần oxy', 'Cơ vân co bóp cả đời không nghỉ'], ans: 'A', exp: 'Cơ tim là cơ không tự chủ (đập tự động), còn cơ vân co theo ý muốn.' },
  { topicId: TOPIC_SK, q: 'Vận động buổi sáng có lợi ích nào nổi bật?', opts: ['Làm cơ thể mệt cả ngày', 'Kích thích trao đổi chất, tăng tỉnh táo và tâm trạng tích cực', 'Gây mất ngủ ban đêm', 'Giảm chiều cao'], ans: 'B', exp: 'Vận động buổi sáng giúp tăng trao đổi chất, cải thiện tâm trạng và tăng tỉnh táo cả ngày.' },
];

async function main() {
  let count = 0;
  for (const q of questions) {
    await createQ(q);
    count++;
    if (count % 10 === 0) console.log(`Đã tạo ${count}/${questions.length} câu`);
  }
  console.log(`Hoàn tất! Tổng: ${count} câu HARD cho GDTC lớp 5.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await p.$disconnect();
  });
