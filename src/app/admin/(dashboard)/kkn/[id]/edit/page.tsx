import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateKKNProgram } from "@/modules/kkn/services/actions";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Edit KKN | Admin DEWI",
};

export default async function EditKKNPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [institutions, kkn] = await Promise.all([
    prisma.institution.findMany(),
    prisma.kKNProgram.findUnique({ where: { id: id } })
  ]);

  if (!kkn) {
    notFound();
  }

  const updateKKNProgramWithId = updateKKNProgram.bind(null, kkn.id);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/kkn">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Program KKN</h2>
          <p className="text-slate-500 text-sm">Ubah data program kerja mahasiswa KKN.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={updateKKNProgramWithId} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">Nama Program / Kelompok KKN</label>
            <input 
              type="text" 
              id="title"
              name="title"
              defaultValue={kkn.title}
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="institutionId" className="text-sm font-semibold text-slate-700">Institusi (Universitas)</label>
              <select 
                id="institutionId"
                name="institutionId"
                defaultValue={kkn.institutionId}
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
                defaultValue={kkn.year}
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
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
                defaultValue={kkn.batch || ""}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="supervisorName" className="text-sm font-semibold text-slate-700">Dosen Pembimbing (DPL)</label>
              <input 
                type="text" 
                id="supervisorName"
                name="supervisorName"
                defaultValue={kkn.supervisorName || ""}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              id="status"
              name="status"
              defaultValue={kkn.status}
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
              defaultValue={kkn.description}
              required
              rows={6}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/kkn">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Perubahan" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
