// 300 câu hỏi Tiếng Anh lớp 7 - bổ sung theo từng chủ đề
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const TOPIC = {
  u1:  'cmt322xj70001eq3ri71h823o', // Unit 1 - My Hobbies
  u2:  'cmt322xjh0003eq3rx7vmrnj9', // Unit 2 - Health
  u3:  'cmt322xjr0005eq3rvok92cgd', // Unit 3 - Community Service
  u4:  'cmt322xjx0007eq3r567dplsb', // Unit 4 - Music and Arts
  u5:  'cmt322xk20009eq3rn4iltiwl', // Unit 5 - Vietnamese Food and Drink
  u6:  'cmt322xk9000beq3rujaraqyx', // Unit 6 - The First University
  u7:  'cmt322xke000deq3rt11zw3hd', // Unit 7 - Traffic
  u8:  'cmt322xkk000feq3rglp3zg7l', // Unit 8 - Films
  u9:  'cmt322xkp000heq3rr6mens45', // Unit 9 - Festivals
  u10: 'cmt322xku000jeq3r7z3k6w6a', // Unit 10 - Sources of Energy
  u11: 'cmt322xkz000leq3r26pfzrny', // Unit 11 - Travelling in the Future
  u12: 'cmt322xl6000neq3ry0xai4py', // Unit 12 - An Overcrowded World
  gr1: 'cmt322xld000peq3ruys0zc2g', // Ngữ pháp - Thì hiện tại
  gr2: 'cmt322xlj000req3rjiceyabc', // Ngữ pháp - Thì quá khứ
  gr3: 'cmt322xlp000teq3rt2st1e45', // Ngữ pháp - Câu điều kiện
  gr4: 'cmt322xlu000veq3rvrb5t91r', // Ngữ pháp - Câu bị động
  gr5: 'cmt322xlz000xeq3rah6q4zdn', // Ngữ pháp - Thì hoàn thành
};

