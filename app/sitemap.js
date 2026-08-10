export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://draalessandrakerkhoff.com.br';
  
  const routes = [
    '',
    '/servicos/',
    '/servicos/sobre/',
    '/blog/',
    '/apneia-e-ronco/',
    '/fisioterapia-cardiorrespiratoria/',
    '/como-a-caminhada-melhora-seu-sono-e-bem-estar/',
    '/melhore-seu-sono-beneficios-da-fisioterapia-respiratoria/',
    '/durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap/',
    '/fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes/',
    '/cuide-do-seu-cpap-com-simplicidade-passos-faceis-para-noites-mais-tranquilas/',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
