
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import prisma from "@/lib/prisma";

export const metadata = { title: "Kelola Galeri | Admin DEWI" };

export default async function AdminGaleriPage() {
  const items = await prisma.gallery.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Galeri</h2>
          <p className="text-slate-500 text-sm">Kelola data Galeri desa.</p>
        </div>
        <Link href="/admin/galeri/create">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Galeri
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Judul/Nama</th>
                <th className="px-6 py-4 font-medium">URL</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 line-clamp-1">{item.title || "-"}</td>
                  <td className="px-6 py-4 text-slate-600">{item.url || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-md text-xs font-bold " + (
                      item.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                      item.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' :
                      'bg-orange-100 text-orange-700'
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={"/admin/galeri/" + item.id + "/edit"}>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        const { deleteGallery } = await import("@/modules/gallery/services/actions");
                        await deleteGallery(item.id);
                      }}>
                        <SubmitButton variant="outline" size="icon" className="h-8 w-8 rounded-lg text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
