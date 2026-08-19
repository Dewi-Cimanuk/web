export type GalleryItem = {
  id: string;
  url: string;
  caption?: string;
  createdAt: string;
};

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: "1",
    url: "/images/hero.png",
    caption: "Pemandangan pagi hari di Bukit Panorama Cimanuk",
    createdAt: "2026-08-01T08:00:00Z"
  },
  {
    id: "2",
    url: "/images/hero.png",
    caption: "Keceriaan anak-anak bermain di tepi sawah",
    createdAt: "2026-08-05T15:30:00Z"
  },
  {
    id: "3",
    url: "/images/hero.png",
    caption: "Proses panen kopi oleh ibu-ibu petani",
    createdAt: "2026-08-10T11:00:00Z"
  }
];

export async function getGalleryList() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_GALLERY;
}
