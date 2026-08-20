"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUMKM(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const ownerName = formData.get("ownerName") as string;
  const contact = formData.get("contact") as string;
  const address = formData.get("address") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const existing = await prisma.uMKM.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.uMKM.create({
    data: {
      name,
      slug,
      description,
      ownerName: ownerName || null,
      contact: contact || null,
      address: address || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/ekonomi");
  redirect("/admin/ekonomi");
}

export async function updateUMKM(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const ownerName = formData.get("ownerName") as string;
  const contact = formData.get("contact") as string;
  const address = formData.get("address") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  await prisma.uMKM.update({
    where: { id },
    data: {
      name,
      description,
      ownerName: ownerName || null,
      contact: contact || null,
      address: address || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/ekonomi");
  redirect("/admin/ekonomi");
}

export async function deleteUMKM(id: string) {
  await prisma.uMKM.delete({
    where: { id }
  });
  
  revalidatePath("/admin/ekonomi");
}
