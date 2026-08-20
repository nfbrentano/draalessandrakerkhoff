import "./globals.css";
import "./styles/inline-styles.css";
import "./styles/style-0.css";
import "./styles/style-1.css";
import Script from "next/script";

const bodyClassByPath = {
  "/": "home blog wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/servicos": "wp-singular page-template-default page page-id-14 page-parent wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/servicos/sobre": "wp-singular page-template-default page page-id-15 page-child parent-pageid-14 wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/blog": "wp-singular page-template-default page page-id-232 wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/apneia-e-ronco": "wp-singular page-template-default page page-id-384 wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/fisioterapia-cardiorrespiratoria": "wp-singular page-template-default page page-id-390 wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/como-a-caminhada-melhora-seu-sono-e-bem-estar": "wp-singular post-template-default single single-post postid-320 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/melhore-seu-sono-beneficios-da-fisioterapia-respiratoria": "wp-singular post-template-default single single-post postid-154 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap": "wp-singular post-template-default single single-post postid-161 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes": "wp-singular post-template-default single single-post postid-341 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
};

const deferredMenuScript = `
  (function () {
    var bodyClassByPath = ${JSON.stringify(bodyClassByPath)};
    function setBodyClass() {
      var path = window.location.pathname.replace(/\\/$/, "") || "/";
      document.body.className = bodyClassByPath[path] || "wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1";
    }

    function getContainer() {
      return document.querySelector(".wp-block-navigation__responsive-container");
    }

    function getDialog() {
      return document.querySelector(".wp-block-navigation__responsive-dialog");
    }

    function closeMenu() {
      var container = getContainer();
      var dialog = getDialog();
      if (!container) return;
      container.classList.remove("has-modal-open", "is-menu-open");
      if (dialog) {
        dialog.setAttribute("aria-modal", "false");
        dialog.removeAttribute("role");
      }
      document.body.style.overflow = "";
      var openButton = document.querySelector(".wp-block-navigation__responsive-container-open");
      if (openButton) {
        openButton.focus();
      }
    }

    function openMenu(event) {
      event.preventDefault();
      var container = getContainer();
      var dialog = getDialog();
      if (!container) return;
      container.classList.add("has-modal-open", "is-menu-open");
      if (dialog) {
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("role", "dialog");
      }
      document.body.style.overflow = "hidden";
    }

    function handleDocumentClick(event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".wp-block-navigation__responsive-container-open")) {
        openMenu(event);
      }
      if (target.closest(".wp-block-navigation__responsive-container-close")) {
        event.preventDefault();
        closeMenu();
      }
    }

    function handleDocumentKeyDown(event) {
      if (event.key === "Escape") {
        var container = getContainer();
        if (container && container.classList.contains("is-menu-open")) {
          closeMenu();
        }
      }
    }

    function handleDocumentFocusOut(event) {
      var container = getContainer();
      if (container && !container.contains(event.relatedTarget) && container.classList.contains("is-menu-open")) {
        closeMenu();
      }
    }

    setBodyClass();
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusout", handleDocumentFocusOut);
    })();
`;

const registerSWScript = `
  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function(reg) {
        reg.onupdatefound = function() {
          var installing = reg.installing;
          if (installing) {
            installing.onstatechange = function() {
              if (installing.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('Nova versão instalada do service worker.');
                } else {
                  console.log('Conteúdo em cache para uso offline.');
                }
              }
            };
          }
        };
      })
      .catch(function(err) {
        console.error('Falha ao registrar service worker:', err);
      });
  }
`;

export const metadata = {
  metadataBase: new URL('https://draalessandrakerkhoff.com.br'),
  title: "Dra. Alessandra Kerkhoff",
  description: "Fisioterapeuta Cardiorrespiratória e do Sono",
  alternates: {
    canonical: './',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/poppins-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/poppins-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1">
        {children}
        <Script
          id="menu-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: deferredMenuScript }}
        />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: registerSWScript }}
        />
      </body>
    </html>
  );
}
