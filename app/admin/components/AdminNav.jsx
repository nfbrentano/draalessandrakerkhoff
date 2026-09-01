"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { 
  FileText, 
  PlusCircle, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Se estiver na tela de login, não mostra a barra de navegação
  if (pathname === "/admin/login" || pathname === "/admin/login/") {
    return null;
  }

  const navItems = [
    { label: "Artigos", href: "/admin", icon: FileText },
    { label: "Escrever Artigo", href: "/admin/artigos/novo", icon: PlusCircle },
    { label: "Configurações (IA)", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <header className="bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Título com Logo Oficial da Clínica */}
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="flex items-center space-x-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png"
                alt="Dra. Alessandra Kerkhoff"
                className="admin-logo-img w-10 h-10 object-contain flex-shrink-0"
                style={{ width: '40px', height: '40px', maxWidth: '40px', maxHeight: '40px', objectFit: 'contain' }}
              />
              <div>
                <div className="font-bold text-sm sm:text-base tracking-tight text-[#1b365d] group-hover:text-teal-700 transition-colors">
                  Dra. Alessandra Kerkhoff
                </div>
                <div className="text-[11px] text-teal-800 font-medium">
                  Painel do Blog & SEO
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-teal-50 text-teal-800 font-semibold border border-teal-200/80 shadow-xs"
                      : "text-slate-600 hover:text-[#1b365d] hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-700" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Ver Blog, User Email & Logout */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-teal-800 bg-slate-100 hover:bg-slate-200/70 transition-colors border border-slate-200"
              title="Abrir o blog público em nova aba"
            >
              <span>Ver Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {user && (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span className="max-w-[140px] truncate font-medium">{user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Sair do Painel"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-teal-50 text-teal-800 font-semibold border border-teal-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4 text-teal-700" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-600 truncate max-w-[180px] font-medium">
              {user?.email}
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/blog"
                target="_blank"
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1"
              >
                <span>Ver Blog</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={signOut}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center space-x-1 font-medium"
              >
                <LogOut className="w-3 h-3" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
