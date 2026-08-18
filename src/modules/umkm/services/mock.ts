export type UMKMItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  ownerName: string;
  address: string;
  images: { url: string; isPrimary: boolean }[];
  products: { name: string; price: number }[];
};

export const MOCK_UMKM: UMKMItem[] = [
  {
    id: "1",
    name: "Kerajinan Bambu Pak Slamet",
    slug: "kerajinan-bambu-slamet",
    description: "Pengrajin lokal yang menyulap bambu menjadi berbagai kerajinan bernilai seni tinggi, mulai dari hiasan dinding, lampu tidur, hingga perabotan rumah tangga.",
    ownerName: "Pak Slamet",
    address: "Dusun Cimanuk Hilir RT 02",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    products: [
      { name: "Lampu Tidur Bambu", price: 75000 },
      { name: "Gelas Bambu Set", price: 50000 }
    ]
  },
  {
    id: "2",
    name: "Sentra Kripik Pisang Manis",
    slug: "kripik-pisang-manis",
    description: "Produksi rumahan kripik pisang yang legendaris di Cimanuk. Rasanya renyah, manis alami tanpa pengawet, sangat cocok untuk oleh-oleh.",
    ownerName: "Ibu Sumiati",
    address: "Jalan Dusun Sawah Baru No. 8",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    products: [
      { name: "Kripik Pisang Manis (250g)", price: 15000 },
      { name: "Kripik Pisang Coklat", price: 20000 }
    ]
  }
];

export async function getUMKMList(search?: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  let result = MOCK_UMKM;
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.name.toLowerCase().includes(q) || d.products.some(p => p.name.toLowerCase().includes(q)));
  }
  return result;
}
