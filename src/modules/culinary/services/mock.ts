export type CulinaryItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  openHours: string;
  images: { url: string; isPrimary: boolean }[];
  menus: { name: string; price: number }[];
};

export const MOCK_CULINARY: CulinaryItem[] = [
  {
    id: "1",
    name: "Warung Nasi Liwet Ibu Cicih",
    slug: "nasi-liwet-ibu-cicih",
    description: "Nikmati sajian khas Sunda dengan menu andalan Nasi Liwet yang disajikan hangat dengan lauk pauk tradisional dan sambal khas Cimanuk.",
    address: "Jalan Utama Desa Cimanuk No. 12",
    openHours: "09:00 - 20:00 WIB",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    menus: [
      { name: "Paket Nasi Liwet Komplit", price: 35000 },
      { name: "Ayam Bakar Madu", price: 20000 },
      { name: "Sayur Asem", price: 10000 }
    ]
  },
  {
    id: "2",
    name: "Kopi Lereng Cimanuk",
    slug: "kopi-lereng-cimanuk",
    description: "Tempat nongkrong asik sambil menikmati kopi robusta asli panenan petani lokal dengan pemandangan bukit hijau yang menyejukkan mata.",
    address: "Kawasan Bukit Panorama, Cimanuk",
    openHours: "15:00 - 23:00 WIB",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    menus: [
      { name: "Kopi Tubruk Cimanuk", price: 15000 },
      { name: "Pisang Goreng Keju", price: 12000 },
      { name: "V60 Arabica Lokal", price: 20000 }
    ]
  }
];

export async function getCulinaryList(search?: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  let result = MOCK_CULINARY;
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.name.toLowerCase().includes(q));
  }
  return result;
}
