import { Map, Store, GraduationCap, Users } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata = {
  title: "Admin Dashboard | DEWI Cimanuk",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  const totalDestinasi = await prisma.destination.count();
  const totalUMKM = await prisma.uMKM.count();
  const totalKuliner = await prisma.culinary.count();
  const totalKKN = await prisma.kKNProgram.count();
  
  const recentArticles = await prisma.article.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    select: { title: true, createdAt: true, authorName: true }
  });

  const stats = [
    { title: "Total Destinasi Wisata", value: totalDestinasi.toString(), icon: Map, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pelaku UMKM & Kuliner", value: (totalUMKM + totalKuliner).toString(), icon: Store, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Program KKN Tersimpan", value: totalKKN.toString(), icon: GraduationCap, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Pengunjung (Bulan Ini)", value: "1.4K", icon: Users, color: "text-purple-600", bg: "bg-purple-100" }, // ini ambil darimana ya datanya
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Selamat Datang, {session?.user?.name || "Admin"}!</h2>
        <p className="text-slate-500">Berikut adalah ringkasan data platform Desa Wisata Cimanuk hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Aktivitas Terakhir (Artikel)</h3>
          <div className="space-y-4">
            {recentArticles.length > 0 ? recentArticles.map((article, i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm text-slate-700 font-medium">Artikel "{article.title}" berhasil dipublikasikan.</p>
                  <p className="text-xs text-slate-400">Oleh {article.authorName || "Admin"}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500">Belum ada aktivitas.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center text-center text-slate-500 min-h-[300px]">
           {/* Placeholder for chart */}
           <div className="w-full h-48 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center mb-4">
              Grafik Kunjungan Web
           </div>
           <p className="text-sm">Fitur Analytics sedang dalam pengembangan</p>
        </div>
      </div>
    </div>
  );
}
