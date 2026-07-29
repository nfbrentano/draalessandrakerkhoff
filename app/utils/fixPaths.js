const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function fixPaths(html) {
  if (!html) return '';
  if (!basePath) return html;

  return html
    // 1. Replace src/href/srcset attributes starting with /wp-content/ or /wp-includes/
    .replace(/(src|href|srcset)="\/wp-content\//g, `$1="${basePath}/wp-content/`)
    .replace(/(src|href|srcset)="\/wp-includes\//g, `$1="${basePath}/wp-includes/`)
    // 2. Replace subsequent entries in srcset comma-separated lists
    .replace(/,\s*\/wp-content\//g, `, ${basePath}/wp-content/`)
    .replace(/,\s*\/wp-includes\//g, `, ${basePath}/wp-includes/`)
    // 3. Replace relative page links (e.g., href="/servicos/sobre" -> href="/draalessandrakerkhoff/servicos/sobre")
    .replace(/href="\/([^\/][^"]*)"/g, `href="${basePath}/$1"`)
    // 4. Replace the root home link (href="/" -> href="/draalessandrakerkhoff/")
    .replace(/href="\/"/g, `href="${basePath}/"`);
}
