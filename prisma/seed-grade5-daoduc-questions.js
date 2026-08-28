const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const KEYS = ['A', 'B', 'C', 'D'];

async function createQ(data) {
  const ci = KEYS.indexOf(data.ans);
  await p.question.create({
    data: {
      content: data.q,
      subjectId: 'sub-daoduc',
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
  console.log('Tạo câu hỏi Đạo đức lớp 5...');

  const topics = [
    { id: 'cmt5s5ayx000b97l0o6cb6pd6', name: 'Em yêu quê hương, đất nước' },
    { id: 'cmt5s5az3000d97l0qlv7zt8i', name: 'Biết ơn và kính trọng' },
    { id: 'cmt5s5az8000f97l05n4o89a2', name: 'Trách nhiệm và hợp tác' },
    { id: 'cmt5s5aze000h97l04i63rzz6', name: 'Bảo vệ môi trường' },
    { id: 'cmt5s5azk000j97l0ud05xkpc', name: 'An toàn và sức khỏe' },
  ];

  // ===== TOPIC 1: Em yêu quê hương, đất nước (20 câu) =====
  const t1 = topics[0].id;

  // EASY (8 câu)
  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Quốc kỳ Việt Nam có màu nền và hình ngôi sao như thế nào?',
    opts: ['Nền xanh, sao vàng', 'Nền đỏ, sao vàng', 'Nền vàng, sao đỏ', 'Nền trắng, sao đỏ'],
    ans: 'B',
    exp: 'Quốc kỳ Việt Nam có nền đỏ với ngôi sao vàng năm cánh ở giữa.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Quốc ca Việt Nam có tên là gì?',
    opts: ['Như có Bác Hồ trong ngày vui đại thắng', 'Tiến quân ca', 'Giải phóng miền Nam', 'Đất nước trọn niềm vui'],
    ans: 'B',
    exp: 'Quốc ca Việt Nam có tên là "Tiến quân ca", do nhạc sĩ Văn Cao sáng tác.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Tết Nguyên Đán là ngày lễ truyền thống quan trọng nhất của Việt Nam. Tết thường diễn ra vào tháng nào dương lịch?',
    opts: ['Tháng 11 hoặc 12', 'Tháng 1 hoặc 2', 'Tháng 3 hoặc 4', 'Tháng 5 hoặc 6'],
    ans: 'B',
    exp: 'Tết Nguyên Đán thường diễn ra vào tháng 1 hoặc tháng 2 dương lịch, tùy theo lịch âm mỗi năm.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Trung Thu là ngày Tết dành cho ai?',
    opts: ['Người cao tuổi', 'Phụ nữ', 'Thiếu nhi', 'Nông dân'],
    ans: 'C',
    exp: 'Tết Trung Thu (rằm tháng 8 âm lịch) là ngày Tết dành cho thiếu nhi, còn gọi là Tết trẻ em.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Giỗ Tổ Hùng Vương được tổ chức vào ngày nào âm lịch hằng năm?',
    opts: ['Mùng 5 tháng 5', 'Mùng 10 tháng 3', 'Rằm tháng 7', 'Mùng 1 tháng 1'],
    ans: 'B',
    exp: 'Giỗ Tổ Hùng Vương được tổ chức vào ngày mùng 10 tháng 3 âm lịch hằng năm.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Vịnh Hạ Long là danh lam thắng cảnh nổi tiếng của Việt Nam, thuộc tỉnh nào?',
    opts: ['Đà Nẵng', 'Quảng Ninh', 'Khánh Hòa', 'Hà Tĩnh'],
    ans: 'B',
    exp: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh, được UNESCO công nhận là Di sản thiên nhiên thế giới.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Hành động nào dưới đây thể hiện tình yêu quê hương, đất nước?',
    opts: ['Nói xấu phong tục tập quán của địa phương', 'Tự hào và giới thiệu về các danh lam thắng cảnh của quê hương', 'Không quan tâm đến các lễ hội truyền thống', 'Từ chối tham gia các hoạt động văn hóa địa phương'],
    ans: 'B',
    exp: 'Tự hào và giới thiệu về các danh lam thắng cảnh của quê hương là biểu hiện của tình yêu quê hương, đất nước.',
  });

  await createQ({
    topicId: t1, d: 'EASY',
    q: 'Thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là thành phố nào?',
    opts: ['Thành phố Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội', 'Huế'],
    ans: 'C',
    exp: 'Thủ đô của Việt Nam là thành phố Hà Nội.',
  });

  // MEDIUM (8 câu)
  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Trong tình huống bạn bè nước ngoài hỏi về một phong tục tập quán đặc trưng của Việt Nam, em nên làm gì?',
    opts: ['Nói rằng em không biết gì về phong tục Việt Nam', 'Tự hào giới thiệu và giải thích ý nghĩa của phong tục đó', 'Nói rằng phong tục Việt Nam không có gì đặc biệt', 'Chuyển sang chủ đề khác vì xấu hổ'],
    ans: 'B',
    exp: 'Khi bạn bè nước ngoài hỏi về phong tục Việt Nam, em nên tự hào giới thiệu và giải thích ý nghĩa, thể hiện tình yêu quê hương.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Lễ hội đền Hùng hằng năm được tổ chức ở đâu?',
    opts: ['Hà Nội', 'Phú Thọ', 'Thanh Hóa', 'Ninh Bình'],
    ans: 'B',
    exp: 'Lễ hội đền Hùng được tổ chức tại Phú Thọ, nơi thờ các Vua Hùng dựng nước.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Phố cổ Hội An được UNESCO công nhận là Di sản văn hóa thế giới thuộc tỉnh nào?',
    opts: ['Thừa Thiên Huế', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định'],
    ans: 'B',
    exp: 'Phố cổ Hội An thuộc tỉnh Quảng Nam, được UNESCO công nhận là Di sản văn hóa thế giới năm 1999.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Em thấy một nhóm du khách nước ngoài đang bôi bẩn lên di tích lịch sử ở địa phương. Em nên làm gì?',
    opts: ['Làm ngơ, không liên quan đến mình', 'Nhắc nhở lịch sự và báo cho người phụ trách di tích biết', 'Chụp ảnh đăng lên mạng rồi bỏ đi', 'Cùng làm theo họ'],
    ans: 'B',
    exp: 'Em nên nhắc nhở lịch sự và báo cho người phụ trách di tích biết để bảo vệ di sản văn hóa của đất nước.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Trang phục truyền thống của phụ nữ Việt Nam được biết đến trên thế giới là gì?',
    opts: ['Kimono', 'Áo dài', 'Sari', 'Hanbok'],
    ans: 'B',
    exp: 'Áo dài là trang phục truyền thống của phụ nữ Việt Nam, được biết đến và yêu thích trên khắp thế giới.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Ngày Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là ngày nào?',
    opts: ['Ngày 30 tháng 4', 'Ngày 2 tháng 9', 'Ngày 19 tháng 8', 'Ngày 1 tháng 5'],
    ans: 'B',
    exp: 'Ngày Quốc khánh Việt Nam là ngày 2 tháng 9 năm 1945, ngày Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Hành động nào KHÔNG phải là cách thể hiện tình yêu quê hương?',
    opts: ['Học tập chăm chỉ để xây dựng đất nước', 'Tham gia giữ gìn vệ sinh nơi công cộng', 'Xả rác bừa bãi ở các danh lam thắng cảnh', 'Tìm hiểu về lịch sử, văn hóa dân tộc'],
    ans: 'C',
    exp: 'Xả rác bừa bãi ở các danh lam thắng cảnh là hành động gây ô nhiễm, không thể hiện tình yêu quê hương.',
  });

  await createQ({
    topicId: t1, d: 'MEDIUM',
    q: 'Nhã nhạc cung đình Huế được UNESCO công nhận là di sản văn hóa phi vật thể của nhân loại vào năm nào?',
    opts: ['1999', '2001', '2003', '2005'],
    ans: 'C',
    exp: 'Nhã nhạc cung đình Huế được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại vào năm 2003.',
  });

  // HARD (4 câu)
  await createQ({
    topicId: t1, d: 'HARD',
    q: 'Trong tình huống em biết một bạn cùng lớp thường nói xấu, chê bai phong tục, tập quán của địa phương trước mặt người nước ngoài. Em nên ứng xử như thế nào cho phù hợp nhất?',
    opts: ['Đồng tình với bạn vì phong tục cũ không còn phù hợp', 'Mặc kệ vì đó là chuyện của bạn', 'Nhẹ nhàng giải thích cho bạn hiểu ý nghĩa và giá trị của phong tục truyền thống', 'Mắng bạn trước mặt mọi người'],
    ans: 'C',
    exp: 'Em nên nhẹ nhàng, tôn trọng giải thích cho bạn hiểu ý nghĩa văn hóa truyền thống, giúp bạn thay đổi nhận thức.',
  });

  await createQ({
    topicId: t1, d: 'HARD',
    q: 'Khi tham gia lễ hội truyền thống của địa phương, học sinh cần làm gì để thể hiện đúng tinh thần yêu quê hương?',
    opts: ['Chỉ đến xem cho vui, không cần tìm hiểu ý nghĩa', 'Tìm hiểu ý nghĩa lễ hội, tham gia nghiêm túc và giữ gìn trật tự', 'Mặc trang phục tùy ý không cần phù hợp với lễ hội', 'Chỉ chụp ảnh đăng mạng xã hội là đủ'],
    ans: 'B',
    exp: 'Tham gia lễ hội cần tìm hiểu ý nghĩa, tham gia nghiêm túc, giữ trật tự và tôn trọng phong tục để thể hiện đúng tinh thần yêu quê hương.',
  });

  await createQ({
    topicId: t1, d: 'HARD',
    q: 'Câu tục ngữ "Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn" nói về điều gì?',
    opts: ['Tình yêu thiên nhiên, cây cối', 'Tinh thần đoàn kết, yêu thương đồng bào dù khác vùng miền', 'Cách trồng rau củ quả', 'Sự phong phú của nông sản Việt Nam'],
    ans: 'B',
    exp: 'Câu tục ngữ này nói về tinh thần đoàn kết, yêu thương giữa những người Việt Nam dù khác vùng miền, dân tộc.',
  });

  await createQ({
    topicId: t1, d: 'HARD',
    q: 'Trường em được giao nhiệm vụ chuẩn bị tiết mục văn nghệ giới thiệu về quê hương cho buổi giao lưu với học sinh nước bạn. Để thực hiện tốt nhiệm vụ này, các bạn nên làm gì?',
    opts: ['Chọn bài hát, điệu múa nước ngoài để gây ấn tượng', 'Tìm hiểu và chuẩn bị các tiết mục văn nghệ dân tộc, giới thiệu nét đẹp văn hóa Việt Nam', 'Chỉ cần chuẩn bị qua loa cho xong', 'Từ chối vì không biết gì về văn hóa Việt Nam'],
    ans: 'B',
    exp: 'Các bạn nên tìm hiểu và chuẩn bị các tiết mục văn nghệ dân tộc để giới thiệu nét đẹp văn hóa Việt Nam với bạn bè quốc tế.',
  });

  // ===== TOPIC 2: Biết ơn và kính trọng (20 câu) =====
  const t2 = topics[1].id;

  // EASY (8 câu)
  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Ngày Nhà giáo Việt Nam được tổ chức vào ngày nào?',
    opts: ['Ngày 8 tháng 3', 'Ngày 20 tháng 11', 'Ngày 1 tháng 6', 'Ngày 27 tháng 7'],
    ans: 'B',
    exp: 'Ngày Nhà giáo Việt Nam là ngày 20 tháng 11 hằng năm, để tôn vinh những người thầy, người cô.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Ngày Thương binh liệt sĩ được tổ chức vào ngày nào?',
    opts: ['Ngày 22 tháng 12', 'Ngày 27 tháng 7', 'Ngày 19 tháng 5', 'Ngày 2 tháng 9'],
    ans: 'B',
    exp: 'Ngày Thương binh liệt sĩ là ngày 27 tháng 7, để tưởng nhớ và tri ân các anh hùng đã hy sinh vì Tổ quốc.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Khi gặp thầy giáo, cô giáo, em nên làm gì?',
    opts: ['Nhìn đi chỗ khác', 'Chào hỏi lễ phép', 'Im lặng bước qua', 'Chạy thật nhanh qua'],
    ans: 'B',
    exp: 'Khi gặp thầy giáo, cô giáo, em nên chào hỏi lễ phép, thể hiện sự kính trọng.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Hành động nào thể hiện lòng biết ơn đối với bố mẹ?',
    opts: ['Đòi hỏi nhiều thứ mà không cần thiết', 'Chăm học, ngoan ngoãn và giúp đỡ việc nhà', 'Không quan tâm đến sức khỏe của bố mẹ', 'Chỉ lo chơi game suốt ngày'],
    ans: 'B',
    exp: 'Chăm học, ngoan ngoãn và giúp đỡ việc nhà là những hành động thể hiện lòng biết ơn, hiếu thảo với bố mẹ.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Câu nào thể hiện lời chào hỏi lễ phép khi gặp người lớn tuổi?',
    opts: ['Ê, ông/bà đi đâu vậy?', 'Cháu chào ông/bà ạ!', 'Tránh đường cho tôi đi!', 'Không cần chào, họ không biết mình'],
    ans: 'B',
    exp: 'Cháu chào ông/bà ạ! là lời chào hỏi lễ phép, thể hiện sự kính trọng người lớn tuổi.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Tại sao chúng ta cần biết ơn các thầy, cô giáo?',
    opts: ['Vì thầy cô bắt buộc phải dạy học', 'Vì thầy cô tận tụy dạy dỗ, truyền đạt kiến thức và dạy chúng ta nên người', 'Vì thầy cô cho điểm cao', 'Vì thầy cô là hàng xóm của chúng ta'],
    ans: 'B',
    exp: 'Chúng ta biết ơn thầy cô vì họ tận tụy dạy dỗ, truyền đạt kiến thức, giúp chúng ta trưởng thành và nên người.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Khi nhận được quà hoặc sự giúp đỡ từ người khác, em nên nói gì?',
    opts: ['Không cần nói gì', 'Cảm ơn bạn/anh/chị/cô/chú!', 'Của tôi mà!', 'Ít quá!'],
    ans: 'B',
    exp: 'Khi nhận được quà hoặc sự giúp đỡ, em nên nói lời cảm ơn để thể hiện sự biết ơn và lịch sự.',
  });

  await createQ({
    topicId: t2, d: 'EASY',
    q: 'Khi đi trên xe buýt, thấy một cụ già không có chỗ ngồi, em nên làm gì?',
    opts: ['Giả vờ ngủ để không phải nhường chỗ', 'Đứng dậy nhường chỗ cho cụ', 'Nhìn ra cửa sổ, làm lơ', 'Để người khác nhường'],
    ans: 'B',
    exp: 'Em nên đứng dậy nhường chỗ cho cụ già, thể hiện sự kính trọng và lòng nhân ái.',
  });

  // MEDIUM (8 câu)
  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Trong tình huống em vô ý làm hỏng đồ dùng của thầy/cô, em nên làm gì?',
    opts: ['Im lặng, hy vọng thầy/cô không biết', 'Đổ lỗi cho bạn khác', 'Thành thật xin lỗi thầy/cô và đề nghị đền bù', 'Bỏ chạy khỏi lớp'],
    ans: 'C',
    exp: 'Em nên thành thật nhận lỗi và xin lỗi thầy/cô, đồng thời đề nghị đền bù nếu có thể, đó là hành động trung thực và kính trọng.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Ngày 27 tháng 7 hằng năm, học sinh có thể làm gì để thể hiện lòng biết ơn các thương binh, liệt sĩ?',
    opts: ['Chỉ nghỉ ngơi, không cần làm gì', 'Thăm hỏi gia đình liệt sĩ, thương binh; thắp hương tại nghĩa trang liệt sĩ', 'Tổ chức tiệc vui chơi', 'Xem phim giải trí cả ngày'],
    ans: 'B',
    exp: 'Thăm hỏi gia đình liệt sĩ, thương binh; thắp hương tại nghĩa trang là những hành động thể hiện lòng biết ơn sâu sắc.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Câu tục ngữ "Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra" muốn nói điều gì?',
    opts: ['Núi và nước rất quan trọng trong tự nhiên', 'Công lao của cha mẹ rất to lớn, sâu nặng, cần ghi nhớ và biết ơn', 'Cha mẹ thích leo núi và bơi lội', 'Thiên nhiên Việt Nam rất đẹp'],
    ans: 'B',
    exp: 'Câu tục ngữ ca ngợi công lao to lớn của cha mẹ, nhắc nhở con cái phải ghi nhớ ơn nghĩa và hiếu thảo.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Bố mẹ em đang ốm và cần nghỉ ngơi. Em nên làm gì?',
    opts: ['Vẫn tiếp tục chơi đùa ồn ào trong nhà', 'Nhẹ nhàng hỏi thăm sức khỏe, giúp đỡ việc nhà và giữ yên tĩnh cho bố mẹ nghỉ', 'Đi ra ngoài chơi cả ngày', 'Bắt bố mẹ dậy nấu cơm cho mình'],
    ans: 'B',
    exp: 'Khi bố mẹ ốm, em nên hỏi thăm, giúp việc nhà và giữ yên tĩnh để thể hiện sự quan tâm, hiếu thảo.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Hành động nào thể hiện sự kính trọng người lớn tuổi trong bữa ăn gia đình?',
    opts: ['Gắp thức ăn vào bát mình trước', 'Mời người lớn ăn trước khi bắt đầu bữa cơm', 'Ăn nhanh và bỏ dở', 'Ngồi ăn mà không mời ai'],
    ans: 'B',
    exp: 'Mời người lớn ăn trước là phong tục lịch sự, thể hiện sự kính trọng trong bữa ăn gia đình Việt Nam.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Em học được gì từ gương anh hùng liệt sĩ Võ Thị Sáu?',
    opts: ['Sự dũng cảm, kiên cường, yêu nước và sẵn sàng hy sinh vì Tổ quốc', 'Cách trốn thoát khỏi kẻ thù', 'Cách làm giàu nhanh chóng', 'Sự nhút nhát, sợ hãi'],
    ans: 'A',
    exp: 'Liệt sĩ Võ Thị Sáu là tấm gương về tinh thần dũng cảm, kiên cường, yêu nước, sẵn sàng hy sinh vì Tổ quốc.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Nhân ngày 20/11, em muốn bày tỏ lòng biết ơn với thầy giáo chủ nhiệm. Cách nào phù hợp nhất?',
    opts: ['Tặng thầy nhiều tiền để thầy vui', 'Viết thiệp chúc mừng và hứa sẽ học tập chăm chỉ hơn', 'Không cần làm gì vì thầy đã được trả lương', 'Nịnh hót thầy để được điểm cao'],
    ans: 'B',
    exp: 'Viết thiệp chúc mừng và hứa học tập chăm chỉ là cách bày tỏ lòng biết ơn chân thành và có ý nghĩa nhất.',
  });

  await createQ({
    topicId: t2, d: 'MEDIUM',
    q: 'Lòng biết ơn giúp ích gì cho bản thân em và mối quan hệ với người khác?',
    opts: ['Không giúp ích gì', 'Giúp em trở nên ích kỷ hơn', 'Giúp em xây dựng các mối quan hệ tốt đẹp, được mọi người yêu quý và sống hạnh phúc hơn', 'Giúp em được nhiều tiền hơn'],
    ans: 'C',
    exp: 'Lòng biết ơn giúp xây dựng mối quan hệ tốt đẹp, tạo sự gắn kết và mang lại hạnh phúc trong cuộc sống.',
  });

  // HARD (4 câu)
  await createQ({
    topicId: t2, d: 'HARD',
    q: 'Bạn Nam cho rằng chỉ cần học giỏi là đủ, không cần phải nói cảm ơn hay xin lỗi thầy cô và bố mẹ vì "những điều đó không quan trọng". Em có đồng ý không? Vì sao?',
    opts: ['Đồng ý, vì thành tích học tập mới là quan trọng nhất', 'Không đồng ý, vì lòng biết ơn và phép lịch sự là đức tính quan trọng giúp con người sống tử tế và nhân ái', 'Đồng ý một phần, tùy trường hợp', 'Đồng ý, vì người lớn không cần được cảm ơn'],
    ans: 'B',
    exp: 'Lòng biết ơn và phép lịch sự là đức tính quan trọng không kém thành tích học tập, giúp con người sống tử tế và được mọi người yêu quý.',
  });

  await createQ({
    topicId: t2, d: 'HARD',
    q: 'Em đang đi trên đường thì gặp một cựu chiến binh đang gặp khó khăn cần giúp đỡ. Em nên làm gì để thể hiện lòng biết ơn và kính trọng?',
    opts: ['Đi qua vì không quen biết', 'Chụp ảnh đăng mạng xã hội rồi mới giúp', 'Chủ động hỏi thăm và giúp đỡ theo khả năng, thể hiện sự tri ân đối với người đã cống hiến cho đất nước', 'Gọi điện cho người thân của họ rồi bỏ đi'],
    ans: 'C',
    exp: 'Chủ động hỏi thăm và giúp đỡ cựu chiến binh là hành động thể hiện lòng biết ơn và kính trọng những người đã cống hiến cho Tổ quốc.',
  });

  await createQ({
    topicId: t2, d: 'HARD',
    q: 'Gia đình em có truyền thống thăm hỏi gia đình liệt sĩ nhân các ngày lễ. Một người hàng xóm nói rằng "làm vậy vừa tốn thời gian vừa vô ích". Em nghĩ thế nào?',
    opts: ['Đồng ý với hàng xóm, không cần làm nữa', 'Không đồng ý, vì thăm hỏi gia đình liệt sĩ là truyền thống đạo lý "uống nước nhớ nguồn" cần được duy trì', 'Phân vân, không biết nên làm gì', 'Chỉ làm khi có người nhìn thấy'],
    ans: 'B',
    exp: 'Truyền thống thăm hỏi gia đình liệt sĩ thể hiện đạo lý "uống nước nhớ nguồn", là nét đẹp văn hóa cần được gìn giữ và phát huy.',
  });

  await createQ({
    topicId: t2, d: 'HARD',
    q: 'Thầy giáo vừa giảng một bài rất hay nhưng em chưa hiểu hết. Em nên làm gì?',
    opts: ['Im lặng, giả vờ hiểu để thầy vui', 'Xin phép thầy hỏi lại những chỗ chưa hiểu một cách lễ phép', 'Về nhà nhờ bạn giải thích mà không cần hỏi thầy', 'Tự học một mình, không hỏi ai'],
    ans: 'B',
    exp: 'Xin phép thầy hỏi lại lễ phép vừa thể hiện sự tôn trọng thầy, vừa giúp em hiểu bài hơn - đây là thái độ học tập đúng đắn.',
  });

  // ===== TOPIC 3: Trách nhiệm và hợp tác (20 câu) =====
  const t3 = topics[2].id;

  // EASY (8 câu)
  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Khi được giao nhiệm vụ trực nhật lớp, em nên làm gì?',
    opts: ['Nhờ bạn khác làm thay', 'Hoàn thành nhiệm vụ được giao một cách chu đáo', 'Bỏ qua, giả vờ quên', 'Chỉ làm khi có thầy cô giám sát'],
    ans: 'B',
    exp: 'Hoàn thành nhiệm vụ được giao chu đáo là thể hiện tinh thần trách nhiệm của học sinh.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Khi em làm sai điều gì đó, em nên làm gì?',
    opts: ['Đổ lỗi cho người khác', 'Dám nhận lỗi và cố gắng sửa chữa', 'Im lặng, không ai biết là được', 'Bỏ trốn để tránh bị phạt'],
    ans: 'B',
    exp: 'Dám nhận lỗi và cố gắng sửa chữa là hành động trung thực, có trách nhiệm với bản thân.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Làm việc nhóm có lợi ích gì?',
    opts: ['Chỉ có một người làm, còn lại ngồi chơi', 'Giúp hoàn thành công việc nhanh hơn, hiệu quả hơn nhờ sức mạnh tập thể', 'Làm mọi người cãi nhau nhiều hơn', 'Không có lợi ích gì'],
    ans: 'B',
    exp: 'Làm việc nhóm giúp tận dụng sức mạnh tập thể, hoàn thành công việc nhanh và hiệu quả hơn.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Trong nhóm học tập, nếu em được phân công làm thư ký ghi chép, em nên?',
    opts: ['Từ chối vì không thích làm thư ký', 'Chấp nhận và làm tốt nhiệm vụ được giao', 'Để bạn khác làm thay', 'Ghi chép qua loa cho xong'],
    ans: 'B',
    exp: 'Chấp nhận và làm tốt nhiệm vụ được phân công là tinh thần trách nhiệm và hợp tác trong nhóm.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Khi làm việc nhóm, thành viên nào cũng cần làm gì?',
    opts: ['Chờ người khác làm hết', 'Tích cực đóng góp ý kiến và hoàn thành phần việc của mình', 'Chỉ ngồi nghe mà không làm gì', 'Làm theo ý mình, không cần phối hợp'],
    ans: 'B',
    exp: 'Mỗi thành viên cần tích cực đóng góp và hoàn thành phần việc của mình để nhóm đạt kết quả tốt.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Em quên không mang sách giáo khoa đến lớp. Em nên làm gì?',
    opts: ['Đổ lỗi cho bố mẹ là đã không nhắc', 'Nhận lỗi với thầy/cô và xin mượn sách để học', 'Im lặng ngồi chơi trong giờ học', 'Nói dối là sách bị mất'],
    ans: 'B',
    exp: 'Nhận lỗi và tìm cách khắc phục (xin mượn sách) thể hiện tinh thần trách nhiệm với việc học của mình.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Ở nhà, em có thể chia sẻ trách nhiệm với gia đình bằng cách nào?',
    opts: ['Chỉ lo việc học, không làm gì khác', 'Giúp đỡ việc nhà phù hợp với lứa tuổi như quét nhà, rửa bát', 'Yêu cầu bố mẹ làm tất cả mọi việc', 'Chơi điện tử cả ngày'],
    ans: 'B',
    exp: 'Giúp đỡ việc nhà phù hợp với lứa tuổi là cách chia sẻ trách nhiệm với gia đình.',
  });

  await createQ({
    topicId: t3, d: 'EASY',
    q: 'Nếu bạn trong nhóm không hoàn thành phần việc của mình, cả nhóm nên làm gì?',
    opts: ['Để bạn đó tự chịu trách nhiệm, không can thiệp', 'Cùng nhau hỗ trợ bạn hoàn thành và tìm hiểu lý do để giúp bạn lần sau', 'Mách thầy cô để bạn bị phạt', 'Loại bạn ra khỏi nhóm'],
    ans: 'B',
    exp: 'Tinh thần hợp tác là cùng nhau giúp đỡ để hoàn thành nhiệm vụ chung, đồng thời giúp bạn cải thiện.',
  });

  // MEDIUM (8 câu)
  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Trong tình huống nhóm em đang làm bài tập nhưng một bạn liên tục nói chuyện riêng, không tập trung. Em nên làm gì?',
    opts: ['Cũng ngừng làm và nói chuyện theo', 'Nhẹ nhàng nhắc bạn tập trung vào nhiệm vụ chung', 'Tức giận và xung đột với bạn', 'Làm thay phần của bạn mà không nói gì'],
    ans: 'B',
    exp: 'Nhẹ nhàng nhắc bạn tập trung là cách ứng xử có trách nhiệm và giữ gìn tinh thần làm việc nhóm.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Em được giao chăm sóc cây xanh trong lớp nhưng vì bận việc mà quên mất, cây bị héo. Em nên làm gì?',
    opts: ['Đổ lỗi cho thời tiết', 'Thành thật nhận lỗi với thầy/cô, tưới nước cho cây và rút kinh nghiệm để không quên nữa', 'Nhổ cây đi để không ai biết', 'Im lặng, hy vọng không ai chú ý'],
    ans: 'B',
    exp: 'Nhận lỗi, khắc phục hậu quả và rút kinh nghiệm là hành động có trách nhiệm đúng đắn.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Quy tắc quan trọng nào cần tuân thủ khi làm việc nhóm?',
    opts: ['Mỗi người làm theo ý mình, không cần thống nhất', 'Tôn trọng ý kiến của nhau, lắng nghe và cùng thảo luận để đạt quyết định chung', 'Người nào to tiếng hơn thì thắng', 'Chỉ làm theo ý của người học giỏi nhất'],
    ans: 'B',
    exp: 'Tôn trọng, lắng nghe và thảo luận để đạt quyết định chung là nguyên tắc cơ bản của hợp tác hiệu quả.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Trường em tổ chức vệ sinh sân trường, em được phân công nhặt rác ở góc sân. Em nên làm gì?',
    opts: ['Làm qua loa rồi đi chơi', 'Nhặt rác cẩn thận ở khu vực được giao và giúp bạn khu vực khác nếu còn thời gian', 'Từ chối vì không thích nhặt rác', 'Nhặt rác của khu vực khác mà bỏ qua khu vực mình được giao'],
    ans: 'B',
    exp: 'Hoàn thành tốt phần việc được giao và sẵn sàng hỗ trợ người khác là tinh thần trách nhiệm và hợp tác.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Trong tình huống nhóm em có ý kiến trái chiều về cách làm bài, em nên?',
    opts: ['Kiên quyết bảo vệ ý kiến của mình dù sai', 'Lắng nghe tất cả ý kiến, cùng phân tích và chọn phương án tốt nhất cho nhóm', 'Để nhóm tự quyết định, em không tham gia', 'Giận dỗi và không làm việc nữa'],
    ans: 'B',
    exp: 'Lắng nghe và cùng phân tích để chọn phương án tốt nhất là kỹ năng hợp tác hiệu quả.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Vì sao người có trách nhiệm thường được mọi người tin tưởng?',
    opts: ['Vì họ không bao giờ mắc lỗi', 'Vì họ luôn hoàn thành việc được giao, dám nhận lỗi và sửa chữa khi sai', 'Vì họ làm hài lòng tất cả mọi người', 'Vì họ có nhiều tiền'],
    ans: 'B',
    exp: 'Người có trách nhiệm được tin tưởng vì họ đáng tin cậy: hoàn thành việc được giao và trung thực khi mắc lỗi.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Em và các bạn cùng chơi đá bóng lỡ làm vỡ cửa kính nhà hàng xóm. Nhóm em nên làm gì?',
    opts: ['Chạy trốn nhanh chóng', 'Cùng nhau đến xin lỗi gia chủ và bàn cách đền bù thiệt hại', 'Đổ lỗi cho một bạn trong nhóm', 'Im lặng, hy vọng họ không biết là ai'],
    ans: 'B',
    exp: 'Cùng nhau nhận trách nhiệm và tìm cách đền bù là hành động đúng đắn, thể hiện tinh thần trách nhiệm tập thể.',
  });

  await createQ({
    topicId: t3, d: 'MEDIUM',
    q: 'Điều gì xảy ra nếu trong một nhóm, mỗi người chỉ lo lợi ích của mình mà không quan tâm đến kết quả chung?',
    opts: ['Nhóm sẽ đạt kết quả tốt hơn', 'Nhóm sẽ không hoàn thành được mục tiêu chung, mọi người đều thiệt thòi', 'Không ảnh hưởng gì', 'Người giỏi nhất sẽ cứu cả nhóm'],
    ans: 'B',
    exp: 'Khi thiếu tinh thần hợp tác, nhóm sẽ không hoàn thành mục tiêu, mọi người đều chịu hậu quả.',
  });

  // HARD (4 câu)
  await createQ({
    topicId: t3, d: 'HARD',
    q: 'Em là nhóm trưởng, một thành viên liên tục không nộp bài đúng hạn khiến cả nhóm bị trừ điểm. Sau khi đã nhắc nhở nhiều lần mà bạn vẫn không cải thiện, em nên làm gì?',
    opts: ['Làm thay phần của bạn để nhóm không bị trừ điểm nữa', 'Loại bạn ra khỏi nhóm ngay lập tức', 'Báo cáo tình huống với thầy/cô để được hướng dẫn giải quyết phù hợp', 'Tiếp tục chịu đựng mà không làm gì'],
    ans: 'C',
    exp: 'Khi đã cố gắng giải quyết trong nhóm mà không hiệu quả, việc nhờ thầy/cô hỗ trợ là giải pháp có trách nhiệm.',
  });

  await createQ({
    topicId: t3, d: 'HARD',
    q: 'Nhóm em hoàn thành dự án xuất sắc, được khen ngợi. Nhưng thực ra đa phần công việc do hai bạn thực hiện, còn các bạn khác ít đóng góp. Em nên làm gì?',
    opts: ['Nhận hết lời khen cho hai bạn chính', 'Chia sẻ công bằng vì cả nhóm cùng được điểm', 'Thành thật chia sẻ đóng góp thực tế của từng thành viên và rút kinh nghiệm phân công công việc lần sau', 'Không nói gì, tránh gây mâu thuẫn'],
    ans: 'C',
    exp: 'Trung thực về đóng góp thực tế và cải thiện phân công công việc là cách xây dựng tinh thần trách nhiệm bền vững.',
  });

  await createQ({
    topicId: t3, d: 'HARD',
    q: 'Em được giao nhiệm vụ nhưng nhận ra mình không đủ khả năng hoàn thành một mình. Em nên làm gì?',
    opts: ['Cố làm một mình dù biết sẽ không tốt', 'Từ chối nhiệm vụ', 'Chủ động báo cáo với người giao nhiệm vụ, xin được hỗ trợ thêm hoặc điều chỉnh nhiệm vụ', 'Làm xấu rồi nộp cho xong'],
    ans: 'C',
    exp: 'Chủ động xin hỗ trợ khi gặp khó khăn là hành động có trách nhiệm và thông minh, giúp đảm bảo chất lượng công việc.',
  });

  await createQ({
    topicId: t3, d: 'HARD',
    q: 'Trong cuộc sống, trách nhiệm cá nhân và hợp tác tập thể có mối quan hệ như thế nào?',
    opts: ['Trách nhiệm cá nhân quan trọng hơn, không cần hợp tác', 'Hợp tác quan trọng hơn, cá nhân không cần trách nhiệm', 'Cả hai bổ sung cho nhau: mỗi người làm tốt phần mình sẽ giúp tập thể thành công', 'Hai điều này hoàn toàn tách biệt'],
    ans: 'C',
    exp: 'Trách nhiệm cá nhân và hợp tác tập thể bổ sung cho nhau: cá nhân có trách nhiệm thì tập thể mới hợp tác hiệu quả.',
  });

  // ===== TOPIC 4: Bảo vệ môi trường (20 câu) =====
  const t4 = topics[3].id;

  // EASY (8 câu)
  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Khi uống xong chai nước, em nên làm gì với vỏ chai?',
    opts: ['Ném xuống sàn', 'Bỏ vào thùng rác đúng nơi quy định', 'Ném qua cửa sổ', 'Để nguyên trên bàn'],
    ans: 'B',
    exp: 'Bỏ rác đúng nơi quy định là hành động bảo vệ môi trường cơ bản mà mọi người cần thực hiện.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Phân loại rác tại nguồn có nghĩa là gì?',
    opts: ['Gom tất cả rác vào một túi', 'Phân chia rác thành các loại khác nhau (hữu cơ, tái chế, không tái chế) trước khi bỏ vào thùng rác', 'Đốt rác ngay tại nhà', 'Chôn rác xuống đất'],
    ans: 'B',
    exp: 'Phân loại rác tại nguồn giúp xử lý rác hiệu quả hơn, tăng tỷ lệ tái chế và giảm ô nhiễm môi trường.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Hành động nào giúp tiết kiệm nước?',
    opts: ['Để vòi nước chảy liên tục khi đánh răng', 'Tắt vòi nước khi không dùng đến', 'Dùng nước thoải mái vì nước là tài nguyên vô tận', 'Bơm đầy bể nước mỗi ngày'],
    ans: 'B',
    exp: 'Tắt vòi nước khi không dùng là cách đơn giản và hiệu quả để tiết kiệm nước sạch.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Trồng cây xanh có tác dụng gì đối với môi trường?',
    opts: ['Không có tác dụng gì', 'Làm sạch không khí, giảm nhiệt độ, chống xói mòn đất và tạo bóng mát', 'Làm tốn diện tích đất', 'Tạo ra nhiều sâu bọ'],
    ans: 'B',
    exp: 'Cây xanh hấp thụ CO2, sản xuất O2, điều hòa nhiệt độ, chống xói mòn và tạo bóng mát - rất có ích cho môi trường.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Hậu quả của việc xả rác bừa bãi xuống sông, hồ là gì?',
    opts: ['Nước sông trở nên trong sạch hơn', 'Ô nhiễm nguồn nước, gây hại cho sinh vật dưới nước và ảnh hưởng đến sức khỏe con người', 'Không có hậu quả gì', 'Làm đẹp cảnh quan'],
    ans: 'B',
    exp: 'Xả rác xuống sông hồ gây ô nhiễm nguồn nước, tổn hại hệ sinh thái thủy sinh và đe dọa sức khỏe con người.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Em có thể làm gì để tiết kiệm điện ở nhà?',
    opts: ['Bật tất cả đèn và quạt cả ngày', 'Tắt đèn, quạt, thiết bị điện khi không cần thiết', 'Không cần tiết kiệm vì điện là vô hạn', 'Dùng điện nhiều để máy phát điện hoạt động tốt hơn'],
    ans: 'B',
    exp: 'Tắt các thiết bị điện khi không dùng là cách tiết kiệm điện đơn giản, giảm chi phí và bảo vệ môi trường.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Loại rác nào có thể tái chế để bảo vệ môi trường?',
    opts: ['Thức ăn thừa', 'Chai nhựa, lon nhôm, giấy báo cũ', 'Rác y tế', 'Tã lót dùng một lần'],
    ans: 'B',
    exp: 'Chai nhựa, lon nhôm và giấy báo cũ là các loại rác có thể tái chế, giúp tiết kiệm tài nguyên và giảm ô nhiễm.',
  });

  await createQ({
    topicId: t4, d: 'EASY',
    q: 'Tại sao không nên đốt rác tùy tiện?',
    opts: ['Vì đốt rác làm mất thời gian', 'Vì khói từ việc đốt rác gây ô nhiễm không khí và ảnh hưởng đến sức khỏe', 'Vì rác không cháy được', 'Vì đốt rác tốn tiền'],
    ans: 'B',
    exp: 'Đốt rác tùy tiện tạo ra khói độc hại gây ô nhiễm không khí và nguy hiểm cho sức khỏe con người và môi trường.',
  });

  // MEDIUM (8 câu)
  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Em đang đi công viên thì thấy một người vứt rác ra đường. Em nên làm gì?',
    opts: ['Im lặng, không phải việc của mình', 'Nhẹ nhàng nhắc nhở người đó bỏ rác đúng nơi quy định', 'Cũng vứt rác theo họ', 'Chụp ảnh chế nhạo họ trên mạng'],
    ans: 'B',
    exp: 'Nhẹ nhàng nhắc nhở người vứt rác là hành động có trách nhiệm với môi trường chung.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Ô nhiễm không khí có thể gây ra những tác hại nào?',
    opts: ['Chỉ ảnh hưởng đến người già', 'Gây bệnh hô hấp, ảnh hưởng tim mạch, gây ô nhiễm nguồn nước và đất', 'Không ảnh hưởng đến con người', 'Chỉ ảnh hưởng đến động vật'],
    ans: 'B',
    exp: 'Ô nhiễm không khí gây nhiều bệnh nghiêm trọng cho con người và có tác động dây chuyền đến môi trường.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Trường em phát động phong trào "Mỗi học sinh trồng một cây xanh". Em nên làm gì?',
    opts: ['Không tham gia vì quá bận', 'Tích cực tham gia, chăm sóc cây sau khi trồng và vận động bạn bè cùng tham gia', 'Trồng cây nhưng không chăm sóc', 'Nhờ bố mẹ làm thay'],
    ans: 'B',
    exp: 'Tham gia tích cực, chăm sóc cây và vận động bạn bè là cách đóng góp có trách nhiệm cho môi trường.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Sử dụng túi ni-lông quá nhiều gây hại gì cho môi trường?',
    opts: ['Không gây hại gì', 'Túi ni-lông mất hàng trăm năm để phân hủy, gây ô nhiễm đất, nước và nguy hiểm cho động vật', 'Chỉ gây ô nhiễm thẩm mỹ', 'Gây ra mưa acid'],
    ans: 'B',
    exp: 'Túi ni-lông rất khó phân hủy trong tự nhiên, gây ô nhiễm nghiêm trọng cho đất, nước và nguy hiểm cho động vật.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Trong tình huống gia đình em sử dụng rất nhiều điện và nước, em nên làm gì để góp phần bảo vệ môi trường?',
    opts: ['Không quan tâm vì đã trả tiền', 'Nhắc nhở gia đình tiết kiệm và thực hành các thói quen tiết kiệm năng lượng', 'Sử dụng nhiều hơn để được giá rẻ hơn', 'Để người lớn tự lo'],
    ans: 'B',
    exp: 'Nhắc nhở gia đình và thực hành tiết kiệm là cách mỗi thành viên có thể đóng góp bảo vệ môi trường.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Biến đổi khí hậu ảnh hưởng đến Việt Nam như thế nào?',
    opts: ['Không ảnh hưởng gì đến Việt Nam', 'Gây ra bão lũ, hạn hán, nước biển dâng cao đe dọa các vùng ven biển', 'Làm thời tiết Việt Nam dễ chịu hơn', 'Chỉ ảnh hưởng đến các nước giàu'],
    ans: 'B',
    exp: 'Biến đổi khí hậu gây ra nhiều thiên tai nghiêm trọng ở Việt Nam, đặc biệt là lũ lụt và nước biển dâng ở vùng đồng bằng.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Vì sao cần phân loại rác thành rác hữu cơ và rác vô cơ?',
    opts: ['Vì quy định bắt buộc phải làm vậy', 'Vì mỗi loại rác cần cách xử lý khác nhau, phân loại giúp tái chế hiệu quả hơn và giảm lượng rác chôn lấp', 'Vì làm vậy cho đẹp', 'Không cần thiết, gom chung cũng được'],
    ans: 'B',
    exp: 'Phân loại rác giúp xử lý đúng cách: rác hữu cơ làm phân bón, rác tái chế được thu hồi tài nguyên, giảm thiểu ô nhiễm.',
  });

  await createQ({
    topicId: t4, d: 'MEDIUM',
    q: 'Em thấy một bạn bẻ cành cây trong công viên để chơi. Em nên làm gì?',
    opts: ['Cùng bẻ cành chơi cho vui', 'Nhắc bạn không nên bẻ cành vì gây hại cho cây và làm xấu môi trường', 'Im lặng vì không muốn gây chuyện', 'Báo cáo với chú bảo vệ ngay lập tức mà không nhắc bạn trước'],
    ans: 'B',
    exp: 'Nhắc nhở bạn nhẹ nhàng là cách ứng xử phù hợp nhất, vừa bảo vệ môi trường vừa giữ gìn tình bạn.',
  });

  // HARD (4 câu)
  await createQ({
    topicId: t4, d: 'HARD',
    q: 'Em phát hiện nhà máy gần trường xả khói đen và mùi hóa chất, ảnh hưởng đến sức khỏe học sinh. Em và các bạn có thể làm gì?',
    opts: ['Không làm gì vì đây là việc của người lớn', 'Báo cáo với thầy cô, ban giám hiệu để trường thông báo với cơ quan chức năng', 'Tự ý vào nhà máy phản đối', 'Viết bài đăng lên mạng xã hội để kêu gọi phản đối'],
    ans: 'B',
    exp: 'Báo cáo với thầy cô và ban giám hiệu là cách an toàn và đúng đắn để học sinh phản ánh vấn đề môi trường đến cơ quan có thẩm quyền.',
  });

  await createQ({
    topicId: t4, d: 'HARD',
    q: 'Một người hàng xóm đổ hóa chất xuống cống thoát nước. Em biết điều này nhưng họ nói sẽ "cho kẹo" nếu em không nói với ai. Em nên làm gì?',
    opts: ['Nhận kẹo và giữ im lặng', 'Không nhận kẹo và báo cáo với bố mẹ hoặc cơ quan chức năng vì đó là hành vi vi phạm pháp luật gây hại môi trường', 'Không quan tâm vì không phải nhà mình', 'Rủ thêm bạn bè đến xem'],
    ans: 'B',
    exp: 'Đổ hóa chất xuống cống là vi phạm pháp luật gây ô nhiễm nghiêm trọng. Em cần báo cáo với người lớn để ngăn chặn.',
  });

  await createQ({
    topicId: t4, d: 'HARD',
    q: 'Lớp em tổ chức cuộc thi "Đề xuất giải pháp bảo vệ môi trường trường học". Em sẽ đề xuất điều gì có tính khả thi cao nhất?',
    opts: ['Cấm tất cả học sinh mang đồ ăn đến trường', 'Lắp đặt thùng rác phân loại tại mỗi lớp và tổ chức buổi học về phân loại rác cho toàn trường', 'Trồng rừng trong khuôn viên trường', 'Không sử dụng điện trong giờ học'],
    ans: 'B',
    exp: 'Lắp thùng rác phân loại và tổ chức giáo dục về phân loại rác là giải pháp thực tế, khả thi và có tác động lâu dài.',
  });

  await createQ({
    topicId: t4, d: 'HARD',
    q: 'Em đọc được tin tức về một khu rừng nguyên sinh đang bị chặt phá trái phép. Với tư cách là học sinh lớp 5, em có thể đóng góp gì để bảo vệ rừng?',
    opts: ['Không làm được gì, đây là vấn đề quá lớn', 'Tuyên truyền với gia đình và bạn bè về tầm quan trọng của rừng, không mua sản phẩm từ gỗ lậu, tham gia các hoạt động trồng cây', 'Chỉ cần chia sẻ bài viết trên mạng là đủ', 'Lên rừng để bảo vệ trực tiếp'],
    ans: 'B',
    exp: 'Học sinh có thể đóng góp thiết thực bằng cách tuyên truyền, thay đổi thói quen tiêu dùng và tham gia hoạt động trồng cây.',
  });

  // ===== TOPIC 5: An toàn và sức khỏe (20 câu) =====
  const t5 = topics[4].id;

  // EASY (8 câu)
  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi đi bộ trên đường, em nên đi ở đâu?',
    opts: ['Đi giữa lòng đường', 'Đi trên vỉa hè, sát lề đường bên phải', 'Đi lung tung tùy ý', 'Đi dưới lòng đường sát xe cộ'],
    ans: 'B',
    exp: 'Khi đi bộ, em nên đi trên vỉa hè để đảm bảo an toàn, tránh xe cộ trên lòng đường.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi đèn tín hiệu giao thông có màu đỏ, người đi bộ phải làm gì?',
    opts: ['Chạy nhanh qua đường', 'Dừng lại và chờ đèn xanh', 'Tiếp tục đi nếu không có xe', 'Đi ngược chiều'],
    ans: 'B',
    exp: 'Khi đèn đỏ, tất cả mọi người phải dừng lại và chờ đến khi đèn chuyển sang màu xanh.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi ngồi trên xe đạp, em cần làm gì để đảm bảo an toàn?',
    opts: ['Đi thật nhanh để sớm đến nơi', 'Đội mũ bảo hiểm và đi đúng làn đường quy định', 'Chở thật nhiều người cùng một lúc', 'Sử dụng điện thoại khi đang đạp xe'],
    ans: 'B',
    exp: 'Đội mũ bảo hiểm và đi đúng làn đường là những quy tắc an toàn cơ bản khi đi xe đạp.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Để phòng tránh bệnh tật, em nên làm gì trước khi ăn và sau khi đi vệ sinh?',
    opts: ['Lau tay vào quần áo', 'Rửa tay bằng xà phòng và nước sạch', 'Chỉ cần rửa bằng nước lạnh', 'Không cần rửa tay'],
    ans: 'B',
    exp: 'Rửa tay bằng xà phòng và nước sạch là biện pháp vệ sinh cơ bản phòng ngừa bệnh tật hiệu quả.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi ăn đồ ăn ở ngoài đường, em cần chú ý điều gì?',
    opts: ['Chọn đồ ăn rẻ nhất', 'Chọn đồ ăn được chế biến hợp vệ sinh, có nguồn gốc rõ ràng và được bảo quản đúng cách', 'Ăn bất cứ thứ gì trông ngon', 'Không cần quan tâm, cứ ăn là được'],
    ans: 'B',
    exp: 'Chọn thực phẩm sạch, có nguồn gốc rõ ràng giúp phòng tránh ngộ độc thực phẩm.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi có người lạ hỏi đường hoặc mời em lên xe, em nên làm gì?',
    opts: ['Leo lên xe ngay vì người lớn đáng tin', 'Từ chối lịch sự, không đi theo người lạ và báo với người thân hoặc người xung quanh', 'Nhận tiền rồi mới quyết định', 'Im lặng và đứng yên'],
    ans: 'B',
    exp: 'Không đi theo người lạ là quy tắc an toàn quan trọng giúp bảo vệ bản thân khỏi nguy hiểm.',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Số điện thoại cấp cứu y tế tại Việt Nam là số nào?',
    opts: ['111', '113', '115', '114'],
    ans: 'C',
    exp: 'Số 115 là số điện thoại cấp cứu y tế tại Việt Nam. Em cần nhớ: 113 (Công an), 114 (Cứu hỏa), 115 (Cấp cứu).',
  });

  await createQ({
    topicId: t5, d: 'EASY',
    q: 'Khi bị bạo lực hoặc bị đe dọa ở trường, em nên làm gì?',
    opts: ['Im lặng vì sợ bị trả thù', 'Báo ngay với thầy cô, bố mẹ hoặc người lớn tin cậy', 'Tự xử lý bằng cách đánh lại', 'Bỏ học để tránh gặp lại'],
    ans: 'B',
    exp: 'Báo với thầy cô và bố mẹ là cách đúng đắn nhất để được bảo vệ khi bị bắt nạt hoặc đe dọa.',
  });

  // MEDIUM (8 câu)
  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Trong tình huống em đang đi bộ thì thấy đèn tín hiệu sắp chuyển đỏ, nhưng em nghĩ mình có thể chạy kịp qua đường. Em nên làm gì?',
    opts: ['Chạy nhanh qua đường', 'Dừng lại chờ đèn xanh tiếp theo để đảm bảo an toàn', 'Đi tắt qua dải phân cách', 'Xem xe có đến không rồi quyết định'],
    ans: 'B',
    exp: 'Luôn dừng lại khi đèn sắp chuyển đỏ là nguyên tắc an toàn, tránh những rủi ro không đáng có.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Khi ở nhà một mình và nghe thấy tiếng lạ bên ngoài, em nên làm gì?',
    opts: ['Mở cửa xem ai đến', 'Gọi điện ngay cho bố mẹ hoặc người thân, không mở cửa cho người lạ', 'La hét thật to', 'Trốn dưới gầm giường'],
    ans: 'B',
    exp: 'Liên hệ ngay với người thân và không mở cửa cho người lạ là nguyên tắc an toàn khi ở nhà một mình.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Em thấy ổ điện bị hỏng, dây điện lòi ra. Em nên làm gì?',
    opts: ['Sờ vào xem có điện không', 'Báo ngay với người lớn và không chạm vào ổ điện hoặc dây điện', 'Cố gắng tự sửa', 'Lấy dây điện ra xem'],
    ans: 'B',
    exp: 'Điện rất nguy hiểm. Khi thấy sự cố điện, em cần báo ngay với người lớn và tuyệt đối không chạm vào.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Khi đang dùng internet, em nhận được tin nhắn từ người lạ hỏi địa chỉ nhà và số điện thoại của bố mẹ. Em nên làm gì?',
    opts: ['Cung cấp thông tin ngay vì họ hỏi lịch sự', 'Không cung cấp thông tin cá nhân, đóng cuộc trò chuyện và báo với bố mẹ', 'Hỏi lại họ là ai rồi mới cung cấp', 'Chia sẻ thông tin nếu họ hứa tặng quà'],
    ans: 'B',
    exp: 'Không bao giờ cung cấp thông tin cá nhân cho người lạ trên mạng - đây là nguyên tắc an toàn internet quan trọng.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Tại sao trẻ em không nên tự ý dùng thuốc khi bị ốm?',
    opts: ['Vì thuốc rất đắt tiền', 'Vì thuốc có thể gây tác dụng phụ nguy hiểm nếu dùng sai liều lượng hoặc sai loại', 'Vì thuốc không có tác dụng', 'Vì thuốc có mùi khó chịu'],
    ans: 'B',
    exp: 'Dùng thuốc sai loại hoặc sai liều có thể rất nguy hiểm. Trẻ em cần được người lớn hướng dẫn hoặc đi khám bác sĩ.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Vào mùa hè, thời tiết nóng bức, để phòng tránh say nắng, em nên làm gì?',
    opts: ['Chạy nhanh ngoài trời nắng', 'Uống đủ nước, đội mũ nón khi ra nắng và tránh hoạt động mạnh lúc trời nóng nhất', 'Không uống nước để không phải đi vệ sinh', 'Mặc nhiều quần áo dày để không bị cháy nắng'],
    ans: 'B',
    exp: 'Uống đủ nước, che chắn và tránh hoạt động mạnh khi trời nắng nóng là cách phòng tránh say nắng hiệu quả.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Em thấy một người bị ngã xe máy và bị thương trên đường. Em nên làm gì?',
    opts: ['Tiếp tục đi vì đây không phải việc của mình', 'Dừng lại, gọi 115 hoặc nhờ người lớn gần đó giúp đỡ', 'Di chuyển nạn nhân ngay lập tức', 'Chụp ảnh đăng lên mạng'],
    ans: 'B',
    exp: 'Gọi 115 và nhờ người lớn giúp là cách đúng đắn khi gặp tai nạn. Không nên tự ý di chuyển nạn nhân vì có thể gây nguy hiểm hơn.',
  });

  await createQ({
    topicId: t5, d: 'MEDIUM',
    q: 'Để bảo vệ mắt khi dùng máy tính, em nên làm gì?',
    opts: ['Nhìn màn hình liên tục không nghỉ', 'Ngồi đúng tư thế, giữ khoảng cách phù hợp và nghỉ mắt 5-10 phút sau mỗi 30-45 phút dùng máy', 'Dùng máy tính trong phòng tối', 'Đặt màn hình sáng nhất có thể'],
    ans: 'B',
    exp: 'Nghỉ mắt định kỳ, ngồi đúng tư thế và giữ khoảng cách phù hợp là cách bảo vệ thị lực khi dùng máy tính.',
  });

  // HARD (4 câu)
  await createQ({
    topicId: t5, d: 'HARD',
    q: 'Trong tình huống phát hiện có khói và mùi khét trong nhà khi không có người lớn ở nhà, em nên làm gì?',
    opts: ['Tìm nguồn lửa để dập tắt', 'Lập tức ra khỏi nhà theo lối thoát hiểm gần nhất, gọi 114 và liên lạc với bố mẹ', 'Mở tất cả cửa sổ rồi tiếp tục ở trong nhà', 'Lấy nước dội vào ổ điện để dập lửa'],
    ans: 'B',
    exp: 'Khi có dấu hiệu cháy, ưu tiên số 1 là thoát ra ngoài an toàn, gọi 114 và báo cho bố mẹ. Không được cố ở lại dập lửa.',
  });

  await createQ({
    topicId: t5, d: 'HARD',
    q: 'Em đang chờ xe buýt, một người lạ mặt đến nói họ là bạn của bố mẹ em và được nhờ đón em về. Em chưa được bố mẹ thông báo trước. Em nên làm gì?',
    opts: ['Đi theo vì người đó trông hiền lành', 'Kiên quyết không đi, gọi điện ngay cho bố mẹ để xác nhận', 'Đi theo nhưng nhớ đường để quay về', 'Hỏi họ biết tên bố mẹ mình không rồi mới quyết định'],
    ans: 'B',
    exp: 'Gọi cho bố mẹ xác nhận trực tiếp là biện pháp an toàn duy nhất. Không bao giờ đi theo người lạ dù họ có lý do gì.',
  });

  await createQ({
    topicId: t5, d: 'HARD',
    q: 'Em biết một người bạn cùng lớp thường xuyên bị một nhóm bạn lớn hơn bắt nạt, lấy tiền ăn sáng sau giờ học. Người bạn đó nhờ em giữ bí mật. Em nên làm gì?',
    opts: ['Giữ bí mật theo lời bạn vì đã hứa', 'Báo cáo sự việc với thầy cô hoặc bố mẹ để bảo vệ bạn dù bạn không muốn', 'Cùng bạn tự đối phó với nhóm bắt nạt', 'Không quan tâm vì không liên quan đến mình'],
    ans: 'B',
    exp: 'Bạo lực học đường cần được ngăn chặn. Báo với thầy cô là hành động dũng cảm bảo vệ bạn, quan trọng hơn việc giữ lời hứa.',
  });

  await createQ({
    topicId: t5, d: 'HARD',
    q: 'Em biết một số bạn trong lớp đang chơi một trò chơi nguy hiểm trên mạng (thách nhau làm những điều liều lĩnh). Các bạn rủ em tham gia. Em nên làm gì?',
    opts: ['Tham gia vì muốn được chấp nhận trong nhóm', 'Từ chối tham gia, giải thích sự nguy hiểm cho các bạn và báo với thầy cô hoặc bố mẹ', 'Tham gia xem thử rồi mới quyết định', 'Chỉ xem chứ không tham gia'],
    ans: 'B',
    exp: 'Từ chối các trò chơi nguy hiểm, giải thích cho bạn bè và báo với người lớn là hành động có trách nhiệm bảo vệ bản thân và bạn bè.',
  });

  console.log('Hoàn thành 100 câu hỏi Đạo đức!');
}

main().catch(console.error).finally(() => p.$disconnect());
