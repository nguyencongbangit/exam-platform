const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: data.subjectId || 'sub-amnhac',
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
  console.log('Bắt đầu tạo câu hỏi Âm nhạc lớp 5...');

  // ── TOPIC 1: Học hát ──────────────────────────────────────────────────────
  const topicHocHat = 'cmt5s5b2c001j97l0uu68abgy';

  // EASY (6)
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Bài hát "Quốc ca Việt Nam" do ai sáng tác?',
    opts: ['Văn Cao', 'Phạm Tuyên', 'Lưu Hữu Phước', 'Trịnh Công Sơn'],
    ans: 'A',
    exp: 'Bài "Tiến quân ca" (Quốc ca Việt Nam) do nhạc sĩ Văn Cao sáng tác năm 1944.',
  });
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Dân ca quan họ là làn điệu dân ca đặc trưng của vùng nào?',
    opts: ['Bắc Ninh', 'Huế', 'Nam Bộ', 'Tây Nguyên'],
    ans: 'A',
    exp: 'Dân ca quan họ là loại hình dân ca đặc trưng của vùng Bắc Ninh, Bắc Giang (miền Bắc Việt Nam).',
  });
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Bài hát "Mùa hè đến" là thể loại bài hát gì?',
    opts: ['Bài hát thiếu nhi', 'Dân ca', 'Nhạc cách mạng', 'Nhạc dân gian'],
    ans: 'A',
    exp: 'Bài hát "Mùa hè đến" là bài hát thiếu nhi vui tươi, phù hợp lứa tuổi học sinh.',
  });
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Dân ca miền Nam Việt Nam thường có đặc điểm gì về giai điệu?',
    opts: ['Ngọt ngào, trữ tình', 'Hùng tráng, mạnh mẽ', 'Buồn bã, ảo não', 'Nhanh, sôi động'],
    ans: 'A',
    exp: 'Dân ca miền Nam thường có giai điệu ngọt ngào, trữ tình, mượt mà, thể hiện tính cách phóng khoáng của người Nam Bộ.',
  });
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Khi học hát, tư thế đúng là:',
    opts: ['Ngồi hoặc đứng thẳng, thoải mái', 'Cúi người về phía trước', 'Ngả người ra sau', 'Khoanh tay trước ngực'],
    ans: 'A',
    exp: 'Tư thế đúng khi hát là ngồi hoặc đứng thẳng, thoải mái để hơi thở được lưu thông tốt.',
  });
  await createQ({
    topicId: topicHocHat, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Bài hát dân ca "Lý cây bông" có nguồn gốc từ vùng nào?',
    opts: ['Nam Bộ', 'Bắc Bộ', 'Trung Bộ', 'Tây Nguyên'],
    ans: 'A',
    exp: '"Lý cây bông" là bài dân ca Nam Bộ nổi tiếng, thể hiện nét văn hóa đặc trưng của người dân Nam Bộ.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Bài hát "Bác đang cùng chúng cháu hành quân" do ai sáng tác?',
    opts: ['Huy Thục', 'Phạm Tuyên', 'Văn Cao', 'Hoàng Vân'],
    ans: 'A',
    exp: 'Bài hát "Bác đang cùng chúng cháu hành quân" do nhạc sĩ Huy Thục sáng tác.',
  });
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Dân ca "Bèo dạt mây trôi" là làn điệu dân ca của vùng nào?',
    opts: ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ', 'Tây Bắc'],
    ans: 'A',
    exp: '"Bèo dạt mây trôi" là dân ca quan họ Bắc Bộ, thể hiện nỗi nhớ nhung, tình cảm thiết tha.',
  });
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Để hát đúng giai điệu, người hát cần chú ý điều gì nhất?',
    opts: ['Lắng nghe và lặp lại chính xác các nốt nhạc', 'Hát thật to', 'Hát thật nhanh', 'Nhắm mắt khi hát'],
    ans: 'A',
    exp: 'Để hát đúng giai điệu, người hát cần lắng nghe kỹ và lặp lại chính xác cao độ các nốt nhạc.',
  });
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Dân ca Tây Nguyên thường gắn liền với nhạc cụ nào?',
    opts: ['Cồng chiêng', 'Đàn tranh', 'Sáo trúc', 'Đàn bầu'],
    ans: 'A',
    exp: 'Cồng chiêng là nhạc cụ đặc trưng của văn hóa Tây Nguyên, thường xuất hiện trong các lễ hội và bài dân ca.',
  });
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nhạc sĩ Phạm Tuyên nổi tiếng với bài hát thiếu nhi nào sau đây?',
    opts: ['Như có Bác trong ngày vui đại thắng', 'Tiến quân ca', 'Giải phóng miền Nam', 'Hành quân xa'],
    ans: 'A',
    exp: 'Nhạc sĩ Phạm Tuyên sáng tác nhiều bài hát nổi tiếng, trong đó có "Như có Bác trong ngày vui đại thắng".',
  });
  await createQ({
    topicId: topicHocHat, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Điều gì tạo nên một buổi biểu diễn âm nhạc tốt?',
    opts: ['Hát đúng lời, đúng nhạc, biểu cảm phù hợp', 'Chỉ cần hát thật to', 'Mặc đẹp là đủ', 'Hát thật nhanh'],
    ans: 'A',
    exp: 'Một buổi biểu diễn tốt cần hát đúng lời, đúng giai điệu và có biểu cảm phù hợp với nội dung bài hát.',
  });

  // HARD (3)
  await createQ({
    topicId: topicHocHat, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Bài dân ca "Hò ba lý" thuộc thể loại dân ca của vùng nào và thường được hát trong hoàn cảnh nào?',
    opts: [
      'Dân ca Trung Bộ, thường hát khi lao động tập thể',
      'Dân ca Bắc Bộ, hát trong lễ hội',
      'Dân ca Nam Bộ, hát khi ru con',
      'Dân ca Tây Nguyên, hát trong lễ hội cồng chiêng',
    ],
    ans: 'A',
    exp: '"Hò ba lý" là hò đối đáp của miền Trung, thường hát khi lao động tập thể để tạo nhịp điệu và vui vẻ.',
  });
  await createQ({
    topicId: topicHocHat, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Khi biểu diễn bài hát mang tính cách mạng, người hát cần thể hiện sắc thái như thế nào?',
    opts: [
      'Hùng tráng, mạnh mẽ, tự hào dân tộc',
      'Nhẹ nhàng, tha thiết, buồn bã',
      'Nhanh, vui tươi, rộn ràng',
      'Chậm rãi, êm dịu, thư thái',
    ],
    ans: 'A',
    exp: 'Bài hát cách mạng cần được thể hiện với sắc thái hùng tráng, mạnh mẽ, tự hào dân tộc để truyền đạt đúng tinh thần bài hát.',
  });
  await createQ({
    topicId: topicHocHat, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Đặc điểm nổi bật phân biệt dân ca quan họ Bắc Ninh với các thể loại dân ca khác là gì?',
    opts: [
      'Hát đối đáp giữa hai bên liền anh và liền chị',
      'Chỉ có một người hát',
      'Luôn kết hợp với múa',
      'Chỉ hát trong lễ tang',
    ],
    ans: 'A',
    exp: 'Quan họ Bắc Ninh đặc trưng bởi lối hát đối đáp giữa liền anh và liền chị, thường diễn ra tại lễ hội mùa xuân.',
  });

  // ── TOPIC 2: Nhạc lí cơ bản ──────────────────────────────────────────────
  const topicNhacLi = 'cmt5s5b2i001l97l0l3mqg2fl';

  // EASY (6)
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Trong âm nhạc, có bao nhiêu nốt nhạc cơ bản?',
    opts: ['7 nốt', '5 nốt', '8 nốt', '6 nốt'],
    ans: 'A',
    exp: 'Có 7 nốt nhạc cơ bản: Đô (C), Rê (D), Mi (E), Fa (F), Sol (G), La (A), Si (B).',
  });
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Nốt tròn có giá trị bằng bao nhiêu phách?',
    opts: ['4 phách', '2 phách', '1 phách', '3 phách'],
    ans: 'A',
    exp: 'Nốt tròn có giá trị 4 phách, là nốt nhạc có trường độ dài nhất trong các nốt cơ bản.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Khóa Sol được đặt ở đâu trên khuông nhạc?',
    opts: ['Dòng kẻ thứ 2 từ dưới lên', 'Dòng kẻ thứ 1', 'Dòng kẻ thứ 3', 'Dòng kẻ thứ 4'],
    ans: 'A',
    exp: 'Khóa Sol (khóa treble) được đặt bắt đầu từ dòng kẻ thứ 2, xác định nốt Sol nằm trên dòng đó.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Nhịp 2/4 có nghĩa là gì?',
    opts: ['Mỗi ô nhịp có 2 phách, mỗi phách bằng 1 nốt đen', 'Mỗi ô nhịp có 4 phách', 'Mỗi ô nhịp có 2 nốt tròn', 'Mỗi ô nhịp có 3 phách'],
    ans: 'A',
    exp: 'Nhịp 2/4: số 2 trên = 2 phách/ô nhịp; số 4 dưới = đơn vị phách là nốt đen (1/4 nốt tròn).',
  });
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Vạch nhịp trong âm nhạc dùng để làm gì?',
    opts: ['Phân chia các ô nhịp', 'Chỉ cao độ của nốt nhạc', 'Chỉ tốc độ bài hát', 'Chỉ lực độ bài hát'],
    ans: 'A',
    exp: 'Vạch nhịp là đường thẳng đứng trên khuông nhạc, dùng để phân chia các ô nhịp.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Nốt đen có giá trị bằng bao nhiêu phách?',
    opts: ['1 phách', '2 phách', '4 phách', '0,5 phách'],
    ans: 'A',
    exp: 'Nốt đen có giá trị 1 phách, là đơn vị phách cơ bản trong nhiều loại nhịp.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nhịp 3/4 thường được dùng trong thể loại nhạc nào?',
    opts: ['Nhạc van (waltz), nhạc khiêu vũ', 'Nhạc hành quân', 'Nhạc dân ca Nam Bộ', 'Nhạc rock'],
    ans: 'A',
    exp: 'Nhịp 3/4 với 3 phách/ô nhịp tạo cảm giác nhịp nhàng, uyển chuyển, thường dùng trong nhạc waltz.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nốt trắng có giá trị bằng bao nhiêu phách?',
    opts: ['2 phách', '1 phách', '4 phách', '0,5 phách'],
    ans: 'A',
    exp: 'Nốt trắng có giá trị 2 phách, bằng 2 nốt đen hoặc bằng một nửa nốt tròn.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Thuật ngữ "Andante" trong âm nhạc chỉ điều gì?',
    opts: ['Tốc độ chậm, nhẹ nhàng', 'Tốc độ rất nhanh', 'Tốc độ trung bình', 'Tốc độ nhanh vừa'],
    ans: 'A',
    exp: 'Andante là thuật ngữ âm nhạc Ý chỉ tốc độ chậm, nhẹ nhàng, uyển chuyển (khoảng 76-108 BPM).',
  });
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Dấu lặng đen tương ứng với giá trị im lặng bằng bao nhiêu phách?',
    opts: ['1 phách', '2 phách', '4 phách', '0,5 phách'],
    ans: 'A',
    exp: 'Dấu lặng đen có giá trị im lặng bằng 1 phách, tương đương với nốt đen.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Khuông nhạc gồm bao nhiêu dòng kẻ?',
    opts: ['5 dòng kẻ', '4 dòng kẻ', '6 dòng kẻ', '3 dòng kẻ'],
    ans: 'A',
    exp: 'Khuông nhạc tiêu chuẩn gồm 5 dòng kẻ song song, tạo ra 4 khe để đặt các nốt nhạc.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nốt đơn (móc đơn) có giá trị bằng bao nhiêu phách?',
    opts: ['0,5 phách', '1 phách', '2 phách', '0,25 phách'],
    ans: 'A',
    exp: 'Nốt đơn (móc đơn) có giá trị 0,5 phách, bằng một nửa nốt đen.',
  });

  // HARD (3)
  await createQ({
    topicId: topicNhacLi, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Trong nhịp 4/4, một ô nhịp có thể chứa bao nhiêu nốt đơn (móc đơn)?',
    opts: ['8 nốt đơn', '4 nốt đơn', '6 nốt đơn', '2 nốt đơn'],
    ans: 'A',
    exp: 'Nhịp 4/4 có 4 phách/ô nhịp. Mỗi nốt đơn = 0,5 phách, nên 1 ô nhịp chứa được 4 ÷ 0,5 = 8 nốt đơn.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Nếu bài hát có số chỉ nhịp là 3/4 và được ghi "Tempo = 120", điều này có nghĩa là gì?',
    opts: [
      'Mỗi phút có 120 nốt đen, mỗi ô nhịp có 3 phách',
      'Bài có 120 ô nhịp, mỗi ô có 3/4 giây',
      'Bài có 3 đoạn, mỗi đoạn 40 nhịp',
      'Tốc độ là 120 nốt tròn mỗi phút',
    ],
    ans: 'A',
    exp: 'Tempo = 120 BPM nghĩa là 120 nốt đen/phút. Nhịp 3/4 có 3 phách (nốt đen) mỗi ô nhịp.',
  });
  await createQ({
    topicId: topicNhacLi, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Dấu hóa thăng (#) đặt trước nốt nhạc có tác dụng gì?',
    opts: [
      'Nâng cao độ nốt nhạc lên nửa cung',
      'Hạ thấp cao độ nốt nhạc xuống nửa cung',
      'Giữ nguyên cao độ nốt nhạc',
      'Tăng trường độ nốt nhạc lên gấp đôi',
    ],
    ans: 'A',
    exp: 'Dấu thăng (#) nâng cao độ nốt nhạc lên nửa cung (semitone). Dấu giáng (b) hạ xuống nửa cung.',
  });

  // ── TOPIC 3: Nghe nhạc và cảm thụ âm nhạc ────────────────────────────────
  const topicNgheNhac = 'cmt5s5b2o001n97l0ker71c1h';

  // EASY (6)
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Đàn tranh là nhạc cụ dân tộc có bao nhiêu dây?',
    opts: ['16 dây', '12 dây', '20 dây', '8 dây'],
    ans: 'A',
    exp: 'Đàn tranh (đàn thập lục) truyền thống có 16 dây kim loại, là nhạc cụ gảy đặc trưng của Việt Nam.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Nhạc cụ nào sau đây là nhạc cụ dân tộc Việt Nam?',
    opts: ['Đàn bầu', 'Guitar', 'Piano', 'Violin'],
    ans: 'A',
    exp: 'Đàn bầu (độc huyền cầm) là nhạc cụ truyền thống đặc trưng của Việt Nam, chỉ có 1 dây.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Khi nghe nhạc, âm thanh buồn thường có nhịp độ như thế nào?',
    opts: ['Chậm', 'Nhanh', 'Rất nhanh', 'Không đều'],
    ans: 'A',
    exp: 'Âm nhạc mang cảm xúc buồn thường có nhịp độ chậm, giai điệu đi xuống và âm lượng nhỏ.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Sáo trúc là nhạc cụ thuộc nhóm nào?',
    opts: ['Nhạc cụ hơi', 'Nhạc cụ dây', 'Nhạc cụ gõ', 'Nhạc cụ bàn phím'],
    ans: 'A',
    exp: 'Sáo trúc thuộc nhóm nhạc cụ hơi (thổi), âm thanh tạo ra bằng cách thổi hơi qua lỗ thổi.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Dân ca quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hóa phi vật thể vào năm nào?',
    opts: ['2009', '2003', '2015', '2000'],
    ans: 'A',
    exp: 'Dân ca quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2009.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'EASY', subjectId: 'sub-amnhac',
    q: 'Nhạc cụ nào phát ra âm thanh bằng cách gõ?',
    opts: ['Trống', 'Đàn tranh', 'Sáo', 'Đàn bầu'],
    ans: 'A',
    exp: 'Trống là nhạc cụ gõ, âm thanh phát ra khi dùi trống gõ vào mặt trống.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nhạc đờn ca tài tử là loại hình âm nhạc đặc trưng của vùng nào?',
    opts: ['Nam Bộ', 'Bắc Bộ', 'Trung Bộ', 'Tây Nguyên'],
    ans: 'A',
    exp: 'Đờn ca tài tử Nam Bộ là loại hình âm nhạc thính phòng đặc trưng của miền Nam, được UNESCO công nhận năm 2013.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Khi cảm thụ âm nhạc, chúng ta nên làm gì để hiểu đúng cảm xúc bài nhạc?',
    opts: [
      'Lắng nghe chăm chú, cảm nhận giai điệu và lời ca',
      'Chỉ cần nghe qua một lần',
      'Không cần chú ý lời ca',
      'Nghe trong khi làm việc khác',
    ],
    ans: 'A',
    exp: 'Cảm thụ âm nhạc đúng cách cần lắng nghe chăm chú, cảm nhận cả giai điệu lẫn lời ca để hiểu thông điệp.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nhạc cụ violin thuộc nhóm nào?',
    opts: ['Nhạc cụ dây (kéo)', 'Nhạc cụ hơi', 'Nhạc cụ gõ', 'Nhạc cụ dây (gảy)'],
    ans: 'A',
    exp: 'Violin thuộc nhóm nhạc cụ dây kéo (chà cung), âm thanh tạo ra khi cung kéo qua các dây.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Âm nhạc có thể tác động đến con người như thế nào?',
    opts: [
      'Ảnh hưởng đến cảm xúc, tâm trạng và tinh thần',
      'Chỉ giải trí, không có tác dụng khác',
      'Chỉ ảnh hưởng đến thể chất',
      'Không có tác động gì đặc biệt',
    ],
    ans: 'A',
    exp: 'Âm nhạc có khả năng tác động mạnh đến cảm xúc, tâm trạng, tinh thần và thậm chí cả sức khỏe con người.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Nhạc cụ đàn bầu (độc huyền cầm) có đặc điểm gì nổi bật?',
    opts: [
      'Chỉ có 1 dây, âm thanh rung động trữ tình',
      'Có 6 dây như guitar',
      'Được thổi như sáo',
      'Được gõ bằng dùi',
    ],
    ans: 'A',
    exp: 'Đàn bầu chỉ có 1 dây duy nhất nhưng có thể tạo ra nhiều cao độ nhờ cần rung, âm thanh rất trữ tình đặc biệt.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'MEDIUM', subjectId: 'sub-amnhac',
    q: 'Thể loại âm nhạc dân gian "hát ru" thường có tác dụng gì?',
    opts: [
      'Ru con ngủ, thể hiện tình yêu thương của người mẹ',
      'Cổ vũ tinh thần chiến đấu',
      'Tạo không khí vui tươi, nhộn nhịp',
      'Kể về lịch sử dân tộc',
    ],
    ans: 'A',
    exp: 'Hát ru là thể loại dân ca nhẹ nhàng, trữ tình dùng để ru con ngủ, thể hiện tình yêu thương vô bờ của người mẹ.',
  });

  // HARD (3)
  await createQ({
    topicId: topicNgheNhac, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Sự khác biệt chính giữa "dân ca" và "nhạc cổ điển" là gì?',
    opts: [
      'Dân ca được truyền miệng trong dân gian, nhạc cổ điển được sáng tác và ghi chép bởi nhạc sĩ có tên tuổi',
      'Dân ca chỉ có ở Việt Nam, nhạc cổ điển chỉ có ở châu Âu',
      'Dân ca luôn buồn, nhạc cổ điển luôn vui',
      'Dân ca không có nhạc đệm, nhạc cổ điển luôn có dàn nhạc',
    ],
    ans: 'A',
    exp: 'Dân ca thường vô danh, truyền miệng và gắn với sinh hoạt cộng đồng. Nhạc cổ điển do nhạc sĩ cụ thể sáng tác, ghi chép chính xác.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Trong dàn nhạc giao hưởng, nhóm nhạc cụ nào thường đóng vai trò chủ đạo?',
    opts: [
      'Nhóm nhạc cụ dây (violin, viola, cello, contrabass)',
      'Nhóm nhạc cụ gõ',
      'Nhóm nhạc cụ hơi đồng',
      'Nhóm nhạc cụ bàn phím',
    ],
    ans: 'A',
    exp: 'Trong dàn nhạc giao hưởng, nhóm dây (strings) chiếm số lượng lớn nhất và thường đóng vai trò chủ đạo về giai điệu.',
  });
  await createQ({
    topicId: topicNgheNhac, d: 'HARD', subjectId: 'sub-amnhac',
    q: 'Âm nhạc truyền thống Việt Nam sử dụng thang âm gì khác với âm nhạc phương Tây?',
    opts: [
      'Thang âm ngũ cung (5 âm) thay vì thất âm (7 âm)',
      'Thang âm thất âm (7 âm) thay vì ngũ cung',
      'Thang âm bát cung (8 âm)',
      'Thang âm tam cung (3 âm)',
    ],
    ans: 'A',
    exp: 'Nhạc truyền thống Việt Nam và nhiều nước châu Á dùng thang âm ngũ cung (5 nốt), khác với thang âm 7 nốt của phương Tây.',
  });

  console.log('Hoàn thành tạo 45 câu hỏi Âm nhạc lớp 5!');
}

main().catch(console.error).finally(() => p.$disconnect());
