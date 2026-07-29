# Plano de Ação — Corrigir Diferenças entre Clone Local e WordPress

Após comparar o HTML original do WordPress com o que está renderizando no clone local (`localhost:3000`), identifiquei **5 problemas críticos** que precisam ser corrigidos para o site ficar idêntico.

---

## 🔴 Problema 1: Estilos Inline do `<head>` Ausentes (CRÍTICO)

O site WordPress possui **24 blocos de `<style>` inline** no `<head>` totalizando **~65KB de CSS** que **não estão sendo carregados** no clone local. Esses estilos incluem:

- **Global Styles** (`global-styles-inline-css`): Todas as CSS variables do tema (`--wp--preset--color--theme-1` até `theme-5`, espaçamentos, tamanhos de fonte, famílias tipográficas)
- **Estilos de layout**: `.is-layout-flow`, `.is-layout-constrained`, `.is-layout-flex`, `.is-layout-grid`, `.wp-site-blocks`, `.has-global-padding`
- **Estilos de bloco**: Navigation, Buttons, Columns, Image, Group, Heading, Paragraph, Spacer, Social Links, Site Logo, Site Title
- **Jetpack Boost Critical CSS**: CSS otimizado para carregamento rápido
- **Estilos de seções**: Section variations (`.is-style-section-1--1`, `.is-style-section-2--2`, etc.) com cores e estilos específicos

> [!CAUTION]
> Sem esses estilos, o site aparece como texto puro sem formatação — é a principal causa de o clone não se parecer com o original.

### Correção
Copiar o arquivo `inline-styles.css` (já extraído, 65KB) para `app/styles/` e importá-lo no `layout.js`.

---

## 🔴 Problema 2: Fontes Web Ausentes (CRÍTICO)

O WordPress carrega 3 famílias de fontes via **19 declarações `@font-face`** usando URLs do `fonts.wp.com`:
- **Manrope** (usada em headings h1–h6)
- **Poppins** (usada no body e botões)
- **AR One Sans** (usada em elementos do site)

Essas fontes estão declaradas dentro dos estilos inline e referenciam URLs externas como:
```
https://fonts.wp.com/s/manrope/v15/...
https://fonts.wp.com/s/poppins/v21/...
```

### Correção
As referências `@font-face` já estão dentro do `inline-styles.css`, então ao incluir esse arquivo, as fontes serão carregadas das URLs do `fonts.wp.com`. Alternativamente, podemos baixar os arquivos `.woff2` localmente para total independência.

---

## 🟡 Problema 3: Imagem do Logo Principal Ausente

A imagem do logo `cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png` (versão 512px, sem sufixo de resolução) **não foi baixada**. Existem versões redimensionadas (150x150, 300x300, 512x512), mas a imagem referenciada no HTML é sem sufixo.

### Correção
Baixar a imagem em tamanho original ou criar um symlink/cópia da versão 512x512.

---

## 🟡 Problema 4: Reescrita de URLs de Imagem Incompleta

Algumas imagens do CDN `i0.wp.com` possuem query parameters (`?fit=512%2C512&ssl=1`, `?w=512&ssl=1`, `?resize=...`) que não foram reescritos corretamente para caminhos locais pelo script de geração. O HTML gerado ainda pode conter referências ao CDN.

### Correção
Atualizar o script de geração para lidar melhor com URLs do `i0.wp.com` que incluem query parameters, mapeando-as para as versões locais equivalentes já baixadas.

---

## 🟡 Problema 5: Menu Responsivo (Hambúrguer) Não Funciona

O WordPress usa JavaScript (no final do `<body>`) para controlar o menu responsivo (abrir/fechar o menu hambúrguer em telas pequenas). O clone estático **não inclui esses scripts**, então:
- O botão de menu hambúrguer não funciona em dispositivos móveis
- O menu responsivo não abre/fecha

### Correção
Extrair os scripts de interatividade do menu responsivo do HTML original e incluí-los como script estático no projeto.

---

## Resumo das Ações

| # | Ação | Impacto | Complexidade |
|---|------|---------|-------------|
| 1 | Incluir `inline-styles.css` no layout | 🔴 Crítico | Baixa |
| 2 | Garantir fontes web carregando | 🔴 Crítico | Baixa (já incluso no #1) |
| 3 | Baixar logo 512px faltante | 🟡 Médio | Baixa |
| 4 | Corrigir reescrita de URLs do CDN | 🟡 Médio | Média |
| 5 | Adicionar JS do menu responsivo | 🟡 Médio | Média |

## Verificação

Após aplicar todas as correções:
1. `npm run build` para confirmar que compila
2. `npm run dev` para testar localmente
3. Comparar visualmente homepage, páginas internas e posts com o WordPress original
