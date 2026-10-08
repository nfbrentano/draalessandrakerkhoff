# SPEC 001 — SEO local (invisível): Lajeado e Vale do Taquari

| Campo | Valor |
|---|---|
| Status | Proposta |
| Data | 2026-10-08 |
| Escopo | Site estático (Next 16, `output: 'export'`) — `draalessandrakerkhoff.com.br` |
| Serviços-alvo | Ronco · Apneia do sono · CPAP · Titulação de CPAP · Fisioterapia cardiorrespiratória |
| Região-alvo | Lajeado (principal), Arroio do Meio, Estrela e Vale do Taquari |

---

## 1. Objetivo e regra de escopo

Melhorar o posicionamento nas buscas locais por ronco, apneia, CPAP, titulação de CPAP e fisioterapia cardiorrespiratória em Lajeado e no Vale do Taquari, **alterando somente o que não é visível ao visitante**.

> **Regra:** nenhuma mudança visível nas páginas. Não criar páginas, não alterar textos, títulos na tela, menu, rodapé, layout, imagens ou botões. O visitante deve ver o site **exatamente igual** antes e depois.

O que pode mudar:
- Metadados no `<head>`: `<title>`, `description`, `keywords`, canonical, Open Graph e Twitter.
- Dados estruturados (JSON-LD).
- `sitemap.xml`, `robots.txt` e `llms.txt`.
- Atributos invisíveis: `alt` das imagens e `href` interno (só a barra final, com o mesmo destino).
- Tags HTML trocadas por outras **sem mudança visual** (mesma classe e estilo).
- Forma de gerar o HTML (estático em vez de cliente), sem mudar o que aparece na tela.
- **Exceção aprovada:** mover a página `/apneia-e-ronco/` para a URL `/fisioterapia-do-sono/` com o **conteúdo idêntico** (R6). Muda só o endereço na barra do navegador.
- **Exceção aprovada (2026-10-08):** o item do menu "Apneia e Ronco" passa a se chamar **"Fisioterapia do Sono"** (`app/components/Header.jsx`).
- **Exceção aprovada (2026-10-08):** o H1 da página `/fisioterapia-do-sono/` passa de "Apneia e Ronco" para **"Fisioterapia do Sono"**.
- **Exceção aprovada (2026-10-08):** em `/servicos/`, o botão "Saiba Mais sobre Apneia e Ronco ➔" passa a ser **"Saiba Mais sobre Fisioterapia do Sono ➔"**.

Buscas-alvo:

| Cluster | Exemplos |
|---|---|
| Ronco | "tratamento para ronco lajeado", "fisioterapia para ronco" |
| Apneia | "apneia do sono lajeado", "fisioterapeuta do sono lajeado" |
| CPAP | "cpap lajeado", "aluguel de cpap lajeado", "adaptação cpap", "máscara cpap lajeado" |
| Titulação | "titulação de cpap lajeado", "titulação cpap vale do taquari" |
| Cardiorrespiratória | "fisioterapia cardiorrespiratória lajeado", "reabilitação cardíaca lajeado", "reabilitação pulmonar lajeado" |

---

## 2. Diagnóstico (somente itens invisíveis)

