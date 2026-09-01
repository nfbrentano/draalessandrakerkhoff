"use client";

import { useState } from "react";
import { Globe, Smartphone, Monitor } from "lucide-react";

export default function GooglePreview({ title, description, slug }) {
  const [device, setDevice] = useState("desktop");

  const displayTitle = title || "Título do Artigo | Dra. Alessandra Kerkhoff";
  const displayDesc = description || "Adicione uma meta description atrativa para atrair cliques dos pacientes nos resultados de busca do Google.";
  const displayUrl = `https://draalessandrakerkhoff.com.br/blog/${slug || "slug-do-artigo"}`;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Prévia no Google (SERP)
          </span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === "desktop" ? "bg-white text-teal-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            title="Visualização Desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === "mobile" ? "bg-white text-teal-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            title="Visualização Mobile"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Google Result Mockup */}
      <div className={`bg-white text-slate-900 p-4 rounded-2xl border border-slate-200 font-sans ${device === 'mobile' ? 'max-w-xs mx-auto border-4 border-slate-700 rounded-3xl' : ''}`}>
        
        {/* Favicon & Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs mb-1">
          <div className="w-5 h-5 rounded-full bg-teal-800 flex items-center justify-center text-[10px] text-white font-bold">
            AK
          </div>
          <div className="truncate">
            <div className="text-[12px] font-normal text-[#202124] leading-tight">Dra. Alessandra Kerkhoff</div>
            <div className="text-[11px] text-[#4d5156] truncate">{displayUrl}</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-[16px] sm:text-[17px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-2 my-1">
          {displayTitle}
        </div>

        {/* Description */}
        <div className="text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
          {displayDesc}
        </div>
      </div>
    </div>
  );
}
