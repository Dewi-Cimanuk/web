
import prisma from "@/lib/prisma";

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

export async function getAccommodationList(search?: string): Promise<AccommodationItem[]> {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    const q = search;
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } }
    ];
  }
  
  const data = await prisma.accommodation.findMany({
    where,
    include: {
      images: true,
      facilities: true
    }
  });

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    address: d.address || "",
    pricePerNight: Number(d.pricePerNight) || 0,
    contact: d.contact || "",
    images: d.images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary })),
    facilities: d.facilities.map((f: any) => ({ name: f.name }))
  }));
}
