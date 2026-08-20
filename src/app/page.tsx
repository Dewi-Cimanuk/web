import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import { getDestinations } from "@/modules/tourism/services/mock";
import { getUMKMList } from "@/modules/umkm/services/mock";
import { getEventList } from "@/modules/event/services/mock";
import { getArticleList } from "@/modules/article/services/mock";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const destinations = await getDestinations();
  const umkms = await getUMKMList();
  const events = await getEventList();
  const articles = await getArticleList();

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

      {/* Editorial Section (Inspired by index.html) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content Article */}
            <div className="lg:w-2/3 max-w-none">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-800 font-bold leading-tight mb-6 text-center lg:text-left">
                #CimanukSahaja: Liburan Sederhana di Desa Lebih Bahagia
              </h1>
              
              <p className="italic text-center lg:text-left text-slate-500 text-lg mb-8 max-w-2xl">
                Bayangkan satu keluarga liburan ke Cimanuk. Menginap di homestay warga, makan kuliner lokal. Liburan tetap hemat, tetapi bahagia.
              </p>

              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-3 shadow-md">
                <Image src="/images/hero.png" alt="Pemandangan Desa Cimanuk" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-center text-sm text-slate-400 mb-10">
                Kesejukan Pagi di Cimanuk <span className="font-semibold text-slate-500">(Dok. Desa Wisata)</span>
              </p>

              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-serif">
                <p>Kami tahu, saat ini bukan masa yang mudah. Harga kebutuhan naik, dan rencana liburan yang sudah lama ditunggu-tunggu pun jadi terasa berat.</p>
                
                <p>Namun, mungkin... liburan tak harus mewah.<br/>Mungkin, justru di masa ini, kita butuh liburan yang sederhana—agar bisa kembali bersyukur, kembali tersenyum, dan kembali merasa utuh sebagai keluarga.</p>
                
                <p>Karena itulah kami mengajak Anda ikut dalam gerakan kecil kami:<br/>
                <strong className="text-primary text-xl">#CimanukSahaja</strong><br/>
                Liburan sederhana di desa lebih bahagia.</p>

                <h2 className="text-2xl font-sans font-bold text-slate-800 mt-10 mb-4 inline-block relative">
                  Kenapa Cimanuk?
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
                </h2>
                
                <p>Karena di Cimanuk, Anda bisa menikmati udara segar dan ketenangan alam tanpa harus merogoh kocek dalam-dalam. Anda bisa menginap di <Link href="/homestay" className="text-info font-semibold hover:underline">Guest House & Homestay</Link> warga yang sederhana namun hangat, lengkap dengan keramahan khas pedesaan.</p>
                
                <p>Karena di sini, tempat wisatanya indah dan mendidik. Belajar bertani, menikmati curug tersembunyi, atau sekadar bersepeda menyusuri pematang sawah. Bahkan senyum dan sapaan warga pun—selalu gratis.</p>
                
                <h2 className="text-2xl font-sans font-bold text-slate-800 mt-10 mb-4 inline-block relative">
                  Liburan hemat itu mungkin
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
                </h2>
                
                <p>Bayangkan pagi hari menyeduh kopi di teras homestay, siang hari mencicipi sajian <Link href="/kuliner" className="text-secondary font-semibold hover:underline">Kuliner khas lokal</Link>, dan sore hari bersantai melihat matahari terbenam di balik perbukitan.</p>
                
                <p>Lebih hemat. Lebih dekat. Lebih bahagia.</p>
                
                <blockquote className="bg-slate-50 border-l-4 border-primary p-6 italic text-slate-600 my-10 rounded-r-2xl font-sans text-xl shadow-sm">
                  "Karena kadang yang sederhana, justru paling membekas dalam hati."
                </blockquote>
                
                <p className="font-sans">Salam hangat,</p>
                <p className="font-sans font-bold text-slate-800">Masyarakat Desa Wisata Cimanuk</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8 lg:mt-0 mt-12">
              
              {/* Sidebar Block 1: Wisata Unggulan (Terpopuler) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase relative inline-block">
                  Wisata Unggulan
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200 rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-secondary rounded-full"></span>
                </h3>
                <div className="space-y-4">
                  {destinations.slice(0, 4).map((dest, idx) => (
                    <Link key={dest.id} href={`/wisata/${dest.slug}`} className="flex gap-4 group items-center">
                      <div className="text-2xl font-bold text-slate-200 group-hover:text-secondary transition-colors w-6 text-center">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm line-clamp-1">{dest.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">{dest.category?.name || "Wisata"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Block 2: Oleh-oleh & UMKM */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase relative inline-block">
                  Oleh-oleh & UMKM
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200 rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent rounded-full"></span>
                </h3>
                <div className="space-y-4">
                  {umkms.slice(0, 3).map((umkm) => (
                    <Link key={umkm.id} href={`/umkm/${umkm.slug}`} className="flex gap-4 group items-center">
                      {umkm.images?.[0]?.url && (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-slate-100">
                          <Image src={umkm.images[0].url} alt={umkm.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 group-hover:text-accent transition-colors text-sm line-clamp-2">{umkm.name}</h4>
                        {umkm.products?.[0]?.price ? (
                           <p className="text-xs text-slate-500 mt-1">Mulai Rp {umkm.products[0].price.toLocaleString('id-ID')}</p>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Block 3: Event */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase relative inline-block">
                  Event
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200 rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
                </h3>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <Link key={event.id} href={`/event/${event.slug}`} className="flex gap-4 group items-center">
                      <div className="flex-1 border-l-2 border-primary pl-3">
                        <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Block 4: Artikel (dengan sisipan KKN) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase relative inline-block">
                  Artikel & Kabar
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200 rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-info rounded-full"></span>
                </h3>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug}`} className="flex gap-4 group items-center">
                      {article.image && (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-slate-100">
                           <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 group-hover:text-info transition-colors text-sm line-clamp-2">{article.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{new Date(article.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                    </Link>
                  ))}
                  
                  {/* KKN Link Diselipin di direktori Artikel */}
                  <Link href="/kkn" className="flex gap-4 group items-center mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors">
                     <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-white shrink-0">
                        <BookOpen className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-primary text-sm group-hover:underline">Pusat Pengetahuan KKN</h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">Jelajahi rekam jejak program.</p>
                     </div>
                  </Link>
                </div>
              </div>

              {/* Sidebar Block 5: Tentang Dewi Cimanuk */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase relative inline-block">
                  Tentang Dewi Cimanuk
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200 rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-secondary rounded-full"></span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Desa Wisata (Dewi) Cimanuk adalah destinasi wisata alam dan edukasi terpadu. Kami berkomitmen memberdayakan masyarakat dan memajukan UMKM lokal melalui pariwisata yang berkelanjutan.
                </p>
                <Link href="/tentang" className="text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1">
                  Selengkapnya <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
