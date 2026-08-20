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

const cssCache = new Map();

function getCssContent(href) {
  const cleanHref = href.split('?')[0].replace(/^\//, '');
  if (cssCache.has(cleanHref)) {
    return cssCache.get(cleanHref);
  }
  const cssPath = path.join(outDir, cleanHref);
  if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8');
    cssCache.set(cleanHref, css);
    return css;
  }
  return null;
}

function optimizeHtml(html) {
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
    const isStylesheetLink = tag.startsWith('<link') && tag.includes('rel="stylesheet"');
    const isNextFScript = tag.startsWith('<script') && (
      html.startsWith('(self.__next_f', tagEnd + 1) ||
      html.startsWith('self.__next_f', tagEnd + 1)
    );

    if (isChunkScript || isNextFScript) {
      const closeTag = '</script>';
      const closeIdx = html.indexOf(closeTag, tagEnd + 1);
      if (closeIdx !== -1) {
        i = closeIdx + closeTag.length;
        continue;
      }
      i = tagEnd + 1;
      continue;
    } else if (isScriptPreload) {
      i = tagEnd + 1;
      continue;
    } else if (isStylesheetLink) {
      const hrefMatch = tag.match(/href="([^"]+)"/);
      if (hrefMatch && hrefMatch[1]) {
        const href = hrefMatch[1];
        const cssContent = getCssContent(href);
        if (cssContent !== null) {
          result += `<style>${cssContent}</style>`;
          i = tagEnd + 1;
          continue;
        }
      }
    }

    result += tag;
    i = tagEnd + 1;
  }
  return result;
}

if (fs.existsSync(outDir)) {
  console.log('Post-build: Inlining CSS and cleaning unused Next.js JavaScript chunks from HTML files...');
  let count = 0;
  walk(outDir, (filepath) => {
    if (filepath.endsWith('.html')) {
      const content = fs.readFileSync(filepath, 'utf8');
      const newContent = optimizeHtml(content);
      
      if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        count++;
      }
    }
  });
  console.log(`Post-build: Optimized ${count} HTML files (CSS inlined, legacy JS and render-blocking eliminated).`);
} else {
  console.error('Post-build error: "out" directory not found.');
}
