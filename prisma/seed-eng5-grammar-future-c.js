const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocv000tloc768ugebtk';
const QUESTIONS = [
  {d:'EASY',q:'Next year, she ___ start at a new school.',opts:['A. will','B. did','C. was','D. does']},
  {d:'EASY',q:'I ___ not going to stay up late tonight.',opts:['A. am','B. is','C. are','D. was']},
  {d:'EASY',q:'They say the new park ___ open next spring.',opts:['A. will','B. was','C. did','D. does']},
  {d:'MEDIUM',q:'He looks nervous. He ___ make a mistake.',opts:['A. is going to','B. will','C. was going to','D. did']},
  {d:'MEDIUM',q:'I\'ve planned everything. I ___ travel around Asia next summer.',opts:['A. am going to','B. will','C. did','D. was']},
  {d:'HARD',q:'By the end of this year, she ___ have completed all her courses.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'A: The phone is ringing! B: I ___ answer it! (instant decision)',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'She has already bought the ingredients. She ___ bake a chocolate cake. (plan)',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'HARD',q:'Don\'t lean out of the window! You ___ fall! (warning with evidence)',opts:['A. are going to','B. will','C. did','D. were']},
  {d:'EASY',q:'He says he ___ never eat vegetables. (strong refusal)',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'MEDIUM',q:'If it snows, we ___ make a snowman.',opts:['A. will','B. are going to','C. did','D. were']},
  {d:'HARD',q:'As soon as she arrives, she ___ call you.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'EASY',q:'She ___ come to the party because she is busy.',opts:['A. won\'t','B. isn\'t going to','C. didn\'t','D. doesn\'t']},
  {d:'MEDIUM',q:'I ___ not talk to him again. He was very rude.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'HARD',q:'They ___ not be home until midnight.',opts:['A. will','B. are going to','C. were','D. did']},
  {d:'EASY',q:'___ it be cold tomorrow?',opts:['A. Will','B. Is','C. Was','D. Did']},
  {d:'MEDIUM',q:'What time ___ you going to leave?',opts:['A. are','B. is','C. am','D. were']},
  {d:'HARD',q:'How long ___ she going to stay in Japan?',opts:['A. is','B. am','C. are','D. was']},
  {d:'EASY',q:'She studies every night. She ___ do well in the exam.',opts:['A. will','B. did','C. was','D. is going to']},
  {d:'MEDIUM',q:'He packed his bags last night. He ___ leave early tomorrow.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'HARD',q:'Look at all those dark clouds! It ___ snow tonight.',opts:['A. is going to','B. will','C. is','D. was']},
  {d:'EASY',q:'I won\'t be able to come because I ___ look after my sister.',opts:['A. have to','B. will','C. am going to','D. was going to']},
  {d:'MEDIUM',q:'She ___ become a doctor. She has already applied to medical school.',opts:['A. is going to','B. will','C. was going to','D. did']},
  {d:'HARD',q:'He ___ probably get the job. He performed very well in the interview.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'In ten years ___, everything will change.',opts:['A. from now','B. ago','C. last','D. before']},
  {d:'MEDIUM',q:'She is going to study ___ a medical college.',opts:['A. at','B. in','C. on','D. for']},
  {d:'HARD',q:'They ___ have finished the project by the end of next week.',opts:['A. will','B. are going to','C. were','D. have']},
  {d:'EASY',q:'He ___ call you back when he is free.',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'MEDIUM',q:'She ___ not travel alone. Her friend is going with her.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'HARD',q:'If technology continues to advance, AI ___ solve many of the world\'s problems.',opts:['A. will','B. is going to','C. was','D. has']},
  {d:'EASY',q:'I ___ call you as soon as I get home.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'She ___ be eighteen next week.',opts:['A. will','B. is going to','C. was','D. has been']},
  {d:'HARD',q:'We ___ all be affected by climate change unless we act now.',opts:['A. will','B. are going to','C. were','D. have']},
  {d:'EASY',q:'A: I\'m cold. B: I ___ close the window for you.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'She bought a paint set yesterday. She ___ paint a picture this weekend.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'HARD',q:'He has been training hard for months. He ___ compete in the race next week.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'EASY',q:'Tomorrow ___ be a sunny day.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'MEDIUM',q:'She is nervous about the test. She ___ study all night.',opts:['A. is going to','B. will','C. was','D. did']},
  {d:'HARD',q:'In the future, people ___ travel to Mars for holidays.',opts:['A. will','B. are going to','C. were','D. have']},
  {d:'EASY',q:'He says he ___ be late. He is taking the early train.',opts:['A. won\'t','B. isn\'t going to','C. didn\'t','D. wasn\'t']},
  {d:'MEDIUM',q:'Don\'t worry. Everything ___ work out fine.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'HARD',q:'She ___ reach her goal if she keeps working this hard.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'EASY',q:'We ___ have a test on Friday. The teacher told us today.',opts:['A. are going to','B. will','C. did','D. were']},
  {d:'MEDIUM',q:'I promise I ___ never lie to you.',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'HARD',q:'She ___ retire next year after thirty years of teaching.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'EASY',q:'He ___ not be there. He told me he was busy.',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'MEDIUM',q:'I\'ve decided. I ___ apply for the scholarship.',opts:['A. am going to','B. will','C. did','D. was']},
  {d:'HARD',q:'The project ___ be reviewed by the board next week.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'EASY',q:'She ___ celebrate her birthday with a small family party.',opts:['A. is going to','B. will','C. did','D. was']},
  {d:'MEDIUM',q:'If you don\'t sleep enough, you ___ feel tired in the morning.',opts:['A. will','B. are going to','C. were','D. did']},
  {d:'HARD',q:'By 2030, solar energy ___ provide power for millions of homes.',opts:['A. will','B. is going to','C. were','D. did']},
  {d:'EASY',q:'She ___ teach us a new song tomorrow.',opts:['A. will','B. did','C. was','D. does']},
  {d:'MEDIUM',q:'He ___ going to start his new job next Monday.',opts:['A. is','B. am','C. are','D. was']},
  {d:'HARD',q:'She ___ have finished her degree by the time she turns 22.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'EASY',q:'I ___ not eat that. It looks horrible!',opts:['A. will','B. am going to','C. did','D. was']},
  {d:'MEDIUM',q:'He is very talented. He ___ become famous one day.',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'HARD',q:'If nothing is done, the situation ___ continue to worsen.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'EASY',q:'She ___ meet us at the station at noon.',opts:['A. will','B. did','C. was','D. is']},
  {d:'MEDIUM',q:'They ___ not come to the meeting. They sent an apology.',opts:['A. will','B. are going to','C. did','D. were']},
  {d:'HARD',q:'He ___ not be able to join us because of an important appointment.',opts:['A. will','B. is going to','C. did','D. was']},
  {d:'EASY',q:'I think she ___ be very happy when she hears the news.',opts:['A. will','B. is going to','C. was','D. did']},
  {d:'MEDIUM',q:'They ___ arrive at the airport at 6 in the morning.',opts:['A. are going to','B. will','C. did','D. were']},
  {d:'HARD',q:'If global temperatures rise another degree, many coastal areas ___ flood.',opts:['A. will','B. are going to','C. were','D. have']},
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
