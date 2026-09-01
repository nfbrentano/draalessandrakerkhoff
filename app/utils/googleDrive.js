/**
 * Converte links compartilhados do Google Drive para URLs diretas de exibição de imagem.
 * Se já for uma URL direta ou de outro host, retorna a URL original.
 */
export function formatGoogleDriveImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Se já for uma imagem local ou padrão
  if (trimmed.startsWith('/') || !trimmed.startsWith('http')) {
    return trimmed;
  }

  // Regex para capturar ID do Google Drive em vários formatos comuns
  const patterns = [
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/uc\?(?:export=view&)?id=([a-zA-Z0-9_-]+)/,
    /docs\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      const fileId = match[1];
      // lh3.googleusercontent.com/d/ID é a forma mais rápida e confiável para carregar imagens públicas do Drive
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  return trimmed;
}
