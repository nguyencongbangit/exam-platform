const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocn000ploc723hvincf';
const QUESTIONS = [
  {d:'EASY',q:'My dog ___ bones every day.',opts:['A. buries','B. bury','C. is burying','D. are burying']},
  {d:'EASY',q:'The children ___ a kite in the field right now.',opts:['A. are flying','B. fly','C. flies','D. is flying']},
  {d:'EASY',q:'He usually ___ chess with his father on Sunday.',opts:['A. plays','B. play','C. is playing','D. are playing']},
  {d:'EASY',q:'Look! She ___ across the road.',opts:['A. is running','B. runs','C. run','D. ran']},
  {d:'MEDIUM',q:'The mechanic ___ a car in the workshop right now.',opts:['A. is repairing','B. repairs','C. repair','D. are repairing']},
  {d:'MEDIUM',q:'My grandmother ___ me a story every night.',opts:['A. tells','B. tell','C. is telling','D. are telling']},
  {d:'HARD',q:'The company ___ new products to the market every year.',opts:['A. introduces','B. introduce','C. is introducing','D. are introducing']},
  {d:'EASY',q:'The birds ___ beautiful songs in the morning.',opts:['A. sing','B. sings','C. is singing','D. are singing']},
  {d:'MEDIUM',q:'Right now, we ___ a very interesting lesson.',opts:['A. are having','B. have','C. has','D. is having']},
  {d:'HARD',q:'She ___ the piano when I ___ her house.',opts:['A. is playing / visit','B. plays / am visiting','C. is playing / am visiting','D. plays / visit']},
  {d:'EASY',q:'My sister always ___ the dishes after dinner.',opts:['A. washes','B. wash','C. is washing','D. are washing']},
  {d:'EASY',q:'He ___ his bike to school every day.',opts:['A. rides','B. ride','C. is riding','D. are riding']},
  {d:'MEDIUM',q:'She ___ to her teacher right now.',opts:['A. is talking','B. talks','C. talk','D. are talking']},
  {d:'MEDIUM',q:'Every Sunday, the family ___ to church.',opts:['A. goes','B. go','C. is going','D. are going']},
  {d:'HARD',q:'He always ___ his keys, which is very annoying.',opts:['A. loses','B. lose','C. is losing','D. are losing']},
  {d:'EASY',q:'It ___ a lot in the rainy season.',opts:['A. rains','B. rain','C. is raining','D. are raining']},
  {d:'MEDIUM',q:'Look outside! It ___ heavily.',opts:['A. is raining','B. rains','C. rain','D. are raining']},
  {d:'EASY',q:'I ___ not like spicy food.',opts:['A. do','B. does','C. am','D. is']},
  {d:'MEDIUM',q:'He ___ not going to the party tonight.',opts:['A. is','B. does','C. do','D. are']},
  {d:'EASY',q:'___ she like chocolate? Yes, she ___.',opts:['A. Does / does','B. Do / do','C. Is / is','D. Are / are']},
  {d:'MEDIUM',q:'___ they watching a movie? No, they ___.',opts:['A. Are / aren\'t','B. Do / don\'t','C. Is / isn\'t','D. Does / doesn\'t']},
  {d:'HARD',q:'___ your parents speak English? Yes, they ___.',opts:['A. Do / do','B. Does / does','C. Are / are','D. Is / is']},
  {d:'EASY',q:'The cat ___ milk from a bowl every morning.',opts:['A. drinks','B. drink','C. is drinking','D. are drinking']},
  {d:'MEDIUM',q:'My friends and I ___ at the swimming pool right now.',opts:['A. are swimming','B. swim','C. swims','D. is swimming']},
  {d:'HARD',q:'She normally ___ the bus, but today she ___ because the bus is late.',opts:['A. takes / is walking','B. is taking / walks','C. takes / walks','D. is taking / is walking']},
  {d:'EASY',q:'He ___ the newspaper every morning.',opts:['A. reads','B. read','C. is reading','D. are reading']},
  {d:'MEDIUM',q:'She ___ a dress for the party right now.',opts:['A. is making','B. makes','C. make','D. are making']},
  {d:'HARD',q:'English ___ the official language of many countries.',opts:['A. is','B. are','C. was','D. were']},
  {d:'EASY',q:'My parents ___ me every weekend.',opts:['A. call','B. calls','C. is calling','D. are calls']},
  {d:'MEDIUM',q:'She ___ in a hospital every day to help patients.',opts:['A. works','B. work','C. is working','D. are working']},
  {d:'HARD',q:'The children ___ (not play) right now. They ___ (study).',opts:['A. aren\'t playing / are studying','B. don\'t play / study','C. aren\'t playing / study','D. don\'t play / are studying']},
  {d:'EASY',q:'He ___ in a band. They practice every Saturday.',opts:['A. plays','B. play','C. is playing','D. are playing']},
  {d:'MEDIUM',q:'She ___ at the market right now.',opts:['A. is shopping','B. shops','C. shop','D. are shopping']},
  {d:'HARD',q:'They ___ always ___ late to meetings.',opts:['A. are / arriving','B. do / arrive','C. is / arriving','D. does / arrive']},
  {d:'EASY',q:'He often ___ football with his friends.',opts:['A. plays','B. play','C. is playing','D. are playing']},
  {d:'MEDIUM',q:'She ___ not understand the question.',opts:['A. does','B. do','C. is','D. are']},
  {d:'HARD',q:'We ___ (discuss) the problem now. Can you join us?',opts:['A. are discussing','B. discuss','C. discusses','D. is discussing']},
  {d:'EASY',q:'I ___ happy today!',opts:['A. am','B. is','C. are','D. be']},
  {d:'MEDIUM',q:'She ___ a new song these days.',opts:['A. is learning','B. learn','C. learns','D. are learning']},
  {d:'HARD',q:'He usually ___ at 10 p.m., but tonight he ___ at midnight.',opts:['A. sleeps / is sleeping','B. is sleeping / sleeps','C. sleep / sleeps','D. sleeps / sleeps']},
  {d:'EASY',q:'The baby ___ right now. Please be quiet.',opts:['A. is crying','B. cry','C. cries','D. are crying']},
  {d:'MEDIUM',q:'He ___ not usually late, but today he is.',opts:['A. is','B. does','C. do','D. are']},
  {d:'HARD',q:'She ___ Italian and she ___ a lot right now because she is visiting Italy.',opts:['A. speaks / is practising','B. is speaking / practises','C. speaks / practises','D. is speaking / is practising']},
  {d:'EASY',q:'My dog ___ a lot in the morning.',opts:['A. barks','B. bark','C. is barking','D. are barking']},
  {d:'MEDIUM',q:'They ___ lunch right now at the cafeteria.',opts:['A. are having','B. have','C. has','D. is having']},
  {d:'HARD',q:'Every year, thousands of tourists ___ this beautiful city.',opts:['A. visit','B. visits','C. is visiting','D. are visiting']},
  {d:'EASY',q:'She ___ her room every Saturday.',opts:['A. cleans','B. clean','C. is cleaning','D. are cleaning']},
  {d:'MEDIUM',q:'Right now, he ___ the problem carefully.',opts:['A. is considering','B. considers','C. consider','D. are considering']},
  {d:'HARD',q:'The scientist ___ (work) on a new discovery at the moment.',opts:['A. is working','B. works','C. work','D. are working']},
  {d:'EASY',q:'She ___ her friends after school every Friday.',opts:['A. meets','B. meet','C. is meeting','D. are meeting']},
  {d:'MEDIUM',q:'My father ___ a nap right now, so let\'s be quiet.',opts:['A. is taking','B. takes','C. take','D. are taking']},
  {d:'HARD',q:'The price of everything ___ these days. (trend)',opts:['A. is rising','B. rise','C. rises','D. rose']},
  {d:'EASY',q:'My teacher ___ always ___ us to do our best.',opts:['A. is / encouraging','B. does / encourage','C. - / encourages','D. are / encouraging']},
  {d:'MEDIUM',q:'He ___ music to relax after a hard day at school.',opts:['A. listens to','B. is listening to','C. listen to','D. are listening to']},
  {d:'HARD',q:'At this very moment, hundreds of planes ___ over our heads.',opts:['A. are flying','B. fly','C. flies','D. is flying']},
  {d:'EASY',q:'The milk ___ in the fridge. Don\'t forget.',opts:['A. is','B. are','C. was','D. be']},
  {d:'MEDIUM',q:'She ___ (not talk) to him right now because she is busy.',opts:['A. isn\'t talking','B. doesn\'t talk','C. don\'t talk','D. aren\'t talking']},
  {d:'HARD',q:'They ___ breakfast right now and ___ the morning news.',opts:['A. are eating / watching','B. eat / watch','C. are eating / watch','D. eat / are watching']},
  {d:'EASY',q:'My cat ___ (sleep) a lot. It sleeps 15 hours a day!',opts:['A. sleeps','B. sleep','C. is sleeping','D. are sleeping']},
  {d:'MEDIUM',q:'Listen to that! Someone ___ (play) the guitar upstairs.',opts:['A. is playing','B. plays','C. play','D. are playing']},
  {d:'HARD',q:'She ___ (study) at university now. She ___ (want) to be a doctor.',opts:['A. is studying / wants','B. studies / is wanting','C. is studying / is wanting','D. studies / wants']},
  {d:'EASY',q:'He is not happy. He ___ (cry).',opts:['A. is crying','B. cries','C. cry','D. are crying']},
  {d:'MEDIUM',q:'What ___ (he / think) about right now?',opts:['A. is he thinking','B. does he think','C. he is thinking','D. he thinks']},
  {d:'HARD',q:'While she ___ (cook), her children ___ (do) their homework.',opts:['A. is cooking / are doing','B. cooks / do','C. is cooking / do','D. cooks / are doing']},
  {d:'EASY',q:'My friends ___ (wait) for me outside school right now.',opts:['A. are waiting','B. wait','C. waits','D. is waiting']},
  {d:'MEDIUM',q:'It never ___ in the desert. (general fact)',opts:['A. rains','B. is raining','C. rain','D. are raining']},
  {d:'HARD',q:'She ___ (learn) to drive at the moment.',opts:['A. is learning','B. learn','C. learns','D. are learning']},
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
  console.log(`📌 Grammar - Thì hiện tại: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
