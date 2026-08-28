const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'update-explanations-grade5-new.js');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let fixCount = 0;
const fixed = lines.map(line => {
  // Match lines where a single-quoted key is followed directly by a double-quote (missing ': ')
  // e.g.  'key text with "quotes" inside:'"value starting with double quote'
  // Pattern: line has 'KEY':"VALUE" but should be 'KEY': "VALUE"...
  // Actually in our case the values are single-quoted too but start with "
  // Bad: 'key':'  (key ends, then immediately double quote opens)
  // We need to detect: <single-quote><colon><single-quote><double-quote>... wait
  // Let me re-examine. The bad pattern is:
  // 'key ending with colon': then the VALUE string which starts with "
  // The VALUE is single-quoted: '"some text"'
  // So good would be: 'key': '"some text"',
  // Bad was: 'key'"some text"', (missing ': )

  // After my previous fix on line 47, the ': was added. So now line 47 is correct.
  // Line 65 still has the bad pattern.

  // Pattern to find: a single-quoted string followed immediately by a double-quote character
  // i.e., '...': at end, then " starts (but the ' closes before :')
  // Regex: match '...'  then " where there's no : ' between them
  const newLine = line.replace(/^(\s*'(?:[^'\\]|\\.)*')\s*(")/g, (m, key, dq) => {
    fixCount++;
    return key + ': \'' + dq;
  });
  return newLine;
});

const result = fixed.join('\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log('Fixed', fixCount, 'lines');
