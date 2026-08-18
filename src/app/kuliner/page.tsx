import Link from "next/link";
import Image from "next/image";
import { getCulinaryList } from "@/modules/culinary/services/mock";
import { Search, MapPin, Coffee, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Kuliner Lokal | DEWI Cimanuk",
  description: "Cicipi kelezatan kuliner khas Desa Wisata Cimanuk.",
};

export default async function KulinerPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const culinaryList = await getCulinaryList(search);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-secondary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <Utensils className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl font-bold font-serif mb-4">Kuliner Khas Cimanuk</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Manjakan lidah Anda dengan cita rasa autentik warisan leluhur. Dari hidangan tradisional hingga seduhan kopi lokal.
          </p>
        </div>
      </section>

      <section className="py-8 border-b bg-white">
        <div className="container mx-auto max-w-6xl px-4 flex justify-center">
          <form className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Cari restoran, warung, atau menu favorit..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-secondary outline-none transition-all shadow-sm"
            />
          </form>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {culinaryList.map((item) => (
              <div key={item.id} className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="relative h-56 md:h-auto md:w-2/5 overflow-hidden shrink-0">
                  <Image src={item.images[0].url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{item.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Menu Andalan</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.menus.slice(0,2).map((m, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                          {m.name}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold">
                      Lihat Menu Lengkap
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
