const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const SUBJECT_ID = 'sub-ly';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';

const questions = [
  // ===== ÁNH SÁNG (25 câu) =====
  {
    content: 'Vật nào dưới đây là nguồn sáng?',
    difficulty: 'EASY',
    explanation: 'Nguồn sáng là vật tự phát ra ánh sáng. Mặt Trời tự phát sáng nên là nguồn sáng.',
    options: [
      { key: 'A', content: 'Mặt Trăng', correct: false },
      { key: 'B', content: 'Mặt Trời', correct: true },
      { key: 'C', content: 'Gương phẳng', correct: false },
      { key: 'D', content: 'Mảnh kính', correct: false },
    ],
  },
  {
    content: 'Ánh sáng truyền đi theo đường nào?',
    difficulty: 'EASY',
    explanation: 'Ánh sáng luôn truyền đi theo đường thẳng trong môi trường đồng nhất.',
    options: [
      { key: 'A', content: 'Đường cong', correct: false },
      { key: 'B', content: 'Đường gấp khúc', correct: false },
      { key: 'C', content: 'Đường thẳng', correct: true },
      { key: 'D', content: 'Đường tròn', correct: false },
    ],
  },
  {
    content: 'Bóng tối xuất hiện ở phía nào của vật cản sáng?',
    difficulty: 'EASY',
    explanation: 'Bóng tối xuất hiện ở phía sau vật cản sáng, tức là phía không được chiếu sáng.',
    options: [
      { key: 'A', content: 'Phía trước vật cản sáng', correct: false },
      { key: 'B', content: 'Phía sau vật cản sáng', correct: true },
      { key: 'C', content: 'Xung quanh vật cản sáng', correct: false },
      { key: 'D', content: 'Bên trên vật cản sáng', correct: false },
    ],
  },
  {
    content: 'Vật nào sau đây cho ánh sáng truyền qua hoàn toàn?',
    difficulty: 'EASY',
    explanation: 'Kính trong suốt cho ánh sáng truyền qua hoàn toàn.',
    options: [
      { key: 'A', content: 'Tấm gỗ', correct: false },
      { key: 'B', content: 'Tấm bìa', correct: false },
      { key: 'C', content: 'Kính trong suốt', correct: true },
      { key: 'D', content: 'Quyển sách', correct: false },
    ],
  },
  {
    content: 'Mắt ta nhìn thấy vật khi nào?',
    difficulty: 'EASY',
    explanation: 'Mắt ta nhìn thấy vật khi có ánh sáng từ vật đó truyền vào mắt.',
    options: [
      { key: 'A', content: 'Khi vật đứng yên', correct: false },
      { key: 'B', content: 'Khi có ánh sáng từ vật truyền vào mắt', correct: true },
      { key: 'C', content: 'Khi mắt ta nhìn thẳng vào vật', correct: false },
      { key: 'D', content: 'Khi vật ở gần mắt', correct: false },
    ],
  },
  {
    content: 'Vật nào sau đây không phải là nguồn sáng?',
    difficulty: 'EASY',
    explanation: 'Gương phẳng chỉ phản chiếu ánh sáng chứ không tự phát sáng, nên không phải nguồn sáng.',
    options: [
      { key: 'A', content: 'Ngọn nến đang cháy', correct: false },
      { key: 'B', content: 'Bóng điện đang sáng', correct: false },
      { key: 'C', content: 'Gương phẳng', correct: true },
      { key: 'D', content: 'Đom đóm', correct: false },
    ],
  },
  {
    content: 'Bóng của một vật thay đổi như thế nào khi nguồn sáng ở xa hơn?',
    difficulty: 'MEDIUM',
    explanation: 'Khi nguồn sáng ở xa hơn, bóng của vật nhỏ hơn vì các tia sáng hội tụ hơn.',
    options: [
      { key: 'A', content: 'Bóng to hơn', correct: false },
      { key: 'B', content: 'Bóng nhỏ hơn', correct: true },
      { key: 'C', content: 'Bóng không thay đổi', correct: false },
      { key: 'D', content: 'Bóng biến mất', correct: false },
    ],
  },
  {
    content: 'Hiện tượng nhật thực xảy ra khi nào?',
    difficulty: 'MEDIUM',
    explanation: 'Nhật thực xảy ra khi Mặt Trăng đi vào giữa Mặt Trời và Trái Đất, chắn ánh sáng Mặt Trời.',
    options: [
      { key: 'A', content: 'Trái Đất đi vào giữa Mặt Trời và Mặt Trăng', correct: false },
      { key: 'B', content: 'Mặt Trăng đi vào giữa Mặt Trời và Trái Đất', correct: true },
      { key: 'C', content: 'Mặt Trời đi vào giữa Trái Đất và Mặt Trăng', correct: false },
      { key: 'D', content: 'Trái Đất, Mặt Trời và Mặt Trăng tạo thành hình tam giác', correct: false },
    ],
  },
  {
    content: 'Ánh sáng phản xạ từ gương phẳng có tính chất gì?',
    difficulty: 'MEDIUM',
    explanation: 'Góc phản xạ bằng góc tới – đây là định luật phản xạ ánh sáng.',
    options: [
      { key: 'A', content: 'Góc phản xạ lớn hơn góc tới', correct: false },
      { key: 'B', content: 'Góc phản xạ nhỏ hơn góc tới', correct: false },
      { key: 'C', content: 'Góc phản xạ bằng góc tới', correct: true },
      { key: 'D', content: 'Ánh sáng phản xạ theo mọi hướng', correct: false },
    ],
  },
  {
    content: 'Vì sao ban đêm ta không nhìn thấy vật xung quanh khi tắt đèn?',
    difficulty: 'MEDIUM',
    explanation: 'Khi không có ánh sáng, không có ánh sáng từ vật truyền vào mắt nên mắt không nhìn thấy vật.',
    options: [
      { key: 'A', content: 'Vì mắt ta bị mỏi', correct: false },
      { key: 'B', content: 'Vì không có ánh sáng truyền từ vật vào mắt', correct: true },
      { key: 'C', content: 'Vì vật không phát sáng', correct: false },
      { key: 'D', content: 'Vì mắt ta nhắm lại khi tối', correct: false },
    ],
  },
  {
    content: 'Khi nhìn trực tiếp vào Mặt Trời, mắt ta bị tổn thương vì:',
    difficulty: 'MEDIUM',
    explanation: 'Ánh sáng Mặt Trời rất mạnh, chiếu thẳng vào mắt sẽ làm hỏng võng mạc.',
    options: [
      { key: 'A', content: 'Mặt Trời quá xa', correct: false },
      { key: 'B', content: 'Ánh sáng Mặt Trời quá mạnh làm hỏng mắt', correct: true },
      { key: 'C', content: 'Mặt Trời phát ra khí độc', correct: false },
      { key: 'D', content: 'Ánh sáng Mặt Trời quá tối', correct: false },
    ],
  },
  {
    content: 'Hiện tượng gì xảy ra khi ánh sáng truyền qua lăng kính thủy tinh?',
    difficulty: 'HARD',
    explanation: 'Lăng kính phân tán ánh sáng trắng thành dải màu cầu vồng (7 màu: đỏ, cam, vàng, lục, lam, chàm, tím).',
    options: [
      { key: 'A', content: 'Ánh sáng bị dừng lại', correct: false },
      { key: 'B', content: 'Ánh sáng bị phân tán thành nhiều màu', correct: true },
      { key: 'C', content: 'Ánh sáng bị hấp thụ hoàn toàn', correct: false },
      { key: 'D', content: 'Ánh sáng phản chiếu ngược lại', correct: false },
    ],
  },
  {
    content: 'Tại sao ta thấy bầu trời màu xanh?',
    difficulty: 'HARD',
    explanation: 'Bầu trời xanh vì khí quyển tán xạ ánh sáng xanh nhiều hơn các màu khác.',
    options: [
      { key: 'A', content: 'Vì nước biển phản chiếu lên bầu trời', correct: false },
      { key: 'B', content: 'Vì khí quyển tán xạ ánh sáng xanh nhiều nhất', correct: true },
      { key: 'C', content: 'Vì Mặt Trời phát ra ánh sáng màu xanh', correct: false },
      { key: 'D', content: 'Vì mây có màu xanh', correct: false },
    ],
  },
  {
    content: 'Chiếc bút chì cắm vào cốc nước trông có vẻ bị gãy là do hiện tượng gì?',
    difficulty: 'HARD',
    explanation: 'Hiện tượng khúc xạ ánh sáng: ánh sáng đổi hướng khi truyền từ nước sang không khí.',
    options: [
      { key: 'A', content: 'Phản xạ ánh sáng', correct: false },
      { key: 'B', content: 'Khúc xạ ánh sáng', correct: true },
      { key: 'C', content: 'Tán xạ ánh sáng', correct: false },
      { key: 'D', content: 'Hấp thụ ánh sáng', correct: false },
    ],
  },
  {
    content: 'Cầu vồng xuất hiện sau cơn mưa là vì:',
    difficulty: 'HARD',
    explanation: 'Các hạt nước mưa đóng vai trò như lăng kính, phân tán ánh sáng Mặt Trời thành 7 màu.',
    options: [
      { key: 'A', content: 'Các hạt nước phân tán ánh sáng thành nhiều màu', correct: true },
      { key: 'B', content: 'Mặt Trời thay đổi màu sắc sau mưa', correct: false },
      { key: 'C', content: 'Không khí sau mưa có nhiều màu', correct: false },
      { key: 'D', content: 'Mây phản chiếu nhiều màu khác nhau', correct: false },
    ],
  },

  // ===== ÂM THANH (20 câu) =====
  {
    content: 'Âm thanh được tạo ra như thế nào?',
    difficulty: 'EASY',
    explanation: 'Âm thanh được tạo ra do sự rung động của vật.',
    options: [
      { key: 'A', content: 'Do vật chuyển động nhanh', correct: false },
      { key: 'B', content: 'Do sự rung động của vật', correct: true },
      { key: 'C', content: 'Do vật va chạm vào nhau', correct: false },
      { key: 'D', content: 'Do vật nóng lên', correct: false },
    ],
  },
  {
    content: 'Âm thanh có thể truyền qua môi trường nào?',
    difficulty: 'EASY',
    explanation: 'Âm thanh có thể truyền qua chất rắn, chất lỏng và chất khí.',
    options: [
      { key: 'A', content: 'Chỉ qua không khí', correct: false },
      { key: 'B', content: 'Chỉ qua chất rắn', correct: false },
      { key: 'C', content: 'Qua chất rắn, chất lỏng và chất khí', correct: true },
      { key: 'D', content: 'Chỉ qua chất lỏng và chất khí', correct: false },
    ],
  },
  {
    content: 'Tiếng vang xảy ra khi nào?',
    difficulty: 'EASY',
    explanation: 'Tiếng vang xảy ra khi âm thanh gặp vật cản và dội lại.',
    options: [
      { key: 'A', content: 'Khi ta hét to', correct: false },
      { key: 'B', content: 'Khi âm thanh gặp vật cản và dội lại', correct: true },
      { key: 'C', content: 'Khi âm thanh truyền xa', correct: false },
      { key: 'D', content: 'Khi có hai người nói cùng lúc', correct: false },
    ],
  },
  {
    content: 'Vật nào sau đây không thể truyền âm thanh?',
    difficulty: 'EASY',
    explanation: 'Chân không (không có vật chất) không thể truyền âm thanh vì âm thanh cần vật chất để lan truyền.',
    options: [
      { key: 'A', content: 'Không khí', correct: false },
      { key: 'B', content: 'Nước', correct: false },
      { key: 'C', content: 'Chân không', correct: true },
      { key: 'D', content: 'Gỗ', correct: false },
    ],
  },
  {
    content: 'Âm thanh nào sau đây có hại cho tai người?',
    difficulty: 'EASY',
    explanation: 'Tiếng ồn quá lớn (tiếng máy khoan) có thể gây tổn hại cho tai người.',
    options: [
      { key: 'A', content: 'Tiếng chim hót', correct: false },
      { key: 'B', content: 'Tiếng nhạc nhẹ nhàng', correct: false },
      { key: 'C', content: 'Tiếng máy khoan', correct: true },
      { key: 'D', content: 'Tiếng suối chảy', correct: false },
    ],
  },
  {
    content: 'Khi gõ trống, âm thanh to hay nhỏ phụ thuộc vào điều gì?',
    difficulty: 'MEDIUM',
    explanation: 'Âm thanh to hay nhỏ phụ thuộc vào biên độ dao động – gõ mạnh thì trống rung mạnh hơn tạo ra âm to hơn.',
    options: [
      { key: 'A', content: 'Màu sắc của trống', correct: false },
      { key: 'B', content: 'Kích thước của dùi trống', correct: false },
      { key: 'C', content: 'Lực gõ mạnh hay nhẹ', correct: true },
      { key: 'D', content: 'Màu sắc của dùi trống', correct: false },
    ],
  },
  {
    content: 'Tại sao người ta đặt tai lên đường ray tàu hỏa để nghe tiếng tàu đến từ xa?',
    difficulty: 'MEDIUM',
    explanation: 'Chất rắn (đường ray) truyền âm thanh nhanh hơn và tốt hơn không khí.',
    options: [
      { key: 'A', content: 'Vì tai người nhạy hơn khi đặt xuống đất', correct: false },
      { key: 'B', content: 'Vì chất rắn truyền âm tốt hơn không khí', correct: true },
      { key: 'C', content: 'Vì đường ray rung tạo ra âm thanh mới', correct: false },
      { key: 'D', content: 'Vì không khí cản âm thanh', correct: false },
    ],
  },
  {
    content: 'Tốc độ âm thanh trong nước so với trong không khí như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Âm thanh truyền trong nước nhanh hơn trong không khí vì các phân tử nước sít nhau hơn.',
    options: [
      { key: 'A', content: 'Chậm hơn', correct: false },
      { key: 'B', content: 'Nhanh hơn', correct: true },
      { key: 'C', content: 'Bằng nhau', correct: false },
      { key: 'D', content: 'Âm thanh không truyền trong nước', correct: false },
    ],
  },
  {
    content: 'Dây đàn guitar khi bị gảy sẽ tạo ra âm thanh vì:',
    difficulty: 'MEDIUM',
    explanation: 'Dây đàn rung động tạo ra sóng âm truyền qua không khí đến tai ta.',
    options: [
      { key: 'A', content: 'Dây đàn phát ra ánh sáng', correct: false },
      { key: 'B', content: 'Dây đàn rung động, tạo ra sóng âm', correct: true },
      { key: 'C', content: 'Không khí xung quanh dây đàn nóng lên', correct: false },
      { key: 'D', content: 'Dây đàn chuyển động theo một chiều', correct: false },
    ],
  },
  {
    content: 'Người điếc không nghe được âm thanh vì:',
    difficulty: 'MEDIUM',
    explanation: 'Người điếc bị tổn thương ở tai trong hoặc thần kinh thính giác, không nhận được tín hiệu âm thanh.',
    options: [
      { key: 'A', content: 'Âm thanh không truyền đến được tai họ', correct: false },
      { key: 'B', content: 'Tai họ bị tổn thương, không nhận được âm thanh', correct: true },
      { key: 'C', content: 'Họ không có tai', correct: false },
      { key: 'D', content: 'Không khí xung quanh họ không truyền âm', correct: false },
    ],
  },
  {
    content: 'Âm thanh từ nguồn phát ra lan truyền theo dạng nào?',
    difficulty: 'HARD',
    explanation: 'Âm thanh lan truyền theo dạng sóng, tỏa ra mọi hướng từ nguồn phát.',
    options: [
      { key: 'A', content: 'Theo đường thẳng một chiều', correct: false },
      { key: 'B', content: 'Dạng sóng tỏa ra mọi hướng', correct: true },
      { key: 'C', content: 'Theo chiều gió', correct: false },
      { key: 'D', content: 'Theo đường vòng tròn phẳng', correct: false },
    ],
  },
  {
    content: 'Tại sao trong phòng trống (không có đồ đạc) tiếng vang rất lớn?',
    difficulty: 'HARD',
    explanation: 'Phòng trống có bề mặt cứng phản xạ âm tốt, ít vật hấp thụ âm nên tiếng vang lớn.',
    options: [
      { key: 'A', content: 'Vì không khí trong phòng trống nhiều hơn', correct: false },
      { key: 'B', content: 'Vì bề mặt cứng phản xạ âm mạnh, ít vật hấp thụ âm', correct: true },
      { key: 'C', content: 'Vì nhiệt độ phòng trống cao hơn', correct: false },
      { key: 'D', content: 'Vì âm thanh đi vòng trong phòng', correct: false },
    ],
  },
  {
    content: 'Vì sao phòng thu âm thường được lót bằng các vật liệu mềm xốp?',
    difficulty: 'HARD',
    explanation: 'Vật liệu mềm xốp hấp thụ âm tốt, giảm tiếng vang, giúp thu âm thanh trung thực hơn.',
    options: [
      { key: 'A', content: 'Để phòng trông đẹp hơn', correct: false },
      { key: 'B', content: 'Để vật liệu mềm hấp thụ âm, giảm tiếng vang', correct: true },
      { key: 'C', content: 'Để cách nhiệt cho phòng', correct: false },
      { key: 'D', content: 'Để âm thanh truyền nhanh hơn', correct: false },
    ],
  },

  // ===== NHIỆT (20 câu) =====
  {
    content: 'Nhiệt kế dùng để đo gì?',
    difficulty: 'EASY',
    explanation: 'Nhiệt kế là dụng cụ dùng để đo nhiệt độ.',
    options: [
      { key: 'A', content: 'Trọng lượng', correct: false },
      { key: 'B', content: 'Nhiệt độ', correct: true },
      { key: 'C', content: 'Chiều dài', correct: false },
      { key: 'D', content: 'Thể tích', correct: false },
    ],
  },
  {
    content: 'Nhiệt độ sôi của nước ở điều kiện bình thường là bao nhiêu độ C?',
    difficulty: 'EASY',
    explanation: 'Nước sôi ở 100°C ở áp suất khí quyển bình thường.',
    options: [
      { key: 'A', content: '50°C', correct: false },
      { key: 'B', content: '80°C', correct: false },
      { key: 'C', content: '100°C', correct: true },
      { key: 'D', content: '120°C', correct: false },
    ],
  },
  {
    content: 'Vật dẫn nhiệt tốt nhất trong các vật sau là:',
    difficulty: 'EASY',
    explanation: 'Kim loại (đặc biệt là đồng, nhôm, sắt) dẫn nhiệt rất tốt.',
    options: [
      { key: 'A', content: 'Gỗ', correct: false },
      { key: 'B', content: 'Nhựa', correct: false },
      { key: 'C', content: 'Kim loại', correct: true },
      { key: 'D', content: 'Vải', correct: false },
    ],
  },
  {
    content: 'Khi đun nóng, hầu hết các vật sẽ:',
    difficulty: 'EASY',
    explanation: 'Khi bị đun nóng, các phân tử dao động mạnh hơn, đẩy nhau xa hơn, vật nở ra.',
    options: [
      { key: 'A', content: 'Co lại', correct: false },
      { key: 'B', content: 'Nở ra', correct: true },
      { key: 'C', content: 'Không thay đổi', correct: false },
      { key: 'D', content: 'Tan chảy', correct: false },
    ],
  },
  {
    content: 'Nhiệt độ đông đặc của nước là:',
    difficulty: 'EASY',
    explanation: 'Nước đông đặc (chuyển từ lỏng sang rắn) ở 0°C.',
    options: [
      { key: 'A', content: '-10°C', correct: false },
      { key: 'B', content: '0°C', correct: true },
      { key: 'C', content: '4°C', correct: false },
      { key: 'D', content: '10°C', correct: false },
    ],
  },
  {
    content: 'Tại sao bình đựng nước nóng bằng nhựa xốp (styrofoam) giữ nhiệt tốt hơn bình thủy tinh?',
    difficulty: 'MEDIUM',
    explanation: 'Nhựa xốp dẫn nhiệt kém (cách nhiệt tốt) hơn thủy tinh, nên ít trao đổi nhiệt với môi trường bên ngoài.',
    options: [
      { key: 'A', content: 'Vì nhựa xốp nhẹ hơn', correct: false },
      { key: 'B', content: 'Vì nhựa xốp dẫn nhiệt kém hơn thủy tinh', correct: true },
      { key: 'C', content: 'Vì bình nhựa dày hơn', correct: false },
      { key: 'D', content: 'Vì nhựa xốp hút nhiệt từ bên ngoài', correct: false },
    ],
  },
  {
    content: 'Vào mùa hè, mặc áo màu sẫm hay màu nhạt sẽ nóng hơn? Vì sao?',
    difficulty: 'MEDIUM',
    explanation: 'Áo màu sẫm hấp thụ nhiệt nhiều hơn áo màu nhạt, nên mặc áo màu sẫm sẽ cảm thấy nóng hơn.',
    options: [
      { key: 'A', content: 'Màu nhạt, vì phản chiếu ánh sáng kém hơn', correct: false },
      { key: 'B', content: 'Màu sẫm, vì hấp thụ nhiệt nhiều hơn', correct: true },
      { key: 'C', content: 'Như nhau, màu sắc không ảnh hưởng', correct: false },
      { key: 'D', content: 'Màu sẫm, vì dẫn điện tốt hơn', correct: false },
    ],
  },
  {
    content: 'Khi ta thổi hơi vào tay, ta cảm thấy mát. Khi ta thổi hơi thở trực tiếp, ta cảm thấy ấm. Điều này giải thích vì:',
    difficulty: 'MEDIUM',
    explanation: 'Khi thổi mạnh qua khe hẹp (như miệng), không khí giãn nở và làm mát; khi thở trực tiếp, hơi ấm từ cơ thể truyền ra.',
    options: [
      { key: 'A', content: 'Hơi thở thay đổi nhiệt độ tùy cách thổi', correct: true },
      { key: 'B', content: 'Tay ta thay đổi nhiệt độ', correct: false },
      { key: 'C', content: 'Không khí trong phòng ảnh hưởng đến cảm giác', correct: false },
      { key: 'D', content: 'Miệng ta thay đổi nhiệt độ hơi thở', correct: false },
    ],
  },
  {
    content: 'Tại sao khi rót nước sôi vào cốc thủy tinh dày thì cốc dễ bị vỡ hơn cốc mỏng?',
    difficulty: 'MEDIUM',
    explanation: 'Cốc dày: lớp trong giãn nở vì nhiệt nhanh, lớp ngoài chưa giãn kịp → tạo ra lực làm cốc vỡ.',
    options: [
      { key: 'A', content: 'Cốc dày nặng hơn dễ vỡ hơn', correct: false },
      { key: 'B', content: 'Sự chênh lệch giãn nở giữa lớp trong và ngoài gây nứt vỡ', correct: true },
      { key: 'C', content: 'Cốc dày hấp thụ nhiều nhiệt hơn', correct: false },
      { key: 'D', content: 'Nước sôi nặng hơn nước thường', correct: false },
    ],
  },
  {
    content: 'Hiện tượng gì xảy ra khi chất lỏng được đun nóng đến nhiệt độ sôi?',
    difficulty: 'MEDIUM',
    explanation: 'Khi đun đến nhiệt độ sôi, chất lỏng chuyển sang thể khí (bay hơi) trên toàn bộ khối lỏng.',
    options: [
      { key: 'A', content: 'Chất lỏng đông đặc lại', correct: false },
      { key: 'B', content: 'Chất lỏng chuyển thành khí (sôi)', correct: true },
      { key: 'C', content: 'Chất lỏng bốc cháy', correct: false },
      { key: 'D', content: 'Chất lỏng chuyển thành chất rắn', correct: false },
    ],
  },
  {
    content: 'Năng lượng mặt trời được sử dụng trong bình năng lượng mặt trời để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Bình năng lượng mặt trời hấp thụ nhiệt từ ánh sáng mặt trời để đun nóng nước.',
    options: [
      { key: 'A', content: 'Tạo ra điện để dùng trong nhà', correct: false },
      { key: 'B', content: 'Đun nóng nước để sử dụng', correct: true },
      { key: 'C', content: 'Làm mát không khí trong nhà', correct: false },
      { key: 'D', content: 'Tạo ra ánh sáng ban đêm', correct: false },
    ],
  },
  {
    content: 'Hiện tượng đối lưu nhiệt chỉ xảy ra trong:',
    difficulty: 'HARD',
    explanation: 'Đối lưu nhiệt là sự truyền nhiệt nhờ chuyển động của chất lỏng hoặc chất khí.',
    options: [
      { key: 'A', content: 'Chất rắn', correct: false },
      { key: 'B', content: 'Chất lỏng và chất khí', correct: true },
      { key: 'C', content: 'Chân không', correct: false },
      { key: 'D', content: 'Chỉ chất lỏng', correct: false },
    ],
  },
  {
    content: 'Tại sao nồi áp suất có thể nấu thức ăn nhanh hơn nồi thường?',
    difficulty: 'HARD',
    explanation: 'Áp suất cao trong nồi áp suất làm tăng nhiệt độ sôi của nước (>100°C), giúp nấu thức ăn nhanh hơn.',
    options: [
      { key: 'A', content: 'Vì nồi áp suất dẫn nhiệt tốt hơn', correct: false },
      { key: 'B', content: 'Áp suất cao làm tăng nhiệt độ sôi, nấu thức ăn nhanh hơn', correct: true },
      { key: 'C', content: 'Vì nước trong nồi áp suất ít hơn', correct: false },
      { key: 'D', content: 'Vì bếp lửa trong nồi áp suất to hơn', correct: false },
    ],
  },
  {
    content: 'Hiện tượng bức xạ nhiệt khác với dẫn nhiệt và đối lưu ở điểm nào?',
    difficulty: 'HARD',
    explanation: 'Bức xạ nhiệt truyền nhiệt qua cả chân không, không cần vật chất; trong khi dẫn nhiệt và đối lưu cần có vật chất.',
    options: [
      { key: 'A', content: 'Bức xạ nhiệt truyền nhanh hơn', correct: false },
      { key: 'B', content: 'Bức xạ nhiệt có thể truyền qua chân không', correct: true },
      { key: 'C', content: 'Bức xạ nhiệt chỉ xảy ra trong chất rắn', correct: false },
      { key: 'D', content: 'Bức xạ nhiệt chỉ xảy ra ở nhiệt độ cao', correct: false },
    ],
  },

  // ===== ĐIỆN (20 câu) =====
  {
    content: 'Vật nào sau đây dẫn điện?',
    difficulty: 'EASY',
    explanation: 'Kim loại như đồng dẫn điện tốt, đó là lý do dây điện thường làm bằng đồng.',
    options: [
      { key: 'A', content: 'Nhựa', correct: false },
      { key: 'B', content: 'Đồng', correct: true },
      { key: 'C', content: 'Cao su', correct: false },
      { key: 'D', content: 'Gỗ khô', correct: false },
    ],
  },
  {
    content: 'Vật liệu nào được dùng để làm vỏ bọc dây điện?',
    difficulty: 'EASY',
    explanation: 'Cao su và nhựa không dẫn điện nên được dùng làm vỏ bọc cách điện cho dây điện.',
    options: [
      { key: 'A', content: 'Đồng', correct: false },
      { key: 'B', content: 'Nhôm', correct: false },
      { key: 'C', content: 'Cao su hoặc nhựa', correct: true },
      { key: 'D', content: 'Sắt', correct: false },
    ],
  },
  {
    content: 'Pin điện là thiết bị:',
    difficulty: 'EASY',
    explanation: 'Pin điện là thiết bị biến đổi năng lượng hóa học thành điện năng.',
    options: [
      { key: 'A', content: 'Biến đổi điện năng thành nhiệt năng', correct: false },
      { key: 'B', content: 'Biến đổi năng lượng hóa học thành điện năng', correct: true },
      { key: 'C', content: 'Lưu trữ ánh sáng', correct: false },
      { key: 'D', content: 'Biến đổi nhiệt năng thành điện năng', correct: false },
    ],
  },
  {
    content: 'Trong mạch điện, dòng điện chạy qua khi:',
    difficulty: 'EASY',
    explanation: 'Mạch điện kín (không bị đứt đoạn) thì dòng điện mới có thể chạy qua.',
    options: [
      { key: 'A', content: 'Mạch bị hở (đứt đoạn)', correct: false },
      { key: 'B', content: 'Mạch kín (liên tục)', correct: true },
      { key: 'C', content: 'Không cần nguồn điện', correct: false },
      { key: 'D', content: 'Dây điện bằng nhựa', correct: false },
    ],
  },
  {
    content: 'Điều nào sau đây là AN TOÀN khi sử dụng điện?',
    difficulty: 'EASY',
    explanation: 'Dùng thiết bị điện đúng công suất là thói quen an toàn khi dùng điện.',
    options: [
      { key: 'A', content: 'Cắm nhiều thiết bị vào một ổ điện', correct: false },
      { key: 'B', content: 'Sờ vào dây điện trần', correct: false },
      { key: 'C', content: 'Dùng thiết bị điện đúng công suất quy định', correct: true },
      { key: 'D', content: 'Dùng điện khi tay còn ướt', correct: false },
    ],
  },
  {
    content: 'Bóng đèn dây tóc sáng lên là do:',
    difficulty: 'MEDIUM',
    explanation: 'Dòng điện chạy qua dây tóc (điện trở cao) làm dây tóc nóng đỏ và phát sáng.',
    options: [
      { key: 'A', content: 'Dây tóc bị đốt nóng bởi dòng điện', correct: true },
      { key: 'B', content: 'Không khí bên trong bóng đèn phát sáng', correct: false },
      { key: 'C', content: 'Thủy tinh bóng đèn phát sáng', correct: false },
      { key: 'D', content: 'Pin tạo ra ánh sáng trực tiếp', correct: false },
    ],
  },
  {
    content: 'Cầu chì trong mạch điện có tác dụng gì?',
    difficulty: 'MEDIUM',
    explanation: 'Cầu chì bảo vệ mạch điện bằng cách tự ngắt khi dòng điện quá mạnh, tránh cháy nổ.',
    options: [
      { key: 'A', content: 'Tăng cường dòng điện', correct: false },
      { key: 'B', content: 'Tự ngắt mạch khi dòng điện quá mạnh, bảo vệ thiết bị', correct: true },
      { key: 'C', content: 'Tích điện để dùng sau', correct: false },
      { key: 'D', content: 'Giảm điện áp trong mạch', correct: false },
    ],
  },
  {
    content: 'Tại sao không nên để đồ vật dễ cháy gần ổ điện?',
    difficulty: 'MEDIUM',
    explanation: 'Ổ điện có thể phát sinh tia lửa hoặc nhiệt, dễ gây cháy đồ vật xung quanh.',
    options: [
      { key: 'A', content: 'Vì ổ điện hút đồ vật vào', correct: false },
      { key: 'B', content: 'Vì ổ điện có thể phát sinh tia lửa điện gây cháy', correct: true },
      { key: 'C', content: 'Vì đồ vật làm yếu dòng điện', correct: false },
      { key: 'D', content: 'Vì đồ vật có thể chặn ổ điện', correct: false },
    ],
  },
  {
    content: 'Nam châm điện được tạo ra bằng cách nào?',
    difficulty: 'MEDIUM',
    explanation: 'Cuộn dây dẫn điện quấn quanh lõi sắt, khi có dòng điện chạy qua sẽ tạo ra từ trường – nam châm điện.',
    options: [
      { key: 'A', content: 'Nung nóng thanh sắt', correct: false },
      { key: 'B', content: 'Quấn dây dẫn điện quanh lõi sắt và cho dòng điện chạy qua', correct: true },
      { key: 'C', content: 'Mài thanh sắt thành hình chữ U', correct: false },
      { key: 'D', content: 'Nhúng thanh sắt vào nước muối', correct: false },
    ],
  },
  {
    content: 'Trong mạch nối tiếp, khi một bóng đèn hỏng thì:',
    difficulty: 'MEDIUM',
    explanation: 'Mạch nối tiếp: khi một bóng hỏng thì mạch bị hở, toàn bộ bóng đèn đều tắt.',
    options: [
      { key: 'A', content: 'Chỉ bóng đó tắt, các bóng khác vẫn sáng', correct: false },
      { key: 'B', content: 'Toàn bộ bóng đèn đều tắt vì mạch bị hở', correct: true },
      { key: 'C', content: 'Các bóng còn lại sáng hơn', correct: false },
      { key: 'D', content: 'Không có gì thay đổi', correct: false },
    ],
  },
  {
    content: 'Điện trở của dây dẫn phụ thuộc vào những yếu tố nào?',
    difficulty: 'HARD',
    explanation: 'Điện trở phụ thuộc vào: vật liệu, chiều dài, tiết diện của dây dẫn.',
    options: [
      { key: 'A', content: 'Chỉ chiều dài dây', correct: false },
      { key: 'B', content: 'Vật liệu, chiều dài và tiết diện dây', correct: true },
      { key: 'C', content: 'Chỉ màu sắc của dây', correct: false },
      { key: 'D', content: 'Chỉ vật liệu và màu sắc', correct: false },
    ],
  },
  {
    content: 'Nguyên tắc hoạt động của máy phát điện là:',
    difficulty: 'HARD',
    explanation: 'Máy phát điện biến cơ năng thành điện năng nhờ hiện tượng cảm ứng điện từ.',
    options: [
      { key: 'A', content: 'Biến nhiệt năng thành điện năng trực tiếp', correct: false },
      { key: 'B', content: 'Biến cơ năng thành điện năng nhờ cảm ứng điện từ', correct: true },
      { key: 'C', content: 'Tích điện từ môi trường xung quanh', correct: false },
      { key: 'D', content: 'Biến hóa năng thành điện năng', correct: false },
    ],
  },
  {
    content: 'Tại sao dây điện bằng đồng tốt hơn dây điện bằng sắt?',
    difficulty: 'HARD',
    explanation: 'Đồng dẫn điện tốt hơn sắt (điện trở nhỏ hơn), tiêu thụ ít điện năng hơn khi truyền điện.',
    options: [
      { key: 'A', content: 'Đồng nhẹ hơn sắt', correct: false },
      { key: 'B', content: 'Đồng dẫn điện tốt hơn, ít hao phí điện năng hơn', correct: true },
      { key: 'C', content: 'Đồng rẻ hơn sắt', correct: false },
      { key: 'D', content: 'Đồng bền hơn sắt', correct: false },
    ],
  },

  // ===== NƯỚC VÀ CÁC TRẠNG THÁI VẬT CHẤT (20 câu) =====
  {
    content: 'Nước tồn tại ở mấy thể?',
    difficulty: 'EASY',
    explanation: 'Nước tồn tại ở 3 thể: lỏng (nước), rắn (băng/đá) và khí (hơi nước).',
    options: [
      { key: 'A', content: '1 thể', correct: false },
      { key: 'B', content: '2 thể', correct: false },
      { key: 'C', content: '3 thể', correct: true },
      { key: 'D', content: '4 thể', correct: false },
    ],
  },
  {
    content: 'Không khí có trong nước không?',
    difficulty: 'EASY',
    explanation: 'Không khí hòa tan trong nước. Bằng chứng: cá và sinh vật dưới nước thở được nhờ oxy hòa tan trong nước.',
    options: [
      { key: 'A', content: 'Không, nước không chứa không khí', correct: false },
      { key: 'B', content: 'Có, không khí hòa tan trong nước', correct: true },
      { key: 'C', content: 'Chỉ có trong nước bẩn', correct: false },
      { key: 'D', content: 'Chỉ có trong nước biển', correct: false },
    ],
  },
  {
    content: 'Khi đun nóng, nước chuyển từ thể lỏng sang thể gì?',
    difficulty: 'EASY',
    explanation: 'Khi đun nóng đến 100°C, nước sôi và chuyển thành hơi nước (thể khí).',
    options: [
      { key: 'A', content: 'Thể rắn', correct: false },
      { key: 'B', content: 'Thể khí (hơi nước)', correct: true },
      { key: 'C', content: 'Thể plasma', correct: false },
      { key: 'D', content: 'Không thay đổi thể', correct: false },
    ],
  },
  {
    content: 'Hơi nước trong không khí ngưng tụ thành nước khi:',
    difficulty: 'EASY',
    explanation: 'Hơi nước ngưng tụ khi gặp lạnh, chuyển từ thể khí sang thể lỏng.',
    options: [
      { key: 'A', content: 'Gặp nhiệt độ cao', correct: false },
      { key: 'B', content: 'Gặp nhiệt độ thấp', correct: true },
      { key: 'C', content: 'Gặp ánh sáng mạnh', correct: false },
      { key: 'D', content: 'Gặp gió mạnh', correct: false },
    ],
  },
  {
    content: 'Mây được tạo thành từ:',
    difficulty: 'EASY',
    explanation: 'Mây được tạo thành từ các hạt nước nhỏ hoặc tinh thể băng lơ lửng trong không khí.',
    options: [
      { key: 'A', content: 'Khói từ núi lửa', correct: false },
      { key: 'B', content: 'Các hạt nước nhỏ hoặc tinh thể băng', correct: true },
      { key: 'C', content: 'Bụi từ mặt đất', correct: false },
      { key: 'D', content: 'Khí oxy và nitơ', correct: false },
    ],
  },
  {
    content: 'Hiện tượng nào sau đây là sự bay hơi?',
    difficulty: 'MEDIUM',
    explanation: 'Quần áo ướt khô dần là do nước bay hơi (chuyển từ lỏng sang khí) ở nhiệt độ thường.',
    options: [
      { key: 'A', content: 'Nước đóng thành đá trong tủ lạnh', correct: false },
      { key: 'B', content: 'Quần áo ướt dần dần khô', correct: true },
      { key: 'C', content: 'Sương trên lá cây vào buổi sáng', correct: false },
      { key: 'D', content: 'Mưa rơi từ trên trời xuống', correct: false },
    ],
  },
  {
    content: 'Tại sao đá bỏ ra khỏi tủ lạnh một lúc sẽ chảy thành nước?',
    difficulty: 'MEDIUM',
    explanation: 'Đá nhận nhiệt từ môi trường (nhiệt độ phòng > 0°C), nóng chảy và chuyển thành nước.',
    options: [
      { key: 'A', content: 'Vì không khí ngoài lạnh hơn trong tủ', correct: false },
      { key: 'B', content: 'Vì đá nhận nhiệt từ môi trường, nóng chảy thành nước', correct: true },
      { key: 'C', content: 'Vì đá tiếp xúc với ánh sáng', correct: false },
      { key: 'D', content: 'Vì đá bị nén bởi không khí', correct: false },
    ],
  },
  {
    content: 'Vì sao buổi sáng sớm thường có sương mù?',
    difficulty: 'MEDIUM',
    explanation: 'Buổi sáng nhiệt độ thấp, hơi nước trong không khí ngưng tụ thành các hạt nhỏ tạo ra sương mù.',
    options: [
      { key: 'A', content: 'Vì mặt đất tỏa ra nhiều khí', correct: false },
      { key: 'B', content: 'Vì nhiệt độ thấp khiến hơi nước ngưng tụ thành sương', correct: true },
      { key: 'C', content: 'Vì gió thổi hơi nước từ biển vào', correct: false },
      { key: 'D', content: 'Vì mặt trời chưa mọc nên không khí ẩm', correct: false },
    ],
  },
  {
    content: 'Nước mưa được tạo thành như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Nước bay hơi → hình thành mây → hạt nước trong mây lớn dần → rơi xuống thành mưa.',
    options: [
      { key: 'A', content: 'Nước biển bốc thẳng lên thành mưa', correct: false },
      { key: 'B', content: 'Hơi nước bay lên, ngưng tụ thành mây, rơi xuống thành mưa', correct: true },
      { key: 'C', content: 'Mây chứa nước từ sông hồ', correct: false },
      { key: 'D', content: 'Không khí ẩm tạo ra nước mưa', correct: false },
    ],
  },
  {
    content: 'Tại sao nước đá nổi trên mặt nước?',
    difficulty: 'HARD',
    explanation: 'Nước đá có khối lượng riêng nhỏ hơn nước lỏng (do cấu trúc tinh thể đặc biệt), nên nổi trên nước.',
    options: [
      { key: 'A', content: 'Vì đá nhẹ hơn nước', correct: false },
      { key: 'B', content: 'Vì khối lượng riêng của đá nhỏ hơn nước lỏng', correct: true },
      { key: 'C', content: 'Vì đá có nhiều không khí bên trong', correct: false },
      { key: 'D', content: 'Vì nước đẩy đá lên', correct: false },
    ],
  },
  {
    content: 'Vòng tuần hoàn của nước trong tự nhiên bao gồm các quá trình nào?',
    difficulty: 'HARD',
    explanation: 'Vòng tuần hoàn nước: Bay hơi (từ biển/sông hồ) → Ngưng tụ (thành mây) → Mưa (nước rơi xuống) → chảy về biển/sông hồ.',
    options: [
      { key: 'A', content: 'Chỉ bay hơi và mưa', correct: false },
      { key: 'B', content: 'Bay hơi, ngưng tụ, mưa và chảy về sông hồ biển', correct: true },
      { key: 'C', content: 'Chỉ mưa và chảy về biển', correct: false },
      { key: 'D', content: 'Chỉ ngưng tụ và đóng băng', correct: false },
    ],
  },

  // ===== VẬT CHẤT VÀ NĂNG LƯỢNG BỔ SUNG (10 câu) =====
  {
    content: 'Hỗn hợp gồm muối và nước có thể tách ra bằng cách nào?',
    difficulty: 'EASY',
    explanation: 'Đun nóng hỗn hợp muối-nước, nước bay hơi, muối còn lại. Đây là phương pháp cô cạn.',
    options: [
      { key: 'A', content: 'Lọc qua giấy lọc', correct: false },
      { key: 'B', content: 'Cô cạn (đun cho nước bay hơi)', correct: true },
      { key: 'C', content: 'Dùng nam châm', correct: false },
      { key: 'D', content: 'Lắng gạn', correct: false },
    ],
  },
  {
    content: 'Hỗn hợp nào sau đây có thể dùng nam châm để tách?',
    difficulty: 'EASY',
    explanation: 'Nam châm hút được sắt. Hỗn hợp cát và mạt sắt có thể dùng nam châm để tách mạt sắt ra.',
    options: [
      { key: 'A', content: 'Muối và đường', correct: false },
      { key: 'B', content: 'Cát và mạt sắt', correct: true },
      { key: 'C', content: 'Nước và dầu', correct: false },
      { key: 'D', content: 'Cát và đá nhỏ', correct: false },
    ],
  },
  {
    content: 'Khi đốt cháy củi, năng lượng nào được giải phóng?',
    difficulty: 'EASY',
    explanation: 'Đốt cháy củi giải phóng năng lượng nhiệt và ánh sáng từ năng lượng hóa học tích trữ trong củi.',
    options: [
      { key: 'A', content: 'Năng lượng điện', correct: false },
      { key: 'B', content: 'Năng lượng nhiệt và ánh sáng', correct: true },
      { key: 'C', content: 'Năng lượng âm thanh', correct: false },
      { key: 'D', content: 'Năng lượng từ', correct: false },
    ],
  },
  {
    content: 'Chất nào sau đây tan trong nước?',
    difficulty: 'EASY',
    explanation: 'Đường tan hoàn toàn trong nước tạo thành dung dịch đồng nhất.',
    options: [
      { key: 'A', content: 'Cát', correct: false },
      { key: 'B', content: 'Dầu ăn', correct: false },
      { key: 'C', content: 'Đường', correct: true },
      { key: 'D', content: 'Gỗ', correct: false },
    ],
  },
  {
    content: 'Tính chất nào sau đây là tính chất của chất rắn?',
    difficulty: 'EASY',
    explanation: 'Chất rắn có hình dạng và thể tích cố định, không chảy lan.',
    options: [
      { key: 'A', content: 'Không có hình dạng nhất định', correct: false },
      { key: 'B', content: 'Có hình dạng và thể tích cố định', correct: true },
      { key: 'C', content: 'Có thể nén được dễ dàng', correct: false },
      { key: 'D', content: 'Lan tràn khắp nơi', correct: false },
    ],
  },
  {
    content: 'Hiện tượng nào sau đây là sự thay đổi hóa học (không thể phục hồi)?',
    difficulty: 'MEDIUM',
    explanation: 'Đốt cháy giấy là phản ứng hóa học, tạo ra CO2 và tro, không thể phục hồi lại giấy.',
    options: [
      { key: 'A', content: 'Nước đá tan chảy', correct: false },
      { key: 'B', content: 'Đường hòa tan trong nước', correct: false },
      { key: 'C', content: 'Đốt cháy tờ giấy', correct: true },
      { key: 'D', content: 'Gập đôi tờ giấy', correct: false },
    ],
  },
  {
    content: 'Tại sao nước và dầu không hòa tan vào nhau?',
    difficulty: 'MEDIUM',
    explanation: 'Nước và dầu không hòa tan vì tính phân cực khác nhau: nước phân cực, dầu không phân cực.',
    options: [
      { key: 'A', content: 'Vì dầu nặng hơn nước', correct: false },
      { key: 'B', content: 'Vì tính chất hóa học của hai chất không tương thích', correct: true },
      { key: 'C', content: 'Vì dầu là chất rắn', correct: false },
      { key: 'D', content: 'Vì nước quá lạnh', correct: false },
    ],
  },
  {
    content: 'Năng lượng mặt trời có thể được chuyển đổi thành những dạng năng lượng nào trong cuộc sống?',
    difficulty: 'MEDIUM',
    explanation: 'Pin mặt trời chuyển thành điện năng; bình nước mặt trời chuyển thành nhiệt năng.',
    options: [
      { key: 'A', content: 'Chỉ thành nhiệt năng', correct: false },
      { key: 'B', content: 'Điện năng (pin mặt trời) và nhiệt năng (bình nước)', correct: true },
      { key: 'C', content: 'Chỉ thành điện năng', correct: false },
      { key: 'D', content: 'Thành âm thanh và ánh sáng', correct: false },
    ],
  },
  {
    content: 'Làm thế nào để nhận biết một chất khí (vô hình)?',
    difficulty: 'HARD',
    explanation: 'Chất khí vô hình nhưng có thể nhận biết qua mùi, tác động lên vật khác (thổi bay), hoặc dùng chất chỉ thị hóa học.',
    options: [
      { key: 'A', content: 'Quan sát trực tiếp bằng mắt', correct: false },
      { key: 'B', content: 'Qua mùi, tác động lên vật khác hoặc chất chỉ thị', correct: true },
      { key: 'C', content: 'Không thể nhận biết chất khí', correct: false },
      { key: 'D', content: 'Chỉ qua màu sắc', correct: false },
    ],
  },
  {
    content: 'Sự khác biệt giữa thay đổi vật lý và thay đổi hóa học là gì?',
    difficulty: 'HARD',
    explanation: 'Thay đổi vật lý không tạo ra chất mới và có thể phục hồi; thay đổi hóa học tạo ra chất mới và khó phục hồi.',
    options: [
      { key: 'A', content: 'Thay đổi vật lý chỉ xảy ra với chất lỏng', correct: false },
      { key: 'B', content: 'Thay đổi vật lý không tạo chất mới; thay đổi hóa học tạo ra chất mới', correct: true },
      { key: 'C', content: 'Không có sự khác biệt', correct: false },
      { key: 'D', content: 'Thay đổi hóa học luôn tạo ra ánh sáng', correct: false },
    ],
  },

  // ===== KHÔNG KHÍ VÀ LỰC (15 câu) =====
  {
    content: 'Không khí gồm những thành phần chính nào?',
    difficulty: 'EASY',
    explanation: 'Không khí gồm khoảng 78% nitơ, 21% oxy và 1% các khí khác (CO2, hơi nước...).',
    options: [
      { key: 'A', content: 'Chỉ oxy', correct: false },
      { key: 'B', content: 'Nitơ và oxy là chính', correct: true },
      { key: 'C', content: 'CO2 và oxy', correct: false },
      { key: 'D', content: 'Chỉ nitơ', correct: false },
    ],
  },
  {
    content: 'Lực nào làm cho đồ vật rơi xuống đất?',
    difficulty: 'EASY',
    explanation: 'Trọng lực (lực hút của Trái Đất) làm cho mọi vật rơi xuống mặt đất.',
    options: [
      { key: 'A', content: 'Lực ma sát', correct: false },
      { key: 'B', content: 'Trọng lực (lực hút của Trái Đất)', correct: true },
      { key: 'C', content: 'Lực đàn hồi', correct: false },
      { key: 'D', content: 'Lực từ', correct: false },
    ],
  },
  {
    content: 'Lực ma sát xuất hiện khi nào?',
    difficulty: 'EASY',
    explanation: 'Lực ma sát xuất hiện khi hai bề mặt tiếp xúc và có sự chuyển động tương đối giữa chúng.',
    options: [
      { key: 'A', content: 'Khi vật đứng yên trong không gian', correct: false },
      { key: 'B', content: 'Khi hai bề mặt tiếp xúc và có chuyển động tương đối', correct: true },
      { key: 'C', content: 'Khi vật nổi trên nước', correct: false },
      { key: 'D', content: 'Khi vật ở trong chân không', correct: false },
    ],
  },
  {
    content: 'Không khí có trọng lượng không?',
    difficulty: 'MEDIUM',
    explanation: 'Không khí có khối lượng và có trọng lượng. Sức nặng của cột không khí tạo ra áp suất khí quyển.',
    options: [
      { key: 'A', content: 'Không, không khí không có trọng lượng', correct: false },
      { key: 'B', content: 'Có, không khí có khối lượng và trọng lượng', correct: true },
      { key: 'C', content: 'Chỉ có không khí ẩm mới có trọng lượng', correct: false },
      { key: 'D', content: 'Chỉ có trọng lượng ở độ cao thấp', correct: false },
    ],
  },
  {
    content: 'Tại sao lốp xe đạp bơm căng lại lăn dễ hơn lốp xẹp?',
    difficulty: 'MEDIUM',
    explanation: 'Lốp căng có diện tích tiếp xúc với mặt đường nhỏ hơn, lực ma sát ít hơn, xe lăn dễ hơn.',
    options: [
      { key: 'A', content: 'Vì lốp căng nhẹ hơn', correct: false },
      { key: 'B', content: 'Vì lốp căng có ít diện tích tiếp xúc, lực ma sát nhỏ hơn', correct: true },
      { key: 'C', content: 'Vì lốp căng cứng hơn', correct: false },
      { key: 'D', content: 'Vì lốp căng trơn hơn', correct: false },
    ],
  },
  {
    content: 'Áp suất khí quyển ở mực nước biển xấp xỉ bằng:',
    difficulty: 'MEDIUM',
    explanation: 'Áp suất khí quyển chuẩn ở mực nước biển là 1 atm (101325 Pa), tương đương áp suất của cột nước 10,3 m.',
    options: [
      { key: 'A', content: 'Áp suất của cột nước cao 1 m', correct: false },
      { key: 'B', content: 'Áp suất của cột nước cao 10,3 m', correct: true },
      { key: 'C', content: 'Áp suất của cột nước cao 100 m', correct: false },
      { key: 'D', content: 'Áp suất của cột nước cao 0,1 m', correct: false },
    ],
  },
  {
    content: 'Vật nào chìm xuống nước?',
    difficulty: 'MEDIUM',
    explanation: 'Vật chìm khi khối lượng riêng của nó lớn hơn khối lượng riêng của nước (1 g/cm³).',
    options: [
      { key: 'A', content: 'Miếng gỗ', correct: false },
      { key: 'B', content: 'Miếng thép đặc', correct: true },
      { key: 'C', content: 'Nút bần', correct: false },
      { key: 'D', content: 'Bóng nhựa rỗng', correct: false },
    ],
  },
  {
    content: 'Tại sao máy bay có thể bay lên được?',
    difficulty: 'HARD',
    explanation: 'Cánh máy bay có hình dạng đặc biệt tạo ra lực nâng (áp suất bên trên nhỏ hơn bên dưới) đủ để nâng máy bay.',
    options: [
      { key: 'A', content: 'Vì động cơ đẩy máy bay lên thẳng', correct: false },
      { key: 'B', content: 'Vì cánh tạo ra lực nâng khí động học', correct: true },
      { key: 'C', content: 'Vì máy bay nhẹ hơn không khí', correct: false },
      { key: 'D', content: 'Vì máy bay dùng lực từ trường', correct: false },
    ],
  },
  {
    content: 'Vì sao khi càng lên cao, áp suất khí quyển càng giảm?',
    difficulty: 'HARD',
    explanation: 'Áp suất khí quyển do trọng lượng cột không khí phía trên tạo ra. Lên cao thì cột không khí ngắn hơn, ít khối lượng hơn → áp suất giảm.',
    options: [
      { key: 'A', content: 'Vì không khí loãng hơn ở độ cao thấp', correct: false },
      { key: 'B', content: 'Vì cột không khí bên trên ngắn hơn, trọng lượng nhỏ hơn', correct: true },
      { key: 'C', content: 'Vì gió thổi mạnh hơn ở trên cao', correct: false },
      { key: 'D', content: 'Vì nhiệt độ thấp hơn ở trên cao', correct: false },
    ],
  },

  // ===== BỔ SUNG ĐỦ 100 CÂU (15 câu) =====
  {
    content: 'Nam châm hút được các vật làm bằng:',
    difficulty: 'EASY',
    explanation: 'Nam châm hút được sắt, thép, niken và coban – các kim loại từ tính.',
    options: [
      { key: 'A', content: 'Nhôm', correct: false },
      { key: 'B', content: 'Đồng', correct: false },
      { key: 'C', content: 'Sắt', correct: true },
      { key: 'D', content: 'Vàng', correct: false },
    ],
  },
  {
    content: 'Xe đạp chuyển động được nhờ lực nào?',
    difficulty: 'EASY',
    explanation: 'Người đạp xe tạo ra lực tác dụng qua bàn đạp, xích, bánh xe → xe chuyển động. Lực ma sát giữa bánh xe và mặt đường giúp xe đẩy về phía trước.',
    options: [
      { key: 'A', content: 'Lực từ trường', correct: false },
      { key: 'B', content: 'Lực cơ học từ người đạp và lực ma sát', correct: true },
      { key: 'C', content: 'Lực điện', correct: false },
      { key: 'D', content: 'Lực hút của Mặt Trăng', correct: false },
    ],
  },
  {
    content: 'Khi nào lực ma sát có lợi?',
    difficulty: 'EASY',
    explanation: 'Ma sát giúp bánh xe không trượt trơn trên mặt đường, giúp xe phanh lại an toàn.',
    options: [
      { key: 'A', content: 'Khi kéo vật trên sàn nhà', correct: false },
      { key: 'B', content: 'Khi phanh xe đạp', correct: true },
      { key: 'C', content: 'Khi kéo trượt hộp nặng', correct: false },
      { key: 'D', content: 'Khi máy hoạt động bị nóng', correct: false },
    ],
  },
  {
    content: 'Lực đàn hồi xuất hiện khi nào?',
    difficulty: 'MEDIUM',
    explanation: 'Lực đàn hồi xuất hiện khi vật bị biến dạng (nén, kéo căng) và có xu hướng trở về hình dạng ban đầu.',
    options: [
      { key: 'A', content: 'Khi vật chuyển động nhanh', correct: false },
      { key: 'B', content: 'Khi vật bị biến dạng và cố phục hồi lại', correct: true },
      { key: 'C', content: 'Khi hai vật hút nhau', correct: false },
      { key: 'D', content: 'Khi vật đứng yên trên mặt phẳng', correct: false },
    ],
  },
  {
    content: 'Tại sao lốp xe có khía rãnh?',
    difficulty: 'MEDIUM',
    explanation: 'Khía rãnh tăng lực ma sát giữa lốp và mặt đường, giúp xe bám đường tốt hơn, đặc biệt khi đường ướt.',
    options: [
      { key: 'A', content: 'Để lốp trông đẹp hơn', correct: false },
      { key: 'B', content: 'Để tăng ma sát, xe bám đường tốt hơn', correct: true },
      { key: 'C', content: 'Để giảm trọng lượng của lốp', correct: false },
      { key: 'D', content: 'Để thoát nhiệt khi xe chạy', correct: false },
    ],
  },
  {
    content: 'Ròng rọc cố định có tác dụng gì?',
    difficulty: 'MEDIUM',
    explanation: 'Ròng rọc cố định thay đổi hướng của lực kéo, giúp ta kéo theo hướng thuận tiện hơn (thường kéo xuống thay vì kéo lên).',
    options: [
      { key: 'A', content: 'Giảm lực cần dùng để kéo vật', correct: false },
      { key: 'B', content: 'Thay đổi hướng của lực kéo', correct: true },
      { key: 'C', content: 'Tăng tốc độ kéo vật', correct: false },
      { key: 'D', content: 'Tăng lực cần dùng', correct: false },
    ],
  },
  {
    content: 'Đòn bẩy giúp ích gì khi sử dụng?',
    difficulty: 'MEDIUM',
    explanation: 'Đòn bẩy có thể giúp nâng vật nặng bằng lực nhỏ hơn khi điểm tựa đặt đúng chỗ.',
    options: [
      { key: 'A', content: 'Luôn tăng tốc độ thực hiện công việc', correct: false },
      { key: 'B', content: 'Có thể dùng lực nhỏ hơn để nâng vật nặng', correct: true },
      { key: 'C', content: 'Giúp vật tự di chuyển', correct: false },
      { key: 'D', content: 'Làm cho vật nhẹ hơn thực tế', correct: false },
    ],
  },
  {
    content: 'Vật nào sau đây sử dụng nguyên lý ròng rọc?',
    difficulty: 'MEDIUM',
    explanation: 'Cần cẩu dùng ròng rọc để nâng vật nặng với lực nhỏ hơn và thay đổi hướng lực.',
    options: [
      { key: 'A', content: 'Xe đạp', correct: false },
      { key: 'B', content: 'Cần cẩu', correct: true },
      { key: 'C', content: 'Búa', correct: false },
      { key: 'D', content: 'Kéo', correct: false },
    ],
  },
  {
    content: 'Tại sao mặt đường nhựa thường bị lõm dưới bánh xe nặng vào mùa hè?',
    difficulty: 'HARD',
    explanation: 'Mùa hè nóng, nhựa đường mềm hơn. Áp suất từ bánh xe nặng làm nhựa bị biến dạng, lõm xuống.',
    options: [
      { key: 'A', content: 'Vì nhựa đường bị mưa làm mềm', correct: false },
      { key: 'B', content: 'Vì nhiệt độ cao làm nhựa mềm, áp suất bánh xe gây biến dạng', correct: true },
      { key: 'C', content: 'Vì trọng lực mùa hè lớn hơn', correct: false },
      { key: 'D', content: 'Vì bánh xe mùa hè nặng hơn', correct: false },
    ],
  },
  {
    content: 'Nguyên lý hoạt động của máy bơm tay là gì?',
    difficulty: 'HARD',
    explanation: 'Kéo piston lên tạo ra áp suất thấp, áp suất khí quyển đẩy nước vào; ấn piston xuống đẩy nước ra ngoài.',
    options: [
      { key: 'A', content: 'Dùng lực hút của nam châm để kéo nước', correct: false },
      { key: 'B', content: 'Tạo ra áp suất thấp bên trong để khí quyển đẩy nước vào', correct: true },
      { key: 'C', content: 'Đun nóng nước để tạo áp lực', correct: false },
      { key: 'D', content: 'Dùng điện để bơm nước', correct: false },
    ],
  },
  {
    content: 'Nước ở biển có vị mặn là do:',
    difficulty: 'EASY',
    explanation: 'Nước biển mặn do chứa nhiều muối khoáng, đặc biệt là muối ăn (NaCl), được đưa vào từ các con sông qua hàng triệu năm.',
    options: [
      { key: 'A', content: 'Do cá tạo ra chất mặn', correct: false },
      { key: 'B', content: 'Do chứa nhiều muối khoáng hòa tan', correct: true },
      { key: 'C', content: 'Do nước biển bị đun nóng', correct: false },
      { key: 'D', content: 'Do ánh sáng mặt trời chiếu vào', correct: false },
    ],
  },
  {
    content: 'Tại sao cốc nước lạnh thường có các giọt nước bên ngoài cốc?',
    difficulty: 'MEDIUM',
    explanation: 'Bề mặt cốc lạnh làm hơi nước trong không khí xung quanh ngưng tụ thành nước.',
    options: [
      { key: 'A', content: 'Nước trong cốc thấm qua thành cốc', correct: false },
      { key: 'B', content: 'Hơi nước trong không khí ngưng tụ trên bề mặt lạnh của cốc', correct: true },
      { key: 'C', content: 'Cốc bị rò nước', correct: false },
      { key: 'D', content: 'Không khí ẩm biến thành nước khi gặp lạnh', correct: false },
    ],
  },
  {
    content: 'Dung dịch là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Dung dịch là hỗn hợp đồng nhất của hai hay nhiều chất, ví dụ: nước muối, nước đường.',
    options: [
      { key: 'A', content: 'Hỗn hợp hai chất rắn', correct: false },
      { key: 'B', content: 'Hỗn hợp đồng nhất của chất tan trong dung môi', correct: true },
      { key: 'C', content: 'Chất lỏng tinh khiết', correct: false },
      { key: 'D', content: 'Hỗn hợp không tan vào nhau', correct: false },
    ],
  },
  {
    content: 'Oxy cần thiết cho quá trình nào sau đây?',
    difficulty: 'EASY',
    explanation: 'Oxy cần thiết cho sự cháy và hô hấp (trao đổi chất trong cơ thể sinh vật).',
    options: [
      { key: 'A', content: 'Quang hợp của cây xanh', correct: false },
      { key: 'B', content: 'Sự cháy và hô hấp', correct: true },
      { key: 'C', content: 'Sự đông đặc của nước', correct: false },
      { key: 'D', content: 'Sự phản chiếu ánh sáng', correct: false },
    ],
  },
  {
    content: 'Tại sao người ta dùng mặt phẳng nghiêng để đẩy xe lên cao dễ hơn?',
    difficulty: 'HARD',
    explanation: 'Mặt phẳng nghiêng là loại máy cơ đơn giản: tuy quãng đường dài hơn nhưng lực cần dùng nhỏ hơn so với nâng thẳng lên.',
    options: [
      { key: 'A', content: 'Vì mặt phẳng nghiêng làm giảm trọng lực tác dụng lên vật', correct: false },
      { key: 'B', content: 'Vì đường dài hơn nên lực cần thiết nhỏ hơn', correct: true },
      { key: 'C', content: 'Vì mặt phẳng nghiêng không có ma sát', correct: false },
      { key: 'D', content: 'Vì vật nhẹ hơn khi ở trên mặt phẳng nghiêng', correct: false },
    ],
  },
];

async function main() {
  console.log(`Bắt đầu chèn ${questions.length} câu hỏi Vật Lý Lớp 5...`);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await p.question.create({
      data: {
        subjectId: SUBJECT_ID,
        gradeId: GRADE_ID,
        content: q.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: q.difficulty,
        explanation: q.explanation,
        createdById: CREATED_BY,
        status: 'ACTIVE',
        options: {
          create: q.options.map((opt, idx) => ({
            optionKey: opt.key,
            content: opt.content,
            isCorrect: opt.correct,
            sortOrder: idx,
          })),
        },
      },
    });
    if ((i + 1) % 10 === 0) console.log(`  Đã chèn ${i + 1}/${questions.length} câu...`);
  }

  console.log(`\nHoàn thành! Đã thêm ${questions.length} câu hỏi Vật Lý Lớp 5 vào ngân hàng.`);
  await p.$disconnect();
}

main().catch((e) => { console.error(e); p.$disconnect(); process.exit(1); });
