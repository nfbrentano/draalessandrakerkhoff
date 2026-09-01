// Service Worker para caching de ativos estáticos em produção
const CACHE_NAME = 'site-static-v2';
const RUNTIME_CACHE = 'runtime-cache-v2';

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

self.addEventListener('install', () => {
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

function isStaticAsset(url) {
  return (
    STATIC_ASSET_EXTENSIONS.some((ext) => url.pathname.endsWith(ext)) ||
    /wp-content|\/static\/|\/fonts\//.test(url.pathname)
  );
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignorar métodos não-GET e extensões de navegador
  if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // Ignorar localhost, HMR do Turbopack/Next.js, painel admin e APIs externas
  if (
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.pathname.includes('/_next/webpack-hmr') ||
    url.pathname.startsWith('/admin') ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  if (request.headers.get('Accept')?.includes('text/html')) {
    // Network-first para páginas HTML
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200 && !response.bodyUsed) {
            try {
              const copy = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
            } catch {}
          }
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  if (isStaticAsset(url)) {
    // Cache-first para ativos estáticos com fallback de rede
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(request)
          .then((response) => {
            if (response && response.status === 200 && !response.bodyUsed) {
              try {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
              } catch {}
            }
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      })
    );
  }
});
