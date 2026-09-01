import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import EditarArtigoClient from "./EditarArtigoClient";

export async function generateStaticParams() {
  const defaultIds = [{ id: "placeholder" }];
  try {
    const snapshot = await getDocs(collection(db, "artigos"));
    const firestoreIds = snapshot.docs
      .map((d) => ({ id: d.id }))
      .filter((item) => Boolean(item.id));

    const combined = [...defaultIds, ...firestoreIds];
    const unique = Array.from(new Set(combined.map((s) => s.id))).map((id) => ({ id }));
    return unique;
  } catch (err) {
    console.warn("generateStaticParams error in edit article:", err);
    return defaultIds;
  }
}

export const metadata = {
  title: "Editar Artigo | Painel do Blog",
  robots: {
    index: false,
    follow: false,
  }
};

export default function Page({ params }) {
  return <EditarArtigoClient params={params} />;
}
