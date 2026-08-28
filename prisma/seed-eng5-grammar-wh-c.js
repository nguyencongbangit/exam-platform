const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1od3000xloc7wfo93r2x';
const QUESTIONS = [
  {d:'EASY',q:'___ did you wake up this morning? At 6 o\'clock.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'EASY',q:'___ is your father? He is a teacher.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'EASY',q:'___ did you put my phone? I put it on the table.',opts:['A. Where','B. When','C. Who','D. What']},
  {d:'EASY',q:'___ do you drink in the morning? I drink milk.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ is she sad? Because she lost her dog.',opts:['A. Why','B. When','C. Where','D. Who']},
  {d:'EASY',q:'___ did you finish your homework? An hour ago.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'EASY',q:'___ does she look like? She is tall with long black hair.',opts:['A. What','B. Who','C. How','D. Where']},
  {d:'EASY',q:'___ can I contact you? You can call me on this number.',opts:['A. How','B. What','C. Who','D. Where']},
  {d:'MEDIUM',q:'___ subject are you weakest at? I am weakest at maths.',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'MEDIUM',q:'___ do you prefer, tea or coffee?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'MEDIUM',q:'___ do they practise volleyball? Three times a week.',opts:['A. How often','B. How much','C. What much','D. Which times']},
  {d:'MEDIUM',q:'___ is the distance from here to the station?',opts:['A. How far','B. How long','C. What far','D. Which far']},
  {d:'HARD',q:'___ did she manage to solve the problem? By thinking creatively.',opts:['A. How','B. Why','C. What','D. Who']},
  {d:'HARD',q:'___ did this tradition begin? Nobody knows exactly.',opts:['A. When','B. Where','C. Why','D. Who']},
  {d:'EASY',q:'Choose the correct Wh- question: The answer is "I go to school by bus."',opts:['A. How do you go to school?','B. Where do you go to school?','C. What do you go to school?','D. Who do you go to school?']},
  {d:'EASY',q:'Choose the correct Wh- question: The answer is "My teacher\'s name is Ms Lan."',opts:['A. What is your teacher\'s name?','B. Who is your teacher\'s name?','C. Where is your teacher\'s name?','D. When is your teacher\'s name?']},
  {d:'MEDIUM',q:'Choose the correct Wh- question: The answer is "I have two sisters."',opts:['A. How many sisters do you have?','B. How much sisters do you have?','C. What sisters do you have?','D. Which sisters do you have?']},
  {d:'MEDIUM',q:'Choose the correct Wh- question: The answer is "She went to the cinema."',opts:['A. Where did she go?','B. When did she go?','C. Who did she go?','D. What did she go?']},
  {d:'HARD',q:'Choose the correct Wh- question: The answer is "He became a pilot because he loved flying."',opts:['A. Why did he become a pilot?','B. How did he become a pilot?','C. What did he become?','D. When did he become a pilot?']},
  {d:'EASY',q:'A: ___ is this? B: It\'s a telescope.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'A: ___ is standing by the door? B: That\'s my brother.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'A: ___ did you eat for dinner? B: I had rice and vegetables.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'A: ___ are you going tomorrow? B: I\'m going to visit my aunt.',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'HARD',q:'A: ___ does she spend her free time? B: She usually reads books.',opts:['A. How','B. What','C. Why','D. Where']},
  {d:'EASY',q:'___ old are you? I am 10.',opts:['A. How','B. What','C. Who','D. Which']},
  {d:'EASY',q:'___ tall is the building? About 50 metres.',opts:['A. How','B. What','C. Who','D. Which']},
  {d:'MEDIUM',q:'___ long is the film? It is two hours long.',opts:['A. How','B. What','C. Who','D. Which']},
  {d:'MEDIUM',q:'___ often do you play the piano?',opts:['A. How','B. What','C. Who','D. Which']},
  {d:'HARD',q:'___ many times have you been to Da Lat?',opts:['A. How','B. What','C. Who','D. Which']},
  {d:'EASY',q:'___ is your favourite teacher? Mr Long is my favourite.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'___ is the most popular sport in Vietnam? Football is.',opts:['A. What','B. Who','C. Which','D. Where']},
  {d:'HARD',q:'___ of the applicants was chosen for the position?',opts:['A. Which','B. What','C. Who','D. Whose']},
  {d:'EASY',q:'___ are your shoes? They are under the bed.',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'___ was the weather like during your trip?',opts:['A. What','B. How','C. Who','D. Where']},
  {d:'HARD',q:'___ aspects of the culture surprised you most?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'Answer: She is 12. Question: ___ is she?',opts:['A. How old','B. What age','C. Who old','D. Which age']},
  {d:'MEDIUM',q:'Answer: He studied for two hours. Question: ___ long did he study?',opts:['A. How','B. What','C. When','D. Where']},
  {d:'HARD',q:'Answer: She prefers the blue one. Question: ___ one does she prefer?',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'EASY',q:'We use "___ many" to ask about ___.',opts:['A. countable nouns','B. uncountable nouns','C. adjectives','D. verbs']},
  {d:'MEDIUM',q:'We use "___ much" to ask about ___.',opts:['A. uncountable nouns','B. countable nouns','C. adjectives','D. verbs']},
  {d:'HARD',q:'"___ does she look like?" asks about ___.',opts:['A. physical appearance','B. personality','C. occupation','D. hobbies']},
  {d:'EASY',q:'A: ___ is your phone? B: It\'s on the desk.',opts:['A. Where','B. When','C. What','D. Who']},
  {d:'MEDIUM',q:'A: ___ did they build the school? B: In 1980.',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'HARD',q:'A: ___ did she win the award? B: Because of her outstanding research.',opts:['A. Why','B. How','C. What','D. When']},
  {d:'EASY',q:'___ is her name? Her name is Lan.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'___ does the journey take? About three hours.',opts:['A. How long','B. How far','C. How much','D. How many']},
  {d:'HARD',q:'___ did they decide to do it that way? Because it was the most efficient.',opts:['A. Why','B. How','C. When','D. Where']},
  {d:'EASY',q:'___ does he play? He plays basketball.',opts:['A. What sport','B. Which sport','C. Whose sport','D. Who sport']},
  {d:'MEDIUM',q:'___ is she angry? Because she lost her wallet.',opts:['A. Why','B. What','C. When','D. How']},
  {d:'HARD',q:'___ countries does the Mekong River flow through?',opts:['A. How many','B. How much','C. Which many','D. What many']},
  {d:'EASY',q:'___ is the girl next to you? She is my cousin.',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'___ did you come back from your holiday? Last Sunday.',opts:['A. When','B. Where','C. Who','D. What']},
  {d:'HARD',q:'___ are you going to do with the prize money?',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'EASY',q:'___ do you usually read? I read novels and science books.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'___ big is your school? About 500 students.',opts:['A. How','B. What','C. Which','D. Who']},
  {d:'HARD',q:'___ programme are you watching? I\'m watching a documentary.',opts:['A. What','B. Which','C. Whose','D. Who']},
  {d:'EASY',q:'___ are you from? I\'m from Vietnam.',opts:['A. Where','B. Who','C. What','D. When']},
  {d:'MEDIUM',q:'___ pets do you have at home?',opts:['A. What','B. Which','C. Who','D. Whose']},
  {d:'HARD',q:'___ is it from the airport to the city centre? About 30 kilometres.',opts:['A. How far','B. How long','C. How much','D. How many']},
  {d:'EASY',q:'___ is the date today?',opts:['A. What','B. When','C. Where','D. Who']},
  {d:'MEDIUM',q:'___ floor is the library on? It\'s on the third floor.',opts:['A. Which','B. What','C. Whose','D. Who']},
  {d:'HARD',q:'___ were you doing when the earthquake struck?',opts:['A. What','B. Who','C. Where','D. When']},
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
