"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { formatGoogleDriveImageUrl } from "@/app/utils/googleDrive";
import Link from "next/link";

export default function DynamicFirestoreArticles({ initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);

  useEffect(() => {
    let unsubscribe = () => {};

    async function fetchOnce() {
      try {
        const snap = await getDocs(collection(db, "artigos"));
        const docs = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((item) => item.status !== "rascunho")
          .sort((a, b) => {
            const dateA = new Date(a.dataPublicacao || a.dataCriacao || 0);
            const dateB = new Date(b.dataPublicacao || b.dataCriacao || 0);
            return dateB - dateA;
          });
        if (docs.length > 0) {
          setArticles(docs);
        }
      } catch (e) {
        console.warn("getDocs fallback warning:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchOnce();

    try {
      const q = query(collection(db, "artigos"));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((item) => item.status !== "rascunho")
            .sort((a, b) => {
              const dateA = new Date(a.dataPublicacao || a.dataCriacao || 0);
              const dateB = new Date(b.dataPublicacao || b.dataCriacao || 0);
              return dateB - dateA;
            });

          setArticles(docs);
          setLoading(false);
        },
        (err) => {
          console.warn("onSnapshot notice:", err);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn("Listener init notice:", err);
    }

    return () => unsubscribe();
  }, []);

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="dynamic-articles-container" style={{ width: "100%", marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <span className="blog-badge badge-cpap" style={{ fontSize: "0.85rem", padding: "0.4rem 0.9rem" }}>
          ✨ Novos Artigos Publicados
        </span>
      </div>

      <div className="blog-grid" style={{ marginBottom: "1.5rem" }}>
        {articles.map((article) => {
          const img = formatGoogleDriveImageUrl(article.imagemDestaque) || "/wp-content/uploads/2025/09/cuide-cpap.avif";
          const linkHref = `/blog/${article.slug || "artigo"}`;

          const catName = article.categoria
            ? article.categoria.replace(/-/g, " ")
            : "Fisioterapia do Sono";

          return (
            <article key={article.id} className="blog-grid-card">
              <div className="blog-grid-img-wrap">
                <Link href={linkHref}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="blog-grid-img"
                    src={img}
                    alt={article.altImagem || article.titulo}
                    onError={(e) => {
                      e.currentTarget.src = "/wp-content/uploads/2025/09/cuide-cpap.avif";
                    }}
                  />
                </Link>
              </div>
              <div className="blog-grid-content">
                <span className="blog-badge badge-fisio" style={{ textTransform: "capitalize" }}>
                  {catName}
                </span>
                <h3 style={{ margin: "0 0 0.75rem 0" }}>
                  <Link
                    className="blog-post-title"
                    style={{ fontSize: "1.3rem" }}
                    href={linkHref}
                  >
                    {article.titulo}
                  </Link>
                </h3>
                {article.descricao && (
                  <p className="blog-post-excerpt">
                    {article.descricao}
                  </p>
                )}
                <div className="blog-post-meta">
                  <span>⏱️ 3 min de leitura</span>
                  <Link className="blog-read-btn" href={linkHref}>
                    Continuar lendo ➔
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
