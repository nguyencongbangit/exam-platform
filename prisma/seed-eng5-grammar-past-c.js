const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocr000rloc7nly7vbx3';
const QUESTIONS = [
  {d:'EASY',q:'What is the past tense of "have"?',opts:['A. had','B. haved','C. has','D. having']},
  {d:'EASY',q:'What is the past tense of "see"?',opts:['A. saw','B. seed','C. sees','D. seeing']},
  {d:'EASY',q:'What is the past tense of "come"?',opts:['A. came','B. comed','C. comes','D. coming']},
  {d:'EASY',q:'What is the past tense of "take"?',opts:['A. took','B. taked','C. takes','D. taking']},
  {d:'EASY',q:'What is the past tense of "run"?',opts:['A. ran','B. runned','C. runs','D. running']},
  {d:'MEDIUM',q:'What is the past tense of "give"?',opts:['A. gave','B. gived','C. gives','D. giving']},
  {d:'MEDIUM',q:'What is the past tense of "know"?',opts:['A. knew','B. knowed','C. knows','D. knowing']},
  {d:'MEDIUM',q:'What is the past tense of "think"?',opts:['A. thought','B. thinked','C. thinks','D. thinking']},
  {d:'HARD',q:'What is the past tense of "begin"?',opts:['A. began','B. beginned','C. begins','D. beginning']},
  {d:'HARD',q:'What is the past tense of "teach"?',opts:['A. taught','B. teached','C. teaches','D. teaching']},
  {d:'EASY',q:'Last night, I ___ (watch) a movie with my family.',opts:['A. watched','B. watch','C. watches','D. watching']},
  {d:'EASY',q:'She ___ (visit) her grandmother on Sunday.',opts:['A. visited','B. visit','C. visits','D. visiting']},
  {d:'MEDIUM',q:'He ___ (not / eat) lunch yesterday because he was busy.',opts:['A. didn\'t eat','B. don\'t eat','C. wasn\'t eat','D. isn\'t eating']},
  {d:'MEDIUM',q:'They ___ (play) basketball for two hours yesterday.',opts:['A. played','B. play','C. plays','D. playing']},
  {d:'HARD',q:'She ___ (write) three emails before dinner.',opts:['A. wrote','B. write','C. writes','D. writing']},
  {d:'EASY',q:'I ___ (be) at my friend\'s house all afternoon.',opts:['A. was','B. am','C. is','D. are']},
  {d:'MEDIUM',q:'The children ___ (be) very excited about the trip.',opts:['A. were','B. was','C. are','D. am']},
  {d:'HARD',q:'It ___ (be) a beautiful day so we went to the park.',opts:['A. was','B. is','C. were','D. are']},
  {d:'EASY',q:'She ___ (give) me a present for my birthday.',opts:['A. gave','B. give','C. gives','D. giving']},
  {d:'MEDIUM',q:'We ___ (sing) songs at the school concert.',opts:['A. sang','B. sing','C. sings','D. singing']},
  {d:'EASY',q:'Where did you ___ last summer?',opts:['A. go','B. went','C. goes','D. going']},
  {d:'EASY',q:'What did she ___?',opts:['A. do','B. did','C. does','D. doing']},
  {d:'MEDIUM',q:'How ___ the exam? Was it hard?',opts:['A. was','B. were','C. did','D. do']},
  {d:'MEDIUM',q:'Who ___ the window? It was open.',opts:['A. opened','B. open','C. opens','D. opening']},
  {d:'HARD',q:'___ he remember to bring his homework?',opts:['A. Did','B. Do','C. Was','D. Were']},
  {d:'EASY',q:'I played the guitar. (The underlined word is in ___)',opts:['A. simple past','B. simple present','C. present continuous','D. future']},
  {d:'EASY',q:'She goes to school. (The underlined word is in ___)',opts:['A. simple present','B. simple past','C. present continuous','D. future']},
  {d:'MEDIUM',q:'They were happy. (The verb is in ___ tense)',opts:['A. past','B. present','C. future','D. continuous']},
  {d:'EASY',q:'Yesterday, I ___ (wake) up early.',opts:['A. woke','B. wake','C. wakes','D. waking']},
  {d:'MEDIUM',q:'She ___ (meet) her friend at the café.',opts:['A. met','B. meet','C. meets','D. meeting']},
  {d:'EASY',q:'He felt ___ when he lost his dog.',opts:['A. sad','B. sadly','C. sadder','D. saddest']},
  {d:'MEDIUM',q:'They arrived ___ for the concert and missed the first song.',opts:['A. late','B. lately','C. later','D. latest']},
  {d:'HARD',q:'The movie ___ at 7 p.m. and ended at 9 p.m.',opts:['A. started','B. start','C. starts','D. starting']},
  {d:'EASY',q:'She scored a goal. Her team ___ the match.',opts:['A. won','B. win','C. wins','D. winning']},
  {d:'MEDIUM',q:'The teacher ___ the lesson. The students listened carefully.',opts:['A. explained','B. explain','C. explains','D. explaining']},
  {d:'HARD',q:'She ___ on the phone for an hour. Finally, she said goodbye and hung up.',opts:['A. talked','B. talk','C. talks','D. talking']},
  {d:'EASY',q:'I ___ him at the park. He was playing frisbee.',opts:['A. saw','B. see','C. sees','D. seeing']},
  {d:'MEDIUM',q:'She ___ her teeth before she ___ to bed.',opts:['A. brushed / went','B. brush / go','C. brushes / goes','D. brushed / go']},
  {d:'HARD',q:'After he ___ his lunch, he ___ a nap.',opts:['A. ate / took','B. eat / take','C. ate / take','D. eat / took']},
  {d:'EASY',q:'She ___ to me on the phone for an hour last night.',opts:['A. spoke','B. speak','C. speaks','D. speaking']},
  {d:'MEDIUM',q:'He ___ the answer on the first try.',opts:['A. found','B. find','C. finds','D. finding']},
  {d:'HARD',q:'They ___ an amazing adventure in the mountains last month.',opts:['A. had','B. have','C. has','D. having']},
  {d:'EASY',q:'She ___ (not / be) at school yesterday. She was sick.',opts:['A. wasn\'t','B. didn\'t','C. isn\'t','D. don\'t']},
  {d:'MEDIUM',q:'They ___ (not / watch) the match because they didn\'t have a TV.',opts:['A. didn\'t watch','B. don\'t watch','C. weren\'t watching','D. aren\'t watching']},
  {d:'HARD',q:'He ___ (not / realize) his mistake until the teacher corrected him.',opts:['A. didn\'t realize','B. don\'t realize','C. wasn\'t realize','D. doesn\'t realize']},
  {d:'EASY',q:'Read: "Nam went to the park. He played football and then ate ice cream." What did Nam eat?',opts:['A. ice cream','B. cake','C. pizza','D. noodles']},
  {d:'MEDIUM',q:'Read: "Yesterday, Hoa cleaned her room, washed the dishes, and helped her mother cook." How many chores did Hoa do?',opts:['A. three','B. two','C. four','D. five']},
  {d:'HARD',q:'Read: "In 1969, the first humans landed on the moon. Neil Armstrong stepped out of the spacecraft and walked on the moon\'s surface." What did Armstrong do first?',opts:['A. stepped out of the spacecraft','B. flew the rocket','C. took photos of Earth','D. planted a flag']},
  {d:'EASY',q:'She ___ me a beautiful flower yesterday.',opts:['A. gave','B. give','C. gives','D. giving']},
  {d:'MEDIUM',q:'He ___ all the cookies on the plate.',opts:['A. ate','B. eat','C. eats','D. eating']},
  {d:'HARD',q:'The concert ___ at 8 and thousands of people ___ there.',opts:['A. started / were','B. start / are','C. started / are','D. start / were']},
  {d:'EASY',q:'I cleaned my bedroom ___.',opts:['A. yesterday','B. tomorrow','C. now','D. right now']},
  {d:'MEDIUM',q:'She called me ___ ago.',opts:['A. an hour','B. in an hour','C. for an hour','D. at an hour']},
  {d:'HARD',q:'We first ___ each other five years ago.',opts:['A. met','B. meet','C. meets','D. meeting']},
  {d:'EASY',q:'He ___ very excited when he received the letter.',opts:['A. was','B. is','C. were','D. am']},
  {d:'MEDIUM',q:'I ___ not understand what he said.',opts:['A. did','B. do','C. was','D. am']},
  {d:'EASY',q:'They ___ to the beach and built sandcastles.',opts:['A. went','B. go','C. goes','D. going']},
  {d:'MEDIUM',q:'She ___ the book in three days.',opts:['A. read','B. reads','C. is reading','D. am reading']},
  {d:'HARD',q:'After the match, the players ___ hands and congratulated each other.',opts:['A. shook','B. shake','C. shakes','D. shaking']},
  {d:'EASY',q:'I ___ my uncle at the airport.',opts:['A. met','B. meet','C. meets','D. meeting']},
  {d:'MEDIUM',q:'She ___ a delicious meal for us.',opts:['A. cooked','B. cook','C. cooks','D. cooking']},
  {d:'HARD',q:'The earthquake ___ many buildings in the city.',opts:['A. destroyed','B. destroy','C. destroys','D. destroying']},
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
