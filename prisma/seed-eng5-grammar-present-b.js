const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocn000ploc723hvincf';
const QUESTIONS = [
  {d:'EASY',q:'My mother ___ up at 5 every morning.',opts:['A. gets','B. get','C. getting','D. got']},
  {d:'EASY',q:'The cat ___ on the sofa right now.',opts:['A. is sitting','B. sits','C. sit','D. are sitting']},
  {d:'EASY',q:'We ___ soccer in the playground every day.',opts:['A. play','B. plays','C. is playing','D. are plays']},
  {d:'EASY',q:'Hurry! The bus ___!',opts:['A. is coming','B. comes','C. come','D. are coming']},
  {d:'EASY',q:'She always ___ her homework before dinner.',opts:['A. does','B. do','C. is doing','D. are doing']},
  {d:'EASY',q:'I ___ TV every evening.',opts:['A. watch','B. watches','C. am watching','D. is watching']},
  {d:'EASY',q:'Look! They ___ in the river!',opts:['A. are swimming','B. swim','C. swims','D. is swimming']},
  {d:'EASY',q:'He usually ___ to school by bike.',opts:['A. rides','B. ride','C. is riding','D. are riding']},
  {d:'MEDIUM',q:'She ___ a book at the moment, so please be quiet.',opts:['A. is reading','B. reads','C. read','D. are reading']},
  {d:'MEDIUM',q:'Dogs ___ with their tails when they are happy.',opts:['A. wag','B. wags','C. is wagging','D. are wags']},
  {d:'MEDIUM',q:'The teacher ___ the board right now.',opts:['A. is cleaning','B. cleans','C. clean','D. are cleaning']},
  {d:'MEDIUM',q:'My brother ___ video games every night.',opts:['A. plays','B. play','C. is playing','D. are playing']},
  {d:'MEDIUM',q:'Shhh! The baby ___ on the bed.',opts:['A. is sleeping','B. sleep','C. sleeps','D. are sleeping']},
  {d:'MEDIUM',q:'She ___ three languages: English, French, and Vietnamese.',opts:['A. speaks','B. speak','C. is speaking','D. are speaking']},
  {d:'HARD',q:'Right now, they ___ their dinner and watching the news.',opts:['A. are eating','B. eat','C. eats','D. is eating']},
  {d:'HARD',q:'The sun ___ in the west. (general fact)',opts:['A. sets','B. is setting','C. set','D. are setting']},
  {d:'EASY',q:'I ___ to music now.',opts:['A. am listening','B. listen','C. listens','D. are listening']},
  {d:'EASY',q:'He ___ coffee every morning.',opts:['A. drinks','B. drink','C. is drinking','D. are drinking']},
  {d:'MEDIUM',q:'Which sentence uses Simple Present correctly?',opts:['A. She goes to school every day.','B. She is go to school every day.','C. She going to school every day.','D. She go school every day.']},
  {d:'MEDIUM',q:'Which sentence uses Present Continuous correctly?',opts:['A. He is playing football now.','B. He plays football now.','C. He play football now.','D. He playing football now.']},
  {d:'EASY',q:'We ___ dinner at 6 p.m. every day.',opts:['A. have','B. has','C. is having','D. are has']},
  {d:'EASY',q:'The children ___ in the park right now.',opts:['A. are playing','B. play','C. plays','D. is playing']},
  {d:'MEDIUM',q:'She never ___ late to school.',opts:['A. comes','B. come','C. is coming','D. are coming']},
  {d:'MEDIUM',q:'They ___ a meeting in the conference room at the moment.',opts:['A. are having','B. have','C. has','D. is having']},
  {d:'HARD',q:'I understand what you ___ saying.',opts:['A. are','B. is','C. do','D. am']},
  {d:'EASY',q:'He ___ his homework right now.',opts:['A. is doing','B. does','C. do','D. are doing']},
  {d:'MEDIUM',q:'The baby ___ because she is hungry.',opts:['A. is crying','B. cries','C. cry','D. are crying']},
  {d:'HARD',q:'At 8 every morning, the school bell ___ and students go inside.',opts:['A. rings','B. is ringing','C. ring','D. are ringing']},
  {d:'EASY',q:'___ she sleep late on weekends?',opts:['A. Does','B. Do','C. Is','D. Are']},
  {d:'MEDIUM',q:'___ they playing basketball now?',opts:['A. Are','B. Do','C. Is','D. Does']},
  {d:'EASY',q:'I ___ understand this question.',opts:['A. don\'t','B. am not','C. doesn\'t','D. isn\'t']},
  {d:'MEDIUM',q:'He ___ watching TV at the moment.',opts:['A. isn\'t','B. doesn\'t','C. don\'t','D. aren\'t']},
  {d:'EASY',q:'What ___ you doing right now?',opts:['A. are','B. do','C. does','D. is']},
  {d:'MEDIUM',q:'How often ___ she visit her grandparents?',opts:['A. does','B. do','C. is','D. are']},
  {d:'HARD',q:'Where ___ they going at this moment?',opts:['A. are','B. do','C. does','D. is']},
  {d:'EASY',q:'Which time expression goes with Simple Present?',opts:['A. every day','B. now','C. at the moment','D. right now']},
  {d:'EASY',q:'Which time expression goes with Present Continuous?',opts:['A. right now','B. always','C. usually','D. every week']},
  {d:'MEDIUM',q:'Which time expression goes with Present Continuous?',opts:['A. at the moment','B. often','C. never','D. twice a week']},
  {d:'MEDIUM',q:'Which time expression goes with Simple Present?',opts:['A. twice a week','B. now','C. look!','D. at this moment']},
  {d:'HARD',q:'He ___ (read) a book while she ___ (cook).',opts:['A. is reading / is cooking','B. reads / cooks','C. is reading / cooks','D. reads / is cooking']},
  {d:'EASY',q:'I am a student. I ___ at Primary School.',opts:['A. study','B. studies','C. am studying','D. is studying']},
  {d:'MEDIUM',q:'What ___ (you / do) every Sunday morning?',opts:['A. do you do','B. are you doing','C. does you do','D. is you doing']},
  {d:'HARD',q:'What ___ (you / do) right now?',opts:['A. are you doing','B. do you do','C. does you do','D. is you doing']},
  {d:'EASY',q:'Fish ___ in water.',opts:['A. live','B. lives','C. is living','D. are lives']},
  {d:'MEDIUM',q:'My sister ___ her hair in the bathroom at the moment.',opts:['A. is washing','B. washes','C. wash','D. are washing']},
  {d:'HARD',q:'The dog ___ a lot. (general habit)',opts:['A. barks','B. is barking','C. bark','D. are barking']},
  {d:'EASY',q:'She ___ well. (general fact)',opts:['A. sings','B. is singing','C. sing','D. are singing']},
  {d:'MEDIUM',q:'Listen! She ___ a beautiful song!',opts:['A. is singing','B. sings','C. sing','D. sang']},
  {d:'EASY',q:'My friends always ___ me with my homework.',opts:['A. help','B. helps','C. is helping','D. are helps']},
  {d:'HARD',q:'Right now, the teacher ___ the class while the students ___.',opts:['A. is teaching / are listening','B. teaches / listen','C. is teaching / listen','D. teaches / are listening']},
  {d:'EASY',q:'We go to the beach ___ summer.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'She is talking on the phone ___.',opts:['A. right now','B. every day','C. always','D. usually']},
  {d:'MEDIUM',q:'I ___ tired. Can we stop?',opts:['A. am getting','B. get','C. gets','D. are getting']},
  {d:'HARD',q:'The situation ___ worse every year. (trend)',opts:['A. is getting','B. get','C. gets','D. got']},
  {d:'EASY',q:'My father ___ the car in the garage.',opts:['A. is fixing','B. fix','C. fixed','D. are fixing']},
  {d:'MEDIUM',q:'The students ___ a test right now, so please be quiet.',opts:['A. are taking','B. take','C. takes','D. is taking']},
  {d:'HARD',q:'While I ___, my brother ___ TV.',opts:['A. am studying / is watching','B. study / watches','C. am studying / watches','D. study / is watching']},
  {d:'EASY',q:'He ___ not like vegetables.',opts:['A. does','B. do','C. is','D. are']},
  {d:'MEDIUM',q:'She ___ not cooking dinner right now.',opts:['A. is','B. does','C. do','D. are']},
  {d:'EASY',q:'I ___ not understand this problem.',opts:['A. do','B. does','C. am','D. are']},
  {d:'MEDIUM',q:'They ___ not running in the corridor.',opts:['A. are','B. do','C. does','D. is']},
  {d:'HARD',q:'She ___ not usually eat breakfast, but today she ___.',opts:['A. does / is eating','B. is / eating','C. do / eats','D. does / eats']},
  {d:'EASY',q:'Every morning I wake up, ___,  and go to school.',opts:['A. have breakfast','B. having breakfast','C. am having breakfast','D. is having breakfast']},
  {d:'MEDIUM',q:'Look at her! She ___ so fast!',opts:['A. is running','B. run','C. runs','D. ran']},
  {d:'HARD',q:'At weekends, she ___ her grandparents, but this weekend she ___ her friend.',opts:['A. visits / is visiting','B. is visiting / visits','C. visit / visits','D. visits / visits']},
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
