const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: 'sub-tinhoc',
      gradeId: 'grade-5',
      topicId: data.topicId,
      difficulty: data.d,
      questionType: 'MULTIPLE_CHOICE',
      status: 'ACTIVE',
      createdById: 'user-admin',
      explanation: data.exp || `Đáp án: ${data.ans}`,
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

async function main() {
  console.log('Tạo câu hỏi Tin học lớp 5...');

  // =========================================================
  // TOPIC 1: Thông tin và xã hội (15 câu)
  // topicId: cmt5s5b16001397l0jfuoiiam
  // EASY x6, MEDIUM x6, HARD x3
  // =========================================================

  // --- EASY ---
  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Thông tin là gì?',
    opts: [
      'Những hiểu biết, dữ liệu mang lại sự hiểu biết cho con người',
      'Chỉ là các con số và ký tự',
      'Các bức ảnh và video',
      'Chỉ là văn bản viết tay',
    ],
    ans: 'A',
    exp: 'Thông tin là những hiểu biết, dữ liệu giúp con người hiểu về thế giới xung quanh.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Dạng thông tin nào dưới đây là dạng thông tin âm thanh?',
    opts: [
      'Bức ảnh phong cảnh',
      'Tiếng nhạc phát ra từ loa',
      'Bảng số liệu thống kê',
      'Đoạn văn bản trong sách',
    ],
    ans: 'B',
    exp: 'Thông tin âm thanh là thông tin được truyền qua âm thanh, ví dụ như tiếng nhạc.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Đâu là ví dụ về thông tin dạng hình ảnh?',
    opts: [
      'Bài hát trên radio',
      'Câu chuyện kể miệng',
      'Bức tranh vẽ phong cảnh',
      'Tiếng gõ cửa',
    ],
    ans: 'C',
    exp: 'Thông tin hình ảnh là thông tin thể hiện qua hình ảnh như tranh, ảnh.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Công dân số là người như thế nào?',
    opts: [
      'Người không biết sử dụng máy tính',
      'Người sử dụng công nghệ số một cách an toàn và có trách nhiệm',
      'Người chỉ dùng điện thoại để chơi game',
      'Người chuyên sửa chữa máy tính',
    ],
    ans: 'B',
    exp: 'Công dân số là người sử dụng công nghệ số một cách an toàn, có trách nhiệm và đạo đức.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Khi nhận được thông tin trên mạng, em nên làm gì trước tiên?',
    opts: [
      'Chia sẻ ngay cho tất cả bạn bè',
      'Kiểm tra xem thông tin có đáng tin cậy không',
      'Xóa đi không đọc',
      'In ra giấy để lưu lại',
    ],
    ans: 'B',
    exp: 'Cần kiểm tra độ tin cậy của thông tin trước khi chia sẻ để tránh phát tán thông tin sai.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'EASY',
    q: 'Bản quyền tác giả là gì?',
    opts: [
      'Quyền được sao chép tất cả các tác phẩm',
      'Quyền của người tạo ra tác phẩm được bảo vệ tác phẩm của mình',
      'Quyền được xem mọi nội dung trên mạng',
      'Quyền sử dụng máy tính miễn phí',
    ],
    ans: 'B',
    exp: 'Bản quyền tác giả bảo vệ quyền lợi của người tạo ra tác phẩm như sách, nhạc, phần mềm.',
  });

  // --- MEDIUM ---
  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Quá trình xử lý thông tin gồm các bước theo thứ tự nào?',
    opts: [
      'Xử lý → Thu thập → Lưu trữ → Truyền thông tin',
      'Thu thập → Xử lý → Lưu trữ → Truyền thông tin',
      'Lưu trữ → Thu thập → Xử lý → Truyền thông tin',
      'Truyền thông tin → Lưu trữ → Xử lý → Thu thập',
    ],
    ans: 'B',
    exp: 'Quá trình xử lý thông tin: Thu thập → Xử lý → Lưu trữ → Truyền thông tin.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Hành động nào dưới đây vi phạm quyền riêng tư của người khác?',
    opts: [
      'Hỏi bạn về sở thích học tập',
      'Tự ý đọc tin nhắn riêng tư của bạn trên điện thoại',
      'Gửi email chúc mừng sinh nhật bạn',
      'Chia sẻ bài hát hay với bạn',
    ],
    ans: 'B',
    exp: 'Tự ý đọc tin nhắn riêng tư của người khác là vi phạm quyền riêng tư cá nhân.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Tin giả (fake news) là gì?',
    opts: [
      'Tin tức được đăng trên báo điện tử',
      'Thông tin không chính xác hoặc bịa đặt được lan truyền nhằm gây nhầm lẫn',
      'Tin tức về khoa học công nghệ',
      'Thông tin được dịch từ tiếng nước ngoài',
    ],
    ans: 'B',
    exp: 'Tin giả là thông tin sai sự thật hoặc bịa đặt, được phát tán để gây nhầm lẫn hoặc kích động.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Để bảo vệ thông tin cá nhân, em không nên làm gì?',
    opts: [
      'Đặt mật khẩu mạnh cho tài khoản',
      'Chia sẻ số điện thoại và địa chỉ nhà cho người lạ trên mạng',
      'Đăng xuất khỏi tài khoản khi dùng máy tính công cộng',
      'Không mở email từ người lạ',
    ],
    ans: 'B',
    exp: 'Không nên chia sẻ thông tin cá nhân như số điện thoại, địa chỉ cho người lạ trên mạng.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Khi phát hiện một bài viết có thể là tin giả, em nên làm gì?',
    opts: [
      'Ngay lập tức chia sẻ để cảnh báo mọi người',
      'Kiểm tra từ nhiều nguồn tin cậy trước khi tin và chia sẻ',
      'Bình luận bênh vực nội dung đó',
      'Lưu lại để đọc sau',
    ],
    ans: 'B',
    exp: 'Cần kiểm tra thông tin từ nhiều nguồn đáng tin cậy trước khi tin tưởng và chia sẻ.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'MEDIUM',
    q: 'Hành động nào thể hiện trách nhiệm của công dân số?',
    opts: [
      'Sao chép toàn bộ bài văn của bạn để nộp cho thầy giáo',
      'Tôn trọng bản quyền, không sao chép tác phẩm người khác khi chưa được phép',
      'Đăng ảnh của bạn mình lên mạng mà không hỏi ý kiến',
      'Sử dụng tên giả để bình luận tiêu cực về người khác',
    ],
    ans: 'B',
    exp: 'Tôn trọng bản quyền là một trong những trách nhiệm cơ bản của công dân số.',
  });

  // --- HARD ---
  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'HARD',
    q: 'Trong xã hội thông tin, thông tin được coi là một loại tài nguyên vì lý do nào sau đây?',
    opts: [
      'Thông tin có thể được in ra giấy',
      'Thông tin có giá trị, có thể tạo ra lợi ích kinh tế và xã hội khi được khai thác đúng cách',
      'Thông tin chỉ tồn tại trên máy tính',
      'Thông tin luôn miễn phí và không cần bảo vệ',
    ],
    ans: 'B',
    exp: 'Thông tin là tài nguyên vì nó có giá trị, có thể tạo ra lợi ích khi được thu thập, xử lý và sử dụng đúng cách.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'HARD',
    q: 'Một bạn học sinh tải nhạc về máy tính để nghe mà không trả phí dù bài hát đó được bảo vệ bản quyền. Hành động này được gọi là gì?',
    opts: [
      'Sử dụng hợp pháp',
      'Vi phạm bản quyền',
      'Chia sẻ cộng đồng',
      'Sử dụng giáo dục',
    ],
    ans: 'B',
    exp: 'Tải nhạc có bản quyền mà không trả phí hoặc được phép là vi phạm bản quyền tác giả.',
  });

  await createQ({
    topicId: 'cmt5s5b16001397l0jfuoiiam',
    d: 'HARD',
    q: 'Điều nào sau đây KHÔNG phải là đặc điểm của thông tin số so với thông tin truyền thống?',
    opts: [
      'Thông tin số có thể được sao chép và truyền đi rất nhanh',
      'Thông tin số dễ dàng tìm kiếm và tra cứu',
      'Thông tin số không bao giờ bị sai hoặc bị chỉnh sửa',
      'Thông tin số có thể lưu trữ khối lượng lớn trong không gian nhỏ',
    ],
    ans: 'C',
    exp: 'Thông tin số cũng có thể bị sai, bị chỉnh sửa hoặc làm giả, không phải luôn luôn chính xác.',
  });

  // =========================================================
  // TOPIC 2: Máy tính và cách sử dụng (15 câu)
  // topicId: cmt5s5b1a001597l05iie3t6g
  // EASY x6, MEDIUM x6, HARD x3
  // =========================================================

  // --- EASY ---
  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'CPU là tên viết tắt của bộ phận nào trong máy tính?',
    opts: [
      'Bộ nhớ tạm thời',
      'Bộ xử lý trung tâm',
      'Ổ cứng lưu trữ',
      'Màn hình hiển thị',
    ],
    ans: 'B',
    exp: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, bộ phận quan trọng nhất của máy tính.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'Thiết bị nào dưới đây là thiết bị đầu vào của máy tính?',
    opts: [
      'Màn hình',
      'Máy in',
      'Loa',
      'Bàn phím',
    ],
    ans: 'D',
    exp: 'Bàn phím là thiết bị đầu vào, dùng để nhập dữ liệu vào máy tính.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'Phần mềm là gì?',
    opts: [
      'Các bộ phận vật lý của máy tính có thể cầm nắm được',
      'Tập hợp các chương trình điều khiển hoạt động của máy tính',
      'Dây cáp kết nối các thiết bị',
      'Màn hình và bàn phím',
    ],
    ans: 'B',
    exp: 'Phần mềm là các chương trình máy tính, không thể cầm nắm được, điều khiển hoạt động của phần cứng.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'Hệ điều hành Windows dùng để làm gì?',
    opts: [
      'Chỉ để soạn thảo văn bản',
      'Quản lý và điều phối tất cả hoạt động của máy tính',
      'Chỉ để chơi game',
      'Chỉ để kết nối Internet',
    ],
    ans: 'B',
    exp: 'Hệ điều hành Windows quản lý phần cứng và phần mềm, tạo giao diện cho người dùng tương tác với máy tính.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'Tệp tin (file) có đuôi .jpg thường là loại tệp gì?',
    opts: [
      'Tệp âm thanh',
      'Tệp hình ảnh',
      'Tệp văn bản',
      'Tệp chương trình',
    ],
    ans: 'B',
    exp: 'Đuôi .jpg là định dạng tệp hình ảnh phổ biến.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'EASY',
    q: 'RAM trong máy tính có chức năng gì?',
    opts: [
      'Lưu trữ dữ liệu vĩnh viễn khi tắt máy',
      'Lưu trữ dữ liệu tạm thời khi máy đang hoạt động',
      'Hiển thị hình ảnh lên màn hình',
      'Kết nối các thiết bị ngoại vi',
    ],
    ans: 'B',
    exp: 'RAM (Random Access Memory) là bộ nhớ tạm thời, lưu dữ liệu đang dùng và bị xóa khi tắt máy.',
  });

  // --- MEDIUM ---
  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Để sao chép một tệp tin trong Windows, em sử dụng tổ hợp phím nào?',
    opts: [
      'Ctrl + X rồi Ctrl + V',
      'Ctrl + C rồi Ctrl + V',
      'Ctrl + Z rồi Ctrl + Y',
      'Ctrl + A rồi Ctrl + S',
    ],
    ans: 'B',
    exp: 'Ctrl+C để sao chép (Copy), Ctrl+V để dán (Paste). Ctrl+X là cắt (Cut).',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Sự khác biệt chính giữa phần cứng và phần mềm là gì?',
    opts: [
      'Phần cứng đắt hơn phần mềm',
      'Phần cứng là các bộ phận vật lý có thể chạm vào, phần mềm là các chương trình không thể chạm vào',
      'Phần mềm chỉ cần mua một lần, phần cứng phải mua nhiều lần',
      'Phần cứng hoạt động không cần điện, phần mềm cần điện',
    ],
    ans: 'B',
    exp: 'Phần cứng là các linh kiện vật lý (cầm nắm được), phần mềm là các chương trình (không cầm nắm được).',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Thư mục (folder) trong máy tính dùng để làm gì?',
    opts: [
      'Lưu trữ điện cho máy tính',
      'Tổ chức và chứa các tệp tin theo nhóm để dễ quản lý',
      'Kết nối máy tính với Internet',
      'Tăng tốc độ xử lý của CPU',
    ],
    ans: 'B',
    exp: 'Thư mục (folder) giúp tổ chức các tệp tin thành nhóm để dễ tìm kiếm và quản lý.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Tệp tin có đuôi .mp3 là loại tệp gì?',
    opts: [
      'Tệp hình ảnh',
      'Tệp video',
      'Tệp âm thanh',
      'Tệp văn bản',
    ],
    ans: 'C',
    exp: '.mp3 là định dạng tệp âm thanh phổ biến. .docx là văn bản, .jpg là hình ảnh, .mp4 là video.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Khi xóa một tệp tin trong Windows, tệp đó đi đến đâu?',
    opts: [
      'Bị xóa vĩnh viễn ngay lập tức',
      'Được chuyển vào Thùng rác (Recycle Bin)',
      'Được lưu vào ổ USB',
      'Được gửi lên Internet',
    ],
    ans: 'B',
    exp: 'Khi xóa file trong Windows, file được chuyển vào Recycle Bin, có thể khôi phục lại nếu cần.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'MEDIUM',
    q: 'Thiết bị nào dưới đây là thiết bị đầu ra của máy tính?',
    opts: [
      'Chuột',
      'Bàn phím',
      'Máy quét (Scanner)',
      'Máy in (Printer)',
    ],
    ans: 'D',
    exp: 'Máy in là thiết bị đầu ra vì nó xuất kết quả (văn bản, hình ảnh) từ máy tính ra giấy.',
  });

  // --- HARD ---
  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'HARD',
    q: 'Máy tính có dung lượng ổ cứng (HDD) 500GB và RAM 4GB. Ý nghĩa của hai thông số này là gì?',
    opts: [
      'HDD lưu dữ liệu vĩnh viễn 500GB, RAM lưu tạm thời 4GB khi máy đang chạy',
      'HDD và RAM đều lưu dữ liệu vĩnh viễn với tổng 504GB',
      'HDD là bộ nhớ tạm thời, RAM là bộ nhớ vĩnh viễn',
      'HDD dùng cho văn bản, RAM dùng cho hình ảnh',
    ],
    ans: 'A',
    exp: 'HDD lưu trữ dữ liệu lâu dài (ngay cả khi tắt máy). RAM là bộ nhớ tạm thời, bị xóa khi tắt máy.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'HARD',
    q: 'Em cần lưu bài văn soạn thảo vào máy tính. Thao tác nào sau đây là đúng?',
    opts: [
      'Nhấn Ctrl+P để in ra giấy',
      'Nhấn Ctrl+S hoặc chọn File → Save để lưu tệp',
      'Nhấn Ctrl+Z để hoàn tác',
      'Nhấn Alt+F4 để đóng chương trình',
    ],
    ans: 'B',
    exp: 'Ctrl+S hoặc File → Save dùng để lưu tệp. Ctrl+P là in, Ctrl+Z là hoàn tác, Alt+F4 là đóng cửa sổ.',
  });

  await createQ({
    topicId: 'cmt5s5b1a001597l05iie3t6g',
    d: 'HARD',
    q: 'Trong hệ điều hành Windows, biểu tượng màn hình Desktop dùng để làm gì?',
    opts: [
      'Chỉ để hiển thị hình nền cho đẹp',
      'Là nơi chứa các biểu tượng (icon) để truy cập nhanh vào chương trình và tệp tin',
      'Là nơi kết nối với Internet',
      'Là nơi lưu trữ dữ liệu chính của máy tính',
    ],
    ans: 'B',
    exp: 'Desktop là màn hình chính của Windows, chứa các biểu tượng để mở nhanh chương trình, thư mục, tệp tin.',
  });

  // =========================================================
  // TOPIC 3: Lập trình cơ bản (15 câu)
  // topicId: cmt5s5b1g001797l0brb9hidi
  // EASY x6, MEDIUM x6, HARD x3
  // =========================================================

  // --- EASY ---
  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Lập trình là gì?',
    opts: [
      'Sửa chữa máy tính bị hỏng',
      'Viết các lệnh để máy tính thực hiện theo ý muốn của người dùng',
      'Cài đặt phần mềm vào máy tính',
      'Kết nối máy tính với Internet',
    ],
    ans: 'B',
    exp: 'Lập trình là viết các câu lệnh (chương trình) để máy tính thực hiện các công việc theo yêu cầu.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Trong Scratch, nhân vật có thể di chuyển và thực hiện hành động được gọi là gì?',
    opts: [
      'Backdrop (Phông nền)',
      'Sprite (Nhân vật)',
      'Script (Kịch bản)',
      'Block (Khối lệnh)',
    ],
    ans: 'B',
    exp: 'Sprite là nhân vật trong Scratch, có thể di chuyển, nói chuyện và thực hiện các hành động.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Thuật toán là gì?',
    opts: [
      'Một loại phần mềm máy tính',
      'Dãy các bước thực hiện theo thứ tự để giải quyết một bài toán',
      'Ngôn ngữ lập trình phức tạp',
      'Tên gọi khác của máy tính',
    ],
    ans: 'B',
    exp: 'Thuật toán là dãy các bước hữu hạn, theo thứ tự để giải quyết một vấn đề hoặc bài toán cụ thể.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Trong Scratch, để bắt đầu chạy chương trình, em nhấn vào biểu tượng nào?',
    opts: [
      'Lá cờ đỏ',
      'Lá cờ xanh lá',
      'Nút dừng màu đỏ',
      'Biểu tượng mèo',
    ],
    ans: 'B',
    exp: 'Nhấn lá cờ xanh (Green Flag) để chạy chương trình Scratch.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Trong Scratch, Stage (Sân khấu) là gì?',
    opts: [
      'Tên của nhân vật chính',
      'Màn hình nền nơi các nhân vật hoạt động',
      'Danh sách các khối lệnh',
      'Tên của chương trình Scratch',
    ],
    ans: 'B',
    exp: 'Stage (Sân khấu) là khu vực màn hình nơi nhân vật (sprite) di chuyển và thực hiện hành động.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'EASY',
    q: 'Khối lệnh "Repeat 10" (Lặp lại 10 lần) trong Scratch dùng để làm gì?',
    opts: [
      'Dừng chương trình lại 10 giây',
      'Thực hiện các lệnh bên trong vòng lặp 10 lần',
      'Di chuyển nhân vật 10 bước',
      'Đợi 10 giây rồi mới chạy',
    ],
    ans: 'B',
    exp: 'Khối "Repeat 10" lặp lại tất cả các lệnh bên trong nó đúng 10 lần.',
  });

  // --- MEDIUM ---
  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Sự khác biệt giữa vòng lặp "Repeat" và "Forever" trong Scratch là gì?',
    opts: [
      'Repeat nhanh hơn Forever',
      'Repeat lặp một số lần xác định, Forever lặp mãi mãi không dừng',
      'Forever chỉ lặp 1 lần, Repeat lặp nhiều lần',
      'Chúng hoàn toàn giống nhau',
    ],
    ans: 'B',
    exp: '"Repeat N" lặp N lần rồi dừng. "Forever" lặp vô tận cho đến khi nhấn nút dừng.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Khối lệnh "If ... Then" trong Scratch dùng để làm gì?',
    opts: [
      'Lặp lại một đoạn lệnh nhiều lần',
      'Kiểm tra điều kiện, nếu đúng thì thực hiện lệnh bên trong',
      'Di chuyển nhân vật về vị trí ban đầu',
      'Hiển thị thông báo lên màn hình',
    ],
    ans: 'B',
    exp: '"If...Then" là cấu trúc điều kiện: kiểm tra điều kiện, nếu điều kiện đúng mới thực hiện lệnh bên trong.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Biến (variable) trong lập trình Scratch dùng để làm gì?',
    opts: [
      'Thay đổi màu sắc của nhân vật',
      'Lưu trữ một giá trị như số điểm, tên nhân vật để sử dụng trong chương trình',
      'Tạo ra âm thanh',
      'Vẽ đường thẳng trên màn hình',
    ],
    ans: 'B',
    exp: 'Biến (variable) là ô nhớ để lưu trữ giá trị (số, chữ) có thể thay đổi trong quá trình chương trình chạy.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Trong Scratch, khối lệnh "When Green Flag clicked" (Khi cờ xanh được nhấn) thuộc nhóm lệnh nào?',
    opts: [
      'Motion (Chuyển động)',
      'Looks (Ngoại hình)',
      'Events (Sự kiện)',
      'Control (Điều khiển)',
    ],
    ans: 'C',
    exp: '"When Green Flag clicked" là sự kiện (Event) — khối lệnh bắt đầu chương trình khi nhấn cờ xanh.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Để tạo hoạt ảnh (animation) đơn giản cho nhân vật trong Scratch, em cần làm gì?',
    opts: [
      'Chỉ cần vẽ một hình cho nhân vật',
      'Thay đổi liên tục trang phục (costume) của nhân vật kết hợp với thời gian chờ',
      'Nhập tệp video vào Scratch',
      'Kết nối máy tính với camera',
    ],
    ans: 'B',
    exp: 'Hoạt ảnh được tạo bằng cách chuyển đổi liên tục giữa các costume (trang phục) của sprite.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'MEDIUM',
    q: 'Bước đầu tiên khi viết một chương trình máy tính là gì?',
    opts: [
      'Mở Scratch và bắt đầu kéo thả các khối lệnh ngay',
      'Xác định bài toán và lên kế hoạch (thuật toán) trước khi viết code',
      'Trang trí nhân vật cho đẹp',
      'Lưu file lại',
    ],
    ans: 'B',
    exp: 'Bước đầu tiên là hiểu rõ bài toán và lên kế hoạch giải quyết (thuật toán) trước khi bắt tay viết code.',
  });

  // --- HARD ---
  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'HARD',
    q: 'Đoạn chương trình Scratch sau làm gì? [When Green Flag clicked → Repeat 4 → Move 100 steps → Turn 90 degrees]',
    opts: [
      'Vẽ một đường thẳng',
      'Vẽ một hình vuông',
      'Vẽ một hình tròn',
      'Nhân vật nhảy lên 4 lần',
    ],
    ans: 'B',
    exp: 'Lặp lại 4 lần: đi 100 bước rồi xoay 90 độ → tạo thành hình vuông (4 cạnh × 90° = 360°).',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'HARD',
    q: 'Trong lập trình, cấu trúc nào phù hợp nhất để tạo trò chơi mà nhân vật liên tục kiểm tra va chạm với tường?',
    opts: [
      'Chỉ dùng một khối lệnh "Move"',
      'Dùng "Forever" kết hợp với "If touching wall? Then bounce"',
      'Dùng "Repeat 1" để kiểm tra một lần',
      'Dùng "Wait 10 seconds" rồi kiểm tra',
    ],
    ans: 'B',
    exp: '"Forever" giúp liên tục kiểm tra va chạm. Kết hợp "If touching?" để xử lý khi chạm tường.',
  });

  await createQ({
    topicId: 'cmt5s5b1g001797l0brb9hidi',
    d: 'HARD',
    q: 'Trong Scratch, em muốn đếm số lần nhân vật bắt được táo. Cần sử dụng thành phần nào?',
    opts: [
      'Backdrop (Phông nền)',
      'Biến (Variable) để lưu và tăng số điểm mỗi khi bắt được táo',
      'Costume (Trang phục) mới cho nhân vật',
      'Âm thanh để phát khi bắt được',
    ],
    ans: 'B',
    exp: 'Biến (Variable) dùng để lưu trữ số điểm. Mỗi khi bắt được táo, tăng biến điểm lên 1.',
  });

  // =========================================================
  // TOPIC 4: Internet và ứng dụng (15 câu)
  // topicId: cmt5s5b1m001997l0eipaw7hq
  // EASY x6, MEDIUM x6, HARD x3
  // =========================================================

  // --- EASY ---
  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'Internet là gì?',
    opts: [
      'Một loại máy tính đặc biệt',
      'Mạng lưới kết nối hàng triệu máy tính trên toàn thế giới',
      'Chương trình xử lý văn bản',
      'Thiết bị lưu trữ dữ liệu',
    ],
    ans: 'B',
    exp: 'Internet là mạng máy tính toàn cầu, kết nối hàng tỷ thiết bị để chia sẻ thông tin.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'Trình duyệt web (web browser) dùng để làm gì?',
    opts: [
      'Soạn thảo văn bản',
      'Truy cập và xem các trang web trên Internet',
      'Chỉnh sửa hình ảnh',
      'Chơi game offline',
    ],
    ans: 'B',
    exp: 'Trình duyệt web như Chrome, Firefox, Edge dùng để truy cập và duyệt các trang web trên Internet.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'Google là ví dụ về loại công cụ gì trên Internet?',
    opts: [
      'Trình duyệt web',
      'Hệ điều hành',
      'Công cụ tìm kiếm (search engine)',
      'Ứng dụng soạn thảo văn bản',
    ],
    ans: 'C',
    exp: 'Google là công cụ tìm kiếm, giúp người dùng tìm thông tin trên Internet.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'Email là gì?',
    opts: [
      'Một loại trò chơi trực tuyến',
      'Thư điện tử, dùng để gửi và nhận tin nhắn qua Internet',
      'Ứng dụng xem phim',
      'Thiết bị in ấn',
    ],
    ans: 'B',
    exp: 'Email (Electronic Mail) là thư điện tử, cho phép gửi và nhận thông tin qua Internet.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'Để bảo vệ bản thân khi sử dụng Internet, em không nên làm gì?',
    opts: [
      'Sử dụng mật khẩu mạnh',
      'Chia sẻ họ tên, địa chỉ nhà và số điện thoại cho người lạ trên mạng',
      'Hỏi ý kiến bố mẹ khi gặp nội dung lạ',
      'Đăng xuất khi dùng xong',
    ],
    ans: 'B',
    exp: 'Không bao giờ chia sẻ thông tin cá nhân cho người lạ trên mạng vì có thể gây nguy hiểm.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'EASY',
    q: 'WWW là viết tắt của cụm từ nào?',
    opts: [
      'World Wide Web',
      'Windows Web World',
      'Wireless Wide Web',
      'World Web Work',
    ],
    ans: 'A',
    exp: 'WWW là viết tắt của World Wide Web — hệ thống các trang web được liên kết với nhau trên Internet.',
  });

  // --- MEDIUM ---
  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Bắt nạt trực tuyến (cyberbullying) là gì?',
    opts: [
      'Chơi game cùng bạn bè trên mạng',
      'Hành vi bắt nạt, quấy rối, xúc phạm người khác qua mạng Internet',
      'Học bài cùng nhau qua video call',
      'Chia sẻ hình ảnh đẹp với bạn bè',
    ],
    ans: 'B',
    exp: 'Cyberbullying là bắt nạt qua mạng: gửi tin nhắn xúc phạm, đăng ảnh xấu hổ, tạo tin đồn về người khác online.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Khi em bị bắt nạt trực tuyến, điều đúng đắn cần làm là gì?',
    opts: [
      'Im lặng và không nói với ai',
      'Đáp trả bằng lời lẽ xúc phạm',
      'Báo cáo với bố mẹ hoặc thầy cô và lưu lại bằng chứng',
      'Xóa tài khoản mạng xã hội của mình',
    ],
    ans: 'C',
    exp: 'Khi bị bắt nạt online: lưu bằng chứng, báo với người lớn tin cậy, báo cáo với nền tảng mạng xã hội.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Địa chỉ trang web (URL) thường bắt đầu bằng gì?',
    opts: [
      'ftp://',
      'www@',
      'http:// hoặc https://',
      'mail://',
    ],
    ans: 'C',
    exp: 'URL trang web thường bắt đầu bằng http:// hoặc https:// (có chữ "s" nghĩa là bảo mật hơn).',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Ứng dụng nào dưới đây là ứng dụng học tập trực tuyến hữu ích cho học sinh?',
    opts: [
      'Microsoft Word',
      'Khan Academy hoặc các ứng dụng học tiếng Anh, toán trực tuyến',
      'Adobe Photoshop',
      'Microsoft Excel',
    ],
    ans: 'B',
    exp: 'Khan Academy và các ứng dụng học tập trực tuyến cung cấp bài học, bài tập cho học sinh ở nhiều môn.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Khi sử dụng công cụ tìm kiếm Google, để tìm kiếm hiệu quả hơn em nên làm gì?',
    opts: [
      'Gõ nguyên một câu hỏi rất dài',
      'Sử dụng từ khóa quan trọng, ngắn gọn và chính xác',
      'Chỉ gõ một chữ cái',
      'Gõ tên bài hát yêu thích',
    ],
    ans: 'B',
    exp: 'Sử dụng từ khóa ngắn gọn, chính xác giúp công cụ tìm kiếm cho kết quả phù hợp hơn.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'MEDIUM',
    q: 'Điều nào sau đây là quy tắc an toàn khi sử dụng Internet?',
    opts: [
      'Nhấn vào mọi đường link được gửi đến',
      'Tải về mọi phần mềm miễn phí trên mạng',
      'Chỉ truy cập các trang web uy tín và được bố mẹ cho phép',
      'Chia sẻ mật khẩu với bạn thân để tiện sử dụng',
    ],
    ans: 'C',
    exp: 'Chỉ truy cập trang web uy tín và được phép là quy tắc an toàn cơ bản khi dùng Internet.',
  });

  // --- HARD ---
  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'HARD',
    q: 'Sự khác biệt giữa Internet và WWW (World Wide Web) là gì?',
    opts: [
      'Internet và WWW là cùng một thứ',
      'Internet là hạ tầng mạng kết nối các máy tính; WWW là hệ thống các trang web chạy trên Internet',
      'WWW là mạng lớn hơn Internet',
      'Internet chỉ dùng để gửi email, WWW dùng để duyệt web',
    ],
    ans: 'B',
    exp: 'Internet là mạng vật lý kết nối các máy tính toàn cầu. WWW là một dịch vụ chạy trên Internet, gồm các trang web liên kết nhau.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'HARD',
    q: 'Tại sao HTTPS an toàn hơn HTTP khi duyệt web?',
    opts: [
      'HTTPS tải trang nhanh hơn HTTP',
      'HTTPS mã hóa dữ liệu truyền giữa máy tính và máy chủ, bảo vệ thông tin không bị đánh cắp',
      'HTTPS chỉ dành cho người lớn',
      'HTTPS không cần mật khẩu đăng nhập',
    ],
    ans: 'B',
    exp: 'HTTPS mã hóa (encrypt) dữ liệu khi truyền, nên dù bị chặn giữa đường cũng không đọc được thông tin.',
  });

  await createQ({
    topicId: 'cmt5s5b1m001997l0eipaw7hq',
    d: 'HARD',
    q: 'Em nhận được email từ một địa chỉ lạ, yêu cầu cung cấp mật khẩu tài khoản vì "hệ thống đang bảo trì". Đây là dấu hiệu của hình thức tấn công nào?',
    opts: [
      'Spam email thông thường',
      'Lừa đảo trực tuyến (Phishing) — giả mạo để lấy thông tin cá nhân',
      'Quảng cáo hợp lệ',
      'Thông báo bảo mật thật sự',
    ],
    ans: 'B',
    exp: 'Phishing là giả mạo tổ chức uy tín để lừa người dùng cung cấp mật khẩu, thông tin tài khoản. Không bao giờ gửi mật khẩu qua email.',
  });

  console.log('Hoàn thành! Đã tạo 60 câu hỏi Tin học lớp 5.');
}

main().catch(console.error).finally(() => p.$disconnect());
