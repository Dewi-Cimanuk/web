import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import Link from "next/link";
import { getDestinations } from "@/modules/tourism/services/mock";
export const metadata = {
  title: "Kelola Wisata | Admin DEWI",
};

export default async function AdminWisataPage() {
  const destinations = await getDestinations();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Destinasi Wisata</h2>
          <p className="text-slate-500 text-sm">Tambah, ubah, atau hapus data pariwisata desa.</p>
        </div>
        <Link href="/admin/wisata/create">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Destinasi
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama destinasi..."
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Nama Destinasi</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Harga Tiket</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{dest.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold">
                      {dest.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {dest.priceTicket === 0 ? "Gratis" : `Rp ${dest.priceTicket.toLocaleString('id-ID')}`}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/wisata/${dest.id}/edit`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-blue-600 border-blue-200 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        const { deleteDestination } = await import("@/modules/tourism/services/actions");
                        await deleteDestination(dest.id);
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
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500 text-center">
          Menampilkan {destinations.length} data destinasi
        </div>
      </div>
    </div>
  );
}
