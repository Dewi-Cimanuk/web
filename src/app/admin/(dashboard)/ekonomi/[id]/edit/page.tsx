import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateUMKM } from "@/modules/umkm/services/actions";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Edit UMKM | Admin DEWI",
};

export default async function EditUMKMPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const umkm = await prisma.uMKM.findUnique({ where: { id: id } });

  if (!umkm) {
    notFound();
  }

  const updateUMKMWithId = updateUMKM.bind(null, umkm.id);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/ekonomi">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit UMKM</h2>
          <p className="text-slate-500 text-sm">Ubah profil UMKM dan produk lokal.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={updateUMKMWithId} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nama Usaha / Produk</label>
            <input 
              type="text" 
              id="name"
              name="name"
              defaultValue={umkm.name}
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ownerName" className="text-sm font-semibold text-slate-700">Nama Pemilik</label>
              <input 
                type="text" 
                id="ownerName"
                name="ownerName"
                defaultValue={umkm.ownerName || ""}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-semibold text-slate-700">Nomor Kontak (WA)</label>
              <input 
                type="text" 
                id="contact"
                name="contact"
                defaultValue={umkm.contact || ""}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-semibold text-slate-700">Alamat Lengkap</label>
            <input 
              type="text" 
              id="address"
              name="address"
              defaultValue={umkm.address || ""}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              id="status"
              name="status"
              defaultValue={umkm.status}
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
              defaultValue={umkm.description}
              required
              rows={5}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/ekonomi">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Perubahan" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
