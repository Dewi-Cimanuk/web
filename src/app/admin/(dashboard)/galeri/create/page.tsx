
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createGallery } from "@/modules/gallery/services/actions";

export const metadata = { title: "Tambah Galeri | Admin DEWI" };

export default function CreateGaleriPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/galeri">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tambah Galeri</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={createGallery} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">Judul / Nama</label>
            <input type="text" id="title" name="title" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
            <select id="status" name="status" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="space-y-2"><label htmlFor="url" className="text-sm font-semibold text-slate-700">URL Gambar</label><input type="text" id="url" name="url" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" /></div><div className="space-y-2"><label htmlFor="caption" className="text-sm font-semibold text-slate-700">Caption</label><input type="text" id="caption" name="caption" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" /></div>

          

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/galeri"><Button type="button" variant="outline" className="rounded-xl">Batal</Button></Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
