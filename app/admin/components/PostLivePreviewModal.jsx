"use client";

import { useState } from "react";
import { 
  X, 
  Monitor, 
  Smartphone, 
  Tag as TagIcon,
  MessageCircle,
  Clock
} from "lucide-react";
import { formatGoogleDriveImageUrl } from "@/app/utils/googleDrive";

export default function PostLivePreviewModal({
  isOpen,
  onClose,
  titulo,
  slug,
  descricao,
  conteudo,
  categoria,
  imagemDestaque,
  altImagem,
  tags = [],
  dataPublicacao,
}) {
  const [device, setDevice] = useState("desktop");

  if (!isOpen) return null;

  const directImageUrl = formatGoogleDriveImageUrl(imagemDestaque);
  const tagsFormatted = tags && tags.length > 0
    ? tags.map(t => `#${t.trim().replace(/\s+/g, "")}`).join(" ")
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-[#f8fafc] text-slate-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#1b365d] tracking-tight">
                Pré-visualização do Post ao Vivo
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Simulação real de como o paciente verá o artigo publicado no site
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  device === "desktop"
                    ? "bg-white text-teal-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  device === "mobile"
                    ? "bg-white text-teal-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center">
          
          <div
            className={`bg-white transition-all duration-300 shadow-xl border border-slate-200 ${
              device === "mobile"
                ? "w-[390px] rounded-[36px] p-4 border-[10px] border-slate-800"
                : "w-full max-w-4xl rounded-2xl p-6 sm:p-10"
            }`}
          >
            <div className="wp-site-blocks">
              
              {/* Header do Site Simulado */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png"
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#1b365d]">Dra. Alessandra Kerkhoff</div>
                    <div className="text-[10px] text-slate-400">Fisioterapia do Sono e Cardiorrespiratória</div>
                  </div>
                </div>
              </div>

              {/* Título do Post */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {titulo || "Título do Artigo Aqui..."}
                </h2>
              </div>

              {/* Imagem de Destaque */}
              {directImageUrl ? (
                <div className="flex justify-center mb-6">
                  <div className="max-w-[620px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={directImageUrl}
                      alt={altImagem || titulo}
                      className="w-full h-auto object-cover max-h-[460px]"
                      onError={(e) => {
                        e.currentTarget.src = "/wp-content/uploads/2025/09/Cuide-CPAP-1-819x1024.avif";
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-400 mb-6">
                  Sem imagem de destaque selecionada (adicione um link do Google Drive no formulário)
                </div>
              )}

              {/* Meta Description / Resumo Inicial */}
              {descricao && (
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  {descricao}
                </p>
              )}

              {/* Conteúdo Formatado */}
              <div
                className="prose prose-slate max-w-none text-slate-800 leading-relaxed
                  prose-headings:text-slate-900 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
                  prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
                  prose-p:my-3 prose-p:leading-relaxed
                  prose-ul:my-3 prose-li:my-1
                  prose-blockquote:border-l-4 prose-blockquote:border-teal-600 prose-blockquote:bg-teal-50/60 prose-blockquote:p-3 prose-blockquote:rounded-r-xl"
                dangerouslySetInnerHTML={{
                  __html: conteudo || "<p>Escreva o conteúdo do post no editor...</p>",
                }}
              />

              {/* Botão de WhatsApp Oficial */}
              <div className="my-8 text-center sm:text-left">
                <a
                  href="https://api.whatsapp.com/send?phone=5551996145583&text=Oi%2C%20encontrei%20suas%20informa%C3%A7%C3%B5es%20do%20WhatsApp%20no%20seu%20site."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg text-sm transition-colors shadow-md text-decoration-none"
                >
                  Conversar no WhatsApp
                </a>
              </div>

              {/* Tags em Formato Hashtag (#) */}
              {tagsFormatted && (
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                  {tagsFormatted}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
