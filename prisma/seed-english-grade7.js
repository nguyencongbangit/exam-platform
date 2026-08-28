const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const SUBJECT_ID = 'sub-anh';
const GRADE_ID   = 'grade-7';
const CREATED_BY = 'user-admin';

function q(content, opts, diff = 'EASY') {
  return { content, opts, diff };
}
// opts: [{k,t,c}]  k=key A/B/C/D  t=text  c=isCorrect

const QUESTIONS = [
  // ══════════════════════════════════════════════════════
  // UNIT 1 – SỞ THÍCH & HOẠT ĐỘNG
  // ══════════════════════════════════════════════════════
  q('She is fond ______ playing badminton after school.',
    [{k:'A',t:'of',c:true},{k:'B',t:'in',c:false},{k:'C',t:'at',c:false},{k:'D',t:'on',c:false}]),
  q('He spends two hours ______ the guitar every day.',
    [{k:'A',t:'to practise',c:false},{k:'B',t:'practising',c:true},{k:'C',t:'practise',c:false},{k:'D',t:'practised',c:false}]),
  q('______ do you usually do in your spare time?',
    [{k:'A',t:'How',c:false},{k:'B',t:'Where',c:false},{k:'C',t:'What',c:true},{k:'D',t:'Why',c:false}]),
  q('My sister is keen ______ collecting vintage postcards.',
    [{k:'A',t:'on',c:true},{k:'B',t:'at',c:false},{k:'C',t:'in',c:false},{k:'D',t:'for',c:false}]),
  q('Lan is ______ at drawing. Her pictures always win prizes.',
    [{k:'A',t:'bad',c:false},{k:'B',t:'terrible',c:false},{k:'C',t:'talented',c:true},{k:'D',t:'boring',c:false}]),
  q('Knitting, painting and gardening are examples of ______.',
    [{k:'A',t:'sports',c:false},{k:'B',t:'hobbies',c:true},{k:'C',t:'subjects',c:false},{k:'D',t:'jobs',c:false}]),
  q('Tom prefers reading books ______ watching television.',
    [{k:'A',t:'than',c:false},{k:'B',t:'from',c:false},{k:'C',t:'to',c:true},{k:'D',t:'over',c:false}]),
  q('His hobby is ______ origami figures in his free time.',
    [{k:'A',t:'fold',c:false},{k:'B',t:'to folding',c:false},{k:'C',t:'folded',c:false},{k:'D',t:'folding',c:true}]),
  q('They enjoy ______ to classical music while studying.',
    [{k:'A',t:'listening',c:true},{k:'B',t:'listen',c:false},{k:'C',t:'to listen',c:false},{k:'D',t:'listened',c:false}]),
  q('______ your brother interested in doing martial arts?',
    [{k:'A',t:'Does',c:false},{k:'B',t:'Is',c:true},{k:'C',t:'Are',c:false},{k:'D',t:'Do',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 2 – SỨC KHOẺ & LỐI SỐNG
  // ══════════════════════════════════════════════════════
  q('You should go to bed early ______ stay up late at night.',
    [{k:'A',t:'but not',c:false},{k:'B',t:'or',c:false},{k:'C',t:'rather than',c:true},{k:'D',t:'instead',c:false}]),
  q('Eating a ______ diet helps you stay fit and healthy.',
    [{k:'A',t:'balance',c:false},{k:'B',t:'balanced',c:true},{k:'C',t:'balancing',c:false},{k:'D',t:'imbalance',c:false}]),
  q('Regular ______ such as jogging or cycling is good for your heart.',
    [{k:'A',t:'diet',c:false},{k:'B',t:'meal',c:false},{k:'C',t:'exercise',c:true},{k:'D',t:'sleep',c:false}]),
  q('You ______ skip breakfast because it gives you energy for the day.',
    [{k:'A',t:'should',c:false},{k:'B',t:'must',c:false},{k:'C',t:'shouldn\'t',c:true},{k:'D',t:'can',c:false}]),
  q('Fast food is usually high ______ fat, salt and sugar.',
    [{k:'A',t:'of',c:false},{k:'B',t:'in',c:true},{k:'C',t:'at',c:false},{k:'D',t:'for',c:false}]),
  q('People who ______ enough sleep tend to feel tired and unfocused.',
    [{k:'A',t:'don\'t get',c:true},{k:'B',t:'gets',c:false},{k:'C',t:'getting',c:false},{k:'D',t:'not getting',c:false}]),
  q('She has a ______. She should see a dentist.',
    [{k:'A',t:'sore throat',c:false},{k:'B',t:'stomachache',c:false},{k:'C',t:'toothache',c:true},{k:'D',t:'backache',c:false}]),
  q('Drinking enough water helps keep the body ______.',
    [{k:'A',t:'dehydrated',c:false},{k:'B',t:'hydrated',c:true},{k:'C',t:'exhausted',c:false},{k:'D',t:'infected',c:false}]),
  q('______ you eat well, you will feel more energetic.',
    [{k:'A',t:'Although',c:false},{k:'B',t:'Unless',c:false},{k:'C',t:'If',c:true},{k:'D',t:'Because',c:false}]),
  q('Children ______ at least 60 minutes of physical activity every day.',
    [{k:'A',t:'should do',c:true},{k:'B',t:'should doing',c:false},{k:'C',t:'should to do',c:false},{k:'D',t:'should did',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 3 – CỘNG ĐỒNG & TÌNH NGUYỆN
  // ══════════════════════════════════════════════════════
  q('He ______ elderly people cross the street when he sees them struggling.',
    [{k:'A',t:'helps',c:true},{k:'B',t:'helping',c:false},{k:'C',t:'helped',c:false},{k:'D',t:'help to',c:false}]),
  q('The charity event ______ hundreds of disadvantaged children last month.',
    [{k:'A',t:'support',c:false},{k:'B',t:'supports',c:false},{k:'C',t:'supported',c:true},{k:'D',t:'supporting',c:false}]),
  q('______ in community projects teaches young people to be responsible.',
    [{k:'A',t:'Participate',c:false},{k:'B',t:'Participates',c:false},{k:'C',t:'Participating',c:true},{k:'D',t:'Participated',c:false}]),
  q('She decided to ______ a local environmental group to help clean rivers.',
    [{k:'A',t:'join',c:true},{k:'B',t:'joined',c:false},{k:'C',t:'joining',c:false},{k:'D',t:'joins',c:false}]),
  q('A person who works without being paid is called a ______.',
    [{k:'A',t:'employee',c:false},{k:'B',t:'freelancer',c:false},{k:'C',t:'volunteer',c:true},{k:'D',t:'donor',c:false}]),
  q('They ______ blood to the hospital every three months.',
    [{k:'A',t:'give',c:false},{k:'B',t:'donated',c:true},{k:'C',t:'donating',c:false},{k:'D',t:'to donate',c:false}]),
  q('Doing community service makes teenagers feel proud and ______.',
    [{k:'A',t:'useless',c:false},{k:'B',t:'bored',c:false},{k:'C',t:'fulfilled',c:true},{k:'D',t:'lonely',c:false}]),
  q('The school organised a ______ drive to collect clothes for flood victims.',
    [{k:'A',t:'charity',c:true},{k:'B',t:'profit',c:false},{k:'C',t:'business',c:false},{k:'D',t:'tax',c:false}]),
  q('Nam ______ vegetables for poor families in his neighbourhood every week.',
    [{k:'A',t:'grew',c:false},{k:'B',t:'grows',c:true},{k:'C',t:'is grown',c:false},{k:'D',t:'growing',c:false}]),
  q('Working as a volunteer ______ your CV and helps you find a better job.',
    [{k:'A',t:'improves',c:true},{k:'B',t:'reduces',c:false},{k:'C',t:'ignores',c:false},{k:'D',t:'replaces',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 4 – ÂM NHẠC & LỄ HỘI
  // ══════════════════════════════════════════════════════
  q('The ______ plays a central role in a traditional Vietnamese ceremony.',
    [{k:'A',t:'piano',c:false},{k:'B',t:'trumpet',c:false},{k:'C',t:'đàn bầu',c:true},{k:'D',t:'violin',c:false}]),
  q('The Tet holiday ______ in late January or early February each year.',
    [{k:'A',t:'fall',c:false},{k:'B',t:'falls',c:true},{k:'C',t:'is fallen',c:false},{k:'D',t:'falling',c:false}]),
  q('People ______ incense and flowers on the altar during Tet.',
    [{k:'A',t:'place',c:true},{k:'B',t:'places',c:false},{k:'C',t:'are placing',c:false},{k:'D',t:'placed',c:false}]),
  q('The carnival ______ every year in February in Rio de Janeiro.',
    [{k:'A',t:'is hold',c:false},{k:'B',t:'holds',c:false},{k:'C',t:'is held',c:true},{k:'D',t:'holding',c:false}]),
  q('During the Lantern Festival, people ______ lanterns down the river.',
    [{k:'A',t:'release',c:true},{k:'B',t:'catch',c:false},{k:'C',t:'break',c:false},{k:'D',t:'throw',c:false}]),
  q('This genre of music is ______ by a soft melody and emotional lyrics.',
    [{k:'A',t:'characterised',c:true},{k:'B',t:'created',c:false},{k:'C',t:'replaced',c:false},{k:'D',t:'discovered',c:false}]),
  q('The ______ is a large stringed instrument played in orchestras.',
    [{k:'A',t:'flute',c:false},{k:'B',t:'cello',c:true},{k:'C',t:'guitar',c:false},{k:'D',t:'trumpet',c:false}]),
  q('Traditional ______ like quan ho folk songs are preserved by local artists.',
    [{k:'A',t:'music',c:true},{k:'B',t:'sport',c:false},{k:'C',t:'food',c:false},{k:'D',t:'dance',c:false}]),
  q('The Hue ______ Festival is held every two years and attracts global artists.',
    [{k:'A',t:'Arts',c:true},{k:'B',t:'Food',c:false},{k:'C',t:'Film',c:false},{k:'D',t:'Sports',c:false}]),
  q('He ______ the guitar in a band since he was thirteen.',
    [{k:'A',t:'plays',c:false},{k:'B',t:'played',c:false},{k:'C',t:'has played',c:true},{k:'D',t:'is playing',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 5 – VĂN HOÁ VIỆT NAM
  // ══════════════════════════════════════════════════════
  q('Ao dai is the ______ costume of Vietnam.',
    [{k:'A',t:'foreign',c:false},{k:'B',t:'modern',c:false},{k:'C',t:'traditional',c:true},{k:'D',t:'casual',c:false}]),
  q('Hoi An ______ Town is a UNESCO World Heritage Site.',
    [{k:'A',t:'New',c:false},{k:'B',t:'Ancient',c:true},{k:'C',t:'Modern',c:false},{k:'D',t:'Small',c:false}]),
  q('The One Pillar ______ is one of the most iconic symbols of Hanoi.',
    [{k:'A',t:'Tower',c:false},{k:'B',t:'Temple',c:false},{k:'C',t:'Pagoda',c:true},{k:'D',t:'Palace',c:false}]),
  q('Chung cake is traditionally ______ during the Tet holiday.',
    [{k:'A',t:'made',c:true},{k:'B',t:'eaten',c:false},{k:'C',t:'bought',c:false},{k:'D',t:'cooked',c:false}]),
  q('The Vietnamese ______ is made of bamboo and has a round shape.',
    [{k:'A',t:'hat',c:true},{k:'B',t:'bag',c:false},{k:'C',t:'shirt',c:false},{k:'D',t:'shoe',c:false}]),
  q('Hanoi was ______ as the capital of Vietnam over 1,000 years ago.',
    [{k:'A',t:'choose',c:false},{k:'B',t:'chosen',c:true},{k:'C',t:'choosing',c:false},{k:'D',t:'chooses',c:false}]),
  q('The Mid-Autumn Festival is celebrated ______ the 15th of the 8th lunar month.',
    [{k:'A',t:'in',c:false},{k:'B',t:'at',c:false},{k:'C',t:'on',c:true},{k:'D',t:'during',c:false}]),
  q('Water puppetry ______ a form of art unique to the Red River Delta.',
    [{k:'A',t:'are',c:false},{k:'B',t:'is',c:true},{k:'C',t:'were',c:false},{k:'D',t:'have',c:false}]),
  q('Vietnamese people often exchange ______ wishes during Tet.',
    [{k:'A',t:'sad',c:false},{k:'B',t:'lucky',c:false},{k:'C',t:'lucky money',c:false},{k:'D',t:'New Year',c:true}]),
  q('The ______ in Hue was the home of Vietnamese emperors.',
    [{k:'A',t:'museum',c:false},{k:'B',t:'citadel',c:true},{k:'C',t:'library',c:false},{k:'D',t:'market',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 6 – MÔI TRƯỜNG & NĂNG LƯỢNG
  // ══════════════════════════════════════════════════════
  q('We should ______ plastic bags and use reusable ones instead.',
    [{k:'A',t:'use more',c:false},{k:'B',t:'reduce',c:true},{k:'C',t:'produce',c:false},{k:'D',t:'buy',c:false}]),
  q('Cutting down forests leads to the loss of ______ and biodiversity.',
    [{k:'A',t:'habitats',c:true},{k:'B',t:'factories',c:false},{k:'C',t:'technology',c:false},{k:'D',t:'pollution',c:false}]),
  q('Geothermal energy comes from the ______ inside the Earth.',
    [{k:'A',t:'water',c:false},{k:'B',t:'heat',c:true},{k:'C',t:'light',c:false},{k:'D',t:'gas',c:false}]),
  q('Tidal energy uses the movement of ______ to generate electricity.',
    [{k:'A',t:'wind',c:false},{k:'B',t:'sun',c:false},{k:'C',t:'tides',c:true},{k:'D',t:'rivers',c:false}]),
  q('Burning fossil fuels releases ______ gases that cause global warming.',
    [{k:'A',t:'greenhouse',c:true},{k:'B',t:'clean',c:false},{k:'C',t:'fresh',c:false},{k:'D',t:'natural',c:false}]),
  q('People are encouraged to ______ paper, glass, and plastic to protect the environment.',
    [{k:'A',t:'waste',c:false},{k:'B',t:'burn',c:false},{k:'C',t:'recycle',c:true},{k:'D',t:'throw away',c:false}]),
  q('______ pollution makes it difficult for people to breathe in big cities.',
    [{k:'A',t:'Water',c:false},{k:'B',t:'Air',c:true},{k:'C',t:'Noise',c:false},{k:'D',t:'Land',c:false}]),
  q('The government is investing in ______ energy to reduce dependence on oil.',
    [{k:'A',t:'renewable',c:true},{k:'B',t:'wasteful',c:false},{k:'C',t:'expensive',c:false},{k:'D',t:'dangerous',c:false}]),
  q('If we ______ natural resources carelessly, future generations will suffer.',
    [{k:'A',t:'save',c:false},{k:'B',t:'use',c:false},{k:'C',t:'waste',c:true},{k:'D',t:'protect',c:false}]),
  q('A ______ car runs on electricity instead of petrol.',
    [{k:'A',t:'sport',c:false},{k:'B',t:'solar-powered',c:false},{k:'C',t:'electric',c:true},{k:'D',t:'racing',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 7 – GIAO THÔNG & AN TOÀN
  // ══════════════════════════════════════════════════════
  q('Cyclists must ______ a helmet to protect their heads.',
    [{k:'A',t:'put',c:false},{k:'B',t:'wear',c:true},{k:'C',t:'have',c:false},{k:'D',t:'take',c:false}]),
  q('The red traffic light means you must ______.',
    [{k:'A',t:'go faster',c:false},{k:'B',t:'turn left',c:false},{k:'C',t:'stop',c:true},{k:'D',t:'overtake',c:false}]),
  q('She was fined because she ______ a red light.',
    [{k:'A',t:'stops at',c:false},{k:'B',t:'ran',c:true},{k:'C',t:'passes',c:false},{k:'D',t:'sees',c:false}]),
  q('A ______ is a road where pedestrians can cross safely.',
    [{k:'A',t:'motorway',c:false},{k:'B',t:'bus lane',c:false},{k:'C',t:'zebra crossing',c:true},{k:'D',t:'flyover',c:false}]),
  q('Drink-driving is ______ and can lead to serious accidents.',
    [{k:'A',t:'safe',c:false},{k:'B',t:'legal',c:false},{k:'C',t:'dangerous',c:true},{k:'D',t:'helpful',c:false}]),
  q('The ______ sign tells drivers the maximum speed allowed on a road.',
    [{k:'A',t:'no parking',c:false},{k:'B',t:'speed limit',c:true},{k:'C',t:'no entry',c:false},{k:'D',t:'roundabout',c:false}]),
  q('You ______ use your phone while driving. It is against the law.',
    [{k:'A',t:'should',c:false},{k:'B',t:'can',c:false},{k:'C',t:'mustn\'t',c:true},{k:'D',t:'may',c:false}]),
  q('A ______ bridge allows vehicles to cross a river or valley.',
    [{k:'A',t:'tunnel',c:false},{k:'B',t:'suspension',c:true},{k:'C',t:'flyover',c:false},{k:'D',t:'roundabout',c:false}]),
  q('Traffic ______ occurs when too many vehicles are on the road at the same time.',
    [{k:'A',t:'light',c:false},{k:'B',t:'sign',c:false},{k:'C',t:'congestion',c:true},{k:'D',t:'accident',c:false}]),
  q('Passengers on motorbikes ______ wear helmets by law.',
    [{k:'A',t:'have to',c:true},{k:'B',t:'don\'t need to',c:false},{k:'C',t:'couldn\'t',c:false},{k:'D',t:'may not',c:false}]),

  // ══════════════════════════════════════════════════════
  // UNIT 8 – PHIM ẢNH & TRUYỀN THÔNG
  // ══════════════════════════════════════════════════════
  q('A ______ film keeps audiences on the edge of their seats.',
    [{k:'A',t:'boring',c:false},{k:'B',t:'thriller',c:true},{k:'C',t:'animation',c:false},{k:'D',t:'romance',c:false}]),
  q('The film won the ______ for Best Director at the festival.',
    [{k:'A',t:'medal',c:false},{k:'B',t:'prize',c:false},{k:'C',t:'award',c:true},{k:'D',t:'title',c:false}]),
  q('I ______ this horror film before, so I know the ending.',
    [{k:'A',t:'see',c:false},{k:'B',t:'saw',c:false},{k:'C',t:'have seen',c:true},{k:'D',t:'was seeing',c:false}]),
  q('The story of this film ______ place in ancient Rome.',
    [{k:'A',t:'takes',c:true},{k:'B',t:'takes up',c:false},{k:'C',t:'took',c:false},{k:'D',t:'is taking',c:false}]),
  q('She is the ______ of the film — she directed and produced it.',
    [{k:'A',t:'actor',c:false},{k:'B',t:'screenwriter',c:false},{k:'C',t:'director',c:true},{k:'D',t:'editor',c:false}]),
  q('The special ______ in this action film look incredibly realistic.',
    [{k:'A',t:'directors',c:false},{k:'B',t:'effects',c:true},{k:'C',t:'actors',c:false},{k:'D',t:'scenes',c:false}]),
  q('Animated films are enjoyed by both children ______ adults.',
    [{k:'A',t:'or',c:false},{k:'B',t:'but',c:false},{k:'C',t:'and',c:true},{k:'D',t:'so',c:false}]),
  q('The film is ______ on a true story about a Vietnamese war hero.',
    [{k:'A',t:'based',c:true},{k:'B',t:'basing',c:false},{k:'C',t:'base',c:false},{k:'D',t:'bases',c:false}]),
  q('She cried at the ______ of the film when the hero sacrificed himself.',
    [{k:'A',t:'beginning',c:false},{k:'B',t:'preview',c:false},{k:'C',t:'end',c:true},{k:'D',t:'trailer',c:false}]),
  q('A ______ is a short clip used to promote an upcoming film.',
    [{k:'A',t:'sequel',c:false},{k:'B',t:'trailer',c:true},{k:'C',t:'review',c:false},{k:'D',t:'script',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – THÌ QUÁ KHỨ ĐƠN
  // ══════════════════════════════════════════════════════
  q('They ______ a wonderful time at the beach last summer.',
    [{k:'A',t:'have',c:false},{k:'B',t:'had',c:true},{k:'C',t:'has',c:false},{k:'D',t:'having',c:false}]),
  q('She ______ her homework before dinner yesterday.',
    [{k:'A',t:'finishes',c:false},{k:'B',t:'finishing',c:false},{k:'C',t:'finished',c:true},{k:'D',t:'has finished',c:false}]),
  q('______ they visit the museum last weekend?',
    [{k:'A',t:'Do',c:false},{k:'B',t:'Are',c:false},{k:'C',t:'Were',c:false},{k:'D',t:'Did',c:true}]),
  q('He ______ to his friend\'s birthday party last Saturday.',
    [{k:'A',t:'goes',c:false},{k:'B',t:'go',c:false},{k:'C',t:'went',c:true},{k:'D',t:'going',c:false}]),
  q('I ______ a great novel in two days last week.',
    [{k:'A',t:'read',c:true},{k:'B',t:'reads',c:false},{k:'C',t:'reading',c:false},{k:'D',t:'have read',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – HIỆN TẠI HOÀN THÀNH
  // ══════════════════════════════════════════════════════
  q('I ______ never eaten sushi before. This is my first time.',
    [{k:'A',t:'did',c:false},{k:'B',t:'have',c:true},{k:'C',t:'had',c:false},{k:'D',t:'was',c:false}]),
  q('She ______ already finished her science project.',
    [{k:'A',t:'have',c:false},{k:'B',t:'did',c:false},{k:'C',t:'has',c:true},{k:'D',t:'had',c:false}]),
  q('______ you ever seen the northern lights? No, never.',
    [{k:'A',t:'Did',c:false},{k:'B',t:'Have',c:true},{k:'C',t:'Was',c:false},{k:'D',t:'Do',c:false}]),
  q('They ______ been best friends since primary school.',
    [{k:'A',t:'are',c:false},{k:'B',t:'were',c:false},{k:'C',t:'have',c:true},{k:'D',t:'had',c:false}]),
  q('He ______ just received a letter from his pen pal in Japan.',
    [{k:'A',t:'did',c:false},{k:'B',t:'has',c:true},{k:'C',t:'had',c:false},{k:'D',t:'was',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – BỊ ĐỘNG CÁCH (PASSIVE VOICE)
  // ══════════════════════════════════════════════════════
  q('The new bridge ______ last year by the local authority.',
    [{k:'A',t:'built',c:false},{k:'B',t:'was built',c:true},{k:'C',t:'is built',c:false},{k:'D',t:'builds',c:false}]),
  q('English ______ in more than 50 countries around the world.',
    [{k:'A',t:'speak',c:false},{k:'B',t:'spoke',c:false},{k:'C',t:'is spoken',c:true},{k:'D',t:'speaking',c:false}]),
  q('The award ceremony ______ every year in the capital city.',
    [{k:'A',t:'hold',c:false},{k:'B',t:'holds',c:false},{k:'C',t:'is held',c:true},{k:'D',t:'held',c:false}]),
  q('The message ______ to all students by the teacher this morning.',
    [{k:'A',t:'send',c:false},{k:'B',t:'sent',c:false},{k:'C',t:'was sent',c:true},{k:'D',t:'is sending',c:false}]),
  q('Rice ______ in many Asian countries, especially Vietnam and Thailand.',
    [{k:'A',t:'grew',c:false},{k:'B',t:'grows',c:false},{k:'C',t:'is grown',c:true},{k:'D',t:'growing',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES)
  // ══════════════════════════════════════════════════════
  q('The boy ______ sits next to me is very good at maths.',
    [{k:'A',t:'whom',c:false},{k:'B',t:'which',c:false},{k:'C',t:'who',c:true},{k:'D',t:'whose',c:false}]),
  q('The book ______ I borrowed from the library was very interesting.',
    [{k:'A',t:'who',c:false},{k:'B',t:'whose',c:false},{k:'C',t:'which',c:true},{k:'D',t:'where',c:false}]),
  q('The city ______ I grew up has changed a lot.',
    [{k:'A',t:'which',c:false},{k:'B',t:'who',c:false},{k:'C',t:'whose',c:false},{k:'D',t:'where',c:true}]),
  q('She is the girl ______ father is a famous scientist.',
    [{k:'A',t:'who',c:false},{k:'B',t:'which',c:false},{k:'C',t:'whose',c:true},{k:'D',t:'that',c:false}]),
  q('The museum ______ we visited last week displays ancient artefacts.',
    [{k:'A',t:'where',c:false},{k:'B',t:'that',c:true},{k:'C',t:'who',c:false},{k:'D',t:'whose',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – CÂU ĐIỀU KIỆN LOẠI 1
  // ══════════════════════════════════════════════════════
  q('If you study hard, you ______ the exam easily.',
    [{k:'A',t:'pass',c:false},{k:'B',t:'will pass',c:true},{k:'C',t:'would pass',c:false},{k:'D',t:'passed',c:false}]),
  q('Unless she ______ harder, she won\'t improve her grades.',
    [{k:'A',t:'study',c:false},{k:'B',t:'studies',c:true},{k:'C',t:'studied',c:false},{k:'D',t:'studying',c:false}]),
  q('If they ______ a map, they might get lost in the city.',
    [{k:'A',t:'don\'t have',c:true},{k:'B',t:'didn\'t have',c:false},{k:'C',t:'won\'t have',c:false},{k:'D',t:'haven\'t',c:false}]),
  q('We will go hiking ______ the weather is fine this weekend.',
    [{k:'A',t:'unless',c:false},{k:'B',t:'although',c:false},{k:'C',t:'if',c:true},{k:'D',t:'because',c:false}]),
  q('If you ______ too much TV, your eyes will get tired.',
    [{k:'A',t:'watch',c:true},{k:'B',t:'watches',c:false},{k:'C',t:'watched',c:false},{k:'D',t:'will watch',c:false}]),

  // ══════════════════════════════════════════════════════
  // NGỮ PHÁP – SO SÁNH & TRẠNG TỪ
  // ══════════════════════════════════════════════════════
  q('He runs ______ than his teammates, so he always wins.',
    [{k:'A',t:'more fast',c:false},{k:'B',t:'faster',c:true},{k:'C',t:'fastest',c:false},{k:'D',t:'most fast',c:false}]),
  q('The Amazon is ______ river in South America.',
    [{k:'A',t:'long',c:false},{k:'B',t:'longer',c:false},{k:'C',t:'the longest',c:true},{k:'D',t:'more long',c:false}]),
  q('She speaks English ______ fluently than her classmates.',
    [{k:'A',t:'most',c:false},{k:'B',t:'more',c:true},{k:'C',t:'much',c:false},{k:'D',t:'many',c:false}]),
  q('This film is ______ interesting as the one we watched last week.',
    [{k:'A',t:'as',c:true},{k:'B',t:'more',c:false},{k:'C',t:'very',c:false},{k:'D',t:'so',c:false}]),
  q('The new sports centre is ______ than the old one.',
    [{k:'A',t:'modern',c:false},{k:'B',t:'more modern',c:true},{k:'C',t:'most modern',c:false},{k:'D',t:'as modern',c:false}]),

  // ══════════════════════════════════════════════════════
  // TỪ VỰNG – TỪ LOẠI & HÌNH THỨC TỪ
  // ══════════════════════════════════════════════════════
  q('The word "pollution" is a ______.',
    [{k:'A',t:'verb',c:false},{k:'B',t:'adjective',c:false},{k:'C',t:'noun',c:true},{k:'D',t:'adverb',c:false}]),
  q('The ______ form of "happy" is "happily".',
    [{k:'A',t:'noun',c:false},{k:'B',t:'verb',c:false},{k:'C',t:'adverb',c:true},{k:'D',t:'adjective',c:false}]),
  q('The adjective form of "music" is ______.',
    [{k:'A',t:'musician',c:false},{k:'B',t:'musical',c:true},{k:'C',t:'musically',c:false},{k:'D',t:'musicness',c:false}]),
  q('Choose the correct noun: "The ______ of the new school was celebrated last week."',
    [{k:'A',t:'open',c:false},{k:'B',t:'opened',c:false},{k:'C',t:'opening',c:true},{k:'D',t:'openly',c:false}]),
  q('The verb form of "decision" is ______.',
    [{k:'A',t:'decisive',c:false},{k:'B',t:'decidedly',c:false},{k:'C',t:'decide',c:true},{k:'D',t:'decision',c:false}]),

  // ══════════════════════════════════════════════════════
  // TỪ VỰNG CHUYÊN ĐỀ
  // ══════════════════════════════════════════════════════
  q('"Renewable" energy sources include solar, wind and ______ power.',
    [{k:'A',t:'nuclear',c:false},{k:'B',t:'fossil',c:false},{k:'C',t:'hydroelectric',c:true},{k:'D',t:'coal',c:false}]),
  q('Which word means "to feel sorry for someone who is suffering"?',
    [{k:'A',t:'envy',c:false},{k:'B',t:'sympathy',c:true},{k:'C',t:'anger',c:false},{k:'D',t:'jealousy',c:false}]),
  q('A ______ is a person who makes and repairs wooden furniture.',
    [{k:'A',t:'plumber',c:false},{k:'B',t:'carpenter',c:true},{k:'C',t:'electrician',c:false},{k:'D',t:'mechanic',c:false}]),
  q('The opposite of "ancient" is ______.',
    [{k:'A',t:'traditional',c:false},{k:'B',t:'historical',c:false},{k:'C',t:'modern',c:true},{k:'D',t:'cultural',c:false}]),
  q('She made a ______ to donate 10% of her salary to charity.',
    [{k:'A',t:'promise',c:false},{k:'B',t:'commitment',c:true},{k:'C',t:'request',c:false},{k:'D',t:'suggestion',c:false}]),
  q('Which word is a synonym of "preserve"?',
    [{k:'A',t:'destroy',c:false},{k:'B',t:'waste',c:false},{k:'C',t:'protect',c:true},{k:'D',t:'pollute',c:false}]),
  q('The word "optimistic" means ______.',
    [{k:'A',t:'feeling sad about the future',c:false},{k:'B',t:'having a positive view about the future',c:true},{k:'C',t:'being afraid of change',c:false},{k:'D',t:'disliking other people',c:false}]),
  q('She was ______ of her achievement in the national science competition.',
    [{k:'A',t:'ashamed',c:false},{k:'B',t:'afraid',c:false},{k:'C',t:'proud',c:true},{k:'D',t:'tired',c:false}]),
  q('Which word means "easy to understand"?',
    [{k:'A',t:'complex',c:false},{k:'B',t:'confusing',c:false},{k:'C',t:'clear',c:true},{k:'D',t:'vague',c:false}]),
  q('The word ______ means a journey made for a special purpose.',
    [{k:'A',t:'trip',c:false},{k:'B',t:'travel',c:false},{k:'C',t:'expedition',c:true},{k:'D',t:'tour',c:false}]),

  // ══════════════════════════════════════════════════════
  // GIỚI TỪ & CỤM GIỚI TỪ
  // ══════════════════════════════════════════════════════
  q('She is very good ______ playing chess. She wins every time.',
    [{k:'A',t:'in',c:false},{k:'B',t:'at',c:true},{k:'C',t:'for',c:false},{k:'D',t:'on',c:false}]),
  q('The festival takes place ______ the end of the lunar calendar year.',
    [{k:'A',t:'in',c:false},{k:'B',t:'on',c:false},{k:'C',t:'at',c:true},{k:'D',t:'by',c:false}]),
  q('He is responsible ______ organising the school event.',
    [{k:'A',t:'of',c:false},{k:'B',t:'for',c:true},{k:'C',t:'in',c:false},{k:'D',t:'at',c:false}]),
  q('The students are excited ______ the upcoming field trip.',
    [{k:'A',t:'of',c:false},{k:'B',t:'with',c:false},{k:'C',t:'about',c:true},{k:'D',t:'in',c:false}]),
  q('This painting was created ______ a local artist in the 18th century.',
    [{k:'A',t:'from',c:false},{k:'B',t:'with',c:false},{k:'C',t:'of',c:false},{k:'D',t:'by',c:true}]),

  // ══════════════════════════════════════════════════════
  // ĐỌC HIỂU ĐOẠN VĂN
  // ══════════════════════════════════════════════════════
  q('Read: "Every Saturday, Mai and her friends volunteer at the local shelter. They prepare food, read to the elderly, and clean the rooms." — What is the main purpose of Mai\'s Saturday activity?',
    [{k:'A',t:'To earn money',c:false},{k:'B',t:'To help people in the shelter',c:true},{k:'C',t:'To practise cooking',c:false},{k:'D',t:'To meet new friends',c:false}]),
  q('Read: "Every Saturday, Mai and her friends volunteer at the local shelter. They prepare food, read to the elderly, and clean the rooms." — Which activity is NOT mentioned?',
    [{k:'A',t:'Preparing food',c:false},{k:'B',t:'Reading to the elderly',c:false},{k:'C',t:'Teaching English',c:true},{k:'D',t:'Cleaning the rooms',c:false}]),
  q('Read: "Ha Long Bay is a UNESCO World Heritage Site located in Quang Ninh Province. It features over 1,600 islands and islets." — Where is Ha Long Bay?',
    [{k:'A',t:'Hanoi',c:false},{k:'B',t:'Quang Ninh',c:true},{k:'C',t:'Ho Chi Minh City',c:false},{k:'D',t:'Da Nang',c:false}]),
  q('Read: "Ha Long Bay is a UNESCO World Heritage Site located in Quang Ninh Province. It features over 1,600 islands and islets." — How many islands does Ha Long Bay have?',
    [{k:'A',t:'More than 600',c:false},{k:'B',t:'Exactly 1,000',c:false},{k:'C',t:'Over 1,600',c:true},{k:'D',t:'About 2,000',c:false}]),
  q('Read: "Phong Nha-Ke Bang National Park is home to the world\'s largest cave, Son Doong. Scientists discovered it in 2009." — When was Son Doong discovered?',
    [{k:'A',t:'1999',c:false},{k:'B',t:'2005',c:false},{k:'C',t:'2009',c:true},{k:'D',t:'2015',c:false}]),
  q('Read: "Phong Nha-Ke Bang National Park is home to the world\'s largest cave, Son Doong." — What record does Son Doong hold?',
    [{k:'A',t:'The deepest cave in the world',c:false},{k:'B',t:'The longest river underground',c:false},{k:'C',t:'The world\'s largest cave',c:true},{k:'D',t:'The oldest cave in Asia',c:false}]),
  q('Read: "An is a hard-working student. He spends 3 hours studying every evening and always scores above 9 in every test." — What can we infer about An?',
    [{k:'A',t:'He is lazy',c:false},{k:'B',t:'He dislikes studying',c:false},{k:'C',t:'He is dedicated to his studies',c:true},{k:'D',t:'He struggles with exams',c:false}]),
  q('Read: "The school recycling club collects used paper, bottles and cans every Friday. The items are then sold and the money is used to buy books for the library." — What happens to the money from selling recycled items?',
    [{k:'A',t:'It is given to charity',c:false},{k:'B',t:'It is used to buy books',c:true},{k:'C',t:'It is used to repair the school',c:false},{k:'D',t:'It is saved for school trips',c:false}]),

  // ══════════════════════════════════════════════════════
  // MỨC KHÓ TRUNG BÌNH (MEDIUM) – GRAMMAR & USAGE
  // ══════════════════════════════════════════════════════
  q('By the time the teacher arrived, the students ______ already started the exercise.',
    [{k:'A',t:'have',c:false},{k:'B',t:'had',c:true},{k:'C',t:'has',c:false},{k:'D',t:'did',c:false}], 'MEDIUM'),
  q('______ harder, she would have passed the entrance exam.',
    [{k:'A',t:'If she studied',c:false},{k:'B',t:'If she had studied',c:true},{k:'C',t:'Unless she studies',c:false},{k:'D',t:'When she studied',c:false}], 'MEDIUM'),
  q('The students were told ______ their assignments by Friday.',
    [{k:'A',t:'submitting',c:false},{k:'B',t:'to submit',c:true},{k:'C',t:'submit',c:false},{k:'D',t:'submitted',c:false}], 'MEDIUM'),
  q('It is the first time she ______ a solo performance on stage.',
    [{k:'A',t:'gives',c:false},{k:'B',t:'gave',c:false},{k:'C',t:'has given',c:true},{k:'D',t:'had given',c:false}], 'MEDIUM'),
  q('The new law requires factories ______ their carbon emissions.',
    [{k:'A',t:'reduce',c:false},{k:'B',t:'to reduce',c:true},{k:'C',t:'reducing',c:false},{k:'D',t:'reduced',c:false}], 'MEDIUM'),
  q('Despite ______ hard all week, she didn\'t finish the project.',
    [{k:'A',t:'work',c:false},{k:'B',t:'worked',c:false},{k:'C',t:'working',c:true},{k:'D',t:'to work',c:false}], 'MEDIUM'),
  q('The teacher asked the class ______ their phones away.',
    [{k:'A',t:'putting',c:false},{k:'B',t:'put',c:false},{k:'C',t:'to put',c:true},{k:'D',t:'have put',c:false}], 'MEDIUM'),
  q('Not only ______ the prize, but she also received a scholarship.',
    [{k:'A',t:'she won',c:false},{k:'B',t:'did she win',c:true},{k:'C',t:'she did win',c:false},{k:'D',t:'won she',c:false}], 'MEDIUM'),
  q('He suggested ______ the meeting to next Monday.',
    [{k:'A',t:'to postpone',c:false},{k:'B',t:'postponing',c:true},{k:'C',t:'postponed',c:false},{k:'D',t:'postpone',c:false}], 'MEDIUM'),
  q('This is the most fascinating book ______ I have ever read.',
    [{k:'A',t:'who',c:false},{k:'B',t:'what',c:false},{k:'C',t:'where',c:false},{k:'D',t:'that',c:true}], 'MEDIUM'),

  // ══════════════════════════════════════════════════════
  // MỨC KHÓ CAO (HARD)
  // ══════════════════════════════════════════════════════
  q('The documentary, ______ explores ocean pollution, was nominated for an Oscar.',
    [{k:'A',t:'who',c:false},{k:'B',t:'where',c:false},{k:'C',t:'which',c:true},{k:'D',t:'whose',c:false}], 'HARD'),
  q('______ the heavy rain, the football match continued without interruption.',
    [{k:'A',t:'Although',c:false},{k:'B',t:'Despite',c:true},{k:'C',t:'However',c:false},{k:'D',t:'Because of',c:false}], 'HARD'),
  q('The new recycling policy, ______ was introduced last year, has reduced waste by 30%.',
    [{k:'A',t:'that',c:false},{k:'B',t:'what',c:false},{k:'C',t:'which',c:true},{k:'D',t:'who',c:false}], 'HARD'),
  q('Had they arrived earlier, they ______ the opening ceremony.',
    [{k:'A',t:'would not miss',c:false},{k:'B',t:'would not have missed',c:true},{k:'C',t:'did not miss',c:false},{k:'D',t:'had not missed',c:false}], 'HARD'),
  q('The more you practise, ______ you become at speaking English.',
    [{k:'A',t:'the more fluent',c:true},{k:'B',t:'the most fluent',c:false},{k:'C',t:'the fluent',c:false},{k:'D',t:'more fluent',c:false}], 'HARD'),
];

async function main() {
  // Lấy toàn bộ câu hiện có để check trùng
  const existing = await p.question.findMany({
    where: { subjectId: SUBJECT_ID, gradeId: GRADE_ID },
    select: { content: true },
  });
  const existingSet = new Set(existing.map(q => q.content.trim().toLowerCase()));

  let added = 0, skipped = 0;
  for (const item of QUESTIONS) {
    const key = item.content.trim().toLowerCase();
    if (existingSet.has(key)) {
      skipped++;
      console.log(`⏭  [${skipped}] Trùng: ${item.content.substring(0, 60)}`);
      continue;
    }
    const correct = item.opts.find(o => o.c);
    if (!correct) { console.log(`⚠  Không có đáp án đúng: ${item.content.substring(0,50)}`); continue; }

    await p.question.create({
      data: {
        subjectId: SUBJECT_ID,
        gradeId: GRADE_ID,
        content: item.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: item.diff || 'EASY',
        status: 'ACTIVE',
        createdById: CREATED_BY,
        options: {
          create: item.opts.map((o, idx) => ({
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
    process.stdout.write(`\r✅ Đã thêm: ${added} câu`);
  }

  const total = await p.question.count({ where: { subjectId: SUBJECT_ID, gradeId: GRADE_ID } });
  console.log(`\n\n🎉 Thêm ${added} câu mới (bỏ qua ${skipped} câu trùng).`);
  console.log(`📚 Tổng ngân hàng Tiếng Anh Lớp 7: ${total} câu.`);
}

main().catch(console.error).finally(() => p.$disconnect());
