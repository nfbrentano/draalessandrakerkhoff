// Dados estruturados (JSON-LD) do site. Fonte única de NAP e identidade profissional.
// Spec: SDD/001-seo-local-lajeado/spec.md (R1, R2)

export const SITE_URL = 'https://draalessandrakerkhoff.com.br';

const BUSINESS_ID = `${SITE_URL}/#clinica`;
const PERSON_ID = `${SITE_URL}/#alessandra-kerkhoff`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL = {
  instagram: 'https://www.instagram.com/draalessandrakerkhoff/',
  linkedin: 'https://www.linkedin.com/in/alessandra-cristina-kerkhoff-3763b0202/',
  facebook: 'https://www.facebook.com/profile.php?id=100068731120650',
};

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Rua João Abott, 1234 – Centro',
  addressLocality: 'Lajeado',
  addressRegion: 'RS',
  postalCode: '95900-080',
  addressCountry: 'BR',
};

const AREA_SERVED = [
  { '@type': 'City', name: 'Lajeado' },
  { '@type': 'City', name: 'Arroio do Meio' },
  { '@type': 'City', name: 'Estrela' },
  { '@type': 'AdministrativeArea', name: 'Vale do Taquari' },
];

const SERVICES = [
  'Tratamento de ronco',
  'Tratamento de apneia do sono',
  'Adaptação ao CPAP e BiPAP',
  'Titulação de CPAP',
  'Teste e ajuste de máscaras de CPAP',
  'Aluguel de CPAP e reposição de insumos',
  'Reabilitação cardíaca',
  'Reabilitação pulmonar',
  'Fisioterapia respiratória',
  'Consultoria e mentoria para profissionais',
];

const absolute = (path) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

function businessSchema() {
  return {
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: 'Dra. Alessandra Kerkhoff — Fisioterapia Cardiorrespiratória e do Sono',
    alternateName: 'Clínica Valecor',
    description:
      'Fisioterapia do sono (ronco, apneia, adaptação e titulação de CPAP) e fisioterapia cardiorrespiratória em Lajeado e Vale do Taquari.',
    medicalSpecialty: 'PhysicalTherapy',
    url: `${SITE_URL}/`,
    telephone: '+55-51-99614-5583',
    email: 'ackvalecor@gmail.com',
    image: `${SITE_URL}/wp-content/uploads/2025/08/DSC_4875-scaled.avif`,
    logo: `${SITE_URL}/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png`,
    priceRange: '$$',
    address: ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: -29.4673, longitude: -51.9613 },
    areaServed: AREA_SERVED,
    sameAs: Object.values(SOCIAL),
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de fisioterapia',
      itemListElement: SERVICES.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, provider: { '@id': BUSINESS_ID } },
      })),
    },
  };
}

function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Alessandra Cristina Kerkhoff',
    alternateName: 'Dra. Alessandra Kerkhoff',
    honorificPrefix: 'Dra.',
    jobTitle: 'Fisioterapeuta',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Fisioterapeuta',
      occupationLocation: { '@type': 'City', name: 'Lajeado' },
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'CREFITO-5', value: '116016-F' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
    },
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Especialização', name: 'Especialização em Fisioterapia Cardiorrespiratória' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Mestrado', name: 'Mestrado em Ciências da Saúde: Ciências Cardiovasculares' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Doutorado', name: 'Doutorado em Ciências da Saúde: Ciências Cardiovasculares' },
    ],
    knowsAbout: [
      'Ronco',
      'Apneia obstrutiva do sono',
      'CPAP',
      'BiPAP',
      'Titulação de CPAP',
      'Fisioterapia do sono',
      'Reabilitação cardíaca',
      'Reabilitação pulmonar',
      'DPOC',
    ],
    image: `${SITE_URL}/wp-content/uploads/2025/08/DSC_4875-scaled.avif`,
    url: `${SITE_URL}/sobre/`,
    worksFor: { '@id': BUSINESS_ID },
    sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Dra. Alessandra Kerkhoff',
    inLanguage: 'pt-BR',
    publisher: { '@id': BUSINESS_ID },
  };
}

/** Grafo global (todas as páginas): clínica, fisioterapeuta e site. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [businessSchema(), personSchema(), websiteSchema()],
  };
}

/** Serviço de uma página de serviço. */
export function serviceSchema({ name, serviceType, path, description }) {
  return {
    '@type': 'Service',
    '@id': `${absolute(path)}#servico`,
    name,
    serviceType,
    description,
    url: absolute(path),
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED,
    availableChannel: [
      { '@type': 'ServiceChannel', name: 'Atendimento presencial', serviceLocation: { '@id': BUSINESS_ID } },
      { '@type': 'ServiceChannel', name: 'Atendimento domiciliar' },
      { '@type': 'ServiceChannel', name: 'Teleconsulta', serviceUrl: 'https://wa.me/5551996145583' },
    ],
  };
}

/** Trilha de navegação. items: [{ name, path }] — a Home é incluída automaticamente. */
export function breadcrumbSchema(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** Página de perfil da fisioterapeuta (Sobre). */
export function profilePageSchema(path) {
  return {
    '@type': 'ProfilePage',
    url: absolute(path),
    mainEntity: { '@id': PERSON_ID },
  };
}

/** Artigo do blog. Datas são opcionais (omitidas quando desconhecidas). */
export function blogPostingSchema({ title, description, path, image, datePublished, dateModified }) {
  const post = {
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: absolute(path),
    mainEntityOfPage: absolute(path),
    inLanguage: 'pt-BR',
    author: { '@id': PERSON_ID },
    publisher: { '@id': BUSINESS_ID },
  };
  if (image) post.image = absolute(image);
  if (datePublished) post.datePublished = datePublished;
  if (dateModified || datePublished) post.dateModified = dateModified || datePublished;
  return post;
}

/** Agrupa nós em um único documento JSON-LD. */
export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serializa com escape de "<" (recomendação do guia JSON-LD do Next). */
export function toJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
