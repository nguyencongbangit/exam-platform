const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocj000nloc7ke2aqnyl';
const QUESTIONS = [
  // Countries & nationalities (30)
  {d:'EASY',q:'What is the capital of Vietnam?',opts:['A. Hanoi','B. Ho Chi Minh City','C. Da Nang','D. Hue']},
  {d:'EASY',q:'What language do people speak in the USA?',opts:['A. English','B. French','C. Spanish','D. Portuguese']},
  {d:'EASY',q:'Which country is Paris the capital of?',opts:['A. France','B. Belgium','C. Switzerland','D. Italy']},
  {d:'EASY',q:'What is the nationality of someone from Japan?',opts:['A. Japanese','B. Japanish','C. Japaner','D. Japonic']},
  {d:'EASY',q:'What language do people speak in France?',opts:['A. French','B. Italian','C. Spanish','D. German']},
  {d:'EASY',q:'Which country is famous for the Eiffel Tower?',opts:['A. France','B. Italy','C. Germany','D. England']},
  {d:'EASY',q:'What is the nationality of someone from China?',opts:['A. Chinese','B. Chineish','C. Chinan','D. Chinish']},
  {d:'EASY',q:'Which country is famous for kangaroos?',opts:['A. Australia','B. New Zealand','C. South Africa','D. Brazil']},
  {d:'EASY',q:'What is the nationality of someone from England?',opts:['A. English','B. Englandish','C. Englander','D. Britisher']},
  {d:'MEDIUM',q:'Which country is famous for the Great Wall?',opts:['A. China','B. Japan','C. Korea','D. Mongolia']},
  {d:'MEDIUM',q:'What language do people speak in Brazil?',opts:['A. Portuguese','B. Spanish','C. English','D. French']},
  {d:'MEDIUM',q:'What is the nationality of someone from Korea?',opts:['A. Korean','B. Koreish','C. Koreans','D. Koreanic']},
  {d:'MEDIUM',q:'Which country is famous for the Colosseum?',opts:['A. Italy','B. Greece','C. Spain','D. Portugal']},
  {d:'MEDIUM',q:'What is the nationality of someone from Thailand?',opts:['A. Thai','B. Thaiish','C. Thaier','D. Thainist']},
  {d:'HARD',q:'Which country is famous for the Taj Mahal?',opts:['A. India','B. Pakistan','C. Bangladesh','D. Nepal']},
  {d:'HARD',q:'What is the nationality of someone from Germany?',opts:['A. German','B. Germanese','C. Germanish','D. Germaner']},
  // Natural wonders & world geography (25)
  {d:'EASY',q:'What is the longest river in the world?',opts:['A. The Nile','B. The Amazon','C. The Mekong','D. The Mississippi']},
  {d:'EASY',q:'What is the largest ocean in the world?',opts:['A. The Pacific Ocean','B. The Atlantic Ocean','C. The Indian Ocean','D. The Arctic Ocean']},
  {d:'EASY',q:'What is the highest mountain in the world?',opts:['A. Mount Everest','B. Mount Fuji','C. Mont Blanc','D. Mount Kilimanjaro']},
  {d:'EASY',q:'What is the largest desert in the world?',opts:['A. The Sahara Desert','B. The Gobi Desert','C. The Arabian Desert','D. The Australian Desert']},
  {d:'MEDIUM',q:'Which continent is Australia on?',opts:['A. Oceania','B. Asia','C. Africa','D. Antarctica']},
  {d:'MEDIUM',q:'How many continents are there in the world?',opts:['A. 7','B. 5','C. 6','D. 8']},
  {d:'MEDIUM',q:'Which is the largest country in the world by area?',opts:['A. Russia','B. Canada','C. China','D. USA']},
  {d:'MEDIUM',q:'What is the Amazon Rainforest famous for?',opts:['A. being the largest tropical rainforest','B. having the highest mountain','C. being the driest place','D. having the most snow']},
  {d:'HARD',q:'Which ocean is between Africa and Australia?',opts:['A. The Indian Ocean','B. The Pacific Ocean','C. The Atlantic Ocean','D. The Arctic Ocean']},
  {d:'HARD',q:'What is the Great Barrier Reef?',opts:['A. the world\'s largest coral reef in Australia','B. a famous wall in China','C. a mountain range in America','D. a desert in Africa']},
  // Environment & conservation (30)
  {d:'EASY',q:'What does "recycle" mean?',opts:['A. tái chế đồ vật thành sản phẩm mới','B. vứt rác bừa bãi','C. mua sắm nhiều hơn','D. đốt rác']},
  {d:'EASY',q:'What is "pollution"?',opts:['A. ô nhiễm môi trường','B. tái chế','C. bảo tồn thiên nhiên','D. trồng cây']},
  {d:'EASY',q:'What should we do to protect the environment?',opts:['A. recycle, save water, and plant trees','B. use more plastic','C. drive more cars','D. cut down forests']},
  {d:'EASY',q:'What is "deforestation"?',opts:['A. chặt phá rừng','B. trồng thêm cây','C. bảo vệ động vật','D. tưới cây']},
  {d:'EASY',q:'What can we do to save water?',opts:['A. turn off the tap when not using it','B. leave the tap running','C. use more water for cleaning','D. wash cars more often']},
  {d:'MEDIUM',q:'What is "global warming"?',opts:['A. sự ấm lên toàn cầu','B. ô nhiễm không khí','C. lũ lụt','D. hạn hán']},
  {d:'MEDIUM',q:'What causes global warming?',opts:['A. greenhouse gas emissions','B. planting too many trees','C. drinking clean water','D. building schools']},
  {d:'MEDIUM',q:'What is "endangered species"?',opts:['A. loài động vật có nguy cơ tuyệt chủng','B. loài cây nhiệt đới','C. loài vật phổ biến','D. loài cá lớn']},
  {d:'MEDIUM',q:'What is "biodiversity"?',opts:['A. sự đa dạng sinh học','B. sự ô nhiễm nước','C. sự biến đổi khí hậu','D. sự khai thác khoáng sản']},
  {d:'HARD',q:'What is the "ozone layer"?',opts:['A. tầng ozone bảo vệ Trái Đất khỏi tia UV','B. lớp khí thải ô nhiễm','C. lớp mây dày trong khí quyển','D. vùng nhiều mưa']},
  {d:'HARD',q:'What is a "carbon footprint"?',opts:['A. lượng khí CO2 thải ra do hoạt động của người','B. dấu vết trên đất','C. loại phân bón','D. khoáng chất trong đất']},
  // Should / shouldn't for environment (20)
  {d:'EASY',q:'We ___ throw rubbish in the ocean.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  {d:'EASY',q:'We ___ plant more trees to help the environment.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'EASY',q:'People ___ use plastic bags as they pollute the ocean.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  {d:'MEDIUM',q:'We ___ save water because it is precious.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'MEDIUM',q:'Factories ___ release toxic waste into rivers.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  {d:'MEDIUM',q:'Children ___ learn about the environment at school.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'HARD',q:'Governments ___ make stronger laws to protect endangered animals.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'HARD',q:'We ___ cut down rainforests as they are home to millions of species.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  // Reading comprehension (50)
  {d:'MEDIUM',q:'Read: "Vietnam is a beautiful country in Southeast Asia. It has mountains, beaches, and rice fields. Many tourists visit Vietnam every year." Where is Vietnam?',opts:['A. in Southeast Asia','B. in East Asia','C. in South Asia','D. in Central Asia']},
  {d:'MEDIUM',q:'Read: "Vietnam is a beautiful country in Southeast Asia. It has mountains, beaches, and rice fields." What features does Vietnam have?',opts:['A. mountains, beaches, and rice fields','B. deserts, volcanoes, and snow','C. jungles, rivers, and plains','D. islands, glaciers, and forests']},
  {d:'MEDIUM',q:'Read: "Ha Long Bay is a UNESCO World Heritage Site in Vietnam. It is famous for its thousands of limestone islands." What is Ha Long Bay famous for?',opts:['A. thousands of limestone islands','B. white sandy beaches','C. tall mountains','D. deep rivers']},
  {d:'MEDIUM',q:'Read: "The Amazon Rainforest covers much of South America. It is home to millions of plant and animal species." What does the Amazon Rainforest cover?',opts:['A. much of South America','B. most of North America','C. all of Africa','D. part of Asia']},
  {d:'HARD',q:'Read: "Climate change is affecting the whole world. Ice caps are melting, sea levels are rising, and weather patterns are changing." What is happening to ice caps?',opts:['A. They are melting.','B. They are growing.','C. They are moving.','D. They are frozen more.']},
  {d:'HARD',q:'Read: "Many animals are losing their homes because of deforestation. We must stop cutting down forests and plant new trees instead." Why are animals losing their homes?',opts:['A. because of deforestation','B. because of pollution','C. because of flooding','D. because of drought']},
  {d:'MEDIUM',q:'Read: "The Great Wall of China is one of the greatest wonders of the world. It is over 20,000 km long." How long is the Great Wall?',opts:['A. over 20,000 km','B. over 2,000 km','C. exactly 5,000 km','D. about 10,000 km']},
  {d:'MEDIUM',q:'Read: "Recycling helps protect the environment. When we recycle, we use old materials to make new things. This reduces waste." What does recycling do?',opts:['A. reduces waste','B. creates more rubbish','C. uses more energy','D. pollutes rivers']},
  {d:'HARD',q:'Read: "Water covers about 71% of the Earth\'s surface. However, only about 3% of this water is fresh water that we can drink." What percentage of Earth is covered by water?',opts:['A. 71%','B. 3%','C. 50%','D. 29%']},
  {d:'HARD',q:'Read: "Every year, millions of tonnes of plastic enter the ocean. Sea animals often mistake plastic for food and die. We must reduce plastic use." What happens to sea animals that eat plastic?',opts:['A. They die.','B. They get sick but recover.','C. They swim away.','D. Nothing happens.']},
  {d:'MEDIUM',q:'Read: "Japan is an island country in East Asia. It is known for its technology, cherry blossoms, and traditional culture." What is Japan known for?',opts:['A. technology, cherry blossoms, and traditional culture','B. pyramids, deserts, and ancient history','C. rainforests, coffee, and football','D. fjords, salmon, and Northern Lights']},
  {d:'HARD',q:'Read: "The United Nations has set 17 Sustainable Development Goals to make the world a better place by 2030." What has the UN set?',opts:['A. 17 Sustainable Development Goals','B. 10 environmental laws','C. 5 world agreements','D. 20 peace treaties']},
  // Communication (25)
  {d:'EASY',q:'A: Where are you from? B: I\'m ___ Vietnam.',opts:['A. from','B. in','C. at','D. of']},
  {d:'EASY',q:'A: What nationality are you? B: I\'m ___.',opts:['A. Vietnamese','B. Vietnam','C. Vietnamer','D. Vietnamish']},
  {d:'EASY',q:'A: Have you ever visited another country? B: Yes, I ___ to Thailand last year.',opts:['A. went','B. go','C. going','D. goes']},
  {d:'MEDIUM',q:'A: What language do they speak in Japan? B: They speak ___.',opts:['A. Japanese','B. Japan','C. Japanic','D. Japanish']},
  {d:'MEDIUM',q:'A: What should we do to protect the environment? B: We ___ recycle and save water.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'HARD',q:'A: Why is the Amazon important? B: Because it is home to millions of ___ and helps regulate the Earth\'s climate.',opts:['A. species','B. buildings','C. factories','D. roads']},
  {d:'EASY',q:'A: Which country do you want to visit? B: I ___ to visit Japan because of its culture.',opts:['A. want','B. wants','C. wanted','D. wanting']},
  {d:'MEDIUM',q:'A: Is global warming a serious problem? B: Yes, it ___. We must act now.',opts:['A. is','B. was','C. are','D. were']},
  // Vocabulary review (20)
  {d:'EASY',q:'What does "continent" mean?',opts:['A. lục địa','B. quốc gia','C. đại dương','D. hòn đảo']},
  {d:'EASY',q:'What does "ocean" mean?',opts:['A. đại dương','B. hồ','C. sông','D. biển nhỏ']},
  {d:'EASY',q:'What does "island" mean?',opts:['A. hòn đảo','B. bán đảo','C. đất liền','D. vùng đất']},
  {d:'MEDIUM',q:'What does "rainforest" mean?',opts:['A. rừng nhiệt đới ẩm','B. sa mạc','C. đồng cỏ','D. vùng núi cao']},
  {d:'MEDIUM',q:'What does "conservation" mean?',opts:['A. bảo tồn thiên nhiên','B. ô nhiễm','C. khai thác','D. phá hủy']},
  {d:'HARD',q:'What does "sustainable" mean?',opts:['A. bền vững, không làm cạn kiệt tài nguyên','B. tốc độ nhanh','C. chi phí thấp','D. chất lượng cao']},
  {d:'HARD',q:'What does "emission" mean?',opts:['A. khí thải ra môi trường','B. năng lượng tái tạo','C. sản phẩm tái chế','D. nước sạch']},
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
