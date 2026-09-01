import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Header from "@/app/components/Header";
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
      <Header currentPath="/blog" />

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
