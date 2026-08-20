import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Kelola Artikel | Admin DEWI",
};

export default async function AdminArtikelPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Artikel</h2>
          <p className="text-slate-500 text-sm">Kelola berita, pengumuman, dan artikel panduan wisata.</p>
        </div>
        <Link href="/admin/artikel/create">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Artikel
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari judul artikel..."
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Judul</th>
                <th className="px-6 py-4 font-medium">Penulis</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 line-clamp-1">{article.title}</td>
                  <td className="px-6 py-4 text-slate-600">{article.authorName || "-"}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(article.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      article.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                      article.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/artikel/${article.id}/edit`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        const { deleteArticle } = await import("@/modules/article/services/actions");
                        await deleteArticle(article.id);
                      }}>
                        <SubmitButton variant="outline" size="icon" className="h-8 w-8 rounded-lg text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Belum ada artikel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500 text-center">
          Menampilkan {articles.length} artikel
        </div>
      </div>
    </div>
  );
}
