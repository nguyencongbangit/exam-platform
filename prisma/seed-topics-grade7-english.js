// Seed topics for Grade 7 English (12 units) and assign questions by keyword matching
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const TOPICS = [
  {
    name: 'Unit 1 - My Hobbies',
    sort: 1,
    keywords: ['hobby', 'hobbies', 'spare time', 'free time', 'collecting', 'gardening', 'cooking', 'enjoy', 'hate', 'prefer', 'reading books', 'drawing', 'painting', 'enjoy.*ing', 'spend.*time'],
  },
  {
    name: 'Unit 2 - Health',
    sort: 2,
    keywords: ['health', 'healthy', 'headache', 'toothache', 'stomachache', 'backache', 'cold', 'fever', 'doctor', 'medicine', 'exercise', 'overweight', 'junk food', 'sleep', 'should.*rest', 'quit smoking', 'diet', 'symptom'],
  },
  {
    name: 'Unit 3 - Community Service',
    sort: 3,
    keywords: ['community', 'volunteer', 'charity', 'donate', 'environment', 'protect', 'homeless', 'orphan', 'flood', 'raised.*money', 'clean.*up', 'pollution', 'responsibility'],
  },
  {
    name: 'Unit 4 - Music and Arts',
    sort: 4,
    keywords: ['music', 'art', 'paint', 'painter', 'orchestra', 'concert', 'gallery', 'sculptor', 'composer', 'conductor', 'musical instrument', 'guitar', 'violin', 'piano', 'drum', 'folk music', 'traditional.*music', 'van gogh', 'artwork', 'exhibition'],
  },
  {
    name: 'Unit 5 - Vietnamese Food and Drink',
    sort: 5,
    keywords: ['food', 'drink', 'pho', 'banh mi', 'rice', 'noodle', 'chopstick', 'ingredient', 'recipe', 'delicious', 'taste', 'sour', 'sweet', 'salty', 'bitter', 'spicy', 'dessert', 'snack', 'beverage', 'che', 'soup', 'cook', 'chef', 'meal', 'dish', 'staple', 'herb'],
  },
  {
    name: 'Unit 6 - The First University',
    sort: 6,
    keywords: ['van mieu', 'university', 'quoc tu giam', 'examination', 'scholar', 'stele', 'confucius', 'dynasty', 'ancient', 'royal.*exam', 'doctoral', 'graduate', 'bamboo', 'used to.*write', 'ly.*king', '1070', '1075'],
  },
  {
    name: 'Unit 7 - Traffic',
    sort: 7,
    keywords: ['traffic', 'road', 'street', 'vehicle', 'motorbike', 'bicycle', 'helmet', 'traffic light', 'speed limit', 'accident', 'driving', 'pedestrian', 'zebra crossing', 'roundabout', 'flyover', 'highway', 'rush hour', 'jam', 'fine.*red light', 'seat.*belt', 'drunk.*drive'],
  },
  {
    name: 'Unit 8 - Films',
    sort: 8,
    keywords: ['film', 'movie', 'cinema', 'director', 'actor', 'actress', 'comedy', 'horror', 'documentary', 'thriller', 'animation', 'cartoon', 'plot', 'cast', 'soundtrack', 'scene', 'award', 'oscar', 'oscar', 'nominated', 'review', 'overrated', 'special effect'],
  },
  {
    name: 'Unit 9 - Festivals',
    sort: 9,
    keywords: ['festival', 'celebrate', 'celebration', 'tet', 'diwali', 'carnival', 'lantern', 'firework', 'costume', 'parade', 'mid-autumn', 'lunar', 'songkran', 'harvest', 'tradition', 'cultural', 'custom', 'annual'],
  },
  {
    name: 'Unit 10 - Sources of Energy',
    sort: 10,
    keywords: ['energy', 'solar', 'wind', 'fossil fuel', 'coal', 'oil', 'gas', 'nuclear', 'renewable', 'electricity', 'power', 'hydroelectric', 'dam', 'turbine', 'emission', 'carbon', 'greenhouse', 'pollution.*energy', 'climate change'],
  },
  {
    name: 'Unit 11 - Travelling in the Future',
    sort: 11,
    keywords: ['travel', 'transport', 'vehicle.*future', 'hovercraft', 'maglev', 'hyperloop', 'self-driving', 'electric car', 'space', 'robot', 'flying car', 'technology.*travel', 'future.*travel', 'autonomous'],
  },
  {
    name: 'Unit 12 - An Overcrowded World',
    sort: 12,
    keywords: ['population', 'overcrowd', 'urbanization', 'rural', 'urban', 'migrate', 'migration', 'housing', 'city', 'megacity', 'congestion', 'density', 'developing.*countr', 'resources.*run out', 'underpopulat'],
  },
];

