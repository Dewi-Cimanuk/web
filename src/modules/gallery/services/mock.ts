
import prisma from "@/lib/prisma";

export type GalleryItem = {
  id: string;
  url: string;
  caption?: string;
  createdAt: string;
};

export async function getGalleryList(): Promise<GalleryItem[]> {
  const data = await prisma.gallery.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  return data.map((d: any) => ({
    id: d.id,
    url: d.url,
    caption: d.caption || "",
    createdAt: d.createdAt.toISOString()
  }));
}
