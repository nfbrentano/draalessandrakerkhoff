"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { 
  Save, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  Tag as TagIcon, 
  Plus, 
  X, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import Link from "next/link";
import ArticleEditor from "./ArticleEditor";
import SeoAnalyzer from "./SeoAnalyzer";
import GooglePreview from "./GooglePreview";
import AiTagSuggester from "./AiTagSuggester";
import GoogleDriveImageInput from "./GoogleDriveImageInput";
import PostLivePreviewModal from "./PostLivePreviewModal";

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticleForm({ initialData = null, onSave, isEditing = false }) {
  const router = useRouter();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isManualSlug, setIsManualSlug] = useState(Boolean(initialData?.slug));
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [conteudo, setConteudo] = useState(initialData?.conteudo || "");
  const [categoria, setCategoria] = useState(initialData?.categoria || "fisioterapia-do-sono");
  const [palavraChaveFoco, setPalavraChaveFoco] = useState(initialData?.palavraChaveFoco || "");
  const [imagemDestaque, setImagemDestaque] = useState(initialData?.imagemDestaque || "");
  const [altImagem, setAltImagem] = useState(initialData?.altImagem || "");
  const [tags, setTags] = useState(initialData?.tags || ["fisioterapia do sono", "apneia e ronco"]);
  const [newTagInput, setNewTagInput] = useState("");
  const [status, setStatus] = useState(initialData?.status || "publicado");
  
  const defaultDate = initialData?.dataPublicacao 
    ? new Date(initialData.dataPublicacao).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);
  const [dataPublicacao, setDataPublicacao] = useState(defaultDate);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitulo(val);
    if (!isManualSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleAddTag = (tagToAdd) => {
    const trimmed = (tagToAdd || newTagInput).trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!titulo.trim()) {
      setError("Por favor, preencha o título do artigo.");
      return;
    }

    if (!slug.trim()) {
      setError("Por favor, informe ou gere o slug do artigo.");
      return;
    }

    setSaving(true);

    try {
      const pubDateIso = new Date(dataPublicacao).toISOString();
      const isFuture = new Date(dataPublicacao) > new Date();
      const finalStatus = status === 'rascunho' ? 'rascunho' : isFuture ? 'agendado' : 'publicado';

      const payload = {
        titulo: titulo.trim(),
        slug: slug.trim().toLowerCase(),
        descricao: descricao.trim(),
        conteudo,
        categoria,
        palavraChaveFoco: palavraChaveFoco.trim(),
        imagemDestaque: imagemDestaque.trim(),
        altImagem: altImagem.trim(),
        tags,
        status: finalStatus,
        dataPublicacao: pubDateIso,
        autorEmail: user?.email || "alekerkhoff@gmail.com",
        autorNome: "Dra. Alessandra Kerkhoff",
        dataAtualizacao: new Date().toISOString(),
      };

      if (!isEditing) {
        payload.dataCriacao = new Date().toISOString();
        payload.views = 0;
      }

      await onSave(payload);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao salvar o artigo. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        
        {/* Top Header Actions (Mobile & Desktop Responsive) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className="p-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-600 hover:text-teal-800 transition-colors border border-slate-200 shadow-2xs"
              title="Voltar ao Painel"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1b365d] tracking-tight">
                {isEditing ? "Editar Artigo" : "Novo Artigo do Blog"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Crie e rankeie seus posts com auxílio de IA e análise de SEO em tempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Preview Button */}
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors shadow-2xs"
            >
              <Eye className="w-4 h-4 text-teal-700" />
              <span>Pré-visualizar Post</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-5 sm:px-6 py-2.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-teal-900/10 transition-all"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? "Salvando..." : isEditing ? "Atualizar" : "Salvar & Publicar"}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-3 animate-pulse">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>Artigo salvo com sucesso no Firestore! Redirecionando...</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Grid: Left Editor (2 cols) | Right SEO & IA (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Form & Content Editor */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title & Slug Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Título do Artigo (H1) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={handleTitleChange}
                  placeholder="Ex: Como a Fisioterapia Cardiorrespiratória Transforma a Qualidade do Sono"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-base sm:text-lg font-bold placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all"
                />
              </div>

              {/* Slug / URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>URL Amigável (Slug)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Ex: /blog/como-a-fisioterapia...</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">/blog/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setIsManualSlug(true);
                    }}
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                  />
                </div>
              </div>
            </div>

            {/* Meta Description */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description (Resumo para o Google)
                </label>
                <span className={`text-xs font-semibold ${descricao.length >= 120 && descricao.length <= 160 ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {descricao.length} / 160 caracteres
                </span>
              </div>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Escreva uma descrição atrativa de 120 a 160 caracteres que faça os pacientes quererem clicar no seu artigo no Google..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 resize-none leading-relaxed transition-all"
              />
            </div>

            {/* Content (TipTap) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 px-1">
                Conteúdo Completo do Artigo
              </label>
              <ArticleEditor content={conteudo} onChange={setConteudo} />
            </div>

            {/* Image Input with Google Drive Support */}
            <GoogleDriveImageInput
              value={imagemDestaque}
              onChange={setImagemDestaque}
              altValue={altImagem}
              onAltChange={setAltImagem}
            />

          </div>

          {/* Right Column: SEO, IA, Tags & Publishing Config */}
          <div className="space-y-6">
            
            {/* Publishing Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>Publicação & Agendamento</span>
              </h3>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                >
                  <option value="publicado">Publicado Imediatamente</option>
                  <option value="agendado">Agendado para data futura</option>
                  <option value="rascunho">Rascunho (Privado)</option>
                </select>
              </div>

              {/* Publication Date */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Data e Hora de Publicação:</label>
                <input
                  type="datetime-local"
                  value={dataPublicacao}
                  onChange={(e) => setDataPublicacao(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Se a data for futura, o artigo será liberado automaticamente após esse horário.
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Categoria:</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                >
                  <option value="fisioterapia-do-sono">Fisioterapia do Sono</option>
                  <option value="apneia-e-ronco">Apneia e Ronco</option>
                  <option value="fisioterapia-cardiorrespiratoria">Fisioterapia Cardiorrespiratória</option>
                  <option value="cpap-e-tratamentos">CPAP e Tratamentos</option>
                  <option value="bem-estar">Bem-Estar e Saúde</option>
                </select>
              </div>

              {/* Focus Keyword */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Palavra-Chave Foco (SEO):</label>
                <input
                  type="text"
                  value={palavraChaveFoco}
                  onChange={(e) => setPalavraChaveFoco(e.target.value)}
                  placeholder="Ex: tratamento de ronco lajeado"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
            </div>

            {/* Tags Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                <TagIcon className="w-4 h-4 text-teal-700" />
                <span>Tags do Artigo ({tags.length})</span>
              </label>

              {/* Tags Badges */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 text-xs font-medium"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="p-0.5 hover:text-rose-600 rounded transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Tag Input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Digitar nova tag..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Adicionar tag"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI Tag Suggester */}
            <AiTagSuggester
              titulo={titulo}
              conteudo={conteudo}
              tagsAtuais={tags}
              onAddTag={(tag) => setTags([...tags, tag])}
              onSetAllTags={setTags}
              onSelectMetaDescription={setDescricao}
            />

            {/* SEO Score Checklist */}
            <SeoAnalyzer
              titulo={titulo}
              descricao={descricao}
              conteudo={conteudo}
              slug={slug}
              imagemDestaque={imagemDestaque}
              altImagem={altImagem}
              tags={tags}
              palavraChaveFoco={palavraChaveFoco}
            />

            {/* Google Search Mockup Preview */}
            <GooglePreview
              title={titulo}
              description={descricao}
              slug={slug}
            />

          </div>

        </div>

      </form>

      {/* Live Preview Modal (Desktop & Mobile Simulation) */}
      <PostLivePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        titulo={titulo}
        slug={slug}
        descricao={descricao}
        conteudo={conteudo}
        categoria={categoria}
        imagemDestaque={imagemDestaque}
        altImagem={altImagem}
        tags={tags}
        dataPublicacao={dataPublicacao}
      />
    </>
  );
}
