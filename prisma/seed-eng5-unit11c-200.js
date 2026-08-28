const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocd000lloc7ntap2enl';
const QUESTIONS = [
  {d:'EASY',q:'We ___ a birthday cake for my sister last night.',opts:['A. baked','B. bake','C. baking','D. bakes']},
  {d:'EASY',q:'She ___ a beautiful dress at the festival yesterday.',opts:['A. wore','B. wear','C. wearing','D. wears']},
  {d:'EASY',q:'They ___ fireworks on New Year\'s Eve.',opts:['A. watched','B. watch','C. watching','D. watches']},
  {d:'EASY',q:'My family ___ together at Tết last year.',opts:['A. gathered','B. gather','C. gathering','D. gathers']},
  {d:'EASY',q:'Children ___ their lanterns around the village last night.',opts:['A. carried','B. carry','C. carrying','D. carries']},
  {d:'MEDIUM',q:'We ___ traditional songs at the school festival.',opts:['A. sang','B. sing','C. singing','D. sings']},
  {d:'MEDIUM',q:'She ___ presents to all her friends on her birthday.',opts:['A. gave','B. give','C. giving','D. gives']},
  {d:'MEDIUM',q:'The children ___ costumes and went door-to-door for candy.',opts:['A. wore','B. wear','C. wearing','D. wears']},
  {d:'HARD',q:'The whole town ___ to celebrate the anniversary of their city.',opts:['A. came','B. come','C. coming','D. comes']},
  {d:'HARD',q:'My grandmother ___ me stories about Tết when she was young.',opts:['A. told','B. tell','C. telling','D. tells']},
  {d:'EASY',q:'Tết ___ the most important festival for Vietnamese people.',opts:['A. is','B. are','C. was','D. were']},
  {d:'EASY',q:'Children ___ lucky money from relatives at Tết.',opts:['A. receive','B. receives','C. received','D. receiving']},
  {d:'MEDIUM',q:'The festival ___ every year in January or February.',opts:['A. takes place','B. take place','C. took place','D. taking place']},
  {d:'MEDIUM',q:'At Christmas, Santa Claus ___ presents to good children.',opts:['A. brings','B. bring','C. brought','D. bringing']},
  {d:'HARD',q:'Vietnamese people ___ banh chung days before Tết arrives.',opts:['A. prepare','B. prepares','C. prepared','D. preparing']},
  {d:'EASY',q:'My father ___ peach blossom trees for our Tết decorations.',opts:['A. buys','B. buy','C. bought','D. buying']},
  {d:'MEDIUM',q:'At the Mid-Autumn Festival, the moon ___ full and bright.',opts:['A. is','B. are','C. was','D. were']},
  {d:'HARD',q:'The parade ___ through the main streets of our town every National Day.',opts:['A. passes','B. pass','C. passed','D. passing']},
  {d:'EASY',q:'Which is the correct greeting for Christmas?',opts:['A. Merry Christmas!','B. Happy Tết!','C. Happy Mid-Autumn!','D. Happy Halloween!']},
  {d:'EASY',q:'Which is the correct greeting for the Lunar New Year?',opts:['A. Happy New Year! / Chúc Mừng Năm Mới!','B. Merry Christmas!','C. Happy Mid-Autumn Festival!','D. Trick or Treat!']},
  {d:'EASY',q:'What do you say when you want to wish someone good luck?',opts:['A. Good luck!','B. Happy Birthday!','C. Merry Christmas!','D. Trick or Treat!']},
  {d:'MEDIUM',q:'What do you say to someone who just had a baby?',opts:['A. Congratulations!','B. Happy Birthday!','C. Happy New Year!','D. Well done!']},
  {d:'MEDIUM',q:'A: Thank you for the lovely gift! B: ___ You\'re welcome!',opts:['A. You\'re welcome!','B. No problem!','C. Of course not!','D. Certainly not!']},
  {d:'HARD',q:'A: I heard it\'s your birthday today! B: Yes! I ___ 11 years old today!',opts:['A. am turning','B. am becoming','C. have been','D. was being']},
  {d:'EASY',q:'What is a "balloon"?',opts:['A. bong bóng trang trí tiệc','B. đèn chiếu sáng','C. nến sinh nhật','D. băng-rôn']},
  {d:'EASY',q:'What is a "party hat"?',opts:['A. mũ đội trong tiệc vui','B. mũ bảo hiểm','C. mũ truyền thống','D. mũ học sinh']},
  {d:'MEDIUM',q:'What is "confetti"?',opts:['A. những mảnh giấy màu rải trong tiệc','B. nến sinh nhật','C. bong bóng bay','D. cờ trang trí']},
  {d:'MEDIUM',q:'What is a "toast"?',opts:['A. lời chúc kèm nâng ly','B. bánh mì nướng','C. đồ uống','D. bài hát chúc mừng']},
  {d:'HARD',q:'What is "venue"?',opts:['A. địa điểm tổ chức sự kiện','B. vé vào cửa','C. ngày tổ chức','D. loại tiệc']},
  {d:'EASY',q:'A birthday cake has ___ candles as the person\'s age.',opts:['A. as many','B. as much','C. so many','D. too much']},
  {d:'MEDIUM',q:'We need to ___ the hall before the party starts.',opts:['A. decorate','B. decorates','C. decorated','D. decorating']},
  {d:'MEDIUM',q:'She sent ___ cards to all her classmates before the New Year.',opts:['A. greeting','B. greet','C. greeted','D. greeter']},
  {d:'HARD',q:'The anniversary ___ was a huge success with hundreds of guests.',opts:['A. celebration','B. celebrate','C. celebrated','D. celebratory']},
  {d:'EASY',q:'What month is Halloween?',opts:['A. October','B. November','C. December','D. September']},
  {d:'EASY',q:'What month is Christmas?',opts:['A. December','B. November','C. January','D. February']},
  {d:'MEDIUM',q:'What season does Tết usually fall in?',opts:['A. spring','B. summer','C. autumn','D. winter']},
  {d:'MEDIUM',q:'Mid-Autumn Festival is in the ___ month of the lunar calendar.',opts:['A. 8th','B. 7th','C. 9th','D. 10th']},
  {d:'HARD',q:'Vietnamese Children\'s Day is on ___.',opts:['A. June 1st','B. May 1st','C. September 5th','D. November 20th']},
  {d:'HARD',q:'Teachers\' Day in Vietnam is on ___.',opts:['A. November 20th','B. October 20th','C. September 5th','D. June 1st']},
  {d:'EASY',q:'When is New Year\'s Day?',opts:['A. January 1st','B. December 31st','C. February 1st','D. March 1st']},
  {d:'MEDIUM',q:'What day of the week is best for a party?',opts:['A. Saturday or Sunday','B. Monday or Tuesday','C. Wednesday or Thursday','D. Friday only']},
  {d:'EASY',q:'A: Will you be at my birthday party? B: Of course I ___!',opts:['A. will','B. would','C. am','D. was']},
  {d:'EASY',q:'A: What did you get for Christmas? B: I ___ a new bike!',opts:['A. got','B. get','C. getting','D. gets']},
  {d:'MEDIUM',q:'A: How was the festival? B: It was ___! Everyone had a great time.',opts:['A. wonderful','B. wonder','C. wondering','D. wonderfully']},
  {d:'MEDIUM',q:'A: What will you wear at the school festival? B: I ___ wear the traditional áo dài.',opts:['A. will','B. would','C. am','D. was']},
  {d:'HARD',q:'A: How does your family usually celebrate Tết? B: We clean the house, cook bánh chưng, and visit our ___.',opts:['A. relatives','B. teachers','C. neighbours only','D. doctors']},
  {d:'EASY',q:'My father ___ a birthday cake for me.',opts:['A. bought','B. buy','C. buying','D. buys']},
  {d:'EASY',q:'We ___ to the festival yesterday.',opts:['A. went','B. go','C. going','D. goes']},
  {d:'MEDIUM',q:'She ___ happy when she received the gift.',opts:['A. was','B. is','C. are','D. were']},
  {d:'HARD',q:'The performance at the festival ___ amazing — the crowd cheered loudly.',opts:['A. was','B. is','C. were','D. are']},
  {d:'EASY',q:'Did you enjoy the festival? Yes, I ___ it very much.',opts:['A. enjoyed','B. enjoy','C. enjoying','D. enjoys']},
  {d:'MEDIUM',q:'___ did the parade start yesterday? At 8 a.m.',opts:['A. When','B. Where','C. Who','D. Why']},
  {d:'HARD',q:'___ was the festival like? It was colourful and exciting.',opts:['A. What','B. How','C. Where','D. When']},
  {d:'EASY',q:'___ many people came to the celebration? About 500 people.',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'MEDIUM',q:'___ did they celebrate? Because it was their school\'s 50th anniversary.',opts:['A. Why','B. What','C. When','D. How']},
  {d:'EASY',q:'The Tết holiday usually lasts ___ several days.',opts:['A. for','B. in','C. at','D. on']},
  {d:'MEDIUM',q:'People celebrate National Day ___ September 2nd ___ Vietnam.',opts:['A. on / in','B. in / at','C. at / on','D. for / in']},
  {d:'HARD',q:'The festival has been held ___ over a hundred years.',opts:['A. for','B. since','C. in','D. at']},
  {d:'EASY',q:'We will meet ___ 7 o\'clock at the festival.',opts:['A. at','B. in','C. on','D. for']},
  {d:'MEDIUM',q:'The ceremony will be held ___ the town square.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'Which of these is NOT a festival activity?',opts:['A. taking an exam','B. watching fireworks','C. eating special food','D. wearing costumes']},
  {d:'MEDIUM',q:'Which of these is a Vietnamese traditional festival?',opts:['A. Tết Nguyên Đán','B. Thanksgiving','C. St. Patrick\'s Day','D. Hanukkah']},
  {d:'HARD',q:'Which festival is celebrated differently in Northern and Southern Vietnam?',opts:['A. Tết, with different flowers','B. Christmas','C. Halloween','D. Easter']},
  {d:'EASY',q:'People ___ to celebrate a special occasion.',opts:['A. gather','B. scatter','C. argue','D. fight']},
  {d:'MEDIUM',q:'A ___ is given to someone to show love or appreciation.',opts:['A. gift','B. task','C. rule','D. punishment']},
  {d:'HARD',q:'The word "festive" means ___.',opts:['A. relating to a celebration or festival','B. feeling sad and lonely','C. being very busy with work','D. having strict rules']},
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
  console.log(`📌 Unit 11 - Our Celebrations: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
