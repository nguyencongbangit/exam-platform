const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1od3000xloc7wfo93r2x';
const QUESTIONS = [
  {d:'EASY',q:'___ sport do you like best?',opts:['A. What','B. Which','C. Who','D. Where']},
  {d:'EASY',q:'___ is sitting next to you?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'___ do you go to bed?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'EASY',q:'___ does she come from?',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'EASY',q:'___ did you buy?',opts:['A. What','B. Who','C. When','D. Where']},
  {d:'EASY',q:'___ helped you with your project?',opts:['A. Who','B. What','C. When','D. Where']},
  {d:'EASY',q:'___ do you feel?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'EASY',q:'___ much does this cost?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ language does she speak at home?',opts:['A. What','B. Which','C. Who','D. When']},
  {d:'MEDIUM',q:'___ days a week do you exercise?',opts:['A. How many','B. How much','C. What many','D. Which many']},
  {d:'MEDIUM',q:'___ does the train arrive?',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'MEDIUM',q:'___ is the tallest building in the world?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'HARD',q:'___ subject are you best at?',opts:['A. Which','B. What','C. Who','D. Where']},
  {d:'HARD',q:'___ did you decide to become a teacher?',opts:['A. Why','B. What','C. When','D. Where']},
  {d:'EASY',q:'A: ___ is she talking to? B: She\'s talking to her teacher.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'A: ___ is your school? B: It\'s on Nguyen Du Street.',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'MEDIUM',q:'A: ___ does the film end? B: At 9 o\'clock.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'MEDIUM',q:'A: ___ do you like summer? B: Because I love the beach.',opts:['A. Why','B. When','C. Where','D. What']},
  {d:'HARD',q:'A: ___ old is your grandmother? B: She is 72.',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'HARD',q:'A: ___ did you come to school today? B: By bicycle.',opts:['A. How','B. Why','C. When','D. Where']},
  {d:'EASY',q:'Answer: My teacher\'s name is Mr Long. Question: ___ is your teacher\'s name?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'Answer: We play in the park. Question: ___ do you play?',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'MEDIUM',q:'Answer: I exercise three times a week. Question: ___ often do you exercise?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'Answer: She is 12 years old. Question: ___ is she?',opts:['A. How old','B. What age','C. Which old','D. Who old']},
  {d:'HARD',q:'Answer: They arrived by train. Question: ___ did they arrive?',opts:['A. How','B. When','C. Where','D. Who']},
  {d:'EASY',q:'___ is your teacher? Mr Brown is my teacher.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'___ does class start? At 7:30.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'MEDIUM',q:'___ is the weather like today? It is sunny and warm.',opts:['A. What','B. How','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ are you studying English? To get a better job.',opts:['A. Why','B. What','C. When','D. Where']},
  {d:'HARD',q:'___ can she play the guitar so well? She practises every day.',opts:['A. How','B. Why','C. When','D. What']},
  {d:'EASY',q:'___ is she laughing?',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'EASY',q:'___ is the nearest supermarket?',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'___ long have you lived here?',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ did they meet? At a party last year.',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'HARD',q:'___ far is it from Hanoi to Hue?',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'EASY',q:'A: ___ does she do? B: She is a doctor.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'A: ___ will the show start? B: At 8 p.m.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'HARD',q:'A: ___ did they win the match? B: Because they trained hard.',opts:['A. Why','B. How','C. When','D. Where']},
  {d:'EASY',q:'___ bag is on the chair?',opts:['A. Whose','B. Who','C. Which','D. What']},
  {d:'MEDIUM',q:'___ book should I read first?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'HARD',q:'___ house is the biggest on this street?',opts:['A. Which','B. Whose','C. What','D. Who']},
  {d:'EASY',q:'Read: "Where does she work? She works in a hospital." What is the question word?',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'MEDIUM',q:'Read: "Why do you love music? Because it makes me happy." What is the question word?',opts:['A. Why','B. What','C. When','D. How']},
  {d:'HARD',q:'Read: "How many people came to the event? About 500 people came." What is the correct question word?',opts:['A. How many','B. How much','C. What many','D. Which many']},
  {d:'EASY',q:'___ classroom is this? It\'s Class 5A.',opts:['A. Whose','B. Which','C. Who','D. What']},
  {d:'MEDIUM',q:'___ planet is the largest in our solar system?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'HARD',q:'___ of these cities is the most populated?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'Answer: He is at the library. Question: ___ is he?',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'MEDIUM',q:'Answer: She studied because she wanted to pass the exam. Question: ___ did she study?',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'HARD',q:'Answer: They completed it in two hours. Question: ___ long did it take?',opts:['A. How','B. What','C. When','D. Where']},
  {d:'EASY',q:'___ colour is the sky?',opts:['A. What','B. Which','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ direction is north?',opts:['A. Which','B. What','C. Where','D. Who']},
  {d:'HARD',q:'___ of these two solutions would you recommend?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'___ helped you clean the house?',opts:['A. Who','B. What','C. When','D. Where']},
  {d:'MEDIUM',q:'___ is she angry about?',opts:['A. What','B. Who','C. Why','D. How']},
  {d:'HARD',q:'___ do you usually do on Friday evenings?',opts:['A. What','B. Who','C. When','D. Where']},
  {d:'EASY',q:'A: ___ is your best friend? B: Her name is Linh.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'A: ___ are you going this weekend? B: I\'m going to the cinema.',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'HARD',q:'A: ___ subject do you enjoy the most? B: I enjoy science the most.',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'___ season is this? It is summer.',opts:['A. What','B. Which','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ do you usually do when you feel stressed?',opts:['A. What','B. Who','C. When','D. Where']},
  {d:'HARD',q:'___ countries have you visited?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'___ is your phone number?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'___ did she go to university? In 2018.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'HARD',q:'___ motivated her to become a scientist?',opts:['A. What','B. Who','C. Why','D. Where']},
  {d:'EASY',q:'___ is the post office? It\'s on Le Loi Street.',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'___ does the library close? At 9 p.m.',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'HARD',q:'___ is the purpose of this exercise?',opts:['A. What','B. Who','C. Where','D. When']},
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
