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


if (fs.existsSync(outDir)) {
  console.log('Post-build: Cleaning unused Next.js JavaScript chunks from HTML files...');
  let count = 0;
  walk(outDir, (filepath) => {
    if (filepath.endsWith('.html')) {
      const content = fs.readFileSync(filepath, 'utf8');
      
      // Match and remove Next.js script chunks
      const scriptRegex = /<script[^>]+src="\/_next\/static\/chunks\/[^>]+><\/script>/g;
      // Match and remove Next.js preload script link tags
      const preloadRegex = /<link[^>]+as="script"[^>]*>/g;
      
      let newContent = content;
      let previous;
      do {
        previous = newContent;
        newContent = newContent.replace(scriptRegex, '').replace(preloadRegex, '');
      } while (newContent !== previous);
      
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
