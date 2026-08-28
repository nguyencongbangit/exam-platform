// Grade 7 English - Curriculum-based questions (Part B: ~160 questions - deeper grammar & skills)
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const QUESTIONS = [
  // ===================== DEEPER GRAMMAR: TENSES =====================
  { content: 'By 2030, scientists ______ a cure for many diseases.', opts: [['A','will find',false],['B','will have found',true],['C','find',false],['D','found',false]], expl: 'Future Perfect: will have + V3 — hoàn thành trước thời điểm tương lai. "By 2030, scientists will have found...".' },
  { content: 'She ______ for the company for ten years when she retires.', opts: [['A','will work',false],['B','works',false],['C','will have worked',true],['D','is working',false]], expl: 'Future Perfect nhấn mạnh sự hoàn thành: "will have worked for ten years" = đã làm việc đủ 10 năm khi nghỉ hưu.' },
  { content: 'When I ______ home, dinner will be ready.', opts: [['A','will get',false],['B','get',true],['C','got',false],['D','am getting',false]], expl: 'Mệnh đề thời gian (when) → Present Simple, dù nói về tương lai. "When I get home" (không dùng will).' },
  { content: 'After she ______ the book, she returned it to the library.', opts: [['A','reads',false],['B','read',false],['C','had read',true],['D','is reading',false]], expl: 'Past Perfect: hành động xảy ra TRƯỚC trong quá khứ. Đọc xong rồi mới trả → "had read" xảy ra trước "returned".' },
  { content: 'She was tired because she ______ all night.', opts: [['A','studied',false],['B','had been studying',true],['C','has studied',false],['D','studies',false]], expl: 'Past Perfect Continuous: had been + V-ing — hành động diễn ra liên tục trong quá khứ trước khi mệt.' },
  // ===================== UNIT 1 EXTENSION: HOBBIES =====================
  { content: 'He is ______ at playing chess. He wins almost every game.', opts: [['A','bad',false],['B','terrible',false],['C','good',true],['D','interested',false]], expl: '"Be good at + V-ing/noun" = giỏi về. "He is good at playing chess." Cấu trúc cố định trong tiếng Anh.' },
  { content: 'Photography ______ by many people as a creative outlet.', opts: [['A','use',false],['B','is used',true],['C','using',false],['D','uses',false]], expl: 'Câu bị động (passive): be + V3. "Photography is used by many people" = nhiếp ảnh được nhiều người sử dụng.' },
  { content: 'She has ______ reading for years and has a huge book collection.', opts: [['A','love',false],['B','loves',false],['C','loved',true],['D','loving',false]], expl: 'Present Perfect: "has loved" (has + V3). Cô ấy đã yêu thích đọc sách suốt nhiều năm qua.' },
  { content: 'Playing sports outdoors is ______ than staying inside all day.', opts: [['A','more healthy',false],['B','healthier',true],['C','most healthy',false],['D','the healthiest',false]], expl: '"Healthy" → so sánh hơn: healthier. Tính từ 2 âm tiết tận cùng -y: bỏ y, thêm -ier.' },
  { content: 'What ______ you ______ in your free time when you were young?', opts: [['A','do / do',false],['B','did / do',true],['C','were / doing',false],['D','have / done',false]], expl: '"What did you do..." là câu hỏi Past Simple. "When you were young" xác nhận thì quá khứ.' },
  // ===================== UNIT 2 EXTENSION: HEALTH =====================
  { content: 'The doctor recommended ______ more exercise.', opts: [['A','do',false],['B','to do',false],['C','doing',true],['D','done',false]], expl: '"Recommend + V-ing": recommend doing. Không dùng to-infinitive trực tiếp sau recommend.' },
  { content: 'If you ______ enough sleep, you will feel tired during the day.', opts: [['A','get',false],['B','don\'t get',true],['C','got',false],['D','didn\'t get',false]], expl: 'Điều kiện loại 1: If + phủ định Present Simple → will. "If you don\'t get enough sleep, you will feel tired."' },
  { content: 'She has been ______ a headache since this morning.', opts: [['A','have',false],['B','had',false],['C','having',true],['D','has',false]], expl: '"Has been having" = Present Perfect Continuous, diễn tả hành động/trạng thái kéo dài từ quá khứ đến nay.' },
  { content: 'Regular exercise helps to ______ the risk of heart disease.', opts: [['A','increase',false],['B','reduce',true],['C','ignore',false],['D','cause',false]], expl: '"Reduce the risk of" = giảm nguy cơ mắc. Tập thể dục giúp giảm nguy cơ bệnh tim.' },
  { content: 'Which of the following is NOT a healthy habit?', opts: [['A','exercising regularly',false],['B','eating balanced meals',false],['C','skipping breakfast daily',true],['D','sleeping 8 hours',false]], expl: 'Bỏ bữa sáng mỗi ngày là thói quen KHÔNG lành mạnh (unhealthy habit).' },
  // ===================== UNIT 3 EXTENSION: COMMUNITY SERVICE =====================
  { content: 'The charity ______ over $10,000 for flood victims last year.', opts: [['A','raised',true],['B','rose',false],['C','risen',false],['D','arise',false]], expl: '"Raise money" = quyên góp tiền. Past Simple: raised. "Rose" là quá khứ của "rise" (đứng lên).' },
  { content: 'She ______ as a volunteer at the hospital for the past two years.', opts: [['A','works',false],['B','worked',false],['C','has been working',true],['D','had worked',false]], expl: '"For the past two years" → Present Perfect Continuous. "Has been working" = đang làm tình nguyện từ 2 năm trước đến nay.' },
  { content: 'The community clean-up event ______ by the local government.', opts: [['A','organizing',false],['B','organize',false],['C','was organized',true],['D','organized',false]], expl: 'Bị động Past Simple: was/were + V3. "Was organized by the local government." = được tổ chức bởi...' },
  { content: 'It\'s important ______ elderly people in the community.', opts: [['A','helping',false],['B','to help',true],['C','help',false],['D','helped',false]], expl: '"It\'s important + to-infinitive": It\'s important to help. Cấu trúc "it is + adj + to V".' },
  { content: 'Everyone should ______ responsibility for keeping the environment clean.', opts: [['A','do',false],['B','take',true],['C','make',false],['D','bring',false]], expl: '"Take responsibility" = chịu trách nhiệm. Cụm từ cố định: take responsibility for something.' },
  // ===================== UNIT 4 EXTENSION: MUSIC & ARTS =====================
  { content: 'The painting ______ by a famous 18th-century artist.', opts: [['A','created',false],['B','was created',true],['C','creates',false],['D','creating',false]], expl: 'Bị động Past Simple: was + V3. "Was created by an artist" = được tạo ra bởi nghệ sĩ.' },
  { content: 'She has ______ guitar lessons for three months and is improving fast.', opts: [['A','take',false],['B','taking',false],['C','taken',true],['D','took',false]], expl: '"Has taken" = Present Perfect (V3 của take = taken). Cô đã tham gia 3 tháng và đang tiến bộ nhanh.' },
  { content: 'The ______ of traditional music is essential for preserving cultural identity.', opts: [['A','destroy',false],['B','ignore',false],['C','preservation',true],['D','performing',false]], expl: '"Preservation" = sự bảo tồn. "Preserve" → danh từ: preservation. Bảo tồn âm nhạc truyền thống quan trọng cho bản sắc văn hóa.' },
  { content: 'Many Vietnamese ______ instruments are made from bamboo.', opts: [['A','musical',true],['B','music',false],['C','musician',false],['D','musically',false]], expl: '"Musical instruments" = nhạc cụ. "Musical" là tính từ bổ nghĩa cho danh từ "instruments".' },
  { content: 'He practices the violin ______ every day to improve his skills.', opts: [['A','diligence',false],['B','diligent',false],['C','diligently',true],['D','diligently',false]], expl: '"Diligently" = chăm chỉ (trạng từ). Trạng từ bổ nghĩa cho động từ "practices". Diligent (adj) → diligently (adv).' },
  // ===================== UNIT 5 EXTENSION: FOOD & DRINK =====================
  { content: 'Pho is ______ as one of the world\'s greatest dishes.', opts: [['A','considered',true],['B','considering',false],['C','consider',false],['D','considers',false]], expl: 'Bị động Present Simple: is + V3. "Is considered as" = được coi là. Cấu trúc bị động thụ động.' },
  { content: 'Vietnamese people ______ a lot of fresh herbs in their cooking.', opts: [['A','use',true],['B','using',false],['C','used',false],['D','uses',false]], expl: 'Sự thật chung về văn hóa ẩm thực → Present Simple. "Vietnamese people use" (số nhiều, không thêm -s).' },
  { content: 'The chef ______ the vegetables into small pieces before cooking.', opts: [['A','cuts',true],['B','cut',false],['C','cutting',false],['D','is cuts',false]], expl: 'Mô tả quá trình nấu ăn → Present Simple. "The chef cuts" (số ít → thêm -s).' },
  { content: 'There is ______ sugar in this coffee. It\'s very sweet.', opts: [['A','many',false],['B','few',false],['C','a lot of',true],['D','several',false]], expl: '"A lot of" dùng với cả danh từ đếm được và không đếm được, trong câu khẳng định. "Sugar" = không đếm được.' },
  { content: 'Could I have ______ more water, please?', opts: [['A','any',false],['B','much',false],['C','some',true],['D','few',false]], expl: '"Some" dùng khi đề nghị hoặc yêu cầu lịch sự (requests/offers). "Could I have some more water?"' },
  // ===================== UNIT 6 EXTENSION: VAN MIEU =====================
  { content: 'Van Mieu ______ by the government as a historic site.', opts: [['A','protects',false],['B','is protected',true],['C','protecting',false],['D','protected',false]], expl: 'Bị động Present Simple: is + V3. Văn Miếu "is protected" (được bảo tồn) bởi chính phủ.' },
  { content: 'The examinations at Van Mieu ______ every three years.', opts: [['A','holds',false],['B','held',false],['C','were held',true],['D','are held',false]], expl: 'Sự kiện trong lịch sử: Past Simple bị động. "Examinations were held every three years."' },
  { content: 'Confucius is ______ as the most important philosopher in East Asia.', opts: [['A','regard',false],['B','regarded',true],['C','regards',false],['D','regarding',false]], expl: '"Be regarded as" = được coi là. Bị động: "is regarded as the most important philosopher."' },
  { content: 'Students ______ many years preparing for the royal examinations.', opts: [['A','spent',true],['B','spend',false],['C','had spend',false],['D','spending',false]], expl: '"Spend time + V-ing": spent many years preparing. Quá khứ của "spend" = spent.' },
  { content: 'The stone stelae at Van Mieu ______ the names of over 1,000 graduates.', opts: [['A','record',true],['B','records',false],['C','recording',false],['D','recorded',false]], expl: 'Sự thật hiện tại → Present Simple. "Stelae" (số nhiều) → động từ số nhiều: "record" (không có -s).' },
  // ===================== UNIT 7 EXTENSION: TRAFFIC =====================
  { content: 'If drivers ______ the speed limit, accidents would decrease.', opts: [['A','follow',false],['B','followed',true],['C','have followed',false],['D','will follow',false]], expl: 'Điều kiện loại 2 (giả định, chưa chắc xảy ra): If + Past Simple, would + V. "If drivers followed...".' },
  { content: 'The traffic accident ______ by a drunk driver.', opts: [['A','caused',false],['B','was caused',true],['C','cause',false],['D','is causing',false]], expl: 'Bị động Past Simple: was + V3. "Was caused by a drunk driver" = bị gây ra bởi tài xế say rượu.' },
  { content: 'Cycling to school not only saves money but ______ keeps you fit.', opts: [['A','either',false],['B','also',true],['C','nor',false],['D','or',false]], expl: '"Not only...but also..." = không chỉ...mà còn. Cặp liên từ cố định trong tiếng Anh.' },
  { content: 'There ______ more electric vehicles on the road in the near future.', opts: [['A','will be',true],['B','are',false],['C','were',false],['D','have been',false]], expl: '"Will be" = dự đoán về tương lai. "There will be" = sẽ có. "In the near future" xác nhận thì tương lai.' },
  { content: 'How long ______ it take to get from Hanoi to Ho Chi Minh City by train?', opts: [['A','is',false],['B','does',true],['C','was',false],['D','do',false]], expl: '"How long does it take?" là câu hỏi về thời gian di chuyển với Present Simple. Dùng "does" (số ít).' },
  // ===================== UNIT 8 EXTENSION: FILMS =====================
  { content: 'The film ______ for Best Picture at the Academy Awards.', opts: [['A','nominated',false],['B','was nominated',true],['C','is nominating',false],['D','nominates',false]], expl: 'Bị động Past Simple: was + V3. "Was nominated for Best Picture" = được đề cử giải Phim hay nhất.' },
  { content: '"I ______ the film three times," he said. "It never gets boring."', opts: [['A','saw',false],['B','have seen',true],['C','see',false],['D','was seeing',false]], expl: 'Present Perfect diễn tả kinh nghiệm trong cuộc đời (không xác định thời điểm cụ thể). "Have seen" là đúng.' },
  { content: 'The special effects in the film were incredibly ______.', opts: [['A','realistic',true],['B','reality',false],['C','realize',false],['D','really',false]], expl: '"Realistic" (tính từ) = chân thực, giống thật. Bổ nghĩa cho danh từ "special effects". "Reality" = danh từ.' },
  { content: 'Would you recommend ______ this film to your friends?', opts: [['A','watch',false],['B','to watch',false],['C','watching',true],['D','watched',false]], expl: '"Recommend + V-ing": recommend watching. "Would you recommend watching this film?"' },
  { content: 'The ______ in the film was confusing because it jumped between past and present.', opts: [['A','cast',false],['B','soundtrack',false],['C','plot',true],['D','trailer',false]], expl: '"Plot" = cốt truyện. Cốt truyện khó hiểu vì đan xen quá khứ và hiện tại.' },
  // ===================== UNIT 9 EXTENSION: FESTIVALS =====================
  { content: 'The festival has ______ every year since 1985.', opts: [['A','held',false],['B','been held',true],['C','hold',false],['D','holding',false]], expl: 'Present Perfect bị động: has been + V3. "Has been held since 1985" = được tổ chức từ năm 1985.' },
  { content: 'During the Harvest Festival, farmers give ______ to the gods for a good crop.', opts: [['A','thanks',true],['B','money',false],['C','food',false],['D','songs',false]], expl: '"Give thanks" = tạ ơn, bày tỏ lòng biết ơn. "Give thanks to the gods" = tạ ơn thần linh.' },
  { content: 'The Mid-Autumn Festival is ______ important in Vietnam, China, and Korea.', opts: [['A','equal',false],['B','equally',true],['C','equality',false],['D','equalize',false]], expl: '"Equally important" = quan trọng như nhau. "Equally" (trạng từ) bổ nghĩa cho tính từ "important".' },
  { content: 'People ______ traditional foods during the festival for hundreds of years.', opts: [['A','are eating',false],['B','have been eating',true],['C','eat',false],['D','will eat',false]], expl: 'Present Perfect Continuous: have been + V-ing — thói quen kéo dài từ quá khứ đến nay (for hundreds of years).' },
  { content: 'What ______ the festival famous around the world?', opts: [['A','make',false],['B','made',false],['C','makes',true],['D','making',false]], expl: '"What makes...?" = Điều gì làm cho...? Present Simple với "what" là chủ ngữ số ít → "makes".' },
  // ===================== UNIT 10 EXTENSION: ENERGY =====================
  { content: 'Solar energy is considered ______ because it doesn\'t produce pollution.', opts: [['A','clean',true],['B','dirty',false],['C','expensive',false],['D','weak',false]], expl: '"Clean energy" = năng lượng sạch. Năng lượng mặt trời không gây ô nhiễm → được coi là năng lượng sạch.' },
  { content: 'If we ______ using fossil fuels, we will worsen climate change.', opts: [['A','stop',false],['B','continue',true],['C','reducing',false],['D','limited',false]], expl: 'Điều kiện loại 1: If + Present Simple, will. "If we continue using fossil fuels, we will worsen..." (tiếp tục dùng → hậu quả).' },
  { content: 'The government ______ to invest in renewable energy sources next year.', opts: [['A','plans',true],['B','plan',false],['C','planning',false],['D','planned',false]], expl: '"The government" (số ít) → "plans". Present Simple diễn tả kế hoạch chính thức. "Plans to invest".' },
  { content: 'Energy ______ at home can be reduced by using LED bulbs.', opts: [['A','consume',false],['B','consuming',false],['C','consumption',true],['D','consumer',false]], expl: '"Energy consumption" = mức tiêu thụ năng lượng. "Consumption" là danh từ, đứng sau "energy".' },
  { content: 'Hydroelectric power stations are built near ______.', opts: [['A','deserts',false],['B','rivers or dams',true],['C','airports',false],['D','cities',false]], expl: 'Nhà máy thủy điện (hydroelectric power stations) được xây gần sông hoặc đập nước (rivers or dams).' },
  // ===================== UNIT 11 EXTENSION: FUTURE TRAVEL =====================
  { content: 'Scientists believe that flying cars ______ a reality within 20 years.', opts: [['A','become',false],['B','will become',true],['C','became',false],['D','are becoming',false]], expl: '"Will become" = sẽ trở thành. Dự đoán tương lai dựa trên ý kiến của các nhà khoa học.' },
  { content: 'Hyperloop trains can travel ______ the speed of sound.', opts: [['A','at near',true],['B','by',false],['C','with',false],['D','into',false]], expl: '"At near the speed of sound" = gần bằng tốc độ âm thanh. Hyperloop là công nghệ tàu siêu tốc.' },
  { content: 'Electric vehicles produce ______ carbon emissions than petrol cars.', opts: [['A','more',false],['B','fewer',true],['C','much',false],['D','most',false]], expl: '"Fewer" + danh từ đếm được số nhiều (emissions). So sánh hơn phủ định: fewer than.' },
  { content: 'In the future, robots ______ most of the dangerous jobs currently done by humans.', opts: [['A','do',false],['B','will be doing',true],['C','are doing',false],['D','did',false]], expl: '"Will be doing" = Future Continuous — hành động đang diễn ra tại thời điểm trong tương lai.' },
  { content: 'Space tourism ______ only available to the very rich at first.', opts: [['A','be',false],['B','is',false],['C','will be',true],['D','was',false]], expl: '"Will be" = dự đoán về tương lai. Du lịch vũ trụ ban đầu sẽ chỉ dành cho người rất giàu.' },
  // ===================== UNIT 12 EXTENSION: OVERCROWDED WORLD =====================
  { content: 'Urbanization ______ rapidly in Southeast Asia over the last 30 years.', opts: [['A','increased',false],['B','has increased',true],['C','increases',false],['D','was increasing',false]], expl: '"Over the last 30 years" → Present Perfect. "Has increased" = đã tăng (còn liên quan đến hiện tại).' },
  { content: 'The government is building more affordable housing ______ homeless people.', opts: [['A','to',false],['B','for',true],['C','with',false],['D','at',false]], expl: '"Build housing for somebody" = xây nhà cho ai. "For homeless people" = cho người vô gia cư.' },
  { content: 'If the population ______ to grow, resources will run out.', opts: [['A','continues',true],['B','continue',false],['C','continued',false],['D','continuing',false]], expl: 'Điều kiện loại 1: If + Present Simple (continues), will + V. "If the population continues to grow...".' },
  { content: 'People ______ to cities because they offer more job opportunities.', opts: [['A','moved',false],['B','are moving',true],['C','move',false],['D','will moved',false]], expl: 'Xu hướng đang diễn ra hiện nay → Present Continuous. "Are moving to cities" = đang di chuyển.' },
  { content: 'One way to reduce overcrowding is ______ new cities outside major urban areas.', opts: [['A','build',false],['B','building',false],['C','to build',true],['D','built',false]], expl: '"One way is + to-infinitive": "One way to reduce overcrowding is to build new cities." Cấu trúc: is to do something.' },

  // ===================== READING SKILLS (SHORT PASSAGES) =====================
  { content: 'Read: "Nam loves playing football. He trains every evening after school and dreams of becoming a professional player." → What does Nam want to be?', opts: [['A','A teacher',false],['B','A professional footballer',true],['C','A coach',false],['D','A sports journalist',false]], expl: 'Bài đọc: "dreams of becoming a professional player" → Nam mơ ước trở thành cầu thủ chuyên nghiệp.' },
  { content: 'Read: "The Mekong Delta produces about 50% of Vietnam\'s total food output. Rice is the main crop." → The Mekong Delta is important for Vietnam\'s ______.', opts: [['A','industry',false],['B','tourism',false],['C','food production',true],['D','transportation',false]], expl: '"Produces 50% of Vietnam\'s total food output" → Đồng bằng sông Cửu Long quan trọng về sản xuất lương thực.' },
  { content: 'Read: "Unlike her sister who loves outdoor activities, Lan prefers staying indoors and reading books." → What does Lan enjoy doing?', opts: [['A','Playing sports outside',false],['B','Going on trips',false],['C','Reading indoors',true],['D','Watching films',false]], expl: '"Prefers staying indoors and reading books" → Lan thích ở trong nhà và đọc sách.' },
  { content: 'Read: "The number of electric cars sold in Vietnam increased by 300% last year. Experts predict this trend will continue." → What do experts expect about electric cars?', opts: [['A','They will become less popular',false],['B','Their growth will stop',false],['C','They will continue to increase',true],['D','They will be banned',false]], expl: '"Experts predict this trend will continue" = chuyên gia dự đoán xu hướng này sẽ tiếp tục.' },
  { content: 'Read: "Hoi An is famous for its well-preserved ancient town, beautiful lanterns, and delicious food. Tourists come from all over the world to visit." → Why do tourists visit Hoi An?', opts: [['A','For its modern buildings',false],['B','For its ancient town, lanterns, and food',true],['C','For its beaches only',false],['D','For its theme parks',false]], expl: 'Bài đọc: "famous for its well-preserved ancient town, beautiful lanterns, and delicious food" = lý do thu hút du khách.' },

  // ===================== WRITING SKILLS: SENTENCE STRUCTURE =====================
  { content: 'Choose the correctly written sentence:', opts: [['A','She don\'t like coffee.',false],['B','She doesn\'t likes coffee.',false],['C','She doesn\'t like coffee.',true],['D','She not like coffee.',false]], expl: '"Doesn\'t + V nguyên thể" (không phải "doesn\'t likes"). Phủ định Present Simple ngôi 3 số ít: doesn\'t + V.' },
  { content: 'Choose the correctly written sentence:', opts: [['A','Did she went to school yesterday?',false],['B','Did she goes to school yesterday?',false],['C','Did she go to school yesterday?',true],['D','Did she gone to school yesterday?',false]], expl: '"Did + V nguyên thể" (không thêm -s, -ed, -ing). "Did she go?" là đúng.' },
  { content: 'Choose the correctly written sentence:', opts: [['A','He has never seen a live concert never.',false],['B','He has never seen a live concert.',true],['C','He never has seen a live concert.',false],['D','He never had seen a live concert.',false]], expl: 'Present Perfect với "never": has + never + V3. "He has never seen a live concert." Không lặp "never" hai lần.' },
  { content: 'Choose the sentence that contains an error:', opts: [['A','The more she studies, the smarter she becomes.',false],['B','Neither Tom nor Jerry like pizza.',true],['C','I have been waiting for two hours.',false],['D','If it rains, we will stay inside.',false]], expl: '"Neither Tom nor Jerry" → động từ phải chia theo chủ ngữ gần nhất (Jerry số ít) → "likes" không phải "like".' },
  { content: 'Rearrange: "never / I / been / have / to / Europe" → The correct sentence is:', opts: [['A','I never been have to Europe.',false],['B','I have been to never Europe.',false],['C','I have never been to Europe.',true],['D','Never I have been to Europe.',false]], expl: 'Trật tự đúng: S + have/has + never + V3 + complement. "I have never been to Europe."' },

  // ===================== VOCABULARY REVISION =====================
  { content: 'The word "environment" most closely relates to which topic?', opts: [['A','Sports',false],['B','Nature and surroundings',true],['C','Technology',false],['D','Fashion',false]], expl: '"Environment" = môi trường, bao gồm thiên nhiên, không khí, nước, đất. Liên quan đến tự nhiên và điều kiện xung quanh.' },
  { content: 'Choose the word that does NOT belong to the group:', opts: [['A','guitar',false],['B','violin',false],['C','trumpet',false],['D','canvas',true]], expl: '"Canvas" = vải bạt (dùng để vẽ tranh). Ba từ còn lại là nhạc cụ (instruments). Canvas là đồ vật liên quan đến hội họa.' },
  { content: 'Choose the word that does NOT belong to the group:', opts: [['A','solar',false],['B','wind',false],['C','fossil',false],['D','delicious',true]], expl: '"Delicious" = ngon (mô tả thức ăn). Ba từ còn lại liên quan đến năng lượng: solar (mặt trời), wind (gió), fossil (hóa thạch).' },
  { content: '"Fluent" in "She speaks English fluently" is an example of ______.', opts: [['A','a noun',false],['B','a verb',false],['C','an adjective',false],['D','an adverb',true]], expl: '"Fluently" là trạng từ (adverb), tạo thành bằng cách thêm -ly vào tính từ "fluent". Nó bổ nghĩa cho động từ "speaks".' },
  { content: 'Which word is a synonym of "assist"?', opts: [['A','hinder',false],['B','help',true],['C','harm',false],['D','prevent',false]], expl: '"Assist" = giúp đỡ. Từ đồng nghĩa: "help". "Hinder" = cản trở (trái nghĩa), "harm" = gây hại.' },
  { content: 'Which word is an antonym of "ancient"?', opts: [['A','old',false],['B','traditional',false],['C','modern',true],['D','historical',false]], expl: '"Ancient" = cổ xưa. Từ trái nghĩa là "modern" = hiện đại. "Old" = già/cũ, không phải trái nghĩa trực tiếp.' },
  { content: '"Spectacular" means ______.', opts: [['A','very ordinary',false],['B','very impressive or dramatic',true],['C','slightly boring',false],['D','extremely small',false]], expl: '"Spectacular" = ngoạn mục, ấn tượng, đặc sắc. Dùng để mô tả những thứ rất ấn tượng, đẹp đẽ.' },
  { content: 'The prefix "over-" in "overcrowded" means ______.', opts: [['A','under',false],['B','not enough',false],['C','too much or beyond normal',true],['D','before',false]], expl: 'Tiền tố "over-" = quá mức, vượt quá. "Overcrowded" = quá đông đúc. Ví dụ: overworked = làm việc quá sức.' },
  { content: 'The suffix "-tion" in "population" changes the word to ______.', opts: [['A','an adjective',false],['B','a verb',false],['C','a noun',true],['D','an adverb',false]], expl: 'Hậu tố "-tion/-ation" tạo danh từ từ động từ. "Populate" (v) → "population" (n). Ví dụ: educate → education.' },

  // ===================== COMMUNICATION & EVERYDAY ENGLISH =====================
  { content: '"I\'m sorry I\'m late." — "______, it\'s fine."', opts: [['A','Never mind',true],['B','Of course',false],['C','I don\'t think so',false],['D','That\'s right',false]], expl: '"Never mind" = không sao, đừng lo. Dùng để chấp nhận lời xin lỗi. "Of course" = tất nhiên rồi.' },
  { content: '"Could you help me with this exercise?" — "______"', opts: [['A','I\'m afraid not.',false],['B','Sure, no problem!',true],['C','I think so.',false],['D','It doesn\'t matter.',false]], expl: '"Sure, no problem!" = Được, không vấn đề gì! Câu trả lời tích cực và sẵn sàng giúp đỡ.' },
  { content: '"What would you like to eat?" — "I\'d like ______ spring rolls, please."', opts: [['A','any',false],['B','some',true],['C','much',false],['D','many',false]], expl: '"Some" dùng khi đặt hàng hoặc yêu cầu thức ăn/đồ uống. "I\'d like some spring rolls."' },
  { content: '"How do you spell \'necessary\'?" — "______ e - c - e - s - s - a - r - y."', opts: [['A','N',true],['B','K',false],['C','M',false],['D','G',false]], expl: '"Necessary" bắt đầu bằng chữ N và cách đánh vần: N-e-c-e-s-s-a-r-y.' },
  { content: '"I passed my English exam!" — "______!"', opts: [['A','I\'m sorry to hear that',false],['B','That\'s too bad',false],['C','Congratulations',true],['D','Never mind',false]], expl: '"Congratulations!" = Chúc mừng! Dùng để phản ứng với tin tốt. "I\'m sorry to hear that" = dùng cho tin buồn.' },
  { content: 'You want to ask for permission to leave class early. What do you say?', opts: [['A','I go now.',false],['B','Leave me go.',false],['C','May I leave early, please?',true],['D','You must let me go.',false]], expl: '"May I...?" là cách xin phép lịch sự. "May I leave early, please?" = Thưa cô/thầy, em có thể ra về sớm không?' },

  // ===================== CULTURE & CROSS-CURRICULAR =====================
  { content: 'Ho Chi Minh City is the ______ city in Vietnam in terms of population.', opts: [['A','smallest',false],['B','oldest',false],['C','largest',true],['D','quietest',false]], expl: 'TP. Hồ Chí Minh là thành phố đông dân nhất (largest) của Việt Nam.' },
  { content: 'The ______ of Vietnam is Hanoi.', opts: [['A','largest city',false],['B','capital',true],['C','oldest town',false],['D','seaport',false]], expl: '"Capital" = thủ đô. Thủ đô của Việt Nam là Hà Nội.' },
  { content: 'Vietnam is located in ______ Asia.', opts: [['A','East',false],['B','South',false],['C','Southeast',true],['D','Central',false]], expl: 'Việt Nam nằm ở khu vực Đông Nam Á (Southeast Asia). Đây là vị trí địa lý của đất nước.' },
  { content: 'Ao dai is the traditional ______ of Vietnam.', opts: [['A','food',false],['B','costume',true],['C','festival',false],['D','dance',false]], expl: '"Costume" = trang phục. Áo dài là trang phục truyền thống (traditional costume) của Việt Nam.' },
  { content: 'The ______ language of Vietnam is Vietnamese.', opts: [['A','official',true],['B','foreign',false],['C','ancient',false],['D','second',false]], expl: '"Official language" = ngôn ngữ chính thức. Tiếng Việt là ngôn ngữ chính thức của Việt Nam.' },

  // ===================== MIXED PRACTICE: FILL IN =====================
  { content: 'He asked me ______ I wanted to join the club.', opts: [['A','that',false],['B','what',false],['C','if',true],['D','when',false]], expl: 'Câu hỏi gián tiếp Yes/No → dùng "if" hoặc "whether". "He asked me if I wanted to join the club."' },
  { content: 'The test was ______ difficult ______ most students couldn\'t finish it.', opts: [['A','so / that',true],['B','too / to',false],['C','such / that',false],['D','very / that',false]], expl: '"So + adj + that" = quá...đến nỗi. "So difficult that most students couldn\'t finish it."' },
  { content: 'It was ______ a hard exam ______ nobody passed.', opts: [['A','so / that',false],['B','such / that',true],['C','too / to',false],['D','very / that',false]], expl: '"Such + a/an + adj + noun + that" = quá...đến nỗi. "Such a hard exam that nobody passed."' },
  { content: 'She is not ______ to see the film. It\'s rated 18+. (OLD)', opts: [['A','old enough',true],['B','enough old',false],['C','so old',false],['D','very old',false]], expl: '"Old enough" = đủ tuổi. "Adj + enough" (enough đặt SAU tính từ). "Not old enough to see".' },
  { content: 'He was ______ that he won the first prize. (SURPRISE)', opts: [['A','surprise',false],['B','surprising',false],['C','surprised',true],['D','surprisingly',false]], expl: '"Surprised" (tính từ đuôi -ed) mô tả cảm xúc của người. "He was surprised" = anh ta ngạc nhiên.' },
  { content: 'The news ______ very shocking. Everyone was silent.', opts: [['A','were',false],['B','are',false],['C','was',true],['D','have been',false]], expl: '"News" luôn dùng với động từ số ÍT (singular). "The news was shocking" (không phải "were").' },
  { content: 'My phone needs ______, so I can\'t call you now.', opts: [['A','charge',false],['B','to charge',false],['C','charging',true],['D','charged',false]], expl: '"Need + V-ing" = cần được làm gì (passive meaning). "Needs charging" = cần được sạc. Tương đương "needs to be charged".' },
  { content: 'She made me ______ the whole report again.', opts: [['A','to rewrite',false],['B','rewriting',false],['C','rewrite',true],['D','rewrote',false]], expl: '"Make + object + V nguyên thể (bare infinitive)": "made me rewrite". Không dùng to sau make/let/have.' },
  { content: 'I wish I ______ taller so I could play basketball better.', opts: [['A','am',false],['B','was/were',true],['C','will be',false],['D','have been',false]], expl: '"Wish + Past Simple/were" = ước gì (điều không có thật ở hiện tại). "I wish I were taller."' },
  { content: 'He suggested that we ______ the museum the following day.', opts: [['A','visit',true],['B','visited',false],['C','to visit',false],['D','visiting',false]], expl: '"Suggest that + S + V (bare infinitive/subjunctive)": "suggested that we visit". Đây là subjunctive mood (dạng giả định).' },

  // ===================== FINAL MIXED REVIEW =====================
  { content: 'Which sentence uses the passive voice correctly?', opts: [['A','The book wrote by him.',false],['B','The book was written by him.',true],['C','The book is write by him.',false],['D','The book written by him.',false]], expl: 'Câu bị động đúng: Subject + was/were + V3 + by + agent. "The book was written by him."' },
  { content: 'Which sentence is in the Present Perfect tense?', opts: [['A','She visited Paris last year.',false],['B','She is visiting Paris now.',false],['C','She has visited Paris.',true],['D','She will visit Paris.',false]], expl: 'Present Perfect: has/have + V3. "She has visited Paris" = Cô ấy đã từng đến Paris.' },
  { content: 'Which sentence contains a conditional clause?', opts: [['A','She went to school yesterday.',false],['B','If it rains, we will stay home.',true],['C','He is playing football.',false],['D','They have finished the project.',false]], expl: 'Câu điều kiện chứa "if". "If it rains, we will stay home" = câu điều kiện loại 1.' },
  { content: 'Choose the sentence with the correct word order:', opts: [['A','She always is late.',false],['B','Always she is late.',false],['C','She is always late.',true],['D','She late is always.',false]], expl: 'Trạng từ tần suất với "be": S + be + adverb. "She is always late." (always đặt sau be).' },
  { content: 'He got a bad grade ______ he didn\'t study hard.', opts: [['A','although',false],['B','so',false],['C','because',true],['D','but',false]], expl: '"Because" = bởi vì, diễn tả nguyên nhân. Bị điểm kém VÌ không học chăm. "Because" đứng trước nguyên nhân.' },
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
          create: q.opts.map(([optKey, content, isCorrect], i) => ({
            optionKey: optKey,
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
  console.log(`✅ Đã thêm ${added} câu Tiếng Anh lớp 7 (Part B).`);
  const total = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  console.log(`📊 Tổng: ${total} câu`);
}

main().catch(console.error).finally(() => p.$disconnect());
