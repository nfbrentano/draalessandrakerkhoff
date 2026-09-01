"use client";

import { useMemo } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Award
} from "lucide-react";

export default function SeoAnalyzer({
  titulo = "",
  descricao = "",
  conteudo = "",
  slug = "",
  imagemDestaque = "",
  altImagem = "",
  tags = [],
  palavraChaveFoco = "",
}) {
  const analysis = useMemo(() => {
    const plainText = (conteudo || "").replace(/<[^>]*>?/gm, " ").trim();
    const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const kw = (palavraChaveFoco || "").toLowerCase().trim();

    const titleLength = (titulo || "").length;
    const descLength = (descricao || "").length;
    const hasH2orH3 = /<h[23][^>]*>/i.test(conteudo || "");

    const items = [
      {
        id: "title_length",
        label: "Comprimento do Título",
        detail: `${titleLength} caracteres (Ideal: 50 a 60)`,
        status: titleLength >= 40 && titleLength <= 65 ? "good" : titleLength > 0 ? "warning" : "bad",
        points: titleLength >= 40 && titleLength <= 65 ? 15 : titleLength > 20 ? 8 : 0,
        maxPoints: 15
      },
      {
        id: "desc_length",
        label: "Meta Description",
        detail: `${descLength} caracteres (Ideal: 120 a 160)`,
        status: descLength >= 120 && descLength <= 165 ? "good" : descLength > 0 ? "warning" : "bad",
        points: descLength >= 120 && descLength <= 165 ? 15 : descLength > 50 ? 8 : 0,
        maxPoints: 15
      },
      {
        id: "word_count",
        label: "Tamanho do Conteúdo",
        detail: `${wordCount} palavras (Mínimo: 300)`,
        status: wordCount >= 300 ? "good" : wordCount >= 150 ? "warning" : "bad",
        points: wordCount >= 300 ? 15 : wordCount >= 150 ? 8 : 0,
        maxPoints: 15
      },
      {
        id: "subheadings",
        label: "Subtítulos (H2 / H3)",
        detail: hasH2orH3 ? "Títulos de seção presentes" : "Adicione subtítulos H2 e H3",
        status: hasH2orH3 ? "good" : "warning",
        points: hasH2orH3 ? 10 : 0,
        maxPoints: 10
      },
      {
        id: "image_alt",
        label: "Imagem & Alt Text",
        detail: imagemDestaque && altImagem ? "Imagem com texto alt SEO" : imagemDestaque ? "Preencha o Alt Text" : "Adicione imagem de destaque",
        status: imagemDestaque && altImagem ? "good" : imagemDestaque ? "warning" : "bad",
        points: imagemDestaque && altImagem ? 15 : imagemDestaque ? 8 : 0,
        maxPoints: 15
      },
      {
        id: "tags_count",
        label: "Tags e Palavras-chave",
        detail: `${tags.length} tags (Recomendado: 3 a 7)`,
        status: tags.length >= 3 ? "good" : tags.length > 0 ? "warning" : "bad",
        points: tags.length >= 3 ? 15 : tags.length > 0 ? 8 : 0,
        maxPoints: 15
      },
      {
        id: "slug_check",
        label: "URL Amigável (Slug)",
        detail: slug ? `/blog/${slug}` : "Gere ou digite o slug",
        status: slug && !/[^a-z0-9-]/.test(slug) ? "good" : slug ? "warning" : "bad",
        points: slug && !/[^a-z0-9-]/.test(slug) ? 15 : 0,
        maxPoints: 15
      }
    ];

    if (kw) {
      const inTitle = (titulo || "").toLowerCase().includes(kw);
      const inDesc = (descricao || "").toLowerCase().includes(kw);
      const inContent = plainText.toLowerCase().includes(kw);

      items.push({
        id: "kw_focus",
        label: `Palavra-Chave ("${kw}")`,
        detail: [
          inTitle ? "No Título ✓" : "Falta no Título",
          inDesc ? "Na Descrição ✓" : "Falta na Descrição",
          inContent ? "No Texto ✓" : "Falta no Texto"
        ].join(" • "),
        status: inTitle && inDesc && inContent ? "good" : (inTitle || inDesc || inContent) ? "warning" : "bad",
        points: (inTitle ? 5 : 0) + (inDesc ? 5 : 0) + (inContent ? 5 : 0),
        maxPoints: 15
      });
    }

    const totalEarned = items.reduce((acc, it) => acc + it.points, 0);
    const totalMax = items.reduce((acc, it) => acc + it.maxPoints, 0);
    const score = Math.round((totalEarned / totalMax) * 100);

    return { items, score };
  }, [titulo, descricao, conteudo, slug, imagemDestaque, altImagem, tags, palavraChaveFoco]);

  const { items, score } = analysis;

  const scoreColor = score >= 80 ? "text-emerald-700" : score >= 50 ? "text-amber-700" : "text-rose-700";
  const scoreBg = score >= 80 ? "bg-emerald-50 border-emerald-200" : score >= 50 ? "bg-amber-50 border-amber-200" : "bg-rose-50 border-rose-200";
  const scoreLabel = score >= 80 ? "Excelente" : score >= 50 ? "Bom (Pode Melhorar)" : "Necessita Atenção";

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
      
      {/* Score Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-teal-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Score SEO do Artigo
          </h3>
        </div>

        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${scoreBg}`}>
          <span className={`text-xl font-bold ${scoreColor}`}>{score}</span>
          <span className="text-xs text-slate-500 font-medium">/ 100</span>
        </div>
      </div>

      <div className="text-xs text-slate-600 flex items-center justify-between font-medium">
        <span>Classificação geral:</span>
        <span className={`font-bold ${scoreColor}`}>{scoreLabel}</span>
      </div>

      {/* Checklist */}
      <div className="space-y-2 pt-1">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5"
            >
              <div className="mt-0.5 flex-shrink-0">
                {item.status === "good" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : item.status === "warning" ? (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-700">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
