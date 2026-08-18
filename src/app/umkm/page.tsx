import Link from "next/link";
import Image from "next/image";
import { getUMKMList } from "@/modules/umkm/services/mock";
import { Search, Store, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Produk UMKM | DEWI Cimanuk",
  description: "Dukung ekonomi lokal dengan membeli produk UMKM Cimanuk.",
};

export default async function UMKMPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const umkmList = await getUMKMList(search);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-accent py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <Store className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Produk UMKM Unggulan</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Dukung pertumbuhan ekonomi Desa Cimanuk dengan membeli buah karya masyarakat lokal yang otentik dan berkualitas.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkmList.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <Image src={item.images[0].url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {item.ownerName}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{item.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2 shrink-0 text-accent/70" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-3">Produk Terbaik</p>
                     <ul className="space-y-2 mb-6">
                        {item.products.map((p, idx) => (
                           <li key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-slate-700">{p.name}</span>
                              <span className="font-semibold text-accent">Rp {p.price.toLocaleString('id-ID')}</span>
                           </li>
                        ))}
                     </ul>
                    <Button variant="outline" className="w-full rounded-xl border-accent text-accent hover:bg-accent hover:text-white transition-colors group-hover:bg-accent group-hover:text-white">
                      Pesan via WhatsApp
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
