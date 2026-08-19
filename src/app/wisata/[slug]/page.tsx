import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/modules/tourism/services/mock";
import { MapPin, Clock, Ticket, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  
  if (!destination) {
    return { title: "Destinasi Tidak Ditemukan | DEWI Cimanuk" };
  }
  
  return {
    title: `${destination.name} | DEWI Cimanuk`,
    description: destination.description.substring(0, 160),
  };
}

export default async function WisataDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  
  if (!destination) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {destination.images[0]?.url ? (
          <Image
            src={destination.images[0].url}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        
        <div className="absolute top-6 left-4 md:left-10 z-20">
          <Link href="/wisata" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 pb-10">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-bold mb-4 shadow-lg">
              {destination.category.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif drop-shadow-md">
              {destination.name}
            </h1>
            <div className="flex items-center text-white/90 mt-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{destination.location.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-foreground mb-4">Tentang Destinasi</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {destination.description}
                </p>
              </div>
            </section>

            {/* Facilities */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-foreground mb-6">Fasilitas Tersedia</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destination.facilities.map((fac: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="font-medium text-foreground text-sm">{fac.name}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Map/Location placeholder */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
               <h2 className="text-2xl font-bold text-foreground mb-4">Lokasi & Peta</h2>
               <div className="aspect-video w-full bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-slate-300">
                  <MapPin className="w-12 h-12 mb-4 opacity-50" />
                  <p>Integrasi Google Maps akan ditampilkan di sini</p>
                  {destination.location.googleMapsUrl && (
                     <a href={destination.location.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-4 text-primary hover:underline font-medium">
                        Buka di Google Maps
                     </a>
                  )}
               </div>
            </section>
          </div>

          {/* Sidebar / Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold border-b pb-4 mb-6">Informasi Kunjungan</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Harga Tiket Masuk</p>
                    <p className="text-lg font-bold text-foreground">
                      {destination.priceTicket === 0 ? "Gratis" : `Rp ${destination.priceTicket.toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Jam Operasional</p>
                    <p className="text-lg font-bold text-foreground">
                      {destination.openHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Button className="w-full rounded-full py-6 text-lg font-bold bg-primary hover:bg-primary/90">
                  Rencanakan Kunjungan
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Hubungi pengelola desa wisata untuk reservasi rombongan atau paket wisata khusus.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
