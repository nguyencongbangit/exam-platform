const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocv000tloc768ugebtk';
const QUESTIONS = [
  {d:'EASY',q:'I ___ go to the cinema tomorrow.',opts:['A. will','B. did','C. do','D. am']},
  {d:'EASY',q:'He ___ be ten years old next month.',opts:['A. will','B. was','C. is','D. are']},
  {d:'EASY',q:'We ___ see you at the festival.',opts:['A. will','B. did','C. do','D. are']},
  {d:'EASY',q:'She ___ not forget your birthday.',opts:['A. will','B. did','C. does','D. is']},
  {d:'EASY',q:'I promise I ___ do my best.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'They ___ finish the race in less than an hour.',opts:['A. will','B. are going to','C. did','D. were']},
  {d:'MEDIUM',q:'She says she ___ study medicine at university.',opts:['A. will','B. did','C. was','D. has']},
  {d:'HARD',q:'I don\'t think he ___ come. He\'s too busy.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'___ you help me carry these bags?',opts:['A. Will','B. Were','C. Did','D. Do']},
  {d:'MEDIUM',q:'Do you think she ___ win?',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'HARD',q:'Who ___ win the World Cup next time?',opts:['A. will','B. is going to','C. were','D. has']},
  {d:'EASY',q:'He ___ going to join the school team next year.',opts:['A. is','B. am','C. are','D. was']},
  {d:'EASY',q:'I ___ going to paint my room this weekend.',opts:['A. am','B. is','C. are','D. was']},
  {d:'EASY',q:'We ___ going to have a class picnic on Friday.',opts:['A. are','B. is','C. am','D. was']},
  {d:'MEDIUM',q:'She ___ going to take a cooking class next month.',opts:['A. is','B. am','C. are','D. was']},
  {d:'MEDIUM',q:'They ___ going to move to a bigger house.',opts:['A. are','B. is','C. am','D. was']},
  {d:'HARD',q:'My parents ___ going to buy me a new bike for my birthday.',opts:['A. are','B. is','C. am','D. was']},
  {d:'EASY',q:'___ she going to the party?',opts:['A. Is','B. Am','C. Are','D. Was']},
  {d:'MEDIUM',q:'___ they going to watch the match tonight?',opts:['A. Are','B. Is','C. Am','D. Were']},
  {d:'HARD',q:'What ___ you going to do on your next birthday?',opts:['A. are','B. is','C. am','D. were']},
  {d:'EASY',q:'A: Can you open the window? B: Sure, I ___ do it now. (instant decision)',opts:['A. will','B. am going to','C. was going to','D. have']},
  {d:'MEDIUM',q:'I\'ve already decided. I ___ be a scientist. (fixed plan)',opts:['A. am going to','B. will','C. was going to','D. have']},
  {d:'HARD',q:'She ___ fall! Catch her! (clear evidence)',opts:['A. is going to','B. will','C. is','D. has']},
  {d:'EASY',q:'I think robots ___ do many jobs in the future.',opts:['A. will','B. are going to','C. are','D. were']},
  {d:'MEDIUM',q:'I ___ not going to eat so much candy anymore.',opts:['A. am','B. is','C. are','D. was']},
  {d:'MEDIUM',q:'She ___ not going to quit because she loves the job.',opts:['A. is','B. am','C. are','D. was']},
  {d:'HARD',q:'He ___ not going to pass if he doesn\'t study.',opts:['A. is','B. am','C. are','D. was']},
  {d:'EASY',q:'I ___ not come to school tomorrow. I am sick.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'She ___ not travel this summer because she has no money.',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'HARD',q:'They ___ not complete the task unless they work faster.',opts:['A. will','B. are going to','C. did','D. were']},
  {d:'EASY',q:'The train will leave ___ five minutes.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'She is going to travel ___ the holidays.',opts:['A. during','B. in','C. at','D. for']},
  {d:'MEDIUM',q:'He will return ___ Monday.',opts:['A. on','B. in','C. at','D. for']},
  {d:'EASY',q:'If you help me, I ___ help you too.',opts:['A. will','B. would','C. am','D. was']},
  {d:'MEDIUM',q:'If the weather is good, we ___ go to the beach.',opts:['A. will','B. would','C. are','D. were']},
  {d:'HARD',q:'If she practises every day, she ___ improve quickly.',opts:['A. will','B. would','C. is going to','D. was']},
  {d:'EASY',q:'She ___ call us as soon as she arrives.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'MEDIUM',q:'I ___ help you when I finish this task.',opts:['A. will','B. was going to','C. am','D. did']},
  {d:'HARD',q:'He says he ___ work very hard until he achieves his dream.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'Read: "Our school will hold a Science Fair next month. Students will show their projects to parents and teachers." When will the Science Fair happen?',opts:['A. next month','B. last month','C. next week','D. this afternoon']},
  {d:'MEDIUM',q:'Read: "Anna is going to learn the violin. Her parents have already bought her a violin and signed her up for lessons." What has Anna\'s parents done?',opts:['A. bought her a violin and signed her up for lessons','B. given her money for lessons','C. taught her themselves','D. rented a violin for her']},
  {d:'HARD',q:'Read: "Scientists believe that temperatures will rise by 2 degrees by 2100 if we don\'t reduce carbon emissions." What will happen if we don\'t reduce emissions?',opts:['A. temperatures will rise by 2 degrees','B. sea levels will drop','C. winters will get colder','D. deserts will disappear']},
  {d:'EASY',q:'Tomorrow is Saturday. What ___ you do?',opts:['A. will','B. did','C. do','D. are']},
  {d:'MEDIUM',q:'They ___ build a new library in our neighbourhood next year.',opts:['A. are going to','B. were going to','C. did','D. have']},
  {d:'HARD',q:'By 2050, electric planes ___ carry passengers around the world.',opts:['A. will','B. are going to','C. are','D. were']},
  {d:'EASY',q:'She is studying hard because she ___ pass the exam.',opts:['A. wants to','B. will','C. is going to','D. was going to']},
  {d:'MEDIUM',q:'He ___ not late. I just received a message from him.',opts:['A. won\'t be','B. is not going to','C. wasn\'t','D. didn\'t']},
  {d:'HARD',q:'I ___ definitely visit Vietnam again. It was wonderful!',opts:['A. will','B. am going to','C. was going to','D. have']},
  {d:'EASY',q:'She ___ go on holiday to Japan next summer.',opts:['A. is going to','B. was going to','C. did','D. has']},
  {d:'MEDIUM',q:'He is very talented. I\'m sure he ___ become a famous artist.',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'HARD',q:'If nothing changes, the problem ___ get worse.',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'EASY',q:'___ they going to plant trees in the school garden?',opts:['A. Are','B. Is','C. Am','D. Were']},
  {d:'MEDIUM',q:'What time ___ the film start tonight?',opts:['A. will','B. is going to','C. was','D. does']},
  {d:'HARD',q:'She promised she ___ tell nobody about the surprise party.',opts:['A. would','B. will','C. is going to','D. was going to']},
  {d:'EASY',q:'I ___ be a pilot when I grow up.',opts:['A. want to be','B. will be going to be','C. am','D. was']},
  {d:'MEDIUM',q:'He looks very confident. He ___ give a great speech.',opts:['A. is going to','B. will','C. was going to','D. has']},
  {d:'HARD',q:'In fifty years, most people ___ live in smart cities with automated systems.',opts:['A. will','B. are going to','C. were','D. have']},
  {d:'EASY',q:'She ___ not tell a lie. She is an honest person.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'MEDIUM',q:'The doctor says she ___ be fine after a few days of rest.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'HARD',q:'I don\'t feel well. I think I ___ be sick.',opts:['A. am going to','B. will','C. was going to','D. have']},
  {d:'EASY',q:'He ___ not play today. He has a cold.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'MEDIUM',q:'We ___ not forget this amazing holiday.',opts:['A. will','B. are going to','C. were','D. have']},
  {d:'HARD',q:'If she doesn\'t change her habits, her health ___ get worse.',opts:['A. will','B. is going to','C. was','D. has']},
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
