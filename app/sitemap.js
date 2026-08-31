import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

function getRoutes(dir, basePath = '') {
  let routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Ignore Next.js internal folders and hidden folders
      if (file.startsWith('(') || file.startsWith('_') || file.startsWith('.')) {
        continue;
      }
      routes = routes.concat(getRoutes(fullPath, `${basePath}/${file}`));
    } else if (file === 'page.js' || file === 'page.jsx') {
      routes.push(basePath === '' ? '/' : basePath + '/');
    }
  }

  return routes;
}

export default function sitemap() {
  const baseUrl = 'https://draalessandrakerkhoff.com.br';
  
  const appDir = path.join(process.cwd(), 'app');
  let routes = getRoutes(appDir);
  
  routes = routes.filter(route => !route.includes('/api/'));

  return routes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));
}
