"use client";

import { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, KeyRound, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "reset"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(email, password);
        router.push("/admin");
      } else if (mode === "signup") {
        if (password.length < 6) {
          setError("A senha deve ter pelo menos 6 caracteres.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("As senhas digitadas não coincidem.");
          setLoading(false);
          return;
        }
        await signUp(email, password);
        router.push("/admin");
      } else if (mode === "reset") {
        await resetPassword(email);
        setSuccessMessage("E-mail de recuperação de senha enviado! Verifique sua caixa de entrada.");
        setMode("login");
      }
    } catch (err) {
      console.error("Auth error:", err);
      let message = "Ocorreu um erro. Verifique os dados.";

      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        message = "E-mail ou senha incorretos. Se for seu primeiro acesso, clique na aba 'Primeiro Acesso' para cadastrar sua senha.";
      } else if (err.code === "auth/email-already-in-use") {
        message = "Este e-mail já possui uma conta criada. Use a aba 'Entrar' ou recupere sua senha.";
      } else if (err.code === "auth/operation-not-allowed") {
        message = "O login por 'Email/Senha' precisa ser ativado no Firebase Console (Authentication > Sign-in method > Email/Password).";
      } else if (err.code === "auth/weak-password") {
        message = "A senha deve ter pelo menos 6 caracteres.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Muitas tentativas sem sucesso. Aguarde alguns instantes e tente novamente.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
        
        {/* Header com Logotipo da Clínica */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 mb-3 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wp-content/uploads/2025/08/cropped-ALESSANDRA_SIMBOLO-2-1-1-scaled-1.png"
              alt="Logo"
              className="admin-logo-img w-10 h-10 object-contain"
              style={{ width: '40px', height: '40px', maxWidth: '40px', maxHeight: '40px', objectFit: 'contain' }}
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1b365d] tracking-tight">
            Painel do Blog
          </h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Dra. Alessandra Kerkhoff — Gestão de Conteúdo & SEO
          </p>
        </div>

        {/* Tabs: Login vs Primeiro Acesso */}
        <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); setSuccessMessage(""); }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              mode === "login"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); setSuccessMessage(""); }}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              mode === "signup"
                ? "bg-white text-teal-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Primeiro Acesso
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
            <div>{successMessage}</div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm transition-all"
              />
            </div>
          </div>

          {mode !== "reset" && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {mode === "signup" ? "Criar Senha (mínimo 6 dígitos)" : "Senha"}
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setMode("reset"); setError(""); }}
                    className="text-[11px] text-teal-700 hover:text-teal-900 font-medium"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Confirmar Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 text-sm transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md shadow-teal-900/10 transition-all flex items-center justify-center space-x-2 text-sm mt-3"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : mode === "signup" ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Criar Senha e Entrar</span>
              </>
            ) : mode === "reset" ? (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Enviar E-mail de Recuperação</span>
              </>
            ) : (
              <span>Entrar no Painel</span>
            )}
          </button>
        </form>

        {mode === "reset" && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              ← Voltar para o login
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Ambiente seguro e exclusivo para administradores autorizados.
          </p>
        </div>

      </div>
    </div>
  );
}
