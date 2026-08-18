export type DestinationItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  priceTicket: number;
  openHours: string;
  images: { url: string; isPrimary: boolean }[];
  location: { address: string; googleMapsUrl?: string };
  facilities: { name: string; icon?: string }[];
};

export const MOCK_DESTINATIONS: DestinationItem[] = [
  {
    id: "1",
    name: "Curug Eksotis Cimanuk",
    slug: "curug-eksotis-cimanuk",
    description: "Air terjun tersembunyi dengan air sebening kristal dan dikelilingi hutan hijau yang asri. Cocok untuk Anda yang mencari ketenangan dan keindahan alam yang belum banyak tersentuh.",
    category: { id: "c1", name: "Alam" },
    priceTicket: 15000,
    openHours: "08:00 - 17:00 WIB",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    location: { address: "Dusun Krajan, Desa Cimanuk", googleMapsUrl: "https://maps.google.com" },
    facilities: [{ name: "Area Parkir" }, { name: "Toilet" }, { name: "Warung Makan" }],
  },
  {
    id: "2",
    name: "Kampoeng Tani Edukasi",
    slug: "kampoeng-tani-edukasi",
    description: "Rasakan pengalaman bertani langsung bersama masyarakat lokal. Pelajari cara menanam padi, memanen sayuran, dan memahami kearifan agrikultur Desa Cimanuk.",
    category: { id: "c2", name: "Edukasi" },
    priceTicket: 25000,
    openHours: "07:00 - 15:00 WIB",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    location: { address: "Dusun Sawah Baru, Desa Cimanuk" },
    facilities: [{ name: "Gazebo" }, { name: "Pemandu Lokal" }, { name: "Peralatan Tani" }],
  },
  {
    id: "3",
    name: "Sanggar Seni Budaya Cimanuk",
    slug: "sanggar-seni-budaya-cimanuk",
    description: "Saksikan pertunjukan tari dan musik tradisional khas masyarakat Desa Cimanuk. Terdapat kelas singkat membatik dan memainkan alat musik tradisional.",
    category: { id: "c3", name: "Budaya" },
    priceTicket: 0,
    openHours: "10:00 - 16:00 WIB (Sabtu & Minggu)",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    location: { address: "Pusat Desa Cimanuk" },
    facilities: [{ name: "Pendopo" }, { name: "Galeri Seni" }, { name: "Toilet" }],
  },
  {
    id: "4",
    name: "Bukit Panorama",
    slug: "bukit-panorama",
    description: "Menikmati indahnya pemandangan matahari terbit dan terbenam dari puncak bukit. Dilengkapi dengan spot foto yang *instagramable* dan area *camping*.",
    category: { id: "c1", name: "Alam" },
    priceTicket: 10000,
    openHours: "24 Jam",
    images: [{ url: "/images/hero.png", isPrimary: true }],
    location: { address: "Perbatasan Dusun Cimanuk Atas" },
    facilities: [{ name: "Camping Ground" }, { name: "Spot Foto" }, { name: "Kamar Mandi" }],
  }
];

export async function getDestinations(search?: string, category?: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let result = MOCK_DESTINATIONS;
  
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
  }
  
  if (category && category !== "Semua") {
    result = result.filter(d => d.category.name === category);
  }
  
  return result;
}

export async function getDestinationBySlug(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_DESTINATIONS.find(d => d.slug === slug) || null;
}
