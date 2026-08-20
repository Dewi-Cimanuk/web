"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const authorName = formData.get("authorName") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.article.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      authorName: authorName || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/artikel");
  redirect("/admin/artikel");
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const authorName = formData.get("authorName") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  await prisma.article.update({
    where: { id },
    data: {
      title,
      content,
      excerpt: excerpt || null,
      authorName: authorName || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/artikel");
  redirect("/admin/artikel");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id }
  });
  
  revalidatePath("/admin/artikel");
}