| # | Severidade | Problema | Onde |
|---|---|---|---|
| P1 | Alta | **O Google identifica a Dra. Alessandra como médica.** O JSON-LD usa `"@type": "Physician"` ("médico"). Para uma fisioterapeuta, isso está errado e pode gerar problemas com o CREFITO. | `app/page.jsx:34` |
| P2 | Alta | **O JSON-LD declara horário seg–sex 14h–18h**, mas o atendimento é com horário a combinar. Também faltam o CREFITO, a formação, os serviços, `areaServed` e o `sameAs` completo. | `app/page.jsx` |
| P3 | Alta | **JSON-LD só na home.** As páginas de serviço, a Sobre e os artigos não têm `Service`, `BreadcrumbList` nem `BlogPosting`. | todas |
| P4 | Alta | **Os artigos do blog novo (`/blog/[slug]/`) são renderizados no cliente**, com o mesmo `<title>` e a mesma `description` genéricos para todos. O conteúdo só existe depois do JS. | `app/blog/[slug]/page.jsx`, `ArticleClient.jsx` |
| P5 | Alta | **O rodapé usa `<h1>`** em todas as páginas, o que gera dois H1 nas páginas que já têm um. | `app/components/Footer.jsx:10` |
| P6 | Média | **Sem `og:image`/`twitter:image`:** os links compartilhados no WhatsApp e no Instagram saem sem imagem. | `app/layout.js` e páginas |
| P7 | Média | **`/fisioterapia-do-sono/` está no sitemap mas é `noindex` + redirect** para `/apneia-e-ronco/`, o que envia sinais conflitantes. A URL tem o termo exato "fisioterapia do sono" e está desperdiçada (resolvido por R6). O `lastModified` é sempre "agora". | `app/sitemap.js`, `app/fisioterapia-do-sono/page.jsx` |
| P8 | Média | **Links internos sem barra final** (`/sobre`, `/apneia-e-ronco`, `/fisioterapia-cardiorrespiratoria`), enquanto a canonical tem barra. Cada clique passa por um redirect. | `Header.jsx`, `app/page.jsx`, `app/servicos/page.jsx` |
| P9 | Média | **`<title>` e `description` não cobrem todos os termos-alvo.** "Titulação de CPAP" e "fisioterapeuta" quase não aparecem; o `title` padrão do `layout.js` é só "Dra. Alessandra Kerkhoff". | metadados |
| P10 | Baixa | **Alt de imagens com nome de arquivo e texto repetido** ("DSC 4910 edited scaled - Tratamento de Ronco…"). | Sobre, apneia, cardio |
| P11 | Baixa | **`keywords` repete "ronco lajeado" em todas as páginas**, inclusive no artigo de caminhada. | todas |
| P12 | Baixa | **O `llms.txt` está desatualizado:** não tem o CREFITO, não diz "fisioterapeuta (não médica)" e não informa o horário a combinar. | `app/llms.txt/route.js` |
| P13 | Baixa | **Os posts antigos (WordPress na raiz) não têm `BlogPosting`.** | rotas raiz |

---

## 3. Dados confirmados pela cliente (2026-10-08)

| Dado | Valor | Onde usar |
|---|---|---|
| Endereço | Rua João Abott, 1234 – Bairro Centro, Lajeado – RS, CEP 95900-080 (Clínica Valecor) | JSON-LD `address`, `llms.txt` |
| Registro profissional | CREFITO-5 116016-F | JSON-LD `Person.identifier`, `llms.txt` |
| Área atendida (domiciliar) | Lajeado, Arroio do Meio, Estrela e Vale do Taquari | JSON-LD `areaServed` |
| Horário | A combinar (com agendamento) | sem `openingHoursSpecification`; `llms.txt` |
| Titulação de CPAP | Não detalhar a forma de realização | metadados citam só "titulação de CPAP" |

Fatos da página Sobre para os dados estruturados: mais de 17 anos de experiência; especialização em Fisioterapia Cardiorrespiratória; Mestrado e Doutorado em Ciências da Saúde (Ciências Cardiovasculares) pela UFRGS; atendimento presencial na Clínica Valecor, domiciliar e por teleconsulta; consultoria e mentoria online para profissionais.

---

## 4. Requisitos

### R1 — Identidade profissional: fisioterapeuta, não médica (invisível)
1. **R1.1** Remover todo uso de `Physician` no JSON-LD.
2. **R1.2** `Person` com `jobTitle: "Fisioterapeuta"` e `hasOccupation` → `Occupation` "Fisioterapeuta".
3. **R1.3** Usar "fisioterapeuta" nos `<title>`, `description` e Open Graph quando fizer sentido (R3).
4. **R1.4** No `llms.txt`, abrir com "Dra. Alessandra Kerkhoff — Fisioterapeuta (CREFITO-5 116016-F), não médica".

### R2 — Dados estruturados (JSON-LD)
Criar `app/utils/schema.js` para gerar o `@graph` e injetá-lo com `<script type="application/ld+json">`, que não aparece na tela.

