import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

/**
 * Obtém as configurações de IA (chaves de API) do Firestore.
 */
export async function getAiConfig() {
  try {
    const configDoc = await getDoc(doc(db, "configuracoes", "geral"));
    if (configDoc.exists()) {
      return configDoc.data();
    }
  } catch (err) {
    console.warn("Não foi possível carregar configurações de IA do Firestore:", err);
  }

  return { geminiApiKey: "", openaiApiKey: "", provider: "gemini", model: "gemini-1.5-flash" };
}

/**
 * Salva as configurações de IA no Firestore de forma segura.
 */
export async function saveAiConfig(config) {
  // Limpa chaves legadas salvas em texto claro no localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("ale_gemini_api_key");
      localStorage.removeItem("ale_openai_api_key");
      localStorage.removeItem("ale_ai_provider");
    } catch {
      // Ignora erro de acesso ao storage caso bloqueado
    }
  }

  await setDoc(doc(db, "configuracoes", "geral"), {
    ...config,
    ultimaAtualizacao: new Date().toISOString()
  }, { merge: true });
  return true;
}

/**
 * Remove tags HTML simples para passar texto puro para a IA
 */
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
}

/**
 * Chama a API Gemini para sugerir tags, palavras-chave e meta descriptions baseadas no artigo
 */
export async function generateSeoWithGemini(apiKey, { titulo, conteudo }) {
  const plainText = stripHtml(conteudo);
  const prompt = `Você é um especialista em SEO para blogs médicos e de fisioterapia.
Analise o título e conteúdo do artigo abaixo da Dra. Alessandra Kerkhoff (Fisioterapeuta Cardiorrespiratória e do Sono em Lajeado e Vale do Taquari, RS):

TÍTULO: ${titulo}

CONTEÚDO:
${plainText.slice(0, 4000)}

Com base no texto, responda EXCLUSIVAMENTE em formato JSON com a seguinte estrutura válida (sem markdown adicional em volta, apenas o json cru):
{
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"],
  "metaDescriptions": [
    "Opção 1 com 130-155 caracteres contendo chamada para ação",
    "Opção 2 com 130-155 caracteres focada em dor/solução do paciente",
    "Opção 3 com 130-155 caracteres focada em autoridade e atendimento local"
  ],
  "palavrasChaveCaudaLonga": [
    "termo de busca específico 1",
    "termo de busca específico 2",
    "termo de busca específico 3"
  ],
  "sugestoesMelhoriaSeo": [
    "Dica rápida 1",
    "Dica rápida 2"
  ]
}

Regras:
- As tags devem ser termos de busca reais em português do Brasil (ex: apneia do sono, fisioterapia respiratória, lajeado, cpap, ronco).
- Inclua termos locais quando relevante (Lajeado, Vale do Taquari).
- As meta descriptions devem ter entre 130 e 160 caracteres.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Erro na API Gemini (${response.status})`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawText) {
    throw new Error("A IA não retornou uma resposta válida.");
  }

  // Parse JSON
  try {
    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    throw new Error("Não foi possível processar a resposta JSON da IA.");
  }
}
