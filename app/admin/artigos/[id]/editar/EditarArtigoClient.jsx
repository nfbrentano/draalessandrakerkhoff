"use client";

import { useEffect, useState, use } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ArticleForm from "../../../components/ArticleForm";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditarArtigoClient({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id || id === "placeholder") {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "artigos", id));
        if (snap.exists()) {
          setArticle({ id: snap.id, ...snap.data() });
        } else {
          setError("Artigo não encontrado no banco de dados.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar o artigo. Verifique sua conexão.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    await updateDoc(doc(db, "artigos", id), updatedData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 inline-flex items-center space-x-2 mb-4">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <span>{error || "Artigo não encontrado."}</span>
        </div>
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Painel</span>
          </Link>
        </div>
      </div>
    );
  }

  return <ArticleForm initialData={article} onSave={handleUpdate} isEditing={true} />;
}
