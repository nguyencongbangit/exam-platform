const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocr000rloc7nly7vbx3';
const QUESTIONS = [
  // Was/Were (25)
  {d:'EASY',q:'I ___ at school yesterday.',opts:['A. was','B. were','C. am','D. is']},
  {d:'EASY',q:'They ___ happy last night.',opts:['A. were','B. was','C. are','D. is']},
  {d:'EASY',q:'She ___ at home this morning.',opts:['A. was','B. were','C. is','D. are']},
  {d:'EASY',q:'We ___ tired after the match.',opts:['A. were','B. was','C. are','D. am']},
  {d:'EASY',q:'He ___ sick last week.',opts:['A. was','B. were','C. is','D. are']},
  {d:'MEDIUM',q:'The weather ___ cold yesterday.',opts:['A. was','B. were','C. is','D. are']},
  {d:'MEDIUM',q:'My parents ___ proud of me last year.',opts:['A. were','B. was','C. are','D. am']},
  {d:'MEDIUM',q:'There ___ a big party in our school last month.',opts:['A. was','B. were','C. is','D. are']},
  {d:'HARD',q:'There ___ many people at the festival last summer.',opts:['A. were','B. was','C. are','D. is']},
  {d:'HARD',q:'The students ___ excited about the school trip yesterday.',opts:['A. were','B. was','C. are','D. am']},
  // Regular past verbs -ed (30)
  {d:'EASY',q:'She ___ her homework last night.',opts:['A. finished','B. finish','C. finishes','D. is finishing']},
  {d:'EASY',q:'We ___ football after school yesterday.',opts:['A. played','B. play','C. plays','D. are playing']},
  {d:'EASY',q:'He ___ TV all evening.',opts:['A. watched','B. watch','C. watches','D. watching']},
  {d:'EASY',q:'I ___ my grandparents on Sunday.',opts:['A. visited','B. visit','C. visits','D. visiting']},
  {d:'EASY',q:'She ___ a letter to her friend last week.',opts:['A. wrote','B. write','C. writes','D. writing']},
  {d:'MEDIUM',q:'They ___ the train to Da Nang last month.',opts:['A. took','B. take','C. takes','D. taking']},
  {d:'MEDIUM',q:'He ___ his lunch in the canteen.',opts:['A. ate','B. eat','C. eats','D. eating']},
  {d:'MEDIUM',q:'We ___ a beautiful sunset at the beach.',opts:['A. saw','B. see','C. sees','D. seeing']},
  {d:'HARD',q:'She ___ very hard for the exam last term.',opts:['A. studied','B. study','C. studies','D. studying']},
  {d:'HARD',q:'My father ___ a new car last year.',opts:['A. bought','B. buy','C. buys','D. buying']},
  {d:'EASY',q:'I ___ my bag to school today. (forgot it at home)',opts:['A. forgot','B. forget','C. forgets','D. forgetting']},
  {d:'EASY',q:'She ___ to the doctor yesterday.',opts:['A. went','B. go','C. goes','D. going']},
  {d:'MEDIUM',q:'They ___ a movie at the cinema last Saturday.',opts:['A. watched','B. watch','C. watches','D. watching']},
  {d:'MEDIUM',q:'He ___ in a swimming competition last month.',opts:['A. swam','B. swim','C. swims','D. swimming']},
  {d:'HARD',q:'She ___ the first prize in the English contest last year.',opts:['A. won','B. win','C. wins','D. winning']},
  // Negative past (20)
  {d:'EASY',q:'I ___ go to school yesterday because I was sick.',opts:['A. didn\'t','B. don\'t','C. wasn\'t','D. am not']},
  {d:'EASY',q:'She ___ finish her homework last night.',opts:['A. didn\'t','B. don\'t','C. doesn\'t','D. wasn\'t']},
  {d:'MEDIUM',q:'They ___ watch TV last evening.',opts:['A. didn\'t','B. don\'t','C. doesn\'t','D. aren\'t']},
  {d:'MEDIUM',q:'He ___ at home yesterday.',opts:['A. wasn\'t','B. didn\'t','C. don\'t','D. doesn\'t']},
  {d:'HARD',q:'We ___ enjoy the meal because it was too spicy.',opts:['A. didn\'t','B. don\'t','C. doesn\'t','D. aren\'t']},
  // Questions in past (20)
  {d:'EASY',q:'___ you go to the party last night?',opts:['A. Did','B. Do','C. Were','D. Was']},
  {d:'EASY',q:'___ she at home yesterday?',opts:['A. Was','B. Were','C. Did','D. Do']},
  {d:'EASY',q:'What ___ you do last weekend?',opts:['A. did','B. do','C. does','D. was']},
  {d:'MEDIUM',q:'Where ___ he go last summer?',opts:['A. did','B. do','C. does','D. was']},
  {d:'MEDIUM',q:'How ___ the movie last night?',opts:['A. was','B. were','C. did','D. do']},
  {d:'HARD',q:'___ your parents happy with your results?',opts:['A. Were','B. Was','C. Did','D. Do']},
  // Time expressions (15)
  {d:'EASY',q:'I visited Hanoi ___ year.',opts:['A. last','B. ago','C. yesterday','D. before']},
  {d:'EASY',q:'She graduated from school three years ___.',opts:['A. ago','B. last','C. before','D. past']},
  {d:'EASY',q:'He called me ___ morning.',opts:['A. yesterday','B. last','C. ago','D. before']},
  {d:'MEDIUM',q:'They moved to this city ___ 2020.',opts:['A. in','B. at','C. on','D. ago']},
  {d:'HARD',q:'___ did you arrive? I arrived at 3 o\'clock.',opts:['A. When','B. Where','C. What time','D. How long']},
  // Irregular verbs (30)
  {d:'EASY',q:'I ___ to the market with my mother last Saturday.',opts:['A. went','B. go','C. goes','D. going']},
  {d:'EASY',q:'She ___ a beautiful dress to the party.',opts:['A. wore','B. wear','C. wears','D. wearing']},
  {d:'EASY',q:'He ___ the book in one day.',opts:['A. read','B. reads','C. reading','D. readed']},
  {d:'MEDIUM',q:'We ___ to music at the concert last night.',opts:['A. listened','B. listen','C. listens','D. listening']},
  {d:'MEDIUM',q:'She ___ her keys somewhere in the house.',opts:['A. lost','B. lose','C. loses','D. losing']},
  {d:'HARD',q:'He ___ his bicycle to school for the first time yesterday.',opts:['A. rode','B. ride','C. rides','D. riding']},
  {d:'EASY',q:'I ___ a lot of water after PE class.',opts:['A. drank','B. drink','C. drinks','D. drinking']},
  {d:'MEDIUM',q:'She ___ her bag on the bus and couldn\'t find it.',opts:['A. left','B. leave','C. leaves','D. leaving']},
  {d:'HARD',q:'The students ___ very well in the test yesterday.',opts:['A. did','B. do','C. does','D. doing']},
  // Reading + story (30)
  {d:'MEDIUM',q:'Read: "Last summer, my family went to Ha Long Bay. We took a boat trip and saw many beautiful limestone islands. We also ate fresh seafood." Where did the family go?',opts:['A. to Ha Long Bay','B. to Da Nang','C. to Phu Quoc','D. to Hue']},
  {d:'MEDIUM',q:'Read: "Last summer, my family went to Ha Long Bay." What did they do there?',opts:['A. took a boat trip','B. swam in the sea','C. climbed mountains','D. visited a museum']},
  {d:'MEDIUM',q:'Read: "Yesterday, Tom woke up late. He missed the bus and had to walk to school. He arrived thirty minutes late." Why did Tom walk to school?',opts:['A. He missed the bus.','B. He liked walking.','C. The school was near.','D. His bike was broken.']},
  {d:'HARD',q:'Read: "In 1969, astronaut Neil Armstrong walked on the Moon for the first time. He said: \'One small step for man, one giant leap for mankind.\'" When did Armstrong walk on the Moon?',opts:['A. 1969','B. 1979','C. 1959','D. 1999']},
  {d:'MEDIUM',q:'Read: "She studied hard for two months. Finally, she passed the exam with flying colours." What did she do for two months?',opts:['A. studied hard','B. painted pictures','C. played sports','D. went on holiday']},
  {d:'HARD',q:'Read: "The ancient Egyptians built the pyramids thousands of years ago. They used huge stone blocks." Who built the pyramids?',opts:['A. The ancient Egyptians','B. The ancient Greeks','C. The ancient Romans','D. The ancient Chinese']},
  // Mixed review (30)
  {d:'EASY',q:'She ___ happy when she heard the good news.',opts:['A. was','B. is','C. were','D. am']},
  {d:'EASY',q:'We ___ a great time at the beach last summer.',opts:['A. had','B. have','C. has','D. having']},
  {d:'MEDIUM',q:'Did you ___ to the concert last night?',opts:['A. go','B. went','C. goes','D. going']},
  {d:'MEDIUM',q:'She ___ not come to school yesterday because she ___ ill.',opts:['A. did / was','B. didn\'t / was','C. wasn\'t / did','D. wasn\'t / didn\'t']},
  {d:'HARD',q:'What did you ___ last weekend?',opts:['A. do','B. did','C. does','D. doing']},
  {d:'EASY',q:'He ___ a letter to his pen pal last month.',opts:['A. wrote','B. write','C. writes','D. writing']},
  {d:'MEDIUM',q:'They ___ a trip to Ho Chi Minh City in January.',opts:['A. took','B. take','C. takes','D. taking']},
  {d:'HARD',q:'___ the weather nice when you visited the beach?',opts:['A. Was','B. Were','C. Did','D. Do']},
  {d:'EASY',q:'I ___ dinner at a nice restaurant last night.',opts:['A. had','B. have','C. has','D. having']},
  {d:'MEDIUM',q:'She ___ the piano at the school concert last year.',opts:['A. played','B. play','C. plays','D. playing']},
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
