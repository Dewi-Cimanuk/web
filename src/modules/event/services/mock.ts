export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image: string;
};

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Festival Budaya Cimanuk 2026",
    slug: "festival-budaya-cimanuk-2026",
    description: "Perayaan tahunan seni dan budaya yang menampilkan tarian tradisional, pameran produk UMKM lokal, dan kuliner khas desa. Jangan lewatkan kemeriahan puncak acaranya!",
    startDate: "2026-10-15T08:00:00Z",
    endDate: "2026-10-17T22:00:00Z",
    location: "Alun-alun Desa Cimanuk",
    image: "/images/hero.png"
  },
  {
    id: "2",
    title: "Panen Raya Kopi Cimanuk",
    slug: "panen-raya-kopi-cimanuk",
    description: "Bergabunglah bersama petani lokal dalam tradisi memetik kopi merah. Ada sesi edukasi dan *coffee cupping* gratis untuk pengunjung.",
    startDate: "2026-11-05T07:00:00Z",
    location: "Perkebunan Kopi Dusun Krajan",
    image: "/images/hero.png"
  }
];

export async function getEventList(search?: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  let result = MOCK_EVENTS;
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.title.toLowerCase().includes(q));
  }
  return result;
}
