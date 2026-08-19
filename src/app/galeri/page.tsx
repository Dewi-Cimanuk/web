import Image from "next/image";
import { getGalleryList } from "@/modules/gallery/services/mock";
import { Camera } from "lucide-react";

export const metadata = {
  title: "Galeri Foto | DEWI Cimanuk",
};

export default async function GaleriPage() {
  const galleries = await getGalleryList();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-primary/90 py-16 text-center text-white border-b border-primary/20 shadow-inner">
        <div className="container mx-auto max-w-4xl px-4">
          <Camera className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold font-serif mb-4">Galeri Desa</h1>
          <p className="text-white/90">
            Jejak digital keindahan alam, budaya, dan momen-momen berkesan di Desa Wisata Cimanuk.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {galleries.map((item, index) => (
              <div key={item.id} className="break-inside-avoid relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all border border-slate-200 bg-white">
                <Image 
                  src={item.url} 
                  alt={item.caption || "Galeri Cimanuk"} 
                  width={500} 
                  height={index % 2 === 0 ? 600 : 400} 
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium drop-shadow-sm">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
