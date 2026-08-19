
import prisma from "@/lib/prisma";

export type ActivityItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
};

export async function getActivityList(): Promise<ActivityItem[]> {
  const data = await prisma.activity.findMany({
    where: { status: 'PUBLISHED' }
  });

  return data.map((d: any) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    price: Number(d.price) || 0,
    duration: d.duration || ""
  }));
}
