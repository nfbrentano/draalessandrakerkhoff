"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Header from "@/app/components/Header";

export default function NotFound() {
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    
    // Check if it's a blog post that got a 404
    if (path.startsWith("/blog/") && path !== "/blog/") {
      const slug = path.split("/").filter(Boolean).pop();
      // Redirect to the blog article handler, passing the slug
      // We use ?slug=... and a flag &ghpages=true so the ArticleClient knows to restore the URL
      window.location.replace(`/blog/artigo/?slug=${slug}&ghpages=true`);
    } else {
      setIsRedirecting(false);
    }
  }, []);

  if (isRedirecting) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(15,118,110,0.2)", borderTop: "3px solid #0f766e", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div className="wp-site-blocks">
      <Header />
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto" }}>
          <AlertCircle style={{ width: "32px", height: "32px" }} />
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.75rem" }}>Página não encontrada</h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
          A página que você está tentando acessar não existe ou foi movida.
        </p>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "#0f766e", color: "#fff", fontWeight: "600", borderRadius: "12px", textDecoration: "none" }}
        >
          <ArrowLeft style={{ width: "16px", height: "16px" }} />
          <span>Voltar para o Início</span>
        </Link>
      </div>
    </div>
  );
}
