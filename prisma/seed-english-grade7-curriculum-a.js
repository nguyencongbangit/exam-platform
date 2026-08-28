// Grade 7 English - Curriculum-based questions (Part A: Units 1-6, ~150 questions)
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const QUESTIONS = [
  // ===================== UNIT 1: MY HOBBIES =====================
  // Vocabulary
  { content: 'Which of the following is a hobby?', opts: [['A','cooking',true],['B','hungry',false],['C','tired',false],['D','early',false]], expl: '"Cooking" (nấu ăn) là một sở thích. Các từ còn lại là tính từ mô tả trạng thái.' },
  { content: '"Collecting stamps" means you ______ stamps as a hobby.', opts: [['A','throw away',false],['B','gather and keep',true],['C','eat',false],['D','draw',false]], expl: '"Collecting" = sưu tập, thu thập và giữ lại. "Collecting stamps" = sưu tập tem.' },
  { content: 'He spends his free time ______ the guitar.', opts: [['A','play',false],['B','to play',false],['C','playing',true],['D','played',false]], expl: '"Spend time + V-ing" là cấu trúc cố định: spend time doing something.' },
  { content: 'Reading books, drawing, and gardening are all examples of ______.', opts: [['A','jobs',false],['B','hobbies',true],['C','subjects',false],['D','sports',false]], expl: 'Đọc sách, vẽ và làm vườn đều là các sở thích (hobbies) phổ biến.' },
  { content: 'She is ______ in painting because it relaxes her.', opts: [['A','bored',false],['B','interested',true],['C','tired',false],['D','worried',false]], expl: '"Interested in + V-ing/noun" = quan tâm đến, thích. "Be interested in painting".' },
  { content: 'What do you ______ in your spare time?', opts: [['A','make',false],['B','take',false],['C','do',true],['D','have',false]], expl: '"What do you do in your spare time?" = Bạn làm gì vào thời gian rảnh? Dùng "do" với hobbies.' },
  // Grammar: gerunds
  { content: 'She enjoys ______ to music after school.', opts: [['A','listen',false],['B','to listen',false],['C','listening',true],['D','listened',false]], expl: '"Enjoy + V-ing": enjoy listening. Không dùng to-infinitive sau enjoy.' },
  { content: 'He hates ______ up early on weekends.', opts: [['A','get',false],['B','to get',false],['C','getting',true],['D','got',false]], expl: '"Hate + V-ing": hate getting. Động từ cảm xúc như hate, love, enjoy, like đi với V-ing.' },
  { content: 'They prefer ______ outdoors to watching TV.', opts: [['A','play',false],['B','to play',false],['C','playing',true],['D','played',false]], expl: '"Prefer + V-ing + to + V-ing": prefer playing outdoors to watching TV.' },
  { content: 'My hobby is ______ model planes.', opts: [['A','make',false],['B','making',true],['C','to make',false],['D','made',false]], expl: 'Sau "be" (is/are) trong câu định nghĩa sở thích, dùng V-ing: "My hobby is making...".' },
  // Grammar: frequency adverbs
  { content: 'She ______ reads books before bedtime.', opts: [['A','always',true],['B','never ever',false],['C','yet',false],['D','already',false]], expl: '"Always" là trạng từ tần suất, đặt trước động từ thường. "She always reads" là đúng ngữ pháp.' },
  { content: 'How ______ do you go swimming?', opts: [['A','many',false],['B','much',false],['C','often',true],['D','long',false]], expl: '"How often" hỏi về tần suất. Trả lời bằng: every day, twice a week, rarely, v.v.' },
  { content: 'I ______ watch TV. I prefer reading.', opts: [['A','always',false],['B','rarely',true],['C','usually',false],['D','often',false]], expl: '"Rarely" = hiếm khi. Câu nói thích đọc hơn xem TV → xem TV hiếm khi (rarely).' },
  // Adjectives for hobbies
  { content: 'Playing video games can be ______ if you play for too long.', opts: [['A','exciting',false],['B','creative',false],['C','tiring',true],['D','relaxing',false]], expl: '"Tiring" = mệt mỏi. Chơi game quá lâu gây mệt mỏi. "Exciting" = hứng thú, "relaxing" = thư giãn.' },
  { content: 'Gardening is a ______ hobby because you can grow your own vegetables.', opts: [['A','boring',false],['B','useful',true],['C','dangerous',false],['D','noisy',false]], expl: '"Useful" = có ích. Trồng rau tự cấp là sở thích hữu ích. Đây là từ phù hợp nhất về ngữ nghĩa.' },

  // ===================== UNIT 2: HEALTH =====================
  // Vocabulary
  { content: 'You should ______ plenty of water every day to stay healthy.', opts: [['A','eat',false],['B','drink',true],['C','breathe',false],['D','smell',false]], expl: '"Drink water" = uống nước. Uống nhiều nước mỗi ngày giúp cơ thể khỏe mạnh.' },
  { content: 'Going to bed early and waking up on time is a ______ habit.', opts: [['A','bad',false],['B','harmful',false],['C','unhealthy',false],['D','good',true]], expl: 'Ngủ sớm, dậy đúng giờ là thói quen TỐT (good habit) cho sức khỏe.' },
  { content: 'You have a ______. You should see a doctor.', opts: [['A','headache',true],['B','head',false],['C','heartache',false],['D','handshake',false]], expl: '"Headache" = đau đầu. Đây là triệu chứng bệnh phổ biến cần khám bác sĩ.' },
  { content: 'Eating too much junk food can make you ______.', opts: [['A','fit',false],['B','strong',false],['C','overweight',true],['D','healthy',false]], expl: '"Overweight" = thừa cân. Ăn quá nhiều đồ ăn nhanh dẫn đến thừa cân.' },
  { content: 'The doctor told him to ______ smoking immediately.', opts: [['A','start',false],['B','continue',false],['C','quit',true],['D','enjoy',false]], expl: '"Quit smoking" = bỏ thuốc lá. Bác sĩ khuyên bỏ thuốc ngay lập tức.' },
  { content: 'She has a ______ and her nose is running.', opts: [['A','toothache',false],['B','cold',true],['C','stomachache',false],['D','backache',false]], expl: '"Have a cold" = bị cảm. "Nose is running" = chảy nước mũi — triệu chứng điển hình của cảm lạnh.' },
  // Grammar: should/shouldn't
  { content: 'You look pale. You ______ rest at home today.', opts: [['A','must not',false],['B','cannot',false],['C','should',true],['D','would',false]], expl: '"Should" = nên (lời khuyên). Trông xanh xao → nên nghỉ ở nhà. "Must not" mang nghĩa cấm đoán mạnh hơn.' },
  { content: 'You ______ eat fast food every day. It\'s bad for you.', opts: [['A','should',false],['B','shouldn\'t',true],['C','must',false],['D','would',false]], expl: '"Shouldn\'t" = không nên. Ăn đồ ăn nhanh mỗi ngày có hại → không nên làm vậy.' },
  { content: 'Students ______ get at least 8 hours of sleep a night.', opts: [['A','should',true],['B','would',false],['C','might not',false],['D','cannot',false]], expl: '"Should" = nên. Học sinh nên ngủ ít nhất 8 tiếng mỗi đêm để đủ sức học tập.' },
  // Grammar: imperatives
  { content: '______ your hands before eating. (WASH)', opts: [['A','Washing',false],['B','Washes',false],['C','Wash',true],['D','To wash',false]], expl: 'Câu mệnh lệnh (imperative) dùng động từ nguyên thể, không "to": "Wash your hands."' },
  { content: '______ too much screen time. It\'s bad for your eyes. (NOT HAVE)', opts: [['A','Not have',false],['B','Don\'t have',true],['C','No having',false],['D','Not having',false]], expl: 'Câu mệnh lệnh phủ định: "Don\'t + V nguyên thể". "Don\'t have too much screen time."' },
  // Comparatives for health
  { content: 'Walking is ______ for your health than sitting all day.', opts: [['A','more better',false],['B','gooder',false],['C','better',true],['D','best',false]], expl: '"Good" có dạng so sánh hơn bất quy tắc: good → better. "Walking is better than sitting."' },
  { content: 'Fruits and vegetables are ______ than processed food.', opts: [['A','more healthier',false],['B','healthier',true],['C','most healthy',false],['D','more healthy',false]], expl: '"Healthy" (2 âm tiết, tận cùng -y) → so sánh hơn: healthier. Không thêm "more" khi đã có -er.' },

  // ===================== UNIT 3: COMMUNITY SERVICE =====================
  // Vocabulary
  { content: 'Students can ______ their community by cleaning up the streets.', opts: [['A','harm',false],['B','help',true],['C','leave',false],['D','ignore',false]], expl: '"Help the community" = giúp đỡ cộng đồng. Dọn dẹp đường phố là một cách đóng góp.' },
  { content: 'A ______ is someone who works for free to help others.', opts: [['A','employer',false],['B','employee',false],['C','volunteer',true],['D','customer',false]], expl: '"Volunteer" = tình nguyện viên, người làm việc tự nguyện không nhận lương.' },
  { content: 'They ______ food to poor families during the flood.', opts: [['A','donated',true],['B','wasted',false],['C','sold',false],['D','bought',false]], expl: '"Donate" = quyên góp, tặng (tiền, đồ vật) cho người cần. "Donated food to poor families".' },
  { content: 'We should ______ our environment by reducing pollution.', opts: [['A','destroy',false],['B','protect',true],['C','ignore',false],['D','pollute',false]], expl: '"Protect the environment" = bảo vệ môi trường. Giảm ô nhiễm là cách bảo vệ môi trường.' },
  { content: 'The school organized a ______ to collect old clothes for homeless people.', opts: [['A','drive',true],['B','trip',false],['C','test',false],['D','race',false]], expl: '"Drive" (trong "charity drive") = chiến dịch quyên góp từ thiện. "A clothes drive" = chiến dịch thu thập quần áo.' },
  // Grammar: past simple (community service events)
  { content: 'Last summer, we ______ at a local orphanage.', opts: [['A','volunteer',false],['B','volunteers',false],['C','volunteered',true],['D','are volunteering',false]], expl: '"Last summer" → Past Simple. "Volunteer" quy tắc → volunteered.' },
  { content: 'The students ______ 500 books to the school library last month.', opts: [['A','donate',false],['B','donated',true],['C','are donating',false],['D','will donate',false]], expl: '"Last month" → Past Simple. "Donate" → donated.' },
  { content: 'Did they ______ any money for the charity event?', opts: [['A','raised',false],['B','raise',true],['C','raising',false],['D','to raise',false]], expl: 'Câu hỏi với "did" → động từ dạng nguyên thể: "Did they raise?" (không phải raised).' },
  // Connectors
  { content: 'She wanted to help, ______ she didn\'t know how.', opts: [['A','so',false],['B','because',false],['C','but',true],['D','and',false]], expl: '"But" nối hai ý trái chiều: muốn giúp nhưng không biết cách. "But" = nhưng.' },
  { content: 'He joined the volunteer group ______ he wanted to make a difference.', opts: [['A','but',false],['B','so',false],['C','because',true],['D','although',false]], expl: '"Because" = bởi vì, diễn tả lý do. Anh gia nhập nhóm vì muốn tạo sự khác biệt.' },

  // ===================== UNIT 4: MUSIC AND ARTS =====================
  // Vocabulary
  { content: 'A person who paints pictures is called a ______.', opts: [['A','sculptor',false],['B','painter',true],['C','musician',false],['D','writer',false]], expl: '"Painter" = họa sĩ (người vẽ tranh). "Sculptor" = nhà điêu khắc, "musician" = nhạc sĩ.' },
  { content: 'The ______ played beautiful music at the concert.', opts: [['A','audience',false],['B','orchestra',true],['C','gallery',false],['D','stage',false]], expl: '"Orchestra" = dàn nhạc giao hưởng. "Audience" = khán giả, "gallery" = phòng trưng bày.' },
  { content: 'Van Gogh is a famous Dutch ______.', opts: [['A','architect',false],['B','poet',false],['C','painter',true],['D','director',false]], expl: 'Van Gogh là danh họa Hà Lan nổi tiếng (painter). Ông có các bức tranh nổi tiếng như "Starry Night".' },
  { content: 'She learned to ______ the piano when she was five years old.', opts: [['A','do',false],['B','make',false],['C','play',true],['D','perform',false]], expl: '"Play + nhạc cụ" (không có "the" trước nhạc cụ trong tiếng Anh Anh, nhưng "play the piano" là đúng).' },
  { content: 'The painting was ______ at the art gallery for three weeks.', opts: [['A','displayed',true],['B','printed',false],['C','written',false],['D','filmed',false]], expl: '"Display" = trưng bày, triển lãm. Tranh được trưng bày (displayed) tại phòng triển lãm.' },
  { content: 'Traditional Vietnamese ______ includes quan ho and ca tru.', opts: [['A','sports',false],['B','music',true],['C','food',false],['D','fashion',false]], expl: 'Quan họ và ca trù là các loại âm nhạc (music) truyền thống của Việt Nam.' },
  // Grammar: present perfect (experiences)
  { content: 'She ______ been to a live concert before.', opts: [['A','has never',true],['B','never has',false],['C','have never',false],['D','is never',false]], expl: '"Has never been" = chưa bao giờ đến. Present Perfect phủ định: has/have + never + V3. "She" → "has".' },
  { content: 'Have you ever ______ a famous painting in real life?', opts: [['A','see',false],['B','saw',false],['C','seen',true],['D','seeing',false]], expl: 'Present Perfect dùng với "ever": Have you ever + V3 (past participle). "See" → "seen".' },
  { content: 'He ______ just finished his artwork.', opts: [['A','have',false],['B','has',true],['C','had',false],['D','is',false]], expl: '"Just" là dấu hiệu của Present Perfect. "He" (số ít) → "has just finished".' },
  // Adjectives for arts
  { content: 'The artwork was so ______ that everyone stopped to look at it.', opts: [['A','ugly',false],['B','dull',false],['C','breathtaking',true],['D','boring',false]], expl: '"Breathtaking" = ấn tượng đến mức nín thở. Mọi người dừng lại nhìn → tác phẩm rất ấn tượng.' },
  { content: 'The music festival attracted thousands of ______ from around the world.', opts: [['A','visitors',true],['B','teachers',false],['C','workers',false],['D','doctors',false]], expl: '"Visitors" = du khách, người đến thăm. Lễ hội âm nhạc thu hút hàng nghìn du khách.' },

  // ===================== UNIT 5: VIETNAMESE FOOD AND DRINK =====================
  // Vocabulary
  { content: 'Pho bo is a Vietnamese ______ made with beef and rice noodles.', opts: [['A','drink',false],['B','dessert',false],['C','soup',true],['D','salad',false]], expl: 'Phở bò là một loại súp (soup) của Việt Nam, được nấu với thịt bò và bánh phở.' },
  { content: 'Rice is the main ______ in Vietnamese meals.', opts: [['A','drink',false],['B','staple food',true],['C','dessert',false],['D','snack',false]], expl: '"Staple food" = lương thực chủ yếu. Cơm (rice) là lương thực chủ yếu trong bữa ăn Việt Nam.' },
  { content: 'Banh mi is a ______ sandwich with various fillings.', opts: [['A','Vietnamese',true],['B','French',false],['C','Chinese',false],['D','Japanese',false]], expl: 'Bánh mì là loại bánh sandwich của Việt Nam (Vietnamese sandwich) nổi tiếng trên thế giới.' },
  { content: 'The soup is too ______. Please add more sugar.', opts: [['A','sweet',false],['B','bland',false],['C','sour',true],['D','salty',false]], expl: '"Sour" = chua. Thêm đường khi thức ăn chua quá → soup bị chua (sour).' },
  { content: 'In Vietnam, people often use ______ to eat noodle dishes.', opts: [['A','forks',false],['B','spoons',false],['C','chopsticks',true],['D','knives',false]], expl: '"Chopsticks" = đũa. Người Việt Nam thường dùng đũa để ăn các món mì, phở.' },
  { content: 'Che is a Vietnamese ______ usually served cold or warm.', opts: [['A','main course',false],['B','appetizer',false],['C','sweet dessert',true],['D','soup',false]], expl: 'Chè là món tráng miệng ngọt (sweet dessert) của Việt Nam, có thể ăn nóng hoặc lạnh.' },
  // Grammar: countable/uncountable nouns
  { content: 'How ______ rice do you eat each day?', opts: [['A','many',false],['B','much',true],['C','few',false],['D','number of',false]], expl: '"Rice" là danh từ không đếm được → dùng "how much". "How many" dùng với danh từ đếm được.' },
  { content: 'There are ______ eggs in the refrigerator.', opts: [['A','much',false],['B','a little',false],['C','some',true],['D','any',false]], expl: '"Some" dùng trong câu khẳng định với cả danh từ đếm được (some eggs) và không đếm được.' },
  { content: 'Is there ______ milk left in the bottle?', opts: [['A','many',false],['B','some',false],['C','any',true],['D','few',false]], expl: '"Any" dùng trong câu hỏi và câu phủ định với danh từ không đếm được: "Is there any milk?"' },
  { content: 'We need to buy ______ vegetables for the soup.', opts: [['A','much',false],['B','a few',true],['C','a little',false],['D','less',false]], expl: '"A few" + danh từ đếm được số nhiều (vegetables). "A little" + danh từ không đếm được.' },
  // Grammar: requests/offers
  { content: '"______ you pass me the salt, please?"', opts: [['A','Will',false],['B','Could',true],['C','Should',false],['D','Must',false]], expl: '"Could you...?" là cách yêu cầu lịch sự nhất khi xin ai đó làm gì. "Will" ít lịch sự hơn.' },
  { content: '"Would you like ______ more tea?"', opts: [['A','some',true],['B','any',false],['C','much',false],['D','many',false]], expl: '"Would you like some...?" là cách mời lịch sự. "Some" dùng khi mời hoặc đề nghị.' },

  // ===================== UNIT 6: THE FIRST UNIVERSITY IN VIET NAM =====================
  // Vocabulary
  { content: 'Van Mieu was built in ______ as the first university in Vietnam.', opts: [['A','1070',true],['B','1975',false],['C','1858',false],['D','1945',false]], expl: 'Văn Miếu – Quốc Tử Giám được xây dựng năm 1070 dưới thời vua Lý Thánh Tông.' },
  { content: 'Students in ancient times had to pass an ______ to enter the university.', opts: [['A','election',false],['B','invitation',false],['C','examination',true],['D','application',false]], expl: '"Examination" = kỳ thi. Thời xưa, học trò phải vượt qua kỳ thi (examination) mới được vào học.' },
  { content: 'The word "scholar" refers to a person who ______.', opts: [['A','sells books',false],['B','studies and is very knowledgeable',true],['C','builds schools',false],['D','writes novels',false]], expl: '"Scholar" = học giả, người có học vấn uyên thâm, nghiên cứu chuyên sâu.' },
  { content: 'In the past, only ______ were allowed to study at Van Mieu.', opts: [['A','women',false],['B','foreigners',false],['C','men',true],['D','children',false]], expl: 'Thời phong kiến, chỉ có đàn ông (men) mới được phép học tại Văn Miếu – Quốc Tử Giám.' },
  { content: 'The ______ stelae at Van Mieu record the names of doctoral graduates.', opts: [['A','stone',true],['B','glass',false],['C','wooden',false],['D','metal',false]], expl: '82 bia đá (stone stelae) tại Văn Miếu ghi tên các tiến sĩ đỗ đạt qua các kỳ thi.' },
  // Grammar: past simple (historical facts)
  { content: 'King Ly Nhan Tong ______ the first examinations at Van Mieu in 1075.', opts: [['A','hold',false],['B','held',true],['C','holds',false],['D','is holding',false]], expl: 'Sự kiện lịch sử năm 1075 → Past Simple. "Hold" → bất quy tắc: held.' },
  { content: 'Many talented men ______ their studies at the university.', opts: [['A','complete',false],['B','completing',false],['C','completed',true],['D','will complete',false]], expl: 'Sự kiện trong quá khứ → Past Simple. "Complete" → completed.' },
  { content: 'The university ______ students from noble and talented families.', opts: [['A','accept',false],['B','accepted',true],['C','accepts',false],['D','will accept',false]], expl: 'Tường thuật lịch sử → Past Simple. "Accept" → accepted.' },
  // Grammar: used to
  { content: 'Students ______ write on bamboo and paper.', opts: [['A','used to',true],['B','use to',false],['C','are used to',false],['D','were used to',false]], expl: '"Used to + V" = đã từng (thói quen/hành động trong quá khứ, nay không còn). "Used to write".' },
  { content: 'There ______ be no modern technology in ancient schools.', opts: [['A','use to',false],['B','used to',true],['C','is used to',false],['D','was used to',false]], expl: '"There used to be..." = đã từng có... Phủ định: "There didn\'t use to be..." hoặc "There used to be no...".' },
  // Wh-questions
  { content: '______ was Van Mieu built?', opts: [['A','Where',false],['B','Who',false],['C','When',true],['D','How',false]], expl: 'Hỏi về thời gian (năm 1070) → "When". "When was Van Mieu built?"' },
  { content: '______ built Van Mieu?', opts: [['A','What',false],['B','When',false],['C','Where',false],['D','Who',true]], expl: 'Hỏi về chủ thể (người xây dựng) → "Who". "Who built Van Mieu?" (Vua Lý Thánh Tông).' },

  // ===================== UNIT 7: TRAFFIC =====================
  // Vocabulary
  { content: 'A ______ controls the flow of traffic at road junctions.', opts: [['A','traffic cone',false],['B','traffic light',true],['C','speed bump',false],['D','road sign',false]], expl: '"Traffic light" = đèn giao thông, điều khiển luồng giao thông tại các ngã tư.' },
  { content: 'Drivers must stop when the traffic light is ______.', opts: [['A','green',false],['B','yellow',false],['C','red',true],['D','blue',false]], expl: 'Đèn đỏ (red) = bắt buộc dừng lại. Đèn xanh = đi, đèn vàng = chuẩn bị dừng.' },
  { content: 'A ______ is used by pedestrians to cross the road safely.', opts: [['A','flyover',false],['B','zebra crossing',true],['C','roundabout',false],['D','pavement',false]], expl: '"Zebra crossing" = vạch qua đường dành cho người đi bộ. "Pavement/sidewalk" = vỉa hè.' },
  { content: 'You should wear a ______ when riding a motorbike.', opts: [['A','cap',false],['B','hat',false],['C','helmet',true],['D','glove',false]], expl: '"Helmet" = mũ bảo hiểm. Bắt buộc đội mũ bảo hiểm khi đi xe máy để an toàn.' },
  { content: 'The ______ on this road is 60 km/h.', opts: [['A','speed limit',true],['B','speed bump',false],['C','speed boat',false],['D','speed lane',false]], expl: '"Speed limit" = giới hạn tốc độ. "Speed bump" = gờ giảm tốc. "Speed limit is 60 km/h".' },
  { content: 'He was fined for running a red ______.', opts: [['A','sign',false],['B','light',true],['C','lane',false],['D','line',false]], expl: '"Running a red light" = vượt đèn đỏ. Đây là vi phạm giao thông bị phạt tiền.' },
  // Grammar: modal verbs (obligation/prohibition)
  { content: 'Cyclists ______ use bike lanes when available.', opts: [['A','would',false],['B','should',true],['C','might',false],['D','could',false]], expl: '"Should" = nên (lời khuyên, quy định không bắt buộc tuyệt đối). Người đi xe đạp nên dùng làn xe đạp.' },
  { content: 'You ______ drink and drive. It\'s illegal and dangerous.', opts: [['A','should',false],['B','must',false],['C','mustn\'t',true],['D','needn\'t',false]], expl: '"Mustn\'t" = không được phép (cấm đoán tuyệt đối). Uống rượu lái xe bị cấm và nguy hiểm.' },
  { content: 'Passengers ______ fasten their seatbelts before the car moves.', opts: [['A','must',true],['B','might',false],['C','could',false],['D','would',false]], expl: '"Must" = phải (nghĩa vụ bắt buộc). Hành khách phải thắt dây an toàn trước khi xe chạy.' },
  // Grammar: because/so (cause-effect)
  { content: 'There was a traffic jam ______ it was rush hour.', opts: [['A','so',false],['B','but',false],['C','because',true],['D','although',false]], expl: '"Because" = bởi vì (nguyên nhân). Ùn tắc giao thông vì đang giờ cao điểm.' },
  { content: 'He left home early ______ he wouldn\'t be late.', opts: [['A','because',false],['B','so that',true],['C','although',false],['D','but',false]], expl: '"So that" = để mà, nhằm mục đích. Anh ra đi sớm để không bị muộn.' },

  // ===================== UNIT 8: FILMS =====================
  // Vocabulary
  { content: 'A film that makes you laugh is called a ______.', opts: [['A','horror film',false],['B','comedy',true],['C','documentary',false],['D','thriller',false]], expl: '"Comedy" = phim hài. "Horror film" = phim kinh dị, "documentary" = phim tài liệu, "thriller" = phim ly kỳ.' },
  { content: 'The ______ directed the film and told actors what to do.', opts: [['A','producer',false],['B','scriptwriter',false],['C','director',true],['D','editor',false]], expl: '"Director" = đạo diễn, người chỉ đạo bộ phim và hướng dẫn diễn viên.' },
  { content: 'We watched a ______ about wild animals in Africa.', opts: [['A','cartoon',false],['B','documentary',true],['C','romantic film',false],['D','action film',false]], expl: '"Documentary" = phim tài liệu. Phim về động vật hoang dã ở châu Phi là phim tài liệu.' },
  { content: 'The ______ of the film included famous actors like Brad Pitt.', opts: [['A','script',false],['B','soundtrack',false],['C','cast',true],['D','plot',false]], expl: '"Cast" = dàn diễn viên. "Script" = kịch bản, "soundtrack" = nhạc phim, "plot" = cốt truyện.' },
  { content: 'I found the film very ______. I fell asleep halfway through.', opts: [['A','exciting',false],['B','thrilling',false],['C','boring',true],['D','amazing',false]], expl: '"Boring" = nhàm chán. Ngủ gật giữa chừng → phim nhàm chán.' },
  // Grammar: adjectives ending -ed/-ing
  { content: 'The film was so ______ that I couldn\'t stop watching.', opts: [['A','interested',false],['B','boring',false],['C','fascinating',true],['D','bored',false]], expl: '"Fascinating" = hấp dẫn (tính từ mô tả vật). "-ing" adjectives describe the thing causing the feeling.' },
  { content: 'She was very ______ by the scary scene in the film.', opts: [['A','frighten',false],['B','frightening',false],['C','frightened',true],['D','frighteningly',false]], expl: '"Frightened" = cảm thấy sợ hãi (tính từ mô tả cảm xúc của người). "-ed" adjectives describe how someone feels.' },
  { content: 'The documentary was very ______. We learned a lot.', opts: [['A','informed',false],['B','informing',false],['C','informative',true],['D','information',false]], expl: '"Informative" = có nhiều thông tin, bổ ích. Đây là tính từ phù hợp nhất để mô tả phim tài liệu.' },
  // Grammar: simple past vs past continuous
  { content: 'We ______ the film when the power went out.', opts: [['A','watched',false],['B','were watching',true],['C','watch',false],['D','had watched',false]], expl: 'Hành động đang diễn ra khi bị gián đoạn → Past Continuous: "were watching". "Went out" = gián đoạn (Past Simple).' },
  { content: 'While she ______ a book, her phone rang.', opts: [['A','read',false],['B','was reading',true],['C','reads',false],['D','had read',false]], expl: '"While + Past Continuous, Past Simple" — hành động đang diễn ra (was reading) bị gián đoạn (rang).' },
  // Giving opinions
  { content: '"In my ______, the film is overrated." means the speaker thinks the film is ______.', opts: [['A','opinion / not as good as people say',true],['B','opinion / excellent',false],['C','view / too cheap',false],['D','feeling / too long',false]], expl: '"In my opinion" = theo ý kiến của tôi. "Overrated" = được đánh giá cao hơn thực tế → phim không hay như người ta nói.' },

  // ===================== UNIT 9: FESTIVALS AROUND THE WORLD =====================
  // Vocabulary
  { content: 'During Diwali, people celebrate by lighting ______ and fireworks.', opts: [['A','candles',true],['B','kites',false],['C','balloons',false],['D','torches',false]], expl: 'Diwali (Lễ hội Ánh sáng Ấn Độ) nổi tiếng với việc thắp nến (candles) và pháo hoa.' },
  { content: 'The Rio Carnival is famous for its colorful ______ and samba dancing.', opts: [['A','food',false],['B','costumes',true],['C','fireworks',false],['D','lanterns',false]], expl: '"Costumes" = trang phục hóa trang. Lễ hội Carnival Rio nổi tiếng với trang phục sặc sỡ và điệu nhảy samba.' },
  { content: 'Tet is celebrated at the beginning of the ______ New Year.', opts: [['A','Western',false],['B','Chinese',false],['C','Lunar',true],['D','Solar',false]], expl: 'Tết Nguyên Đán được tổ chức vào đầu năm Âm lịch (Lunar New Year).' },
  { content: 'At the Mid-Autumn Festival, children carry ______ lanterns.', opts: [['A','paper',true],['B','glass',false],['C','metal',false],['D','plastic',false]], expl: 'Tết Trung Thu, trẻ em rước đèn lồng bằng giấy (paper lanterns).' },
  { content: 'People in Thailand ______ water at each other during Songkran Festival.', opts: [['A','throw',true],['B','drink',false],['C','sell',false],['D','cook',false]], expl: 'Lễ hội Songkran ở Thái Lan nổi tiếng với việc té nước (throw water) vào nhau để cầu may mắn.' },
  // Grammar: present simple (customs/traditions)
  { content: 'During Tet, Vietnamese people ______ their houses and buy new clothes.', opts: [['A','cleaned',false],['B','are cleaning',false],['C','clean',true],['D','will cleaning',false]], expl: 'Phong tục tập quán dùng Present Simple (sự thật luôn đúng). "People clean their houses during Tet".' },
  { content: 'The festival ______ place every year in the third lunar month.', opts: [['A','is taking',false],['B','took',false],['C','takes',true],['D','take',false]], expl: 'Sự kiện định kỳ lặp lại → Present Simple. "The festival takes place every year".' },
  // Grammar: comparative (festivals)
  { content: 'The Summer Festival is ______ the Winter Festival in terms of visitors.', opts: [['A','more popular than',true],['B','more popular from',false],['C','most popular',false],['D','popular than',false]], expl: 'So sánh hơn với tính từ dài: "more popular than". "Than" là giới từ bắt buộc trong so sánh hơn.' },
  // Describing festivals
  { content: 'The festival ______ many tourists from all over the world every year.', opts: [['A','attracts',true],['B','builds',false],['C','makes',false],['D','grows',false]], expl: '"Attract tourists" = thu hút du khách. Đây là cụm từ tự nhiên khi nói về lễ hội và du lịch.' },
  { content: 'Lantern Festival is ______ on the 15th day of the first lunar month.', opts: [['A','celebrated',true],['B','built',false],['C','made',false],['D','opened',false]], expl: '"Celebrate a festival" = tổ chức/ăn mừng lễ hội. Bị động: "is celebrated on...".' },

  // ===================== UNIT 10: SOURCES OF ENERGY =====================
  // Vocabulary
  { content: 'Solar panels convert ______ energy into electricity.', opts: [['A','wind',false],['B','water',false],['C','solar/sun',true],['D','nuclear',false]], expl: 'Pin mặt trời (solar panels) chuyển đổi năng lượng mặt trời (solar/sun energy) thành điện.' },
  { content: 'Coal, oil, and natural gas are called ______ fuels.', opts: [['A','renewable',false],['B','solar',false],['C','fossil',true],['D','nuclear',false]], expl: '"Fossil fuels" = nhiên liệu hóa thạch. Than đá, dầu mỏ và khí tự nhiên là nhiên liệu hóa thạch.' },
  { content: 'Wind turbines use ______ energy to generate electricity.', opts: [['A','solar',false],['B','wind',true],['C','water',false],['D','thermal',false]], expl: 'Tuabin gió (wind turbines) sử dụng năng lượng gió (wind energy) để tạo ra điện.' },
  { content: 'We should use ______ energy sources like solar and wind instead of coal.', opts: [['A','non-renewable',false],['B','fossil',false],['C','renewable',true],['D','nuclear',false]], expl: '"Renewable energy" = năng lượng tái tạo (gió, mặt trời) không cạn kiệt, thân thiện môi trường.' },
  { content: 'Burning fossil fuels releases harmful ______ into the atmosphere.', opts: [['A','gases',true],['B','water',false],['C','soil',false],['D','plants',false]], expl: 'Đốt nhiên liệu hóa thạch thải ra các khí độc hại (harmful gases) vào khí quyển, gây ô nhiễm.' },
  { content: 'A ______ dam uses the power of falling water to produce electricity.', opts: [['A','solar',false],['B','wind',false],['C','hydroelectric',true],['D','nuclear',false]], expl: '"Hydroelectric dam" = đập thủy điện. "Hydro" = nước, "electric" = điện.' },
  // Grammar: should/must (environment)
  { content: 'We ______ turn off lights when we leave a room to save energy.', opts: [['A','would',false],['B','should',true],['C','might',false],['D','used to',false]], expl: '"Should" = nên. Đây là lời khuyên về tiết kiệm năng lượng.' },
  { content: 'Factories ______ release toxic waste into rivers.', opts: [['A','should',false],['B','can',false],['C','must',false],['D','must not',true]], expl: '"Must not" = không được phép (cấm). Nhà máy bị cấm thải chất độc ra sông.' },
  // Grammar: if (conditional type 1 - energy)
  { content: 'If we don\'t save energy now, we ______ face serious problems in the future.', opts: [['A','will',true],['B','would',false],['C','can',false],['D','should',false]], expl: 'Điều kiện loại 1 (có thể xảy ra): mệnh đề if + Present Simple, mệnh đề chính + will. "Will face".' },
  { content: 'If everyone ______ solar panels, electricity bills would decrease.', opts: [['A','use',false],['B','uses',false],['C','used',true],['D','will use',false]], expl: 'Điều kiện loại 2 (giả định): If + Past Simple, would + V. "If everyone used solar panels...".' },

  // ===================== UNIT 11: TRAVELLING IN THE FUTURE =====================
  // Vocabulary
  { content: 'A ______ is a vehicle that can travel both on land and in water.', opts: [['A','helicopter',false],['B','hovercraft',true],['C','submarine',false],['D','cable car',false]], expl: '"Hovercraft" = tàu đệm khí, có thể chạy trên cả mặt đất và mặt nước.' },
  { content: 'In the future, people may travel to space as ______.', opts: [['A','sailors',false],['B','passengers',false],['C','space tourists',true],['D','pilots',false]], expl: '"Space tourists" = khách du lịch vũ trụ. Du lịch vũ trụ là xu hướng trong tương lai.' },
  { content: 'Self-driving cars can ______ without a human driver.', opts: [['A','fly',false],['B','operate',true],['C','sink',false],['D','disappear',false]], expl: '"Operate" = vận hành, hoạt động. Xe tự lái có thể vận hành mà không cần tài xế.' },
  { content: 'A ______ train uses magnetic force to move very fast.', opts: [['A','steam',false],['B','diesel',false],['C','maglev',true],['D','electric',false]], expl: '"Maglev train" = tàu đệm từ (magnetic levitation). Đây là công nghệ tàu cao tốc hiện đại nhất.' },
  // Grammar: will/going to (predictions)
  { content: 'Scientists predict that robots ______ do most household chores by 2050.', opts: [['A','are going to',false],['B','will',true],['C','would',false],['D','shall',false]], expl: '"Will" dùng để dự đoán về tương lai dựa trên ý kiến. "Scientists predict that..." → will.' },
  { content: 'Look at the weather forecast. It ______ be sunny tomorrow.', opts: [['A','will',false],['B','is going to',true],['C','would',false],['D','shall',false]], expl: '"Is going to" dùng khi có bằng chứng (dự báo thời tiết = evidence). "Is going to be sunny".' },
  // Grammar: future time expressions
  { content: 'Electric cars will become more popular ______ the next decade.', opts: [['A','at',false],['B','on',false],['C','in',true],['D','by',false]], expl: '"In + khoảng thời gian tương lai": "in the next decade" = trong thập kỷ tới.' },
  { content: 'The new subway line will open ______ 2025.', opts: [['A','at',false],['B','in',false],['C','on',false],['D','by',true]], expl: '"By + thời điểm" = vào lúc (chậm nhất là). "By 2025" = vào năm 2025 (hoặc trước đó).' },
  // Modal: might/may
  { content: 'In the future, people ______ live on Mars.', opts: [['A','must',false],['B','should',false],['C','might',true],['D','had better',false]], expl: '"Might" = có thể (khả năng không chắc chắn). Sống trên sao Hỏa là khả năng trong tương lai xa.' },

  // ===================== UNIT 12: AN OVERCROWDED WORLD =====================
  // Vocabulary
  { content: 'The world\'s ______ is growing rapidly, especially in developing countries.', opts: [['A','temperature',false],['B','pollution',false],['C','population',true],['D','economy',false]], expl: '"Population" = dân số. Dân số thế giới đang tăng nhanh, đặc biệt ở các nước đang phát triển.' },
  { content: 'When too many people live in cities, it causes ______.', opts: [['A','underpopulation',false],['B','overcrowding',true],['C','emptiness',false],['D','silence',false]], expl: '"Overcrowding" = tình trạng quá đông đúc. Quá nhiều người ở thành phố dẫn đến quá tải.' },
  { content: 'Moving from the countryside to the city is called rural-______ migration.', opts: [['A','city',false],['B','suburban',false],['C','urban',true],['D','coastal',false]], expl: '"Rural-urban migration" = di dân từ nông thôn ra thành thị. "Urban" = thuộc về đô thị.' },
  { content: 'Overcrowded cities often face problems like traffic jams, ______, and housing shortages.', opts: [['A','festivals',false],['B','pollution',true],['C','tourism',false],['D','education',false]], expl: 'Thành phố đông đúc thường đối mặt với: ùn tắc, ô nhiễm (pollution) và thiếu nhà ở.' },
  // Grammar: comparatives/superlatives (world facts)
  { content: 'Tokyo is one of the ______ cities in the world.', opts: [['A','most populated',true],['B','more populated',false],['C','most populate',false],['D','populatest',false]], expl: '"One of the + most + adjective" (superlative). "Most populated" = đông dân nhất.' },
  { content: 'Life in the countryside is ______ stressful than in big cities.', opts: [['A','less',true],['B','more',false],['C','most',false],['D','least',false]], expl: '"Less + adjective + than" = ít...hơn. Cuộc sống nông thôn ít căng thẳng hơn thành thị.' },
  // Grammar: present perfect (changes)
  { content: 'The city\'s population ______ dramatically over the past 20 years.', opts: [['A','grew',false],['B','has grown',true],['C','grows',false],['D','is growing',false]], expl: '"Over the past 20 years" → Present Perfect vì liên quan đến hiện tại. "Has grown" = đã tăng.' },
  { content: 'Many people ______ from rural areas to cities since 2000.', opts: [['A','moved',false],['B','move',false],['C','have moved',true],['D','are moving',false]], expl: '"Since 2000" → Present Perfect. "Have moved" = đã chuyển đến (và kết quả còn đến hiện tại).' },
  // Problem-solution
  { content: 'One solution to overcrowding in cities is to ______ development in rural areas.', opts: [['A','stop',false],['B','encourage',true],['C','ignore',false],['D','slow down',false]], expl: 'Khuyến khích (encourage) phát triển nông thôn là giải pháp giảm tải cho thành thị.' },
  { content: 'Building more ______ can help reduce traffic congestion in cities.', opts: [['A','restaurants',false],['B','public transport systems',true],['C','factories',false],['D','markets',false]], expl: 'Xây dựng hệ thống giao thông công cộng (public transport systems) giúp giảm ùn tắc giao thông.' },

  // ===================== MIXED GRAMMAR REVIEW =====================
  { content: 'Neither of the students ______ the answer.', opts: [['A','know',false],['B','knows',true],['C','have known',false],['D','knowing',false]], expl: '"Neither of + plural noun" dùng động từ số ÍT. "Neither of the students knows" (không phải know).' },
  { content: 'By the time she arrived, we ______ waiting for an hour.', opts: [['A','had been',true],['B','have been',false],['C','were',false],['D','are',false]], expl: 'Past Perfect Continuous: had been + V-ing — hành động diễn ra liên tục cho đến thời điểm trong quá khứ.' },
  { content: 'The more you practice, ______ you become.', opts: [['A','the better',true],['B','the good',false],['C','better',false],['D','the best',false]], expl: '"The more..., the + comparative" = càng...càng. "The more you practice, the better you become."' },
  { content: 'She\'d rather ______ at home than go out tonight.', opts: [['A','stays',false],['B','staying',false],['C','stayed',false],['D','stay',true]], expl: '"Would rather + V nguyên thể (bare infinitive)": "She\'d rather stay." Không dùng to-infinitive hay V-ing.' },
  { content: 'It\'s no use ______ about the past.', opts: [['A','to worry',false],['B','worry',false],['C','worrying',true],['D','worried',false]], expl: '"It\'s no use + V-ing" = vô ích khi làm gì. "It\'s no use worrying about the past." (cấu trúc cố định).' },
];

async function main() {
  const admin = await p.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) { console.error('No admin found'); return; }

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
        explanation: q.expl,
        subjectId: 'sub-anh',
        gradeId: 'grade-7',
        difficulty: 'MEDIUM',
        questionType: 'MULTIPLE_CHOICE',
        status: 'ACTIVE',
        createdById: admin.id,
        options: {
          create: q.opts.map(([key, content, isCorrect], i) => ({
            optionKey: key,
            content,
            isCorrect,
            sortOrder: i,
          })),
        },
      },
    });
    existingSet.add(key);
    added++;
  }
  console.log(`✅ Đã thêm ${added} câu Tiếng Anh lớp 7 (Part A).`);
  const total = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  console.log(`📊 Tổng: ${total} câu`);
}

main().catch(console.error).finally(() => p.$disconnect());
