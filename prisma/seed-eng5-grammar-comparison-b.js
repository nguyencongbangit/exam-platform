const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocz000vloc7zlfg405i';
const QUESTIONS = [
  {d:'EASY',q:'An elephant is ___ than a mouse. (big)',opts:['A. bigger','B. more big','C. biggest','D. big']},
  {d:'EASY',q:'Summer is ___ than winter. (hot)',opts:['A. hotter','B. more hot','C. hottest','D. hot']},
  {d:'EASY',q:'This test is ___ than yesterday\'s. (hard)',opts:['A. harder','B. more hard','C. hardest','D. hard']},
  {d:'EASY',q:'A bike is ___ than a car. (cheap)',opts:['A. cheaper','B. more cheap','C. cheapest','D. cheap']},
  {d:'EASY',q:'The blue bag is ___ than the red one. (heavy)',opts:['A. heavier','B. more heavy','C. heaviest','D. heavy']},
  {d:'EASY',q:'She runs ___ than her classmates. (fast)',opts:['A. faster','B. more fast','C. fastest','D. fast']},
  {d:'EASY',q:'He is ___ than his brother. (young)',opts:['A. younger','B. more young','C. youngest','D. young']},
  {d:'EASY',q:'The cat is ___ than the dog. (quiet)',opts:['A. quieter','B. more quiet','C. quietest','D. quiet']},
  {d:'MEDIUM',q:'This road is ___ than that one. (narrow)',opts:['A. narrower','B. more narrow','C. narrowest','D. narrow']},
  {d:'MEDIUM',q:'The mango is ___ than the lemon. (sweet)',opts:['A. sweeter','B. more sweet','C. sweetest','D. sweet']},
  {d:'MEDIUM',q:'His new phone is ___ than his old one. (thin)',opts:['A. thinner','B. more thin','C. thinnest','D. thin']},
  {d:'HARD',q:'The situation is now ___ than it was before. (bad)',opts:['A. worse','B. badder','C. more bad','D. worst']},
  {d:'HARD',q:'She feels ___ today than yesterday. (good)',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'EASY',q:'This jacket is ___ than that one. (expensive)',opts:['A. more expensive','B. expensiver','C. most expensive','D. expensive']},
  {d:'EASY',q:'English is ___ than maths for me. (interesting)',opts:['A. more interesting','B. interestinger','C. most interesting','D. interesting']},
  {d:'MEDIUM',q:'The new homework is ___ than last week\'s. (difficult)',opts:['A. more difficult','B. difficulter','C. most difficult','D. difficult']},
  {d:'MEDIUM',q:'She is ___ than me at swimming. (comfortable)',opts:['A. more comfortable','B. comfortabler','C. most comfortable','D. comfortable']},
  {d:'HARD',q:'He seems ___ than his sister at art. (talented)',opts:['A. more talented','B. talenteder','C. most talented','D. talented']},
  {d:'EASY',q:'She is ___ girl in our school. (tall — superlative)',opts:['A. the tallest','B. taller','C. tallest','D. most tall']},
  {d:'EASY',q:'This is ___ film this year. (popular — superlative)',opts:['A. the most popular','B. more popular','C. popularest','D. most popular']},
  {d:'MEDIUM',q:'He is ___ player on the team. (good — superlative)',opts:['A. the best','B. the better','C. most good','D. the goodest']},
  {d:'MEDIUM',q:'That was ___ day of my life. (bad — superlative)',opts:['A. the worst','B. the worse','C. most bad','D. the baddest']},
  {d:'HARD',q:'She is ___ scientist in her field. (famous — superlative)',opts:['A. the most famous','B. the more famous','C. famousest','D. most famous']},
  {d:'EASY',q:'My cat is ___ clever ___ your dog.',opts:['A. as / as','B. more / than','C. as / than','D. so / as']},
  {d:'MEDIUM',q:'He is not ___ fast ___ his twin.',opts:['A. as / as','B. more / than','C. as / than','D. less / than']},
  {d:'HARD',q:'This exercise is just ___ difficult ___ the previous one.',opts:['A. as / as','B. more / than','C. as / that','D. so / as']},
  {d:'EASY',q:'Vietnam is ___ Thailand. (hot — as...as)',opts:['A. as hot as','B. hotter than','C. the hottest of','D. most hot as']},
  {d:'MEDIUM',q:'She doesn\'t read ___ quickly ___ her classmate.',opts:['A. as / as','B. more / than','C. as / than','D. so / than']},
  {d:'EASY',q:'Which is correct?',opts:['A. He is older than me.','B. He is more old than me.','C. He is oldest than me.','D. He old than me.']},
  {d:'EASY',q:'Which is correct?',opts:['A. She is the kindest person I know.','B. She is the more kind person I know.','C. She is kindest person I know.','D. She is kinder person I know.']},
  {d:'MEDIUM',q:'Which sentence is INCORRECT?',opts:['A. He is more taller than her.','B. He is taller than her.','C. She is shorter than him.','D. They are the same height.']},
  {d:'MEDIUM',q:'Which is the correct comparative?',opts:['A. more important','B. importanter','C. importantest','D. most important']},
  {d:'HARD',q:'Choose the CORRECT superlative form of "interesting":',opts:['A. the most interesting','B. the interestingest','C. more interesting','D. interestinger']},
  {d:'EASY',q:'A cat is ___ than a horse.',opts:['A. smaller','B. more small','C. smallest','D. small']},
  {d:'MEDIUM',q:'The Pacific is ___ ocean in the world.',opts:['A. the largest','B. the larger','C. most large','D. more large']},
  {d:'HARD',q:'She speaks English ___ than anyone else in her class.',opts:['A. more fluently','B. fluenter','C. most fluently','D. fluentlier']},
  {d:'EASY',q:'Read: "Nam is taller than Minh. Minh is shorter than Lan. Lan is the tallest." Who is the tallest?',opts:['A. Lan','B. Nam','C. Minh','D. They are all the same height.']},
  {d:'MEDIUM',q:'Read: "The Amazon is longer than the Nile according to some scientists, but the Nile is often called the longest river." Which is called the longest?',opts:['A. the Nile','B. the Amazon','C. the Mekong','D. the Mississippi']},
  {d:'HARD',q:'Read: "Mount Everest is the highest mountain. K2 is the second highest. Both are in Asia." Which mountain is taller?',opts:['A. Mount Everest','B. K2','C. Both are the same height.','D. Neither — they are not in Asia.']},
  {d:'EASY',q:'He is ___ than his friend at football.',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'MEDIUM',q:'This is ___ test I\'ve ever taken.',opts:['A. the hardest','B. harder','C. the harder','D. most hard']},
  {d:'HARD',q:'The ___ you study, the ___ you will become.',opts:['A. more / better','B. most / best','C. harder / gooder','D. more / more good']},
  {d:'EASY',q:'Gold is ___ than silver.',opts:['A. more expensive','B. expensiver','C. most expensive','D. expensive']},
  {d:'MEDIUM',q:'She answered ___ than I expected.',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'HARD',q:'He is ___ person in the office. Everyone loves him.',opts:['A. the most popular','B. more popular','C. popularest','D. the popularest']},
  {d:'EASY',q:'Which is the comparative of "bad"?',opts:['A. worse','B. badder','C. more bad','D. worst']},
  {d:'EASY',q:'Which is the superlative of "good"?',opts:['A. the best','B. the better','C. most good','D. the goodest']},
  {d:'MEDIUM',q:'Which is the comparative of "many"?',opts:['A. more','B. most','C. much','D. very many']},
  {d:'HARD',q:'Which is the superlative of "little"?',opts:['A. the least','B. the fewer','C. the less','D. the littlest']},
  {d:'EASY',q:'My bag is not ___ heavy ___ yours.',opts:['A. as / as','B. more / than','C. as / than','D. so / as']},
  {d:'MEDIUM',q:'He is just ___ clever ___ she is.',opts:['A. as / as','B. more / than','C. as / than','D. so / as']},
  {d:'HARD',q:'The film was not ___ exciting ___ the book.',opts:['A. as / as','B. more / than','C. less / than','D. as / than']},
  {d:'EASY',q:'This house is ___ than that one. (big)',opts:['A. bigger','B. biger','C. bigeer','D. more big']},
  {d:'MEDIUM',q:'She is the ___ student in her class. (intelligent)',opts:['A. most intelligent','B. more intelligent','C. intelligenter','D. intelligentest']},
  {d:'HARD',q:'He is ___ teacher I have ever met. (inspiring)',opts:['A. the most inspiring','B. more inspiring','C. the inspiringest','D. most inspiring']},
  {d:'EASY',q:'An aeroplane is ___ than a bicycle. (fast)',opts:['A. faster','B. more fast','C. fastest','D. fast']},
  {d:'MEDIUM',q:'The Sahara Desert is the ___ hot desert in the world.',opts:['A. largest','B. larger','C. large','D. more large']},
  {d:'HARD',q:'She plays the piano ___ of all the students in the school. (well)',opts:['A. the best','B. the better','C. most well','D. the most well']},
  {d:'EASY',q:'He is ___ than his father. (short)',opts:['A. shorter','B. more short','C. shortest','D. short']},
  {d:'MEDIUM',q:'This is ___ story I\'ve ever read. (long)',opts:['A. the longest','B. longer','C. most long','D. the longer']},
  {d:'HARD',q:'She handled the situation ___ than I expected. (well)',opts:['A. better','B. gooder','C. more well','D. best']},
  {d:'EASY',q:'A: Who is older, you or your sister? B: She is. She is two years ___ than me.',opts:['A. older','B. elder','C. oldest','D. more old']},
  {d:'MEDIUM',q:'A: Which is more difficult, maths or English? B: For me, maths is ___ English.',opts:['A. harder than','B. more hard than','C. hardest than','D. the hardest of']},
  {d:'HARD',q:'A: Which city is the most expensive? B: In my opinion, this is ___ city to live in.',opts:['A. the most expensive','B. more expensive','C. the expensivest','D. most expensive']},
  {d:'EASY',q:'He is ___ player in the team.',opts:['A. the best','B. better','C. the better','D. most good']},
  {d:'MEDIUM',q:'She speaks ___ languages ___ anyone else in her school.',opts:['A. more / than','B. most / than','C. as / as','D. much / than']},
  {d:'HARD',q:'This year\'s competition was ___ than last year\'s.',opts:['A. more competitive','B. competitiver','C. most competitive','D. competitive']},
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
