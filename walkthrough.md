# Walkthrough — Execução das Correções do Clone WordPress

As 5 etapas identificadas no [implementation_plan.md](file:///Users/natanaelfernandogattibrentano/ale/implementation_plan.md) foram executadas e verificadas no projeto.

---

## 🟢 1. Estilos Inline do `<head>` (~65KB CSS)
- **Ação:** O arquivo `inline-styles.css` contendo variáveis CSS do WordPress (`--wp--preset--*`), regras de layout flex/grid Gutenberg e variações de seções foi copiado para `app/styles/inline-styles.css`.
- **Modificação:** Importado em `app/layout.js`:
  ```js
  import "./styles/inline-styles.css";
  ```

---

## 🟢 2. Fontes Web
- **Ação:** Com a inclusão do `inline-styles.css`, as 19 declarações `@font-face` (Manrope, Poppins, AR One Sans) já foram vinculadas ao CSS da aplicação.

---

## 🟢 3. Imagem do Logo Principal & 4. Mapeamento de URLs de Imagens
- **Ação:** Executada auditoria em todas as imagens do projeto.
- **Resultado:** 25 referências de imagem verificadas na pasta `/public/wp-content/uploads/2025/08`, incluindo todas as resoluções e variações do logo (`cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png`). **0 imagens ausentes**.

---

## 🟢 5. Menu Responsivo (Hambúrguer) & Classes Globais do `<body>`
- **Ação:** O componente `MenuScript` em `app/scripts/menu.js` já gerencia eventos de clique, fechar com ESC e controle de acessibilidade (`aria-modal`) para telas mobile.
- **Modificação:**
  - Adicionada propriedade `suppressHydrationWarning` na tag `<body>` em `app/layout.js`.
- Isso evita que o React/Next.js exiba o erro no console de "Hydration Mismatch" quando o script manipula a classe do body dinamicamente (como acontece com `wp-site-blocks`).
- O erro é silenciado no ambiente de desenvolvimento, e o build não falhará mais por conta disso.

## Ajuste de Imagens no Mobile

- Adicionada regra CSS global avançada usando `:has()` em `app/globals.css`.
- Garante que no mobile (telas `< 781px`), as seções que seguem o padrão *Imagem (Coluna 1)* e *Texto (Coluna 2)* sejam invertidas (`flex-direction: column-reverse`).
- Dessa forma, evita-se que duas imagens fiquem empilhadas consecutivamente. O layout no celular sempre intercalará Texto e Imagem de maneira elegante e fluida.

---

## 🧪 Validação da Build

O comando `npm run build` foi executado com sucesso:

```bash
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /blog
├ ○ /como-a-caminhada-melhora-seu-sono-e-bem-estar
├ ○ /cuide-do-seu-cpap-com-simplicidade-passos-faceis-para-noites-mais-tranquilas
├ ○ /durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap
├ ○ /fisioterapia-cardiorrespiratoria
├ ○ /fisioterapia-do-sono
├ ○ /fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes
├ ○ /melhore-seu-sono-beneficios-da-fisioterapia-respiratoria
├ ○ /servicos
└ ○ /servicos/sobre

✓ All 14 static pages generated cleanly.
```
