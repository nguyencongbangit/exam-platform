/**
 * Thêm 30 câu cho mỗi môn lớp 5 (batch 1: Toán, Tiếng Việt, Khoa học, Lịch sử & Địa lý, Đạo đức, Tin học)
 */
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const GRADE = 'grade-5';
const ADMIN = 'user-admin';

function q(content, opts, diff = 'EASY') {
  return { content, opts, diff };
}

const DATA = {
  'sub-toan': [
    q('Số lớn nhất có 5 chữ số là:', [{k:'A',t:'99 999',c:true},{k:'B',t:'100 000',c:false},{k:'C',t:'99 000',c:false},{k:'D',t:'90 000',c:false}]),
    q('3/4 + 1/4 = ?', [{k:'A',t:'4/8',c:false},{k:'B',t:'1',c:true},{k:'C',t:'4/4',c:false},{k:'D',t:'2/4',c:false}]),
    q('Diện tích hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm là:', [{k:'A',t:'26 cm²',c:false},{k:'B',t:'40 cm²',c:true},{k:'C',t:'13 cm²',c:false},{k:'D',t:'80 cm²',c:false}]),
    q('0,5 = ?', [{k:'A',t:'5/100',c:false},{k:'B',t:'5/10',c:true},{k:'C',t:'50/100',c:false},{k:'D',t:'1/5',c:false}]),
    q('1 tấn = ? kg', [{k:'A',t:'100 kg',c:false},{k:'B',t:'10 000 kg',c:false},{k:'C',t:'1 000 kg',c:true},{k:'D',t:'500 kg',c:false}]),
    q('Chu vi hình vuông có cạnh 7 cm là:', [{k:'A',t:'14 cm',c:false},{k:'B',t:'49 cm',c:false},{k:'C',t:'28 cm',c:true},{k:'D',t:'21 cm',c:false}]),
    q('5/8 của 40 là:', [{k:'A',t:'20',c:false},{k:'B',t:'25',c:true},{k:'C',t:'32',c:false},{k:'D',t:'8',c:false}]),
    q('12 345 × 0 = ?', [{k:'A',t:'12 345',c:false},{k:'B',t:'1',c:false},{k:'C',t:'0',c:true},{k:'D',t:'12 346',c:false}]),
    q('Tìm x: x × 6 = 54', [{k:'A',t:'8',c:false},{k:'B',t:'9',c:true},{k:'C',t:'7',c:false},{k:'D',t:'10',c:false}]),
    q('1 giờ 30 phút = ? phút', [{k:'A',t:'130 phút',c:false},{k:'B',t:'80 phút',c:false},{k:'C',t:'90 phút',c:true},{k:'D',t:'100 phút',c:false}]),
    q('Số thập phân 3,07 đọc là:', [{k:'A',t:'Ba phẩy không bảy',c:true},{k:'B',t:'Ba phẩy bảy',c:false},{k:'C',t:'Ba mươi bảy',c:false},{k:'D',t:'Ba phẩy zero bảy',c:false}]),
    q('2/5 + 1/3 = ?', [{k:'A',t:'3/8',c:false},{k:'B',t:'11/15',c:true},{k:'C',t:'3/15',c:false},{k:'D',t:'6/15',c:false}], 'MEDIUM'),
    q('Diện tích hình tam giác có đáy 10 cm, chiều cao 6 cm là:', [{k:'A',t:'60 cm²',c:false},{k:'B',t:'30 cm²',c:true},{k:'C',t:'16 cm²',c:false},{k:'D',t:'32 cm²',c:false}]),
    q('75% = ?', [{k:'A',t:'7,5',c:false},{k:'B',t:'0,75',c:true},{k:'C',t:'7/5',c:false},{k:'D',t:'3/5',c:false}]),
    q('Số nào chia hết cho cả 2 và 5?', [{k:'A',t:'12',c:false},{k:'B',t:'25',c:false},{k:'C',t:'30',c:true},{k:'D',t:'14',c:false}]),
    q('4,5 km = ? m', [{k:'A',t:'450 m',c:false},{k:'B',t:'4 500 m',c:true},{k:'C',t:'45 m',c:false},{k:'D',t:'45 000 m',c:false}]),
    q('Tổng của 3/7 và 4/7 là:', [{k:'A',t:'7/14',c:false},{k:'B',t:'12/49',c:false},{k:'C',t:'1',c:true},{k:'D',t:'7/7',c:false}]),
    q('Một cửa hàng bán 240 kg gạo trong 4 ngày. Trung bình mỗi ngày bán bao nhiêu kg?', [{k:'A',t:'60 kg',c:true},{k:'B',t:'80 kg',c:false},{k:'C',t:'48 kg',c:false},{k:'D',t:'96 kg',c:false}]),
    q('1,25 × 4 = ?', [{k:'A',t:'4,25',c:false},{k:'B',t:'5',c:true},{k:'C',t:'5,25',c:false},{k:'D',t:'4,5',c:false}]),
    q('Số nào là số nguyên tố?', [{k:'A',t:'9',c:false},{k:'B',t:'15',c:false},{k:'C',t:'11',c:true},{k:'D',t:'21',c:false}]),
    q('Phân số tối giản của 12/18 là:', [{k:'A',t:'6/9',c:false},{k:'B',t:'4/6',c:false},{k:'C',t:'2/3',c:true},{k:'D',t:'3/4',c:false}]),
    q('Thể tích hình hộp chữ nhật dài 4 cm, rộng 3 cm, cao 5 cm là:', [{k:'A',t:'47 cm³',c:false},{k:'B',t:'60 cm³',c:true},{k:'C',t:'36 cm³',c:false},{k:'D',t:'94 cm³',c:false}]),
    q('5,6 ÷ 0,7 = ?', [{k:'A',t:'0,8',c:false},{k:'B',t:'8',c:true},{k:'C',t:'0,08',c:false},{k:'D',t:'80',c:false}], 'MEDIUM'),
    q('Tìm x: 2/3 × x = 8', [{k:'A',t:'x = 10',c:false},{k:'B',t:'x = 12',c:true},{k:'C',t:'x = 16/3',c:false},{k:'D',t:'x = 6',c:false}], 'MEDIUM'),
    q('Góc vuông có số đo bằng:', [{k:'A',t:'180°',c:false},{k:'B',t:'90°',c:true},{k:'C',t:'60°',c:false},{k:'D',t:'45°',c:false}]),
    q('3/4 > 2/3. Khẳng định này:', [{k:'A',t:'Đúng',c:true},{k:'B',t:'Sai',c:false},{k:'C',t:'Không xác định',c:false},{k:'D',t:'Bằng nhau',c:false}], 'MEDIUM'),
    q('1 lít = ? ml', [{k:'A',t:'100 ml',c:false},{k:'B',t:'10 ml',c:false},{k:'C',t:'1 000 ml',c:true},{k:'D',t:'500 ml',c:false}]),
    q('Số thập phân nào lớn hơn? 0,9 hay 0,89?', [{k:'A',t:'0,89',c:false},{k:'B',t:'Bằng nhau',c:false},{k:'C',t:'0,9',c:true},{k:'D',t:'Không so sánh được',c:false}]),
    q('Lớp 5A có 35 học sinh, 60% là nữ. Số học sinh nữ là:', [{k:'A',t:'20',c:false},{k:'B',t:'21',c:true},{k:'C',t:'14',c:false},{k:'D',t:'25',c:false}], 'MEDIUM'),
    q('Đường kính hình tròn gấp đôi:', [{k:'A',t:'Chu vi',c:false},{k:'B',t:'Bán kính',c:true},{k:'C',t:'Diện tích',c:false},{k:'D',t:'Chu vi / 2',c:false}]),
  ],

  'sub-tieng-viet': [
    q('Từ nào dưới đây là danh từ?', [{k:'A',t:'chạy',c:false},{k:'B',t:'đẹp',c:false},{k:'C',t:'học sinh',c:true},{k:'D',t:'nhanh',c:false}]),
    q('Câu "Bầu trời xanh biếc." thuộc kiểu câu gì?', [{k:'A',t:'Câu hỏi',c:false},{k:'B',t:'Câu kể',c:true},{k:'C',t:'Câu cảm',c:false},{k:'D',t:'Câu cầu khiến',c:false}]),
    q('Từ "mặt trời" có nghĩa gốc là:', [{k:'A',t:'Khuôn mặt người',c:false},{k:'B',t:'Thiên thể phát sáng',c:true},{k:'C',t:'Ánh đèn',c:false},{k:'D',t:'Mặt nước',c:false}]),
    q('Điền vào chỗ trống: "Những cánh _____ đang bay lượn trên bầu trời." (chim / con chim)', [{k:'A',t:'con chim',c:false},{k:'B',t:'chim',c:true},{k:'C',t:'các chim',c:false},{k:'D',t:'một chim',c:false}]),
    q('Từ nào là tính từ?', [{k:'A',t:'học',c:false},{k:'B',t:'sách',c:false},{k:'C',t:'xinh đẹp',c:true},{k:'D',t:'chạy',c:false}]),
    q('Dấu chấm lửng (...) trong câu thường dùng để:', [{k:'A',t:'Kết thúc câu',c:false},{k:'B',t:'Ngắt vế câu',c:false},{k:'C',t:'Biểu thị lời nói bỏ dở hoặc ngụ ý',c:true},{k:'D',t:'Liệt kê',c:false}]),
    q('Trong câu "Nam học bài rất chăm chỉ", bộ phận vị ngữ là:', [{k:'A',t:'Nam',c:false},{k:'B',t:'học bài rất chăm chỉ',c:true},{k:'C',t:'rất chăm chỉ',c:false},{k:'D',t:'học bài',c:false}]),
    q('Từ "xuân" trong "mùa xuân" và "tuổi xuân" có quan hệ gì?', [{k:'A',t:'Từ đồng âm',c:false},{k:'B',t:'Từ trái nghĩa',c:false},{k:'C',t:'Từ nhiều nghĩa',c:true},{k:'D',t:'Từ đồng nghĩa',c:false}]),
    q('Câu ghép là câu có:', [{k:'A',t:'Một cụm chủ - vị',c:false},{k:'B',t:'Hai hoặc nhiều cụm chủ - vị',c:true},{k:'C',t:'Không có chủ ngữ',c:false},{k:'D',t:'Chỉ có vị ngữ',c:false}]),
    q('"Nhà" trong "nhà trường" có nghĩa là gì?', [{k:'A',t:'Công trình để ở',c:false},{k:'B',t:'Tổ chức / cơ sở giáo dục',c:true},{k:'C',t:'Mái nhà',c:false},{k:'D',t:'Gia đình',c:false}]),
    q('Từ nào sau đây là từ láy?', [{k:'A',t:'sách vở',c:false},{k:'B',t:'lao động',c:false},{k:'C',t:'lung linh',c:true},{k:'D',t:'đất nước',c:false}]),
    q('Nghĩa của thành ngữ "Có công mài sắt có ngày nên kim" là:', [{k:'A',t:'Rèn luyện sử dụng kim loại',c:false},{k:'B',t:'Kiên trì nỗ lực sẽ đạt kết quả',c:true},{k:'C',t:'Làm việc thủ công',c:false},{k:'D',t:'Học nghề rèn',c:false}]),
    q('Từ "trắng" trong "trắng tay" mang nghĩa:', [{k:'A',t:'Màu trắng',c:false},{k:'B',t:'Không còn gì',c:true},{k:'C',t:'Tay sạch',c:false},{k:'D',t:'Da tay sáng',c:false}]),
    q('Dấu hai chấm (:) được dùng để:', [{k:'A',t:'Kết thúc câu',c:false},{k:'B',t:'Báo hiệu phần giải thích hoặc liệt kê',c:true},{k:'C',t:'Thể hiện câu hỏi',c:false},{k:'D',t:'Ngắt câu nhẹ',c:false}]),
    q('Chủ ngữ trong câu "Những bông hoa hồng nở rộ trong vườn" là:', [{k:'A',t:'hoa hồng',c:false},{k:'B',t:'Những bông hoa hồng',c:true},{k:'C',t:'nở rộ',c:false},{k:'D',t:'trong vườn',c:false}]),
    q('Từ nào sau đây là động từ?', [{k:'A',t:'buồn',c:false},{k:'B',t:'nhảy',c:true},{k:'C',t:'xanh',c:false},{k:'D',t:'bạn bè',c:false}]),
    q('Phép tu từ nào được dùng trong câu: "Mặt trời là trái tim của vũ trụ"?', [{k:'A',t:'So sánh',c:false},{k:'B',t:'Nhân hóa',c:false},{k:'C',t:'Ẩn dụ',c:true},{k:'D',t:'Điệp ngữ',c:false}]),
    q('Từ đồng nghĩa với "dũng cảm" là:', [{k:'A',t:'nhút nhát',c:false},{k:'B',t:'gan dạ',c:true},{k:'C',t:'lười biếng',c:false},{k:'D',t:'hiền lành',c:false}]),
    q('Câu "Bạn có thể giúp mình không?" thuộc kiểu câu:', [{k:'A',t:'Câu kể',c:false},{k:'B',t:'Câu cảm',c:false},{k:'C',t:'Câu hỏi',c:true},{k:'D',t:'Câu cầu khiến',c:false}]),
    q('Từ trái nghĩa với "rộng lượng" là:', [{k:'A',t:'hào phóng',c:false},{k:'B',t:'tốt bụng',c:false},{k:'C',t:'hẹp hòi',c:true},{k:'D',t:'nhân từ',c:false}]),
    q('Biện pháp tu từ trong câu "Dòng sông uốn mình qua cánh đồng như một dải lụa" là:', [{k:'A',t:'Ẩn dụ',c:false},{k:'B',t:'So sánh',c:true},{k:'C',t:'Nhân hóa',c:false},{k:'D',t:'Điệp ngữ',c:false}]),
    q('Văn bản "Dế Mèn phiêu lưu ký" của tác giả nào?', [{k:'A',t:'Tô Hoài',c:true},{k:'B',t:'Nguyễn Du',c:false},{k:'C',t:'Nam Quốc',c:false},{k:'D',t:'Xuân Quỳnh',c:false}]),
    q('Từ "xanh" trong "da trời xanh" và "xanh lòng" là:', [{k:'A',t:'Từ đồng nghĩa',c:false},{k:'B',t:'Từ đồng âm',c:false},{k:'C',t:'Từ nhiều nghĩa',c:true},{k:'D',t:'Từ trái nghĩa',c:false}], 'MEDIUM'),
    q('Từ ngữ nào dùng sai trong câu: "Bạn Lan học rất siêng năng và chuyên cần."?', [{k:'A',t:'siêng năng',c:false},{k:'B',t:'chuyên cần',c:false},{k:'C',t:'Không có từ dùng sai',c:true},{k:'D',t:'học',c:false}]),
    q('Trong câu ghép "Vì trời mưa nên chúng tôi ở nhà", quan hệ giữa hai vế là:', [{k:'A',t:'Tương phản',c:false},{k:'B',t:'Nguyên nhân - kết quả',c:true},{k:'C',t:'Điều kiện',c:false},{k:'D',t:'Tăng tiến',c:false}]),
    q('Từ "lòng" trong "lòng nhân ái" chỉ:', [{k:'A',t:'Cơ quan nội tạng',c:false},{k:'B',t:'Tình cảm, tâm hồn',c:true},{k:'C',t:'Bề mặt bên trong',c:false},{k:'D',t:'Không gian',c:false}]),
    q('"Yêu nước" là từ ghép thuộc loại:', [{k:'A',t:'Từ ghép phân loại',c:false},{k:'B',t:'Từ ghép tổng hợp',c:true},{k:'C',t:'Từ láy',c:false},{k:'D',t:'Từ đơn',c:false}], 'MEDIUM'),
    q('Câu tục ngữ "Một cây làm chẳng nên non / Ba cây chụm lại nên hòn núi cao" nói về:', [{k:'A',t:'Thiên nhiên',c:false},{k:'B',t:'Sức mạnh đoàn kết',c:true},{k:'C',t:'Lao động cần cù',c:false},{k:'D',t:'Trồng cây',c:false}]),
    q('Dấu ngoặc kép ("...") dùng để:', [{k:'A',t:'Ngắt câu',c:false},{k:'B',t:'Trích dẫn lời nói hoặc đánh dấu từ đặc biệt',c:true},{k:'C',t:'Kết thúc câu',c:false},{k:'D',t:'Liệt kê',c:false}]),
    q('Thành phần phụ trạng ngữ trong câu "Sáng sớm, em đến trường" là:', [{k:'A',t:'em',c:false},{k:'B',t:'đến trường',c:false},{k:'C',t:'Sáng sớm',c:true},{k:'D',t:'em đến trường',c:false}]),
  ],

  'sub-khoahoc': [
    q('Cây xanh thực hiện quang hợp nhờ:', [{k:'A',t:'Rễ',c:false},{k:'B',t:'Diệp lục tố trong lá',c:true},{k:'C',t:'Hoa',c:false},{k:'D',t:'Thân',c:false}]),
    q('Chất nào chiếm tỉ lệ lớn nhất trong không khí?', [{k:'A',t:'Oxy',c:false},{k:'B',t:'CO₂',c:false},{k:'C',t:'Nitơ',c:true},{k:'D',t:'Hơi nước',c:false}]),
    q('Sự sinh sản của thực vật có hoa chủ yếu qua:', [{k:'A',t:'Rễ',c:false},{k:'B',t:'Hạt',c:true},{k:'C',t:'Lá',c:false},{k:'D',t:'Thân',c:false}]),
    q('Nước sôi ở nhiệt độ nào (ở điều kiện bình thường)?', [{k:'A',t:'90°C',c:false},{k:'B',t:'100°C',c:true},{k:'C',t:'110°C',c:false},{k:'D',t:'80°C',c:false}]),
    q('Động vật nào dưới đây là động vật máu lạnh?', [{k:'A',t:'Chó',c:false},{k:'B',t:'Mèo',c:false},{k:'C',t:'Rắn',c:true},{k:'D',t:'Thỏ',c:false}]),
    q('Không khí cần cho sự cháy nhờ khí:', [{k:'A',t:'Nitơ',c:false},{k:'B',t:'CO₂',c:false},{k:'C',t:'Oxy',c:true},{k:'D',t:'Hơi nước',c:false}]),
    q('Cơ quan nào của cơ thể người điều tiết nhiệt độ qua mồ hôi?', [{k:'A',t:'Phổi',c:false},{k:'B',t:'Da',c:true},{k:'C',t:'Tim',c:false},{k:'D',t:'Gan',c:false}]),
    q('Sự bay hơi của nước xảy ra khi:', [{k:'A',t:'Nước đông thành đá',c:false},{k:'B',t:'Nước chuyển từ lỏng sang hơi',c:true},{k:'C',t:'Hơi nước thành nước lỏng',c:false},{k:'D',t:'Nước sôi sủi bọt',c:false}]),
    q('Thực vật hút nước và khoáng chất nhờ:', [{k:'A',t:'Hoa',c:false},{k:'B',t:'Lá',c:false},{k:'C',t:'Rễ',c:true},{k:'D',t:'Hạt',c:false}]),
    q('Hiện tượng nào sau đây là hiện tượng vật lý?', [{k:'A',t:'Sắt bị gỉ',c:false},{k:'B',t:'Than củi cháy',c:false},{k:'C',t:'Nước đóng băng',c:true},{k:'D',t:'Thức ăn bị lên men',c:false}]),
    q('Năng lượng mặt trời chủ yếu đến Trái Đất dưới dạng:', [{k:'A',t:'Điện',c:false},{k:'B',t:'Nhiệt và ánh sáng',c:true},{k:'C',t:'Sóng âm',c:false},{k:'D',t:'Gió',c:false}]),
    q('Con người cần không khí để:', [{k:'A',t:'Tiêu hóa thức ăn',c:false},{k:'B',t:'Hô hấp',c:true},{k:'C',t:'Bơi lội',c:false},{k:'D',t:'Giữ nhiệt',c:false}]),
    q('Loại đất nào giữ nước tốt nhất?', [{k:'A',t:'Đất cát',c:false},{k:'B',t:'Đất sét',c:true},{k:'C',t:'Đất phù sa',c:false},{k:'D',t:'Đất đá vôi',c:false}]),
    q('Điện mặt trời sử dụng năng lượng từ:', [{k:'A',t:'Gió',c:false},{k:'B',t:'Nước',c:false},{k:'C',t:'Ánh sáng mặt trời',c:true},{k:'D',t:'Nhiệt độ lòng đất',c:false}]),
    q('Con người thuộc lớp động vật nào?', [{k:'A',t:'Bò sát',c:false},{k:'B',t:'Lưỡng cư',c:false},{k:'C',t:'Thú (Có vú)',c:true},{k:'D',t:'Chim',c:false}]),
    q('Hiện tượng nào gây ô nhiễm không khí?', [{k:'A',t:'Trồng thêm cây xanh',c:false},{k:'B',t:'Đốt rác',c:true},{k:'C',t:'Dùng xe đạp',c:false},{k:'D',t:'Tái chế rác',c:false}]),
    q('Chất nào tan trong nước tạo thành dung dịch?', [{k:'A',t:'Cát',c:false},{k:'B',t:'Dầu ăn',c:false},{k:'C',t:'Muối',c:true},{k:'D',t:'Bột mì',c:false}]),
    q('Cơ quan nào của cơ thể thực hiện trao đổi khí?', [{k:'A',t:'Tim',c:false},{k:'B',t:'Phổi',c:true},{k:'C',t:'Dạ dày',c:false},{k:'D',t:'Gan',c:false}]),
    q('Quá trình nước từ hơi nước ngưng tụ thành giọt nước gọi là:', [{k:'A',t:'Bay hơi',c:false},{k:'B',t:'Ngưng tụ',c:true},{k:'C',t:'Đông đặc',c:false},{k:'D',t:'Nóng chảy',c:false}]),
    q('Sinh vật nào dưới đây là sinh vật sản xuất trong chuỗi thức ăn?', [{k:'A',t:'Sư tử',c:false},{k:'B',t:'Hươu',c:false},{k:'C',t:'Cỏ',c:true},{k:'D',t:'Vi khuẩn',c:false}]),
    q('Bóng đèn dây tóc biến điện năng thành:', [{k:'A',t:'Chỉ nhiệt năng',c:false},{k:'B',t:'Ánh sáng và nhiệt',c:true},{k:'C',t:'Chỉ ánh sáng',c:false},{k:'D',t:'Cơ năng',c:false}]),
    q('Trái Đất quay quanh Mặt Trời hết:', [{k:'A',t:'24 giờ',c:false},{k:'B',t:'30 ngày',c:false},{k:'C',t:'365 ngày',c:true},{k:'D',t:'7 ngày',c:false}]),
    q('Vật dẫn điện tốt nhất là:', [{k:'A',t:'Nhựa',c:false},{k:'B',t:'Gỗ',c:false},{k:'C',t:'Kim loại',c:true},{k:'D',t:'Thủy tinh',c:false}]),
    q('Để bảo vệ nguồn nước sạch, cần:', [{k:'A',t:'Đổ rác xuống sông',c:false},{k:'B',t:'Xử lý nước thải trước khi xả',c:true},{k:'C',t:'Dùng thuốc trừ sâu gần sông',c:false},{k:'D',t:'Khai thác nước ngầm tối đa',c:false}]),
    q('Ánh sáng truyền theo đường:', [{k:'A',t:'Cong',c:false},{k:'B',t:'Thẳng',c:true},{k:'C',t:'Zigzag',c:false},{k:'D',t:'Vòng tròn',c:false}]),
    q('Sự thụ phấn ở thực vật có hoa là quá trình:', [{k:'A',t:'Hạt nảy mầm',c:false},{k:'B',t:'Hạt phấn rơi lên đầu nhụy',c:true},{k:'C',t:'Quả chín và rụng',c:false},{k:'D',t:'Cây ra lá mới',c:false}], 'MEDIUM'),
    q('Nam châm hút được vật làm từ:', [{k:'A',t:'Nhôm',c:false},{k:'B',t:'Đồng',c:false},{k:'C',t:'Sắt',c:true},{k:'D',t:'Vàng',c:false}]),
    q('Môi trường sống của cá là:', [{k:'A',t:'Trên cạn',c:false},{k:'B',t:'Dưới nước',c:true},{k:'C',t:'Trên cây',c:false},{k:'D',t:'Trong đất',c:false}]),
    q('Chất dinh dưỡng nào cung cấp nhiều năng lượng nhất?', [{k:'A',t:'Vitamin',c:false},{k:'B',t:'Khoáng chất',c:false},{k:'C',t:'Chất béo',c:true},{k:'D',t:'Nước',c:false}], 'MEDIUM'),
    q('Vệ tinh tự nhiên của Trái Đất là:', [{k:'A',t:'Sao Hỏa',c:false},{k:'B',t:'Mặt Trăng',c:true},{k:'C',t:'Sao Kim',c:false},{k:'D',t:'Mặt Trời',c:false}]),
  ],

  'sub-lichsu-dialy': [
    q('Thủ đô của Việt Nam là:', [{k:'A',t:'Hồ Chí Minh',c:false},{k:'B',t:'Đà Nẵng',c:false},{k:'C',t:'Hà Nội',c:true},{k:'D',t:'Huế',c:false}]),
    q('Sông nào dài nhất Việt Nam?', [{k:'A',t:'Sông Hồng',c:false},{k:'B',t:'Sông Cửu Long (Mê Kông)',c:true},{k:'C',t:'Sông Đà',c:false},{k:'D',t:'Sông Mã',c:false}]),
    q('Ai là người lãnh đạo cuộc khởi nghĩa Hai Bà Trưng?', [{k:'A',t:'Bà Triệu',c:false},{k:'B',t:'Trưng Trắc và Trưng Nhị',c:true},{k:'C',t:'Đinh Bộ Lĩnh',c:false},{k:'D',t:'Ngô Quyền',c:false}]),
    q('Ngày 2 tháng 9 năm 1945 là ngày gì?', [{k:'A',t:'Quốc khánh Việt Nam',c:true},{k:'B',t:'Ngày thống nhất',c:false},{k:'C',t:'Ngày giải phóng miền Nam',c:false},{k:'D',t:'Ngày thành lập Đảng',c:false}]),
    q('Dãy núi nào là ranh giới tự nhiên giữa Việt Nam và Lào?', [{k:'A',t:'Dãy Hoàng Liên Sơn',c:false},{k:'B',t:'Dãy Trường Sơn',c:true},{k:'C',t:'Dãy Bạch Mã',c:false},{k:'D',t:'Dãy Ngân Sơn',c:false}]),
    q('Đồng bằng sông Cửu Long nằm ở vùng nào của Việt Nam?', [{k:'A',t:'Miền Bắc',c:false},{k:'B',t:'Miền Trung',c:false},{k:'C',t:'Miền Nam',c:true},{k:'D',t:'Tây Nguyên',c:false}]),
    q('Nhà Trần thắng quân Nguyên - Mông lần thứ nhất vào năm nào?', [{k:'A',t:'1258',c:true},{k:'B',t:'1285',c:false},{k:'C',t:'1288',c:false},{k:'D',t:'1300',c:false}]),
    q('Hà Nội nằm bên sông nào?', [{k:'A',t:'Sông Hương',c:false},{k:'B',t:'Sông Hồng',c:true},{k:'C',t:'Sông Mã',c:false},{k:'D',t:'Sông Đà',c:false}]),
    q('Vị vua nào dời đô từ Hoa Lư về Thăng Long?', [{k:'A',t:'Đinh Bộ Lĩnh',c:false},{k:'B',t:'Lê Đại Hành',c:false},{k:'C',t:'Lý Thái Tổ',c:true},{k:'D',t:'Trần Thái Tông',c:false}]),
    q('Phú Quốc là đảo lớn nhất của tỉnh nào?', [{k:'A',t:'Bà Rịa - Vũng Tàu',c:false},{k:'B',t:'Kiên Giang',c:true},{k:'C',t:'Cà Mau',c:false},{k:'D',t:'Bình Thuận',c:false}]),
    q('Bác Hồ sinh ngày tháng năm nào?', [{k:'A',t:'1/5/1890',c:false},{k:'B',t:'19/5/1890',c:true},{k:'C',t:'2/9/1890',c:false},{k:'D',t:'19/8/1890',c:false}]),
    q('Việt Nam tiếp giáp với những quốc gia nào (trên bộ)?', [{k:'A',t:'Trung Quốc, Lào, Campuchia',c:true},{k:'B',t:'Trung Quốc, Thái Lan, Lào',c:false},{k:'C',t:'Lào, Campuchia, Thái Lan',c:false},{k:'D',t:'Trung Quốc, Campuchia, Myanmar',c:false}]),
    q('Chiến thắng Điện Biên Phủ diễn ra năm nào?', [{k:'A',t:'1950',c:false},{k:'B',t:'1954',c:true},{k:'C',t:'1975',c:false},{k:'D',t:'1968',c:false}]),
    q('Vùng đất nào được mệnh danh là "mái nhà Đông Dương"?', [{k:'A',t:'Đồng bằng sông Hồng',c:false},{k:'B',t:'Tây Nguyên',c:false},{k:'C',t:'Dãy Hoàng Liên Sơn',c:true},{k:'D',t:'Đồng bằng sông Cửu Long',c:false}]),
    q('Ngô Quyền chiến thắng quân Nam Hán trên sông nào năm 938?', [{k:'A',t:'Sông Hồng',c:false},{k:'B',t:'Sông Bạch Đằng',c:true},{k:'C',t:'Sông Đà',c:false},{k:'D',t:'Sông Mã',c:false}]),
    q('Thành phố Hồ Chí Minh còn có tên gọi cũ là:', [{k:'A',t:'Gia Định',c:false},{k:'B',t:'Sài Gòn',c:true},{k:'C',t:'Đồng Nai',c:false},{k:'D',t:'Biên Hòa',c:false}]),
    q('Nghề trồng lúa nước phổ biến nhất ở đồng bằng nào?', [{k:'A',t:'Đồng bằng Trung Bộ',c:false},{k:'B',t:'Đồng bằng sông Cửu Long và sông Hồng',c:true},{k:'C',t:'Tây Nguyên',c:false},{k:'D',t:'Vùng núi phía Bắc',c:false}]),
    q('Vịnh Hạ Long thuộc tỉnh nào?', [{k:'A',t:'Hải Phòng',c:false},{k:'B',t:'Quảng Ninh',c:true},{k:'C',t:'Ninh Bình',c:false},{k:'D',t:'Thanh Hóa',c:false}]),
    q('Nhà Nguyễn - triều đại phong kiến cuối cùng của Việt Nam - kinh đô đặt tại:', [{k:'A',t:'Hà Nội',c:false},{k:'B',t:'Đà Nẵng',c:false},{k:'C',t:'Huế',c:true},{k:'D',t:'Hội An',c:false}]),
    q('Việt Nam thuộc khu vực nào của châu Á?', [{k:'A',t:'Đông Á',c:false},{k:'B',t:'Nam Á',c:false},{k:'C',t:'Đông Nam Á',c:true},{k:'D',t:'Tây Á',c:false}]),
    q('Cây cầu nào bắc qua sông Hồng nổi tiếng ở Hà Nội?', [{k:'A',t:'Cầu Mỹ Thuận',c:false},{k:'B',t:'Cầu Long Biên',c:true},{k:'C',t:'Cầu Cần Thơ',c:false},{k:'D',t:'Cầu Rồng',c:false}]),
    q('Đảo nào thuộc chủ quyền Việt Nam ở biển Đông?', [{k:'A',t:'Đảo Hải Nam',c:false},{k:'B',t:'Đảo Trường Sa',c:true},{k:'C',t:'Đảo Đài Loan',c:false},{k:'D',t:'Đảo Borneo',c:false}]),
    q('Đại tướng Võ Nguyên Giáp chỉ huy chiến dịch lịch sử nào?', [{k:'A',t:'Chiến dịch Tây Nguyên',c:false},{k:'B',t:'Chiến dịch Điện Biên Phủ',c:true},{k:'C',t:'Chiến dịch Đường 9 - Nam Lào',c:false},{k:'D',t:'Chiến dịch Hồ Chí Minh',c:false}]),
    q('Cột cờ Hà Nội được xây dựng vào thời đại nào?', [{k:'A',t:'Thời Lý',c:false},{k:'B',t:'Thời Nguyễn',c:true},{k:'C',t:'Thời Pháp thuộc',c:false},{k:'D',t:'Thời Lê',c:false}]),
    q('Tây Nguyên nổi tiếng với loại nông sản nào?', [{k:'A',t:'Lúa nước',c:false},{k:'B',t:'Cà phê',c:true},{k:'C',t:'Lúa mì',c:false},{k:'D',t:'Mía',c:false}]),
    q('Việt Nam có diện tích khoảng bao nhiêu km²?', [{k:'A',t:'200 000 km²',c:false},{k:'B',t:'331 000 km²',c:true},{k:'C',t:'500 000 km²',c:false},{k:'D',t:'150 000 km²',c:false}]),
    q('Biển Đông tiếp giáp phía nào của Việt Nam?', [{k:'A',t:'Phía Tây',c:false},{k:'B',t:'Phía Đông và Nam',c:true},{k:'C',t:'Phía Bắc',c:false},{k:'D',t:'Phía Tây Bắc',c:false}]),
    q('Lễ hội Đền Hùng tổ chức vào ngày nào âm lịch?', [{k:'A',t:'5/1',c:false},{k:'B',t:'10/3',c:true},{k:'C',t:'15/8',c:false},{k:'D',t:'1/5',c:false}]),
    q('Đô thị cổ Hội An nằm ở tỉnh nào?', [{k:'A',t:'Huế',c:false},{k:'B',t:'Đà Nẵng',c:false},{k:'C',t:'Quảng Nam',c:true},{k:'D',t:'Quảng Ngãi',c:false}]),
    q('Chiến dịch Hồ Chí Minh giải phóng miền Nam năm:', [{k:'A',t:'1973',c:false},{k:'B',t:'1974',c:false},{k:'C',t:'1975',c:true},{k:'D',t:'1976',c:false}]),
  ],

  'sub-daoduc': [
    q('Khi gặp người lớn tuổi hơn, em nên:', [{k:'A',t:'Bỏ qua không chào',c:false},{k:'B',t:'Chào hỏi lễ phép',c:true},{k:'C',t:'Nhìn đi chỗ khác',c:false},{k:'D',t:'Chờ họ chào trước',c:false}]),
    q('Hành động nào thể hiện lòng biết ơn với thầy cô?', [{k:'A',t:'Học bài đầy đủ và nghe giảng chăm chú',c:true},{k:'B',t:'Nói chuyện riêng trong giờ học',c:false},{k:'C',t:'Đến trường muộn',c:false},{k:'D',t:'Làm việc riêng trong lớp',c:false}]),
    q('Em thấy bạn bị bắt nạt, em nên làm gì?', [{k:'A',t:'Bỏ đi không quan tâm',c:false},{k:'B',t:'Cùng bắt nạt',c:false},{k:'C',t:'Báo với thầy cô hoặc người lớn',c:true},{k:'D',t:'Đứng xem',c:false}]),
    q('Trung thực nghĩa là:', [{k:'A',t:'Nói dối để tránh rắc rối',c:false},{k:'B',t:'Nói thật, không gian dối',c:true},{k:'C',t:'Im lặng mọi lúc',c:false},{k:'D',t:'Chỉ nói thật với bạn bè',c:false}]),
    q('Hành động nào thể hiện tiết kiệm?', [{k:'A',t:'Mua nhiều đồ dù không cần',c:false},{k:'B',t:'Tắt điện khi ra khỏi phòng',c:true},{k:'C',t:'Bỏ thức ăn còn thừa',c:false},{k:'D',t:'Vòi nước chảy suốt ngày',c:false}]),
    q('Khi mắc lỗi, em nên:', [{k:'A',t:'Đổ lỗi cho người khác',c:false},{k:'B',t:'Giấu đi',c:false},{k:'C',t:'Nhận lỗi và sửa chữa',c:true},{k:'D',t:'Tìm cách trốn tránh',c:false}]),
    q('Bảo vệ môi trường là trách nhiệm của:', [{k:'A',t:'Chỉ cơ quan nhà nước',c:false},{k:'B',t:'Tất cả mọi người',c:true},{k:'C',t:'Chỉ người lớn',c:false},{k:'D',t:'Chỉ học sinh',c:false}]),
    q('Khi bạn đang buồn, em nên:', [{k:'A',t:'Làm ngơ',c:false},{k:'B',t:'Quan tâm, hỏi thăm và an ủi',c:true},{k:'C',t:'Trêu chọc',c:false},{k:'D',t:'Kể cho người khác nghe',c:false}]),
    q('Quyền được học hành là quyền của:', [{k:'A',t:'Chỉ trẻ em có điều kiện',c:false},{k:'B',t:'Mọi trẻ em',c:true},{k:'C',t:'Chỉ trẻ em thành phố',c:false},{k:'D',t:'Chỉ người lớn',c:false}]),
    q('Hành động nào là vi phạm pháp luật?', [{k:'A',t:'Giúp đỡ người già qua đường',c:false},{k:'B',t:'Vứt rác đúng nơi quy định',c:false},{k:'C',t:'Trộm cắp tài sản',c:true},{k:'D',t:'Tham gia giao thông đúng luật',c:false}]),
    q('Bình đẳng giữa nam và nữ có nghĩa là:', [{k:'A',t:'Nam và nữ làm đúng công việc nhau',c:false},{k:'B',t:'Nam và nữ có quyền và cơ hội ngang nhau',c:true},{k:'C',t:'Nam và nữ giống hệt nhau',c:false},{k:'D',t:'Chỉ nữ được học cao',c:false}]),
    q('Khi nhận được sự giúp đỡ, em nên:', [{k:'A',t:'Im lặng',c:false},{k:'B',t:'Nói cảm ơn và biết ơn người giúp',c:true},{k:'C',t:'Đòi thêm',c:false},{k:'D',t:'Nghĩ đó là điều hiển nhiên',c:false}]),
    q('Ý nghĩa của truyền thống "Tôn sư trọng đạo" là:', [{k:'A',t:'Kính trọng, biết ơn thầy cô giáo',c:true},{k:'B',t:'Chỉ học thầy giỏi',c:false},{k:'C',t:'Nghe lời thầy tuyệt đối',c:false},{k:'D',t:'Trả học phí đúng hạn',c:false}]),
    q('Em không đồng ý với bạn, em nên:', [{k:'A',t:'Nói to và tranh cãi',c:false},{k:'B',t:'Im lặng, tức giận',c:false},{k:'C',t:'Bình tĩnh nêu ý kiến và lắng nghe bạn',c:true},{k:'D',t:'Mách thầy cô ngay',c:false}]),
    q('Công dân có nghĩa vụ gì với Tổ quốc?', [{k:'A',t:'Không cần làm gì',c:false},{k:'B',t:'Chỉ đóng thuế',c:false},{k:'C',t:'Bảo vệ, xây dựng và yêu Tổ quốc',c:true},{k:'D',t:'Chỉ bầu cử',c:false}]),
    q('Hành vi nào thể hiện sự công bằng?', [{k:'A',t:'Ưu tiên bạn thân khi chia phần thưởng',c:false},{k:'B',t:'Chia đều phần thưởng theo đóng góp',c:true},{k:'C',t:'Bỏ phiếu theo số đông bất kể đúng sai',c:false},{k:'D',t:'Không cần quan tâm',c:false}]),
    q('Trẻ em có quyền được bảo vệ khỏi:', [{k:'A',t:'Học tập',c:false},{k:'B',t:'Vui chơi giải trí',c:false},{k:'C',t:'Bạo lực, lạm dụng',c:true},{k:'D',t:'Các hoạt động gia đình',c:false}]),
    q('Hành động nào thể hiện trách nhiệm với gia đình?', [{k:'A',t:'Chỉ lo cho bản thân',c:false},{k:'B',t:'Giúp đỡ việc nhà và quan tâm người thân',c:true},{k:'C',t:'Đòi hỏi nhiều thứ từ bố mẹ',c:false},{k:'D',t:'Không cần quan tâm vì có bố mẹ lo',c:false}]),
    q('Khi thấy người bị tai nạn giao thông, em nên:', [{k:'A',t:'Bỏ đi vì không liên quan',c:false},{k:'B',t:'Gọi người lớn hoặc cấp cứu ngay',c:true},{k:'C',t:'Chụp ảnh đăng mạng',c:false},{k:'D',t:'Đứng xem cho biết',c:false}]),
    q('Vì sao cần bảo vệ tài nguyên thiên nhiên?', [{k:'A',t:'Để bán lấy tiền',c:false},{k:'B',t:'Để dành cho thế hệ tương lai',c:true},{k:'C',t:'Vì chúng không có giá trị',c:false},{k:'D',t:'Vì nhà nước yêu cầu',c:false}]),
    q('Khi bị người lạ dụ dỗ, em nên:', [{k:'A',t:'Đi theo xem có gì',c:false},{k:'B',t:'Nhận quà rồi bỏ đi',c:false},{k:'C',t:'Từ chối và nói ngay với người thân',c:true},{k:'D',t:'Im lặng không nói gì',c:false}]),
    q('Hành động nào thể hiện tình yêu quê hương?', [{k:'A',t:'Vứt rác bừa bãi nơi công cộng',c:false},{k:'B',t:'Giữ gìn và quảng bá văn hóa địa phương',c:true},{k:'C',t:'Không quan tâm đến lịch sử',c:false},{k:'D',t:'Chỉ yêu nơi mình ở',c:false}]),
    q('Tại sao cần tôn trọng sự khác biệt giữa mọi người?', [{k:'A',t:'Vì sự khác biệt gây rắc rối',c:false},{k:'B',t:'Vì mọi người đều có giá trị như nhau',c:true},{k:'C',t:'Vì pháp luật bắt buộc',c:false},{k:'D',t:'Để tránh xung đột',c:false}]),
    q('Hành vi nào là văn hóa giao thông?', [{k:'A',t:'Vượt đèn đỏ khi vắng người',c:false},{k:'B',t:'Dừng xe đúng vạch kẻ đường',c:true},{k:'C',t:'Còi inh ỏi trong khu dân cư',c:false},{k:'D',t:'Đi ngược chiều cho nhanh',c:false}]),
    q('Tinh thần đoàn kết có ý nghĩa:', [{k:'A',t:'Chỉ giúp người thân thiết',c:false},{k:'B',t:'Cùng nhau vượt qua khó khăn và tạo sức mạnh',c:true},{k:'C',t:'Không cần ai, tự làm được hết',c:false},{k:'D',t:'Phụ thuộc hoàn toàn vào người khác',c:false}]),
    q('Khi thấy bạn chép bài, em nên:', [{k:'A',t:'Cho chép để giúp bạn',c:false},{k:'B',t:'Cùng chép cho nhanh',c:false},{k:'C',t:'Giải thích tác hại và khuyên bạn tự làm',c:true},{k:'D',t:'Báo ngay thầy cô',c:false}]),
    q('Hành động nào thể hiện tinh thần học hỏi?', [{k:'A',t:'Từ chối nghe ý kiến người khác',c:false},{k:'B',t:'Đặt câu hỏi khi chưa hiểu',c:true},{k:'C',t:'Chỉ tin vào bản thân',c:false},{k:'D',t:'Không làm bài tập',c:false}]),
    q('Em nhặt được ví tiền của người khác, em nên:', [{k:'A',t:'Giữ lấy xài',c:false},{k:'B',t:'Vứt đi',c:false},{k:'C',t:'Giao nộp cho người có thẩm quyền hoặc tìm người mất trả lại',c:true},{k:'D',t:'Chia cho bạn bè',c:false}]),
    q('Tại sao cần học tập tốt?', [{k:'A',t:'Chỉ để được điểm cao',c:false},{k:'B',t:'Để có kiến thức, phát triển bản thân và đóng góp cho xã hội',c:true},{k:'C',t:'Để khoe với bạn bè',c:false},{k:'D',t:'Vì bố mẹ bắt buộc',c:false}]),
    q('Khoan dung có nghĩa là:', [{k:'A',t:'Trả thù khi bị xúc phạm',c:false},{k:'B',t:'Tha thứ và thông cảm với lỗi lầm của người khác',c:true},{k:'C',t:'Bỏ qua mọi vi phạm',c:false},{k:'D',t:'Không quan tâm đến người khác',c:false}]),
  ],

  'sub-tinhoc': [
    q('Phần mềm nào dùng để soạn thảo văn bản?', [{k:'A',t:'Microsoft Excel',c:false},{k:'B',t:'Microsoft Word',c:true},{k:'C',t:'Paint',c:false},{k:'D',t:'Windows Media Player',c:false}]),
    q('CPU là viết tắt của:', [{k:'A',t:'Central Power Unit',c:false},{k:'B',t:'Central Processing Unit',c:true},{k:'C',t:'Computer Program Unit',c:false},{k:'D',t:'Control Processing Unit',c:false}]),
    q('Thiết bị nào là thiết bị đầu ra?', [{k:'A',t:'Bàn phím',c:false},{k:'B',t:'Chuột',c:false},{k:'C',t:'Màn hình',c:true},{k:'D',t:'Máy quét',c:false}]),
    q('Đơn vị nhỏ nhất của thông tin trong máy tính là:', [{k:'A',t:'Byte',c:false},{k:'B',t:'Bit',c:true},{k:'C',t:'MB',c:false},{k:'D',t:'KB',c:false}]),
    q('Phím nào dùng để xóa ký tự bên trái con trỏ?', [{k:'A',t:'Delete',c:false},{k:'B',t:'Backspace',c:true},{k:'C',t:'Enter',c:false},{k:'D',t:'Escape',c:false}]),
    q('Thư mục (Folder) dùng để:', [{k:'A',t:'Lưu một tệp duy nhất',c:false},{k:'B',t:'Tổ chức và chứa các tệp/thư mục khác',c:true},{k:'C',t:'Kết nối Internet',c:false},{k:'D',t:'Mở ứng dụng',c:false}]),
    q('Internet là:', [{k:'A',t:'Một loại phần mềm',c:false},{k:'B',t:'Mạng máy tính toàn cầu',c:true},{k:'C',t:'Một thiết bị lưu trữ',c:false},{k:'D',t:'Loại màn hình máy tính',c:false}]),
    q('Để lưu tệp đang soạn thảo, nhấn tổ hợp phím:', [{k:'A',t:'Ctrl + C',c:false},{k:'B',t:'Ctrl + V',c:false},{k:'C',t:'Ctrl + S',c:true},{k:'D',t:'Ctrl + Z',c:false}]),
    q('RAM là viết tắt của:', [{k:'A',t:'Read And Memory',c:false},{k:'B',t:'Random Access Memory',c:true},{k:'C',t:'Read All Memory',c:false},{k:'D',t:'Random Application Memory',c:false}]),
    q('Phần mềm diệt vi-rút dùng để:', [{k:'A',t:'Tăng tốc máy tính',c:false},{k:'B',t:'Phát hiện và diệt các chương trình độc hại',c:true},{k:'C',t:'Tạo file',c:false},{k:'D',t:'Kết nối wifi',c:false}]),
    q('Để sao chép văn bản, dùng tổ hợp phím:', [{k:'A',t:'Ctrl + X',c:false},{k:'B',t:'Ctrl + C',c:true},{k:'C',t:'Ctrl + V',c:false},{k:'D',t:'Ctrl + A',c:false}]),
    q('USB (ổ đĩa flash) là thiết bị:', [{k:'A',t:'Đầu vào',c:false},{k:'B',t:'Xử lý',c:false},{k:'C',t:'Lưu trữ ngoài',c:true},{k:'D',t:'Đầu ra',c:false}]),
    q('Ô tính trong Excel được xác định bằng:', [{k:'A',t:'Màu sắc',c:false},{k:'B',t:'Cột và hàng (ví dụ: A1, B3)',c:true},{k:'C',t:'Số thứ tự từ 1 đến 100',c:false},{k:'D',t:'Tên do người dùng đặt',c:false}]),
    q('Tệp tin (file) có đuôi .jpg thường là:', [{k:'A',t:'Tài liệu Word',c:false},{k:'B',t:'Bảng tính Excel',c:false},{k:'C',t:'Hình ảnh',c:true},{k:'D',t:'Âm thanh',c:false}]),
    q('Khi máy tính bị đơ (không phản hồi), có thể thử:', [{k:'A',t:'Rút điện ngay lập tức',c:false},{k:'B',t:'Nhấn Ctrl + Alt + Delete',c:true},{k:'C',t:'Đập vào màn hình',c:false},{k:'D',t:'Tháo pin máy tính',c:false}]),
    q('Hệ điều hành Windows do công ty nào phát triển?', [{k:'A',t:'Apple',c:false},{k:'B',t:'Google',c:false},{k:'C',t:'Microsoft',c:true},{k:'D',t:'IBM',c:false}]),
    q('Khi tìm kiếm thông tin trên Internet, nên:', [{k:'A',t:'Tin tất cả những gì tìm được',c:false},{k:'B',t:'Kiểm tra nguồn thông tin và so sánh nhiều nguồn',c:true},{k:'C',t:'Chỉ dùng một trang web duy nhất',c:false},{k:'D',t:'Không cần đọc kỹ',c:false}]),
    q('Máy in là thiết bị:', [{k:'A',t:'Đầu vào',c:false},{k:'B',t:'Xử lý',c:false},{k:'C',t:'Đầu ra',c:true},{k:'D',t:'Lưu trữ',c:false}]),
    q('Phần mềm trình chiếu phổ biến là:', [{k:'A',t:'Word',c:false},{k:'B',t:'Excel',c:false},{k:'C',t:'PowerPoint',c:true},{k:'D',t:'Notepad',c:false}]),
    q('An toàn thông tin trên mạng nghĩa là:', [{k:'A',t:'Chia sẻ mật khẩu với bạn bè',c:false},{k:'B',t:'Bảo vệ thông tin cá nhân, không chia sẻ với người lạ',c:true},{k:'C',t:'Đăng tất cả thông tin lên mạng',c:false},{k:'D',t:'Dùng chung tài khoản',c:false}]),
    q('1 KB = ? byte', [{k:'A',t:'100 byte',c:false},{k:'B',t:'1 000 byte',c:false},{k:'C',t:'1 024 byte',c:true},{k:'D',t:'512 byte',c:false}]),
    q('Ngôn ngữ lập trình nào thường dùng trong dạy lập trình cho trẻ em?', [{k:'A',t:'C++',c:false},{k:'B',t:'Scratch',c:true},{k:'C',t:'Java',c:false},{k:'D',t:'Python',c:false}]),
    q('Để chọn tất cả văn bản trong tài liệu, dùng:', [{k:'A',t:'Ctrl + S',c:false},{k:'B',t:'Ctrl + A',c:true},{k:'C',t:'Ctrl + F',c:false},{k:'D',t:'Ctrl + B',c:false}]),
    q('Email là viết tắt của:', [{k:'A',t:'Easy Mail',c:false},{k:'B',t:'Electronic Mail',c:true},{k:'C',t:'Express Mail',c:false},{k:'D',t:'External Mail',c:false}]),
    q('Màn hình cảm ứng (touchscreen) là thiết bị vừa:', [{k:'A',t:'Chỉ đầu vào',c:false},{k:'B',t:'Chỉ đầu ra',c:false},{k:'C',t:'Vừa đầu vào vừa đầu ra',c:true},{k:'D',t:'Lưu trữ',c:false}]),
    q('Để tìm kiếm nhanh trong tài liệu, dùng tổ hợp phím:', [{k:'A',t:'Ctrl + H',c:false},{k:'B',t:'Ctrl + F',c:true},{k:'C',t:'Ctrl + G',c:false},{k:'D',t:'Ctrl + P',c:false}]),
    q('Wi-Fi cho phép:', [{k:'A',t:'In tài liệu không dây',c:false},{k:'B',t:'Kết nối Internet không dây',c:true},{k:'C',t:'Sạc điện không dây',c:false},{k:'D',t:'Truyền điện',c:false}]),
    q('Phím F5 trong trình chiếu PowerPoint dùng để:', [{k:'A',t:'Lưu file',c:false},{k:'B',t:'Bắt đầu trình chiếu',c:true},{k:'C',t:'In slide',c:false},{k:'D',t:'Xóa slide',c:false}]),
    q('Hacker là người:', [{k:'A',t:'Sửa chữa máy tính',c:false},{k:'B',t:'Xâm nhập trái phép vào hệ thống máy tính',c:true},{k:'C',t:'Lập trình ứng dụng',c:false},{k:'D',t:'Thiết kế website',c:false}]),
    q('Robot hoạt động được nhờ:', [{k:'A',t:'Chỉ điện',c:false},{k:'B',t:'Chương trình máy tính điều khiển',c:true},{k:'C',t:'Con người điều khiển trực tiếp mọi lúc',c:false},{k:'D',t:'Không cần điều khiển',c:false}]),
  ],
};

async function main() {
  let totalAdded = 0;
  for (const [subjectId, questions] of Object.entries(DATA)) {
    const existing = await p.question.findMany({
      where: { subjectId, gradeId: GRADE },
      select: { content: true },
    });
    const existingSet = new Set(existing.map(q => q.content.trim().toLowerCase()));
    let added = 0;
    for (const item of questions) {
      const key = item.content.trim().toLowerCase();
      if (existingSet.has(key)) continue;
      const correct = item.opts.find(o => o.c);
      if (!correct) continue;
      await p.question.create({
        data: {
          subjectId, gradeId: GRADE, content: item.content,
          questionType: 'MULTIPLE_CHOICE', difficulty: item.diff,
          status: 'ACTIVE', createdById: ADMIN,
          options: { create: item.opts.map((o, i) => ({ optionKey: o.k, content: o.t, isCorrect: o.c, sortOrder: i })) },
        },
      });
      existingSet.add(key);
      added++;
      totalAdded++;
    }
    console.log(`✅ ${subjectId}: thêm ${added} câu`);
  }
  console.log(`\n🎉 Tổng cộng thêm ${totalAdded} câu.`);
}
main().catch(console.error).finally(() => p.$disconnect());
