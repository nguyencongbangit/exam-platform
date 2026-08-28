const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const SUBJECT_ID = 'sub-anh';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';

function q(content, options, difficulty = 'EASY') {
  // options: [{ key, text, correct }]
  return { content, options, difficulty };
}

// 100 câu Tiếng Anh lớp 5 — chương trình SGK Tiếng Anh 5 (i-Learn Smart Start / Family & Friends)
// Chủ đề: nghề nghiệp, gia đình, hoạt động hàng ngày, mô tả, so sánh, thì hiện tại, tương lai, câu hỏi
const QUESTIONS = [
  // ── NGHỀ NGHIỆP (Unit 1-2) ────────────────────────────────────────────────
  q('What does a ______ do? He/She teaches students at school.',
    [{k:'A',t:'doctor',c:false},{k:'B',t:'teacher',c:true},{k:'C',t:'farmer',c:false},{k:'D',t:'cook',c:false}]),

  q('My father is a ______. He cooks food in a restaurant.',
    [{k:'A',t:'chef',c:true},{k:'B',t:'pilot',c:false},{k:'C',t:'nurse',c:false},{k:'D',t:'driver',c:false}]),

  q('She works at a hospital and helps the doctor. She is a ______.',
    [{k:'A',t:'teacher',c:false},{k:'B',t:'farmer',c:false},{k:'C',t:'nurse',c:true},{k:'D',t:'singer',c:false}]),

  q('He flies aeroplanes. He is a ______.',
    [{k:'A',t:'pilot',c:true},{k:'B',t:'postman',c:false},{k:'C',t:'mechanic',c:false},{k:'D',t:'baker',c:false}]),

  q('______ do you want to be when you grow up?',
    [{k:'A',t:'Where',c:false},{k:'B',t:'What',c:true},{k:'C',t:'Who',c:false},{k:'D',t:'How',c:false}]),

  q('I want to be a ______ because I love animals.',
    [{k:'A',t:'vet',c:true},{k:'B',t:'lawyer',c:false},{k:'C',t:'engineer',c:false},{k:'D',t:'reporter',c:false}]),

  q('My mother works in a school. She is a ______.',
    [{k:'A',t:'doctor',c:false},{k:'B',t:'teacher',c:true},{k:'C',t:'police officer',c:false},{k:'D',t:'firefighter',c:false}]),

  q('He writes news for a newspaper. He is a ______.',
    [{k:'A',t:'journalist',c:true},{k:'B',t:'scientist',c:false},{k:'C',t:'soldier',c:false},{k:'D',t:'dentist',c:false}]),

  // ── GIA ĐÌNH & MÔ TẢ (Unit 3-4) ─────────────────────────────────────────
  q('My grandfather is my father\'s ______.',
    [{k:'A',t:'brother',c:false},{k:'B',t:'uncle',c:false},{k:'C',t:'father',c:true},{k:'D',t:'son',c:false}]),

  q('She has ______ hair and ______ eyes.',
    [{k:'A',t:'long / blue',c:true},{k:'B',t:'tall / big',c:false},{k:'C',t:'heavy / short',c:false},{k:'D',t:'fast / green',c:false}]),

  q('Tom is ______ than his brother. He weighs 60 kg and his brother weighs 45 kg.',
    [{k:'A',t:'thinner',c:false},{k:'B',t:'shorter',c:false},{k:'C',t:'heavier',c:true},{k:'D',t:'younger',c:false}]),

  q('My sister is ______ than me. She is 165 cm and I am 150 cm.',
    [{k:'A',t:'shorter',c:false},{k:'B',t:'taller',c:true},{k:'C',t:'older',c:false},{k:'D',t:'thinner',c:false}]),

  q('______ is your brother? He is 12 years old.',
    [{k:'A',t:'How tall',c:false},{k:'B',t:'How heavy',c:false},{k:'C',t:'How old',c:true},{k:'D',t:'How far',c:false}]),

  q('______ is she? She is 40 kg.',
    [{k:'A',t:'How old',c:false},{k:'B',t:'How tall',c:false},{k:'C',t:'How far',c:false},{k:'D',t:'How heavy',c:true}]),

  q('My cousin has ______ hair. It is not long.',
    [{k:'A',t:'short',c:true},{k:'B',t:'curly',c:false},{k:'C',t:'straight',c:false},{k:'D',t:'dark',c:false}]),

  // ── HOẠT ĐỘNG / THÌ HIỆN TẠI TIẾP DIỄN ──────────────────────────────────
  q('What ______ you doing now? I am reading a book.',
    [{k:'A',t:'do',c:false},{k:'B',t:'are',c:true},{k:'C',t:'is',c:false},{k:'D',t:'does',c:false}]),

  q('She ______ watching TV at the moment.',
    [{k:'A',t:'is',c:true},{k:'B',t:'are',c:false},{k:'C',t:'am',c:false},{k:'D',t:'do',c:false}]),

  q('They ______ playing football in the park now.',
    [{k:'A',t:'is',c:false},{k:'B',t:'am',c:false},{k:'C',t:'are',c:true},{k:'D',t:'does',c:false}]),

  q('I ______ listening to music right now.',
    [{k:'A',t:'is',c:false},{k:'B',t:'are',c:false},{k:'C',t:'am',c:true},{k:'D',t:'do',c:false}]),

  q('What is he doing? He ______ swimming.',
    [{k:'A',t:'are',c:false},{k:'B',t:'am',c:false},{k:'C',t:'is',c:true},{k:'D',t:'do',c:false}]),

  // ── THÌ HIỆN TẠI ĐƠN ──────────────────────────────────────────────────────
  q('She ______ to school every day.',
    [{k:'A',t:'go',c:false},{k:'B',t:'goes',c:true},{k:'C',t:'going',c:false},{k:'D',t:'went',c:false}]),

  q('They ______ football every weekend.',
    [{k:'A',t:'plays',c:false},{k:'B',t:'playing',c:false},{k:'C',t:'play',c:true},{k:'D',t:'played',c:false}]),

  q('My father ______ up at 6 o\'clock every morning.',
    [{k:'A',t:'get',c:false},{k:'B',t:'gets',c:true},{k:'C',t:'getting',c:false},{k:'D',t:'got',c:false}]),

  q('______ she like reading books? Yes, she does.',
    [{k:'A',t:'Do',c:false},{k:'B',t:'Is',c:false},{k:'C',t:'Does',c:true},{k:'D',t:'Are',c:false}]),

  q('I ______ not like eating vegetables.',
    [{k:'A',t:'does',c:false},{k:'B',t:'is',c:false},{k:'C',t:'am',c:false},{k:'D',t:'do',c:true}]),

  // ── THÌ TƯƠNG LAI (WILL / GOING TO) ──────────────────────────────────────
  q('It is cloudy. I think it ______ rain soon.',
    [{k:'A',t:'is going to',c:true},{k:'B',t:'did',c:false},{k:'C',t:'was',c:false},{k:'D',t:'has',c:false}]),

  q('She ______ visit her grandparents next Sunday.',
    [{k:'A',t:'visited',c:false},{k:'B',t:'visits',c:false},{k:'C',t:'is going to',c:true},{k:'D',t:'visit',c:false}]),

  q('We ______ go to the beach tomorrow if the weather is nice.',
    [{k:'A',t:'are going to',c:true},{k:'B',t:'went',c:false},{k:'C',t:'goes',c:false},{k:'D',t:'going',c:false}]),

  q('______ you go to the party tonight? Yes, I will.',
    [{k:'A',t:'Do',c:false},{k:'B',t:'Are',c:false},{k:'C',t:'Will',c:true},{k:'D',t:'Did',c:false}]),

  q('He ______ be a doctor when he grows up.',
    [{k:'A',t:'is',c:false},{k:'B',t:'was',c:false},{k:'C',t:'will',c:true},{k:'D',t:'has',c:false}]),

  // ── MÔN HỌC & TRƯỜNG (Unit 5-6) ──────────────────────────────────────────
  q('What is your favourite subject? I love ______ because I like drawing.',
    [{k:'A',t:'Maths',c:false},{k:'B',t:'Art',c:true},{k:'C',t:'Science',c:false},{k:'D',t:'Music',c:false}]),

  q('We have ______ on Monday and Wednesday.',
    [{k:'A',t:'PE',c:true},{k:'B',t:'PE class',c:false},{k:'C',t:'a PE',c:false},{k:'D',t:'the PE',c:false}]),

  q('I study ______ because I want to be a scientist.',
    [{k:'A',t:'History',c:false},{k:'B',t:'Art',c:false},{k:'C',t:'Science',c:true},{k:'D',t:'Music',c:false}]),

  q('______ is your English class? It is on Tuesday and Thursday.',
    [{k:'A',t:'Where',c:false},{k:'B',t:'When',c:true},{k:'C',t:'Who',c:false},{k:'D',t:'What',c:false}]),

  q('My school has ______ floors.',
    [{k:'A',t:'third',c:false},{k:'B',t:'three',c:true},{k:'C',t:'tree',c:false},{k:'D',t:'threes',c:false}]),

  // ── ĐỊA ĐIỂM & CHỈ ĐƯỜNG ─────────────────────────────────────────────────
  q('The supermarket is ______ the bank.',
    [{k:'A',t:'next to',c:true},{k:'B',t:'between',c:false},{k:'C',t:'behind to',c:false},{k:'D',t:'in front',c:false}]),

  q('Go ______ and turn left at the traffic light.',
    [{k:'A',t:'straight ahead',c:true},{k:'B',t:'turn right',c:false},{k:'C',t:'turn back',c:false},{k:'D',t:'go past',c:false}]),

  q('The library is ______ the school and the park.',
    [{k:'A',t:'next to',c:false},{k:'B',t:'in front of',c:false},{k:'C',t:'between',c:true},{k:'D',t:'behind',c:false}]),

  q('______ is the nearest bus stop? It is on Main Street.',
    [{k:'A',t:'What',c:false},{k:'B',t:'When',c:false},{k:'C',t:'Where',c:true},{k:'D',t:'Why',c:false}]),

  q('Turn ______ at the hospital and go straight.',
    [{k:'A',t:'right',c:true},{k:'B',t:'rightly',c:false},{k:'C',t:'rights',c:false},{k:'D',t:'righter',c:false}]),

  // ── SỞ THÍCH & HOẠT ĐỘNG VUI CHƠI ────────────────────────────────────────
  q('Do you like ______? Yes, I love it!',
    [{k:'A',t:'swim',c:false},{k:'B',t:'swimming',c:true},{k:'C',t:'to swimming',c:false},{k:'D',t:'swam',c:false}]),

  q('He enjoys ______ books in his free time.',
    [{k:'A',t:'read',c:false},{k:'B',t:'reads',c:false},{k:'C',t:'reading',c:true},{k:'D',t:'to read',c:false}]),

  q('What do you do in your free time? I like ______.',
    [{k:'A',t:'play chess',c:false},{k:'B',t:'playing chess',c:true},{k:'C',t:'to playing chess',c:false},{k:'D',t:'played chess',c:false}]),

  q('She ______ cooking but she loves eating.',
    [{k:'A',t:'doesn\'t like',c:true},{k:'B',t:'don\'t like',c:false},{k:'C',t:'isn\'t like',c:false},{k:'D',t:'not like',c:false}]),

  q('We always ______ cycling on Sundays.',
    [{k:'A',t:'goes',c:false},{k:'B',t:'going',c:false},{k:'C',t:'go',c:true},{k:'D',t:'went',c:false}]),

  // ── THỜI TIẾT & MÙA ───────────────────────────────────────────────────────
  q('What is the weather like today? It is ______.',
    [{k:'A',t:'sun',c:false},{k:'B',t:'sunny',c:true},{k:'C',t:'sunning',c:false},{k:'D',t:'sunned',c:false}]),

  q('In winter, it is usually ______ and ______.',
    [{k:'A',t:'hot / sunny',c:false},{k:'B',t:'cold / snowy',c:true},{k:'C',t:'warm / rainy',c:false},{k:'D',t:'cool / windy',c:false}]),

  q('______ season do you like best? I like spring.',
    [{k:'A',t:'What',c:true},{k:'B',t:'Which',c:false},{k:'C',t:'When',c:false},{k:'D',t:'How',c:false}]),

  q('It is ______ outside. Don\'t forget your umbrella.',
    [{k:'A',t:'sunny',c:false},{k:'B',t:'hot',c:false},{k:'C',t:'raining',c:true},{k:'D',t:'snowy',c:false}]),

  q('The temperature today is 35°C. It is very ______.',
    [{k:'A',t:'cold',c:false},{k:'B',t:'hot',c:true},{k:'C',t:'cool',c:false},{k:'D',t:'windy',c:false}]),

  // ── ĐỒ ĂN & SỨC KHOẺ ────────────────────────────────────────────────────
  q('You should eat ______ vegetables to stay healthy.',
    [{k:'A',t:'more',c:true},{k:'B',t:'much',c:false},{k:'C',t:'many',c:false},{k:'D',t:'less',c:false}]),

  q('I am thirsty. I would like ______ water, please.',
    [{k:'A',t:'any',c:false},{k:'B',t:'a',c:false},{k:'C',t:'some',c:true},{k:'D',t:'many',c:false}]),

  q('She ______ eat too much sweet food because it is bad for her teeth.',
    [{k:'A',t:'should',c:false},{k:'B',t:'shouldn\'t',c:true},{k:'C',t:'must',c:false},{k:'D',t:'can',c:false}]),

  q('What\'s the matter? I have a ______.',
    [{k:'A',t:'headache',c:true},{k:'B',t:'head aches',c:false},{k:'C',t:'head hurt',c:false},{k:'D',t:'headaching',c:false}]),

  q('You should ______ a lot of water every day.',
    [{k:'A',t:'drank',c:false},{k:'B',t:'drinks',c:false},{k:'C',t:'drinking',c:false},{k:'D',t:'drink',c:true}]),

  // ── GIAO TIẾP CƠ BẢN ──────────────────────────────────────────────────────
  q('A: How are you? B: ______.',
    [{k:'A',t:'I am 10 years old.',c:false},{k:'B',t:'Fine, thank you.',c:true},{k:'C',t:'My name is Tom.',c:false},{k:'D',t:'I am a student.',c:false}]),

  q('A: Nice to meet you! B: ______.',
    [{k:'A',t:'You\'re welcome.',c:false},{k:'B',t:'Thank you very much.',c:false},{k:'C',t:'Nice to meet you too!',c:true},{k:'D',t:'Goodbye.',c:false}]),

  q('A: Can I borrow your pen? B: ______.',
    [{k:'A',t:'No, I don\'t.',c:false},{k:'B',t:'Sure, here you are.',c:true},{k:'C',t:'Yes, I am.',c:false},{k:'D',t:'That\'s right.',c:false}]),

  q('A: What time does the film start? B: ______.',
    [{k:'A',t:'At 7 o\'clock.',c:true},{k:'B',t:'On Saturday.',c:false},{k:'C',t:'In the cinema.',c:false},{k:'D',t:'With my friends.',c:false}]),

  q('A: ______ is your phone number? B: It\'s 090 123 4567.',
    [{k:'A',t:'Where',c:false},{k:'B',t:'What',c:true},{k:'C',t:'How',c:false},{k:'D',t:'When',c:false}]),

  // ── NGỮ PHÁP: CAN / CAN\'T ───────────────────────────────────────────────
  q('He ______ speak three languages. He is very clever.',
    [{k:'A',t:'can\'t',c:false},{k:'B',t:'can',c:true},{k:'C',t:'could not',c:false},{k:'D',t:'not',c:false}]),

  q('She ______ swim because she never learned.',
    [{k:'A',t:'can',c:false},{k:'B',t:'could',c:false},{k:'C',t:'can\'t',c:true},{k:'D',t:'couldn\'t',c:false}]),

  q('______ you play the piano? No, I can\'t.',
    [{k:'A',t:'Are',c:false},{k:'B',t:'Do',c:false},{k:'C',t:'Can',c:true},{k:'D',t:'Is',c:false}]),

  q('Birds ______ fly but they cannot swim like fish.',
    [{k:'A',t:'can\'t',c:false},{k:'B',t:'can',c:true},{k:'C',t:'could not',c:false},{k:'D',t:'are',c:false}]),

  // ── SHOULD / MUST ─────────────────────────────────────────────────────────
  q('You ______ brush your teeth twice a day.',
    [{k:'A',t:'shouldn\'t',c:false},{k:'B',t:'should',c:true},{k:'C',t:'can\'t',c:false},{k:'D',t:'don\'t',c:false}]),

  q('Students ______ use phones in class.',
    [{k:'A',t:'should',c:false},{k:'B',t:'can',c:false},{k:'C',t:'mustn\'t',c:true},{k:'D',t:'will',c:false}]),

  q('You ______ wash your hands before eating.',
    [{k:'A',t:'must',c:true},{k:'B',t:'mustn\'t',c:false},{k:'C',t:'can\'t',c:false},{k:'D',t:'don\'t',c:false}]),

  // ── SO SÁNH HƠN / NHẤT ────────────────────────────────────────────────────
  q('Mount Everest is the ______ mountain in the world.',
    [{k:'A',t:'high',c:false},{k:'B',t:'higher',c:false},{k:'C',t:'highest',c:true},{k:'D',t:'more high',c:false}]),

  q('This book is ______ than that one.',
    [{k:'A',t:'more interesting',c:true},{k:'B',t:'interestinger',c:false},{k:'C',t:'most interesting',c:false},{k:'D',t:'interest',c:false}]),

  q('My bag is ______ than yours.',
    [{k:'A',t:'heavy',c:false},{k:'B',t:'more heavy',c:false},{k:'C',t:'heaviest',c:false},{k:'D',t:'heavier',c:true}]),

  q('She runs ______ in her class.',
    [{k:'A',t:'faster',c:false},{k:'B',t:'more fast',c:false},{k:'C',t:'the fastest',c:true},{k:'D',t:'fast',c:false}]),

  q('Today is ______ than yesterday.',
    [{k:'A',t:'hot',c:false},{k:'B',t:'hotter',c:true},{k:'C',t:'hottest',c:false},{k:'D',t:'most hot',c:false}]),

  // ── TỪ VỰNG TỔNG HỢP ─────────────────────────────────────────────────────
  q('The opposite of "big" is ______.',
    [{k:'A',t:'long',c:false},{k:'B',t:'heavy',c:false},{k:'C',t:'small',c:true},{k:'D',t:'tall',c:false}]),

  q('Which word means a person who puts out fires?',
    [{k:'A',t:'farmer',c:false},{k:'B',t:'firefighter',c:true},{k:'C',t:'fisher',c:false},{k:'D',t:'florist',c:false}]),

  q('Choose the odd one out: cat, dog, fish, table.',
    [{k:'A',t:'cat',c:false},{k:'B',t:'dog',c:false},{k:'C',t:'fish',c:false},{k:'D',t:'table',c:true}]),

  q('Choose the odd one out: red, blue, happy, green.',
    [{k:'A',t:'red',c:false},{k:'B',t:'blue',c:false},{k:'C',t:'happy',c:true},{k:'D',t:'green',c:false}]),

  q('A ______ is a place where you can borrow books.',
    [{k:'A',t:'bookshop',c:false},{k:'B',t:'library',c:true},{k:'C',t:'museum',c:false},{k:'D',t:'hospital',c:false}]),

  q('The word "beautiful" describes ______.',
    [{k:'A',t:'an action',c:false},{k:'B',t:'a place or thing',c:true},{k:'C',t:'a time',c:false},{k:'D',t:'a number',c:false}]),

  q('He went to the ______ to buy vegetables and fruit.',
    [{k:'A',t:'bank',c:false},{k:'B',t:'market',c:true},{k:'C',t:'school',c:false},{k:'D',t:'hospital',c:false}]),

  q('We ______ English at school every day.',
    [{k:'A',t:'learning',c:false},{k:'B',t:'learns',c:false},{k:'C',t:'learn',c:true},{k:'D',t:'learned',c:false}]),

  // ── THỜI GIAN & LỊCH ─────────────────────────────────────────────────────
  q('There are ______ months in a year.',
    [{k:'A',t:'ten',c:false},{k:'B',t:'eleven',c:false},{k:'C',t:'twelve',c:true},{k:'D',t:'thirteen',c:false}]),

  q('What day comes after Wednesday?',
    [{k:'A',t:'Monday',c:false},{k:'B',t:'Tuesday',c:false},{k:'C',t:'Thursday',c:true},{k:'D',t:'Friday',c:false}]),

  q('The first month of the year is ______.',
    [{k:'A',t:'February',c:false},{k:'B',t:'March',c:false},{k:'C',t:'December',c:false},{k:'D',t:'January',c:true}]),

  q('My birthday is ______ the 20th of November.',
    [{k:'A',t:'in',c:false},{k:'B',t:'at',c:false},{k:'C',t:'on',c:true},{k:'D',t:'by',c:false}]),

  q('School starts ______ September.',
    [{k:'A',t:'on',c:false},{k:'B',t:'at',c:false},{k:'C',t:'in',c:true},{k:'D',t:'by',c:false}]),

  // ── GIỚI TỪ / GIỚI TỪ CHỈ NƠI CHỐN ──────────────────────────────────────
  q('The cat is sleeping ______ the sofa.',
    [{k:'A',t:'at',c:false},{k:'B',t:'in',c:false},{k:'C',t:'on',c:true},{k:'D',t:'over',c:false}]),

  q('The keys are ______ the drawer.',
    [{k:'A',t:'on',c:false},{k:'B',t:'in',c:true},{k:'C',t:'at',c:false},{k:'D',t:'from',c:false}]),

  q('She is standing ______ the door.',
    [{k:'A',t:'in front of',c:true},{k:'B',t:'in the front',c:false},{k:'C',t:'next',c:false},{k:'D',t:'behind of',c:false}]),

  q('He lives ______ a farm in the countryside.',
    [{k:'A',t:'at',c:false},{k:'B',t:'on',c:true},{k:'C',t:'in',c:false},{k:'D',t:'over',c:false}]),

  // ── ĐỌC HIỂU ĐOẠN VĂN NGẮN ───────────────────────────────────────────────
  q('Read: "Tom gets up at 6 am. He brushes his teeth and has breakfast. Then he goes to school by bike." — What does Tom ride to school?',
    [{k:'A',t:'a bus',c:false},{k:'B',t:'a bike',c:true},{k:'C',t:'a car',c:false},{k:'D',t:'on foot',c:false}]),

  q('Read: "Tom gets up at 6 am. He brushes his teeth and has breakfast. Then he goes to school by bike." — What time does Tom get up?',
    [{k:'A',t:'7 am',c:false},{k:'B',t:'5 am',c:false},{k:'C',t:'6 am',c:true},{k:'D',t:'8 am',c:false}]),

  q('Read: "Lan loves cooking. Every Saturday, she helps her mum make soup and cakes. She wants to be a chef." — What does Lan want to be?',
    [{k:'A',t:'a teacher',c:false},{k:'B',t:'a chef',c:true},{k:'C',t:'a doctor',c:false},{k:'D',t:'a baker',c:false}]),

  q('Read: "Lan loves cooking. Every Saturday, she helps her mum make soup and cakes." — When does Lan help her mum?',
    [{k:'A',t:'Every Sunday',c:false},{k:'B',t:'Every Friday',c:false},{k:'C',t:'Every Saturday',c:true},{k:'D',t:'Every Monday',c:false}]),

  q('Read: "Nam is 11 years old. He is 145 cm tall and weighs 38 kg. He has black hair and brown eyes." — How tall is Nam?',
    [{k:'A',t:'38 cm',c:false},{k:'B',t:'145 kg',c:false},{k:'C',t:'145 cm',c:true},{k:'D',t:'138 cm',c:false}]),

  // ── MỨC KHÓ HƠN (MEDIUM) ─────────────────────────────────────────────────
  q('He has lived in this city ______ five years.',
    [{k:'A',t:'since',c:false},{k:'B',t:'ago',c:false},{k:'C',t:'for',c:true},{k:'D',t:'in',c:false}], 'MEDIUM'),

  q('She ______ never been to the USA before.',
    [{k:'A',t:'did',c:false},{k:'B',t:'has',c:true},{k:'C',t:'have',c:false},{k:'D',t:'is',c:false}], 'MEDIUM'),

  q('If it ______ tomorrow, we will stay at home.',
    [{k:'A',t:'rained',c:false},{k:'B',t:'rains',c:true},{k:'C',t:'will rain',c:false},{k:'D',t:'is raining',c:false}], 'MEDIUM'),

  q('The film ______ already started when we arrived at the cinema.',
    [{k:'A',t:'has',c:false},{k:'B',t:'was',c:false},{k:'C',t:'had',c:true},{k:'D',t:'have',c:false}], 'MEDIUM'),

  q('Choose the sentence that is grammatically correct.',
    [{k:'A',t:'She don\'t like coffee.',c:false},{k:'B',t:'He doesn\'t likes coffee.',c:false},{k:'C',t:'They doesn\'t drink coffee.',c:false},{k:'D',t:'She doesn\'t like coffee.',c:true}], 'MEDIUM'),

  q('______ anybody home when you arrived?',
    [{k:'A',t:'Was',c:false},{k:'B',t:'Were',c:false},{k:'C',t:'Is',c:false},{k:'D',t:'Was there',c:true}], 'MEDIUM'),

  q('She asked me ______ I wanted to go to the park.',
    [{k:'A',t:'that',c:false},{k:'B',t:'what',c:false},{k:'C',t:'if',c:true},{k:'D',t:'which',c:false}], 'MEDIUM'),
];

