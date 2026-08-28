const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-toan';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== SỐ THẬP PHÂN =====
  {
    content: 'Số 3,14 đọc là gì?',
    difficulty: 'EASY',
    explanation: 'Số 3,14 đọc là: ba phẩy mười bốn.',
    options: [
      { key: 'A', content: 'Ba mươi mốt phần tư', correct: false },
      { key: 'B', content: 'Ba phẩy mười bốn', correct: true },
      { key: 'C', content: 'Ba phẩy một bốn', correct: false },
      { key: 'D', content: 'Ba mươi bốn phần mười', correct: false },
    ],
  },
  {
    content: 'Số nào sau đây bằng 0,5?',
    difficulty: 'EASY',
    explanation: '0,5 = 5/10 = 1/2.',
    options: [
      { key: 'A', content: '5/100', correct: false },
      { key: 'B', content: '1/2', correct: true },
      { key: 'C', content: '5/1000', correct: false },
      { key: 'D', content: '1/5', correct: false },
    ],
  },
  {
    content: 'So sánh: 4,5 ○ 4,50',
    difficulty: 'EASY',
    explanation: '4,5 = 4,50 vì chữ số 0 ở tận cùng bên phải sau dấu phẩy không làm thay đổi giá trị.',
    options: [
      { key: 'A', content: '4,5 > 4,50', correct: false },
      { key: 'B', content: '4,5 < 4,50', correct: false },
      { key: 'C', content: '4,5 = 4,50', correct: true },
      { key: 'D', content: 'Không so sánh được', correct: false },
    ],
  },
  {
    content: '3,25 + 2,75 = ?',
    difficulty: 'EASY',
    explanation: '3,25 + 2,75 = 6,00 = 6.',
    options: [
      { key: 'A', content: '5,90', correct: false },
      { key: 'B', content: '6,00', correct: true },
      { key: 'C', content: '6,10', correct: false },
      { key: 'D', content: '5,00', correct: false },
    ],
  },
  {
    content: '7,8 - 3,4 = ?',
    difficulty: 'EASY',
    explanation: '7,8 - 3,4 = 4,4.',
    options: [
      { key: 'A', content: '4,4', correct: true },
      { key: 'B', content: '4,2', correct: false },
      { key: 'C', content: '3,4', correct: false },
      { key: 'D', content: '4,6', correct: false },
    ],
  },
  {
    content: '2,5 × 4 = ?',
    difficulty: 'EASY',
    explanation: '2,5 × 4 = 10.',
    options: [
      { key: 'A', content: '8', correct: false },
      { key: 'B', content: '9', correct: false },
      { key: 'C', content: '10', correct: true },
      { key: 'D', content: '12', correct: false },
    ],
  },
  {
    content: '9,6 ÷ 4 = ?',
    difficulty: 'EASY',
    explanation: '9,6 ÷ 4 = 2,4.',
    options: [
      { key: 'A', content: '2,4', correct: true },
      { key: 'B', content: '2,6', correct: false },
      { key: 'C', content: '3,2', correct: false },
      { key: 'D', content: '2,2', correct: false },
    ],
  },
  {
    content: 'Số nào lớn nhất trong các số: 0,9 ; 1,05 ; 0,99 ; 1,005?',
    difficulty: 'MEDIUM',
    explanation: '1,05 > 1,005 > 0,99 > 0,9. Vậy số lớn nhất là 1,05.',
    options: [
      { key: 'A', content: '0,99', correct: false },
      { key: 'B', content: '1,005', correct: false },
      { key: 'C', content: '1,05', correct: true },
      { key: 'D', content: '0,9', correct: false },
    ],
  },
  {
    content: '0,25 × 8 = ?',
    difficulty: 'EASY',
    explanation: '0,25 × 8 = 2.',
    options: [
      { key: 'A', content: '1,8', correct: false },
      { key: 'B', content: '2', correct: true },
      { key: 'C', content: '2,4', correct: false },
      { key: 'D', content: '3,2', correct: false },
    ],
  },
  {
    content: '15 ÷ 0,5 = ?',
    difficulty: 'MEDIUM',
    explanation: '15 ÷ 0,5 = 15 × 2 = 30.',
    options: [
      { key: 'A', content: '7,5', correct: false },
      { key: 'B', content: '25', correct: false },
      { key: 'C', content: '30', correct: true },
      { key: 'D', content: '20', correct: false },
    ],
  },
  // ===== PHÂN SỐ =====
  {
    content: 'Phân số 3/4 viết dưới dạng số thập phân là?',
    difficulty: 'EASY',
    explanation: '3/4 = 3 ÷ 4 = 0,75.',
    options: [
      { key: 'A', content: '0,34', correct: false },
      { key: 'B', content: '0,75', correct: true },
      { key: 'C', content: '0,43', correct: false },
      { key: 'D', content: '3,4', correct: false },
    ],
  },
  {
    content: '1/2 + 1/3 = ?',
    difficulty: 'MEDIUM',
    explanation: '1/2 + 1/3 = 3/6 + 2/6 = 5/6.',
    options: [
      { key: 'A', content: '2/5', correct: false },
      { key: 'B', content: '2/6', correct: false },
      { key: 'C', content: '5/6', correct: true },
      { key: 'D', content: '1/6', correct: false },
    ],
  },
  {
    content: 'Rút gọn phân số 12/18 ta được?',
    difficulty: 'EASY',
    explanation: 'ƯCLN(12,18) = 6. 12/18 = 2/3.',
    options: [
      { key: 'A', content: '4/6', correct: false },
      { key: 'B', content: '2/3', correct: true },
      { key: 'C', content: '6/9', correct: false },
      { key: 'D', content: '1/2', correct: false },
    ],
  },
  {
    content: '3/4 × 8 = ?',
    difficulty: 'MEDIUM',
    explanation: '3/4 × 8 = 24/4 = 6.',
    options: [
      { key: 'A', content: '6', correct: true },
      { key: 'B', content: '5', correct: false },
      { key: 'C', content: '7', correct: false },
      { key: 'D', content: '4', correct: false },
    ],
  },
  {
    content: 'So sánh: 5/8 ○ 3/4',
    difficulty: 'MEDIUM',
    explanation: '3/4 = 6/8. Vì 5/8 < 6/8 nên 5/8 < 3/4.',
    options: [
      { key: 'A', content: '5/8 > 3/4', correct: false },
      { key: 'B', content: '5/8 = 3/4', correct: false },
      { key: 'C', content: '5/8 < 3/4', correct: true },
      { key: 'D', content: 'Không so sánh được', correct: false },
    ],
  },
  // ===== HÌNH HỌC =====
  {
    content: 'Diện tích hình tam giác có đáy 8 cm và chiều cao 5 cm là?',
    difficulty: 'EASY',
    explanation: 'S = (đáy × chiều cao) ÷ 2 = (8 × 5) ÷ 2 = 20 cm².',
    options: [
      { key: 'A', content: '40 cm²', correct: false },
      { key: 'B', content: '20 cm²', correct: true },
      { key: 'C', content: '13 cm²', correct: false },
      { key: 'D', content: '25 cm²', correct: false },
    ],
  },
  {
    content: 'Công thức tính diện tích hình tam giác là?',
    difficulty: 'EASY',
    explanation: 'S = (đáy × chiều cao) ÷ 2.',
    options: [
      { key: 'A', content: 'S = đáy × chiều cao', correct: false },
      { key: 'B', content: 'S = (đáy + chiều cao) ÷ 2', correct: false },
      { key: 'C', content: 'S = (đáy × chiều cao) ÷ 2', correct: true },
      { key: 'D', content: 'S = đáy × chiều cao × 2', correct: false },
    ],
  },
  {
    content: 'Diện tích hình thang có đáy lớn 10 cm, đáy nhỏ 6 cm và chiều cao 4 cm là?',
    difficulty: 'MEDIUM',
    explanation: 'S = (đáy lớn + đáy nhỏ) × chiều cao ÷ 2 = (10 + 6) × 4 ÷ 2 = 32 cm².',
    options: [
      { key: 'A', content: '40 cm²', correct: false },
      { key: 'B', content: '32 cm²', correct: true },
      { key: 'C', content: '24 cm²', correct: false },
      { key: 'D', content: '64 cm²', correct: false },
    ],
  },
  {
    content: 'Công thức tính diện tích hình thang là?',
    difficulty: 'EASY',
    explanation: 'S = (đáy lớn + đáy nhỏ) × chiều cao ÷ 2.',
    options: [
      { key: 'A', content: 'S = (đáy lớn - đáy nhỏ) × chiều cao ÷ 2', correct: false },
      { key: 'B', content: 'S = (đáy lớn + đáy nhỏ) × chiều cao ÷ 2', correct: true },
      { key: 'C', content: 'S = đáy lớn × chiều cao', correct: false },
      { key: 'D', content: 'S = (đáy lớn × đáy nhỏ) ÷ 2', correct: false },
    ],
  },
  {
    content: 'Diện tích hình tròn có bán kính 7 cm là? (Lấy π ≈ 3,14)',
    difficulty: 'MEDIUM',
    explanation: 'S = π × r² = 3,14 × 7 × 7 = 3,14 × 49 = 153,86 cm².',
    options: [
      { key: 'A', content: '153,86 cm²', correct: true },
      { key: 'B', content: '43,96 cm²', correct: false },
      { key: 'C', content: '21,98 cm²', correct: false },
      { key: 'D', content: '78,5 cm²', correct: false },
    ],
  },
  {
    content: 'Chu vi hình tròn có đường kính 10 cm là? (Lấy π ≈ 3,14)',
    difficulty: 'MEDIUM',
    explanation: 'C = π × d = 3,14 × 10 = 31,4 cm.',
    options: [
      { key: 'A', content: '31,4 cm', correct: true },
      { key: 'B', content: '62,8 cm', correct: false },
      { key: 'C', content: '15,7 cm', correct: false },
      { key: 'D', content: '314 cm', correct: false },
    ],
  },
  {
    content: 'Một hình tam giác có đáy 12 dm và diện tích 36 dm². Chiều cao của hình tam giác đó là?',
    difficulty: 'HARD',
    explanation: 'S = đáy × chiều cao ÷ 2 → chiều cao = 2 × S ÷ đáy = 2 × 36 ÷ 12 = 6 dm.',
    options: [
      { key: 'A', content: '3 dm', correct: false },
      { key: 'B', content: '4 dm', correct: false },
      { key: 'C', content: '6 dm', correct: true },
      { key: 'D', content: '8 dm', correct: false },
    ],
  },
  {
    content: 'Bán kính hình tròn có diện tích 78,5 cm² là? (Lấy π ≈ 3,14)',
    difficulty: 'HARD',
    explanation: 'S = π × r² → r² = S ÷ π = 78,5 ÷ 3,14 = 25 → r = 5 cm.',
    options: [
      { key: 'A', content: '5 cm', correct: true },
      { key: 'B', content: '10 cm', correct: false },
      { key: 'C', content: '25 cm', correct: false },
      { key: 'D', content: '4 cm', correct: false },
    ],
  },
  // ===== THỂ TÍCH HÌNH HỘP CHỮ NHẬT =====
  {
    content: 'Thể tích hình hộp chữ nhật có chiều dài 5 cm, chiều rộng 3 cm, chiều cao 4 cm là?',
    difficulty: 'EASY',
    explanation: 'V = dài × rộng × cao = 5 × 3 × 4 = 60 cm³.',
    options: [
      { key: 'A', content: '47 cm³', correct: false },
      { key: 'B', content: '60 cm³', correct: true },
      { key: 'C', content: '45 cm³', correct: false },
      { key: 'D', content: '12 cm³', correct: false },
    ],
  },
  {
    content: 'Công thức tính thể tích hình hộp chữ nhật là?',
    difficulty: 'EASY',
    explanation: 'V = dài × rộng × cao.',
    options: [
      { key: 'A', content: 'V = dài + rộng + cao', correct: false },
      { key: 'B', content: 'V = dài × rộng × cao', correct: true },
      { key: 'C', content: 'V = (dài × rộng + cao) ÷ 2', correct: false },
      { key: 'D', content: 'V = dài × rộng + chiều cao', correct: false },
    ],
  },
  {
    content: 'Một bể cá hình hộp chữ nhật có chiều dài 80 cm, chiều rộng 40 cm, chiều cao 50 cm. Thể tích của bể là?',
    difficulty: 'MEDIUM',
    explanation: 'V = 80 × 40 × 50 = 160 000 cm³.',
    options: [
      { key: 'A', content: '170 cm³', correct: false },
      { key: 'B', content: '16 000 cm³', correct: false },
      { key: 'C', content: '160 000 cm³', correct: true },
      { key: 'D', content: '1 600 cm³', correct: false },
    ],
  },
  {
    content: 'Thể tích hình lập phương có cạnh 3 cm là?',
    difficulty: 'EASY',
    explanation: 'V = cạnh³ = 3 × 3 × 3 = 27 cm³.',
    options: [
      { key: 'A', content: '9 cm³', correct: false },
      { key: 'B', content: '27 cm³', correct: true },
      { key: 'C', content: '18 cm³', correct: false },
      { key: 'D', content: '81 cm³', correct: false },
    ],
  },
  {
    content: 'Một hộp giấy hình hộp chữ nhật có chiều dài 20 cm, chiều rộng 15 cm, chiều cao 10 cm. Thể tích hộp là?',
    difficulty: 'MEDIUM',
    explanation: 'V = 20 × 15 × 10 = 3 000 cm³.',
    options: [
      { key: 'A', content: '3 000 cm³', correct: true },
      { key: 'B', content: '300 cm³', correct: false },
      { key: 'C', content: '30 000 cm³', correct: false },
      { key: 'D', content: '450 cm³', correct: false },
    ],
  },
  // ===== ĐƠN VỊ ĐO =====
  {
    content: '1 km = ? m',
    difficulty: 'EASY',
    explanation: '1 km = 1 000 m.',
    options: [
      { key: 'A', content: '100 m', correct: false },
      { key: 'B', content: '1 000 m', correct: true },
      { key: 'C', content: '10 000 m', correct: false },
      { key: 'D', content: '10 m', correct: false },
    ],
  },
  {
    content: '1 m = ? cm',
    difficulty: 'EASY',
    explanation: '1 m = 100 cm.',
    options: [
      { key: 'A', content: '10 cm', correct: false },
      { key: 'B', content: '100 cm', correct: true },
      { key: 'C', content: '1 000 cm', correct: false },
      { key: 'D', content: '1 cm', correct: false },
    ],
  },
  {
    content: '5 km = ? m',
    difficulty: 'EASY',
    explanation: '5 km = 5 × 1 000 = 5 000 m.',
    options: [
      { key: 'A', content: '500 m', correct: false },
      { key: 'B', content: '5 000 m', correct: true },
      { key: 'C', content: '50 000 m', correct: false },
      { key: 'D', content: '50 m', correct: false },
    ],
  },
  {
    content: '2500 m = ? km',
    difficulty: 'EASY',
    explanation: '2500 m = 2500 ÷ 1000 = 2,5 km.',
    options: [
      { key: 'A', content: '25 km', correct: false },
      { key: 'B', content: '0,25 km', correct: false },
      { key: 'C', content: '2,5 km', correct: true },
      { key: 'D', content: '250 km', correct: false },
    ],
  },
  {
    content: '1 kg = ? g',
    difficulty: 'EASY',
    explanation: '1 kg = 1 000 g.',
    options: [
      { key: 'A', content: '100 g', correct: false },
      { key: 'B', content: '10 000 g', correct: false },
      { key: 'C', content: '1 000 g', correct: true },
      { key: 'D', content: '10 g', correct: false },
    ],
  },
  {
    content: '3,5 kg = ? g',
    difficulty: 'EASY',
    explanation: '3,5 kg = 3,5 × 1 000 = 3 500 g.',
    options: [
      { key: 'A', content: '350 g', correct: false },
      { key: 'B', content: '3 500 g', correct: true },
      { key: 'C', content: '35 000 g', correct: false },
      { key: 'D', content: '3 050 g', correct: false },
    ],
  },
  {
    content: '1 tấn = ? kg',
    difficulty: 'EASY',
    explanation: '1 tấn = 1 000 kg.',
    options: [
      { key: 'A', content: '100 kg', correct: false },
      { key: 'B', content: '1 000 kg', correct: true },
      { key: 'C', content: '10 000 kg', correct: false },
      { key: 'D', content: '10 kg', correct: false },
    ],
  },
  {
    content: '1 lít = ? ml',
    difficulty: 'EASY',
    explanation: '1 lít = 1 000 ml.',
    options: [
      { key: 'A', content: '100 ml', correct: false },
      { key: 'B', content: '1 000 ml', correct: true },
      { key: 'C', content: '10 ml', correct: false },
      { key: 'D', content: '10 000 ml', correct: false },
    ],
  },
  {
    content: '1 ha = ? m²',
    difficulty: 'MEDIUM',
    explanation: '1 ha = 10 000 m².',
    options: [
      { key: 'A', content: '100 m²', correct: false },
      { key: 'B', content: '1 000 m²', correct: false },
      { key: 'C', content: '10 000 m²', correct: true },
      { key: 'D', content: '100 000 m²', correct: false },
    ],
  },
  {
    content: '1 km² = ? ha',
    difficulty: 'MEDIUM',
    explanation: '1 km² = 100 ha.',
    options: [
      { key: 'A', content: '10 ha', correct: false },
      { key: 'B', content: '100 ha', correct: true },
      { key: 'C', content: '1 000 ha', correct: false },
      { key: 'D', content: '10 000 ha', correct: false },
    ],
  },
  {
    content: '1 cm = ? mm',
    difficulty: 'EASY',
    explanation: '1 cm = 10 mm.',
    options: [
      { key: 'A', content: '100 mm', correct: false },
      { key: 'B', content: '1 mm', correct: false },
      { key: 'C', content: '10 mm', correct: true },
      { key: 'D', content: '0,1 mm', correct: false },
    ],
  },
  {
    content: '45 mm = ? cm',
    difficulty: 'EASY',
    explanation: '45 mm = 45 ÷ 10 = 4,5 cm.',
    options: [
      { key: 'A', content: '4,5 cm', correct: true },
      { key: 'B', content: '45 cm', correct: false },
      { key: 'C', content: '0,45 cm', correct: false },
      { key: 'D', content: '450 cm', correct: false },
    ],
  },
  // ===== TOÁN CHUYỂN ĐỘNG =====
  {
    content: 'Công thức tính vận tốc là?',
    difficulty: 'EASY',
    explanation: 'Vận tốc v = Quãng đường s ÷ Thời gian t.',
    options: [
      { key: 'A', content: 'v = s × t', correct: false },
      { key: 'B', content: 'v = s ÷ t', correct: true },
      { key: 'C', content: 'v = t ÷ s', correct: false },
      { key: 'D', content: 'v = s + t', correct: false },
    ],
  },
  {
    content: 'Một xe đạp đi được 30 km trong 2 giờ. Vận tốc của xe đạp là?',
    difficulty: 'EASY',
    explanation: 'v = s ÷ t = 30 ÷ 2 = 15 km/giờ.',
    options: [
      { key: 'A', content: '10 km/giờ', correct: false },
      { key: 'B', content: '60 km/giờ', correct: false },
      { key: 'C', content: '15 km/giờ', correct: true },
      { key: 'D', content: '20 km/giờ', correct: false },
    ],
  },
  {
    content: 'Một ô tô đi với vận tốc 60 km/giờ trong 3 giờ. Quãng đường ô tô đi được là?',
    difficulty: 'EASY',
    explanation: 's = v × t = 60 × 3 = 180 km.',
    options: [
      { key: 'A', content: '20 km', correct: false },
      { key: 'B', content: '180 km', correct: true },
      { key: 'C', content: '63 km', correct: false },
      { key: 'D', content: '57 km', correct: false },
    ],
  },
  {
    content: 'Một người đi bộ với vận tốc 5 km/giờ. Người đó đi hết 15 km trong bao nhiêu giờ?',
    difficulty: 'EASY',
    explanation: 't = s ÷ v = 15 ÷ 5 = 3 giờ.',
    options: [
      { key: 'A', content: '75 giờ', correct: false },
      { key: 'B', content: '2 giờ', correct: false },
      { key: 'C', content: '3 giờ', correct: true },
      { key: 'D', content: '4 giờ', correct: false },
    ],
  },
  {
    content: 'Công thức tính quãng đường là?',
    difficulty: 'EASY',
    explanation: 'Quãng đường s = Vận tốc v × Thời gian t.',
    options: [
      { key: 'A', content: 's = v ÷ t', correct: false },
      { key: 'B', content: 's = t ÷ v', correct: false },
      { key: 'C', content: 's = v × t', correct: true },
      { key: 'D', content: 's = v + t', correct: false },
    ],
  },
  {
    content: 'Hai thành phố A và B cách nhau 240 km. Một ô tô đi từ A đến B với vận tốc 60 km/giờ. Ô tô đi hết bao nhiêu giờ?',
    difficulty: 'MEDIUM',
    explanation: 't = s ÷ v = 240 ÷ 60 = 4 giờ.',
    options: [
      { key: 'A', content: '3 giờ', correct: false },
      { key: 'B', content: '4 giờ', correct: true },
      { key: 'C', content: '5 giờ', correct: false },
      { key: 'D', content: '6 giờ', correct: false },
    ],
  },
  {
    content: 'Vận tốc của tàu hỏa là 80 km/giờ. Tàu đi được quãng đường 320 km trong bao lâu?',
    difficulty: 'MEDIUM',
    explanation: 't = s ÷ v = 320 ÷ 80 = 4 giờ.',
    options: [
      { key: 'A', content: '2 giờ', correct: false },
      { key: 'B', content: '3 giờ', correct: false },
      { key: 'C', content: '4 giờ', correct: true },
      { key: 'D', content: '5 giờ', correct: false },
    ],
  },
  {
    content: 'Hai người đi ngược chiều nhau. Người A đi với vận tốc 5 km/giờ, người B đi với vận tốc 4 km/giờ. Sau 3 giờ, hai người cách nhau bao nhiêu km?',
    difficulty: 'HARD',
    explanation: 'Vận tốc tổng = 5 + 4 = 9 km/giờ. Sau 3 giờ: 9 × 3 = 27 km.',
    options: [
      { key: 'A', content: '15 km', correct: false },
      { key: 'B', content: '27 km', correct: true },
      { key: 'C', content: '12 km', correct: false },
      { key: 'D', content: '21 km', correct: false },
    ],
  },
  {
    content: 'Một chiếc thuyền chạy xuôi dòng với vận tốc 24 km/giờ. Vận tốc thuyền khi nước không chảy là 20 km/giờ. Vận tốc dòng nước là?',
    difficulty: 'HARD',
    explanation: 'Vận tốc xuôi = vận tốc thuyền + vận tốc nước → vận tốc nước = 24 - 20 = 4 km/giờ.',
    options: [
      { key: 'A', content: '44 km/giờ', correct: false },
      { key: 'B', content: '4 km/giờ', correct: true },
      { key: 'C', content: '6 km/giờ', correct: false },
      { key: 'D', content: '16 km/giờ', correct: false },
    ],
  },
  // ===== TOÁN TỔNG HỢP / NÂNG CAO =====
  {
    content: 'Tìm x: x + 2,5 = 7,3',
    difficulty: 'EASY',
    explanation: 'x = 7,3 - 2,5 = 4,8.',
    options: [
      { key: 'A', content: '4,8', correct: true },
      { key: 'B', content: '9,8', correct: false },
      { key: 'C', content: '4,2', correct: false },
      { key: 'D', content: '5,8', correct: false },
    ],
  },
  {
    content: 'Tìm x: 3 × x = 12,6',
    difficulty: 'EASY',
    explanation: 'x = 12,6 ÷ 3 = 4,2.',
    options: [
      { key: 'A', content: '3,8', correct: false },
      { key: 'B', content: '4,2', correct: true },
      { key: 'C', content: '4,5', correct: false },
      { key: 'D', content: '3,6', correct: false },
    ],
  },
  {
    content: '1/4 của 200 là?',
    difficulty: 'EASY',
    explanation: '1/4 × 200 = 50.',
    options: [
      { key: 'A', content: '25', correct: false },
      { key: 'B', content: '100', correct: false },
      { key: 'C', content: '50', correct: true },
      { key: 'D', content: '40', correct: false },
    ],
  },
  {
    content: '30% của 400 là?',
    difficulty: 'MEDIUM',
    explanation: '30% × 400 = (30 ÷ 100) × 400 = 120.',
    options: [
      { key: 'A', content: '120', correct: true },
      { key: 'B', content: '12', correct: false },
      { key: 'C', content: '1200', correct: false },
      { key: 'D', content: '130', correct: false },
    ],
  },
  {
    content: 'Lớp học có 40 học sinh, trong đó 60% là nữ. Số học sinh nữ là?',
    difficulty: 'MEDIUM',
    explanation: '60% × 40 = 24 học sinh nữ.',
    options: [
      { key: 'A', content: '20', correct: false },
      { key: 'B', content: '24', correct: true },
      { key: 'C', content: '26', correct: false },
      { key: 'D', content: '16', correct: false },
    ],
  },
  {
    content: 'Một cửa hàng giảm giá 20% cho sản phẩm 150 000 đồng. Giá sau giảm là?',
    difficulty: 'MEDIUM',
    explanation: 'Giảm: 20% × 150 000 = 30 000 đồng. Giá còn lại: 150 000 - 30 000 = 120 000 đồng.',
    options: [
      { key: 'A', content: '130 000 đồng', correct: false },
      { key: 'B', content: '120 000 đồng', correct: true },
      { key: 'C', content: '110 000 đồng', correct: false },
      { key: 'D', content: '100 000 đồng', correct: false },
    ],
  },
  {
    content: 'Số tự nhiên lớn nhất có 3 chữ số là?',
    difficulty: 'EASY',
    explanation: 'Số tự nhiên lớn nhất có 3 chữ số là 999.',
    options: [
      { key: 'A', content: '899', correct: false },
      { key: 'B', content: '1000', correct: false },
      { key: 'C', content: '999', correct: true },
      { key: 'D', content: '990', correct: false },
    ],
  },
  {
    content: 'ƯCLN của 12 và 18 là?',
    difficulty: 'MEDIUM',
    explanation: 'Ước của 12: 1, 2, 3, 4, 6, 12. Ước của 18: 1, 2, 3, 6, 9, 18. ƯCLN = 6.',
    options: [
      { key: 'A', content: '3', correct: false },
      { key: 'B', content: '6', correct: true },
      { key: 'C', content: '9', correct: false },
      { key: 'D', content: '12', correct: false },
    ],
  },
  {
    content: 'BCNN của 4 và 6 là?',
    difficulty: 'MEDIUM',
    explanation: 'BCNN(4, 6) = 12.',
    options: [
      { key: 'A', content: '6', correct: false },
      { key: 'B', content: '12', correct: true },
      { key: 'C', content: '24', correct: false },
      { key: 'D', content: '4', correct: false },
    ],
  },
  {
    content: 'Số 36 là bội số của số nào dưới đây?',
    difficulty: 'EASY',
    explanation: '36 = 4 × 9, vậy 36 là bội của 9.',
    options: [
      { key: 'A', content: '8', correct: false },
      { key: 'B', content: '5', correct: false },
      { key: 'C', content: '9', correct: true },
      { key: 'D', content: '7', correct: false },
    ],
  },
  {
    content: '3/5 - 1/4 = ?',
    difficulty: 'MEDIUM',
    explanation: '3/5 - 1/4 = 12/20 - 5/20 = 7/20.',
    options: [
      { key: 'A', content: '2/1', correct: false },
      { key: 'B', content: '7/20', correct: true },
      { key: 'C', content: '2/9', correct: false },
      { key: 'D', content: '1/5', correct: false },
    ],
  },
  {
    content: 'Kết quả của phép nhân 2/3 × 3/4 là?',
    difficulty: 'MEDIUM',
    explanation: '2/3 × 3/4 = 6/12 = 1/2.',
    options: [
      { key: 'A', content: '5/7', correct: false },
      { key: 'B', content: '6/7', correct: false },
      { key: 'C', content: '1/2', correct: true },
      { key: 'D', content: '1/4', correct: false },
    ],
  },
  {
    content: '5/6 ÷ 5/3 = ?',
    difficulty: 'MEDIUM',
    explanation: '5/6 ÷ 5/3 = 5/6 × 3/5 = 15/30 = 1/2.',
    options: [
      { key: 'A', content: '1/2', correct: true },
      { key: 'B', content: '25/18', correct: false },
      { key: 'C', content: '2', correct: false },
      { key: 'D', content: '1/3', correct: false },
    ],
  },
  {
    content: 'Diện tích hình vuông có cạnh 6 cm là?',
    difficulty: 'EASY',
    explanation: 'S = cạnh × cạnh = 6 × 6 = 36 cm².',
    options: [
      { key: 'A', content: '12 cm²', correct: false },
      { key: 'B', content: '24 cm²', correct: false },
      { key: 'C', content: '36 cm²', correct: true },
      { key: 'D', content: '18 cm²', correct: false },
    ],
  },
  {
    content: 'Chu vi hình vuông có cạnh 8 cm là?',
    difficulty: 'EASY',
    explanation: 'C = 4 × cạnh = 4 × 8 = 32 cm.',
    options: [
      { key: 'A', content: '16 cm', correct: false },
      { key: 'B', content: '64 cm', correct: false },
      { key: 'C', content: '32 cm', correct: true },
      { key: 'D', content: '24 cm', correct: false },
    ],
  },
  {
    content: 'Chu vi hình chữ nhật có chiều dài 9 cm và chiều rộng 5 cm là?',
    difficulty: 'EASY',
    explanation: 'C = (dài + rộng) × 2 = (9 + 5) × 2 = 28 cm.',
    options: [
      { key: 'A', content: '14 cm', correct: false },
      { key: 'B', content: '28 cm', correct: true },
      { key: 'C', content: '45 cm', correct: false },
      { key: 'D', content: '45 cm²', correct: false },
    ],
  },
  {
    content: 'Diện tích hình chữ nhật có chiều dài 12 cm và chiều rộng 7 cm là?',
    difficulty: 'EASY',
    explanation: 'S = dài × rộng = 12 × 7 = 84 cm².',
    options: [
      { key: 'A', content: '38 cm²', correct: false },
      { key: 'B', content: '84 cm²', correct: true },
      { key: 'C', content: '76 cm²', correct: false },
      { key: 'D', content: '19 cm²', correct: false },
    ],
  },
  {
    content: '456 789 làm tròn đến hàng nghìn là?',
    difficulty: 'MEDIUM',
    explanation: '456 789 → chữ số hàng trăm là 7 ≥ 5 nên làm tròn lên: 457 000.',
    options: [
      { key: 'A', content: '456 000', correct: false },
      { key: 'B', content: '457 000', correct: true },
      { key: 'C', content: '460 000', correct: false },
      { key: 'D', content: '500 000', correct: false },
    ],
  },
  {
    content: 'Số 2,748 làm tròn đến hàng phần trăm là?',
    difficulty: 'MEDIUM',
    explanation: 'Chữ số hàng phần nghìn là 8 ≥ 5 nên làm tròn lên: 2,75.',
    options: [
      { key: 'A', content: '2,7', correct: false },
      { key: 'B', content: '2,74', correct: false },
      { key: 'C', content: '2,75', correct: true },
      { key: 'D', content: '3,0', correct: false },
    ],
  },
  {
    content: 'Trong khai triển số 3 517, chữ số 5 có giá trị là?',
    difficulty: 'EASY',
    explanation: 'Trong số 3 517, chữ số 5 ở hàng trăm nên có giá trị là 500.',
    options: [
      { key: 'A', content: '5', correct: false },
      { key: 'B', content: '50', correct: false },
      { key: 'C', content: '500', correct: true },
      { key: 'D', content: '5 000', correct: false },
    ],
  },
  {
    content: 'Tổng các số từ 1 đến 10 là?',
    difficulty: 'MEDIUM',
    explanation: '1+2+3+4+5+6+7+8+9+10 = 55.',
    options: [
      { key: 'A', content: '50', correct: false },
      { key: 'B', content: '55', correct: true },
      { key: 'C', content: '45', correct: false },
      { key: 'D', content: '60', correct: false },
    ],
  },
  {
    content: 'Nếu 1 hộp bánh nặng 0,25 kg thì 8 hộp bánh nặng bao nhiêu kg?',
    difficulty: 'EASY',
    explanation: '0,25 × 8 = 2 kg.',
    options: [
      { key: 'A', content: '1,5 kg', correct: false },
      { key: 'B', content: '2 kg', correct: true },
      { key: 'C', content: '2,5 kg', correct: false },
      { key: 'D', content: '3 kg', correct: false },
    ],
  },
  {
    content: 'Một mảnh vải dài 5,4 m được cắt thành 3 phần bằng nhau. Mỗi phần dài bao nhiêu m?',
    difficulty: 'EASY',
    explanation: '5,4 ÷ 3 = 1,8 m.',
    options: [
      { key: 'A', content: '1,8 m', correct: true },
      { key: 'B', content: '2,0 m', correct: false },
      { key: 'C', content: '1,5 m', correct: false },
      { key: 'D', content: '2,4 m', correct: false },
    ],
  },
  {
    content: 'Một vườn cây hình chữ nhật dài 50 m, rộng 30 m. Diện tích vườn là bao nhiêu m²?',
    difficulty: 'EASY',
    explanation: 'S = 50 × 30 = 1 500 m².',
    options: [
      { key: 'A', content: '80 m²', correct: false },
      { key: 'B', content: '1 500 m²', correct: true },
      { key: 'C', content: '150 m²', correct: false },
      { key: 'D', content: '160 m²', correct: false },
    ],
  },
  {
    content: 'Một người thợ làm được 24 sản phẩm trong 3 giờ. Hỏi trong 8 giờ, người đó làm được bao nhiêu sản phẩm?',
    difficulty: 'MEDIUM',
    explanation: 'Năng suất: 24 ÷ 3 = 8 sản phẩm/giờ. Trong 8 giờ: 8 × 8 = 64 sản phẩm.',
    options: [
      { key: 'A', content: '48 sản phẩm', correct: false },
      { key: 'B', content: '64 sản phẩm', correct: true },
      { key: 'C', content: '72 sản phẩm', correct: false },
      { key: 'D', content: '56 sản phẩm', correct: false },
    ],
  },
  {
    content: 'Một xe tải chở 3,5 tấn hàng. Sau khi dỡ 1 200 kg, xe còn chở bao nhiêu kg?',
    difficulty: 'MEDIUM',
    explanation: '3,5 tấn = 3 500 kg. 3 500 - 1 200 = 2 300 kg.',
    options: [
      { key: 'A', content: '2 000 kg', correct: false },
      { key: 'B', content: '2 300 kg', correct: true },
      { key: 'C', content: '2 500 kg', correct: false },
      { key: 'D', content: '4 700 kg', correct: false },
    ],
  },
  {
    content: 'Diện tích xung quanh hình hộp chữ nhật có chiều dài 5 cm, chiều rộng 3 cm, chiều cao 4 cm là?',
    difficulty: 'HARD',
    explanation: 'Sxq = (dài + rộng) × 2 × cao = (5 + 3) × 2 × 4 = 64 cm².',
    options: [
      { key: 'A', content: '60 cm²', correct: false },
      { key: 'B', content: '64 cm²', correct: true },
      { key: 'C', content: '94 cm²', correct: false },
      { key: 'D', content: '30 cm²', correct: false },
    ],
  },
  {
    content: 'Tổng diện tích bề mặt hình lập phương có cạnh 4 cm là?',
    difficulty: 'HARD',
    explanation: 'Diện tích 1 mặt = 4 × 4 = 16 cm². Tổng 6 mặt = 16 × 6 = 96 cm².',
    options: [
      { key: 'A', content: '64 cm²', correct: false },
      { key: 'B', content: '96 cm²', correct: true },
      { key: 'C', content: '48 cm²', correct: false },
      { key: 'D', content: '80 cm²', correct: false },
    ],
  },
  {
    content: 'Nếu hôm nay là thứ Tư, thì sau 10 ngày là thứ mấy?',
    difficulty: 'MEDIUM',
    explanation: 'Thứ Tư + 10 ngày: 10 = 7 + 3, vậy sau 10 ngày là thứ Tư + 3 = thứ Bảy.',
    options: [
      { key: 'A', content: 'Thứ Sáu', correct: false },
      { key: 'B', content: 'Thứ Bảy', correct: true },
      { key: 'C', content: 'Chủ Nhật', correct: false },
      { key: 'D', content: 'Thứ Năm', correct: false },
    ],
  },
  {
    content: '4,5 giờ = ? phút',
    difficulty: 'EASY',
    explanation: '4,5 giờ = 4 giờ 30 phút = 4 × 60 + 30 = 270 phút.',
    options: [
      { key: 'A', content: '45 phút', correct: false },
      { key: 'B', content: '270 phút', correct: true },
      { key: 'C', content: '45 giờ', correct: false },
      { key: 'D', content: '250 phút', correct: false },
    ],
  },
  {
    content: '3,75 tấn = ? kg',
    difficulty: 'MEDIUM',
    explanation: '3,75 tấn = 3,75 × 1 000 = 3 750 kg.',
    options: [
      { key: 'A', content: '375 kg', correct: false },
      { key: 'B', content: '3 750 kg', correct: true },
      { key: 'C', content: '37 500 kg', correct: false },
      { key: 'D', content: '375 000 kg', correct: false },
    ],
  },
  {
    content: 'Số thập phân 0,375 viết dưới dạng phân số tối giản là?',
    difficulty: 'HARD',
    explanation: '0,375 = 375/1000. ƯCLN(375,1000)=125. 375/1000 = 3/8.',
    options: [
      { key: 'A', content: '3/8', correct: true },
      { key: 'B', content: '37/100', correct: false },
      { key: 'C', content: '3/4', correct: false },
      { key: 'D', content: '375/100', correct: false },
    ],
  },
  {
    content: '1/8 viết dưới dạng số thập phân là?',
    difficulty: 'MEDIUM',
    explanation: '1/8 = 1 ÷ 8 = 0,125.',
    options: [
      { key: 'A', content: '0,18', correct: false },
      { key: 'B', content: '0,125', correct: true },
      { key: 'C', content: '1,8', correct: false },
      { key: 'D', content: '0,8', correct: false },
    ],
  },
  {
    content: 'Tìm x: x ÷ 4 = 3,6',
    difficulty: 'EASY',
    explanation: 'x = 3,6 × 4 = 14,4.',
    options: [
      { key: 'A', content: '0,9', correct: false },
      { key: 'B', content: '7,6', correct: false },
      { key: 'C', content: '14,4', correct: true },
      { key: 'D', content: '12,4', correct: false },
    ],
  },
  {
    content: 'Trong số 4 527 618, chữ số 5 thuộc hàng nào?',
    difficulty: 'MEDIUM',
    explanation: '4 527 618: 4-triệu, 5-trăm nghìn, 2-chục nghìn, 7-nghìn, 6-trăm, 1-chục, 8-đơn vị. Chữ số 5 ở hàng trăm nghìn.',
    options: [
      { key: 'A', content: 'Hàng triệu', correct: false },
      { key: 'B', content: 'Hàng chục nghìn', correct: false },
      { key: 'C', content: 'Hàng trăm nghìn', correct: true },
      { key: 'D', content: 'Hàng nghìn', correct: false },
    ],
  },
  {
    content: 'Số 7 000 000 đọc là?',
    difficulty: 'EASY',
    explanation: '7 000 000 đọc là bảy triệu.',
    options: [
      { key: 'A', content: 'Bảy trăm nghìn', correct: false },
      { key: 'B', content: 'Bảy nghìn', correct: false },
      { key: 'C', content: 'Bảy triệu', correct: true },
      { key: 'D', content: 'Bảy mươi triệu', correct: false },
    ],
  },
  {
    content: '12 345 + 5 678 = ?',
    difficulty: 'EASY',
    explanation: '12 345 + 5 678 = 18 023.',
    options: [
      { key: 'A', content: '18 023', correct: true },
      { key: 'B', content: '17 023', correct: false },
      { key: 'C', content: '18 123', correct: false },
      { key: 'D', content: '18 013', correct: false },
    ],
  },
  {
    content: '50 000 - 28 456 = ?',
    difficulty: 'MEDIUM',
    explanation: '50 000 - 28 456 = 21 544.',
    options: [
      { key: 'A', content: '21 544', correct: true },
      { key: 'B', content: '21 644', correct: false },
      { key: 'C', content: '22 544', correct: false },
      { key: 'D', content: '21 454', correct: false },
    ],
  },
  {
    content: '125 × 8 = ?',
    difficulty: 'MEDIUM',
    explanation: '125 × 8 = 1 000.',
    options: [
      { key: 'A', content: '900', correct: false },
      { key: 'B', content: '1 000', correct: true },
      { key: 'C', content: '1 100', correct: false },
      { key: 'D', content: '1 200', correct: false },
    ],
  },
  {
    content: '4 500 ÷ 25 = ?',
    difficulty: 'MEDIUM',
    explanation: '4 500 ÷ 25 = 180.',
    options: [
      { key: 'A', content: '180', correct: true },
      { key: 'B', content: '160', correct: false },
      { key: 'C', content: '200', correct: false },
      { key: 'D', content: '175', correct: false },
    ],
  },
  {
    content: 'Một hình thang vuông có đáy lớn 14 cm, đáy nhỏ 8 cm, chiều cao 6 cm. Diện tích hình thang đó là?',
    difficulty: 'MEDIUM',
    explanation: 'S = (14 + 8) × 6 ÷ 2 = 22 × 6 ÷ 2 = 66 cm².',
    options: [
      { key: 'A', content: '66 cm²', correct: true },
      { key: 'B', content: '132 cm²', correct: false },
      { key: 'C', content: '48 cm²', correct: false },
      { key: 'D', content: '78 cm²', correct: false },
    ],
  },
  {
    content: 'Hai số có tổng là 9,8 và hiệu là 2,4. Tìm số lớn hơn.',
    difficulty: 'HARD',
    explanation: 'Số lớn = (9,8 + 2,4) ÷ 2 = 12,2 ÷ 2 = 6,1.',
    options: [
      { key: 'A', content: '6,1', correct: true },
      { key: 'B', content: '3,7', correct: false },
      { key: 'C', content: '7,1', correct: false },
      { key: 'D', content: '5,9', correct: false },
    ],
  },
  {
    content: 'Một kho hàng có 2 500 kg gạo. Mỗi ngày xuất kho 125 kg. Hỏi sau bao nhiêu ngày thì xuất hết gạo?',
    difficulty: 'MEDIUM',
    explanation: '2 500 ÷ 125 = 20 ngày.',
    options: [
      { key: 'A', content: '15 ngày', correct: false },
      { key: 'B', content: '20 ngày', correct: true },
      { key: 'C', content: '25 ngày', correct: false },
      { key: 'D', content: '18 ngày', correct: false },
    ],
  },
  {
    content: 'Một hồ bơi hình chữ nhật dài 50 m, rộng 25 m, sâu 2 m. Thể tích nước đổ đầy hồ là?',
    difficulty: 'MEDIUM',
    explanation: 'V = 50 × 25 × 2 = 2 500 m³.',
    options: [
      { key: 'A', content: '2 500 m³', correct: true },
      { key: 'B', content: '250 m³', correct: false },
      { key: 'C', content: '25 000 m³', correct: false },
      { key: 'D', content: '1 250 m³', correct: false },
    ],
  },
  {
    content: 'Số nào là số chẵn?',
    difficulty: 'EASY',
    explanation: 'Số chẵn là số chia hết cho 2. 36 chia hết cho 2.',
    options: [
      { key: 'A', content: '37', correct: false },
      { key: 'B', content: '39', correct: false },
      { key: 'C', content: '36', correct: true },
      { key: 'D', content: '41', correct: false },
    ],
  },
  {
    content: 'Số nguyên tố nào nhỏ hơn 10?',
    difficulty: 'MEDIUM',
    explanation: 'Số nguyên tố là số chỉ chia hết cho 1 và chính nó. Các số nguyên tố nhỏ hơn 10: 2, 3, 5, 7. Trong các đáp án, 7 là số nguyên tố.',
    options: [
      { key: 'A', content: '4', correct: false },
      { key: 'B', content: '6', correct: false },
      { key: 'C', content: '9', correct: false },
      { key: 'D', content: '7', correct: true },
    ],
  },
  {
    content: 'Biểu thức nào sau đây bằng 1?',
    difficulty: 'MEDIUM',
    explanation: '4/4 = 1.',
    options: [
      { key: 'A', content: '4/3', correct: false },
      { key: 'B', content: '4/4', correct: true },
      { key: 'C', content: '3/4', correct: false },
      { key: 'D', content: '0/4', correct: false },
    ],
  },
  {
    content: 'Một mảnh đất hình tam giác có đáy 20 m, chiều cao 12 m. Diện tích mảnh đất là?',
    difficulty: 'EASY',
    explanation: 'S = đáy × chiều cao ÷ 2 = 20 × 12 ÷ 2 = 120 m².',
    options: [
      { key: 'A', content: '240 m²', correct: false },
      { key: 'B', content: '120 m²', correct: true },
      { key: 'C', content: '60 m²', correct: false },
      { key: 'D', content: '32 m²', correct: false },
    ],
  },
  {
    content: 'Dãy số nào sau đây được xếp theo thứ tự từ bé đến lớn?',
    difficulty: 'MEDIUM',
    explanation: '0,1 < 0,5 < 1,5 < 2 theo đúng thứ tự từ bé đến lớn.',
    options: [
      { key: 'A', content: '2 ; 1,5 ; 0,5 ; 0,1', correct: false },
      { key: 'B', content: '0,1 ; 0,5 ; 1,5 ; 2', correct: true },
      { key: 'C', content: '0,5 ; 0,1 ; 2 ; 1,5', correct: false },
      { key: 'D', content: '1,5 ; 0,1 ; 0,5 ; 2', correct: false },
    ],
  },
  {
    content: 'Hai tàu thuyền xuất phát cùng lúc từ hai bến A và B chạy ngược chiều nhau. Vận tốc tàu A là 35 km/giờ, tàu B là 25 km/giờ. Biết A và B cách nhau 180 km. Sau bao lâu hai tàu gặp nhau?',
    difficulty: 'HARD',
    explanation: 'Vận tốc tổng = 35 + 25 = 60 km/giờ. Thời gian gặp nhau = 180 ÷ 60 = 3 giờ.',
    options: [
      { key: 'A', content: '2 giờ', correct: false },
      { key: 'B', content: '3 giờ', correct: true },
      { key: 'C', content: '4 giờ', correct: false },
      { key: 'D', content: '5 giờ', correct: false },
    ],
  },
  {
    content: 'Một bể nước hình hộp chữ nhật có chiều dài 2 m, chiều rộng 1,5 m, chiều cao 1 m. Bể hiện chứa 2/3 lượng nước. Thể tích nước trong bể là?',
    difficulty: 'HARD',
    explanation: 'V bể = 2 × 1,5 × 1 = 3 m³. Nước trong bể = 2/3 × 3 = 2 m³.',
    options: [
      { key: 'A', content: '1 m³', correct: false },
      { key: 'B', content: '2 m³', correct: true },
      { key: 'C', content: '3 m³', correct: false },
      { key: 'D', content: '1,5 m³', correct: false },
    ],
  },
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