1. **R2.1** **Entidade principal** (todas as páginas, via `layout.js`):
   - `@type: ["MedicalBusiness", "LocalBusiness"]`, `medicalSpecialty: "PhysicalTherapy"`.
   - `name`, `url`, `telephone`, `email`, `image`, `logo`, `priceRange`.
   - `address` conforme a seção 3:
     ```json
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Rua João Abott, 1234 – Centro",
       "addressLocality": "Lajeado",
       "addressRegion": "RS",
       "postalCode": "95900-080",
       "addressCountry": "BR"
     }
     ```
   - `geo` (manter as coordenadas atuais).
   - **Sem `openingHoursSpecification`** (horário a combinar).
   - `areaServed`: `City` Lajeado, `City` Arroio do Meio, `City` Estrela e `AdministrativeArea` Vale do Taquari.
   - `sameAs`: Instagram, LinkedIn, Facebook e, quando houver, o Perfil da Empresa no Google.
   - `hasOfferCatalog` com os serviços: tratamento de ronco, tratamento de apneia do sono, adaptação ao CPAP/BiPAP, titulação de CPAP, teste de máscaras, aluguel de CPAP e reposição de insumos, reabilitação cardíaca, reabilitação pulmonar, fisioterapia respiratória e consultoria/mentoria para profissionais.
   - `founder`/`employee` → `Person`.
2. **R2.2** **`Person`** (Dra. Alessandra Cristina Kerkhoff):
   - `jobTitle` e `hasOccupation` conforme R1.
   - `identifier` → `PropertyValue` { `propertyID`: "CREFITO-5", `value`: "116016-F" }.
   - `alumniOf`: UFRGS.
   - `hasCredential`: Especialização em Fisioterapia Cardiorrespiratória, Mestrado e Doutorado.
   - `knowsAbout`: ronco, apneia obstrutiva do sono, CPAP, BiPAP, titulação de CPAP, reabilitação cardíaca, reabilitação pulmonar e DPOC.
   - `sameAs`: LinkedIn e Instagram.
3. **R2.3** **`Service`** em `/fisioterapia-do-sono/`, `/fisioterapia-cardiorrespiratoria/` e `/servicos/`: `serviceType`, `provider` → entidade principal, `areaServed` e `availableChannel` (presencial, domiciliar, online).
4. **R2.4** **`BreadcrumbList`** em todas as páginas internas.
5. **R2.5** **`BlogPosting`** nos artigos (novos e antigos): `author` → Person, `datePublished`, `dateModified`, `image`, `publisher`.
6. **R2.6** Não usar `FAQPage` (não há FAQ visível e ela não será criada).

### R3 — Metadados (`<head>`)
1. **R3.1** Revisar `title` (≤ 60 caracteres) e `description` (≤ 155 caracteres):

| Página | Title proposto | Foco da description |
|---|---|---|
| `layout.js` (padrão) | Dra. Alessandra Kerkhoff — Fisioterapeuta em Lajeado | fisioterapia do sono e cardiorrespiratória, Lajeado |
| `/` | Fisioterapeuta em Lajeado: Ronco, Apneia e CPAP | ronco, apneia, CPAP, titulação, cardiorrespiratória |
| `/fisioterapia-do-sono/` | Fisioterapia do Sono em Lajeado: Ronco, Apneia e CPAP | fisioterapeuta do sono; ronco, apneia, adaptação e titulação de CPAP, aluguel e máscaras |
| `/fisioterapia-cardiorrespiratoria/` | Fisioterapia Cardiorrespiratória em Lajeado | reabilitação cardíaca e pulmonar, DPOC, pós-cirurgia |
| `/servicos/` | Fisioterapia do Sono e CPAP em Lajeado \| Serviços | CPAP, titulação, máscaras, aluguel, reabilitação |
| `/sobre/` | Dra. Alessandra Kerkhoff — Fisioterapeuta em Lajeado | 17+ anos, Doutorado UFRGS, fisioterapeuta |
| `/blog/` | manter | — |

2. **R3.2** Reduzir `keywords` a até 5 termos específicos de cada página. Remover "ronco lajeado" das páginas não relacionadas.
3. **R3.3** Adicionar `openGraph.images` e `twitter.images` (1200×630). Usar uma imagem padrão no `layout.js` e, se houver, uma por página.
4. **R3.4** Usar `openGraph.type: "website"` nas páginas de serviço (hoje está `article`) e `article` nos posts.

### R4 — Blog indexável (sem mudança visual)
1. **R4.1** Gerar o HTML do artigo no build em `/blog/[slug]/` (Server Component lendo o Firestore), com o **mesmo resultado visual** do `ArticleClient`. Consultar `node_modules/next/dist/docs/` antes (Next 16).
2. **R4.2** `generateMetadata` por slug: `title`, `description`, canonical, `openGraph.images` e `article:published_time`.
3. **R4.3** `BlogPosting` + `BreadcrumbList` (R2.4, R2.5).

