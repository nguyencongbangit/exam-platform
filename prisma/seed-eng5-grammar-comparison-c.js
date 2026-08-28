const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocz000vloc7zlfg405i';
const QUESTIONS = [
  {d:'EASY',q:'A car is ___ than a bicycle. (fast)',opts:['A. faster','B. more fast','C. fastest','D. fast']},
  {d:'EASY',q:'She is ___ than her twin. (quiet)',opts:['A. quieter','B. more quiet','C. quietest','D. quiet']},
  {d:'EASY',q:'He is ___ than last year. (tall)',opts:['A. taller','B. more tall','C. tallest','D. tall']},
  {d:'EASY',q:'This book is ___ than that one. (long)',opts:['A. longer','B. more long','C. longest','D. long']},
  {d:'MEDIUM',q:'Her handwriting is ___ than mine. (neat)',opts:['A. neater','B. more neat','C. neatest','D. neat']},
  {d:'MEDIUM',q:'This coffee is ___ than the last one. (strong)',opts:['A. stronger','B. more strong','C. strongest','D. strong']},
  {d:'HARD',q:'He became ___ as he grew older. (wise)',opts:['A. wiser','B. more wise','C. wisest','D. wise']},
  {d:'EASY',q:'This phone is ___ than my old one. (modern)',opts:['A. more modern','B. moderner','C. most modern','D. modern']},
  {d:'MEDIUM',q:'This problem is ___ than I thought. (complex)',opts:['A. more complex','B. complexer','C. most complex','D. complex']},
  {d:'HARD',q:'She is ___ than her colleagues at her job. (dedicated)',opts:['A. more dedicated','B. dedicateder','C. most dedicated','D. dedicated']},
  {d:'EASY',q:'This is ___ day of the year. (cold — superlative)',opts:['A. the coldest','B. colder','C. coldest','D. most cold']},
  {d:'MEDIUM',q:'He is ___ athlete in the school. (talented — superlative)',opts:['A. the most talented','B. more talented','C. most talented','D. talented']},
  {d:'HARD',q:'She is ___ chef I\'ve ever seen. (creative — superlative)',opts:['A. the most creative','B. more creative','C. creativest','D. the creativest']},
  {d:'EASY',q:'The cheetah is ___ land animal. (fast — superlative)',opts:['A. the fastest','B. faster','C. fastest','D. most fast']},
  {d:'MEDIUM',q:'This is ___ question on the test. (difficult — superlative)',opts:['A. the most difficult','B. more difficult','C. difficultest','D. the more difficult']},
  {d:'EASY',q:'He is ___ his brother. (as tall as)',opts:['A. as tall as','B. taller than','C. the tallest of','D. most tall as']},
  {d:'MEDIUM',q:'She is not ___ fast ___ him.',opts:['A. as / as','B. more / than','C. less / as','D. as / than']},
  {d:'HARD',q:'This year\'s festival was ___ last year\'s.',opts:['A. as exciting as','B. more exciting than','C. the most exciting of','D. both A and B are possible']},
  {d:'EASY',q:'She is ___ kind ___ her sister.',opts:['A. as / as','B. more / than','C. most / of','D. as / than']},
  {d:'MEDIUM',q:'He is not ___ clever ___ she seems.',opts:['A. as / as','B. more / than','C. as / than','D. so / than']},
  {d:'EASY',q:'Which is the comparative of "good"?',opts:['A. better','B. best','C. gooder','D. more good']},
  {d:'EASY',q:'Which is the superlative of "bad"?',opts:['A. the worst','B. the worse','C. the baddest','D. most bad']},
  {d:'MEDIUM',q:'Which is the comparative of "far"?',opts:['A. farther / further','B. most far','C. farest','D. far more']},
  {d:'MEDIUM',q:'Which is the superlative of "many"?',opts:['A. the most','B. the more','C. most much','D. the many']},
  {d:'HARD',q:'Which is the comparative of "little" (amount)?',opts:['A. less','B. fewer','C. lesser','D. littler']},
  {d:'EASY',q:'A: Who is taller, Tom or Tim? B: Tom is ___.',opts:['A. taller','B. tallest','C. more tall','D. the tallest']},
  {d:'MEDIUM',q:'A: Which is the longest river? B: The Nile is the ___ river in Africa.',opts:['A. longest','B. longer','C. most long','D. long']},
  {d:'HARD',q:'A: Are you a better swimmer than your brother? B: No, he is ___ than me.',opts:['A. better','B. best','C. gooder','D. more good']},
  {d:'EASY',q:'Read: "An elephant is heavier than a horse. A horse is heavier than a dog." Which animal is heaviest?',opts:['A. elephant','B. horse','C. dog','D. All are the same.']},
  {d:'MEDIUM',q:'Read: "Paris is more expensive than Lyon. London is the most expensive city in Europe." Which city is the most expensive?',opts:['A. London','B. Paris','C. Lyon','D. All are the same.']},
  {d:'HARD',q:'Read: "Alice scored 95%, Bob scored 90%, and Carol scored 85%." Who got the highest mark?',opts:['A. Alice','B. Bob','C. Carol','D. They got the same mark.']},
  {d:'EASY',q:'He is ___ than his older brother at cooking.',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'MEDIUM',q:'This year\'s exam was ___ than last year\'s.',opts:['A. more difficult','B. difficulter','C. difficult','D. most difficult']},
  {d:'HARD',q:'She is ___ student in her entire university.',opts:['A. the most hardworking','B. more hardworking','C. hardworkinger','D. hardworkingest']},
  {d:'EASY',q:'My school is ___ than yours. (old)',opts:['A. older','B. more old','C. oldest','D. old']},
  {d:'MEDIUM',q:'This is ___ restaurant in the city. (good)',opts:['A. the best','B. the better','C. most good','D. the goodest']},
  {d:'HARD',q:'She spoke ___ than anyone at the conference. (clear)',opts:['A. most clearly','B. more clearly','C. clearlier','D. the clearest']},
  {d:'EASY',q:'A tiger is ___ than a cat. (dangerous)',opts:['A. more dangerous','B. dangerouser','C. most dangerous','D. dangerous']},
  {d:'MEDIUM',q:'This is ___ experiment in the textbook. (complex)',opts:['A. the most complex','B. more complex','C. complexest','D. the more complex']},
  {d:'HARD',q:'He gave ___ speech of the evening. (memorable)',opts:['A. the most memorable','B. more memorable','C. memorablest','D. the memorablest']},
  {d:'EASY',q:'She is ___ player in the team.',opts:['A. the best','B. better','C. the better','D. most good']},
  {d:'MEDIUM',q:'This journey was ___ I expected. (long)',opts:['A. longer than','B. longest than','C. the longest than','D. more long than']},
  {d:'HARD',q:'He performed ___ of all the contestants. (well)',opts:['A. the best','B. the better','C. most well','D. better']},
  {d:'EASY',q:'Gold is ___ than iron. (heavy)',opts:['A. heavier','B. more heavy','C. heaviest','D. heavy']},
  {d:'MEDIUM',q:'This is ___ city I have ever visited. (beautiful)',opts:['A. the most beautiful','B. more beautiful','C. beautifulest','D. beautyful']},
  {d:'HARD',q:'She is becoming ___ at her job every month. (confident)',opts:['A. more confident','B. confidenter','C. most confident','D. the most confident']},
  {d:'EASY',q:'He is ___ his twin brother. (as smart as)',opts:['A. as smart as','B. smarter than','C. smartest of','D. most smart as']},
  {d:'MEDIUM',q:'This problem is not ___ complex ___ the last one.',opts:['A. as / as','B. more / than','C. as / than','D. so / as']},
  {d:'HARD',q:'The results were ___ we hoped for. (good)',opts:['A. better than','B. best than','C. more good than','D. gooder than']},
  {d:'EASY',q:'Mount Everest is ___ mountain in the world. (high)',opts:['A. the highest','B. higher','C. most high','D. high']},
  {d:'MEDIUM',q:'The blue whale is ___ animal on Earth. (large)',opts:['A. the largest','B. larger','C. most large','D. large']},
  {d:'HARD',q:'She sang ___ of all the performers. (well)',opts:['A. the best','B. better','C. most well','D. good']},
  {d:'EASY',q:'He is ___ his father. (as tall as)',opts:['A. as tall as','B. taller than','C. tallest of','D. more tall than']},
  {d:'MEDIUM',q:'This year\'s exams were ___ last year\'s. (difficult)',opts:['A. harder than','B. hardest than','C. more harder than','D. as hard as']},
  {d:'HARD',q:'She is ___ all the other students in science. (knowledgeable)',opts:['A. the most knowledgeable of','B. more knowledgeable than','C. knowledgeablest of','D. both A and B']},
  {d:'EASY',q:'Summer is ___ season. (hot — superlative)',opts:['A. the hottest','B. hotter','C. hottest','D. the most hot']},
  {d:'MEDIUM',q:'She is ___ singer in the competition. (talented — superlative)',opts:['A. the most talented','B. more talented','C. talentedest','D. most talented']},
  {d:'HARD',q:'He gave ___ performance of his career. (spectacular — superlative)',opts:['A. the most spectacular','B. more spectacular','C. the spectacularest','D. most spectacular']},
  {d:'EASY',q:'My cat is ___ than my friend\'s cat. (cute)',opts:['A. cuter','B. more cute','C. cutest','D. cute']},
  {d:'MEDIUM',q:'This path is ___ than the other one. (short)',opts:['A. shorter','B. more short','C. shortest','D. short']},
  {d:'HARD',q:'She is ___ person I have ever met. (inspiring)',opts:['A. the most inspiring','B. more inspiring','C. inspiringest','D. the inspiringest']},
  {d:'EASY',q:'His new car is ___ than his old one. (comfortable)',opts:['A. more comfortable','B. comfortabler','C. most comfortable','D. comfortable']},
  {d:'MEDIUM',q:'This is ___ hotel in the city. (luxurious)',opts:['A. the most luxurious','B. more luxurious','C. luxuriousest','D. most luxurious']},
  {d:'HARD',q:'He became ___ and ___ skilled with every practice session.',opts:['A. more / more','B. most / most','C. better / better','D. more / better']},
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
  console.log(`📌 Grammar - So sánh: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
