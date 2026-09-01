const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');
const componentsDir = path.join(appDir, 'components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const pageFiles = [
  'durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap/page.jsx',
  'melhore-seu-sono-beneficios-da-fisioterapia-respiratoria/page.jsx',
  'apneia-e-ronco/page.jsx',
  'como-a-caminhada-melhora-seu-sono-e-bem-estar/page.jsx',
  'cuide-do-seu-cpap-com-simplicidade-passos-faceis-para-noites-mais-tranquilas/page.jsx',
  'servicos/sobre/page.jsx',
  'servicos/page.jsx',
  'fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes/page.jsx',
  'blog/page.jsx',
  'page.jsx',
  'fisioterapia-cardiorrespiratoria/page.jsx'
];

let footerHtml = null;

// Regex to match the footer block. 
// It starts with <footer class="wp-block-template-part"> and ends with </footer></div>
// But we want to capture everything up to the final </footer>
const footerRegex = /<footer class="wp-block-template-part">[\s\S]*?<\/footer>\s*<\/footer>/;

for (const file of pageFiles) {
  const filePath = path.join(appDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const match = content.match(footerRegex);
  if (match) {
    if (!footerHtml) {
      footerHtml = match[0];
    }
    
    // Remove the footer HTML from the page
    content = content.replace(footerRegex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed footer from ${file}`);
  }
}

if (footerHtml) {
  const componentCode = `import { fixPaths } from "@/app/utils/fixPaths";

export default function Footer() {
  return (
    <div className="wp-site-blocks">
      <div dangerouslySetInnerHTML={{ __html: fixPaths(\`
${footerHtml}
\`) }} />
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(componentsDir, 'Footer.jsx'), componentCode, 'utf8');
  console.log('Created Footer.jsx');
} else {
  console.log('Could not find footer HTML in any files.');
}
