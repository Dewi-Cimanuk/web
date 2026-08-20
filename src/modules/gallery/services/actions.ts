"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGallery(formData: FormData) {
  const title = formData.get("title") as string;
  const caption = formData.get("caption") as string;
  const url = formData.get("url") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!url) throw new Error("Image URL is required");

  await prisma.gallery.create({
    data: { title: title || null, caption: caption || null, url, status: status || "DRAFT" },
  });

  revalidatePath("/admin/galeri");
  redirect("/admin/galeri");
}

export async function updateGallery(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const caption = formData.get("caption") as string;
  const url = formData.get("url") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!url) throw new Error("Image URL is required");

  await prisma.gallery.update({
    where: { id },
    data: { title: title || null, caption: caption || null, url, status: status || "DRAFT" },
  });

  revalidatePath("/admin/galeri");
  redirect("/admin/galeri");
}

export async function deleteGallery(id: string) {
  await prisma.gallery.delete({ where: { id } });
  revalidatePath("/admin/galeri");
}
