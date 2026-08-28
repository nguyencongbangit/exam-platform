const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocj000nloc7ke2aqnyl';
const QUESTIONS = [
  {d:'EASY',q:'Which country is famous for the Pyramids?',opts:['A. Egypt','B. Libya','C. Sudan','D. Morocco']},
  {d:'EASY',q:'What is the capital of Japan?',opts:['A. Tokyo','B. Osaka','C. Kyoto','D. Hiroshima']},
  {d:'EASY',q:'What is the capital of England?',opts:['A. London','B. Manchester','C. Birmingham','D. Liverpool']},
  {d:'EASY',q:'What language do people speak in China?',opts:['A. Chinese (Mandarin)','B. Japanese','C. Korean','D. Vietnamese']},
  {d:'EASY',q:'What is the nationality of someone from Australia?',opts:['A. Australian','B. Australish','C. Australianer','D. Austral']},
  {d:'MEDIUM',q:'What is the capital of South Korea?',opts:['A. Seoul','B. Busan','C. Incheon','D. Daegu']},
  {d:'MEDIUM',q:'What language do people speak in Germany?',opts:['A. German','B. Dutch','C. Danish','D. Swedish']},
  {d:'MEDIUM',q:'Which country is famous for the Statue of Liberty?',opts:['A. USA','B. Canada','C. France','D. England']},
  {d:'MEDIUM',q:'What is the nationality of someone from Italy?',opts:['A. Italian','B. Italic','C. Italish','D. Italese']},
  {d:'HARD',q:'Which country has the most people in the world?',opts:['A. India','B. China','C. USA','D. Indonesia']},
  {d:'HARD',q:'What is the longest river in Asia?',opts:['A. The Yangtze River','B. The Mekong River','C. The Ganges River','D. The Yellow River']},
  {d:'EASY',q:'What do we call someone who comes from France?',opts:['A. French','B. Frenchman only','C. Frenchish','D. Francisman']},
  {d:'EASY',q:'What do we call someone who comes from Spain?',opts:['A. Spanish','B. Spanier','C. Spanesh','D. Spanian']},
  {d:'MEDIUM',q:'What do we call someone who comes from Russia?',opts:['A. Russian','B. Russianic','C. Russisher','D. Russion']},
  {d:'HARD',q:'What do we call someone who comes from the Netherlands?',opts:['A. Dutch','B. Netherlandish','C. Hollandic','D. Nederlander']},
  {d:'EASY',q:'We ___ use less plastic to protect the oceans.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'EASY',q:'People ___ cut down trees in national parks.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  {d:'MEDIUM',q:'We ___ turn off lights when we leave a room to save energy.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'MEDIUM',q:'Drivers ___ use public transport more to reduce pollution.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'HARD',q:'Industries ___ find green energy solutions to reduce emissions.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'EASY',q:'What can we do with old newspapers?',opts:['A. recycle them into new paper','B. throw them in the river','C. burn them in the garden','D. leave them on the street']},
  {d:'EASY',q:'Why should we plant trees?',opts:['A. Trees give us oxygen and clean the air.','B. Trees cost a lot of money.','C. Trees use too much water.','D. Trees block the sunlight.']},
  {d:'MEDIUM',q:'What does "renewable energy" mean?',opts:['A. năng lượng tái tạo như gió, mặt trời','B. năng lượng từ than đá','C. năng lượng từ dầu mỏ','D. năng lượng từ hạt nhân']},
  {d:'MEDIUM',q:'Which of these is a renewable energy source?',opts:['A. solar energy','B. coal','C. oil','D. natural gas']},
  {d:'HARD',q:'What is "habitat destruction"?',opts:['A. phá hủy môi trường sống của động vật','B. bảo vệ rừng','C. trồng thêm cây xanh','D. làm sạch nước sông']},
  {d:'MEDIUM',q:'Read: "The Mekong River flows through six countries: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam." How many countries does the Mekong flow through?',opts:['A. six','B. five','C. seven','D. four']},
  {d:'MEDIUM',q:'Read: "The Mekong River flows through six countries: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam." Which is the last country the Mekong passes through?',opts:['A. Vietnam','B. Cambodia','C. Thailand','D. Laos']},
  {d:'HARD',q:'Read: "Mount Everest is the highest peak in the world at 8,848 metres. It is in the Himalayas, on the border between Nepal and China." How high is Mount Everest?',opts:['A. 8,848 metres','B. 8,484 metres','C. 8,848 kilometres','D. 8,000 metres']},
  {d:'HARD',q:'Read: "Mount Everest is on the border between Nepal and China." Where exactly is it located?',opts:['A. on the border between Nepal and China','B. entirely in Nepal','C. entirely in China','D. in India and Nepal']},
  {d:'MEDIUM',q:'Read: "Australia is both a country and a continent. It is the smallest continent but has unique animals like kangaroos and koalas." What is special about Australia?',opts:['A. It is both a country and a continent.','B. It is the largest continent.','C. It has no unique animals.','D. It is in Asia.']},
  {d:'HARD',q:'Read: "The world\'s population is over 8 billion people. Asia has the most people with about 4.7 billion, more than half the world\'s total." Which continent has the most people?',opts:['A. Asia','B. Africa','C. Europe','D. America']},
  {d:'MEDIUM',q:'Read: "The Sahara Desert is the largest hot desert in the world. It covers most of North Africa." What is the Sahara Desert?',opts:['A. the largest hot desert in the world','B. the driest place on Earth','C. a desert in South Africa','D. a forest in Africa']},
  {d:'HARD',q:'Read: "Plastic waste is a major problem for our oceans. It kills marine animals and pollutes the water. We should reduce, reuse, and recycle plastic." What are the three Rs mentioned?',opts:['A. reduce, reuse, recycle','B. refuse, remove, replace','C. repair, renew, restore','D. reduce, remove, recycle']},
  {d:'MEDIUM',q:'Read: "Tigers are endangered animals. Hunters kill them for their fur and bones. We must protect them." Why are tigers endangered?',opts:['A. Hunters kill them.','B. They cannot find food.','C. They are sick.','D. Climate change affects them.']},
  {d:'HARD',q:'Read: "Wind farms generate electricity without burning fuel, so they do not produce greenhouse gases. Wind energy is clean and renewable." What advantage does wind energy have?',opts:['A. It does not produce greenhouse gases.','B. It is the cheapest energy.','C. It can power the whole world.','D. It is available everywhere.']},
  {d:'EASY',q:'A: Which country is that flag from? B: It\'s ___ flag of Vietnam.',opts:['A. the','B. a','C. an','D. some']},
  {d:'EASY',q:'A: Have you ever been abroad? B: No, I ___ been to another country yet.',opts:['A. haven\'t','B. didn\'t','C. wasn\'t','D. don\'t']},
  {d:'MEDIUM',q:'A: What do you know about Australia? B: I know that it is famous for ___ and the Great Barrier Reef.',opts:['A. kangaroos','B. pandas','C. elephants','D. penguins']},
  {d:'MEDIUM',q:'A: Why should we protect forests? B: Because forests are ___ to many animals and plants.',opts:['A. home','B. house','C. place','D. room']},
  {d:'HARD',q:'A: What can ordinary people do about climate change? B: We can save energy, use public transport, and ___ our waste.',opts:['A. recycle','B. ignore','C. increase','D. burn']},
  {d:'EASY',q:'A: Is the Amazon Rainforest important? B: Yes, it is very ___.',opts:['A. important','B. importance','C. importantly','D. unimportant']},
  {d:'EASY',q:'Which is the odd one out?',opts:['A. desk','B. France','C. Japan','D. Vietnam']},
  {d:'EASY',q:'Which one is a country?',opts:['A. Australia','B. Asia','C. Pacific','D. Himalayas']},
  {d:'MEDIUM',q:'Which one is NOT a continent?',opts:['A. Indonesia','B. Africa','C. Europe','D. Asia']},
  {d:'MEDIUM',q:'Which one is an ocean?',opts:['A. the Pacific','B. the Amazon','C. the Sahara','D. the Himalayas']},
  {d:'HARD',q:'Which one is a renewable energy source?',opts:['A. solar power','B. coal','C. petroleum','D. natural gas']},
  {d:'EASY',q:'Earth is called the ___ planet because of its water and life.',opts:['A. blue','B. red','C. yellow','D. green']},
  {d:'EASY',q:'The sun ___ in the east and sets in the west.',opts:['A. rises','B. rise','C. rising','D. rose']},
  {d:'MEDIUM',q:'There ___ seven continents in the world.',opts:['A. are','B. is','C. were','D. was']},
  {d:'HARD',q:'By 2050, scientists predict that many coastal cities ___ be underwater if sea levels keep rising.',opts:['A. will','B. would','C. are','D. were']},
  {d:'EASY',q:'People from many different ___ live in big cities.',opts:['A. countries','B. country','C. countryside','D. continents']},
  {d:'MEDIUM',q:'We need to protect the ___ so that future generations can enjoy nature.',opts:['A. environment','B. entertainment','C. energy','D. equipment']},
  {d:'HARD',q:'If we don\'t stop pollution, our planet ___ become a difficult place to live.',opts:['A. will','B. would','C. is','D. was']},
  {d:'EASY',q:'What does "globe" mean?',opts:['A. quả địa cầu / Trái Đất','B. bản đồ phẳng','C. kính thiên văn','D. tầng khí quyển']},
  {d:'EASY',q:'What does "border" mean?',opts:['A. đường biên giới giữa hai quốc gia','B. bờ biển','C. đường cao tốc','D. con sông lớn']},
  {d:'MEDIUM',q:'What does "population" mean?',opts:['A. dân số','B. diện tích','C. ngôn ngữ','D. tôn giáo']},
  {d:'MEDIUM',q:'What does "culture" mean?',opts:['A. văn hóa và phong tục của một dân tộc','B. ngôn ngữ chính thức','C. lịch sử chiến tranh','D. nền kinh tế']},
  {d:'HARD',q:'What does "diverse" mean?',opts:['A. đa dạng, nhiều loại khác nhau','B. giống nhau hoàn toàn','C. thống nhất, đơn điệu','D. cổ xưa và truyền thống']},
  {d:'HARD',q:'What does "heritage" mean?',opts:['A. di sản văn hóa hoặc thiên nhiên','B. hàng hóa xuất khẩu','C. tài nguyên khoáng sản','D. biên giới quốc gia']},
  {d:'EASY',q:'We ___ the Earth because it is our home.',opts:['A. should protect','B. should destroy','C. shouldn\'t save','D. mustn\'t clean']},
  {d:'MEDIUM',q:'___ should we care about the environment? Because future generations will live here too.',opts:['A. Why','B. What','C. Where','D. When']},
  {d:'HARD',q:'The world ___ a better place if everyone works together to protect it.',opts:['A. will be','B. is','C. was','D. were']},
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
  console.log(`📌 Unit 12 - Our World: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
