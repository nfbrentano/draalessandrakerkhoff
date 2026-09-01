"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ArticleForm from "../../components/ArticleForm";

export default function NovoArtigoPage() {
  const handleSave = async (articleData) => {
    const docRef = await addDoc(collection(db, "artigos"), articleData);
    return docRef.id;
  };

  return <ArticleForm onSave={handleSave} isEditing={false} />;
}
