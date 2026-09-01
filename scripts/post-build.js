const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

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

function cleanHtmlTags(html) {
  let result = '';
  let i = 0;
  const stylesheetHrefs = [];

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
        stylesheetHrefs.push(hrefMatch[1]);
      }
      i = tagEnd + 1;
      continue;
    }

    result += tag;
    i = tagEnd + 1;
  }
  return { cleanedHtml: result, stylesheetHrefs };
}

async function purgeCssForPage(pageHtml, rawCss) {
  const purgeResult = await new PurgeCSS().purge({
    content: [
      { raw: pageHtml, extension: 'html' },
      path.join(__dirname, '../app/layout.js')
    ],
    css: [{ raw: rawCss }],
    safelist: {
      standard: [
        'has-modal-open',
        'is-menu-open',
        'home',
        'blog',
        'page',
        'single',
        'single-post',
        'wp-singular',
        'page-template-default',
        'post-template-default',
        'single-format-standard',
        'page-parent',
        'page-child',
        /^page-id-/,
        /^parent-pageid-/,
        /^postid-/,
        /^wp-theme-/,
        /^jps-theme-/
      ],
      deep: [
        /^wp-block-navigation__responsive/,
        /:root/,
        /body/,
        /html/
      ],
      greedy: []
    }
  });

  return purgeResult[0] ? purgeResult[0].css : rawCss;
}

async function run() {
  if (!fs.existsSync(outDir)) {
    console.error('Post-build error: "out" directory not found.');
    return;
  }

  console.log('Post-build: Purging unused CSS, inlining critical styles, and removing unused Next.js chunks...');

  const htmlFiles = [];
  walk(outDir, (filepath) => {
    if (filepath.endsWith('.html')) {
      htmlFiles.push(filepath);
    }
  });

  // Collect all CSS chunk files as fallback if needed
  const chunksDir = path.join(outDir, '_next/static/chunks');
  let allChunksCss = '';
  if (fs.existsSync(chunksDir)) {
    const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.css'));
    allChunksCss = chunkFiles.map(f => fs.readFileSync(path.join(chunksDir, f), 'utf8')).join('\n');
  }

  let count = 0;
  for (const filepath of htmlFiles) {
    const originalContent = fs.readFileSync(filepath, 'utf8');
    const { cleanedHtml, stylesheetHrefs } = cleanHtmlTags(originalContent);

    // Combine CSS from page stylesheet links or all chunk styles
    let combinedCss = '';
    for (const href of stylesheetHrefs) {
      const css = getCssContent(href);
      if (css) combinedCss += css + '\n';
    }
    if (!combinedCss.trim()) {
      combinedCss = allChunksCss;
    }

    if (combinedCss.trim()) {
      let purgedCss = await purgeCssForPage(cleanedHtml, combinedCss);
      
      // Fix relative font paths in the inline CSS
      purgedCss = purgedCss.replace(/\.\.\/media\//g, '/_next/static/media/');
      
      // Inject purged CSS inside <head>
      const headCloseIdx = cleanedHtml.indexOf('</head>');
      let finalHtml;
      if (headCloseIdx !== -1) {
        finalHtml = cleanedHtml.slice(0, headCloseIdx) +
          `<style>${purgedCss}</style>` +
          cleanedHtml.slice(headCloseIdx);
      } else {
        finalHtml = `<style>${purgedCss}</style>` + cleanedHtml;
      }

      fs.writeFileSync(filepath, finalHtml, 'utf8');
      count++;
    } else {
      fs.writeFileSync(filepath, cleanedHtml, 'utf8');
      count++;
    }
  }

  console.log(`Post-build: Successfully optimized and purged CSS for ${count} HTML files.`);
}

run().catch((err) => {
  console.error('Post-build optimization error:', err);
  process.exit(1);
});
