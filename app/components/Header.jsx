import { fixPaths } from "@/app/utils/fixPaths";

export default function Header({ currentPath = "/blog" }) {
  const isHome = currentPath === "/";
  const isFisio = currentPath === "/fisioterapia-cardiorrespiratoria";
  const isApneia = currentPath === "/apneia-e-ronco";
  const isSobre = currentPath === "/sobre";
  const isBlog = currentPath.startsWith("/blog");

  return (
    <div dangerouslySetInnerHTML={{ __html: fixPaths(`
<header class="wp-block-template-part">
<div class="wp-block-group alignfull is-style-undefined has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="header-section" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)">
<header class="wp-block-group alignwide is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-c163a845 wp-block-group-is-layout-flex" style="margin-top:0;margin-bottom:0">
<div class="wp-block-group is-nowrap is-layout-flex wp-container-core-group-is-layout-96967725 wp-block-group-is-layout-flex">
<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex"></div>
</div>

<div class="wp-block-group is-content-justification-center is-nowrap is-layout-flex wp-container-core-group-is-layout-d0242c86 wp-block-group-is-layout-flex">
<div class="wp-block-group order-1 is-nowrap is-layout-flex wp-container-core-group-is-layout-04f00732 wp-block-group-is-layout-flex"><div class="aligncenter is-style-default wp-block-site-logo"><a href="/" class="custom-logo-link" rel="home"><img width="48" height="48" src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png" class="custom-logo" alt="Logotipo da Clínica Dra. Alessandra Kerkhoff." decoding="async" srcset="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-512x512.png 512w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-300x300.png 300w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-270x270.png 270w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-192x192.png 192w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-180x180.png 180w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-150x150.png 150w, /wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-32x32.png 32w" sizes="(max-width: 48px) 100vw, 48px" /></a></div></div>

<nav class="is-responsive items-justified-right wp-block-navigation is-horizontal is-content-justification-right is-layout-flex wp-container-core-navigation-is-layout-500a3abb wp-block-navigation-is-layout-flex" aria-label="Menu" 
		 data-wp-interactive="core/navigation" data-wp-context='{"overlayOpenedBy":{"click":false,"hover":false,"focus":false},"type":"overlay","roleAttribute":"","ariaLabel":"Menu"}'><button aria-haspopup="dialog" aria-label="Abrir menu" class="wp-block-navigation__responsive-container-open" 
				data-wp-on--click="actions.openMenuOnClick"
				data-wp-on--keydown="actions.handleMenuKeydown"
			><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 5v1.5h14V5H5z"></path><path d="M5 12.8h14v-1.5H5v1.5z"></path><path d="M5 19h14v-1.5H5V19z"></path></svg></button>
				<div class="wp-block-navigation__responsive-container" id="modal-1" 
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
								<ul class="wp-block-navigation__container is-responsive items-justified-right wp-block-navigation"><li class="wp-block-navigation-item ${isHome ? 'current-menu-item' : ''} wp-block-navigation-link"><a class="wp-block-navigation-item__content" href="/" ${isHome ? 'aria-current="page"' : ''}><span class="wp-block-navigation-item__label">Home</span></a></li><li class="wp-block-navigation-item ${isFisio ? 'current-menu-item' : ''} wp-block-navigation-link"><a class="wp-block-navigation-item__content" href="/fisioterapia-cardiorrespiratoria" ${isFisio ? 'aria-current="page"' : ''}><span class="wp-block-navigation-item__label">Fisioterapia Cardiorrespiratória</span></a></li><li class="wp-block-navigation-item ${isApneia ? 'current-menu-item' : ''} wp-block-navigation-link"><a class="wp-block-navigation-item__content" href="/apneia-e-ronco" ${isApneia ? 'aria-current="page"' : ''}><span class="wp-block-navigation-item__label">Apneia e Ronco</span></a></li><li class="wp-block-navigation-item ${isSobre ? 'current-menu-item' : ''} wp-block-navigation-link"><a class="wp-block-navigation-item__content" href="/sobre" ${isSobre ? 'aria-current="page"' : ''}><span class="wp-block-navigation-item__label">Sobre</span></a></li><li class="wp-block-navigation-item ${isBlog ? 'current-menu-item' : ''} wp-block-navigation-link"><a class="wp-block-navigation-item__content" href="/blog" ${isBlog ? 'aria-current="page"' : ''}><span class="wp-block-navigation-item__label">Blog</span></a></li></ul>
							</div>
						</div>
					</div>
				</div></nav></div>
</header>
</div>
</header>
`) }} />
  );
}
