const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const QUESTIONS = [
  // --- Present Simple vs Present Continuous ---
  {
    content: 'She ______ TV every evening.',
    options: [
      { key: 'A', content: 'watches', correct: true },
      { key: 'B', content: 'is watching', correct: false },
      { key: 'C', content: 'watch', correct: false },
      { key: 'D', content: 'are watching', correct: false },
    ],
    explanation: 'Dùng Present Simple cho thói quen/hành động lặp lại (every evening). Chủ ngữ "She" → động từ thêm "-s": watches.',
  },
  {
    content: 'Look! The children ______ in the garden.',
    options: [
      { key: 'A', content: 'play', correct: false },
      { key: 'B', content: 'plays', correct: false },
      { key: 'C', content: 'are playing', correct: true },
      { key: 'D', content: 'is playing', correct: false },
    ],
    explanation: '"Look!" là dấu hiệu của Present Continuous (đang xảy ra ngay lúc nói). "Children" là số nhiều → "are playing".',
  },
  {
    content: 'He ______ to school by bus every day.',
    options: [
      { key: 'A', content: 'goes', correct: true },
      { key: 'B', content: 'is going', correct: false },
      { key: 'C', content: 'go', correct: false },
      { key: 'D', content: 'are going', correct: false },
    ],
    explanation: '"Every day" là dấu hiệu của Present Simple. "He" (số ít) → "goes".',
  },
  {
    content: 'We ______ a new project at the moment.',
    options: [
      { key: 'A', content: 'work on', correct: false },
      { key: 'B', content: 'are working on', correct: true },
      { key: 'C', content: 'works on', correct: false },
      { key: 'D', content: 'worked on', correct: false },
    ],
    explanation: '"At the moment" là dấu hiệu của Present Continuous. "We" → "are working on".',
  },
  // --- Past Simple ---
  {
    content: 'She ______ a letter to her friend last night.',
    options: [
      { key: 'A', content: 'writes', correct: false },
      { key: 'B', content: 'is writing', correct: false },
      { key: 'C', content: 'wrote', correct: true },
      { key: 'D', content: 'write', correct: false },
    ],
    explanation: '"Last night" là dấu hiệu của Past Simple. Động từ bất quy tắc: write → wrote.',
  },
  {
    content: 'They ______ football yesterday afternoon.',
    options: [
      { key: 'A', content: 'play', correct: false },
      { key: 'B', content: 'played', correct: true },
      { key: 'C', content: 'are playing', correct: false },
      { key: 'D', content: 'plays', correct: false },
    ],
    explanation: '"Yesterday" là dấu hiệu của Past Simple. Động từ quy tắc: play → played.',
  },
  {
    content: 'My family ______ to Ha Long Bay two years ago.',
    options: [
      { key: 'A', content: 'go', correct: false },
      { key: 'B', content: 'goes', correct: false },
      { key: 'C', content: 'went', correct: true },
      { key: 'D', content: 'gone', correct: false },
    ],
    explanation: '"Two years ago" là dấu hiệu của Past Simple. Động từ bất quy tắc: go → went.',
  },
  {
    content: 'Nam ______ a new bicycle last month.',
    options: [
      { key: 'A', content: 'buy', correct: false },
      { key: 'B', content: 'buys', correct: false },
      { key: 'C', content: 'bought', correct: true },
      { key: 'D', content: 'is buying', correct: false },
    ],
    explanation: '"Last month" → Past Simple. Động từ bất quy tắc: buy → bought.',
  },
  // --- Future Simple (will / be going to) ---
  {
    content: 'I think it ______ tomorrow.',
    options: [
      { key: 'A', content: 'will rain', correct: true },
      { key: 'B', content: 'is going to rain', correct: false },
      { key: 'C', content: 'rains', correct: false },
      { key: 'D', content: 'rained', correct: false },
    ],
    explanation: '"I think" → dự đoán không chắc chắn → dùng "will". "It will rain" là câu dự đoán tương lai.',
  },
  {
    content: 'Look at those dark clouds. It ______ rain.',
    options: [
      { key: 'A', content: 'will', correct: false },
      { key: 'B', content: 'is going to', correct: true },
      { key: 'C', content: 'goes to', correct: false },
      { key: 'D', content: 'shall', correct: false },
    ],
    explanation: 'Có bằng chứng hiện tại (dark clouds) → dùng "be going to" để nói về điều sắp xảy ra.',
  },
  {
    content: 'She ______ her grandmother next Sunday.',
    options: [
      { key: 'A', content: 'visits', correct: false },
      { key: 'B', content: 'visited', correct: false },
      { key: 'C', content: 'is going to visit', correct: true },
      { key: 'D', content: 'visit', correct: false },
    ],
    explanation: 'Kế hoạch đã quyết định trước → "be going to + V". "She is going to visit".',
  },
  // --- Present Perfect ---
  {
    content: 'She ______ already ______ her homework.',
    options: [
      { key: 'A', content: 'has / finished', correct: true },
      { key: 'B', content: 'have / finished', correct: false },
      { key: 'C', content: 'had / finish', correct: false },
      { key: 'D', content: 'is / finishing', correct: false },
    ],
    explanation: '"Already" là dấu hiệu của Present Perfect. "She" (số ít) → "has finished".',
  },
  {
    content: 'I ______ never ______ sushi before.',
    options: [
      { key: 'A', content: 'have / eaten', correct: true },
      { key: 'B', content: 'has / eaten', correct: false },
      { key: 'C', content: 'had / eat', correct: false },
      { key: 'D', content: 'am / eating', correct: false },
    ],
    explanation: '"Never...before" → Present Perfect. "I" → "have eaten". Quá khứ phân từ của eat = eaten.',
  },
  {
    content: 'They ______ in Hanoi for five years.',
    options: [
      { key: 'A', content: 'live', correct: false },
      { key: 'B', content: 'lived', correct: false },
      { key: 'C', content: 'have lived', correct: true },
      { key: 'D', content: 'has lived', correct: false },
    ],
    explanation: '"For five years" với trạng thái còn kéo dài đến hiện tại → Present Perfect. "They" → "have lived".',
  },
  // --- Conditionals Type 1 ---
  {
    content: 'If it ______ tomorrow, we will stay at home.',
    options: [
      { key: 'A', content: 'rains', correct: true },
      { key: 'B', content: 'will rain', correct: false },
      { key: 'C', content: 'rained', correct: false },
      { key: 'D', content: 'is raining', correct: false },
    ],
    explanation: 'Câu điều kiện loại 1: If + Present Simple, will + V nguyên thể. Mệnh đề "if" dùng Present Simple: "rains".',
  },
  {
    content: 'If you study hard, you ______ the exam.',
    options: [
      { key: 'A', content: 'pass', correct: false },
      { key: 'B', content: 'will pass', correct: true },
      { key: 'C', content: 'would pass', correct: false },
      { key: 'D', content: 'passed', correct: false },
    ],
    explanation: 'Câu điều kiện loại 1 (có thể xảy ra): mệnh đề chính dùng "will + V nguyên thể" → "will pass".',
  },
  {
    content: 'She ______ if she misses the bus.',
    options: [
      { key: 'A', content: 'is late', correct: false },
      { key: 'B', content: 'will be late', correct: true },
      { key: 'C', content: 'would be late', correct: false },
      { key: 'D', content: 'was late', correct: false },
    ],
    explanation: 'Điều kiện loại 1 → mệnh đề chính dùng "will + be" = "will be late".',
  },
  // --- Conditionals Type 2 ---
  {
    content: 'If I ______ a bird, I would fly to Paris.',
    options: [
      { key: 'A', content: 'am', correct: false },
      { key: 'B', content: 'were', correct: true },
      { key: 'C', content: 'was', correct: false },
      { key: 'D', content: 'be', correct: false },
    ],
    explanation: 'Câu điều kiện loại 2 (không có thật ở hiện tại): If + were (dùng "were" cho mọi ngôi), would + V.',
  },
  {
    content: 'If he had more time, he ______ travel the world.',
    options: [
      { key: 'A', content: 'will', correct: false },
      { key: 'B', content: 'would', correct: true },
      { key: 'C', content: 'should', correct: false },
      { key: 'D', content: 'could have', correct: false },
    ],
    explanation: 'Điều kiện loại 2: mệnh đề chính dùng "would + V nguyên thể" → "would travel".',
  },
  // --- Passive Voice ---
  {
    content: 'English ______ all over the world.',
    options: [
      { key: 'A', content: 'speaks', correct: false },
      { key: 'B', content: 'is spoken', correct: true },
      { key: 'C', content: 'spoken', correct: false },
      { key: 'D', content: 'are spoken', correct: false },
    ],
    explanation: 'Câu bị động Present Simple: be + V3(past participle). "English" số ít → "is spoken".',
  },
  {
    content: 'The letter ______ by Tom yesterday.',
    options: [
      { key: 'A', content: 'written', correct: false },
      { key: 'B', content: 'was written', correct: true },
      { key: 'C', content: 'is written', correct: false },
      { key: 'D', content: 'were written', correct: false },
    ],
    explanation: '"Yesterday" → Past Simple bị động: was/were + V3. "Letter" số ít → "was written".',
  },
  {
    content: 'The new hospital ______ next year.',
    options: [
      { key: 'A', content: 'will build', correct: false },
      { key: 'B', content: 'is going to build', correct: false },
      { key: 'C', content: 'will be built', correct: true },
      { key: 'D', content: 'built', correct: false },
    ],
    explanation: 'Bị động tương lai: will be + V3. "Hospital" được xây → bị động: "will be built".',
  },
  {
    content: 'A lot of trees ______ in the storm last night.',
    options: [
      { key: 'A', content: 'destroyed', correct: false },
      { key: 'B', content: 'were destroyed', correct: true },
      { key: 'C', content: 'was destroyed', correct: false },
      { key: 'D', content: 'are destroyed', correct: false },
    ],
    explanation: '"Last night" → Past Simple bị động. "Trees" số nhiều → "were destroyed".',
  },
  // --- Reported Speech ---
  {
    content: 'She said, "I am tired." → She said that she ______ tired.',
    options: [
      { key: 'A', content: 'is', correct: false },
      { key: 'B', content: 'was', correct: true },
      { key: 'C', content: 'were', correct: false },
      { key: 'D', content: 'am', correct: false },
    ],
    explanation: 'Lời nói gián tiếp (reported speech): thì hiện tại → lùi về quá khứ. "am" → "was".',
  },
  {
    content: 'Tom said, "I will come tomorrow." → Tom said that he ______ the next day.',
    options: [
      { key: 'A', content: 'will come', correct: false },
      { key: 'B', content: 'would come', correct: true },
      { key: 'C', content: 'comes', correct: false },
      { key: 'D', content: 'came', correct: false },
    ],
    explanation: '"Will" trong reported speech → "would". "Tomorrow" → "the next day".',
  },
  {
    content: 'She asked, "Do you like coffee?" → She asked me if I ______ coffee.',
    options: [
      { key: 'A', content: 'like', correct: false },
      { key: 'B', content: 'liked', correct: true },
      { key: 'C', content: 'likes', correct: false },
      { key: 'D', content: 'will like', correct: false },
    ],
    explanation: 'Câu hỏi gián tiếp Yes/No dùng "if/whether". Thì hiện tại "like" → quá khứ "liked".',
  },
  // --- Modal Verbs ---
  {
    content: 'You ______ wear a helmet when riding a motorbike. It\'s the law.',
    options: [
      { key: 'A', content: 'should', correct: false },
      { key: 'B', content: 'must', correct: true },
      { key: 'C', content: 'can', correct: false },
      { key: 'D', content: 'might', correct: false },
    ],
    explanation: '"Must" diễn tả nghĩa vụ bắt buộc (luật pháp). "Should" chỉ lời khuyên, không mang tính bắt buộc.',
  },
  {
    content: 'She ______ speak three languages fluently.',
    options: [
      { key: 'A', content: 'must', correct: false },
      { key: 'B', content: 'should', correct: false },
      { key: 'C', content: 'can', correct: true },
      { key: 'D', content: 'would', correct: false },
    ],
    explanation: '"Can" diễn tả khả năng. "She can speak" = cô ấy có khả năng nói được ba thứ tiếng.',
  },
  {
    content: 'You ______ eat so much sugar. It\'s bad for your health.',
    options: [
      { key: 'A', content: 'should', correct: false },
      { key: 'B', content: 'shouldn\'t', correct: true },
      { key: 'C', content: 'must', correct: false },
      { key: 'D', content: 'can\'t', correct: false },
    ],
    explanation: '"Shouldn\'t" là lời khuyên không nên làm gì. "Don\'t eat too much sugar" → shouldn\'t là phù hợp nhất.',
  },
  {
    content: 'It ______ be Tom at the door – he\'s in Paris.',
    options: [
      { key: 'A', content: 'can\'t', correct: true },
      { key: 'B', content: 'mustn\'t', correct: false },
      { key: 'C', content: 'shouldn\'t', correct: false },
      { key: 'D', content: 'wouldn\'t', correct: false },
    ],
    explanation: '"Can\'t" diễn tả suy luận phủ định (chắc chắn không thể). Tom đang ở Paris → không thể là anh ta.',
  },
  // --- Comparatives & Superlatives ---
  {
    content: 'Mount Everest is ______ mountain in the world.',
    options: [
      { key: 'A', content: 'higher', correct: false },
      { key: 'B', content: 'the highest', correct: true },
      { key: 'C', content: 'the higher', correct: false },
      { key: 'D', content: 'high', correct: false },
    ],
    explanation: 'So sánh nhất dùng "the + adj-est". "High" → "the highest". So sánh trong phạm vi "in the world".',
  },
  {
    content: 'My sister is ______ than me.',
    options: [
      { key: 'A', content: 'more taller', correct: false },
      { key: 'B', content: 'tallest', correct: false },
      { key: 'C', content: 'taller', correct: true },
      { key: 'D', content: 'the tallest', correct: false },
    ],
    explanation: 'So sánh hơn hai người/vật: adj-er + than. "Tall" (1 âm tiết) → "taller than".',
  },
  {
    content: 'This book is ______ than that one.',
    options: [
      { key: 'A', content: 'more interesting', correct: true },
      { key: 'B', content: 'interestinger', correct: false },
      { key: 'C', content: 'most interesting', correct: false },
      { key: 'D', content: 'the most interesting', correct: false },
    ],
    explanation: 'Tính từ dài (nhiều âm tiết) → dùng "more + adj" khi so sánh hơn. "More interesting than".',
  },
  {
    content: 'He is the ______ student in the class.',
    options: [
      { key: 'A', content: 'most hard-working', correct: true },
      { key: 'B', content: 'more hard-working', correct: false },
      { key: 'C', content: 'hard-workinger', correct: false },
      { key: 'D', content: 'hard-working', correct: false },
    ],
    explanation: 'So sánh nhất với tính từ dài: "the most + adj". "The most hard-working".',
  },
  // --- Articles (a/an/the) ---
  {
    content: 'I saw ______ elephant at the zoo yesterday.',
    options: [
      { key: 'A', content: 'a', correct: false },
      { key: 'B', content: 'an', correct: true },
      { key: 'C', content: 'the', correct: false },
      { key: 'D', content: 'no article', correct: false },
    ],
    explanation: '"Elephant" bắt đầu bằng nguyên âm /e/ → dùng "an". Đây là lần nhắc đến lần đầu (chưa xác định).',
  },
  {
    content: '______ sun rises in the east.',
    options: [
      { key: 'A', content: 'A', correct: false },
      { key: 'B', content: 'An', correct: false },
      { key: 'C', content: 'The', correct: true },
      { key: 'D', content: 'No article', correct: false },
    ],
    explanation: '"The sun" — vật duy nhất trong thế giới tự nhiên → dùng "the" (mạo từ xác định).',
  },
  {
    content: 'She plays ______ piano very well.',
    options: [
      { key: 'A', content: 'a', correct: false },
      { key: 'B', content: 'an', correct: false },
      { key: 'C', content: 'the', correct: true },
      { key: 'D', content: 'no article', correct: false },
    ],
    explanation: 'Chơi nhạc cụ → dùng "the": "play the piano/guitar/violin...".',
  },
  // --- Prepositions ---
  {
    content: 'We arrived ______ the airport at 6 a.m.',
    options: [
      { key: 'A', content: 'in', correct: false },
      { key: 'B', content: 'on', correct: false },
      { key: 'C', content: 'at', correct: true },
      { key: 'D', content: 'to', correct: false },
    ],
    explanation: 'Dùng "at" với địa điểm cụ thể (điểm, nơi chốn xác định): at the airport, at school, at home.',
  },
  {
    content: 'My birthday is ______ January.',
    options: [
      { key: 'A', content: 'at', correct: false },
      { key: 'B', content: 'on', correct: false },
      { key: 'C', content: 'in', correct: true },
      { key: 'D', content: 'by', correct: false },
    ],
    explanation: 'Dùng "in" với tháng, năm, mùa. "In January" = vào tháng Một.',
  },
  {
    content: 'She was born ______ Monday.',
    options: [
      { key: 'A', content: 'at', correct: false },
      { key: 'B', content: 'on', correct: true },
      { key: 'C', content: 'in', correct: false },
      { key: 'D', content: 'by', correct: false },
    ],
    explanation: 'Dùng "on" với các ngày trong tuần và ngày cụ thể: on Monday, on 15th March.',
  },
  {
    content: 'He has been working here ______ 2019.',
    options: [
      { key: 'A', content: 'for', correct: false },
      { key: 'B', content: 'since', correct: true },
      { key: 'C', content: 'during', correct: false },
      { key: 'D', content: 'from', correct: false },
    ],
    explanation: '"Since" dùng với mốc thời gian cụ thể (2019). "For" dùng với khoảng thời gian (for 5 years).',
  },
  {
    content: 'I have been studying English ______ three years.',
    options: [
      { key: 'A', content: 'since', correct: false },
      { key: 'B', content: 'for', correct: true },
      { key: 'C', content: 'during', correct: false },
      { key: 'D', content: 'at', correct: false },
    ],
    explanation: '"For" dùng với khoảng thời gian kéo dài: "for three years" = trong vòng ba năm.',
  },
  // --- Vocabulary: Adjectives of personality ---
  {
    content: 'A person who always tells the truth is ______.',
    options: [
      { key: 'A', content: 'generous', correct: false },
      { key: 'B', content: 'honest', correct: true },
      { key: 'C', content: 'creative', correct: false },
      { key: 'D', content: 'patient', correct: false },
    ],
    explanation: '"Honest" = trung thực, người luôn nói thật. "Generous" = hào phóng, "creative" = sáng tạo, "patient" = kiên nhẫn.',
  },
  {
    content: 'She gives a lot to charities. She is very ______.',
    options: [
      { key: 'A', content: 'brave', correct: false },
      { key: 'B', content: 'stubborn', correct: false },
      { key: 'C', content: 'generous', correct: true },
      { key: 'D', content: 'lazy', correct: false },
    ],
    explanation: '"Generous" = hào phóng, sẵn sàng cho đi. Người hay quyên góp từ thiện được gọi là generous.',
  },
  {
    content: 'He never gives up even when things are difficult. He is ______.',
    options: [
      { key: 'A', content: 'determined', correct: true },
      { key: 'B', content: 'careless', correct: false },
      { key: 'C', content: 'selfish', correct: false },
      { key: 'D', content: 'impatient', correct: false },
    ],
    explanation: '"Determined" = kiên quyết, quyết tâm. Người không bỏ cuộc dù khó khăn là "determined".',
  },
  // --- Vocabulary: Environment ---
  {
    content: 'The process of cutting down large areas of forest is called ______.',
    options: [
      { key: 'A', content: 'pollution', correct: false },
      { key: 'B', content: 'deforestation', correct: true },
      { key: 'C', content: 'extinction', correct: false },
      { key: 'D', content: 'erosion', correct: false },
    ],
    explanation: '"Deforestation" = nạn phá rừng. "Pollution" = ô nhiễm, "extinction" = tuyệt chủng, "erosion" = xói mòn.',
  },
  {
    content: 'Carbon dioxide is a greenhouse ______ that causes global warming.',
    options: [
      { key: 'A', content: 'gas', correct: true },
      { key: 'B', content: 'liquid', correct: false },
      { key: 'C', content: 'solid', correct: false },
      { key: 'D', content: 'wave', correct: false },
    ],
    explanation: 'CO₂ là một loại "greenhouse gas" (khí nhà kính). Đây là từ vựng cố định về môi trường.',
  },
  {
    content: 'We should ______ plastic bags to protect the environment.',
    options: [
      { key: 'A', content: 'use more', correct: false },
      { key: 'B', content: 'reduce the use of', correct: true },
      { key: 'C', content: 'produce more', correct: false },
      { key: 'D', content: 'throw away', correct: false },
    ],
    explanation: 'Bảo vệ môi trường → giảm sử dụng túi nilon. "Reduce the use of" = giảm việc sử dụng.',
  },
  // --- Vocabulary: Technology ---
  {
    content: 'You can use the Internet to ______ information quickly.',
    options: [
      { key: 'A', content: 'search for', correct: true },
      { key: 'B', content: 'look after', correct: false },
      { key: 'C', content: 'take care of', correct: false },
      { key: 'D', content: 'make up', correct: false },
    ],
    explanation: '"Search for information" = tìm kiếm thông tin. "Look after/take care of" = chăm sóc, "make up" = bịa đặt.',
  },
  {
    content: 'A ______ is a portable computer that you can carry easily.',
    options: [
      { key: 'A', content: 'desktop', correct: false },
      { key: 'B', content: 'laptop', correct: true },
      { key: 'C', content: 'monitor', correct: false },
      { key: 'D', content: 'keyboard', correct: false },
    ],
    explanation: '"Laptop" = máy tính xách tay, dễ mang theo. "Desktop" = máy tính để bàn, "monitor" = màn hình.',
  },
  {
    content: 'When you ______ a file, you save a copy of it from the Internet to your device.',
    options: [
      { key: 'A', content: 'upload', correct: false },
      { key: 'B', content: 'download', correct: true },
      { key: 'C', content: 'delete', correct: false },
      { key: 'D', content: 'scan', correct: false },
    ],
    explanation: '"Download" = tải xuống (từ internet về thiết bị). "Upload" = tải lên (từ thiết bị lên internet).',
  },
  // --- Vocabulary: Health ---
  {
    content: 'A doctor who performs operations is called a ______.',
    options: [
      { key: 'A', content: 'surgeon', correct: true },
      { key: 'B', content: 'dentist', correct: false },
      { key: 'C', content: 'pharmacist', correct: false },
      { key: 'D', content: 'nurse', correct: false },
    ],
    explanation: '"Surgeon" = bác sĩ phẫu thuật. "Dentist" = nha sĩ, "pharmacist" = dược sĩ, "nurse" = y tá.',
  },
  {
    content: 'Regular ______ such as running or swimming keeps you fit and healthy.',
    options: [
      { key: 'A', content: 'diet', correct: false },
      { key: 'B', content: 'exercise', correct: true },
      { key: 'C', content: 'medicine', correct: false },
      { key: 'D', content: 'sleep', correct: false },
    ],
    explanation: '"Exercise" = tập thể dục. Running và swimming là các dạng bài tập thể dục (exercise).',
  },
  // --- Conjunctions ---
  {
    content: 'She was tired ______ she continued working.',
    options: [
      { key: 'A', content: 'so', correct: false },
      { key: 'B', content: 'because', correct: false },
      { key: 'C', content: 'but', correct: true },
      { key: 'D', content: 'and', correct: false },
    ],
    explanation: '"But" nối hai vế đối lập. Mệt nhưng vẫn tiếp tục làm → tương phản → "but".',
  },
  {
    content: 'He missed the bus ______ he was late for school.',
    options: [
      { key: 'A', content: 'but', correct: false },
      { key: 'B', content: 'so', correct: true },
      { key: 'C', content: 'although', correct: false },
      { key: 'D', content: 'unless', correct: false },
    ],
    explanation: '"So" nối nguyên nhân → kết quả. Lỡ xe buýt → kết quả là đi học muộn. "So" = vì vậy.',
  },
  {
    content: '______ it was raining, they went for a walk.',
    options: [
      { key: 'A', content: 'Because', correct: false },
      { key: 'B', content: 'So', correct: false },
      { key: 'C', content: 'Although', correct: true },
      { key: 'D', content: 'Since', correct: false },
    ],
    explanation: '"Although" = mặc dù, diễn tả sự nhượng bộ (tương phản). Dù trời mưa nhưng vẫn đi dạo.',
  },
  // --- Word Forms ---
  {
    content: 'The ______ of the new bridge will start next month. (BUILD)',
    options: [
      { key: 'A', content: 'builder', correct: false },
      { key: 'B', content: 'building', correct: false },
      { key: 'C', content: 'construction', correct: true },
      { key: 'D', content: 'build', correct: false },
    ],
    explanation: '"Construction" (danh từ) = việc xây dựng. "Builder" = thợ xây, "building" = tòa nhà/việc xây.',
  },
  {
    content: 'She showed great ______ during the competition. (CONFIDENT)',
    options: [
      { key: 'A', content: 'confident', correct: false },
      { key: 'B', content: 'confidently', correct: false },
      { key: 'C', content: 'confidence', correct: true },
      { key: 'D', content: 'confide', correct: false },
    ],
    explanation: '"Confidence" (danh từ) = sự tự tin. Cần danh từ sau "great". "Confident" = tính từ, "confidently" = trạng từ.',
  },
  {
    content: 'He speaks English very ______. (FLUENT)',
    options: [
      { key: 'A', content: 'fluent', correct: false },
      { key: 'B', content: 'fluency', correct: false },
      { key: 'C', content: 'fluently', correct: true },
      { key: 'D', content: 'fluentation', correct: false },
    ],
    explanation: '"Fluently" (trạng từ) = một cách trôi chảy. Trạng từ bổ nghĩa cho động từ "speaks".',
  },
  // --- Reading: Topic - Vietnamese Festivals ---
  {
    content: 'Tet is the most important ______ in Vietnam.',
    options: [
      { key: 'A', content: 'holiday', correct: false },
      { key: 'B', content: 'festival', correct: true },
      { key: 'C', content: 'ceremony', correct: false },
      { key: 'D', content: 'occasion', correct: false },
    ],
    explanation: '"Festival" = lễ hội. Tết Nguyên Đán là "festival" quan trọng nhất của Việt Nam. "Holiday" = ngày nghỉ lễ.',
  },
  {
    content: 'During Tet, Vietnamese people often ______ their houses with peach blossoms.',
    options: [
      { key: 'A', content: 'paint', correct: false },
      { key: 'B', content: 'decorate', correct: true },
      { key: 'C', content: 'build', correct: false },
      { key: 'D', content: 'clean', correct: false },
    ],
    explanation: '"Decorate" = trang trí. Người Việt trang trí nhà bằng hoa đào dịp Tết. "Paint" = sơn, "build" = xây.',
  },
  // --- Reading: Topic - School Life ---
  {
    content: 'A ______ is a person who teaches at a school or university.',
    options: [
      { key: 'A', content: 'student', correct: false },
      { key: 'B', content: 'teacher', correct: true },
      { key: 'C', content: 'principal', correct: false },
      { key: 'D', content: 'librarian', correct: false },
    ],
    explanation: '"Teacher" = giáo viên, người dạy học. "Principal" = hiệu trưởng, "librarian" = thủ thư.',
  },
  {
    content: 'Students usually have a ______ break between lessons to rest and eat.',
    options: [
      { key: 'A', content: 'lunch', correct: false },
      { key: 'B', content: 'recess', correct: true },
      { key: 'C', content: 'holiday', correct: false },
      { key: 'D', content: 'vacation', correct: false },
    ],
    explanation: '"Recess" = giờ nghỉ giải lao giữa các tiết học. "Lunch" = bữa trưa, "vacation" = kỳ nghỉ dài.',
  },
  // --- Phrasal Verbs ---
  {
    content: 'Please ______ the light. It\'s very dark in here.',
    options: [
      { key: 'A', content: 'turn off', correct: false },
      { key: 'B', content: 'turn down', correct: false },
      { key: 'C', content: 'turn on', correct: true },
      { key: 'D', content: 'turn up', correct: false },
    ],
    explanation: '"Turn on" = bật (đèn, máy). "Turn off" = tắt, "turn down" = vặn nhỏ, "turn up" = vặn to.',
  },
  {
    content: 'She ______ her father in terms of appearance.',
    options: [
      { key: 'A', content: 'takes after', correct: true },
      { key: 'B', content: 'looks for', correct: false },
      { key: 'C', content: 'takes off', correct: false },
      { key: 'D', content: 'looks up', correct: false },
    ],
    explanation: '"Take after" = trông giống ai (về ngoại hình/tính cách). "Look for" = tìm kiếm, "take off" = cất cánh.',
  },
  {
    content: 'Don\'t ______ your homework. Do it now.',
    options: [
      { key: 'A', content: 'put off', correct: true },
      { key: 'B', content: 'put on', correct: false },
      { key: 'C', content: 'put out', correct: false },
      { key: 'D', content: 'put up', correct: false },
    ],
    explanation: '"Put off" = trì hoãn, hoãn lại. "Put on" = mặc, đội; "put out" = dập tắt; "put up" = dựng lên.',
  },
  {
    content: 'He ______ a new word in the dictionary.',
    options: [
      { key: 'A', content: 'looked for', correct: false },
      { key: 'B', content: 'looked after', correct: false },
      { key: 'C', content: 'looked up', correct: true },
      { key: 'D', content: 'looked at', correct: false },
    ],
    explanation: '"Look up" = tra (từ điển). "Look after" = chăm sóc, "look for" = tìm kiếm.',
  },
  // --- Relative Clauses ---
  {
    content: 'The woman ______ called you this morning is my aunt.',
    options: [
      { key: 'A', content: 'which', correct: false },
      { key: 'B', content: 'whom', correct: false },
      { key: 'C', content: 'who', correct: true },
      { key: 'D', content: 'whose', correct: false },
    ],
    explanation: '"Who" thay thế cho người làm chủ ngữ trong mệnh đề quan hệ. "The woman who called" = người phụ nữ đã gọi.',
  },
  {
    content: 'The book ______ I borrowed from the library is very interesting.',
    options: [
      { key: 'A', content: 'who', correct: false },
      { key: 'B', content: 'which', correct: true },
      { key: 'C', content: 'whose', correct: false },
      { key: 'D', content: 'whom', correct: false },
    ],
    explanation: '"Which" thay thế cho vật (book) làm tân ngữ trong mệnh đề quan hệ. "The book which I borrowed".',
  },
  {
    content: 'The man ______ car was stolen reported it to the police.',
    options: [
      { key: 'A', content: 'who', correct: false },
      { key: 'B', content: 'which', correct: false },
      { key: 'C', content: 'whose', correct: true },
      { key: 'D', content: 'whom', correct: false },
    ],
    explanation: '"Whose" = của ai, diễn tả sở hữu trong mệnh đề quan hệ. "The man whose car" = người đàn ông mà xe của ông ta...',
  },
  // --- Question Tags ---
  {
    content: 'She doesn\'t like coffee, ______?',
    options: [
      { key: 'A', content: 'does she', correct: true },
      { key: 'B', content: 'doesn\'t she', correct: false },
      { key: 'C', content: 'is she', correct: false },
      { key: 'D', content: 'isn\'t she', correct: false },
    ],
    explanation: 'Câu chính phủ định → tag question khẳng định. "Doesn\'t" → tag là "does she".',
  },
  {
    content: 'They are students, ______?',
    options: [
      { key: 'A', content: 'are they', correct: false },
      { key: 'B', content: 'aren\'t they', correct: true },
      { key: 'C', content: 'do they', correct: false },
      { key: 'D', content: 'don\'t they', correct: false },
    ],
    explanation: 'Câu chính khẳng định → tag question phủ định. "Are" → tag là "aren\'t they".',
  },
  // --- Indirect questions ---
  {
    content: 'Could you tell me where ______ the nearest bank?',
    options: [
      { key: 'A', content: 'is', correct: false },
      { key: 'B', content: 'the nearest bank is', correct: true },
      { key: 'C', content: 'the nearest bank are', correct: false },
      { key: 'D', content: 'was', correct: false },
    ],
    explanation: 'Câu hỏi gián tiếp (indirect question): trật tự từ của câu trần thuật (S + V), không đảo động từ. "Where the nearest bank is".',
  },
  // --- Too / Enough ---
  {
    content: 'He is ______ young to drive a car.',
    options: [
      { key: 'A', content: 'enough', correct: false },
      { key: 'B', content: 'very', correct: false },
      { key: 'C', content: 'too', correct: true },
      { key: 'D', content: 'so', correct: false },
    ],
    explanation: '"Too + adj + to V" = quá...để...không thể. Anh ta quá trẻ để lái xe. "Too young to drive".',
  },
  {
    content: 'She is tall ______ to reach the top shelf.',
    options: [
      { key: 'A', content: 'too', correct: false },
      { key: 'B', content: 'very', correct: false },
      { key: 'C', content: 'enough', correct: true },
      { key: 'D', content: 'so', correct: false },
    ],
    explanation: '"Adj + enough + to V" = đủ...để... Cô ấy đủ cao để với tới kệ trên. "Tall enough to reach".',
  },
  // --- Gerund vs Infinitive ---
  {
    content: 'I enjoy ______ to music in my free time.',
    options: [
      { key: 'A', content: 'to listen', correct: false },
      { key: 'B', content: 'listen', correct: false },
      { key: 'C', content: 'listening', correct: true },
      { key: 'D', content: 'listened', correct: false },
    ],
    explanation: '"Enjoy" luôn đi với V-ing (gerund): enjoy doing something. "Enjoy listening".',
  },
  {
    content: 'She decided ______ a new language.',
    options: [
      { key: 'A', content: 'learning', correct: false },
      { key: 'B', content: 'to learn', correct: true },
      { key: 'C', content: 'learn', correct: false },
      { key: 'D', content: 'learned', correct: false },
    ],
    explanation: '"Decide" đi với to-infinitive: decide to do something. "Decided to learn".',
  },
  {
    content: 'They suggested ______ to the cinema.',
    options: [
      { key: 'A', content: 'to go', correct: false },
      { key: 'B', content: 'go', correct: false },
      { key: 'C', content: 'going', correct: true },
      { key: 'D', content: 'gone', correct: false },
    ],
    explanation: '"Suggest" đi với V-ing: suggest doing something. "Suggested going".',
  },
  // --- Vocabulary: Travel ---
  {
    content: 'Before boarding a plane, you must go through ______.',
    options: [
      { key: 'A', content: 'customs and immigration', correct: true },
      { key: 'B', content: 'the waiting room', correct: false },
      { key: 'C', content: 'the departure lounge', correct: false },
      { key: 'D', content: 'the check-in desk', correct: false },
    ],
    explanation: '"Customs and immigration" = hải quan và nhập cảnh — thủ tục bắt buộc trước khi lên máy bay.',
  },
  {
    content: 'A ______ is a small book you get when you buy a plane ticket.',
    options: [
      { key: 'A', content: 'passport', correct: false },
      { key: 'B', content: 'boarding pass', correct: true },
      { key: 'C', content: 'visa', correct: false },
      { key: 'D', content: 'receipt', correct: false },
    ],
    explanation: '"Boarding pass" = thẻ lên máy bay. "Passport" = hộ chiếu, "visa" = thị thực.',
  },
  // --- Vocabulary: Food ---
  {
    content: 'Pho is a traditional Vietnamese ______ made with rice noodles and broth.',
    options: [
      { key: 'A', content: 'dessert', correct: false },
      { key: 'B', content: 'dish', correct: true },
      { key: 'C', content: 'snack', correct: false },
      { key: 'D', content: 'beverage', correct: false },
    ],
    explanation: '"Dish" = món ăn. Phở là một "traditional dish" của Việt Nam. "Dessert" = món tráng miệng, "beverage" = đồ uống.',
  },
  // --- Error Correction ---
  {
    content: 'Which sentence is CORRECT?',
    options: [
      { key: 'A', content: 'She have been to Paris twice.', correct: false },
      { key: 'B', content: 'She has been to Paris twice.', correct: true },
      { key: 'C', content: 'She has go to Paris twice.', correct: false },
      { key: 'D', content: 'She have go to Paris twice.', correct: false },
    ],
    explanation: '"She" (ngôi 3 số ít) → "has". Quá khứ phân từ của "go" = "been" (trong "have been to" = đã từng đến). → "She has been to Paris twice."',
  },
  {
    content: 'Which sentence has a grammar mistake?',
    options: [
      { key: 'A', content: 'I am going to visit my grandparents next weekend.', correct: false },
      { key: 'B', content: 'He didn\'t went to school yesterday.', correct: true },
      { key: 'C', content: 'They have already finished their project.', correct: false },
      { key: 'D', content: 'She can speak French and Spanish.', correct: false },
    ],
    explanation: '"Didn\'t" đã là phủ định của quá khứ → động từ theo sau phải ở dạng nguyên thể: "didn\'t go" (không phải "went").',
  },
  // --- Reading Comprehension (short passage) ---
  {
    content: 'Read: "Nam gets up at 6 a.m. every day. He has breakfast, then walks to school. Classes start at 7:30 a.m." → What time does Nam wake up?',
    options: [
      { key: 'A', content: '7:00 a.m.', correct: false },
      { key: 'B', content: '6:00 a.m.', correct: true },
      { key: 'C', content: '7:30 a.m.', correct: false },
      { key: 'D', content: '6:30 a.m.', correct: false },
    ],
    explanation: 'Bài đọc nói: "Nam gets up at 6 a.m." → Nam thức dậy lúc 6 giờ sáng.',
  },
  {
    content: 'Read: "Lan loves animals. She has two dogs and a cat. Every morning, she feeds them before going to school." → How many pets does Lan have?',
    options: [
      { key: 'A', content: 'Two', correct: false },
      { key: 'B', content: 'Three', correct: true },
      { key: 'C', content: 'Four', correct: false },
      { key: 'D', content: 'One', correct: false },
    ],
    explanation: 'Lan có hai con chó (two dogs) và một con mèo (a cat) → tổng cộng 3 thú cưng.',
  },
  {
    content: 'Read: "The Amazon rainforest produces 20% of the world\'s oxygen and is home to millions of species." → What percentage of global oxygen does the Amazon produce?',
    options: [
      { key: 'A', content: '10%', correct: false },
      { key: 'B', content: '15%', correct: false },
      { key: 'C', content: '20%', correct: true },
      { key: 'D', content: '25%', correct: false },
    ],
    explanation: 'Bài đọc nêu rõ: "produces 20% of the world\'s oxygen" → 20%.',
  },
  // --- Synonyms & Antonyms ---
  {
    content: 'The word "enormous" is closest in meaning to ______.',
    options: [
      { key: 'A', content: 'tiny', correct: false },
      { key: 'B', content: 'huge', correct: true },
      { key: 'C', content: 'beautiful', correct: false },
      { key: 'D', content: 'quiet', correct: false },
    ],
    explanation: '"Enormous" = rất lớn, khổng lồ. "Huge" cũng có nghĩa tương tự. "Tiny" = rất nhỏ (trái nghĩa).',
  },
  {
    content: 'The opposite of "dangerous" is ______.',
    options: [
      { key: 'A', content: 'exciting', correct: false },
      { key: 'B', content: 'difficult', correct: false },
      { key: 'C', content: 'safe', correct: true },
      { key: 'D', content: 'boring', correct: false },
    ],
    explanation: '"Dangerous" = nguy hiểm. Từ trái nghĩa là "safe" = an toàn.',
  },
  {
    content: 'Choose the word that means the same as "purchase".',
    options: [
      { key: 'A', content: 'sell', correct: false },
      { key: 'B', content: 'buy', correct: true },
      { key: 'C', content: 'borrow', correct: false },
      { key: 'D', content: 'lend', correct: false },
    ],
    explanation: '"Purchase" = mua (từ trang trọng). Từ đồng nghĩa thông dụng là "buy".',
  },
  // --- Sentence Transformation ---
  {
    content: '"It\'s raining, so we can\'t go out." → We can\'t go out ______ it\'s raining.',
    options: [
      { key: 'A', content: 'although', correct: false },
      { key: 'B', content: 'because', correct: true },
      { key: 'C', content: 'unless', correct: false },
      { key: 'D', content: 'but', correct: false },
    ],
    explanation: '"So" = vì vậy (kết quả). Khi đảo lại: mệnh đề nguyên nhân dùng "because". "Can\'t go out because it\'s raining."',
  },
  {
    content: '"Although she was tired, she finished the report." → She finished the report ______ being tired.',
    options: [
      { key: 'A', content: 'because of', correct: false },
      { key: 'B', content: 'due to', correct: false },
      { key: 'C', content: 'despite', correct: true },
      { key: 'D', content: 'so', correct: false },
    ],
    explanation: '"Despite + noun/V-ing" = mặc dù (không dùng mệnh đề sau). Tương đương "although" nhưng không cần chủ ngữ và động từ.',
  },
  // --- Vocabulary: Idioms ---
  {
    content: '"It\'s raining cats and dogs" means ______.',
    options: [
      { key: 'A', content: 'it\'s raining lightly', correct: false },
      { key: 'B', content: 'it\'s raining very heavily', correct: true },
      { key: 'C', content: 'cats and dogs are falling', correct: false },
      { key: 'D', content: 'the weather is nice', correct: false },
    ],
    explanation: '"Raining cats and dogs" là thành ngữ nghĩa là mưa rất to, mưa như trút nước.',
  },
  {
    content: '"Break a leg!" is an expression meaning ______.',
    options: [
      { key: 'A', content: 'be careful', correct: false },
      { key: 'B', content: 'good luck', correct: true },
      { key: 'C', content: 'stop working', correct: false },
      { key: 'D', content: 'you are injured', correct: false },
    ],
    explanation: '"Break a leg!" là thành ngữ tiếng Anh dùng để chúc may mắn, thường dùng trước buổi biểu diễn.',
  },
  // --- Pronunciation ---
  {
    content: 'Which word has a different vowel sound from the others?',
    options: [
      { key: 'A', content: 'meet', correct: false },
      { key: 'B', content: 'seat', correct: false },
      { key: 'C', content: 'feet', correct: false },
      { key: 'D', content: 'great', correct: true },
    ],
    explanation: '"Meet, seat, feet" đều có âm /iː/. "Great" có âm /eɪ/ — khác với ba từ còn lại.',
  },
  {
    content: 'Which word has a silent letter?',
    options: [
      { key: 'A', content: 'book', correct: false },
      { key: 'B', content: 'knife', correct: true },
      { key: 'C', content: 'cat', correct: false },
      { key: 'D', content: 'dog', correct: false },
    ],
    explanation: '"Knife" có chữ "k" câm (không phát âm) → phát âm là /naɪf/.',
  },
  // --- Letters & Communication ---
  {
    content: 'Which phrase is used to begin a formal letter?',
    options: [
      { key: 'A', content: 'Hey there!', correct: false },
      { key: 'B', content: 'Dear Sir/Madam,', correct: true },
      { key: 'C', content: 'What\'s up?', correct: false },
      { key: 'D', content: 'Yo!', correct: false },
    ],
    explanation: '"Dear Sir/Madam," là cách mở đầu trang trọng cho thư trang trọng khi không biết tên người nhận.',
  },
  {
    content: 'Which is an appropriate closing for a formal letter?',
    options: [
      { key: 'A', content: 'Love,', correct: false },
      { key: 'B', content: 'See ya,', correct: false },
      { key: 'C', content: 'Yours sincerely,', correct: true },
      { key: 'D', content: 'Cheers,', correct: false },
    ],
    explanation: '"Yours sincerely," là kết thúc trang trọng cho thư trang trọng. "Love," dùng cho thư thân mật.',
  },
  // --- Numbers & Dates ---
  {
    content: 'How do you say "15th" in English?',
    options: [
      { key: 'A', content: 'fifteen', correct: false },
      { key: 'B', content: 'fifteenth', correct: true },
      { key: 'C', content: 'fiveteenth', correct: false },
      { key: 'D', content: 'fiften', correct: false },
    ],
    explanation: '"15th" = "fifteenth" (số thứ tự). "Fifteen" = 15 (số đếm). Chú ý: five → fif, teen → teenth.',
  },
  {
    content: 'What is the ordinal form of "two"?',
    options: [
      { key: 'A', content: 'twoth', correct: false },
      { key: 'B', content: 'second', correct: true },
      { key: 'C', content: 'twond', correct: false },
      { key: 'D', content: 'twoeth', correct: false },
    ],
    explanation: '"Second" = thứ hai (số thứ tự). Đây là số thứ tự bất quy tắc: one→first, two→second, three→third.',
  },
  // --- Conversations ---
  {
    content: '"Would you like some more cake?" — "______"',
    options: [
      { key: 'A', content: 'Yes, I would like.', correct: false },
      { key: 'B', content: 'No, thanks. I\'m full.', correct: true },
      { key: 'C', content: 'I am liking it.', correct: false },
      { key: 'D', content: 'Yes, I want.', correct: false },
    ],
    explanation: 'Câu trả lời lịch sự khi từ chối đề nghị: "No, thanks. I\'m full." = Không, cảm ơn. Tôi no rồi.',
  },
  {
    content: '"How long does it take to get to school?" — "______"',
    options: [
      { key: 'A', content: 'It takes about 20 minutes.', correct: true },
      { key: 'B', content: 'It\'s 20 minutes far.', correct: false },
      { key: 'C', content: 'I take 20 minutes.', correct: false },
      { key: 'D', content: 'It is 20 minutes long.', correct: false },
    ],
    explanation: '"It takes + time + to do something" là cấu trúc đúng để nói về thời gian cần thiết.',
  },
  {
    content: '"Excuse me, how can I get to the museum?" — "______"',
    options: [
      { key: 'A', content: 'Turn left at the traffic lights, then go straight.', correct: true },
      { key: 'B', content: 'The museum is beautiful.', correct: false },
      { key: 'C', content: 'I like museums.', correct: false },
      { key: 'D', content: 'Yes, it is near here.', correct: false },
    ],
    explanation: 'Khi hỏi đường, câu trả lời phải cung cấp hướng dẫn cụ thể: "Turn left... go straight..."',
  },
  // --- Spelling ---
  {
    content: 'Which word is spelled correctly?',
    options: [
      { key: 'A', content: 'recieve', correct: false },
      { key: 'B', content: 'receive', correct: true },
      { key: 'C', content: 'receve', correct: false },
      { key: 'D', content: 'receieve', correct: false },
    ],
    explanation: '"Receive" là cách viết đúng. Quy tắc: "i before e except after c" → re-c-e-i-ve.',
  },
  {
    content: 'Which word is spelled correctly?',
    options: [
      { key: 'A', content: 'beleive', correct: false },
      { key: 'B', content: 'beleave', correct: false },
      { key: 'C', content: 'believe', correct: true },
      { key: 'D', content: 'belive', correct: false },
    ],
    explanation: '"Believe" là cách viết đúng: b-e-l-i-e-v-e. Lưu ý: "ie" không phải "ei".',
  },
  // --- Topic: Sports ---
  {
    content: 'In football, the player who stops goals from being scored is the ______.',
    options: [
      { key: 'A', content: 'striker', correct: false },
      { key: 'B', content: 'midfielder', correct: false },
      { key: 'C', content: 'goalkeeper', correct: true },
      { key: 'D', content: 'defender', correct: false },
    ],
    explanation: '"Goalkeeper" = thủ môn, người bảo vệ khung thành. "Striker" = tiền đạo, "midfielder" = tiền vệ.',
  },
  {
    content: 'The Olympic Games are held every ______ years.',
    options: [
      { key: 'A', content: 'two', correct: false },
      { key: 'B', content: 'three', correct: false },
      { key: 'C', content: 'four', correct: true },
      { key: 'D', content: 'five', correct: false },
    ],
    explanation: 'Thế vận hội Olympic được tổ chức 4 năm một lần (every four years).',
  },
  // --- Topic: Music ---
  {
    content: 'A person who writes music is called a ______.',
    options: [
      { key: 'A', content: 'singer', correct: false },
      { key: 'B', content: 'composer', correct: true },
      { key: 'C', content: 'conductor', correct: false },
      { key: 'D', content: 'musician', correct: false },
    ],
    explanation: '"Composer" = nhạc sĩ sáng tác. "Singer" = ca sĩ, "conductor" = nhạc trưởng, "musician" = nhạc công.',
  },
  // --- Topic: Science ---
  {
    content: 'Water boils at ______ degrees Celsius at sea level.',
    options: [
      { key: 'A', content: '50', correct: false },
      { key: 'B', content: '80', correct: false },
      { key: 'C', content: '100', correct: true },
      { key: 'D', content: '120', correct: false },
    ],
    explanation: 'Nước sôi ở 100 độ Celsius ở mực nước biển. Đây là kiến thức khoa học cơ bản.',
  },
  {
    content: 'The closest star to Earth is ______.',
    options: [
      { key: 'A', content: 'the Moon', correct: false },
      { key: 'B', content: 'Mars', correct: false },
      { key: 'C', content: 'the Sun', correct: true },
      { key: 'D', content: 'Venus', correct: false },
    ],
    explanation: 'Ngôi sao gần Trái Đất nhất là Mặt Trời (the Sun). Mặt Trăng (Moon) không phải ngôi sao mà là vệ tinh.',
  },
  // --- Miscellaneous Grammar ---
  {
    content: 'There ______ a lot of students in the classroom.',
    options: [
      { key: 'A', content: 'is', correct: false },
      { key: 'B', content: 'are', correct: true },
      { key: 'C', content: 'was', correct: false },
      { key: 'D', content: 'be', correct: false },
    ],
    explanation: '"There are" dùng với danh từ số nhiều (students). "There is" dùng với danh từ số ít.',
  },
  {
    content: 'Neither Tom ______ Jerry was at the party.',
    options: [
      { key: 'A', content: 'or', correct: false },
      { key: 'B', content: 'nor', correct: true },
      { key: 'C', content: 'and', correct: false },
      { key: 'D', content: 'but', correct: false },
    ],
    explanation: '"Neither...nor..." = không...cũng không... Cặp liên từ cố định: neither + nor.',
  },
  {
    content: 'Both Tom ______ Jerry like pizza.',
    options: [
      { key: 'A', content: 'nor', correct: false },
      { key: 'B', content: 'or', correct: false },
      { key: 'C', content: 'and', correct: true },
      { key: 'D', content: 'but', correct: false },
    ],
    explanation: '"Both...and..." = cả...và... Cặp liên từ cố định: both + and.',
  },
  {
    content: 'I\'d rather ______ at home than go out tonight.',
    options: [
      { key: 'A', content: 'staying', correct: false },
      { key: 'B', content: 'to stay', correct: false },
      { key: 'C', content: 'stay', correct: true },
      { key: 'D', content: 'stayed', correct: false },
    ],
    explanation: '"Would rather + V nguyên thể (không to)" = thích làm gì hơn. "I\'d rather stay".',
  },
  {
    content: 'He spent two hours ______ the project.',
    options: [
      { key: 'A', content: 'to complete', correct: false },
      { key: 'B', content: 'complete', correct: false },
      { key: 'C', content: 'completing', correct: true },
      { key: 'D', content: 'completed', correct: false },
    ],
    explanation: '"Spend + time + V-ing" = bỏ ra thời gian để làm gì. "Spent two hours completing".',
  },
];

async function main() {
  const admin = await p.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) { console.error('No admin user found'); return; }

  const existing = await p.question.findMany({
    where: { subjectId: 'sub-anh', gradeId: 'grade-7' },
    select: { content: true },
  });
  const existingSet = new Set(existing.map(q => q.content.toLowerCase().trim()));

  let added = 0;
  for (const q of QUESTIONS) {
    const key = q.content.toLowerCase().trim();
    if (existingSet.has(key)) continue;
    await p.question.create({
      data: {
        content: q.content,
        explanation: q.explanation,
        subjectId: 'sub-anh',
        gradeId: 'grade-7',
        difficulty: 'MEDIUM',
        questionType: 'MULTIPLE_CHOICE',
        status: 'ACTIVE',
        createdById: admin.id,
        options: {
          create: q.options.map((o, i) => ({
            optionKey: o.key,
            content: o.content,
            isCorrect: o.correct,
            sortOrder: i,
          })),
        },
      },
    });
    existingSet.add(key);
    added++;
  }
  console.log(`✅ Đã thêm ${added} câu Tiếng Anh lớp 7.`);
  const total = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  console.log(`📊 Tổng số câu Tiếng Anh lớp 7: ${total}`);
}

main().catch(console.error).finally(() => p.$disconnect());
