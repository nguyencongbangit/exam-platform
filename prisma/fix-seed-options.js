// Chuyển đổi format options trong seed files:
// orderIndex: 0  →  optionKey: 'A', sortOrder: 0
const fs = require('fs');
const path = require('path');

const KEYS = ['A', 'B', 'C', 'D'];
const FILES = process.argv.slice(2);

for (const file of FILES) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Thêm optionKey trước hoặc sau isCorrect/content nếu chưa có
  // Pattern: { content: '...', isCorrect: ..., orderIndex: N }
  // hoặc:    { content: '...', isCorrect: ..., orderIndex: N }
  src = src.replace(/orderIndex:\s*(\d)/g, (_, n) => {
    changed = true;
    const i = parseInt(n);
    return `optionKey: '${KEYS[i]}', sortOrder: ${i}`;
  });

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✅ Fixed: ${path.basename(file)}`);
  } else {
    console.log(`⏭  Skip:  ${path.basename(file)} (no orderIndex found)`);
  }
}
