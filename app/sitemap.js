import fs from 'fs';
import path from 'path';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export const dynamic = 'force-static';

/**
 * Escaneia recursivamente o diretório app para encontrar todas as rotas estáticas públicas.
 * Ignora rotas administrativas, rotas de API, templates com colchetes ([slug], [id]) e pastas internas.
 */
function getStaticRoutes(dir, basePath = '') {
  let routes = [];
  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Ignora pastas internas do Next.js, rotas dinâmicas genéricas e painel administrativo/API
        if (
          file.startsWith('(') ||
          file.startsWith('_') ||
          file.startsWith('.') ||
          file.startsWith('[') ||
          file === 'admin' ||
          file === 'api' ||
          file === 'components' ||
          file === 'styles' ||
          file === 'utils' ||
          file === 'lib' ||
          file === 'scripts'
        ) {
          continue;
        }
        routes = routes.concat(getStaticRoutes(fullPath, `${basePath}/${file}`));
      } else if (file === 'page.js' || file === 'page.jsx') {
        routes.push(basePath === '' ? '/' : `${basePath}/`);
      }
    }
  } catch (err) {
    console.warn('Erro ao escanear rotas estáticas:', err);
  }

  return routes;
}

export default async function sitemap() {
  const baseUrl = 'https://draalessandrakerkhoff.com.br';
  const now = new Date();

  // 1. Coleta rotas estáticas base
  const appDir = path.join(process.cwd(), 'app');
  let staticRoutes = getStaticRoutes(appDir);

  // Filtra rotas indesejadas (admin, api, colchetes)
  staticRoutes = staticRoutes.filter(
    (route) =>
      !route.includes('/admin') &&
      !route.includes('/api') &&
      !route.includes('[') &&
      !route.includes('(')
  );

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // 2. Coleta automaticamente todos os artigos publicados no Firestore
  let articleEntries = [];
  try {
    const snapshot = await getDocs(collection(db, 'artigos'));
    const nowIso = now.toISOString();

    articleEntries = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        if (!data || !data.slug) return null;

        // Se o status for rascunho, ignora
        if (data.status === 'rascunho') return null;

        // Se for agendado e a data for futura, ignora até o momento da publicação
        if (data.status === 'agendado' && data.dataPublicacao && data.dataPublicacao > nowIso) {
          return null;
        }

        const dateStr = data.dataAtualizacao || data.dataPublicacao || data.dataCriacao;
        const lastModified = dateStr ? new Date(dateStr) : now;

        return {
          url: `${baseUrl}/blog/${data.slug.replace(/^\/|\/$/g, '')}/`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.warn('Erro ao buscar artigos do Firestore para o sitemap:', err);
  }

  // 3. Unifica e remove duplicidades
  const allEntries = [...staticEntries, ...articleEntries];
  const seen = new Set();
  const uniqueEntries = [];

  for (const entry of allEntries) {
    if (!seen.has(entry.url)) {
      seen.add(entry.url);
      uniqueEntries.push(entry);
    }
  }

  return uniqueEntries;
}
