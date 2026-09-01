"use client";

import { useState, useEffect } from "react";
import { getAiConfig, saveAiConfig } from "@/app/utils/aiSeo";
import { Key, Sparkles, CheckCircle2, AlertCircle, Save, HelpCircle, ExternalLink } from "lucide-react";

export default function ConfiguracoesPage() {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [provider, setProvider] = useState("gemini");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const config = await getAiConfig();
        if (config) {
          setGeminiApiKey(config.geminiApiKey || "");
          setOpenaiApiKey(config.openaiApiKey || "");
          setProvider(config.provider || "gemini");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      await saveAiConfig({
        geminiApiKey: geminiApiKey.trim(),
        openaiApiKey: openaiApiKey.trim(),
        provider
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar as configurações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-teal-600/30 border-t-teal-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1b365d] tracking-tight flex items-center space-x-3">
          <Key className="w-7 h-7 text-teal-700" />
          <span>Configurações de Inteligência Artificial</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Cadastre suas chaves de API para permitir que a IA gere tags SEO e meta descriptions automaticamente no editor.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>Configurações salvas com sucesso! A IA está pronta para uso no editor de artigos.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Gemini Settings Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800">Google Gemini API (Recomendado)</h2>
                <p className="text-xs text-slate-500">Modelo: Gemini 1.5 Flash (Gratuito, rápido e contextualizado em saúde)</p>
              </div>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-teal-800 font-semibold bg-teal-50 hover:bg-teal-100 px-3.5 py-2 rounded-xl border border-teal-200 transition-colors self-start sm:self-auto"
            >
              <span>Obter chave gratuita</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Cole sua chave aqui (ex: AIzaSy...)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm font-mono transition-all"
              />
              <p className="text-xs text-slate-500 mt-2 flex items-start sm:items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  Você pode gerar essa chave gratuitamente em 1 minuto no Google AI Studio (permite milhares de consultas grátis por mês).
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md shadow-teal-900/10 transition-all text-sm"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Salvando..." : "Salvar Configurações"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