### R5 — Ajustes técnicos invisíveis
1. **R5.1** Trocar o `<h1>` do rodapé por `<p>` com as **mesmas classes**, sem diferença visual. Validar por screenshot antes e depois.
2. **R5.2** Adicionar a barra final aos `href` internos (`/sobre/`, `/fisioterapia-cardiorrespiratoria/`). Os links para `/apneia-e-ronco` passam a apontar para `/fisioterapia-do-sono/` (R6.3).
3. **R5.3** Reescrever os `alt` das imagens de forma descritiva e única, sem nome de arquivo (ex.: "Dra. Alessandra Kerkhoff, fisioterapeuta, em atendimento na Clínica Valecor em Lajeado").
4. **R5.4** No sitemap, excluir rotas com `robots.index=false` (após R6, `/apneia-e-ronco/`) e usar o `lastModified` real (data do último commit do arquivo ou constante por rota).
5. **R5.5** Atualizar o `llms.txt`: CREFITO, "fisioterapeuta (não médica)", endereço da seção 3, horário a combinar, área atendida e serviços (incluindo titulação de CPAP e mentoria).

### R6 — Migrar `/apneia-e-ronco/` → `/fisioterapia-do-sono/`
Objetivo: concentrar ronco, apneia e CPAP numa URL com o termo exato "fisioterapia do sono". O visitante vê **o mesmo conteúdo**, só que em outro endereço.

**Hospedagem:** o site é publicado no **GitHub Pages** (`.github/workflows/deploy.yml`), que não faz redirect 301 no servidor e ignora `public/_redirects`. Por isso o redirect é feito com meta-refresh imediato + canonical, que o Google trata como redirect permanente.

1. **R6.1 — Conteúdo:** mover o conteúdo de `app/apneia-e-ronco/page.jsx` para `app/fisioterapia-do-sono/page.jsx` **sem alterar nenhum texto, imagem ou layout**. Inclui o HTML, o `Header`, os estilos e os metadados (ajustados por R3.1).
   - `Header currentPath="/fisioterapia-do-sono"`, e o item "Apneia e Ronco" continua destacado como ativo (ajustar `isApneia` em `Header.jsx`).
   - Em `layout.js`, `bodyClassByPath`, usar para `/fisioterapia-do-sono` a mesma classe de `/apneia-e-ronco` (`page-id-384`), para manter o visual idêntico.
   - Em `scripts/replace-headers.js`, trocar `'apneia-e-ronco/page.jsx'` por `'fisioterapia-do-sono/page.jsx'`.
   - Metadados: canonical e `openGraph.url` = `https://draalessandrakerkhoff.com.br/fisioterapia-do-sono/`; remover o `robots: noindex`.
2. **R6.2 — Redirect da URL antiga:** `app/apneia-e-ronco/page.jsx` vira a página de redirect, no mesmo padrão atual de `fisioterapia-do-sono`:
   - `robots: { index: false, follow: true }`;
   - `alternates.canonical: "/fisioterapia-do-sono/"`;
   - `<meta http-equiv="refresh" content="0; url=/fisioterapia-do-sono/">` + `window.location.replace("/fisioterapia-do-sono/")`;
   - link de fallback visível só durante o redirect.
3. **R6.3 — Links internos:** trocar todos os `href` de `/apneia-e-ronco` para `/fisioterapia-do-sono/`. O **texto** dos links não muda, exceto o item do menu, renomeado para "Fisioterapia do Sono" a pedido da cliente. Arquivos:
   - `app/components/Header.jsx`
   - `app/page.jsx`
   - `app/servicos/page.jsx`
   - `app/durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap/page.jsx`
   - `app/melhore-seu-sono-beneficios-da-fisioterapia-respiratoria/page.jsx`
   - `app/fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes/page.jsx`
   - ~~`app/admin/components/ArticleForm.jsx`~~ — não alterar: ali `apneia-e-ronco` é o **valor de categoria** dos artigos salvos no Firestore, não um link.
   - links dentro de artigos no Firestore: levantar e atualizar pelo painel admin (o redirect cobre enquanto isso)
