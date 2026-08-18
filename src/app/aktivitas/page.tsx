import { getActivityList } from "@/modules/activity/services/mock";
import { Activity, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Aktivitas Wisata | DEWI Cimanuk",
};

export default async function AktivitasPage() {
  const activities = await getActivityList();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center text-white">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Aktivitas Seru di Cimanuk</h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Jadikan liburan Anda berkesan dengan berbagai paket aktivitas edukatif dan menyenangkan bersama masyarakat desa.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all border border-slate-200 flex flex-col">
                <h2 className="text-2xl font-bold text-primary mb-3">{item.name}</h2>
                <p className="text-muted-foreground mb-6 flex-1">{item.description}</p>
                
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm font-medium">
                    <Clock className="w-5 h-5 text-secondary mr-2" />
                    {item.duration}
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <Ticket className="w-5 h-5 text-secondary mr-2" />
                    Rp {item.price.toLocaleString('id-ID')} / pax
                  </div>
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-6 font-bold text-lg">
                  Booking Sekarang
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
