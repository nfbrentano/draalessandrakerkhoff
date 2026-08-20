const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (stat.isFile()) {
      callback(filepath);
    }
  }
}


function cleanHtml(html) {
  let result = '';
  let i = 0;
  while (i < html.length) {
    const tagStart = html.indexOf('<', i);
    if (tagStart === -1) {
      result += html.slice(i);
      break;
    }
    result += html.slice(i, tagStart);
    const tagEnd = html.indexOf('>', tagStart);
    if (tagEnd === -1) {
      result += html.slice(tagStart);
      break;
    }

    const tag = html.slice(tagStart, tagEnd + 1);
    const isChunkScript = tag.startsWith('<script') && tag.includes('/_next/static/chunks/');
    const isScriptPreload = tag.startsWith('<link') && tag.includes('as="script"');

    if (isChunkScript) {
      const closeTag = '</script>';
      if (html.startsWith(closeTag, tagEnd + 1)) {
        i = tagEnd + 1 + closeTag.length;
        continue;
      }
      i = tagEnd + 1;
      continue;
    } else if (isScriptPreload) {
      i = tagEnd + 1;
      continue;
    }

    result += tag;
    i = tagEnd + 1;
  }
  return result;
}

if (fs.existsSync(outDir)) {
  console.log('Post-build: Cleaning unused Next.js JavaScript chunks from HTML files...');
  let count = 0;
  walk(outDir, (filepath) => {
    if (filepath.endsWith('.html')) {
      const content = fs.readFileSync(filepath, 'utf8');
      const newContent = cleanHtml(content);
      
      if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        count++;
      }
    }
  });
  console.log(`Post-build: Cleaned script tags from ${count} HTML files.`);
} else {
  console.error('Post-build error: "out" directory not found.');
}
