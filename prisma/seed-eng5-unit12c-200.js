const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1ocj000nloc7ke2aqnyl';
const QUESTIONS = [
  {d:'EASY',q:'What is the capital of France?',opts:['A. Paris','B. Lyon','C. Marseille','D. Nice']},
  {d:'EASY',q:'What is the capital of Australia?',opts:['A. Canberra','B. Sydney','C. Melbourne','D. Brisbane']},
  {d:'EASY',q:'What is the capital of China?',opts:['A. Beijing','B. Shanghai','C. Guangzhou','D. Shenzhen']},
  {d:'EASY',q:'What is the capital of South Korea?',opts:['A. Seoul','B. Busan','C. Incheon','D. Daegu']},
  {d:'MEDIUM',q:'Which ocean is between America and Europe?',opts:['A. the Atlantic Ocean','B. the Pacific Ocean','C. the Indian Ocean','D. the Arctic Ocean']},
  {d:'MEDIUM',q:'Which is the smallest continent?',opts:['A. Australia/Oceania','B. Europe','C. Antarctica','D. South America']},
  {d:'MEDIUM',q:'What is the currency of Japan?',opts:['A. yen','B. yuan','C. won','D. baht']},
  {d:'HARD',q:'Which country is the world\'s leading producer of rice?',opts:['A. China','B. India','C. Vietnam','D. Thailand']},
  {d:'HARD',q:'What is the capital of Brazil?',opts:['A. Brasilia','B. Rio de Janeiro','C. Sao Paulo','D. Salvador']},
  {d:'EASY',q:'A: What country are you from? B: I am from Vietnam. I am ___.',opts:['A. Vietnamese','B. Vietnam','C. Vietnamer','D. Vietnamean']},
  {d:'EASY',q:'A: Do you speak French? B: Yes, I ___.',opts:['A. do','B. am','C. speak French language','D. speaks']},
  {d:'MEDIUM',q:'A: Which ocean is the largest? B: The ___ Ocean is the largest.',opts:['A. Pacific','B. Atlantic','C. Indian','D. Arctic']},
  {d:'MEDIUM',q:'A: What is Australia famous for? B: It is famous for the Great Barrier Reef and ___.',opts:['A. kangaroos','B. pandas','C. elephants','D. lions']},
  {d:'HARD',q:'A: What are the effects of deforestation? B: Deforestation causes loss of biodiversity, ___, and climate change.',opts:['A. soil erosion','B. more rainfall','C. cleaner air','D. better farming']},
  {d:'EASY',q:'___ country is famous for sushi?',opts:['A. Which','B. What','C. Where','D. Whose']},
  {d:'EASY',q:'___ do they speak in Brazil?',opts:['A. What language','B. Which language','C. What languages','D. How language']},
  {d:'MEDIUM',q:'___ is the longest river in the world?',opts:['A. Which','B. What','C. Where','D. How']},
  {d:'HARD',q:'___ many countries are there in the world? About 195.',opts:['A. How','B. What','C. Where','D. When']},
  {d:'EASY',q:'We live on planet ___.',opts:['A. Earth','B. Mars','C. Venus','D. Jupiter']},
  {d:'EASY',q:'The ___ is a natural satellite that orbits Earth.',opts:['A. Moon','B. Sun','C. Star','D. Comet']},
  {d:'MEDIUM',q:'The Earth ___ around the sun once a year.',opts:['A. orbits','B. orbit','C. orbiting','D. orbited']},
  {d:'HARD',q:'Scientists believe the Earth is about ___ billion years old.',opts:['A. 4.5','B. 2.5','C. 6.5','D. 10']},
  {d:'EASY',q:'What colour is the Sahara Desert?',opts:['A. yellow/sandy','B. green','C. white','D. blue']},
  {d:'EASY',q:'The Amazon River is in ___.',opts:['A. South America','B. North America','C. Africa','D. Asia']},
  {d:'MEDIUM',q:'The Great Barrier Reef is in ___.',opts:['A. Australia','B. New Zealand','C. Philippines','D. Indonesia']},
  {d:'EASY',q:'We ___ protect wildlife because animals are important for our ecosystem.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'EASY',q:'We ___ drop litter on the streets.',opts:['A. shouldn\'t','B. should','C. must','D. can']},
  {d:'MEDIUM',q:'We ___ use reusable bags instead of plastic bags.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'HARD',q:'Countries ___ cooperate to reduce greenhouse gas emissions.',opts:['A. should','B. shouldn\'t','C. mustn\'t','D. can\'t']},
  {d:'EASY',q:'If we recycle more, we ___ produce less waste.',opts:['A. will','B. would','C. are','D. were']},
  {d:'MEDIUM',q:'If people stop using fossil fuels, the air ___ become cleaner.',opts:['A. will','B. would','C. is','D. was']},
  {d:'HARD',q:'If every country reduces emissions, global temperatures ___ stop rising so fast.',opts:['A. will','B. would','C. are','D. were']},
  {d:'EASY',q:'I come from Vietnam. Vietnam is in ___ Asia.',opts:['A. Southeast','B. East','C. South','D. Central']},
  {d:'MEDIUM',q:'France is in ___ Europe.',opts:['A. Western','B. Eastern','C. Northern','D. Southern']},
  {d:'HARD',q:'The Himalayas are in ___ Asia, on the border of Nepal, India, and China.',opts:['A. Southern','B. Western','C. Eastern','D. Northern']},
  {d:'EASY',q:'What does "flag" mean?',opts:['A. lá cờ quốc gia','B. bản đồ','C. huy chương','D. con dấu']},
  {d:'EASY',q:'What does "capital" mean (in geography)?',opts:['A. thủ đô của một đất nước','B. thành phố lớn nhất','C. thành phố ven biển','D. thành phố công nghiệp']},
  {d:'MEDIUM',q:'What does "climate" mean?',opts:['A. kiểu thời tiết đặc trưng của một vùng','B. thời tiết hôm nay','C. nhiệt độ trung bình','D. lượng mưa hằng năm']},
  {d:'MEDIUM',q:'What does "species" mean?',opts:['A. loài sinh vật','B. loại thực phẩm','C. loại khoáng sản','D. loại khí hậu']},
  {d:'HARD',q:'What does "treaty" mean?',opts:['A. hiệp ước giữa các quốc gia','B. chiến tranh giữa hai nước','C. chính sách thuế quan','D. thỏa thuận thương mại']},
  {d:'EASY',q:'Which of these is a world wonder?',opts:['A. The Great Wall of China','B. The Eiffel Tower in Paris','C. The Statue of Liberty in USA','D. Tower Bridge in London']},
  {d:'MEDIUM',q:'Which of these is the world\'s largest rainforest?',opts:['A. the Amazon','B. the Congo','C. the Daintree','D. the Tongass']},
  {d:'HARD',q:'Which natural wonder is on the border of USA and Canada?',opts:['A. Niagara Falls','B. Grand Canyon','C. Yellowstone','D. Rocky Mountains']},
  {d:'EASY',q:'Asia is the ___ continent in the world.',opts:['A. largest','B. smallest','C. second largest','D. most crowded only']},
  {d:'MEDIUM',q:'The Pacific Ocean is ___ than the Atlantic Ocean.',opts:['A. larger','B. smaller','C. deeper','D. colder']},
  {d:'HARD',q:'Mount Everest is ___ mountain in the world.',opts:['A. the highest','B. the largest','C. the most famous','D. the most visited']},
  {d:'EASY',q:'France is ___ than Vietnam in terms of area.',opts:['A. larger','B. smaller','C. the same size as','D. much smaller']},
  {d:'MEDIUM',q:'China has ___ population than Australia.',opts:['A. a larger','B. a smaller','C. the same','D. a fewer']},
  {d:'EASY',q:'The world has ___ of beautiful places to explore.',opts:['A. lots','B. lot','C. much','D. little']},
  {d:'MEDIUM',q:'There ___ many endangered animals in the world today.',opts:['A. are','B. is','C. was','D. were']},
  {d:'HARD',q:'The number of endangered species ___ growing every year because of habitat loss.',opts:['A. is','B. are','C. was','D. were']},
  {d:'EASY',q:'We ___ to protect the Earth for future generations.',opts:['A. need','B. needs','C. needed','D. needing']},
  {d:'MEDIUM',q:'Every small action ___ a big difference when it comes to saving our planet.',opts:['A. makes','B. make','C. making','D. made']},
  {d:'HARD',q:'It ___ essential that people around the world work together to fight climate change.',opts:['A. is','B. are','C. was','D. were']},
  {d:'EASY',q:'The Earth ___ one Moon.',opts:['A. has','B. have','C. having','D. had']},
  {d:'MEDIUM',q:'Oceans ___ about 71% of the Earth\'s surface.',opts:['A. cover','B. covers','C. covering','D. covered']},
  {d:'HARD',q:'Millions of species ___ in the Amazon Rainforest, including many undiscovered ones.',opts:['A. live','B. lives','C. living','D. lived']},
  {d:'EASY',q:'What does WWF stand for? (The environmental organisation)',opts:['A. World Wildlife Fund','B. World War Foundation','C. World Water Forum','D. World Weather Federation']},
  {d:'MEDIUM',q:'What does UNESCO do?',opts:['A. protects world heritage sites and promotes education','B. manages world trade','C. organises the Olympic Games','D. controls global finance']},
  {d:'HARD',q:'What does "sustainable development" mean?',opts:['A. phát triển đáp ứng nhu cầu hiện tại mà không ảnh hưởng đến tương lai','B. phát triển nhanh chóng bất kể hậu quả','C. chỉ phát triển ở các nước giàu','D. ngừng phát triển để bảo vệ thiên nhiên']},
  {d:'EASY',q:'A: Which country is the Eiffel Tower in? B: It is in ___.',opts:['A. France','B. Germany','C. England','D. Italy']},
  {d:'MEDIUM',q:'A: What language do people speak in Japan? B: They speak ___.',opts:['A. Japanese','B. Korean','C. Chinese','D. Thai']},
  {d:'HARD',q:'A: Why is biodiversity important? B: Because different species ___ a role in maintaining healthy ecosystems.',opts:['A. play','B. plays','C. played','D. playing']},
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
