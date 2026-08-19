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

import prisma from "@/lib/prisma";

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

export async function getCulinaryList(search?: string): Promise<CulinaryItem[]> {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    const q = search;
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { menus: { some: { name: { contains: q, mode: 'insensitive' } } } }
    ];
  }
  
  const data = await prisma.culinary.findMany({
    where,
    include: {
      images: true,
      menus: true
    }
  });

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    address: d.address || "",
    openHours: d.openHours || "",
    images: d.images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary })),
    menus: d.menus.map((m: any) => ({ name: m.name, price: Number(m.price) || 0 }))
  }));
}
