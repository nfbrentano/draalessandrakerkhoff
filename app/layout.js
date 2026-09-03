import "./globals.css";
import "./styles/inline-styles.css";
import "./styles/style-0.css";
import "./styles/style-1.css";
import localFont from 'next/font/local';
import Footer from "./components/Footer";

const poppins = localFont({
  src: [
    { path: '../public/fonts/poppins-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/poppins-600.woff2', weight: '600', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-poppins'
});

const manrope = localFont({
  src: [
    { path: '../public/fonts/manrope-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/manrope-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/manrope-700.woff2', weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-manrope'
});

const bodyClassByPath = {
  "/": "home blog wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/servicos": "wp-singular page-template-default page page-id-14 page-parent wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
  "/sobre": "wp-singular page-template-default page page-id-15 page-child parent-pageid-14 wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1",
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
  if ('serviceWorker' in navigator && window.location.protocol !== 'file:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
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
    languages: {
      'pt-BR': 'https://draalessandrakerkhoff.com.br',
    },
  },
  openGraph: {
    title: "Dra. Alessandra Kerkhoff",
    description: "Fisioterapeuta Cardiorrespiratória e do Sono",
    url: "https://draalessandrakerkhoff.com.br",
    siteName: "Dra. Alessandra Kerkhoff",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Alessandra Kerkhoff",
    description: "Fisioterapeuta Cardiorrespiratória e do Sono",
  },
  verification: {
    other: {
      "msvalidate.01": "9AF6A4F501D2F9B5C0C03FF820F56BED"
    }
  },
  icons: {
    icon: [
      { url: '/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1-32x32.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const clarityScript = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yb9xqjmku3");
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${manrope.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GZ2G0JYD7F"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GZ2G0JYD7F');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: clarityScript }}
        />
      </head>
      <body suppressHydrationWarning className="wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1">
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: deferredMenuScript }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: registerSWScript }}
        />
      </body>
    </html>
  );
}
