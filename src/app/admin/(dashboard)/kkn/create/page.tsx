import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createKKNProgram } from "@/modules/kkn/services/actions";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Tambah KKN | Admin DEWI",
};

export default async function CreateKKNPage() {
  const institutions = await prisma.institution.findMany();

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/kkn">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tambah Program KKN</h2>
          <p className="text-slate-500 text-sm">Tambahkan catatan program kerja mahasiswa KKN.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={createKKNProgram} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">Nama Program / Kelompok KKN</label>
            <input 
              type="text" 
              id="title"
              name="title"
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Contoh: KKN Tematik Unpad 2026 Desa Cimanuk"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="institutionId" className="text-sm font-semibold text-slate-700">Institusi (Universitas)</label>
              <select 
                id="institutionId"
                name="institutionId"
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
              >
                <option value="">Pilih institusi...</option>
                {institutions.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-semibold text-slate-700">Tahun Pelaksanaan</label>
              <input 
                type="number" 
                id="year"
                name="year"
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="batch" className="text-sm font-semibold text-slate-700">Angkatan / Gelombang</label>
              <input 
                type="text" 
                id="batch"
                name="batch"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Contoh: Gelombang 1"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="supervisorName" className="text-sm font-semibold text-slate-700">Dosen Pembimbing (DPL)</label>
              <input 
                type="text" 
                id="supervisorName"
                name="supervisorName"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
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
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi / Laporan Singkat</label>
            <textarea 
              id="description"
              name="description"
              required
              rows={6}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
              placeholder="Tulis rangkuman atau laporan pelaksanaan KKN..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/kkn">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan KKN" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
