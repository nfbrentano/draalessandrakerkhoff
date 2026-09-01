"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { formatGoogleDriveImageUrl } from "@/app/utils/googleDrive";
import Link from "next/link";

const baseArticles = [
  {
    id: "base-1",
    titulo: "Fisioterapia Respiratória: Melhora na Qualidade de Vida de Pacientes",
    slug: "fisioterapia-respiratoria-melhora-na-qualidade-de-vida-de-pacientes",
    categoria: "fisioterapia-respiratoria",
    descricao: "Entenda como o recondicionamento físico e exercícios pulmonares reduzem a falta de ar, aumentam a disposição e promovem a reabilitação funcional.",
    imagemDestaque: "/wp-content/uploads/2025/11/Post-fisio-respiratoria.avif",
    dataPublicacao: "2025-11-15T10:00:00Z",
    isBase: true,
  },
  {
    id: "base-2",
    titulo: "Como a Caminhada Melhora Seu Sono e Bem-Estar",
    slug: "como-a-caminhada-melhora-seu-sono-e-bem-estar",
    categoria: "bem-estar",
    descricao: "Caminhar regularmente auxilia na regulação do ciclo circadiano, reduz os níveis de cortisol e prepara o organismo para um repouso profundo.",
    imagemDestaque: "/wp-content/uploads/2025/11/caminhada-819x1024.avif",
    dataPublicacao: "2025-11-01T10:00:00Z",
    isBase: true,
  },
  {
    id: "base-3",
    titulo: "Cuide do Seu CPAP com Simplicidade: Passos Fáceis para Noites Mais Tranquilas",
    slug: "cuide-do-seu-cpap-com-simplicidade-passos-faceis-para-noites-mais-tranquilas",
    categoria: "cpap-e-tratamentos",
    descricao: "Confira orientações fundamentais para manter a higienização do seu CPAP em dia, evitar vazamentos na máscara e garantir um sono verdadeiramente reparador e sem complicações.",
    imagemDestaque: "/wp-content/uploads/2025/09/cuide-cpap.avif",
    dataPublicacao: "2025-09-20T10:00:00Z",
    isBase: true,
  },
  {
    id: "base-4",
    titulo: "Durma Bem, Viva Melhor: Transforme Sua Noite com o CPAP",
    slug: "durma-bem-viva-melhor-transforme-sua-noite-com-o-cpap",
    categoria: "cpap-e-tratamentos",
    descricao: "Descubra como a pressão positiva contínua restaura a arquitetura natural do seu sono, protege o coração e elimina os despertares noturnos.",
    imagemDestaque: "/wp-content/uploads/2025/09/drmir-bem.avif",
    dataPublicacao: "2025-09-10T10:00:00Z",
    isBase: true,
  },
  {
    id: "base-5",
    titulo: "Melhore Seu Sono: Fisioterapia e Apneia do Sono",
    slug: "melhore-seu-sono-beneficios-da-fisioterapia-respiratoria",
    categoria: "fisioterapia-do-sono",
    descricao: "Saiba como a consulta com fisioterapeuta especialista pode diagnosticar alterações respiratórias no sono e otimizar a adaptação com equipamentos.",
    imagemDestaque: "/wp-content/uploads/2025/08/1-1.avif",
    dataPublicacao: "2025-08-25T10:00:00Z",
    isBase: true,
  }
];

function mergeAndSortArticles(firestoreDocs = []) {
  const cleanFirestore = (firestoreDocs || [])
    .filter((item) => item.status !== "rascunho")
    .map((item) => ({
      id: item.id,
      titulo: item.titulo,
      slug: item.slug,
      categoria: item.categoria || "fisioterapia-do-sono",
      descricao: item.descricao || "",
      imagemDestaque: item.imagemDestaque,
      altImagem: item.altImagem,
      dataPublicacao: item.dataPublicacao || item.dataCriacao || new Date().toISOString(),
      isFirestore: true,
    }));

  const all = [...cleanFirestore, ...baseArticles];
  
  // Ordena estritamente por data de publicação decrescente (mais recentes primeiro)
  return all.sort((a, b) => {
    const dateA = new Date(a.dataPublicacao || 0);
    const dateB = new Date(b.dataPublicacao || 0);
    return dateB - dateA;
  });
}

export default function BlogArticleList({ initialFirestoreArticles = [] }) {
  const [articles, setArticles] = useState(() => mergeAndSortArticles(initialFirestoreArticles));

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const q = query(collection(db, "artigos"));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setArticles(mergeAndSortArticles(docs));
        },
        (err) => {
          console.warn("Blog realtime sync notice:", err);
        }
      );
    } catch (err) {
      console.warn("Blog listener notice:", err);
    }

    return () => unsubscribe();
  }, []);

  return (
    <div className="blog-grid" style={{ marginBottom: "3.5rem" }}>
      {articles.map((article) => {
        const rawImg = article.imagemDestaque || "/wp-content/uploads/2025/09/cuide-cpap.avif";
        const img = formatGoogleDriveImageUrl(rawImg) || rawImg;
        
        // Link para artigo base do site ou rota dinâmica do blog
        const linkHref = article.isBase ? `/${article.slug}` : `/blog/${article.slug || "artigo"}`;

        const catName = (article.categoria || "fisioterapia-do-sono").replace(/-/g, " ");

        return (
          <article key={article.id} className="blog-grid-card">
            <div className="blog-grid-img-wrap">
              <Link href={linkHref}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="blog-grid-img"
                  src={img}
                  alt={article.altImagem || article.titulo}
                  loading="lazy"
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
                <Link className="blog-post-title" href={linkHref}>
                  {article.titulo}
                </Link>
              </h3>

              {article.descricao && (
                <p className="blog-post-excerpt">
                  {article.descricao}
                </p>
              )}

              <div className="blog-post-meta">
                <span>⏱️ 4 min de leitura</span>
                <Link className="blog-read-btn" href={linkHref}>
                  Continuar lendo ➔
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