async function main() {
  // Lấy danh sách câu hỏi hiện có để tránh trùng lặp
  const existing = await p.question.findMany({
    where: { subjectId: SUBJECT_ID, gradeId: GRADE_ID },
    select: { content: true },
  });
  const existingSet = new Set(existing.map(q => q.content.trim().toLowerCase()));

  let added = 0;
  for (const item of QUESTIONS) {
    const key = item.content.trim().toLowerCase();
    if (existingSet.has(key)) {
      console.log(`⏭  Bỏ qua (trùng): ${item.content.substring(0, 60)}...`);
      continue;
    }

    const correctOption = item.options.find(o => o.c);
    if (!correctOption) continue;

    await p.question.create({
      data: {
        subjectId: SUBJECT_ID,
        gradeId: GRADE_ID,
        content: item.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: item.difficulty || 'EASY',
        status: 'ACTIVE',
        createdById: CREATED_BY,
        options: {
          create: item.options.map((o, idx) => ({
            optionKey: o.k,
            content: o.t,
            isCorrect: o.c,
            sortOrder: idx,
          })),
        },
      },
    });

    existingSet.add(key);
    added++;
    console.log(`✅ [${added}] ${item.content.substring(0, 70)}`);
  }

  const total = await p.question.count({ where: { subjectId: SUBJECT_ID, gradeId: GRADE_ID } });
  console.log(`\n🎉 Đã thêm ${added} câu. Tổng ngân hàng Tiếng Anh Lớp 5: ${total} câu.`);
}

main().catch(console.error).finally(() => p.$disconnect());
