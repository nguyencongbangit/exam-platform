const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocn000ploc723hvincf';
const QUESTIONS = [
  // Simple Present - affirmative (40)
  {d:'EASY',q:'She ___ to school every day.',opts:['A. goes','B. go','C. going','D. went']},
  {d:'EASY',q:'I ___ breakfast at 7 o\'clock.',opts:['A. eat','B. eats','C. eating','D. ate']},
  {d:'EASY',q:'He ___ football on weekends.',opts:['A. plays','B. play','C. playing','D. played']},
  {d:'EASY',q:'We ___ English at school.',opts:['A. learn','B. learns','C. learning','D. learned']},
  {d:'EASY',q:'The dog ___ bones.',opts:['A. likes','B. like','C. liking','D. liked']},
  {d:'EASY',q:'My father ___ in an office.',opts:['A. works','B. work','C. working','D. worked']},
  {d:'EASY',q:'Birds ___ in the sky.',opts:['A. fly','B. flies','C. flying','D. flied']},
  {d:'EASY',q:'The sun ___ in the east.',opts:['A. rises','B. rise','C. rising','D. rose']},
  {d:'EASY',q:'She ___ her teeth twice a day.',opts:['A. brushes','B. brush','C. brushing','D. brushed']},
  {d:'EASY',q:'They ___ in the park on Sundays.',opts:['A. run','B. runs','C. running','D. ran']},
  {d:'MEDIUM',q:'Water ___ at 100°C.',opts:['A. boils','B. boil','C. boiling','D. boiled']},
  {d:'MEDIUM',q:'The Earth ___ around the Sun.',opts:['A. revolves','B. revolve','C. revolving','D. revolved']},
  {d:'MEDIUM',q:'He ___ the newspaper every morning.',opts:['A. reads','B. read','C. reading','D. readed']},
  {d:'MEDIUM',q:'My sister ___ piano very well.',opts:['A. plays','B. play','C. playing','D. played']},
  {d:'MEDIUM',q:'Cats ___ fish.',opts:['A. love','B. loves','C. loving','D. loved']},
  {d:'HARD',q:'The library ___ at 8 a.m. every day.',opts:['A. opens','B. open','C. opening','D. opened']},
  {d:'HARD',q:'My parents ___ tea after dinner.',opts:['A. drink','B. drinks','C. drinking','D. drank']},
  {d:'HARD',q:'The teacher always ___ her students.',opts:['A. encourages','B. encourage','C. encouraging','D. encouraged']},
  // Simple Present - negative (25)
  {d:'EASY',q:'I ___ like vegetables.',opts:['A. don\'t','B. doesn\'t','C. am not','D. isn\'t']},
  {d:'EASY',q:'She ___ eat meat.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  {d:'EASY',q:'We ___ go to school on Sundays.',opts:['A. don\'t','B. doesn\'t','C. aren\'t','D. isn\'t']},
  {d:'MEDIUM',q:'He ___ speak French.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  {d:'MEDIUM',q:'They ___ live in the city.',opts:['A. don\'t','B. doesn\'t','C. isn\'t','D. aren\'t']},
  {d:'HARD',q:'My cat ___ like water.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  // Simple Present - questions (25)
  {d:'EASY',q:'___ you like pizza?',opts:['A. Do','B. Does','C. Are','D. Is']},
  {d:'EASY',q:'___ she live near your school?',opts:['A. Does','B. Do','C. Is','D. Are']},
  {d:'EASY',q:'What time ___ you wake up?',opts:['A. do','B. does','C. are','D. is']},
  {d:'MEDIUM',q:'Where ___ your father work?',opts:['A. does','B. do','C. is','D. are']},
  {d:'MEDIUM',q:'How often ___ they exercise?',opts:['A. do','B. does','C. are','D. is']},
  {d:'HARD',q:'What language ___ people speak in Japan?',opts:['A. do','B. does','C. are','D. is']},
  // Present Continuous - affirmative (40)
  {d:'EASY',q:'I ___ a book right now.',opts:['A. am reading','B. read','C. reads','D. is reading']},
  {d:'EASY',q:'She ___ in the garden.',opts:['A. is playing','B. plays','C. play','D. are playing']},
  {d:'EASY',q:'They ___ football now.',opts:['A. are playing','B. plays','C. play','D. is playing']},
  {d:'EASY',q:'He ___ to music at the moment.',opts:['A. is listening','B. listens','C. listen','D. are listening']},
  {d:'EASY',q:'We ___ for the bus.',opts:['A. are waiting','B. wait','C. waits','D. is waiting']},
  {d:'MEDIUM',q:'Look! The dog ___ in the river.',opts:['A. is swimming','B. swims','C. swim','D. are swimming']},
  {d:'MEDIUM',q:'My mother ___ dinner in the kitchen.',opts:['A. is cooking','B. cooks','C. cook','D. are cooking']},
  {d:'MEDIUM',q:'The children ___ on the playground.',opts:['A. are running','B. runs','C. run','D. is running']},
  {d:'HARD',q:'At this moment, the teacher ___ a lesson.',opts:['A. is explaining','B. explains','C. explain','D. are explaining']},
  {d:'HARD',q:'Right now, many students ___ for their exams.',opts:['A. are studying','B. study','C. studies','D. is studying']},
  // Present Continuous - negative (15)
  {d:'EASY',q:'I ___ now. I am watching TV.',opts:['A. am not studying','B. don\'t study','C. doesn\'t study','D. am not to study']},
  {d:'MEDIUM',q:'She ___ at the moment. She is reading.',opts:['A. isn\'t sleeping','B. doesn\'t sleep','C. don\'t sleep','D. aren\'t sleeping']},
  {d:'HARD',q:'They ___ at the moment. They are working.',opts:['A. aren\'t playing','B. don\'t play','C. doesn\'t play','D. isn\'t playing']},
  // Present Continuous - questions (15)
  {d:'EASY',q:'___ you doing your homework?',opts:['A. Are','B. Do','C. Is','D. Does']},
  {d:'EASY',q:'What ___ she doing right now?',opts:['A. is','B. does','C. do','D. are']},
  {d:'MEDIUM',q:'___ they watching TV?',opts:['A. Are','B. Do','C. Is','D. Does']},
  {d:'MEDIUM',q:'Where ___ he going?',opts:['A. is','B. does','C. do','D. are']},
  {d:'HARD',q:'Why ___ you crying?',opts:['A. are','B. do','C. does','D. is']},
  // Distinguishing Simple Present vs Present Continuous (40)
  {d:'EASY',q:'I ___ English every day. (habit)',opts:['A. study','B. am studying','C. studies','D. is studying']},
  {d:'EASY',q:'Be quiet! The baby ___ now.',opts:['A. is sleeping','B. sleeps','C. sleep','D. are sleeping']},
  {d:'EASY',q:'She ___ to school on foot every day.',opts:['A. walks','B. is walking','C. are walking','D. walk']},
  {d:'EASY',q:'Look! He ___ a picture.',opts:['A. is drawing','B. draws','C. draw','D. are drawing']},
  {d:'MEDIUM',q:'Water ___ when it reaches 0°C. (fact)',opts:['A. freezes','B. is freezing','C. are freezing','D. freeze']},
  {d:'MEDIUM',q:'They ___ in the kitchen right now.',opts:['A. are cooking','B. cook','C. cooks','D. is cooking']},
  {d:'MEDIUM',q:'My dad usually ___ the car on Saturdays.',opts:['A. washes','B. is washing','C. are washing','D. wash']},
  {d:'MEDIUM',q:'Shhh! Dad ___ a nap.',opts:['A. is taking','B. takes','C. take','D. are taking']},
  {d:'HARD',q:'She usually ___ coffee but today she ___ tea.',opts:['A. drinks / is drinking','B. is drinking / drinks','C. drink / is drinking','D. drinks / drinks']},
  {d:'HARD',q:'The children ___ games at school. Right now, they ___ homework.',opts:['A. play / are doing','B. are playing / do','C. plays / does','D. play / is doing']},
  {d:'EASY',q:'I always ___ my teeth before bed.',opts:['A. brush','B. am brushing','C. is brushing','D. are brushing']},
  {d:'EASY',q:'Shh! He ___ on the phone right now.',opts:['A. is talking','B. talks','C. talk','D. are talking']},
  {d:'MEDIUM',q:'The sun ___ every day. (fact)',opts:['A. shines','B. is shining','C. shine','D. are shining']},
  {d:'MEDIUM',q:'Don\'t disturb her! She ___ a letter.',opts:['A. is writing','B. writes','C. write','D. are writing']},
  {d:'HARD',q:'This soup ___ delicious! I can\'t stop eating. (state verb)',opts:['A. tastes','B. is tasting','C. taste','D. are tasting']},
  // Time expressions (20)
  {d:'EASY',q:'I play football ___ Tuesdays and Thursdays.',opts:['A. on','B. in','C. at','D. for']},
  {d:'EASY',q:'She studies every ___.',opts:['A. day','B. days','C. daying','D. a day']},
  {d:'EASY',q:'Look! The cat ___ sleeping right now.',opts:['A. is','B. are','C. do','D. does']},
  {d:'MEDIUM',q:'We always have dinner ___ 6 p.m.',opts:['A. at','B. on','C. in','D. for']},
  {d:'MEDIUM',q:'She ___ to the gym three times a week.',opts:['A. goes','B. is going','C. are going','D. go']},
  {d:'HARD',q:'At this moment, the students ___ their assignment.',opts:['A. are completing','B. complete','C. completes','D. is completing']},
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
