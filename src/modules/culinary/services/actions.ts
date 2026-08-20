"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCulinary(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const openHours = formData.get("openHours") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (await prisma.culinary.findUnique({ where: { slug } })) slug += `-${Date.now()}`;

  await prisma.culinary.create({
    data: { name, slug, description, address: address || null, openHours: openHours || null, status: status || "DRAFT" },
  });

  revalidatePath("/admin/kuliner");
  redirect("/admin/kuliner");
}

export async function updateCulinary(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const openHours = formData.get("openHours") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  await prisma.culinary.update({
    where: { id },
    data: { name, description, address: address || null, openHours: openHours || null, status: status || "DRAFT" },
  });

  revalidatePath("/admin/kuliner");
  redirect("/admin/kuliner");
}

export async function deleteCulinary(id: string) {
  await prisma.culinary.delete({ where: { id } });
  revalidatePath("/admin/kuliner");
}
