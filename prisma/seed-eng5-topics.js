const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// Tiếng Anh lớp 5 - Kết nối tri thức với cuộc sống (NXB GD 2024)
const TOPICS = [
  // ─── 12 Units theo SGK ───────────────────────────────────────────────────
  { name: 'Unit 1 - My New School',              sortOrder: 1  },
  { name: 'Unit 2 - Our Classroom Activities',   sortOrder: 2  },
  { name: 'Unit 3 - My Neighbourhood',           sortOrder: 3  },
  { name: 'Unit 4 - Our Outdoor Activities',     sortOrder: 4  },
  { name: 'Unit 5 - Our Hobbies',                sortOrder: 5  },
  { name: 'Unit 6 - Our School Rules',           sortOrder: 6  },
  { name: 'Unit 7 - Our Past',                   sortOrder: 7  },
  { name: 'Unit 8 - Places We Visit',            sortOrder: 8  },
  { name: 'Unit 9 - Our Seasons and Weather',    sortOrder: 9  },
  { name: 'Unit 10 - Jobs We Do',                sortOrder: 10 },
  { name: 'Unit 11 - Our Celebrations',          sortOrder: 11 },
  { name: 'Unit 12 - Our World',                 sortOrder: 12 },

  // ─── Ngữ pháp tổng hợp phù hợp lớp 5 ───────────────────────────────────
  { name: 'Ngữ pháp - Thì hiện tại đơn & hiện tại tiếp diễn', sortOrder: 13 },
  { name: 'Ngữ pháp - Thì quá khứ đơn',                        sortOrder: 14 },
  { name: 'Ngữ pháp - Thì tương lai (will / be going to)',      sortOrder: 15 },
  { name: 'Ngữ pháp - So sánh hơn & so sánh nhất',             sortOrder: 16 },
  { name: 'Ngữ pháp - Câu hỏi & từ để hỏi (Wh-questions)',     sortOrder: 17 },
];

async function main() {
  const created = [];
  for (const t of TOPICS) {
    const topic = await p.topic.create({
      data: {
        name: t.name,
        subjectId: 'sub-anh',
        gradeId:   'grade-5',
        sortOrder: t.sortOrder,
      },
    });
    created.push(topic);
    console.log(`✅ [${topic.id}] ${topic.name}`);
  }

  console.log('\n📋 TOPIC IDs để dùng khi seed câu hỏi:');
  created.forEach(t => console.log(`  ${t.name.padEnd(55)} | ${t.id}`));
  console.log(`\n✨ Đã tạo ${created.length} chủ đề Tiếng Anh lớp 5.`);
}

main().catch(console.error).finally(() => p.$disconnect());
