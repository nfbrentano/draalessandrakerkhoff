import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  const defaultSlugs = [{ slug: "artigo" }];
  try {
    const snapshot = await getDocs(collection(db, "artigos"));
    const firestoreSlugs = snapshot.docs
      .map((d) => ({ slug: d.data().slug }))
      .filter((item) => Boolean(item.slug));

    const combined = [...defaultSlugs, ...firestoreSlugs];
    const unique = Array.from(new Set(combined.map((s) => s.slug))).map((slug) => ({ slug }));
    return unique;
  } catch (err) {
    console.warn("generateStaticParams error:", err);
    return defaultSlugs;
  }
}

export const metadata = {
  title: "Artigo | Blog da Dra. Alessandra Kerkhoff",
  description: "Artigos e novidades sobre fisioterapia cardiorrespiratória e do sono em Lajeado e Vale do Taquari."
};

export default function Page({ params }) {
  return <ArticleClient params={params} />;
}
