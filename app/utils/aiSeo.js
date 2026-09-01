import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

/**
 * Obtém as configurações de IA (chaves de API) do Firestore ou LocalStorage.
 */
export async function getAiConfig() {
  try {
    if (typeof window !== "undefined") {
      const localKey = localStorage.getItem("ale_gemini_api_key");
      if (localKey) {
        return {
          geminiApiKey: localKey,
          provider: "gemini",
          model: "gemini-1.5-flash"
        };
      }
    }

    const configDoc = await getDoc(doc(db, "configuracoes", "geral"));
    if (configDoc.exists()) {
      return configDoc.data();
    }
  } catch (err) {
    console.warn("Não foi possível carregar configurações de IA do Firestore:", err);
  }

  // Fallback para localStorage
  if (typeof window !== "undefined") {
    return {
      geminiApiKey: localStorage.getItem("ale_gemini_api_key") || "",
      openaiApiKey: localStorage.getItem("ale_openai_api_key") || "",
      provider: localStorage.getItem("ale_ai_provider") || "gemini",
      model: "gemini-1.5-flash"
    };
  }

  return { geminiApiKey: "", openaiApiKey: "", provider: "gemini" };
}

/**
 * Salva as configurações de IA tanto no Firestore quanto no LocalStorage.
 */
export async function saveAiConfig(config) {
  if (typeof window !== "undefined") {
    if (config.geminiApiKey) localStorage.setItem("ale_gemini_api_key", config.geminiApiKey);
    if (config.openaiApiKey) localStorage.setItem("ale_openai_api_key", config.openaiApiKey);
    if (config.provider) localStorage.setItem("ale_ai_provider", config.provider);
  }

  try {
    await setDoc(doc(db, "configuracoes", "geral"), {
      ...config,
      ultimaAtualizacao: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Erro ao salvar no Firestore (salvo apenas localmente):", err);
    return true;
  }
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
