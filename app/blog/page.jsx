import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import BlogArticleList from "./BlogArticleList";

export const metadata = {
  title: "Blog | Dicas sobre Ronco, Apneia e Fisioterapia no Vale do Taquari",
  description: "Acompanhe nosso blog e saiba tudo sobre tratamentos para ronco, apneia do sono e dicas de fisioterapia cardiorrespiratória em Lajeado e Vale do Taquari.",
  keywords: [
    "blog fisioterapia do sono",
    "dicas apneia e ronco lajeado",
    "tratamento de ronco",
    "cpap vale do taquari",
    "fisioterapia cardiorrespiratória"
  ],
  openGraph: {
    title: "Blog da Dra. Alessandra Kerkhoff | Fisioterapia e Bem-Estar",
    description: "Dicas e novidades sobre tratamento de ronco, apneia e qualidade do sono no Vale do Taquari.",
    url: "https://draalessandrakerkhoff.com.br/blog",
    siteName: "Dra. Alessandra Kerkhoff",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function Page() {
  let serverArticles = [];
  try {
    const snap = await getDocs(collection(db, "artigos"));
    serverArticles = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("Could not fetch server articles in blog page:", err);
  }

  return (
    <div className="wp-site-blocks">
      {/* Header do Site */}
      <header className="wp-block-template-part">
        <div className="wp-block-group alignfull is-style-undefined has-theme-11-color has-theme-10-background-color has-text-color has-background has-global-padding is-layout-constrained" id="header-section" style={{ marginTop: 0, marginBottom: 0, paddingTop: "var(--wp--preset--spacing--20)", paddingBottom: "var(--wp--preset--spacing--20)" }}>
          <header className="wp-block-group alignwide is-content-justification-center is-nowrap is-layout-flex" style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="wp-block-group is-content-justification-center is-nowrap is-layout-flex">
              <div className="wp-block-group order-1 is-nowrap is-layout-flex">
                <div className="aligncenter is-style-default wp-block-site-logo">
                  <a href="/" className="custom-logo-link" rel="home">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width="48" height="48" src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png" className="custom-logo" alt="Logotipo da Clínica Dra. Alessandra Kerkhoff." />
                  </a>
                </div>
              </div>
              <nav className="is-responsive items-justified-right wp-block-navigation is-horizontal is-content-justification-right is-layout-flex" aria-label="Menu">
                <ul className="wp-block-navigation__container is-responsive items-justified-right wp-block-navigation">
                  <li className="wp-block-navigation-item wp-block-navigation-link"><a className="wp-block-navigation-item__content" href="/"><span className="wp-block-navigation-item__label">Home</span></a></li>
                  <li className="wp-block-navigation-item wp-block-navigation-link"><a className="wp-block-navigation-item__content" href="/fisioterapia-cardiorrespiratoria"><span className="wp-block-navigation-item__label">Fisioterapia Cardiorrespiratória</span></a></li>
                  <li className="wp-block-navigation-item wp-block-navigation-link"><a className="wp-block-navigation-item__content" href="/apneia-e-ronco"><span className="wp-block-navigation-item__label">Apneia e Ronco</span></a></li>
                  <li className="wp-block-navigation-item wp-block-navigation-link"><a className="wp-block-navigation-item__content" href="/sobre"><span className="wp-block-navigation-item__label">Sobre</span></a></li>
                  <li className="wp-block-navigation-item current-menu-item wp-block-navigation-link"><a className="wp-block-navigation-item__content" href="/blog" aria-current="page"><span className="wp-block-navigation-item__label">Blog</span></a></li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </header>

      {/* Main Content */}
      <main id="wp--skip-link--target" className="wp-block-group is-layout-flow" style={{ marginTop: 0 }}>
        <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained" style={{ width: "100%", maxWidth: "100%", margin: "0 auto", paddingTop: "2rem", paddingBottom: "3rem" }}>
          
          {/* Hero Header */}
          <section className="blog-hero">
            <span className="blog-hero-badge">Artigos & Orientações</span>
            <h1 className="blog-hero-title">Blog de Fisioterapia & Saúde do Sono</h1>
            <p className="blog-hero-desc">Conteúdos práticos e científicos sobre Fisioterapia Cardiorrespiratória, Higiene do Sono e Adaptação ao CPAP para transformar a sua qualidade de vida.</p>
          </section>

          {/* Grid Unificado de Artigos: Mais Recentes Primeiro + Todos com o Mesmo Tamanho */}
          <BlogArticleList initialFirestoreArticles={serverArticles} />

          {/* Contact CTA Section */}
          <section className="blog-cta-box" style={{ marginTop: "3rem" }}>
            <h2 className="blog-cta-title">Precisa de ajuda com apneia do sono, ronco ou CPAP em Lajeado?</h2>
            <p className="blog-cta-desc">Agende uma consulta ou tire suas dúvidas diretamente sobre titulação de CPAP e tratamento personalizado para a sua saúde.</p>
            <a className="blog-cta-button" href="https://wa.me/5551996145583" target="_blank" rel="noopener noreferrer">
              💬 Conversar pelo WhatsApp
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}
