# Especificação Técnica e Funcional: Painel Administrativo do Blog

Documento descritivo para implementação do painel administrativo do blog da **Dra. Alessandra Kerkhoff**, integrando autenticação, gerenciamento de conteúdo, avaliação SEO em tempo real, sugestão de tags via IA e persistência no Google Firebase (Firestore).

---

## 1. Visão Geral & Arquitetura

O sistema consiste em uma interface administrativa integrada ao site Next.js, operando de forma desacoplada para suportar tanto o modo estático atual quanto a exibição dinâmica de novos artigos cadastrados no Firebase Firestore, sem custos com infraestrutura de armazenamento de imagens ou servidores dedicados.

### 1.1 Stack Tecnológica
- **Frontend / Framework**: Next.js 16 (App Router) + React 19 + Tailwind CSS.
- **Autenticação**: Firebase Authentication (Email/Senha).
- **Banco de Dados**: Cloud Firestore (NoSQL, plano gratuito Spark).
- **Imagens**: Suporte a URLs externas e links compartilhados do Google Drive (conversão automática para streaming direto).
- **Inteligência Artificial (SEO & Tags)**: Módulo integrável com Gemini API / OpenAI, configurável via painel de configurações administrativo.
- **Editor de Texto**: TipTap (ProseMirror) / Quill com suporte a títulos (H2, H3, H4), listas, links, formatação em negrito/itálico e blocos de destaque.

---

## 2. Configurações e Credenciais do Firebase

### 2.1 Configuração do Projeto
```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyB5qU5Jnku7Himus0mKYhv0NPq1SOz2lIY",
  authDomain: "draalessandrakerkhoff.firebaseapp.com",
  projectId: "draalessandrakerkhoff",
  storageBucket: "draalessandrakerkhoff.firebasestorage.app",
  messagingSenderId: "24867343377",
  appId: "1:24867343377:web:988af8706f6480c6c435b0",
  measurementId: "G-GZ2G0JYD7F"
};
```

### 2.2 Usuários Autorizados
O acesso ao painel administrativo será restrito por regra de segurança e verificação de e-mails autorizados:
1. `alekerkhoff@gmail.com`
2. `nfgbrentano@gmail.com`

---

## 3. Estrutura de Rotas e Páginas

```
app/
├── admin/
│   ├── layout.jsx                  # Layout isolado com AuthGuard e barra lateral
│   ├── page.jsx                    # Dashboard geral (Lista de artigos, estatísticas)
│   ├── login/
│   │   └── page.jsx                # Tela de Login com email e senha
│   ├── artigos/
│   │   ├── novo/
│   │   │   └── page.jsx            # Formulário de criação de artigo
│   │   └── [id]/
│   │       └── editar/
│   │           └── page.jsx        # Formulário de edição de artigo
│   ├── configuracoes/
│   │   └── page.jsx                # Configurações de API Keys de IA (Gemini/OpenAI) e preferências
│   └── components/
│       ├── AuthProvider.jsx        # Contexto de autenticação Firebase
│       ├── ArticleEditor.jsx       # Editor Rich Text WYSIWYG
│       ├── SeoAnalyzer.jsx         # Painel de auditoria SEO em tempo real (Score 0-100)
│       ├── AiTagSuggester.jsx      # Assistente de IA para geração de tags e meta descriptions
│       ├── GoogleDriveImageInput.jsx # Input com conversor de link do Google Drive
│       ├── GooglePreview.jsx       # Pré-visualização do resultado nos motores de busca
│       └── AdminNav.jsx            # Barra de navegação e menu superior
├── blog/
│   ├── page.jsx                    # Listagem dinâmica de artigos (legados + Firestore)
│   └── [slug]/
│       └── page.jsx                # Renderizador dinâmico de artigos cadastrados no Firestore
```

---

## 4. Modelagem de Dados no Cloud Firestore

### 4.1 Coleção: `artigos`
```json
{
  "id": "uuid_ou_autogen",
  "titulo": "Como a Fisioterapia Respiratória Ajuda a Controlar a Apneia do Sono",
  "slug": "como-a-fisioterapia-respiratoria-ajuda-a-controlar-a-apneia-do-sono",
  "descricao": "Descubra como a fisioterapia cardiorrespiratória e o ajuste correto do CPAP podem restaurar sua qualidade de vida e melhorar seu sono.",
  "conteudo": "<h2>O que é a Apneia do Sono?</h2><p>Texto do artigo...</p>",
  "imagemDestaque": "https://drive.google.com/uc?export=view&id=1AbCdEfGhIjKlMnOpQrStUvWxYz",
  "altImagem": "Dra. Alessandra avaliando paciente para tratamento de apneia",
  "categoria": "apneia-e-ronco",
  "tags": [
    "fisioterapia do sono",
    "apneia obstrutiva",
    "cpap lajeado",
    "ronco e sono",
    "fisioterapia respiratória"
  ],
  "status": "publicado", // "rascunho" | "agendado" | "publicado"
  "dataPublicacao": "2026-09-01T10:00:00.000Z", // Suporta agendamento futuro
  "dataCriacao": "2026-08-31T23:30:00.000Z",
  "dataAtualizacao": "2026-08-31T23:30:00.000Z",
  "autorEmail": "alekerkhoff@gmail.com",
  "autorNome": "Dra. Alessandra Kerkhoff",
  "seoScore": 92,
  "palavraChaveFoco": "fisioterapia para apneia do sono",
  "views": 0
}
```