const QUESTIONS = [
  // ─── UNIT 1: My Hobbies (20 câu) ───
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'What is your ___? I love reading books and painting.', options: ['A. hobby', 'B. job', 'C. school', 'D. grade'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'She ___ collecting stamps in her free time.', options: ['A. enjoys', 'B. hates', 'C. refuses', 'D. avoids'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'He spends his ___ time playing chess with his grandfather.', options: ['A. spare', 'B. busy', 'C. work', 'D. school'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'Which hobby helps you stay fit and healthy?', options: ['A. Swimming', 'B. Reading', 'C. Collecting coins', 'D. Drawing'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'I prefer ___ to watching TV because it improves my imagination.', options: ['A. reading books', 'B. sleeping', 'C. eating snacks', 'D. doing nothing'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'Nam ___ (enjoy) gardening every Sunday morning.', options: ['A. enjoys', 'B. enjoy', 'C. enjoyed', 'D. is enjoying'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'Which sentence uses "hate + V-ing" correctly?', options: ['A. She hates doing homework late at night.', 'B. She hates do homework.', 'C. She hate doing homework.', 'D. She is hate doing homework.'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'What does the phrase "killing time" mean?', options: ['A. Doing something to pass the time', 'B. Being very busy', 'C. Working overtime', 'D. Sleeping too long'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'My sister is into ___ – she knits scarves and sweaters.', options: ['A. handicrafts', 'B. hiking', 'C. cycling', 'D. karate'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'They enjoy ___ photos of birds in the forest.', options: ['A. taking', 'B. take', 'C. took', 'D. to take'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'Reading books is a ___ hobby because it costs very little.', options: ['A. cheap', 'B. dangerous', 'C. boring', 'D. difficult'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'I would rather ___ than play video games.', options: ['A. go cycling', 'B. going cycling', 'C. went cycling', 'D. to cycle'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'HARD', content: 'Choose the sentence that best describes a creative hobby.', options: ['A. He paints watercolour pictures every weekend.', 'B. He watches TV every day.', 'C. He sleeps for 10 hours.', 'D. He eats a lot of food.'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'HARD', content: 'Which hobby requires both physical and mental effort?', options: ['A. Playing chess outdoors', 'B. Listening to music', 'C. Watching cartoons', 'D. Reading comics'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'HARD', content: 'What is the benefit of having a hobby according to psychologists?', options: ['A. It reduces stress and improves well-being.', 'B. It wastes time.', 'C. It makes people lazy.', 'D. It costs a lot of money.'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'Drawing and painting are examples of ___ hobbies.', options: ['A. artistic', 'B. sporty', 'C. dangerous', 'D. boring'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'EASY', content: 'Tom loves ___ model planes. He has over 50 of them.', options: ['A. collecting', 'B. collected', 'C. collects', 'D. to collect'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'What does "go in for" mean in the context of hobbies?', options: ['A. To participate in or enjoy an activity', 'B. To stop doing an activity', 'C. To dislike an activity', 'D. To forget an activity'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'MEDIUM', content: 'Anna ___ cooking since she was 8 years old.', options: ['A. has loved', 'B. loves', 'C. loved', 'D. love'], answer: 'A' },
  { topicId: TOPIC.u1, difficulty: 'HARD', content: 'A person who collects stamps as a hobby is called a ___.', options: ['A. philatelist', 'B. cyclist', 'C. gardener', 'D. dancer'], answer: 'A' },

  // ─── UNIT 2: Health (20 câu) ───
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'I have a ___. I should see a dentist.', options: ['A. toothache', 'B. headache', 'C. stomachache', 'D. backache'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'You ___ eat more vegetables and fruit to stay healthy.', options: ['A. should', 'B. shouldn\'t', 'C. mustn\'t', 'D. can\'t'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'He has a ___ and keeps sneezing. He needs to rest.', options: ['A. cold', 'B. fever', 'C. rash', 'D. fracture'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'Eating too much junk food can make you ___.', options: ['A. overweight', 'B. energetic', 'C. healthy', 'D. strong'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'Regular ___ such as jogging keeps your heart healthy.', options: ['A. exercise', 'B. sleeping', 'C. reading', 'D. shopping'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'What is the opposite of "healthy"?', options: ['A. unhealthy', 'B. very healthy', 'C. quite healthy', 'D. most healthy'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'The doctor advised him to ___ smoking immediately.', options: ['A. quit', 'B. enjoy', 'C. start', 'D. like'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'Which food is NOT healthy?', options: ['A. Deep-fried chicken every day', 'B. Fresh salad', 'C. Grilled fish', 'D. Steamed vegetables'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'She feels dizzy and has a high ___. She might have flu.', options: ['A. fever', 'B. appetite', 'C. energy', 'D. mood'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'You ___ stay up too late – it is bad for your health.', options: ['A. shouldn\'t', 'B. should', 'C. must', 'D. can'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'Drinking enough ___ every day helps your body function well.', options: ['A. water', 'B. coffee', 'C. soda', 'D. alcohol'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'What should you do when you have a stomachache?', options: ['A. Rest and drink warm water', 'B. Eat spicy food', 'C. Exercise heavily', 'D. Drink cold juice'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'HARD', content: 'Which habit leads to a BALANCED and healthy lifestyle?', options: ['A. Sleeping 8 hours, eating balanced meals, and exercising', 'B. Eating only meat and sleeping late', 'C. Skipping breakfast and working all day', 'D. Eating fast food and sitting all day'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'HARD', content: 'The prefix "over-" in "overweight" means ___.', options: ['A. too much', 'B. not enough', 'C. very good', 'D. quite healthy'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'HARD', content: 'A balanced ___ includes proteins, carbohydrates, fats, vitamins and minerals.', options: ['A. diet', 'B. game', 'C. sport', 'D. hobby'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'The nurse gave the patient a ___ to reduce the pain.', options: ['A. medicine', 'B. book', 'C. gift', 'D. meal'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'EASY', content: 'You ___ wash your hands before eating to avoid germs.', options: ['A. should', 'B. shouldn\'t', 'C. can\'t', 'D. won\'t'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'What does BMI stand for?', options: ['A. Body Mass Index', 'B. Basic Medical Instruction', 'C. Blood Measurement Index', 'D. Brain Memory Intake'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'MEDIUM', content: 'The ___ told him to take the pills three times a day.', options: ['A. doctor', 'B. driver', 'C. teacher', 'D. librarian'], answer: 'A' },
  { topicId: TOPIC.u2, difficulty: 'HARD', content: 'Which vitamin does sunlight help your body produce?', options: ['A. Vitamin D', 'B. Vitamin C', 'C. Vitamin A', 'D. Vitamin B'], answer: 'A' },

  // ─── UNIT 3: Community Service (20 câu) ───
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'They ___ food and clothes to the flood victims.', options: ['A. donated', 'B. sold', 'C. bought', 'D. destroyed'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'A ___ is someone who works without being paid, to help others.', options: ['A. volunteer', 'B. teacher', 'C. doctor', 'D. banker'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'The students organised a ___ to raise money for homeless children.', options: ['A. charity event', 'B. school trip', 'C. sports day', 'D. birthday party'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'We should ___ the environment by recycling and reducing waste.', options: ['A. protect', 'B. pollute', 'C. destroy', 'D. ignore'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'The community ___ a park clean-up campaign last Saturday.', options: ['A. organised', 'B. cancelled', 'C. ignored', 'D. forgot'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'Which action is an example of community service?', options: ['A. Cleaning the beach with neighbours', 'B. Playing video games alone', 'C. Sleeping in on weekends', 'D. Shopping at the mall'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'They ___ money for orphans by holding a concert.', options: ['A. raised', 'B. spent', 'C. lost', 'D. wasted'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'It is our ___ to keep our neighbourhood clean.', options: ['A. responsibility', 'B. hobby', 'C. problem', 'D. excuse'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'After the flood, hundreds of families became ___.', options: ['A. homeless', 'B. wealthy', 'C. healthy', 'D. famous'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'Planting trees helps reduce air ___ in cities.', options: ['A. pollution', 'B. population', 'C. traffic', 'D. music'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'The Red Cross is an international ___ organisation.', options: ['A. charity', 'B. sport', 'C. music', 'D. science'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'HARD', content: 'What does "going green" mean in community context?', options: ['A. Adopting environmentally friendly practices', 'B. Painting walls green', 'C. Wearing green uniforms', 'D. Eating only vegetables'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'HARD', content: 'The 3Rs of environmental protection stand for ___.', options: ['A. Reduce, Reuse, Recycle', 'B. Read, Run, Rest', 'C. Race, Ride, Repair', 'D. Review, Record, Report'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'HARD', content: 'Choose the BEST example of sustainable community service.', options: ['A. Teaching locals to compost food waste', 'B. Burning rubbish in the street', 'C. Using single-use plastic bags', 'D. Leaving lights on overnight'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'Children in ___ need our support and love.', options: ['A. orphanages', 'B. cinemas', 'C. supermarkets', 'D. stadiums'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'EASY', content: 'We can help the ___ by giving them food and shelter.', options: ['A. homeless', 'B. celebrities', 'C. millionaires', 'D. athletes'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'Separating rubbish into different bins is called ___.', options: ['A. recycling', 'B. cooking', 'C. donating', 'D. collecting'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'MEDIUM', content: 'The villagers worked ___ to rebuild houses after the storm.', options: ['A. together', 'B. alone', 'C. silently', 'D. slowly'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'HARD', content: 'Which word means "a large amount of money collected for a good cause"?', options: ['A. fund', 'B. debt', 'C. expense', 'D. profit'], answer: 'A' },
  { topicId: TOPIC.u3, difficulty: 'HARD', content: '"Pro bono" service means work done ___.', options: ['A. for free to help others', 'B. for a high salary', 'C. by professional athletes', 'D. by government officials'], answer: 'A' },

  // ─── UNIT 4: Music and Arts (20 câu) ───
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'A ___ is a person who writes music.', options: ['A. composer', 'B. painter', 'C. dancer', 'D. sculptor'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'The orchestra ___ a beautiful symphony last night.', options: ['A. performed', 'B. painted', 'C. wrote', 'D. drew'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'She plays the ___, which is a stringed instrument.', options: ['A. violin', 'B. drum', 'C. trumpet', 'D. flute'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'An ___ is a public display of paintings or sculptures.', options: ['A. exhibition', 'B. examination', 'C. expedition', 'D. explanation'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'Folk music is ___ music passed down through generations.', options: ['A. traditional', 'B. modern', 'C. classical', 'D. heavy'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'Van Gogh is famous for his painting "___".', options: ['A. Starry Night', 'B. Mona Lisa', 'C. The Scream', 'D. Water Lilies'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'A ___ leads an orchestra with a baton.', options: ['A. conductor', 'B. composer', 'C. sculptor', 'D. guitarist'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'The ___ is a keyboard instrument with black and white keys.', options: ['A. piano', 'B. guitar', 'C. harp', 'D. cello'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'Which type of music uses traditional instruments like đàn bầu?', options: ['A. Vietnamese folk music', 'B. Jazz', 'C. Pop', 'D. Hip-hop'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'A ___ creates three-dimensional artworks by carving or moulding.', options: ['A. sculptor', 'B. singer', 'C. composer', 'D. conductor'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'The Louvre Museum in Paris is famous for housing great ___.', options: ['A. artworks', 'B. food', 'C. athletes', 'D. technology'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'Beethoven was a famous ___ who composed 9 symphonies.', options: ['A. composer', 'B. painter', 'C. sculptor', 'D. actor'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'HARD', content: 'What is the main difference between a concert and a recital?', options: ['A. A recital usually features a solo or small group; a concert is larger', 'B. A concert is for one person only', 'C. A recital is always outdoors', 'D. They are exactly the same'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'HARD', content: 'Impressionism is a style of ___ that focuses on light and colour.', options: ['A. painting', 'B. music', 'C. dancing', 'D. acting'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'HARD', content: 'Which Vietnamese traditional art form uses water as a stage?', options: ['A. Water puppetry', 'B. Shadow puppetry', 'C. Ballet', 'D. Opera'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'He plays the ___ in the school band every Friday.', options: ['A. guitar', 'B. pencil', 'C. ruler', 'D. book'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'EASY', content: 'The art ___ displayed over 200 paintings by local artists.', options: ['A. gallery', 'B. library', 'C. stadium', 'D. hospital'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'MEDIUM', content: 'A ___ song is one that tells a story about daily life and is passed down orally.', options: ['A. folk', 'B. pop', 'C. jazz', 'D. rock'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'HARD', content: 'The term "Renaissance" in art refers to a period of great ___ revival in Europe.', options: ['A. cultural', 'B. sports', 'C. political', 'D. agricultural'], answer: 'A' },
  { topicId: TOPIC.u4, difficulty: 'HARD', content: 'Which word means "to create an original piece of music"?', options: ['A. compose', 'B. perform', 'C. listen', 'D. record'], answer: 'A' },

  // ─── UNIT 5: Vietnamese Food and Drink (18 câu) ───
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'Phở is a traditional Vietnamese ___ made with broth and rice noodles.', options: ['A. soup', 'B. dessert', 'C. salad', 'D. sandwich'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'Bánh mì is a Vietnamese ___ filled with meat and vegetables.', options: ['A. baguette sandwich', 'B. rice cake', 'C. noodle soup', 'D. sticky rice'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'Rice is the main ___ food in Vietnam.', options: ['A. staple', 'B. dessert', 'C. snack', 'D. beverage'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'This dish tastes ___. It has too much chilli!', options: ['A. spicy', 'B. sweet', 'C. sour', 'D. bitter'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'Chè is a Vietnamese ___ made with sweetened beans or fruits.', options: ['A. dessert', 'B. main dish', 'C. soup', 'D. sauce'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'Which herb is commonly used in phở to add fragrance?', options: ['A. Basil', 'B. Rosemary', 'C. Thyme', 'D. Oregano'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'Vietnamese people traditionally eat with ___ instead of forks.', options: ['A. chopsticks', 'B. spoons', 'C. knives', 'D. hands'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'Fish sauce is an essential ___ in Vietnamese cooking.', options: ['A. ingredient', 'B. dessert', 'C. beverage', 'D. snack'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'Gỏi cuốn is a Vietnamese ___ roll wrapped in rice paper.', options: ['A. fresh spring', 'B. fried spring', 'C. baked spring', 'D. steamed spring'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'What makes bún bò Huế different from phở?', options: ['A. It is spicier and uses lemongrass', 'B. It is sweeter', 'C. It uses wheat noodles', 'D. It has no broth'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'HARD', content: 'The Michelin Guide listed phở as one of the world\'s ___ dishes.', options: ['A. iconic', 'B. forgettable', 'C. strange', 'D. complicated'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'HARD', content: 'Fermentation is used to make ___, a Vietnamese preserved fish paste.', options: ['A. mắm', 'B. phở', 'C. bánh mì', 'D. chè'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'Street food is very popular in Vietnam because it is cheap and ___.', options: ['A. delicious', 'B. expensive', 'C. bland', 'D. difficult to find'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'EASY', content: 'Cà phê trứng (egg coffee) is a famous ___ from Hanoi.', options: ['A. beverage', 'B. dessert', 'C. soup', 'D. main dish'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'The flavour of this soup is ___ because of the tamarind used.', options: ['A. sour', 'B. sweet', 'C. salty', 'D. spicy'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'MEDIUM', content: 'A good ___ needs fresh ingredients and the right seasoning.', options: ['A. recipe', 'B. exercise', 'C. festival', 'D. hobby'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'HARD', content: 'Hội An is famous for which local dish?', options: ['A. Cao lầu', 'B. Bánh xèo', 'C. Bún bò Huế', 'D. Phở Hà Nội'], answer: 'A' },
  { topicId: TOPIC.u5, difficulty: 'HARD', content: '"Farm to table" cooking means using ___ ingredients.', options: ['A. locally grown, fresh', 'B. imported, frozen', 'C. canned, processed', 'D. artificial, flavoured'], answer: 'A' },

  // ─── UNIT 6: The First University (18 câu) ───
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'Văn Miếu – Quốc Tử Giám was built in ___.', options: ['A. 1070', 'B. 1975', 'C. 1800', 'D. 1945'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'Quốc Tử Giám is considered Vietnam\'s first ___.', options: ['A. university', 'B. hospital', 'C. market', 'D. palace'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'The stone ___ at Văn Miếu record the names of doctoral graduates.', options: ['A. steles', 'B. books', 'C. paintings', 'D. statues'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'Confucius was a famous Chinese ___ and philosopher.', options: ['A. scholar', 'B. warrior', 'C. merchant', 'D. artist'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'Under which king was Văn Miếu built?', options: ['A. King Lý Thánh Tông', 'B. King Đinh Tiên Hoàng', 'C. King Lê Lợi', 'D. King Trần Nhân Tông'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'Ancient Vietnamese students ___ on bamboo or paper to take notes.', options: ['A. wrote', 'B. drew', 'C. painted', 'D. carved'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'The first royal examination in Vietnam was held in ___.', options: ['A. 1075', 'B. 1000', 'C. 1200', 'D. 1945'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'Students who passed the highest exam were called ___.', options: ['A. doctoral graduates', 'B. military officers', 'C. merchants', 'D. farmers'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'Văn Miếu is dedicated to ___, the founder of Confucianism.', options: ['A. Confucius', 'B. Buddha', 'C. Lao Tzu', 'D. Sun Tzu'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'Touching the ___ turtles at Văn Miếu is believed to bring good luck in exams.', options: ['A. stone', 'B. golden', 'C. wooden', 'D. bronze'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'HARD', content: 'The 82 stone steles at Văn Miếu were recognised as a UNESCO ___.', options: ['A. Memory of the World', 'B. World Heritage Site', 'C. Cultural Festival', 'D. Science Award'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'HARD', content: 'The Lý dynasty promoted Confucianism to ___ society.', options: ['A. educate and organise', 'B. entertain', 'C. expand trade in', 'D. militarise'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'HARD', content: 'Which subject was NOT traditionally taught at Quốc Tử Giám?', options: ['A. Modern physics', 'B. Confucian classics', 'C. Poetry', 'D. History'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'A ___ is a person with great knowledge who has studied for many years.', options: ['A. scholar', 'B. athlete', 'C. musician', 'D. trader'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'EASY', content: 'Văn Miếu is located in the capital city of Vietnam, ___.', options: ['A. Hanoi', 'B. Ho Chi Minh City', 'C. Da Nang', 'D. Hue'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'MEDIUM', content: 'The word "___ dynasty" refers to a series of rulers from one family.', options: ['A. royal', 'B. modern', 'C. student', 'D. enemy'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'HARD', content: 'How many stone steles are currently preserved at Văn Miếu?', options: ['A. 82', 'B. 100', 'C. 50', 'D. 200'], answer: 'A' },
  { topicId: TOPIC.u6, difficulty: 'HARD', content: 'The ___ exam system was used to select talented officials for the government.', options: ['A. civil service', 'B. sports', 'C. artistic', 'D. military'], answer: 'A' },

  // ─── UNIT 7: Traffic (20 câu) ───
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'You must stop when the traffic light is ___.', options: ['A. red', 'B. green', 'C. yellow', 'D. blue'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'Always wear a ___ when riding a motorbike.', options: ['A. helmet', 'B. scarf', 'C. hat', 'D. glove'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'Pedestrians should use ___ crossings to cross the road safely.', options: ['A. zebra', 'B. tiger', 'C. car', 'D. bus'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'The ___ limit on this road is 50 km/h.', options: ['A. speed', 'B. weight', 'C. height', 'D. temperature'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'A ___ is used to direct traffic at a busy intersection.', options: ['A. traffic light', 'B. road sign', 'C. speed bump', 'D. roundabout'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'Rush hour is the time when ___ is heaviest.', options: ['A. traffic', 'B. rain', 'C. wind', 'D. noise'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'You can be ___ if you drive through a red light.', options: ['A. fined', 'B. praised', 'C. awarded', 'D. promoted'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'A ___ is a circular junction where traffic flows around a central island.', options: ['A. roundabout', 'B. flyover', 'C. highway', 'D. crossroads'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'Drunk driving is extremely ___ and illegal.', options: ['A. dangerous', 'B. safe', 'C. legal', 'D. helpful'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'The ___ belt should always be fastened when in a car.', options: ['A. seat', 'B. shoe', 'C. wrist', 'D. chest'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'A ___ is a bridge that carries one road over another.', options: ['A. flyover', 'B. roundabout', 'C. crossroads', 'D. lane'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'Which vehicle is best for the environment in cities?', options: ['A. Bicycle', 'B. Motorbike', 'C. Petrol car', 'D. Truck'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'HARD', content: 'What is the main cause of traffic congestion in big cities?', options: ['A. Too many private vehicles and inadequate roads', 'B. Too few traffic lights', 'C. Wide roads with few cars', 'D. Good public transport'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'HARD', content: 'An "accident black spot" is a place where ___.', options: ['A. accidents happen frequently', 'B. traffic is always smooth', 'C. speed limits are highest', 'D. roads are widest'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'HARD', content: 'Which measure BEST reduces traffic accidents among students?', options: ['A. Teaching road safety from an early age', 'B. Banning all motorbikes', 'C. Removing traffic lights', 'D. Widening all pavements'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'Cyclists should always ride on the ___ side of the road.', options: ['A. left', 'B. middle', 'C. right', 'D. wrong'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'EASY', content: 'A ___ sign tells drivers the maximum speed allowed.', options: ['A. speed limit', 'B. stop', 'C. no parking', 'D. one-way'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'MEDIUM', content: 'She looked both ___ before crossing the road.', options: ['A. ways', 'B. lights', 'C. lanes', 'D. streets'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'HARD', content: 'Public transport helps reduce ___ and air pollution in cities.', options: ['A. traffic congestion', 'B. electricity usage', 'C. water consumption', 'D. noise from schools'], answer: 'A' },
  { topicId: TOPIC.u7, difficulty: 'HARD', content: 'What does a white diamond shape painted on the road indicate?', options: ['A. A pedestrian crossing ahead', 'B. A school zone', 'C. A parking area', 'D. A bus stop'], answer: 'A' },

  // ─── UNIT 8: Films (18 câu) ───
  { topicId: TOPIC.u8, difficulty: 'EASY', content: 'A ___ film makes the audience laugh.', options: ['A. comedy', 'B. horror', 'C. documentary', 'D. thriller'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'EASY', content: 'The ___ directed the film and led the cast and crew.', options: ['A. director', 'B. actor', 'C. producer', 'D. editor'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'EASY', content: 'The film won an ___ Award for Best Picture.', options: ['A. Oscar', 'B. Olympic', 'C. Emmy', 'D. Tony'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'EASY', content: 'An ___ film uses drawn or computer-generated characters.', options: ['A. animated', 'B. action', 'C. romantic', 'D. historical'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'The ___ is the music composed specifically for a film.', options: ['A. soundtrack', 'B. script', 'C. trailer', 'D. poster'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'A ___ film presents real events and real people, not fictional characters.', options: ['A. documentary', 'B. comedy', 'C. animation', 'D. horror'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'The ___ is the list of all actors and crew who worked on the film.', options: ['A. cast', 'B. plot', 'C. scene', 'D. review'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'I think this film is ___ – it is not as good as the critics say.', options: ['A. overrated', 'B. underrated', 'C. spectacular', 'D. brilliant'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'The ___ effects in the sci-fi film looked very realistic.', options: ['A. special', 'B. sound', 'C. lighting', 'D. camera'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'A film ___ is a short preview that shows highlights to attract viewers.', options: ['A. trailer', 'B. poster', 'C. review', 'D. script'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'HARD', content: 'Which type of film is MOST likely to feature supernatural creatures?', options: ['A. Horror', 'B. Documentary', 'C. Romance', 'D. Biography'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'HARD', content: 'A film that won a Palme d\'Or received the top award at the ___ Film Festival.', options: ['A. Cannes', 'B. Sundance', 'C. Berlin', 'D. Venice'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'HARD', content: 'The Bechdel Test measures whether a film includes ___.', options: ['A. meaningful female characters talking about something other than men', 'B. an award-winning director', 'C. a happy ending', 'D. real historical events'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'EASY', content: 'She is the main ___ in the film — she plays the hero.', options: ['A. actress', 'B. director', 'C. producer', 'D. editor'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'The ___ of the film was confusing — I couldn\'t follow the story.', options: ['A. plot', 'B. poster', 'C. trailer', 'D. music'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'MEDIUM', content: 'The film was ___ for three Academy Awards but won none.', options: ['A. nominated', 'B. directed', 'C. produced', 'D. filmed'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'HARD', content: 'CGI stands for ___, a technology used to create digital visual effects.', options: ['A. Computer-Generated Imagery', 'B. Camera Graphics Interface', 'C. Creative Global Images', 'D. Cinema Graphics International'], answer: 'A' },
  { topicId: TOPIC.u8, difficulty: 'HARD', content: 'What does a film "sequel" mean?', options: ['A. A follow-up story to an original film', 'B. A remake of a classic film', 'C. A foreign language film', 'D. A short film'], answer: 'A' },

  // ─── UNIT 9: Festivals (18 câu) ───
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'Tết is Vietnam\'s most important ___ festival.', options: ['A. lunar new year', 'B. harvest', 'C. water', 'D. music'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'People ___ fireworks to mark the new year.', options: ['A. set off', 'B. set up', 'C. set in', 'D. set on'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'The Mid-Autumn Festival is famous for ___ lanterns and mooncakes.', options: ['A. colourful', 'B. dangerous', 'C. boring', 'D. heavy'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'At Diwali, people light oil lamps to ___ the victory of light over darkness.', options: ['A. celebrate', 'B. forget', 'C. prevent', 'D. avoid'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'Carnival in Brazil is famous for its colourful ___ and samba dancing.', options: ['A. costumes', 'B. food', 'C. temples', 'D. rivers'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'Songkran is the water festival celebrated in ___.', options: ['A. Thailand', 'B. Japan', 'C. India', 'D. China'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'The Harvest Festival is celebrated to give thanks for a good ___.', options: ['A. crop', 'B. concert', 'C. match', 'D. film'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'A ___ is a procession of people in costumes walking through streets.', options: ['A. parade', 'B. concert', 'C. lecture', 'D. ceremony'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'The Loi Krathong festival in Thailand involves floating decorated ___ on water.', options: ['A. baskets', 'B. boats', 'C. lanterns', 'D. candles'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'Which word means "a long-established custom or belief"?', options: ['A. tradition', 'B. technology', 'C. transport', 'D. traffic'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'HARD', content: 'What is the cultural significance of the Hội An Lantern Festival?', options: ['A. It honours ancestors and brings peace and prosperity', 'B. It marks the end of the school year', 'C. It celebrates a military victory', 'D. It introduces new technology'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'HARD', content: 'The word "annual" in "annual festival" means ___.', options: ['A. happening once a year', 'B. lasting all year', 'C. celebrated twice a year', 'D. held every five years'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'HARD', content: 'Which Vietnamese festival features lion and dragon dances?', options: ['A. Tết Nguyên Đán', 'B. Hội Lim', 'C. Hội Gióng', 'D. Lễ Vu Lan'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'At Tết, Vietnamese children receive lucky money in red ___.', options: ['A. envelopes', 'B. boxes', 'C. bags', 'D. bottles'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'EASY', content: 'People wear traditional ___ during cultural festivals.', options: ['A. costumes', 'B. uniforms', 'C. sports kits', 'D. raincoats'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'MEDIUM', content: 'The Moon Festival is also called the ___ Festival.', options: ['A. Mid-Autumn', 'B. Spring', 'C. Winter', 'D. Harvest'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'HARD', content: '"Intangible cultural heritage" refers to traditions that are ___.', options: ['A. non-physical, like music, dance, and festivals', 'B. ancient buildings', 'C. written documents', 'D. archaeological artefacts'], answer: 'A' },
  { topicId: TOPIC.u9, difficulty: 'HARD', content: 'Diwali is primarily celebrated by which religion?', options: ['A. Hinduism', 'B. Buddhism', 'C. Christianity', 'D. Islam'], answer: 'A' },

  // ─── UNIT 10: Sources of Energy (18 câu) ───
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'Solar panels convert ___ energy into electricity.', options: ['A. sunlight', 'B. wind', 'C. water', 'D. nuclear'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'Coal, oil and gas are examples of ___ fuels.', options: ['A. fossil', 'B. renewable', 'C. solar', 'D. nuclear'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'Wind ___ use wind to generate electricity.', options: ['A. turbines', 'B. panels', 'C. dams', 'D. pumps'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'Renewable energy sources will ___ run out.', options: ['A. never', 'B. soon', 'C. always', 'D. quickly'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'A hydroelectric dam uses ___ to generate power.', options: ['A. flowing water', 'B. sunlight', 'C. wind', 'D. nuclear reaction'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'Burning fossil fuels releases ___ dioxide, causing climate change.', options: ['A. carbon', 'B. oxygen', 'C. hydrogen', 'D. nitrogen'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'The ___ effect causes the Earth\'s temperature to rise.', options: ['A. greenhouse', 'B. solar', 'C. wind', 'D. nuclear'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'Which of these is a renewable energy source?', options: ['A. Solar energy', 'B. Coal', 'C. Natural gas', 'D. Petroleum'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'Nuclear energy is produced by ___ atoms.', options: ['A. splitting', 'B. burning', 'C. freezing', 'D. painting'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'We should turn off lights when not needed to save ___.', options: ['A. electricity', 'B. water', 'C. food', 'D. money'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'HARD', content: 'The term "carbon footprint" refers to the amount of ___ released by an individual or activity.', options: ['A. carbon dioxide', 'B. oxygen', 'C. nitrogen', 'D. water vapour'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'HARD', content: 'Geothermal energy comes from ___ inside the Earth.', options: ['A. heat', 'B. water', 'C. wind', 'D. sunlight'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'HARD', content: 'Which country generates the most electricity from wind power?', options: ['A. China', 'B. Australia', 'C. Brazil', 'D. India'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'Saving energy is good for both the ___ and our wallet.', options: ['A. environment', 'B. festival', 'C. traffic', 'D. hobby'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'EASY', content: 'A ___ is built across a river to store water and generate electricity.', options: ['A. dam', 'B. bridge', 'C. tunnel', 'D. tower'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'MEDIUM', content: 'Fossil fuels are non-renewable because they take ___ of years to form.', options: ['A. millions', 'B. hundreds', 'C. thousands', 'D. dozens'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'HARD', content: 'Energy efficiency means using ___ energy to do the same amount of work.', options: ['A. less', 'B. more', 'C. no', 'D. unlimited'], answer: 'A' },
  { topicId: TOPIC.u10, difficulty: 'HARD', content: 'The Paris Agreement aims to limit global warming to ___ degrees Celsius above pre-industrial levels.', options: ['A. 1.5', 'B. 3.0', 'C. 5.0', 'D. 0.5'], answer: 'A' },

  // ─── UNIT 11: Travelling in the Future (17 câu) ───
  { topicId: TOPIC.u11, difficulty: 'EASY', content: 'In the future, people may travel in ___ cars that need no driver.', options: ['A. self-driving', 'B. old-fashioned', 'C. broken', 'D. paper'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'EASY', content: 'Electric ___ produce less pollution than petrol cars.', options: ['A. cars', 'B. boats', 'C. planes', 'D. trains'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'EASY', content: 'A ___ train uses magnetic force to travel at very high speed.', options: ['A. maglev', 'B. steam', 'C. diesel', 'D. solar'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'The Hyperloop is a futuristic transport system that travels in a ___.', options: ['A. tube at high speed', 'B. river', 'C. tunnel underground', 'D. cable in the air'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'A ___ is a vehicle that can fly above the ground like a helicopter.', options: ['A. hovercraft', 'B. submarine', 'C. tram', 'D. ferry'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'In the future, ___ may be used to deliver packages to your door.', options: ['A. drones', 'B. horses', 'C. bicycles', 'D. canoes'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'Space tourism will allow ordinary people to ___ into space.', options: ['A. travel', 'B. swim', 'C. walk', 'D. dive'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'Self-driving cars use ___ intelligence to navigate roads.', options: ['A. artificial', 'B. human', 'C. animal', 'D. plant'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'HARD', content: 'The main advantage of a maglev train over a regular train is ___.', options: ['A. It has less friction and can reach much higher speeds', 'B. It is cheaper to build', 'C. It runs on petrol', 'D. It requires no electricity'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'HARD', content: 'What does "autonomous vehicle" mean?', options: ['A. A vehicle that drives itself without human input', 'B. A very old vehicle', 'C. A vehicle powered by animals', 'D. A very small vehicle'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'HARD', content: 'Which company launched the first private rocket into space?', options: ['A. SpaceX', 'B. NASA', 'C. Toyota', 'D. Boeing'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'EASY', content: 'Future vehicles will run on clean ___ instead of petrol.', options: ['A. energy', 'B. water', 'C. wood', 'D. sand'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'A flying car must be able to both drive on roads and ___ in the air.', options: ['A. fly', 'B. swim', 'C. dig', 'D. float'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'MEDIUM', content: 'Public ___ of the future will be faster, cheaper and more eco-friendly.', options: ['A. transport', 'B. entertainment', 'C. food', 'D. housing'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'HARD', content: 'Hyperloop technology was first proposed by entrepreneur ___.', options: ['A. Elon Musk', 'B. Bill Gates', 'C. Mark Zuckerberg', 'D. Jeff Bezos'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'EASY', content: 'Solar-powered ___ could one day carry passengers across cities silently.', options: ['A. planes', 'B. horses', 'C. canoes', 'D. carts'], answer: 'A' },
  { topicId: TOPIC.u11, difficulty: 'HARD', content: 'What is the main environmental benefit of electric vehicles?', options: ['A. They produce zero direct emissions', 'B. They are faster than petrol cars', 'C. They are cheaper to buy', 'D. They need no charging'], answer: 'A' },

  // ─── UNIT 12: An Overcrowded World (17 câu) ───
  { topicId: TOPIC.u12, difficulty: 'EASY', content: 'The world\'s ___ is growing rapidly, reaching 8 billion people.', options: ['A. population', 'B. area', 'C. forest', 'D. income'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'EASY', content: 'Many people move from the countryside to cities. This is called ___.', options: ['A. urbanisation', 'B. farming', 'C. education', 'D. tourism'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'EASY', content: 'Overcrowded cities face problems like ___ and lack of housing.', options: ['A. congestion', 'B. clean air', 'C. empty roads', 'D. low prices'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'EASY', content: 'A ___ is a very large city with more than 10 million people.', options: ['A. megacity', 'B. village', 'C. town', 'D. district'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'Rural areas often lack hospitals and schools, causing people to ___ to cities.', options: ['A. migrate', 'B. return', 'C. stay', 'D. hide'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'Population ___ refers to the number of people per square kilometre.', options: ['A. density', 'B. growth', 'C. decline', 'D. movement'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'As cities grow, natural resources may ___ out.', options: ['A. run', 'B. go', 'C. come', 'D. fall'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'Which is a problem caused by rapid urbanisation?', options: ['A. Increased pollution and housing shortages', 'B. More farmland', 'C. Cleaner rivers', 'D. Less traffic'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'Developing countries often have ___ population growth rates than developed ones.', options: ['A. higher', 'B. lower', 'C. equal', 'D. negative'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: 'The opposite of "overcrowded" is ___.', options: ['A. underpopulated', 'B. overpopulated', 'C. highly populated', 'D. densely packed'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'HARD', content: 'What does "sustainable urban development" aim to achieve?', options: ['A. Growing cities in a way that meets current needs without harming future generations', 'B. Building as many skyscrapers as possible', 'C. Moving all people to rural areas', 'D. Stopping all migration'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'HARD', content: 'Tokyo, Delhi, and Shanghai are examples of ___ with populations over 20 million.', options: ['A. megacities', 'B. small towns', 'C. villages', 'D. suburbs'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'HARD', content: 'The demographic transition model shows that birth rates ___ as countries develop economically.', options: ['A. decrease', 'B. increase', 'C. stay the same', 'D. double'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'EASY', content: 'A city with too many people and not enough space is called ___.', options: ['A. overcrowded', 'B. empty', 'C. peaceful', 'D. organised'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'MEDIUM', content: '"Push factors" that cause people to leave rural areas include ___.', options: ['A. lack of jobs and poor services', 'B. better schools and hospitals', 'C. higher wages', 'D. cultural activities'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'HARD', content: 'Which strategy can help manage overpopulation in cities?', options: ['A. Developing satellite towns and improving rural infrastructure', 'B. Closing all factories', 'C. Banning immigration', 'D. Building higher walls'], answer: 'A' },
  { topicId: TOPIC.u12, difficulty: 'HARD', content: 'The UN predicts the global population will reach ___ billion by 2050.', options: ['A. 9.7', 'B. 7.0', 'C. 5.0', 'D. 12.0'], answer: 'A' },

  // ─── NGỮ PHÁP: Thì hiện tại (15 câu) ───
  { topicId: TOPIC.gr1, difficulty: 'EASY', content: 'She ___ to school every day by bicycle.', options: ['A. goes', 'B. go', 'C. going', 'D. went'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'EASY', content: 'Look! The children ___ in the garden now.', options: ['A. are playing', 'B. play', 'C. played', 'D. plays'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'EASY', content: 'Water ___ at 100 degrees Celsius.', options: ['A. boils', 'B. boil', 'C. is boiling', 'D. boiled'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'He ___ his homework right now, so please be quiet.', options: ['A. is doing', 'B. does', 'C. did', 'D. do'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'They ___ always watch TV after dinner. (add adverb of frequency)', options: ['A. always watch', 'B. watch always', 'C. always watching', 'D. always watched'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'Which sentence is in the present continuous tense?', options: ['A. She is reading a novel.', 'B. She reads a novel.', 'C. She read a novel.', 'D. She has read a novel.'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'My father ___ (usually / read) the newspaper in the morning.', options: ['A. usually reads', 'B. is usually reading', 'C. usually read', 'D. usually reading'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'Listen! Someone ___ at the door.', options: ['A. is knocking', 'B. knocks', 'C. knocked', 'D. knock'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'HARD', content: 'Which stative verb CANNOT be used in the continuous tense?', options: ['A. believe', 'B. run', 'C. eat', 'D. play'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'HARD', content: 'He ___ his cousin who lives in France every summer. (visit)', options: ['A. visits', 'B. is visiting', 'C. visited', 'D. has visited'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'EASY', content: 'I ___ (not / like) eating raw fish.', options: ['A. don\'t like', 'B. doesn\'t like', 'C. isn\'t liking', 'D. didn\'t like'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'EASY', content: '___  you understand the lesson? (Do / Does / Are / Is)', options: ['A. Do', 'B. Does', 'C. Are', 'D. Is'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'MEDIUM', content: 'The present simple is used for ___.', options: ['A. habits, facts, and routines', 'B. actions happening now', 'C. future arrangements only', 'D. actions in the past'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'HARD', content: 'Complete: "She ___ (study) for her exam at the moment."', options: ['A. is studying', 'B. studies', 'C. studied', 'D. has studied'], answer: 'A' },
  { topicId: TOPIC.gr1, difficulty: 'HARD', content: 'Which time expression is typically used with the present continuous?', options: ['A. right now', 'B. every day', 'C. yesterday', 'D. last week'], answer: 'A' },

  // ─── NGỮ PHÁP: Thì quá khứ (15 câu) ───
  { topicId: TOPIC.gr2, difficulty: 'EASY', content: 'She ___ to London last year.', options: ['A. went', 'B. go', 'C. goes', 'D. going'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'EASY', content: 'They ___ dinner when the phone rang.', options: ['A. were having', 'B. have', 'C. had', 'D. are having'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'EASY', content: 'I ___ the film twice last month.', options: ['A. watched', 'B. watch', 'C. watching', 'D. watches'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: 'While she ___ a book, her brother ___ TV.', options: ['A. was reading / was watching', 'B. read / watched', 'C. reads / watches', 'D. is reading / is watching'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: 'He ___ his keys, so he couldn\'t enter the house.', options: ['A. lost', 'B. lose', 'C. loses', 'D. losing'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: 'The past continuous describes an action that was ___ at a specific time in the past.', options: ['A. in progress', 'B. completed', 'C. repeated', 'D. habitual'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: 'She ___ in the library when I saw her.', options: ['A. was studying', 'B. studied', 'C. studies', 'D. is studying'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: 'The fire ___ while the family was sleeping.', options: ['A. started', 'B. starts', 'C. starting', 'D. start'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'HARD', content: 'Which sentence correctly uses the past simple and past continuous together?', options: ['A. I was walking home when it started to rain.', 'B. I was walking home when it is raining.', 'C. I walked home when it was rained.', 'D. I walk home when it starts raining.'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'HARD', content: 'The irregular past form of "buy" is ___.', options: ['A. bought', 'B. buyed', 'C. buys', 'D. buying'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'EASY', content: 'He ___ (not / go) to school yesterday because he was sick.', options: ['A. didn\'t go', 'B. doesn\'t go', 'C. wasn\'t go', 'D. not go'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'EASY', content: '___ you study last night? – Yes, I did.', options: ['A. Did', 'B. Were', 'C. Do', 'D. Have'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'MEDIUM', content: '"Used to + V" describes something that ___ in the past but no longer does.', options: ['A. happened regularly', 'B. is happening now', 'C. will happen soon', 'D. has never happened'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'HARD', content: 'Rewrite using past continuous: "The boys played football when it rained."', options: ['A. The boys were playing football when it rained.', 'B. The boys play football when it was raining.', 'C. The boys played football when it was raining.', 'D. The boys were playing football when it was raining.'], answer: 'A' },
  { topicId: TOPIC.gr2, difficulty: 'HARD', content: 'Which time expression indicates the past simple tense?', options: ['A. three days ago', 'B. since 2020', 'C. right now', 'D. already'], answer: 'A' },

  // ─── NGỮ PHÁP: Câu điều kiện (15 câu) ───
  { topicId: TOPIC.gr3, difficulty: 'EASY', content: 'If it ___, we will cancel the trip.', options: ['A. rains', 'B. rain', 'C. rained', 'D. is rain'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'EASY', content: 'If I ___ rich, I would travel around the world.', options: ['A. were', 'B. am', 'C. will be', 'D. be'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'EASY', content: 'Type 1 conditional is used to talk about ___ situations.', options: ['A. real / possible future', 'B. imaginary present', 'C. impossible past', 'D. historical facts'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'If you study hard, you ___ pass the exam.', options: ['A. will', 'B. would', 'C. should', 'D. might have'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'If I ___ a bird, I would fly south every winter. (Type 2)', options: ['A. were', 'B. am', 'C. will be', 'D. have been'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'Complete: "If she doesn\'t hurry, she ___ the bus."', options: ['A. will miss', 'B. would miss', 'C. misses', 'D. missed'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'Which is a Type 2 conditional sentence?', options: ['A. If I had more time, I would learn guitar.', 'B. If it rains, I will stay home.', 'C. If he studied, he passes.', 'D. If they come, we will celebrate.'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'In a Type 1 conditional, the "if" clause uses ___.', options: ['A. present simple', 'B. past simple', 'C. future simple', 'D. present perfect'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'HARD', content: '"Unless" in a conditional sentence means ___.', options: ['A. if not', 'B. even if', 'C. because', 'D. although'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'HARD', content: 'Which sentence uses "unless" correctly?', options: ['A. Unless you hurry, you will be late.', 'B. Unless you hurry, you would be late.', 'C. Unless you will hurry, you are late.', 'D. Unless you hurried, you are late.'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'EASY', content: 'If the weather is nice, we ___ go to the beach.', options: ['A. will', 'B. would', 'C. were', 'D. have'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'EASY', content: 'If she ___ harder, she would get better grades. (Type 2)', options: ['A. studied', 'B. studies', 'C. will study', 'D. is studying'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'MEDIUM', content: 'What happens in the main clause of a Type 1 conditional?', options: ['A. Future simple (will + V)', 'B. Past simple', 'C. Present simple', 'D. Would + V'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'HARD', content: 'Identify the conditional type: "If water freezes, it expands."', options: ['A. Zero conditional (general truth)', 'B. Type 1', 'C. Type 2', 'D. Mixed conditional'], answer: 'A' },
  { topicId: TOPIC.gr3, difficulty: 'HARD', content: 'Choose the correct sentence: "If he ___ (be) taller, he would be a basketball player."', options: ['A. were', 'B. is', 'C. will be', 'D. has been'], answer: 'A' },

  // ─── NGỮ PHÁP: Câu bị động (15 câu) ───
  { topicId: TOPIC.gr4, difficulty: 'EASY', content: 'English ___ all over the world.', options: ['A. is spoken', 'B. speak', 'C. speaks', 'D. is speak'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'EASY', content: 'This book ___ by a famous author last year.', options: ['A. was written', 'B. wrote', 'C. is written', 'D. writes'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'EASY', content: 'The passive voice is formed with ___ + past participle.', options: ['A. to be', 'B. to do', 'C. to have', 'D. to go'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'The new bridge ___ next year. (future passive)', options: ['A. will be built', 'B. will build', 'C. is built', 'D. was built'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'Change to passive: "People speak Vietnamese in Vietnam."', options: ['A. Vietnamese is spoken in Vietnam.', 'B. Vietnamese speaks in Vietnam.', 'C. In Vietnam is spoken Vietnamese.', 'D. Vietnamese was spoken in Vietnam.'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'The film ___ in 2022. It was very popular. (produce)', options: ['A. was produced', 'B. produced', 'C. is produced', 'D. produces'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'Many trees ___ destroyed by the storm last night.', options: ['A. were', 'B. are', 'C. will be', 'D. have'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'In passive sentences, "by" is used to introduce ___.', options: ['A. the agent (who does the action)', 'B. the time of the action', 'C. the place of the action', 'D. the reason for the action'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'HARD', content: 'Which sentence is in the passive voice?', options: ['A. The report was presented by the manager.', 'B. The manager presented the report.', 'C. The manager was presenting the report.', 'D. The manager presents the report.'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'HARD', content: 'Convert to active: "The homework was not done by the students."', options: ['A. The students did not do the homework.', 'B. The homework does not do the students.', 'C. The students were not doing the homework.', 'D. Homework was not done.'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'EASY', content: 'Rice ___ in many Asian countries.', options: ['A. is grown', 'B. grows', 'C. grew', 'D. grow'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'EASY', content: 'The windows ___ cleaned yesterday morning.', options: ['A. were', 'B. are', 'C. will be', 'D. is'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'MEDIUM', content: 'The cake ___ (eat) by the time the guests arrived.', options: ['A. had been eaten', 'B. was eaten', 'C. is eaten', 'D. will be eaten'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'HARD', content: 'Passive: "Scientists have discovered a new planet." →', options: ['A. A new planet has been discovered by scientists.', 'B. A new planet was discovered by scientists.', 'C. A new planet is discovered by scientists.', 'D. Scientists are discovering a new planet.'], answer: 'A' },
  { topicId: TOPIC.gr4, difficulty: 'HARD', content: 'Which is the correct passive form of "They are building a new school"?', options: ['A. A new school is being built.', 'B. A new school was being built.', 'C. A new school is built.', 'D. A new school will be built.'], answer: 'A' },

  // ─── NGỮ PHÁP: Thì hoàn thành (15 câu) ───
  { topicId: TOPIC.gr5, difficulty: 'EASY', content: 'She ___ never been to France.', options: ['A. has', 'B. have', 'C. had', 'D. is'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'EASY', content: 'I have lived here ___ 2015.', options: ['A. since', 'B. for', 'C. ago', 'D. in'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'EASY', content: 'They ___ just finished the exam.', options: ['A. have', 'B. had', 'C. has', 'D. are'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: 'He ___ (already / eat) lunch, so he\'s not hungry.', options: ['A. has already eaten', 'B. already ate', 'C. already eats', 'D. had already eaten'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: 'We ___ (not / see) each other for two years.', options: ['A. haven\'t seen', 'B. didn\'t see', 'C. don\'t see', 'D. hadn\'t seen'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: 'The present perfect is formed with ___ + past participle.', options: ['A. have / has', 'B. do / does', 'C. will / would', 'D. was / were'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: '___ you ever eaten sushi? – Yes, I have.', options: ['A. Have', 'B. Did', 'C. Do', 'D. Are'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: 'She has worked at this company ___ ten years.', options: ['A. for', 'B. since', 'C. ago', 'D. in'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'HARD', content: '"Since" is used with ___ and "for" is used with ___.', options: ['A. a point in time / a period of time', 'B. a period of time / a point in time', 'C. the future / the past', 'D. frequency / duration'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'HARD', content: 'Which sentence is grammatically correct?', options: ['A. He has visited Japan twice.', 'B. He visited Japan twice since 2020.', 'C. He has visited Japan two years ago.', 'D. He visit Japan twice.'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'EASY', content: 'The present perfect is often used with "yet" in ___ sentences.', options: ['A. negative and question', 'B. affirmative', 'C. passive', 'D. future'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'EASY', content: 'Tom ___ (just / arrive) at the airport.', options: ['A. has just arrived', 'B. just arrived', 'C. arrives', 'D. is arriving'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'MEDIUM', content: 'What is the past participle of "go"?', options: ['A. gone', 'B. went', 'C. going', 'D. goes'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'HARD', content: 'Identify the error: "I have seen this film last night."', options: ['A. Should be "I saw this film last night." (specific past time)', 'B. No error', 'C. Should use "had seen"', 'D. Should be "I am seeing this film"'], answer: 'A' },
  { topicId: TOPIC.gr5, difficulty: 'HARD', content: 'Choose the sentence that CORRECTLY uses the present perfect.', options: ['A. She has worked here since she graduated.', 'B. She has worked here since three years.', 'C. She has worked here yesterday.', 'D. She works here since 2020.'], answer: 'A' },
];

async function main() {
  const admin = await p.user.findFirst({ where: { role: 'ADMIN' }, select: { id: true } });
  if (!admin) throw new Error('Admin user not found');

  let count = 0;
  for (const q of QUESTIONS) {
    const optMap = { A: 0, B: 1, C: 2, D: 3 };
    const correctIndex = optMap[q.answer];
    await p.question.create({
      data: {
        content: q.content,
        subjectId: 'sub-anh',
        gradeId: 'grade-7',
        topicId: q.topicId,
        difficulty: q.difficulty,
        questionType: 'MULTIPLE_CHOICE',
        status: 'ACTIVE',
        createdById: admin.id,
        explanation: `Đáp án đúng: ${q.answer}. ${q.options[correctIndex]}`,
        options: {
          create: q.options.map((text, i) => ({
            optionKey: ['A', 'B', 'C', 'D'][i],
            content: text,
            isCorrect: i === correctIndex,
            sortOrder: i,
          })),
        },
      },
    });
    count++;
    if (count % 50 === 0) console.log(`  ${count}/${QUESTIONS.length} câu...`);
  }

  const total = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  console.log(`\n✅ Đã thêm ${count} câu hỏi`);
  console.log(`📊 Tổng Tiếng Anh lớp 7: ${total} câu`);
}

main().catch(console.error).finally(() => p.$disconnect());
