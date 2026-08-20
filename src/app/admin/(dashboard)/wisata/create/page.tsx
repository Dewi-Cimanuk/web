import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createDestination } from "@/modules/tourism/services/actions";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Tambah Wisata | Admin DEWI",
};

export default async function CreateWisataPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/wisata">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tambah Destinasi</h2>
          <p className="text-slate-500 text-sm">Masukkan informasi destinasi wisata baru.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={createDestination} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nama Destinasi</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Contoh: Curug Cimanuk"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-semibold text-slate-700">Kategori</label>
            <select 
              id="categoryId"
              name="categoryId"
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
            >
              <option value="">Pilih kategori...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="priceTicket" className="text-sm font-semibold text-slate-700">Harga Tiket (Rp)</label>
              <input 
                type="number" 
                id="priceTicket"
                name="priceTicket"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Contoh: 15000"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="openHours" className="text-sm font-semibold text-slate-700">Jam Operasional</label>
              <input 
                type="text" 
                id="openHours"
                name="openHours"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Contoh: 08:00 - 17:00"
              />
            </div>
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
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi Lengkap</label>
            <textarea 
              id="description"
              name="description"
              required
              rows={5}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
              placeholder="Deskripsikan daya tarik, rute, atau cerita dari destinasi ini..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/wisata">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Destinasi" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
