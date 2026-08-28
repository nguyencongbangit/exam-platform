// 200 câu hỏi Grammar - Câu bị động - Tiếng Anh lớp 7
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const TOPIC_ID = 'cmt322xlu000veq3rvrb5t91r'; // Grammar - Câu bị động

const QUESTIONS = [
  // ── PASSIVE – PRESENT SIMPLE (40 câu) ──
  { d: 'EASY', q: 'English ___ (speak) all over the world.', opts: ['A. is spoken', 'B. speaks', 'C. was spoken', 'D. is speaking'], a: 'A' },
  { d: 'EASY', q: 'These cars ___ (make) in Japan.', opts: ['A. are made', 'B. make', 'C. were made', 'D. are making'], a: 'A' },
  { d: 'EASY', q: 'The newspaper ___ (deliver) every morning.', opts: ['A. is delivered', 'B. delivers', 'C. was delivered', 'D. is delivering'], a: 'A' },
  { d: 'EASY', q: 'Rice ___ (grow) in many parts of Asia.', opts: ['A. is grown', 'B. grows', 'C. was grown', 'D. is growing'], a: 'A' },
  { d: 'EASY', q: 'The windows ___ (clean) every week.', opts: ['A. are cleaned', 'B. clean', 'C. were cleaned', 'D. are cleaning'], a: 'A' },
  { d: 'EASY', q: 'The passive voice in present simple is formed with ___ + past participle.', opts: ['A. am/is/are', 'B. was/were', 'C. has/have been', 'D. will be'], a: 'A' },
  { d: 'EASY', q: 'Football ___ (play) by millions of people worldwide.', opts: ['A. is played', 'B. plays', 'C. was played', 'D. is playing'], a: 'A' },
  { d: 'EASY', q: 'Letters ___ (not/send) by email nowadays – they are typed.', opts: ['A. are not sent', 'B. don\'t send', 'C. were not sent', 'D. are not sending'], a: 'A' },
  { d: 'EASY', q: '___ this language ___ (speak) in Vietnam?', opts: ['A. Is ... spoken', 'B. Does ... speak', 'C. Was ... spoken', 'D. Is ... speaking'], a: 'A' },
  { d: 'EASY', q: 'The rubbish ___ (collect) on Mondays and Thursdays.', opts: ['A. is collected', 'B. collects', 'C. was collected', 'D. is collecting'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the CORRECT passive sentence in present simple:', opts: ['A. Vietnamese food is enjoyed by people around the world.', 'B. Vietnamese food is enjoy by people around the world.', 'C. Vietnamese food enjoys by people around the world.', 'D. Vietnamese food was enjoy by people around the world.'], a: 'A' },
  { d: 'MEDIUM', q: '"The results ___ (publish) online every year." Fill in.', opts: ['A. are published', 'B. publish', 'C. were published', 'D. are publishing'], a: 'A' },
  { d: 'MEDIUM', q: '"Diamonds ___ (form) under extreme heat and pressure." Fill in.', opts: ['A. are formed', 'B. form', 'C. were formed', 'D. are forming'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "They clean the classroom every day." →', opts: ['A. The classroom is cleaned every day.', 'B. The classroom cleans every day.', 'C. The classroom was cleaned every day.', 'D. The classroom is cleaning every day.'], a: 'A' },
  { d: 'MEDIUM', q: '"The shop ___ (open) at 8 am and ___ (close) at 9 pm." Fill in.', opts: ['A. is opened / is closed', 'B. opens / closes', 'C. was opened / was closed', 'D. is opening / is closing'], a: 'A' },
  { d: 'MEDIUM', q: '"Pho ___ (make) with rice noodles and broth." Fill in (general fact).', opts: ['A. is made', 'B. makes', 'C. was made', 'D. is making'], a: 'A' },
  { d: 'MEDIUM', q: '"How many languages ___ (speak) in Vietnam?" Fill in.', opts: ['A. are spoken', 'B. do speak', 'C. were spoken', 'D. are speaking'], a: 'A' },
  { d: 'HARD', q: '"The information ___ (update) regularly by the team." Fill in.', opts: ['A. is updated', 'B. updates', 'C. was updated', 'D. is updating'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT passive sentence in present simple:', opts: ['A. The report is write by the manager. ("write" should be "written")', 'B. The report is written by the manager.', 'C. These shoes are manufactured in Vietnam.', 'D. The exam results are announced every semester.'], a: 'A' },
  { d: 'HARD', q: '"The passive is preferred when ___."', opts: ['A. the agent is unknown, unimportant, or obvious', 'B. we always want to emphasise the subject', 'C. the action is in the future only', 'D. the sentence has no object'], a: 'A' },
  { d: 'EASY', q: 'The prize ___ (award) to the best student each year.', opts: ['A. is awarded', 'B. awards', 'C. was awarded', 'D. is awarding'], a: 'A' },
  { d: 'EASY', q: 'These documents ___ (sign) by the director.', opts: ['A. are signed', 'B. sign', 'C. were signed', 'D. are signing'], a: 'A' },
  { d: 'MEDIUM', q: '"A lot of energy ___ (waste) every day." Fill in.', opts: ['A. is wasted', 'B. wastes', 'C. was wasted', 'D. is wasting'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "Someone cleans the office every evening." →', opts: ['A. The office is cleaned every evening.', 'B. The office cleans every evening.', 'C. The office was cleaned every evening.', 'D. The office is being cleaned every evening.'], a: 'A' },
  { d: 'HARD', q: '"Gold ___ (find) in rivers and mines." Fill in.', opts: ['A. is found', 'B. finds', 'C. was found', 'D. is finding'], a: 'A' },
  { d: 'HARD', q: '"The passive of \'people speak English widely\' is ___."', opts: ['A. English is spoken widely.', 'B. English speaks widely.', 'C. English was spoken widely.', 'D. English is speaking widely.'], a: 'A' },
  { d: 'EASY', q: 'The exam ___ (hold) once a semester.', opts: ['A. is held', 'B. holds', 'C. was held', 'D. is holding'], a: 'A' },
  { d: 'MEDIUM', q: '"Students ___ (teach) grammar in Year 7." Fill in.', opts: ['A. are taught', 'B. teach', 'C. were taught', 'D. are teaching'], a: 'A' },
  { d: 'HARD', q: 'Passive with "by" phrase: "The new policy ___ (announce) by the government." Fill in.', opts: ['A. is announced', 'B. announces', 'C. was announced', 'D. is announcing'], a: 'A' },
  { d: 'MEDIUM', q: '"The concert ___ (broadcast) live on national television." Fill in.', opts: ['A. is broadcast', 'B. broadcasts', 'C. was broadcast', 'D. is broadcasting'], a: 'A' },
  { d: 'HARD', q: '"How ___ rice ___ (harvest) in Vietnam?" Fill in passive.', opts: ['A. is ... harvested', 'B. does ... harvest', 'C. was ... harvested', 'D. is ... harvesting'], a: 'A' },
  { d: 'EASY', q: 'The books ___ (return) to the library after two weeks.', opts: ['A. are returned', 'B. return', 'C. were returned', 'D. are returning'], a: 'A' },
  { d: 'MEDIUM', q: '"Letters ___ (not/write) by hand as often as before." Fill in.', opts: ['A. are not written', 'B. don\'t write', 'C. were not written', 'D. are not writing'], a: 'A' },
  { d: 'HARD', q: '"In passive sentences without a \'by\' phrase, the agent is ___."', opts: ['A. unknown, unimportant, or obvious from context', 'B. always the subject', 'C. always mentioned', 'D. only omitted in formal writing'], a: 'A' },
  { d: 'EASY', q: 'New laws ___ (pass) by the government every year.', opts: ['A. are passed', 'B. pass', 'C. were passed', 'D. are passing'], a: 'A' },
  { d: 'MEDIUM', q: '"The waste ___ (sort) into different bins." Fill in.', opts: ['A. is sorted', 'B. sorts', 'C. was sorted', 'D. is sorting'], a: 'A' },
  { d: 'HARD', q: 'Convert to passive: "They do not teach Latin in most schools anymore." →', opts: ['A. Latin is not taught in most schools anymore.', 'B. Latin does not teach in most schools anymore.', 'C. Latin was not taught in most schools anymore.', 'D. Latin is not teaching in most schools anymore.'], a: 'A' },
  { d: 'EASY', q: 'The room ___ (use) as a storage area.', opts: ['A. is used', 'B. uses', 'C. was used', 'D. is using'], a: 'A' },
  { d: 'MEDIUM', q: '"Where ___ this product ___?" Fill in passive.', opts: ['A. is ... made', 'B. does ... make', 'C. was ... made', 'D. is ... making'], a: 'A' },
  { d: 'HARD', q: 'Passive of stative verb: "The statue ___ (know) worldwide for its beauty." Fill in.', opts: ['A. is known', 'B. knows', 'C. was known', 'D. is knowing'], a: 'A' },

  // ── PASSIVE – PAST SIMPLE (40 câu) ──
  { d: 'EASY', q: 'The Eiffel Tower ___ (build) in 1889.', opts: ['A. was built', 'B. built', 'C. is built', 'D. has been built'], a: 'A' },
  { d: 'EASY', q: 'The letter ___ (write) last night.', opts: ['A. was written', 'B. wrote', 'C. is written', 'D. has been written'], a: 'A' },
  { d: 'EASY', q: 'The windows ___ (not/break) by the children.', opts: ['A. weren\'t broken', 'B. didn\'t break', 'C. aren\'t broken', 'D. haven\'t been broken'], a: 'A' },
  { d: 'EASY', q: '___ the message ___ (receive) on time?', opts: ['A. Was ... received', 'B. Did ... receive', 'C. Is ... received', 'D. Has ... been received'], a: 'A' },
  { d: 'EASY', q: 'Past simple passive is formed with ___ + past participle.', opts: ['A. was/were', 'B. am/is/are', 'C. has/have been', 'D. will be'], a: 'A' },
  { d: 'EASY', q: 'The thief ___ (catch) by the police last night.', opts: ['A. was caught', 'B. caught', 'C. is caught', 'D. has been caught'], a: 'A' },
  { d: 'EASY', q: 'Three goals ___ (score) in the first half of the match.', opts: ['A. were scored', 'B. scored', 'C. are scored', 'D. have been scored'], a: 'A' },
  { d: 'EASY', q: 'The old bridge ___ (destroy) in the storm.', opts: ['A. was destroyed', 'B. destroyed', 'C. is destroyed', 'D. has been destroyed'], a: 'A' },
  { d: 'MEDIUM', q: 'Choose the CORRECT past simple passive:', opts: ['A. Van Mieu was built in 1070.', 'B. Van Mieu builded in 1070.', 'C. Van Mieu is built in 1070.', 'D. Van Mieu was build in 1070.'], a: 'A' },
  { d: 'MEDIUM', q: '"The novel ___ (write) by a Vietnamese author in 1965." Fill in.', opts: ['A. was written', 'B. wrote', 'C. is written', 'D. has been written'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "Leonardo da Vinci painted the Mona Lisa." →', opts: ['A. The Mona Lisa was painted by Leonardo da Vinci.', 'B. The Mona Lisa painted by Leonardo da Vinci.', 'C. The Mona Lisa is painted by Leonardo da Vinci.', 'D. The Mona Lisa was paint by Leonardo da Vinci.'], a: 'A' },
  { d: 'MEDIUM', q: '"The injured people ___ (take) to hospital immediately." Fill in.', opts: ['A. were taken', 'B. took', 'C. are taken', 'D. have been taken'], a: 'A' },
  { d: 'MEDIUM', q: '"___ the exam ___ (hold) last Saturday?" Fill in.', opts: ['A. Was ... held', 'B. Did ... hold', 'C. Is ... held', 'D. Has ... been held'], a: 'A' },
  { d: 'MEDIUM', q: '"The homework ___ (not/finish) by the students." Fill in.', opts: ['A. wasn\'t finished', 'B. didn\'t finish', 'C. isn\'t finished', 'D. hasn\'t been finished'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "The teacher corrected our essays." →', opts: ['A. Our essays were corrected by the teacher.', 'B. Our essays corrected by the teacher.', 'C. Our essays are corrected by the teacher.', 'D. Our essays was corrected by the teacher.'], a: 'A' },
  { d: 'HARD', q: '"The suspect ___ (question) by the police for three hours." Fill in.', opts: ['A. was questioned', 'B. questioned', 'C. is questioned', 'D. has been questioned'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT past simple passive sentence:', opts: ['A. The cake was ate by the children. ("ate" should be "eaten")', 'B. The cake was eaten by the children.', 'C. The report was submitted on time.', 'D. The old building was demolished last year.'], a: 'A' },
  { d: 'HARD', q: '"All the trees ___ (cut down) to build the new road." Fill in.', opts: ['A. were cut down', 'B. cut down', 'C. are cut down', 'D. have been cut down'], a: 'A' },
  { d: 'EASY', q: 'The film ___ (direct) by a famous Vietnamese director.', opts: ['A. was directed', 'B. directed', 'C. is directed', 'D. has been directed'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "They gave him an award." →', opts: ['A. He was given an award.', 'B. He given an award.', 'C. He was give an award.', 'D. An award was give to him.'], a: 'A' },
  { d: 'HARD', q: '"The decision ___ (make) without consulting the team." Fill in.', opts: ['A. was made', 'B. made', 'C. is made', 'D. has been made'], a: 'A' },
  { d: 'EASY', q: 'The documents ___ (send) to the wrong address.', opts: ['A. were sent', 'B. sent', 'C. are sent', 'D. have been sent'], a: 'A' },
  { d: 'MEDIUM', q: '"The city ___ (found) over 1,000 years ago." Fill in.', opts: ['A. was founded', 'B. founded', 'C. is founded', 'D. has been founded'], a: 'A' },
  { d: 'HARD', q: '"A new vaccine ___ (develop) by scientists last year." Fill in.', opts: ['A. was developed', 'B. developed', 'C. is developed', 'D. has been developed'], a: 'A' },
  { d: 'EASY', q: 'The poem ___ (write) by a student in Year 7.', opts: ['A. was written', 'B. wrote', 'C. is written', 'D. has been written'], a: 'A' },
  { d: 'MEDIUM', q: '"Many lives ___ (save) by the doctors during the disaster." Fill in.', opts: ['A. were saved', 'B. saved', 'C. are saved', 'D. have been saved'], a: 'A' },
  { d: 'HARD', q: 'Convert to passive: "Nobody told her about the meeting." →', opts: ['A. She was not told about the meeting.', 'B. She not told about the meeting.', 'C. She was not tell about the meeting.', 'D. She is not told about the meeting.'], a: 'A' },
  { d: 'EASY', q: 'The road ___ (repair) last month.', opts: ['A. was repaired', 'B. repaired', 'C. is repaired', 'D. has been repaired'], a: 'A' },
  { d: 'MEDIUM', q: '"The competition ___ (win) by a student from Hanoi." Fill in.', opts: ['A. was won', 'B. won', 'C. is won', 'D. has been won'], a: 'A' },
  { d: 'HARD', q: '"The ancient texts ___ (translate) into modern Vietnamese." Fill in.', opts: ['A. were translated', 'B. translated', 'C. are translated', 'D. have been translated'], a: 'A' },
  { d: 'EASY', q: 'The package ___ (deliver) yesterday afternoon.', opts: ['A. was delivered', 'B. delivered', 'C. is delivered', 'D. has been delivered'], a: 'A' },
  { d: 'MEDIUM', q: '"The match ___ (cancel) due to heavy rain." Fill in.', opts: ['A. was cancelled', 'B. cancelled', 'C. is cancelled', 'D. has been cancelled'], a: 'A' },

  // ── PASSIVE – PRESENT CONTINUOUS (20 câu) ──
  { d: 'EASY', q: 'The road ___ (repair) at the moment.', opts: ['A. is being repaired', 'B. is repaired', 'C. was being repaired', 'D. has been repaired'], a: 'A' },
  { d: 'EASY', q: 'A new hospital ___ (build) in our city right now.', opts: ['A. is being built', 'B. is built', 'C. was being built', 'D. has been built'], a: 'A' },
  { d: 'EASY', q: 'Present continuous passive is formed with ___ + being + V3.', opts: ['A. am/is/are', 'B. was/were', 'C. has/have', 'D. will'], a: 'A' },
  { d: 'EASY', q: 'The students ___ (teach) a new grammar point now.', opts: ['A. are being taught', 'B. are taught', 'C. were being taught', 'D. have been taught'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "They are renovating the old theatre." →', opts: ['A. The old theatre is being renovated.', 'B. The old theatre is renovated.', 'C. The old theatre was being renovated.', 'D. The old theatre has been renovated.'], a: 'A' },
  { d: 'MEDIUM', q: '"The reports ___ (prepare) right now." Fill in.', opts: ['A. are being prepared', 'B. are prepared', 'C. were being prepared', 'D. have been prepared'], a: 'A' },
  { d: 'MEDIUM', q: '"___ the project ___ (discuss) at this moment?" Fill in.', opts: ['A. Is ... being discussed', 'B. Is ... discussed', 'C. Was ... being discussed', 'D. Has ... been discussed'], a: 'A' },
  { d: 'MEDIUM', q: '"The exam papers ___ (not/mark) yet." Fill in present continuous passive.', opts: ['A. are not being marked', 'B. are not marked', 'C. were not being marked', 'D. have not been marked'], a: 'A' },
  { d: 'HARD', q: 'Identify the CORRECT present continuous passive:', opts: ['A. The suspect is being interviewed by detectives right now.', 'B. The suspect is being interview by detectives right now.', 'C. The suspect was being interviewed by detectives right now.', 'D. The suspect has being interviewed by detectives right now.'], a: 'A' },
  { d: 'HARD', q: '"New regulations ___ (introduce) by the government at the moment." Fill in.', opts: ['A. are being introduced', 'B. are introduced', 'C. were being introduced', 'D. have been introduced'], a: 'A' },
  { d: 'EASY', q: 'The flowers ___ (water) by the gardener now.', opts: ['A. are being watered', 'B. are watered', 'C. were being watered', 'D. have been watered'], a: 'A' },
  { d: 'MEDIUM', q: '"A new bridge ___ (construct) across the river." Fill in for present continuous.', opts: ['A. is being constructed', 'B. is constructed', 'C. was being constructed', 'D. has been constructed'], a: 'A' },
  { d: 'HARD', q: 'Convert to passive: "Scientists are currently testing the new drug." →', opts: ['A. The new drug is currently being tested by scientists.', 'B. The new drug is currently tested by scientists.', 'C. The new drug was currently being tested by scientists.', 'D. The new drug has been tested by scientists.'], a: 'A' },
  { d: 'EASY', q: 'The house ___ (paint) at the moment.', opts: ['A. is being painted', 'B. is painted', 'C. was being painted', 'D. has been painted'], a: 'A' },
  { d: 'MEDIUM', q: '"The children ___ (look after) by the teacher right now." Fill in.', opts: ['A. are being looked after', 'B. are looked after', 'C. were being looked after', 'D. have been looked after'], a: 'A' },
  { d: 'HARD', q: '"The policy ___ (debate) in parliament as we speak." Fill in.', opts: ['A. is being debated', 'B. is debated', 'C. was being debated', 'D. has been debated'], a: 'A' },
  { d: 'EASY', q: 'Dinner ___ (cook) in the kitchen right now.', opts: ['A. is being cooked', 'B. is cooked', 'C. was being cooked', 'D. has been cooked'], a: 'A' },
  { d: 'MEDIUM', q: '"Why ___ the meeting ___?" "The manager is still busy." Fill in passive.', opts: ['A. is ... being delayed', 'B. is ... delayed', 'C. was ... being delayed', 'D. has ... been delayed'], a: 'A' },
  { d: 'HARD', q: '"The injured players ___ (treat) by the team doctors." Fill in for continuous passive.', opts: ['A. are being treated', 'B. are treated', 'C. were being treated', 'D. have been treated'], a: 'A' },
  { d: 'HARD', q: 'Convert to passive: "They are currently printing the exam papers." →', opts: ['A. The exam papers are currently being printed.', 'B. The exam papers are currently printed.', 'C. The exam papers were currently being printed.', 'D. The exam papers have currently been printed.'], a: 'A' },

  // ── PASSIVE – PRESENT PERFECT (30 câu) ──
  { d: 'EASY', q: 'The report ___ (finish) already.', opts: ['A. has been finished', 'B. was finished', 'C. is finished', 'D. have been finished'], a: 'A' },
  { d: 'EASY', q: 'Three medals ___ (win) by our team this year.', opts: ['A. have been won', 'B. were won', 'C. are won', 'D. has been won'], a: 'A' },
  { d: 'EASY', q: 'Present perfect passive is formed with has/have ___ + V3.', opts: ['A. been', 'B. be', 'C. being', 'D. was'], a: 'A' },
  { d: 'EASY', q: 'The old building ___ (demolish).', opts: ['A. has been demolished', 'B. was demolished', 'C. is demolished', 'D. have been demolished'], a: 'A' },
  { d: 'EASY', q: '___ the letters ___ (send) yet?', opts: ['A. Have ... been sent', 'B. Were ... sent', 'C. Are ... sent', 'D. Has ... been sent'], a: 'A' },
  { d: 'MEDIUM', q: 'Convert to passive: "The police have arrested two suspects." →', opts: ['A. Two suspects have been arrested by the police.', 'B. Two suspects were arrested by the police.', 'C. Two suspects are arrested by the police.', 'D. Two suspects have arrested by the police.'], a: 'A' },
  { d: 'MEDIUM', q: '"The rules ___ (change) several times this year." Fill in.', opts: ['A. have been changed', 'B. were changed', 'C. are changed', 'D. has been changed'], a: 'A' },
  { d: 'MEDIUM', q: '"The website ___ (not/update) recently." Fill in.', opts: ['A. hasn\'t been updated', 'B. wasn\'t updated', 'C. isn\'t updated', 'D. haven\'t been updated'], a: 'A' },
  { d: 'MEDIUM', q: '"A cure for the disease ___ (not/find) yet." Fill in.', opts: ['A. hasn\'t been found', 'B. wasn\'t found', 'C. isn\'t found', 'D. haven\'t been found'], a: 'A' },
  { d: 'MEDIUM', q: '"How many books ___ (sell) so far?" Fill in.', opts: ['A. have been sold', 'B. were sold', 'C. are sold', 'D. has been sold'], a: 'A' },
  { d: 'HARD', q: '"The steles at Van Mieu ___ (recognise) by UNESCO since 2010." Fill in.', opts: ['A. have been recognised', 'B. were recognised', 'C. are recognised', 'D. has been recognised'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT present perfect passive sentence:', opts: ['A. The letters has been sent. ("letters" needs "have")', 'B. The letter has been sent.', 'C. Three people have been injured.', 'D. New discoveries have been made this year.'], a: 'A' },
  { d: 'HARD', q: '"Several important decisions ___ (make) at today\'s meeting." Fill in.', opts: ['A. have been made', 'B. were made', 'C. are made', 'D. has been made'], a: 'A' },
  { d: 'EASY', q: 'The homework ___ (not/submit) yet.', opts: ['A. hasn\'t been submitted', 'B. wasn\'t submitted', 'C. isn\'t submitted', 'D. haven\'t been submitted'], a: 'A' },
  { d: 'MEDIUM', q: '"The ancient artefacts ___ (recently/discover) by archaeologists." Fill in.', opts: ['A. have recently been discovered', 'B. were recently discovered', 'C. are recently discovered', 'D. has recently been discovered'], a: 'A' },
  { d: 'HARD', q: 'Convert to passive: "They have invented a new technology." →', opts: ['A. A new technology has been invented.', 'B. A new technology was invented.', 'C. A new technology is invented.', 'D. A new technology have been invented.'], a: 'A' },
  { d: 'EASY', q: 'The exam ___ (cancel) this semester.', opts: ['A. has been cancelled', 'B. was cancelled', 'C. is cancelled', 'D. have been cancelled'], a: 'A' },
  { d: 'MEDIUM', q: '"___ the project ___ (approve) by the committee?" Fill in.', opts: ['A. Has ... been approved', 'B. Was ... approved', 'C. Is ... approved', 'D. Have ... been approved'], a: 'A' },
  { d: 'HARD', q: '"Thousands of trees ___ (plant) by volunteers this year." Fill in.', opts: ['A. have been planted', 'B. were planted', 'C. are planted', 'D. has been planted'], a: 'A' },
  { d: 'HARD', q: '"The patient ___ (not/inform) about the risks." Fill in.', opts: ['A. hasn\'t been informed', 'B. wasn\'t informed', 'C. isn\'t informed', 'D. haven\'t been informed'], a: 'A' },
  { d: 'EASY', q: 'New evidence ___ (find) by the detectives.', opts: ['A. has been found', 'B. was found', 'C. is found', 'D. have been found'], a: 'A' },
  { d: 'MEDIUM', q: '"The old temple ___ (restore) by the local government." Fill in.', opts: ['A. has been restored', 'B. was restored', 'C. is restored', 'D. have been restored'], a: 'A' },
  { d: 'HARD', q: '"All invitations ___ (send) out already." Fill in.', opts: ['A. have been sent', 'B. were sent', 'C. are sent', 'D. has been sent'], a: 'A' },

  // ── PASSIVE – MODAL VERBS (30 câu) ──
  { d: 'EASY', q: 'This form ___ (must/complete) before the deadline.', opts: ['A. must be completed', 'B. must complete', 'C. must be completing', 'D. must been completed'], a: 'A' },
  { d: 'EASY', q: 'These books ___ (should/return) to the library.', opts: ['A. should be returned', 'B. should return', 'C. should being returned', 'D. should been returned'], a: 'A' },
  { d: 'EASY', q: 'Modal passive structure: modal + ___ + past participle.', opts: ['A. be', 'B. been', 'C. being', 'D. is'], a: 'A' },
  { d: 'EASY', q: 'The patient ___ (can/move) to a private room.', opts: ['A. can be moved', 'B. can move', 'C. can being moved', 'D. can been moved'], a: 'A' },
  { d: 'EASY', q: 'Mobile phones ___ (not/use) during the exam.', opts: ['A. must not be used', 'B. must not use', 'C. must not being used', 'D. must not been used'], a: 'A' },
  { d: 'MEDIUM', q: '"The results ___ (might/announce) tomorrow." Fill in.', opts: ['A. might be announced', 'B. might announce', 'C. might being announced', 'D. might been announced'], a: 'A' },
  { d: 'MEDIUM', q: '"This medicine ___ (should/take) twice a day." Fill in.', opts: ['A. should be taken', 'B. should take', 'C. should being taken', 'D. should been taken'], a: 'A' },
  { d: 'MEDIUM', q: '"All passengers ___ (must/fasten) their seatbelts." Change to passive.', opts: ['A. Seatbelts must be fastened by all passengers.', 'B. Seatbelts must fasten by all passengers.', 'C. Seatbelts must being fastened by all passengers.', 'D. Seatbelts must been fastened by all passengers.'], a: 'A' },
  { d: 'MEDIUM', q: '"The report ___ (can/submit) online." Fill in.', opts: ['A. can be submitted', 'B. can submit', 'C. can being submitted', 'D. can been submitted'], a: 'A' },
  { d: 'MEDIUM', q: '"Pets ___ (not/allow) in the restaurant." Fill in modal passive.', opts: ['A. are not allowed', 'B. should not be allowed', 'C. must not being allowed', 'D. cannot been allowed'], a: 'A' },
  { d: 'HARD', q: '"The error ___ (could/correct) before submission." Fill in.', opts: ['A. could be corrected', 'B. could correct', 'C. could being corrected', 'D. could have been correct'], a: 'A' },
  { d: 'HARD', q: '"This strategy ___ (might/revise) if it fails." Fill in.', opts: ['A. might be revised', 'B. might revise', 'C. might being revised', 'D. might have been revise'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT modal passive:', opts: ['A. The regulations must being followed carefully. ("must being" is incorrect)', 'B. The regulations must be followed carefully.', 'C. The mistake should not be repeated.', 'D. The plan could be changed if necessary.'], a: 'A' },
  { d: 'EASY', q: 'The noise ___ (should/reduce) in the library.', opts: ['A. should be reduced', 'B. should reduce', 'C. should being reduced', 'D. should been reduced'], a: 'A' },
  { d: 'MEDIUM', q: '"The window ___ (ought to/repair) before winter." Fill in.', opts: ['A. ought to be repaired', 'B. ought to repair', 'C. ought to being repaired', 'D. ought to been repaired'], a: 'A' },
  { d: 'HARD', q: '"The data ___ (must/back up) regularly to avoid loss." Fill in.', opts: ['A. must be backed up', 'B. must back up', 'C. must being backed up', 'D. must been backed up'], a: 'A' },
  { d: 'EASY', q: 'Food ___ (not/leave) out overnight.', opts: ['A. should not be left', 'B. should not leave', 'C. must not being left', 'D. cannot been left'], a: 'A' },
  { d: 'MEDIUM', q: '"The injured people ___ (should/treat) immediately." Fill in.', opts: ['A. should be treated', 'B. should treat', 'C. should being treated', 'D. should have treat'], a: 'A' },
  { d: 'HARD', q: '"More resources ___ (will/allocate) to the project." Fill in passive.', opts: ['A. will be allocated', 'B. will allocate', 'C. will being allocated', 'D. will been allocated'], a: 'A' },
  { d: 'HARD', q: 'Convert to modal passive: "They must protect the environment." →', opts: ['A. The environment must be protected.', 'B. The environment must protect.', 'C. The environment must being protected.', 'D. The environment must been protected.'], a: 'A' },
  { d: 'EASY', q: 'Shoes ___ (must/remove) before entering the temple.', opts: ['A. must be removed', 'B. must remove', 'C. must being removed', 'D. must been removed'], a: 'A' },
  { d: 'MEDIUM', q: '"The application ___ (can/complete) online." Fill in.', opts: ['A. can be completed', 'B. can complete', 'C. can being completed', 'D. can been completed'], a: 'A' },
  { d: 'HARD', q: '"The building ___ (may/close) for repairs next month." Fill in.', opts: ['A. may be closed', 'B. may close', 'C. may being closed', 'D. may been closed'], a: 'A' },

  // ── CHUYỂN ĐỔI ACTIVE ↔ PASSIVE + NHẬN BIẾT LỖI (25 câu chuyển đổi + 15 nhận biết) ──
  { d: 'MEDIUM', q: 'Active: "They will announce the results next week." → Passive:', opts: ['A. The results will be announced next week.', 'B. The results will announce next week.', 'C. The results are announced next week.', 'D. The results would be announced next week.'], a: 'A' },
  { d: 'MEDIUM', q: 'Active: "Someone has stolen my bike." → Passive:', opts: ['A. My bike has been stolen.', 'B. My bike was stolen.', 'C. My bike is stolen.', 'D. My bike have been stolen.'], a: 'A' },
  { d: 'MEDIUM', q: 'Active: "The chef is preparing the meal." → Passive:', opts: ['A. The meal is being prepared by the chef.', 'B. The meal is prepared by the chef.', 'C. The meal was being prepared by the chef.', 'D. The meal has been prepared by the chef.'], a: 'A' },
  { d: 'MEDIUM', q: 'Active: "The government will build a new school." → Passive:', opts: ['A. A new school will be built by the government.', 'B. A new school is built by the government.', 'C. A new school would be built by the government.', 'D. A new school was built by the government.'], a: 'A' },
  { d: 'HARD', q: 'Active: "They had finished the project before the deadline." → Passive:', opts: ['A. The project had been finished before the deadline.', 'B. The project was finished before the deadline.', 'C. The project has been finished before the deadline.', 'D. The project is finished before the deadline.'], a: 'A' },
  { d: 'MEDIUM', q: 'Passive: "The film was directed by Spielberg." → Active:', opts: ['A. Spielberg directed the film.', 'B. Spielberg directs the film.', 'C. The film directs Spielberg.', 'D. Spielberg has directed the film.'], a: 'A' },
  { d: 'HARD', q: 'Active: "People believe that he is innocent." → Passive (formal):', opts: ['A. He is believed to be innocent.', 'B. He believes to be innocent.', 'C. It believes that he is innocent.', 'D. He is believing to be innocent.'], a: 'A' },
  { d: 'HARD', q: 'Active: "They say that she is a genius." → Passive:', opts: ['A. It is said that she is a genius. / She is said to be a genius.', 'B. It says that she is a genius.', 'C. She says to be a genius.', 'D. It is said she being a genius.'], a: 'A' },
  { d: 'MEDIUM', q: 'Active: "The teacher will explain the rules." → Passive:', opts: ['A. The rules will be explained by the teacher.', 'B. The rules are explained by the teacher.', 'C. The rules would be explained by the teacher.', 'D. The rules were explained by the teacher.'], a: 'A' },
  { d: 'HARD', q: 'Active: "They couldn\'t find the missing child." → Passive:', opts: ['A. The missing child couldn\'t be found.', 'B. The missing child wasn\'t found.', 'C. The missing child can\'t be found.', 'D. The missing child couldn\'t find.'], a: 'A' },
  { d: 'MEDIUM', q: 'Passive: "The books were returned by the students." → Active:', opts: ['A. The students returned the books.', 'B. The students return the books.', 'C. The books return the students.', 'D. The students have returned the books.'], a: 'A' },
  { d: 'HARD', q: 'Active: "We should recycle more waste." → Passive:', opts: ['A. More waste should be recycled.', 'B. More waste should recycle.', 'C. More waste must be recycled.', 'D. More waste should being recycled.'], a: 'A' },
  { d: 'MEDIUM', q: 'Active: "Someone broke the window last night." → Passive:', opts: ['A. The window was broken last night.', 'B. The window is broken last night.', 'C. The window has been broken last night.', 'D. The window was breaking last night.'], a: 'A' },
  { d: 'HARD', q: 'Active: "They are currently testing the new vaccine." → Passive:', opts: ['A. The new vaccine is currently being tested.', 'B. The new vaccine is currently tested.', 'C. The new vaccine was currently being tested.', 'D. The new vaccine has currently been tested.'], a: 'A' },
  { d: 'HARD', q: 'Active: "Nobody has ever climbed that mountain." → Passive:', opts: ['A. That mountain has never been climbed.', 'B. That mountain was never climbed.', 'C. That mountain is never climbed.', 'D. That mountain never been climbed.'], a: 'A' },
  // ── NHẬN BIẾT LỖI SAI (15 câu) ──
  { d: 'MEDIUM', q: 'Identify the INCORRECT passive sentence:', opts: ['A. The car was drove into the garage. ("drove" → "driven")', 'B. The car was driven into the garage.', 'C. The letter was written in French.', 'D. The project was completed on time.'], a: 'A' },
  { d: 'MEDIUM', q: 'Identify the INCORRECT sentence:', opts: ['A. She was gave a prize. ("gave" → "given")', 'B. She was given a prize.', 'C. They were told the news.', 'D. He was offered a job.'], a: 'A' },
  { d: 'MEDIUM', q: 'Identify the CORRECT passive sentence:', opts: ['A. The windows are cleaned every week by the caretaker.', 'B. The windows are clean every week by the caretaker.', 'C. The windows were clean every week by the caretaker.', 'D. The windows cleaning every week by the caretaker.'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT passive sentence:', opts: ['A. The results have been announced yesterday. ("yesterday" needs past simple, not present perfect)', 'B. The results were announced yesterday.', 'C. The results have been announced recently.', 'D. The results are announced every semester.'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT passive sentence:', opts: ['A. The room is being clean by the staff. ("clean" → "cleaned")', 'B. The room is being cleaned by the staff.', 'C. The room was cleaned yesterday.', 'D. The room has been cleaned already.'], a: 'A' },
  { d: 'HARD', q: 'Identify the CORRECT passive sentence:', opts: ['A. This book was written by a Vietnamese author in 1960.', 'B. This book was wrote by a Vietnamese author in 1960.', 'C. This book is written by a Vietnamese author in 1960.', 'D. This book has been written by a Vietnamese author in 1960.'], a: 'A' },
  { d: 'MEDIUM', q: 'Which sentence is in the CORRECT passive form?', opts: ['A. The package will be delivered tomorrow.', 'B. The package will delivered tomorrow.', 'C. The package will being delivered tomorrow.', 'D. The package will been delivered tomorrow.'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT sentence:', opts: ['A. English is being spoke all over the world. ("spoke" → "spoken")', 'B. English is spoken all over the world.', 'C. English is being spoken in many countries right now.', 'D. English has been spoken globally for centuries.'], a: 'A' },
  { d: 'HARD', q: 'Choose the CORRECT passive for: "Scientists made an important discovery."', opts: ['A. An important discovery was made by scientists.', 'B. An important discovery made by scientists.', 'C. An important discovery is made by scientists.', 'D. An important discovery was make by scientists.'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT passive sentence:', opts: ['A. The meeting is been cancelled. ("is been" is wrong – should be "has been" or "was")', 'B. The meeting has been cancelled.', 'C. The meeting was cancelled.', 'D. The meeting is being cancelled.'], a: 'A' },
  { d: 'MEDIUM', q: 'Which is the CORRECT passive of "They should protect the forest"?', opts: ['A. The forest should be protected.', 'B. The forest should protect.', 'C. The forest should being protected.', 'D. The forest should been protected.'], a: 'A' },
  { d: 'HARD', q: 'Identify the CORRECT passive sentence:', opts: ['A. The suspect has been questioned by the police for hours.', 'B. The suspect has questioned by the police for hours.', 'C. The suspect was being questioned by the police for hours. (also correct – different tense)', 'D. The suspect have been questioned by the police for hours.'], a: 'A' },
  { d: 'MEDIUM', q: 'Identify the INCORRECT sentence:', opts: ['A. The documents was signed by the director. ("was" → "were" for plural)', 'B. The documents were signed by the director.', 'C. The document was signed by the director.', 'D. The documents have been signed already.'], a: 'A' },
  { d: 'HARD', q: 'Which passive sentence is GRAMMATICALLY CORRECT?', opts: ['A. New discoveries have been made in the field of medicine this year.', 'B. New discoveries has been made in the field of medicine this year.', 'C. New discoveries were made in the field of medicine this year. (also correct with time ref)', 'D. New discoveries have made in the field of medicine this year.'], a: 'A' },
  { d: 'HARD', q: 'Identify the INCORRECT passive sentence:', opts: ['A. The homework hasn\'t been do yet. ("do" → "done")', 'B. The homework hasn\'t been done yet.', 'C. The homework wasn\'t done on time.', 'D. The homework should be done carefully.'], a: 'A' },
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
  const grammar = await p.question.count({ where: { topicId: TOPIC_ID } });
  console.log(`\n✅ Đã thêm ${count} câu`);
  console.log(`📌 Grammar - Câu bị động: ${grammar} câu`);
  console.log(`📊 Tổng Tiếng Anh lớp 7: ${total} câu`);
}

main().catch(console.error).finally(() => p.$disconnect());
