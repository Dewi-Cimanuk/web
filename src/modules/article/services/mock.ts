
import prisma from "@/lib/prisma";

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

export async function getArticleList(search?: string): Promise<ArticleItem[]> {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    const q = search;
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } }
    ];
  }
  
  const data = await prisma.article.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return data.map((d: any) => ({
    id: d.id,
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt || "",
    content: d.content,
    image: d.image || "",
    authorName: d.authorName || "",
    createdAt: d.createdAt.toISOString()
  }));
}
