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

import prisma from "@/lib/prisma";

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

export async function getUMKMList(search?: string): Promise<UMKMItem[]> {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    const q = search;
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { products: { some: { name: { contains: q, mode: 'insensitive' } } } }
    ];
  }
  
  const data = await prisma.uMKM.findMany({
    where,
    include: {
      images: true,
      products: true
    }
  });

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    ownerName: d.ownerName || "",
    address: d.address || "",
    images: d.images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary })),
    products: d.products.map((p: any) => ({ name: p.name, price: Number(p.price) || 0 }))
  }));
}
