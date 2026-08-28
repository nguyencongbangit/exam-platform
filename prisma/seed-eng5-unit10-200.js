const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1oc9000jloc75tv26dlv';
const QUESTIONS = [
  // Jobs vocabulary (40)
  {d:'EASY',q:'What is a "teacher"?',opts:['A. người dạy học','B. người nấu ăn','C. người lái xe','D. người bán hàng']},
  {d:'EASY',q:'What does a "doctor" do?',opts:['A. chữa bệnh cho người','B. dạy học sinh','C. nấu thức ăn','D. xây nhà']},
  {d:'EASY',q:'What is a "farmer"?',opts:['A. người làm nông nghiệp','B. người bác sĩ','C. người lính','D. người thợ may']},
  {d:'EASY',q:'What does a "firefighter" do?',opts:['A. dập lửa và cứu người','B. trồng cây','C. lái máy bay','D. bán hàng']},
  {d:'EASY',q:'What is a "nurse"?',opts:['A. y tá chăm sóc bệnh nhân','B. người thợ xây','C. người lái tàu','D. người đầu bếp']},
  {d:'EASY',q:'What does a "pilot" do?',opts:['A. lái máy bay','B. lái xe buýt','C. dạy học','D. bán thuốc']},
  {d:'EASY',q:'What is a "chef"?',opts:['A. đầu bếp nấu ăn chuyên nghiệp','B. người trồng rau','C. người bán cá','D. người lái xe']},
  {d:'EASY',q:'What does a "police officer" do?',opts:['A. bảo vệ trật tự và an toàn','B. chữa bệnh','C. dạy học','D. xây nhà']},
  {d:'EASY',q:'What is a "dentist"?',opts:['A. bác sĩ răng','B. bác sĩ mắt','C. bác sĩ tim','D. bác sĩ xương']},
  {d:'EASY',q:'What does an "engineer" do?',opts:['A. thiết kế và xây dựng công trình','B. hát và biểu diễn','C. dạy học sinh','D. bán hàng']},
  {d:'EASY',q:'What is a "singer"?',opts:['A. người ca sĩ hát nhạc','B. người thợ may','C. người nấu ăn','D. người lái xe']},
  {d:'EASY',q:'What does a "driver" do?',opts:['A. lái xe','B. nấu ăn','C. khám bệnh','D. trồng cây']},
  {d:'EASY',q:'What is a "soldier"?',opts:['A. người lính bảo vệ đất nước','B. người bán hàng','C. người thầy giáo','D. người đầu bếp']},
  {d:'EASY',q:'What does a "carpenter" do?',opts:['A. làm đồ gỗ','B. trồng rau','C. chữa bệnh','D. dạy học']},
  {d:'EASY',q:'What is a "scientist"?',opts:['A. nhà khoa học nghiên cứu','B. người bán thuốc','C. người lái tàu','D. người thợ may']},
  {d:'MEDIUM',q:'What does a "librarian" do?',opts:['A. quản lý sách trong thư viện','B. lái máy bay','C. nấu ăn trong nhà hàng','D. chữa bệnh cho người']},
  {d:'MEDIUM',q:'What is a "journalist"?',opts:['A. người viết báo và đưa tin','B. người bán hàng','C. người thợ xây','D. người lái xe buýt']},
  {d:'MEDIUM',q:'What does an "architect" do?',opts:['A. thiết kế các tòa nhà','B. trồng cây trong vườn','C. dạy học sinh','D. bán hoa quả']},
  {d:'MEDIUM',q:'What is a "veterinarian"?',opts:['A. bác sĩ thú y chữa bệnh cho động vật','B. bác sĩ trẻ em','C. người nuôi động vật','D. người bán thú cưng']},
  {d:'MEDIUM',q:'What does a "mechanic" do?',opts:['A. sửa chữa xe và máy móc','B. trồng rau','C. dạy học','D. lái tàu']},
  {d:'MEDIUM',q:'What is an "accountant"?',opts:['A. người kế toán quản lý tài chính','B. người bảo vệ','C. người thợ may','D. người bán hàng']},
  {d:'MEDIUM',q:'What does a "postman" do?',opts:['A. giao thư và bưu phẩm','B. bán tem','C. lái xe buýt','D. trồng cây']},
  {d:'MEDIUM',q:'What is a "waiter"?',opts:['A. người phục vụ trong nhà hàng','B. người nấu ăn','C. người quản lý nhà hàng','D. người dọn dẹp']},
  {d:'MEDIUM',q:'What does a "tailor" do?',opts:['A. may và sửa quần áo','B. bán vải','C. trồng bông','D. thiết kế tòa nhà']},
  {d:'MEDIUM',q:'What is a "pharmacist"?',opts:['A. người bán thuốc tại nhà thuốc','B. bác sĩ khám bệnh','C. người xét nghiệm','D. người giao thuốc']},
  // What do/does ... do? (30)
  {d:'EASY',q:'What ___ your father do?',opts:['A. does','B. do','C. is','D. are']},
  {d:'EASY',q:'What do you want to ___ when you grow up?',opts:['A. be','B. do','C. have','D. make']},
  {d:'EASY',q:'My mother is a nurse. She ___ sick people.',opts:['A. helps','B. help','C. helping','D. helped']},
  {d:'EASY',q:'He ___ in a hospital. He is a doctor.',opts:['A. works','B. work','C. working','D. worked']},
  {d:'EASY',q:'Teachers ___ in schools.',opts:['A. work','B. works','C. working','D. worked']},
  {d:'EASY',q:'What does she ___? She is a pilot.',opts:['A. do','B. does','C. is','D. are']},
  {d:'EASY',q:'___ your mom work in an office?',opts:['A. Does','B. Do','C. Is','D. Are']},
  {d:'MEDIUM',q:'What ___ firefighters do? They put out fires.',opts:['A. do','B. does','C. is','D. are']},
  {d:'MEDIUM',q:'My uncle is a farmer. He ___ rice and vegetables.',opts:['A. grows','B. grow','C. growing','D. grown']},
  {d:'MEDIUM',q:'She is a chef. She ___ delicious food.',opts:['A. cooks','B. cook','C. cooking','D. cooked']},
  {d:'MEDIUM',q:'The police ___ people safe.',opts:['A. keep','B. keeps','C. keeping','D. kept']},
  {d:'MEDIUM',q:'What do scientists ___?',opts:['A. do','B. does','C. are','D. is']},
  {d:'MEDIUM',q:'He ___ English at a primary school.',opts:['A. teaches','B. teach','C. teaching','D. taught']},
  {d:'MEDIUM',q:'What does your brother ___? He is an engineer.',opts:['A. do','B. does','C. is','D. make']},
  {d:'MEDIUM',q:'Nurses ___ after patients in hospitals.',opts:['A. look','B. looks','C. looking','D. looked']},
  // "want to be" structures (20)
  {d:'EASY',q:'I want to be a doctor ___ I grow up.',opts:['A. when','B. if','C. because','D. but']},
  {d:'EASY',q:'She wants to be a teacher ___ the future.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'What do you want to ___?',opts:['A. be','B. are','C. is','D. were']},
  {d:'EASY',q:'He wants ___ be a pilot someday.',opts:['A. to','B. of','C. for','D. in']},
  {d:'MEDIUM',q:'They want to be engineers ___ they like building things.',opts:['A. because','B. but','C. or','D. and']},
  {d:'MEDIUM',q:'My dream ___ to become a famous singer.',opts:['A. is','B. are','C. was','D. were']},
  {d:'MEDIUM',q:'She doesn\'t want to be a soldier ___ it is dangerous.',opts:['A. because','B. but','C. so','D. and']},
  {d:'MEDIUM',q:'What job ___ you like to have in the future?',opts:['A. would','B. will','C. do','D. are']},
  {d:'HARD',q:'Why do you want to be a doctor? ___ I want to help sick people.',opts:['A. Because','B. But','C. So','D. And']},
  {d:'HARD',q:'He ___become a chef because he loves cooking.',opts:['A. wants to','B. want to','C. wanting to','D. wanted']},
  // Job places vocabulary (20)
  {d:'EASY',q:'Where does a teacher work?',opts:['A. ở trường học','B. ở bệnh viện','C. ở nhà máy','D. ở trang trại']},
  {d:'EASY',q:'Where does a doctor work?',opts:['A. ở bệnh viện','B. ở trường học','C. ở nhà hàng','D. ở cửa hàng']},
  {d:'EASY',q:'Where does a farmer work?',opts:['A. trên đồng ruộng','B. trong văn phòng','C. trong bệnh viện','D. trong nhà máy']},
  {d:'EASY',q:'Where does a chef work?',opts:['A. trong nhà hàng hoặc bếp','B. trong trường học','C. trong bệnh viện','D. ngoài đồng']},
  {d:'MEDIUM',q:'Where does a pilot work?',opts:['A. trên máy bay','B. trên xe lửa','C. trên thuyền','D. trong văn phòng']},
  {d:'MEDIUM',q:'Where does a librarian work?',opts:['A. trong thư viện','B. trong trường học','C. trong bệnh viện','D. trong siêu thị']},
  {d:'MEDIUM',q:'Where does a firefighter work?',opts:['A. tại trạm cứu hỏa','B. tại đồn cảnh sát','C. tại bệnh viện','D. tại sân bay']},
  {d:'MEDIUM',q:'Where does a mechanic work?',opts:['A. trong xưởng sửa xe','B. trong nhà máy','C. trong văn phòng','D. trong bệnh viện']},
  // Reading comprehension (50)
  {d:'MEDIUM',q:'Read: "My name is Lan. My mother is a nurse. She works in a hospital. She helps sick people every day." What does Lan\'s mother do?',opts:['A. She is a nurse.','B. She is a doctor.','C. She is a teacher.','D. She is a chef.']},
  {d:'MEDIUM',q:'Read: "My name is Lan. My mother is a nurse. She works in a hospital. She helps sick people every day." Where does she work?',opts:['A. in a hospital','B. in a school','C. in a restaurant','D. in an office']},
  {d:'MEDIUM',q:'Read: "Tom\'s father is a pilot. He flies planes to many countries. Tom thinks his father\'s job is exciting." What is Tom\'s father?',opts:['A. a pilot','B. a driver','C. a soldier','D. an engineer']},
  {d:'MEDIUM',q:'Read: "Tom\'s father is a pilot. He flies planes to many countries." What does Tom\'s father do?',opts:['A. He flies planes.','B. He drives buses.','C. He builds houses.','D. He teaches students.']},
  {d:'MEDIUM',q:'Read: "Anna wants to be a vet because she loves animals. She will study hard to achieve her dream." Why does Anna want to be a vet?',opts:['A. Because she loves animals.','B. Because she loves medicine.','C. Because her parents are vets.','D. Because it is easy.']},
  {d:'MEDIUM',q:'Read: "Peter is a carpenter. He makes tables, chairs, and shelves from wood. People buy his furniture." What does Peter make?',opts:['A. furniture from wood','B. clothes from cloth','C. food from vegetables','D. toys from plastic']},
  {d:'MEDIUM',q:'Read: "Ms. Green is a journalist. She writes news stories for a newspaper. She interviews many people." What does Ms. Green write?',opts:['A. news stories','B. science books','C. poems','D. recipes']},
  {d:'MEDIUM',q:'Read: "My uncle is a police officer. He works hard to keep our city safe. He helps people in trouble." What does the uncle do?',opts:['A. keeps the city safe','B. teaches people','C. builds roads','D. flies planes']},
  {d:'HARD',q:'Read: "Nam\'s dream is to be an astronaut. He studies science and maths every day. He believes hard work will help him reach the stars." What subject does Nam study?',opts:['A. science and maths','B. art and music','C. history and geography','D. English and literature']},
  {d:'HARD',q:'Read: "Nam\'s dream is to be an astronaut." What does "astronaut" mean in Vietnamese?',opts:['A. phi hành gia','B. phi công','C. kỹ sư','D. nhà khoa học']},
  {d:'MEDIUM',q:'Read: "Sara is a singer. She performs on stage every weekend. Many people come to hear her beautiful voice." When does Sara perform?',opts:['A. every weekend','B. every morning','C. every evening','D. every Monday']},
  {d:'MEDIUM',q:'Read: "Jack wants to be a firefighter. He is brave and strong. He wants to save people from fires." What two qualities does Jack have?',opts:['A. brave and strong','B. smart and quiet','C. kind and slow','D. tall and thin']},
  {d:'MEDIUM',q:'Read: "My sister is an accountant. She works in an office. She checks numbers and manages money." Where does the sister work?',opts:['A. in an office','B. in a bank','C. in a school','D. at home']},
  {d:'HARD',q:'Read: "Being a doctor is hard work. You study for many years. But you can help many people and save lives." Why is being a doctor difficult?',opts:['A. You study for many years.','B. It costs a lot of money.','C. You work outside all day.','D. You have to travel a lot.']},
  {d:'HARD',q:'Read: "A good teacher is patient, kind, and knowledgeable. Teachers shape the future of the country." What qualities does a good teacher have?',opts:['A. patient, kind, and knowledgeable','B. strong, brave, and fast','C. funny, loud, and active','D. quiet, short, and thin']},
  {d:'MEDIUM',q:'Read: "My dad is an engineer. He designs bridges and buildings. He uses computers and maths in his work." What tools does he use?',opts:['A. computers and maths','B. hammers and nails','C. pencils and paint','D. knives and pans']},
  {d:'HARD',q:'Read: "In the future, I want to be a scientist. I will discover new things and help people understand the world." What will the person do as a scientist?',opts:['A. discover new things','B. build new roads','C. write new books','D. sing new songs']},
  {d:'HARD',q:'Read: "A chef needs creativity and passion for food. A good chef can make ordinary ingredients taste extraordinary." What does a chef need?',opts:['A. creativity and passion for food','B. strength and speed','C. patience and silence','D. knowledge of maths']},
  {d:'MEDIUM',q:'Read: "Bin\'s mother is a pharmacist. She works in a pharmacy and gives medicine to sick people." Where does Bin\'s mother work?',opts:['A. in a pharmacy','B. in a hospital','C. in a clinic','D. in a school']},
  {d:'HARD',q:'Read: "Many children dream of becoming famous. Some want to be singers, actors, or athletes. Hard work is the key to making dreams come true." What is the key to success according to the text?',opts:['A. Hard work','B. Good luck','C. Rich parents','D. Good looks']},
  // Dialogue / communication (20)
  {d:'EASY',q:'A: What does your father do? B: ___',opts:['A. He is a teacher.','B. He does a teacher.','C. He have a teacher.','D. He being a teacher.']},
  {d:'EASY',q:'A: What do you want to be? B: I want to be ___ engineer.',opts:['A. an','B. a','C. the','D. some']},
  {d:'EASY',q:'A: Where does a nurse work? B: She works ___ a hospital.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'A: Is your mom a doctor? B: No, she ___. She is a nurse.',opts:['A. isn\'t','B. is','C. doesn\'t','D. don\'t']},
  {d:'MEDIUM',q:'A: What job would you like in the future? B: ___ like to be a scientist.',opts:['A. I\'d','B. I\'m','C. I\'ll','D. I\'ve']},
  {d:'MEDIUM',q:'A: Why do you want to be a teacher? B: Because I ___ helping children.',opts:['A. love','B. loves','C. loved','D. loving']},
  {d:'MEDIUM',q:'A: Does your sister work in a school? B: Yes, she ___.',opts:['A. does','B. do','C. is','D. are']},
  {d:'MEDIUM',q:'A: What does an architect do? B: An architect ___ buildings.',opts:['A. designs','B. design','C. designing','D. designed']},
  {d:'HARD',q:'A: How long do you have to study to become a doctor? B: You have to study for ___ years.',opts:['A. many','B. much','C. some','D. every']},
  {d:'HARD',q:'A: What are the qualities of a good police officer? B: A good police officer should be ___ and brave.',opts:['A. honest','B. quiet','C. lazy','D. weak']},
  {d:'EASY',q:'A: ___ does your uncle do? B: He is a pilot.',opts:['A. What','B. Where','C. When','D. How']},
  {d:'EASY',q:'A: Does a chef work in a restaurant? B: Yes, usually ___.',opts:['A. they do','B. they are','C. they have','D. they were']},
  {d:'MEDIUM',q:'A: My dream job is to be a singer. B: Really? Do you ___ well?',opts:['A. sing','B. singing','C. sang','D. sung']},
  {d:'MEDIUM',q:'A: What do farmers do? B: They ___ crops and raise animals.',opts:['A. grow','B. grows','C. growing','D. grown']},
  {d:'HARD',q:'A: Why is teaching an important job? B: Because teachers help ___ learn and grow.',opts:['A. children','B. patient','C. machine','D. building']},
  {d:'MEDIUM',q:'A: Can you tell me about your job? B: Sure! I am a journalist. I ___ news every day.',opts:['A. write','B. writes','C. writing','D. written']},
  {d:'HARD',q:'A: What inspired you to become a doctor? B: I wanted to help ___ in need.',opts:['A. people','B. plant','C. animal','D. building']},
  {d:'EASY',q:'A: My father is a soldier. B: Wow! His job sounds ___.',opts:['A. dangerous','B. danger','C. dangerously','D. dangering']},
  {d:'MEDIUM',q:'A: Does a pilot need special training? B: Yes, pilots need ___ of training.',opts:['A. lots','B. lot','C. much','D. many']},
  {d:'HARD',q:'A: What skills does a carpenter need? B: A carpenter needs to be good ___ working with wood.',opts:['A. at','B. in','C. on','D. for']},
  // Grammar: articles a/an before jobs (15)
  {d:'EASY',q:'She is ___ nurse.',opts:['A. a','B. an','C. the','D. some']},
  {d:'EASY',q:'He is ___ engineer.',opts:['A. an','B. a','C. the','D. some']},
  {d:'EASY',q:'My dad is ___ farmer.',opts:['A. a','B. an','C. the','D. some']},
  {d:'EASY',q:'She wants to be ___ actress.',opts:['A. an','B. a','C. the','D. some']},
  {d:'MEDIUM',q:'He is ___ honest police officer.',opts:['A. an','B. a','C. the','D. some']},
  {d:'MEDIUM',q:'She is ___ architect who designs beautiful buildings.',opts:['A. an','B. a','C. the','D. some']},
  {d:'MEDIUM',q:'My cousin wants to be ___ astronaut one day.',opts:['A. an','B. a','C. the','D. some']},
  {d:'HARD',q:'She became ___ excellent scientist after years of study.',opts:['A. an','B. a','C. the','D. some']},
  {d:'HARD',q:'He is ___ unusual kind of engineer — he builds robots.',opts:['A. an','B. a','C. the','D. some']},
  // Odd one out / classification (15)
  {d:'EASY',q:'Which job works in a hospital?',opts:['A. doctor','B. farmer','C. pilot','D. carpenter']},
  {d:'EASY',q:'Which job works outdoors in a field?',opts:['A. farmer','B. nurse','C. chef','D. accountant']},
  {d:'EASY',q:'Which job involves flying?',opts:['A. pilot','B. teacher','C. chef','D. tailor']},
  {d:'MEDIUM',q:'Which job works in a kitchen?',opts:['A. chef','B. soldier','C. journalist','D. engineer']},
  {d:'MEDIUM',q:'Which of these is NOT a healthcare job?',opts:['A. pilot','B. doctor','C. nurse','D. dentist']},
  {d:'MEDIUM',q:'Which job involves writing and reporting news?',opts:['A. journalist','B. librarian','C. accountant','D. carpenter']},
  {d:'HARD',q:'Which of these jobs requires the most years of university study?',opts:['A. doctor','B. waiter','C. postman','D. driver']},
  {d:'HARD',q:'Which job would you find in a courtroom?',opts:['A. lawyer','B. chef','C. pilot','D. farmer']},
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
  console.log(`📌 Unit 10 - Jobs We Do: ${total} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 5: ${allEng5} câu`);
}
main().catch(console.error).finally(() => p.$disconnect());
