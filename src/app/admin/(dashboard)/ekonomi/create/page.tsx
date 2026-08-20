import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createUMKM } from "@/modules/umkm/services/actions";

export const metadata = {
  title: "Tambah UMKM | Admin DEWI",
};

export default function CreateUMKMPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/ekonomi">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tambah UMKM</h2>
          <p className="text-slate-500 text-sm">Masukkan profil UMKM dan produk lokal.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={createUMKM} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nama Usaha / Produk</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Contoh: Kerajinan Bambu Pak Slamet"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ownerName" className="text-sm font-semibold text-slate-700">Nama Pemilik</label>
              <input 
                type="text" 
                id="ownerName"
                name="ownerName"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Contoh: Pak Slamet"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-semibold text-slate-700">Nomor Kontak (WA)</label>
              <input 
                type="text" 
                id="contact"
                name="contact"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                placeholder="Contoh: 08123456789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-semibold text-slate-700">Alamat Lengkap</label>
            <input 
              type="text" 
              id="address"
              name="address"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Contoh: Dusun Cimanuk Hilir RT 02"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              id="status"
              name="status"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi Usaha / Produk</label>
            <textarea 
              id="description"
              name="description"
              required
              rows={5}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
              placeholder="Jelaskan jenis usaha, bahan baku, atau keunikan produk..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/ekonomi">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Data" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
