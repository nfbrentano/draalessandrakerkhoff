"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Link from "next/link";
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "artigos"), orderBy("dataAtualizacao", "desc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setArticles(list);
    } catch (err) {
      console.warn("Tentando carregar sem orderBy:", err);
      try {
        const snapshot = await getDocs(collection(db, "artigos"));
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setArticles(list);
      } catch (e) {
        console.error("Erro ao listar artigos do Firestore:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "artigos", deleteId));
      setArticles(articles.filter((a) => a.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Erro ao deletar:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Contadores
  const totalCount = articles.length;
  const publishedCount = articles.filter((a) => a.status === "publicado").length;
  const scheduledCount = articles.filter((a) => a.status === "agendado").length;
  const draftCount = articles.filter((a) => a.status === "rascunho").length;

  // Filtragem
  const filteredArticles = articles.filter((item) => {
    const matchesSearch = 
      (item.titulo || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.slug || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "todos" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b365d] tracking-tight">
            Gerenciador de Artigos & SEO
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Crie, publique e acompanhe seus artigos do blog em harmonia com o site da clínica.
          </p>
        </div>

        <Link
          href="/admin/artigos/novo"
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-900/10 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Escrever Novo Artigo</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total de Artigos</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{totalCount}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Publicados</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">{publishedCount}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Agendados</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">{scheduledCount}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rascunhos</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-600 mt-1">{draftCount}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título ou tag..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "todos", label: "Todos" },
            { id: "publicado", label: "Publicados" },
            { id: "agendado", label: "Agendados" },
            { id: "rascunho", label: "Rascunhos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table / List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-teal-600/30 border-t-teal-700 rounded-full animate-spin" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Nenhum artigo encontrado</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {articles.length === 0 
                ? "Você ainda não criou nenhum artigo no Firestore. Clique no botão abaixo para começar seu primeiro artigo com SEO e IA!"
                : "Nenhum artigo corresponde à sua busca ou filtro."}
            </p>
            {articles.length === 0 && (
              <div className="mt-5">
                <Link
                  href="/admin/artigos/novo"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Criar Meu Primeiro Artigo</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredArticles.map((article) => {
              const isScheduled = article.status === "agendado";
              const isDraft = article.status === "rascunho";
              const isPublished = article.status === "publicado";

              return (
                <div
                  key={article.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      
                      {/* Status Badge */}
                      {isPublished && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Publicado</span>
                        </span>
                      )}
                      {isScheduled && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Agendado</span>
                        </span>
                      )}
                      {isDraft && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <span>Rascunho</span>
                        </span>
                      )}

                      {/* Date */}
                      <span className="text-[11px] text-slate-500 flex items-center space-x-1 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>
                          {article.dataPublicacao
                            ? new Date(article.dataPublicacao).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
                            : "Sem data"}
                        </span>
                      </span>

                      {/* Category */}
                      {article.categoria && (
                        <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 font-medium">
                          {article.categoria.replace(/-/g, " ")}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-slate-800 truncate">
                      {article.titulo}
                    </h2>

                    {/* Tags preview */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        {article.tags.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                            #{t}
                          </span>
                        ))}
                        {article.tags.length > 4 && (
                          <span className="text-[10px] text-slate-400">+{article.tags.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    
                    {/* View in site */}
                    <Link
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl text-slate-500 hover:text-teal-800 hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-200"
                      title="Ver artigo no site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Edit */}
                    <Link
                      href={`/admin/artigos/${article.id}/editar`}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteId(article.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir artigo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Excluir Artigo</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tem certeza que deseja excluir permanentemente este artigo? Esta ação não pode ser desfeita no Firestore.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm"
              >
                {deleting ? "Excluindo..." : "Confirmar Exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
