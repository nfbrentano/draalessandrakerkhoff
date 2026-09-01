"use client";

import { useState } from "react";
import { formatGoogleDriveImageUrl } from "@/app/utils/googleDrive";
import { Image as ImageIcon, Link as LinkIcon, HelpCircle, Check } from "lucide-react";

export default function GoogleDriveImageInput({ value, onChange, altValue, onAltChange }) {
  const handleUrlChange = (e) => {
    const raw = e.target.value;
    const formatted = formatGoogleDriveImageUrl(raw);
    onChange(formatted);
  };

  return (
    <div className="space-y-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <ImageIcon className="w-4 h-4 text-teal-700" />
            <span>Imagem de Destaque (Google Drive ou URL)</span>
          </span>
          <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
            Hospedagem 100% gratuita
          </span>
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            placeholder="Cole aqui o link compartilhado do Google Drive ou URL da imagem"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Texto Alternativo da Imagem (Alt Text para SEO e Acessibilidade)
        </label>
        <input
          type="text"
          value={altValue}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Ex: Dra. Alessandra realizando consulta de fisioterapia do sono"
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm transition-all"
        />
      </div>

      {/* Image Preview & Help */}
      {value ? (
        <div className="mt-3">
          <div className="text-xs font-semibold text-slate-600 mb-2">
            Pré-visualização da imagem do Google Drive:
          </div>
          <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={altValue || "Imagem de destaque"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-teal-900 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>Como usar imagens do seu Google Drive sem custo:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-slate-600">
            <li>Faça upload da foto no seu Google Drive.</li>
            <li>Clique com o botão direito na foto &gt; <strong>Compartilhar</strong>.</li>
            <li>Altere o Acesso Geral para <strong>&quot;Qualquer pessoa com o link&quot;</strong> (Leitor).</li>
            <li>Copie o link e cole no campo acima (ele é convertido automaticamente em alta performance!).</li>
          </ol>
        </div>
      )}
    </div>
  );
}
