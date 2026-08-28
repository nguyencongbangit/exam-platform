const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: data.subjectId || 'sub-mythuat',
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
  console.log('Bắt đầu tạo câu hỏi Mĩ thuật lớp 5...');

  // ── TOPIC 1: Vẽ theo mẫu và vẽ tranh ─────────────────────────────────────
  const topicVe = 'cmt5s5b2u001p97l00vspt8je';

  // EASY (6)
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Nguyên tắc "gần lớn xa nhỏ" trong vẽ tranh thuộc về kiến thức gì?',
    opts: ['Luật phối cảnh', 'Lý thuyết màu sắc', 'Kỹ thuật tô màu', 'Bố cục tranh'],
    ans: 'A',
    exp: '"Gần lớn xa nhỏ" là nguyên tắc cơ bản của luật phối cảnh (perspective), giúp tạo chiều sâu trong tranh.',
  });
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Đường viền bao quanh hình dạng của vật thể trong vẽ tranh được gọi là gì?',
    opts: ['Đường nét (contour)', 'Đường chân trời', 'Đường bóng tối', 'Đường phối cảnh'],
    ans: 'A',
    exp: 'Đường nét (contour lines) là đường viền xác định hình dạng bên ngoài của vật thể.',
  });
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Trong tranh phong cảnh, phần nào thường được vẽ ở phía trên tờ giấy?',
    opts: ['Bầu trời', 'Mặt đất', 'Cây cối', 'Nhà cửa'],
    ans: 'A',
    exp: 'Trong tranh phong cảnh, bầu trời thường được vẽ ở phía trên, mặt đất ở phía dưới, tạo bố cục tự nhiên.',
  });
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Khi vẽ theo mẫu, bước đầu tiên cần làm là gì?',
    opts: ['Quan sát kỹ vật mẫu', 'Tô màu ngay', 'Vẽ chi tiết nhỏ trước', 'Xé giấy làm khung'],
    ans: 'A',
    exp: 'Bước đầu tiên khi vẽ theo mẫu là quan sát kỹ vật mẫu để nắm hình dáng, tỉ lệ và đặc điểm.',
  });
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Tranh tĩnh vật thường vẽ những gì?',
    opts: ['Đồ vật, hoa quả, không chuyển động', 'Con người đang hoạt động', 'Phong cảnh thiên nhiên', 'Động vật hoang dã'],
    ans: 'A',
    exp: 'Tranh tĩnh vật (still life) vẽ các vật thể đứng yên như bình hoa, hoa quả, đồ vật gia dụng.',
  });
  await createQ({
    topicId: topicVe, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Trong tranh phong cảnh, vật thể ở phía trước (gần người xem) thường được vẽ như thế nào?',
    opts: ['To hơn và rõ nét hơn', 'Nhỏ hơn và mờ hơn', 'Bằng nhau so với xa', 'Mờ hơn vật ở xa'],
    ans: 'A',
    exp: 'Theo luật phối cảnh, vật gần người xem được vẽ to hơn, rõ nét hơn; vật xa thì nhỏ hơn, mờ hơn.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Trong vẽ tranh, "sáng – tối" (light and shadow) được dùng để làm gì?',
    opts: [
      'Tạo khối và chiều sâu cho vật thể',
      'Chỉ để trang trí thêm màu sắc',
      'Phân chia các phần của tranh',
      'Tạo đường viền cho hình vẽ',
    ],
    ans: 'A',
    exp: 'Kỹ thuật sáng-tối (shading) tạo ra cảm giác khối 3D và chiều sâu, làm cho vật thể trông thực hơn.',
  });
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Tỉ lệ trong vẽ tranh có nghĩa là gì?',
    opts: [
      'Kích thước tương quan giữa các phần của vật thể',
      'Màu sắc sử dụng trong tranh',
      'Số lượng đường nét trong tranh',
      'Loại bút vẽ được sử dụng',
    ],
    ans: 'A',
    exp: 'Tỉ lệ (proportion) là kích thước tương quan giữa các bộ phận với nhau và với tổng thể vật thể.',
  });
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Khi vẽ tranh đề tài "Gia đình", nên bắt đầu phác thảo từ đâu?',
    opts: [
      'Phác nét chính các nhân vật trước, sau đó vẽ nền',
      'Vẽ nền chi tiết trước',
      'Tô màu trước khi vẽ nét',
      'Vẽ chi tiết nhỏ nhất trước',
    ],
    ans: 'A',
    exp: 'Khi vẽ tranh đề tài, nên phác nét chính (nhân vật, bố cục) trước, sau đó vẽ chi tiết và cuối cùng tô màu.',
  });
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Trong bức tranh, "tiền cảnh" (foreground) là phần nào?',
    opts: [
      'Phần phía trước, gần người xem nhất',
      'Phần ở giữa tranh',
      'Phần phía sau, xa người xem nhất',
      'Phần trên cùng của tranh',
    ],
    ans: 'A',
    exp: 'Tiền cảnh (foreground) là phần phía trước của bức tranh, gần người xem nhất, thường vẽ lớn và rõ nét.',
  });
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Để vẽ được hình tròn đều, kỹ thuật nào sau đây hữu ích nhất?',
    opts: [
      'Vẽ nhiều đường cong ngắn kết hợp, hoặc dùng compa',
      'Vẽ thật nhanh một nét liền',
      'Chỉ vẽ phần trên rồi gập giấy',
      'Dùng thước thẳng',
    ],
    ans: 'A',
    exp: 'Vẽ hình tròn có thể dùng compa để chính xác, hoặc luyện tập vẽ nhiều cung tròn nhỏ kết hợp.',
  });
  await createQ({
    topicId: topicVe, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Đường chân trời (horizon line) trong tranh phong cảnh có tác dụng gì?',
    opts: [
      'Xác định điểm nhìn và tạo chiều sâu không gian',
      'Phân chia màu sắc',
      'Tạo đường viền cho tranh',
      'Chỉ để trang trí',
    ],
    ans: 'A',
    exp: 'Đường chân trời là đường nằm ngang xác định tầm mắt người xem, giúp tạo chiều sâu và phối cảnh trong tranh.',
  });

  // HARD (3)
  await createQ({
    topicId: topicVe, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Kỹ thuật "hatching" và "cross-hatching" trong vẽ tranh được dùng để thể hiện điều gì?',
    opts: [
      'Tạo vùng bóng tối và độ đậm nhạt bằng các đường song song hoặc giao nhau',
      'Tô màu nền',
      'Vẽ đường viền sắc nét',
      'Tạo hiệu ứng phản chiếu ánh sáng',
    ],
    ans: 'A',
    exp: 'Hatching dùng đường song song, cross-hatching dùng đường chéo giao nhau để tạo vùng tối và thể hiện khối 3D.',
  });
  await createQ({
    topicId: topicVe, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Trong vẽ theo mẫu, "điểm tụ" (vanishing point) là gì?',
    opts: [
      'Điểm mà các đường thẳng song song hội tụ về khi vẽ phối cảnh',
      'Điểm trung tâm của vật thể',
      'Điểm sáng nhất trên vật thể',
      'Điểm bắt đầu vẽ đường viền',
    ],
    ans: 'A',
    exp: 'Điểm tụ (vanishing point) nằm trên đường chân trời, là nơi các đường song song (như đường ray) hội tụ trong phối cảnh.',
  });
  await createQ({
    topicId: topicVe, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Bố cục "tam giác" trong tranh thường tạo ra cảm giác gì?',
    opts: [
      'Vững chắc, ổn định, cân bằng',
      'Chuyển động, năng động',
      'Buồn bã, u ám',
      'Hỗn độn, rối loạn',
    ],
    ans: 'A',
    exp: 'Bố cục tam giác với đỉnh hướng lên tạo cảm giác vững chắc, ổn định và cân bằng, thường dùng trong chân dung và tĩnh vật.',
  });

  // ── TOPIC 2: Màu sắc và trang trí ─────────────────────────────────────────
  const topicMauSac = 'cmt5s5b31001r97l0nputrxue';

  // EASY (6)
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Ba màu cơ bản (màu gốc) là những màu nào?',
    opts: ['Đỏ, vàng, xanh lam', 'Đỏ, xanh lá, trắng', 'Vàng, cam, tím', 'Đỏ, xanh lam, đen'],
    ans: 'A',
    exp: 'Ba màu cơ bản (primary colors) trong hội họa là đỏ, vàng và xanh lam. Không thể pha trộn màu khác để tạo ra chúng.',
  });
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Pha màu đỏ với màu vàng sẽ được màu gì?',
    opts: ['Màu cam', 'Màu tím', 'Màu xanh lá', 'Màu nâu'],
    ans: 'A',
    exp: 'Đỏ + Vàng = Cam. Đây là màu thứ cấp (secondary color) tạo thành từ hai màu cơ bản.',
  });
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Màu nào sau đây thuộc nhóm màu nóng?',
    opts: ['Màu đỏ', 'Màu xanh lam', 'Màu xanh lá', 'Màu tím'],
    ans: 'A',
    exp: 'Màu nóng bao gồm đỏ, cam, vàng – những màu gợi cảm giác ấm áp, năng động, như lửa và mặt trời.',
  });
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Pha màu xanh lam với màu vàng sẽ được màu gì?',
    opts: ['Màu xanh lá', 'Màu tím', 'Màu cam', 'Màu nâu'],
    ans: 'A',
    exp: 'Xanh lam + Vàng = Xanh lá cây. Đây là một trong ba màu thứ cấp.',
  });
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Họa tiết trang trí (pattern) thường có đặc điểm gì?',
    opts: ['Lặp đi lặp lại theo quy luật', 'Chỉ vẽ một lần', 'Không có quy luật', 'Luôn là hình tròn'],
    ans: 'A',
    exp: 'Họa tiết trang trí là các hình mẫu được lặp lại có quy luật (thay đổi xoay vần, đối xứng, tuần hoàn).',
  });
  await createQ({
    topicId: topicMauSac, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Màu trắng khi pha vào một màu khác sẽ tạo ra điều gì?',
    opts: ['Màu nhạt hơn (sáng hơn)', 'Màu đậm hơn (tối hơn)', 'Màu bổ túc', 'Màu trung tính'],
    ans: 'A',
    exp: 'Pha màu trắng vào một màu sẽ tạo ra tông màu nhạt hơn (tint) – màu sáng và nhẹ hơn màu gốc.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Hai màu "bổ túc" (complementary colors) là hai màu như thế nào?',
    opts: [
      'Hai màu đối diện nhau trên vòng màu, tạo tương phản mạnh',
      'Hai màu cạnh nhau trên vòng màu',
      'Hai màu cùng thuộc nhóm màu nóng',
      'Hai màu cùng thuộc nhóm màu lạnh',
    ],
    ans: 'A',
    exp: 'Màu bổ túc là hai màu đối diện nhau trên vòng màu (ví dụ: đỏ - xanh lá, vàng - tím), khi đặt cạnh nhau tạo tương phản rất mạnh.',
  });
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Vòng màu (color wheel) có bao nhiêu màu cơ bản và thứ cấp?',
    opts: ['6 màu (3 cơ bản + 3 thứ cấp)', '3 màu', '9 màu', '12 màu'],
    ans: 'A',
    exp: 'Vòng màu cơ bản gồm 6 màu: 3 màu cơ bản (đỏ, vàng, xanh lam) và 3 màu thứ cấp (cam, xanh lá, tím).',
  });
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Trong trang trí, nguyên tắc "đối xứng" có nghĩa là gì?',
    opts: [
      'Hai nửa của hình có hình dạng giống nhau qua trục đối xứng',
      'Màu sắc được phân bổ đều',
      'Hình vẽ lặp lại theo chiều ngang',
      'Các hình có kích thước bằng nhau',
    ],
    ans: 'A',
    exp: 'Đối xứng nghĩa là hai nửa của hình giống hệt nhau qua một trục, tạo cảm giác cân bằng, hài hòa.',
  });
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Màu "trung tính" trong hội họa thường là màu nào?',
    opts: ['Đen, trắng, xám, nâu', 'Đỏ, vàng, xanh', 'Cam, xanh lá, tím', 'Hồng, be, kem'],
    ans: 'A',
    exp: 'Màu trung tính (neutral colors) gồm đen, trắng, xám và nâu – không thuộc nhóm nóng hay lạnh, dùng để cân bằng màu sắc.',
  });
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Khi trang trí đường diềm, các họa tiết được sắp xếp như thế nào?',
    opts: [
      'Theo hàng ngang, lặp lại liên tiếp',
      'Ngẫu nhiên không theo quy luật',
      'Chỉ ở góc',
      'Theo hàng dọc từ trên xuống',
    ],
    ans: 'A',
    exp: 'Đường diềm (border) được trang trí bằng các họa tiết lặp lại theo hàng ngang, tạo thành dải liên tiếp.',
  });
  await createQ({
    topicId: topicMauSac, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Pha màu đen vào một màu sẽ tạo ra điều gì?',
    opts: ['Màu đậm hơn (tối hơn)', 'Màu nhạt hơn', 'Màu bổ túc', 'Màu trung tính'],
    ans: 'A',
    exp: 'Pha màu đen vào một màu tạo ra tông màu đậm hơn (shade) – màu tối và sâu hơn màu gốc.',
  });

  // HARD (3)
  await createQ({
    topicId: topicMauSac, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Trong lý thuyết màu sắc, "hòa sắc lạnh" (cool color harmony) tạo ra cảm xúc gì và thường dùng trong tranh loại nào?',
    opts: [
      'Yên tĩnh, mát mẻ, bình lặng – thường dùng trong tranh phong cảnh biển, trời',
      'Sôi động, nhiệt huyết – dùng trong tranh lễ hội',
      'U ám, đáng sợ – chỉ dùng trong tranh kinh dị',
      'Ấm áp, vui tươi – dùng trong tranh thiếu nhi',
    ],
    ans: 'A',
    exp: 'Hòa sắc lạnh (xanh lam, xanh lá, tím) gợi cảm giác mát mẻ, yên tĩnh, thường dùng trong tranh phong cảnh biển, rừng, bầu trời.',
  });
  await createQ({
    topicId: topicMauSac, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Nguyên tắc "tương phản màu sắc" trong trang trí có tác dụng gì?',
    opts: [
      'Làm nổi bật các yếu tố quan trọng và tạo sức hút thị giác',
      'Làm mềm mại và dịu đi tổng thể',
      'Tạo cảm giác đơn điệu, nhàm chán',
      'Giảm bớt sự chú ý vào trung tâm tranh',
    ],
    ans: 'A',
    exp: 'Tương phản màu sắc (đặt màu đối lập cạnh nhau) làm nổi bật và tăng sức hút thị giác cho các yếu tố muốn nhấn mạnh.',
  });
  await createQ({
    topicId: topicMauSac, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Trong hệ màu ánh sáng (RGB) dùng trong màn hình, ba màu cơ bản là gì và khác với hệ màu sắc tố như thế nào?',
    opts: [
      'RGB: đỏ, xanh lá, xanh lam – pha cộng sáng; màu sắc tố: đỏ, vàng, xanh lam – pha trừ',
      'Giống nhau hoàn toàn',
      'RGB: đỏ, vàng, trắng; sắc tố: đen, trắng, xám',
      'RGB không có ba màu cơ bản',
    ],
    ans: 'A',
    exp: 'Hệ RGB (ánh sáng) dùng pha cộng: đỏ+xanh lá+xanh lam = trắng. Hệ RYB/CMY (sắc tố) dùng pha trừ: pha nhiều màu → tối hơn.',
  });

  // ── TOPIC 3: Cảm thụ và thưởng thức nghệ thuật ───────────────────────────
  const topicCamThu = 'cmt5s5b36001t97l0fm13rpc1';

  // EASY (6)
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Họa sĩ Tô Ngọc Vân nổi tiếng với tác phẩm nào?',
    opts: ['Thiếu nữ bên hoa huệ', 'Bình văn', 'Chùa Thầy', 'Phố cổ Hà Nội'],
    ans: 'A',
    exp: '"Thiếu nữ bên hoa huệ" (1943) là tác phẩm nổi tiếng nhất của họa sĩ Tô Ngọc Vân, vẽ bằng sơn dầu.',
  });
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Tranh Đông Hồ là loại tranh dân gian của vùng nào?',
    opts: ['Bắc Ninh', 'Hà Nội', 'Huế', 'Hội An'],
    ans: 'A',
    exp: 'Tranh Đông Hồ (tranh làng Hồ) xuất xứ từ làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh.',
  });
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Điêu khắc là loại hình nghệ thuật nào?',
    opts: ['Tạo hình ba chiều (3D)', 'Vẽ trên giấy phẳng', 'Chụp ảnh', 'Biểu diễn âm nhạc'],
    ans: 'A',
    exp: 'Điêu khắc là nghệ thuật tạo hình ba chiều, tác phẩm có thể nhìn từ nhiều góc độ khác nhau.',
  });
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Tranh lụa Việt Nam được vẽ trên chất liệu gì?',
    opts: ['Vải lụa', 'Giấy thường', 'Gỗ', 'Đất sét'],
    ans: 'A',
    exp: 'Tranh lụa Việt Nam được vẽ trực tiếp trên vải lụa, tạo nên nét đặc trưng mềm mại, trong sáng.',
  });
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Yếu tố nào sau đây là một trong các "yếu tố cơ bản của nghệ thuật"?',
    opts: ['Đường nét', 'Âm thanh', 'Mùi hương', 'Vị giác'],
    ans: 'A',
    exp: 'Các yếu tố cơ bản của nghệ thuật thị giác gồm: đường nét, hình dạng, màu sắc, giá trị (sáng-tối), không gian và chất cảm.',
  });
  await createQ({
    topicId: topicCamThu, d: 'EASY', subjectId: 'sub-mythuat',
    q: 'Kiến trúc là một loại hình nghệ thuật. Ví dụ nào sau đây là công trình kiến trúc nổi tiếng của Việt Nam?',
    opts: ['Chùa Một Cột', 'Tháp Eiffel', 'Kim tự tháp Ai Cập', 'Vạn Lý Trường Thành'],
    ans: 'A',
    exp: 'Chùa Một Cột (Hà Nội) là công trình kiến trúc Phật giáo độc đáo, biểu tượng văn hóa của Việt Nam.',
  });

  // MEDIUM (6)
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Họa sĩ Nguyễn Phan Chánh nổi tiếng với thể loại tranh nào?',
    opts: ['Tranh lụa', 'Tranh sơn dầu', 'Tranh khắc gỗ', 'Tranh sơn mài'],
    ans: 'A',
    exp: 'Nguyễn Phan Chánh là danh họa Việt Nam nổi tiếng với tranh lụa, tác phẩm "Chơi ô ăn quan" là tiêu biểu.',
  });
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Họa sĩ Bùi Xuân Phái gắn liền với chủ đề tranh nào đặc biệt?',
    opts: ['Phố cổ Hà Nội', 'Phong cảnh miền núi', 'Chân dung lãnh tụ', 'Hoa và thiên nhiên'],
    ans: 'A',
    exp: 'Bùi Xuân Phái nổi tiếng với loạt tranh "phố Phái" – vẽ phố cổ Hà Nội với nét độc đáo, mộc mạc, tình cảm.',
  });
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Tranh Đông Hồ thường có đặc điểm màu sắc như thế nào?',
    opts: [
      'Màu tươi sáng từ chất liệu tự nhiên (điệp, màu cây cỏ)',
      'Màu tối, u ám',
      'Chỉ dùng màu đen trắng',
      'Màu sắc hóa học hiện đại',
    ],
    ans: 'A',
    exp: 'Tranh Đông Hồ dùng màu từ tự nhiên: bột điệp (trắng óng), màu từ lá, hoa, đất – tạo màu sắc tươi sáng đặc trưng.',
  });
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Khi thưởng thức một tác phẩm nghệ thuật, chúng ta nên làm gì?',
    opts: [
      'Quan sát kỹ, cảm nhận cảm xúc và tìm hiểu ý nghĩa tác phẩm',
      'Chỉ xem qua loa rồi bỏ đi',
      'Chỉ nhận xét về màu sắc',
      'So sánh với tác phẩm khác mà không cảm nhận',
    ],
    ans: 'A',
    exp: 'Thưởng thức nghệ thuật đúng cách cần quan sát kỹ, cảm nhận cảm xúc và suy ngẫm về ý nghĩa mà tác giả muốn truyền đạt.',
  });
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: '"Hội họa" là loại hình nghệ thuật sử dụng phương tiện chính là gì?',
    opts: ['Màu sắc và đường nét trên bề mặt phẳng', 'Âm thanh và nhịp điệu', 'Khối và không gian 3D', 'Ngôn ngữ và chữ viết'],
    ans: 'A',
    exp: 'Hội họa (painting) là nghệ thuật thị giác sử dụng màu sắc và đường nét để tạo hình trên bề mặt phẳng (giấy, vải, tường...).',
  });
  await createQ({
    topicId: topicCamThu, d: 'MEDIUM', subjectId: 'sub-mythuat',
    q: 'Chất cảm (texture) trong nghệ thuật là gì?',
    opts: [
      'Cảm giác về bề mặt của vật thể (mịn, thô, sần...)',
      'Màu sắc của vật thể',
      'Kích thước của tác phẩm',
      'Hình dạng tổng thể',
    ],
    ans: 'A',
    exp: 'Chất cảm (texture) là đặc điểm bề mặt của vật thể hoặc tác phẩm – có thể là thực (sờ được) hoặc ảo (nhìn thấy cảm giác).',
  });

  // HARD (3)
  await createQ({
    topicId: topicCamThu, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Điểm khác biệt giữa tranh sơn mài và tranh sơn dầu truyền thống là gì?',
    opts: [
      'Tranh sơn mài dùng sơn ta, vỏ trứng, vàng bạc trên nền gỗ và mài bóng; sơn dầu dùng màu dầu trên vải canvas',
      'Tranh sơn mài chỉ có màu đen, sơn dầu có nhiều màu',
      'Tranh sơn mài vẽ nhanh hơn sơn dầu',
      'Cả hai đều dùng chất liệu giống nhau',
    ],
    ans: 'A',
    exp: 'Sơn mài (lacquer) là kỹ thuật đặc trưng Việt Nam: vẽ nhiều lớp sơn ta, vỏ trứng, vàng/bạc lên nền gỗ, sau đó mài bóng để lộ hình.',
  });
  await createQ({
    topicId: topicCamThu, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Trong thẩm mỹ học, "tỉ lệ vàng" (Golden Ratio) được ứng dụng như thế nào trong nghệ thuật?',
    opts: [
      'Tạo bố cục hài hòa, cân đối được coi là đẹp tự nhiên theo tỉ lệ 1:1.618',
      'Xác định màu sắc chính trong tranh',
      'Quy định kích thước tối thiểu của tác phẩm',
      'Chỉ dùng trong kiến trúc, không dùng trong hội họa',
    ],
    ans: 'A',
    exp: 'Tỉ lệ vàng (φ ≈ 1.618) xuất hiện tự nhiên và được các nghệ sĩ từ thời Renaissance dùng để tạo bố cục hài hòa, đẹp mắt.',
  });
  await createQ({
    topicId: topicCamThu, d: 'HARD', subjectId: 'sub-mythuat',
    q: 'Phân tích tác phẩm nghệ thuật theo phương pháp "ABCD" (mô tả - phân tích - diễn giải - đánh giá) giúp ích gì?',
    opts: [
      'Giúp hiểu tác phẩm toàn diện: từ yếu tố hình thức đến ý nghĩa sâu xa',
      'Chỉ giúp ghi nhớ tên tác phẩm',
      'Chỉ dùng để so sánh giá tiền tác phẩm',
      'Không có tác dụng thực tế',
    ],
    ans: 'A',
    exp: 'Phương pháp phân tích nghệ thuật 4 bước (mô tả → phân tích → diễn giải → đánh giá) giúp hiểu toàn diện từ hình thức đến nội dung ý nghĩa.',
  });

  console.log('Hoàn thành tạo 45 câu hỏi Mĩ thuật lớp 5!');
}

main().catch(console.error).finally(() => p.$disconnect());
