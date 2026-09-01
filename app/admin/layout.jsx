import "./admin.css";
import { AuthProvider } from "./components/AuthProvider";
import AdminNav from "./components/AdminNav";

export const metadata = {
  title: "Painel Administrativo | Blog Dra. Alessandra Kerkhoff",
  robots: {
    index: false,
    follow: false,
  }
};

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <div className="admin-scope min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-teal-600 selection:text-white">
        <AdminNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
