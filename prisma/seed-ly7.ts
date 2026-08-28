import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Vật Lý lớp 7...');

  // Upsert subject
  await prisma.subject.upsert({
    where: { code: 'LY' },
    update: {},
    create: { id: 'sub-ly', name: 'Vật Lý', code: 'LY', description: 'Môn Vật Lý', icon: '⚡' },
  });

  // Upsert grade
  await prisma.grade.upsert({
    where: { id: 'grade-7' },
    update: {},
    create: { id: 'grade-7', name: 'Lớp 7', sortOrder: 7 },
  });

  // Topics Vật Lý 7
  await Promise.all([
    prisma.topic.upsert({ where: { id: 'ly7-quang' }, update: {}, create: { id: 'ly7-quang', subjectId: 'sub-ly', gradeId: 'grade-7', name: 'Quang học', sortOrder: 1 } }),
    prisma.topic.upsert({ where: { id: 'ly7-am' }, update: {}, create: { id: 'ly7-am', subjectId: 'sub-ly', gradeId: 'grade-7', name: 'Âm học', sortOrder: 2 } }),
    prisma.topic.upsert({ where: { id: 'ly7-dien' }, update: {}, create: { id: 'ly7-dien', subjectId: 'sub-ly', gradeId: 'grade-7', name: 'Điện học', sortOrder: 3 } }),
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
    // ======= QUANG HỌC (câu 1-35) =======
    {
      id: 'ly7-q001', content: 'Nguồn sáng là vật:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Nguồn sáng là vật tự phát ra ánh sáng như Mặt Trời, ngọn nến, bóng đèn đang sáng.',
      options: [{ key: 'A', content: 'Tự phát ra ánh sáng', correct: true }, { key: 'B', content: 'Hắt lại ánh sáng từ vật khác', correct: false }, { key: 'C', content: 'Hấp thụ hoàn toàn ánh sáng', correct: false }, { key: 'D', content: 'Không cho ánh sáng truyền qua', correct: false }],
    },
    {
      id: 'ly7-q002', content: 'Ánh sáng truyền đi theo đường:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Trong môi trường trong suốt và đồng tính, ánh sáng truyền đi theo đường thẳng.',
      options: [{ key: 'A', content: 'Cong', correct: false }, { key: 'B', content: 'Thẳng', correct: true }, { key: 'C', content: 'Zíc zắc', correct: false }, { key: 'D', content: 'Elip', correct: false }],
    },
    {
      id: 'ly7-q003', content: 'Tia sáng là:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Tia sáng là đường truyền của ánh sáng, được biểu diễn bằng một đường thẳng có mũi tên chỉ chiều truyền.',
      options: [{ key: 'A', content: 'Đường thẳng có mũi tên chỉ chiều truyền ánh sáng', correct: true }, { key: 'B', content: 'Một chùm sáng hội tụ', correct: false }, { key: 'C', content: 'Vùng sáng trên màn chắn', correct: false }, { key: 'D', content: 'Bóng tối của vật', correct: false }],
    },
    {
      id: 'ly7-q004', content: 'Hiện tượng nhật thực xảy ra khi:', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Nhật thực xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất, che khuất Mặt Trời.',
      options: [{ key: 'A', content: 'Trái Đất nằm giữa Mặt Trời và Mặt Trăng', correct: false }, { key: 'B', content: 'Mặt Trăng nằm giữa Mặt Trời và Trái Đất', correct: true }, { key: 'C', content: 'Mặt Trời nằm giữa Trái Đất và Mặt Trăng', correct: false }, { key: 'D', content: 'Trái Đất che khuất Mặt Trăng', correct: false }],
    },
    {
      id: 'ly7-q005', content: 'Ảnh của vật tạo bởi gương phẳng là:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Gương phẳng tạo ảnh ảo (không hứng được trên màn), cùng chiều và bằng vật, đối xứng với vật qua gương.',
      options: [{ key: 'A', content: 'Ảnh thật, cùng kích thước với vật', correct: false }, { key: 'B', content: 'Ảnh ảo, cùng kích thước với vật', correct: true }, { key: 'C', content: 'Ảnh thật, nhỏ hơn vật', correct: false }, { key: 'D', content: 'Ảnh ảo, lớn hơn vật', correct: false }],
    },
    {
      id: 'ly7-q006', content: 'Vật đặt cách gương phẳng 20 cm thì ảnh cách gương bao nhiêu?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Ảnh tạo bởi gương phẳng đối xứng với vật qua gương, nên ảnh cách gương bằng vật cách gương = 20 cm.',
      options: [{ key: 'A', content: '10 cm', correct: false }, { key: 'B', content: '20 cm', correct: true }, { key: 'C', content: '40 cm', correct: false }, { key: 'D', content: '5 cm', correct: false }],
    },
    {
      id: 'ly7-q007', content: 'Gương cầu lồi tạo ra ảnh:', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Gương cầu lồi cho ảnh ảo, cùng chiều với vật và nhỏ hơn vật.',
      options: [{ key: 'A', content: 'Ảnh thật, lớn hơn vật', correct: false }, { key: 'B', content: 'Ảnh ảo, nhỏ hơn vật', correct: true }, { key: 'C', content: 'Ảnh ảo, lớn hơn vật', correct: false }, { key: 'D', content: 'Ảnh thật, nhỏ hơn vật', correct: false }],
    },
    {
      id: 'ly7-q008', content: 'Gương cầu lõm được dùng làm gương chiếu hậu xe ô tô không? Vì sao?', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Gương chiếu hậu dùng gương cầu lồi vì nó cho vùng quan sát rộng hơn gương phẳng, không dùng gương cầu lõm.',
      options: [{ key: 'A', content: 'Có, vì cho ảnh lớn hơn vật', correct: false }, { key: 'B', content: 'Không, vì vùng quan sát hẹp hơn gương cầu lồi', correct: true }, { key: 'C', content: 'Có, vì cho ảnh rõ nét hơn', correct: false }, { key: 'D', content: 'Không, vì cho ảnh ngược chiều', correct: false }],
    },
    {
      id: 'ly7-q009', content: 'Ứng dụng nào sau đây dùng gương cầu lõm?', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Gương cầu lõm tập trung ánh sáng vào một điểm nên được dùng trong đèn pin, đèn ô tô để tạo chùm sáng song song mạnh.',
      options: [{ key: 'A', content: 'Gương chiếu hậu ô tô', correct: false }, { key: 'B', content: 'Đèn pin', correct: true }, { key: 'C', content: 'Gương trong phòng tắm', correct: false }, { key: 'D', content: 'Kính tiềm vọng', correct: false }],
    },
    {
      id: 'ly7-q010', content: 'Luật phản xạ ánh sáng nói rằng:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Góc phản xạ bằng góc tới (đều đo từ tia sáng đến đường pháp tuyến).',
      options: [{ key: 'A', content: 'Góc phản xạ bằng góc tới', correct: true }, { key: 'B', content: 'Góc phản xạ lớn hơn góc tới', correct: false }, { key: 'C', content: 'Góc phản xạ nhỏ hơn góc tới', correct: false }, { key: 'D', content: 'Tia phản xạ song song với gương', correct: false }],
    },
    {
      id: 'ly7-q011', content: 'Một tia sáng chiếu tới gương phẳng tạo góc tới 30°. Góc phản xạ bằng bao nhiêu?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Theo luật phản xạ, góc phản xạ = góc tới = 30°.',
      options: [{ key: 'A', content: '15°', correct: false }, { key: 'B', content: '30°', correct: true }, { key: 'C', content: '60°', correct: false }, { key: 'D', content: '90°', correct: false }],
    },
    {
      id: 'ly7-q012', content: 'Chùm sáng song song sau khi chiếu vào gương cầu lõm sẽ:', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Gương cầu lõm hội tụ chùm tia song song vào tiêu điểm.',
      options: [{ key: 'A', content: 'Phân kỳ ra xa', correct: false }, { key: 'B', content: 'Hội tụ tại một điểm', correct: true }, { key: 'C', content: 'Vẫn song song', correct: false }, { key: 'D', content: 'Bị hấp thụ hoàn toàn', correct: false }],
    },
    {
      id: 'ly7-q013', content: 'Nhật thực toàn phần quan sát được ở:', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Nhật thực toàn phần chỉ quan sát được ở vùng bóng tối (umbra) của Mặt Trăng.',
      options: [{ key: 'A', content: 'Vùng bóng nửa tối', correct: false }, { key: 'B', content: 'Vùng bóng tối (nằm trong bóng tối Mặt Trăng)', correct: true }, { key: 'C', content: 'Mọi nơi trên Trái Đất', correct: false }, { key: 'D', content: 'Ban đêm', correct: false }],
    },
    {
      id: 'ly7-q014', content: 'Vật nào sau đây là vật sáng (vật nhìn thấy được nhờ ánh sáng từ nó)?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Mặt Trăng không tự phát sáng mà hắt lại ánh sáng Mặt Trời nên là vật sáng (không phải nguồn sáng).',
      options: [{ key: 'A', content: 'Bóng đèn đang tắt', correct: false }, { key: 'B', content: 'Mặt Trăng', correct: true }, { key: 'C', content: 'Hòn đá trong bóng tối', correct: false }, { key: 'D', content: 'Kính trong suốt', correct: false }],
    },
    {
      id: 'ly7-q015', content: 'Khi nào ta nhìn thấy một vật?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Ta nhìn thấy một vật khi có ánh sáng từ vật đó truyền vào mắt ta.',
      options: [{ key: 'A', content: 'Khi mắt ta hướng về phía vật', correct: false }, { key: 'B', content: 'Khi có ánh sáng từ vật truyền vào mắt ta', correct: true }, { key: 'C', content: 'Khi vật ở gần mắt', correct: false }, { key: 'D', content: 'Khi vật ở nơi sáng', correct: false }],
    },
    {
      id: 'ly7-q016', content: 'Hình dạng bóng tối của vật phụ thuộc vào:', topicId: 'ly7-quang', difficulty: 'MEDIUM',
      explanation: 'Bóng tối là vùng không nhận được ánh sáng, hình dạng của nó phụ thuộc vào hình dạng của vật và vị trí nguồn sáng.',
      options: [{ key: 'A', content: 'Chỉ hình dạng của vật', correct: false }, { key: 'B', content: 'Hình dạng vật và vị trí nguồn sáng', correct: true }, { key: 'C', content: 'Màu sắc của vật', correct: false }, { key: 'D', content: 'Chất liệu của vật', correct: false }],
    },
    {
      id: 'ly7-q017', content: 'Gương phẳng có đặc điểm nào sau đây?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Gương phẳng là mặt phẳng nhẵn bóng, phản xạ tốt ánh sáng.',
      options: [{ key: 'A', content: 'Mặt phản xạ là mặt cầu lõm', correct: false }, { key: 'B', content: 'Mặt phản xạ là mặt phẳng', correct: true }, { key: 'C', content: 'Mặt phản xạ là mặt cầu lồi', correct: false }, { key: 'D', content: 'Mặt phản xạ là mặt elip', correct: false }],
    },
    {
      id: 'ly7-q018', content: 'Ảnh trong gương phẳng so với vật thì:', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Ảnh trong gương phẳng bằng vật và đối xứng qua gương: ảnh cách gương = vật cách gương.',
      options: [{ key: 'A', content: 'Bằng vật và cùng phía với vật', correct: false }, { key: 'B', content: 'Bằng vật và đối xứng qua gương', correct: true }, { key: 'C', content: 'Lớn hơn vật', correct: false }, { key: 'D', content: 'Nhỏ hơn vật', correct: false }],
    },
    {
      id: 'ly7-q019', content: 'Gương cầu lõm có thể tạo ra ảnh thật khi:', topicId: 'ly7-quang', difficulty: 'HARD',
      explanation: 'Gương cầu lõm tạo ảnh thật khi vật đặt ngoài tiêu điểm (xa gương hơn tiêu cự).',
      options: [{ key: 'A', content: 'Vật nằm trong khoảng tiêu cự', correct: false }, { key: 'B', content: 'Vật nằm ngoài tiêu điểm', correct: true }, { key: 'C', content: 'Vật đặt sát gương', correct: false }, { key: 'D', content: 'Vật ở bất kỳ vị trí nào', correct: false }],
    },
    {
      id: 'ly7-q020', content: 'Gương nào được dùng trong buồng tắm, phòng vệ sinh thông thường?', topicId: 'ly7-quang', difficulty: 'EASY',
      explanation: 'Gương phẳng được dùng trong nhà vì cho ảnh đúng kích thước và thẳng đứng.',
      options: [{ key: 'A', content: 'Gương cầu lõm', correct: false }, { key: 'B', content: 'Gương cầu lồi', correct: false }, { key: 'C', content: 'Gương phẳng', correct: true }, { key: 'D', content: 'Gương parabol', correct: false }],
    },
    // ======= ÂM HỌC (câu 21-55) =======
    {
      id: 'ly7-q021', content: 'Nguồn âm là gì?', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Nguồn âm là những vật dao động phát ra âm thanh.',
      options: [{ key: 'A', content: 'Vật hấp thụ âm thanh', correct: false }, { key: 'B', content: 'Vật dao động phát ra âm thanh', correct: true }, { key: 'C', content: 'Vật truyền âm thanh', correct: false }, { key: 'D', content: 'Vật phản xạ âm thanh', correct: false }],
    },
    {
      id: 'ly7-q022', content: 'Âm thanh truyền được trong môi trường nào?', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Âm thanh truyền được trong chất rắn, lỏng và khí, nhưng không truyền được trong chân không.',
      options: [{ key: 'A', content: 'Chỉ trong chất khí', correct: false }, { key: 'B', content: 'Chỉ trong chất rắn', correct: false }, { key: 'C', content: 'Trong chất rắn, lỏng, khí — không truyền trong chân không', correct: true }, { key: 'D', content: 'Trong cả chân không', correct: false }],
    },
    {
      id: 'ly7-q023', content: 'Tần số dao động đặc trưng cho:', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Tần số dao động đặc trưng cho độ cao của âm: tần số cao → âm cao (bổng), tần số thấp → âm thấp (trầm).',
      options: [{ key: 'A', content: 'Độ to của âm', correct: false }, { key: 'B', content: 'Độ cao của âm', correct: true }, { key: 'C', content: 'Chất lượng âm', correct: false }, { key: 'D', content: 'Tốc độ truyền âm', correct: false }],
    },
    {
      id: 'ly7-q024', content: 'Đơn vị đo tần số là:', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Đơn vị đo tần số là Hz (Hertz), cho biết số dao động trong một giây.',
      options: [{ key: 'A', content: 'dB (đề-xi-ben)', correct: false }, { key: 'B', content: 'Hz (Hertz)', correct: true }, { key: 'C', content: 'm/s', correct: false }, { key: 'D', content: 'N (Newton)', correct: false }],
    },
    {
      id: 'ly7-q025', content: 'Tai người nghe được âm có tần số trong khoảng:', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Tai người bình thường nghe được âm từ 20 Hz đến 20.000 Hz (20 kHz).',
      options: [{ key: 'A', content: 'Dưới 20 Hz', correct: false }, { key: 'B', content: 'Từ 20 Hz đến 20.000 Hz', correct: true }, { key: 'C', content: 'Trên 20.000 Hz', correct: false }, { key: 'D', content: 'Từ 0 Hz đến 1.000 Hz', correct: false }],
    },
    {
      id: 'ly7-q026', content: 'Âm có tần số lớn hơn 20.000 Hz gọi là:', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Siêu âm là âm có tần số lớn hơn 20.000 Hz, tai người không nghe được.',
      options: [{ key: 'A', content: 'Hạ âm', correct: false }, { key: 'B', content: 'Siêu âm', correct: true }, { key: 'C', content: 'Âm trầm', correct: false }, { key: 'D', content: 'Âm bổng', correct: false }],
    },
    {
      id: 'ly7-q027', content: 'Biên độ dao động đặc trưng cho:', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Biên độ dao động đặc trưng cho độ to của âm: biên độ lớn → âm to, biên độ nhỏ → âm nhỏ.',
      options: [{ key: 'A', content: 'Độ cao của âm', correct: false }, { key: 'B', content: 'Độ to của âm', correct: true }, { key: 'C', content: 'Tốc độ truyền âm', correct: false }, { key: 'D', content: 'Chất lượng âm', correct: false }],
    },
    {
      id: 'ly7-q028', content: 'Đơn vị đo độ to của âm là:', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Độ to của âm đo bằng đề-xi-ben (dB).',
      options: [{ key: 'A', content: 'Hz', correct: false }, { key: 'B', content: 'dB (đề-xi-ben)', correct: true }, { key: 'C', content: 'W (oát)', correct: false }, { key: 'D', content: 'm/s', correct: false }],
    },
    {
      id: 'ly7-q029', content: 'Tiếng ồn ở mức nào gây nguy hiểm cho thính giác?', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Âm thanh trên 70 dB liên tục có thể gây hại, từ 130 dB trở lên gây đau tai và nguy hiểm tức thì.',
      options: [{ key: 'A', content: 'Trên 40 dB', correct: false }, { key: 'B', content: 'Trên 70 dB liên tục', correct: true }, { key: 'C', content: 'Dưới 20 dB', correct: false }, { key: 'D', content: 'Trên 20 dB', correct: false }],
    },
    {
      id: 'ly7-q030', content: 'Tiếng vang xảy ra khi:', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Tiếng vang là âm phản xạ đến tai sau âm trực tiếp ít nhất 1/15 giây.',
      options: [{ key: 'A', content: 'Âm phản xạ đến tai trước âm trực tiếp', correct: false }, { key: 'B', content: 'Âm phản xạ đến tai sau âm trực tiếp ít nhất 1/15 giây', correct: true }, { key: 'C', content: 'Âm phản xạ bằng âm trực tiếp', correct: false }, { key: 'D', content: 'Không có âm phản xạ', correct: false }],
    },
    {
      id: 'ly7-q031', content: 'Vật liệu nào phản xạ âm tốt?', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Bề mặt cứng, nhẵn (bê tông, gạch, gương) phản xạ âm tốt. Vật mềm, xốp hấp thụ âm.',
      options: [{ key: 'A', content: 'Vải bông, thảm len', correct: false }, { key: 'B', content: 'Tường bê tông, mặt đá nhẵn', correct: true }, { key: 'C', content: 'Mút xốp', correct: false }, { key: 'D', content: 'Cao su mềm', correct: false }],
    },
    {
      id: 'ly7-q032', content: 'Vận tốc truyền âm trong không khí ở 20°C xấp xỉ bằng:', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Vận tốc âm trong không khí ở điều kiện bình thường (20°C) khoảng 340 m/s.',
      options: [{ key: 'A', content: '340 m/s', correct: true }, { key: 'B', content: '3000 m/s', correct: false }, { key: 'C', content: '300.000 km/s', correct: false }, { key: 'D', content: '1500 m/s', correct: false }],
    },
    {
      id: 'ly7-q033', content: 'Âm truyền nhanh nhất trong môi trường nào?', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Âm truyền nhanh nhất trong chất rắn vì các phân tử liên kết chặt chẽ, truyền dao động nhanh hơn.',
      options: [{ key: 'A', content: 'Chân không', correct: false }, { key: 'B', content: 'Chất khí', correct: false }, { key: 'C', content: 'Chất lỏng', correct: false }, { key: 'D', content: 'Chất rắn', correct: true }],
    },
    {
      id: 'ly7-q034', content: 'Âm thanh phát ra từ dây đàn khi gảy là do:', topicId: 'ly7-am', difficulty: 'EASY',
      explanation: 'Khi gảy đàn, dây đàn dao động và tạo ra âm thanh.',
      options: [{ key: 'A', content: 'Dây đàn nóng lên', correct: false }, { key: 'B', content: 'Dây đàn dao động', correct: true }, { key: 'C', content: 'Không khí xung quanh dao động tự do', correct: false }, { key: 'D', content: 'Tay người tạo ra sóng âm', correct: false }],
    },
    {
      id: 'ly7-q035', content: 'Ô nhiễm tiếng ồn có thể gây ra tác hại gì?', topicId: 'ly7-am', difficulty: 'MEDIUM',
      explanation: 'Tiếng ồn lớn kéo dài có thể gây điếc, mất ngủ, căng thẳng thần kinh và ảnh hưởng sức khỏe.',
      options: [{ key: 'A', content: 'Chỉ gây khó chịu, không ảnh hưởng sức khỏe', correct: false }, { key: 'B', content: 'Gây điếc, mất ngủ, căng thẳng thần kinh', correct: true }, { key: 'C', content: 'Làm tăng cường thính giác', correct: false }, { key: 'D', content: 'Không có tác hại gì', correct: false }],
    },
    // ======= ĐIỆN HỌC (câu 36-100) =======
    {
      id: 'ly7-q036', content: 'Vật bị nhiễm điện có khả năng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Vật bị nhiễm điện (vật mang điện tích) có khả năng hút các vật nhẹ.',
      options: [{ key: 'A', content: 'Phát sáng', correct: false }, { key: 'B', content: 'Hút các vật nhẹ', correct: true }, { key: 'C', content: 'Nóng lên', correct: false }, { key: 'D', content: 'Bay lên không trung', correct: false }],
    },
    {
      id: 'ly7-q037', content: 'Có mấy loại điện tích?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Có hai loại điện tích: điện tích dương (+) và điện tích âm (-).',
      options: [{ key: 'A', content: 'Một loại', correct: false }, { key: 'B', content: 'Hai loại: dương và âm', correct: true }, { key: 'C', content: 'Ba loại', correct: false }, { key: 'D', content: 'Bốn loại', correct: false }],
    },
    {
      id: 'ly7-q038', content: 'Hai vật mang điện tích cùng dấu thì:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Các điện tích cùng dấu thì đẩy nhau, khác dấu thì hút nhau.',
      options: [{ key: 'A', content: 'Hút nhau', correct: false }, { key: 'B', content: 'Đẩy nhau', correct: true }, { key: 'C', content: 'Không tác dụng lực', correct: false }, { key: 'D', content: 'Trung hòa nhau', correct: false }],
    },
    {
      id: 'ly7-q039', content: 'Dòng điện là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Dòng điện là dòng chuyển dời có hướng của các điện tích.',
      options: [{ key: 'A', content: 'Dòng chuyển dời có hướng của các điện tích', correct: true }, { key: 'B', content: 'Sự chuyển động hỗn loạn của điện tích', correct: false }, { key: 'C', content: 'Sự tích tụ điện tích tại một chỗ', correct: false }, { key: 'D', content: 'Quá trình phóng điện giữa hai vật', correct: false }],
    },
    {
      id: 'ly7-q040', content: 'Chiều dòng điện quy ước là chiều chuyển dời của:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Chiều dòng điện quy ước là chiều từ cực dương qua dây dẫn và các dụng cụ điện đến cực âm của nguồn điện (chiều chuyển dời của điện tích dương).',
      options: [{ key: 'A', content: 'Điện tích âm (electron)', correct: false }, { key: 'B', content: 'Điện tích dương', correct: true }, { key: 'C', content: 'Cả điện tích âm và dương', correct: false }, { key: 'D', content: 'Điện tích trung hòa', correct: false }],
    },
    {
      id: 'ly7-q041', content: 'Nguồn điện có tác dụng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Nguồn điện (pin, ắc quy, máy phát điện) cung cấp và duy trì dòng điện trong mạch.',
      options: [{ key: 'A', content: 'Hấp thụ điện năng', correct: false }, { key: 'B', content: 'Cung cấp và duy trì dòng điện trong mạch', correct: true }, { key: 'C', content: 'Chỉ lưu trữ điện năng', correct: false }, { key: 'D', content: 'Chuyển điện năng thành cơ năng', correct: false }],
    },
    {
      id: 'ly7-q042', content: 'Chất nào sau đây dẫn điện tốt?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Kim loại như đồng, nhôm, sắt là chất dẫn điện tốt do có nhiều electron tự do.',
      options: [{ key: 'A', content: 'Nhựa', correct: false }, { key: 'B', content: 'Thủy tinh', correct: false }, { key: 'C', content: 'Đồng kim loại', correct: true }, { key: 'D', content: 'Sứ', correct: false }],
    },
    {
      id: 'ly7-q043', content: 'Chất nào sau đây cách điện?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Cao su, nhựa, thủy tinh, sứ là các chất cách điện (không cho dòng điện đi qua).',
      options: [{ key: 'A', content: 'Nước muối', correct: false }, { key: 'B', content: 'Đồng', correct: false }, { key: 'C', content: 'Cao su', correct: true }, { key: 'D', content: 'Nhôm', correct: false }],
    },
    {
      id: 'ly7-q044', content: 'Cường độ dòng điện được đo bằng dụng cụ nào?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Ampe kế (ammeters) đo cường độ dòng điện, mắc nối tiếp trong mạch.',
      options: [{ key: 'A', content: 'Vôn kế', correct: false }, { key: 'B', content: 'Ampe kế', correct: true }, { key: 'C', content: 'Ôm kế', correct: false }, { key: 'D', content: 'Nhiệt kế', correct: false }],
    },
    {
      id: 'ly7-q045', content: 'Đơn vị đo cường độ dòng điện là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Cường độ dòng điện đo bằng Ampe (A), các bội số thường dùng là mA (mili-ampe) và kA (kilo-ampe).',
      options: [{ key: 'A', content: 'Vôn (V)', correct: false }, { key: 'B', content: 'Ampe (A)', correct: true }, { key: 'C', content: 'Ôm (Ω)', correct: false }, { key: 'D', content: 'Oát (W)', correct: false }],
    },
    {
      id: 'ly7-q046', content: 'Hiệu điện thế được đo bằng dụng cụ nào?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Vôn kế (voltmeter) đo hiệu điện thế, mắc song song với đoạn mạch cần đo.',
      options: [{ key: 'A', content: 'Ampe kế', correct: false }, { key: 'B', content: 'Vôn kế', correct: true }, { key: 'C', content: 'Nhiệt kế', correct: false }, { key: 'D', content: 'Lực kế', correct: false }],
    },
    {
      id: 'ly7-q047', content: 'Đơn vị đo hiệu điện thế là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Hiệu điện thế đo bằng Vôn (V). Điện áp nguồn thông dụng: pin 1,5V, ắc quy 12V, điện lưới 220V.',
      options: [{ key: 'A', content: 'Ampe (A)', correct: false }, { key: 'B', content: 'Vôn (V)', correct: true }, { key: 'C', content: 'Ôm (Ω)', correct: false }, { key: 'D', content: 'Oát (W)', correct: false }],
    },
    {
      id: 'ly7-q048', content: 'Ampe kế được mắc trong mạch như thế nào?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Ampe kế phải mắc nối tiếp (chung dòng điện với mạch) và cực dương (+) nối về phía cực dương nguồn.',
      options: [{ key: 'A', content: 'Song song với đoạn mạch cần đo', correct: false }, { key: 'B', content: 'Nối tiếp vào mạch', correct: true }, { key: 'C', content: 'Cả nối tiếp và song song', correct: false }, { key: 'D', content: 'Không cần mắc vào mạch', correct: false }],
    },
    {
      id: 'ly7-q049', content: 'Vôn kế được mắc trong mạch như thế nào?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Vôn kế phải mắc song song với đoạn mạch cần đo hiệu điện thế.',
      options: [{ key: 'A', content: 'Nối tiếp vào mạch', correct: false }, { key: 'B', content: 'Song song với đoạn mạch cần đo', correct: true }, { key: 'C', content: 'Cả nối tiếp và song song', correct: false }, { key: 'D', content: 'Bất kỳ vị trí nào', correct: false }],
    },
    {
      id: 'ly7-q050', content: 'Mạch điện gồm 2 bóng đèn mắc nối tiếp. Khi một bóng đứt thì:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Trong mạch nối tiếp, các bộ phận mắc liên tiếp nhau; một bộ phận hỏng thì dòng điện bị ngắt, toàn bộ mạch không hoạt động.',
      options: [{ key: 'A', content: 'Bóng còn lại sáng bình thường', correct: false }, { key: 'B', content: 'Cả hai bóng đều tắt', correct: true }, { key: 'C', content: 'Bóng còn lại sáng hơn', correct: false }, { key: 'D', content: 'Bóng còn lại mờ hơn', correct: false }],
    },
    {
      id: 'ly7-q051', content: 'Mạch điện gồm 2 bóng đèn mắc song song. Khi một bóng đứt thì:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Trong mạch song song, các nhánh độc lập nhau; một nhánh hỏng thì các nhánh còn lại vẫn hoạt động bình thường.',
      options: [{ key: 'A', content: 'Cả hai bóng đều tắt', correct: false }, { key: 'B', content: 'Bóng còn lại vẫn sáng bình thường', correct: true }, { key: 'C', content: 'Bóng còn lại sáng hơn', correct: false }, { key: 'D', content: 'Không ảnh hưởng đến mạch', correct: false }],
    },
    {
      id: 'ly7-q052', content: 'Định luật Ohm: Cường độ dòng điện I trong đoạn mạch tỉ lệ thuận với:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Định luật Ohm: I = U/R. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở.',
      options: [{ key: 'A', content: 'Điện trở R của mạch', correct: false }, { key: 'B', content: 'Hiệu điện thế U giữa hai đầu đoạn mạch', correct: true }, { key: 'C', content: 'Chiều dài dây dẫn', correct: false }, { key: 'D', content: 'Tiết diện dây dẫn', correct: false }],
    },
    {
      id: 'ly7-q053', content: 'Một đoạn mạch có điện trở R = 10 Ω, hiệu điện thế hai đầu U = 20 V. Cường độ dòng điện là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Áp dụng định luật Ohm: I = U/R = 20/10 = 2 A.',
      options: [{ key: 'A', content: '0,5 A', correct: false }, { key: 'B', content: '2 A', correct: true }, { key: 'C', content: '5 A', correct: false }, { key: 'D', content: '200 A', correct: false }],
    },
    {
      id: 'ly7-q054', content: 'Điện trở của một dây dẫn phụ thuộc vào yếu tố nào?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Điện trở phụ thuộc vào chiều dài, tiết diện và chất liệu của dây dẫn: R = ρL/S.',
      options: [{ key: 'A', content: 'Chỉ chiều dài dây', correct: false }, { key: 'B', content: 'Chiều dài, tiết diện và chất liệu dây', correct: true }, { key: 'C', content: 'Chỉ màu sắc dây', correct: false }, { key: 'D', content: 'Hiệu điện thế đặt vào', correct: false }],
    },
    {
      id: 'ly7-q055', content: 'Dòng điện có tác dụng nhiệt khi:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Khi dòng điện chạy qua dây dẫn, dây dẫn nóng lên do điện năng chuyển thành nhiệt năng (hiệu ứng Joule).',
      options: [{ key: 'A', content: 'Chạy qua chân không', correct: false }, { key: 'B', content: 'Chạy qua dây dẫn có điện trở', correct: true }, { key: 'C', content: 'Chạy qua siêu dẫn', correct: false }, { key: 'D', content: 'Chỉ khi hiệu điện thế cao', correct: false }],
    },
    {
      id: 'ly7-q056', content: 'Bóng đèn dây tóc hoạt động dựa trên tác dụng nào của dòng điện?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Bóng đèn dây tóc dựa trên tác dụng nhiệt: dây tóc nóng đến nhiệt độ cao và phát sáng.',
      options: [{ key: 'A', content: 'Tác dụng từ', correct: false }, { key: 'B', content: 'Tác dụng hóa học', correct: false }, { key: 'C', content: 'Tác dụng nhiệt (và phát sáng)', correct: true }, { key: 'D', content: 'Tác dụng sinh lý', correct: false }],
    },
    {
      id: 'ly7-q057', content: 'Tác dụng từ của dòng điện được ứng dụng trong thiết bị nào?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Dòng điện sinh ra từ trường, ứng dụng trong nam châm điện, động cơ điện, chuông điện.',
      options: [{ key: 'A', content: 'Bóng đèn', correct: false }, { key: 'B', content: 'Ấm đun nước điện', correct: false }, { key: 'C', content: 'Chuông điện, nam châm điện', correct: true }, { key: 'D', content: 'Bình ắc quy', correct: false }],
    },
    {
      id: 'ly7-q058', content: 'Tác dụng hóa học của dòng điện được ứng dụng trong:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Tác dụng hóa học của dòng điện ứng dụng trong mạ điện và điện phân.',
      options: [{ key: 'A', content: 'Mạ điện, điện phân', correct: true }, { key: 'B', content: 'Quạt điện', correct: false }, { key: 'C', content: 'Bóng đèn huỳnh quang', correct: false }, { key: 'D', content: 'Loa điện', correct: false }],
    },
    {
      id: 'ly7-q059', content: 'Cầu chì có tác dụng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Cầu chì bảo vệ mạch điện, tự động ngắt mạch khi dòng điện vượt quá mức an toàn.',
      options: [{ key: 'A', content: 'Tăng cường độ dòng điện', correct: false }, { key: 'B', content: 'Bảo vệ mạch điện khi dòng điện quá lớn', correct: true }, { key: 'C', content: 'Tăng hiệu điện thế', correct: false }, { key: 'D', content: 'Giảm điện trở mạch', correct: false }],
    },
    {
      id: 'ly7-q060', content: 'Quy tắc an toàn khi sử dụng điện: Không được chạm tay trực tiếp vào:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Không chạm tay vào dây điện trần hoặc thiết bị điện đang hoạt động để tránh điện giật.',
      options: [{ key: 'A', content: 'Vỏ nhựa của phích cắm', correct: false }, { key: 'B', content: 'Dây điện trần, thiết bị điện đang hoạt động', correct: true }, { key: 'C', content: 'Bóng đèn đã tắt và nguội', correct: false }, { key: 'D', content: 'Công tắc điện có vỏ cách điện', correct: false }],
    },
    {
      id: 'ly7-q061', content: 'Điện trở tương đương của 2 điện trở R1 = 4Ω và R2 = 6Ω mắc nối tiếp là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Mạch nối tiếp: Rtđ = R1 + R2 = 4 + 6 = 10 Ω.',
      options: [{ key: 'A', content: '2,4 Ω', correct: false }, { key: 'B', content: '10 Ω', correct: true }, { key: 'C', content: '24 Ω', correct: false }, { key: 'D', content: '5 Ω', correct: false }],
    },
    {
      id: 'ly7-q062', content: 'Hai điện trở R1 = 4Ω và R2 = 4Ω mắc song song. Điện trở tương đương là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Mạch song song: 1/Rtđ = 1/R1 + 1/R2 = 1/4 + 1/4 = 1/2, nên Rtđ = 2 Ω.',
      options: [{ key: 'A', content: '8 Ω', correct: false }, { key: 'B', content: '4 Ω', correct: false }, { key: 'C', content: '2 Ω', correct: true }, { key: 'D', content: '1 Ω', correct: false }],
    },
    {
      id: 'ly7-q063', content: 'Trong đoạn mạch nối tiếp, cường độ dòng điện tại mọi điểm:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Trong mạch nối tiếp, dòng điện chạy qua tất cả các bộ phận có cùng cường độ.',
      options: [{ key: 'A', content: 'Khác nhau ở mỗi điện trở', correct: false }, { key: 'B', content: 'Bằng nhau', correct: true }, { key: 'C', content: 'Tỉ lệ với điện trở', correct: false }, { key: 'D', content: 'Bằng 0', correct: false }],
    },
    {
      id: 'ly7-q064', content: 'Trong đoạn mạch song song, hiệu điện thế giữa hai đầu mỗi nhánh:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Trong mạch song song, hai đầu các nhánh được nối chung, nên hiệu điện thế hai đầu mỗi nhánh bằng nhau.',
      options: [{ key: 'A', content: 'Tỉ lệ với điện trở nhánh đó', correct: false }, { key: 'B', content: 'Bằng nhau và bằng hiệu điện thế nguồn', correct: true }, { key: 'C', content: 'Khác nhau', correct: false }, { key: 'D', content: 'Bằng 0', correct: false }],
    },
    {
      id: 'ly7-q065', content: 'Điện năng tiêu thụ của một thiết bị điện tính theo công thức:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Điện năng tiêu thụ: A = P × t = U × I × t, trong đó P là công suất (W), t là thời gian (s).',
      options: [{ key: 'A', content: 'A = U/I', correct: false }, { key: 'B', content: 'A = P × t = U × I × t', correct: true }, { key: 'C', content: 'A = I²/R', correct: false }, { key: 'D', content: 'A = U + I', correct: false }],
    },
    {
      id: 'ly7-q066', content: 'Công suất điện của một thiết bị tính theo công thức:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Công suất điện: P = U × I = I² × R = U²/R.',
      options: [{ key: 'A', content: 'P = U + I', correct: false }, { key: 'B', content: 'P = U × I', correct: true }, { key: 'C', content: 'P = U - I', correct: false }, { key: 'D', content: 'P = U / R', correct: false }],
    },
    {
      id: 'ly7-q067', content: 'Một bóng đèn có hiệu điện thế 220V và cường độ dòng điện 0,5A. Công suất của bóng đèn là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'P = U × I = 220 × 0,5 = 110 W.',
      options: [{ key: 'A', content: '44 W', correct: false }, { key: 'B', content: '110 W', correct: true }, { key: 'C', content: '220 W', correct: false }, { key: 'D', content: '440 W', correct: false }],
    },
    {
      id: 'ly7-q068', content: 'Số đếm của công tơ điện cho biết:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Công tơ điện đo lượng điện năng tiêu thụ tính bằng kWh (kilowatt-giờ).',
      options: [{ key: 'A', content: 'Cường độ dòng điện tiêu thụ', correct: false }, { key: 'B', content: 'Điện năng tiêu thụ tính bằng kWh', correct: true }, { key: 'C', content: 'Hiệu điện thế nguồn điện', correct: false }, { key: 'D', content: 'Công suất tức thời của các thiết bị', correct: false }],
    },
    {
      id: 'ly7-q069', content: 'Dòng điện gây nguy hiểm cho cơ thể người khi:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Dòng điện khoảng 70 mA đi qua cơ thể người có thể gây tử vong. Thực tế, từ 10 mA trở lên đã gây co giật không kiểm soát được.',
      options: [{ key: 'A', content: 'Nhỏ hơn 1 mA', correct: false }, { key: 'B', content: 'Từ khoảng 70 mA trở lên qua cơ thể', correct: true }, { key: 'C', content: 'Dưới 220V', correct: false }, { key: 'D', content: 'Khi dùng pin 1,5V', correct: false }],
    },
    {
      id: 'ly7-q070', content: 'Chạm vào vật nào dưới đây có thể bị điện giật?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Dây điện trần (lõi kim loại không bọc cách điện) mang điện áp nguy hiểm, chạm vào sẽ bị điện giật.',
      options: [{ key: 'A', content: 'Vỏ nhựa của dây điện', correct: false }, { key: 'B', content: 'Lõi kim loại của dây điện trần', correct: true }, { key: 'C', content: 'Công tắc nhựa khi đã tắt', correct: false }, { key: 'D', content: 'Dây nối đất', correct: false }],
    },
    {
      id: 'ly7-q071', content: 'Để đo cường độ dòng điện trong mạch, ampe kế cần phải:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Ampe kế mắc nối tiếp, cực (+) hướng về cực (+) nguồn. Điện trở ampe kế rất nhỏ để không ảnh hưởng đến mạch.',
      options: [{ key: 'A', content: 'Mắc song song, chiều tùy ý', correct: false }, { key: 'B', content: 'Mắc nối tiếp, cực (+) về phía cực (+) nguồn', correct: true }, { key: 'C', content: 'Mắc song song, cực (+) về phía cực (+) nguồn', correct: false }, { key: 'D', content: 'Mắc nối tiếp, chiều tùy ý', correct: false }],
    },
    {
      id: 'ly7-q072', content: 'Trong mạch điện kín, muốn có dòng điện phải cần:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Mạch điện kín cần có nguồn điện (cung cấp hiệu điện thế) và dây dẫn nối kín thành vòng.',
      options: [{ key: 'A', content: 'Chỉ cần dây dẫn kim loại', correct: false }, { key: 'B', content: 'Nguồn điện và mạch dẫn kín', correct: true }, { key: 'C', content: 'Chỉ cần nguồn điện', correct: false }, { key: 'D', content: 'Chỉ cần bóng đèn', correct: false }],
    },
    {
      id: 'ly7-q073', content: 'Khi mắc thêm một điện trở vào mạch nối tiếp thì điện trở tổng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Trong mạch nối tiếp Rtđ = R1 + R2 + ..., thêm điện trở luôn làm tăng điện trở tổng.',
      options: [{ key: 'A', content: 'Giảm', correct: false }, { key: 'B', content: 'Tăng', correct: true }, { key: 'C', content: 'Không đổi', correct: false }, { key: 'D', content: 'Có thể tăng hoặc giảm', correct: false }],
    },
    {
      id: 'ly7-q074', content: 'Khi mắc thêm một điện trở vào mạch song song thì điện trở tương đương:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Trong mạch song song: 1/Rtđ = 1/R1 + 1/R2 + ..., thêm điện trở làm 1/Rtđ tăng → Rtđ giảm.',
      options: [{ key: 'A', content: 'Tăng', correct: false }, { key: 'B', content: 'Giảm', correct: true }, { key: 'C', content: 'Không đổi', correct: false }, { key: 'D', content: 'Bằng tổng các điện trở', correct: false }],
    },
    {
      id: 'ly7-q075', content: 'Điện năng sử dụng tính bằng kWh được tính như thế nào?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: '1 kWh = 1 kilowatt × 1 giờ = 3.600.000 J. Công thức: A (kWh) = P (kW) × t (h).',
      options: [{ key: 'A', content: 'A = P (W) × t (phút)', correct: false }, { key: 'B', content: 'A = P (kW) × t (giờ)', correct: true }, { key: 'C', content: 'A = U (V) × I (A)', correct: false }, { key: 'D', content: 'A = I² × R', correct: false }],
    },
    {
      id: 'ly7-q076', content: 'Một điện trở R = 5 Ω có dòng điện I = 2 A chạy qua. Hiệu điện thế hai đầu điện trở là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'U = I × R = 2 × 5 = 10 V.',
      options: [{ key: 'A', content: '2,5 V', correct: false }, { key: 'B', content: '7 V', correct: false }, { key: 'C', content: '10 V', correct: true }, { key: 'D', content: '20 V', correct: false }],
    },
    {
      id: 'ly7-q077', content: 'Trên bóng đèn ghi "220V – 60W". Điều này có nghĩa là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Thông số ghi trên thiết bị là thông số định mức: hoạt động bình thường ở 220V và tiêu thụ 60W.',
      options: [{ key: 'A', content: 'Bóng đèn chỉ dùng được ở 220V và tối đa 60W', correct: false }, { key: 'B', content: 'Ở 220V bóng đèn tiêu thụ 60W và hoạt động bình thường', correct: true }, { key: 'C', content: 'Bóng đèn phát ra 60W ánh sáng', correct: false }, { key: 'D', content: 'Tổng điện năng của bóng đèn là 220 × 60 J', correct: false }],
    },
    {
      id: 'ly7-q078', content: 'Nguyên nhân gây ra điện giật nguy hiểm là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Điện giật nguy hiểm khi dòng điện đủ lớn chạy qua cơ thể người, làm tổn thương hệ thần kinh và tim.',
      options: [{ key: 'A', content: 'Chỉ do hiệu điện thế cao', correct: false }, { key: 'B', content: 'Dòng điện đủ lớn chạy qua cơ thể người', correct: true }, { key: 'C', content: 'Chỉ do cường độ dòng điện cao', correct: false }, { key: 'D', content: 'Do tiếp xúc với nguồn điện bất kỳ', correct: false }],
    },
    {
      id: 'ly7-q079', content: 'Phát biểu nào sau đây về sự nhiễm điện do cọ xát là đúng?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Khi cọ xát, electron dịch chuyển từ vật này sang vật khác: vật mất electron nhiễm điện dương, vật nhận electron nhiễm điện âm.',
      options: [{ key: 'A', content: 'Cả hai vật đều nhiễm điện âm', correct: false }, { key: 'B', content: 'Cả hai vật đều nhiễm điện dương', correct: false }, { key: 'C', content: 'Một vật nhiễm điện dương, vật kia nhiễm điện âm', correct: true }, { key: 'D', content: 'Không vật nào bị nhiễm điện', correct: false }],
    },
    {
      id: 'ly7-q080', content: 'Electron là hạt mang điện tích:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Electron mang điện tích âm. Proton mang điện tích dương. Neutron trung hòa.',
      options: [{ key: 'A', content: 'Dương', correct: false }, { key: 'B', content: 'Âm', correct: true }, { key: 'C', content: 'Trung hòa', correct: false }, { key: 'D', content: 'Không mang điện', correct: false }],
    },
    {
      id: 'ly7-q081', content: 'Trong kim loại, hạt nào chuyển dời tạo thành dòng điện?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Trong kim loại, dòng điện là dòng các electron tự do chuyển dời có hướng.',
      options: [{ key: 'A', content: 'Proton', correct: false }, { key: 'B', content: 'Neutron', correct: false }, { key: 'C', content: 'Electron tự do', correct: true }, { key: 'D', content: 'Ion dương', correct: false }],
    },
    {
      id: 'ly7-q082', content: 'Công tắc điện trong mạch có tác dụng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Công tắc dùng để đóng (nối) hoặc ngắt mạch điện.',
      options: [{ key: 'A', content: 'Tăng cường độ dòng điện', correct: false }, { key: 'B', content: 'Đóng hoặc ngắt mạch điện', correct: true }, { key: 'C', content: 'Giảm điện trở mạch', correct: false }, { key: 'D', content: 'Dự trữ điện năng', correct: false }],
    },
    {
      id: 'ly7-q083', content: 'Đèn LED tiết kiệm điện hơn đèn dây tóc vì:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Đèn LED chuyển hóa phần lớn điện năng thành ánh sáng, tỏa ít nhiệt hơn đèn dây tóc nên tiết kiệm điện hơn.',
      options: [{ key: 'A', content: 'Đèn LED dùng điện áp cao hơn', correct: false }, { key: 'B', content: 'Đèn LED chuyển phần lớn điện năng thành ánh sáng, tỏa ít nhiệt', correct: true }, { key: 'C', content: 'Đèn LED nhỏ hơn', correct: false }, { key: 'D', content: 'Đèn LED dùng vật liệu đắt tiền hơn', correct: false }],
    },
    {
      id: 'ly7-q084', content: 'Điện trở của dây dẫn thay đổi như thế nào khi tăng chiều dài dây lên gấp đôi (cùng chất liệu, tiết diện)?', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'R = ρL/S: khi L tăng gấp đôi thì R tăng gấp đôi.',
      options: [{ key: 'A', content: 'Giảm đi một nửa', correct: false }, { key: 'B', content: 'Tăng gấp đôi', correct: true }, { key: 'C', content: 'Không đổi', correct: false }, { key: 'D', content: 'Tăng gấp 4 lần', correct: false }],
    },
    {
      id: 'ly7-q085', content: 'Mạch điện có 3 bóng đèn mắc nối tiếp, một bóng bị cháy. Các bóng còn lại sẽ:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Trong mạch nối tiếp, một bóng cháy (đứt) → mạch hở → tất cả bóng đều tắt.',
      options: [{ key: 'A', content: 'Sáng bình thường', correct: false }, { key: 'B', content: 'Đều tắt', correct: true }, { key: 'C', content: 'Sáng hơn bình thường', correct: false }, { key: 'D', content: 'Mờ hơn bình thường', correct: false }],
    },
    {
      id: 'ly7-q086', content: 'Trong nhà, các thiết bị điện (đèn, quạt, tivi...) thường được mắc:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Trong nhà, các thiết bị được mắc song song để mỗi thiết bị có cùng điện áp 220V và hoạt động độc lập.',
      options: [{ key: 'A', content: 'Nối tiếp nhau', correct: false }, { key: 'B', content: 'Song song với nhau', correct: true }, { key: 'C', content: 'Hỗn hợp nối tiếp và song song tùy loại', correct: false }, { key: 'D', content: 'Trực tiếp vào nguồn không qua dây dẫn', correct: false }],
    },
    {
      id: 'ly7-q087', content: 'Biết R1 = 6Ω và R2 = 3Ω mắc song song, hiệu điện thế hai đầu mạch U = 12V. Cường độ dòng điện qua R1 là:', topicId: 'ly7-dien', difficulty: 'HARD',
      explanation: 'Mạch song song: U1 = U2 = 12V. I1 = U1/R1 = 12/6 = 2 A.',
      options: [{ key: 'A', content: '1 A', correct: false }, { key: 'B', content: '2 A', correct: true }, { key: 'C', content: '4 A', correct: false }, { key: 'D', content: '6 A', correct: false }],
    },
    {
      id: 'ly7-q088', content: 'Tác dụng sinh lý của dòng điện có thể gây ra:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Tác dụng sinh lý: dòng điện tác động lên hệ thần kinh và cơ, có thể gây co giật, bỏng, ngừng tim. Cũng được dùng trong châm cứu điện, kích tim.',
      options: [{ key: 'A', content: 'Chỉ tác dụng có ích như châm cứu điện', correct: false }, { key: 'B', content: 'Co giật, ngừng tim — cả có hại và có ích trong y tế', correct: true }, { key: 'C', content: 'Không ảnh hưởng đến cơ thể sống', correct: false }, { key: 'D', content: 'Chỉ gây nóng da', correct: false }],
    },
    {
      id: 'ly7-q089', content: 'Hiện tượng sét là do:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Sét là hiện tượng phóng điện giữa các đám mây tích điện trái dấu hoặc giữa đám mây và mặt đất.',
      options: [{ key: 'A', content: 'Mưa lớn tạo ra dòng điện', correct: false }, { key: 'B', content: 'Phóng điện giữa các đám mây hoặc giữa mây và đất', correct: true }, { key: 'C', content: 'Không khí bị đốt nóng', correct: false }, { key: 'D', content: 'Mặt Trời phát tia sáng mạnh', correct: false }],
    },
    {
      id: 'ly7-q090', content: 'Cột thu lôi (cột chống sét) bảo vệ công trình bằng cách:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Cột thu lôi dẫn điện sét xuống đất an toàn, bảo vệ công trình tránh bị sét đánh trực tiếp.',
      options: [{ key: 'A', content: 'Ngăn mây tích điện hình thành', correct: false }, { key: 'B', content: 'Dẫn điện sét xuống đất an toàn', correct: true }, { key: 'C', content: 'Phát điện để trung hòa điện tích trong mây', correct: false }, { key: 'D', content: 'Hút ẩm từ không khí', correct: false }],
    },
    {
      id: 'ly7-q091', content: 'Chọn phát biểu đúng về chiều dòng điện trong mạch ngoài:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Quy ước chiều dòng điện: trong mạch ngoài (ngoài nguồn), dòng điện đi từ cực dương (+) đến cực âm (-) của nguồn.',
      options: [{ key: 'A', content: 'Từ cực âm (-) đến cực dương (+)', correct: false }, { key: 'B', content: 'Từ cực dương (+) đến cực âm (-)', correct: true }, { key: 'C', content: 'Theo chiều bất kỳ', correct: false }, { key: 'D', content: 'Từ điện trở lớn sang điện trở nhỏ', correct: false }],
    },
    {
      id: 'ly7-q092', content: 'Một ấm điện hoạt động ở 220V, công suất 1100W. Cường độ dòng điện qua ấm là:', topicId: 'ly7-dien', difficulty: 'HARD',
      explanation: 'P = U × I → I = P/U = 1100/220 = 5 A.',
      options: [{ key: 'A', content: '2 A', correct: false }, { key: 'B', content: '5 A', correct: true }, { key: 'C', content: '10 A', correct: false }, { key: 'D', content: '0,5 A', correct: false }],
    },
    {
      id: 'ly7-q093', content: 'Sử dụng điện an toàn, không nên:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Không cắm nhiều thiết bị vào một ổ cắm vì có thể gây quá tải, nóng chảy dây điện, nguy cơ cháy nổ.',
      options: [{ key: 'A', content: 'Dùng dây điện đúng tiêu chuẩn', correct: false }, { key: 'B', content: 'Cắm quá nhiều thiết bị vào một ổ cắm', correct: true }, { key: 'C', content: 'Lắp cầu chì phù hợp', correct: false }, { key: 'D', content: 'Nối đất cho các thiết bị điện vỏ kim loại', correct: false }],
    },
    {
      id: 'ly7-q094', content: 'Dây dẫn điện trong gia đình thường làm bằng:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Dây dẫn điện thường làm bằng đồng hoặc nhôm vì dẫn điện tốt, được bọc lớp nhựa cách điện bên ngoài.',
      options: [{ key: 'A', content: 'Sắt nguyên chất', correct: false }, { key: 'B', content: 'Đồng hoặc nhôm, bọc cách điện', correct: true }, { key: 'C', content: 'Nhựa tổng hợp', correct: false }, { key: 'D', content: 'Thủy tinh', correct: false }],
    },
    {
      id: 'ly7-q095', content: 'Tại sao dây dẫn điện phải có lớp vỏ cách điện?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Lớp vỏ cách điện ngăn dòng điện rò ra ngoài, bảo vệ người dùng tránh điện giật và tránh chập mạch.',
      options: [{ key: 'A', content: 'Để làm đẹp', correct: false }, { key: 'B', content: 'Bảo vệ người dùng khỏi điện giật và tránh chập mạch', correct: true }, { key: 'C', content: 'Để tăng điện trở dây dẫn', correct: false }, { key: 'D', content: 'Để dây dẫn bền hơn', correct: false }],
    },
    {
      id: 'ly7-q096', content: 'Hiệu điện thế giữa hai cực của pin tiểu (AA) là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Pin tiểu (AA, AAA) có hiệu điện thế định mức 1,5 V.',
      options: [{ key: 'A', content: '0,5 V', correct: false }, { key: 'B', content: '1,5 V', correct: true }, { key: 'C', content: '9 V', correct: false }, { key: 'D', content: '12 V', correct: false }],
    },
    {
      id: 'ly7-q097', content: 'Công thức tính điện trở là:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Từ định luật Ohm I = U/R, suy ra R = U/I.',
      options: [{ key: 'A', content: 'R = U × I', correct: false }, { key: 'B', content: 'R = U / I', correct: true }, { key: 'C', content: 'R = I / U', correct: false }, { key: 'D', content: 'R = U + I', correct: false }],
    },
    {
      id: 'ly7-q098', content: 'Đơn vị đo điện trở là:', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Điện trở đo bằng Ôm (Ω). Các bội số: kΩ (kilôôm), MΩ (mêgaôm).',
      options: [{ key: 'A', content: 'Ampe (A)', correct: false }, { key: 'B', content: 'Vôn (V)', correct: false }, { key: 'C', content: 'Ôm (Ω)', correct: true }, { key: 'D', content: 'Oát (W)', correct: false }],
    },
    {
      id: 'ly7-q099', content: 'Khi hiệu điện thế đặt vào hai đầu điện trở tăng gấp đôi thì cường độ dòng điện qua điện trở:', topicId: 'ly7-dien', difficulty: 'MEDIUM',
      explanation: 'Theo định luật Ohm I = U/R, R không đổi → U tăng gấp đôi thì I tăng gấp đôi.',
      options: [{ key: 'A', content: 'Tăng gấp 4 lần', correct: false }, { key: 'B', content: 'Tăng gấp đôi', correct: true }, { key: 'C', content: 'Không đổi', correct: false }, { key: 'D', content: 'Giảm một nửa', correct: false }],
    },
    {
      id: 'ly7-q100', content: 'Biện pháp nào không phải là tiết kiệm điện năng?', topicId: 'ly7-dien', difficulty: 'EASY',
      explanation: 'Để đèn sáng cả ngày không cần thiết là lãng phí điện, không phải tiết kiệm.',
      options: [{ key: 'A', content: 'Tắt đèn khi ra khỏi phòng', correct: false }, { key: 'B', content: 'Để đèn sáng cả ngày cho tiện', correct: true }, { key: 'C', content: 'Dùng thiết bị có nhãn tiết kiệm năng lượng', correct: false }, { key: 'D', content: 'Rút phích cắm khi không dùng thiết bị', correct: false }],
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
        subjectId: 'sub-ly',
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

  console.log(`Done! Created ${created} questions, skipped ${questions.length - created} existing.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
