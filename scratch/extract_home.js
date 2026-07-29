const fs = require('fs');

const rawHtml = fs.readFileSync('scratch/home_original.html', 'utf8');

const skipLinkIdx = rawHtml.indexOf('<a class="skip-link');
const endIdx = rawHtml.indexOf('</footer></div>', skipLinkIdx) + '</footer></div>'.length;

let bodyHtml = rawHtml.substring(skipLinkIdx, endIdx);

// Replace external domain draalessandrakerkhoff.com.br URLs with local paths
bodyHtml = bodyHtml.replace(/https?:\/\/draalessandrakerkhoff\.com\.br\//g, '/');

// Replace i0.wp.com CDN URLs for uploads with /wp-content/uploads/
bodyHtml = bodyHtml.replace(/https?:\/\/i0\.wp\.com\/draalessandrakerkhoff\.com\.br\/wp-content\/uploads\//g, '/wp-content/uploads/');

// Clean up query parameters on image files inside src and srcset if local .avif/.png/.jpg files exist
bodyHtml = bodyHtml.replace(/\/wp-content\/uploads\/([^"'\s]+?)(\.(?:avif|png|jpg|jpeg|webp|gif))\?[^"'\s\)]*/g, '/wp-content/uploads/$1$2');

// Convert string template literal backticks escaping if needed for JSX
const safeHtml = bodyHtml.replace(/`/g, '\\`').replace(/\${/g, '\\${');

const pageComponent = `import Script from "next/script";

export const metadata = {
  title: "Tratamento De Ronco E Apneia Do Sono | CPAP – Lajeado E Vale Do Taquari - Tem Ronco Ou Apneia Do Sono? A Dra. Alessandra Kerkhoff Realiza Acompanhamento E Titulação De CPAP Em Lajeado, Estrela, Arroio Do Meio E Região. Agende Sua Consulta!",
  description: "Sofre com ronco ou apneia? Precisa de reabilitação cardíaca? A Dra. Alessandra Kerkhoff é referência em fisioterapia cardiorrespiratória e do sono em Lajeado.",
};

export default function Page() {
  return (
    <>
      <Script id="body-class-app-page-jsx" strategy="beforeInteractive">{\`document.body.className = "home blog wp-custom-logo wp-embed-responsive wp-theme-site-export-1 jps-theme-site-export-1";\`}</Script>
      <div dangerouslySetInnerHTML={{ __html: \`
${safeHtml}
\` }} />
    </>
  );
}
`;

fs.writeFileSync('app/page.jsx', pageComponent, 'utf8');
console.log('Successfully updated app/page.jsx! File length:', pageComponent.length);
