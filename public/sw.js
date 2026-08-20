// Service Worker para caching de ativos estáticos
const CACHE_NAME = 'site-static-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Extensões e caminhos que queremos cachear com estratégia cache-first
const STATIC_ASSET_EXTENSIONS = [
  '.js',
  '.css',
  '.woff2',
  '.woff',
  '.avif',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.ico'
];

self.addEventListener('install', (event) => {
  // Não pré-cachear muitos arquivos — deixamos o cache ser preenchido sob demanda
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estrategias de fetch:
// - HTML: network-first (garante conteúdo atualizado)
// - JS/CSS/Images/Chunks: cache-first com fallback de rede e revalidação em background

function isStaticAsset(url) {
  return STATIC_ASSET_EXTENSIONS.some((ext) => url.pathname.endsWith(ext)) || /chunks|wp-content|_next|static|assets/.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET
  if (request.method !== 'GET') return;

  // Ignore requests to other origins (optional: allow CDNs)
  if (url.origin !== self.location.origin) return;

  if (request.headers.get('Accept')?.includes('text/html')) {
    // Network-first for HTML
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Atualiza cache de runtime com a última versão do HTML
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/index.html'))
        )
    );
    return;
  }

  if (isStaticAsset(url)) {
    // Cache-first para ativos estáticos
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Revalida em segundo plano
          event.waitUntil(
            fetch(request)
              .then((response) => {
                if (response && response.status === 200) {
                  caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
                }
              })
              .catch(() => {})
          );
          return cached;
        }

        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
            }
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      })
    );
    return;
  }

  // Default: fallback to network
});
