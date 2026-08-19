import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Login | DEWI Cimanuk",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center text-white">
          <h1 className="text-2xl font-bold font-serif mb-2">DEWI Cimanuk</h1>
          <p className="text-white/70 text-sm">Portal Manajemen Konten Desa Wisata</p>
        </div>
        
        <div className="p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email atau Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="admin@cimanuk.desa.id"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <Button type="button" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md">
              Masuk ke Dashboard
            </Button>
          </form>
          
          <p className="text-center text-xs text-slate-400 mt-8">
            Hanya untuk staf pengelola Desa Wisata Cimanuk & Tim KKN terkait.
          </p>
        </div>
      </div>
    </div>
  );
}
