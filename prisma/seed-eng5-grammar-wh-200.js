const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1od3000xloc7wfo93r2x';
const QUESTIONS = [
  // What (30)
  {d:'EASY',q:'___ is your name?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ is your favourite colour?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ do you do after school?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ time does the school start?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ is in the box?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'___ kind of music do you like?',opts:['A. What','B. Which','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ did you have for breakfast?',opts:['A. What','B. Who','C. When','D. Where']},
  {d:'MEDIUM',q:'___ is the capital of Vietnam?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'HARD',q:'___ are the main causes of climate change?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'HARD',q:'___ does "sustainability" mean?',opts:['A. What','B. Who','C. Where','D. When']},
  // Where (20)
  {d:'EASY',q:'___ do you live?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'EASY',q:'___ is the toilet?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'EASY',q:'___ are my keys?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'___ does she work?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'___ did they go on holiday?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'HARD',q:'___ is the nearest hospital?',opts:['A. Where','B. When','C. What','D. Who']},
  // When (20)
  {d:'EASY',q:'___ is your birthday?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'EASY',q:'___ does the film start?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'MEDIUM',q:'___ did she call you?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'MEDIUM',q:'___ is the next holiday?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'HARD',q:'___ did World War II end?',opts:['A. When','B. Where','C. What','D. Who']},
  // Who (20)
  {d:'EASY',q:'___ is that girl?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'___ is your best friend?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'___ taught you English?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'___ won the football match?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'HARD',q:'___ is responsible for the project?',opts:['A. Who','B. What','C. Where','D. When']},
  // Why (15)
  {d:'EASY',q:'___ are you late?',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'EASY',q:'___ do you like English?',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'MEDIUM',q:'___ did she cry? Because she was sad.',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'MEDIUM',q:'___ are you studying so hard?',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'HARD',q:'___ do plants need sunlight?',opts:['A. Why','B. When','C. Where','D. Who']},
  // How (20)
  {d:'EASY',q:'___ are you? — I\'m fine, thanks.',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'EASY',q:'___ do you go to school? By bus.',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'EASY',q:'___ many students are in your class?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ often do you exercise?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ long does the trip take?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'HARD',q:'___ far is it from Hanoi to Ho Chi Minh City?',opts:['A. How','B. What','C. Who','D. Where']},
  // Which (10)
  {d:'EASY',q:'___ book do you prefer, this one or that one?',opts:['A. Which','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ subject is the most difficult for you?',opts:['A. Which','B. What','C. Who','D. Where']},
  {d:'HARD',q:'___ of these two options is better?',opts:['A. Which','B. What','C. Who','D. Where']},
  // Whose (10)
  {d:'EASY',q:'___ bag is this?',opts:['A. Whose','B. Who','C. Which','D. What']},
  {d:'MEDIUM',q:'___ turn is it to play?',opts:['A. Whose','B. Who','C. Which','D. What']},
  {d:'HARD',q:'___ phone is ringing?',opts:['A. Whose','B. Who','C. Which','D. What']},
  // Choosing the right Wh- word (30)
  {d:'EASY',q:'A: ___ is she? B: She is my sister.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'A: ___ are you? B: I\'m in the garden.',opts:['A. Where','B. Who','C. When','D. What']},
  {d:'EASY',q:'A: ___ is your birthday? B: It\'s on the 5th of May.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'EASY',q:'A: ___ do you want? B: I want some water.',opts:['A. What','B. Who','C. When','D. Where']},
  {d:'MEDIUM',q:'A: ___ did you go last summer? B: We went to Da Lat.',opts:['A. Where','B. When','C. Who','D. Why']},
  {d:'MEDIUM',q:'A: ___ did you fail the test? B: Because I didn\'t study.',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'MEDIUM',q:'A: ___ does the train leave? B: At 6 o\'clock.',opts:['A. When','B. Where','C. Who','D. Why']},
  {d:'MEDIUM',q:'A: ___ tall is he? B: He\'s about 1.6 metres.',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'HARD',q:'A: ___ did she come here? B: By plane.',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'HARD',q:'A: ___ many siblings do you have? B: I have two.',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'EASY',q:'A: ___ is this jacket? B: It\'s mine.',opts:['A. Whose','B. Who','C. Which','D. What']},
  {d:'MEDIUM',q:'A: ___ one is yours? B: The red one.',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'HARD',q:'A: ___ are you interested in? B: I\'m interested in science.',opts:['A. What','B. Who','C. Where','D. When']},
  // Writing Wh- questions from answers (20)
  {d:'EASY',q:'Answer: I am ten years old. Question: ___ old are you?',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'EASY',q:'Answer: My mother is a nurse. Question: ___ does your mother do?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'Answer: I go to school by bike. Question: ___ do you go to school?',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'MEDIUM',q:'Answer: She lives in Hanoi. Question: ___ does she live?',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'HARD',q:'Answer: They went on holiday last July. Question: ___ did they go on holiday?',opts:['A. When','B. Where','C. Why','D. Who']},
  {d:'HARD',q:'Answer: He speaks three languages. Question: ___ many languages does he speak?',opts:['A. How','B. What','C. Which','D. Who']},
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
  console.log(`📌 Grammar - Câu hỏi Wh-: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