// Grammar/skill topics
const GRAMMAR_TOPICS = [
  {
    name: 'Ngữ pháp - Thì hiện tại',
    sort: 13,
    keywords: ['present simple', 'present continuous', 'every day', 'every morning', 'at the moment', 'right now', 'look!', 'always.*watches', 'usually', 'adverb of frequency'],
  },
  {
    name: 'Ngữ pháp - Thì quá khứ',
    sort: 14,
    keywords: ['past simple', 'past continuous', 'yesterday', 'last.*year', 'last.*month', 'last.*week', 'ago', 'in 1975', 'while.*was', 'when.*rang'],
  },
  {
    name: 'Ngữ pháp - Câu điều kiện',
    sort: 15,
    keywords: ['conditional', 'if it rains', 'if you study', 'if i were', 'if we don', 'if.*will', 'if.*would', 'type 1', 'type 2'],
  },
  {
    name: 'Ngữ pháp - Câu bị động',
    sort: 16,
    keywords: ['passive', 'is spoken', 'was written', 'will be built', 'were destroyed', 'was organized', 'is protected', 'was nominated', 'be + v3'],
  },
  {
    name: 'Ngữ pháp - Thì hoàn thành',
    sort: 17,
    keywords: ['present perfect', 'have.*been', 'has.*been', 'never.*seen', 'already.*finished', 'since 2', 'for.*years', 'have you ever', 'just.*finished'],
  },
];

async function main() {
  const subject = await p.subject.findFirst({ where: { id: 'sub-anh' } });
  const grade = await p.grade.findFirst({ where: { id: 'grade-7' } });
  if (!subject || !grade) { console.error('Subject/grade not found'); return; }

  // Remove existing Grade 7 English topics
  await p.topic.deleteMany({ where: { subjectId: 'sub-anh', gradeId: 'grade-7' } });
  console.log('Cleared old Grade 7 English topics');

  const allTopics = [...TOPICS, ...GRAMMAR_TOPICS];
  const createdTopics = [];

  for (const t of allTopics) {
    const topic = await p.topic.create({
      data: {
        name: t.name,
        subjectId: 'sub-anh',
        gradeId: 'grade-7',
        sortOrder: t.sort,
      },
    });
    createdTopics.push({ ...topic, keywords: t.keywords });
  }
  console.log(`Created ${createdTopics.length} topics`);

  // Fetch all Grade 7 English questions
  const questions = await p.question.findMany({
    where: { subjectId: 'sub-anh', gradeId: 'grade-7' },
    select: { id: true, content: true },
  });
  console.log(`Found ${questions.length} questions to assign`);

  let assigned = 0;
  let unassigned = 0;

  for (const q of questions) {
    const lower = q.content.toLowerCase();
    let matched = null;

    for (const topic of createdTopics) {
      const match = topic.keywords.some(kw => {
        try {
          return new RegExp(kw, 'i').test(lower);
        } catch {
          return lower.includes(kw.toLowerCase());
        }
      });
      if (match) {
        matched = topic;
        break;
      }
    }

    if (matched) {
      await p.question.update({ where: { id: q.id }, data: { topicId: matched.id } });
      assigned++;
    } else {
      unassigned++;
    }
  }

  console.log(`✅ Gán chủ đề: ${assigned} câu`);
  console.log(`⚪ Chưa gán: ${unassigned} câu (sẽ xuất hiện khi chọn "Tất cả chủ đề")`);

  // Print topic counts
  for (const t of createdTopics) {
    const count = await p.question.count({ where: { topicId: t.id } });
    if (count > 0) console.log(`  ${t.name}: ${count} câu`);
  }
}

main().catch(console.error).finally(() => p.$disconnect());
