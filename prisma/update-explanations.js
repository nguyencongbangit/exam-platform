/**
 * Script thêm giải thích tiếng Việt cho các câu hỏi chưa có explanation.
 * Chạy: node prisma/update-explanations.js
 */
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// Map: nội dung câu hỏi (lowercase, trimmed) => giải thích tiếng Việt
const EXPLANATIONS = {

  // ══════════════════════════════════════════════════
  // TIẾNG ANH LỚP 5
  // ══════════════════════════════════════════════════

  // Nghề nghiệp
  'what does a ______ do? he/she teaches students at school.':
    '"Teacher" (giáo viên) là người dạy học sinh ở trường. "Doctor" là bác sĩ, "farmer" là nông dân, "cook" là đầu bếp — các nghề này không dạy học.',

  'my father is a ______. he cooks food in a restaurant.':
    '"Chef" là đầu bếp chuyên nghiệp làm việc trong nhà hàng. "Pilot" là phi công, "nurse" là y tá, "driver" là tài xế — đều không liên quan đến nấu ăn trong nhà hàng.',

  'she works at a hospital and helps the doctor. she is a ______.':
    '"Nurse" (y tá) là người làm việc tại bệnh viện và hỗ trợ bác sĩ. "Teacher" dạy học, "farmer" làm nông, "singer" là ca sĩ — đều không làm việc tại bệnh viện.',

  'he flies aeroplanes. he is a ______.':
    '"Pilot" (phi công) là người lái máy bay. "Postman" là người đưa thư, "mechanic" là thợ cơ khí, "baker" là thợ làm bánh.',

  '______ do you want to be when you grow up?':
    'Hỏi về nghề nghiệp tương lai dùng "What" (cái gì / nghề gì). "Where" hỏi nơi chốn, "Who" hỏi người, "How" hỏi cách thức.',

  'i want to be a ______ because i love animals.':
    '"Vet" (bác sĩ thú y) là người chăm sóc động vật — phù hợp với người yêu động vật. "Lawyer" là luật sư, "engineer" là kỹ sư, "reporter" là phóng viên.',

  'my mother works in a school. she is a ______.':
    'Người làm việc trong trường học là "teacher" (giáo viên). "Doctor" làm ở bệnh viện, "police officer" bảo vệ trật tự, "firefighter" chữa cháy.',

  'he writes news for a newspaper. he is a ______.':
    '"Journalist" (nhà báo) là người viết tin tức cho báo. "Scientist" là nhà khoa học, "soldier" là quân nhân, "dentist" là nha sĩ.',

  // Gia đình
  "my grandfather is my father's ______.":
    'Ông nội/ngoại của tôi là cha (father) của bố tôi. "Brother" là anh/em trai, "uncle" là chú/cậu, "son" là con trai.',

  'she has ______ hair and ______ eyes.':
    '"Long / blue" là tính từ mô tả tóc (dài) và mắt (xanh) — hai danh từ phù hợp. "Tall / big" không dùng cho tóc và mắt, "heavy / short" và "fast / green" không phù hợp ngữ pháp.',

  'tom is ______ than his brother. he weighs 60 kg and his brother weighs 45 kg.':
    'Tom nặng hơn (60 kg > 45 kg) nên dùng "heavier" (so sánh hơn của "heavy"). "Thinner" là gầy hơn, "shorter" là thấp hơn, "younger" là trẻ hơn — đều sai với thông tin đã cho.',

  'my sister is ______ than me. she is 165 cm and i am 150 cm.':
    'Chị cao hơn (165 cm > 150 cm) nên dùng "taller" (so sánh hơn của "tall"). "Shorter" là thấp hơn — ngược lại, "older" là lớn tuổi hơn, "thinner" là gầy hơn.',

  '______ is your brother? he is 12 years old.':
    'Câu trả lời nói về tuổi (12 years old) nên câu hỏi dùng "How old" (bao nhiêu tuổi). "How tall" hỏi chiều cao, "How heavy" hỏi cân nặng, "How far" hỏi khoảng cách.',

  '______ is she? she is 40 kg.':
    'Câu trả lời là 40 kg (cân nặng) nên dùng "How heavy" (nặng bao nhiêu). "How old" hỏi tuổi, "How tall" hỏi chiều cao, "How far" hỏi khoảng cách.',

  'my cousin has ______ hair. it is not long.':
    'Bài nói tóc "không dài" nên đáp án là "short" (ngắn). "Curly" là xoăn, "straight" là thẳng, "dark" là tối màu — đều không phủ nhận ý "không dài".',

  // Thì hiện tại tiếp diễn
  'what ______ you doing now? i am reading a book.':
    'Thì hiện tại tiếp diễn dùng "to be + V-ing". Chủ ngữ là "you" nên trợ động từ là "are". Công thức: What are you doing?',

  'she ______ watching tv at the moment.':
    'Thì hiện tại tiếp diễn: chủ ngữ "she" (số ít) dùng "is". Không dùng "are" (số nhiều/you) hay "am" (I).',

  'i ______ listening to music right now.':
    'Thì hiện tại tiếp diễn: chủ ngữ "I" dùng "am". Không dùng "is" (he/she/it) hay "are" (you/we/they).',

  'what is he doing? he ______ swimming.':
    'Thì hiện tại tiếp diễn: chủ ngữ "he" (số ít) dùng "is". Dạng đầy đủ: "He is swimming."',

  'they ______ playing football in the park now.':
    'Thì hiện tại tiếp diễn: chủ ngữ "they" (số nhiều) dùng "are". Không dùng "is" (số ít) hay "am" (chỉ dùng với I).',

  // Thì hiện tại đơn
  'she ______ to school every day.':
    'Thì hiện tại đơn với chủ ngữ số ít "she" cần thêm -s/-es vào động từ: "goes". "Go" dùng cho I/you/we/they, "going" là dạng tiếp diễn, "went" là quá khứ.',

  'they ______ football every weekend.':
    'Thì hiện tại đơn với chủ ngữ số nhiều "they" dùng động từ nguyên thể: "play". "Plays" dùng cho he/she/it, "playing" là dạng tiếp diễn, "played" là quá khứ.',

  "my father ______ up at 6 o'clock every morning.":
    'Thì hiện tại đơn với "my father" (= he, số ít) thêm -s: "gets". "Get" dùng cho I/you/we/they, "getting" là dạng tiếp diễn, "got" là quá khứ.',

  '______ she like reading books? yes, she does.':
    'Câu hỏi thì hiện tại đơn với chủ ngữ số ít "she" dùng "Does". "Do" dùng cho I/you/we/they, "Is/Are" dùng cho thì tiếp diễn.',

  'i ______ not like eating vegetables.':
    'Phủ định thì hiện tại đơn với chủ ngữ "I" dùng "do not" (do + not). "Does" dùng cho he/she/it, "is/am" không dùng với "not like".',

  // Tương lai
  'it is cloudy. i think it ______ rain soon.':
    '"Is going to" diễn tả dự đoán có bằng chứng (trời đang có mây = dấu hiệu rõ ràng sắp mưa). "Did/was/has" là dạng quá khứ, không dùng cho tương lai.',

  'she ______ visit her grandparents next sunday.':
    '"Is going to" diễn tả kế hoạch tương lai đã được lên trước. "Visited" là quá khứ, "visits" là hiện tại, "visit" thiếu trợ động từ.',

  'we ______ go to the beach tomorrow if the weather is nice.':
    '"Are going to" diễn tả kế hoạch tương lai với chủ ngữ "we" (số nhiều). "Went" là quá khứ, "goes" là hiện tại số ít, "going" thiếu trợ động từ.',

  '______ you go to the party tonight? yes, i will.':
    'Câu trả lời có "I will" nên câu hỏi dùng "Will". "Do/Are" dùng cho thì hiện tại, "Did" là quá khứ.',

  'he ______ be a doctor when he grows up.':
    '"Will" diễn tả tương lai với dự định hoặc lời hứa. Sau "will" luôn dùng động từ nguyên thể. "Is/was" là thì hiện tại/quá khứ, "has" không đúng ý.',

  // Môn học
  'what is your favourite subject? i love ______ because i like drawing.':
    '"Art" (Mỹ thuật) là môn học có vẽ. "Maths" là toán, "Science" là khoa học, "Music" là âm nhạc — không liên quan đến vẽ.',

  'we have ______ on monday and wednesday.':
    '"PE" (Physical Education — Thể dục) là danh từ riêng, không cần mạo từ. Các dạng "PE class", "a PE", "the PE" đều dùng sai về mạo từ.',

  'i study ______ because i want to be a scientist.':
    'Nhà khoa học (scientist) nghiên cứu khoa học, nên học "Science". "History" là lịch sử, "Art" là mỹ thuật, "Music" là âm nhạc.',

  '______ is your english class? it is on tuesday and thursday.':
    'Câu trả lời chỉ thời gian (Tuesday and Thursday) nên câu hỏi dùng "When" (khi nào). "Where" hỏi nơi chốn, "Who" hỏi người, "What" hỏi thứ gì.',

  'my school has ______ floors.':
    'Sau "has" cần số đếm (cardinal number) là "three" (ba). "Third" là số thứ tự, "tree" là cây, "threes" sai về số.',

  // Địa điểm
  'the supermarket is ______ the bank.':
    '"Next to" (bên cạnh) là giới từ chỉ vị trí đúng. "Between" cần hai danh từ (between A and B), "behind to" sai ngữ pháp, "in front" thiếu "of".',

  'go ______ and turn left at the traffic light.':
    '"Straight ahead" (đi thẳng) là cụm từ chỉ hướng đúng. "Turn right" là rẽ phải, "turn back" là quay lại, "go past" là đi qua — không đúng ngữ cảnh.',

  'the library is ______ the school and the park.':
    '"Between" (ở giữa) dùng khi có hai địa điểm: between A and B. "Next to" chỉ bên cạnh một nơi, "in front of" là phía trước, "behind" là phía sau.',

  '______ is the nearest bus stop? it is on main street.':
    'Câu trả lời chỉ địa điểm (Main Street) nên dùng "Where" (ở đâu). "What" hỏi thứ gì, "When" hỏi thời gian, "Why" hỏi lý do.',

  'turn ______ at the hospital and go straight.':
    '"Right" là trạng từ chỉ hướng đúng. "Rightly" là phó từ nghĩa "đúng đắn" (không dùng cho hướng đi), "rights" và "righter" không tồn tại trong ngữ cảnh này.',

  // Sở thích
  'do you like ______? yes, i love it!':
    'Sau "like" dùng V-ing: "swimming". "Swim" là động từ nguyên thể, "to swimming" và "swam" đều sai ngữ pháp.',

  'he enjoys ______ books in his free time.':
    'Sau "enjoy" luôn dùng V-ing: "reading". Không dùng động từ nguyên thể sau enjoy.',

  'what do you do in your free time? i like ______.':
    'Sau "like" dùng V-ing: "playing chess". "Play chess" thiếu -ing, "to playing chess" sai ngữ pháp, "played chess" là quá khứ.',

  "she ______ cooking but she loves eating.":
    'Chủ ngữ "she" (số ít), phủ định hiện tại đơn: "doesn\'t like". "Don\'t like" dùng cho I/you/we/they, "isn\'t like" và "not like" sai ngữ pháp.',

  'we always ______ cycling on sundays.':
    'Thì hiện tại đơn với "we" (số nhiều) dùng động từ nguyên thể: "go". "Goes" cho he/she/it, "going" là V-ing, "went" là quá khứ.',

  // Thời tiết
  'what is the weather like today? it is ______.':
    '"Sunny" là tính từ mô tả thời tiết (trời nắng). "Sun" là danh từ, "sunning" không tồn tại, "sunned" không dùng cho thời tiết.',

  'in winter, it is usually ______ and ______.':
    'Mùa đông thường lạnh và có tuyết: "cold / snowy". "Hot / sunny" là mùa hè, "warm / rainy" là mùa xuân/thu, "cool / windy" có thể nhưng không điển hình cho đông.',

  '______ season do you like best? i like spring.':
    '"What" dùng để hỏi về loại/thứ gì — "What season" (mùa gì). "Which" dùng khi có lựa chọn cụ thể được liệt kê, "When" hỏi thời gian, "How" hỏi cách thức.',

  "it is ______ outside. don't forget your umbrella.":
    'Umbrella (ô/dù) dùng khi trời mưa → "raining". "Sunny" và "hot" không cần ô, "snowy" dùng mũ/áo ấm.',

  'the temperature today is 35°c. it is very ______.':
    '35°C là nhiệt độ rất cao → "hot" (nóng). "Cold" là lạnh, "cool" là mát mẻ, "windy" là có gió — không liên quan đến nhiệt độ.',

  // Sức khỏe
  'you should eat ______ vegetables to stay healthy.':
    '"More" dùng với danh từ không đếm được hoặc so sánh hơn (eat more = ăn nhiều hơn). "Much" dùng đơn thuần (a lot), "many" dùng với danh từ đếm được số nhiều kèm câu hỏi/phủ định, "less" là ít hơn — ngược nghĩa.',

  'i am thirsty. i would like ______ water, please.':
    '"Some" dùng trong câu khẳng định và câu mời/đề nghị. "Any" dùng trong câu hỏi/phủ định, "a" dùng với danh từ đếm được, "many" dùng với danh từ đếm được.',

  "she ______ eat too much sweet food because it is bad for her teeth.":
    '"Shouldn\'t" (không nên) diễn tả lời khuyên phủ định — ăn đồ ngọt nhiều hại răng. "Should" là khuyên nên làm, "must" là bắt buộc, "can" là có thể.',

  "what's the matter? i have a ______.":
    '"Headache" (đau đầu) là danh từ ghép đúng. "Head aches" là cấu trúc khác (động từ), "head hurt" sai ngữ pháp, "headaching" không tồn tại.',

  'you should ______ a lot of water every day.':
    'Sau "should" luôn dùng động từ nguyên thể: "drink". "Drank" là quá khứ, "drinks" thêm -s không dùng sau should, "drinking" là V-ing.',

  // Giao tiếp
  'a: how are you? b: ______.':
    '"Fine, thank you." là câu trả lời chuẩn cho "How are you?" (Bạn khỏe không?). Các đáp án còn lại trả lời sai chủ đề.',

  'a: nice to meet you! b: ______.':
    '"Nice to meet you too!" là câu đáp lại đúng khi ai đó nói "Nice to meet you". "You\'re welcome" dùng khi được cảm ơn, "Thank you very much" dùng khi nhận quà/lời khen, "Goodbye" là lời tạm biệt.',

  "a: can i borrow your pen? b: ______.":
    '"Sure, here you are." là cách đồng ý cho mượn đồ một cách lịch sự. "No, I don\'t" là từ chối không lịch sự, "Yes, I am" sai cấu trúc, "That\'s right" dùng để xác nhận thông tin.',

  "a: what time does the film start? b: ______.":
    '"At 7 o\'clock." trả lời đúng câu hỏi về thời gian. "On Saturday" là ngày tháng, "In the cinema" là địa điểm, "With my friends" là người đi cùng.',

  "a: ______ is your phone number? b: it's 090 123 4567.":
    '"What" dùng để hỏi số điện thoại: "What is your phone number?". "Where" hỏi địa điểm, "How" hỏi cách thức/số lượng, "When" hỏi thời gian.',

  // Can / Can't
  'he ______ speak three languages. he is very clever.':
    '"Can" diễn tả khả năng (có thể làm được). Câu nói anh ấy thông minh và nói được 3 ngôn ngữ → "can". "Can\'t / could not" là phủ định khả năng.',

  "she ______ swim because she never learned.":
    '"Can\'t" (không thể) vì cô ấy chưa bao giờ học bơi → không có khả năng bơi. "Can" là có thể, "could" là quá khứ của can (ít phù hợp hơn), "couldn\'t" cũng là quá khứ.',

  "______ you play the piano? no, i can't.":
    'Câu hỏi về khả năng dùng "Can". Câu trả lời "No, I can\'t" xác nhận dùng "Can" trong câu hỏi. "Are/Is" dùng cho to be, "Do" dùng cho thì hiện tại đơn.',

  'birds ______ fly but they cannot swim like fish.':
    '"Can" (có thể) vì chim có khả năng bay. Vế sau đã có "cannot swim" làm rõ đối lập. "Can\'t" sẽ mâu thuẫn với thực tế.',

  // Should / Must
  'you ______ brush your teeth twice a day.':
    '"Should" (nên) là lời khuyên tích cực về việc đánh răng. "Shouldn\'t" là không nên (ngược nghĩa), "can\'t" là không thể, "don\'t" là phủ định hành động.',

  'students ______ use phones in class.':
    '"Mustn\'t" (tuyệt đối không được) diễn tả lệnh cấm. Dùng điện thoại trong lớp là bị cấm. "Should" là khuyên nên làm, "can" là có thể, "will" là tương lai.',

  'you ______ wash your hands before eating.':
    '"Must" (phải) diễn tả sự bắt buộc về vệ sinh. "Mustn\'t" là bị cấm (ngược nghĩa), "can\'t" là không thể, "don\'t" là phủ định thói quen.',

  // So sánh
  'mount everest is the ______ mountain in the world.':
    'So sánh nhất với danh từ số ít dùng "the + tính từ + est": "highest". "High" là tính từ thường, "higher" là so sánh hơn, "more high" sai — tính từ ngắn không dùng "more".',

  'this book is ______ than that one.':
    '"More interesting" là so sánh hơn đúng cho tính từ dài (3 âm tiết trở lên). "Interestinger" sai quy tắc, "most interesting" là so sánh nhất, "interest" là danh từ/động từ.',

  'my bag is ______ than yours.':
    '"Heavier" là so sánh hơn đúng của "heavy" (đổi y→i, thêm -er). "Heavy" là tính từ thường, "more heavy" sai (tính từ ngắn không dùng more), "heaviest" là so sánh nhất.',

  'she runs ______ in her class.':
    '"The fastest" là so sánh nhất đúng của "fast". Câu nói "trong lớp cô ấy" → so sánh nhất. "Faster" là so sánh hơn, "more fast" sai quy tắc.',

  'today is ______ than yesterday.':
    '"Hotter" là so sánh hơn đúng của "hot" (phụ âm đơn sau nguyên âm đơn → nhân đôi + er). "Hot" là thường, "hottest" là nhất, "most hot" sai quy tắc.',

  // Từ vựng
  'the opposite of "big" is ______.':
    'Từ trái nghĩa của "big" (to lớn) là "small" (nhỏ). "Long" là dài, "heavy" là nặng, "tall" là cao — đều không phải trái nghĩa trực tiếp của "big".',

  'which word means a person who puts out fires?':
    '"Firefighter" là lính cứu hỏa — người dập lửa. "Farmer" là nông dân, "fisher" là ngư dân, "florist" là người bán hoa.',

  'choose the odd one out: cat, dog, fish, table.':
    '"Table" (bàn) là đồ vật, không phải động vật như cat (mèo), dog (chó), fish (cá). Nhóm cat/dog/fish cùng là động vật.',

  'choose the odd one out: red, blue, happy, green.':
    '"Happy" (vui) là tính từ cảm xúc, khác với red (đỏ), blue (xanh dương), green (xanh lá) đều là màu sắc.',

  'a ______ is a place where you can borrow books.':
    '"Library" (thư viện) là nơi mượn sách. "Bookshop" là hiệu sách (bán, không cho mượn), "museum" là bảo tàng, "hospital" là bệnh viện.',

  'the word "beautiful" describes ______.':
    '"Beautiful" (đẹp) là tính từ dùng để mô tả người, nơi chốn hoặc vật. Không mô tả hành động, thời gian hay số lượng.',

  'he went to the ______ to buy vegetables and fruit.':
    '"Market" (chợ) là nơi mua rau và trái cây. "Bank" là ngân hàng, "school" là trường, "hospital" là bệnh viện.',

  'we ______ english at school every day.':
    'Thì hiện tại đơn với "we" (số nhiều) dùng động từ nguyên thể: "learn". "Learning" là V-ing, "learns" thêm -s (cho he/she/it), "learned" là quá khứ.',

  // Thời gian
  'there are ______ months in a year.':
    'Một năm có 12 tháng: "twelve". Không phải 10, 11 hay 13.',

  'what day comes after wednesday?':
    'Thứ Tư (Wednesday) → thứ Năm (Thursday). Thứ Hai (Monday) → Thứ Ba (Tuesday) → Thứ Tư → Thứ Năm → Thứ Sáu (Friday).',

  'the first month of the year is ______.':
    'Tháng đầu tiên trong năm là tháng Một: "January". "February" là tháng 2, "March" là tháng 3, "December" là tháng 12 (tháng cuối năm).',

  'my birthday is ______ the 20th of november.':
    'Giới từ chỉ ngày cụ thể dùng "on": on the 20th of November. "In" dùng với tháng/năm (in November), "at" dùng với giờ cụ thể, "by" nghĩa là "trước".',

  'school starts ______ september.':
    'Giới từ chỉ tháng dùng "in": in September. "On" dùng với ngày cụ thể, "at" dùng với giờ, "by" nghĩa là "trước ngày đó".',

  // Giới từ chỉ nơi
  'the cat is sleeping ______ the sofa.':
    '"On" (trên) dùng khi mèo nằm trên bề mặt sofa. "At" chỉ địa điểm chung, "in" là ở bên trong, "over" là phía trên nhưng không chạm.',

  'the keys are ______ the drawer.':
    '"In" (trong) dùng khi chìa khóa ở bên trong ngăn kéo. "On" là trên bề mặt, "at" là tại địa điểm chung, "from" chỉ xuất phát điểm.',

  'she is standing ______ the door.':
    '"In front of" (trước) là cụm giới từ đúng chỉ vị trí phía trước cánh cửa. "In the front" thiếu "of", "next" thiếu "to", "behind of" sai cấu trúc (chỉ dùng "behind" không có "of").',

  'he lives ______ a farm in the countryside.':
    '"On" dùng khi nói về trang trại: "live on a farm" là cụm cố định trong tiếng Anh. "At" chỉ địa điểm cụ thể, "in" là bên trong, "over" là phía trên.',

  // Đọc hiểu
  'read: "tom gets up at 6 am. he brushes his teeth and has breakfast. then he goes to school by bike." — what does tom ride to school?':
    'Đoạn văn ghi "goes to school by bike" → Tom đi xe đạp (a bike) đến trường. Không có thông tin về xe buýt, xe hơi hay đi bộ.',

  'read: "tom gets up at 6 am. he brushes his teeth and has breakfast. then he goes to school by bike." — what time does tom get up?':
    'Đoạn văn ghi "gets up at 6 am" → Tom thức dậy lúc 6 giờ sáng.',

  'read: "lan loves cooking. every saturday, she helps her mum make soup and cakes. she wants to be a chef." — what does lan want to be?':
    'Đoạn văn ghi "She wants to be a chef" → Lan muốn trở thành đầu bếp (chef).',

  'read: "lan loves cooking. every saturday, she helps her mum make soup and cakes." — when does lan help her mum?':
    'Đoạn văn ghi "Every Saturday" → Lan giúp mẹ vào mỗi thứ Bảy.',

  'read: "nam is 11 years old. he is 145 cm tall and weighs 38 kg. he has black hair and brown eyes." — how tall is nam?':
    'Đoạn văn ghi "He is 145 cm tall" → Nam cao 145 cm. Không nhầm với cân nặng 38 kg hay các con số khác.',

  // Medium
  'he has lived in this city ______ five years.':
    '"For" dùng với khoảng thời gian (five years = 5 năm). "Since" dùng với mốc thời gian cụ thể (since 2019), "ago" đặt sau số năm trong quá khứ đơn, "in" không dùng ở đây.',

  "she ______ never been to the usa before.":
    'Thì hiện tại hoàn thành: "has + V3" với chủ ngữ "she" (số ít). "Has never been" = chưa bao giờ đến. "Did" là quá khứ đơn, "have" dùng với I/you/we/they, "is" sai cấu trúc.',

  'if it ______ tomorrow, we will stay at home.':
    'Câu điều kiện loại 1 (có thể xảy ra): mệnh đề "if" dùng thì hiện tại đơn: "rains". "Rained" là quá khứ (loại 2), "will rain" sai (không dùng will trong mệnh đề if loại 1).',

  'the film ______ already started when we arrived at the cinema.':
    '"Had started" là thì quá khứ hoàn thành, diễn tả hành động xảy ra trước một hành động khác trong quá khứ (arrived). Dùng "had + V3".',

  'choose the sentence that is grammatically correct.':
    '"She doesn\'t like coffee." là đúng: chủ ngữ "she" + doesn\'t + động từ nguyên thể. "Don\'t like" sai (she dùng doesn\'t), "doesn\'t likes" sai (sau doesn\'t không thêm -s).',

  '______ anybody home when you arrived?':
    '"Was there" là cấu trúc đúng hỏi về sự tồn tại trong quá khứ: "Was there anybody...?". "Was/Were" một mình không đúng cấu trúc hỏi này. "Is" là hiện tại.',

  'she asked me ______ i wanted to go to the park.':
    '"If" dùng trong câu gián tiếp để chuyển câu hỏi yes/no: "She asked me if I wanted..." = Cô ấy hỏi tôi có muốn đi công viên không. "That" dùng cho câu trần thuật, "what/which" dùng cho câu hỏi có từ để hỏi.',

  // ══════════════════════════════════════════════════
  // TIẾNG ANH LỚP 7
  // ══════════════════════════════════════════════════

  // Unit 1 - Sở thích
  'she is fond ______ playing badminton after school.':
    '"Fond of" là cụm từ cố định: be fond of = thích. Không dùng fond in/at/on.',

  'he spends two hours ______ the guitar every day.':
    'Cấu trúc "spend time + V-ing": he spends two hours practising. Không dùng "to practise" hay động từ nguyên thể sau "spend time".',

  '______ do you usually do in your spare time?':
    '"What" hỏi về hoạt động/việc làm. "How" hỏi cách thức, "Where" hỏi địa điểm, "Why" hỏi lý do.',

  'my sister is keen ______ collecting vintage postcards.':
    '"Keen on" là cụm từ cố định: be keen on = say mê/hứng thú với. Không dùng keen at/in/for.',

  'lan is ______ at drawing. her pictures always win prizes.':
    '"Talented" (tài năng) phù hợp vì tranh của cô ấy luôn thắng giải. "Bad/terrible" nghĩa tiêu cực, "boring" là nhàm chán.',

  'knitting, painting and gardening are examples of ______.':
    '"Hobbies" (sở thích) là từ đúng — đan len, vẽ, làm vườn đều là hoạt động giải trí. "Sports" là thể thao, "subjects" là môn học, "jobs" là công việc.',

  'tom prefers reading books ______ watching television.':
    '"Prefer A to B" là cấu trúc cố định: thích A hơn B. "Tom prefers reading to watching." Không dùng "than/from/over" với prefer.',

  'his hobby is ______ origami figures in his free time.':
    '"Folding" (gấp giấy) là V-ing, dùng làm chủ ngữ/bổ ngữ sau "is". "Fold" là nguyên thể, "to folding" sai ngữ pháp, "folded" là quá khứ.',

  'they enjoy ______ to classical music while studying.':
    'Sau "enjoy" luôn dùng V-ing: "listening". "Listen" là nguyên thể, "to listen" sai sau enjoy, "listened" là quá khứ.',

  '______ your brother interested in doing martial arts?':
    '"Is" dùng vì "your brother" = he (số ít), cùng với "be interested in". "Does/Do" dùng cho thì hiện tại đơn, "Are" cho số nhiều.',

  // Unit 2 - Sức khỏe
  'you should go to bed early ______ stay up late at night.':
    '"Rather than" (thay vì) tạo đối lập giữa hai hành động: đi ngủ sớm thay vì thức khuya. "But not" không tự nhiên ở đây, "or" không diễn tả đối lập mạnh, "instead" cần "of" đằng sau.',

  'eating a ______ diet helps you stay fit and healthy.':
    '"Balanced" (cân bằng) là tính từ mô tả chế độ ăn. "Balance" là danh từ/động từ, "balancing" là V-ing, "imbalance" nghĩa ngược lại.',

  'regular ______ such as jogging or cycling is good for your heart.':
    '"Exercise" (tập thể dục) là danh từ phù hợp và sau "such as" có ví dụ chạy bộ, đạp xe. "Diet" là chế độ ăn, "meal" là bữa ăn, "sleep" là giấc ngủ.',

  "you ______ skip breakfast because it gives you energy for the day.":
    '"Shouldn\'t" (không nên) vì bỏ bữa sáng là không tốt — mệnh đề tiếp theo giải thích tại sao nên ăn sáng. "Should" là khuyên làm (ngược nghĩa), "must/can" không phù hợp.',

  'fast food is usually high ______ fat, salt and sugar.':
    '"High in" là cụm cố định: high in fat/sugar = nhiều chất béo/đường. Không dùng high of/at/for.',

  "people who ______ enough sleep tend to feel tired and unfocused.":
    '"Don\'t get" là phủ định hiện tại đơn với chủ ngữ số nhiều "people who". "Gets" là số ít, "getting" thiếu trợ động từ, "not getting" sai cấu trúc mệnh đề quan hệ.',

  'she has a ______. she should see a dentist.':
    '"Toothache" (đau răng) → nên gặp nha sĩ (dentist). "Sore throat" là đau họng (gặp bác sĩ), "stomachache" là đau bụng, "backache" là đau lưng.',

  'drinking enough water helps keep the body ______.':
    '"Hydrated" (đủ nước) là trạng thái cơ thể khi uống đủ nước. "Dehydrated" là thiếu nước (ngược nghĩa), "exhausted" là kiệt sức, "infected" là nhiễm khuẩn.',

  '______ you eat well, you will feel more energetic.':
    '"If" (nếu) tạo câu điều kiện loại 1: If + hiện tại đơn, will + V. "Although" là mặc dù (nhượng bộ), "Unless" là trừ khi, "Because" là vì.',

  'children ______ at least 60 minutes of physical activity every day.':
    '"Should do" là cấu trúc đúng: should + động từ nguyên thể. "Should doing/to do/did" đều sai ngữ pháp sau "should".',

  // Unit 3 - Cộng đồng
  'he ______ elderly people cross the street when he sees them struggling.':
    'Thì hiện tại đơn với "he" (số ít): "helps". "Helping" là V-ing thiếu trợ động từ, "helped" là quá khứ, "help to" thêm "to" không cần thiết ở đây.',

  'the charity event ______ hundreds of disadvantaged children last month.':
    '"Last month" là dấu hiệu quá khứ → "supported" (quá khứ đơn của support). "Support/supports" là hiện tại, "supporting" thiếu trợ động từ.',

  '______ in community projects teaches young people to be responsible.':
    '"Participating" (V-ing làm chủ ngữ) là đúng: Participating in... = Việc tham gia... "Participate" là nguyên thể, "Participates" thêm -s sai khi làm chủ ngữ động từ-ing.',

  'she decided to ______ a local environmental group to help clean rivers.':
    '"Join" (tham gia) là động từ nguyên thể sau "to". "Joined" là quá khứ, "joining" là V-ing, "joins" thêm -s.',

  'a person who works without being paid is called a ______.':
    '"Volunteer" (tình nguyện viên) là người làm việc không lương. "Employee" là nhân viên được trả lương, "freelancer" tự kinh doanh vẫn có thu nhập, "donor" là người quyên góp tiền/đồ.',

  'they ______ blood to the hospital every three months.':
    'Câu dùng quá khứ (ngữ cảnh thói quen trong quá khứ của nhóm) → "donated". "Give" là hiện tại nguyên thể, "donating" thiếu trợ động từ, "to donate" không đứng sau chủ ngữ.',

  'doing community service makes teenagers feel proud and ______.':
    '"Fulfilled" (mãn nguyện/có ích) là cảm xúc tích cực khi làm thiện nguyện. "Useless/bored/lonely" đều là cảm xúc tiêu cực, không hợp ngữ cảnh.',

  'the school organised a ______ drive to collect clothes for flood victims.':
    '"Charity" (từ thiện) drive là chiến dịch quyên góp. "Profit" là lợi nhuận, "business" là kinh doanh, "tax" là thuế — không phù hợp.',

  'nam ______ vegetables for poor families in his neighbourhood every week.':
    'Thì hiện tại đơn với "every week" và chủ ngữ "Nam" (= he, số ít) → "grows". "Grew" là quá khứ, "is grown" là bị động, "growing" thiếu trợ động từ.',

  'working as a volunteer ______ your cv and helps you find a better job.':
    '"Improves" (cải thiện) là động từ số ít (chủ ngữ "working" = he/it) phù hợp. "Reduces" là giảm, "ignores" là bỏ qua, "replaces" là thay thế — đều không đúng nghĩa.',

  // Unit 4 - Âm nhạc
  'the ______ plays a central role in a traditional vietnamese ceremony.':
    '"Đàn bầu" là nhạc cụ cổ truyền Việt Nam, có vai trò trung tâm trong nghi lễ truyền thống. Piano/trumpet/violin là nhạc cụ phương Tây.',

  'the tet holiday ______ in late january or early february each year.':
    'Thì hiện tại đơn với "The Tet holiday" (số ít) → "falls" (xảy ra vào). "Fall" là nguyên thể, "is fallen" sai cấu trúc, "falling" thiếu trợ động từ.',

  'people ______ incense and flowers on the altar during tet.':
    'Thì hiện tại đơn với chủ ngữ số nhiều "people" → "place". "Places" cho he/she/it, "are placing" là tiếp diễn, "placed" là quá khứ.',

  'the carnival ______ every year in february in rio de janeiro.':
    '"Is held" là thể bị động hiện tại đơn (passive voice): the carnival được tổ chức. "Is hold" sai, "holds" là chủ động, "holding" thiếu trợ động từ.',

  'during the lantern festival, people ______ lanterns down the river.':
    '"Release" (thả) là hành động thả đèn lồng xuống sông — truyền thống lễ hội đèn lồng. "Catch" là bắt, "break" là phá vỡ, "throw" là ném mạnh.',

  'this genre of music is ______ by a soft melody and emotional lyrics.':
    '"Characterised" (đặc trưng bởi) là thể bị động đúng: được đặc trưng bởi giai điệu nhẹ nhàng. "Created" là được tạo ra, "replaced" là được thay thế, "discovered" là được khám phá.',

  'the ______ is a large stringed instrument played in orchestras.':
    '"Cello" (đàn cello) là nhạc cụ dây lớn trong dàn nhạc. "Flute" là kèn sáo, "guitar" là đàn guitar, "trumpet" là kèn trumpet — đều không phải nhạc cụ dây lớn trong orchestra.',

  'traditional ______ like quan ho folk songs are preserved by local artists.':
    '"Music" (âm nhạc) phù hợp — "quan ho" là loại âm nhạc dân gian. "Sport/food/dance" không phù hợp với "quan ho folk songs".',

  'the hue ______ festival is held every two years and attracts global artists.':
    '"Arts" (Nghệ thuật) — Festival Nghệ thuật Huế là sự kiện văn hóa nghệ thuật quốc tế lớn. "Food/Film/Sports" không đúng với đặc điểm của festival này.',

  'he ______ the guitar in a band since he was thirteen.':
    '"Has played" là thì hiện tại hoàn thành với "since" (kể từ khi). Hành động bắt đầu từ quá khứ và vẫn tiếp diễn. "Plays" là hiện tại đơn, "played" là quá khứ đơn.',

  // Unit 5 - Văn hóa Việt Nam
  'ao dai is the ______ costume of vietnam.':
    '"Traditional" (truyền thống) là tính từ đúng mô tả áo dài. "Foreign" là nước ngoài, "modern" là hiện đại, "casual" là thường ngày.',

  'hoi an ______ town is a unesco world heritage site.':
    '"Ancient" (cổ đại) — Phố cổ Hội An. "New" là mới, "Modern" là hiện đại, "Small" là nhỏ — đều không phải tên gọi chính thức.',

  'the one pillar ______ is one of the most iconic symbols of hanoi.':
    '"Pagoda" (chùa) — Chùa Một Cột là biểu tượng nổi tiếng của Hà Nội. "Tower" là tháp, "Temple" là đền, "Palace" là cung điện.',

  'chung cake is traditionally ______ during the tet holiday.':
    '"Made" (được làm) là dạng bị động đúng: bánh chưng được làm (gói). "Eaten" là được ăn, "bought" là được mua, "cooked" là được nấu — đều có thể nhưng "made" đúng truyền thống nhất.',

  'the vietnamese ______ is made of bamboo and has a round shape.':
    '"Hat" (nón) — Nón lá Việt Nam làm bằng tre và có hình tròn. "Bag/shirt/shoe" không làm bằng tre có hình tròn.',

  'hanoi was ______ as the capital of vietnam over 1,000 years ago.':
    '"Chosen" là thể bị động của "choose" (lựa chọn): Hà Nội được chọn làm thủ đô. "Choose" là hiện tại, "choosing" là V-ing, "chooses" thêm -s.',

  'the mid-autumn festival is celebrated ______ the 15th of the 8th lunar month.':
    '"On" dùng với ngày cụ thể (on the 15th). "In" với tháng/năm, "at" với giờ hoặc địa điểm nhỏ, "during" với khoảng thời gian.',

  'water puppetry ______ a form of art unique to the red river delta.':
    '"Is" dùng vì "water puppetry" là chủ ngữ số ít không đếm được. "Are/were" dùng cho số nhiều, "have" sai cấu trúc.',

  'vietnamese people often exchange ______ wishes during tet.':
    '"New Year" (năm mới) — người Việt trao nhau lời chúc năm mới trong dịp Tết. "Sad" là buồn, "lucky" không đủ cụ thể, "lucky money" là tiền lì xì (không phải wishes).',

  'the ______ in hue was the home of vietnamese emperors.':
    '"Citadel" (Kinh thành) — Kinh thành Huế là nơi ở của các hoàng đế Việt Nam. "Museum" là bảo tàng, "library" là thư viện, "market" là chợ.',

  // Unit 6 - Môi trường
  'we should ______ plastic bags and use reusable ones instead.':
    '"Reduce" (giảm thiểu) túi ni lông và dùng túi tái sử dụng. "Use more" là tăng thêm (ngược), "produce" là sản xuất, "buy" là mua.',

  'cutting down forests leads to the loss of ______ and biodiversity.':
    '"Habitats" (môi trường sống) bị mất khi chặt rừng. "Factories/technology" không liên quan, "pollution" là ô nhiễm (kết quả, không phải mất mát).',

  'geothermal energy comes from the ______ inside the earth.':
    '"Heat" (nhiệt) — năng lượng địa nhiệt (geothermal) đến từ nhiệt lượng trong lòng đất. "Water/light/gas" không phải nguồn gốc của địa nhiệt.',

  'tidal energy uses the movement of ______ to generate electricity.':
    '"Tides" (thủy triều) — tidal energy là năng lượng thủy triều, dùng chuyển động lên xuống của nước biển. "Wind" là gió (wind energy), "sun" là mặt trời (solar), "rivers" là sông (hydroelectric).',

  'burning fossil fuels releases ______ gases that cause global warming.':
    '"Greenhouse" gases (khí nhà kính) — đốt nhiên liệu hóa thạch thải khí nhà kính gây hiệu ứng nhà kính và nóng lên toàn cầu. "Clean/fresh/natural" là tính từ tích cực, ngược ý.',

  'people are encouraged to ______ paper, glass, and plastic to protect the environment.':
    '"Recycle" (tái chế) — để bảo vệ môi trường, người ta được khuyến khích tái chế giấy, thủy tinh, nhựa. "Waste/burn/throw away" đều gây hại môi trường.',

  '______ pollution makes it difficult for people to breathe in big cities.':
    '"Air" (không khí) pollution — ô nhiễm không khí làm khó thở, đặc biệt ở thành phố lớn. "Water" là nước, "Noise" là tiếng ồn, "Land" là đất.',

  'the government is investing in ______ energy to reduce dependence on oil.':
    '"Renewable" (tái tạo) energy — năng lượng tái tạo giúp giảm phụ thuộc vào dầu mỏ. "Wasteful" là lãng phí, "expensive" là đắt, "dangerous" là nguy hiểm.',

  'if we ______ natural resources carelessly, future generations will suffer.':
    '"Waste" (lãng phí) tài nguyên bất cẩn → thế hệ tương lai sẽ chịu hậu quả. Câu điều kiện loại 1 với if + hiện tại đơn. "Save/protect" là bảo tồn (tích cực, không gây hậu quả xấu).',

  'a ______ car runs on electricity instead of petrol.':
    '"Electric" (điện) car chạy bằng điện thay xăng. "Sport" là xe thể thao, "solar-powered" chạy năng lượng mặt trời (khác điện), "racing" là xe đua.',

  // Unit 7 - Giao thông
  'cyclists must ______ a helmet to protect their heads.':
    '"Wear" (đội/mặc) — đội mũ bảo hiểm. "Put" cần "on" (put on), "have" là có, "take" là lấy/mang đi.',

  'the red traffic light means you must ______.':
    '"Stop" (dừng lại) — đèn đỏ = phải dừng. Đây là quy tắc giao thông cơ bản.',

  'she was fined because she ______ a red light.':
    '"Ran" (vượt qua) — "run a red light" là cụm cố định nghĩa là vượt đèn đỏ. "Stops at" là dừng đúng, "passes" hiện tại, "sees" là nhìn thấy.',

  'a ______ is a road where pedestrians can cross safely.':
    '"Zebra crossing" (vạch sang đường) là nơi người đi bộ qua đường an toàn. "Motorway" là đường cao tốc, "bus lane" là làn xe buýt, "flyover" là cầu vượt.',

  'drink-driving is ______ and can lead to serious accidents.':
    '"Dangerous" (nguy hiểm) — lái xe khi say rượu rất nguy hiểm và gây tai nạn nghiêm trọng. "Safe" và "legal" trái nghĩa, "helpful" không liên quan.',

  'the ______ sign tells drivers the maximum speed allowed on a road.':
    '"Speed limit" (giới hạn tốc độ) — biển báo giới hạn tốc độ cho biết tốc độ tối đa được phép. "No parking" cấm đỗ, "no entry" cấm vào, "roundabout" là bảng chỉ vòng xuyến.',

  "you ______ use your phone while driving. it is against the law.":
    '"Mustn\'t" (tuyệt đối không được) — dùng điện thoại khi lái xe là vi phạm pháp luật. "Should" là nên, "can" là có thể, "may" là được phép — đều không đủ mạnh cho lệnh cấm pháp lý.',

  'a ______ bridge allows vehicles to cross a river or valley.':
    '"Suspension" (cầu treo) — cầu treo cho phép xe qua sông hoặc thung lũng. "Tunnel" là đường hầm (dưới đất), "flyover" là cầu vượt giao lộ, "roundabout" là vòng xuyến.',

  'traffic ______ occurs when too many vehicles are on the road at the same time.':
    '"Congestion" (tắc nghẽn giao thông) xảy ra khi quá nhiều xe cùng lúc. "Light" là đèn giao thông, "sign" là biển báo, "accident" là tai nạn.',

  'passengers on motorbikes ______ wear helmets by law.':
    '"Have to" (phải) — bắt buộc theo pháp luật. "Don\'t need to" không cần, "couldn\'t" không thể (quá khứ), "may not" không được phép — đều không đúng ý bắt buộc pháp lý.',

  // Unit 8 - Phim ảnh
  'a ______ film keeps audiences on the edge of their seats.':
    '"Thriller" (phim kinh dị/hồi hộp) là thể loại khiến khán giả ngồi không yên vì hồi hộp. "Boring" là nhàm chán, "animation" là hoạt hình, "romance" là lãng mạn.',

  'the film won the ______ for best director at the festival.':
    '"Award" (giải thưởng) cho đạo diễn xuất sắc nhất tại liên hoan phim. "Medal" thường dùng trong thể thao, "prize" có thể dùng nhưng "award" cụ thể hơn cho phim, "title" là tước hiệu.',

  'i ______ this horror film before, so i know the ending.':
    '"Have seen" là thì hiện tại hoàn thành, diễn tả trải nghiệm trong quá khứ có liên quan đến hiện tại (biết kết thúc). "See" là hiện tại, "saw" là quá khứ đơn không nhấn mạnh liên quan hiện tại.',

  'the story of this film ______ place in ancient rome.':
    '"Takes place" (xảy ra) là cụm cố định: the story takes place = câu chuyện diễn ra ở... "Takes up" nghĩa khác, "took" là quá khứ, "is taking" là tiếp diễn.',

  'she is the ______ of the film — she directed and produced it.':
    '"Director" (đạo diễn) — người chỉ đạo và sản xuất phim. "Actor" là diễn viên, "screenwriter" là biên kịch, "editor" là biên tập.',

  'the special ______ in this action film look incredibly realistic.':
    '"Effects" — "special effects" (hiệu ứng đặc biệt) trong phim hành động. "Directors/actors/scenes" không kết hợp với "special" trong ngữ cảnh này.',

  'animated films are enjoyed by both children ______ adults.':
    '"And" — "both...and..." là cặp liên từ cố định: both children and adults. "Or" là hoặc, "but" là nhưng, "so" là vì vậy.',

  'the film is ______ on a true story about a vietnamese war hero.':
    '"Based" — "based on" là cụm cố định: dựa trên. "Basing" là V-ing, "base/bases" thiếu thể bị động.',

  'she cried at the ______ of the film when the hero sacrificed himself.':
    '"End" (phần cuối) — cô ấy khóc ở cuối phim khi nhân vật hi sinh. "Beginning" là đầu phim, "preview" là xem trước, "trailer" là đoạn quảng cáo phim.',

  'a ______ is a short clip used to promote an upcoming film.':
    '"Trailer" (đoạn giới thiệu phim) là clip ngắn quảng bá phim sắp ra. "Sequel" là phần tiếp theo, "review" là bài đánh giá, "script" là kịch bản.',

  // Quá khứ đơn
  'they ______ a wonderful time at the beach last summer.':
    '"Had" là quá khứ đơn của "have" — họ đã có kỳ nghỉ tuyệt vời. "Last summer" là dấu hiệu thì quá khứ. "Have/has" là hiện tại, "having" thiếu trợ động từ.',

  'she ______ her homework before dinner yesterday.':
    '"Finished" là quá khứ đơn của "finish" — "yesterday" là dấu hiệu quá khứ. "Finishes" là hiện tại, "finishing" thiếu trợ động từ, "has finished" là hiện tại hoàn thành (không dùng với yesterday).',

  '______ they visit the museum last weekend?':
    '"Did" dùng trong câu hỏi quá khứ đơn: Did they visit...? "Last weekend" là dấu hiệu quá khứ. "Do/Are" là hiện tại, "Were" dùng cho to be.',

  "he ______ to his friend's birthday party last saturday.":
    '"Went" là quá khứ bất quy tắc của "go". "Last Saturday" = dấu hiệu quá khứ đơn. "Goes" là hiện tại số ít, "go" là nguyên thể, "going" thiếu trợ động từ.',

  'i ______ a great novel in two days last week.':
    '"Read" (đọc, quá khứ) — read có dạng quá khứ giống nguyên thể nhưng phát âm khác (red). "Last week" là dấu hiệu quá khứ đơn. "Reads" là hiện tại, "reading" thiếu trợ, "have read" không dùng với last week.',

  // Hiện tại hoàn thành
  'i ______ never eaten sushi before. this is my first time.':
    '"Have" — thì hiện tại hoàn thành với chủ ngữ "I": I have never eaten. "This is my first time" xác nhận đây là trải nghiệm lần đầu. "Did" là quá khứ đơn, "had" là quá khứ hoàn thành.',

  'she ______ already finished her science project.':
    '"Has" — hiện tại hoàn thành với "she" (số ít): she has already finished. "Have" dùng cho I/you/we/they, "did" là quá khứ đơn, "had" là quá khứ hoàn thành.',

  '______ you ever seen the northern lights? no, never.':
    '"Have" — câu hỏi hiện tại hoàn thành: Have you ever seen...? "Did" dùng cho quá khứ đơn, "Was" cho to be quá khứ, "Do" cho hiện tại đơn.',

  'they ______ been best friends since primary school.':
    '"Have" — hiện tại hoàn thành với "they" (số nhiều): they have been. "Since" xác nhận dùng hiện tại hoàn thành. "Are/were" dùng cho to be thường, "had" là quá khứ hoàn thành.',

  'he ______ just received a letter from his pen pal in japan.':
    '"Has" — hiện tại hoàn thành với "he" (số ít): he has just received. "Just" thường kết hợp với hiện tại hoàn thành. "Did" là quá khứ đơn, "had" là quá khứ hoàn thành, "was" cho to be.',

  // Bị động cách
  'the new bridge ______ last year by the local authority.':
    '"Was built" là bị động quá khứ: be + V3. "Last year" = quá khứ, "by" sau → bị động. "Built" thiếu "was", "is built" là hiện tại bị động, "builds" là chủ động.',

  'english ______ in more than 50 countries around the world.':
    '"Is spoken" là bị động hiện tại đơn: tiếng Anh được nói ở hơn 50 quốc gia. "Speak" là chủ động, "spoke" là quá khứ chủ động, "speaking" thiếu trợ động từ.',

  'the award ceremony ______ every year in the capital city.':
    '"Is held" là bị động hiện tại đơn: lễ trao giải được tổ chức mỗi năm. "Hold" là chủ động nguyên thể, "holds" là chủ động số ít, "held" là quá khứ chủ động.',

  'the message ______ to all students by the teacher this morning.':
    '"Was sent" là bị động quá khứ đơn: thông điệp được gửi. "This morning" = quá khứ gần, "by the teacher" = dấu hiệu bị động. "Send/sent" là chủ động, "is sending" là tiếp diễn.',

  'rice ______ in many asian countries, especially vietnam and thailand.':
    '"Is grown" là bị động hiện tại đơn: lúa được trồng ở nhiều nước châu Á. "Grew/grows" là chủ động, "growing" thiếu trợ động từ.',

  // Mệnh đề quan hệ
  'the boy ______ sits next to me is very good at maths.':
    '"Who" dùng cho người (the boy = person) trong mệnh đề quan hệ chủ ngữ. "Whom" dùng cho tân ngữ, "which" cho vật, "whose" cho sở hữu.',

  'the book ______ i borrowed from the library was very interesting.':
    '"Which" dùng cho vật (the book) trong mệnh đề quan hệ tân ngữ. "Who/whose" dùng cho người, "where" dùng cho nơi chốn.',

  'the city ______ i grew up has changed a lot.':
    '"Where" dùng cho nơi chốn (the city = place). "Which/who/whose" không dùng để thay thế trạng từ chỉ nơi.',

  "she is the girl ______ father is a famous scientist.":
    '"Whose" diễn tả sở hữu: whose father = cha của cô gái đó. "Who" làm chủ ngữ, "which" cho vật, "that" không dùng cho sở hữu.',

  'the museum ______ we visited last week displays ancient artefacts.':
    '"That" có thể dùng thay cho both who/which trong mệnh đề quan hệ xác định. "Where" dùng thay trạng từ nơi chốn, "who" cho người, "whose" cho sở hữu.',

  // Câu điều kiện loại 1
  'if you study hard, you ______ the exam easily.':
    'Câu điều kiện loại 1: if + hiện tại đơn, will + V nguyên thể → "will pass". "Pass" thiếu "will", "would pass" là loại 2, "passed" là quá khứ.',

  "unless she ______ harder, she won't improve her grades.":
    '"Unless" = "if...not" (trừ khi). Câu điều kiện loại 1 → mệnh đề unless dùng hiện tại đơn: "studies" (chủ ngữ she số ít). "Study" không thêm -s, "studied" là quá khứ.',

  "if they ______ a map, they might get lost in the city.":
    '"Don\'t have" — câu điều kiện loại 1 phủ định: nếu họ không có bản đồ... Hiện tại đơn phủ định với "they". "Didn\'t have" là loại 2, "won\'t have" sai (không dùng will trong if).',

  'we will go hiking ______ the weather is fine this weekend.':
    '"If" tạo câu điều kiện loại 1: chúng ta sẽ đi bộ đường dài nếu thời tiết đẹp. "Unless" = if not (ngược nghĩa), "although" = mặc dù, "because" = vì.',

  'if you ______ too much tv, your eyes will get tired.':
    'Câu điều kiện loại 1: if + hiện tại đơn. Chủ ngữ "you" dùng "watch" (nguyên thể). "Watches" cho he/she/it, "watched" là quá khứ, "will watch" sai (không dùng will sau if).',

  // So sánh
  'he runs ______ than his teammates, so he always wins.':
    '"Faster" là so sánh hơn đúng của "fast" (tính từ/phó từ ngắn). "More fast" sai — tính từ ngắn không dùng more, "fastest" là nhất, "most fast" sai.',

  'the amazon is ______ river in south america.':
    '"The longest" là so sánh nhất đúng: the + tính từ ngắn + est. "Long" là thường, "longer" là so sánh hơn, "more long" sai quy tắc.',

  'she speaks english ______ fluently than her classmates.':
    '"More" dùng với phó từ dài (fluently) để tạo so sánh hơn: more fluently. "Most" là nhất, "much" và "many" không dùng để so sánh hơn với phó từ.',

  'this film is ______ interesting as the one we watched last week.':
    '"As...as" là cấu trúc so sánh bằng: as interesting as = thú vị như... "More" là so sánh hơn, "very/so" không tạo cấu trúc so sánh bằng.',

  'the new sports centre is ______ than the old one.':
    '"More modern" là so sánh hơn đúng của tính từ 2+ âm tiết "modern". "Modern" là thường, "most modern" là nhất, "as modern" cần "as...as".',

  // Từ loại
  'the word "pollution" is a ______.':
    '"Noun" (danh từ) — "pollution" là danh từ chỉ hiện tượng ô nhiễm. Đuôi -tion/-sion thường là danh từ trong tiếng Anh.',

  'the ______ form of "happy" is "happily".':
    '"Adverb" (trạng từ) — "happily" là trạng từ (happy + ly). Trạng từ thường kết thúc bằng -ly mô tả hành động.',

  'the adjective form of "music" is ______.':
    '"Musical" là tính từ của "music" (nhạc → có tính âm nhạc). "Musician" là danh từ (nhạc sĩ), "musically" là trạng từ, "musicness" không tồn tại.',

  'choose the correct noun: "the ______ of the new school was celebrated last week."':
    '"Opening" (lễ khai trương) là danh từ đúng trong câu. "Open" là động từ/tính từ, "opened" là quá khứ, "openly" là trạng từ.',

  'the verb form of "decision" is ______.':
    '"Decide" là động từ của "decision" (quyết định → quyết định). "Decisive" là tính từ, "decidedly" là trạng từ, "decision" chính nó là danh từ.',

  // Từ vựng chuyên đề
  '"renewable" energy sources include solar, wind and ______ power.':
    '"Hydroelectric" (thủy điện) là nguồn năng lượng tái tạo. "Nuclear" là hạt nhân (không tái tạo), "fossil" là nhiên liệu hóa thạch (không tái tạo), "coal" là than đá.',

  'which word means "to feel sorry for someone who is suffering"?':
    '"Sympathy" (sự cảm thông) = cảm thấy thương tiếc người đang đau khổ. "Envy" là ghen tị, "anger" là tức giận, "jealousy" là ghen tuông.',

  'a ______ is a person who makes and repairs wooden furniture.':
    '"Carpenter" (thợ mộc) làm và sửa đồ nội thất gỗ. "Plumber" là thợ ống nước, "electrician" là thợ điện, "mechanic" là thợ cơ khí.',

  'the opposite of "ancient" is ______.':
    '"Modern" (hiện đại) là trái nghĩa của "ancient" (cổ đại). "Traditional/historical/cultural" không phải trái nghĩa trực tiếp.',

  'she made a ______ to donate 10% of her salary to charity.':
    '"Commitment" (cam kết) là lời cam kết nghiêm túc về hành động cụ thể. "Promise" gần nghĩa nhưng ít trang trọng hơn, "request" là yêu cầu, "suggestion" là gợi ý.',

  'which word is a synonym of "preserve"?':
    '"Protect" (bảo vệ) là từ đồng nghĩa gần nhất của "preserve" (bảo tồn). "Destroy" là phá hủy (trái nghĩa), "waste" là lãng phí, "pollute" là ô nhiễm.',

  'the word "optimistic" means ______.':
    '"Having a positive view about the future" — "optimistic" = lạc quan, có cái nhìn tích cực về tương lai. Trái nghĩa là "pessimistic" (bi quan).',

  'she was ______ of her achievement in the national science competition.':
    '"Proud" (tự hào) là cảm xúc đúng khi đạt thành tích. "Ashamed" là xấu hổ, "afraid" là sợ hãi, "tired" là mệt mỏi.',

  'which word means "easy to understand"?':
    '"Clear" (rõ ràng, dễ hiểu) đúng nghĩa. "Complex" là phức tạp, "confusing" là gây rối (khó hiểu), "vague" là mơ hồ.',

  'the word ______ means a journey made for a special purpose.':
    '"Expedition" (cuộc thám hiểm/chuyến đi với mục đích đặc biệt) phù hợp nhất. "Trip" là chuyến đi thông thường, "travel" là động từ/danh từ chung, "tour" là tour du lịch.',

  // Giới từ
  'she is very good ______ playing chess. she wins every time.':
    '"Good at" là cụm cố định: giỏi về... "Be good at + V-ing/noun". Không dùng good in/for/on.',

  'the festival takes place ______ the end of the lunar calendar year.':
    '"At the end of" là cụm cố định: vào cuối (thời điểm). "In" dùng với tháng/năm/khoảng thời gian dài hơn, "on" với ngày cụ thể, "by" nghĩa là "trước".',

  'he is responsible ______ organising the school event.':
    '"Responsible for" là cụm cố định: chịu trách nhiệm về. Không dùng responsible of/in/at.',

  'the students are excited ______ the upcoming field trip.':
    '"Excited about" là cụm cố định: hào hứng về... "Excited of/with" không đúng, "excited in" cũng không dùng.',

  'this painting was created ______ a local artist in the 18th century.':
    '"By" dùng trong câu bị động để chỉ tác nhân thực hiện: created by (được tạo bởi). "From/with/of" không dùng cho tác nhân trong bị động.',

  // Đọc hiểu
  "read: \"every saturday, mai and her friends volunteer at the local shelter. they prepare food, read to the elderly, and clean the rooms.\" — what is the main purpose of mai's saturday activity?":
    'Đoạn văn nói họ "volunteer at the local shelter" = tình nguyện tại nơi trú ẩn → mục đích là giúp đỡ người ở đó. Không có thông tin về kiếm tiền hay tập nấu ăn.',

  'read: "every saturday, mai and her friends volunteer at the local shelter. they prepare food, read to the elderly, and clean the rooms." — which activity is not mentioned?':
    'Đoạn văn liệt kê: chuẩn bị thức ăn, đọc sách cho người già, dọn phòng. "Teaching English" (dạy tiếng Anh) KHÔNG được đề cập.',

  'read: "ha long bay is a unesco world heritage site located in quang ninh province. it features over 1,600 islands and islets." — where is ha long bay?':
    'Đoạn văn ghi "located in Quang Ninh Province" → Vịnh Hạ Long ở tỉnh Quảng Ninh.',

  'read: "ha long bay is a unesco world heritage site located in quang ninh province. it features over 1,600 islands and islets." — how many islands does ha long bay have?':
    'Đoạn văn ghi "over 1,600 islands and islets" → hơn 1.600 đảo.',

  "read: \"phong nha-ke bang national park is home to the world's largest cave, son doong. scientists discovered it in 2009.\" — when was son doong discovered?":
    'Đoạn văn ghi "discovered it in 2009" → Sơn Đoòng được phát hiện năm 2009.',

  "read: \"phong nha-ke bang national park is home to the world's largest cave, son doong.\" — what record does son doong hold?":
    'Đoạn văn ghi "world\'s largest cave" → Sơn Đoòng giữ kỷ lục hang động lớn nhất thế giới.',

  'read: "an is a hard-working student. he spends 3 hours studying every evening and always scores above 9 in every test." — what can we infer about an?':
    'An học 3 tiếng mỗi tối và luôn đạt điểm cao → có thể suy luận An rất chăm chỉ và tận tụy với việc học (dedicated to his studies).',

  'read: "the school recycling club collects used paper, bottles and cans every friday. the items are then sold and the money is used to buy books for the library." — what happens to the money from selling recycled items?':
    'Đoạn văn ghi "the money is used to buy books for the library" → tiền được dùng để mua sách cho thư viện.',

  // Medium - Lớp 7
  'by the time the teacher arrived, the students ______ already started the exercise.':
    '"Had" — thì quá khứ hoàn thành (past perfect): "had already started" diễn tả hành động xảy ra trước một hành động quá khứ khác (teacher arrived). Dùng "had + V3".',

  '______ harder, she would have passed the entrance exam.':
    '"If she had studied" — câu điều kiện loại 3 (giả định quá khứ không có thật): If + had + V3, would have + V3. Cô ấy đã không học đủ chăm và đã trượt kỳ thi.',

  'the students were told ______ their assignments by friday.':
    '"To submit" — cấu trúc bị động + to-infinitive: "were told to do something" = được bảo phải làm gì. Sau "tell + O" dùng to-infinitive.',

  'it is the first time she ______ a solo performance on stage.':
    '"Has given" — cấu trúc "It is the first time + present perfect": đây là lần đầu tiên cô ấy biểu diễn solo. "Gives" là hiện tại đơn, "gave" là quá khứ không hợp cấu trúc này.',

  'the new law requires factories ______ their carbon emissions.':
    '"To reduce" — cấu trúc "require + O + to-infinitive": yêu cầu các nhà máy phải giảm. "Reduce" thiếu "to", "reducing" là V-ing, "reduced" là quá khứ.',

  "despite ______ hard all week, she didn't finish the project.":
    '"Working" — sau "despite" dùng V-ing hoặc danh từ. "Despite + V-ing" = mặc dù đã... "Work/worked" là nguyên thể/quá khứ, "to work" sai sau despite.',

  'the teacher asked the class ______ their phones away.':
    '"To put" — cấu trúc "ask + O + to-infinitive": yêu cầu ai làm gì. "Putting" là V-ing, "put" thiếu "to", "have put" sai cấu trúc.',

  'not only ______ the prize, but she also received a scholarship.':
    '"Did she win" — đảo ngữ nhấn mạnh với "Not only": Not only + did + S + V. Đây là cấu trúc đảo ngữ trang trọng trong tiếng Anh.',

  'he suggested ______ the meeting to next monday.':
    '"Postponing" — sau "suggest" dùng V-ing: suggest doing something. "To postpone" sai (không dùng to-infinitive sau suggest), "postponed/postpone" sai ngữ pháp.',

  'this is the most fascinating book ______ i have ever read.':
    '"That" — sau cụm so sánh nhất (the most fascinating book), mệnh đề quan hệ dùng "that" (không dùng "which" sau dạng so sánh nhất). "Who/what/where" không phù hợp.',

  // Hard - Lớp 7
  'the documentary, ______ explores ocean pollution, was nominated for an oscar.':
    '"Which" — mệnh đề quan hệ không xác định (non-defining) cho vật (documentary). Dùng dấu phẩy và "which". "Who" cho người, "where" cho nơi, "whose" cho sở hữu.',

  '______ the heavy rain, the football match continued without interruption.':
    '"Despite" — "despite + noun/V-ing": mặc dù có mưa to. "Although" cần mệnh đề đầy đủ (although it rained heavily), "However" là trạng từ, "Because of" nghĩa ngược lại.',

  'the new recycling policy, ______ was introduced last year, has reduced waste by 30%.':
    '"Which" — mệnh đề quan hệ không xác định cho vật/ý (policy). Có dấu phẩy → mệnh đề phụ thêm thông tin. "That" không dùng trong mệnh đề quan hệ không xác định.',

  'had they arrived earlier, they ______ the opening ceremony.':
    '"Would not have missed" — câu điều kiện loại 3 đảo ngữ: Had + S + V3, S + would (not) have + V3. Giả định ngược với thực tế trong quá khứ.',

  'the more you practise, ______ you become at speaking english.':
    '"The more fluent" — cấu trúc "the more...the more" (càng...càng...): The more you practise, the more fluent you become. "The most fluent" là nhất (không dùng ở đây), "the fluent" thiếu "more", "more fluent" thiếu "the".',
};

async function main() {
  const questions = await p.question.findMany({
    where: { explanation: null },
    select: { id: true, content: true },
  });

  console.log(`🔍 Tìm thấy ${questions.length} câu chưa có giải thích.`);
  let updated = 0, skipped = 0;

  for (const q of questions) {
    const key = q.content.trim().toLowerCase();
    const explanation = EXPLANATIONS[key];
    if (!explanation) {
      skipped++;
      continue;
    }
    await p.question.update({
      where: { id: q.id },
      data: { explanation },
    });
    updated++;
  }

  console.log(`✅ Đã cập nhật giải thích cho ${updated} câu.`);
  if (skipped > 0) console.log(`⚠  ${skipped} câu chưa có giải thích trong bản đồ.`);

  const remaining = await p.question.count({ where: { explanation: null } });
  console.log(`📊 Còn lại ${remaining} câu chưa có giải thích.`);
}

main().catch(console.error).finally(() => p.$disconnect());
