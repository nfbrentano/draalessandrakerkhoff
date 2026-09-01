import { fixPaths } from "@/app/utils/fixPaths";

export const metadata = {
  title: "Tratamento de Ronco e Apneia do Sono em Lajeado",
  description: "Sofre com ronco ou apneia? Dra. Alessandra Kerkhoff é referência em fisioterapia respiratória e do sono em Lajeado.",
  keywords: [
    "tratamento de ronco",
    "apneia do sono",
    "cpap lajeado",
    "vale do taquari",
    "fisioterapia do sono",
    "dra alessandra kerkhoff"
  ],
  openGraph: {
    title: "Tratamento de Ronco e Apneia do Sono em Lajeado",
    description: "Referência em fisioterapia cardiorrespiratória e do sono no Vale do Taquari.",
    url: "https://draalessandrakerkhoff.com.br",
    siteName: "Dra. Alessandra Kerkhoff",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tratamento de Ronco e Apneia do Sono em Lajeado",
    description: "Referência em fisioterapia cardiorrespiratória e do sono no Vale do Taquari.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dra. Alessandra Kerkhoff",
    "image": "https://draalessandrakerkhoff.com.br/wp-content/uploads/2025/08/DSC_4875-scaled.avif",
    "@id": "https://draalessandrakerkhoff.com.br/#physician",
    "url": "https://draalessandrakerkhoff.com.br",
    "telephone": "+55 51 99614-5583",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua João Abott, 1234, Centro",
      "addressLocality": "Lajeado",
      "addressRegion": "RS",
      "postalCode": "95900-080",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -29.4673,
      "longitude": -51.9613
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "14:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/draalessandrakerkhoff/"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div dangerouslySetInnerHTML={{ __html: fixPaths(`
<a class="skip-link screen-reader-text" id="wp-skip-link" href="#wp--skip-link--target">Pular para o conteúdo</a><div class="wp-site-blocks"><header class="wp-block-template-part">
<div class="wp-block-group alignfull is-style-undefined has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="header-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)">
<header class="wp-block-group alignwide is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-c163a845 wp-block-group-is-layout-flex" style="margin-top:0;margin-bottom:0">
<div class="wp-block-group is-nowrap is-layout-flex wp-container-core-group-is-layout-96967725 wp-block-group-is-layout-flex">
<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex"></div>
</div>



<div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-d0242c86 wp-block-group-is-layout-flex">
<div class="wp-block-group order-1 is-nowrap is-layout-flex wp-container-core-group-is-layout-04f00732 wp-block-group-is-layout-flex"><div class="aligncenter is-style-default wp-block-site-logo"><a href="/" class="custom-logo-link" rel="home" aria-current="page"><img data-od-xpath="/HTML/BODY/DIV[@class=&apos;wp-site-blocks&apos;]/*[1][self::HEADER]/*[1][self::DIV]/*[1][self::HEADER]/*[2][self::DIV]/*[1][self::DIV]/*[1][self::DIV]/*[1][self::A]/*[1][self::IMG]" width="48" height="48" src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png" class="custom-logo" alt="Logotipo da Clínica Dra. Alessandra Kerkhoff." decoding="async" srcset="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-512x512.png 512w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-300x300.png 300w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-270x270.png 270w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-192x192.png 192w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-180x180.png 180w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-150x150.png 150w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-32x32.png 32w" sizes="(max-width: 48px) 100vw, 48px" /></a></div></div>


<nav class="is-responsive items-justified-right wp-block-navigation is-horizontal is-content-justification-right is-layout-flex wp-container-core-navigation-is-layout-500a3abb wp-block-navigation-is-layout-flex" aria-label="Menu (Copia)" 
		 data-wp-interactive="core/navigation" data-wp-context='{"overlayOpenedBy":{"click":false,"hover":false,"focus":false},"type":"overlay","roleAttribute":"","ariaLabel":"Menu"}'><button aria-haspopup="dialog" aria-label="Abrir menu" class="wp-block-navigation__responsive-container-open" 
				data-wp-on--click="actions.openMenuOnClick"
				data-wp-on--keydown="actions.handleMenuKeydown"
			><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 5v1.5h14V5H5z"></path><path d="M5 12.8h14v-1.5H5v1.5z"></path><path d="M5 19h14v-1.5H5V19z"></path></svg></button>
				<div class="wp-block-navigation__responsive-container"  id="modal-1" 
				data-wp-class--has-modal-open="state.isMenuOpen"
				data-wp-class--is-menu-open="state.isMenuOpen"
				data-wp-watch="callbacks.initMenu"
				data-wp-on--keydown="actions.handleMenuKeydown"
				data-wp-on--focusout="actions.handleMenuFocusout"
				tabindex="-1"
			>
					<div class="wp-block-navigation__responsive-close" tabindex="-1">
						<div class="wp-block-navigation__responsive-dialog" 
				data-wp-bind--aria-modal="state.ariaModal"
				data-wp-bind--aria-label="state.ariaLabel"
				data-wp-bind--role="state.roleAttribute"
			>
							<button aria-label="Fechar menu" class="wp-block-navigation__responsive-container-close" 
				data-wp-on--click="actions.closeMenuOnClick"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path></svg></button>
							<div class="wp-block-navigation__responsive-container-content" 
				data-wp-watch="callbacks.focusFirstElement"
			 id="modal-1-content">
								<ul class="wp-block-navigation__container is-responsive items-justified-right wp-block-navigation"><li class="wp-block-navigation-item wp-block-navigation-link"><a class="wp-block-navigation-item__content"  href="/"><span class="wp-block-navigation-item__label">Home</span></a></li><li class="wp-block-navigation-item wp-block-navigation-link"><a class="wp-block-navigation-item__content"  href="/fisioterapia-cardiorrespiratoria"><span class="wp-block-navigation-item__label">Fisioterapia Cardiorrespiratória</span></a></li><li class="wp-block-navigation-item wp-block-navigation-link"><a class="wp-block-navigation-item__content"  href="/apneia-e-ronco"><span class="wp-block-navigation-item__label">Apneia e Ronco</span></a></li><li class="wp-block-navigation-item wp-block-navigation-link"><a class="wp-block-navigation-item__content"  href="/servicos/sobre"><span class="wp-block-navigation-item__label">Sobre</span></a></li><li class="wp-block-navigation-item wp-block-navigation-link"><a class="wp-block-navigation-item__content"  href="/blog"><span class="wp-block-navigation-item__label">Blog</span></a></li></ul>
								
							</div>
						</div>
					</div>
				</div></nav></div>
</header>
</div>
</header>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFHZBLMD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


<main id="wp--skip-link--target" class="wp-block-group is-layout-flow wp-container-core-group-is-layout-36bb09e9 wp-block-group-is-layout-flow" style="margin-top:0"><header class="wp-block-template-part">
<div id="hero-section" class="wp-block-group is-style-section-2 has-theme-11-color has-theme-10-background-color has-text-color has-background is-layout-flow wp-block-group-is-layout-flow is-style-section-2--2" style="margin-top:0;margin-bottom:0">


<div class="wp-block-group alignwide has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
<div class="wp-block-columns alignwide are-vertically-aligned-center pointer-events-none is-layout-flex wp-container-core-columns-is-layout-392ac897 wp-block-columns-is-layout-flex" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--50)">
<div class="wp-block-column is-vertically-aligned-center has-global-padding is-content-justification-left is-layout-constrained wp-container-core-column-is-layout-03bf935b wp-block-column-is-layout-constrained" style="padding-right:0;padding-left:0">
<h2 class="wp-block-heading has-text-align-center has-theme-11-color has-text-color has-xx-large-font-size">Cuide do seu coração!</h2>



<div class="wp-block-buttons is-content-justification-center is-nowrap is-layout-flex wp-container-core-buttons-is-layout-4d0218bd wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link has-theme-13-color has-theme-12-background-color has-text-color has-background wp-element-button" href="https://wa.me/5551996145583">Fale comigo!</a></div>
</div>
</div>



<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-full is-style-default"><img data-jp-lcp-optimized="true" loading="eager" data-od-fetchpriority-already-added data-od-xpath="/HTML/BODY/DIV[@class=&apos;wp-site-blocks&apos;]/*[4][self::MAIN]/*[1][self::HEADER]/*[1][self::DIV]/*[1][self::DIV]/*[1][self::DIV]/*[2][self::DIV]/*[1][self::FIGURE]/*[1][self::IMG]" fetchpriority="high" decoding="async" width="2560" height="1709" sizes="(min-width: 1537px) 670px, (min-width: 1367px) 643px, (min-width: 1281px) 558px, (min-width: 1025px) 515px, (min-width: 835px) 387px, (min-width: 769px) 313px, (min-width: 441px) 653px, (min-width: 413px) 374px, (min-width: 394px) 350px, (min-width: 376px) 334px, (min-width: 361px) 319px, 306px" src="/wp-content/uploads/2025/08/DSC_5059-1-scaled.avif" alt="Dra. Alessandra Kerkhoff - Fisioterapeuta Especialista em Apneia do Sono e Cardiorrespiratória" class="wp-image-254" style="aspect-ratio:3/4;object-fit:cover" srcset="/wp-content/uploads/2025/08/DSC_5059-1-scaled.avif 2560w, /wp-content/uploads/2025/08/DSC_5059-1-2048x1367.avif 2048w, /wp-content/uploads/2025/08/DSC_5059-1-1536x1025.avif 1536w, /wp-content/uploads/2025/08/DSC_5059-1-1024x684.avif 1024w, /wp-content/uploads/2025/08/DSC_5059-1-768x513.avif 768w, /wp-content/uploads/2025/08/DSC_5059-1-300x200.avif 300w" /></figure>
</div>
</div>
</div>
</div>
</header></main>



<div class="wp-block-group alignfull is-style-default has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-content-justification-center is-layout-constrained wp-block-group-is-layout-constrained" id="about-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-a2e1813e wp-block-columns-is-layout-flex">
<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-container-core-column-is-layout-1739b1c3 wp-block-column-is-layout-flow" style="flex-basis:50%">
<h2 class="wp-block-heading has-theme-11-color has-text-color">Dra. Alessandra Kerkhoff</h2>
</div>



<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
<p class="has-text-align-justify has-theme-11-color has-text-color wp-block-paragraph">Me chamo Alessandra Kerkhoff, sou <strong>fisioterapeuta</strong> com mais de 17 anos de experiência. Minha trajetória profissional inclui <strong>especialização</strong> em Fisioterapia <strong>Cardiorrespiratória</strong> e formação acadêmica sólida, com <strong>Mestrado</strong> e <strong>Doutorado</strong> em Ciências <strong>Cardiovasculares</strong>. Sou reconhecida como <strong>referência</strong> em Fisioterapia Cardiorrespiratória no <strong>Vale do Taquari</strong>, com expertise em Apneia do Sono e Reabilitação Cardíaca e Pulmonar.</p>



<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/servicos/sobre">Saiba Mais</a></div>
</div>
</div>
</div>
</div>



<div class="wp-block-group alignfull is-style-default has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-content-justification-center is-layout-constrained wp-block-group-is-layout-constrained" id="services-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)">
<div class="wp-block-columns alignwide are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-3b811c60 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-full"><img data-od-added-loading data-od-replaced-sizes="(max-width: 310px) 100vw, 310px" data-od-xpath="/HTML/BODY/DIV[@class=&apos;wp-site-blocks&apos;]/*[6][self::DIV]/*[1][self::DIV]/*[1][self::DIV]/*[1][self::FIGURE]/*[1][self::IMG]" loading="lazy" width="2560" height="1709" sizes="auto, (max-width: 310px) 100vw, 310px" src="/wp-content/uploads/2025/08/DSC_4783-scaled.avif" alt="Fisioterapeuta Dra. Alessandra Kerkhoff aferindo pressão do paciente." class="wp-image-79" style="aspect-ratio:1;object-fit:cover" srcset="/wp-content/uploads/2025/08/DSC_4783-scaled.avif 2560w, /wp-content/uploads/2025/08/DSC_4783-300x200.avif 300w, /wp-content/uploads/2025/08/DSC_4783-1024x683.avif 1024w, /wp-content/uploads/2025/08/DSC_4783-768x513.avif 768w, /wp-content/uploads/2025/08/DSC_4783-1536x1025.avif 1536w, /wp-content/uploads/2025/08/DSC_4783-2048x1367.avif 2048w" /></figure>
</div>



<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
<h2 class="wp-block-heading alignwide has-theme-11-color has-text-color">Serviços:</h2>



<p class="has-text-align-justify has-theme-11-color has-text-color wp-block-paragraph">Meu trabalho é focado em <strong>reabilitação cardíaca e pulmonar</strong>, oferecendo tratamento especializado para condições como infarto, pré e pós cirurgia cardíaca,  DPOC, fibrose pulmonar, pneumonias entre outros no público adulto. Além disso,   distúrbios respiratórios do sono, como a apneia do sono e ronco. Busco, através de um atendimento personalizado, <strong>otimizar a sua capacidade funcional respiratória e cardiovascular</strong>, promovendo qualidade de vida e bem-estar.</p>

<h3 class="has-theme-11-color has-text-color wp-block-heading">Na área de Fisioterapia Cardiorrespiratória, ofereço:</h3>



<ul class="wp-block-list">
<li>Reabilitação Cardíaca</li>



<li>Reabilitação Pulmonar</li>



<li>Fisioterapia Respiratória</li>
</ul>



<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button is-service-link"><a class="wp-block-button__link has-theme-13-color has-theme-12-background-color has-text-color has-background wp-element-button" href="/fisioterapia-cardiorrespiratoria">Saiba Mais</a></div>
</div>



<h3 class="has-theme-11-color has-text-color wp-block-heading">Como Fisioterapeuta do Sono, atuo com:</h3>



<ul class="wp-block-list">
<li>Tratamento de distúrbios respiratórios do sono, como ronco e apneia do sono</li>



<li>Adaptação ao tratamento com CPAP</li>



<li>Adaptação com Binível (BiPAP)</li>



<li>Aluguel de CPAP</li>



<li>Reposição de materiais para CPAP</li>



<li>Teste e seleção de máscaras</li>
</ul>



<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button is-service-link"><a class="wp-block-button__link has-theme-13-color has-theme-12-background-color has-text-color has-background wp-element-button" href="/apneia-e-ronco">Saiba Mais</a></div>
</div>
</div>
</div>
</div>



<div class="wp-block-group alignfull is-style-section-1 has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-content-justification-center is-layout-constrained wp-block-group-is-layout-constrained is-style-section-1--3" id="contact-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)">
<div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-3b811c60 wp-block-columns-is-layout-flex">
<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
<h2 class="wp-block-heading has-theme-11-color has-text-color has-x-large-font-size">Contato</h2>



<p class="is-contact-description has-theme-11-color has-text-color wp-block-paragraph">Agende sua consulta e venha descobrir como a fisioterapia cardiorrespiratória e do sono pode <strong>transformar </strong>sua saúde e bem-estar. Estou pronta para te ajudar a conquistar uma vida mais leve, saudável e equilibrada. Vamos <strong>juntos </strong>cuidar do que <strong>mais </strong>importa: <strong>você</strong>.</p>



<div style="height:19px" aria-hidden="true" class="wp-block-spacer"></div>



<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://wa.me/5551996145583">Fale comigo!</a></div>
</div>
</div>



<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<figure class="wp-block-image size-full"><img data-od-added-loading data-od-replaced-sizes="(max-width: 310px) 100vw, 310px" data-od-xpath="/HTML/BODY/DIV[@class=&apos;wp-site-blocks&apos;]/*[7][self::DIV]/*[1][self::DIV]/*[2][self::DIV]/*[1][self::FIGURE]/*[1][self::IMG]" loading="lazy" width="1709" height="2560" sizes="auto, (max-width: 310px) 100vw, 310px" src="/wp-content/uploads/2025/08/DSC_4875-scaled.avif" alt="Fisioterapeuta Dra. Alessandra Kerkhoff" class="wp-image-80" style="aspect-ratio:3/4;object-fit:cover" srcset="/wp-content/uploads/2025/08/DSC_4875-scaled.avif 1709w, /wp-content/uploads/2025/08/DSC_4875-200x300.avif 200w, /wp-content/uploads/2025/08/DSC_4875-684x1024.avif 684w, /wp-content/uploads/2025/08/DSC_4875-768x1150.avif 768w, /wp-content/uploads/2025/08/DSC_4875-1025x1536.avif 1025w, /wp-content/uploads/2025/08/DSC_4875-1367x2048.avif 1367w" /></figure>
</div>
</div>
</div>


</div>
`) }} />
    </>
  );
}
