const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocr000rloc7nly7vbx3';
const QUESTIONS = [
  {d:'EASY',q:'I ___ a book last night.',opts:['A. read','B. reads','C. reading','D. am reading']},
  {d:'EASY',q:'She ___ a gift for her mother yesterday.',opts:['A. bought','B. buy','C. buys','D. buying']},
  {d:'EASY',q:'He ___ his friend on the street this morning.',opts:['A. met','B. meet','C. meets','D. meeting']},
  {d:'EASY',q:'We ___ a kite in the park last Sunday.',opts:['A. flew','B. fly','C. flies','D. flying']},
  {d:'EASY',q:'They ___ a delicious meal at the restaurant.',opts:['A. had','B. have','C. has','D. having']},
  {d:'EASY',q:'She ___ her friend a birthday card.',opts:['A. sent','B. send','C. sends','D. sending']},
  {d:'EASY',q:'He ___ the window because it was cold.',opts:['A. closed','B. close','C. closes','D. closing']},
  {d:'EASY',q:'My sister ___ the dishes last night.',opts:['A. washed','B. wash','C. washes','D. washing']},
  {d:'EASY',q:'I ___ a sandwich for lunch.',opts:['A. made','B. make','C. makes','D. making']},
  {d:'EASY',q:'She ___ happy because she passed the test.',opts:['A. was','B. is','C. am','D. were']},
  {d:'MEDIUM',q:'He ___ his homework before dinner last night.',opts:['A. finished','B. finish','C. finishes','D. finishing']},
  {d:'MEDIUM',q:'They ___ on a field trip last Friday.',opts:['A. went','B. go','C. goes','D. going']},
  {d:'MEDIUM',q:'She ___ English at the language centre last year.',opts:['A. learned','B. learn','C. learns','D. learning']},
  {d:'MEDIUM',q:'The team ___ the championship last month.',opts:['A. won','B. win','C. wins','D. winning']},
  {d:'MEDIUM',q:'I ___ my bicycle to the market.',opts:['A. rode','B. ride','C. rides','D. riding']},
  {d:'MEDIUM',q:'He ___ his grandfather last weekend.',opts:['A. visited','B. visit','C. visits','D. visiting']},
  {d:'MEDIUM',q:'The concert ___ very exciting.',opts:['A. was','B. is','C. were','D. are']},
  {d:'MEDIUM',q:'She ___ the answer to the question.',opts:['A. knew','B. know','C. knows','D. knowing']},
  {d:'HARD',q:'My family ___ a picnic in the park last Saturday.',opts:['A. had','B. have','C. has','D. having']},
  {d:'HARD',q:'The teacher ___ us interesting stories about history.',opts:['A. told','B. tell','C. tells','D. telling']},
  {d:'EASY',q:'She ___ not wake up early yesterday.',opts:['A. did','B. do','C. does','D. was']},
  {d:'EASY',q:'We ___ not go swimming because of the rain.',opts:['A. did','B. do','C. were','D. was']},
  {d:'MEDIUM',q:'He ___ not play football last week because he was injured.',opts:['A. did','B. do','C. was','D. were']},
  {d:'MEDIUM',q:'They ___ not arrive on time for the show.',opts:['A. did','B. do','C. were','D. was']},
  {d:'HARD',q:'She ___ not understand the lesson yesterday.',opts:['A. did','B. do','C. was','D. were']},
  {d:'EASY',q:'___ he go to school yesterday? Yes, he ___.',opts:['A. Did / did','B. Do / do','C. Was / was','D. Were / were']},
  {d:'EASY',q:'___ she at home? No, she ___ at the library.',opts:['A. Was / was','B. Were / were','C. Did / did','D. Do / do']},
  {d:'MEDIUM',q:'___ they enjoy the trip? Yes, they ___!',opts:['A. Did / did','B. Do / do','C. Were / were','D. Was / was']},
  {d:'MEDIUM',q:'What time ___ he come home last night?',opts:['A. did','B. do','C. was','D. were']},
  {d:'HARD',q:'How ___ the party? It was fantastic!',opts:['A. was','B. were','C. did','D. do']},
  {d:'EASY',q:'He was born ___ 2014.',opts:['A. in','B. at','C. on','D. ago']},
  {d:'EASY',q:'She called me two hours ___.',opts:['A. ago','B. last','C. before','D. past']},
  {d:'MEDIUM',q:'They moved here ___ 2018.',opts:['A. in','B. on','C. at','D. ago']},
  {d:'MEDIUM',q:'___ did you go to bed last night?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'HARD',q:'I ___ here since 2020.',opts:['A. have lived','B. lived','C. was living','D. am living']},
  {d:'EASY',q:'She came (come) first in the race.',opts:['A. came','B. come','C. comes','D. coming']},
  {d:'EASY',q:'He fell (fall) off his bike.',opts:['A. fell','B. fall','C. falls','D. falling']},
  {d:'EASY',q:'We saw (see) a rainbow after the rain.',opts:['A. saw','B. see','C. sees','D. seeing']},
  {d:'MEDIUM',q:'She spoke (speak) to her teacher after class.',opts:['A. spoke','B. speak','C. speaks','D. speaking']},
  {d:'MEDIUM',q:'He drove (drive) his father to the airport.',opts:['A. drove','B. drive','C. drives','D. driving']},
  {d:'HARD',q:'She chose (choose) the red dress for the party.',opts:['A. chose','B. choose','C. chooses','D. choosing']},
  {d:'EASY',q:'I walked to school yesterday. (What is the past tense marker?)',opts:['A. -ed ending','B. -ing ending','C. -s ending','D. no change']},
  {d:'EASY',q:'What is the past tense of "go"?',opts:['A. went','B. goed','C. goes','D. going']},
  {d:'EASY',q:'What is the past tense of "eat"?',opts:['A. ate','B. eated','C. eats','D. eating']},
  {d:'MEDIUM',q:'What is the past tense of "write"?',opts:['A. wrote','B. writed','C. writes','D. writing']},
  {d:'MEDIUM',q:'What is the past tense of "swim"?',opts:['A. swam','B. swimmed','C. swims','D. swimming']},
  {d:'HARD',q:'What is the past tense of "bring"?',opts:['A. brought','B. bringed','C. brings','D. bringing']},
  {d:'EASY',q:'Read: "Yesterday, Lan woke up at 6 a.m. She had breakfast, brushed her teeth, and went to school." How many activities are mentioned?',opts:['A. three','B. two','C. four','D. five']},
  {d:'MEDIUM',q:'Read: "Yesterday, Lan woke up at 6 a.m. She had breakfast, brushed her teeth, and went to school." When did she go to school?',opts:['A. yesterday','B. today','C. last week','D. tomorrow']},
  {d:'MEDIUM',q:'Read: "Tom fell off his bike last Monday. His knee hurt, but he was okay." What happened to Tom?',opts:['A. He fell off his bike.','B. He broke his arm.','C. He hurt his head.','D. He lost his bike.']},
  {d:'HARD',q:'Read: "In 1975, the Vietnam War ended. The country was reunified. People celebrated in the streets." When did the war end?',opts:['A. 1975','B. 1945','C. 1965','D. 1985']},
  {d:'EASY',q:'She ___ happy last night. She cried a lot.',opts:['A. wasn\'t','B. didn\'t','C. isn\'t','D. don\'t']},
  {d:'MEDIUM',q:'We ___ have class yesterday because of the holiday.',opts:['A. didn\'t','B. don\'t','C. weren\'t','D. aren\'t']},
  {d:'HARD',q:'He ___ to eat because he felt sick.',opts:['A. didn\'t want','B. don\'t want','C. wasn\'t want','D. doesn\'t want']},
  {d:'EASY',q:'I visited the zoo last ___.',opts:['A. Sunday','B. days','C. today','D. right now']},
  {d:'MEDIUM',q:'She was born on July ___.',opts:['A. 4th','B. 4','C. four','D. forty']},
  {d:'HARD',q:'The test ___ very difficult so many students ___ well.',opts:['A. was / didn\'t do','B. is / don\'t do','C. was / don\'t do','D. is / didn\'t do']},
  {d:'EASY',q:'I ___ to school yesterday. I ___ at home all day.',opts:['A. didn\'t go / stayed','B. don\'t go / stay','C. went / stayed','D. didn\'t go / stay']},
  {d:'MEDIUM',q:'___ they visit their grandparents last weekend?',opts:['A. Did','B. Do','C. Were','D. Was']},
  {d:'HARD',q:'How ___ you feel when you won the prize?',opts:['A. did','B. do','C. was','D. were']},
  {d:'EASY',q:'She ___ a cake for my birthday.',opts:['A. baked','B. bake','C. bakes','D. baking']},
  {d:'MEDIUM',q:'We ___ to the theatre to see a play last Saturday.',opts:['A. went','B. go','C. goes','D. going']},
  {d:'HARD',q:'The journey ___ five hours, so we were very tired.',opts:['A. took','B. take','C. takes','D. taking']},
  {d:'EASY',q:'He ___ his bicycle and rode to school.',opts:['A. found','B. find','C. finds','D. finding']},
  {d:'MEDIUM',q:'I ___ a funny video and laughed a lot.',opts:['A. watched','B. watch','C. watches','D. watching']},
  {d:'HARD',q:'She ___ first to finish the race and ___ a gold medal.',opts:['A. ran / won','B. run / win','C. ran / win','D. run / won']},
  {d:'EASY',q:'He ___ goodbye and left the room.',opts:['A. said','B. say','C. says','D. saying']},
  {d:'MEDIUM',q:'We ___ our bags and boarded the train.',opts:['A. packed','B. pack','C. packs','D. packing']},
  {d:'HARD',q:'She ___ (feel) nervous before the performance, but once she ___ (start), she was fine.',opts:['A. felt / started','B. feel / start','C. felt / start','D. feel / started']},
  {d:'EASY',q:'They ___ not come to the party.',opts:['A. did','B. do','C. were','D. was']},
  {d:'MEDIUM',q:'The shop ___ open when we arrived.',opts:['A. wasn\'t','B. didn\'t','C. weren\'t','D. don\'t']},
  {d:'HARD',q:'Even though it ___ raining, we ___ our picnic.',opts:['A. was / enjoyed','B. is / enjoy','C. was / enjoy','D. is / enjoyed']},
];
async function main() {
  const admin = await p.user.findFirst({ where: { role: 'ADMIN' }, select: { id: true } });
  const keys = ['A','B','C','D'];
  let count = 0;
  for (const q of QUESTIONS) {
    await p.question.create({
      data: {
        content: q.q, subjectId: 'sub-anh', gradeId: 'grade-5',
        topicId: TOPIC_ID, difficulty: q.d, questionType: 'MULTIPLE_CHOICE',
        status: 'ACTIVE', createdById: admin.id,
        explanation: `Đáp án đúng: ${q.opts[0]}`,
        options: { create: q.opts.map((text, i) => ({
          optionKey: keys[i], content: text, isCorrect: i === 0, sortOrder: i,
        }))},
      },
    });
    count++;
    if (count % 50 === 0) console.log(`  ${count}/${QUESTIONS.length} câu...`);
  }
  const total = await p.question.count({ where: { topicId: TOPIC_ID } });
  const allEng5 = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-5' } });
  console.log(`\n✅ Đã thêm ${count} câu`);
  console.log(`📌 Grammar - Thì quá khứ đơn: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
