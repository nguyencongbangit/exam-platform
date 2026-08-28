const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocd000lloc7ntap2enl';
const QUESTIONS = [
  // Festivals & celebrations vocabulary (35)
  {d:'EASY',q:'What is "Tết Nguyên Đán" in English?',opts:['A. Vietnamese New Year','B. Christmas','C. Halloween','D. Easter']},
  {d:'EASY',q:'What do Vietnamese people do on Tết?',opts:['A. visit family and give lucky money','B. dress up in costumes','C. hunt for Easter eggs','D. light fireworks only']},
  {d:'EASY',q:'What is "birthday" in Vietnamese?',opts:['A. sinh nhật','B. lễ hội','C. kỷ niệm','D. lễ tết']},
  {d:'EASY',q:'What do people do on birthdays?',opts:['A. sing happy birthday and eat cake','B. light lanterns','C. wear masks','D. plant trees']},
  {d:'EASY',q:'What is "Christmas"?',opts:['A. lễ Giáng sinh ngày 25 tháng 12','B. lễ Phục sinh','C. lễ Halloween','D. lễ Tết']},
  {d:'EASY',q:'What is "Mid-Autumn Festival"?',opts:['A. Tết Trung thu','B. Tết Nguyên đán','C. Lễ Giáng sinh','D. Lễ Quốc khánh']},
  {d:'EASY',q:'What do children do at Mid-Autumn Festival?',opts:['A. carry lanterns and eat mooncakes','B. receive presents from Santa','C. hunt Easter eggs','D. dress up as ghosts']},
  {d:'EASY',q:'What is "Halloween"?',opts:['A. lễ hóa trang ngày 31 tháng 10','B. lễ Giáng sinh','C. ngày Lễ tình nhân','D. lễ Phục sinh']},
  {d:'EASY',q:'What do children say at Halloween?',opts:['A. Trick or treat!','B. Happy New Year!','C. Merry Christmas!','D. Happy Easter!']},
  {d:'EASY',q:'What is a "lantern"?',opts:['A. đèn lồng','B. bánh trung thu','C. phong bao lì xì','D. nến']},
  {d:'EASY',q:'What is "lucky money"?',opts:['A. tiền lì xì','B. tiền thưởng','C. tiền quà','D. tiền tiết kiệm']},
  {d:'EASY',q:'What is "fireworks"?',opts:['A. pháo hoa','B. nến sinh nhật','C. đèn lồng','D. cờ']},
  {d:'EASY',q:'What is "decoration"?',opts:['A. đồ trang trí','B. đồ ăn','C. trang phục','D. quà tặng']},
  {d:'MEDIUM',q:'What is "National Day" in Vietnamese?',opts:['A. Ngày Quốc khánh','B. Ngày Tết','C. Ngày Giải phóng','D. Ngày Lễ hội']},
  {d:'MEDIUM',q:'What is "Hung Kings Commemoration Day"?',opts:['A. Ngày Giỗ Tổ Hùng Vương','B. Ngày Tết Nguyên đán','C. Ngày Giải phóng miền Nam','D. Ngày Quốc khánh']},
  {d:'MEDIUM',q:'What do people wear at a traditional festival?',opts:['A. traditional costumes','B. school uniforms','C. sports clothes','D. swimming suits']},
  {d:'MEDIUM',q:'What is a "parade"?',opts:['A. đám diễu hành','B. tiệc ăn uống','C. lễ trao giải','D. buổi biểu diễn nhạc']},
  {d:'MEDIUM',q:'What is "anniversary"?',opts:['A. ngày kỷ niệm','B. ngày sinh nhật','C. ngày nghỉ','D. ngày lễ tôn giáo']},
  {d:'MEDIUM',q:'What is "Easter"?',opts:['A. lễ Phục sinh','B. lễ Giáng sinh','C. lễ Halloween','D. lễ Tết']},
  {d:'HARD',q:'What does "ceremony" mean?',opts:['A. nghi lễ trang trọng','B. bữa tiệc vui','C. cuộc biểu diễn','D. lễ hội dân gian']},
  // Grammar: be going to / will for celebrations (30)
  {d:'EASY',q:'We ___ have a party on my birthday.',opts:['A. are going to','B. is going to','C. was going to','D. will going to']},
  {d:'EASY',q:'She ___ wear a traditional dress at the festival.',opts:['A. will','B. would','C. is','D. are']},
  {d:'EASY',q:'They ___ celebrate Christmas with their family.',opts:['A. will','B. would','C. are going','D. is going']},
  {d:'EASY',q:'I ___ go to the Tết festival next week.',opts:['A. am going to','B. is going to','C. are going to','D. was going to']},
  {d:'MEDIUM',q:'We ___ light fireworks at midnight on New Year\'s Eve.',opts:['A. will','B. would','C. are','D. were']},
  {d:'MEDIUM',q:'The children ___ carry lanterns at Mid-Autumn Festival.',opts:['A. are going to','B. is going to','C. was going to','D. will going']},
  {d:'MEDIUM',q:'My family ___ visit my grandparents during Tết.',opts:['A. will','B. would','C. is','D. are']},
  {d:'MEDIUM',q:'She ___ bake a cake for the party.',opts:['A. is going to','B. are going to','C. will going to','D. was going to']},
  {d:'HARD',q:'I think it ___ be a great celebration.',opts:['A. will','B. would','C. is going to','D. shall']},
  {d:'HARD',q:'They ___ not attend the ceremony because they are busy.',opts:['A. will','B. would','C. are','D. were']},
  {d:'EASY',q:'___ you come to my birthday party?',opts:['A. Will','B. Would','C. Are','D. Were']},
  {d:'MEDIUM',q:'What ___ you do at Halloween? I ___ dress up as a ghost.',opts:['A. will / will','B. would / would','C. are / is','D. do / does']},
  {d:'HARD',q:'The parade ___ start at 8 o\'clock tomorrow morning.',opts:['A. will','B. would','C. was','D. is going']},
  // Reading comprehension (50)
  {d:'MEDIUM',q:'Read: "Tết is the most important festival in Vietnam. Families clean their houses, buy new clothes, and cook special foods. Children receive lucky money from adults." What do children receive at Tết?',opts:['A. lucky money','B. new clothes','C. special food','D. fireworks']},
  {d:'MEDIUM',q:'Read: "Tết is the most important festival in Vietnam." What kind of festival is Tết?',opts:['A. the most important','B. the most colourful','C. the longest','D. the noisiest']},
  {d:'MEDIUM',q:'Read: "At Mid-Autumn Festival, children carry colourful lanterns and eat mooncakes. There are also dragon dances in the streets." What do children eat?',opts:['A. mooncakes','B. rice cakes','C. sticky rice','D. banh mi']},
  {d:'MEDIUM',q:'Read: "At Mid-Autumn Festival, children carry colourful lanterns and eat mooncakes." What do children carry?',opts:['A. colourful lanterns','B. red envelopes','C. flower baskets','D. candles']},
  {d:'MEDIUM',q:'Read: "Christmas is on December 25th. People decorate Christmas trees, give presents, and sing carols." When is Christmas?',opts:['A. December 25th','B. December 24th','C. January 1st','D. October 31st']},
  {d:'MEDIUM',q:'Read: "Christmas is on December 25th. People decorate Christmas trees, give presents, and sing carols." What do people sing at Christmas?',opts:['A. carols','B. folk songs','C. pop songs','D. birthday songs']},
  {d:'MEDIUM',q:'Read: "Halloween is on October 31st. Children dress up in costumes and go trick-or-treating." When is Halloween?',opts:['A. October 31st','B. November 1st','C. December 31st','D. October 30th']},
  {d:'MEDIUM',q:'Read: "My birthday is in June. My parents will bake a cake and invite my friends. We will play games and sing." What will her parents bake?',opts:['A. a cake','B. cookies','C. bread','D. pies']},
  {d:'HARD',q:'Read: "The Hung Kings Commemoration Day is on the 10th day of the 3rd lunar month. Vietnamese people remember their ancestors and express gratitude." Who do Vietnamese people remember on this day?',opts:['A. their ancestors','B. their teachers','C. their kings only','D. their parents']},
  {d:'HARD',q:'Read: "National Day of Vietnam is September 2nd. There are parades, fireworks, and cultural performances to celebrate independence." What is celebrated on this day?',opts:['A. independence','B. the new year','C. the harvest','D. the founding of Hanoi']},
  {d:'MEDIUM',q:'Read: "Easter is celebrated in spring. People exchange chocolate eggs as gifts. Churches hold special services." What do people exchange at Easter?',opts:['A. chocolate eggs','B. flowers','C. lucky money','D. lanterns']},
  {d:'HARD',q:'Read: "Festivals bring people together. They strengthen family bonds and preserve cultural traditions. Many festivals include music, dance, and special foods." What is the main idea of this text?',opts:['A. Festivals connect people and preserve culture.','B. Festivals are only about food.','C. Every country has the same festivals.','D. Festivals are held only in winter.']},
  {d:'HARD',q:'Read: "In recent years, many people celebrate their birthdays by hosting parties at restaurants rather than at home." What change is described here?',opts:['A. People now celebrate birthdays in restaurants.','B. People stopped celebrating birthdays.','C. Birthdays are now a national holiday.','D. Only children celebrate birthdays.']},
  // Communication (30)
  {d:'EASY',q:'A: Happy New Year! B: ___',opts:['A. Happy New Year to you, too!','B. Thank you, I\'m fine.','C. See you later.','D. Nice to meet you.']},
  {d:'EASY',q:'A: Happy Birthday! B: ___',opts:['A. Thank you so much!','B. Happy Birthday to you!','C. Merry Christmas!','D. Good luck!']},
  {d:'EASY',q:'A: Merry Christmas! B: ___',opts:['A. Merry Christmas! Happy New Year!','B. Thank you, I\'m fine.','C. Same to you later.','D. See you at school.']},
  {d:'EASY',q:'A: What do you do at Tết? B: I ___ my relatives and receive lucky money.',opts:['A. visit','B. visits','C. visiting','D. visited']},
  {d:'EASY',q:'A: ___ is your birthday? B: It\'s on the 15th of March.',opts:['A. When','B. Where','C. What','D. How']},
  {d:'MEDIUM',q:'A: What will you do on New Year\'s Eve? B: I ___ watch fireworks with my family.',opts:['A. will','B. would','C. am','D. was']},
  {d:'MEDIUM',q:'A: Which festival do you like best? B: I ___ the Mid-Autumn Festival.',opts:['A. like','B. likes','C. liked','D. liking']},
  {d:'MEDIUM',q:'A: What are you going to do at Christmas? B: I ___ going to decorate the tree.',opts:['A. am','B. is','C. are','D. was']},
  {d:'HARD',q:'A: How do you celebrate Tết in your family? B: We clean the house, cook traditional food, and ___ our grandparents.',opts:['A. visit','B. visits','C. visiting','D. visited']},
  {d:'HARD',q:'A: Do you celebrate any Western festivals? B: Yes, we celebrate Christmas because we enjoy the ___.',opts:['A. festive atmosphere','B. traditional food','C. lucky money','D. lanterns']},
  {d:'EASY',q:'A: ___ is the Mid-Autumn Festival? B: It is in autumn, usually in September or October.',opts:['A. When','B. Where','C. What','D. How']},
  {d:'MEDIUM',q:'A: What do you like most about Tết? B: I like receiving ___ from my relatives.',opts:['A. lucky money','B. homework','C. uniforms','D. vegetables']},
  {d:'MEDIUM',q:'A: Are you going to a birthday party? B: Yes, I ___ going to Mai\'s party tomorrow.',opts:['A. am','B. is','C. are','D. was']},
  {d:'HARD',q:'A: Can you describe how your family celebrates New Year? B: We stay up until midnight and count down to ___.',opts:['A. the New Year','B. the sunrise','C. our bedtime','D. the fireworks end']},
  // Vocabulary completion (25)
  {d:'EASY',q:'We ___ traditional clothes on National Day.',opts:['A. wear','B. wearing','C. wore','D. wears']},
  {d:'EASY',q:'Children ___ lanterns at Mid-Autumn Festival.',opts:['A. carry','B. carries','C. carrying','D. carried']},
  {d:'EASY',q:'My family ___ special food at Tết.',opts:['A. cooks','B. cook','C. cooking','D. cooked']},
  {d:'MEDIUM',q:'We ___ our house before Tết arrives.',opts:['A. clean','B. cleans','C. cleaning','D. cleaned']},
  {d:'MEDIUM',q:'Adults ___ children lucky money during Tết.',opts:['A. give','B. gives','C. giving','D. gave']},
  {d:'MEDIUM',q:'People ___ fireworks to celebrate the new year.',opts:['A. light','B. lights','C. lighting','D. lighted']},
  {d:'HARD',q:'Every year, the whole village ___ together for the harvest festival.',opts:['A. gathers','B. gather','C. gathering','D. gathered']},
  {d:'HARD',q:'The children ___ Halloween costumes and went trick-or-treating.',opts:['A. wore','B. wear','C. wearing','D. wears']},
  {d:'EASY',q:'We ___ songs and eat cake on my birthday.',opts:['A. sing','B. sings','C. singing','D. sang']},
  {d:'MEDIUM',q:'The town ___ National Day with a big parade every year.',opts:['A. celebrates','B. celebrate','C. celebrating','D. celebrated']},
  {d:'HARD',q:'The festival ___ by the local government every year.',opts:['A. is organised','B. is organizing','C. organises','D. organised']},
  // Prepositions of time with celebrations (15)
  {d:'EASY',q:'Christmas is ___ the 25th of December.',opts:['A. on','B. in','C. at','D. for']},
  {d:'EASY',q:'Tết is usually ___ January or February.',opts:['A. in','B. on','C. at','D. for']},
  {d:'EASY',q:'The party starts ___ 6 o\'clock.',opts:['A. at','B. on','C. in','D. for']},
  {d:'MEDIUM',q:'We celebrate our school anniversary ___ November every year.',opts:['A. in','B. on','C. at','D. for']},
  {d:'MEDIUM',q:'___ New Year\'s Day, people visit their relatives.',opts:['A. On','B. In','C. At','D. For']},
  {d:'HARD',q:'The festival is held ___ the third day of the lunar calendar.',opts:['A. on','B. in','C. at','D. during']},
  {d:'MEDIUM',q:'___ midnight, people wish each other a happy new year.',opts:['A. At','B. In','C. On','D. For']},
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
