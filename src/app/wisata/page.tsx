import Link from "next/link";
import Image from "next/image";
import { getDestinations } from "@/modules/tourism/services/mock";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Direktori Wisata | DEWI Cimanuk",
  description: "Temukan berbagai destinasi wisata menarik di Desa Cimanuk.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function WisataPage(props: Props) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;

  const destinations = await getDestinations(search, category);
  const categories = ["Semua", "Alam", "Edukasi", "Budaya"];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold font-serif mb-4">Direktori Wisata Cimanuk</h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Jelajahi keindahan alam, budaya, dan kearifan lokal yang kami tawarkan. Temukan destinasi yang sesuai dengan liburan impian Anda.
          </p>
        </div>
      </section>

      <section className="py-8 border-b bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Form */}
            <form className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={search}
                placeholder="Cari nama destinasi..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              {category && <input type="hidden" name="category" value={category} />}
            </form>

            {/* Filter Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/wisata?category=${cat}${search ? `&q=${search}` : ''}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                    (category === cat || (!category && cat === "Semua"))
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white text-foreground hover:bg-slate-100 border-border"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto max-w-6xl px-4">
          {destinations.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Destinasi Tidak Ditemukan</h2>
              <p className="text-muted-foreground">Maaf, kami tidak menemukan destinasi yang sesuai dengan pencarian Anda.</p>
              <Link href="/wisata" className="mt-6 inline-block text-primary font-semibold hover:underline">
                Reset Pencarian
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <Link href={`/wisata/${dest.slug}`} key={dest.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 h-full">
                  <div className="relative h-56 w-full overflow-hidden">
                    {dest.images[0]?.url ? (
                      <Image
                        src={dest.images[0].url}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 animate-pulse" />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {dest.category.name}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{dest.name}</h3>
                    
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 shrink-0" />
                      <span className="line-clamp-1">{dest.location.address}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                      {dest.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Harga Tiket</span>
                        <span className="font-bold text-secondary">
                          {dest.priceTicket === 0 ? "Gratis" : `Rp ${dest.priceTicket.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