4. **R6.4 — Sitemap e `llms.txt`:** `/fisioterapia-do-sono/` entra no sitemap e `/apneia-e-ronco/` sai (R5.4). O `llms.txt` aponta para a nova URL.
5. **R6.5 — Pós-deploy:**
   - Search Console: inspecionar e solicitar indexação de `/fisioterapia-do-sono/`; reenviar o sitemap.
   - Atualizar o link no Instagram, no Perfil da Empresa no Google e em qualquer anúncio que use `/apneia-e-ronco/`.
   - Manter o redirect de `/apneia-e-ronco/` **por tempo indeterminado**, porque é a URL com histórico e backlinks.
   - Esperar oscilação de posição por algumas semanas, enquanto o Google transfere os sinais.

### R7 — Fora do código (recomendações para a cliente)
- Perfil da Empresa no Google: categoria "Fisioterapeuta", serviços com os mesmos nomes do JSON-LD, horário "com agendamento" e NAP idêntico ao da seção 3.
- Pedir avaliações aos pacientes citando o serviço.
- Manter o NAP consistente no Instagram, no Facebook, no LinkedIn e em diretórios.
- Search Console: reenviar o sitemap após o deploy.

---

## 5. Fora de escopo
- **Qualquer mudança visível nas páginas**: textos, H1/H2 na tela, menu, rodapé, layout, imagens e botões.
- Criação de páginas novas.
- Reescrever ou ampliar o conteúdo de `/fisioterapia-do-sono/`. A migração (R6) leva o conteúdo de `/apneia-e-ronco/` como está.
- FAQ, lista de cidades visível e páginas por cidade.
- Pauta e publicação de novos artigos.

## 6. Pendência
- [ ] Imagem 1200×630 para Open Graph (bloqueia só T5).

---

## 7. Tarefas

| ID | Tarefa | Requisito | Arquivos |
|---|---|---|---|
| T1 ✅ | Criar `app/utils/schema.js` (MedicalBusiness, Person, Service, Breadcrumb, BlogPosting) | R1, R2 | novo |
| T2 ✅ | Substituir o JSON-LD `Physician` da home pelo `@graph` global no layout | R1.1, R2.1, R2.2 | `app/page.jsx`, `app/layout.js` |
| T3 ✅ | `Service` + `BreadcrumbList` nas páginas internas | R2.3, R2.4 | páginas de serviço, Sobre, Blog |
| T4 ✅ | Revisar `title`, `description`, `keywords` e `openGraph.type` | R3.1, R3.2, R3.4 | metadados de todas as páginas |
| T5 | Imagens Open Graph | R3.3 | `app/layout.js`, `public/og/*` |
| T6 ⏸️ | Blog: render estático + `generateMetadata` + `BlogPosting` | R4 | `app/blog/[slug]/*` |
| T7 ✅ | `BlogPosting` nos posts antigos | R2.5 | rotas raiz dos posts |
| T8 ✅ | H1 do rodapé → `<p>` (mesmas classes) | R5.1 | `app/components/Footer.jsx` |
| T9 ✅ | Barra final nos `href` internos | R5.2 | `Header.jsx`, `app/page.jsx`, `app/servicos/page.jsx` |
| T10 ✅ | Reescrever `alt` das imagens | R5.3 | Sobre, fisioterapia do sono, cardio |
| T11 ✅ | Ajustar sitemap | R5.4 | `app/sitemap.js` |
| T12 ✅ | Atualizar `llms.txt` | R1.4, R5.5, R6.4 | `app/llms.txt/route.js` |
| T14 ✅ | Migrar o conteúdo de `/apneia-e-ronco/` para `/fisioterapia-do-sono/` | R6.1 | `app/fisioterapia-do-sono/page.jsx`, `layout.js`, `Header.jsx`, `scripts/replace-headers.js` |
| T15 ✅ | Transformar `/apneia-e-ronco/` em redirect para `/fisioterapia-do-sono/` | R6.2 | `app/apneia-e-ronco/page.jsx` |
| T16 ✅ | Trocar os links internos para `/fisioterapia-do-sono/` | R6.3 | ver lista em R6.3 |
| T13 🔶 | Validação final (seção 8) | — | — |

Legenda: ✅ concluída (2026-10-08) · 🔶 parcial · ⏸️ adiada · sem marca = pendente.

