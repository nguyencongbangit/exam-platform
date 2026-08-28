const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt322xl6000neq3ry0xai4py';
const QUESTIONS = [
  // ============================================================
  // PHẦN 1: TỪ VỰNG (50 câu)
  // ============================================================
  // --- Dân số & đô thị ---
  { d: 'EASY', q: 'What does "population" mean?', opts: ['A. Dân số - tổng số người sống ở một nơi', 'B. Diện tích đất đai', 'C. Tốc độ phát triển kinh tế', 'D. Số lượng trường học'], a: 'A' },
  { d: 'EASY', q: '"Overcrowding" means _____.', opts: ['A. Too many people or things in one place', 'B. Too few people in a place', 'C. A clean and quiet city', 'D. An empty building'], a: 'A' },
  { d: 'EASY', q: 'What does "urbanization" mean?', opts: ['A. The process of people moving from rural to urban areas', 'B. The process of building farms', 'C. The growth of forests', 'D. The decrease in city population'], a: 'A' },
  { d: 'EASY', q: '"Poverty" means _____.', opts: ['A. The state of being very poor', 'B. Being very rich', 'C. Having a good job', 'D. Living in a big house'], a: 'A' },
  { d: 'EASY', q: 'What is "migration"?', opts: ['A. Moving from one place to another to live', 'B. Building new houses', 'C. Growing food on farms', 'D. Travelling for holiday'], a: 'A' },
  { d: 'EASY', q: '"Birth rate" is the number of _____ per 1,000 people per year.', opts: ['A. births', 'B. deaths', 'C. immigrants', 'D. schools'], a: 'A' },
  { d: 'EASY', q: '"Death rate" refers to _____.', opts: ['A. The number of deaths per 1,000 people per year', 'B. The number of births per year', 'C. The speed of population growth', 'D. The number of people who move'], a: 'A' },
  { d: 'EASY', q: 'A "megacity" is a city with a population of _____.', opts: ['A. over 10 million people', 'B. under 1 million people', 'C. exactly 5 million people', 'D. fewer than 500,000 people'], a: 'A' },
  { d: 'EASY', q: '"Rural area" means _____.', opts: ['A. Countryside - an area with farms and few people', 'B. A large city', 'C. A coastal town', 'D. An industrial zone'], a: 'A' },
  { d: 'EASY', q: '"Urban area" means _____.', opts: ['A. A city or town with many people and buildings', 'B. A quiet farming area', 'C. A mountain region', 'D. A desert'], a: 'A' },
  { d: 'EASY', q: 'What does "slum" mean?', opts: ['A. A very poor and crowded area in a city', 'B. A rich neighbourhood', 'C. A shopping centre', 'D. A park in a city'], a: 'A' },
  { d: 'EASY', q: '"Infrastructure" in cities includes _____.', opts: ['A. Roads, water supply, electricity, and public services', 'B. Only shopping malls', 'C. Only schools', 'D. Only parks'], a: 'A' },
  { d: 'MEDIUM', q: '"Overpopulation" occurs when _____.', opts: ['A. A place has more people than resources can support', 'B. A place has too few people', 'C. A city builds too many houses', 'D. A country has too many factories'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "life expectancy" mean?', opts: ['A. The average number of years a person is expected to live', 'B. The number of people in a country', 'C. The number of hospitals', 'D. The speed of population growth'], a: 'A' },
  { d: 'MEDIUM', q: '"Sanitation" refers to _____.', opts: ['A. Clean water supply and waste management systems', 'B. Schools and education', 'C. Transportation systems', 'D. Food production'], a: 'A' },
  { d: 'MEDIUM', q: '"Population density" means _____.', opts: ['A. The number of people per square kilometre', 'B. The total population of a country', 'C. The birth rate of a country', 'D. The speed of migration'], a: 'A' },
  { d: 'MEDIUM', q: 'What is "housing shortage"?', opts: ['A. Not enough homes for all the people who need them', 'B. Too many houses in one area', 'C. Expensive building materials', 'D. Old and broken houses'], a: 'A' },
  { d: 'MEDIUM', q: '"Food security" means _____.', opts: ['A. Having reliable access to enough nutritious food', 'B. Locking food in a safe', 'C. Producing too much food', 'D. Eating expensive meals'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "immigrant" mean?', opts: ['A. A person who moves to another country to live', 'B. A person who stays in their home country', 'C. A tourist on holiday', 'D. A government official'], a: 'A' },
  { d: 'MEDIUM', q: '"Sustainable development" means _____.', opts: ['A. Development that meets current needs without harming the future', 'B. Very fast economic growth', 'C. Building as many factories as possible', 'D. Using all natural resources quickly'], a: 'A' },
  { d: 'MEDIUM', q: 'What is a "suburb"?', opts: ['A. A residential area on the edge of a city', 'B. The centre of a large city', 'C. A rural farming village', 'D. An industrial area'], a: 'A' },
  { d: 'MEDIUM', q: '"Unemployment" means _____.', opts: ['A. The condition of not having a job', 'B. Having two jobs', 'C. Earning a high salary', 'D. Working in a factory'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "pollution" mean in an overcrowded city?', opts: ['A. Contamination of air, water, or land by harmful substances', 'B. A type of city transport', 'C. A government program', 'D. A type of housing'], a: 'A' },
  { d: 'MEDIUM', q: '"Congestion" in cities means _____.', opts: ['A. Too many vehicles or people causing slow movement', 'B. A type of city park', 'C. A government policy', 'D. A clean water system'], a: 'A' },
  { d: 'HARD', q: '"Demographic transition" refers to _____.', opts: ['A. The shift from high birth/death rates to low birth/death rates as a country develops', 'B. People moving between cities', 'C. Changes in voting patterns', 'D. Economic reforms'], a: 'A' },
  { d: 'HARD', q: 'What is "rural-urban migration"?', opts: ['A. People moving from the countryside to cities', 'B. People moving from cities to the countryside', 'C. People migrating to other countries', 'D. Seasonal workers returning home'], a: 'A' },
  { d: 'HARD', q: '"Social inequality" refers to _____.', opts: ['A. Unequal distribution of wealth, opportunities, and resources', 'B. Equal rights for everyone', 'C. High economic growth', 'D. Good education for all'], a: 'A' },
  { d: 'HARD', q: 'What does "gentrification" mean?', opts: ['A. The process where wealthier people move into a poor urban area, raising living costs', 'B. Building new parks in cities', 'C. Reducing pollution in cities', 'D. Improving rural infrastructure'], a: 'A' },
  { d: 'HARD', q: '"Carbon footprint" of a city depends mainly on _____.', opts: ['A. How much greenhouse gas the city\'s activities produce', 'B. The city\'s geographic location', 'C. The number of parks in the city', 'D. The age of the city\'s buildings'], a: 'A' },
  { d: 'HARD', q: 'What is "green space" in urban planning?', opts: ['A. Parks, gardens, and natural areas within or near cities', 'B. Eco-friendly buildings', 'C. Solar panels on rooftops', 'D. Electric vehicle charging points'], a: 'A' },
  { d: 'EASY', q: 'What does "crowded" mean?', opts: ['A. Đông đúc - có quá nhiều người', 'B. Vắng vẻ - ít người', 'C. Sạch sẽ', 'D. Yên tĩnh'], a: 'A' },
  { d: 'EASY', q: '"Hunger" means _____.', opts: ['A. The feeling of needing food / not having enough food', 'B. Having too much food', 'C. Being very thirsty', 'D. Living in a good house'], a: 'A' },
  { d: 'MEDIUM', q: '"Waste management" refers to _____.', opts: ['A. The process of collecting, treating, and disposing of rubbish', 'B. A type of city road', 'C. A housing program', 'D. A water treatment plan'], a: 'A' },
  { d: 'MEDIUM', q: 'What is "public health"?', opts: ['A. The health and well-being of all people in a community', 'B. Only hospitals', 'C. A type of insurance', 'D. A government ministry'], a: 'A' },
  { d: 'MEDIUM', q: '"Affordable housing" means housing that _____.', opts: ['A. People on average incomes can pay for', 'B. Is very luxurious', 'C. Is only for the rich', 'D. Is located far from the city'], a: 'A' },
  { d: 'HARD', q: 'What does "refugee" mean?', opts: ['A. A person forced to leave their country due to war, persecution, or disaster', 'B. A tourist', 'C. A government worker', 'D. A business traveller'], a: 'A' },
  { d: 'HARD', q: '"Population growth rate" measures _____.', opts: ['A. How fast a population is increasing or decreasing', 'B. The total number of people', 'C. The number of cities in a country', 'D. The average age of citizens'], a: 'A' },
  { d: 'EASY', q: 'What does "solution" mean?', opts: ['A. A way to solve a problem', 'B. The cause of a problem', 'C. A type of city', 'D. A type of transport'], a: 'A' },
  { d: 'MEDIUM', q: '"Natural resources" include _____.', opts: ['A. Water, land, forests, and minerals', 'B. Only oil and gas', 'C. Only buildings', 'D. Cars and machines'], a: 'A' },
  { d: 'EASY', q: '"Challenge" means _____.', opts: ['A. A difficult problem that needs to be solved', 'B. A type of game', 'C. A prize', 'D. A friendly meeting'], a: 'A' },
  { d: 'MEDIUM', q: '"Charity" refers to _____.', opts: ['A. An organization that helps people in need', 'B. A type of tax', 'C. A city planning department', 'D. A bank'], a: 'A' },
  { d: 'HARD', q: 'What is "urban sprawl"?', opts: ['A. The uncontrolled expansion of a city into surrounding rural areas', 'B. The renovation of city centres', 'C. The building of new highways', 'D. The development of suburbs with good planning'], a: 'A' },
  { d: 'HARD', q: '"Microplastics" in cities are _____.', opts: ['A. Tiny plastic particles that pollute water and soil', 'B. Small buildings', 'C. A type of public transport', 'D. A type of city light'], a: 'A' },
  { d: 'EASY', q: 'What does "hospital" mean?', opts: ['A. Bệnh viện - nơi điều trị bệnh nhân', 'B. Trường học', 'C. Công viên', 'D. Chợ'], a: 'A' },
  { d: 'MEDIUM', q: '"Employment" means _____.', opts: ['A. Having a job and earning money', 'B. Not having a job', 'C. Going to school', 'D. Owning a factory'], a: 'A' },
  { d: 'MEDIUM', q: '"Social services" in cities include _____.', opts: ['A. Healthcare, education, housing support, and welfare', 'B. Only police services', 'C. Only transport services', 'D. Only entertainment'], a: 'A' },
  { d: 'HARD', q: 'What is "smart city" technology?', opts: ['A. Using digital technology and data to improve city services and quality of life', 'B. A city with many computers', 'C. A city with only electric vehicles', 'D. A very old city'], a: 'A' },
  { d: 'HARD', q: '"Overstretched services" means _____.', opts: ['A. Public services under too much pressure because of high demand', 'B. Very good services', 'C. Services that are too cheap', 'D. Services that are not needed'], a: 'A' },
  { d: 'MEDIUM', q: 'What does "census" mean?', opts: ['A. An official count of a country\'s population', 'B. A type of tax', 'C. A city map', 'D. A school exam'], a: 'A' },
  { d: 'EASY', q: '"Neighbour" means _____.', opts: ['A. A person who lives near you', 'B. A person at school', 'C. A doctor', 'D. A government official'], a: 'A' },

  // ============================================================
  // PHẦN 2: NGỮ PHÁP - QUANTIFIERS + ARTICLES (20 câu)
  // ============================================================
  { d: 'EASY', q: 'Choose the correct quantifier: "There are _____ people in this city — it is very crowded."', opts: ['A. many', 'B. much', 'C. a little', 'D. few'], a: 'A' },
  { d: 'EASY', q: '"There isn\'t _____ clean water in this overcrowded slum."', opts: ['A. much', 'B. many', 'C. a few', 'D. several'], a: 'A' },
  { d: 'EASY', q: '"_____ of the world\'s largest cities are in Asia."', opts: ['A. Many', 'B. Much', 'C. A little', 'D. A few of'], a: 'A' },
  { d: 'EASY', q: '"There is _____ hope for improvement if the government acts now."', opts: ['A. some', 'B. many', 'C. few', 'D. several'], a: 'A' },
  { d: 'EASY', q: 'Choose the correct article: "_____ population of the world has reached 8 billion."', opts: ['A. The', 'B. A', 'C. An', 'D. No article'], a: 'A' },
  { d: 'EASY', q: '"This city has _____ green spaces — people have nowhere to relax." (very small amount)', opts: ['A. little', 'B. many', 'C. a lot of', 'D. enough'], a: 'A' },
  { d: 'MEDIUM', q: '"_____ cities in the world are struggling with overcrowding." (a large number)', opts: ['A. A lot of', 'B. Much', 'C. A little', 'D. Less'], a: 'A' },
  { d: 'MEDIUM', q: '"Is there _____ food available for all residents?" (question form)', opts: ['A. any', 'B. some', 'C. many', 'D. few'], a: 'A' },
  { d: 'MEDIUM', q: '"We have _____ time to solve the population problem — we must act now." (not enough)', opts: ['A. little', 'B. many', 'C. a lot of', 'D. enough'], a: 'A' },
  { d: 'MEDIUM', q: '"Only _____ countries have successfully reduced their population growth rate."', opts: ['A. a few', 'B. much', 'C. a little', 'D. any'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the correct article: "Tokyo is _____ most populated city in the world."', opts: ['A. the', 'B. a', 'C. an', 'D. no article'], a: 'A' },
  { d: 'MEDIUM', q: '"There are _____ problems in megacities: traffic, pollution, and housing shortages." (several)', opts: ['A. many', 'B. much', 'C. little', 'D. less'], a: 'A' },
  { d: 'MEDIUM', q: '"Not _____ information is available about slum populations." (a small amount - negative)', opts: ['A. much', 'B. many', 'C. few', 'D. several'], a: 'A' },
  { d: 'MEDIUM', q: '"They need _____ money to build new hospitals in poor areas." (a large amount)', opts: ['A. a lot of', 'B. many', 'C. few', 'D. a little'], a: 'A' },
  { d: 'HARD', q: 'Which sentence is CORRECT?', opts: ['A. There is very little affordable housing in this city.', 'B. There is very few affordable housing in this city.', 'C. There are very little affordable housings.', 'D. There is very much affordable housing.'], a: 'A' },
  { d: 'HARD', q: 'Choose the correct sentence about quantifiers:', opts: ['A. We have enough schools for the growing population.', 'B. We have enough school for the growing population.', 'C. We have many enough schools for the population.', 'D. We have much enough schools.'], a: 'A' },
  { d: 'HARD', q: '"_____ overcrowding causes _____ health problems." Fill with correct articles:', opts: ['A. —, many (no article needed, "many" is correct)', 'B. A, the', 'C. The, a', 'D. An, much'], a: 'A' },
  { d: 'HARD', q: 'Which is INCORRECT? "There are ___ people in megacities who lack basic services."', opts: ['A. much', 'B. many', 'C. a lot of', 'D. millions of'], a: 'A' },
  { d: 'HARD', q: 'Choose the correct form: "_____ progress has been made in reducing poverty in some cities."', opts: ['A. Some', 'B. Many', 'C. Few', 'D. Several'], a: 'A' },
  { d: 'HARD', q: '"Almost _____ cities in developing countries face housing shortages." Choose correctly:', opts: ['A. all', 'B. much', 'C. a little', 'D. less'], a: 'A' },

  // ============================================================
  // PHẦN 3: ĐỌC HIỂU (40 câu)
  // ============================================================
  // --- Đoạn 1: World Population ---
  { d: 'EASY', q: 'Read: "The world\'s population reached 8 billion in 2022. Most of this growth is happening in developing countries in Africa and Asia. By 2050, the world could have nearly 10 billion people." What was the world\'s population in 2022?', opts: ['A. 8 billion', 'B. 10 billion', 'C. 5 billion', 'D. 6 billion'], a: 'A' },
  { d: 'EASY', q: 'According to the world population text: Where is most population growth happening?', opts: ['A. In developing countries in Africa and Asia', 'B. In Europe and North America', 'C. In Australia', 'D. In South America only'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the world population text: By 2050, the world could have _____ people.', opts: ['A. nearly 10 billion', 'B. 8 billion', 'C. 5 billion', 'D. 20 billion'], a: 'A' },
  { d: 'HARD', q: 'The phrase "developing countries" in the text suggests these countries _____.', opts: ['A. are still growing economically and building their infrastructure', 'B. have the best living standards', 'C. have no population growth', 'D. are the smallest countries'], a: 'A' },
  // --- Đoạn 2: Megacities ---
  { d: 'MEDIUM', q: 'Read: "A megacity is a city with more than 10 million residents. Today there are about 35 megacities in the world, and most of them are in Asia. Tokyo is the largest with around 37 million people. Megacities create both opportunities and serious challenges." How many megacities are there today?', opts: ['A. About 35', 'B. About 10', 'C. About 100', 'D. About 50'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the megacity text: What is the largest megacity?', opts: ['A. Tokyo', 'B. Shanghai', 'C. Mumbai', 'D. New York'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the megacity text: Megacities create _____.', opts: ['A. Both opportunities and serious challenges', 'B. Only opportunities', 'C. Only problems', 'D. No changes'], a: 'A' },
  { d: 'HARD', q: 'Why does the megacity text say most megacities are in Asia?', opts: ['A. Because Asia has the largest and fastest-growing populations', 'B. Because Asia is the wealthiest region', 'C. Because Asia has the best climate', 'D. Because Asia has the most land'], a: 'A' },
  // --- Đoạn 3: Urbanization Problems ---
  { d: 'MEDIUM', q: 'Read: "When too many people move to cities too quickly, it creates many problems. There is not enough housing, schools, hospitals, or clean water for everyone. Many newcomers end up living in slums — crowded, unhealthy areas with poor sanitation." What is the main problem described?', opts: ['A. Cities cannot keep up with rapid population growth', 'B. Cities are too clean', 'C. People prefer to stay in rural areas', 'D. There are too many hospitals'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the urbanization text: What is a slum?', opts: ['A. A crowded and unhealthy area with poor sanitation', 'B. A luxury neighbourhood', 'C. A city park', 'D. A modern housing estate'], a: 'A' },
  { d: 'HARD', q: 'In the urbanization text, "newcomers" refers to _____.', opts: ['A. People who have recently moved to the city', 'B. Tourists visiting the city', 'C. Children born in the city', 'D. Government officials'], a: 'A' },
  { d: 'HARD', q: 'What does "poor sanitation" in the urbanization text mean?', opts: ['A. Lack of clean water and proper waste disposal systems', 'B. Not enough schools', 'C. Too many hospitals', 'D. Expensive houses'], a: 'A' },
  // --- Đoạn 4: Solutions to Overpopulation ---
  { d: 'MEDIUM', q: 'Read: "Governments can address overpopulation by improving education, especially for women and girls. When women have access to education and healthcare, birth rates tend to fall naturally. Better urban planning can also help cities manage growth more sustainably." What is one solution mentioned?', opts: ['A. Improving education for women and girls', 'B. Building more factories', 'C. Increasing birth rates', 'D. Reducing urban planning'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the solutions text: What happens when women have education and healthcare?', opts: ['A. Birth rates tend to fall naturally', 'B. Birth rates increase', 'C. Populations grow faster', 'D. Cities become more crowded'], a: 'A' },
  { d: 'HARD', q: '"Manage growth more sustainably" in the text means _____.', opts: ['A. Control city expansion in a way that can continue long-term without causing harm', 'B. Build as many buildings as possible', 'C. Attract more people to the city', 'D. Reduce the number of public services'], a: 'A' },
  // --- Đoạn 5: Rural-Urban Migration ---
  { d: 'MEDIUM', q: 'Read: "Every year, millions of people leave rural areas to find better opportunities in cities. They hope for higher wages, better schools, and improved healthcare. However, many discover that city life is harder than expected, with high living costs and fierce competition for jobs." Why do people move to cities?', opts: ['A. For better wages, schools, and healthcare', 'B. Because rural areas have no farmland', 'C. Because cities are quieter', 'D. To escape natural disasters only'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the migration text: What problems do some migrants face?', opts: ['A. High living costs and strong competition for jobs', 'B. Too much free time', 'C. Too many job opportunities', 'D. Very cheap rent'], a: 'A' },
  { d: 'HARD', q: '"Fierce competition" in the migration text means _____.', opts: ['A. Very strong and intense rivalry for jobs', 'B. Friendly cooperation', 'C. Easy job opportunities', 'D. Government job programs'], a: 'A' },
  // --- Đoạn 6: Smart Cities ---
  { d: 'MEDIUM', q: 'Read: "Smart cities use technology to solve urban problems. Sensors monitor traffic and reduce congestion. Digital systems manage waste collection and energy use. Singapore and Barcelona are leading examples. Smart city technology can make urban life healthier and more efficient." What is a smart city?', opts: ['A. A city that uses technology to manage urban problems', 'B. A city with the smartest citizens', 'C. A city with only electric vehicles', 'D. A city with many universities'], a: 'A' },
  { d: 'MEDIUM', q: 'According to the smart city text: Which cities are mentioned as examples?', opts: ['A. Singapore and Barcelona', 'B. Tokyo and London', 'C. New York and Paris', 'D. Mumbai and Berlin'], a: 'A' },
  { d: 'HARD', q: 'In the smart city text, "sensors" are used to _____.', opts: ['A. monitor and collect data to help manage city systems', 'B. entertain city residents', 'C. reduce the population', 'D. replace teachers in schools'], a: 'A' },
  // --- Đoạn 7: Poverty in Cities ---
  { d: 'MEDIUM', q: 'Read: "Urban poverty is a major challenge in many developing cities. People living in poverty often lack access to clean water, proper housing, healthcare, and education. Without these basic needs, it is very difficult to escape the cycle of poverty." What is the main topic?', opts: ['A. Urban poverty and its effects', 'B. Rural farming problems', 'C. Technology in cities', 'D. Transport in cities'], a: 'A' },
  { d: 'MEDIUM', q: 'Based on the poverty text: What do poor city residents often lack?', opts: ['A. Clean water, housing, healthcare, and education', 'B. Entertainment and shopping', 'C. Too much food', 'D. Good transport systems'], a: 'A' },
  { d: 'HARD', q: '"The cycle of poverty" in the text means _____.', opts: ['A. A situation where poverty passes from generation to generation and is hard to escape', 'B. A type of public transport', 'C. A government program', 'D. A seasonal change in income'], a: 'A' },
  // --- General comprehension ---
  { d: 'EASY', q: 'Read: "Ho Chi Minh City is one of Vietnam\'s fastest-growing cities." What does "fastest-growing" mean?', opts: ['A. The city is expanding very rapidly', 'B. The city has the fastest trains', 'C. The city is the oldest', 'D. The city is the cleanest'], a: 'A' },
  { d: 'MEDIUM', q: 'Read: "If cities do not plan for population growth, they will face serious housing shortages." What is the warning?', opts: ['A. Poor planning leads to housing shortages', 'B. Population growth is always good', 'C. Cities should stop growing', 'D. Housing is not important'], a: 'A' },
  { d: 'MEDIUM', q: 'Read: "Providing clean water to all residents is one of the biggest challenges for rapidly growing cities." What challenge is mentioned?', opts: ['A. Supplying clean water to all people', 'B. Building more roads', 'C. Creating more jobs', 'D. Improving air quality'], a: 'A' },
  { d: 'HARD', q: 'Read: "Although urbanization creates problems, it also drives economic growth and reduces rural poverty." What does this sentence suggest?', opts: ['A. Urbanization has both negative and positive effects', 'B. Urbanization has only negative effects', 'C. Urbanization only helps rural areas', 'D. Urbanization should be stopped'], a: 'A' },
  { d: 'HARD', q: 'Read: "Countries with falling birth rates and ageing populations face a different problem: not enough young workers." What problem is described?', opts: ['A. Too few young people to support an ageing society', 'B. Too many young workers', 'C. High birth rates', 'D. Rapid population growth'], a: 'A' },
  { d: 'HARD', q: 'Read: "Investment in education yields the highest return in addressing overpopulation long-term." What does "yields the highest return" mean?', opts: ['A. Produces the greatest benefit over time', 'B. Costs the most money', 'C. Takes the longest time', 'D. Is the most difficult option'], a: 'A' },
  { d: 'HARD', q: 'Read: "Megacities consume disproportionately large amounts of energy and water compared to their size." What does "disproportionately large" mean?', opts: ['A. Much more than what their size would suggest is fair', 'B. Exactly the right amount', 'C. A very small amount', 'D. An equal amount to rural areas'], a: 'A' },

  // ============================================================
  // PHẦN 4: GIAO TIẾP (30 câu)
  // ============================================================
  { d: 'EASY', q: 'What is the best response to: "What do you think causes overcrowding in cities?"', opts: ['A. "I think the main cause is rural-urban migration in search of better jobs."', 'B. "Cities are nice."', 'C. "I don\'t live in a city."', 'D. "I don\'t know."'], a: 'A' },
  { d: 'EASY', q: 'How do you express concern about a social problem?', opts: ['A. "I\'m really worried about the housing shortage in big cities."', 'B. "I don\'t care about cities."', 'C. "Cities are always perfect."', 'D. "This is not important."'], a: 'A' },
  { d: 'EASY', q: 'Your teacher asks: "Is population growth always bad?" A balanced answer is:', opts: ['A. "Not necessarily. Moderate growth can boost the economy, but rapid growth can strain resources."', 'B. "Yes, it is always bad."', 'C. "No, it is always good."', 'D. "I don\'t know."'], a: 'A' },
  { d: 'EASY', q: 'Someone asks: "What is a megacity?" You answer:', opts: ['A. "A megacity is a city with more than 10 million people."', 'B. "A megacity is a very clean city."', 'C. "A megacity is a small town."', 'D. "A megacity is a city in Europe."'], a: 'A' },
  { d: 'EASY', q: 'How do you suggest a solution in a discussion?', opts: ['A. "One possible solution could be to invest in affordable housing."', 'B. "There is nothing we can do."', 'C. "This problem cannot be solved."', 'D. "We should not discuss this."'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone argues: "Population growth is the main cause of poverty." How do you respond critically?', opts: ['A. "That\'s partly true, but unequal distribution of resources also plays a big role."', 'B. "Yes, you are 100% correct."', 'C. "Poverty doesn\'t exist."', 'D. "Population has nothing to do with poverty."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you give statistics in a discussion about urban population?', opts: ['A. "According to recent data, Tokyo has around 37 million people, making it the largest city."', 'B. "Tokyo has many people."', 'C. "Many people live there."', 'D. "Cities have lots of people."'], a: 'A' },
  { d: 'MEDIUM', q: 'Your friend says cities are better than villages. How do you give a balanced view?', opts: ['A. "Cities offer more opportunities, but villages have a better quality of life and lower costs."', 'B. "Cities are always better."', 'C. "Villages are always better."', 'D. "Both are bad."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you introduce a problem in a presentation?', opts: ['A. "One of the most pressing issues facing our world today is overpopulation."', 'B. "Overpopulation is not a problem."', 'C. "Let me tell you something funny."', 'D. "I don\'t want to talk about this."'], a: 'A' },
  { d: 'MEDIUM', q: 'To make a recommendation, you say:', opts: ['A. "I recommend that governments invest in family planning education."', 'B. "Governments do nothing."', 'C. "This is hopeless."', 'D. "Nobody should do anything."'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone asks about the effects of urbanization on Vietnam. You respond:', opts: ['A. "Urbanization has brought economic growth but also challenges like housing shortages and traffic congestion."', 'B. "Vietnam has no cities."', 'C. "Urbanization is good only."', 'D. "I never visited Vietnam."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you express agreement with a point about population?', opts: ['A. "I completely agree. Education is the key to managing population growth."', 'B. "That\'s wrong."', 'C. "I disagree completely."', 'D. "This is unimportant."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you conclude a group discussion about urban problems?', opts: ['A. "To sum up, cities face major challenges, but with smart planning and investment, they can overcome them."', 'B. "Cities are terrible and nothing can help."', 'C. "Let\'s not discuss further."', 'D. "I have no conclusion."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you ask for someone\'s opinion on urban poverty?', opts: ['A. "What do you think can be done to reduce urban poverty?"', 'B. "Stop talking about poverty."', 'C. "Poverty is not real."', 'D. "I don\'t discuss poverty."'], a: 'A' },
  { d: 'MEDIUM', q: 'How do you transition to a new point in a discussion?', opts: ['A. "Moving on to another issue, let\'s talk about housing shortages."', 'B. "Anyway, let\'s eat."', 'C. "Stop! No more talking."', 'D. "I\'m done."'], a: 'A' },
  { d: 'HARD', q: 'In a debate about population control, how would you argue FOR family planning programs?', opts: ['A. "Family planning gives people choices and helps reduce poverty by allowing families to have children they can fully support."', 'B. "People should not have children."', 'C. "Governments should control all births."', 'D. "This is not necessary."'], a: 'A' },
  { d: 'HARD', q: 'How would you explain the link between education and population growth to a younger student?', opts: ['A. "When girls stay in school longer, they tend to have children later and have smaller families, which slows population growth."', 'B. "Education makes people have more children."', 'C. "School has nothing to do with population."', 'D. "Only boys\' education matters."'], a: 'A' },
  { d: 'HARD', q: 'Which is the MOST persuasive argument for investing in slum upgrades?', opts: ['A. "Improving slums gives millions of people safe housing, better health, and a path out of poverty — benefiting the whole city."', 'B. "Slum residents should move elsewhere."', 'C. "Slums are not a real problem."', 'D. "Cities should ignore slums."'], a: 'A' },
  { d: 'HARD', q: 'How do you link a cause to its effect in a formal discussion?', opts: ['A. "Because of rapid urbanization, cities have struggled to provide adequate housing for all residents."', 'B. "Cities have housing problems."', 'C. "Urbanization is bad."', 'D. "Housing is expensive."'], a: 'A' },
  { d: 'HARD', q: 'Which response best acknowledges complexity in a population discussion?', opts: ['A. "The relationship between population and development is complex — rapid growth can both hinder and drive progress."', 'B. "More people always means more problems."', 'C. "Population growth is simply good."', 'D. "We cannot know anything."'], a: 'A' },
  { d: 'EASY', q: 'Which phrase invites someone to share a solution?', opts: ['A. "Do you have any ideas about how we could solve this problem?"', 'B. "Stop sharing ideas."', 'C. "Your ideas are wrong."', 'D. "We don\'t need solutions."'], a: 'A' },
  { d: 'EASY', q: 'How do you express surprise about a population fact?', opts: ['A. "Wow, I had no idea the world population had already reached 8 billion!"', 'B. "That\'s boring."', 'C. "I already knew everything."', 'D. "Numbers are unimportant."'], a: 'A' },
  { d: 'MEDIUM', q: 'Which sentence correctly adds information to a point?', opts: ['A. "Moreover, the lack of affordable housing worsens poverty in cities."', 'B. "But housing is fine."', 'C. "However, everything is good."', 'D. "Also cities are perfect."'], a: 'A' },
  { d: 'MEDIUM', q: 'Which sentence best introduces a contrasting point?', opts: ['A. "On the other hand, some cities have successfully managed population growth through smart planning."', 'B. "Cities always fail."', 'C. "All cities are the same."', 'D. "Planning doesn\'t help."'], a: 'A' },
  { d: 'MEDIUM', q: 'To ask for clarification in a discussion, you say:', opts: ['A. "Could you explain what you mean by that?"', 'B. "I don\'t want to listen."', 'C. "Stop talking."', 'D. "That makes no sense."'], a: 'A' },
  { d: 'HARD', q: 'Which statement best summarises the impact of overpopulation on resources?', opts: ['A. "As the population grows, demand for food, water, and energy increases, putting pressure on the planet\'s natural resources."', 'B. "More people means more food for everyone."', 'C. "Resources are unlimited."', 'D. "Overpopulation helps the environment."'], a: 'A' },
  { d: 'HARD', q: '"From a long-term perspective..." is used to introduce _____.', opts: ['A. A view about future outcomes', 'B. A personal emotion', 'C. A question', 'D. A command'], a: 'A' },
  { d: 'EASY', q: 'Which phrase shows you are giving an example?', opts: ['A. "For example, Tokyo has over 37 million residents."', 'B. "On the contrary..."', 'C. "In conclusion..."', 'D. "As a result..."'], a: 'A' },
  { d: 'MEDIUM', q: 'Someone says: "The city is hopeless." How do you respond constructively?', opts: ['A. "I understand the frustration, but there are many successful examples of cities improving their conditions."', 'B. "Yes, give up."', 'C. "You are right — do nothing."', 'D. "Cities are perfect."'], a: 'A' },
  { d: 'HARD', q: 'Which is the MOST academically appropriate way to open a discussion about urban poverty?', opts: ['A. "Urban poverty is a multifaceted issue affecting millions, and today I\'d like to explore its causes and possible solutions."', 'B. "Poor people live in cities."', 'C. "Poverty is bad."', 'D. "Let\'s talk about something else."'], a: 'A' },

  // ============================================================
  // PHẦN 5: SUY LUẬN (30 câu)
  // ============================================================
  { d: 'MEDIUM', q: 'If a city\'s population doubles in 10 years, what problem will most likely occur?', opts: ['A. Housing, water, and services will be stretched beyond their capacity', 'B. The city will have too many resources', 'C. Life will become easier for everyone', 'D. Schools will be empty'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might people in poor rural areas move to cities even though cities are overcrowded?', opts: ['A. They hope to find better jobs and higher wages to support their families', 'B. They prefer crowded environments', 'C. Rural areas have too much food', 'D. City governments invite them'], a: 'A' },
  { d: 'MEDIUM', q: 'If a country improves girls\' education and access to healthcare, what is likely to happen to its birth rate?', opts: ['A. It will decrease', 'B. It will increase sharply', 'C. It will not change', 'D. It will double'], a: 'A' },
  { d: 'MEDIUM', q: 'What can we infer if a megacity has a very high population density but few parks?', opts: ['A. Residents have very little access to green spaces and fresh air', 'B. Residents prefer concrete buildings', 'C. The city has too many parks', 'D. Residents do not need parks'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might slum residents have poorer health than people in other parts of a city?', opts: ['A. Because they lack clean water, sanitation, and access to healthcare', 'B. Because they eat too much food', 'C. Because they exercise too much', 'D. Because they live in very clean environments'], a: 'A' },
  { d: 'MEDIUM', q: 'If a government invests in affordable housing, what is the likely result?', opts: ['A. Fewer people will live in overcrowded slums', 'B. More slums will appear', 'C. Housing costs will increase', 'D. The population will grow faster'], a: 'A' },
  { d: 'MEDIUM', q: 'What can be concluded if a city\'s death rate falls but birth rate remains high?', opts: ['A. The population will grow faster', 'B. The population will shrink', 'C. The population will stay the same', 'D. More people will emigrate'], a: 'A' },
  { d: 'MEDIUM', q: 'Why is providing clean water especially important in overcrowded urban areas?', opts: ['A. Because overcrowding increases the risk of waterborne diseases spreading quickly', 'B. Because water is used for decoration', 'C. Because clean water reduces traffic', 'D. Because clean water reduces pollution only'], a: 'A' },
  { d: 'MEDIUM', q: 'If job opportunities are concentrated only in large cities, what will happen to rural areas?', opts: ['A. Young people will leave, and rural areas will lose their workforce', 'B. Rural areas will grow faster', 'C. Cities will lose population', 'D. Migration will stop'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might an ageing population create economic problems for a country?', opts: ['A. Fewer working-age people means less tax revenue and more spending on pensions and healthcare', 'B. Older people spend more money on entertainment', 'C. Older people create more businesses', 'D. The country will have more children'], a: 'A' },
  { d: 'HARD', q: 'What can be inferred if a country has a very high population density but strong infrastructure?', opts: ['A. The country can manage its large population effectively with good planning', 'B. The country is certain to have many problems', 'C. All citizens live in poverty', 'D. The country will run out of resources quickly'], a: 'A' },
  { d: 'HARD', q: 'Why might reducing child mortality rates actually slow population growth long-term?', opts: ['A. When parents know more children will survive, they choose to have fewer children overall', 'B. Fewer children die, so the population grows faster forever', 'C. Child mortality has no connection to birth rates', 'D. Reducing child mortality increases birth rates permanently'], a: 'A' },
  { d: 'HARD', q: 'What is a likely consequence of urban sprawl without proper planning?', opts: ['A. Destruction of farmland and natural habitats, and increased car dependence', 'B. Better public transport', 'C. Lower housing costs', 'D. Cleaner air in the suburbs'], a: 'A' },
  { d: 'HARD', q: 'Why might a smart city system reduce urban overcrowding problems?', opts: ['A. By using data to optimize resource distribution, public services, and traffic flow', 'B. By removing people from the city', 'C. By building taller buildings', 'D. By closing city gates'], a: 'A' },
  { d: 'HARD', q: 'What can be concluded if poverty rates in a city increase while its population grows rapidly?', opts: ['A. The city is not creating enough economic opportunities to match population growth', 'B. The city has too many schools', 'C. The city is too clean', 'D. More investment is needed in transport only'], a: 'A' },
  { d: 'HARD', q: 'Why might overcrowded cities in developing countries have higher crime rates?', opts: ['A. High unemployment, poverty, and inequality create conditions where crime is more likely', 'B. Cities attract criminals from other countries', 'C. Overcrowding directly causes people to commit crimes', 'D. Crime is always higher in warm climates'], a: 'A' },
  { d: 'HARD', q: 'What might happen if a city builds many new universities without creating corresponding jobs?', opts: ['A. Graduates may leave the city to find work elsewhere, causing a "brain drain"', 'B. The city will become very rich', 'C. More businesses will open automatically', 'D. The population will decrease'], a: 'A' },
  { d: 'HARD', q: 'Why is food security particularly challenging in rapidly growing cities?', opts: ['A. Cities do not produce their own food and depend on supply chains that can be disrupted by population growth', 'B. Cities grow too much food', 'C. People in cities do not eat regularly', 'D. Food is always cheaper in cities'], a: 'A' },
  { d: 'MEDIUM', q: 'What is a likely benefit if a city develops good public transport?', opts: ['A. Fewer private cars, less congestion, and reduced air pollution', 'B. More traffic jams', 'C. Higher housing costs', 'D. Fewer schools needed'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might children in overcrowded schools learn less effectively?', opts: ['A. There are too many students per teacher, and resources are limited', 'B. Children prefer crowded classrooms', 'C. Overcrowding makes children smarter', 'D. Teachers prefer large classes'], a: 'A' },
  { d: 'EASY', q: 'If a family has access to clean water, what health benefit do they gain?', opts: ['A. Lower risk of waterborne diseases like cholera and typhoid', 'B. Better traffic conditions', 'C. Higher education levels', 'D. More job opportunities'], a: 'A' },
  { d: 'MEDIUM', q: 'What can we infer if a city\'s birth rate falls below its death rate?', opts: ['A. The population will begin to shrink unless immigration compensates', 'B. The population will grow rapidly', 'C. The city will become very crowded', 'D. Nothing will change'], a: 'A' },
  { d: 'MEDIUM', q: 'Why might a child born in a slum have fewer opportunities than a child born in a wealthy suburb?', opts: ['A. Limited access to quality education, healthcare, and nutrition affects development and future prospects', 'B. Slum children are less intelligent', 'C. Wealthy suburbs have more traffic', 'D. Slum children prefer not to study'], a: 'A' },
  { d: 'HARD', q: 'What can be inferred about a country with both high urbanization AND falling poverty rates?', opts: ['A. The country is successfully managing growth and distributing economic benefits broadly', 'B. The country is not growing', 'C. The country has too many rural areas', 'D. The country has stopped building cities'], a: 'A' },
  { d: 'HARD', q: 'Why might "green spaces" in cities improve both mental and physical health?', opts: ['A. They provide areas for exercise, fresh air, and stress relief in dense urban environments', 'B. They provide farmland for city residents', 'C. They increase population density', 'D. They make cities noisier'], a: 'A' },
  { d: 'MEDIUM', q: 'What would likely happen if all cities in a country became overcrowded?', opts: ['A. The quality of life would decrease for many residents due to strained services', 'B. Everyone would be happier', 'C. The country would become wealthier immediately', 'D. Rural areas would also become overcrowded'], a: 'A' },
  { d: 'HARD', q: 'Why do cities often have greater inequality than rural areas?', opts: ['A. Cities concentrate both wealth and poverty in close proximity, making differences more visible and extreme', 'B. Rural areas are all equally poor', 'C. Cities always share wealth equally', 'D. Inequality does not exist in rural areas'], a: 'A' },
  { d: 'HARD', q: 'What can be concluded from the fact that many developing country capitals have populations growing 3x faster than the national average?', opts: ['A. Migration to capital cities is extremely rapid, putting enormous pressure on urban services', 'B. National populations are shrinking', 'C. Rural areas are growing faster', 'D. Capital cities are shrinking'], a: 'A' },
  { d: 'MEDIUM', q: 'If a neighbourhood improves its sanitation systems, what immediate benefit would residents experience?', opts: ['A. Reduced spread of disease and improved public health', 'B. More traffic in the area', 'C. Higher rents immediately', 'D. More pollution'], a: 'A' },
  { d: 'HARD', q: 'Why is international cooperation important in addressing global overpopulation?', opts: ['A. Because population pressures in one country can affect migration, resources, and stability in others', 'B. Because countries should not help each other', 'C. Because population is only a local issue', 'D. Because international cooperation is not helpful'], a: 'A' },

  // ============================================================
  // PHẦN 6: VIẾT LẠI CÂU (30 câu)
  // ============================================================
  // Passive
  { d: 'MEDIUM', q: 'Rewrite using passive: "The government builds new schools every year."', opts: ['A. New schools are built by the government every year.', 'B. New schools build by the government every year.', 'C. The government is built new schools.', 'D. New schools were built every year.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "Authorities are addressing the housing problem."', opts: ['A. The housing problem is being addressed by authorities.', 'B. The housing problem was addressed by authorities.', 'C. Authorities are being addressed the housing problem.', 'D. The housing problem addressed by authorities.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "They have improved sanitation in many slum areas."', opts: ['A. Sanitation has been improved in many slum areas.', 'B. Sanitation improved in many slum areas.', 'C. Sanitation have been improved in slum areas.', 'D. Sanitation being improved in slum areas.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite using passive: "Planners will design new affordable housing estates."', opts: ['A. New affordable housing estates will be designed by planners.', 'B. New affordable housing estates will designed by planners.', 'C. Planners will be designed new housing estates.', 'D. New housing estates designed by planners.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite using passive: "Researchers have found that education reduces birth rates."', opts: ['A. It has been found by researchers that education reduces birth rates.', 'B. Education was found to reduce birth rates.', 'C. It found that education reduces birth rates.', 'D. Researchers have been found education reduces birth rates.'], a: 'A' },
  // Conditional
  { d: 'MEDIUM', q: 'Rewrite as a conditional: "More schools exist. Birth rates fall." (If...will)', opts: ['A. If more schools exist, birth rates will fall.', 'B. If birth rates fall, more schools will exist.', 'C. More schools exist if birth rates fell.', 'D. If more schools existed, birth rates fall.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Without clean water, many people will become ill." Using "If":', opts: ['A. If there is no clean water, many people will become ill.', 'B. If there is clean water, many people will become ill.', 'C. Without clean water, many people become ill.', 'D. Many people will become ill if they have clean water.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "The city didn\'t invest in public transport. There is now terrible congestion." (Type 3)', opts: ['A. If the city had invested in public transport, there would not be terrible congestion now.', 'B. If the city invested in public transport, there would not be congestion.', 'C. If the city had invested, there will be no congestion.', 'D. If the city invest, congestion not exist.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "I don\'t have enough money to move out of the slum." (Type 2: If I...)', opts: ['A. If I had enough money, I could move out of the slum.', 'B. If I have enough money, I can move out of the slum.', 'C. If I had enough money, I will move out of the slum.', 'D. If I would have money, I could move out.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Unless the government acts now, the situation will worsen." Using "If...not":', opts: ['A. If the government does not act now, the situation will worsen.', 'B. If the government acts now, the situation will worsen.', 'C. The situation worsens unless the government acts.', 'D. If the situation worsens, the government acts.'], a: 'A' },
  // Reported speech
  { d: 'MEDIUM', q: 'Rewrite: She said, "The city is too crowded."', opts: ['A. She said that the city was too crowded.', 'B. She said that the city is too crowded.', 'C. She told the city is too crowded.', 'D. She said city too crowded.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: He said, "I will find affordable housing."', opts: ['A. He said that he would find affordable housing.', 'B. He said that he will find affordable housing.', 'C. He told he would find affordable housing.', 'D. He said he find affordable housing.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Are you planning to move to the city?" she asked him.', opts: ['A. She asked him if he was planning to move to the city.', 'B. She asked him are you planning to move.', 'C. She asked him if he is planning to move.', 'D. She asked that he was planning.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: The expert said, "Urbanization has created serious challenges."', opts: ['A. The expert said that urbanization had created serious challenges.', 'B. The expert said that urbanization has created serious challenges.', 'C. The expert told urbanization created serious challenges.', 'D. The expert said urbanization serious challenges.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "Don\'t build houses near the river!" the official warned us.', opts: ['A. The official warned us not to build houses near the river.', 'B. The official warned us don\'t build houses near the river.', 'C. The official told us not building near the river.', 'D. The official warned build not houses near river.'], a: 'A' },
  // Quantifiers in sentences
  { d: 'MEDIUM', q: 'Fill in correctly: "There are _____ problems in this city to ignore." (too many)', opts: ['A. too many', 'B. too much', 'C. enough', 'D. few'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "The city has very few parks." Using "not enough":', opts: ['A. The city does not have enough parks.', 'B. The city has not many parks.', 'C. The city has few enough parks.', 'D. The city has not enough parks enough.'], a: 'A' },
  // Cause and effect
  { d: 'MEDIUM', q: 'Combine: "The city is overcrowded. Services are under pressure." Using "because of":', opts: ['A. Because of overcrowding, services are under pressure.', 'B. Because services are under pressure, the city is overcrowded.', 'C. Overcrowded because services pressure.', 'D. Under pressure because the city overcrowded.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "Urbanization is rapid. Housing shortages occur." Using "due to":', opts: ['A. Due to rapid urbanization, housing shortages occur.', 'B. Due to housing shortages, rapid urbanization occurs.', 'C. Urbanization rapid due to housing.', 'D. Due to urbanization, housing is rapid.'], a: 'A' },
  // Comparison
  { d: 'MEDIUM', q: 'Rewrite: "The slum has worse sanitation than the suburb." Using "not as...as":', opts: ['A. The slum\'s sanitation is not as good as the suburb\'s.', 'B. The suburb\'s sanitation is not as good as the slum\'s.', 'C. The slum is as good as the suburb.', 'D. The suburb has worse sanitation than the slum.'], a: 'A' },
  // Purpose
  { d: 'MEDIUM', q: 'Combine: "The government builds parks. People can relax." Using "so that":', opts: ['A. The government builds parks so that people can relax.', 'B. People relax so that the government builds parks.', 'C. The government builds parks because people relax.', 'D. So that people relax, parks build.'], a: 'A' },
  // Too/Enough
  { d: 'MEDIUM', q: 'Rewrite: "The apartment is too expensive. The family cannot rent it." Using "so...that":', opts: ['A. The apartment is so expensive that the family cannot rent it.', 'B. The apartment is too expensive to the family cannot rent it.', 'C. So expensive the apartment, family cannot rent.', 'D. The family cannot rent the apartment so it is expensive.'], a: 'A' },
  { d: 'MEDIUM', q: 'Rewrite: "The child is too young to understand overpopulation." Using "not old enough":', opts: ['A. The child is not old enough to understand overpopulation.', 'B. The child is not young enough to understand overpopulation.', 'C. The child too young for understand overpopulation.', 'D. The child is old enough to understand overpopulation.'], a: 'A' },
  // Modal verbs
  { d: 'MEDIUM', q: 'Rewrite: "It is important to educate people about family planning." Using "should":', opts: ['A. People should be educated about family planning.', 'B. People must educating about family planning.', 'C. People can educate about family planning.', 'D. People should educating about family planning.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "It is necessary that cities invest in public transport." Using "must":', opts: ['A. Cities must invest in public transport.', 'B. Cities should investing in public transport.', 'C. Cities must investing in public transport.', 'D. Cities must invested in public transport.'], a: 'A' },
  // Despite / Although
  { d: 'MEDIUM', q: 'Rewrite: "Although the city is crowded, it has many opportunities." Using "Despite":', opts: ['A. Despite being crowded, the city has many opportunities.', 'B. Despite the city has many opportunities, it is crowded.', 'C. Despite crowded the city has many opportunities.', 'D. Although the city has many opportunities despite crowded.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "Despite the challenges, many migrants succeed in cities." Using "Although":', opts: ['A. Although there are many challenges, many migrants succeed in cities.', 'B. Although many migrants succeed, there are challenges.', 'C. Despite although challenges, migrants succeed.', 'D. Although despite the challenges migrants succeed.'], a: 'A' },
  // Not only...but also
  { d: 'HARD', q: 'Combine: "Overcrowding causes health problems. It also causes social inequality." Using "not only...but also":', opts: ['A. Overcrowding not only causes health problems but also causes social inequality.', 'B. Overcrowding causes not only but also health problems.', 'C. Not only overcrowding causes health problems, but also social inequality causes.', 'D. Overcrowding only causes health and inequality problems.'], a: 'A' },
  // Mixed
  { d: 'HARD', q: 'Rewrite: "People say that megacities are hard to manage." Using passive beginning "Megacities...":', opts: ['A. Megacities are said to be hard to manage.', 'B. Megacities said to be hard to manage.', 'C. Megacities are said being hard to manage.', 'D. Megacities will be said hard to manage.'], a: 'A' },
  { d: 'HARD', q: 'Combine two ideas: "The birth rate is falling. The death rate is also falling. The population is still growing." Using "even though":', opts: ['A. Even though both the birth rate and death rate are falling, the population is still growing.', 'B. Even though the population is growing, the birth rate is falling.', 'C. The birth rate is falling even though the population grows.', 'D. Even though the death rate is falling, the birth rate grows.'], a: 'A' },
  { d: 'HARD', q: 'Rewrite: "The government should provide affordable housing. This would reduce homelessness." Combine using "which":', opts: ['A. The government should provide affordable housing, which would reduce homelessness.', 'B. The government provide affordable housing which would reduce.', 'C. Affordable housing which the government should provide reduce homelessness.', 'D. The government should which provide affordable housing reduce homelessness.'], a: 'A' },
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
