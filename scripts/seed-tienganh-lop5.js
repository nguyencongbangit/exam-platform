const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const SUBJECT_ID = 'sub-anh';
const GRADE_ID = 'grade-5';
const CREATED_BY = 'user-admin';
const questions = [
  // ===== VOCABULARY - SCHOOL =====
  {
    content: 'What do you use to write on a blackboard?',
    difficulty: 'EASY',
    explanation: 'A "chalk" is used to write on a blackboard.',
    options: [
      { key: 'A', content: 'A pen', correct: false },
      { key: 'B', content: 'A chalk', correct: true },
      { key: 'C', content: 'A pencil', correct: false },
      { key: 'D', content: 'A marker', correct: false },
    ],
  },
  {
    content: 'Which word means a person who teaches students?',
    difficulty: 'EASY',
    explanation: 'A "teacher" is a person whose job is to teach students.',
    options: [
      { key: 'A', content: 'Doctor', correct: false },
      { key: 'B', content: 'Teacher', correct: true },
      { key: 'C', content: 'Driver', correct: false },
      { key: 'D', content: 'Farmer', correct: false },
    ],
  },
  {
    content: 'What is a "library"?',
    difficulty: 'EASY',
    explanation: 'A library is a place where books are kept and people can read or borrow them.',
    options: [
      { key: 'A', content: 'A place to eat lunch', correct: false },
      { key: 'B', content: 'A place where you can read and borrow books', correct: true },
      { key: 'C', content: 'A place to play sports', correct: false },
      { key: 'D', content: 'A classroom for science', correct: false },
    ],
  },
  // ===== VOCABULARY - HOBBIES AND SPORTS =====
  {
    content: 'What is your favourite hobby? — "I like _____ pictures."',
    difficulty: 'EASY',
    explanation: '"Drawing" means making pictures with a pen or pencil.',
    options: [
      { key: 'A', content: 'drawing', correct: true },
      { key: 'B', content: 'swim', correct: false },
      { key: 'C', content: 'run', correct: false },
      { key: 'D', content: 'plays', correct: false },
    ],
  },
  {
    content: 'Which sport uses a bat and a ball?',
    difficulty: 'EASY',
    explanation: 'Baseball uses a bat and a ball. Cricket also does, but baseball is the common answer.',
    options: [
      { key: 'A', content: 'Football', correct: false },
      { key: 'B', content: 'Swimming', correct: false },
      { key: 'C', content: 'Baseball', correct: true },
      { key: 'D', content: 'Tennis... No — badminton', correct: false },
    ],
  },
  {
    content: 'Choose the correct word: "He _____ football every Sunday."',
    difficulty: 'EASY',
    explanation: 'With "he" (third person singular), we add -s to the verb in Simple Present: "plays".',
    options: [
      { key: 'A', content: 'play', correct: false },
      { key: 'B', content: 'plays', correct: true },
      { key: 'C', content: 'playing', correct: false },
      { key: 'D', content: 'played', correct: false },
    ],
  },
  // ===== VOCABULARY - FOOD =====
  {
    content: 'Which food gives us the most energy (carbohydrates)?',
    difficulty: 'MEDIUM',
    explanation: 'Rice and bread are high in carbohydrates, which give us energy.',
    options: [
      { key: 'A', content: 'Chicken', correct: false },
      { key: 'B', content: 'Rice', correct: true },
      { key: 'C', content: 'Fish', correct: false },
      { key: 'D', content: 'Vegetables', correct: false },
    ],
  },
  {
    content: 'What is the plural of "potato"?',
    difficulty: 'MEDIUM',
    explanation: '"Potato" → plural "potatoes" (nouns ending in -o take -es).',
    options: [
      { key: 'A', content: 'Potatos', correct: false },
      { key: 'B', content: 'Potatoes', correct: true },
      { key: 'C', content: 'Potato', correct: false },
      { key: 'D', content: 'Potaties', correct: false },
    ],
  },
  {
    content: '"I don\'t like _____ but I love _____ ." Choose the correct pair.',
    difficulty: 'MEDIUM',
    explanation: 'Both "meat" and "vegetables" are uncountable food nouns used without articles in general statements.',
    options: [
      { key: 'A', content: 'a meat / a vegetable', correct: false },
      { key: 'B', content: 'meat / vegetables', correct: true },
      { key: 'C', content: 'the meat / the vegetables', correct: false },
      { key: 'D', content: 'meats / vegetable', correct: false },
    ],
  },
  // ===== VOCABULARY - WEATHER =====
  {
    content: 'What is the weather like when the sky is grey and water falls from the sky?',
    difficulty: 'EASY',
    explanation: 'When water falls from the sky, we say it is "rainy" or "raining".',
    options: [
      { key: 'A', content: 'Sunny', correct: false },
      { key: 'B', content: 'Cloudy', correct: false },
      { key: 'C', content: 'Rainy', correct: true },
      { key: 'D', content: 'Windy', correct: false },
    ],
  },
  {
    content: 'Complete: "It is very _____ today. Don\'t forget your coat!" (temperature is very low)',
    difficulty: 'EASY',
    explanation: '"Cold" describes very low temperature.',
    options: [
      { key: 'A', content: 'hot', correct: false },
      { key: 'B', content: 'cold', correct: true },
      { key: 'C', content: 'wet', correct: false },
      { key: 'D', content: 'dry', correct: false },
    ],
  },
  // ===== VOCABULARY - BODY PARTS =====
  {
    content: 'What do we use to smell things?',
    difficulty: 'EASY',
    explanation: 'We use our nose to smell things.',
    options: [
      { key: 'A', content: 'Eyes', correct: false },
      { key: 'B', content: 'Ears', correct: false },
      { key: 'C', content: 'Nose', correct: true },
      { key: 'D', content: 'Mouth', correct: false },
    ],
  },
  {
    content: 'How many fingers does a person normally have?',
    difficulty: 'EASY',
    explanation: 'A person normally has 10 fingers (5 on each hand).',
    options: [
      { key: 'A', content: '8', correct: false },
      { key: 'B', content: '10', correct: true },
      { key: 'C', content: '12', correct: false },
      { key: 'D', content: '6', correct: false },
    ],
  },
  // ===== VOCABULARY - ANIMALS =====
  {
    content: 'Which animal says "moo"?',
    difficulty: 'EASY',
    explanation: 'A cow says "moo".',
    options: [
      { key: 'A', content: 'Dog', correct: false },
      { key: 'B', content: 'Cat', correct: false },
      { key: 'C', content: 'Cow', correct: true },
      { key: 'D', content: 'Duck', correct: false },
    ],
  },
  {
    content: 'Which animal is the largest land animal?',
    difficulty: 'EASY',
    explanation: 'The elephant is the largest land animal.',
    options: [
      { key: 'A', content: 'Lion', correct: false },
      { key: 'B', content: 'Elephant', correct: true },
      { key: 'C', content: 'Giraffe', correct: false },
      { key: 'D', content: 'Hippopotamus', correct: false },
    ],
  },
  {
    content: 'What is the young of a cat called?',
    difficulty: 'MEDIUM',
    explanation: 'A young cat is called a "kitten".',
    options: [
      { key: 'A', content: 'Puppy', correct: false },
      { key: 'B', content: 'Kitten', correct: true },
      { key: 'C', content: 'Cub', correct: false },
      { key: 'D', content: 'Foal', correct: false },
    ],
  },
  // ===== VOCABULARY - TRANSPORT =====
  {
    content: 'Which transport flies in the sky?',
    difficulty: 'EASY',
    explanation: 'An "aeroplane" (or airplane) is a vehicle that flies in the sky.',
    options: [
      { key: 'A', content: 'Bus', correct: false },
      { key: 'B', content: 'Train', correct: false },
      { key: 'C', content: 'Aeroplane', correct: true },
      { key: 'D', content: 'Ship', correct: false },
    ],
  },
  {
    content: 'How do you travel by water?',
    difficulty: 'EASY',
    explanation: 'We travel by water on a "boat" or "ship".',
    options: [
      { key: 'A', content: 'By car', correct: false },
      { key: 'B', content: 'By boat', correct: true },
      { key: 'C', content: 'By plane', correct: false },
      { key: 'D', content: 'By train', correct: false },
    ],
  },
  // ===== VOCABULARY - OCCUPATIONS =====
  {
    content: 'What does a "doctor" do?',
    difficulty: 'EASY',
    explanation: 'A doctor treats sick people and helps them get better.',
    options: [
      { key: 'A', content: 'Builds houses', correct: false },
      { key: 'B', content: 'Treats sick people', correct: true },
      { key: 'C', content: 'Drives a bus', correct: false },
      { key: 'D', content: 'Grows vegetables', correct: false },
    ],
  },
  {
    content: 'Who works in a restaurant and cooks food?',
    difficulty: 'EASY',
    explanation: 'A "chef" or "cook" is a person who prepares and cooks food in a restaurant.',
    options: [
      { key: 'A', content: 'Waiter', correct: false },
      { key: 'B', content: 'Chef', correct: true },
      { key: 'C', content: 'Cashier', correct: false },
      { key: 'D', content: 'Manager', correct: false },
    ],
  },
  // ===== GRAMMAR - SIMPLE PRESENT (he/she/it +s) =====
  {
    content: 'She _____ to school every day.',
    difficulty: 'EASY',
    explanation: 'With "she" (3rd person singular), add -s to "go" → "goes".',
    options: [
      { key: 'A', content: 'go', correct: false },
      { key: 'B', content: 'goes', correct: true },
      { key: 'C', content: 'going', correct: false },
      { key: 'D', content: 'gone', correct: false },
    ],
  },
  {
    content: 'He _____ his teeth every morning.',
    difficulty: 'EASY',
    explanation: '"Brush" + he → "brushes" (verbs ending in -sh take -es).',
    options: [
      { key: 'A', content: 'brush', correct: false },
      { key: 'B', content: 'brushes', correct: true },
      { key: 'C', content: 'brushing', correct: false },
      { key: 'D', content: 'brushed', correct: false },
    ],
  },
  {
    content: 'My sister _____ English very well.',
    difficulty: 'EASY',
    explanation: '"My sister" = she → "speaks" (add -s).',
    options: [
      { key: 'A', content: 'speak', correct: false },
      { key: 'B', content: 'speaks', correct: true },
      { key: 'C', content: 'speaking', correct: false },
      { key: 'D', content: 'spoke', correct: false },
    ],
  },
  {
    content: 'The bird _____ every morning.',
    difficulty: 'EASY',
    explanation: '"The bird" = it → "sings" (add -s).',
    options: [
      { key: 'A', content: 'sing', correct: false },
      { key: 'B', content: 'sings', correct: true },
      { key: 'C', content: 'singing', correct: false },
      { key: 'D', content: 'sang', correct: false },
    ],
  },
  // ===== GRAMMAR - SIMPLE PAST =====
  {
    content: 'Yesterday, she _____ a letter to her friend.',
    difficulty: 'MEDIUM',
    explanation: '"Write" is irregular: past tense is "wrote".',
    options: [
      { key: 'A', content: 'write', correct: false },
      { key: 'B', content: 'writes', correct: false },
      { key: 'C', content: 'wrote', correct: true },
      { key: 'D', content: 'writing', correct: false },
    ],
  },
  {
    content: 'Last weekend, we _____ to the zoo.',
    difficulty: 'EASY',
    explanation: '"Go" is irregular: past tense is "went".',
    options: [
      { key: 'A', content: 'go', correct: false },
      { key: 'B', content: 'goed', correct: false },
      { key: 'C', content: 'going', correct: false },
      { key: 'D', content: 'went', correct: true },
    ],
  },
  {
    content: 'He _____ his homework last night. (regular verb)',
    difficulty: 'EASY',
    explanation: '"Finish" is regular: past tense = "finished" (add -ed).',
    options: [
      { key: 'A', content: 'finish', correct: false },
      { key: 'B', content: 'finishes', correct: false },
      { key: 'C', content: 'finished', correct: true },
      { key: 'D', content: 'finishing', correct: false },
    ],
  },
  {
    content: 'What is the past tense of "eat"?',
    difficulty: 'MEDIUM',
    explanation: '"Eat" is irregular: past tense is "ate".',
    options: [
      { key: 'A', content: 'eated', correct: false },
      { key: 'B', content: 'ate', correct: true },
      { key: 'C', content: 'eats', correct: false },
      { key: 'D', content: 'eating', correct: false },
    ],
  },
  {
    content: 'What is the past tense of "run"?',
    difficulty: 'MEDIUM',
    explanation: '"Run" is irregular: past tense is "ran".',
    options: [
      { key: 'A', content: 'runned', correct: false },
      { key: 'B', content: 'runs', correct: false },
      { key: 'C', content: 'ran', correct: true },
      { key: 'D', content: 'runed', correct: false },
    ],
  },
  {
    content: 'Did she _____ to the party last Saturday?',
    difficulty: 'MEDIUM',
    explanation: 'After "did", we use the base form of the verb: "come".',
    options: [
      { key: 'A', content: 'came', correct: false },
      { key: 'B', content: 'comes', correct: false },
      { key: 'C', content: 'come', correct: true },
      { key: 'D', content: 'coming', correct: false },
    ],
  },
  // ===== GRAMMAR - GOING TO FUTURE =====
  {
    content: 'We _____ visit Grandma next Sunday.',
    difficulty: 'EASY',
    explanation: 'Future plan: "are going to visit".',
    options: [
      { key: 'A', content: 'is going to', correct: false },
      { key: 'B', content: 'are going to', correct: true },
      { key: 'C', content: 'was going to', correct: false },
      { key: 'D', content: 'am going', correct: false },
    ],
  },
  {
    content: 'She _____ cook dinner tonight.',
    difficulty: 'EASY',
    explanation: '"She" = 3rd person singular → "is going to cook".',
    options: [
      { key: 'A', content: 'are going to', correct: false },
      { key: 'B', content: 'is going to', correct: true },
      { key: 'C', content: 'am going to', correct: false },
      { key: 'D', content: 'were going to', correct: false },
    ],
  },
  {
    content: 'I _____ study hard for the exam next week.',
    difficulty: 'EASY',
    explanation: '"I" + "am going to study".',
    options: [
      { key: 'A', content: 'is going to', correct: false },
      { key: 'B', content: 'are going to', correct: false },
      { key: 'C', content: 'am going to', correct: true },
      { key: 'D', content: 'was going to', correct: false },
    ],
  },
  // ===== GRAMMAR - COMPARATIVE ADJECTIVES =====
  {
    content: 'An elephant is _____ than a cat. (big)',
    difficulty: 'EASY',
    explanation: '"Big" → comparative: "bigger" (double the last consonant + -er).',
    options: [
      { key: 'A', content: 'more big', correct: false },
      { key: 'B', content: 'biger', correct: false },
      { key: 'C', content: 'bigger', correct: true },
      { key: 'D', content: 'biggest', correct: false },
    ],
  },
  {
    content: 'This book is _____ than that one. (interesting)',
    difficulty: 'MEDIUM',
    explanation: 'Long adjectives use "more + adjective": "more interesting".',
    options: [
      { key: 'A', content: 'interestinger', correct: false },
      { key: 'B', content: 'more interesting', correct: true },
      { key: 'C', content: 'most interesting', correct: false },
      { key: 'D', content: 'interestingest', correct: false },
    ],
  },
  {
    content: 'She is _____ than her sister. (tall)',
    difficulty: 'EASY',
    explanation: '"Tall" → comparative: "taller" (add -er).',
    options: [
      { key: 'A', content: 'more tall', correct: false },
      { key: 'B', content: 'tallest', correct: false },
      { key: 'C', content: 'taller', correct: true },
      { key: 'D', content: 'tall', correct: false },
    ],
  },
  {
    content: 'This test is _____ than yesterday\'s test. (easy)',
    difficulty: 'MEDIUM',
    explanation: '"Easy" → comparative: "easier" (change y to i + -er).',
    options: [
      { key: 'A', content: 'more easy', correct: false },
      { key: 'B', content: 'easyer', correct: false },
      { key: 'C', content: 'easier', correct: true },
      { key: 'D', content: 'easiest', correct: false },
    ],
  },
  {
    content: 'Gold is _____ than silver. (expensive)',
    difficulty: 'MEDIUM',
    explanation: 'Long adjective: "more expensive".',
    options: [
      { key: 'A', content: 'expensiver', correct: false },
      { key: 'B', content: 'more expensive', correct: true },
      { key: 'C', content: 'most expensive', correct: false },
      { key: 'D', content: 'expensivest', correct: false },
    ],
  },
  // ===== GRAMMAR - QUESTION WORDS =====
  {
    content: '_____ is your name?',
    difficulty: 'EASY',
    explanation: '"What" is used to ask for information about things, names, etc.',
    options: [
      { key: 'A', content: 'Who', correct: false },
      { key: 'B', content: 'What', correct: true },
      { key: 'C', content: 'Where', correct: false },
      { key: 'D', content: 'When', correct: false },
    ],
  },
  {
    content: '_____ do you live?',
    difficulty: 'EASY',
    explanation: '"Where" asks about a place or location.',
    options: [
      { key: 'A', content: 'Who', correct: false },
      { key: 'B', content: 'What', correct: false },
      { key: 'C', content: 'Where', correct: true },
      { key: 'D', content: 'Why', correct: false },
    ],
  },
  {
    content: '_____ is your birthday?',
    difficulty: 'EASY',
    explanation: '"When" asks about time.',
    options: [
      { key: 'A', content: 'Where', correct: false },
      { key: 'B', content: 'When', correct: true },
      { key: 'C', content: 'Who', correct: false },
      { key: 'D', content: 'How', correct: false },
    ],
  },
  {
    content: '_____ are you crying? — Because I lost my book.',
    difficulty: 'EASY',
    explanation: '"Why" asks for a reason or cause.',
    options: [
      { key: 'A', content: 'When', correct: false },
      { key: 'B', content: 'Where', correct: false },
      { key: 'C', content: 'Why', correct: true },
      { key: 'D', content: 'What', correct: false },
    ],
  },
  {
    content: '_____ is that girl? — She is my sister.',
    difficulty: 'EASY',
    explanation: '"Who" asks about a person.',
    options: [
      { key: 'A', content: 'What', correct: false },
      { key: 'B', content: 'Which', correct: false },
      { key: 'C', content: 'Who', correct: true },
      { key: 'D', content: 'Whose', correct: false },
    ],
  },
  {
    content: '_____ do you go to school? — By bus.',
    difficulty: 'EASY',
    explanation: '"How" asks about manner or method.',
    options: [
      { key: 'A', content: 'Why', correct: false },
      { key: 'B', content: 'How', correct: true },
      { key: 'C', content: 'What', correct: false },
      { key: 'D', content: 'When', correct: false },
    ],
  },
  {
    content: '_____ old are you?',
    difficulty: 'EASY',
    explanation: '"How old" asks about age.',
    options: [
      { key: 'A', content: 'What', correct: false },
      { key: 'B', content: 'Why', correct: false },
      { key: 'C', content: 'How', correct: true },
      { key: 'D', content: 'Where', correct: false },
    ],
  },
  // ===== READING COMPREHENSION =====
  {
    content: 'Read the text: "Tom wakes up at 6 a.m. every day. He brushes his teeth, has breakfast, and then walks to school. School starts at 7:30 a.m." What time does Tom wake up?',
    difficulty: 'EASY',
    explanation: 'The text says "Tom wakes up at 6 a.m. every day."',
    options: [
      { key: 'A', content: '7:00 a.m.', correct: false },
      { key: 'B', content: '7:30 a.m.', correct: false },
      { key: 'C', content: '6:00 a.m.', correct: true },
      { key: 'D', content: '5:30 a.m.', correct: false },
    ],
  },
  {
    content: 'Read: "Tom wakes up at 6 a.m. every day. He brushes his teeth, has breakfast, and then walks to school. School starts at 7:30 a.m." How does Tom get to school?',
    difficulty: 'EASY',
    explanation: 'The text says he "walks to school".',
    options: [
      { key: 'A', content: 'By bus', correct: false },
      { key: 'B', content: 'By bicycle', correct: false },
      { key: 'C', content: 'He walks', correct: true },
      { key: 'D', content: 'By car', correct: false },
    ],
  },
  {
    content: 'Read: "Anna loves animals. She has a dog named Max and two cats. Every afternoon, she takes Max for a walk in the park." How many pets does Anna have in total?',
    difficulty: 'EASY',
    explanation: 'She has 1 dog + 2 cats = 3 pets in total.',
    options: [
      { key: 'A', content: '1', correct: false },
      { key: 'B', content: '2', correct: false },
      { key: 'C', content: '3', correct: true },
      { key: 'D', content: '4', correct: false },
    ],
  },
  {
    content: 'Read: "Anna loves animals. She has a dog named Max and two cats. Every afternoon, she takes Max for a walk in the park." What is the dog\'s name?',
    difficulty: 'EASY',
    explanation: 'The text says "a dog named Max".',
    options: [
      { key: 'A', content: 'Anna', correct: false },
      { key: 'B', content: 'Max', correct: true },
      { key: 'C', content: 'Tom', correct: false },
      { key: 'D', content: 'Kitty', correct: false },
    ],
  },
  {
    content: 'Read: "My family goes on holiday every summer. Last year, we went to the beach. We swam in the sea, built sandcastles, and ate ice cream." Where did they go last year?',
    difficulty: 'EASY',
    explanation: '"Last year, we went to the beach."',
    options: [
      { key: 'A', content: 'The mountains', correct: false },
      { key: 'B', content: 'The beach', correct: true },
      { key: 'C', content: 'A theme park', correct: false },
      { key: 'D', content: 'Their grandparents\' house', correct: false },
    ],
  },
  // ===== MIXED GRAMMAR =====
  {
    content: 'Choose the correct sentence:',
    difficulty: 'MEDIUM',
    explanation: '"He doesn\'t like vegetables" is correct. With "he/she/it", the negative is "doesn\'t + base verb".',
    options: [
      { key: 'A', content: 'He don\'t like vegetables.', correct: false },
      { key: 'B', content: 'He doesn\'t likes vegetables.', correct: false },
      { key: 'C', content: 'He doesn\'t like vegetables.', correct: true },
      { key: 'D', content: 'He not like vegetables.', correct: false },
    ],
  },
  {
    content: 'Which sentence is in Simple Past?',
    difficulty: 'MEDIUM',
    explanation: '"She visited her grandparents last week" uses past tense "visited".',
    options: [
      { key: 'A', content: 'She visits her grandparents every week.', correct: false },
      { key: 'B', content: 'She is visiting her grandparents.', correct: false },
      { key: 'C', content: 'She visited her grandparents last week.', correct: true },
      { key: 'D', content: 'She will visit her grandparents.', correct: false },
    ],
  },
  {
    content: 'Fill in the blank: "There _____ many children in the park yesterday."',
    difficulty: 'MEDIUM',
    explanation: '"There were" is used for plural nouns in past tense.',
    options: [
      { key: 'A', content: 'is', correct: false },
      { key: 'B', content: 'are', correct: false },
      { key: 'C', content: 'was', correct: false },
      { key: 'D', content: 'were', correct: true },
    ],
  },
  {
    content: 'Choose the correct word: "I can\'t find my bag. I _____ it somewhere."',
    difficulty: 'HARD',
    explanation: '"Must have left" expresses deduction about the past, but at grade 5 level: "left" (past of leave) is the correct simple past choice.',
    options: [
      { key: 'A', content: 'leave', correct: false },
      { key: 'B', content: 'left', correct: true },
      { key: 'C', content: 'leaves', correct: false },
      { key: 'D', content: 'leaving', correct: false },
    ],
  },
  {
    content: 'Which question is correct for the answer: "I go to school by bicycle."?',
    difficulty: 'MEDIUM',
    explanation: '"How do you go to school?" asks about the method of transportation.',
    options: [
      { key: 'A', content: 'What do you go to school?', correct: false },
      { key: 'B', content: 'Where do you go to school?', correct: false },
      { key: 'C', content: 'How do you go to school?', correct: true },
      { key: 'D', content: 'When do you go to school?', correct: false },
    ],
  },
  {
    content: 'Fill in: "_____ apples are on the table." (not specific)',
    difficulty: 'MEDIUM',
    explanation: '"Some" is used with plural countable nouns in affirmative sentences.',
    options: [
      { key: 'A', content: 'A', correct: false },
      { key: 'B', content: 'An', correct: false },
      { key: 'C', content: 'Some', correct: true },
      { key: 'D', content: 'The', correct: false },
    ],
  },
  {
    content: 'Choose the correct response: "Would you like some cake?" — "_____"',
    difficulty: 'EASY',
    explanation: '"Yes, please" is the polite way to accept an offer.',
    options: [
      { key: 'A', content: 'Yes, I would like.', correct: false },
      { key: 'B', content: 'Yes, please.', correct: true },
      { key: 'C', content: 'Yes, I want.', correct: false },
      { key: 'D', content: 'OK I take.', correct: false },
    ],
  },
  {
    content: 'What is the opposite of "expensive"?',
    difficulty: 'EASY',
    explanation: '"Cheap" is the opposite of "expensive".',
    options: [
      { key: 'A', content: 'Beautiful', correct: false },
      { key: 'B', content: 'Cheap', correct: true },
      { key: 'C', content: 'Old', correct: false },
      { key: 'D', content: 'Big', correct: false },
    ],
  },
  {
    content: 'What is the opposite of "fast"?',
    difficulty: 'EASY',
    explanation: '"Slow" is the opposite of "fast".',
    options: [
      { key: 'A', content: 'Quick', correct: false },
      { key: 'B', content: 'Slow', correct: true },
      { key: 'C', content: 'Loud', correct: false },
      { key: 'D', content: 'Light', correct: false },
    ],
  },
  {
    content: 'Choose the correct article: "She is eating _____ orange."',
    difficulty: 'EASY',
    explanation: '"An" is used before words starting with a vowel sound. "Orange" starts with /ɒ/ (vowel sound).',
    options: [
      { key: 'A', content: 'a', correct: false },
      { key: 'B', content: 'an', correct: true },
      { key: 'C', content: 'the', correct: false },
      { key: 'D', content: 'some', correct: false },
    ],
  },
  {
    content: 'Which sentence uses "can" correctly?',
    difficulty: 'EASY',
    explanation: '"She can swim very well" is correct. "Can" is a modal verb and is followed by the base form.',
    options: [
      { key: 'A', content: 'She can swims very well.', correct: false },
      { key: 'B', content: 'She can swimming very well.', correct: false },
      { key: 'C', content: 'She can swim very well.', correct: true },
      { key: 'D', content: 'She cans swim very well.', correct: false },
    ],
  },
  {
    content: 'What does "I am hungry" mean?',
    difficulty: 'EASY',
    explanation: '"Hungry" means you want to eat because your stomach is empty.',
    options: [
      { key: 'A', content: 'I want to sleep.', correct: false },
      { key: 'B', content: 'I want to drink water.', correct: false },
      { key: 'C', content: 'I want to eat.', correct: true },
      { key: 'D', content: 'I feel sick.', correct: false },
    ],
  },
  {
    content: 'Choose the correct word: "Please be _____ in the library." (don\'t make noise)',
    difficulty: 'EASY',
    explanation: '"Quiet" means making little or no noise.',
    options: [
      { key: 'A', content: 'Loud', correct: false },
      { key: 'B', content: 'Noisy', correct: false },
      { key: 'C', content: 'Quiet', correct: true },
      { key: 'D', content: 'Happy', correct: false },
    ],
  },
  {
    content: 'Read and answer: "Ben has a red bike. He rides it to the park every Saturday. Ben loves cycling." What colour is Ben\'s bike?',
    difficulty: 'EASY',
    explanation: 'The text says "Ben has a red bike."',
    options: [
      { key: 'A', content: 'Blue', correct: false },
      { key: 'B', content: 'Green', correct: false },
      { key: 'C', content: 'Red', correct: true },
      { key: 'D', content: 'Yellow', correct: false },
    ],
  },
  {
    content: 'Read: "Ben has a red bike. He rides it to the park every Saturday. Ben loves cycling." When does Ben ride his bike to the park?',
    difficulty: 'EASY',
    explanation: 'The text says "every Saturday".',
    options: [
      { key: 'A', content: 'Every Sunday', correct: false },
      { key: 'B', content: 'Every Saturday', correct: true },
      { key: 'C', content: 'Every day', correct: false },
      { key: 'D', content: 'Every Friday', correct: false },
    ],
  },
  {
    content: 'What is the meaning of "generous"?',
    difficulty: 'MEDIUM',
    explanation: '"Generous" means willing to give and share things with others.',
    options: [
      { key: 'A', content: 'Very angry', correct: false },
      { key: 'B', content: 'Very tired', correct: false },
      { key: 'C', content: 'Willing to give and share', correct: true },
      { key: 'D', content: 'Very smart', correct: false },
    ],
  },
  {
    content: 'Choose the correct preposition: "The cat is _____ the box."',
    difficulty: 'EASY',
    explanation: '"In" means inside. If the cat is inside the box, we say "in the box".',
    options: [
      { key: 'A', content: 'on', correct: false },
      { key: 'B', content: 'under', correct: false },
      { key: 'C', content: 'in', correct: true },
      { key: 'D', content: 'behind', correct: false },
    ],
  },
  {
    content: 'Which word is spelled correctly?',
    difficulty: 'MEDIUM',
    explanation: '"Beautiful" is the correct spelling.',
    options: [
      { key: 'A', content: 'Beautifull', correct: false },
      { key: 'B', content: 'Beutiful', correct: false },
      { key: 'C', content: 'Beautiful', correct: true },
      { key: 'D', content: 'Beautyful', correct: false },
    ],
  },
  {
    content: 'Complete the dialogue: "What\'s the weather like?" — "It _____ raining outside."',
    difficulty: 'EASY',
    explanation: '"It is raining" (Present Continuous) describes what is happening now.',
    options: [
      { key: 'A', content: 'are', correct: false },
      { key: 'B', content: 'am', correct: false },
      { key: 'C', content: 'is', correct: true },
      { key: 'D', content: 'were', correct: false },
    ],
  },
  {
    content: 'What number is "thirty-five"?',
    difficulty: 'EASY',
    explanation: '"Thirty-five" = 35.',
    options: [
      { key: 'A', content: '53', correct: false },
      { key: 'B', content: '35', correct: true },
      { key: 'C', content: '305', correct: false },
      { key: 'D', content: '350', correct: false },
    ],
  },
  {
    content: 'Which sentence is correct?',
    difficulty: 'MEDIUM',
    explanation: '"Are you going to visit your uncle next week?" is correct future plan question form.',
    options: [
      { key: 'A', content: 'You are going to visit your uncle next week?', correct: false },
      { key: 'B', content: 'Are you going to visit your uncle next week?', correct: true },
      { key: 'C', content: 'Do you going to visit your uncle next week?', correct: false },
      { key: 'D', content: 'Will you going to visit your uncle next week?', correct: false },
    ],
  },
  {
    content: 'Choose the correct sentence about the past:',
    difficulty: 'MEDIUM',
    explanation: '"We didn\'t go to school yesterday" is correct. Negative simple past uses "didn\'t + base verb".',
    options: [
      { key: 'A', content: 'We didn\'t went to school yesterday.', correct: false },
      { key: 'B', content: 'We don\'t go to school yesterday.', correct: false },
      { key: 'C', content: 'We didn\'t go to school yesterday.', correct: true },
      { key: 'D', content: 'We not go to school yesterday.', correct: false },
    ],
  },
  {
    content: 'Which word is a synonym of "happy"?',
    difficulty: 'EASY',
    explanation: '"Joyful" means feeling or showing great happiness.',
    options: [
      { key: 'A', content: 'Sad', correct: false },
      { key: 'B', content: 'Angry', correct: false },
      { key: 'C', content: 'Joyful', correct: true },
      { key: 'D', content: 'Bored', correct: false },
    ],
  },
  {
    content: 'Read: "Lisa is going to have a birthday party next Friday. She has invited ten friends. They will eat cake and play games." How many friends did Lisa invite?',
    difficulty: 'EASY',
    explanation: '"She has invited ten friends."',
    options: [
      { key: 'A', content: '8', correct: false },
      { key: 'B', content: '10', correct: true },
      { key: 'C', content: '12', correct: false },
      { key: 'D', content: '5', correct: false },
    ],
  },
  {
    content: 'Fill in: "This is _____ most beautiful garden I have ever seen."',
    difficulty: 'MEDIUM',
    explanation: 'Superlative uses "the + most + adjective": "the most beautiful".',
    options: [
      { key: 'A', content: 'a', correct: false },
      { key: 'B', content: 'an', correct: false },
      { key: 'C', content: 'the', correct: true },
      { key: 'D', content: 'some', correct: false },
    ],
  },
  {
    content: 'Which word has the same meaning as "begin"?',
    difficulty: 'MEDIUM',
    explanation: '"Start" and "begin" are synonyms - both mean to commence something.',
    options: [
      { key: 'A', content: 'Finish', correct: false },
      { key: 'B', content: 'Stop', correct: false },
      { key: 'C', content: 'Start', correct: true },
      { key: 'D', content: 'End', correct: false },
    ],
  },
  {
    content: 'What does "I\'m thirsty" mean?',
    difficulty: 'EASY',
    explanation: '"Thirsty" means you need or want to drink something.',
    options: [
      { key: 'A', content: 'I want to eat.', correct: false },
      { key: 'B', content: 'I want to drink.', correct: true },
      { key: 'C', content: 'I want to sleep.', correct: false },
      { key: 'D', content: 'I feel cold.', correct: false },
    ],
  },
  {
    content: 'Choose the correct form: "My brother _____ taller than me." (be)',
    difficulty: 'EASY',
    explanation: '"My brother" = he → "is" (Simple Present "to be").',
    options: [
      { key: 'A', content: 'are', correct: false },
      { key: 'B', content: 'am', correct: false },
      { key: 'C', content: 'is', correct: true },
      { key: 'D', content: 'were', correct: false },
    ],
  },
  {
    content: 'What is the plural of "child"?',
    difficulty: 'MEDIUM',
    explanation: '"Child" has an irregular plural: "children".',
    options: [
      { key: 'A', content: 'Childs', correct: false },
      { key: 'B', content: 'Childrens', correct: false },
      { key: 'C', content: 'Children', correct: true },
      { key: 'D', content: 'Childes', correct: false },
    ],
  },
  {
    content: 'Choose the correct word: "There is ___ water in the glass."',
    difficulty: 'MEDIUM',
    explanation: '"Water" is uncountable so we use "some" in affirmative sentences.',
    options: [
      { key: 'A', content: 'many', correct: false },
      { key: 'B', content: 'a few', correct: false },
      { key: 'C', content: 'some', correct: true },
      { key: 'D', content: 'several', correct: false },
    ],
  },
  {
    content: 'He _____ TV when I called him.',
    difficulty: 'MEDIUM',
    explanation: 'Past continuous: "was watching" - an action in progress when interrupted.',
    options: [
      { key: 'A', content: 'watches', correct: false },
      { key: 'B', content: 'watched', correct: false },
      { key: 'C', content: 'was watching', correct: true },
      { key: 'D', content: 'is watching', correct: false },
    ],
  },
  {
    content: 'Choose the correct sentence:',
    difficulty: 'MEDIUM',
    explanation: '"My sister and I are going to the park tomorrow" is correct future plan.',
    options: [
      { key: 'A', content: 'My sister and I going to the park tomorrow.', correct: false },
      { key: 'B', content: 'My sister and I are going to the park tomorrow.', correct: true },
      { key: 'C', content: 'My sister and I is going to the park tomorrow.', correct: false },
      { key: 'D', content: 'My sister and I am going to the park tomorrow.', correct: false },
    ],
  },
  {
    content: 'What does "library" mean in Vietnamese?',
    difficulty: 'EASY',
    explanation: '"Library" means "thư viện" in Vietnamese.',
    options: [
      { key: 'A', content: 'Nhà sách', correct: false },
      { key: 'B', content: 'Thư viện', correct: true },
      { key: 'C', content: 'Phòng học', correct: false },
      { key: 'D', content: 'Văn phòng', correct: false },
    ],
  },
  {
    content: 'Which word describes a feeling of being very tired?',
    difficulty: 'EASY',
    explanation: '"Exhausted" means extremely tired.',
    options: [
      { key: 'A', content: 'Excited', correct: false },
      { key: 'B', content: 'Confused', correct: false },
      { key: 'C', content: 'Exhausted', correct: true },
      { key: 'D', content: 'Delighted', correct: false },
    ],
  },
  {
    content: 'What is the correct question for: "I go to school by bicycle."?',
    difficulty: 'MEDIUM',
    explanation: '"How do you go to school?" asks about method of transportation.',
    options: [
      { key: 'A', content: 'What do you go to school?', correct: false },
      { key: 'B', content: 'Where do you go to school?', correct: false },
      { key: 'C', content: 'How do you go to school?', correct: true },
      { key: 'D', content: 'Who do you go to school?', correct: false },
    ],
  },
  {
    content: 'She _____ never been to Ha Noi before.',
    difficulty: 'MEDIUM',
    explanation: 'Present Perfect: "has" with she/he/it. "She has never been..."',
    options: [
      { key: 'A', content: 'have', correct: false },
      { key: 'B', content: 'has', correct: true },
      { key: 'C', content: 'had', correct: false },
      { key: 'D', content: 'is', correct: false },
    ],
  },
  {
    content: 'What is the opposite of "dark"?',
    difficulty: 'EASY',
    explanation: '"Light" or "bright" is the opposite of "dark".',
    options: [
      { key: 'A', content: 'Heavy', correct: false },
      { key: 'B', content: 'Light', correct: true },
      { key: 'C', content: 'Thin', correct: false },
      { key: 'D', content: 'Short', correct: false },
    ],
  },
  {
    content: 'Complete: "Spring, _____, summer, autumn and winter are the four seasons."',
    difficulty: 'MEDIUM',
    explanation: 'The four seasons are Spring, Summer, Autumn (Fall) and Winter. Here "summer" should come after spring.',
    options: [
      { key: 'A', content: 'winter', correct: false },
      { key: 'B', content: 'autumn', correct: false },
      { key: 'C', content: 'summer', correct: true },
      { key: 'D', content: 'rainy season', correct: false },
    ],
  },
  {
    content: 'Read: "Peter gets up at 7 a.m., has breakfast, and walks to school. He arrives at school at 7:45." How long does Peter take to walk to school?',
    difficulty: 'HARD',
    explanation: 'He leaves home before 7:45. If breakfast is short, approximately 45 minutes walking. The text does not state an exact departure time.',
    options: [
      { key: 'A', content: 'About 30 minutes', correct: false },
      { key: 'B', content: 'About 45 minutes', correct: true },
      { key: 'C', content: 'About 1 hour', correct: false },
      { key: 'D', content: 'About 15 minutes', correct: false },
    ],
  },
  {
    content: 'What does "neighbour" mean?',
    difficulty: 'EASY',
    explanation: 'A "neighbour" is a person who lives next to or near you.',
    options: [
      { key: 'A', content: 'A close friend', correct: false },
      { key: 'B', content: 'A person who lives near you', correct: true },
      { key: 'C', content: 'A relative', correct: false },
      { key: 'D', content: 'A classmate', correct: false },
    ],
  },
  {
    content: 'Fill in: "___ you like to join our club?" — "Yes, I would love to!"',
    difficulty: 'EASY',
    explanation: '"Would you like to..." is a polite invitation.',
    options: [
      { key: 'A', content: 'Do', correct: false },
      { key: 'B', content: 'Are', correct: false },
      { key: 'C', content: 'Would', correct: true },
      { key: 'D', content: 'Will', correct: false },
    ],
  },
  {
    content: 'Which sentence uses "should" correctly?',
    difficulty: 'MEDIUM',
    explanation: '"You should drink more water every day" gives advice with should + base verb.',
    options: [
      { key: 'A', content: 'You should drinks more water every day.', correct: false },
      { key: 'B', content: 'You should drink more water every day.', correct: true },
      { key: 'C', content: 'You should drank more water every day.', correct: false },
      { key: 'D', content: 'You shoulds drink more water every day.', correct: false },
    ],
  },
  {
    content: '"Mount Everest is ___ mountain in the world." (high)',
    difficulty: 'MEDIUM',
    explanation: 'Superlative of "high" is "the highest".',
    options: [
      { key: 'A', content: 'higher', correct: false },
      { key: 'B', content: 'most highest', correct: false },
      { key: 'C', content: 'the highest', correct: true },
      { key: 'D', content: 'high', correct: false },
    ],
  },
  {
    content: 'What is "vegetarian"?',
    difficulty: 'MEDIUM',
    explanation: 'A vegetarian is a person who does not eat meat or fish.',
    options: [
      { key: 'A', content: 'A person who loves vegetables and meat', correct: false },
      { key: 'B', content: 'A person who does not eat meat or fish', correct: true },
      { key: 'C', content: 'A type of vegetable', correct: false },
      { key: 'D', content: 'A cooking style', correct: false },
    ],
  },
  {
    content: 'Choose the right word: "My grandfather is ___ than my father."',
    difficulty: 'EASY',
    explanation: '"Old" → comparative: "older". Grandfather is older than father.',
    options: [
      { key: 'A', content: 'more old', correct: false },
      { key: 'B', content: 'oldest', correct: false },
      { key: 'C', content: 'older', correct: true },
      { key: 'D', content: 'old', correct: false },
    ],
  },
  {
    content: 'Read: "Mai loves drawing. Every day she draws pictures of animals, flowers and people. Her teacher says her drawings are very creative." What does Mai love?',
    difficulty: 'EASY',
    explanation: 'The text says "Mai loves drawing."',
    options: [
      { key: 'A', content: 'Writing stories', correct: false },
      { key: 'B', content: 'Drawing pictures', correct: true },
      { key: 'C', content: 'Singing songs', correct: false },
      { key: 'D', content: 'Playing football', correct: false },
    ],
  },
  {
    content: 'Which word is a verb?',
    difficulty: 'EASY',
    explanation: '"Jump" is a verb (action word). The others are nouns or adjectives.',
    options: [
      { key: 'A', content: 'Beautiful', correct: false },
      { key: 'B', content: 'Tiger', correct: false },
      { key: 'C', content: 'Jump', correct: true },
      { key: 'D', content: 'Quickly', correct: false },
    ],
  },
  {
    content: 'Which word is an adjective?',
    difficulty: 'EASY',
    explanation: '"Wonderful" is an adjective describing a quality.',
    options: [
      { key: 'A', content: 'Run', correct: false },
      { key: 'B', content: 'School', correct: false },
      { key: 'C', content: 'Wonderful', correct: true },
      { key: 'D', content: 'Quickly', correct: false },
    ],
  },
  {
    content: 'Fill in: "I always _____ my teeth before going to bed."',
    difficulty: 'EASY',
    explanation: '"I" + "brush" (simple present, first person singular no -s).',
    options: [
      { key: 'A', content: 'brushes', correct: false },
      { key: 'B', content: 'brush', correct: true },
      { key: 'C', content: 'brushed', correct: false },
      { key: 'D', content: 'am brushing', correct: false },
    ],
  },
  { content: 'Choose the correct sentence: "She ___ (not / like) spicy food."', difficulty: 'EASY', explanation: 'With "she" (third person singular), the negative is "does not like" (doesn\'t like).', options: [{ key: 'A', content: 'She not like spicy food.', correct: false }, { key: 'B', content: 'She doesn\'t likes spicy food.', correct: false }, { key: 'C', content: 'She doesn\'t like spicy food.', correct: true }, { key: 'D', content: 'She don\'t like spicy food.', correct: false }] },
];
async function main() {
  console.log(`Bắt đầu chèn ${questions.length} câu...`);
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await p.question.create({
      data: {
        subjectId: SUBJECT_ID, gradeId: GRADE_ID, content: q.content,
        questionType: 'MULTIPLE_CHOICE', difficulty: q.difficulty,
        explanation: q.explanation, createdById: CREATED_BY, status: 'ACTIVE',
        options: { create: q.options.map((opt, idx) => ({ optionKey: opt.key, content: opt.content, isCorrect: opt.correct, sortOrder: idx })) },
      },
    });
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${questions.length}...`);
  }
  console.log('Hoàn thành!');
  await p.$disconnect();
}
main().catch((e) => { console.error(e); p.$disconnect(); process.exit(1); });
