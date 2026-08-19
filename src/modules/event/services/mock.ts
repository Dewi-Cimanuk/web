
import prisma from "@/lib/prisma";

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image: string;
};

export async function getEventList(search?: string): Promise<EventItem[]> {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    const q = search;
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } }
    ];
  }
  
  const data = await prisma.event.findMany({
    where,
    orderBy: { startDate: 'asc' }
  });

  return data.map((d: any) => ({
    id: d.id,
    title: d.title,
    slug: d.slug,
    description: d.description,
    startDate: d.startDate.toISOString(),
    endDate: d.endDate ? d.endDate.toISOString() : undefined,
    location: d.location || "",
    image: d.image || ""
  }));
}
