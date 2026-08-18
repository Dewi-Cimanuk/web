import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Coffee, Home, Activity, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Pesona Desa Wisata Cimanuk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white max-w-4xl mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 drop-shadow-lg leading-tight">
            Jelajahi Pesona Alam & Budaya <br />
            <span className="text-secondary">Desa Wisata Cimanuk</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
            Temukan ketenangan alam, nikmati kearifan lokal, dan dukung pertumbuhan ekonomi desa kami yang berkelanjutan.
          </p>
          
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-xl flex items-center">
            <Search className="w-6 h-6 text-white ml-4" />
            <input 
              type="text" 
              placeholder="Cari destinasi, kuliner, atau homestay..." 
              className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder:text-white/70"
            />
            <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold px-8">
              Cari
            </Button>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 uppercase relative inline-block">
              Telusuri Cimanuk
              <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            <Link href="/wisata" className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MapPin className="w-8 h-8" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Wisata</span>
            </Link>
            
            <Link href="/kuliner" className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Coffee className="w-8 h-8" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-secondary transition-colors">Kuliner</span>
            </Link>

            <Link href="/homestay" className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-info/10 flex items-center justify-center text-info group-hover:bg-info group-hover:text-white transition-colors">
                <Home className="w-8 h-8" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-info transition-colors">Homestay</span>
            </Link>

            <Link href="/umkm" className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Activity className="w-8 h-8" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-accent transition-colors">UMKM</span>
            </Link>

            <Link href="/kkn" className="col-span-2 md:col-span-1 group flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Pusat KKN</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 uppercase relative inline-block">
                Destinasi Unggulan
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
              </h2>
              <p className="text-muted-foreground mt-4">Pilihan tempat terbaik yang wajib Anda kunjungi di Cimanuk.</p>
            </div>
            <Link href="/wisata" className="hidden md:flex text-primary font-semibold hover:text-secondary transition-colors items-center gap-1">
              Lihat Semua <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock Card 1 */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all border border-slate-100">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder fallback */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  Alam
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Curug Eksotis Cimanuk</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  Air terjun tersembunyi dengan air sebening kristal dan dikelilingi hutan hijau yang asri.
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="font-semibold text-secondary">Rp 15.000</span>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>

            {/* Mock Card 2 */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all border border-slate-100">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-info">
                  Edukasi
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Kampoeng Tani</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  Rasakan pengalaman bertani langsung bersama masyarakat lokal dan pelajari kearifan agrikultur.
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="font-semibold text-secondary">Rp 25.000</span>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>

            {/* Mock Card 3 */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all border border-slate-100">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-accent">
                  Budaya
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Sanggar Seni Cimanuk</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  Saksikan pertunjukan tari dan musik tradisional khas masyarakat Desa Cimanuk.
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="font-semibold text-secondary">Gratis</span>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" className="w-full">Lihat Semua Destinasi</Button>
          </div>
        </div>
      </section>

      {/* KKN Pillar CTA */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pusat Pengetahuan Desa (KKN)</h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl">
                Jelajahi rekam jejak program pemberdayaan, dokumentasi kegiatan, dan rekomendasi strategis dari tim KKN untuk pembangunan Desa Wisata Cimanuk yang berkelanjutan.
              </p>
              <Link href="/kkn">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold px-8 rounded-full">
                  Telusuri Program KKN
                </Button>
              </Link>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 p-8 flex flex-col justify-center items-center text-center text-white">
                 <BookOpen className="w-20 h-20 mb-6 text-secondary" />
                 <h3 className="text-2xl font-bold mb-2">Institutional Knowledge</h3>
                 <p className="text-white/80 text-sm">Menjaga program tetap terarah dari tahun ke tahun.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
