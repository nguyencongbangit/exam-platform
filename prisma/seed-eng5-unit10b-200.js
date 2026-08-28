const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const TOPIC_ID = 'cmt3q1oc9000jloc75tv26dlv';
const QUESTIONS = [
  {d:'EASY',q:'What is a "baker"?',opts:['A. người làm bánh mì','B. người bán hoa','C. người lái xe','D. người thợ hồ']},
  {d:'EASY',q:'What does a "gardener" do?',opts:['A. chăm sóc cây và vườn','B. bán hoa quả','C. trồng lúa','D. nấu ăn']},
  {d:'EASY',q:'What is a "fisherman"?',opts:['A. người đánh cá','B. người nuôi cá','C. người bán cá','D. người nấu cá']},
  {d:'EASY',q:'What does a "painter" do?',opts:['A. vẽ tranh hoặc sơn nhà','B. bán màu vẽ','C. thiết kế nhà','D. dạy nghệ thuật']},
  {d:'EASY',q:'What is a "cleaner"?',opts:['A. người dọn vệ sinh','B. người bán nước rửa','C. người thiết kế','D. người nấu ăn']},
  {d:'EASY',q:'What does a "reporter" do?',opts:['A. đưa tin tức trên TV hoặc báo','B. thiết kế quảng cáo','C. in sách báo','D. phân phối báo']},
  {d:'EASY',q:'What is a "barber"?',opts:['A. thợ cắt tóc','B. thợ may','C. thợ làm móng','D. thợ massage']},
  {d:'EASY',q:'What does a "receptionist" do?',opts:['A. tiếp đón khách và trả lời điện thoại','B. quản lý tài chính','C. dọn phòng khách sạn','D. nấu ăn trong nhà hàng']},
  {d:'MEDIUM',q:'What is a "translator"?',opts:['A. người dịch ngôn ngữ','B. người dạy ngôn ngữ','C. người viết sách','D. người in sách']},
  {d:'MEDIUM',q:'What does a "surgeon" do?',opts:['A. thực hiện phẫu thuật','B. kê đơn thuốc','C. lấy máu xét nghiệm','D. chụp X-quang']},
  {d:'MEDIUM',q:'What is a "programmer"?',opts:['A. người viết mã máy tính','B. người sửa máy tính','C. người bán máy tính','D. người dạy tin học']},
  {d:'MEDIUM',q:'What does a "designer" do?',opts:['A. tạo ra các mẫu thiết kế đẹp','B. xây dựng công trình','C. bán vải và quần áo','D. in ấn tài liệu']},
  {d:'MEDIUM',q:'What is an "electrician"?',opts:['A. thợ điện sửa hệ thống điện','B. thợ nước','C. thợ làm kính','D. thợ sơn']},
  {d:'MEDIUM',q:'What does a "plumber" do?',opts:['A. sửa hệ thống ống nước','B. lắp đặt điện','C. sơn nhà','D. làm mái nhà']},
  {d:'HARD',q:'What is a "psychologist"?',opts:['A. chuyên gia về tâm lý học','B. bác sĩ phẫu thuật','C. nhà nghiên cứu lịch sử','D. người huấn luyện thể thao']},
  {d:'HARD',q:'What does an "economist" do?',opts:['A. nghiên cứu về kinh tế','B. quản lý ngân hàng','C. thu thuế cho chính phủ','D. kiểm toán tài chính']},
  // Grammar: Simple Present - jobs (25)
  {d:'EASY',q:'A baker ___ bread every morning.',opts:['A. bakes','B. bake','C. baking','D. baked']},
  {d:'EASY',q:'The cleaner ___ the school every day.',opts:['A. cleans','B. clean','C. cleaning','D. cleaned']},
  {d:'EASY',q:'Fishermen ___ fish in the sea.',opts:['A. catch','B. catches','C. catching','D. caught']},
  {d:'EASY',q:'A reporter ___ news on TV.',opts:['A. presents','B. present','C. presenting','D. presented']},
  {d:'EASY',q:'My uncle ___ cars in a garage.',opts:['A. fixes','B. fix','C. fixing','D. fixed']},
  {d:'MEDIUM',q:'The surgeon ___ many operations every week.',opts:['A. performs','B. perform','C. performing','D. performed']},
  {d:'MEDIUM',q:'Programmers ___ software for computers.',opts:['A. create','B. creates','C. creating','D. created']},
  {d:'MEDIUM',q:'The barber ___ people\'s hair.',opts:['A. cuts','B. cut','C. cutting','D. cutted']},
  {d:'MEDIUM',q:'Translators ___ text from one language to another.',opts:['A. translate','B. translates','C. translating','D. translated']},
  {d:'MEDIUM',q:'The gardener ___ the flowers in the park.',opts:['A. waters','B. water','C. watering','D. watered']},
  {d:'HARD',q:'An electrician ___ electrical systems in buildings.',opts:['A. installs','B. install','C. installing','D. installed']},
  {d:'HARD',q:'The psychologist ___ people with their mental problems.',opts:['A. helps','B. help','C. helping','D. helped']},
  {d:'EASY',q:'A painter ___ beautiful pictures.',opts:['A. paints','B. paint','C. painting','D. painted']},
  {d:'MEDIUM',q:'The designer ___ clothes for famous people.',opts:['A. makes','B. make','C. making','D. made']},
  {d:'HARD',q:'The plumber ___ the broken pipes in our house.',opts:['A. fixes','B. fix','C. fixing','D. fixed']},
  // Negative sentences about jobs (15)
  {d:'EASY',q:'Teachers ___ work in hospitals.',opts:['A. don\'t','B. doesn\'t','C. isn\'t','D. aren\'t']},
  {d:'EASY',q:'A pilot ___ drive a bus.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  {d:'MEDIUM',q:'Farmers ___ work in offices.',opts:['A. don\'t','B. doesn\'t','C. won\'t','D. aren\'t']},
  {d:'MEDIUM',q:'A chef ___ fix cars.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  {d:'HARD',q:'A journalist ___ perform operations.',opts:['A. doesn\'t','B. don\'t','C. isn\'t','D. aren\'t']},
  // Questions about jobs (20)
  {d:'EASY',q:'___ does a baker work?',opts:['A. Where','B. What','C. Who','D. Why']},
  {d:'EASY',q:'___ do farmers grow?',opts:['A. What','B. Where','C. When','D. Who']},
  {d:'EASY',q:'___ does a doctor help?',opts:['A. Who','B. What','C. Where','D. How']},
  {d:'MEDIUM',q:'___ does a pilot need to fly a plane? He needs training and a licence.',opts:['A. What','B. Who','C. Where','D. When']},
  {d:'MEDIUM',q:'___ do firefighters go when there is a fire?',opts:['A. Where','B. What','C. Who','D. How']},
  {d:'MEDIUM',q:'___ long does it take to become a doctor?',opts:['A. How','B. What','C. Where','D. Who']},
  {d:'HARD',q:'___ do programmers use to write software?',opts:['A. What','B. Where','C. Who','D. When']},
  {d:'HARD',q:'___ is the job of a translator different from a teacher?',opts:['A. How','B. What','C. Where','D. Who']},
  // Job descriptions - match (20)
  {d:'EASY',q:'This person makes and sells bread and cakes. Who is this?',opts:['A. a baker','B. a chef','C. a farmer','D. a gardener']},
  {d:'EASY',q:'This person takes care of gardens and plants. Who is this?',opts:['A. a gardener','B. a farmer','C. a florist','D. a cleaner']},
  {d:'EASY',q:'This person catches fish in the sea. Who is this?',opts:['A. a fisherman','B. a swimmer','C. a sailor','D. a diver']},
  {d:'MEDIUM',q:'This person repairs pipes and water systems. Who is this?',opts:['A. a plumber','B. an electrician','C. a mechanic','D. a carpenter']},
  {d:'MEDIUM',q:'This person writes code and programs for computers. Who is this?',opts:['A. a programmer','B. an engineer','C. a designer','D. a scientist']},
  {d:'MEDIUM',q:'This person converts text or speech from one language to another. Who is this?',opts:['A. a translator','B. a journalist','C. a writer','D. a teacher']},
  {d:'HARD',q:'This person studies the human mind and treats mental health issues. Who is this?',opts:['A. a psychologist','B. a neurologist','C. a psychiatrist','D. a therapist']},
  {d:'HARD',q:'This person installs and repairs electrical systems. Who is this?',opts:['A. an electrician','B. a mechanic','C. an engineer','D. a plumber']},
  // Mixed review (30)
  {d:'EASY',q:'Which sentence is correct?',opts:['A. She is a nurse.','B. She is an nurse.','C. She is the nurse.','D. She is nurse.']},
  {d:'EASY',q:'Which sentence is correct?',opts:['A. He wants to be a pilot.','B. He want to be a pilot.','C. He wanting to be a pilot.','D. He wanted be a pilot.']},
  {d:'EASY',q:'Choose the correct answer: My father works ___ a hospital.',opts:['A. in','B. at','C. on','D. for']},
  {d:'EASY',q:'Choose: She ___ English in a primary school.',opts:['A. teaches','B. teach','C. teaching','D. is teach']},
  {d:'MEDIUM',q:'What does "career" mean?',opts:['A. nghề nghiệp lâu dài','B. trường học','C. giờ làm việc','D. nơi làm việc']},
  {d:'MEDIUM',q:'Choose: Doctors and nurses are ___ workers.',opts:['A. healthcare','B. healthy','C. health','D. healing']},
  {d:'MEDIUM',q:'Which word means "người thợ điện"?',opts:['A. electrician','B. mechanic','C. engineer','D. plumber']},
  {d:'MEDIUM',q:'Which word means "lập trình viên"?',opts:['A. programmer','B. designer','C. journalist','D. scientist']},
  {d:'HARD',q:'Choose the best answer: In the future, robots ___ do many of the jobs that humans do now.',opts:['A. will','B. would','C. can','D. could']},
  {d:'HARD',q:'What does "salary" mean?',opts:['A. tiền lương','B. tiền thưởng','C. tiền học phí','D. tiền tiết kiệm']},
  {d:'EASY',q:'Policemen and firefighters are ___ who keep us safe.',opts:['A. people','B. things','C. places','D. animals']},
  {d:'EASY',q:'A good doctor needs to be ___.',opts:['A. caring and skilled','B. fast and noisy','C. lazy and slow','D. rude and careless']},
  {d:'MEDIUM',q:'Which is the odd one out? (not a person)',opts:['A. hospital','B. doctor','C. nurse','D. surgeon']},
  {d:'MEDIUM',q:'A: I work in a school. I teach children. Who am I? B: You are ___.',opts:['A. a teacher','B. a nurse','C. a chef','D. a driver']},
  {d:'MEDIUM',q:'A: I wear a white coat. I give medicine. Who am I? B: You are ___.',opts:['A. a doctor','B. a soldier','C. a pilot','D. an engineer']},
  {d:'HARD',q:'A: I work at night. I bake bread for the morning. Who am I? B: You are ___.',opts:['A. a baker','B. a chef','C. a cook','D. a farmer']},
  {d:'HARD',q:'A: I travel to different countries for my job. I interview people and write stories. Who am I? B: You are ___.',opts:['A. a journalist','B. a writer','C. a translator','D. a reporter']},
  {d:'EASY',q:'He is ___ actor. He performs in movies.',opts:['A. an','B. a','C. the','D. some']},
  {d:'MEDIUM',q:'She is ___ honest and hardworking police officer.',opts:['A. an','B. a','C. the','D. some']},
  {d:'HARD',q:'To become ___ professional singer, you need talent and practice.',opts:['A. a','B. an','C. the','D. some']},
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
