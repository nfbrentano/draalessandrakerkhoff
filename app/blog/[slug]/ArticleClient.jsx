"use client";

import { useEffect, useState, use } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { formatGoogleDriveImageUrl } from "@/app/utils/googleDrive";

export default function ArticleClient({ params }) {
  let resolvedSlug = "";
  try {
    const resolvedParams = use(params);
    resolvedSlug = resolvedParams?.slug || "";
  } catch {
    resolvedSlug = "";
  }

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      let targetSlug = resolvedSlug;
      if (typeof window !== "undefined") {
        const pathSegments = window.location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1] || "";
        if (lastSegment && lastSegment !== "artigo") {
          targetSlug = lastSegment;
        }
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("slug")) {
          targetSlug = urlParams.get("slug");
        }
      }

      if (!targetSlug) {
        setLoading(false);
        setErrorMessage("Slug do artigo não informado.");
        return;
      }

      const cleanSlug = decodeURIComponent(targetSlug).trim().toLowerCase();

      try {
        let foundDoc = null;
        const q = query(
          collection(db, "artigos"),
          where("slug", "==", cleanSlug),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          foundDoc = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        } else {
          const allSnapshot = await getDocs(collection(db, "artigos"));
          const match = allSnapshot.docs.find((d) => {
            const data = d.data();
            return (
              d.id === cleanSlug ||
              (data.slug && data.slug.toLowerCase().trim() === cleanSlug) ||
              (data.slug && data.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanSlug.replace(/[^a-z0-9]/g, ""))
            );
          });
          if (match) {
            foundDoc = { id: match.id, ...match.data() };
          }
        }

        if (foundDoc) {
          if (foundDoc.status === "rascunho") {
            setErrorMessage("Este artigo está salvo como rascunho e ainda não foi liberado para o público.");
          } else {
            setArticle(foundDoc);
          }
        } else {
          setErrorMessage("Artigo não encontrado no banco de dados.");
        }
      } catch (err) {
        console.error("Erro ao buscar artigo no Firestore:", err);
        if (err.code === "permission-denied" || err.message?.includes("permissions")) {
          setErrorMessage("Permissão de leitura negada no Firebase. Publique as regras do Firestore no console do Firebase para liberar a visualização pública.");
        } else {
          setErrorMessage(err.message || "Erro ao carregar o artigo.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [resolvedSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(15,118,110,0.2)", borderTop: "3px solid #0f766e", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (errorMessage || !article) {
    return (
      <div className="wp-site-blocks" style={{ padding: "4rem 1.5rem", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto" }}>
          <AlertCircle style={{ width: "32px", height: "32px" }} />
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.75rem" }}>Artigo não encontrado</h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
          {errorMessage || "O artigo solicitado não existe ou ainda não foi publicado."}
        </p>
        <Link
          href="/blog"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "#0f766e", color: "#fff", fontWeight: "600", borderRadius: "12px", textDecoration: "none" }}
        >
          <ArrowLeft style={{ width: "16px", height: "16px" }} />
          <span>Voltar para o Blog</span>
        </Link>
      </div>
    );
  }

  const imageUrl = formatGoogleDriveImageUrl(article.imagemDestaque);
  const tagsFormatted = article.tags && article.tags.length > 0 
    ? article.tags.map(t => `#${t.trim().replace(/\s+/g, "")}`).join(" ")
    : "";

  return (
    <div className="wp-site-blocks">
      {/* Header oficial do site */}
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

      {/* Main Post Section (Exatamente no mesmo formato do post anterior) */}
      <main id="wp--skip-link--target" className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
        <div style={{ height: "var(--wp--preset--spacing--20)" }} aria-hidden="true" className="wp-block-spacer" />

        {/* Título do Post */}
        <div className="wp-block-group has-global-padding is-layout-constrained wp-container-core-group-is-layout-3437eebd wp-block-group-is-layout-constrained">
          <h2 className="has-text-align-center wp-block-post-title has-large-font-size" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            {article.titulo}
          </h2>
        </div>

        {/* Conteúdo do Post */}
        <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">
          
          {/* Imagem de Destaque */}
          {imageUrl && (
            <figure className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-2 is-layout-flex wp-block-gallery-is-layout-flex" style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
              <figure className="wp-block-image size-large" style={{ margin: "0 auto", maxWidth: "620px", width: "100%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={article.altImagem || article.titulo}
                  className="wp-image-281 not-transparent"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
                  onError={(e) => {
                    e.currentTarget.src = "/wp-content/uploads/2025/09/Cuide-CPAP-1-819x1024.avif";
                  }}
                />
              </figure>
            </figure>
          )}

          {/* Meta Description / Resumo Inicial se houver */}
          {article.descricao && (
            <p className="wp-block-paragraph" style={{ fontWeight: "500", fontSize: "1.05rem", color: "#334155", lineHeight: "1.8" }}>
              {article.descricao}
            </p>
          )}

          {/* Corpo do Conteúdo */}
          <div
            className="article-dynamic-html"
            dangerouslySetInnerHTML={{ __html: article.conteudo || "<p></p>" }}
          />

          {/* Botão de WhatsApp Oficial */}
          <div className="wp-block-jetpack-send-a-message" style={{ margin: "2.5rem 0" }}>
            <div className="wp-block-jetpack-whatsapp-button is-color-dark">
              <a
                className="whatsapp-block__button"
                href="https://api.whatsapp.com/send?phone=5551996145583&text=Oi%2C%20encontrei%20suas%20informa%C3%A7%C3%B5es%20do%20WhatsApp%20no%20seu%20site."
                style={{ backgroundColor: "#25D366", color: "#fff" }}
                target="_self"
                rel="noopener noreferrer"
              >
                Conversar no WhatsApp
              </a>
            </div>
          </div>

          {/* Tags em Formato Hashtag (#) */}
          {tagsFormatted && (
            <p className="wp-block-paragraph" style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "1.5rem" }}>
              {tagsFormatted}
            </p>
          )}

        </div>

        <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" />
      </main>
    </div>
  );
}
