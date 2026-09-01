const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

const filesToProcess = [
  'page.jsx',
  'sobre/page.jsx',
  'servicos/page.jsx',
  'fisioterapia-cardiorrespiratoria/page.jsx',
  'apneia-e-ronco/page.jsx',
  'como-a-caminhada-melhora-seu-sono-e-bem-estar/page.jsx',
  'cuide-do-seu-cpap-com-simplicidade-passos-faceis-para-noites-mais-tranquilas/page.jsx',
  'durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap/page.jsx',
  'fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes/page.jsx',
  'melhore-seu-sono-beneficios-da-fisioterapia-respiratoria/page.jsx'
];

filesToProcess.forEach(file => {
  const filePath = path.join(appDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add import if not present
  if (!content.includes('import Header from "@/app/components/Header"')) {
    content = content.replace(
      'import { fixPaths } from "@/app/utils/fixPaths";',
      'import { fixPaths } from "@/app/utils/fixPaths";\nimport Header from "@/app/components/Header";'
    );
  }

  // 2. Extract current path for the Header component
  let currentPath = "/";
  if (file !== 'page.jsx') {
    currentPath = "/" + file.split('/')[0];
  }

  // 3. Find the header HTML and remove it.
  const headerStartRegex = /<header class="wp-block-template-part">[\s\S]*?<\/ul>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div><\/nav><\/div>\s*<\/header>\s*<\/div>\s*<\/header>/;
  
  if (headerStartRegex.test(content)) {
    content = content.replace(headerStartRegex, '');
    
    // Now insert <Header /> right before the <div> that wraps dangerouslySetInnerHTML
    // In these files, it's usually: <div dangerouslySetInnerHTML={{ __html: fixPaths(`
    content = content.replace(
      /<div dangerouslySetInnerHTML=\{\{ __html: fixPaths\(`/g,
      `<Header currentPath="${currentPath}" />\n      <div dangerouslySetInnerHTML={{ __html: fixPaths(\``
    );
    
    // Also, wrap the return in <> </> if not already. But wait, in Next.js page.jsx:
    // return ( <div dangerouslySetInnerHTML... /> )
    // If we add <Header />, we need to wrap it in a Fragment or div.
    content = content.replace(
      /return \(\s*<Header/g,
      'return (\n    <>\n      <Header'
    );
    
    // And add closing fragment before the end of the return
    content = content.replace(
      /(\n\s*)(\/>|\s*<\/div>)\s*\);\s*\}/g,
      (match, p1, p2) => {
        return p1 + p2 + p1 + "</>" + p1 + ");\n}";
      }
    );

    // Some files might have multiple dangerouslySetInnerHTML or already have fragments.
    // Let's do a smarter replace.
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
});
