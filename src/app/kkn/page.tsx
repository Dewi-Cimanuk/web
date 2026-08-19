import Link from "next/link";
import { getKKNList } from "@/modules/kkn/services/mock";
import { GraduationCap, Search, Users, Calendar, MapPin, ChevronRight, Building2 } from "lucide-react";

export const metadata = {
  title: "Histori KKN | DEWI Cimanuk",
};

export default async function KKNPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const kknList = await getKKNList(search);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Repositori KKN Cimanuk</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Pusat data, dokumentasi program kerja, dan rekomendasi berkelanjutan dari seluruh civitas akademika yang telah mengabdi di Desa Cimanuk.
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto max-w-5xl px-4">
          <form className="relative w-full">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Cari nama universitas, judul program, atau tahun..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner"
            />
          </form>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-6">
            {kknList.map((kkn) => (
              <Link href={`/kkn/${kkn.slug}`} key={kkn.id} className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col md:flex-row gap-6 items-start">
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Building2 className="w-4 h-4" />
                    {kkn.institution.name}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {kkn.title}
                  </h2>
                  
                  <p className="text-muted-foreground line-clamp-2 text-base">
                    {kkn.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {kkn.year} ({kkn.batch})
                    </div>
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {kkn.members.length} Anggota
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-center w-full md:w-auto h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ChevronRight className="w-6 h-6" />
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
