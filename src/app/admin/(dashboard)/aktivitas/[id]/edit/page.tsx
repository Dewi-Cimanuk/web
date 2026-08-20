
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateActivity } from "@/modules/activity/services/actions";
import prisma from "@/lib/prisma";

export const metadata = { title: "Edit Aktivitas | Admin DEWI" };

export default async function EditAktivitasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.activity.findUnique({ where: { id: id } }) as any;
  if (!item) notFound();

  const updateAction = updateActivity.bind(null, item.id);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/aktivitas">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Aktivitas</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={updateAction} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Judul / Nama</label>
            <input type="text" id="name" name="name" defaultValue={item.name || ""} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</label>
            <select id="status" name="status" defaultValue={item.status} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="space-y-2"><label htmlFor="duration" className="text-sm font-semibold text-slate-700">Durasi</label><input type="text" id="duration" name="duration" defaultValue={item.duration || ""} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" /></div><div className="space-y-2"><label htmlFor="price" className="text-sm font-semibold text-slate-700">Harga</label><input type="number" id="price" name="price" defaultValue={item.price || ""} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none" /></div>

          <div className="space-y-2"><label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi</label><textarea id="description" name="description" defaultValue={item.description || ""} rows={4} className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none resize-y" /></div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/aktivitas"><Button type="button" variant="outline" className="rounded-xl">Batal</Button></Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Perubahan" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
