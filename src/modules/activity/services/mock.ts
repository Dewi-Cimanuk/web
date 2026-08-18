export type ActivityItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
};

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    name: "Paket Edukasi Tani Cimanuk",
    slug: "paket-edukasi-tani",
    description: "Kegiatan sehari penuh belajar bertani bersama warga lokal, mulai dari membajak sawah, menanam padi, hingga panen (tergantung musim).",
    price: 50000,
    duration: "4 - 5 Jam"
  },
  {
    id: "2",
    name: "Trekking Jelajah Bukit",
    slug: "trekking-bukit",
    description: "Perjalanan mendaki bukit dengan didampingi pemandu wisata lokal. Nikmati pemandangan alam dan udara segar khas dataran tinggi.",
    price: 35000,
    duration: "2 - 3 Jam"
  }
];

export async function getActivityList() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ACTIVITY;
}
