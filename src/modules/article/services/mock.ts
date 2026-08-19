export type ArticleItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  authorName: string;
  createdAt: string;
};

export const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: "1",
    title: "5 Alasan Mengapa Anda Harus Berkunjung ke Cimanuk",
    slug: "5-alasan-berkunjung-ke-cimanuk",
    excerpt: "Dari pemandangan alam yang asri hingga kehangatan warga lokal, temukan daya tarik utama desa wisata ini.",
    content: "Konten lengkap artikel...",
    image: "/images/hero.png",
    authorName: "Tim KKN Tematik",
    createdAt: "2026-08-10T10:00:00Z"
  },
  {
    id: "2",
    title: "Panduan Lengkap Wisata Backpacker di Desa Cimanuk",
    slug: "panduan-lengkap-wisata-backpacker",
    excerpt: "Tips hemat dan rute terbaik untuk menjelajahi segala potensi alam Cimanuk ala backpacker.",
    content: "Konten lengkap artikel...",
    image: "/images/hero.png",
    authorName: "Pengelola Desa Wisata",
    createdAt: "2026-08-15T09:30:00Z"
  }
];

export async function getArticleList(search?: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  let result = MOCK_ARTICLES;
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => d.title.toLowerCase().includes(q));
  }
  return result;
}