### Notas da implementação (2026-10-08)
- **T2:** o grafo global (MedicalBusiness + Person + WebSite) é injetado no `<head>` pelo `app/layout.js` via `app/components/JsonLd.jsx`. O JSON-LD `Physician` da home foi removido.
- **T3:** `/servicos/` recebeu dois `Service` (adaptação/titulação de CPAP e aluguel/insumos); `/sobre/` recebeu `ProfilePage`; os posts antigos receberam `BlogPosting` **sem datas**, porque as páginas não têm data publicada e não se deve inventar uma.
- **T4 (extra):** removido o `alternates.languages` do `layout.js`, que fazia o `hreflang pt-BR` de **todas** as páginas apontar para a home.
- **T8:** o CSS do WordPress aplica `letter-spacing: -0.02em` a `h1`. O `<p>` do rodapé recebeu esse valor inline; o estilo calculado ficou idêntico (medido no navegador).
- **T9 (extra):** os links da listagem do blog (`BlogArticleList.jsx`, `DynamicFirestoreArticles.jsx`) também ganharam barra final.
- **T11:** `lastModified` = data do último commit de cada `page.jsx`. Os dois workflows (`deploy.yml` e `nextjs.yml`) passaram a usar `fetch-depth: 0`; sem isso, todas as páginas receberiam a data do último commit.
- **T6 adiado:** o Firestore não tem artigos publicados (o build gera só `/blog/artigo/`), e o `scripts/post-build.js` remove os chunks JS do Next de **todas** as páginas, inclusive do blog. Retomar quando houver artigos, revendo também o post-build.
- **T13:** feito o build, conferida a ausência de `Physician` e de horário fixo, o JSON-LD validado como JSON em todas as páginas, nenhum link interno sem barra e o sitemap correto. O `<body>` de todas as páginas foi comparado com o build anterior: idêntico, salvo os alts, os hrefs e a tag do rodapé. **Falta:** passar as URLs no Rich Results Test / Schema Validator após o deploy e rodar o Lighthouse.
- **Atenção:** existem dois workflows que publicam no GitHub Pages a cada push (`deploy.yml` com post-build e `nextjs.yml` só com `next build`). Eles competem entre si; o resultado publicado depende de qual termina por último.

---

## 8. Critérios de aceite
- [ ] **Sem regressão visual:** screenshots de todas as páginas (desktop e mobile) antes e depois são idênticos. A única mudança é o endereço de Apneia e Ronco (R6).
- [ ] `npm run build` sem erros.
- [ ] `grep -r Physician out/` vazio; `jobTitle: "Fisioterapeuta"` e CREFITO-5 116016-F presentes no JSON-LD.
- [ ] Nenhum `openingHoursSpecification` no JSON-LD.
- [ ] Endereço do JSON-LD e do `llms.txt` idêntico ao da seção 3.
- [ ] Todos os JSON-LD válidos no Rich Results Test e no Schema Markup Validator.
- [ ] Cada página com no máximo 1 `<h1>` (a home e a Sobre podem ficar sem H1, porque adicionar um seria uma mudança visível).
- [ ] Nenhum `href` interno sem barra final em `out/`.
- [ ] `sitemap.xml` com `/fisioterapia-do-sono/`, sem `/apneia-e-ronco/` e com `lastModified` real.
- [ ] `/fisioterapia-do-sono/` visualmente idêntica à antiga `/apneia-e-ronco/` (screenshot desktop e mobile), indexável e com canonical própria.
- [ ] `/apneia-e-ronco/` redireciona para `/fisioterapia-do-sono/`, com `noindex` e canonical para a nova URL.
- [ ] `grep -r 'href="/apneia-e-ronco' out/` vazio, exceto o fallback do redirect.
- [ ] O item "Fisioterapia do Sono" do menu fica marcado como ativo na nova URL.
- [ ] Artigos do blog com `<title>` único e conteúdo presente no HTML estático (`curl` sem JS).
- [ ] `og:image` presente em todas as páginas (após T5).
- [ ] Lighthouse SEO ≥ 95, sem regressão de performance.

### Métricas (Search Console / GA4, 90 dias)
- Impressões e cliques para consultas com "lajeado" ou "vale do taquari" + {ronco, apneia, cpap, titulação, fisioterapia cardiorrespiratória}.
- CTR das páginas cujo `title`/`description` mudou.
- Eventos `click_whatsapp` e `click_telefone` por página de entrada.
