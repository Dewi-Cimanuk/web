import prisma from "@/lib/prisma";

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

export async function getDestinations(search?: string, category?: string) {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (category && category !== "Semua") {
    where.category = { name: category };
  }
  
  const data = await prisma.destination.findMany({
    where,
    include: {
      category: true,
      images: true,
      location: true,
      facilities: true,
    }
  });

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    category: { id: d.category.id, name: d.category.name },
    priceTicket: Number(d.priceTicket) || 0,
    openHours: d.openHours || "",
    images: d.images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary })),
    location: { address: d.location?.address || "", googleMapsUrl: d.location?.googleMapsUrl || "" },
    facilities: d.facilities.map((f: any) => ({ name: f.name, icon: f.icon || "" }))
  }));
}

export async function getDestinationBySlug(slug: string) {
  const d = await prisma.destination.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
      location: true,
      facilities: true,
    }
  });
  
  if (!d) return null;
  
  return {
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    category: { id: d.category.id, name: d.category.name },
    priceTicket: Number(d.priceTicket) || 0,
    openHours: d.openHours || "",
    images: d.images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary })),
    location: { address: d.location?.address || "", googleMapsUrl: d.location?.googleMapsUrl || "" },
    facilities: d.facilities.map((f: any) => ({ name: f.name, icon: f.icon || "" }))
  };
}
