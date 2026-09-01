export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/wp-admin/',
          '/wp-includes/',
          '/wp-content/plugins/',
          '/wp-content/themes/',
          '/wp-json/',
          '*?*', // Evita rastreamento de URLs com parâmetros de busca
        ],
      },
    ],
    sitemap: 'https://draalessandrakerkhoff.com.br/sitemap.xml',
  };
}
