const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.jsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      const target = '<h1 class="wp-block-site-title has-text-color has-theme-11-color">Tratamento de Ronco e Apneia do Sono em Lajeado</h1>';
      const replacement = '<h1 class="wp-block-site-title has-text-color has-theme-11-color">Tratamento de Ronco e Apneia do Sono em Lajeado e Região</h1>';
      if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, '../app'));
console.log('Done.');
