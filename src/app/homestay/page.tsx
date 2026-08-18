import Image from "next/image";
import { getAccommodationList } from "@/modules/accommodation/services/mock";
import { Home, MapPin, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Homestay & Akomodasi | DEWI Cimanuk",
};

export default async function HomestayPage() {
  const accommodations = await getAccommodationList();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-info py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <Home className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Homestay Cimanuk</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Rasakan kehangatan hidup berdampingan dengan warga lokal. Temukan tempat menginap terbaik untuk menyempurnakan liburan Anda.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-10">
          {accommodations.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 flex flex-col md:flex-row">
              <div className="relative h-64 md:h-auto md:w-1/3 shrink-0">
                <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{item.name}</h2>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-info" />
                  {item.address}
                </div>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {item.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-info" />
                      {fac.name}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Mulai Dari</span>
                    <span className="text-2xl font-bold text-info">Rp {item.pricePerNight.toLocaleString('id-ID')}</span>
                    <span className="text-sm text-muted-foreground"> / malam</span>
                  </div>
                  <Button className="w-full sm:w-auto bg-info hover:bg-info/90 text-white rounded-xl px-8 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Reservasi
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
