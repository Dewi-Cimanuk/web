import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { createEvent } from "@/modules/event/services/actions";

export const metadata = {
  title: "Tambah Event | Admin DEWI",
};

export default function CreateEventPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/event">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tambah Event</h2>
          <p className="text-slate-500 text-sm">Tambahkan agenda acara atau kegiatan desa baru.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={createEvent} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">Nama Event</label>
            <input 
              type="text" 
              id="title"
              name="title"
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Contoh: Festival Panen Raya"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-semibold text-slate-700">Tanggal Mulai</label>
              <input 
                type="datetime-local" 
                id="startDate"
                name="startDate"
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-semibold text-slate-700">Tanggal Selesai (Opsional)</label>
              <input 
                type="datetime-local" 
                id="endDate"
                name="endDate"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-semibold text-slate-700">Lokasi</label>
              <input 
                type="text" 
                id="location"
                name="location"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Contoh: Alun-alun Desa"
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
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi Event</label>
            <textarea 
              id="description"
              name="description"
              required
              rows={4}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
              placeholder="Jelaskan detail acara..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/event">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Event" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
