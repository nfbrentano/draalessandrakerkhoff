"use client";

import { useState } from "react";
import { getAiConfig, generateSeoWithGemini } from "@/app/utils/aiSeo";
import { 
  Sparkles, 
  Tag, 
  Check, 
  Plus, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function AiTagSuggester({ 
  titulo, 
  conteudo, 
  tagsAtuais = [], 
  onAddTag, 
  onSetAllTags, 
  onSelectMetaDescription 
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async () => {
    if (!titulo && !conteudo) {
      setError("Escreva ao menos o título ou parte do conteúdo do artigo antes de pedir sugestões à IA.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const config = await getAiConfig();
      const apiKey = config.geminiApiKey;

      if (!apiKey) {
        setError("Chave da API Gemini não configurada. Configure em 'Configurações (IA)' no menu superior.");
        setLoading(false);
        return;
      }

      const res = await generateSeoWithGemini(apiKey, { titulo, conteudo });
      setResult(res);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao consultar a IA. Verifique sua chave de API.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSingleTag = (tag) => {
    if (!tagsAtuais.includes(tag)) {
      onAddTag(tag);
    }
  };

  const handleAddAllTags = () => {
    if (result?.tags) {
      const unique = Array.from(new Set([...tagsAtuais, ...result.tags]));
      onSetAllTags(unique);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Assistente de IA (SEO & Tags)
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Sugestões semânticas com Gemini</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
        >
          {loading ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{loading ? "Analisando..." : "Gerar com IA"}</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <p>{error}</p>
            {error.includes("Chave") && (
              <Link 
                href="/admin/configuracoes" 
                className="inline-flex items-center space-x-1 text-teal-800 hover:underline font-bold mt-1"
              >
                <span>Ir para configurações e cadastrar chave gratuita</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-4 pt-3 border-t border-slate-100">
          
          {/* Tags Suggestions */}
          {result.tags && result.tags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Tag className="w-3.5 h-3.5 text-teal-700" />
                  <span>Tags Sugeridas ({result.tags.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleAddAllTags}
                  className="text-[11px] text-teal-700 hover:text-teal-900 font-bold"
                >
                  + Adicionar Todas
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {result.tags.map((tag, idx) => {
                  const alreadyAdded = tagsAtuais.includes(tag);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSingleTag(tag)}
                      disabled={alreadyAdded}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                        alreadyAdded
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-default"
                          : "bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200"
                      }`}
                    >
                      <span>{tag}</span>
                      {alreadyAdded ? (
                        <Check className="w-3 h-3 text-teal-600" />
                      ) : (
                        <Plus className="w-3 h-3 text-teal-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Meta Descriptions Options */}
          {result.metaDescriptions && result.metaDescriptions.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center space-x-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Meta Descriptions Prontas:</span>
              </div>
              <div className="space-y-2">
                {result.metaDescriptions.map((desc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start justify-between space-x-2 group hover:border-teal-300 transition-colors"
                  >
                    <p className="flex-1 text-[11px] leading-relaxed font-normal">{desc}</p>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectMetaDescription(desc);
                        setCopiedIndex(idx);
                        setTimeout(() => setCopiedIndex(null), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-900 text-[10px] font-bold flex-shrink-0 transition-colors shadow-2xs"
                    >
                      {copiedIndex === idx ? "Aplicado!" : "Usar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Long Tail Keywords */}
          {result.palavrasChaveCaudaLonga && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-600 mb-1.5">
                Palavras-chave de Cauda Longa:
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                {result.palavrasChaveCaudaLonga.map((kw, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>{kw}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
