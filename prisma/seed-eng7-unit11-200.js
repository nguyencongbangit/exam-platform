const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt322xkz000leq3r26pfzrny';
const QUESTIONS = [
  // ============================================================
  // PHẦN 1: TỪ VỰNG (50 câu)
  // ============================================================
  // --- Phương tiện tương lai ---
  { d: 'EASY', q: 'What does "autonomous vehicle" mean?', opts: ['A. Xe tự lái', 'B. Xe điện', 'C. Xe đạp', 'D. Xe buýt'], a: 'A' },
  { d: 'EASY', q: 'A "hyperloop" is a type of _____.', opts: ['A. high-speed transportation system', 'B. small bicycle', 'C. slow boat', 'D. hot air balloon'], a: 'A' },
  { d: 'EASY', q: 'What is a "flying car"?', opts: ['A. A vehicle that can travel both on roads and in the air', 'B. A car that runs very fast', 'C. A car with wings painted on it', 'D. A toy car'], a: 'A' },
  { d: 'EASY', q: 'An "electric vehicle" runs on _____.', opts: ['A. electricity', 'B. petrol', 'C. diesel', 'D. coal'], a: 'A' },
  { d: 'EASY', q: 'A "maglev train" uses _____ to move.', opts: ['A. magnetic levitation', 'B. steam power', 'C. horse power', 'D. wind power'], a: 'A' },
  { d: 'EASY', q: 'What does "spaceship" mean?', opts: ['A. Tàu vũ trụ', 'B. Tàu thủy', 'C. Xe tải', 'D. Máy bay'], a: 'A' },
  { d: 'EASY', q: '"Solar-powered" means using energy from _____.', opts: ['A. the sun', 'B. the wind', 'C. water', 'D. coal'], a: 'A' },
  { d: 'EASY', q: 'What is a "drone"?', opts: ['A. An unmanned flying vehicle', 'B. A large airplane', 'C. A type of train', 'D. A submarine'], a: 'A' },
  { d: 'EASY', q: '"Sustainable transport" means transport that is _____.', opts: ['A. eco-friendly and long-lasting', 'B. very expensive', 'C. only for rich people', 'D. powered by gasoline'], a: 'A' },
  { d: 'EASY', q: 'What does "commute" mean?', opts: ['A. Travel regularly between home and work/school', 'B. Go on holiday', 'C. Drive a car', 'D. Buy a ticket'], a: 'A' },
  { d: 'EASY', q: 'A "capsule" in hyperloop is _____.', opts: ['A. the passenger pod that travels in the tube', 'B. a type of medicine', 'C. a space station', 'D. a rocket fuel'], a: 'A' },
  { d: 'EASY', q: 'What does "fuel" mean?', opts: ['A. Nhiên liệu', 'B. Tốc độ', 'C. Động cơ', 'D. Bánh xe'], a: 'A' },
  { d: 'EASY', q: '"Carbon emission" refers to _____.', opts: ['A. CO2 released into the atmosphere', 'B. a type of fuel', 'C. speed of a vehicle', 'D. a train station'], a: 'A' },
  { d: 'EASY', q: 'What is "space tourism"?', opts: ['A. Travelling to space for pleasure', 'B. Visiting museums about space', 'C. Working as an astronaut', 'D. Watching rockets on TV'], a: 'A' },
  { d: 'EASY', q: 'An "astronaut" is someone who _____.', opts: ['A. travels to outer space', 'B. drives a racing car', 'C. pilots a submarine', 'D. builds bridges'], a: 'A' },
  { d: 'MEDIUM', q: 'Which word means "not needing a human driver"?', opts: ['A. Autonomous', 'B. Manual', 'C. Traditional', 'D. Fossil'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "infrastructure" mean in transport?', opts: ['A. Roads, bridges, and systems needed for transport', 'B. A type of vehicle', 'C. A travel ticket', 'D. A transport company'], a: 'A' },
  { d: 'MEDIUM', q: '"Emission-free" transport means it produces _____.', opts: ['A. no harmful gases', 'B. a lot of smoke', 'C. very loud noise', 'D. high speed'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "shuttle" mean in space travel context?', opts: ['A. A spacecraft that carries people between places', 'B. A type of seatbelt', 'C. A fuel tank', 'D. A launch pad'], a: 'A' },
  { d: 'MEDIUM', q: 'The word "orbit" means _____.', opts: ['A. the curved path of a spacecraft around a planet', 'B. a type of rocket fuel', 'C. a space station', 'D. a landing area'], a: 'A' },
  { d: 'MEDIUM', q: 'What is "artificial intelligence" used for in future transport?', opts: ['A. To help vehicles make decisions without human control', 'B. To make vehicles look more beautiful', 'C. To reduce the price of tickets', 'D. To paint vehicles'], a: 'A' },
  { d: 'MEDIUM', q: '"Renewable energy" for vehicles includes _____.', opts: ['A. solar and wind energy', 'B. petrol and diesel', 'C. coal and gas', 'D. nuclear waste'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "congestion" mean in transport?', opts: ['A. Too many vehicles causing slow traffic', 'B. A type of road', 'C. A fast highway', 'D. A parking space'], a: 'A' },
  { d: 'MEDIUM', q: 'A "charging station" is where you _____.', opts: ['A. recharge an electric vehicle', 'B. buy petrol', 'C. repair a car engine', 'D. park a bicycle'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "supersonic" mean?', opts: ['A. Faster than the speed of sound', 'B. Very quiet', 'C. Slower than normal', 'D. Very colorful'], a: 'A' },
  { d: 'MEDIUM', q: '"Levitation" means _____.', opts: ['A. Floating above the ground without touching it', 'B. Moving very fast', 'C. Stopping suddenly', 'D. Turning left'], a: 'A' },
  { d: 'MEDIUM', q: 'What is a "vacuum tube" in hyperloop?', opts: ['A. A sealed tube with very low air pressure for capsules to travel through', 'B. A type of engine', 'C. A passenger seat', 'D. A control system'], a: 'A' },
  { d: 'MEDIUM', q: 'The word "futuristic" describes something _____.', opts: ['A. very modern and from the future', 'B. very old-fashioned', 'C. slow and boring', 'D. cheap and simple'], a: 'A' },
  { d: 'MEDIUM', q: '"Eco-friendly" transport _____.', opts: ['A. does not harm the environment', 'B. is very expensive', 'C. goes very slowly', 'D. uses fossil fuels'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "launch" mean in space context?', opts: ['A. Send a rocket into space', 'B. Land a plane', 'C. Park a car', 'D. Repair an engine'], a: 'A' },
  { d: 'HARD', q: 'Which term describes a train system where vehicles float above the track using magnetic force?', opts: ['A. Maglev', 'B. Diesel express', 'C. Steam locomotive', 'D. Cable car'], a: 'A' },
  { d: 'HARD', q: 'What is "zero-gravity" environment?', opts: ['A. A condition where objects float because there is no gravitational pull', 'B. A very heavy object', 'C. A type of fuel', 'D. A launch system'], a: 'A' },
  { d: 'HARD', q: '"Interplanetary travel" means travelling _____.', opts: ['A. between different planets', 'B. across oceans', 'C. through tunnels', 'D. over mountains'], a: 'A' },
  { d: 'HARD', q: 'What does "propulsion system" mean?', opts: ['A. The mechanism that drives a vehicle forward', 'B. A braking system', 'C. A navigation screen', 'D. A passenger seat'], a: 'A' },
  { d: 'HARD', q: 'A "reusable rocket" is one that _____.', opts: ['A. can be used multiple times after landing', 'B. can only be used once', 'C. is made of recycled material', 'D. runs on solar power'], a: 'A' },
  { d: 'HARD', q: 'What does "payload" mean in space travel?', opts: ['A. The cargo or passengers carried by a spacecraft', 'B. The fuel cost', 'C. The launch date', 'D. The orbit path'], a: 'A' },
  { d: 'HARD', q: '"Hypersonic" speed is _____ times faster than the speed of sound.', opts: ['A. five or more', 'B. two', 'C. one', 'D. three'], a: 'A' },
  { d: 'HARD', q: 'What is "carbon footprint" in transport?', opts: ['A. The total CO2 emissions caused by transport activities', 'B. A type of road marking', 'C. A speed measurement', 'D. A vehicle model'], a: 'A' },
  { d: 'HARD', q: '"Navigation system" in autonomous vehicles helps the vehicle _____.', opts: ['A. find the best route without human input', 'B. look attractive', 'C. carry more passengers', 'D. reduce fuel cost only'], a: 'A' },
  { d: 'HARD', q: 'What does "spacecraft docking" mean?', opts: ['A. Two spacecraft joining together in space', 'B. A spacecraft landing on Earth', 'C. A spacecraft launching', 'D. A spacecraft refueling'], a: 'A' },
  { d: 'EASY', q: 'What does "ticket" mean?', opts: ['A. Vé (phương tiện giao thông)', 'B. Bản đồ', 'C. Hành lý', 'D. Hộ chiếu'], a: 'A' },
  { d: 'EASY', q: '"Passenger" means _____.', opts: ['A. Hành khách', 'B. Lái xe', 'C. Nhân viên', 'D. Kỹ thuật viên'], a: 'A' },
  { d: 'EASY', q: 'What is a "departure"?', opts: ['A. The time or act of leaving a place', 'B. The act of arriving', 'C. Buying a ticket', 'D. Packing luggage'], a: 'A' },
  { d: 'EASY', q: '"Arrival" means _____.', opts: ['A. Reaching a destination', 'B. Leaving a place', 'C. Checking in', 'D. Boarding a vehicle'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "itinerary" mean?', opts: ['A. A planned route or schedule for a journey', 'B. A type of vehicle', 'C. A travel insurance', 'D. A boarding pass'], a: 'A' },
  { d: 'MEDIUM', q: '"Transit" means _____.', opts: ['A. Passing through a place on the way to a destination', 'B. Staying at a hotel', 'C. Buying souvenirs', 'D. Checking in luggage'], a: 'A' },
  { d: 'MEDIUM', q: 'What is a "hub" in transport?', opts: ['A. A central point where many routes meet', 'B. A type of wheel', 'C. A fuel tank', 'D. A passenger seat'], a: 'A' },
  { d: 'MEDIUM', q: '"Corridor" in transport means _____.', opts: ['A. A route or path connecting two places', 'B. A waiting room', 'C. A ticket office', 'D. A parking lot'], a: 'A' },
  { d: 'HARD', q: 'What does "commuter rail" refer to?', opts: ['A. Train service for people travelling regularly between cities and suburbs', 'B. A luxury tourist train', 'C. A freight train', 'D. A historic steam train'], a: 'A' },
  { d: 'HARD', q: '"Modal shift" in transport means _____.', opts: ['A. Changing from one type of transport to another', 'B. A change in vehicle design', 'C. A shift in working hours', 'D. A new route map'], a: 'A' },

  // ============================================================
  // PHẦN 2: NGỮ PHÁP - WILL + GOING TO (20 câu)
  // ============================================================
  { d: 'EASY', q: 'We use "will" to talk about _____.', opts: ['A. predictions and spontaneous decisions', 'B. past habits', 'C. completed actions', 'D. present states'], a: 'A' },
  { d: 'EASY', q: 'We use "going to" to talk about _____.', opts: ['A. future plans we have already decided', 'B. things that happened yesterday', 'C. permanent truths', 'D. past events'], a: 'A' },
  { d: 'EASY', q: 'Choose the correct sentence: "I _____ help you carry those bags."', opts: ['A. will', 'B. am going to', 'C. was', 'D. have'], a: 'A' },
  { d: 'EASY', q: '"Look at those clouds! It _____ rain." Which is correct?', opts: ['A. is going to', 'B. will', 'C. was going to', 'D. has'], a: 'A' },
  { d: 'EASY', q: 'Choose the correct form: "She _____ travel to Mars in 2050."', opts: ['A. will', 'B. traveled', 'C. travels', 'D. is traveling'], a: 'A' },
  { d: 'EASY', q: '"We have decided to take the hyperloop." = We _____ take the hyperloop.', opts: ['A. are going to', 'B. will', 'C. were', 'D. have'], a: 'A' },
  { d: 'MEDIUM', q: 'Which sentence shows a PLAN already made?', opts: ['A. I am going to buy an electric car next month.', 'B. I will buy a car if I see a good one.', 'C. I bought a car yesterday.', 'D. I buy a car every year.'], a: 'A' },
  { d: 'MEDIUM', q: 'Which sentence shows a SPONTANEOUS decision?', opts: ['A. "The phone is ringing." — "I will answer it!"', 'B. I am going to call her at 3 pm.', 'C. She planned to call her.', 'D. He called her this morning.'], a: 'A' },
  { d: 'MEDIUM', q: 'Fill in: "Scientists believe that robots _____ drive all cars by 2040."', opts: ['A. will', 'B. drove', 'C. drive', 'D. are driving'], a: 'A' },
  { d: 'MEDIUM', q: '"I have already booked a seat on the space shuttle." This means: "I _____ travel on the space shuttle."', opts: ['A. am going to', 'B. will', 'C. traveled', 'D. travel'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the correct question form: "_____ you travel by hyperloop if it is built in Vietnam?"', opts: ['A. Will', 'B. Are going to', 'C. Did', 'D. Have'], a: 'A' },
  { d: 'MEDIUM', q: 'Complete: "In 2100, people _____ live on the Moon."', opts: ['A. will probably', 'B. probably lived', 'C. are probably living', 'D. were probably'], a: 'A' },
  { d: 'MEDIUM', q: 'Which is CORRECT? "She _____ fly to Tokyo next week — she bought the ticket."', opts: ['A. is going to', 'B. will', 'C. flew', 'D. flies'], a: 'A' },
  { d: 'MEDIUM', q: 'Change to future: "Electric vehicles replace petrol cars." (prediction)', opts: ['A. Electric vehicles will replace petrol cars.', 'B. Electric vehicles replaced petrol cars.', 'C. Electric vehicles are replacing petrol cars.', 'D. Electric vehicles have replaced petrol cars.'], a: 'A' },
  { d: 'HARD', q: '"The government has announced plans for a maglev network." This suggests the government _____ build a maglev network.', opts: ['A. is going to', 'B. will', 'C. was going to', 'D. would'], a: 'A' },
  { d: 'HARD', q: 'Identify the error: "I am going to think the hyperloop will be popular." ', opts: ['A. "am going to think" should be "think"', 'B. "will be" should be "is"', 'C. "popular" should be "popularing"', 'D. No error'], a: 'A' },
  { d: 'HARD', q: 'Which sentence correctly uses BOTH "will" and "going to"?', opts: ['A. I am going to visit the space museum, but I think I will also see the rocket display.', 'B. I will going to visit the space museum.', 'C. I am will visit the museum.', 'D. She going to will travel tomorrow.'], a: 'A' },
  { d: 'HARD', q: '"There is evidence that traffic congestion _____ worsen without better planning." (logical prediction)', opts: ['A. will', 'B. is going to', 'C. both A and B are correct', 'D. neither A nor B'], a: 'A' },
  { d: 'HARD', q: 'Complete: "By 2060, self-driving cars _____ be common in most cities."', opts: ['A. will', 'B. are going to', 'C. were', 'D. have'], a: 'A' },
  { d: 'HARD', q: 'Choose the most natural response: "Oh no, I forgot my passport!" — "Don\'t worry, I _____ get it for you!"', opts: ['A. will', 'B. am going to', 'C. was going to', 'D. have'], a: 'A' },

  // ============================================================
  // PHẦN 3: ĐỌC HIỂU (40 câu)
  // ============================================================
  // --- Đoạn 1: Hyperloop ---
  { d: 'MEDIUM', q: 'Read: "The hyperloop is a new transport system where capsules travel through a low-pressure tube at speeds over 1,000 km/h. It could connect cities that are hundreds of kilometres apart in less than 30 minutes." What is the hyperloop?', opts: ['A. A transport system using capsules in a low-pressure tube', 'B. A type of airplane', 'C. An underwater tunnel', 'D. A solar-powered bus'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the text about hyperloop: How fast can hyperloop capsules travel?', opts: ['A. Over 1,000 km/h', 'B. About 100 km/h', 'C. Less than 500 km/h', 'D. About 300 km/h'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the hyperloop text: What is one advantage of hyperloop?', opts: ['A. It can connect distant cities in less than 30 minutes', 'B. It does not need any infrastructure', 'C. It is already available everywhere', 'D. It runs on petrol'], a: 'A' },
  { d: 'HARD', q: 'Based on the hyperloop text: The word "low-pressure" suggests the tube has _____.', opts: ['A. less air than normal atmosphere', 'B. very high air pressure', 'C. no passengers inside', 'D. a very small size'], a: 'A' },
  // --- Đoạn 2: Space Tourism ---
  { d: 'MEDIUM', q: 'Read: "Space tourism is becoming a reality. Companies like SpaceX and Blue Origin have already sent private passengers beyond Earth\'s atmosphere. A ticket to space currently costs millions of dollars, but experts predict prices will fall as technology improves." What is the main idea?', opts: ['A. Space tourism is becoming real but is still expensive', 'B. Space tourism is impossible', 'C. Only governments can travel to space', 'D. Space tickets are cheap now'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the space tourism text: Which companies are mentioned?', opts: ['A. SpaceX and Blue Origin', 'B. NASA and ESA', 'C. Boeing and Airbus', 'D. Tesla and Apple'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the space tourism text: What do experts predict about ticket prices?', opts: ['A. Prices will fall as technology improves', 'B. Prices will increase every year', 'C. Prices will stay the same', 'D. Prices will double'], a: 'A' },
  { d: 'HARD', q: 'What does "beyond Earth\'s atmosphere" mean in the space tourism text?', opts: ['A. Outside the layer of air surrounding Earth', 'B. Deep inside the ocean', 'C. High in the mountains', 'D. In a different country'], a: 'A' },
  // --- Đoạn 3: Electric Vehicles ---
  { d: 'EASY', q: 'Read: "Electric vehicles (EVs) do not use petrol or diesel. They run on electricity stored in batteries. EVs produce zero emissions while driving, which helps reduce air pollution in cities." What fuel do EVs use?', opts: ['A. Electricity', 'B. Petrol', 'C. Diesel', 'D. Coal'], a: 'A' },
  { d: 'EASY', q: 'According to the EV text: What benefit do EVs provide?', opts: ['A. They produce zero emissions while driving', 'B. They are cheaper than petrol cars', 'C. They can fly', 'D. They need no charging'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the EV text: Where is the electricity stored in an EV?', opts: ['A. In batteries', 'B. In a fuel tank', 'C. In a solar panel', 'D. In the engine'], a: 'A' },
  { d: 'MEDIUM', q: 'The EV text says EVs help reduce _____ in cities.', opts: ['A. air pollution', 'B. traffic noise', 'C. road accidents', 'D. fuel prices'], a: 'A' },
  // --- Đoạn 4: Autonomous Vehicles ---
  { d: 'MEDIUM', q: 'Read: "Autonomous vehicles use cameras, sensors, and artificial intelligence to navigate roads without a human driver. They can detect obstacles, read traffic signs, and make decisions in real time. However, they are still being tested and are not yet available to the public." What technology do autonomous vehicles use?', opts: ['A. Cameras, sensors, and artificial intelligence', 'B. Only cameras', 'C. Steam engines', 'D. Human remote control'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the autonomous vehicle text: Why are they not yet available to the public?', opts: ['A. They are still being tested', 'B. They are too expensive to buy', 'C. They break down often', 'D. They are banned by law'], a: 'A' },
  { d: 'HARD', q: '"Make decisions in real time" means the vehicle _____.', opts: ['A. reacts immediately to changes on the road', 'B. makes decisions before the journey starts', 'C. follows only pre-programmed routes', 'D. needs a driver to approve each turn'], a: 'A' },
  // --- Đoạn 5: Maglev Train ---
  { d: 'MEDIUM', q: 'Read: "The maglev train uses magnetic levitation to float above the track, eliminating friction. This allows it to reach speeds of over 600 km/h. The fastest maglev in operation is in Japan and travels at 603 km/h." What makes maglev trains so fast?', opts: ['A. They float above the track, eliminating friction', 'B. They use very powerful engines', 'C. They travel underground', 'D. They use less fuel'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the maglev text: Where is the fastest maglev train?', opts: ['A. Japan', 'B. China', 'C. Germany', 'D. France'], a: 'A' },
  { d: 'HARD', q: 'In the maglev text, "eliminating friction" means _____.', opts: ['A. removing the resistance that slows objects down', 'B. increasing speed by using more fuel', 'C. adding more wheels to the train', 'D. making the track longer'], a: 'A' },
  // --- Đoạn 6: Future Air Travel ---
  { d: 'MEDIUM', q: 'Read: "Future aircraft will be powered by hydrogen fuel cells or electricity instead of traditional jet fuel. These green aircraft will produce little or no carbon emissions. Engineers are already testing small electric planes and hope to build larger ones by 2035." What will power future aircraft?', opts: ['A. Hydrogen fuel cells or electricity', 'B. Coal and wood', 'C. Traditional jet fuel', 'D. Nuclear energy'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the future aircraft text: What is the goal for 2035?', opts: ['A. To build larger electric planes', 'B. To stop all air travel', 'C. To replace trains with planes', 'D. To reduce ticket prices'], a: 'A' },
  { d: 'HARD', q: 'The future aircraft text says "green aircraft" will _____.', opts: ['A. produce little or no carbon emissions', 'B. be painted green', 'C. fly only at night', 'D. carry only cargo'], a: 'A' },
  // --- Đoạn 7: Flying Cars ---
  { d: 'MEDIUM', q: 'Read: "Several companies are developing flying cars, also called air taxis. These vehicles take off and land vertically, like a helicopter, and can travel above traffic. They are designed for short trips in cities and are expected to be commercially available within the next decade." What are flying cars also called?', opts: ['A. Air taxis', 'B. Space shuttles', 'C. Hyperloop capsules', 'D. Maglev trains'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the flying car text: How do flying cars take off?', opts: ['A. Vertically, like a helicopter', 'B. Horizontally, like a plane', 'C. Underground, like a train', 'D. On water, like a boat'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the flying car text: What are flying cars designed for?', opts: ['A. Short trips in cities', 'B. Long international flights', 'C. Carrying heavy cargo', 'D. Military purposes'], a: 'A' },
  { d: 'HARD', q: '"Commercially available within the next decade" means you can buy or use them _____.', opts: ['A. within the next 10 years', 'B. right now', 'C. in 100 years', 'D. never'], a: 'A' },
  // --- Comprehension - General ---
  { d: 'EASY', q: 'Read: "Hyperloop travel would be faster than flying in many cases." What does this sentence compare?', opts: ['A. Hyperloop speed vs. airplane speed', 'B. Hyperloop cost vs. train cost', 'C. Hyperloop size vs. car size', 'D. Hyperloop passengers vs. bus passengers'], a: 'A' },
  { d: 'MEDIUM', q: 'Read: "The main challenge for space tourism is the high cost of fuel needed to escape Earth\'s gravity." What is the main challenge?', opts: ['A. The high cost of fuel', 'B. The lack of technology', 'C. The danger of rockets', 'D. The training required'], a: 'A' },
  { d: 'MEDIUM', q: 'Read: "Autonomous vehicles may reduce road accidents caused by human error." What benefit is suggested?', opts: ['A. Fewer road accidents', 'B. Faster vehicles', 'C. Cheaper fuel', 'D. More parking spaces'], a: 'A' },
  { d: 'HARD', q: 'Read: "Although electric vehicles are environmentally friendly, the production of batteries still generates significant carbon emissions." What problem is mentioned?', opts: ['A. Making batteries creates carbon emissions', 'B. Electric vehicles pollute the air', 'C. Electric vehicles are slower than petrol cars', 'D. Batteries cannot be recycled'], a: 'A' },
  { d: 'HARD', q: 'Read: "If space tourism becomes affordable, it could transform the travel industry completely." What condition is stated?', opts: ['A. Space tourism needs to become affordable first', 'B. Space tourism will never be affordable', 'C. The travel industry is already transformed', 'D. Space tourism is only for scientists'], a: 'A' },
  { d: 'HARD', q: 'Read: "The hyperloop network could potentially reduce the need for short-haul flights between cities." What does "short-haul" most likely mean?', opts: ['A. Short distance', 'B. Long distance', 'C. International', 'D. Underground'], a: 'A' },
  { d: 'HARD', q: 'Read: "Self-driving cars collect enormous amounts of data about roads and traffic patterns." Why is this data collection important?', opts: ['A. To help the car make better navigation decisions', 'B. To sell data to advertisers', 'C. To make the car look smarter', 'D. To increase the car\'s speed'], a: 'A' },

  // ============================================================
  // PHẦN 4: GIAO TIẾP (30 câu)
  // ============================================================
  { d: 'EASY', q: 'What is the best response to: "Do you think flying cars will be common in the future?"', opts: ['A. "Yes, I think they will become common as technology improves."', 'B. "I don\'t like cars."', 'C. "Fly is dangerous."', 'D. "Cars are good."'], a: 'A' },
  { d: 'EASY', q: 'How do you express a prediction politely?', opts: ['A. "I think/I believe that..."', 'B. "You must..."', 'C. "Stop it now."', 'D. "Never mind."'], a: 'A' },
  { d: 'EASY', q: 'Your friend says: "I\'m going to take the maglev train to Ha Noi." What do you ask?', opts: ['A. "Really? How long will it take?"', 'B. "No, you can\'t go."', 'C. "Train is bad."', 'D. "Why do you eat?"'], a: 'A' },
  { d: 'EASY', q: 'How do you say you are excited about future travel?', opts: ['A. "I can\'t wait to travel by hyperloop one day!"', 'B. "I hate traveling."', 'C. "Transport is boring."', 'D. "I never go anywhere."'], a: 'A' },
  { d: 'EASY', q: 'Someone asks: "What transport will you use in the future?" A good answer is:', opts: ['A. "I will probably use an electric car or self-driving vehicle."', 'B. "I don\'t care."', 'C. "Transport is expensive."', 'D. "I walked yesterday."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you politely disagree with someone\'s prediction about future transport?', opts: ['A. "I see your point, but I think it might be different because..."', 'B. "You are completely wrong!"', 'C. "I don\'t talk to you."', 'D. "Silence!"'], a: 'A' },
  { d: 'MEDIUM', q: 'Your teacher asks: "What do you think is the greatest challenge for self-driving cars?" A good response is:', opts: ['A. "I think the greatest challenge is ensuring they are safe in all weather conditions."', 'B. "I don\'t know."', 'C. "Cars are bad."', 'D. "Driving is fun."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you ask someone about their travel plans?', opts: ['A. "What are you going to do on your trip?"', 'B. "Why you travel?"', 'C. "Give me your ticket."', 'D. "Travel is costly."'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the best way to talk about a future travel plan to a friend:', opts: ['A. "I\'m going to visit space one day — it\'s my dream!"', 'B. "Space is far."', 'C. "I visited space yesterday."', 'D. "Space is boring."'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone asks: "Will hyperloop be built in Vietnam?" A good discussion response is:', opts: ['A. "It\'s possible. Vietnam is developing its infrastructure, and hyperloop could connect major cities."', 'B. "No, it\'s impossible."', 'C. "I don\'t know Vietnam."', 'D. "Vietnam has only bicycles."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you express agreement with someone\'s prediction?', opts: ['A. "I agree. I think so too."', 'B. "No way!"', 'C. "That\'s silly."', 'D. "I disagree completely."'], a: 'A' },
  { d: 'MEDIUM', q: 'Your friend says: "I\'m scared of self-driving cars." How do you reassure them?', opts: ['A. "Don\'t worry! They are designed with many safety systems."', 'B. "You are right to be scared."', 'C. "Self-driving cars are very dangerous."', 'D. "I am also scared."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you start a discussion about future transport?', opts: ['A. "What do you think transport will be like in 50 years?"', 'B. "I don\'t want to talk."', 'C. "Transport now is perfect."', 'D. "Let\'s not discuss this."'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the correct way to make a prediction in a presentation:', opts: ['A. "We believe that by 2050, most vehicles will be electric."', 'B. "We believing that vehicles will electric."', 'C. "By 2050 vehicles is electric."', 'D. "2050 electric cars."'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone asks what "autonomous" means. You explain:', opts: ['A. "It means self-operating — a vehicle that drives itself without a human."', 'B. "It means fast."', 'C. "It means expensive."', 'D. "It means old."'], a: 'A' },
  { d: 'HARD', q: 'In a debate about space tourism, how would you argue FOR it?', opts: ['A. "Space tourism can inspire innovation and make space technology affordable for everyone in the future."', 'B. "Space tourism is only for rich people, so it should be banned."', 'C. "Space travel is dangerous and a waste of money."', 'D. "We should focus on other problems first."'], a: 'A' },
  { d: 'HARD', q: 'How do you explain the environmental benefit of electric vehicles in a discussion?', opts: ['A. "Electric vehicles produce no emissions while driving, which helps clean the air in our cities."', 'B. "Electric vehicles are faster than petrol cars."', 'C. "Electric vehicles are cheaper to buy."', 'D. "Electric vehicles are bigger than normal cars."'], a: 'A' },
  { d: 'HARD', q: 'Someone asks: "Do you prefer hyperloop or flying cars for future city travel? Why?" A complete answer is:', opts: ['A. "I prefer hyperloop because it\'s faster and more energy-efficient for long distances."', 'B. "I prefer cars."', 'C. "Both are same."', 'D. "I don\'t travel."'], a: 'A' },
  { d: 'HARD', q: 'How do you express uncertainty about a future prediction politely?', opts: ['A. "It\'s hard to say, but it\'s possible that..."', 'B. "It will definitely happen."', 'C. "I know exactly what will happen."', 'D. "No one knows anything."'], a: 'A' },
  { d: 'HARD', q: 'In a group discussion, someone says: "Self-driving cars will end all traffic accidents." How do you respond critically?', opts: ['A. "That might be an overstatement. They can reduce accidents, but technical errors are still possible."', 'B. "Yes, that\'s 100% true."', 'C. "I agree completely."', 'D. "Traffic accidents don\'t exist."'], a: 'A' },
  { d: 'EASY', q: 'What does "I\'d love to try..." express?', opts: ['A. Desire to experience something', 'B. Refusal', 'C. Anger', 'D. Surprise'], a: 'A' },
  { d: 'EASY', q: 'Which phrase asks for someone\'s opinion?', opts: ['A. "What do you think about...?"', 'B. "Stop talking."', 'C. "I don\'t care."', 'D. "Be quiet."'], a: 'A' },
  { d: 'MEDIUM', q: '"That\'s an interesting point, but have you considered...?" is used to _____.', opts: ['A. politely challenge someone\'s idea', 'B. agree completely', 'C. end a conversation', 'D. change the subject'], a: 'A' },
  { d: 'MEDIUM', q: 'Which response shows enthusiasm about future travel?', opts: ['A. "Imagine travelling from Ha Noi to Ho Chi Minh City in 30 minutes by hyperloop — amazing!"', 'B. "Travel is boring."', 'C. "I prefer staying home."', 'D. "Trains are old."'], a: 'A' },
  { d: 'MEDIUM', q: 'To conclude a discussion about future transport, you say:', opts: ['A. "In conclusion, future transport will be faster, greener, and more connected."', 'B. "I have nothing to say."', 'C. "The future is terrible."', 'D. "Let\'s stop here."'], a: 'A' },
  { d: 'HARD', q: 'How do you compare two transport options in a discussion?', opts: ['A. "While hyperloop is faster for long distances, flying cars are more flexible for city trips."', 'B. "Hyperloop and flying cars are the same."', 'C. "All transport is bad."', 'D. "Hyperloop is good."'], a: 'A' },
  { d: 'HARD', q: '"From my perspective, the most exciting development in future travel is..." completes a _____ sentence.', opts: ['A. personal opinion statement', 'B. question', 'C. command', 'D. definition'], a: 'A' },
  { d: 'EASY', q: 'Which sentence correctly asks about a travel plan?', opts: ['A. "Are you going to travel by electric car?', 'B. "You travel electric car?"', 'C. "Electric car you going?"', 'D. "Do you went electric car?"'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone says they are nervous about automated transport. You respond:', opts: ['A. "I understand. But these systems are tested thoroughly before being used by the public."', 'B. "You are wrong to feel nervous."', 'C. "Just stop worrying."', 'D. "Automated transport is terrible."'], a: 'A' },
  { d: 'HARD', q: 'Which sentence is the MOST persuasive in a discussion about future transport investment?', opts: ['A. "Investing in hyperloop now will create jobs, reduce carbon emissions, and boost the economy for decades."', 'B. "We should invest because it is cool."', 'C. "New transport is good."', 'D. "It will be popular."'], a: 'A' },

  // ============================================================
  // PHẦN 5: SUY LUẬN (30 câu)
  // ============================================================
  { d: 'MEDIUM', q: 'If autonomous vehicles become common, what will most likely happen to road accidents?', opts: ['A. They will decrease because human error is eliminated', 'B. They will increase', 'C. They will stay the same', 'D. They will become more dangerous'], a: 'A' },
  { d: 'MEDIUM', q: 'If electric vehicles replace petrol cars, what will happen to air quality?', opts: ['A. It will improve because there will be fewer emissions', 'B. It will get worse', 'C. It will not change', 'D. It will become dangerous'], a: 'A' },
  { d: 'MEDIUM', q: 'If space tourism becomes affordable, what will probably happen?', opts: ['A. More people will travel to space', 'B. Fewer people will be interested', 'C. Space travel will stop', 'D. Earth will become less populated'], a: 'A' },
  { d: 'MEDIUM', q: 'If hyperloop connects major Vietnamese cities, what is a likely benefit?', opts: ['A. People can travel between cities much faster', 'B. People will stop using the internet', 'C. Cities will become smaller', 'D. Tourism will decline'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might flying cars be more useful in cities than on highways?', opts: ['A. They can avoid traffic by flying above congested roads', 'B. They are faster on highways', 'C. They use less fuel on highways', 'D. They are cheaper to use in the city'], a: 'A' },
  { d: 'MEDIUM', q: 'If a city builds many charging stations, what will happen to EV adoption?', opts: ['A. More people will buy electric vehicles', 'B. Fewer people will buy electric vehicles', 'C. Petrol cars will become more popular', 'D. Public transport will be abandoned'], a: 'A' },
  { d: 'MEDIUM', q: 'Why do maglev trains travel faster than regular trains?', opts: ['A. Because they float above the track and have no friction', 'B. Because they have bigger engines', 'C. Because they travel underground', 'D. Because they carry fewer passengers'], a: 'A' },
  { d: 'MEDIUM', q: 'If a country invests in renewable energy transport, what long-term effect is expected?', opts: ['A. Reduced dependence on fossil fuels and lower pollution', 'B. Higher petrol prices', 'C. Less public transport', 'D. More traffic congestion'], a: 'A' },
  { d: 'MEDIUM', q: 'What can we infer if hyperloop tickets are very expensive at first?', opts: ['A. Only wealthy people will use it initially', 'B. Everyone will use it immediately', 'C. It will close down quickly', 'D. Prices will never change'], a: 'A' },
  { d: 'MEDIUM', q: 'If autonomous vehicles can detect obstacles instantly, what is the likely impact?', opts: ['A. Emergency braking will be faster than a human driver', 'B. The vehicle will drive slower', 'C. The vehicle will stop working', 'D. Passengers will need seatbelts less'], a: 'A' },
  { d: 'HARD', q: 'Why might space tourism be important for technology development?', opts: ['A. It drives innovation in engineering, materials, and energy systems that benefit all industries', 'B. It only helps rich people enjoy themselves', 'C. It has no impact on other industries', 'D. It makes Earth transport worse'], a: 'A' },
  { d: 'HARD', q: 'If battery technology improves significantly, what will be the effect on electric vehicles?', opts: ['A. They will have longer range and shorter charging time', 'B. They will become slower', 'C. They will become less popular', 'D. They will require more fuel'], a: 'A' },
  { d: 'HARD', q: 'What can be inferred if a country has no charging infrastructure for EVs?', opts: ['A. EV adoption will be slow even if the cars are affordable', 'B. EVs will still be widely used', 'C. Petrol cars will disappear anyway', 'D. People will choose bicycles instead'], a: 'A' },
  { d: 'HARD', q: 'Why might autonomous vehicles be especially useful for elderly or disabled people?', opts: ['A. They provide independent mobility without needing to drive manually', 'B. They are cheaper than taxis', 'C. They are only designed for elderly passengers', 'D. They travel only short distances'], a: 'A' },
  { d: 'HARD', q: 'If hyperloop is built between Ha Noi and Ho Chi Minh City, what might happen to airline routes between those cities?', opts: ['A. Some short-haul flights might be replaced by hyperloop', 'B. More flights will be added', 'C. Airlines will build more airports', 'D. Hyperloop and airlines will have no connection'], a: 'A' },
  { d: 'HARD', q: 'What can we conclude if all new cars sold in a country are electric by 2030?', opts: ['A. Carbon emissions from road transport will gradually decrease', 'B. Carbon emissions will immediately drop to zero', 'C. Petrol cars will be more popular than ever', 'D. Transport infrastructure will not change'], a: 'A' },
  { d: 'HARD', q: 'Why might governments regulate autonomous vehicles carefully before allowing them on roads?', opts: ['A. To ensure they meet safety standards and do not put the public at risk', 'B. To prevent people from buying them', 'C. Because they are too expensive to regulate', 'D. To promote petrol cars instead'], a: 'A' },
  { d: 'HARD', q: 'If drone delivery services expand, what might be the effect on road traffic?', opts: ['A. Road congestion from delivery trucks may reduce', 'B. Road traffic will increase significantly', 'C. Drone services will only affect airports', 'D. People will stop shopping online'], a: 'A' },
  { d: 'HARD', q: 'Why do scientists believe that reducing transport emissions is important for climate change?', opts: ['A. Because transport is one of the largest sources of greenhouse gases globally', 'B. Because transport is not important', 'C. Because only factories cause climate change', 'D. Because reducing emissions increases fuel costs'], a: 'A' },
  { d: 'HARD', q: 'If space travel becomes routine, what might be the long-term social impact?', opts: ['A. People might live and work beyond Earth, expanding human civilization', 'B. People will stop caring about Earth', 'C. Only scientists will benefit', 'D. Space travel will disappear quickly'], a: 'A' },
  { d: 'MEDIUM', q: 'Why is a "vacuum tube" used in hyperloop systems?', opts: ['A. To reduce air resistance so capsules can travel at high speed', 'B. To cool passengers inside', 'C. To generate electricity', 'D. To store fuel'], a: 'A' },
  { d: 'MEDIUM', q: 'What might happen if flying cars are widely used but no air traffic rules exist?', opts: ['A. There could be many mid-air collisions and accidents', 'B. Travel would be safer', 'C. Flying cars would become cheaper', 'D. Cities would become quieter'], a: 'A' },
  { d: 'MEDIUM', q: 'If solar-powered vehicles become common, what would be a key advantage in sunny countries?', opts: ['A. They could recharge using free sunlight, reducing energy costs', 'B. They would be slower', 'C. They would be more expensive', 'D. They would only work indoors'], a: 'A' },
  { d: 'HARD', q: 'Why might autonomous vehicles need to collect and share data with each other?', opts: ['A. To coordinate movements, avoid collisions, and optimize traffic flow', 'B. To share entertainment content', 'C. To track passengers\' shopping habits', 'D. To charge passengers automatically'], a: 'A' },
  { d: 'HARD', q: 'What can be inferred about maglev technology if it needs very precise engineering?', opts: ['A. It is expensive to build but offers superior performance', 'B. It is cheap and easy to construct', 'C. Anyone can build a maglev train', 'D. Maglev is less reliable than regular trains'], a: 'A' },
  { d: 'EASY', q: 'If you can charge an EV at home, what is one personal benefit?', opts: ['A. You save time by not visiting petrol stations', 'B. You pay more for fuel', 'C. You need to drive further', 'D. You use more electricity than needed'], a: 'A' },
  { d: 'MEDIUM', q: 'What would happen if a drone\'s battery runs out during delivery?', opts: ['A. The package might fall or delivery could fail', 'B. The drone would land safely at the destination', 'C. The drone would ask for help', 'D. The battery would recharge automatically'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might a family prefer a self-driving car for long road trips?', opts: ['A. Passengers can relax or sleep while the car drives safely', 'B. Self-driving cars are smaller', 'C. Self-driving cars travel slower', 'D. Self-driving cars need more fuel'], a: 'A' },
  { d: 'HARD', q: 'Why would hyperloop be more energy-efficient than airplanes for medium distances?', opts: ['A. It travels in a sealed tube with minimal air resistance, using less energy per passenger', 'B. Hyperloop uses gasoline more efficiently', 'C. Airplanes use solar power', 'D. Hyperloop carries fewer passengers'], a: 'A' },
  { d: 'HARD', q: 'If future cities are designed around autonomous and electric transport, what urban changes might occur?', opts: ['A. Less need for large car parks, wider pedestrian zones, and cleaner air', 'B. More traffic jams', 'C. Bigger highways and more petrol stations', 'D. No change in urban design'], a: 'A' },

  // ============================================================
  // PHẦN 6: VIẾT LẠI CÂU (30 câu)
  // ============================================================
  // Passive voice
  { d: 'MEDIUM', q: 'Rewrite using passive: "Engineers will design the new hyperloop."', opts: ['A. The new hyperloop will be designed by engineers.', 'B. The new hyperloop designed by engineers.', 'C. Engineers will designed the hyperloop.', 'D. The hyperloop will designing by engineers.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "Scientists are testing the autonomous vehicle."', opts: ['A. The autonomous vehicle is being tested by scientists.', 'B. The autonomous vehicle is tested by scientists.', 'C. Scientists are being tested the vehicle.', 'D. The vehicle being tested.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "They have launched the space shuttle."', opts: ['A. The space shuttle has been launched.', 'B. The space shuttle was launched.', 'C. The space shuttle is launched.', 'D. The space shuttle launched.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "The government will build new charging stations."', opts: ['A. New charging stations will be built by the government.', 'B. New charging stations will built by the government.', 'C. The government will be built charging stations.', 'D. Charging stations build by government.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite using passive: "People currently use hyperloop in some countries."', opts: ['A. Hyperloop is currently used by people in some countries.', 'B. Hyperloop currently used in some countries.', 'C. People are used hyperloop in some countries.', 'D. Hyperloop was currently used.'], a: 'A' },
  // Conditional
  { d: 'MEDIUM', q: 'Rewrite as a conditional: "We invest in EVs. Air quality improves." (If...)', opts: ['A. If we invest in EVs, air quality will improve.', 'B. If we invested in EVs, air quality improves.', 'C. If air quality improves, we invest in EVs.', 'D. Air quality improves if we invested.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Unless battery prices fall, EVs will be expensive." = "If battery prices _____, EVs will be expensive."', opts: ['A. do not fall', 'B. fall', 'C. will not fall', 'D. would fall'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "I don\'t have a flying car, so I can\'t avoid traffic." (Type 2: If I...)', opts: ['A. If I had a flying car, I could avoid traffic.', 'B. If I have a flying car, I can avoid traffic.', 'C. If I had a flying car, I will avoid traffic.', 'D. If I would have a flying car, I could avoid traffic.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "The hyperloop was not built, so many people missed their journeys." (Type 3: If...)', opts: ['A. If the hyperloop had been built, many people would not have missed their journeys.', 'B. If the hyperloop was built, many people would not miss their journeys.', 'C. If the hyperloop had been built, many people will not miss their journeys.', 'D. If the hyperloop built, people not miss journeys.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "It\'s possible that flying cars will be common by 2040." Using "might":', opts: ['A. Flying cars might be common by 2040.', 'B. Flying cars will common by 2040.', 'C. Flying cars might common by 2040.', 'D. Flying cars possible common by 2040.'], a: 'A' },
  // Reported speech
  { d: 'MEDIUM', q: 'Rewrite as reported speech: She said, "I will travel by hyperloop next year."', opts: ['A. She said that she would travel by hyperloop the next year.', 'B. She said that she will travel by hyperloop next year.', 'C. She said she travelled by hyperloop.', 'D. She said I will travel by hyperloop.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: He said, "Electric cars are better for the environment."', opts: ['A. He said that electric cars were better for the environment.', 'B. He said that electric cars are better for the environment.', 'C. He told electric cars were better.', 'D. He said electric cars will better.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Are you going to take the maglev train?" she asked me.', opts: ['A. She asked me if I was going to take the maglev train.', 'B. She asked me are you going to take the train.', 'C. She asked if I am going to take the train.', 'D. She asked me that I was going to take the train.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: The scientist said, "Autonomous vehicles will be safer than human drivers."', opts: ['A. The scientist said that autonomous vehicles would be safer than human drivers.', 'B. The scientist said that autonomous vehicles will be safer.', 'C. The scientist told autonomous vehicles are safer.', 'D. The scientist said autonomous vehicles safer.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "Don\'t forget to charge your electric vehicle!" my mum told me.', opts: ['A. My mum told me not to forget to charge my electric vehicle.', 'B. My mum told me don\'t forget to charge the vehicle.', 'C. My mum said me to not forget charging.', 'D. My mum told don\'t forget charging.'], a: 'A' },
  // Comparison
  { d: 'MEDIUM', q: 'Rewrite using "as...as": "A maglev train is faster than a regular train."', opts: ['A. A regular train is not as fast as a maglev train.', 'B. A maglev train is not as fast as a regular train.', 'C. A regular train is as fast as a maglev train.', 'D. A maglev train is fast as a regular train.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Flying to the Moon takes longer than flying to Europe." Using "not as...as":', opts: ['A. Flying to Europe is not as long as flying to the Moon.', 'B. Flying to Europe is as long as flying to the Moon.', 'C. Flying to the Moon is not as long as flying to Europe.', 'D. Flying to the Moon as long as Europe.'], a: 'A' },
  // Cause & Effect
  { d: 'MEDIUM', q: 'Rewrite: "Electric vehicles reduce emissions. This improves air quality." Using "Because":', opts: ['A. Because electric vehicles reduce emissions, air quality improves.', 'B. Because air quality improves, electric vehicles reduce emissions.', 'C. Electric vehicles reduce emissions because air quality improves.', 'D. Because electric vehicles, air quality.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Hyperloop is very fast. Therefore, it can replace short flights." Using "so":', opts: ['A. Hyperloop is so fast that it can replace short flights.', 'B. Hyperloop is fast so it can\'t replace short flights.', 'C. Therefore hyperloop is fast and replace flights.', 'D. Hyperloop fast so replace flights.'], a: 'A' },
  // Modal verbs
  { d: 'MEDIUM', q: 'Rewrite: "It is possible that self-driving cars will be everywhere by 2045." Using "may":', opts: ['A. Self-driving cars may be everywhere by 2045.', 'B. Self-driving cars must be everywhere by 2045.', 'C. Self-driving cars should be everywhere by 2045.', 'D. Self-driving cars can be everywhere by 2045.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "It is necessary to charge an EV before a long trip." Using "must":', opts: ['A. You must charge an EV before a long trip.', 'B. You should charge an EV before a long trip.', 'C. You can charge an EV before a long trip.', 'D. You may charge an EV before a long trip.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "I am sure that the hyperloop will connect major cities." Using "certain":', opts: ['A. It is certain that the hyperloop will connect major cities.', 'B. It is certain the hyperloop connected major cities.', 'C. The hyperloop certain will connect major cities.', 'D. I certain the hyperloop will connect cities.'], a: 'A' },
  // Purpose
  { d: 'MEDIUM', q: 'Rewrite: "Scientists build EV charging networks so that people can travel farther." Using "in order to":', opts: ['A. Scientists build EV charging networks in order to allow people to travel farther.', 'B. Scientists build EV networks in order people can travel.', 'C. Scientists build networks so they travel farther.', 'D. Scientists build in order to people travel.'], a: 'A' },
  // Too/Enough
  { d: 'MEDIUM', q: 'Rewrite: "The battery is not powerful enough. The car cannot travel 500 km." Using "too":', opts: ['A. The battery is too weak for the car to travel 500 km.', 'B. The battery is too powerful for the car to travel 500 km.', 'C. The car is too strong to travel 500 km.', 'D. The battery not enough to travel.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "The child is not old enough to drive a car." Using "too":', opts: ['A. The child is too young to drive a car.', 'B. The child is too old to drive a car.', 'C. The child is young enough to drive a car.', 'D. The child too drive a car.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "The ticket is so expensive that students cannot afford it." Using "enough":', opts: ['A. The ticket is not cheap enough for students to afford.', 'B. The ticket is cheap enough for students to afford.', 'C. The ticket is expensive enough for students to afford.', 'D. Students cannot afford ticket enough.'], a: 'A' },
  // Mixed
  { d: 'HARD', q: 'Rewrite: "People say that space tourism will become common." Using passive beginning "Space tourism...":', opts: ['A. Space tourism is said to become common.', 'B. Space tourism said to become common.', 'C. Space tourism is said becoming common.', 'D. Space tourism will be said common.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "The government planned to invest in hyperloop. It invested in hyperloop." Combine using "as planned":', opts: ['A. The government invested in hyperloop as planned.', 'B. The government planned and invested hyperloop.', 'C. As the government planned, it invests in hyperloop.', 'D. The government as planned invest hyperloop.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "Not only is hyperloop fast, but it also uses less energy than planes." Reorder starting "Hyperloop is not only...":', opts: ['A. Hyperloop is not only fast but also uses less energy than planes.', 'B. Hyperloop is not only fast but uses less energy.', 'C. Hyperloop not only is fast but also uses less energy.', 'D. Hyperloop is not only fast and also less energy.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "Despite being expensive, space tourism is growing." Using "Although":', opts: ['A. Although space tourism is expensive, it is growing.', 'B. Although space tourism growing, it is expensive.', 'C. Space tourism is expensive although it growing.', 'D. Although expensive space tourism is growing it.'], a: 'A' },
];

async function main() {
  const admin = await p.user.findFirst({ where: { role: 'ADMIN' }, select: { id: true } });
  if (!admin) throw new Error('Admin not found');
  let count = 0;
  for (const q of QUESTIONS) {
    const keys = ['A', 'B', 'C', 'D'];
    const ci = keys.indexOf(q.a);
    await p.question.create({
      data: {
        content: q.q,
        subjectId: 'sub-anh',
        gradeId: 'grade-7',
        topicId: TOPIC_ID,
        difficulty: q.d,
        questionType: 'MULTIPLE_CHOICE',
        status: 'ACTIVE',
        createdById: admin.id,
        explanation: `Đáp án đúng: ${q.a}. ${q.opts[ci]}`,
        options: {
          create: q.opts.map((text, i) => ({
            optionKey: keys[i],
            content: text,
            isCorrect: i === ci,
            sortOrder: i,
          })),
        },
      },
    });
    count++;
    if (count % 50 === 0) console.log(`  ${count}/${QUESTIONS.length} câu...`);
  }
  const total = await p.question.count({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  const topicCount = await p.question.count({ where: { topicId: TOPIC_ID } });
  console.log(`\n✅ Đã thêm ${count} câu`);
  console.log(`📌 Topic: ${topicCount} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 7: ${total} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
