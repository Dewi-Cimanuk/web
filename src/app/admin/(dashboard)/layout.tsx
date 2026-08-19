import Link from "next/link";
import { LayoutDashboard, Map, Store, Calendar, BookOpen, GraduationCap, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Map, label: "Destinasi Wisata", href: "/admin/wisata" },
    { icon: Store, label: "Ekonomi Lokal", href: "/admin/ekonomi" },
    { icon: GraduationCap, label: "Data KKN", href: "/admin/kkn" },
    { icon: Calendar, label: "Event & Agenda", href: "/admin/event" },
    { icon: BookOpen, label: "Artikel & Berita", href: "/admin/artikel" },
    { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto hidden md:flex">
        <div className="p-6">
          <h2 className="text-white text-xl font-bold font-serif">DEWI Cimanuk</h2>
          <p className="text-xs text-slate-500 mt-1">Admin Panel v1.0</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu Utama</div>
          {menuItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 mt-auto">
          <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-900/30 text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800">Dashboard Pengelola</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Admin Desa</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              AD
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-6 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
