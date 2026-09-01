const SeoAnalyzer = require('seo-analyzer');

new SeoAnalyzer()
  // Varre a pasta onde o Next.js salva os arquivos HTML estáticos
  .inputFolders(['.next/server/app']) 
  .addRule('titleLengthRule')
  .addRule('metaBaseRule')
  .addRule('metaSocialRule')
  .addRule('imgTagWithAltAttributeRule')
  .addRule('aTagWithRelAttributeRule')
  .addRule('canonicalLinkRule')
  .outputConsole()
  .run();
