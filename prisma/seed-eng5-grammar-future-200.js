const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocv000tloc768ugebtk';
const QUESTIONS = [
  // Will - affirmative (30)
  {d:'EASY',q:'I ___ help you with your homework.',opts:['A. will','B. am going to','C. was','D. do']},
  {d:'EASY',q:'She ___ call you later.',opts:['A. will','B. was','C. is','D. does']},
  {d:'EASY',q:'They ___ arrive soon.',opts:['A. will','B. are','C. do','D. were']},
  {d:'EASY',q:'It ___ probably rain tomorrow.',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'EASY',q:'He ___ be a doctor when he grows up.',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'MEDIUM',q:'Don\'t worry. I ___ help you.',opts:['A. will','B. am going to','C. was','D. do']},
  {d:'MEDIUM',q:'She thinks it ___ be a hot summer.',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'HARD',q:'I believe she ___ succeed in her studies.',opts:['A. will','B. is going to','C. was','D. has']},
  // Will - negative (15)
  {d:'EASY',q:'I ___ tell anyone your secret.',opts:['A. won\'t','B. will not to','C. am not going to','D. was not']},
  {d:'MEDIUM',q:'She ___ come to the party tonight.',opts:['A. won\'t','B. will not to','C. isn\'t go to','D. was not']},
  {d:'HARD',q:'They ___ finish the project on time because they started late.',opts:['A. won\'t','B. will not to','C. aren\'t going to','D. were not']},
  // Will - questions (15)
  {d:'EASY',q:'___ you come to my party?',opts:['A. Will','B. Are','C. Do','D. Were']},
  {d:'MEDIUM',q:'What ___ you do next weekend?',opts:['A. will','B. are','C. do','D. were']},
  {d:'HARD',q:'___ she be here by 8 o\'clock?',opts:['A. Will','B. Is','C. Does','D. Was']},
  // Be going to - affirmative (30)
  {d:'EASY',q:'I ___ going to visit my aunt next Sunday.',opts:['A. am','B. is','C. are','D. was']},
  {d:'EASY',q:'She ___ going to study English this summer.',opts:['A. is','B. am','C. are','D. was']},
  {d:'EASY',q:'They ___ going to travel to Japan next year.',opts:['A. are','B. is','C. am','D. was']},
  {d:'EASY',q:'We ___ going to cook dinner together.',opts:['A. are','B. is','C. am','D. was']},
  {d:'MEDIUM',q:'He ___ going to join the swimming team next term.',opts:['A. is','B. are','C. am','D. was']},
  {d:'MEDIUM',q:'Look at those black clouds! It ___ going to rain.',opts:['A. is','B. are','C. am','D. was']},
  {d:'HARD',q:'We ___ going to move to a new house next month.',opts:['A. are','B. is','C. am','D. was']},
  // Be going to - negative (10)
  {d:'EASY',q:'I ___ not going to eat junk food anymore.',opts:['A. am','B. is','C. are','D. was']},
  {d:'MEDIUM',q:'She ___ not going to watch TV tonight.',opts:['A. is','B. am','C. are','D. was']},
  {d:'HARD',q:'They ___ not going to the party because they are busy.',opts:['A. are','B. is','C. am','D. was']},
  // Be going to - questions (10)
  {d:'EASY',q:'___ you going to have a party?',opts:['A. Are','B. Is','C. Am','D. Were']},
  {d:'MEDIUM',q:'What ___ she going to do after school?',opts:['A. is','B. am','C. are','D. was']},
  {d:'HARD',q:'Where ___ they going to go on holiday?',opts:['A. are','B. is','C. am','D. were']},
  // Will vs Be going to (30)
  {d:'EASY',q:'A: I\'m thirsty. B: I ___ get you some water. (spontaneous offer)',opts:['A. will','B. am going to','C. was going to','D. is going to']},
  {d:'EASY',q:'She has decided to be a nurse. She ___ study medicine. (plan)',opts:['A. is going to','B. will','C. was going to','D. is']},
  {d:'MEDIUM',q:'Look! That boy ___ fall off his bike! (evidence)',opts:['A. is going to','B. will','C. was going to','D. is']},
  {d:'MEDIUM',q:'I think it ___ rain tomorrow. (prediction)',opts:['A. will','B. is going to','C. was going to','D. is']},
  {d:'HARD',q:'Don\'t touch that! It ___ burn you! (spontaneous warning)',opts:['A. will','B. is going to','C. was going to','D. is']},
  {d:'HARD',q:'She ___ visit Paris next summer. (plan already decided)',opts:['A. is going to','B. will','C. was going to','D. is']},
  {d:'EASY',q:'A: I promise I ___ finish before 9 o\'clock.',opts:['A. will','B. am going to','C. was going to','D. have']},
  {d:'MEDIUM',q:'He forgot his lunch. He ___ be hungry later. (prediction with certainty)',opts:['A. is going to','B. will','C. was going to','D. is']},
  {d:'HARD',q:'If you don\'t hurry, you ___ miss the bus.',opts:['A. will','B. are going to','C. was going to','D. are']},
  // Future time expressions (15)
  {d:'EASY',q:'I will go to bed ___ ten o\'clock.',opts:['A. at','B. in','C. on','D. for']},
  {d:'EASY',q:'She is going to travel ___ summer.',opts:['A. next','B. last','C. ago','D. before']},
  {d:'MEDIUM',q:'They will arrive ___ two hours.',opts:['A. in','B. at','C. on','D. for']},
  {d:'MEDIUM',q:'He is going to study abroad ___ year.',opts:['A. next','B. last','C. ago','D. before']},
  {d:'HARD',q:'The concert will begin ___ Friday evening.',opts:['A. on','B. in','C. at','D. for']},
  // Conditionals with future (10)
  {d:'EASY',q:'If you study hard, you ___ pass the exam.',opts:['A. will','B. would','C. are','D. were']},
  {d:'MEDIUM',q:'If it rains, we ___ stay at home.',opts:['A. will','B. would','C. are','D. were']},
  {d:'HARD',q:'If she doesn\'t wake up early, she ___ miss the train.',opts:['A. will','B. would','C. is going to','D. was']},
  // Reading (15)
  {d:'MEDIUM',q:'Read: "Next week, our class is going to visit the science museum. We will see many exhibits about nature and space." What will they see?',opts:['A. exhibits about nature and space','B. paintings and sculptures','C. historical artefacts','D. films and shows']},
  {d:'MEDIUM',q:'Read: "I am going to learn how to swim this summer. My mother has already signed me up for lessons." When will this person learn to swim?',opts:['A. this summer','B. next year','C. last summer','D. this winter']},
  {d:'HARD',q:'Read: "In 2050, scientists predict that electric cars will replace most petrol cars. Cities will be cleaner and quieter." What will happen to petrol cars?',opts:['A. They will be replaced by electric cars.','B. They will be improved.','C. They will become cheaper.','D. They will disappear forever by 2030.']},
  // Mixed review (25)
  {d:'EASY',q:'Tomorrow ___ be Monday.',opts:['A. will','B. is going to','C. was','D. is']},
  {d:'EASY',q:'She is going to ___ a cake for the party.',opts:['A. bake','B. bakes','C. baking','D. baked']},
  {d:'MEDIUM',q:'___ they come to the school festival?',opts:['A. Will','B. Are','C. Do','D. Did']},
  {d:'MEDIUM',q:'What ___ you going to wear to the party?',opts:['A. are','B. is','C. am','D. were']},
  {d:'HARD',q:'She ___ probably finish the project by Friday.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'He ___ not going to eat dinner tonight.',opts:['A. is','B. am','C. are','D. was']},
  {d:'MEDIUM',q:'I think she ___ win the competition.',opts:['A. will','B. is going to','C. was','D. is']},
  {d:'HARD',q:'By 2030, many jobs ___ be done by robots.',opts:['A. will','B. are going to','C. were','D. are']},
  {d:'EASY',q:'We ___ play volleyball after school tomorrow.',opts:['A. will','B. are going to','C. were','D. do']},
  {d:'MEDIUM',q:'Look at those clouds! It ___ rain soon.',opts:['A. is going to','B. will','C. was','D. is']},
  {d:'HARD',q:'She promised she ___ call as soon as she arrived.',opts:['A. would','B. will','C. is going to','D. was going to']},
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
  console.log(`📌 Grammar - Thì tương lai: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
