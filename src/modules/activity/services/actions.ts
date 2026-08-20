"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createActivity(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const priceStr = formData.get("price") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (await prisma.activity.findUnique({ where: { slug } })) slug += `-${Date.now()}`;

  await prisma.activity.create({
    data: { 
      name, slug, description, duration: duration || null,
      price: priceStr ? parseFloat(priceStr) : null,
      status: status || "DRAFT" 
    },
  });

  revalidatePath("/admin/aktivitas");
  redirect("/admin/aktivitas");
}

export async function updateActivity(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const priceStr = formData.get("price") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  await prisma.activity.update({
    where: { id },
    data: { 
      name, description, duration: duration || null,
      price: priceStr ? parseFloat(priceStr) : null,
      status: status || "DRAFT" 
    },
  });

  revalidatePath("/admin/aktivitas");
  redirect("/admin/aktivitas");
}

export async function deleteActivity(id: string) {
  await prisma.activity.delete({ where: { id } });
  revalidatePath("/admin/aktivitas");
}
