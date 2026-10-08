import { fixPaths } from "@/app/utils/fixPaths";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import { graph, serviceSchema, breadcrumbSchema } from "@/app/utils/schema";

export const metadata = {
  title: "Fisioterapia do Sono em Lajeado: Ronco, Apneia e CPAP",
  description: "Tratamento de ronco e apneia do sono em Lajeado com fisioterapeuta: adaptação e titulação de CPAP e BiPAP, teste de máscaras e aluguel de CPAP.",
  keywords: [
    "fisioterapia do sono lajeado",
    "tratamento de ronco lajeado",
    "apneia do sono lajeado",
    "titulação de cpap lajeado",
    "aluguel de cpap lajeado"
  ],
  openGraph: {
    title: "Fisioterapia do Sono em Lajeado: Ronco, Apneia e CPAP",
    description: "Tratamento de ronco e apneia do sono em Lajeado com fisioterapeuta: adaptação e titulação de CPAP e BiPAP, teste de máscaras e aluguel de CPAP.",
    url: "https://draalessandrakerkhoff.com.br/fisioterapia-do-sono/",
    siteName: "Dra. Alessandra Kerkhoff",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisioterapia do Sono em Lajeado: Ronco, Apneia e CPAP",
    description: "Tratamento de ronco e apneia do sono em Lajeado com fisioterapeuta: adaptação e titulação de CPAP e BiPAP, teste de máscaras e aluguel de CPAP.",
  },
};

const pageSchema = graph(
  serviceSchema({
    name: "Fisioterapia do sono: tratamento de ronco e apneia",
    serviceType: "Fisioterapia do sono",
    path: "/fisioterapia-do-sono/",
    description: "Tratamento de ronco e apneia obstrutiva do sono, adaptação e titulação de CPAP e BiPAP, teste de máscaras, aluguel de CPAP e reposição de insumos.",
  }),
  breadcrumbSchema([{ name: "Fisioterapia do Sono", path: "/fisioterapia-do-sono/" }])
);

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <Header currentPath="/fisioterapia-do-sono" />
      <div dangerouslySetInnerHTML={{ __html: fixPaths(`
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFHZBLMD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<a class="skip-link screen-reader-text" id="wp-skip-link" href="#wp--skip-link--target">Pular para o conteúdo</a><div class="wp-site-blocks">


<main id="wp--skip-link--target" class="wp-block-group is-layout-flow wp-container-core-group-is-layout-36bb09e9 wp-block-group-is-layout-flow" style="margin-top:0">
    <div class="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
<div class="wp-block-columns alignwide are-vertically-aligned-center is-style-default is-layout-flex wp-container-core-columns-is-layout-3b811c60 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image alignfull size-full"><img data-od-unknown-tag data-od-xpath="/HTML/BODY/DIV[@class=&apos;wp-site-blocks&apos;]/*[2][self::MAIN]/*[1][self::DIV]/*[1][self::DIV]/*[1][self::DIV]/*[1][self::FIGURE]/*[1][self::IMG]" data-dominant-color="987f77" data-has-transparency="false" fetchpriority="high" decoding="async" width="1440" height="2560" sizes="(max-width: 720px) 100vw, 720px" src="/wp-content/uploads/2025/08/DSC_4829-edited-scaled.avif" alt="Fisioterapeuta Dra. Alessandra Kerkhoff em atendimento de fisioterapia do sono em Lajeado" class="wp-image-97 not-transparent" style="--dominant-color: #987f77;" title="Fisioterapia do Sono" srcset="/wp-content/uploads/2025/08/DSC_4829-edited-scaled.avif 1440w, /wp-content/uploads/2025/08/DSC_4829-edited-169x300.avif 169w, /wp-content/uploads/2025/08/DSC_4829-edited-576x1024.avif 576w, /wp-content/uploads/2025/08/DSC_4829-edited-768x1365.avif 768w, /wp-content/uploads/2025/08/DSC_4829-edited-864x1536.avif 864w, /wp-content/uploads/2025/08/DSC_4829-edited-1152x2048.avif 1152w" /></figure>
</div>

<div class="wp-block-column is-vertically-aligned-center is-style-default is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
<h1 class="wp-block-heading alignfull has-large-font-size"><strong><strong>Fisioterapia do Sono</strong></strong></h1>

<p class="has-text-align-justify wp-block-paragraph">A fisioterapia do sono é uma área em expansão que atua na identificação, intervenção e acompanhamento de pacientes com <strong>distúrbios respiratórios relacionados ao sono</strong>, como o <strong>ronco</strong> e a <strong>apneia obstrutiva do sono (SAOS)</strong>. Com especialização e experiência clínica, ofereço cuidados integrados para promover noites mais tranquilas e uma saúde global mais equilibrada.</p>

<h4 class="wp-block-heading alignfull">💨 Tratamento e Manejo da Apneia Obstrutiva do Sono (SAOS)</h4>

<div class="wp-block-group has-global-padding is-content-justification-center is-layout-constrained wp-block-group-is-layout-constrained">
<ul class="wp-block-list">
<li>Avaliação funcional da respiração durante o sono</li>
<li>Orientações sobre higiene do sono e impacto da apneia na saúde cardiovascular</li>
<li>Prescrição e acompanhamento do tratamento com <strong>CPAP</strong> e <strong>Binível (BiPAP)</strong></li>
<li>Suporte completo na <strong>adaptação aos equipamentos</strong>, garantindo conforto e aderência ao tratamento</li>
</ul>
</div>

<h4 class="wp-block-heading alignfull">🛠️ Assistência Técnica e Personalização</h4>

<div class="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
<ul class="wp-block-list">
<li><strong>Teste de máscaras</strong> para escolher o modelo ideal, conforme anatomia e padrão respiratório</li>
<li><strong>Reposição de materiais para CPAP</strong>, como filtros, tubos e almofadas</li>
<li><strong>Aluguel de CPAP</strong>, ideal para quem está iniciando ou fazendo teste terapêutico</li>
<li>Monitoramento do uso e eficácia do equipamento com suporte contínuo</li>
</ul>
</div>

<h4 class="wp-block-heading alignfull">🧘‍♀️ Benefícios esperados</h4>

<div class="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
<ul class="wp-block-list">
<li>Redução da sonolência diurna e melhora da concentração</li>
<li>Diminuição do ronco e pausas respiratórias</li>
<li>Melhora da oxigenação durante o sono</li>
<li>Mais energia, disposição e bem-estar nas atividades diárias</li>
</ul>
</div>

</div>
</div>
</div>
</main>



</div>


` ) }} />
    </>
  );
}
