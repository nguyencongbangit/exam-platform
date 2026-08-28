const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocz000vloc7zlfg405i';
const QUESTIONS = [
  // Comparative (shorter adjectives) (40)
  {d:'EASY',q:'A dog is ___ than a cat. (big)',opts:['A. bigger','B. more big','C. biggest','D. more bigger']},
  {d:'EASY',q:'This book is ___ than that one. (thick)',opts:['A. thicker','B. more thick','C. thickest','D. thick']},
  {d:'EASY',q:'She is ___ than her sister. (tall)',opts:['A. taller','B. more tall','C. tallest','D. tall']},
  {d:'EASY',q:'Today is ___ than yesterday. (hot)',opts:['A. hotter','B. more hot','C. hottest','D. hot']},
  {d:'EASY',q:'He runs ___ than me. (fast)',opts:['A. faster','B. more fast','C. fastest','D. fastly']},
  {d:'EASY',q:'My bag is ___ than yours. (heavy)',opts:['A. heavier','B. more heavy','C. heaviest','D. heavy']},
  {d:'MEDIUM',q:'This road is ___ than that one. (long)',opts:['A. longer','B. more long','C. longest','D. long']},
  {d:'MEDIUM',q:'She works ___ than her classmates. (hard)',opts:['A. harder','B. more hard','C. hardest','D. hardly']},
  {d:'MEDIUM',q:'The maths test was ___ than the English test. (easy)',opts:['A. easier','B. more easy','C. easiest','D. easy']},
  {d:'HARD',q:'The second question was ___ than the first. (tricky)',opts:['A. trickier','B. more tricky','C. trickiest','D. trick']},
  // Comparative (longer adjectives) (20)
  {d:'EASY',q:'This dress is ___ than that one. (expensive)',opts:['A. more expensive','B. expensiver','C. most expensive','D. expensivest']},
  {d:'EASY',q:'English is ___ than maths for her. (interesting)',opts:['A. more interesting','B. interestinger','C. most interesting','D. interesting']},
  {d:'MEDIUM',q:'This problem is ___ than the last one. (difficult)',opts:['A. more difficult','B. difficulter','C. most difficult','D. difficult']},
  {d:'MEDIUM',q:'She is ___ than her brother. (patient)',opts:['A. more patient','B. patienter','C. most patient','D. patient']},
  {d:'HARD',q:'This film is ___ than the book. (exciting)',opts:['A. more exciting','B. excitinger','C. most exciting','D. exciting']},
  // Superlative (shorter adjectives) (30)
  {d:'EASY',q:'He is ___ student in the class. (tall)',opts:['A. the tallest','B. taller','C. tallest','D. most tall']},
  {d:'EASY',q:'This is ___ mountain in the world. (high)',opts:['A. the highest','B. higher','C. highest','D. most high']},
  {d:'EASY',q:'She is ___ girl in the group. (smart)',opts:['A. the smartest','B. smarter','C. smartest','D. most smart']},
  {d:'MEDIUM',q:'This is ___ book in the library. (old)',opts:['A. the oldest','B. older','C. oldest','D. most old']},
  {d:'MEDIUM',q:'July is usually ___ month of the year. (hot)',opts:['A. the hottest','B. hotter','C. hottest','D. more hot']},
  {d:'HARD',q:'She gave ___ answer to the question. (short)',opts:['A. the shortest','B. shorter','C. shortest','D. most short']},
  // Superlative (longer adjectives) (20)
  {d:'EASY',q:'This is ___ film I have ever seen. (beautiful)',opts:['A. the most beautiful','B. more beautiful','C. most beautiful','D. beautifulest']},
  {d:'MEDIUM',q:'She is ___ student in our class. (hardworking)',opts:['A. the most hardworking','B. more hardworking','C. most hardworking','D. hardworkingest']},
  {d:'HARD',q:'This was ___ decision she ever made. (important)',opts:['A. the most important','B. more important','C. most important','D. importantest']},
  // Irregular comparatives (15)
  {d:'EASY',q:'My cat is ___ than your cat. (good)',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'EASY',q:'She sings ___ than her sister. (good)',opts:['A. better','B. gooder','C. more good','D. best']},
  {d:'EASY',q:'This is ___ day of my life. (bad)',opts:['A. the worst','B. the baddest','C. more bad','D. the badder']},
  {d:'MEDIUM',q:'He swims ___ than his brother. (bad)',opts:['A. worse','B. badder','C. more bad','D. worst']},
  {d:'MEDIUM',q:'She knows ___ about cooking than me. (little)',opts:['A. less','B. lesser','C. fewer','D. fewest']},
  {d:'HARD',q:'He has ___ money than his friend. (little)',opts:['A. less','B. fewer','C. lesser','D. least']},
  // as ... as (15)
  {d:'EASY',q:'She is ___ tall ___ her mother.',opts:['A. as / as','B. so / as','C. as / so','D. more / as']},
  {d:'EASY',q:'He is not ___ fast ___ his brother.',opts:['A. as / as','B. so / as','C. as / so','D. more / as']},
  {d:'MEDIUM',q:'This exercise is ___ difficult ___ the last one.',opts:['A. as / as','B. more / than','C. as / than','D. more / as']},
  {d:'MEDIUM',q:'She doesn\'t work ___ hard ___ he does.',opts:['A. as / as','B. so / as','C. as / so','D. more / than']},
  {d:'HARD',q:'The test was ___ easy ___ I expected.',opts:['A. as / as','B. more / than','C. less / as','D. as / than']},
  // Reading (20)
  {d:'MEDIUM',q:'Read: "Ha Long Bay is more beautiful than Nha Trang, but Nha Trang is more popular with swimmers." Which place is more beautiful?',opts:['A. Ha Long Bay','B. Nha Trang','C. Both are the same','D. Neither is beautiful']},
  {d:'MEDIUM',q:'Read: "Mount Everest is the highest mountain in the world at 8,848 metres." What is special about Mount Everest?',opts:['A. It is the highest mountain.','B. It is the longest mountain.','C. It is the most visited mountain.','D. It is the oldest mountain.']},
  {d:'HARD',q:'Read: "The cheetah is faster than the lion, but the lion is stronger. The elephant is the largest land animal." Which animal is the largest?',opts:['A. elephant','B. cheetah','C. lion','D. giraffe']},
  {d:'HARD',q:'Read: "The cheetah is faster than the lion, but the lion is stronger." Which is stronger?',opts:['A. lion','B. cheetah','C. elephant','D. giraffe']},
  // Mixed review / error correction (40)
  {d:'EASY',q:'Choose the correct sentence:',opts:['A. She is taller than me.','B. She is more tall than me.','C. She is tallest than me.','D. She is tall than me.']},
  {d:'EASY',q:'Choose the correct sentence:',opts:['A. This is the most expensive bag in the shop.','B. This is the expensivest bag in the shop.','C. This is more expensive bag in the shop.','D. This is the more expensive bag in the shop.']},
  {d:'MEDIUM',q:'Choose the correct sentence:',opts:['A. He runs faster than his brother.','B. He runs more fast than his brother.','C. He runs the fastest than his brother.','D. He runs faster as his brother.']},
  {d:'MEDIUM',q:'Choose the correct sentence:',opts:['A. She is as clever as her sister.','B. She is as clever than her sister.','C. She is so clever as her sister.','D. She is more clever as her sister.']},
  {d:'HARD',q:'The weather today is ___ yesterday. (bad — comparative)',opts:['A. worse than','B. worst than','C. more bad than','D. badder than']},
  {d:'EASY',q:'She is the ___ student in our class. (good — superlative)',opts:['A. best','B. better','C. most good','D. goodest']},
  {d:'MEDIUM',q:'This exercise is ___ the last one. (difficult — comparative)',opts:['A. more difficult than','B. difficulter than','C. most difficult than','D. difficult than']},
  {d:'HARD',q:'He is ___ student I have ever taught. (intelligent — superlative)',opts:['A. the most intelligent','B. more intelligent','C. the intelligentst','D. most intelligent']},
  {d:'EASY',q:'My dog is ___ than your dog. (small)',opts:['A. smaller','B. more small','C. smallest','D. small']},
  {d:'MEDIUM',q:'This is ___ city in the world. (big — superlative)',opts:['A. the biggest','B. bigger','C. biggest','D. most big']},
  {d:'EASY',q:'She speaks English ___ than her friend. (clear)',opts:['A. more clearly','B. clearlier','C. more clearer','D. clearly']},
  {d:'MEDIUM',q:'He is ___ than his twin brother. (quiet)',opts:['A. quieter','B. more quiet','C. quietest','D. quiet']},
  {d:'HARD',q:'The problem was ___ we thought. (complex — comparative)',opts:['A. more complex than','B. complexer than','C. most complex than','D. complex than']},
  {d:'EASY',q:'This is the ___ cake I\'ve ever tasted! (delicious — superlative)',opts:['A. most delicious','B. deliciouser','C. more delicious','D. deliciousest']},
  {d:'MEDIUM',q:'A whale is ___ than a dolphin. (large)',opts:['A. larger','B. more large','C. largest','D. large']},
  {d:'HARD',q:'She has ___ friends of all the students in the school. (many — superlative)',opts:['A. the most','B. the more','C. most','D. more']},
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
