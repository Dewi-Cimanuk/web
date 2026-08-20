import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateArticle } from "@/modules/article/services/actions";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Edit Artikel | Admin DEWI",
};

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id: id } });

  if (!article) {
    notFound();
  }

  const updateArticleWithId = updateArticle.bind(null, article.id);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/artikel">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Artikel</h2>
          <p className="text-slate-500 text-sm">Ubah konten artikel atau berita.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <form action={updateArticleWithId} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700">Judul Artikel</label>
            <input 
              type="text" 
              id="title"
              name="title"
              defaultValue={article.title}
              required
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="authorName" className="text-sm font-semibold text-slate-700">Penulis</label>
              <input 
                type="text" 
                id="authorName"
                name="authorName"
                defaultValue={article.authorName || ""}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-semibold text-slate-700">Status Publikasi</label>
              <select 
                id="status"
                name="status"
                defaultValue={article.status}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">Ringkasan (Excerpt)</label>
            <textarea 
              id="excerpt"
              name="excerpt"
              defaultValue={article.excerpt || ""}
              rows={3}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-semibold text-slate-700">Konten Lengkap</label>
            <textarea 
              id="content"
              name="content"
              defaultValue={article.content}
              required
              rows={12}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/admin/artikel">
              <Button type="button" variant="outline" className="rounded-xl">Batal</Button>
            </Link>
            <SubmitButton className="rounded-xl bg-primary text-white" label="Simpan Perubahan" loadingLabel="Menyimpan..." />
          </div>
        </form>
      </div>
    </div>
  );
}
