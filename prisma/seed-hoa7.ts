import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Hóa Học lớp 7...');

  // Upsert subject
  await prisma.subject.upsert({
    where: { code: 'HOA' },
    update: {},
    create: { id: 'sub-hoa', name: 'Hóa Học', code: 'HOA', description: 'Môn Hóa Học', icon: '🧪' },
  });

  // Upsert grade
  await prisma.grade.upsert({
    where: { id: 'grade-7' },
    update: {},
    create: { id: 'grade-7', name: 'Lớp 7', sortOrder: 7 },
  });

  // Topics Hóa Học 7
  await Promise.all([
    prisma.topic.upsert({ where: { id: 'hoa7-nguyen-tu' }, update: {}, create: { id: 'hoa7-nguyen-tu', subjectId: 'sub-hoa', gradeId: 'grade-7', name: 'Nguyên tử - Nguyên tố hóa học', sortOrder: 1 } }),
    prisma.topic.upsert({ where: { id: 'hoa7-phan-tu' }, update: {}, create: { id: 'hoa7-phan-tu', subjectId: 'sub-hoa', gradeId: 'grade-7', name: 'Phân tử - Đơn chất và Hợp chất', sortOrder: 2 } }),
    prisma.topic.upsert({ where: { id: 'hoa7-hoa-tri' }, update: {}, create: { id: 'hoa7-hoa-tri', subjectId: 'sub-hoa', gradeId: 'grade-7', name: 'Hóa trị - Công thức hóa học', sortOrder: 3 } }),
    prisma.topic.upsert({ where: { id: 'hoa7-phan-ung' }, update: {}, create: { id: 'hoa7-phan-ung', subjectId: 'sub-hoa', gradeId: 'grade-7', name: 'Phản ứng hóa học', sortOrder: 4 } }),
    prisma.topic.upsert({ where: { id: 'hoa7-acid-base' }, update: {}, create: { id: 'hoa7-acid-base', subjectId: 'sub-hoa', gradeId: 'grade-7', name: 'Acid - Base - pH', sortOrder: 5 } }),
  ]);

  type QuestionData = {
    id: string;
    content: string;
    topicId: string;
    difficulty: string;
    explanation: string;
    options: { key: string; content: string; correct: boolean }[];
  };

  const questions: QuestionData[] = [
    // ======= NGUYÊN TỬ - NGUYÊN TỐ HÓA HỌC (câu 1-25) =======
    {
      id: 'hoa7-q001', content: 'Nguyên tử là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử là hạt vô cùng nhỏ, trung hòa về điện, cấu tạo nên các chất.',
      options: [{ key: 'A', content: 'Hạt vô cùng nhỏ, trung hòa về điện, cấu tạo nên các chất', correct: true }, { key: 'B', content: 'Hạt mang điện tích dương', correct: false }, { key: 'C', content: 'Hạt nhỏ nhất trong vũ trụ', correct: false }, { key: 'D', content: 'Nhóm các phân tử liên kết nhau', correct: false }],
    },
    {
      id: 'hoa7-q002', content: 'Nguyên tử gồm những thành phần nào?', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử gồm hạt nhân (proton và neutron) và các electron chuyển động xung quanh.',
      options: [{ key: 'A', content: 'Chỉ có proton và neutron', correct: false }, { key: 'B', content: 'Hạt nhân (proton, neutron) và các electron', correct: true }, { key: 'C', content: 'Chỉ có electron', correct: false }, { key: 'D', content: 'Proton và electron trong hạt nhân', correct: false }],
    },
    {
      id: 'hoa7-q003', content: 'Hạt nào mang điện tích âm trong nguyên tử?', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Electron mang điện tích âm (-), proton mang điện tích dương (+), neutron trung hòa.',
      options: [{ key: 'A', content: 'Proton', correct: false }, { key: 'B', content: 'Neutron', correct: false }, { key: 'C', content: 'Electron', correct: true }, { key: 'D', content: 'Hạt nhân', correct: false }],
    },
    {
      id: 'hoa7-q004', content: 'Nguyên tử trung hòa về điện vì:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Trong nguyên tử, số proton (điện tích dương) bằng số electron (điện tích âm) nên nguyên tử trung hòa điện.',
      options: [{ key: 'A', content: 'Không chứa hạt mang điện', correct: false }, { key: 'B', content: 'Số proton bằng số neutron', correct: false }, { key: 'C', content: 'Số proton bằng số electron', correct: true }, { key: 'D', content: 'Số neutron bằng số electron', correct: false }],
    },
    {
      id: 'hoa7-q005', content: 'Nguyên tố hóa học là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tố hóa học là tập hợp các nguyên tử cùng loại, có cùng số proton trong hạt nhân.',
      options: [{ key: 'A', content: 'Tập hợp các phân tử cùng loại', correct: false }, { key: 'B', content: 'Tập hợp các nguyên tử cùng loại, có cùng số proton', correct: true }, { key: 'C', content: 'Một chất hóa học thuần khiết', correct: false }, { key: 'D', content: 'Hỗn hợp nhiều loại nguyên tử', correct: false }],
    },
    {
      id: 'hoa7-q006', content: 'Ký hiệu hóa học của nguyên tố Oxy là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Ký hiệu hóa học của Oxy là O (viết hoa chữ cái đầu của tên Latin: Oxygenium).',
      options: [{ key: 'A', content: 'Ox', correct: false }, { key: 'B', content: 'OX', correct: false }, { key: 'C', content: 'O', correct: true }, { key: 'D', content: 'Oy', correct: false }],
    },
    {
      id: 'hoa7-q007', content: 'Ký hiệu hóa học của Natri là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Natri có ký hiệu Na (từ tiếng Latin: Natrium).',
      options: [{ key: 'A', content: 'N', correct: false }, { key: 'B', content: 'Na', correct: true }, { key: 'C', content: 'Nt', correct: false }, { key: 'D', content: 'NT', correct: false }],
    },
    {
      id: 'hoa7-q008', content: 'Ký hiệu hóa học của Sắt là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Sắt có ký hiệu Fe (từ tiếng Latin: Ferrum).',
      options: [{ key: 'A', content: 'S', correct: false }, { key: 'B', content: 'Sr', correct: false }, { key: 'C', content: 'Fe', correct: true }, { key: 'D', content: 'Sa', correct: false }],
    },
    {
      id: 'hoa7-q009', content: 'Nguyên tử khối của Carbon (C) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Carbon là 12 đvC (đơn vị cacbon).',
      options: [{ key: 'A', content: '6', correct: false }, { key: 'B', content: '12', correct: true }, { key: 'C', content: '14', correct: false }, { key: 'D', content: '16', correct: false }],
    },
    {
      id: 'hoa7-q010', content: 'Nguyên tử khối của Oxy (O) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Oxy là 16 đvC.',
      options: [{ key: 'A', content: '8', correct: false }, { key: 'B', content: '12', correct: false }, { key: 'C', content: '14', correct: false }, { key: 'D', content: '16', correct: true }],
    },
    {
      id: 'hoa7-q011', content: 'Nguyên tử khối của Hydro (H) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Hydro là 1 đvC, nhỏ nhất trong các nguyên tố.',
      options: [{ key: 'A', content: '1', correct: true }, { key: 'B', content: '2', correct: false }, { key: 'C', content: '4', correct: false }, { key: 'D', content: '8', correct: false }],
    },
    {
      id: 'hoa7-q012', content: 'Số proton trong hạt nhân nguyên tử Natri (Na) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'MEDIUM',
      explanation: 'Natri (Na) có số proton = số hiệu nguyên tử = 11.',
      options: [{ key: 'A', content: '10', correct: false }, { key: 'B', content: '11', correct: true }, { key: 'C', content: '12', correct: false }, { key: 'D', content: '23', correct: false }],
    },
    {
      id: 'hoa7-q013', content: 'Nguyên tử khối của Canxi (Ca) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Canxi là 40 đvC.',
      options: [{ key: 'A', content: '20', correct: false }, { key: 'B', content: '35', correct: false }, { key: 'C', content: '40', correct: true }, { key: 'D', content: '48', correct: false }],
    },
    {
      id: 'hoa7-q014', content: 'Hạt nhân nguyên tử gồm:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Hạt nhân nguyên tử gồm proton (mang điện tích dương) và neutron (trung hòa điện).',
      options: [{ key: 'A', content: 'Electron và proton', correct: false }, { key: 'B', content: 'Proton và neutron', correct: true }, { key: 'C', content: 'Electron và neutron', correct: false }, { key: 'D', content: 'Chỉ có proton', correct: false }],
    },
    {
      id: 'hoa7-q015', content: 'Lớp vỏ nguyên tử gồm:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Lớp vỏ nguyên tử gồm các electron chuyển động xung quanh hạt nhân theo từng lớp.',
      options: [{ key: 'A', content: 'Proton và neutron', correct: false }, { key: 'B', content: 'Các electron chuyển động theo lớp', correct: true }, { key: 'C', content: 'Neutron', correct: false }, { key: 'D', content: 'Ion dương', correct: false }],
    },
    {
      id: 'hoa7-q016', content: 'Nguyên tử khối của Nhôm (Al) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Nhôm là 27 đvC.',
      options: [{ key: 'A', content: '13', correct: false }, { key: 'B', content: '27', correct: true }, { key: 'C', content: '28', correct: false }, { key: 'D', content: '32', correct: false }],
    },
    {
      id: 'hoa7-q017', content: 'Ký hiệu hóa học của Nitơ là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nitơ có ký hiệu N (từ tiếng Latin: Nitrogenium).',
      options: [{ key: 'A', content: 'Ni', correct: false }, { key: 'B', content: 'NT', correct: false }, { key: 'C', content: 'N', correct: true }, { key: 'D', content: 'Nt', correct: false }],
    },
    {
      id: 'hoa7-q018', content: 'Ký hiệu hóa học của Canxi là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Canxi có ký hiệu Ca (từ tiếng Latin: Calcium).',
      options: [{ key: 'A', content: 'C', correct: false }, { key: 'B', content: 'Cn', correct: false }, { key: 'C', content: 'Ca', correct: true }, { key: 'D', content: 'Cl', correct: false }],
    },
    {
      id: 'hoa7-q019', content: 'Điều nào sau đây về nguyên tử khối là đúng?', topicId: 'hoa7-nguyen-tu', difficulty: 'MEDIUM',
      explanation: 'Nguyên tử khối là khối lượng của nguyên tử tính bằng đơn vị cacbon (đvC), bằng tổng số proton và neutron.',
      options: [{ key: 'A', content: 'Bằng số electron trong nguyên tử', correct: false }, { key: 'B', content: 'Là khối lượng tuyệt đối của nguyên tử (gam)', correct: false }, { key: 'C', content: 'Bằng tổng số proton và neutron', correct: true }, { key: 'D', content: 'Bằng số proton trong hạt nhân', correct: false }],
    },
    {
      id: 'hoa7-q020', content: 'Nguyên tử khối của Lưu huỳnh (S) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Nguyên tử khối của Lưu huỳnh là 32 đvC.',
      options: [{ key: 'A', content: '16', correct: false }, { key: 'B', content: '28', correct: false }, { key: 'C', content: '32', correct: true }, { key: 'D', content: '35', correct: false }],
    },
    {
      id: 'hoa7-q021', content: 'Ký hiệu hóa học của Đồng là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Đồng có ký hiệu Cu (từ tiếng Latin: Cuprum).',
      options: [{ key: 'A', content: 'D', correct: false }, { key: 'B', content: 'Cu', correct: true }, { key: 'C', content: 'Co', correct: false }, { key: 'D', content: 'Cd', correct: false }],
    },
    {
      id: 'hoa7-q022', content: 'Ký hiệu hóa học của Kẽm là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Kẽm có ký hiệu Zn (từ tiếng Đức: Zink).',
      options: [{ key: 'A', content: 'K', correct: false }, { key: 'B', content: 'Ke', correct: false }, { key: 'C', content: 'Zn', correct: true }, { key: 'D', content: 'Zk', correct: false }],
    },
    {
      id: 'hoa7-q023', content: 'Ký hiệu hóa học của Clo là:', topicId: 'hoa7-nguyen-tu', difficulty: 'EASY',
      explanation: 'Clo có ký hiệu Cl (từ tiếng Latin: Chlorum).',
      options: [{ key: 'A', content: 'C', correct: false }, { key: 'B', content: 'Co', correct: false }, { key: 'C', content: 'Cl', correct: true }, { key: 'D', content: 'Cr', correct: false }],
    },
    {
      id: 'hoa7-q024', content: 'Nguyên tố nào chiếm tỉ lệ lớn nhất trong vỏ Trái Đất?', topicId: 'hoa7-nguyen-tu', difficulty: 'MEDIUM',
      explanation: 'Oxy (O) chiếm khoảng 49% khối lượng vỏ Trái Đất, là nguyên tố phổ biến nhất.',
      options: [{ key: 'A', content: 'Silicon (Si)', correct: false }, { key: 'B', content: 'Nhôm (Al)', correct: false }, { key: 'C', content: 'Sắt (Fe)', correct: false }, { key: 'D', content: 'Oxy (O)', correct: true }],
    },
    {
      id: 'hoa7-q025', content: 'Nguyên tử khối của Kali (K) là:', topicId: 'hoa7-nguyen-tu', difficulty: 'MEDIUM',
      explanation: 'Nguyên tử khối của Kali là 39 đvC.',
      options: [{ key: 'A', content: '19', correct: false }, { key: 'B', content: '35', correct: false }, { key: 'C', content: '39', correct: true }, { key: 'D', content: '40', correct: false }],
    },

    // ======= PHÂN TỬ - ĐƠN CHẤT VÀ HỢP CHẤT (câu 26-45) =======
    {
      id: 'hoa7-q026', content: 'Phân tử là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau, thể hiện đầy đủ tính chất hóa học của chất.',
      options: [{ key: 'A', content: 'Một nguyên tử đơn lẻ', correct: false }, { key: 'B', content: 'Hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau', correct: true }, { key: 'C', content: 'Nhóm nhiều nguyên tố khác nhau', correct: false }, { key: 'D', content: 'Ion mang điện tích', correct: false }],
    },
    {
      id: 'hoa7-q027', content: 'Đơn chất là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Đơn chất là chất được tạo nên từ một nguyên tố hóa học duy nhất.',
      options: [{ key: 'A', content: 'Chất được tạo từ nhiều nguyên tố', correct: false }, { key: 'B', content: 'Chất được tạo từ một nguyên tố hóa học duy nhất', correct: true }, { key: 'C', content: 'Hỗn hợp nhiều chất', correct: false }, { key: 'D', content: 'Chất không có cấu tạo xác định', correct: false }],
    },
    {
      id: 'hoa7-q028', content: 'Hợp chất là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Hợp chất là chất được tạo nên từ hai hay nhiều nguyên tố hóa học.',
      options: [{ key: 'A', content: 'Chất tạo từ một nguyên tố duy nhất', correct: false }, { key: 'B', content: 'Chất tạo từ hai hay nhiều nguyên tố hóa học', correct: true }, { key: 'C', content: 'Hỗn hợp nhiều đơn chất', correct: false }, { key: 'D', content: 'Chất chỉ có trong tự nhiên', correct: false }],
    },
    {
      id: 'hoa7-q029', content: 'Nước (H₂O) là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Nước (H₂O) tạo từ 2 nguyên tố H và O nên là hợp chất.',
      options: [{ key: 'A', content: 'Đơn chất', correct: false }, { key: 'B', content: 'Hợp chất', correct: true }, { key: 'C', content: 'Hỗn hợp', correct: false }, { key: 'D', content: 'Nguyên tố', correct: false }],
    },
    {
      id: 'hoa7-q030', content: 'Khí Oxy (O₂) là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'O₂ chỉ gồm nguyên tố Oxy nên là đơn chất.',
      options: [{ key: 'A', content: 'Hợp chất', correct: false }, { key: 'B', content: 'Đơn chất', correct: true }, { key: 'C', content: 'Hỗn hợp', correct: false }, { key: 'D', content: 'Dung dịch', correct: false }],
    },
    {
      id: 'hoa7-q031', content: 'Phân tử khối của H₂O là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử khối H₂O = 2×H + O = 2×1 + 16 = 18 đvC.',
      options: [{ key: 'A', content: '16 đvC', correct: false }, { key: 'B', content: '17 đvC', correct: false }, { key: 'C', content: '18 đvC', correct: true }, { key: 'D', content: '20 đvC', correct: false }],
    },
    {
      id: 'hoa7-q032', content: 'Phân tử khối của CO₂ là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử khối CO₂ = C + 2×O = 12 + 2×16 = 44 đvC.',
      options: [{ key: 'A', content: '28 đvC', correct: false }, { key: 'B', content: '40 đvC', correct: false }, { key: 'C', content: '44 đvC', correct: true }, { key: 'D', content: '48 đvC', correct: false }],
    },
    {
      id: 'hoa7-q033', content: 'Phân tử khối của NaCl (muối ăn) là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử khối NaCl = Na + Cl = 23 + 35,5 = 58,5 đvC.',
      options: [{ key: 'A', content: '50 đvC', correct: false }, { key: 'B', content: '58,5 đvC', correct: true }, { key: 'C', content: '60 đvC', correct: false }, { key: 'D', content: '35 đvC', correct: false }],
    },
    {
      id: 'hoa7-q034', content: 'Chất nào sau đây là đơn chất?', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Kim cương (C) chỉ gồm nguyên tố Carbon, là đơn chất. NaCl, H₂O, CO₂ là hợp chất.',
      options: [{ key: 'A', content: 'NaCl', correct: false }, { key: 'B', content: 'H₂O', correct: false }, { key: 'C', content: 'Kim cương (C)', correct: true }, { key: 'D', content: 'CO₂', correct: false }],
    },
    {
      id: 'hoa7-q035', content: 'Chất nào sau đây là hợp chất?', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Axit clohidric (HCl) gồm H và Cl → hợp chất. N₂, Cu, Fe là đơn chất.',
      options: [{ key: 'A', content: 'Nitơ (N₂)', correct: false }, { key: 'B', content: 'Đồng (Cu)', correct: false }, { key: 'C', content: 'Sắt (Fe)', correct: false }, { key: 'D', content: 'Axit clohidric (HCl)', correct: true }],
    },
    {
      id: 'hoa7-q036', content: 'Phân tử khối của H₂SO₄ (axit sunfuric) là:', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'Phân tử khối H₂SO₄ = 2×H + S + 4×O = 2×1 + 32 + 4×16 = 98 đvC.',
      options: [{ key: 'A', content: '80 đvC', correct: false }, { key: 'B', content: '96 đvC', correct: false }, { key: 'C', content: '98 đvC', correct: true }, { key: 'D', content: '100 đvC', correct: false }],
    },
    {
      id: 'hoa7-q037', content: 'Phân tử khối của CaCO₃ (đá vôi) là:', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'Phân tử khối CaCO₃ = Ca + C + 3×O = 40 + 12 + 3×16 = 100 đvC.',
      options: [{ key: 'A', content: '80 đvC', correct: false }, { key: 'B', content: '84 đvC', correct: false }, { key: 'C', content: '100 đvC', correct: true }, { key: 'D', content: '120 đvC', correct: false }],
    },
    {
      id: 'hoa7-q038', content: 'Không khí là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Không khí là hỗn hợp của nhiều khí (N₂, O₂, CO₂...) không có tỉ lệ cố định về thành phần, nên là hỗn hợp, không phải hợp chất.',
      options: [{ key: 'A', content: 'Đơn chất', correct: false }, { key: 'B', content: 'Hợp chất', correct: false }, { key: 'C', content: 'Hỗn hợp', correct: true }, { key: 'D', content: 'Nguyên tố', correct: false }],
    },
    {
      id: 'hoa7-q039', content: 'Phân tử của đơn chất kim loại như đồng (Cu) gồm:', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'Đơn chất kim loại có phân tử chỉ gồm 1 nguyên tử kim loại đó, nên CTHH viết bằng ký hiệu nguyên tố.',
      options: [{ key: 'A', content: 'Nhiều nguyên tử đồng liên kết', correct: false }, { key: 'B', content: 'Một nguyên tử đồng', correct: true }, { key: 'C', content: 'Một nguyên tử đồng và oxy', correct: false }, { key: 'D', content: 'Hai nguyên tử đồng', correct: false }],
    },
    {
      id: 'hoa7-q040', content: 'Phân tử khối của NaOH (natri hydroxit) là:', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'Phân tử khối NaOH = Na + O + H = 23 + 16 + 1 = 40 đvC.',
      options: [{ key: 'A', content: '38 đvC', correct: false }, { key: 'B', content: '40 đvC', correct: true }, { key: 'C', content: '42 đvC', correct: false }, { key: 'D', content: '56 đvC', correct: false }],
    },
    {
      id: 'hoa7-q041', content: 'Phân tử H₂ gồm:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử H₂ gồm 2 nguyên tử Hydro liên kết cộng hóa trị với nhau.',
      options: [{ key: 'A', content: '1 nguyên tử H', correct: false }, { key: 'B', content: '2 nguyên tử H', correct: true }, { key: 'C', content: '1 nguyên tử H và 1 nguyên tử O', correct: false }, { key: 'D', content: '3 nguyên tử H', correct: false }],
    },
    {
      id: 'hoa7-q042', content: 'Phân tử O₃ (ozon) gồm:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử ozon (O₃) gồm 3 nguyên tử Oxy liên kết với nhau.',
      options: [{ key: 'A', content: '2 nguyên tử O', correct: false }, { key: 'B', content: '3 nguyên tử O', correct: true }, { key: 'C', content: '4 nguyên tử O', correct: false }, { key: 'D', content: '1 nguyên tử O', correct: false }],
    },
    {
      id: 'hoa7-q043', content: 'Chất nào dưới đây gồm 3 nguyên tố?', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'NaHCO₃ gồm Na, H, C, O — là 4 nguyên tố. H₂SO₄ gồm H, S, O — là 3 nguyên tố.',
      options: [{ key: 'A', content: 'NaCl', correct: false }, { key: 'B', content: 'CO₂', correct: false }, { key: 'C', content: 'H₂SO₄', correct: true }, { key: 'D', content: 'H₂', correct: false }],
    },
    {
      id: 'hoa7-q044', content: 'Công thức phân tử của amoniac là NH₃. Phân tử khối của NH₃ là:', topicId: 'hoa7-phan-tu', difficulty: 'EASY',
      explanation: 'Phân tử khối NH₃ = N + 3×H = 14 + 3×1 = 17 đvC.',
      options: [{ key: 'A', content: '14 đvC', correct: false }, { key: 'B', content: '15 đvC', correct: false }, { key: 'C', content: '17 đvC', correct: true }, { key: 'D', content: '18 đvC', correct: false }],
    },
    {
      id: 'hoa7-q045', content: 'Phân tử khối của Fe₂O₃ (oxit sắt III) là:', topicId: 'hoa7-phan-tu', difficulty: 'MEDIUM',
      explanation: 'Phân tử khối Fe₂O₃ = 2×Fe + 3×O = 2×56 + 3×16 = 112 + 48 = 160 đvC.',
      options: [{ key: 'A', content: '120 đvC', correct: false }, { key: 'B', content: '140 đvC', correct: false }, { key: 'C', content: '160 đvC', correct: true }, { key: 'D', content: '180 đvC', correct: false }],
    },

    // ======= HÓA TRỊ - CÔNG THỨC HÓA HỌC (câu 46-65) =======
    {
      id: 'hoa7-q046', content: 'Hóa trị là gì?', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Hóa trị là con số biểu thị khả năng liên kết của nguyên tử nguyên tố này với nguyên tử nguyên tố khác.',
      options: [{ key: 'A', content: 'Số nguyên tử trong phân tử', correct: false }, { key: 'B', content: 'Con số biểu thị khả năng liên kết của nguyên tử', correct: true }, { key: 'C', content: 'Khối lượng của một nguyên tử', correct: false }, { key: 'D', content: 'Số proton trong hạt nhân', correct: false }],
    },
    {
      id: 'hoa7-q047', content: 'Hóa trị của Hydro (H) trong hợp chất thường là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Hydro luôn có hóa trị I trong hầu hết các hợp chất, dùng làm chuẩn để xác định hóa trị.',
      options: [{ key: 'A', content: 'I', correct: true }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q048', content: 'Hóa trị của Oxy (O) trong hợp chất thường là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Oxy hầu như luôn có hóa trị II trong các hợp chất (trừ một số trường hợp đặc biệt như H₂O₂).',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: true }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q049', content: 'Quy tắc hóa trị phát biểu rằng: Trong công thức A_xB_y:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Quy tắc hóa trị: x × a = y × b, trong đó a là hóa trị của A, b là hóa trị của B.',
      options: [{ key: 'A', content: 'x + a = y + b', correct: false }, { key: 'B', content: 'x × a = y × b', correct: true }, { key: 'C', content: 'x / a = y / b', correct: false }, { key: 'D', content: 'x - a = y - b', correct: false }],
    },
    {
      id: 'hoa7-q050', content: 'Hóa trị của Nhôm (Al) trong hợp chất là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Nhôm (Al) có hóa trị III trong hầu hết các hợp chất (Al₂O₃, AlCl₃, Al(OH)₃...).',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: true }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q051', content: 'Công thức hóa học đúng của nhôm oxit là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Al có hóa trị III, O có hóa trị II. Theo quy tắc: 2×III = 3×II → Al₂O₃.',
      options: [{ key: 'A', content: 'AlO', correct: false }, { key: 'B', content: 'Al₂O₃', correct: true }, { key: 'C', content: 'AlO₂', correct: false }, { key: 'D', content: 'Al₃O₂', correct: false }],
    },
    {
      id: 'hoa7-q052', content: 'Công thức hóa học đúng của sắt (III) oxit là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Fe(III) hóa trị III, O hóa trị II. Theo quy tắc: 2×III = 3×II → Fe₂O₃.',
      options: [{ key: 'A', content: 'FeO', correct: false }, { key: 'B', content: 'Fe₂O₃', correct: true }, { key: 'C', content: 'Fe₃O₂', correct: false }, { key: 'D', content: 'FeO₂', correct: false }],
    },
    {
      id: 'hoa7-q053', content: 'Hóa trị của Natri (Na) trong hợp chất là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Natri (Na) có hóa trị I trong tất cả hợp chất (NaCl, Na₂O, NaOH...).',
      options: [{ key: 'A', content: 'I', correct: true }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q054', content: 'Trong hợp chất H₂O, hóa trị của O là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'H có hóa trị I. Theo quy tắc: 2×I = 1×a → a = II. Vậy O có hóa trị II.',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: true }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q055', content: 'Công thức hóa học của canxi oxit (vôi sống) là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Ca có hóa trị II, O có hóa trị II. Theo quy tắc: 1×II = 1×II → CaO.',
      options: [{ key: 'A', content: 'CaO₂', correct: false }, { key: 'B', content: 'Ca₂O', correct: false }, { key: 'C', content: 'CaO', correct: true }, { key: 'D', content: 'Ca₂O₃', correct: false }],
    },
    {
      id: 'hoa7-q056', content: 'Trong NH₃, hóa trị của Nitơ (N) là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'H có hóa trị I. Theo quy tắc: 1×a = 3×I → a = III. Vậy N có hóa trị III trong NH₃.',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: true }, { key: 'D', content: 'V', correct: false }],
    },
    {
      id: 'hoa7-q057', content: 'Công thức hóa học của natri oxit (Na₂O) cho thấy hóa trị của Na là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Trong Na₂O: O có hóa trị II. 2×a = 1×II → a = I. Na có hóa trị I.',
      options: [{ key: 'A', content: 'I', correct: true }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q058', content: 'Hóa trị của Canxi (Ca) trong hợp chất thường là:', topicId: 'hoa7-hoa-tri', difficulty: 'EASY',
      explanation: 'Canxi (Ca) có hóa trị II trong hầu hết các hợp chất (CaO, Ca(OH)₂, CaCl₂...).',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: true }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q059', content: 'Công thức hóa học đúng của đồng (II) oxit là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Cu(II) hóa trị II, O hóa trị II. 1×II = 1×II → CuO.',
      options: [{ key: 'A', content: 'Cu₂O', correct: false }, { key: 'B', content: 'CuO', correct: true }, { key: 'C', content: 'CuO₂', correct: false }, { key: 'D', content: 'Cu₂O₃', correct: false }],
    },
    {
      id: 'hoa7-q060', content: 'Công thức hóa học của kẽm oxit là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Zn có hóa trị II, O có hóa trị II. 1×II = 1×II → ZnO.',
      options: [{ key: 'A', content: 'Zn₂O', correct: false }, { key: 'B', content: 'ZnO₂', correct: false }, { key: 'C', content: 'ZnO', correct: true }, { key: 'D', content: 'Zn₂O₃', correct: false }],
    },
    {
      id: 'hoa7-q061', content: 'Carbon (C) có hóa trị IV trong CO₂ vì:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Trong CO₂: O có hóa trị II, có 2 nguyên tử O. Theo quy tắc: 1×a = 2×II = 4 → a = IV.',
      options: [{ key: 'A', content: '1 nguyên tử C liên kết với 2 nguyên tử O, mỗi O hóa trị II', correct: true }, { key: 'B', content: 'Carbon luôn có hóa trị IV', correct: false }, { key: 'C', content: 'CO₂ có 4 nguyên tử', correct: false }, { key: 'D', content: 'Carbon nặng hơn Oxy', correct: false }],
    },
    {
      id: 'hoa7-q062', content: 'Trong hợp chất Fe₂O₃, hóa trị của sắt là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Trong Fe₂O₃: O hóa trị II, có 3O → tổng hóa trị O = 6. Fe có 2 nguyên tử → hóa trị Fe = 6/2 = III.',
      options: [{ key: 'A', content: 'I', correct: false }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: true }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q063', content: 'Hóa trị của nhóm OH⁻ (hydroxyl) là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Nhóm OH⁻ có hóa trị I, tương tự như nguyên tử Hydro trong hợp chất.',
      options: [{ key: 'A', content: 'I', correct: true }, { key: 'B', content: 'II', correct: false }, { key: 'C', content: 'III', correct: false }, { key: 'D', content: 'IV', correct: false }],
    },
    {
      id: 'hoa7-q064', content: 'Công thức của canxi hydroxide (vôi tôi) là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Ca hóa trị II, OH hóa trị I. Theo quy tắc: 1×II = 2×I → Ca(OH)₂.',
      options: [{ key: 'A', content: 'CaOH', correct: false }, { key: 'B', content: 'Ca(OH)₂', correct: true }, { key: 'C', content: 'Ca₂OH', correct: false }, { key: 'D', content: 'Ca₂(OH)₃', correct: false }],
    },
    {
      id: 'hoa7-q065', content: 'Sắt (II) oxit có công thức là:', topicId: 'hoa7-hoa-tri', difficulty: 'MEDIUM',
      explanation: 'Fe(II) hóa trị II, O hóa trị II. 1×II = 1×II → FeO.',
      options: [{ key: 'A', content: 'Fe₂O₃', correct: false }, { key: 'B', content: 'FeO', correct: true }, { key: 'C', content: 'Fe₂O', correct: false }, { key: 'D', content: 'Fe₃O₄', correct: false }],
    },

    // ======= PHẢN ỨNG HÓA HỌC (câu 66-85) =======
    {
      id: 'hoa7-q066', content: 'Phản ứng hóa học là:', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Phản ứng hóa học là quá trình biến đổi chất này thành chất khác, có sự thay đổi liên kết giữa các nguyên tử.',
      options: [{ key: 'A', content: 'Quá trình thay đổi trạng thái vật lý của chất', correct: false }, { key: 'B', content: 'Quá trình biến đổi chất này thành chất khác', correct: true }, { key: 'C', content: 'Sự hòa tan chất vào nước', correct: false }, { key: 'D', content: 'Sự thay đổi màu sắc của chất', correct: false }],
    },
    {
      id: 'hoa7-q067', content: 'Trong phản ứng hóa học, chất ban đầu gọi là:', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Chất đầu vào (bên trái mũi tên) gọi là chất phản ứng (chất tham gia), chất tạo thành gọi là sản phẩm.',
      options: [{ key: 'A', content: 'Sản phẩm', correct: false }, { key: 'B', content: 'Chất phản ứng (chất tham gia)', correct: true }, { key: 'C', content: 'Chất xúc tác', correct: false }, { key: 'D', content: 'Dung môi', correct: false }],
    },
    {
      id: 'hoa7-q068', content: 'Điều kiện nào KHÔNG cần thiết để phản ứng hóa học xảy ra?', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Màu sắc của chất phản ứng không ảnh hưởng đến việc phản ứng có xảy ra hay không. Điều kiện cần là nhiệt độ, chất xúc tác, áp suất...',
      options: [{ key: 'A', content: 'Nhiệt độ thích hợp', correct: false }, { key: 'B', content: 'Chất xúc tác (trong một số trường hợp)', correct: false }, { key: 'C', content: 'Màu sắc của chất phản ứng', correct: true }, { key: 'D', content: 'Tiếp xúc giữa các chất', correct: false }],
    },
    {
      id: 'hoa7-q069', content: 'Dấu hiệu nhận biết có phản ứng hóa học xảy ra là:', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Dấu hiệu của phản ứng hóa học gồm: sinh ra chất kết tủa, khí, thay đổi màu sắc, tỏa/thu nhiệt, phát sáng...',
      options: [{ key: 'A', content: 'Chỉ thay đổi màu sắc', correct: false }, { key: 'B', content: 'Sinh ra chất mới (kết tủa, khí, màu sắc thay đổi, toả nhiệt...)', correct: true }, { key: 'C', content: 'Chỉ khi có khói bay ra', correct: false }, { key: 'D', content: 'Khối lượng thay đổi', correct: false }],
    },
    {
      id: 'hoa7-q070', content: 'Phương trình hóa học cho biết điều gì?', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Phương trình hóa học cho biết chất tham gia, sản phẩm và tỉ lệ số mol của các chất trong phản ứng.',
      options: [{ key: 'A', content: 'Chỉ tên các chất tham gia', correct: false }, { key: 'B', content: 'Chất tham gia, sản phẩm và tỉ lệ số mol', correct: true }, { key: 'C', content: 'Màu sắc các chất', correct: false }, { key: 'D', content: 'Nhiệt độ phản ứng', correct: false }],
    },
    {
      id: 'hoa7-q071', content: 'Theo định luật bảo toàn khối lượng:', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Định luật bảo toàn khối lượng: Tổng khối lượng chất phản ứng bằng tổng khối lượng sản phẩm.',
      options: [{ key: 'A', content: 'Khối lượng sản phẩm luôn lớn hơn chất phản ứng', correct: false }, { key: 'B', content: 'Tổng khối lượng chất phản ứng = Tổng khối lượng sản phẩm', correct: true }, { key: 'C', content: 'Số nguyên tử thay đổi trong phản ứng', correct: false }, { key: 'D', content: 'Khối lượng bị mất đi dưới dạng nhiệt', correct: false }],
    },
    {
      id: 'hoa7-q072', content: 'Phản ứng đốt cháy than: C + O₂ → CO₂. Đây là loại phản ứng gì?', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Phản ứng đốt cháy là phản ứng oxi hóa, chất cháy kết hợp với oxy tạo ra oxit và tỏa nhiệt lớn.',
      options: [{ key: 'A', content: 'Phản ứng phân hủy', correct: false }, { key: 'B', content: 'Phản ứng hóa hợp (kết hợp)', correct: true }, { key: 'C', content: 'Phản ứng thế', correct: false }, { key: 'D', content: 'Phản ứng trao đổi', correct: false }],
    },
    {
      id: 'hoa7-q073', content: 'Phản ứng 2H₂O → 2H₂ + O₂ là loại phản ứng:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Một chất ban đầu (H₂O) bị phân tách thành nhiều chất đơn giản hơn (H₂ và O₂) → phản ứng phân hủy.',
      options: [{ key: 'A', content: 'Phản ứng hóa hợp', correct: false }, { key: 'B', content: 'Phản ứng phân hủy', correct: true }, { key: 'C', content: 'Phản ứng thế', correct: false }, { key: 'D', content: 'Phản ứng trao đổi', correct: false }],
    },
    {
      id: 'hoa7-q074', content: 'Để cân bằng phương trình H₂ + O₂ → H₂O, hệ số đúng là:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Cân bằng: 2H₂ + O₂ → 2H₂O. Kiểm tra: H: 4=4, O: 2=2.',
      options: [{ key: 'A', content: 'H₂ + O₂ → H₂O', correct: false }, { key: 'B', content: '2H₂ + O₂ → 2H₂O', correct: true }, { key: 'C', content: 'H₂ + 2O₂ → 2H₂O', correct: false }, { key: 'D', content: '4H₂ + O₂ → 4H₂O', correct: false }],
    },
    {
      id: 'hoa7-q075', content: 'Chất xúc tác trong phản ứng hóa học có vai trò:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Chất xúc tác làm tăng tốc độ phản ứng nhưng không bị tiêu hao sau phản ứng (không thay đổi về lượng và chất).',
      options: [{ key: 'A', content: 'Là sản phẩm của phản ứng', correct: false }, { key: 'B', content: 'Làm tăng tốc độ phản ứng nhưng không bị tiêu hao', correct: true }, { key: 'C', content: 'Làm giảm tốc độ phản ứng', correct: false }, { key: 'D', content: 'Là chất tham gia phản ứng', correct: false }],
    },
    {
      id: 'hoa7-q076', content: 'Hiện tượng nào sau đây là phản ứng hóa học (biến đổi hóa học)?', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Sắt bị gỉ là phản ứng hóa học (sắt tác dụng với oxy và hơi nước tạo Fe₂O₃). Nước đông thành đá, nước bay hơi là biến đổi vật lý.',
      options: [{ key: 'A', content: 'Nước đông thành đá', correct: false }, { key: 'B', content: 'Nước bay hơi', correct: false }, { key: 'C', content: 'Sắt bị gỉ', correct: true }, { key: 'D', content: 'Đường tan vào nước', correct: false }],
    },
    {
      id: 'hoa7-q077', content: 'Hiện tượng nào sau đây là biến đổi vật lý?', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Hòa tan đường vào nước là biến đổi vật lý vì đường vẫn là đường, chỉ thay đổi trạng thái phân tán.',
      options: [{ key: 'A', content: 'Đốt cháy giấy', correct: false }, { key: 'B', content: 'Thức ăn bị ôi thiu', correct: false }, { key: 'C', content: 'Hòa tan đường vào nước', correct: true }, { key: 'D', content: 'Vôi sống tác dụng với nước', correct: false }],
    },
    {
      id: 'hoa7-q078', content: 'Để lưu huỳnh cháy trong oxy: S + O₂ → SO₂. Đây là phản ứng:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Hai chất (S và O₂) kết hợp tạo một chất duy nhất (SO₂) → phản ứng hóa hợp.',
      options: [{ key: 'A', content: 'Phản ứng phân hủy', correct: false }, { key: 'B', content: 'Phản ứng hóa hợp', correct: true }, { key: 'C', content: 'Phản ứng thế', correct: false }, { key: 'D', content: 'Phản ứng trao đổi', correct: false }],
    },
    {
      id: 'hoa7-q079', content: 'Tốc độ phản ứng hóa học tăng khi:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Tốc độ phản ứng tăng khi: tăng nhiệt độ, tăng nồng độ chất phản ứng, tăng áp suất (khí), dùng chất xúc tác, nghiền nhỏ chất rắn.',
      options: [{ key: 'A', content: 'Giảm nhiệt độ', correct: false }, { key: 'B', content: 'Giảm nồng độ chất phản ứng', correct: false }, { key: 'C', content: 'Tăng nhiệt độ, dùng chất xúc tác', correct: true }, { key: 'D', content: 'Dùng dung môi không phù hợp', correct: false }],
    },
    {
      id: 'hoa7-q080', content: 'Phương trình: Fe + 2HCl → FeCl₂ + H₂. Chất nào là sản phẩm?', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Trong phản ứng, chất phản ứng (bên trái): Fe và HCl; sản phẩm (bên phải): FeCl₂ và H₂.',
      options: [{ key: 'A', content: 'Fe và HCl', correct: false }, { key: 'B', content: 'FeCl₂ và H₂', correct: true }, { key: 'C', content: 'Chỉ H₂', correct: false }, { key: 'D', content: 'Fe và H₂', correct: false }],
    },
    {
      id: 'hoa7-q081', content: 'Phản ứng toả nhiệt là phản ứng:', topicId: 'hoa7-phan-ung', difficulty: 'EASY',
      explanation: 'Phản ứng tỏa nhiệt là phản ứng trong đó năng lượng giải phóng ra môi trường dưới dạng nhiệt, như đốt cháy, phản ứng trung hòa...',
      options: [{ key: 'A', content: 'Thu nhiệt từ môi trường', correct: false }, { key: 'B', content: 'Giải phóng nhiệt ra môi trường', correct: true }, { key: 'C', content: 'Không có sự thay đổi nhiệt độ', correct: false }, { key: 'D', content: 'Chỉ xảy ra ở nhiệt độ cao', correct: false }],
    },
    {
      id: 'hoa7-q082', content: 'Phản ứng nào dưới đây tỏa nhiệt?', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Đốt cháy gỗ là phản ứng đốt cháy, tỏa nhiều nhiệt. Quang hợp thu CO₂ và H₂O → thu nhiệt từ ánh sáng.',
      options: [{ key: 'A', content: 'Quang hợp của cây xanh', correct: false }, { key: 'B', content: 'Điện phân nước', correct: false }, { key: 'C', content: 'Đốt cháy gỗ', correct: true }, { key: 'D', content: 'Phân hủy CaCO₃ bằng nhiệt', correct: false }],
    },
    {
      id: 'hoa7-q083', content: 'Trong phương trình hóa học đã cân bằng, điều gì được bảo toàn?', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Trong phản ứng hóa học, số nguyên tử của mỗi nguyên tố được bảo toàn (không mất không thêm).',
      options: [{ key: 'A', content: 'Số phân tử', correct: false }, { key: 'B', content: 'Số nguyên tử của mỗi nguyên tố', correct: true }, { key: 'C', content: 'Thể tích', correct: false }, { key: 'D', content: 'Chỉ bảo toàn nguyên tố Oxy', correct: false }],
    },
    {
      id: 'hoa7-q084', content: 'Phản ứng Zn + 2HCl → ZnCl₂ + H₂ là loại phản ứng:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Kim loại Zn thay thế H trong HCl → phản ứng thế (một nguyên tử/nhóm thay thế một nguyên tử/nhóm khác).',
      options: [{ key: 'A', content: 'Phản ứng hóa hợp', correct: false }, { key: 'B', content: 'Phản ứng phân hủy', correct: false }, { key: 'C', content: 'Phản ứng thế', correct: true }, { key: 'D', content: 'Phản ứng trao đổi', correct: false }],
    },
    {
      id: 'hoa7-q085', content: 'Phản ứng NaCl + AgNO₃ → AgCl↓ + NaNO₃ là loại phản ứng:', topicId: 'hoa7-phan-ung', difficulty: 'MEDIUM',
      explanation: 'Hai chất đổi chỗ ion cho nhau → phản ứng trao đổi (double displacement). AgCl↓ là kết tủa trắng.',
      options: [{ key: 'A', content: 'Phản ứng thế', correct: false }, { key: 'B', content: 'Phản ứng hóa hợp', correct: false }, { key: 'C', content: 'Phản ứng trao đổi', correct: true }, { key: 'D', content: 'Phản ứng phân hủy', correct: false }],
    },

    // ======= ACID - BASE - pH (câu 86-100) =======
    {
      id: 'hoa7-q086', content: 'Acid là chất khi tan trong nước tạo ra:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Acid là chất khi tan trong nước phân li ra ion H⁺ (hoặc H₃O⁺), làm dung dịch có tính axit.',
      options: [{ key: 'A', content: 'Ion OH⁻', correct: false }, { key: 'B', content: 'Ion H⁺', correct: true }, { key: 'C', content: 'Ion kim loại', correct: false }, { key: 'D', content: 'Phân tử nước', correct: false }],
    },
    {
      id: 'hoa7-q087', content: 'Base (kiềm) là chất khi tan trong nước tạo ra:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Base là chất khi tan trong nước phân li ra ion OH⁻, làm dung dịch có tính kiềm.',
      options: [{ key: 'A', content: 'Ion H⁺', correct: false }, { key: 'B', content: 'Ion OH⁻', correct: true }, { key: 'C', content: 'Khí Clo', correct: false }, { key: 'D', content: 'Muối', correct: false }],
    },
    {
      id: 'hoa7-q088', content: 'Giá trị pH của dung dịch trung tính ở 25°C là:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Dung dịch trung tính có pH = 7 (như nước tinh khiết ở 25°C).',
      options: [{ key: 'A', content: 'pH < 7', correct: false }, { key: 'B', content: 'pH = 7', correct: true }, { key: 'C', content: 'pH > 7', correct: false }, { key: 'D', content: 'pH = 0', correct: false }],
    },
    {
      id: 'hoa7-q089', content: 'Dung dịch acid có pH:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Dung dịch acid có nồng độ H⁺ cao, nên pH < 7.',
      options: [{ key: 'A', content: 'pH = 7', correct: false }, { key: 'B', content: 'pH > 7', correct: false }, { key: 'C', content: 'pH < 7', correct: true }, { key: 'D', content: 'pH = 14', correct: false }],
    },
    {
      id: 'hoa7-q090', content: 'Dung dịch kiềm (base) có pH:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Dung dịch kiềm (base) có nồng độ OH⁻ cao, nên pH > 7.',
      options: [{ key: 'A', content: 'pH < 7', correct: false }, { key: 'B', content: 'pH = 7', correct: false }, { key: 'C', content: 'pH > 7', correct: true }, { key: 'D', content: 'pH = 0', correct: false }],
    },
    {
      id: 'hoa7-q091', content: 'Chất nào sau đây là acid?', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'HCl (axit clohidric) là acid mạnh, phân li hoàn toàn thành H⁺ và Cl⁻ trong nước.',
      options: [{ key: 'A', content: 'NaOH', correct: false }, { key: 'B', content: 'Ca(OH)₂', correct: false }, { key: 'C', content: 'HCl', correct: true }, { key: 'D', content: 'NH₃', correct: false }],
    },
    {
      id: 'hoa7-q092', content: 'Chất nào sau đây là base (kiềm)?', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'NaOH (natri hydroxit - xút) là base mạnh, tan tốt trong nước tạo ion OH⁻.',
      options: [{ key: 'A', content: 'HCl', correct: false }, { key: 'B', content: 'H₂SO₄', correct: false }, { key: 'C', content: 'HNO₃', correct: false }, { key: 'D', content: 'NaOH', correct: true }],
    },
    {
      id: 'hoa7-q093', content: 'Quỳ tím chuyển sang màu đỏ khi tiếp xúc với dung dịch có tính:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Quỳ tím hóa đỏ trong dung dịch acid (pH < 7), hóa xanh trong dung dịch kiềm (pH > 7).',
      options: [{ key: 'A', content: 'Kiềm', correct: false }, { key: 'B', content: 'Acid', correct: true }, { key: 'C', content: 'Trung tính', correct: false }, { key: 'D', content: 'Muối', correct: false }],
    },
    {
      id: 'hoa7-q094', content: 'Phản ứng trung hòa là phản ứng giữa:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'Phản ứng trung hòa là phản ứng giữa acid và base (kiềm), tạo ra muối và nước: HCl + NaOH → NaCl + H₂O.',
      options: [{ key: 'A', content: 'Hai acid với nhau', correct: false }, { key: 'B', content: 'Acid và base', correct: true }, { key: 'C', content: 'Hai base với nhau', correct: false }, { key: 'D', content: 'Acid và muối', correct: false }],
    },
    {
      id: 'hoa7-q095', content: 'pH của nước chanh (axit citric) vào khoảng:', topicId: 'hoa7-acid-base', difficulty: 'MEDIUM',
      explanation: 'Nước chanh chứa axit citric, có tính acid nhẹ, pH khoảng 2-3.',
      options: [{ key: 'A', content: 'pH ≈ 2-3', correct: true }, { key: 'B', content: 'pH ≈ 7', correct: false }, { key: 'C', content: 'pH ≈ 10-11', correct: false }, { key: 'D', content: 'pH ≈ 14', correct: false }],
    },
    {
      id: 'hoa7-q096', content: 'Muối là sản phẩm của phản ứng trung hòa, được tạo từ:', topicId: 'hoa7-acid-base', difficulty: 'MEDIUM',
      explanation: 'Muối gồm ion kim loại (hoặc NH₄⁺) từ base kết hợp với gốc acid. VD: NaOH + HCl → NaCl (muối) + H₂O.',
      options: [{ key: 'A', content: 'Gốc acid và ion H⁺', correct: false }, { key: 'B', content: 'Ion kim loại (từ base) và gốc acid', correct: true }, { key: 'C', content: 'Ion OH⁻ và ion H⁺', correct: false }, { key: 'D', content: 'Chỉ từ acid mạnh', correct: false }],
    },
    {
      id: 'hoa7-q097', content: 'Dung dịch HCl + NaOH → NaCl + H₂O. Sản phẩm NaCl là:', topicId: 'hoa7-acid-base', difficulty: 'EASY',
      explanation: 'NaCl (natri clorua - muối ăn) là muối, sản phẩm của phản ứng trung hòa.',
      options: [{ key: 'A', content: 'Acid', correct: false }, { key: 'B', content: 'Base', correct: false }, { key: 'C', content: 'Muối', correct: true }, { key: 'D', content: 'Oxit', correct: false }],
    },
    {
      id: 'hoa7-q098', content: 'Acid H₂SO₄ phản ứng với Cu(OH)₂ tạo ra sản phẩm là:', topicId: 'hoa7-acid-base', difficulty: 'MEDIUM',
      explanation: 'H₂SO₄ + Cu(OH)₂ → CuSO₄ + 2H₂O. Sản phẩm là muối CuSO₄ (đồng sunfat - màu xanh) và nước.',
      options: [{ key: 'A', content: 'CuSO₄ và H₂O', correct: true }, { key: 'B', content: 'Cu và H₂O', correct: false }, { key: 'C', content: 'CuO và H₂SO₄', correct: false }, { key: 'D', content: 'CuCl₂ và H₂O', correct: false }],
    },
    {
      id: 'hoa7-q099', content: 'Chỉ thị nào dùng để đo độ chính xác hơn pH của dung dịch?', topicId: 'hoa7-acid-base', difficulty: 'MEDIUM',
      explanation: 'Giấy pH (giấy chỉ thị vạn năng) cho phép xác định giá trị pH cụ thể bằng cách so sánh màu sắc với bảng chuẩn, chính xác hơn quỳ tím chỉ nhận biết acid/base.',
      options: [{ key: 'A', content: 'Quỳ tím', correct: false }, { key: 'B', content: 'Phenolphtalein', correct: false }, { key: 'C', content: 'Giấy pH (chỉ thị vạn năng)', correct: true }, { key: 'D', content: 'Nước cất', correct: false }],
    },
    {
      id: 'hoa7-q100', content: 'Mưa acid (mưa axit) có pH:', topicId: 'hoa7-acid-base', difficulty: 'MEDIUM',
      explanation: 'Mưa bình thường có pH ≈ 5,6 (hơi acid do CO₂). Mưa acid có pH < 5,6, thường do SO₂ và NOₓ trong khí quyển tạo axit sulfuric và axit nitric.',
      options: [{ key: 'A', content: 'pH = 7', correct: false }, { key: 'B', content: 'pH > 7', correct: false }, { key: 'C', content: 'pH < 5,6', correct: true }, { key: 'D', content: 'pH = 14', correct: false }],
    },
  ];

  let created = 0;
  for (const q of questions) {
    const existing = await prisma.question.findUnique({ where: { id: q.id } });
    if (existing) { console.log(`Skip existing: ${q.id}`); continue; }

    await prisma.question.create({
      data: {
        id: q.id,
        content: q.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: q.difficulty as any,
        explanation: q.explanation,
        status: 'ACTIVE',
        subjectId: 'sub-hoa',
        gradeId: 'grade-7',
        topicId: q.topicId,
        createdById: 'user-admin',
        options: {
          create: q.options.map((o, idx) => ({
            optionKey: o.key,
            content: o.content,
            isCorrect: o.correct,
            sortOrder: idx,
          })),
        },
      },
    });
    created++;
  }

  // Tạo 2 đề thi Hóa học 7
  const exam1 = await prisma.exam.findUnique({ where: { id: 'exam-hoa7-1' } });
  if (!exam1) {
    await prisma.exam.create({
      data: {
        id: 'exam-hoa7-1',
        title: 'Đề kiểm tra Hóa 7 - Nguyên tử và Phân tử',
        description: 'Kiểm tra kiến thức về nguyên tử, nguyên tố hóa học, phân tử, đơn chất và hợp chất',
        subjectId: 'sub-hoa',
        gradeId: 'grade-7',
        durationMinutes: 45,
        totalQuestions: 40,
        maxScore: 10,
        difficulty: 'EASY',
        examType: 'PRACTICE',
        createdById: 'user-admin',
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    const ids1 = questions.slice(0, 40).map(q => q.id);
    for (let i = 0; i < ids1.length; i++) {
      await prisma.examQuestion.upsert({
        where: { examId_questionId: { examId: 'exam-hoa7-1', questionId: ids1[i] } },
        update: {},
        create: { examId: 'exam-hoa7-1', questionId: ids1[i], questionOrder: i + 1, points: 0.25 },
      });
    }
  }

  const exam2 = await prisma.exam.findUnique({ where: { id: 'exam-hoa7-2' } });
  if (!exam2) {
    await prisma.exam.create({
      data: {
        id: 'exam-hoa7-2',
        title: 'Đề thi thử Hóa 7 - Tổng hợp cuối năm',
        description: 'Đề thi thử tổng hợp toàn bộ chương trình Hóa học lớp 7',
        subjectId: 'sub-hoa',
        gradeId: 'grade-7',
        durationMinutes: 60,
        totalQuestions: 100,
        maxScore: 10,
        difficulty: 'MEDIUM',
        examType: 'MOCK_EXAM',
        createdById: 'user-admin',
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    for (let i = 0; i < questions.length; i++) {
      await prisma.examQuestion.upsert({
        where: { examId_questionId: { examId: 'exam-hoa7-2', questionId: questions[i].id } },
        update: {},
        create: { examId: 'exam-hoa7-2', questionId: questions[i].id, questionOrder: i + 1, points: 0.1 },
      });
    }
  }

  console.log(`Done! Created ${created} questions, skipped ${questions.length - created} existing.`);
  console.log('Created 2 exams for Hóa học 7.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
