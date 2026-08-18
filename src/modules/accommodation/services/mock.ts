export type AccommodationItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  pricePerNight: number;
  contact: string;
  images: { url: string; isPrimary: boolean }[];
  facilities: { name: string }[];
};

export const MOCK_ACCOMMODATION: AccommodationItem[] = [
  {
    id: "1",
    name: "Omah Pak Budi Homestay",
    slug: "omah-pak-budi",
    description: "Penginapan nyaman bernuansa pedesaan yang menyatu dengan alam. Tuan rumah yang ramah siap melayani sarapan khas pedesaan setiap pagi.",
    address: "Dusun Krajan RT 01",
    pricePerNight: 200000,
    contact: "08123456789",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    facilities: [{ name: "Kamar Mandi Dalam" }, { name: "Kipas Angin" }, { name: "Sarapan Gratis" }]
  },
  {
    id: "2",
    name: "Pondok Cimanuk Asri",
    slug: "pondok-cimanuk-asri",
    description: "Villa kecil dengan pemandangan langsung ke bukit. Cocok untuk liburan keluarga besar karena memiliki area halaman luas untuk kegiatan outdoor.",
    address: "Kawasan Bukit Cimanuk",
    pricePerNight: 500000,
    contact: "08987654321",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    facilities: [{ name: "AC" }, { name: "Dapur Umum" }, { name: "Area BBQ" }]
  }
];

export async function getAccommodationList() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ACCOMMODATION;
}
