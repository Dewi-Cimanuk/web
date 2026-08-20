import Image from "next/image";
import Link from "next/link";
import { getArticleList } from "@/modules/article/services/mock";
import { BookOpen, User, Calendar as CalendarIcon, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Artikel & Panduan | DEWI Cimanuk",
};

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

export default async function ArtikelPage() {
  const articles = await getArticleList();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-primary/90 py-16 text-center text-white border-b border-primary/20 shadow-inner">
        <div className="container mx-auto max-w-4xl px-4">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Artikel & Panduan Wisata</h1>
          <p className="text-white/90">
            Kumpulan tulisan inspiratif, panduan liburan, dan berita terbaru dari Desa Cimanuk.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link href={`/artikel/${article.slug}`} key={article.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col h-full">
                <div className="relative h-56 w-full overflow-hidden shrink-0">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-3">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" /> {article.authorName}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" /> {formatDate(article.createdAt)}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center text-primary font-semibold text-sm group-hover:text-secondary transition-colors mt-auto">
                    Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
