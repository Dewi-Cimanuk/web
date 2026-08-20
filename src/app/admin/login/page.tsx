import LoginForm from "./client";

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
          <LoginForm />
          
          <p className="text-center text-xs text-slate-400 mt-8">
            Hanya untuk staf pengelola Desa Wisata Cimanuk & Tim KKN terkait.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-center w-full text-xs text-slate-500">
        © {new Date().getFullYear()} Desa Wisata Cimanuk. All rights reserved.
      </div>
    </div>
  );
}
