const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocd000lloc7ntap2enl';
const QUESTIONS = [
  {d:'EASY',q:'What is a "celebration"?',opts:['A. lễ kỷ niệm hoặc tiệc vui','B. kỳ thi học kỳ','C. buổi họp phụ huynh','D. ngày đi học']},
  {d:'EASY',q:'What is a "gift"?',opts:['A. món quà tặng','B. tiền mừng','C. thức ăn ngon','D. trang phục đẹp']},
  {d:'EASY',q:'What is a "candle"?',opts:['A. cây nến','B. đèn điện','C. đèn lồng','D. pháo sáng']},
  {d:'EASY',q:'What do we do with birthday candles?',opts:['A. blow them out after making a wish','B. light them and leave them','C. eat them with cake','D. give them as gifts']},
  {d:'EASY',q:'What is "Trick or Treat"?',opts:['A. câu nói của trẻ em vào Halloween','B. trò chơi sinh nhật','C. bài hát Giáng sinh','D. điệu nhảy truyền thống']},
  {d:'EASY',q:'What is a "costume"?',opts:['A. trang phục hóa trang','B. đồng phục học sinh','C. trang phục dân tộc','D. áo dài Việt Nam']},
  {d:'EASY',q:'What do people do with a Christmas tree?',opts:['A. decorate it with lights and ornaments','B. eat it at dinner','C. plant it in the garden','D. give it as a gift']},
  {d:'EASY',q:'What is "a greeting card"?',opts:['A. thiệp chúc mừng','B. phong bao lì xì','C. giấy mời dự tiệc','D. vé tham quan']},
  {d:'MEDIUM',q:'What is the Lunar New Year called in Vietnam?',opts:['A. Tết Nguyên Đán','B. Tết Trung Thu','C. Tết Hàn Thực','D. Tết Đoan Ngọ']},
  {d:'MEDIUM',q:'What special cake do Vietnamese people eat at Tết?',opts:['A. bánh chưng','B. bánh trung thu','C. bánh kem','D. bánh mì']},
  {d:'MEDIUM',q:'What flower is associated with Tết in Northern Vietnam?',opts:['A. peach blossom','B. lotus flower','C. sunflower','D. rose']},
  {d:'MEDIUM',q:'What flower is associated with Tết in Southern Vietnam?',opts:['A. yellow apricot blossom','B. peach blossom','C. orchid','D. jasmine']},
  {d:'MEDIUM',q:'What is "mooncake"?',opts:['A. bánh trung thu','B. bánh chưng','C. bánh nướng','D. bánh bao']},
  {d:'MEDIUM',q:'What shape are traditional mooncakes?',opts:['A. round or square','B. triangle','C. star-shaped','D. heart-shaped']},
  {d:'HARD',q:'What does "ancestor worship" mean?',opts:['A. thờ cúng tổ tiên','B. lễ hội âm nhạc','C. tết thiếu nhi','D. lễ hội truyền thống']},
  {d:'HARD',q:'On Hung Kings\' Day, people visit ___.',opts:['A. Hung Kings\' Temple in Phu Tho','B. Hoan Kiem Lake in Hanoi','C. Ho Chi Minh Mausoleum','D. Ba Dinh Square']},
  // "be going to" practice (30)
  {d:'EASY',q:'I am going to ___ a costume for Halloween.',opts:['A. wear','B. wearing','C. wore','D. wears']},
  {d:'EASY',q:'We are going to ___ fireworks tonight.',opts:['A. watch','B. watching','C. watched','D. watches']},
  {d:'EASY',q:'She ___ going to bake a birthday cake.',opts:['A. is','B. are','C. am','D. was']},
  {d:'EASY',q:'They are going ___ celebrate Christmas with friends.',opts:['A. to','B. of','C. for','D. in']},
  {d:'MEDIUM',q:'He ___ going to sing at the school festival.',opts:['A. is','B. are','C. am','D. were']},
  {d:'MEDIUM',q:'We ___ going to decorate the classroom for Tết.',opts:['A. are','B. is','C. am','D. was']},
  {d:'MEDIUM',q:'___ you going to attend the ceremony tomorrow?',opts:['A. Are','B. Is','C. Am','D. Were']},
  {d:'MEDIUM',q:'My parents ___ not going to travel during the holiday.',opts:['A. are','B. is','C. am','D. were']},
  {d:'HARD',q:'What ___ you going to do at the school anniversary?',opts:['A. are','B. is','C. am','D. were']},
  {d:'HARD',q:'The school ___ going to hold a concert for National Day.',opts:['A. is','B. are','C. am','D. were']},
  // Will for predictions (15)
  {d:'EASY',q:'I think the party ___ be very fun.',opts:['A. will','B. would','C. is','D. was']},
  {d:'EASY',q:'She ___ bring a present for you.',opts:['A. will','B. would','C. is','D. was']},
  {d:'MEDIUM',q:'It ___ probably rain during the outdoor festival.',opts:['A. will','B. would','C. is','D. was']},
  {d:'MEDIUM',q:'The fireworks ___ start at midnight.',opts:['A. will','B. would','C. are','D. were']},
  {d:'HARD',q:'Next year, there ___ be a big celebration for our town\'s 100th anniversary.',opts:['A. will','B. would','C. is going','D. were']},
  // Wh- questions about celebrations (20)
  {d:'EASY',q:'___ is Christmas?',opts:['A. When','B. Where','C. What','D. Who']},
  {d:'EASY',q:'___ do children carry at Mid-Autumn Festival?',opts:['A. What','B. Where','C. When','D. Who']},
  {d:'EASY',q:'___ gives children lucky money at Tết?',opts:['A. Who','B. What','C. Where','D. When']},
  {d:'MEDIUM',q:'___ do families celebrate Tết?',opts:['A. How','B. What','C. When','D. Why']},
  {d:'MEDIUM',q:'___ is the Mid-Autumn Festival celebrated?',opts:['A. Where','B. When','C. How','D. Who']},
  {d:'MEDIUM',q:'___ is special about Vietnamese New Year?',opts:['A. What','B. Where','C. When','D. Who']},
  {d:'HARD',q:'___ many days does Tết holiday usually last?',opts:['A. How','B. What','C. Where','D. When']},
  {d:'HARD',q:'___ do people clean their houses before Tết?',opts:['A. Why','B. What','C. Where','D. When']},
  // More reading (30)
  {d:'MEDIUM',q:'Read: "On my birthday, my friends came to my house. We played games, sang songs, and ate a big chocolate cake." How many activities are mentioned?',opts:['A. three','B. two','C. four','D. five']},
  {d:'MEDIUM',q:'Read: "On my birthday, my friends came to my house. We played games, sang songs, and ate a big chocolate cake." What kind of cake did they eat?',opts:['A. chocolate cake','B. strawberry cake','C. vanilla cake','D. fruit cake']},
  {d:'MEDIUM',q:'Read: "At Christmas, we put presents under the Christmas tree. On Christmas morning, children open their gifts excitedly." When do children open presents?',opts:['A. Christmas morning','B. Christmas Eve','C. New Year\'s morning','D. Christmas afternoon']},
  {d:'MEDIUM',q:'Read: "We celebrate Teachers\' Day on November 20th in Vietnam. Students give flowers and cards to their teachers." What do students give?',opts:['A. flowers and cards','B. gifts and money','C. food and drinks','D. books and pencils']},
  {d:'HARD',q:'Read: "The Mid-Autumn Festival has ancient roots. It was originally a harvest festival. Over time, it became a children\'s festival full of lanterns and mooncakes." What was the festival originally?',opts:['A. a harvest festival','B. a children\'s festival','C. a moon-worshipping ceremony','D. a food festival']},
  {d:'HARD',q:'Read: "During Tết, Vietnamese families make bánh chưng — square sticky rice cakes filled with meat and beans, wrapped in banana leaves." What shape is bánh chưng?',opts:['A. square','B. round','C. triangle','D. star-shaped']},
  {d:'MEDIUM',q:'Read: "At the school\'s anniversary celebration, students performed dances, sang songs, and did art displays." What did students do at the celebration?',opts:['A. performed dances, sang songs, and did art displays','B. played games and ate food','C. gave speeches and received prizes','D. cleaned the school and planted trees']},
  {d:'HARD',q:'Read: "International Children\'s Day is on June 1st. Children around the world celebrate with games, music, and special events." What is celebrated on June 1st?',opts:['A. International Children\'s Day','B. International Teachers\' Day','C. World Environment Day','D. World Health Day']},
  // Communication & dialogue (25)
  {d:'EASY',q:'A: What\'s your favourite festival? B: ___ favourite festival is Tết.',opts:['A. My','B. Her','C. His','D. Their']},
  {d:'EASY',q:'A: When is Christmas? B: It\'s ___ December 25th.',opts:['A. on','B. in','C. at','D. for']},
  {d:'EASY',q:'A: Happy Tết! B: ___',opts:['A. Happy New Year! Chúc Mừng Năm Mới!','B. Thank you, I am tired.','C. Goodbye, see you later.','D. No, thank you.']},
  {d:'MEDIUM',q:'A: What are you going to do for New Year? B: I ___ going to watch fireworks with my family.',opts:['A. am','B. is','C. are','D. was']},
  {d:'MEDIUM',q:'A: Will you come to the festival? B: Yes, I ___ come!',opts:['A. will','B. would','C. am','D. was']},
  {d:'HARD',q:'A: Can you describe Mid-Autumn Festival? B: Of course! Children carry lanterns and eat mooncakes. There are also ___ in the streets.',opts:['A. dragon dances','B. fireworks displays','C. fashion shows','D. parades']},
  {d:'EASY',q:'A: Do you celebrate Halloween? B: Yes, I ___ a costume every year.',opts:['A. wear','B. wearing','C. wore','D. wears']},
  {d:'MEDIUM',q:'A: What is the meaning of lucky money? B: It ___ good luck and best wishes for the new year.',opts:['A. represents','B. represent','C. representing','D. represented']},
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
