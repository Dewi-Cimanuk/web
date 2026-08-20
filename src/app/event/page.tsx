import Image from "next/image";
import { getEventList } from "@/modules/event/services/mock";
import { Calendar, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Event & Agenda | DEWI Cimanuk",
};

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

export default async function EventPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const events = await getEventList(search);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Event & Agenda Desa</h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Temukan jadwal perayaan budaya, festival seni, dan kegiatan menarik lainnya di Desa Wisata Cimanuk.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 flex flex-col md:flex-row group">
                <div className="relative h-64 md:h-auto md:w-2/5 shrink-0">
                  <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.startDate)}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{event.title}</h2>
                  
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center text-sm font-medium text-slate-700">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    {event.endDate && (
                      <div className="flex items-center text-sm font-medium text-slate-700">
                        <CalendarDays className="w-4 h-4 mr-2 text-primary" />
                        Sampai: {formatDate(event.endDate)}
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {event.description}
                  </p>
                  
                  <Button className="w-full md:w-auto self-start bg-primary hover:bg-primary/90 text-white rounded-xl">
                    Lihat Detail Acara
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
