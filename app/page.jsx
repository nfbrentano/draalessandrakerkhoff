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


<footer class="wp-block-template-part">
<footer class="wp-block-group alignfull is-style-default has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-content-justification-center is-layout-constrained wp-container-core-group-is-layout-452657ba wp-block-group-is-layout-constrained" id="footer-section" style="margin-top:0;margin-bottom:0;padding-top:calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)));padding-right:var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal));padding-bottom:calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)));padding-left:var(--wp--style--root--padding-left, var(--wp--custom--gap--horizontal))">
<div class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-f6dc32cc wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-container-core-column-is-layout-f96db3f4 wp-block-column-is-layout-flow"><h1 class="wp-block-site-title has-text-color has-theme-11-color">Tratamento de Ronco e Apneia do Sono em Lajeado e Região</h1>


<div style="height:23px" aria-hidden="true" class="wp-block-spacer"></div>



<p class="has-text-align-full is-footer-phone-email has-theme-11-color has-text-color wp-block-paragraph"><a href="tel:+5551996145583">(51) 99614-5583</a> | ackfisioterapia@gmail.com</p>



<div style="height:23px" aria-hidden="true" class="wp-block-spacer"></div>



<ul class="wp-block-social-links is-layout-flex wp-block-social-links-is-layout-flex"><li class="wp-social-link wp-social-link-instagram wp-block-social-link"><a href="https://www.instagram.com/draalessandrakerkhoff" class="wp-block-social-link-anchor"><svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"></path></svg><span class="wp-block-social-link-label screen-reader-text">Instagram</span></a></li>

<li class="wp-social-link wp-social-link-facebook wp-block-social-link"><a href="https://www.facebook.com/profile.php?id=100068731120650" class="wp-block-social-link-anchor"><svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"></path></svg><span class="wp-block-social-link-label screen-reader-text">Facebook</span></a></li>

<li class="wp-social-link wp-social-link-whatsapp wp-block-social-link"><a href="https://wa.me/5551996145583" class="wp-block-social-link-anchor"><svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path></svg><span class="wp-block-social-link-label screen-reader-text">WhatsApp</span></a></li>

<li class="wp-social-link wp-social-link-linkedin wp-block-social-link"><a href="https://linkedin.com/in/draalessandrakerkhoff" class="wp-block-social-link-anchor"><svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18.3 18.3h-2.6v-4.2c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2h.1c.3-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.8v4.9z"></path></svg><span class="wp-block-social-link-label screen-reader-text">LinkedIn</span></a></li></ul>
</div>
</div>



<div style="height:var(--wp--preset--spacing--20)" aria-hidden="true" class="wp-block-spacer"></div>
</footer>
</footer></div>
`) }} />
    </>
  );
}