### 4.2 Coleção: `configuracoes` (Documento: `geral`)
```json
{
  "geminiApiKey": "AIzaSy...",
  "openaiApiKey": "",
  "iaProviderAtivo": "gemini",
  "modeloIa": "gemini-1.5-flash",
  "ultimaAtualizacao": "2026-08-31T23:30:00.000Z"
}
```

---

## 5. Módulos e Funcionalidades Detalhadas

### 5.1 Autenticação e Segurança (Auth Guard)
- **Login Seguro**: Entrada via Firebase Auth com e-mail e senha.
- **Whitelist de Acesso**: Validação direta no client e nas Firestore Security Rules garantindo que somente os e-mails autorizados (`alekerkhoff@gmail.com` e `nfgbrentano@gmail.com`) possam ler e gravar no Firestore administrativo.
- **Redirecionamento Inteligente**: Bloqueio de rotas não autorizadas com retorno automático para `/admin/login`.

### 5.2 Gerenciamento de Imagens sem Custos (Google Drive)
Para evitar custos com Firebase Storage ou serviços de hospedagem pagos:
- Campo de imagem aceita URLs públicas da internet ou links compartilhados do **Google Drive**.
- **Conversor Automático de URL do Google Drive**:
  Transforma automaticamente formatos como:
  `https://drive.google.com/file/d/ID_DO_ARQUIVO/view?usp=sharing`
  para o formato direto de exibição:
  `https://lh3.googleusercontent.com/d/ID_DO_ARQUIVO` ou `https://drive.google.com/uc?export=view&id=ID_DO_ARQUIVO`.
- Pré-visualização instantânea da imagem no próprio editor.

### 5.3 Publicação Imediata e Agendamento Automático
- **Publicação Imediata**: O artigo fica disponível imediatamente na listagem do blog `/blog` e na sua URL canônica.
- **Agendamento de Postagem**: Possibilidade de definir data e hora futuras. O artigo fica com status `agendado` e passa a ser exibido para os leitores apenas a partir do momento em que `dataPublicacao <= new Date()`.

### 5.4 Módulo de Análise e Score SEO em Tempo Real
O painel lateral avalia o artigo com uma pontuação de **0 a 100 pontos** com base em critérios essenciais:
1. **Comprimento do Título**: Ideal entre 50 e 60 caracteres.
2. **Meta Description**: Ideal entre 120 e 160 caracteres contendo chamada para ação.
3. **Densidade da Palavra-Chave Foco**: Presença no Título (H1), no primeiro parágrafo, em ao menos um subtítulo (H2/H3) e na Meta Description.
4. **Legibilidade e Estrutura**: Mínimo de 300 palavras, presença de títulos de seção (H2/H3) e parágrafos curtos.
5. **Acessibilidade & Imagem**: Presença de imagem de destaque e texto alternativo (`alt`) descritivo.
6. **Quantidade de Tags**: Mínimo de 3 a 7 tags relevantes selecionadas.
7. **Preview do Google**: Exibição em tempo real de como o snippet aparecerá na Busca do Google (Desktop e Mobile).

### 5.5 Assistente de IA para Sugestão de Tags e Otimização SEO
O painel conta com integração com a **Gemini API** (ou OpenAI) com as seguintes capacidades:
- **Botão "Sugerir Tags & SEO com IA"**: Lê o título e conteúdo já digitados no editor.
- **Saídas Geradas pela IA**:
  - Lista de 5 a 10 tags principais otimizadas para busca local e semântica de saúde (Ex: *Fisioterapia Lajeado, Ronco, CPAP Vale do Taquari*).
  - Sugestões de palavras-chave de cauda longa (Long-tail keywords).
  - 3 opções de Meta Descriptions prontas para escolha com 1 clique.
- **Painel de Configurações de IA**: Interface em `/admin/configuracoes` para colar a chave de API (Gemini/OpenAI) a qualquer momento, sem necessidade de alterar código-fonte.

---

## 6. Regras de Segurança do Firebase (Firestore Rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return request.auth != null && (
        request.auth.token.email == 'alekerkhoff@gmail.com' ||
        request.auth.token.email == 'nfgbrentano@gmail.com'
      );
    }
    
    // Leitura pública dos artigos publicados; gravação apenas para administradores
    match /artigos/{artigoId} {
      allow read: if resource.data.status == 'publicado' || isAdmin();
      allow write: if isAdmin();
    }
    
    // Configurações do sistema: restritas aos administradores
    match /configuracoes/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

---

## 7. Passos de Execução da Implementação

1. **Instalação das Dependências**:
   - `firebase`
   - `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`
   - `lucide-react` (ícones para o painel admin)
2. **Inicialização do Firebase SDK**: Criação do módulo `app/lib/firebase.js`.
3. **Criação do Sistema de Autenticação**: Provedor `AuthProvider` e tela `/admin/login`.
4. **Criação do Painel de Configurações**: Tela `/admin/configuracoes` para salvar chave da API de IA no Firestore ou storage seguro.
5. **Construção do Editor e Analisador SEO**:
   - Editor TipTap com ferramentas de formatação.
   - Componente de verificação de tags por IA (`AiTagSuggester`).
   - Componente de pontuação SEO (`SeoAnalyzer`) e preview do Google.
   - Conversor de URLs do Google Drive.
6. **Desenvolvimento do Dashboard**: Tabela de artigos com ações de criar, editar, excluir, agendar e filtrar.
7. **Integração com a Rota Pública do Blog**: Atualização de `app/blog/page.jsx` e `app/blog/[slug]/page.jsx` para listar e exibir os novos artigos cadastrados no Firestore em harmonia com os artigos legados.
