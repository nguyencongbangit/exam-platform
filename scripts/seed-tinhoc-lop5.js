const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-tinhoc';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== PHẦN CỨNG =====
  {
    content: 'CPU của máy tính được ví như cơ quan nào của con người?',
    difficulty: 'EASY',
    explanation: 'CPU (Central Processing Unit - Bộ xử lý trung tâm) được ví như bộ não, thực hiện tất cả các phép tính và điều khiển máy tính.',
    options: [
      { key: 'A', content: 'Trái tim', correct: false },
      { key: 'B', content: 'Bộ não', correct: true },
      { key: 'C', content: 'Đôi mắt', correct: false },
      { key: 'D', content: 'Đôi tay', correct: false },
    ],
  },
  {
    content: 'RAM trong máy tính có chức năng gì?',
    difficulty: 'EASY',
    explanation: 'RAM (Random Access Memory) là bộ nhớ tạm thời, lưu trữ dữ liệu đang được xử lý. Khi tắt máy, dữ liệu trong RAM sẽ bị mất.',
    options: [
      { key: 'A', content: 'Lưu trữ dữ liệu lâu dài', correct: false },
      { key: 'B', content: 'Bộ nhớ tạm thời cho các chương trình đang chạy', correct: true },
      { key: 'C', content: 'Hiển thị hình ảnh', correct: false },
      { key: 'D', content: 'Kết nối internet', correct: false },
    ],
  },
  {
    content: 'Ổ cứng (HDD/SSD) trong máy tính dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Ổ cứng là thiết bị lưu trữ dữ liệu lâu dài (file, phần mềm, hệ điều hành). Dữ liệu không bị mất khi tắt máy.',
    options: [
      { key: 'A', content: 'Xử lý dữ liệu', correct: false },
      { key: 'B', content: 'Lưu trữ dữ liệu lâu dài', correct: true },
      { key: 'C', content: 'Kết nối màn hình', correct: false },
      { key: 'D', content: 'Cấp điện cho máy tính', correct: false },
    ],
  },
  {
    content: 'Thiết bị nào dưới đây là thiết bị đầu vào (input)?',
    difficulty: 'EASY',
    explanation: 'Bàn phím là thiết bị đầu vào, dùng để nhập dữ liệu vào máy tính.',
    options: [
      { key: 'A', content: 'Màn hình', correct: false },
      { key: 'B', content: 'Máy in', correct: false },
      { key: 'C', content: 'Bàn phím', correct: true },
      { key: 'D', content: 'Loa', correct: false },
    ],
  },
  {
    content: 'Màn hình máy tính là thiết bị nào?',
    difficulty: 'EASY',
    explanation: 'Màn hình là thiết bị đầu ra (output), hiển thị kết quả xử lý cho người dùng thấy.',
    options: [
      { key: 'A', content: 'Thiết bị đầu vào', correct: false },
      { key: 'B', content: 'Thiết bị lưu trữ', correct: false },
      { key: 'C', content: 'Thiết bị đầu ra', correct: true },
      { key: 'D', content: 'Thiết bị xử lý', correct: false },
    ],
  },
  {
    content: 'Máy in là thiết bị nào?',
    difficulty: 'EASY',
    explanation: 'Máy in là thiết bị đầu ra, in nội dung từ máy tính ra giấy.',
    options: [
      { key: 'A', content: 'Thiết bị đầu vào', correct: false },
      { key: 'B', content: 'Thiết bị đầu ra', correct: true },
      { key: 'C', content: 'Thiết bị xử lý', correct: false },
      { key: 'D', content: 'Thiết bị lưu trữ', correct: false },
    ],
  },
  {
    content: 'Chuột máy tính (mouse) dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Chuột máy tính là thiết bị đầu vào dùng để di chuyển con trỏ, nhấp chọn, kéo thả các đối tượng trên màn hình.',
    options: [
      { key: 'A', content: 'In tài liệu', correct: false },
      { key: 'B', content: 'Di chuyển con trỏ và chọn đối tượng trên màn hình', correct: true },
      { key: 'C', content: 'Nhập văn bản', correct: false },
      { key: 'D', content: 'Lưu file', correct: false },
    ],
  },
  {
    content: 'USB (flash drive) là thiết bị nào?',
    difficulty: 'EASY',
    explanation: 'USB flash drive là thiết bị lưu trữ di động, dùng để sao chép và mang theo dữ liệu.',
    options: [
      { key: 'A', content: 'Thiết bị xử lý', correct: false },
      { key: 'B', content: 'Thiết bị lưu trữ di động', correct: true },
      { key: 'C', content: 'Thiết bị đầu vào', correct: false },
      { key: 'D', content: 'Thiết bị hiển thị', correct: false },
    ],
  },
  {
    content: 'RAM có dung lượng lớn hơn thì máy tính sẽ như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'RAM lớn hơn cho phép mở nhiều chương trình cùng lúc và xử lý dữ liệu nhanh hơn, máy ít bị chậm hơn.',
    options: [
      { key: 'A', content: 'Màn hình sắc nét hơn', correct: false },
      { key: 'B', content: 'Mở được nhiều chương trình hơn, máy chạy nhanh hơn', correct: true },
      { key: 'C', content: 'Internet nhanh hơn', correct: false },
      { key: 'D', content: 'In tài liệu nhanh hơn', correct: false },
    ],
  },
  {
    content: 'Khi máy tính bị mất điện đột ngột, dữ liệu nào có thể bị mất?',
    difficulty: 'MEDIUM',
    explanation: 'Khi mất điện đột ngột, dữ liệu đang làm việc trong RAM (chưa lưu) sẽ bị mất. Dữ liệu đã lưu vào ổ cứng vẫn còn.',
    options: [
      { key: 'A', content: 'Dữ liệu đã lưu trong ổ cứng', correct: false },
      { key: 'B', content: 'Dữ liệu đang xử lý trong RAM chưa lưu', correct: true },
      { key: 'C', content: 'Tất cả dữ liệu', correct: false },
      { key: 'D', content: 'Không mất gì cả', correct: false },
    ],
  },
  // ===== PHẦN MỀM =====
  {
    content: 'Hệ điều hành Windows do công ty nào sản xuất?',
    difficulty: 'EASY',
    explanation: 'Hệ điều hành Windows do Microsoft (Mỹ) sản xuất.',
    options: [
      { key: 'A', content: 'Apple', correct: false },
      { key: 'B', content: 'Google', correct: false },
      { key: 'C', content: 'Microsoft', correct: true },
      { key: 'D', content: 'Samsung', correct: false },
    ],
  },
  {
    content: 'Hệ điều hành là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Hệ điều hành là phần mềm cơ bản nhất, quản lý phần cứng máy tính và tạo môi trường để các phần mềm khác hoạt động.',
    options: [
      { key: 'A', content: 'Phần mềm chơi game', correct: false },
      { key: 'B', content: 'Phần mềm quản lý phần cứng, tạo môi trường cho phần mềm khác', correct: true },
      { key: 'C', content: 'Phần mềm soạn thảo văn bản', correct: false },
      { key: 'D', content: 'Phần mềm duyệt web', correct: false },
    ],
  },
  {
    content: 'Microsoft Word là phần mềm dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Microsoft Word là phần mềm soạn thảo văn bản, dùng để viết, chỉnh sửa và định dạng tài liệu.',
    options: [
      { key: 'A', content: 'Tính toán và lập bảng biểu', correct: false },
      { key: 'B', content: 'Soạn thảo văn bản', correct: true },
      { key: 'C', content: 'Trình bày slide thuyết trình', correct: false },
      { key: 'D', content: 'Duyệt web', correct: false },
    ],
  },
  {
    content: 'Microsoft Excel là phần mềm dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Microsoft Excel là phần mềm bảng tính, dùng để tính toán số liệu, tạo biểu đồ và quản lý dữ liệu.',
    options: [
      { key: 'A', content: 'Soạn thảo văn bản', correct: false },
      { key: 'B', content: 'Tính toán, tạo bảng biểu và biểu đồ', correct: true },
      { key: 'C', content: 'Chỉnh sửa ảnh', correct: false },
      { key: 'D', content: 'Duyệt web', correct: false },
    ],
  },
  {
    content: 'Phần mềm diệt virus dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Phần mềm diệt virus phát hiện và loại bỏ các phần mềm độc hại (virus, trojan, malware) bảo vệ máy tính.',
    options: [
      { key: 'A', content: 'Tăng tốc máy tính', correct: false },
      { key: 'B', content: 'Phát hiện và loại bỏ phần mềm độc hại', correct: true },
      { key: 'C', content: 'Kết nối internet', correct: false },
      { key: 'D', content: 'Dịch văn bản', correct: false },
    ],
  },
  // ===== INTERNET =====
  {
    content: 'Trình duyệt web là gì?',
    difficulty: 'EASY',
    explanation: 'Trình duyệt web là phần mềm dùng để truy cập và xem nội dung trên internet (web).',
    options: [
      { key: 'A', content: 'Phần mềm soạn thảo văn bản', correct: false },
      { key: 'B', content: 'Phần mềm dùng để truy cập và xem nội dung internet', correct: true },
      { key: 'C', content: 'Phần mềm vẽ đồ họa', correct: false },
      { key: 'D', content: 'Phần mềm nghe nhạc', correct: false },
    ],
  },
  {
    content: 'Google Chrome là?',
    difficulty: 'EASY',
    explanation: 'Google Chrome là một trình duyệt web phổ biến do Google phát triển.',
    options: [
      { key: 'A', content: 'Hệ điều hành', correct: false },
      { key: 'B', content: 'Phần mềm diệt virus', correct: false },
      { key: 'C', content: 'Trình duyệt web', correct: true },
      { key: 'D', content: 'Công cụ tìm kiếm', correct: false },
    ],
  },
  {
    content: 'URL là gì?',
    difficulty: 'MEDIUM',
    explanation: 'URL (Uniform Resource Locator) là địa chỉ trang web, ví dụ: https://www.google.com',
    options: [
      { key: 'A', content: 'Tên đăng nhập', correct: false },
      { key: 'B', content: 'Địa chỉ trang web', correct: true },
      { key: 'C', content: 'Mật khẩu', correct: false },
      { key: 'D', content: 'Tên file', correct: false },
    ],
  },
  {
    content: 'Email là gì?',
    difficulty: 'EASY',
    explanation: 'Email (Electronic mail) là thư điện tử, dùng để gửi và nhận tin nhắn qua internet.',
    options: [
      { key: 'A', content: 'Tin nhắn qua điện thoại', correct: false },
      { key: 'B', content: 'Thư điện tử gửi nhận qua internet', correct: true },
      { key: 'C', content: 'Mạng xã hội', correct: false },
      { key: 'D', content: 'Trang web', correct: false },
    ],
  },
  {
    content: 'Công cụ tìm kiếm Google dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Google là công cụ tìm kiếm, giúp người dùng tìm thông tin trên internet bằng cách nhập từ khóa.',
    options: [
      { key: 'A', content: 'Lưu trữ file', correct: false },
      { key: 'B', content: 'Tìm kiếm thông tin trên internet', correct: true },
      { key: 'C', content: 'Soạn thảo văn bản', correct: false },
      { key: 'D', content: 'Dịch thuật', correct: false },
    ],
  },
  {
    content: 'Khi muốn tìm thông tin về "Lịch sử Việt Nam" trên Google, ta gõ gì vào ô tìm kiếm?',
    difficulty: 'EASY',
    explanation: 'Gõ từ khóa "Lịch sử Việt Nam" vào ô tìm kiếm để tìm thông tin liên quan.',
    options: [
      { key: 'A', content: 'www.lichsu.com', correct: false },
      { key: 'B', content: 'Lịch sử Việt Nam (từ khóa)', correct: true },
      { key: 'C', content: 'google.com/lichsu', correct: false },
      { key: 'D', content: 'Không cần gõ gì', correct: false },
    ],
  },
  {
    content: 'Địa chỉ email hợp lệ có dạng như thế nào?',
    difficulty: 'MEDIUM',
    explanation: 'Địa chỉ email hợp lệ có dạng: tên@tên-miền.đuôi, ví dụ: hocsinh@gmail.com.',
    options: [
      { key: 'A', content: 'hocsinh.gmail.com', correct: false },
      { key: 'B', content: 'hocsinh@gmail.com', correct: true },
      { key: 'C', content: 'hocsinh//gmail.com', correct: false },
      { key: 'D', content: 'gmail.com/hocsinh', correct: false },
    ],
  },
  {
    content: 'Wi-Fi dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Wi-Fi là công nghệ kết nối internet không dây, cho phép thiết bị kết nối internet mà không cần dây cáp.',
    options: [
      { key: 'A', content: 'In tài liệu không dây', correct: false },
      { key: 'B', content: 'Kết nối internet không dây', correct: true },
      { key: 'C', content: 'Lưu trữ dữ liệu', correct: false },
      { key: 'D', content: 'Chỉnh sửa ảnh', correct: false },
    ],
  },
  // ===== AN TOÀN THÔNG TIN =====
  {
    content: 'Mật khẩu mạnh nên có đặc điểm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Mật khẩu mạnh nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
    options: [
      { key: 'A', content: 'Chỉ dùng tên mình', correct: false },
      { key: 'B', content: 'Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt', correct: true },
      { key: 'C', content: 'Chỉ gồm số ngày sinh', correct: false },
      { key: 'D', content: 'Càng ngắn càng tốt để dễ nhớ', correct: false },
    ],
  },
  {
    content: 'Khi gặp email lạ yêu cầu nhập thông tin cá nhân, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Không nên nhập thông tin cá nhân vào email lạ vì có thể là lừa đảo (phishing). Cần báo cho người lớn.',
    options: [
      { key: 'A', content: 'Nhập ngay thông tin theo yêu cầu', correct: false },
      { key: 'B', content: 'Không nhập, xóa email và báo người lớn', correct: true },
      { key: 'C', content: 'Chuyển tiếp cho bạn bè', correct: false },
      { key: 'D', content: 'Chia sẻ lên mạng xã hội', correct: false },
    ],
  },
  {
    content: 'Vì sao không nên chia sẻ mật khẩu với bạn bè?',
    difficulty: 'EASY',
    explanation: 'Mật khẩu là thông tin bí mật riêng tư. Chia sẻ mật khẩu có thể dẫn đến việc tài khoản bị lạm dụng hoặc thông tin bị đánh cắp.',
    options: [
      { key: 'A', content: 'Vì bạn bè sẽ biết mật khẩu', correct: false },
      { key: 'B', content: 'Vì tài khoản có thể bị lạm dụng, thông tin bị đánh cắp', correct: true },
      { key: 'C', content: 'Vì bạn bè sẽ quên mật khẩu của mình', correct: false },
      { key: 'D', content: 'Không có vấn đề gì cả', correct: false },
    ],
  },
  {
    content: 'Thông tin nào KHÔNG nên đăng lên mạng xã hội công khai?',
    difficulty: 'MEDIUM',
    explanation: 'Địa chỉ nhà, số điện thoại, thông tin tài chính là những thông tin cá nhân nhạy cảm không nên đăng công khai.',
    options: [
      { key: 'A', content: 'Ảnh phong cảnh đẹp', correct: false },
      { key: 'B', content: 'Bài hát yêu thích', correct: false },
      { key: 'C', content: 'Địa chỉ nhà và số điện thoại cá nhân', correct: true },
      { key: 'D', content: 'Sở thích đọc sách', correct: false },
    ],
  },
  {
    content: 'Virus máy tính là gì?',
    difficulty: 'MEDIUM',
    explanation: 'Virus máy tính là phần mềm độc hại, tự nhân bản và lây lan, có thể phá hủy dữ liệu hoặc làm hỏng hệ thống.',
    options: [
      { key: 'A', content: 'Phần mềm hệ thống', correct: false },
      { key: 'B', content: 'Phần mềm độc hại tự nhân bản, gây hại cho máy tính', correct: true },
      { key: 'C', content: 'Chương trình diệt virus', correct: false },
      { key: 'D', content: 'Bản cập nhật phần mềm', correct: false },
    ],
  },
  {
    content: 'Để bảo vệ máy tính khỏi virus, ta nên làm gì?',
    difficulty: 'EASY',
    explanation: 'Cài phần mềm diệt virus, cập nhật thường xuyên, không tải file lạ và không mở email đáng ngờ.',
    options: [
      { key: 'A', content: 'Không bao giờ tắt máy tính', correct: false },
      { key: 'B', content: 'Cài phần mềm diệt virus và cập nhật thường xuyên', correct: true },
      { key: 'C', content: 'Không kết nối internet', correct: false },
      { key: 'D', content: 'Chỉ chơi game', correct: false },
    ],
  },
  // ===== SOẠN THẢO VĂN BẢN =====
  {
    content: 'Phím tắt nào dùng để in đậm chữ trong Microsoft Word?',
    difficulty: 'MEDIUM',
    explanation: 'Ctrl + B (Bold) là phím tắt để in đậm văn bản trong Word.',
    options: [
      { key: 'A', content: 'Ctrl + I', correct: false },
      { key: 'B', content: 'Ctrl + U', correct: false },
      { key: 'C', content: 'Ctrl + B', correct: true },
      { key: 'D', content: 'Ctrl + D', correct: false },
    ],
  },
  {
    content: 'Phím tắt nào dùng để in nghiêng chữ?',
    difficulty: 'MEDIUM',
    explanation: 'Ctrl + I (Italic) là phím tắt để in nghiêng văn bản.',
    options: [
      { key: 'A', content: 'Ctrl + B', correct: false },
      { key: 'B', content: 'Ctrl + I', correct: true },
      { key: 'C', content: 'Ctrl + U', correct: false },
      { key: 'D', content: 'Ctrl + N', correct: false },
    ],
  },
  {
    content: 'Phím tắt nào dùng để gạch chân chữ?',
    difficulty: 'MEDIUM',
    explanation: 'Ctrl + U (Underline) là phím tắt để gạch chân văn bản.',
    options: [
      { key: 'A', content: 'Ctrl + B', correct: false },
      { key: 'B', content: 'Ctrl + I', correct: false },
      { key: 'C', content: 'Ctrl + U', correct: true },
      { key: 'D', content: 'Ctrl + G', correct: false },
    ],
  },
  {
    content: 'Phím tắt Ctrl + S dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Ctrl + S là phím tắt để lưu file (Save).',
    options: [
      { key: 'A', content: 'Mở file mới', correct: false },
      { key: 'B', content: 'Lưu file', correct: true },
      { key: 'C', content: 'Sao chép', correct: false },
      { key: 'D', content: 'Dán', correct: false },
    ],
  },
  {
    content: 'Phím tắt Ctrl + C dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Ctrl + C là phím tắt để Copy (sao chép) văn bản hoặc đối tượng đang chọn.',
    options: [
      { key: 'A', content: 'Cắt (Cut)', correct: false },
      { key: 'B', content: 'Dán (Paste)', correct: false },
      { key: 'C', content: 'Sao chép (Copy)', correct: true },
      { key: 'D', content: 'Lưu (Save)', correct: false },
    ],
  },
  {
    content: 'Phím tắt Ctrl + V dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Ctrl + V là phím tắt để Paste (dán) nội dung đã sao chép hoặc cắt.',
    options: [
      { key: 'A', content: 'Sao chép (Copy)', correct: false },
      { key: 'B', content: 'Cắt (Cut)', correct: false },
      { key: 'C', content: 'Dán (Paste)', correct: true },
      { key: 'D', content: 'In (Print)', correct: false },
    ],
  },
  {
    content: 'Phím tắt Ctrl + Z dùng để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Ctrl + Z là phím tắt để Undo (hoàn tác), đưa về trạng thái trước khi thực hiện lệnh vừa làm.',
    options: [
      { key: 'A', content: 'Lưu file', correct: false },
      { key: 'B', content: 'Hoàn tác (Undo)', correct: true },
      { key: 'C', content: 'Thoát chương trình', correct: false },
      { key: 'D', content: 'Phóng to', correct: false },
    ],
  },
  {
    content: 'Phím tắt Ctrl + A dùng để làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Ctrl + A là phím tắt để Select All (chọn tất cả) nội dung trong tài liệu.',
    options: [
      { key: 'A', content: 'Lưu file', correct: false },
      { key: 'B', content: 'Chọn tất cả', correct: true },
      { key: 'C', content: 'Thêm ảnh', correct: false },
      { key: 'D', content: 'Định dạng chữ', correct: false },
    ],
  },
  {
    content: 'Muốn tăng cỡ chữ trong Word, ta thực hiện như thế nào?',
    difficulty: 'EASY',
    explanation: 'Chọn văn bản cần thay đổi, sau đó tăng số trong ô Font Size (cỡ chữ) trên thanh công cụ.',
    options: [
      { key: 'A', content: 'Nhấn phím Space nhiều lần', correct: false },
      { key: 'B', content: 'Chọn văn bản và tăng số trong ô Font Size', correct: true },
      { key: 'C', content: 'Dùng Ctrl + B', correct: false },
      { key: 'D', content: 'Nhấn phím Enter', correct: false },
    ],
  },
  {
    content: 'Khi muốn in tài liệu, ta nhấn phím tắt nào?',
    difficulty: 'EASY',
    explanation: 'Ctrl + P là phím tắt để in (Print) tài liệu.',
    options: [
      { key: 'A', content: 'Ctrl + S', correct: false },
      { key: 'B', content: 'Ctrl + P', correct: true },
      { key: 'C', content: 'Ctrl + O', correct: false },
      { key: 'D', content: 'Ctrl + N', correct: false },
    ],
  },
  // ===== TỔNG HỢP =====
  {
    content: 'Khi gặp thông tin tiêu cực hoặc nội dung xấu trên mạng, em nên làm gì?',
    difficulty: 'MEDIUM',
    explanation: 'Nên báo ngay cho cha mẹ hoặc thầy cô, không nên chia sẻ hoặc bình luận nội dung xấu.',
    options: [
      { key: 'A', content: 'Chia sẻ cho bạn bè xem', correct: false },
      { key: 'B', content: 'Báo cho cha mẹ hoặc thầy cô', correct: true },
      { key: 'C', content: 'Lưu lại để xem sau', correct: false },
      { key: 'D', content: 'Bình luận vào', correct: false },
    ],
  },
  {
    content: 'Desktop (màn hình nền) trong Windows là gì?',
    difficulty: 'EASY',
    explanation: 'Desktop là màn hình chính khi mở máy tính, nơi hiển thị các biểu tượng ứng dụng, thư mục và thanh taskbar.',
    options: [
      { key: 'A', content: 'Màn hình bên trong máy tính', correct: false },
      { key: 'B', content: 'Màn hình chính xuất hiện sau khi khởi động Windows', correct: true },
      { key: 'C', content: 'Ổ cứng của máy tính', correct: false },
      { key: 'D', content: 'Màn hình của điện thoại', correct: false },
    ],
  },
  {
    content: 'Để mở chương trình trên Desktop, ta thực hiện thao tác nào?',
    difficulty: 'EASY',
    explanation: 'Nhấp đúp (double-click) chuột vào biểu tượng chương trình trên Desktop để mở chương trình đó.',
    options: [
      { key: 'A', content: 'Nhấp một lần chuột trái', correct: false },
      { key: 'B', content: 'Nhấp đúp (double-click) chuột trái vào biểu tượng', correct: true },
      { key: 'C', content: 'Nhấp chuột phải', correct: false },
      { key: 'D', content: 'Kéo chuột qua biểu tượng', correct: false },
    ],
  },
  {
    content: 'Khi muốn tắt máy tính đúng cách trong Windows, ta làm gì?',
    difficulty: 'EASY',
    explanation: 'Tắt máy đúng cách bằng cách nhấn nút Start → Power → Shut down. Không nên tắt nguồn điện trực tiếp.',
    options: [
      { key: 'A', content: 'Rút phích cắm điện ngay', correct: false },
      { key: 'B', content: 'Nhấn nút Start → Power → Shut down', correct: true },
      { key: 'C', content: 'Đóng tất cả cửa sổ rồi tắt nguồn', correct: false },
      { key: 'D', content: 'Nhấn nút Reset', correct: false },
    ],
  },
  {
    content: 'Thư mục (Folder) dùng để làm gì trong máy tính?',
    difficulty: 'EASY',
    explanation: 'Thư mục (Folder) dùng để sắp xếp và chứa các file, giúp quản lý dữ liệu gọn gàng hơn.',
    options: [
      { key: 'A', content: 'Chạy chương trình', correct: false },
      { key: 'B', content: 'Chứa và sắp xếp các file', correct: true },
      { key: 'C', content: 'Kết nối internet', correct: false },
      { key: 'D', content: 'In tài liệu', correct: false },
    ],
  },
  {
    content: 'File có đuôi .jpg thường là loại file gì?',
    difficulty: 'MEDIUM',
    explanation: 'File .jpg (hoặc .jpeg) là file ảnh, định dạng ảnh phổ biến nhất.',
    options: [
      { key: 'A', content: 'File văn bản', correct: false },
      { key: 'B', content: 'File ảnh', correct: true },
      { key: 'C', content: 'File âm thanh', correct: false },
      { key: 'D', content: 'File video', correct: false },
    ],
  },
  {
    content: 'File có đuôi .mp3 thường là loại file gì?',
    difficulty: 'MEDIUM',
    explanation: 'File .mp3 là file âm thanh (nhạc).',
    options: [
      { key: 'A', content: 'File ảnh', correct: false },
      { key: 'B', content: 'File video', correct: false },
      { key: 'C', content: 'File âm thanh', correct: true },
      { key: 'D', content: 'File văn bản', correct: false },
    ],
  },
  {
    content: 'Thao tác "Copy-Paste" dùng để làm gì?',
    difficulty: 'EASY',
    explanation: 'Copy-Paste (Ctrl+C rồi Ctrl+V) dùng để sao chép nội dung từ vị trí này sang vị trí khác, bản gốc vẫn còn.',
    options: [
      { key: 'A', content: 'Xóa nội dung đã chọn', correct: false },
      { key: 'B', content: 'Sao chép nội dung từ nơi này sang nơi khác', correct: true },
      { key: 'C', content: 'Lưu file', correct: false },
      { key: 'D', content: 'Tìm kiếm từ trong văn bản', correct: false },
    ],
  },
  {
    content: 'Tại sao cần cập nhật (update) phần mềm thường xuyên?',
    difficulty: 'MEDIUM',
    explanation: 'Cập nhật phần mềm giúp vá các lỗ hổng bảo mật, thêm tính năng mới và sửa lỗi, bảo vệ máy tính tốt hơn.',
    options: [
      { key: 'A', content: 'Để máy tính chạy chậm hơn', correct: false },
      { key: 'B', content: 'Để vá lỗ hổng bảo mật và sửa lỗi', correct: true },
      { key: 'C', content: 'Để xóa dữ liệu cũ', correct: false },
      { key: 'D', content: 'Không cần thiết', correct: false },
    ],
  },
  {
    content: 'Thời gian sử dụng máy tính, điện thoại hợp lý cho học sinh lớp 5 là bao nhiêu?',
    difficulty: 'EASY',
    explanation: 'Học sinh lớp 5 không nên dùng màn hình quá 1-2 tiếng/ngày (không phục vụ học tập). Cần nghỉ mắt sau mỗi 30-40 phút.',
    options: [
      { key: 'A', content: 'Cả ngày không nghỉ', correct: false },
      { key: 'B', content: 'Giới hạn 1-2 tiếng/ngày (không phục vụ học tập)', correct: true },
      { key: 'C', content: 'Không giới hạn, tùy thích', correct: false },
      { key: 'D', content: 'Chỉ dùng 5 phút mỗi ngày', correct: false },
    ],
  },
  { content: 'Trong Microsoft Word, để tạo bảng (table) ta dùng menu nào?', difficulty: 'MEDIUM', explanation: 'Để chèn bảng trong Word, vào menu Insert > Table và chọn số hàng, cột cần thiết.', options: [{ key: 'A', content: 'File', correct: false }, { key: 'B', content: 'Insert (Chèn)', correct: true }, { key: 'C', content: 'View (Xem)', correct: false }, { key: 'D', content: 'Home (Trang đầu)', correct: false }] },
  { content: 'Phím nào dùng để xóa ký tự bên PHẢI con trỏ?', difficulty: 'EASY', explanation: 'Phím Delete xóa ký tự bên phải con trỏ. Phím Backspace xóa ký tự bên trái con trỏ.', options: [{ key: 'A', content: 'Backspace', correct: false }, { key: 'B', content: 'Delete', correct: true }, { key: 'C', content: 'Enter', correct: false }, { key: 'D', content: 'Esc', correct: false }] },
  { content: 'Phím tắt nào để chuyển từ cửa sổ ứng dụng này sang ứng dụng khác?', difficulty: 'MEDIUM', explanation: 'Alt + Tab là phím tắt để chuyển đổi giữa các ứng dụng đang chạy trên Windows.', options: [{ key: 'A', content: 'Ctrl + Tab', correct: false }, { key: 'B', content: 'Alt + Tab', correct: true }, { key: 'C', content: 'Shift + Tab', correct: false }, { key: 'D', content: 'Windows + Tab', correct: false }] },
  { content: 'Trong Windows, thư mục (folder) dùng để làm gì?', difficulty: 'EASY', explanation: 'Thư mục (folder) dùng để tổ chức và lưu trữ các file theo nhóm, giúp dễ tìm kiếm và quản lý.', options: [{ key: 'A', content: 'Chạy chương trình', correct: false }, { key: 'B', content: 'Tổ chức và chứa các file', correct: true }, { key: 'C', content: 'Kết nối internet', correct: false }, { key: 'D', content: 'In tài liệu', correct: false }] },
  { content: 'Đuôi file (extension) .jpg thường là loại file gì?', difficulty: 'EASY', explanation: 'File .jpg (JPEG) là định dạng ảnh phổ biến nhất. Ảnh chụp từ điện thoại, máy ảnh thường lưu dạng .jpg.', options: [{ key: 'A', content: 'File văn bản', correct: false }, { key: 'B', content: 'File ảnh', correct: true }, { key: 'C', content: 'File âm nhạc', correct: false }, { key: 'D', content: 'File video', correct: false }] },
  { content: 'Đuôi file .mp3 là loại file gì?', difficulty: 'EASY', explanation: 'File .mp3 là định dạng âm thanh (nhạc) nén phổ biến nhất.', options: [{ key: 'A', content: 'File ảnh', correct: false }, { key: 'B', content: 'File âm thanh', correct: true }, { key: 'C', content: 'File video', correct: false }, { key: 'D', content: 'File văn bản', correct: false }] },
  { content: 'Thanh công cụ (toolbar) trong phần mềm giúp ích gì?', difficulty: 'EASY', explanation: 'Thanh công cụ (toolbar) chứa các nút bấm (icon) để truy cập nhanh các chức năng thường dùng.', options: [{ key: 'A', content: 'Hiển thị nội dung file', correct: false }, { key: 'B', content: 'Truy cập nhanh các chức năng thường dùng', correct: true }, { key: 'C', content: 'Kết nối với máy in', correct: false }, { key: 'D', content: 'Tắt máy tính', correct: false }] },
  { content: 'Trong Excel, ô A1 có nghĩa là gì?', difficulty: 'MEDIUM', explanation: 'Trong Excel, A1 là địa chỉ ô nằm ở cột A, hàng 1 - ô đầu tiên phía trên bên trái của bảng tính.', options: [{ key: 'A', content: 'Ô số 1 của file', correct: false }, { key: 'B', content: 'Ô ở cột A, hàng 1', correct: true }, { key: 'C', content: 'Ô đặc biệt của Excel', correct: false }, { key: 'D', content: 'Tên của bảng tính', correct: false }] },
  { content: 'Trong Excel, để tính tổng các ô từ A1 đến A5 ta dùng công thức nào?', difficulty: 'MEDIUM', explanation: 'Công thức =SUM(A1:A5) tính tổng các giá trị từ ô A1 đến A5 trong Excel.', options: [{ key: 'A', content: '=TOTAL(A1:A5)', correct: false }, { key: 'B', content: '=SUM(A1:A5)', correct: true }, { key: 'C', content: '=ADD(A1,A5)', correct: false }, { key: 'D', content: '=COUNT(A1:A5)', correct: false }] },
  { content: 'Khi máy tính bị "treo" (không phản hồi), cách xử lý đầu tiên nên làm là gì?', difficulty: 'MEDIUM', explanation: 'Khi máy treo, dùng Ctrl+Alt+Delete để mở Task Manager, tìm ứng dụng không phản hồi và kết thúc tiến trình đó.', options: [{ key: 'A', content: 'Rút điện ngay lập tức', correct: false }, { key: 'B', content: 'Nhấn Ctrl+Alt+Delete để mở Task Manager', correct: true }, { key: 'C', content: 'Đập vào màn hình', correct: false }, { key: 'D', content: 'Chờ vĩnh viễn', correct: false }] },
  { content: 'Tác dụng của phần mềm diệt virus là gì?', difficulty: 'EASY', explanation: 'Phần mềm diệt virus (antivirus) quét và loại bỏ virus, phần mềm độc hại khỏi máy tính, bảo vệ dữ liệu.', options: [{ key: 'A', content: 'Tăng tốc độ máy tính', correct: false }, { key: 'B', content: 'Phát hiện và diệt virus, bảo vệ máy tính', correct: true }, { key: 'C', content: 'Chỉnh màu sắc màn hình', correct: false }, { key: 'D', content: 'Kết nối wifi', correct: false }] },
  { content: 'Wifi là gì?', difficulty: 'EASY', explanation: 'Wifi (Wireless Fidelity) là công nghệ kết nối internet không dây, cho phép thiết bị kết nối mạng mà không cần dây cáp.', options: [{ key: 'A', content: 'Một loại máy tính', correct: false }, { key: 'B', content: 'Kết nối internet không dây', correct: true }, { key: 'C', content: 'Một trang web', correct: false }, { key: 'D', content: 'Một phần mềm diệt virus', correct: false }] },
  { content: 'Để tìm kiếm thông tin trên internet, ta dùng công cụ nào?', difficulty: 'EASY', explanation: 'Công cụ tìm kiếm (search engine) như Google, Bing giúp tìm thông tin trên internet.', options: [{ key: 'A', content: 'Microsoft Word', correct: false }, { key: 'B', content: 'Google (công cụ tìm kiếm)', correct: true }, { key: 'C', content: 'Paint', correct: false }, { key: 'D', content: 'Calculator', correct: false }] },
  { content: 'Khi nhận email lạ có tệp đính kèm, ta nên làm gì?', difficulty: 'MEDIUM', explanation: 'Không mở tệp đính kèm từ email lạ vì có thể chứa virus hay phần mềm độc hại. Cần xóa hoặc báo cáo spam.', options: [{ key: 'A', content: 'Mở ngay để xem nội dung', correct: false }, { key: 'B', content: 'Không mở, xóa hoặc báo cáo spam', correct: true }, { key: 'C', content: 'Gửi cho tất cả bạn bè', correct: false }, { key: 'D', content: 'Lưu vào máy tính', correct: false }] },
  { content: 'Tên miền (domain name) của website là gì?', difficulty: 'MEDIUM', explanation: 'Tên miền là địa chỉ duy nhất của website trên internet (ví dụ: google.com, youtube.com).', options: [{ key: 'A', content: 'Tên người tạo ra website', correct: false }, { key: 'B', content: 'Địa chỉ duy nhất của website trên internet', correct: true }, { key: 'C', content: 'Mật khẩu đăng nhập website', correct: false }, { key: 'D', content: 'Nội dung của website', correct: false }] },
  { content: 'Trong soạn thảo văn bản, căn lề trái (Align Left) là gì?', difficulty: 'EASY', explanation: 'Căn lề trái là bố cục văn bản trong đó tất cả các dòng đều thẳng hàng với lề bên trái.', options: [{ key: 'A', content: 'Văn bản nằm giữa trang', correct: false }, { key: 'B', content: 'Văn bản thẳng hàng bên lề trái', correct: true }, { key: 'C', content: 'Văn bản thẳng hàng cả hai lề', correct: false }, { key: 'D', content: 'Văn bản thẳng hàng bên lề phải', correct: false }] },
  { content: 'Phím tắt Ctrl+F trong hầu hết các phần mềm dùng để làm gì?', difficulty: 'MEDIUM', explanation: 'Ctrl+F mở hộp thoại Tìm kiếm (Find) trong hầu hết các ứng dụng như Word, trình duyệt web.', options: [{ key: 'A', content: 'Mở file mới', correct: false }, { key: 'B', content: 'Tìm kiếm (Find)', correct: true }, { key: 'C', content: 'Lưu file', correct: false }, { key: 'D', content: 'In tài liệu', correct: false }] },
  { content: 'RAM trong máy tính có tác dụng gì?', difficulty: 'MEDIUM', explanation: 'RAM (Random Access Memory) là bộ nhớ tạm thời lưu trữ dữ liệu đang dùng. RAM càng lớn, máy tính chạy càng mượt.', options: [{ key: 'A', content: 'Lưu trữ dữ liệu vĩnh viễn', correct: false }, { key: 'B', content: 'Bộ nhớ tạm thời khi máy đang hoạt động', correct: true }, { key: 'C', content: 'Hiển thị hình ảnh', correct: false }, { key: 'D', content: 'Kết nối internet', correct: false }] },
  { content: 'Ổ cứng SSD khác ổ cứng HDD ở điểm gì?', difficulty: 'HARD', explanation: 'SSD (Solid State Drive) không có bộ phận cơ học, đọc/ghi dữ liệu nhanh hơn, bền hơn HDD (Hard Disk Drive) truyền thống.', options: [{ key: 'A', content: 'SSD chứa được nhiều dữ liệu hơn', correct: false }, { key: 'B', content: 'SSD nhanh hơn, không có bộ phận cơ học', correct: true }, { key: 'C', content: 'SSD rẻ hơn HDD', correct: false }, { key: 'D', content: 'SSD cần nguồn điện lớn hơn', correct: false }] },
  { content: 'Bàn phím số (Numpad) ở góc phải bàn phím dùng để làm gì?', difficulty: 'EASY', explanation: 'Bàn phím số (Numpad) giúp nhập các con số nhanh hơn, thường dùng trong kế toán, nhập liệu số liệu.', options: [{ key: 'A', content: 'Nhập chữ cái', correct: false }, { key: 'B', content: 'Nhập số nhanh hơn', correct: true }, { key: 'C', content: 'Điều khiển chuột', correct: false }, { key: 'D', content: 'Thao tác với menu', correct: false }] },
  { content: 'Máy chiếu (projector) kết nối với máy tính để làm gì?', difficulty: 'EASY', explanation: 'Máy chiếu phóng to hình ảnh từ màn hình máy tính lên màn chiếu lớn, dùng trong thuyết trình, giảng dạy.', options: [{ key: 'A', content: 'In tài liệu', correct: false }, { key: 'B', content: 'Phóng to hình ảnh lên màn chiếu', correct: true }, { key: 'C', content: 'Lưu trữ dữ liệu', correct: false }, { key: 'D', content: 'Kết nối internet', correct: false }] },
  { content: 'Phần mềm Paint trong Windows dùng để làm gì?', difficulty: 'EASY', explanation: 'Paint là phần mềm vẽ đơn giản có sẵn trong Windows, dùng để vẽ tranh, chỉnh sửa ảnh cơ bản.', options: [{ key: 'A', content: 'Soạn thảo văn bản', correct: false }, { key: 'B', content: 'Vẽ tranh và chỉnh sửa ảnh', correct: true }, { key: 'C', content: 'Nghe nhạc', correct: false }, { key: 'D', content: 'Lướt internet', correct: false }] },
  { content: 'Trong Word, để thay đổi kích thước chữ (font size) ta làm gì?', difficulty: 'EASY', explanation: 'Chọn đoạn văn cần đổi, sau đó chọn số kích thước trong hộp font size trên thanh công cụ Home.', options: [{ key: 'A', content: 'Vào File > Save', correct: false }, { key: 'B', content: 'Chọn kích thước trong hộp font size trên Home', correct: true }, { key: 'C', content: 'Vào View > Zoom', correct: false }, { key: 'D', content: 'Nhấn Ctrl+Enter', correct: false }] },
  { content: 'Ứng dụng nào sau đây không phải trình duyệt web?', difficulty: 'MEDIUM', explanation: 'Winrar là phần mềm nén/giải nén file, không phải trình duyệt web. Chrome, Firefox, Edge là trình duyệt.', options: [{ key: 'A', content: 'Google Chrome', correct: false }, { key: 'B', content: 'Mozilla Firefox', correct: false }, { key: 'C', content: 'WinRAR', correct: true }, { key: 'D', content: 'Microsoft Edge', correct: false }] },
  { content: 'Khi nhập văn bản, phím Enter dùng để làm gì?', difficulty: 'EASY', explanation: 'Phím Enter kết thúc đoạn văn hiện tại và xuống dòng mới (tạo đoạn văn mới).', options: [{ key: 'A', content: 'Xóa ký tự', correct: false }, { key: 'B', content: 'Xuống dòng / tạo đoạn văn mới', correct: true }, { key: 'C', content: 'Lưu file', correct: false }, { key: 'D', content: 'Thoát chương trình', correct: false }] },
  { content: 'Thông tin cá nhân nào KHÔNG nên chia sẻ trên mạng xã hội?', difficulty: 'MEDIUM', explanation: 'Địa chỉ nhà và số điện thoại là thông tin nhạy cảm, không nên chia sẻ công khai để bảo vệ an toàn bản thân.', options: [{ key: 'A', content: 'Tên gọi yêu thích', correct: false }, { key: 'B', content: 'Địa chỉ nhà và số điện thoại', correct: true }, { key: 'C', content: 'Màu sắc yêu thích', correct: false }, { key: 'D', content: 'Môn học ưa thích', correct: false }] },
  { content: 'Mạng LAN (Local Area Network) là gì?', difficulty: 'HARD', explanation: 'Mạng LAN là mạng cục bộ kết nối các thiết bị trong một khu vực nhỏ như phòng học, văn phòng, trường học.', options: [{ key: 'A', content: 'Mạng kết nối toàn thế giới', correct: false }, { key: 'B', content: 'Mạng cục bộ trong khu vực nhỏ', correct: true }, { key: 'C', content: 'Mạng không dây duy nhất', correct: false }, { key: 'D', content: 'Tên một phần mềm', correct: false }] },
  { content: 'Khi gõ văn bản, phím Caps Lock dùng để làm gì?', difficulty: 'EASY', explanation: 'Phím Caps Lock bật/tắt chế độ gõ chữ HOA. Khi đèn Caps Lock sáng, mọi chữ gõ ra đều là chữ hoa.', options: [{ key: 'A', content: 'Xóa toàn bộ văn bản', correct: false }, { key: 'B', content: 'Bật/tắt chế độ gõ chữ hoa', correct: true }, { key: 'C', content: 'Lưu file', correct: false }, { key: 'D', content: 'Chuyển ngôn ngữ bàn phím', correct: false }] },
  { content: 'Máy tính bảng (tablet) khác laptop ở điểm chính nào?', difficulty: 'MEDIUM', explanation: 'Máy tính bảng thường không có bàn phím vật lý, màn hình cảm ứng, nhỏ gọn và pin lâu hơn laptop.', options: [{ key: 'A', content: 'Tablet mạnh hơn laptop', correct: false }, { key: 'B', content: 'Tablet dùng màn hình cảm ứng, không có bàn phím vật lý', correct: true }, { key: 'C', content: 'Tablet kết nối internet nhanh hơn', correct: false }, { key: 'D', content: 'Tablet không thể dùng app', correct: false }] },
  { content: 'Phần mềm hệ thống (operating system) như Windows có vai trò gì?', difficulty: 'MEDIUM', explanation: 'Hệ điều hành (OS) quản lý phần cứng, cung cấp giao diện cho người dùng và nền tảng để các phần mềm khác chạy.', options: [{ key: 'A', content: 'Chỉ để chơi game', correct: false }, { key: 'B', content: 'Quản lý phần cứng và cung cấp nền tảng cho phần mềm', correct: true }, { key: 'C', content: 'Chỉ để kết nối internet', correct: false }, { key: 'D', content: 'Chỉ lưu trữ file', correct: false }] },
  { content: 'Phím tắt nào mở hộp thoại "Tìm và Thay thế" (Find & Replace) trong Word?', difficulty: 'MEDIUM', explanation: 'Ctrl+H mở hộp thoại Find & Replace (Tìm và Thay thế) trong Word, giúp tìm một từ và thay thế bằng từ khác.', options: [{ key: 'A', content: 'Ctrl+F', correct: false }, { key: 'B', content: 'Ctrl+H', correct: true }, { key: 'C', content: 'Ctrl+R', correct: false }, { key: 'D', content: 'Ctrl+G', correct: false }] },
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
